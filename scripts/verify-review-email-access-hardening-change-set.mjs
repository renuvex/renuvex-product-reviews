import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  REVIEW_EMAIL_ACCOUNT_ID,
  REVIEW_EMAIL_REGION,
  canonicalJsonSha256,
  parseJsonDocument,
} from './lib/review-email-cloudformation-contract.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TEMPLATE_PATH = resolve(ROOT, 'infra/aws/review-email-deployment-access.cloudformation.json');
const profile = readOption('--profile') || process.env.AWS_PROFILE || 'renuvex-readonly';
const region = readOption('--region') || process.env.AWS_REGION || REVIEW_EMAIL_REGION;
const changeSetName = readOption('--change-set-name');
const jsonOutput = process.argv.includes('--json');
const awsCli = resolveAwsCli();

if (!changeSetName) fail('--change-set-name is required.');
if (!/^renuvex-review-email-access-hardening-[a-z0-9][a-z0-9-]{0,95}$/.test(changeSetName)) {
  fail('Access hardening change-set name is invalid.');
}
if (region !== REVIEW_EMAIL_REGION) fail(`Access hardening is locked to ${REVIEW_EMAIL_REGION}.`);
if (!existsSync(TEMPLATE_PATH)) fail(`Missing deployment-access template: ${TEMPLATE_PATH}`);

const sourceTemplate = JSON.parse(readFileSync(TEMPLATE_PATH, 'utf8'));
const sourceTemplateDigest = canonicalJsonSha256(sourceTemplate);
const caller = awsJson(['sts', 'get-caller-identity']);
assert(caller.Account === REVIEW_EMAIL_ACCOUNT_ID, 'AWS caller account is not the locked account.');

const stack = awsJson([
  'cloudformation',
  'describe-stacks',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
]).Stacks?.[0];
assert(stack, 'Deployment-access stack is missing.');
assert(stack.EnableTerminationProtection === true, 'Access stack termination protection must remain enabled.');
assert(
  ['CREATE_COMPLETE', 'UPDATE_COMPLETE'].includes(stack.StackStatus),
  `Access stack is not stable: ${stack.StackStatus}.`,
);

const changeSet = awsJson([
  'cloudformation',
  'describe-change-set',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  '--change-set-name',
  changeSetName,
]);
assert(changeSet.ChangeSetType === 'UPDATE', 'Access hardening must use an UPDATE change set.');
assert(changeSet.Status === 'CREATE_COMPLETE', 'Access hardening change set is not complete.');
assert(changeSet.ExecutionStatus === 'AVAILABLE', 'Access hardening change set is not executable.');
assert(
  JSON.stringify(changeSet.Capabilities ?? []) === JSON.stringify(['CAPABILITY_NAMED_IAM']),
  'Access hardening must acknowledge only CAPABILITY_NAMED_IAM.',
);
assert(!changeSet.RoleARN, 'Bootstrap access stack must not gain a CloudFormation service role.');
assert(changeSet.IncludeNestedStacks !== true, 'Access hardening must not include nested stacks.');
assert(changeSet.ImportExistingResources !== true, 'Access hardening must not import resources.');

const submitted = awsJson([
  'cloudformation',
  'get-template',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  '--change-set-name',
  changeSetName,
  '--template-stage',
  'Original',
]);
const submittedTemplate = parseJsonDocument(submitted.TemplateBody, 'Original access change-set template');
assert(
  canonicalJsonSha256(submittedTemplate) === sourceTemplateDigest,
  'Access change-set template digest differs from source.',
);

const expectedChanges = {
  ReviewEmailFoundationCloudFormationRole: 'AWS::IAM::Role',
  ReviewEmailOperatorPermissionSet: 'AWS::SSO::PermissionSet',
};
const actualChanges = {};
for (const change of changeSet.Changes ?? []) {
  assert(change.Type === 'Resource', 'Access hardening may contain only resource changes.');
  const resource = change.ResourceChange;
  assert(resource?.Action === 'Modify', `${resource?.LogicalResourceId ?? 'unknown'} must be an in-place Modify.`);
  assert(
    resource.Replacement !== 'True' && resource.Replacement !== 'Conditional',
    `${resource.LogicalResourceId} must not be replaced.`,
  );
  actualChanges[resource.LogicalResourceId] = resource.ResourceType;
}
assertDeepEqual(actualChanges, expectedChanges, 'Access hardening resource diff');

const changeSetParameters = Object.fromEntries(
  (changeSet.Parameters ?? []).map(({ ParameterKey, ParameterValue }) => [ParameterKey, ParameterValue]),
);
for (const [name, definition] of Object.entries(sourceTemplate.Parameters ?? {})) {
  assert(
    name in changeSetParameters || 'Default' in definition,
    `Access hardening change set does not resolve parameter ${name}.`,
  );
  if (!(name in changeSetParameters)) changeSetParameters[name] = definition.Default;
}
for (const [name, expected] of Object.entries({
  ApprovedFoundationChangeSetName: 'approval-disabled',
  ApprovedJournalChangeSetName: 'approval-disabled',
  ApprovedJournalIamChangeSetName: 'approval-disabled',
  FoundationExecutionApprovalExpiresAt: '1970-01-01T00:00:00Z',
  JournalExecutionApprovalExpiresAt: '1970-01-01T00:00:00Z',
  JournalIamExecutionApprovalExpiresAt: '1970-01-01T00:00:00Z',
})) {
  assert(changeSetParameters[name] === expected, `${name} must be fail-closed in the hardening update.`);
}

