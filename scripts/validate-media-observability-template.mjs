import { readFile } from 'node:fs/promises';
import path from 'node:path';

const templatePath = path.join(process.cwd(), 'infra', 'aws', 'media-observability.cloudformation.json');
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
  'MediaAlarmKey',
  'MediaAlarmKeyAlias',
  'MediaAlarmTopic',
  'MediaAlarmTopicPolicy',
  'MediaCloudFront5xxErrorRateAlarm',
];

for (const resource of requiredResources) {
  assert(template.Resources?.[resource], `Missing required resource: ${resource}`);
}

const forbiddenSecretHints = [
  'AWS_SECRET_ACCESS_KEY',
  'DATABASE_URL',
  'PRIVATE KEY-----',
  'CLOUDINARY_API_SECRET',
  'UPSTASH_REDIS_REST_TOKEN',
];
for (const hint of forbiddenSecretHints) {
  assert(!raw.includes(hint), `Template contains forbidden secret hint: ${hint}`);
}

assert(
  template.Description?.includes('Deploy in us-east-1'),
  'Template description must state that the stack is deployed in us-east-1.',
);

const distributionParam = template.Parameters?.MediaDistributionId;
assert(distributionParam?.Default === 'E1205OOLPZDB00', 'MediaDistributionId must default to the current media CloudFront distribution id.');
assert(distributionParam?.AllowedPattern === '^[A-Z0-9]+$', 'MediaDistributionId must constrain CloudFront distribution ids.');

const alarmEmailParam = template.Parameters?.AlarmEmail;
assert(alarmEmailParam?.Default === '', 'AlarmEmail must default to empty for safe change-set creation without sending a subscription email.');
assert(alarmEmailParam?.NoEcho === true, 'AlarmEmail must be NoEcho to reduce durable exposure of notification email addresses.');
assert(alarmEmailParam?.AllowedPattern?.startsWith('^$|'), 'AlarmEmail must allow an empty value and validate email-shaped input.');
assert(template.Conditions?.HasAlarmEmail, 'Template must gate email subscription creation behind HasAlarmEmail.');

const key = template.Resources.MediaAlarmKey;
assert(key.Type === 'AWS::KMS::Key', 'MediaAlarmKey must be AWS::KMS::Key.');
assert(key.Properties?.EnableKeyRotation === false, 'MediaAlarmKey rotation must stay disabled by default to avoid rotation cost for low-risk alarm notifications.');
assert(key.Properties?.KeySpec === 'SYMMETRIC_DEFAULT', 'MediaAlarmKey must be a symmetric key.');
assert(key.Properties?.KeyUsage === 'ENCRYPT_DECRYPT', 'MediaAlarmKey must be for encrypt/decrypt usage.');
assert(key.Properties?.PendingWindowInDays === 7, 'MediaAlarmKey deletion window must be explicit and short for rollback.');
const keyStatements = asArray(key.Properties?.KeyPolicy?.Statement);
const accountAdminStatement = keyStatements.find((statement) => statement.Sid === 'EnableAccountKmsAdministration');
assert(accountAdminStatement?.Principal?.AWS?.['Fn::Sub'] === 'arn:${AWS::Partition}:iam::${AWS::AccountId}:root', 'MediaAlarmKey must allow account-root IAM administration.');
const cloudWatchKeyStatement = keyStatements.find((statement) => statement.Sid === 'AllowCloudWatchAlarmsForEncryptedSnsTopic');
assert(cloudWatchKeyStatement, 'MediaAlarmKey must allow CloudWatch alarms to use the key for encrypted SNS publishing.');
assert(cloudWatchKeyStatement.Principal?.Service === 'cloudwatch.amazonaws.com', 'MediaAlarmKey CloudWatch statement must use the CloudWatch service principal.');
assert(
  JSON.stringify(asArray(cloudWatchKeyStatement.Action).sort()) === JSON.stringify(['kms:Decrypt', 'kms:GenerateDataKey*'].sort()),
  'MediaAlarmKey CloudWatch statement must allow kms:Decrypt and kms:GenerateDataKey*.',
);
assert(refValue(cloudWatchKeyStatement.Condition?.StringEquals?.['aws:SourceAccount']) === 'AWS::AccountId', 'MediaAlarmKey CloudWatch statement must scope by source account.');
assert(
  fnSubValue(cloudWatchKeyStatement.Condition?.ArnLike?.['aws:SourceArn']) ===
    'arn:${AWS::Partition}:cloudwatch:${AWS::Region}:${AWS::AccountId}:alarm:renuvex-media-cloudfront-*',
  'MediaAlarmKey CloudWatch statement must scope by alarm ARN prefix.',
);

const keyAlias = template.Resources.MediaAlarmKeyAlias;
assert(keyAlias.Type === 'AWS::KMS::Alias', 'MediaAlarmKeyAlias must be AWS::KMS::Alias.');
assert(keyAlias.Properties?.AliasName === 'alias/renuvex-media-observability', 'MediaAlarmKeyAlias must use the stable media observability alias.');
assert(refValue(keyAlias.Properties?.TargetKeyId) === 'MediaAlarmKey', 'MediaAlarmKeyAlias must target MediaAlarmKey.');

const topic = template.Resources.MediaAlarmTopic;
assert(topic.Type === 'AWS::SNS::Topic', 'MediaAlarmTopic must be AWS::SNS::Topic.');
assert(topic.Properties?.KmsMasterKeyId?.['Fn::GetAtt']?.[0] === 'MediaAlarmKey', 'MediaAlarmTopic must use the customer managed alarm KMS key.');
assert(topic.Properties?.KmsMasterKeyId?.['Fn::GetAtt']?.[1] === 'Arn', 'MediaAlarmTopic KMS key reference must use the key ARN.');
assert(fnSubValue(topic.Properties?.TopicName) === '${AWS::StackName}-notifications', 'MediaAlarmTopic name must derive from the stack name.');

