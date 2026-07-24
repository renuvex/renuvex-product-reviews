import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  FOUNDATION_STACK_TAGS,
  REVIEW_EMAIL_ACCOUNT_ID,
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  REVIEW_EMAIL_REGION,
  canonicalJsonSha256,
  effectiveResourceLogicalIds,
  gitCommitIsAncestor,
  materializeStackPolicy,
  parseJsonDocument,
  readStrictJsonAtGitCommit,
  readStrictJsonFile,
} from './lib/review-email-cloudformation-contract.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TEMPLATE_PATH = resolve(ROOT, 'infra/aws/review-email-foundation.cloudformation.json');
const STACK_POLICY_PATH = resolve(ROOT, 'infra/aws/review-email-foundation.stack-policy.json');
const profile = readOption('--profile') || process.env.AWS_PROFILE || 'renuvex-readonly';
const region = readOption('--region') || process.env.AWS_REGION || REVIEW_EMAIL_REGION;
const expectation = readOption('--expect') || 'absent';
const jsonOutput = process.argv.includes('--json');
const awsCli = resolveAwsCli();

if (!['absent', 'deployed-pending-dns'].includes(expectation)) {
  fail('--expect must be absent or deployed-pending-dns.');
}
if (region !== REVIEW_EMAIL_REGION) fail(`Foundation verification is locked to ${REVIEW_EMAIL_REGION}.`);
const template = readStrictJsonFile(TEMPLATE_PATH, 'foundation template');
const stackPolicy = readStrictJsonFile(STACK_POLICY_PATH, 'foundation stack policy');
const templateDigest = canonicalJsonSha256(template);
const stackPolicyDigest = canonicalJsonSha256(stackPolicy);
const defaults = Object.fromEntries(
  Object.entries(template.Parameters ?? {}).map(([name, definition]) => [name, definition.Default ?? '']),
);
const expectedLogicalIds = effectiveResourceLogicalIds(template, defaults);
const effectiveStackPolicy = materializeStackPolicy(stackPolicy, expectedLogicalIds);
const effectiveStackPolicyDigest = canonicalJsonSha256(effectiveStackPolicy);

const caller = awsJson(['sts', 'get-caller-identity']);
assert(caller.Account === REVIEW_EMAIL_ACCOUNT_ID, 'AWS caller account is not the locked account.');

const stack = optionalAwsJson(
  ['cloudformation', 'describe-stacks', '--stack-name', REVIEW_EMAIL_FOUNDATION_STACK_NAME],
  isCloudFormationNotFound,
)?.Stacks?.[0] ?? null;
const configurationSet = optionalAwsJson(
  ['sesv2', 'get-configuration-set', '--configuration-set-name', defaults.ConfigurationSetName],
  isNotFound,
);
const identity = optionalAwsJson(
  ['sesv2', 'get-email-identity', '--email-identity', defaults.SenderDomain],
  isNotFound,
);
const alias = findExpectedAlias();
const topicArn = findExpectedTopicArn();
const queueUrl = optionalAwsJson(
  ['sqs', 'get-queue-url', '--queue-name', `${REVIEW_EMAIL_FOUNDATION_STACK_NAME}-events-dlq`],
  isNotFound,
)?.QueueUrl ?? null;
const taggedKeys = findTaggedFoundationKeys();
const senderSurface = findSenderSurface();

if (expectation === 'absent') {
  assert(stack === null, 'Foundation stack must be absent.');
  assert(configurationSet === null, 'Foundation SES configuration set must be absent.');
  assert(identity === null, 'Foundation SES identity must be absent.');
  assert(alias === null, 'Foundation KMS alias must be absent.');
  assert(topicArn === null, 'Foundation SNS topic must be absent.');
  assert(queueUrl === null, 'Foundation SQS DLQ must be absent.');
  assert(taggedKeys.length === 0, 'Tagged orphan foundation KMS key exists.');
  assert(senderSurface.total === 0, 'Sender/Lambda/Scheduler/tenant resources must remain absent.');
  report({
    account: REVIEW_EMAIL_ACCOUNT_ID,
    expectation,
    foundationResourceCount: 0,
    region,
    senderResourceCount: 0,
    stackStatus: 'ABSENT',
  });
  process.exit(0);
}

