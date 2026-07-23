import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  canonicalJsonSha256,
  declaredResourceTypes,
  effectiveResourceLogicalIds,
  readStrictJsonFile,
} from './lib/review-email-cloudformation-contract.mjs';

const templatePath = path.join(process.cwd(), 'infra', 'aws', 'review-email-foundation.cloudformation.json');
const stackPolicyPath = path.join(process.cwd(), 'infra', 'aws', 'review-email-foundation.stack-policy.json');
const raw = await readFile(templatePath, 'utf8');
const template = readStrictJsonFile(templatePath, 'foundation template');
const stackPolicy = readStrictJsonFile(stackPolicyPath, 'foundation stack policy');
const creatorSource = await readFile(
  path.join(process.cwd(), 'scripts', 'create-review-email-foundation-change-set.mjs'),
  'utf8',
);
const verifierSource = await readFile(
  path.join(process.cwd(), 'scripts', 'verify-review-email-foundation-change-set.mjs'),
  'utf8',
);
const executorSource = await readFile(
  path.join(process.cwd(), 'scripts', 'execute-review-email-foundation-change-set.mjs'),
  'utf8',
);
const approvalSource = await readFile(
  path.join(process.cwd(), 'scripts', 'set-review-email-foundation-execution-approval.mjs'),
  'utf8',
);
const finalizerSource = await readFile(
  path.join(process.cwd(), 'scripts', 'finalize-review-email-foundation-stack.mjs'),
  'utf8',
);
const liveVerifierSource = await readFile(
  path.join(process.cwd(), 'scripts', 'verify-review-email-foundation-live.mjs'),
  'utf8',
);
const canonicalDigest = canonicalJsonSha256(template);

