import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DISABLED_APPROVAL_EXPIRY,
  DISABLED_APPROVAL_NAME,
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  REVIEW_EMAIL_ACCOUNT_ID,
  REVIEW_EMAIL_REGION,
  canonicalJsonSha256,
  isDependencyOnlySsoAssignmentChange,
  isExistingStackUpdateChangeSet,
  parseJsonDocument,
  readStrictJsonFile,
} from './lib/review-email-cloudformation-contract.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ACCESS_TEMPLATE_PATH = resolve(
  ROOT,
  'infra/aws/review-email-deployment-access.cloudformation.json',
);
const apply = process.argv.includes('--apply');
const mode = readOption('--mode');
const changeSetName = readOption('--change-set-name');
const expiresAt = readOption('--expires-at');
const adminProfile = readOption('--admin-profile');
const region = readOption('--region') || REVIEW_EMAIL_REGION;
const awsCli = resolveAwsCli();

if (!['stage', 'open', 'close'].includes(mode)) fail('--mode must be stage, open, or close.');
if (!adminProfile) fail('--admin-profile is required; no default administrator profile is allowed.');
if (region !== REVIEW_EMAIL_REGION) fail(`Approval updates are locked to ${REVIEW_EMAIL_REGION}.`);
if (!existsSync(ACCESS_TEMPLATE_PATH)) fail(`Missing deployment-access template: ${ACCESS_TEMPLATE_PATH}`);
if (mode !== 'close' && !/^renuvex-review-email-foundation-[a-z0-9][a-z0-9-]{0,95}$/.test(changeSetName)) {
  fail('A valid exact foundation --change-set-name is required.');
}

const sourceTemplate = readStrictJsonFile(ACCESS_TEMPLATE_PATH, 'deployment-access template');
const sourceTemplateDigest = canonicalJsonSha256(sourceTemplate);
const caller = awsJson(['sts', 'get-caller-identity']);
assert(caller.Account === REVIEW_EMAIL_ACCOUNT_ID, 'Administrator caller account is not the locked account.');
assert(
  /AWSReservedSSO_AdministratorAccess_/.test(caller.Arn ?? ''),
  'Approval mutation requires a temporary AdministratorAccess SSO session.',
);

const stack = awsJson([
  'cloudformation',
  'describe-stacks',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
]).Stacks?.[0];
assert(stack, 'Deployment-access stack is missing.');
assert(
  ['CREATE_COMPLETE', 'UPDATE_COMPLETE'].includes(stack.StackStatus),
  `Deployment-access stack is not stable: ${stack.StackStatus}.`,
);
assert(stack.EnableTerminationProtection === true, 'Deployment-access termination protection must remain enabled.');

const liveTemplateResponse = awsJson([
  'cloudformation',
  'get-template',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  '--template-stage',
  'Original',
]);
const liveTemplate = parseJsonDocument(liveTemplateResponse.TemplateBody, 'Original access-stack template');
assert(
  canonicalJsonSha256(liveTemplate) === sourceTemplateDigest,
  'Live access template differs from source. Deploy and verify the access-hardening change set first.',
);

const currentParameters = Object.fromEntries(
  (stack.Parameters ?? []).map(({ ParameterKey, ParameterValue }) => [ParameterKey, ParameterValue]),
);
for (const parameterName of Object.keys(sourceTemplate.Parameters ?? {})) {
  assert(parameterName in currentParameters, `Live access stack is missing parameter ${parameterName}.`);
}

const target = approvalValues();
if (
  currentParameters.ApprovedFoundationChangeSetName === target.name &&
  currentParameters.FoundationExecutionApprovalExpiresAt === target.expiry
) {
  process.stdout.write(`${JSON.stringify({
    changed: false,
    mode,
    sourceTemplateDigest,
    status: 'already-effective',
  }, null, 2)}\n`);
  process.exit(0);
}

const parameters = Object.keys(sourceTemplate.Parameters).map((ParameterKey) => ({
  ParameterKey,
  ParameterValue:
    ParameterKey === 'ApprovedFoundationChangeSetName'
      ? target.name
      : ParameterKey === 'FoundationExecutionApprovalExpiresAt'
        ? target.expiry
        : currentParameters[ParameterKey],
}));
const accessChangeSetName =
  `renuvex-review-email-access-foundation-${mode}-${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}`;