assert(stack?.StackStatus === 'CREATE_COMPLETE', 'Foundation stack must be CREATE_COMPLETE.');
assert(stack.EnableTerminationProtection === true, 'Foundation termination protection must be enabled.');
assert(configurationSet, 'Foundation SES configuration set is missing.');
assert(identity, 'Foundation SES identity is missing.');
assert(alias, 'Foundation KMS alias is missing.');
assert(topicArn, 'Foundation SNS topic is missing.');
assert(queueUrl, 'Foundation SQS DLQ is missing.');
assert(taggedKeys.length === 1, 'Expected exactly one tagged foundation KMS key.');
assert(senderSurface.total === 0, 'Sender/Lambda/Scheduler/tenant resources must remain absent.');

const stackParameters = Object.fromEntries(
  (stack.Parameters ?? []).map(({ ParameterKey, ParameterValue }) => [ParameterKey, ParameterValue]),
);
assertDeepEqual(stackParameters, defaults, 'Foundation stack parameters');
const sourceCommit = stack.Tags?.find(({ Key }) => Key === 'SourceCommit')?.Value;
assert(/^[a-f0-9]{40}$/.test(sourceCommit ?? ''), 'Foundation SourceCommit tag is invalid.');
assert(
  gitCommitIsAncestor(ROOT, sourceCommit, 'origin/main'),
  'Foundation SourceCommit is not an ancestor of origin/main.',
);
assert(
  canonicalJsonSha256(
    readStrictJsonAtGitCommit(
      ROOT,
      sourceCommit,
      'infra/aws/review-email-foundation.cloudformation.json',
      'tagged foundation template',
    ),
  ) === templateDigest,
  'Current foundation template differs from the tagged source commit.',
);
assert(
  canonicalJsonSha256(
    readStrictJsonAtGitCommit(
      ROOT,
      sourceCommit,
      'infra/aws/review-email-foundation.stack-policy.json',
      'tagged foundation stack policy',
    ),
  ) === stackPolicyDigest,
  'Current foundation stack policy differs from the tagged source commit.',
);
assertDeepEqual(
  Object.fromEntries((stack.Tags ?? []).map(({ Key, Value }) => [Key, Value])),
  {
    ...FOUNDATION_STACK_TAGS,
    SourceCommit: sourceCommit,
    StackPolicyDigest: stackPolicyDigest,
    TemplateDigest: templateDigest,
  },
  'Foundation stack tags',
);

const storedTemplate = awsJson([
  'cloudformation',
  'get-template',
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  '--template-stage',
  'Original',
]);
assert((storedTemplate.StagesAvailable ?? []).includes('Original'), 'Original template stage is unavailable.');
assert(
  canonicalJsonSha256(parseJsonDocument(storedTemplate.TemplateBody, 'Original stack template')) ===
    templateDigest,
  'Deployed canonical template digest differs from source.',
);
const liveStackPolicy = awsJson([
  'cloudformation',
  'get-stack-policy',
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
]);
assert(
  canonicalJsonSha256(parseJsonDocument(liveStackPolicy.StackPolicyBody, 'Live stack policy')) ===
    effectiveStackPolicyDigest,
  'Deployed stack policy differs from the effective source policy.',
);

const resources = awsJson([
  'cloudformation',
  'list-stack-resources',
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
]).StackResourceSummaries ?? [];
assert(resources.length === expectedLogicalIds.length, 'Foundation stack resource count is unexpected.');
const resourceMap = Object.fromEntries(resources.map((resource) => [resource.LogicalResourceId, resource]));
for (const logicalId of expectedLogicalIds) {
  const resource = resourceMap[logicalId];
  assert(resource, `Foundation resource ${logicalId} is missing.`);
  assert(resource.ResourceType === template.Resources[logicalId].Type, `${logicalId} type drifted.`);
  assert(resource.ResourceStatus.endsWith('_COMPLETE'), `${logicalId} is not complete.`);
}
assert(!resourceMap.ReviewEmailEventsHttpsSubscription, 'HTTPS subscription must remain absent.');

verifyKms(resourceMap, stackParameters);
verifySns(resourceMap, stackParameters);
verifySqs(resourceMap);
verifySes(configurationSet, identity, resourceMap);

const sesAccount = awsJson(['sesv2', 'get-account']);
assert(sesAccount.ProductionAccessEnabled === false, 'SES sandbox status changed unexpectedly.');

