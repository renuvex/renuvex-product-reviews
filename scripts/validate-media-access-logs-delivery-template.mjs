import { readFile } from 'node:fs/promises';
import path from 'node:path';

const templatePath = path.join(process.cwd(), 'infra', 'aws', 'media-access-logs-delivery.cloudformation.json');
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

const requiredResources = ['MediaAccessLogsDeliverySource', 'MediaAccessLogsDeliveryDestination', 'MediaAccessLogsDelivery'];

for (const resource of requiredResources) {
  assert(template.Resources?.[resource], `Missing required resource: ${resource}`);
}

const forbiddenSecretHints = ['AWS_SECRET_ACCESS_KEY', 'DATABASE_URL', 'PRIVATE KEY-----', 'CLOUDINARY_API_SECRET', 'UPSTASH_REDIS_REST_TOKEN'];
for (const hint of forbiddenSecretHints) {
  assert(!raw.includes(hint), `Template contains forbidden secret hint: ${hint}`);
}

assert(template.Description?.includes('Deploy in us-east-1'), 'Template description must state that delivery is deployed in us-east-1.');

const distributionParam = template.Parameters?.MediaDistributionId;
assert(distributionParam?.Default === 'E1205OOLPZDB00', 'MediaDistributionId must default to the current media CloudFront distribution id.');
assert(distributionParam?.AllowedPattern === '^[A-Z0-9]+$', 'MediaDistributionId must constrain CloudFront distribution ids.');

const sourceNameParam = template.Parameters?.DeliverySourceName;
assert(sourceNameParam?.Default === 'renuvex-media-cf-access-logs', 'DeliverySourceName must be stable.');
assert(sourceNameParam?.AllowedPattern === '^[A-Za-z0-9_-]{1,60}$', 'DeliverySourceName must match CloudWatch Logs delivery source constraints.');

const destinationNameParam = template.Parameters?.DeliveryDestinationName;
assert(destinationNameParam?.Default === 'renuvex-media-cf-access-logs-s3', 'DeliveryDestinationName must be stable.');

const bucketArnParam = template.Parameters?.DestinationBucketArn;
assert(
  bucketArnParam?.Default === 'arn:aws:s3:::renuvex-review-images-logs-prod-989086371563-euc1',
  'DestinationBucketArn must default to the EU media access log bucket.',
);
assert(
  bucketArnParam?.AllowedPattern === '^arn:aws:s3:::renuvex-review-images-[a-z0-9.-]{3,41}$',
  'DestinationBucketArn must stay in the existing review-images S3 IAM namespace.',
);

const suffixParam = template.Parameters?.S3SuffixPath;
assert(
  suffixParam?.Default === 'cloudfront/media/{DistributionId}/{yyyy}/{MM}/{dd}/{HH}/',
  'S3SuffixPath must use deterministic distribution/hour partitioning.',
);
assert(
  suffixParam?.AllowedPattern === '^cloudfront/media/\\{DistributionId\\}/\\{yyyy\\}/\\{MM\\}/\\{dd\\}/\\{HH\\}/$',
  'S3SuffixPath must stay in the media log prefix and use only approved suffix variables.',
);

const source = template.Resources.MediaAccessLogsDeliverySource;
assert(source.Type === 'AWS::Logs::DeliverySource', 'MediaAccessLogsDeliverySource must be AWS::Logs::DeliverySource.');
assert(refValue(source.Properties?.Name) === 'DeliverySourceName', 'Delivery source name must come from DeliverySourceName.');
assert(
  fnSubValue(source.Properties?.ResourceArn) === 'arn:${AWS::Partition}:cloudfront::${AWS::AccountId}:distribution/${MediaDistributionId}',
  'Delivery source must target the media CloudFront distribution ARN.',
);
assert(source.Properties?.LogType === 'ACCESS_LOGS', 'Delivery source must use CloudFront ACCESS_LOGS.');

