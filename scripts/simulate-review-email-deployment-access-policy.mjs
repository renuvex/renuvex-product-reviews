import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  REVIEW_EMAIL_ACCOUNT_ID,
  REVIEW_EMAIL_REGION,
} from './lib/review-email-cloudformation-contract.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TEMPLATE_PATH = resolve(ROOT, 'infra/aws/review-email-deployment-access.cloudformation.json');
const profile = readOption('--profile') || process.env.AWS_PROFILE || 'renuvex-readonly';
const region = readOption('--region') || process.env.AWS_REGION || REVIEW_EMAIL_REGION;
const jsonOutput = process.argv.includes('--json');
const awsCli = resolveAwsCli();

if (region !== REVIEW_EMAIL_REGION) fail(`IAM simulation is locked to ${REVIEW_EMAIL_REGION}.`);
const template = JSON.parse(readFileSync(TEMPLATE_PATH, 'utf8'));
const approvedName = 'renuvex-review-email-foundation-0123456789ab-20990101';
const expiry = '2099-01-01T00:15:00Z';
const context = {
  'AWS::AccountId': REVIEW_EMAIL_ACCOUNT_ID,
  'AWS::Partition': 'aws',
  ApprovedFoundationChangeSetName: approvedName,
  ApprovedJournalChangeSetName: 'approval-disabled',
  ApprovedJournalIamChangeSetName: 'approval-disabled',
  DeploymentRegion: REVIEW_EMAIL_REGION,
  FoundationExecutionApprovalExpiresAt: expiry,
  JournalExecutionApprovalExpiresAt: '1970-01-01T00:00:00Z',
  JournalIamExecutionApprovalExpiresAt: '1970-01-01T00:00:00Z',
  TargetAccountId: REVIEW_EMAIL_ACCOUNT_ID,
};
const policy = renderTemplateValue(
  template.Resources.ReviewEmailOperatorPermissionSet.Properties.InlinePolicy,
  context,
);
const foundationServiceRolePolicy = renderTemplateValue(
  template.Resources.ReviewEmailFoundationCloudFormationRole.Properties.Policies[0].PolicyDocument,
  context,
);
const foundationStackArn =
  `arn:aws:cloudformation:${REVIEW_EMAIL_REGION}:${REVIEW_EMAIL_ACCOUNT_ID}:` +
  'stack/renuvex-review-email-foundation-prod/test-stack-id';
const foundationRoleArn =
  `arn:aws:iam::${REVIEW_EMAIL_ACCOUNT_ID}:role/renuvex/review-email/cloudformation/` +
  'renuvex-review-email-foundation-cfn';
const resourceTypes =
  template.Resources.ReviewEmailOperatorPermissionSet.Properties.InlinePolicy.Statement
    .find((statement) => statement.Sid === 'CreateFoundationChangeSetWithFoundationRole')
    .Condition['ForAllValues:StringEquals']['cloudformation:ResourceTypes'];
const foundationKeyArn = `arn:aws:kms:${REVIEW_EMAIL_REGION}:${REVIEW_EMAIL_ACCOUNT_ID}:key/00000000-0000-0000-0000-000000000000`;
const foundationTopicArn =
  `arn:aws:sns:${REVIEW_EMAIL_REGION}:${REVIEW_EMAIL_ACCOUNT_ID}:` +
  'renuvex-review-email-foundation-prod-events';
const foundationQueueArn =
  `arn:aws:sqs:${REVIEW_EMAIL_REGION}:${REVIEW_EMAIL_ACCOUNT_ID}:` +
  'renuvex-review-email-foundation-prod-events-dlq';
const foundationConfigurationSetArn =
  `arn:aws:ses:${REVIEW_EMAIL_REGION}:${REVIEW_EMAIL_ACCOUNT_ID}:` +
  'configuration-set/renuvex-review-requests-prod';
