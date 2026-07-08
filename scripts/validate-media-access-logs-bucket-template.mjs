import { readFile } from 'node:fs/promises';
import path from 'node:path';

const templatePath = path.join(process.cwd(), 'infra', 'aws', 'media-access-logs-bucket.cloudformation.json');
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

const expectedEffectiveLogPrefix = 'AWSLogs/${AWS::AccountId}/CloudFront/cloudfront/media/';

const requiredResources = ['MediaAccessLogsBucket', 'MediaAccessLogsBucketPolicy'];

for (const resource of requiredResources) {
  assert(template.Resources?.[resource], `Missing required resource: ${resource}`);
}

const forbiddenSecretHints = ['AWS_SECRET_ACCESS_KEY', 'DATABASE_URL', 'PRIVATE KEY-----', 'CLOUDINARY_API_SECRET', 'UPSTASH_REDIS_REST_TOKEN'];
for (const hint of forbiddenSecretHints) {
  assert(!raw.includes(hint), `Template contains forbidden secret hint: ${hint}`);
}

assert(template.Description?.includes('Deploy in eu-central-1'), 'Template description must state that the bucket stack is deployed in eu-central-1.');

const bucketNameParam = template.Parameters?.BucketName;
assert(bucketNameParam?.Default === 'renuvex-review-images-logs-prod-989086371563-euc1', 'BucketName must default to the stable media log bucket name.');
assert(bucketNameParam?.AllowedPattern === '^renuvex-review-images-[a-z0-9.-]{3,41}$', 'BucketName must stay in the existing review-images S3 IAM namespace.');
assert(bucketNameParam.Default.length <= 63, 'BucketName default must fit the S3 63-character limit.');

const retentionParam = template.Parameters?.RetentionDays;
assert(retentionParam?.Default === 14, 'RetentionDays must default to 14 days.');
assert(JSON.stringify(retentionParam?.AllowedValues) === JSON.stringify([7, 14]), 'RetentionDays must be constrained to 7 or 14 days.');

const deliverySourceNameParam = template.Parameters?.DeliverySourceName;
assert(deliverySourceNameParam?.Default === 'renuvex-media-cf-access-logs', 'DeliverySourceName must match the us-east-1 delivery source name.');

const bucket = template.Resources.MediaAccessLogsBucket;
assert(bucket.Type === 'AWS::S3::Bucket', 'MediaAccessLogsBucket must be AWS::S3::Bucket.');
assert(bucket.DeletionPolicy === 'Retain', 'MediaAccessLogsBucket must retain data on stack delete.');
assert(bucket.UpdateReplacePolicy === 'Retain', 'MediaAccessLogsBucket must retain data on replacement.');
assert(refValue(bucket.Properties?.BucketName) === 'BucketName', 'MediaAccessLogsBucket name must come from the BucketName parameter.');

const ownershipRules = bucket.Properties?.OwnershipControls?.Rules ?? [];
assert(
  ownershipRules.some((rule) => rule.ObjectOwnership === 'BucketOwnerEnforced'),
  'MediaAccessLogsBucket must use BucketOwnerEnforced object ownership.',
);

const publicAccess = bucket.Properties?.PublicAccessBlockConfiguration;
assert(
  publicAccess?.BlockPublicAcls === true &&
    publicAccess?.BlockPublicPolicy === true &&
    publicAccess?.IgnorePublicAcls === true &&
    publicAccess?.RestrictPublicBuckets === true,
  'MediaAccessLogsBucket must block all public access settings.',
);

const encryptionRules = bucket.Properties?.BucketEncryption?.ServerSideEncryptionConfiguration ?? [];
assert(
  encryptionRules.some((rule) => rule.ServerSideEncryptionByDefault?.SSEAlgorithm === 'AES256'),
  'MediaAccessLogsBucket must use SSE-S3 encryption.',
);

assert(bucket.Properties?.VersioningConfiguration?.Status === 'Enabled', 'MediaAccessLogsBucket must enable versioning.');