const destination = template.Resources.MediaAccessLogsDeliveryDestination;
assert(destination.Type === 'AWS::Logs::DeliveryDestination', 'MediaAccessLogsDeliveryDestination must be AWS::Logs::DeliveryDestination.');
assert(refValue(destination.Properties?.Name) === 'DeliveryDestinationName', 'Delivery destination name must come from DeliveryDestinationName.');
assert(destination.Properties?.DeliveryDestinationType === 'S3', 'Delivery destination type must be S3.');
assert(refValue(destination.Properties?.DestinationResourceArn) === 'DestinationBucketArn', 'Delivery destination must use DestinationBucketArn.');
assert(destination.Properties?.OutputFormat === 'plain', 'Delivery destination output format must be plain to avoid Parquet conversion cost.');
assert(!destination.Properties?.DeliveryDestinationPolicy, 'Delivery destination policy must stay omitted for same-account delivery.');

const delivery = template.Resources.MediaAccessLogsDelivery;
assert(delivery.Type === 'AWS::Logs::Delivery', 'MediaAccessLogsDelivery must be AWS::Logs::Delivery.');
assert(asArray(delivery.DependsOn).includes('MediaAccessLogsDeliverySource'), 'Delivery must depend on the delivery source.');
assert(asArray(delivery.DependsOn).includes('MediaAccessLogsDeliveryDestination'), 'Delivery must depend on the delivery destination.');
assert(refValue(delivery.Properties?.DeliverySourceName) === 'DeliverySourceName', 'Delivery must use DeliverySourceName.');
assert(delivery.Properties?.DeliveryDestinationArn?.['Fn::GetAtt']?.[0] === 'MediaAccessLogsDeliveryDestination', 'Delivery must target the local delivery destination.');
assert(delivery.Properties?.FieldDelimiter === '\t', 'Delivery must use tab-delimited plain logs.');
assert(delivery.Properties?.S3EnableHiveCompatiblePath === false, 'Hive-compatible paths must stay disabled for MVP logging.');
assert(refValue(delivery.Properties?.S3SuffixPath) === 'S3SuffixPath', 'Delivery must use the S3SuffixPath parameter.');

const recordFields = delivery.Properties?.RecordFields ?? [];
const requiredFields = [
  'date',
  'time',
  'x-edge-location',
  'sc-bytes',
  'c-ip',
  'cs-method',
  'cs(Host)',
  'cs-uri-stem',
  'sc-status',
  'cs(Referer)',
  'cs(User-Agent)',
  'x-edge-result-type',
  'x-edge-request-id',
  'time-taken',
  'x-edge-detailed-result-type',
  'sc-content-type',
  'c-country',
  'cache-behavior-path-pattern',
];
for (const field of requiredFields) {
  assert(recordFields.includes(field), `RecordFields must include ${field}.`);
}

const forbiddenFields = ['cs-uri-query', 'cs(Cookie)', 'viewer-request-log-data', 'viewer-response-log-data'];
for (const field of forbiddenFields) {
  assert(!recordFields.includes(field), `RecordFields must not include ${field}.`);
}

assert(!raw.includes('Firehose'), 'Template must not configure Firehose.');
assert(!raw.includes('parquet'), 'Template must not configure Parquet output.');
assert(!raw.includes('CONNECTION_LOGS'), 'Template must not configure CloudFront connection logs.');
assert(!raw.includes('AWS::CloudFront::Distribution'), 'Template must not mutate the CloudFront distribution resource.');

assert(template.Outputs?.DeliverySourceArn?.Value?.['Fn::GetAtt']?.[0] === 'MediaAccessLogsDeliverySource', 'Template must output DeliverySourceArn.');
assert(template.Outputs?.DeliveryDestinationArn?.Value?.['Fn::GetAtt']?.[0] === 'MediaAccessLogsDeliveryDestination', 'Template must output DeliveryDestinationArn.');
assert(template.Outputs?.DeliveryArn?.Value?.['Fn::GetAtt']?.[0] === 'MediaAccessLogsDelivery', 'Template must output DeliveryArn.');

console.log('media access logs delivery CloudFormation template validation passed');