const foundationIdentityArn =
  `arn:aws:ses:${REVIEW_EMAIL_REGION}:${REVIEW_EMAIL_ACCOUNT_ID}:identity/reviews.renuvex.app`;
const validCreateContext = [
  entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION]),
  entry('aws:RequestTag/Environment', ['production']),
  entry('aws:RequestTag/Project', ['renuvex-product-reviews']),
  entry('aws:RequestTag/Purpose', ['review-request-email']),
  entry('aws:RequestTag/SourceCommit', ['a'.repeat(40)]),
  entry('aws:RequestTag/TemplateDigest', ['b'.repeat(64)]),
  entry(
    'aws:TagKeys',
    ['Environment', 'Project', 'Purpose', 'SourceCommit', 'TemplateDigest'],
    'stringList',
  ),
  entry('cloudformation:ChangeSetName', [approvedName]),
  entry('cloudformation:RoleArn', [foundationRoleArn]),
  entry('cloudformation:ResourceTypes', resourceTypes, 'stringList'),
];

const scenarios = [
  {
    action: 'cloudformation:CreateChangeSet',
    contextEntries: validCreateContext,
    expected: 'allowed',
    name: 'create exact foundation change set',
    resource: foundationStackArn,
  },
  {
    action: 'cloudformation:CreateChangeSet',
    contextEntries: validCreateContext.filter(
      ({ ContextKeyName }) => ContextKeyName !== 'cloudformation:ResourceTypes',
    ),
    expected: 'implicitDeny',
    name: 'create without ResourceTypes',
    resource: foundationStackArn,
  },
  {
    action: 'cloudformation:CreateChangeSet',
    contextEntries: replaceContext(
      validCreateContext,
      'cloudformation:ResourceTypes',
      ['AWS::Lambda::Function'],
      'stringList',
    ),
    expected: 'implicitDeny',
    name: 'create with unapproved resource type',
    resource: foundationStackArn,
  },
  {
    action: 'cloudformation:CreateChangeSet',
    contextEntries: replaceContext(
      validCreateContext,
      'cloudformation:ChangeSetName',
      ['renuvex-review-email-foundation-unapproved'],
    ),
    expected: 'implicitDeny',
    name: 'create with unapproved name',
    resource: foundationStackArn,
  },
  {
    action: 'cloudformation:CreateChangeSet',
    contextEntries: replaceContext(
      validCreateContext,
      'cloudformation:RoleArn',
      [`arn:aws:iam::${REVIEW_EMAIL_ACCOUNT_ID}:role/unapproved`],
    ),
    expected: 'implicitDeny',
    name: 'create with wrong service role',
    resource: foundationStackArn,
  },
  {
    action: 'cloudformation:CreateChangeSet',
    contextEntries: validCreateContext,
    expected: 'implicitDeny',
    name: 'create on wrong stack',
    resource:
      `arn:aws:cloudformation:${REVIEW_EMAIL_REGION}:${REVIEW_EMAIL_ACCOUNT_ID}:` +
      'stack/unapproved/test-stack-id',
  },
  {
    action: 'cloudformation:ExecuteChangeSet',
    contextEntries: [
      entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION]),
      entry('aws:CurrentTime', ['2099-01-01T00:10:00Z'], 'date'),
      entry('cloudformation:ChangeSetName', [approvedName]),
    ],
    expected: 'allowed',
    name: 'execute exact approved name before expiry',
    resource: foundationStackArn,
  },
  {
    action: 'cloudformation:ExecuteChangeSet',
    contextEntries: [
      entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION]),
      entry('aws:CurrentTime', ['2099-01-01T00:16:00Z'], 'date'),
      entry('cloudformation:ChangeSetName', [approvedName]),
    ],
    expected: 'implicitDeny',
    name: 'execute after expiry',
    resource: foundationStackArn,
  },
  {
    action: 'cloudformation:ExecuteChangeSet',
    contextEntries: [
      entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION]),
      entry('aws:CurrentTime', ['2099-01-01T00:10:00Z'], 'date'),
      entry('cloudformation:ChangeSetName', ['renuvex-review-email-foundation-unapproved']),
    ],
    expected: 'implicitDeny',
    name: 'execute wrong name',
    resource: foundationStackArn,
  },
  {
    action: 'cloudformation:DeleteChangeSet',
    contextEntries: [],
    expected: 'implicitDeny',
    name: 'delete staged change set',
    resource: foundationStackArn,
  },
  {
    action: 'cloudformation:SetStackPolicy',
    contextEntries: [],
    expected: 'implicitDeny',
    name: 'set stack policy',
    resource: foundationStackArn,
  },
  {
    action: 'cloudformation:UpdateTerminationProtection',
    contextEntries: [],
    expected: 'implicitDeny',
    name: 'disable termination protection',
    resource: foundationStackArn,
  },
  {
    action: 'ses:SendEmail',
    contextEntries: [],
    expected: 'implicitDeny',
    name: 'direct SES send',
    resource: '*',
  },
  {
    action: 'iam:PassRole',
    contextEntries: [entry('iam:PassedToService', ['cloudformation.amazonaws.com'])],
    expected: 'allowed',
    name: 'pass exact foundation service role',
    resource: foundationRoleArn,
  },
  {
    action: 'iam:PassRole',
    contextEntries: [entry('iam:PassedToService', ['cloudformation.amazonaws.com'])],
    expected: 'implicitDeny',
    name: 'pass unapproved role',
    resource: `arn:aws:iam::${REVIEW_EMAIL_ACCOUNT_ID}:role/unapproved`,
  },
  {
    action: 'kms:ScheduleKeyDeletion',
    contextEntries: [
      entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION]),
      entry('aws:ResourceTag/Environment', ['production']),
      entry('aws:ResourceTag/Project', ['renuvex-product-reviews']),
      entry('aws:ResourceTag/Purpose', ['review-request-email']),
      entry('kms:ScheduleKeyDeletionPendingWindowInDays', ['7'], 'numeric'),
    ],
    expected: 'allowed',
    name: 'schedule exact tagged KMS key for seven-day deletion',
    policy: foundationServiceRolePolicy,
    resource: foundationKeyArn,
  },
  {
    action: 'kms:ScheduleKeyDeletion',
    contextEntries: [
      entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION]),
      entry('aws:ResourceTag/Environment', ['production']),
      entry('aws:ResourceTag/Project', ['renuvex-product-reviews']),
      entry('aws:ResourceTag/Purpose', ['review-request-email']),
      entry('kms:ScheduleKeyDeletionPendingWindowInDays', ['30'], 'numeric'),
    ],
    expected: 'implicitDeny',
    name: 'schedule KMS key with wrong pending window',
    policy: foundationServiceRolePolicy,
    resource: foundationKeyArn,
  },
  {
    action: 'kms:ScheduleKeyDeletion',
    contextEntries: [
      entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION]),
      entry('aws:ResourceTag/Environment', ['production']),
      entry('aws:ResourceTag/Project', ['renuvex-product-reviews']),
      entry('aws:ResourceTag/Purpose', ['wrong-purpose']),
      entry('kms:ScheduleKeyDeletionPendingWindowInDays', ['7'], 'numeric'),
    ],
    expected: 'implicitDeny',
    name: 'schedule KMS key with wrong purpose tag',
    policy: foundationServiceRolePolicy,
    resource: foundationKeyArn,
  },
  {
    action: 'sns:DeleteTopic',
    contextEntries: [entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION])],
    expected: 'allowed',
    name: 'delete exact foundation topic during rollback',
    policy: foundationServiceRolePolicy,
    resource: foundationTopicArn,
  },
  {
    action: 'sns:DeleteTopic',
    contextEntries: [entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION])],
    expected: 'implicitDeny',
    name: 'delete unrelated topic',
    policy: foundationServiceRolePolicy,
    resource: `arn:aws:sns:${REVIEW_EMAIL_REGION}:${REVIEW_EMAIL_ACCOUNT_ID}:unrelated`,
  },
  {
    action: 'sqs:DeleteQueue',
    contextEntries: [entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION])],
    expected: 'allowed',
    name: 'delete exact foundation queue during rollback',
    policy: foundationServiceRolePolicy,
    resource: foundationQueueArn,
  },
  {
    action: 'ses:DeleteConfigurationSet',
    contextEntries: [entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION])],
    expected: 'allowed',
    name: 'delete exact configuration set during rollback',
    policy: foundationServiceRolePolicy,
    resource: foundationConfigurationSetArn,
  },
  {
    action: 'ses:DeleteEmailIdentity',
    contextEntries: [entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION])],
    expected: 'allowed',
    name: 'delete exact identity during rollback',
    policy: foundationServiceRolePolicy,
    resource: foundationIdentityArn,
  },
  {
    action: 'ses:SendEmail',
    contextEntries: [entry('aws:RequestedRegion', [REVIEW_EMAIL_REGION])],
    expected: 'implicitDeny',
    name: 'foundation service role cannot send',
    policy: foundationServiceRolePolicy,
    resource: foundationIdentityArn,
  },
];