const lifecycleRules = bucket.Properties?.LifecycleConfiguration?.Rules ?? [];
const logExpiryRule = lifecycleRules.find((rule) => rule.Id === 'expire-media-cloudfront-access-logs');
assert(logExpiryRule, 'MediaAccessLogsBucket must include a short-retention lifecycle rule.');
assert(logExpiryRule.Status === 'Enabled', 'Log expiry lifecycle rule must be enabled.');
assert(fnSubValue(logExpiryRule.Prefix) === expectedEffectiveLogPrefix, 'Log expiry lifecycle rule must target the effective CloudWatch Logs S3 delivery prefix.');
assert(refValue(logExpiryRule.ExpirationInDays) === 'RetentionDays', 'Log expiry must use RetentionDays.');
assert(refValue(logExpiryRule.NoncurrentVersionExpiration?.NoncurrentDays) === 'RetentionDays', 'Noncurrent versions must expire with RetentionDays.');
assert(logExpiryRule.AbortIncompleteMultipartUpload?.DaysAfterInitiation === 1, 'Incomplete multipart uploads must be aborted after 1 day.');

const policy = template.Resources.MediaAccessLogsBucketPolicy;
assert(policy.Type === 'AWS::S3::BucketPolicy', 'MediaAccessLogsBucketPolicy must be AWS::S3::BucketPolicy.');
assert(refValue(policy.Properties?.Bucket) === 'MediaAccessLogsBucket', 'Bucket policy must attach to MediaAccessLogsBucket.');

const statements = asArray(policy.Properties?.PolicyDocument?.Statement);
const denyInsecure = statements.find((statement) => statement.Sid === 'DenyInsecureTransport');
assert(denyInsecure?.Effect === 'Deny', 'Bucket policy must deny insecure transport.');
assert(denyInsecure?.Principal === '*', 'DenyInsecureTransport must apply to all principals.');
assert(denyInsecure?.Action === 's3:*', 'DenyInsecureTransport must cover all S3 actions.');
assert(denyInsecure?.Condition?.Bool?.['aws:SecureTransport'] === 'false', 'DenyInsecureTransport must check aws:SecureTransport=false.');

const deliveryWrite = statements.find((statement) => statement.Sid === 'AllowCloudWatchLogsDeliveryWrite');
assert(deliveryWrite?.Effect === 'Allow', 'Bucket policy must allow CloudWatch Logs delivery writes.');
assert(deliveryWrite?.Principal?.Service === 'delivery.logs.amazonaws.com', 'Delivery write principal must be delivery.logs.amazonaws.com.');
assert(deliveryWrite?.Action === 's3:PutObject', 'Delivery write must allow only s3:PutObject.');
assert(
  fnSubValue(deliveryWrite?.Resource) === `arn:\${AWS::Partition}:s3:::\${MediaAccessLogsBucket}/${expectedEffectiveLogPrefix}*`,
  'Delivery write resource must be scoped to the effective media log prefix only.',
);
assert(refValue(deliveryWrite?.Condition?.StringEquals?.['aws:SourceAccount']) === 'AWS::AccountId', 'Delivery write must scope by source account.');
assert(
  deliveryWrite?.Condition?.StringEquals?.['s3:x-amz-acl'] === 'bucket-owner-full-control',
  'Delivery write must require the bucket-owner-full-control canned ACL.',
);
assert(
  fnSubValue(deliveryWrite?.Condition?.ArnLike?.['aws:SourceArn']) ===
    'arn:${AWS::Partition}:logs:us-east-1:${AWS::AccountId}:delivery-source:${DeliverySourceName}',
  'Delivery write must scope by the exact us-east-1 delivery source ARN.',
);

assert(template.Outputs?.BucketArn?.Value?.['Fn::GetAtt']?.[0] === 'MediaAccessLogsBucket', 'Template must output the bucket ARN.');
assert(fnSubValue(template.Outputs?.LogPrefix?.Value) === expectedEffectiveLogPrefix, 'Template must output the effective CloudWatch Logs S3 delivery prefix.');

console.log('media access logs bucket CloudFormation template validation passed');
