import { readFile } from 'node:fs/promises';
import path from 'node:path';

const templatePath = path.join(process.cwd(), 'infra', 'aws', 'review-email-foundation.cloudformation.json');
const raw = await readFile(templatePath, 'utf8');
const template = JSON.parse(raw);

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
assert(key.Properties?.EnableKeyRotation === false, 'ReviewEmailEventsKey rotation must remain disabled by default.');
assert(key.Properties?.KeySpec === 'SYMMETRIC_DEFAULT', 'ReviewEmailEventsKey must be a symmetric key.');
assert(key.Properties?.KeyUsage === 'ENCRYPT_DECRYPT', 'ReviewEmailEventsKey must be used for encrypt/decrypt.');
const keyStatements = asArray(key.Properties?.KeyPolicy?.Statement);
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

const alias = template.Resources.ReviewEmailEventsKeyAlias;
assert(alias.Type === 'AWS::KMS::Alias', 'ReviewEmailEventsKeyAlias must be AWS::KMS::Alias.');
assert(alias.Properties?.AliasName === 'alias/renuvex-review-email-events', 'KMS alias must be stable.');
assert(refValue(alias.Properties?.TargetKeyId) === 'ReviewEmailEventsKey', 'KMS alias must target ReviewEmailEventsKey.');

const topic = template.Resources.ReviewEmailEventsTopic;
assert(topic.Type === 'AWS::SNS::Topic', 'ReviewEmailEventsTopic must be AWS::SNS::Topic.');
assert(topic.DeletionPolicy === 'Retain', 'ReviewEmailEventsTopic must be retained on stack deletion.');
assert(topic.Properties?.SignatureVersion === '2', 'SES feedback SNS topic must use SignatureVersion 2.');
assert(topic.Properties?.KmsMasterKeyId?.['Fn::GetAtt']?.[0] === 'ReviewEmailEventsKey', 'SES feedback SNS topic must use the customer managed KMS key.');

const topicPolicy = template.Resources.ReviewEmailEventsTopicPolicy;
assert(topicPolicy.Type === 'AWS::SNS::TopicPolicy', 'ReviewEmailEventsTopicPolicy must be AWS::SNS::TopicPolicy.');
const topicStatements = asArray(topicPolicy.Properties?.PolicyDocument?.Statement);
const sesPublishStatement = topicStatements.find((statement) => statement.Sid === 'AllowSesConfigurationSetPublish');
assert(sesPublishStatement, 'SNS topic policy must allow SES configuration set publish.');
assert(sesPublishStatement.Principal?.Service === 'ses.amazonaws.com', 'SNS publish statement must use SES service principal.');
assert(sesPublishStatement.Action === 'sns:Publish', 'SNS publish statement must allow only sns:Publish.');
assert(refValue(sesPublishStatement.Resource) === 'ReviewEmailEventsTopic', 'SNS publish statement must target the local topic.');
assert(refValue(sesPublishStatement.Condition?.StringEquals?.['aws:SourceAccount']) === 'AWS::AccountId', 'SNS publish statement must scope by source account.');

const dlq = template.Resources.ReviewEmailEventsDlq;
assert(dlq.Type === 'AWS::SQS::Queue', 'ReviewEmailEventsDlq must be AWS::SQS::Queue.');
assert(dlq.DeletionPolicy === 'Retain', 'ReviewEmailEventsDlq must be retained on stack deletion.');
assert(dlq.Properties?.MessageRetentionPeriod === 1209600, 'ReviewEmailEventsDlq retention must be 14 days.');
assert(dlq.Properties?.SqsManagedSseEnabled === true, 'ReviewEmailEventsDlq must use SQS managed SSE.');

const dlqPolicy = template.Resources.ReviewEmailEventsDlqPolicy;
assert(dlqPolicy.Type === 'AWS::SQS::QueuePolicy', 'ReviewEmailEventsDlqPolicy must be AWS::SQS::QueuePolicy.');
const dlqStatements = asArray(dlqPolicy.Properties?.PolicyDocument?.Statement);
const snsDlqStatement = dlqStatements.find((statement) => statement.Sid === 'AllowSnsTopicToRedriveFailedNotifications');
assert(snsDlqStatement?.Principal?.Service === 'sns.amazonaws.com', 'DLQ policy must allow SNS service principal.');
assert(snsDlqStatement?.Action === 'sqs:SendMessage', 'DLQ policy must allow only sqs:SendMessage.');
assert(snsDlqStatement?.Condition?.ArnEquals?.['aws:SourceArn']?.Ref === 'ReviewEmailEventsTopic', 'DLQ policy must scope to the local topic ARN.');

const subscription = template.Resources.ReviewEmailEventsHttpsSubscription;
assert(subscription.Type === 'AWS::SNS::Subscription', 'ReviewEmailEventsHttpsSubscription must be AWS::SNS::Subscription.');
assert(subscription.Condition === 'HasFeedbackEndpoint', 'Feedback HTTPS subscription must be conditional.');
assert(subscription.Properties?.Protocol === 'https', 'Feedback subscription protocol must be https.');
assert(refValue(subscription.Properties?.Endpoint) === 'FeedbackEndpointUrl', 'Feedback subscription endpoint must come from FeedbackEndpointUrl.');
assert(subscription.Properties?.RawMessageDelivery === false, 'Feedback subscription must receive SNS JSON envelopes for signature verification.');
assert(subscription.Properties?.RedrivePolicy?.deadLetterTargetArn?.['Fn::GetAtt']?.[0] === 'ReviewEmailEventsDlq', 'Feedback subscription must use the DLQ.');

const configurationSet = template.Resources.ReviewEmailConfigurationSet;
assert(configurationSet.Type === 'AWS::SES::ConfigurationSet', 'ReviewEmailConfigurationSet must be AWS::SES::ConfigurationSet.');
assert(configurationSet.DeletionPolicy === 'Retain', 'ReviewEmailConfigurationSet must be retained on stack deletion.');
assert(refValue(configurationSet.Properties?.Name) === 'ConfigurationSetName', 'Configuration set name must come from parameter.');
assert(configurationSet.Properties?.SendingOptions?.SendingEnabled === true, 'Configuration set sending must be enabled.');
assert(configurationSet.Properties?.ReputationOptions?.ReputationMetricsEnabled === true, 'Configuration set reputation metrics must be enabled.');
assert(
  JSON.stringify(asArray(configurationSet.Properties?.SuppressionOptions?.SuppressedReasons).sort()) === JSON.stringify(['BOUNCE', 'COMPLAINT'].sort()),
  'Configuration set suppression reasons must include BOUNCE and COMPLAINT.',
);
assert(!raw.includes('OPEN'), 'OPEN tracking must remain disabled in the foundation event destination.');
assert(!raw.includes('CLICK'), 'CLICK tracking must remain disabled in the foundation event destination.');

const eventDestination = template.Resources.ReviewEmailConfigurationSetEventDestination;
assert(eventDestination.Type === 'AWS::SES::ConfigurationSetEventDestination', 'ReviewEmailConfigurationSetEventDestination must be AWS::SES::ConfigurationSetEventDestination.');
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