report({
  account: REVIEW_EMAIL_ACCOUNT_ID,
  configurationSetSendingEnabled: false,
  expectation,
  foundationResourceCount: resources.length,
  kmsRotationDays: 365,
  region,
  senderResourceCount: 0,
  sesProductionAccessEnabled: false,
  sourceCommit,
  effectiveStackPolicyDigest,
  stackPolicyDigest,
  stackStatus: stack.StackStatus,
  templateDigest,
  terminationProtection: true,
});

function verifyKms(resourceMap, parameters) {
  const keyId = resourceMap.ReviewEmailEventsKey.PhysicalResourceId;
  const key = awsJson(['kms', 'describe-key', '--key-id', keyId]).KeyMetadata;
  assert(key?.KeyManager === 'CUSTOMER', 'Foundation KMS key must be customer managed.');
  assert(key?.KeySpec === 'SYMMETRIC_DEFAULT', 'Foundation KMS key spec drifted.');
  assert(key?.KeyUsage === 'ENCRYPT_DECRYPT', 'Foundation KMS key usage drifted.');
  assert(key?.MultiRegion === false, 'Foundation KMS key must not be multi-Region.');
  assert(key?.Enabled === true && key?.KeyState === 'Enabled', 'Foundation KMS key is not enabled.');
  const rotation = awsJson(['kms', 'get-key-rotation-status', '--key-id', keyId]);
  assert(rotation.KeyRotationEnabled === true, 'Foundation KMS rotation is disabled.');
  assert(rotation.RotationPeriodInDays === 365, 'Foundation KMS rotation period drifted.');
  const tags = Object.fromEntries(
    (awsJson(['kms', 'list-resource-tags', '--key-id', keyId]).Tags ?? [])
      .map(({ TagKey, TagValue }) => [TagKey, TagValue]),
  );
  assertTags(tags, 'KMS key');
  assert(alias.TargetKeyId === key.KeyId, 'Foundation KMS alias targets a different key.');

  const livePolicy = parseJsonDocument(
    awsJson(['kms', 'get-key-policy', '--key-id', keyId, '--policy-name', 'default']).Policy,
    'Live KMS key policy',
  );
  const expectedPolicy = renderTemplateValue(
    template.Resources.ReviewEmailEventsKey.Properties.KeyPolicy,
    {
      ...parameters,
      'AWS::AccountId': REVIEW_EMAIL_ACCOUNT_ID,
      'AWS::Partition': 'aws',
      'AWS::Region': REVIEW_EMAIL_REGION,
    },
  );
  assertDeepEqual(livePolicy, expectedPolicy, 'KMS key policy');
}

function verifySns(resourceMap, parameters) {
  assert(
    resourceMap.ReviewEmailEventsTopic.PhysicalResourceId === topicArn,
    'Foundation SNS topic physical ID drifted.',
  );
  const attributes = awsJson(['sns', 'get-topic-attributes', '--topic-arn', topicArn]).Attributes ?? {};
  const keyArn = awsJson([
    'kms',
    'describe-key',
    '--key-id',
    resourceMap.ReviewEmailEventsKey.PhysicalResourceId,
  ]).KeyMetadata?.Arn;
  assert(attributes.KmsMasterKeyId === keyArn, 'SNS topic must use the KMS key ARN, not its alias.');
  assert(attributes.SignatureVersion === '2', 'SNS signature version drifted.');
  const subscriptions = awsJson(['sns', 'list-subscriptions-by-topic', '--topic-arn', topicArn])
    .Subscriptions ?? [];
  assert(subscriptions.length === 0, 'Foundation SNS topic must not have a live subscription yet.');
  const tags = Object.fromEntries(
    (awsJson(['sns', 'list-tags-for-resource', '--resource-arn', topicArn]).Tags ?? [])
      .map(({ Key, Value }) => [Key, Value]),
  );
  assertTags(tags, 'SNS topic');
  const livePolicy = parseJsonDocument(attributes.Policy, 'Live SNS topic policy');
  const expectedPolicy = renderTemplateValue(
    template.Resources.ReviewEmailEventsTopicPolicy.Properties.PolicyDocument,
    {
      ...parameters,
      'AWS::AccountId': REVIEW_EMAIL_ACCOUNT_ID,
      'AWS::Partition': 'aws',
      'AWS::Region': REVIEW_EMAIL_REGION,
      ReviewEmailEventsTopic: topicArn,
    },
  );
  assertDeepEqual(livePolicy, expectedPolicy, 'SNS topic policy');
}

