import { readFile } from 'node:fs/promises';
import path from 'node:path';

const templatePath = path.join(process.cwd(), 'infra', 'aws', 'review-images-runtime-iam.cloudformation.json');
const raw = await readFile(templatePath, 'utf8');
const template = JSON.parse(raw);

function asArray(value) {
  return Array.isArray(value) ? value : value === undefined ? [] : [value];
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function fnSubValue(value) {
  return value && typeof value === 'object' && typeof value['Fn::Sub'] === 'string' ? value['Fn::Sub'] : null;
}

function refValue(value) {
  return value && typeof value === 'object' && typeof value.Ref === 'string' ? value.Ref : null;
}

const requiredResources = [
  'VercelOidcProvider',
  'ReviewImagesVercelRuntimeRole',
];

for (const resource of requiredResources) {
  assert(template.Resources?.[resource], `Missing required resource: ${resource}`);
}

const forbiddenSecretHints = [
  'PRIVATE KEY-----',
  'AWS_SECRET_ACCESS_KEY',
  'DATABASE_URL',
  'VERCEL_OIDC_TOKEN',
];
for (const hint of forbiddenSecretHints) {
  assert(!raw.includes(hint), `Template contains forbidden secret hint: ${hint}`);
}

const audienceParam = template.Parameters?.OidcAudience;
assert(audienceParam?.Default === 'sts.amazonaws.com', 'OidcAudience must default to sts.amazonaws.com.');
assert(JSON.stringify(audienceParam.AllowedValues) === JSON.stringify(['sts.amazonaws.com']), 'OidcAudience must be locked to sts.amazonaws.com.');
assert(template.Parameters?.VercelTeamSlug?.Default === 'renuvex', 'VercelTeamSlug must default to renuvex.');
assert(JSON.stringify(template.Parameters.VercelTeamSlug.AllowedValues) === JSON.stringify(['renuvex']), 'VercelTeamSlug must be locked to renuvex.');
assert(template.Parameters?.VercelProjectName?.Default === 'renuvex-product-reviews', 'VercelProjectName must default to renuvex-product-reviews.');
assert(JSON.stringify(template.Parameters.VercelProjectName.AllowedValues) === JSON.stringify(['renuvex-product-reviews']), 'VercelProjectName must be locked to renuvex-product-reviews.');

const oidcProvider = template.Resources.VercelOidcProvider;
assert(oidcProvider.Type === 'AWS::IAM::OIDCProvider', 'VercelOidcProvider must be AWS::IAM::OIDCProvider.');
assert(fnSubValue(oidcProvider.Properties?.Url) === 'https://oidc.vercel.com/${VercelTeamSlug}', 'OIDC provider must use Vercel team issuer URL.');
const clientIds = asArray(oidcProvider.Properties?.ClientIdList);
assert(clientIds.some((clientId) => fnSubValue(clientId) === 'https://vercel.com/${VercelTeamSlug}'), 'OIDC provider must include the Vercel default team audience.');
assert(clientIds.some((clientId) => refValue(clientId) === 'OidcAudience'), 'OIDC provider must include the custom AWS STS audience.');

const role = template.Resources.ReviewImagesVercelRuntimeRole;
assert(role.Type === 'AWS::IAM::Role', 'ReviewImagesVercelRuntimeRole must be AWS::IAM::Role.');
assert(role.Properties?.RoleName?.Ref === 'RuntimeRoleName', 'Runtime role name must come from RuntimeRoleName parameter.');
assert(role.Properties?.MaxSessionDuration === 3600, 'Runtime role MaxSessionDuration must be 3600 seconds.');

const trustStatements = asArray(role.Properties?.AssumeRolePolicyDocument?.Statement);
assert(trustStatements.length === 1, 'Runtime role must have exactly one trust statement.');
const trust = trustStatements[0];
assert(trust.Effect === 'Allow', 'Runtime role trust statement must Allow.');
assert(trust.Action === 'sts:AssumeRoleWithWebIdentity', 'Runtime role trust action must be sts:AssumeRoleWithWebIdentity.');
assert(trust.Principal?.Federated?.['Fn::GetAtt']?.[0] === 'VercelOidcProvider', 'Runtime role trust principal must reference the local OIDC provider.');
assert(trust.Principal?.Federated?.['Fn::GetAtt']?.[1] === 'Arn', 'Runtime role trust principal must use the OIDC provider ARN.');
const trustConditions = trust.Condition?.StringEquals;
assert(trustConditions?.['oidc.vercel.com/renuvex:aud']?.Ref === 'OidcAudience', 'Runtime role trust must exact-match the custom audience.');
assert(
  trustConditions?.['oidc.vercel.com/renuvex:sub']?.['Fn::Sub'] === 'owner:${VercelTeamSlug}:project:${VercelProjectName}:environment:${VercelEnvironment}',
  'Runtime role trust must exact-match the Vercel production project subject.',
);

const inlinePolicies = asArray(role.Properties?.Policies);
assert(inlinePolicies.length === 1, 'Runtime role must have exactly one inline policy.');
const policyStatements = asArray(inlinePolicies[0].PolicyDocument?.Statement);
const actions = policyStatements.flatMap((statement) => asArray(statement.Action));
const forbiddenActions = [
  'iam:PassRole',
  'iam:*',
  'cloudformation:*',
  's3:CreateBucket',
  's3:DeleteBucket',
  's3:PutBucketPolicy',
  's3:DeleteBucketPolicy',
  's3:PutBucketPublicAccessBlock',
  'cloudfront:UpdateDistribution',
  'cloudfront:DeleteDistribution',
  'cloudfront:CreateDistribution',
];
for (const action of forbiddenActions) {
  assert(!actions.includes(action), `Runtime role inline policy must not include ${action}.`);
}

const requiredActions = [
  's3:GetObject',
  's3:GetObjectTagging',
  's3:PutObject',
  's3:PutObjectTagging',
  's3:DeleteObject',
  's3:ListBucket',
  'cloudfront:CreateInvalidation',
];
for (const action of requiredActions) {
  assert(actions.includes(action), `Runtime role inline policy missing ${action}.`);
}

const objectStatement = policyStatements.find((statement) => statement.Sid === 'ReviewImageObjectReadWritePrivateAndPublicPrefixes');
assert(objectStatement, 'Runtime role must include object read/write statement.');
const objectResources = asArray(objectStatement.Resource).map(fnSubValue).sort();
assert(
  JSON.stringify(objectResources) === JSON.stringify([
    'arn:${AWS::Partition}:s3:::${ReviewImagesBucketName}/review-images/v1/private/*',
    'arn:${AWS::Partition}:s3:::${ReviewImagesBucketName}/review-images/v1/public/*',
  ].sort()),
  'Runtime role object permissions must be scoped to private/public review-image prefixes.',
);

const listStatement = policyStatements.find((statement) => statement.Sid === 'ReviewImageFamilyListPrivateAndPublicPrefixes');
assert(listStatement?.Condition?.StringLike?.['s3:prefix'], 'Runtime role ListBucket must include s3:prefix condition.');
assert(
  JSON.stringify(listStatement.Condition.StringLike['s3:prefix'].sort()) === JSON.stringify([
    'review-images/v1/private/*',
    'review-images/v1/public/*',
  ].sort()),
  'Runtime role ListBucket prefixes must be restricted to review-image private/public prefixes.',
);

const invalidationStatement = policyStatements.find((statement) => statement.Sid === 'ReviewImageExactDistributionInvalidation');
assert(
  fnSubValue(invalidationStatement?.Resource) === 'arn:${AWS::Partition}:cloudfront::${AWS::AccountId}:distribution/${ReviewImagesDistributionId}',
  'Runtime role CloudFront invalidation must be scoped to the configured distribution id.',
);

assert(template.Outputs?.RuntimeRoleArn?.Value?.['Fn::GetAtt']?.[0] === 'ReviewImagesVercelRuntimeRole', 'Template must output RuntimeRoleArn.');
assert(template.Outputs?.OidcProviderArn?.Value?.['Fn::GetAtt']?.[0] === 'VercelOidcProvider', 'Template must output OidcProviderArn.');

console.log('review-images runtime IAM CloudFormation template validation passed');
