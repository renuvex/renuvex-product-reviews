import { readFile } from 'node:fs/promises';
import path from 'node:path';

const templatePath = path.join(process.cwd(), 'infra', 'aws', 'review-email-runtime-iam.cloudformation.json');
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
  'ReviewEmailVercelRuntimeRole',
];

for (const resource of requiredResources) {
  assert(template.Resources?.[resource], `Missing required resource: ${resource}`);
}

for (const [logicalId, resource] of Object.entries(template.Resources ?? {})) {
  assert(resource?.Type !== 'AWS::IAM::OIDCProvider', `Runtime email stack must not create duplicate OIDC provider: ${logicalId}`);
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
assert(template.Parameters?.RuntimeRoleName?.Default === 'renuvex-review-email-vercel-runtime', 'RuntimeRoleName must default to the review-email role name.');
assert(
  template.Parameters?.VercelOidcProviderArn?.Default === 'arn:aws:iam::989086371563:oidc-provider/oidc.vercel.com/renuvex',
  'VercelOidcProviderArn must default to the existing Renuvex Vercel OIDC provider ARN.',
);
assert(template.Parameters?.OidcAudience?.Default === 'sts.amazonaws.com', 'OidcAudience must default to sts.amazonaws.com.');
assert(JSON.stringify(template.Parameters.OidcAudience.AllowedValues) === JSON.stringify(['sts.amazonaws.com']), 'OidcAudience must be locked to sts.amazonaws.com.');
assert(template.Parameters?.VercelTeamSlug?.Default === 'renuvex', 'VercelTeamSlug must default to renuvex.');
assert(JSON.stringify(template.Parameters.VercelTeamSlug.AllowedValues) === JSON.stringify(['renuvex']), 'VercelTeamSlug must be locked to renuvex.');
assert(template.Parameters?.VercelProjectName?.Default === 'renuvex-product-reviews', 'VercelProjectName must default to renuvex-product-reviews.');
assert(JSON.stringify(template.Parameters.VercelProjectName.AllowedValues) === JSON.stringify(['renuvex-product-reviews']), 'VercelProjectName must be locked.');
assert(template.Parameters?.VercelEnvironment?.Default === 'production', 'VercelEnvironment must default to production.');
assert(JSON.stringify(template.Parameters.VercelEnvironment.AllowedValues) === JSON.stringify(['production']), 'VercelEnvironment must be locked to production.');
assert(template.Parameters?.SenderDomain?.Default === 'reviews.renuvex.app', 'SenderDomain must default to reviews.renuvex.app.');
assert(template.Parameters?.FromAddress?.Default === 'requests@reviews.renuvex.app', 'FromAddress must default to requests@reviews.renuvex.app.');
assert(template.Parameters?.ConfigurationSetName?.Default === 'renuvex-review-requests-prod', 'ConfigurationSetName must default to renuvex-review-requests-prod.');

const role = template.Resources.ReviewEmailVercelRuntimeRole;
assert(role.Type === 'AWS::IAM::Role', 'ReviewEmailVercelRuntimeRole must be AWS::IAM::Role.');
assert(refValue(role.Properties?.RoleName) === 'RuntimeRoleName', 'Runtime role name must come from RuntimeRoleName parameter.');
assert(role.Properties?.MaxSessionDuration === 3600, 'Runtime role MaxSessionDuration must be 3600 seconds.');

const trustStatements = asArray(role.Properties?.AssumeRolePolicyDocument?.Statement);
assert(trustStatements.length === 1, 'Runtime role must have exactly one trust statement.');
const trust = trustStatements[0];
assert(trust.Effect === 'Allow', 'Runtime role trust statement must Allow.');
assert(trust.Action === 'sts:AssumeRoleWithWebIdentity', 'Runtime role trust action must be sts:AssumeRoleWithWebIdentity.');
assert(refValue(trust.Principal?.Federated) === 'VercelOidcProviderArn', 'Runtime role trust principal must use the existing OIDC provider ARN parameter.');
const trustConditions = trust.Condition?.StringEquals;
assert(refValue(trustConditions?.['oidc.vercel.com/renuvex:aud']) === 'OidcAudience', 'Runtime role trust must exact-match the custom audience.');
assert(
  fnSubValue(trustConditions?.['oidc.vercel.com/renuvex:sub']) === 'owner:${VercelTeamSlug}:project:${VercelProjectName}:environment:${VercelEnvironment}',
  'Runtime role trust must exact-match the Vercel production project subject.',
);

const inlinePolicies = asArray(role.Properties?.Policies);
assert(inlinePolicies.length === 1, 'Runtime role must have exactly one inline policy.');
const policyStatements = asArray(inlinePolicies[0].PolicyDocument?.Statement);
assert(policyStatements.length === 1, 'Runtime role inline policy must have exactly one statement.');
const sendStatement = policyStatements[0];
assert(sendStatement.Sid === 'ReviewEmailSendFromManagedIdentity', 'Runtime role send statement Sid must be stable.');
assert(sendStatement.Effect === 'Allow', 'Runtime role send statement must Allow.');
assert(sendStatement.Action === 'ses:SendEmail', 'Runtime role must allow only ses:SendEmail.');

const actions = policyStatements.flatMap((statement) => asArray(statement.Action));
const forbiddenActions = [
  'ses:*',
  'ses:SendRawEmail',
  'ses:SendBulkEmail',
  'ses:CreateEmailIdentity',
  'ses:DeleteEmailIdentity',
  'ses:CreateConfigurationSet',
  'ses:DeleteConfigurationSet',
  'ses:PutConfigurationSetEventDestination',
  'iam:PassRole',
  'iam:*',
  'cloudformation:*',
  's3:*',
  'sns:*',
  'sqs:*',
];
for (const action of forbiddenActions) {
  assert(!actions.includes(action), `Runtime role inline policy must not include ${action}.`);
}

const resources = asArray(sendStatement.Resource).map(fnSubValue).sort();
assert(
  JSON.stringify(resources) === JSON.stringify([
    'arn:${AWS::Partition}:ses:${AWS::Region}:${AWS::AccountId}:configuration-set/${ConfigurationSetName}',
    'arn:${AWS::Partition}:ses:${AWS::Region}:${AWS::AccountId}:identity/${SenderDomain}',
  ].sort()),
  'Runtime role SendEmail resources must be scoped to the sender identity and configuration set.',
);
assert(refValue(sendStatement.Condition?.StringEquals?.['ses:FromAddress']) === 'FromAddress', 'Runtime role must exact-match ses:FromAddress.');

assert(template.Outputs?.RuntimeRoleArn?.Value?.['Fn::GetAtt']?.[0] === 'ReviewEmailVercelRuntimeRole', 'Template must output RuntimeRoleArn.');
assert(template.Outputs?.RuntimeRoleName?.Value?.Ref === 'ReviewEmailVercelRuntimeRole', 'Template must output RuntimeRoleName.');
assert(template.Outputs?.TrustedVercelSubject?.Value?.['Fn::Sub'] === 'owner:${VercelTeamSlug}:project:${VercelProjectName}:environment:${VercelEnvironment}', 'Template must output TrustedVercelSubject.');
assert(template.Outputs?.AllowedFromAddress?.Value?.Ref === 'FromAddress', 'Template must output AllowedFromAddress.');

console.log('review-email runtime IAM CloudFormation template validation passed');
