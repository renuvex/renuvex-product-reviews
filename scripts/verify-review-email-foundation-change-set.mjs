import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  FOUNDATION_STACK_TAGS,
  REVIEW_EMAIL_ACCOUNT_ID,
  REVIEW_EMAIL_FOUNDATION_ROLE_NAME,
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  REVIEW_EMAIL_REGION,
  canonicalJsonSha256,
  declaredResourceTypes,
  effectiveResourceLogicalIds,
  parseJsonDocument,
  readStrictJsonFile,
} from './lib/review-email-cloudformation-contract.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TEMPLATE_PATH = resolve(ROOT, 'infra/aws/review-email-foundation.cloudformation.json');
const STACK_POLICY_PATH = resolve(ROOT, 'infra/aws/review-email-foundation.stack-policy.json');
const profile = readOption('--profile') || process.env.AWS_PROFILE || 'renuvex-readonly';
const region = readOption('--region') || process.env.AWS_REGION || REVIEW_EMAIL_REGION;
const changeSetName = readOption('--change-set-name');
const jsonOutput = process.argv.includes('--json');
const awsCli = resolveAwsCli();

if (!changeSetName) fail('--change-set-name is required.');
if (!/^renuvex-review-email-foundation-[a-z0-9][a-z0-9-]{0,95}$/.test(changeSetName)) {
  fail('Change-set name does not match the locked foundation prefix.');
}
if (region !== REVIEW_EMAIL_REGION) fail(`Foundation verification is locked to ${REVIEW_EMAIL_REGION}.`);
if (!existsSync(TEMPLATE_PATH)) fail(`Missing foundation template: ${TEMPLATE_PATH}`);
if (!existsSync(STACK_POLICY_PATH)) fail(`Missing foundation stack policy: ${STACK_POLICY_PATH}`);

const template = readStrictJsonFile(TEMPLATE_PATH, 'foundation template');
const templateDigest = canonicalJsonSha256(template);
const stackPolicyDigest = canonicalJsonSha256(
  readStrictJsonFile(STACK_POLICY_PATH, 'foundation stack policy'),
);
const sourceCommit = git(['rev-parse', 'HEAD']).trim();
const originMain = git(['rev-parse', 'origin/main']).trim();
assert(/^[a-f0-9]{40}$/.test(sourceCommit), 'Current source commit is not a full Git SHA.');
assert(sourceCommit === originMain, 'Current source commit must match origin/main before AWS mutation.');
assert(gitStatusIsClean(), 'Working tree must be clean before foundation change-set acceptance.');

const caller = awsJson(['sts', 'get-caller-identity']);
assert(caller.Account === REVIEW_EMAIL_ACCOUNT_ID, 'AWS caller account does not match the locked account.');

const expectedRoleArn =
  `arn:aws:iam::${REVIEW_EMAIL_ACCOUNT_ID}:role/renuvex/review-email/cloudformation/` +
  REVIEW_EMAIL_FOUNDATION_ROLE_NAME;
const changeSet = awsJson([
  'cloudformation',
  'describe-change-set',
  '--change-set-name',
  changeSetName,
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
]);

assert(changeSet.StackName === REVIEW_EMAIL_FOUNDATION_STACK_NAME, 'Change set targets the wrong stack.');
assert(changeSet.ChangeSetName === changeSetName, 'CloudFormation returned a different change-set name.');
assert(changeSet.Status === 'CREATE_COMPLETE', `Change set is not complete: ${changeSet.Status}.`);
assert(changeSet.ExecutionStatus === 'AVAILABLE', `Change set is not executable: ${changeSet.ExecutionStatus}.`);
assert(changeSet.RoleARN === expectedRoleArn, 'Change set uses the wrong CloudFormation service role.');
assert(changeSet.OnStackFailure === 'ROLLBACK', 'CREATE change set must use OnStackFailure=ROLLBACK.');
assert(changeSet.IncludeNestedStacks !== true, 'Nested stacks are not allowed.');
assert(changeSet.ImportExistingResources !== true, 'Auto-import is not allowed.');
assert((changeSet.Capabilities ?? []).length === 0, 'Foundation change set must not declare IAM capabilities.');
assert((changeSet.NotificationARNs ?? []).length === 0, 'Foundation change set must not attach notification ARNs.');
assert(
  (changeSet.RollbackConfiguration?.RollbackTriggers ?? []).length === 0,
  'Foundation change set must not add unreviewed rollback triggers.',
);
const pendingStack = awsJson([
  'cloudformation',
  'describe-stacks',
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
]).Stacks?.[0];
assert(pendingStack?.StackId === changeSet.StackId, 'CREATE change set is not attached to its placeholder stack.');
assert(
  pendingStack?.StackStatus === 'REVIEW_IN_PROGRESS',
  `Foundation placeholder stack has an unexpected status: ${pendingStack?.StackStatus ?? 'missing'}.`,
);