function verifySqs(resourceMap) {
  assert(
    resourceMap.ReviewEmailEventsDlq.PhysicalResourceId === queueUrl,
    'Foundation DLQ physical ID drifted.',
  );
  const attributes = awsJson([
    'sqs',
    'get-queue-attributes',
    '--queue-url',
    queueUrl,
    '--attribute-names',
    'All',
  ]).Attributes ?? {};
  assert(attributes.MessageRetentionPeriod === '1209600', 'Foundation DLQ retention drifted.');
  assert(attributes.SqsManagedSseEnabled === 'true', 'Foundation DLQ SSE-SQS is disabled.');
  assert(attributes.ApproximateNumberOfMessages === '0', 'Foundation DLQ is not empty.');
  const tags = awsJson(['sqs', 'list-queue-tags', '--queue-url', queueUrl]).Tags ?? {};
  assertTags(tags, 'SQS DLQ');
}

function verifySes(liveConfigurationSet, liveIdentity, resourceMap) {
  assert(liveConfigurationSet.SendingOptions?.SendingEnabled === false, 'Configuration-set sending is enabled.');
  assert(
    !liveConfigurationSet.SuppressionOptions ||
      (liveConfigurationSet.SuppressionOptions.SuppressedReasons ?? []).length === 0,
    'Configuration-set suppression override must remain absent.',
  );
  const eventDestinations = awsJson([
    'sesv2',
    'get-configuration-set-event-destinations',
    '--configuration-set-name',
    defaults.ConfigurationSetName,
  ]).EventDestinations ?? [];
  assert(eventDestinations.length === 1, 'Expected exactly one SES event destination.');
  const destination = eventDestinations[0];
  assert(destination.Name === 'renuvex-review-request-feedback', 'SES event destination name drifted.');
  assert(destination.Enabled === true, 'SES event destination is disabled.');
  assert(destination.SnsDestination?.TopicArn === topicArn, 'SES event destination targets the wrong topic.');
  assertDeepEqual(
    [...(destination.MatchingEventTypes ?? [])].sort(),
    ['BOUNCE', 'COMPLAINT', 'DELIVERY', 'DELIVERY_DELAY', 'REJECT', 'RENDERING_FAILURE', 'SEND'],
    'SES event destination types',
  );
  assert(!destination.MatchingEventTypes.includes('OPEN'), 'OPEN tracking must remain disabled.');
  assert(!destination.MatchingEventTypes.includes('CLICK'), 'CLICK tracking must remain disabled.');

  assert(
    ['PENDING', 'NOT_STARTED'].includes(liveIdentity.VerificationStatus),
    `Identity must be pending before DNS: ${liveIdentity.VerificationStatus}.`,
  );
  assert(liveIdentity.DkimAttributes?.SigningEnabled === true, 'SES DKIM signing is disabled.');
  assert(
    ['PENDING', 'NOT_STARTED'].includes(liveIdentity.DkimAttributes?.Status),
    `DKIM must be pending before DNS: ${liveIdentity.DkimAttributes?.Status}.`,
  );
  assert(
    liveIdentity.DkimAttributes?.CurrentSigningKeyLength === 'RSA_2048_BIT' ||
      liveIdentity.DkimAttributes?.NextSigningKeyLength === 'RSA_2048_BIT',
    'SES Easy DKIM is not configured for RSA-2048.',
  );
  assert(liveIdentity.FeedbackAttributes?.EmailForwardingEnabled === false, 'SES feedback forwarding is enabled.');
  assert(
    liveIdentity.MailFromAttributes?.BehaviorOnMxFailure === 'REJECT_MESSAGE',
    'Custom MAIL FROM must reject on MX failure.',
  );
  assert(liveIdentity.MailFromAttributes?.MailFromDomain === defaults.MailFromDomain, 'MAIL FROM domain drifted.');
  assert(
    ['PENDING', 'NOT_STARTED'].includes(liveIdentity.MailFromAttributes?.MailFromDomainStatus),
    `MAIL FROM must be pending before DNS: ${liveIdentity.MailFromAttributes?.MailFromDomainStatus}.`,
  );
  assert(
    resourceMap.ReviewEmailConfigurationSet.PhysicalResourceId === defaults.ConfigurationSetName,
    'Configuration-set physical ID drifted.',
  );
  assert(
    resourceMap.ReviewEmailIdentity.PhysicalResourceId === defaults.SenderDomain,
    'SES identity physical ID drifted.',
  );
}

