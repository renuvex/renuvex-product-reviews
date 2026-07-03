import { readFile } from 'node:fs/promises';
import path from 'node:path';

const templatePath = path.join(process.cwd(), 'infra', 'aws', 'review-images.cloudformation.json');
const raw = await readFile(templatePath, 'utf8');
const template = JSON.parse(raw);

function asArray(value) {
  return Array.isArray(value) ? value : value === undefined ? [] : [value];
}

function fnSubValue(value) {
  return value && typeof value === 'object' && typeof value['Fn::Sub'] === 'string' ? value['Fn::Sub'] : null;
}

const requiredResources = [
  'ReviewImagesBucket',
  'ReviewImagesOriginAccessControl',
  'ReviewImagesCachePolicy',
  'ReviewImagesResponseHeadersPolicy',
  'ReviewImagesDistribution',
  'ReviewImagesBucketPolicy',
];

for (const resource of requiredResources) {
  if (!template.Resources?.[resource]) {
    throw new Error(`Missing required resource: ${resource}`);
  }
}

const forbiddenSecretHints = [
  'PRIVATE KEY-----',
  'AWS_SECRET_ACCESS_KEY',
  'CLOUDINARY_API_SECRET',
  'DATABASE_URL',
];
for (const hint of forbiddenSecretHints) {
  if (raw.includes(hint)) {
    throw new Error(`Template contains forbidden secret hint: ${hint}`);
  }
}

const bucket = template.Resources.ReviewImagesBucket;
if (bucket.DeletionPolicy !== 'Retain' || bucket.UpdateReplacePolicy !== 'Retain') {
  throw new Error('ReviewImagesBucket must use Retain policies.');
}

const publicAccess = bucket.Properties?.PublicAccessBlockConfiguration;
if (!publicAccess?.BlockPublicAcls || !publicAccess?.BlockPublicPolicy || !publicAccess?.IgnorePublicAcls || !publicAccess?.RestrictPublicBuckets) {
  throw new Error('ReviewImagesBucket must block all public access settings.');
}

const corsRules = bucket.Properties?.CorsConfiguration?.CorsRules ?? [];
const uploadCors = corsRules.find((rule) => rule.Id === 'browser-presigned-post-upload');
if (!uploadCors) {
  throw new Error('ReviewImagesBucket must include browser-presigned-post-upload CORS rule.');
}
if (!uploadCors.AllowedMethods?.includes('POST')) {
  throw new Error('ReviewImagesBucket upload CORS must allow POST.');
}
if (!uploadCors.AllowedOrigins?.includes('*')) {
  throw new Error('ReviewImagesBucket upload CORS must allow wildcard origins until merchant origin allowlists exist.');
}
if (!uploadCors.AllowedHeaders?.includes('*')) {
  throw new Error('ReviewImagesBucket upload CORS must allow signed S3 POST headers.');
}
if (uploadCors.AllowedMethods?.some((method) => method !== 'POST')) {
  throw new Error('ReviewImagesBucket upload CORS must not allow browser GET/PUT/DELETE for private objects.');
}

const oac = template.Resources.ReviewImagesOriginAccessControl;
const oacConfig = oac.Properties?.OriginAccessControlConfig;
if (oacConfig?.SigningBehavior !== 'always' || oacConfig?.OriginAccessControlOriginType !== 's3') {
  throw new Error('ReviewImagesOriginAccessControl must always sign S3 origin requests.');
}

const distribution = template.Resources.ReviewImagesDistribution;
const defaultBehavior = distribution.Properties?.DistributionConfig?.DefaultCacheBehavior;
if (!Array.isArray(defaultBehavior?.TrustedKeyGroups) || defaultBehavior.TrustedKeyGroups.length === 0) {
  throw new Error('Default CloudFront behavior must require a trusted key group for private paths.');
}
const cacheBehaviors = distribution.Properties?.DistributionConfig?.CacheBehaviors ?? [];
const publicBehavior = cacheBehaviors.find((behavior) => behavior.PathPattern === 'review-images/v1/public/*');
if (!publicBehavior) {
  throw new Error('CloudFront distribution must include an unsigned public variants cache behavior.');
}
if (publicBehavior.TrustedKeyGroups) {
  throw new Error('Public variants cache behavior must not require signed URLs.');
}

const bucketPolicy = template.Resources.ReviewImagesBucketPolicy;
const statements = asArray(bucketPolicy.Properties?.PolicyDocument?.Statement);
const denyInsecure = statements.find((statement) => statement.Sid === 'DenyInsecureTransport');
if (
  !denyInsecure ||
  denyInsecure.Effect !== 'Deny' ||
  denyInsecure.Action !== 's3:*' ||
  denyInsecure.Condition?.Bool?.['aws:SecureTransport'] !== 'false'
) {
  throw new Error('ReviewImagesBucketPolicy must deny insecure transport.');
}

const cloudFrontRead = statements.find((statement) => statement.Sid === 'AllowCloudFrontReadOnly');
if (!cloudFrontRead || cloudFrontRead.Effect !== 'Allow' || cloudFrontRead.Action !== 's3:GetObject') {
  throw new Error('ReviewImagesBucketPolicy must allow CloudFront read-only object access.');
}

const cloudFrontReadResources = asArray(cloudFrontRead.Resource).map(fnSubValue).filter(Boolean).sort();
const expectedCloudFrontReadResources = [
  'arn:${AWS::Partition}:s3:::${ReviewImagesBucket}/review-images/v1/private/stores/*/assets/*/variants/*',
  'arn:${AWS::Partition}:s3:::${ReviewImagesBucket}/review-images/v1/public/*',
].sort();
if (JSON.stringify(cloudFrontReadResources) !== JSON.stringify(expectedCloudFrontReadResources)) {
  throw new Error('CloudFront S3 read policy must be scoped to public variants and private variants only.');
}
if (raw.includes('/review-images/v1/*') || raw.includes('/review-images/v1/private/*')) {
  throw new Error('CloudFront S3 read policy must not include broad review-image or private-original prefixes.');
}

const previewPublicKeyOutput = template.Outputs?.PreviewPublicKeyId?.Value;
if (!previewPublicKeyOutput || previewPublicKeyOutput.Ref !== 'ReviewImagesPreviewPublicKey') {
  throw new Error('Outputs.PreviewPublicKeyId must expose the CloudFront public key id.');
}

console.log('review-images CloudFormation template validation passed');