const expectedParameters = Object.fromEntries(
  Object.entries(template.Parameters ?? {}).map(([name, definition]) => [name, definition.Default ?? '']),
);
const actualParameters = Object.fromEntries(
  (changeSet.Parameters ?? []).map(({ ParameterKey, ParameterValue }) => [ParameterKey, ParameterValue ?? '']),
);
assertDeepEqual(actualParameters, expectedParameters, 'Change-set parameters');

const actualTags = Object.fromEntries((changeSet.Tags ?? []).map(({ Key, Value }) => [Key, Value]));
const expectedTags = {
  ...FOUNDATION_STACK_TAGS,
  SourceCommit: sourceCommit,
  StackPolicyDigest: stackPolicyDigest,
  TemplateDigest: templateDigest,
};
assertDeepEqual(actualTags, expectedTags, 'Change-set provenance tags');

const templateResponse = awsJson([
  'cloudformation',
  'get-template',
  '--change-set-name',
  changeSetName,
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  '--template-stage',
  'Original',
]);
assert(
  (templateResponse.StagesAvailable ?? []).includes('Original'),
  'CloudFormation did not expose the Original template stage.',
);
const submittedTemplate = parseJsonDocument(templateResponse.TemplateBody, 'Original change-set template');
const submittedDigest = canonicalJsonSha256(submittedTemplate);
assert(submittedDigest === templateDigest, 'Canonical change-set template digest differs from local source.');

const expectedLogicalIds = effectiveResourceLogicalIds(template, expectedParameters);
const expectedResources = Object.fromEntries(
  expectedLogicalIds.map((logicalId) => [logicalId, template.Resources[logicalId].Type]),
);
const changes = changeSet.Changes ?? [];
assert(changes.length === expectedLogicalIds.length, 'Change-set resource count does not match the effective template.');
const actualResources = {};
for (const change of changes) {
  assert(change.Type === 'Resource', 'Foundation change set may contain only resource changes.');
  const resource = change.ResourceChange;
  assert(resource?.Action === 'Add', `Unexpected ${resource?.Action ?? 'unknown'} for ${resource?.LogicalResourceId ?? 'unknown'}.`);
  assert(resource.Replacement === undefined || resource.Replacement === 'False', `${resource.LogicalResourceId} must not be a replacement.`);
  assert((resource.Details ?? []).every((detail) => detail.ChangeSource !== 'Import'), `${resource.LogicalResourceId} must not be imported.`);
  actualResources[resource.LogicalResourceId] = resource.ResourceType;
}
assertDeepEqual(actualResources, expectedResources, 'Effective change-set resource inventory');

report({
  account: REVIEW_EMAIL_ACCOUNT_ID,
  canonicalTemplateDigest: templateDigest,
  changeSetName,
  declaredResourceTypes: declaredResourceTypes(template),
  effectiveResourceCount: expectedLogicalIds.length,
  mode: 'read-only',
  onStackFailure: 'ROLLBACK',
  region,
  sourceCommit,
  stackPolicyDigest,
  stackName: REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  status: 'verified',
  templateStage: 'Original',
});

function gitStatusIsClean() {
  const result = spawnSync('git', ['diff', '--quiet'], { cwd: ROOT, stdio: 'pipe' });
  const staged = spawnSync('git', ['diff', '--cached', '--quiet'], { cwd: ROOT, stdio: 'pipe' });
  const untracked = git(['ls-files', '--others', '--exclude-standard']).trim();
  return result.status === 0 && staged.status === 0 && untracked === '';
}

function git(args) {
  const result = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
  if (result.status !== 0) fail(result.stderr || result.stdout || `git ${args[0]} failed.`);
  return result.stdout;
}

function awsJson(args) {
  const result = spawnSync(
    awsCli,
    [...args, '--profile', profile, '--region', region, '--output', 'json', '--no-cli-pager'],
    { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' },
  );
  if (result.status !== 0) fail(sanitize(result.stderr || result.stdout || `${args[0]} ${args[1]} failed.`));
  try {
    return JSON.parse(result.stdout || '{}');
  } catch {
    fail(`AWS CLI returned invalid JSON for ${args[0]} ${args[1]}.`);
  }
}

function assertDeepEqual(actual, expected, label) {
  assert(
    canonicalJsonSha256(actual) === canonicalJsonSha256(expected),
    `${label} does not match the approved source contract.`,
  );
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

function report(summary) {
  if (jsonOutput) {
    process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
    return;
  }
  process.stdout.write(
    `review-email foundation change set verified: ${summary.changeSetName} (${summary.effectiveResourceCount} resources)\n`,
  );
}