const subscription = template.Resources.MediaAlarmEmailSubscription;
assert(subscription?.Type === 'AWS::SNS::Subscription', 'Template must include an optional email subscription resource.');
assert(subscription.Condition === 'HasAlarmEmail', 'Email subscription must be conditional.');
assert(subscription.Properties?.Protocol === 'email', 'Email subscription protocol must be email.');
assert(refValue(subscription.Properties?.Endpoint) === 'AlarmEmail', 'Email subscription endpoint must come from AlarmEmail.');

const topicPolicy = template.Resources.MediaAlarmTopicPolicy;
assert(topicPolicy.Type === 'AWS::SNS::TopicPolicy', 'MediaAlarmTopicPolicy must be AWS::SNS::TopicPolicy.');
const statements = asArray(topicPolicy.Properties?.PolicyDocument?.Statement);
const publishStatement = statements.find((statement) => statement.Sid === 'AllowCloudWatchAlarmPublish');
assert(publishStatement, 'Topic policy must include AllowCloudWatchAlarmPublish.');
assert(publishStatement.Effect === 'Allow', 'CloudWatch publish statement must Allow.');
assert(publishStatement.Principal?.Service === 'cloudwatch.amazonaws.com', 'Topic policy must allow the CloudWatch service principal.');
assert(publishStatement.Action === 'sns:Publish', 'Topic policy must allow only sns:Publish.');
assert(refValue(publishStatement.Resource) === 'MediaAlarmTopic', 'Topic policy resource must be the local alarm topic.');
assert(refValue(publishStatement.Condition?.StringEquals?.['aws:SourceAccount']) === 'AWS::AccountId', 'Topic policy must scope by source account.');
assert(
  fnSubValue(publishStatement.Condition?.ArnLike?.['aws:SourceArn']) ===
    'arn:${AWS::Partition}:cloudwatch:${AWS::Region}:${AWS::AccountId}:alarm:renuvex-media-cloudfront-*',
  'Topic policy must scope CloudWatch alarm publish by alarm ARN prefix.',
);

const alarm = template.Resources.MediaCloudFront5xxErrorRateAlarm;
assert(alarm.Type === 'AWS::CloudWatch::Alarm', 'MediaCloudFront5xxErrorRateAlarm must be AWS::CloudWatch::Alarm.');
const props = alarm.Properties ?? {};
assert(props.AlarmName === 'renuvex-media-cloudfront-5xx-error-rate', 'AlarmName must be stable and descriptive.');
assert(props.Namespace === 'AWS/CloudFront', 'Alarm namespace must be AWS/CloudFront.');
assert(props.MetricName === '5xxErrorRate', 'Alarm must monitor 5xxErrorRate.');
assert(props.Statistic === 'Average', '5xxErrorRate alarm must use Average statistic.');
assert(props.Unit === 'Percent', '5xxErrorRate alarm unit must be Percent.');
assert(props.Period === 60, '5xxErrorRate alarm period must be 60 seconds.');
assert(props.EvaluationPeriods === 5, '5xxErrorRate alarm must evaluate 5 periods.');
assert(props.DatapointsToAlarm === 5, '5xxErrorRate alarm must require 5 breaching datapoints.');
assert(props.Threshold === 1, '5xxErrorRate alarm threshold must be 1 percent.');
assert(props.ComparisonOperator === 'GreaterThanThreshold', '5xxErrorRate alarm comparison operator must be GreaterThanThreshold.');
assert(props.TreatMissingData === 'notBreaching', '5xxErrorRate alarm must treat missing data as notBreaching.');
assert(props.ActionsEnabled === true, '5xxErrorRate alarm actions must be enabled.');
assert(refValue(asArray(props.AlarmActions)[0]) === 'MediaAlarmTopic', '5xxErrorRate alarm must notify the SNS topic on ALARM.');
assert(refValue(asArray(props.OKActions)[0]) === 'MediaAlarmTopic', '5xxErrorRate alarm must notify the SNS topic on recovery.');

const dimensions = asArray(props.Dimensions);
const distributionDimension = dimensions.find((dimension) => dimension.Name === 'DistributionId');
const regionDimension = dimensions.find((dimension) => dimension.Name === 'Region');
assert(refValue(distributionDimension?.Value) === 'MediaDistributionId', 'CloudFront alarm DistributionId dimension must come from MediaDistributionId.');
assert(regionDimension?.Value === 'Global', 'CloudFront alarm Region dimension must be Global.');

assert(!raw.includes('TotalErrorRate'), 'TotalErrorRate must remain deferred until real public traffic provides a useful threshold.');
assert(!raw.includes('alias/aws/sns'), 'CloudWatch alarm SNS notifications must not use alias/aws/sns because encrypted service publishing needs a customer managed key policy.');
assert(template.Outputs?.AlarmTopicArn?.Value?.Ref === 'MediaAlarmTopic', 'Template must output AlarmTopicArn.');
assert(template.Outputs?.AlarmKmsKeyArn?.Value?.['Fn::GetAtt']?.[0] === 'MediaAlarmKey', 'Template must output AlarmKmsKeyArn.');
assert(template.Outputs?.CloudFront5xxAlarmName?.Value?.Ref === 'MediaCloudFront5xxErrorRateAlarm', 'Template must output CloudFront5xxAlarmName.');

console.log('media observability CloudFormation template validation passed');