const renderContext = {
  ...changeSetParameters,
  'AWS::AccountId': REVIEW_EMAIL_ACCOUNT_ID,
  'AWS::Partition': 'aws',
};
const newOperatorPolicy = renderTemplateValue(
  sourceTemplate.Resources.ReviewEmailOperatorPermissionSet.Properties.InlinePolicy,
  renderContext,
);
const permissionSetPhysicalId = awsJson([
  'cloudformation',
  'describe-stack-resource',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  '--logical-resource-id',
  'ReviewEmailOperatorPermissionSet',
]).StackResourceDetail?.PhysicalResourceId;
assert(permissionSetPhysicalId, 'Live operator permission-set ARN is missing.');
const currentOperatorPolicy = parseJsonDocument(
  awsJson([
    'sso-admin',
    'get-inline-policy-for-permission-set',
    '--instance-arn',
    changeSetParameters.IdentityCenterInstanceArn,
    '--permission-set-arn',
    permissionSetPhysicalId,
  ]).InlinePolicy,
  'Live operator policy',
);
assertActionDelta(
  currentOperatorPolicy,
  newOperatorPolicy,
  [],
  ['cloudformation:DeleteChangeSet'],
  'Operator policy',
);

const newFoundationPolicy =
  sourceTemplate.Resources.ReviewEmailFoundationCloudFormationRole.Properties.Policies[0].PolicyDocument;
const currentFoundationPolicy = parseJsonDocument(
  awsJson([
    'iam',
    'get-role-policy',
    '--role-name',
    'renuvex-review-email-foundation-cfn',
    '--policy-name',
    'review-email-foundation-cloudformation',
  ]).PolicyDocument,
  'Live foundation service-role policy',
);
assertActionDelta(
  currentFoundationPolicy,
  renderTemplateValue(newFoundationPolicy, renderContext),
  [
    'kms:ScheduleKeyDeletion',
    'ses:DeleteConfigurationSet',
    'ses:DeleteEmailIdentity',
    'sns:DeleteTopic',
    'sqs:DeleteQueue',
  ],
  [],
  'Foundation service-role policy',
);

report({
  account: REVIEW_EMAIL_ACCOUNT_ID,
  changeSetName,
  mode: 'read-only',
  modifiedResources: Object.keys(expectedChanges).sort(),
  operatorActionsRemoved: ['cloudformation:DeleteChangeSet'],
  serviceRoleActionsAdded: [
    'kms:ScheduleKeyDeletion',
    'ses:DeleteConfigurationSet',
    'ses:DeleteEmailIdentity',
    'sns:DeleteTopic',
    'sqs:DeleteQueue',
  ],
  sourceTemplateDigest,
  status: 'verified',
});

function assertActionDelta(before, after, expectedAdded, expectedRemoved, label) {
  const beforeActions = actionSet(before);
  const afterActions = actionSet(after);
  const added = [...afterActions].filter((action) => !beforeActions.has(action)).sort();
  const removed = [...beforeActions].filter((action) => !afterActions.has(action)).sort();
  assertDeepEqual(added, [...expectedAdded].sort(), `${label} added actions`);
  assertDeepEqual(removed, [...expectedRemoved].sort(), `${label} removed actions`);
}

function actionSet(policy) {
  const statements = Array.isArray(policy?.Statement) ? policy.Statement : [policy?.Statement].filter(Boolean);
  return new Set(
    statements.flatMap((statement) =>
      Array.isArray(statement.Action) ? statement.Action : [statement.Action].filter(Boolean)),
  );
}

function renderTemplateValue(value, context) {
  if (Array.isArray(value)) return value.map((item) => renderTemplateValue(item, context));
  if (!value || typeof value !== 'object') return value;
  if (typeof value.Ref === 'string') {
    assert(value.Ref in context, `Unresolved CloudFormation Ref: ${value.Ref}.`);
    return context[value.Ref];
  }
  if (value['Fn::Sub']) {
    const [templateString, variables = {}] = Array.isArray(value['Fn::Sub'])
      ? value['Fn::Sub']
      : [value['Fn::Sub'], {}];
    const replacements = {
      ...context,
      ...Object.fromEntries(
        Object.entries(variables).map(([key, item]) => [key, renderTemplateValue(item, context)]),
      ),
    };
    return templateString.replace(/\$\{([^}]+)\}/g, (_, key) => {
      assert(key in replacements, `Unresolved CloudFormation substitution: ${key}.`);
      return String(replacements[key]);
    });
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, renderTemplateValue(item, context)]),
  );
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
    `${label} does not match the approved hardening contract.`,
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
    .replace(/\bd-[0-9a-f]{10}\b/gi, '[redacted-identity-store-id]')
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
  process.stdout.write(`review-email access hardening change set verified: ${summary.changeSetName}\n`);
}