function findExpectedAlias() {
  const aliases = awsJson(['kms', 'list-aliases']).Aliases ?? [];
  return aliases.find(({ AliasName }) => AliasName === 'alias/renuvex-review-email-events') ?? null;
}

function findExpectedTopicArn() {
  const topics = awsJson(['sns', 'list-topics']).Topics ?? [];
  return topics.find(({ TopicArn }) =>
    TopicArn?.endsWith(`:${REVIEW_EMAIL_FOUNDATION_STACK_NAME}-events`))?.TopicArn ?? null;
}

function findTaggedFoundationKeys() {
  return (
    awsJson([
      'resourcegroupstaggingapi',
      'get-resources',
      '--resource-type-filters',
      'kms:key',
      '--tag-filters',
      `Key=Project,Values=${FOUNDATION_STACK_TAGS.Project}`,
      `Key=Purpose,Values=${FOUNDATION_STACK_TAGS.Purpose}`,
      `Key=Environment,Values=${FOUNDATION_STACK_TAGS.Environment}`,
    ]).ResourceTagMappingList ?? []
  ).map(({ ResourceARN }) => ResourceARN);
}

function findSenderSurface() {
  const roles = (awsJson(['iam', 'list-roles']).Roles ?? []).filter(({ RoleName }) =>
    /^renuvex-review-email-(sender|runtime|lambda)/.test(RoleName ?? ''));
  const functions = (awsJson(['lambda', 'list-functions']).Functions ?? []).filter(({ FunctionName }) =>
    /^renuvex-review-email/.test(FunctionName ?? ''));
  const schedules = awsJson(['scheduler', 'list-schedules', '--name-prefix', 'renuvex-review-email'])
    .Schedules ?? [];
  const tenants = awsJson(['sesv2', 'list-tenants']).Tenants ?? [];
  return {
    functions: functions.length,
    roles: roles.length,
    schedules: schedules.length,
    tenants: tenants.length,
    total: functions.length + roles.length + schedules.length + tenants.length,
  };
}

function assertTags(tags, label) {
  for (const [key, value] of Object.entries(FOUNDATION_STACK_TAGS)) {
    assert(tags[key] === value, `${label} tag ${key} drifted.`);
  }
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
  const result = runAws(args);
  try {
    return JSON.parse(result.stdout || '{}');
  } catch {
    fail(`AWS CLI returned invalid JSON for ${args[0]} ${args[1]}.`);
  }
}

function optionalAwsJson(args, expectedFailure) {
  const result = runAws(args, true);
  if (result.status === 0) {
    try {
      return JSON.parse(result.stdout || '{}');
    } catch {
      fail(`AWS CLI returned invalid JSON for ${args[0]} ${args[1]}.`);
    }
  }
  if (expectedFailure(result.stderr || result.stdout || '')) return null;
  fail(sanitize(result.stderr || result.stdout || `${args[0]} ${args[1]} failed.`));
}

function runAws(args, allowFailure = false) {
  const result = spawnSync(
    awsCli,
    [...args, '--profile', profile, '--region', region, '--output', 'json', '--no-cli-pager'],
    { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' },
  );
  if (!allowFailure && result.status !== 0) {
    fail(sanitize(result.stderr || result.stdout || `${args[0]} ${args[1]} failed.`));
  }
  return result;
}

function isCloudFormationNotFound(value) {
  return /ValidationError.*does not exist|Stack with id .* does not exist/is.test(value);
}

function isNotFound(value) {
  return /NotFound|NotFoundException|QueueDoesNotExist|does not exist|not found/is.test(value);
}

function assertDeepEqual(actual, expected, label) {
  assert(
    canonicalJsonSha256(actual) === canonicalJsonSha256(expected),
    `${label} does not match the source contract.`,
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
    `review-email foundation live verification passed: ${expectation} (${summary.foundationResourceCount} resources)\n`,
  );
}