process.stdout.write(`${JSON.stringify({
  accessChangeSetName,
  approvalChangeSetName: target.name,
  approvalExpiresAt: target.expiry,
  effectiveMutation: apply,
  mode,
  sourceTemplateDigest,
  stackName: REVIEW_EMAIL_ACCESS_STACK_NAME,
}, null, 2)}\n`);

if (!apply) {
  process.stdout.write('Dry run only. Access-stack mutation requires --apply and separate explicit approval.\n');
  process.exit(0);
}

const createArgs = [
  'cloudformation',
  'create-change-set',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  '--change-set-name',
  accessChangeSetName,
  '--change-set-type',
  'UPDATE',
  '--description',
  `foundation-execute-approval mode=${mode}`,
  '--use-previous-template',
  '--capabilities',
  'CAPABILITY_NAMED_IAM',
  '--parameters',
  JSON.stringify(parameters),
];
if ((stack.Tags ?? []).length > 0) {
  createArgs.push(
    '--tags',
    ...stack.Tags.map(({ Key, Value }) => `Key=${Key},Value=${Value}`),
  );
}
awsJson(createArgs);
runAws([
  'cloudformation',
  'wait',
  'change-set-create-complete',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  '--change-set-name',
  accessChangeSetName,
]);
const accessChangeSet = awsJson([
  'cloudformation',
  'describe-change-set',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  '--change-set-name',
  accessChangeSetName,
]);
assert(accessChangeSet.Status === 'CREATE_COMPLETE', 'Access approval change set is not complete.');
assert(accessChangeSet.ExecutionStatus === 'AVAILABLE', 'Access approval change set is not executable.');
assert(
  isExistingStackUpdateChangeSet(accessChangeSet, stack),
  'Access approval lacks the evidence required for an existing-stack UPDATE change set.',
);
assert(
  JSON.stringify(accessChangeSet.Capabilities ?? []) === JSON.stringify(['CAPABILITY_NAMED_IAM']),
  'Access approval change set must acknowledge only CAPABILITY_NAMED_IAM.',
);
const changes = accessChangeSet.Changes ?? [];
const nameChanged = currentParameters.ApprovedFoundationChangeSetName !== target.name;
const expiryChanged = currentParameters.FoundationExecutionApprovalExpiresAt !== target.expiry;
const expectedPermissionSets = new Set(['ReviewEmailOperatorPermissionSet']);
const expectedAssignments = new Map([
  ['ReviewEmailOperatorAssignment', 'ReviewEmailOperatorPermissionSet'],
]);
if (nameChanged) {
  expectedPermissionSets.add('ReviewEmailAuthorPermissionSet');
  expectedAssignments.set('ReviewEmailAuthorAssignment', 'ReviewEmailAuthorPermissionSet');
}
assert(
  changes.length === expectedPermissionSets.size + expectedAssignments.size,
  'Access approval change set has an unexpected resource count.',
);
for (const change of changes) {
  const resource = change?.ResourceChange;
  if (expectedPermissionSets.has(resource?.LogicalResourceId)) {
    assert(
      resource.Action === 'Modify' &&
        resource.ResourceType === 'AWS::SSO::PermissionSet' &&
        resource.Replacement !== 'True' &&
        resource.Replacement !== 'Conditional',
      'Access approval change set may modify expected permission sets only in place.',
    );
    expectedPermissionSets.delete(resource.LogicalResourceId);
    continue;
  }
  const permissionSetLogicalId = expectedAssignments.get(resource?.LogicalResourceId);
  assert(
    permissionSetLogicalId &&
      isDependencyOnlySsoAssignmentChange(
        resource,
        resource.LogicalResourceId,
        permissionSetLogicalId,
      ),
    'Access approval change set contains an unexpected assignment change.',
  );
  expectedAssignments.delete(resource.LogicalResourceId);
}
assert(expectedPermissionSets.size === 0, 'Access approval omitted an expected permission-set update.');
assert(expectedAssignments.size === 0, 'Access approval omitted an expected dependency-only assignment change.');
assert(nameChanged || expiryChanged, 'Approval update has no effective parameter change.');