const results = scenarios.map(simulate);
const failed = results.filter(({ actual, expected }) => actual !== expected);
if (failed.length > 0) {
  for (const item of failed) {
    process.stderr.write(`${item.name}: expected ${item.expected}, received ${item.actual}\n`);
  }
  process.exit(1);
}

if (jsonOutput) {
  process.stdout.write(`${JSON.stringify({ count: results.length, results }, null, 2)}\n`);
} else {
  process.stdout.write(`review-email deployment-access IAM simulation passed (${results.length} scenarios)\n`);
}

function simulate(scenario) {
  const input = {
    ActionNames: [scenario.action],
    ContextEntries: scenario.contextEntries,
    PolicyInputList: [JSON.stringify(scenario.policy ?? policy)],
    ResourceArns: [scenario.resource],
  };
  const response = awsJson([
    'iam',
    'simulate-custom-policy',
    '--cli-input-json',
    JSON.stringify(input),
  ]);
  const evaluation = response.EvaluationResults?.[0];
  assert(evaluation, `IAM simulator returned no result for ${scenario.name}.`);
  return {
    actual: evaluation.EvalDecision,
    expected: scenario.expected,
    name: scenario.name,
  };
}

function entry(ContextKeyName, ContextKeyValues, ContextKeyType = 'string') {
  return { ContextKeyName, ContextKeyType, ContextKeyValues };
}

function replaceContext(entries, key, values, type = 'string') {
  return [
    ...entries.filter(({ ContextKeyName }) => ContextKeyName !== key),
    entry(key, values, type),
  ];
}

function renderTemplateValue(value, renderContext) {
  if (Array.isArray(value)) return value.map((item) => renderTemplateValue(item, renderContext));
  if (!value || typeof value !== 'object') return value;
  if (typeof value.Ref === 'string') {
    assert(value.Ref in renderContext, `Unresolved CloudFormation Ref: ${value.Ref}.`);
    return renderContext[value.Ref];
  }
  if (value['Fn::Sub']) {
    const [templateString, variables = {}] = Array.isArray(value['Fn::Sub'])
      ? value['Fn::Sub']
      : [value['Fn::Sub'], {}];
    const replacements = {
      ...renderContext,
      ...Object.fromEntries(
        Object.entries(variables).map(([key, item]) => [key, renderTemplateValue(item, renderContext)]),
      ),
    };
    return templateString.replace(/\$\{([^}]+)\}/g, (_, key) => {
      assert(key in replacements, `Unresolved CloudFormation substitution: ${key}.`);
      return String(replacements[key]);
    });
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, renderTemplateValue(item, renderContext)]),
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