function asArray(value) {
  return Array.isArray(value) ? value : value === undefined ? [] : [value];
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function refValue(value) {
  return value && typeof value === 'object' && typeof value.Ref === 'string' ? value.Ref : null;
}

function fnSubValue(value) {
  return value && typeof value === 'object' && typeof value['Fn::Sub'] === 'string' ? value['Fn::Sub'] : null;
}

const requiredResources = [
  'ReviewEmailEventsKey',
  'ReviewEmailEventsKeyAlias',
  'ReviewEmailEventsTopic',
  'ReviewEmailEventsTopicPolicy',
  'ReviewEmailEventsDlq',
  'ReviewEmailEventsDlqPolicy',
  'ReviewEmailEventsHttpsSubscription',
  'ReviewEmailConfigurationSet',
  'ReviewEmailConfigurationSetEventDestination',
  'ReviewEmailIdentity',
];

for (const resource of requiredResources) {
  assert(template.Resources?.[resource], `Missing required resource: ${resource}`);
}
assert(
  JSON.stringify(Object.keys(template.Resources ?? {}).sort()) === JSON.stringify([...requiredResources].sort()),
  'Foundation template resource inventory must remain exact.',
);
assert(/^[a-f0-9]{64}$/.test(canonicalDigest), 'Foundation canonical digest must be SHA-256 hex.');
assert(
  canonicalDigest === canonicalJsonSha256(JSON.parse(JSON.stringify(template))),
  'Foundation canonical digest must not depend on object identity or whitespace.',
);
assert(
  JSON.stringify(effectiveResourceLogicalIds(template, {
    ConfigurationSetName: 'renuvex-review-requests-prod',
    FeedbackEndpointUrl: '',
    MailFromDomain: 'bounce.reviews.renuvex.app',
    SenderDomain: 'reviews.renuvex.app',
  })) ===
    JSON.stringify(requiredResources.filter((logicalId) => logicalId !== 'ReviewEmailEventsHttpsSubscription').sort()),
  'Empty feedback endpoint must produce exactly nine effective resources.',
);
assert(
  declaredResourceTypes(template).includes('AWS::SNS::Subscription'),
  'ResourceTypes allowlist must include the declared conditional subscription type.',
);
assert(
  creatorSource.includes("'--on-stack-failure',\n  'ROLLBACK'") &&
    creatorSource.includes("'--resource-types'") &&
    creatorSource.includes("readOption('--author-profile')") &&
    creatorSource.includes('AWSReservedSSO_RenuvexReviewEmailAuthor_'),
  'Foundation creator must require ROLLBACK, declared ResourceTypes, and the dedicated author principal.',
);
assert(
  executorSource.includes("'--retain-except-on-create'") &&
    executorSource.includes('finally {') &&
    !executorSource.includes('if (approvalOpened)') &&
    executorSource.indexOf("'--mode=close'") > executorSource.indexOf('finally {') &&
    !executorSource.includes('disable-rollback'),
  'Foundation executor must retain-except-on-create, unconditionally close approval in finally, and never disable rollback.',
);
assert(
  approvalSource.includes("'ReviewEmailAuthorPermissionSet'") &&
    approvalSource.includes("'ReviewEmailOperatorPermissionSet'") &&
    approvalSource.includes('nameChanged') &&
    approvalSource.includes('expiryChanged'),
  'Approval updates must account for exact-name changes in author and operator policies and expiry changes in the operator policy.',
);
assert(
  verifierSource.includes("'--template-stage',\n  'Original'") &&
    verifierSource.includes("changeSet.OnStackFailure === 'ROLLBACK'") &&
    verifierSource.includes('pendingStack?.RoleARN === expectedRoleArn') &&
    !verifierSource.includes('changeSet.RoleARN') &&
    verifierSource.includes("gitCommitIsAncestor(ROOT, sourceCommit, 'origin/main')") &&
    verifierSource.includes('readStrictJsonAtGitCommit'),
  'Change-set verifier must verify Original provenance, rollback, and the placeholder stack service role.',
);
assert(
  finalizerSource.indexOf("stack?.StackStatus === 'CREATE_COMPLETE'") <
    finalizerSource.indexOf("'set-stack-policy'") &&
    finalizerSource.includes("gitCommitIsAncestor(ROOT, sourceCommit, 'origin/main')") &&
    finalizerSource.includes('readStrictJsonAtGitCommit'),
  'Finalizer must verify committed provenance after CREATE_COMPLETE before applying the stack policy.',
);
assert(
  liveVerifierSource.includes("gitCommitIsAncestor(ROOT, sourceCommit, 'origin/main')") &&
    liveVerifierSource.includes('readStrictJsonAtGitCommit'),
  'Live verifier must bind deployed provenance to a committed origin/main source contract.',
);
for (const [label, source] of [
  ['creator', creatorSource],
  ['change-set verifier', verifierSource],
  ['finalizer', finalizerSource],
  ['live verifier', liveVerifierSource],
]) {
  assert(
    source.includes('StackPolicyDigest') && source.includes('stackPolicyDigest'),
    `Foundation ${label} must bind the canonical stack-policy digest into provenance.`,
  );
}

const forbiddenSecretHints = [
  'AWS_SECRET_ACCESS_KEY',
  'DATABASE_URL',
  'PRIVATE KEY-----',
  'QSTASH_TOKEN',
  'CLOUDINARY_API_SECRET',
  'MUX_TOKEN_SECRET',
  'VERCEL_OIDC_TOKEN',
];
for (const hint of forbiddenSecretHints) {
  assert(!raw.includes(hint), `Template contains forbidden secret hint: ${hint}`);
}

assert(
  template.Description?.includes('Deploy in eu-central-1'),
  'Template description must state that the stack is deployed in eu-central-1.',
);
assert(template.Parameters?.SenderDomain?.Default === 'reviews.renuvex.app', 'SenderDomain must default to reviews.renuvex.app.');
assert(JSON.stringify(template.Parameters.SenderDomain.AllowedValues) === JSON.stringify(['reviews.renuvex.app']), 'SenderDomain must be locked.');
assert(template.Parameters?.MailFromDomain?.Default === 'bounce.reviews.renuvex.app', 'MailFromDomain must default to bounce.reviews.renuvex.app.');
assert(JSON.stringify(template.Parameters.MailFromDomain.AllowedValues) === JSON.stringify(['bounce.reviews.renuvex.app']), 'MailFromDomain must be locked.');
assert(template.Parameters?.ConfigurationSetName?.Default === 'renuvex-review-requests-prod', 'ConfigurationSetName must default to renuvex-review-requests-prod.');
assert(template.Parameters?.FeedbackEndpointUrl?.Default === '', 'FeedbackEndpointUrl must default to empty.');
assert(template.Conditions?.HasFeedbackEndpoint, 'Feedback subscription must be gated by HasFeedbackEndpoint.');

const key = template.Resources.ReviewEmailEventsKey;
assert(key.Type === 'AWS::KMS::Key', 'ReviewEmailEventsKey must be AWS::KMS::Key.');
assert(key.DeletionPolicy === 'Retain', 'ReviewEmailEventsKey must be retained on stack deletion.');
assert(key.Properties?.EnableKeyRotation === true, 'ReviewEmailEventsKey rotation must be enabled.');
assert(key.Properties?.RotationPeriodInDays === 365, 'ReviewEmailEventsKey rotation period must be 365 days.');
assert(key.Properties?.KeySpec === 'SYMMETRIC_DEFAULT', 'ReviewEmailEventsKey must be a symmetric key.');
assert(key.Properties?.KeyUsage === 'ENCRYPT_DECRYPT', 'ReviewEmailEventsKey must be used for encrypt/decrypt.');
const keyStatements = asArray(key.Properties?.KeyPolicy?.Statement);
assert(keyStatements.length === 2, 'KMS key policy must contain only account administration and scoped SES publish.');
const rootStatement = keyStatements.find((statement) => statement.Sid === 'EnableAccountKmsAdministration');
assert(rootStatement?.Principal?.AWS?.['Fn::Sub'] === 'arn:${AWS::Partition}:iam::${AWS::AccountId}:root', 'KMS key must allow account-root administration.');
const sesKmsStatement = keyStatements.find((statement) => statement.Sid === 'AllowSesConfigurationSetToPublishEncryptedFeedback');
assert(sesKmsStatement, 'KMS key must allow SES configuration set publishing.');
assert(sesKmsStatement.Principal?.Service === 'ses.amazonaws.com', 'KMS publish statement must use SES service principal.');
assert(
  JSON.stringify(asArray(sesKmsStatement.Action).sort()) === JSON.stringify(['kms:Decrypt', 'kms:GenerateDataKey*'].sort()),
  'KMS SES statement must allow only kms:Decrypt and kms:GenerateDataKey*.',
);
assert(refValue(sesKmsStatement.Condition?.StringEquals?.['aws:SourceAccount']) === 'AWS::AccountId', 'KMS SES statement must scope by source account.');
assert(
  fnSubValue(sesKmsStatement.Condition?.ArnLike?.['aws:SourceArn']) ===
    'arn:${AWS::Partition}:ses:${AWS::Region}:${AWS::AccountId}:configuration-set/${ConfigurationSetName}',
  'KMS SES statement must scope by configuration set ARN.',
);
assert(sesKmsStatement.Principal?.Service !== '*', 'KMS SES statement must not use a wildcard principal.');
assert(
  !fnSubValue(sesKmsStatement.Condition?.ArnLike?.['aws:SourceArn'])?.includes('configuration-set/*'),
  'KMS SES source ARN must not wildcard the configuration set.',
);

const alias = template.Resources.ReviewEmailEventsKeyAlias;
assert(alias.Type === 'AWS::KMS::Alias', 'ReviewEmailEventsKeyAlias must be AWS::KMS::Alias.');
assert(alias.Properties?.AliasName === 'alias/renuvex-review-email-events', 'KMS alias must be stable.');
assert(refValue(alias.Properties?.TargetKeyId) === 'ReviewEmailEventsKey', 'KMS alias must target ReviewEmailEventsKey.');

const topic = template.Resources.ReviewEmailEventsTopic;
assert(topic.Type === 'AWS::SNS::Topic', 'ReviewEmailEventsTopic must be AWS::SNS::Topic.');
assert(topic.DeletionPolicy === 'Retain', 'ReviewEmailEventsTopic must be retained on stack deletion.');
assert(topic.Properties?.SignatureVersion === '2', 'SES feedback SNS topic must use SignatureVersion 2.');
assert(
  JSON.stringify(topic.Properties?.KmsMasterKeyId?.['Fn::GetAtt']) ===
    JSON.stringify(['ReviewEmailEventsKey', 'Arn']),
  'SES feedback SNS topic must use the key ARN, not the mutable alias.',
);

const topicPolicy = template.Resources.ReviewEmailEventsTopicPolicy;
assert(topicPolicy.Type === 'AWS::SNS::TopicPolicy', 'ReviewEmailEventsTopicPolicy must be AWS::SNS::TopicPolicy.');
const topicStatements = asArray(topicPolicy.Properties?.PolicyDocument?.Statement);
assert(topicStatements.length === 1, 'SNS topic policy must contain one scoped SES publish statement.');
const sesPublishStatement = topicStatements.find((statement) => statement.Sid === 'AllowSesConfigurationSetPublish');
assert(sesPublishStatement, 'SNS topic policy must allow SES configuration set publish.');
assert(sesPublishStatement.Principal?.Service === 'ses.amazonaws.com', 'SNS publish statement must use SES service principal.');
assert(sesPublishStatement.Action === 'sns:Publish', 'SNS publish statement must allow only sns:Publish.');
assert(refValue(sesPublishStatement.Resource) === 'ReviewEmailEventsTopic', 'SNS publish statement must target the local topic.');
assert(refValue(sesPublishStatement.Condition?.StringEquals?.['aws:SourceAccount']) === 'AWS::AccountId', 'SNS publish statement must scope by source account.');
assert(
  fnSubValue(sesPublishStatement.Condition?.ArnLike?.['aws:SourceArn']) ===
    'arn:${AWS::Partition}:ses:${AWS::Region}:${AWS::AccountId}:configuration-set/${ConfigurationSetName}',
  'SNS publish statement must scope to the exact configuration set ARN.',
);
assert(sesPublishStatement.Principal?.Service !== '*', 'SNS publish statement must not use a wildcard principal.');

const dlq = template.Resources.ReviewEmailEventsDlq;
assert(dlq.Type === 'AWS::SQS::Queue', 'ReviewEmailEventsDlq must be AWS::SQS::Queue.');
assert(dlq.DeletionPolicy === 'Retain', 'ReviewEmailEventsDlq must be retained on stack deletion.');
assert(dlq.Properties?.MessageRetentionPeriod === 1209600, 'ReviewEmailEventsDlq retention must be 14 days.');
assert(dlq.Properties?.SqsManagedSseEnabled === true, 'ReviewEmailEventsDlq must use SQS managed SSE.');

const dlqPolicy = template.Resources.ReviewEmailEventsDlqPolicy;
assert(dlqPolicy.Type === 'AWS::SQS::QueuePolicy', 'ReviewEmailEventsDlqPolicy must be AWS::SQS::QueuePolicy.');
const dlqStatements = asArray(dlqPolicy.Properties?.PolicyDocument?.Statement);
assert(dlqStatements.length === 1, 'DLQ policy must contain one scoped SNS redrive statement.');
const snsDlqStatement = dlqStatements.find((statement) => statement.Sid === 'AllowSnsTopicToRedriveFailedNotifications');
assert(snsDlqStatement?.Principal?.Service === 'sns.amazonaws.com', 'DLQ policy must allow SNS service principal.');
assert(snsDlqStatement?.Action === 'sqs:SendMessage', 'DLQ policy must allow only sqs:SendMessage.');
assert(snsDlqStatement?.Condition?.ArnEquals?.['aws:SourceArn']?.Ref === 'ReviewEmailEventsTopic', 'DLQ policy must scope to the local topic ARN.');

const subscription = template.Resources.ReviewEmailEventsHttpsSubscription;
assert(subscription.Type === 'AWS::SNS::Subscription', 'ReviewEmailEventsHttpsSubscription must be AWS::SNS::Subscription.');
assert(subscription.Condition === 'HasFeedbackEndpoint', 'Feedback HTTPS subscription must be conditional.');
assert(subscription.DependsOn === 'ReviewEmailEventsDlqPolicy', 'Feedback subscription must wait for its DLQ policy.');
assert(subscription.Properties?.Protocol === 'https', 'Feedback subscription protocol must be https.');
assert(refValue(subscription.Properties?.Endpoint) === 'FeedbackEndpointUrl', 'Feedback subscription endpoint must come from FeedbackEndpointUrl.');
assert(subscription.Properties?.RawMessageDelivery === false, 'Feedback subscription must receive SNS JSON envelopes for signature verification.');
assert(subscription.Properties?.RedrivePolicy?.deadLetterTargetArn?.['Fn::GetAtt']?.[0] === 'ReviewEmailEventsDlq', 'Feedback subscription must use the DLQ.');

const configurationSet = template.Resources.ReviewEmailConfigurationSet;
assert(configurationSet.Type === 'AWS::SES::ConfigurationSet', 'ReviewEmailConfigurationSet must be AWS::SES::ConfigurationSet.');
assert(configurationSet.DeletionPolicy === 'Retain', 'ReviewEmailConfigurationSet must be retained on stack deletion.');
assert(refValue(configurationSet.Properties?.Name) === 'ConfigurationSetName', 'Configuration set name must come from parameter.');
assert(configurationSet.Properties?.SendingOptions?.SendingEnabled === false, 'Foundation configuration-set sending must fail closed.');
assert(configurationSet.Properties?.ReputationOptions?.ReputationMetricsEnabled === true, 'Configuration set reputation metrics must be enabled.');
assert(!configurationSet.Properties?.SuppressionOptions, 'Foundation must not override account or future tenant-level suppression.');
assert(!raw.includes('OPEN'), 'OPEN tracking must remain disabled in the foundation event destination.');
assert(!raw.includes('CLICK'), 'CLICK tracking must remain disabled in the foundation event destination.');

const eventDestination = template.Resources.ReviewEmailConfigurationSetEventDestination;
assert(eventDestination.Type === 'AWS::SES::ConfigurationSetEventDestination', 'ReviewEmailConfigurationSetEventDestination must be AWS::SES::ConfigurationSetEventDestination.');
assert(eventDestination.DependsOn === 'ReviewEmailEventsTopicPolicy', 'Event destination must wait for the SES-scoped topic policy.');
assert(eventDestination.Properties?.ConfigurationSetName?.Ref === 'ReviewEmailConfigurationSet', 'Event destination must target the local configuration set.');
const destination = eventDestination.Properties?.EventDestination;
assert(destination?.Enabled === true, 'SES event destination must be enabled.');
assert(destination?.SnsDestination?.TopicARN?.Ref === 'ReviewEmailEventsTopic', 'SES event destination must publish to the local SNS topic.');
assert(
  JSON.stringify(asArray(destination?.MatchingEventTypes).sort()) === JSON.stringify([
    'SEND',
    'REJECT',
    'BOUNCE',
    'COMPLAINT',
    'DELIVERY',
    'DELIVERY_DELAY',
    'RENDERING_FAILURE',
  ].sort()),
  'SES event destination must capture the accepted feedback event set.',
);

const identity = template.Resources.ReviewEmailIdentity;
assert(identity.Type === 'AWS::SES::EmailIdentity', 'ReviewEmailIdentity must be AWS::SES::EmailIdentity.');
assert(identity.DeletionPolicy === 'Retain', 'ReviewEmailIdentity must be retained on stack deletion.');
assert(refValue(identity.Properties?.EmailIdentity) === 'SenderDomain', 'Email identity must use SenderDomain.');
assert(identity.Properties?.ConfigurationSetAttributes?.ConfigurationSetName?.Ref === 'ReviewEmailConfigurationSet', 'Email identity must associate the configuration set.');
assert(identity.Properties?.DkimAttributes?.SigningEnabled === true, 'Email identity DKIM signing must be enabled.');
assert(identity.Properties?.DkimSigningAttributes?.NextSigningKeyLength === 'RSA_2048_BIT', 'Email identity must use Easy DKIM 2048-bit key length.');
assert(identity.Properties?.FeedbackAttributes?.EmailForwardingEnabled === false, 'Feedback forwarding must be disabled because SNS feedback is configured.');
assert(identity.Properties?.MailFromAttributes?.BehaviorOnMxFailure === 'REJECT_MESSAGE', 'MAIL FROM MX failure must fail closed.');
assert(refValue(identity.Properties?.MailFromAttributes?.MailFromDomain) === 'MailFromDomain', 'MAIL FROM domain must come from MailFromDomain.');

for (const logicalId of [
  'ReviewEmailEventsKey',
  'ReviewEmailEventsTopic',
  'ReviewEmailEventsDlq',
  'ReviewEmailConfigurationSet',
  'ReviewEmailIdentity',
]) {
  const tags = Object.fromEntries(
    asArray(template.Resources[logicalId].Properties?.Tags).map(({ Key, Value }) => [Key, Value]),
  );
  assert(tags.Project === 'renuvex-product-reviews', `${logicalId} must carry the project tag.`);
  assert(tags.Purpose === 'review-request-email', `${logicalId} must carry the purpose tag.`);
  assert(tags.Environment === 'production', `${logicalId} must carry the production environment tag.`);
}

const stackPolicyStatements = asArray(stackPolicy.Statement);
const stackPolicyAllow = stackPolicyStatements.find((statement) => statement.Sid === 'AllowInPlaceFoundationUpdates');
assert(
  stackPolicyAllow?.Effect === 'Allow' &&
    stackPolicyAllow.Action === 'Update:*' &&
    stackPolicyAllow.Principal === '*' &&
    stackPolicyAllow.Resource === '*',
  'Foundation stack policy must allow in-place updates before applying explicit denies.',
);
const stackPolicyDeny = stackPolicyStatements.find(
  (statement) => statement.Sid === 'DenyFoundationResourceDeletionOrReplacement',
);
assert(stackPolicyDeny?.Effect === 'Deny', 'Foundation stack policy must deny destructive updates.');
assert(
  JSON.stringify(asArray(stackPolicyDeny.Action).sort()) ===
    JSON.stringify(['Update:Delete', 'Update:Replace']),
  'Foundation stack policy must deny delete and replacement.',
);
assert(
  JSON.stringify(asArray(stackPolicyDeny.Resource).sort()) ===
    JSON.stringify(requiredResources.map((logicalId) => `LogicalResourceId/${logicalId}`).sort()),
  'Foundation stack policy must protect every declared logical resource from deletion or replacement.',
);

for (const output of [
  'SenderDomain',
  'ConfigurationSetName',
  'EventsTopicArn',
  'EventsDlqArn',
  'DkimDNSTokenName1',
  'DkimDNSTokenValue1',
  'DkimDNSTokenName2',
  'DkimDNSTokenValue2',
  'DkimDNSTokenName3',
  'DkimDNSTokenValue3',
  'MailFromMxRecordName',
  'MailFromMxRecordValue',
  'MailFromSpfRecordName',
  'MailFromSpfRecordValue',
]) {
  assert(template.Outputs?.[output], `Template must output ${output}.`);
}

console.log('review-email foundation CloudFormation template validation passed');