runAws([
  'cloudformation',
  'execute-change-set',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  '--change-set-name',
  accessChangeSetName,
]);
runAws([
  'cloudformation',
  'wait',
  'stack-update-complete',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
]);
const updated = awsJson([
  'cloudformation',
  'describe-stacks',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
]).Stacks?.[0];
const updatedParameters = Object.fromEntries(
  (updated?.Parameters ?? []).map(({ ParameterKey, ParameterValue }) => [ParameterKey, ParameterValue]),
);
assert(updatedParameters.ApprovedFoundationChangeSetName === target.name, 'Approval name update did not persist.');
assert(updatedParameters.FoundationExecutionApprovalExpiresAt === target.expiry, 'Approval expiry update did not persist.');
assert(updated?.EnableTerminationProtection === true, 'Approval update disabled termination protection.');
process.stdout.write(`${JSON.stringify({ changed: true, mode, status: 'updated' }, null, 2)}\n`);

function approvalValues() {
  if (mode === 'close') {
    return { expiry: DISABLED_APPROVAL_EXPIRY, name: DISABLED_APPROVAL_NAME };
  }
  if (mode === 'stage') {
    if (expiresAt) fail('--expires-at is not allowed while staging a closed change-set name.');
    return { expiry: DISABLED_APPROVAL_EXPIRY, name: changeSetName };
  }
  if (!expiresAt) fail('--expires-at is required when opening execute approval.');
  const expiry = new Date(expiresAt);
  const now = Date.now();
  assert(Number.isFinite(expiry.getTime()), 'Approval expiry must be a valid UTC timestamp.');
  assert(
    expiry.toISOString().replace('.000Z', 'Z') === expiresAt,
    'Approval expiry must be canonical whole-second ISO UTC.',
  );
  assert(expiry.getTime() >= now + 60_000, 'Approval expiry must be at least one minute in the future.');
  assert(expiry.getTime() <= now + 15 * 60_000, 'Approval window must not exceed fifteen minutes.');
  assert(
    currentParameters.ApprovedFoundationChangeSetName === changeSetName,
    'The exact change-set name must already be staged before opening execute approval.',
  );
  return { expiry: expiresAt, name: changeSetName };
}

function awsJson(args) {
  const result = runAws(args);
  try {
    return JSON.parse(result.stdout || '{}');
  } catch {
    fail(`AWS CLI returned invalid JSON for ${args[0]} ${args[1]}.`);
  }
}

function runAws(args) {
  const result = spawnSync(
    awsCli,
    [...args, '--profile', adminProfile, '--region', region, '--output', 'json', '--no-cli-pager'],
    { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' },
  );
  if (result.status !== 0) fail(sanitize(result.stderr || result.stdout || `${args[0]} ${args[1]} failed.`));
  return result;
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function fail(message) {
  process.stderr.write(`${String(message).trim()}\n`);
  process.exit(1);
}

function sanitize(value) {
  return String(value)
    .replace(/arn:aws:[^\s"']+/g, '[redacted-arn]')
    .replace(/\b[A-Z0-9]{20}\b/g, '[redacted-access-key-id]')
    .trim();
}

function readOption(name) {
  const prefix = `${name}=`;
  const found = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length).trim() : '';
}

function resolveAwsCli() {
  if (process.env.AWS_CLI) return process.env.AWS_CLI;
  const candidates = [
    commandExistsOnPath('aws') ? 'aws' : '',
    process.env.ProgramFiles ? resolve(process.env.ProgramFiles, 'Amazon/AWSCLIV2/aws.exe') : '',
    process.env['ProgramFiles(x86)']
      ? resolve(process.env['ProgramFiles(x86)'], 'Amazon/AWSCLIV2/aws.exe')
      : '',
  ].filter(Boolean);
  return candidates.find((candidate) => candidate === 'aws' || existsSync(candidate)) || 'aws';
}

function commandExistsOnPath(command) {
  const probe = process.platform === 'win32' ? 'where.exe' : 'which';
  return spawnSync(probe, [command], { encoding: 'utf8', stdio: 'pipe' }).status === 0;
}
