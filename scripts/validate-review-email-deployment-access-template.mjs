import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { declaredResourceTypes } from './lib/review-email-cloudformation-contract.mjs';

const templatePath = path.join(process.cwd(), 'infra', 'aws', 'review-email-deployment-access.cloudformation.json');
const raw = await readFile(templatePath, 'utf8');
const template = JSON.parse(raw);
const foundationTemplate = JSON.parse(
  await readFile(path.join(process.cwd(), 'infra', 'aws', 'review-email-foundation.cloudformation.json'), 'utf8'),
);
const journalTemplate = JSON.parse(
  await readFile(path.join(process.cwd(), 'infra', 'aws', 'review-email-erasure-journal.cloudformation.json'), 'utf8'),
);

const REGION = 'eu-central-1';
const ACCOUNT_ID = '989086371563';
const ROLE_PATH = '/renuvex/review-email/cloudformation/';

const stackRoleMap = {
  CreateFoundationChangeSetWithFoundationRole: {
    approvalNameParameter: 'ApprovedFoundationChangeSetName',
    executionExpiryParameter: 'FoundationExecutionApprovalExpiresAt',
    executionSid: 'ExecuteApprovedFoundationChangeSet',
    purpose: 'review-request-email',
    resourceTypes: declaredResourceTypes(foundationTemplate),
    stackName: 'renuvex-review-email-foundation-prod',
    changeSetPrefix: 'renuvex-review-email-foundation-',
    roleName: 'renuvex-review-email-foundation-cfn',
  },
  CreateJournalChangeSetWithJournalRole: {
    approvalNameParameter: 'ApprovedJournalChangeSetName',
    executionExpiryParameter: 'JournalExecutionApprovalExpiresAt',
    executionSid: 'ExecuteApprovedJournalChangeSet',
    purpose: 'review-email-erasure-journal',
    resourceTypes: declaredResourceTypes(journalTemplate),
    stackName: 'renuvex-review-email-erasure-journal-prod',
    changeSetPrefix: 'renuvex-review-email-journal-',
    roleName: 'renuvex-review-email-journal-cfn',
  },
  CreateJournalIamChangeSetWithJournalIamRole: {
    approvalNameParameter: 'ApprovedJournalIamChangeSetName',
    executionExpiryParameter: 'JournalIamExecutionApprovalExpiresAt',
    executionSid: 'ExecuteApprovedJournalIamChangeSet',
    purpose: 'review-email-erasure-journal-iam',
    resourceTypes: null,
    stackName: 'renuvex-review-email-erasure-journal-iam-prod',
    changeSetPrefix: 'renuvex-review-email-journal-iam-',
    roleName: 'renuvex-review-email-journal-iam-cfn',
  },
};

const serviceRoleMap = {
  ReviewEmailFoundationCloudFormationRole: 'renuvex-review-email-foundation-cfn',
  ReviewEmailJournalCloudFormationRole: 'renuvex-review-email-journal-cfn',
  ReviewEmailJournalIamCloudFormationRole: 'renuvex-review-email-journal-iam-cfn',
};

const expectedOperatorActions = new Set([
  'cloudformation:CreateChangeSet',
  'cloudformation:DescribeAccountLimits',
  'cloudformation:DescribeChangeSet',
  'cloudformation:DescribeEvents',
  'cloudformation:DescribeStackEvents',
  'cloudformation:DescribeStackResource',
  'cloudformation:DescribeStackResources',
  'cloudformation:DescribeStacks',
  'cloudformation:ExecuteChangeSet',
  'cloudformation:GetStackPolicy',
  'cloudformation:GetTemplate',
  'cloudformation:GetTemplateSummary',
  'cloudformation:ListChangeSets',
  'cloudformation:ListStackResources',
  'cloudformation:ListStacks',
  'cloudformation:ValidateTemplate',
  'iam:PassRole',
]);

const expectedFoundationActions = new Set([
  'kms:CreateAlias',
  'kms:CreateKey',
  'kms:DeleteAlias',
  'kms:DescribeKey',
  'kms:DisableKeyRotation',
  'kms:EnableKeyRotation',
  'kms:GetKeyPolicy',
  'kms:GetKeyRotationStatus',
  'kms:ListAliases',
  'kms:ListKeys',
  'kms:ListResourceTags',
  'kms:PutKeyPolicy',
  'kms:ScheduleKeyDeletion',
  'kms:TagResource',
  'kms:UntagResource',
  'kms:UpdateAlias',
  'kms:UpdateKeyDescription',
  'ses:CreateConfigurationSet',
  'ses:CreateConfigurationSetEventDestination',
  'ses:CreateEmailIdentity',
  'ses:DeleteConfigurationSet',
  'ses:DeleteConfigurationSetEventDestination',
  'ses:DeleteEmailIdentity',
  'ses:DescribeConfigurationSet',
  'ses:GetConfigurationSet',
  'ses:GetConfigurationSetEventDestinations',
  'ses:GetEmailIdentity',
  'ses:ListConfigurationSets',
  'ses:ListEmailIdentities',
  'ses:ListTagsForResource',
  'ses:PutConfigurationSetReputationOptions',
  'ses:PutConfigurationSetSendingOptions',
  'ses:PutConfigurationSetSuppressionOptions',
  'ses:PutEmailIdentityConfigurationSetAttributes',
  'ses:PutEmailIdentityDkimAttributes',
  'ses:PutEmailIdentityDkimSigningAttributes',
  'ses:PutEmailIdentityFeedbackAttributes',
  'ses:PutEmailIdentityMailFromAttributes',
  'ses:TagResource',
  'ses:UntagResource',
  'ses:UpdateConfigurationSetEventDestination',
  'sns:CreateTopic',
  'sns:DeleteTopic',
  'sns:GetDataProtectionPolicy',
  'sns:GetSubscriptionAttributes',
  'sns:GetTopicAttributes',
  'sns:ListSubscriptions',
  'sns:ListSubscriptionsByTopic',
  'sns:ListTagsForResource',
  'sns:ListTopics',
  'sns:SetSubscriptionAttributes',
  'sns:SetTopicAttributes',
  'sns:Subscribe',
  'sns:TagResource',
  'sns:Unsubscribe',
  'sns:UntagResource',
  'sqs:CreateQueue',
  'sqs:DeleteQueue',
  'sqs:GetQueueAttributes',
  'sqs:GetQueueUrl',
  'sqs:ListQueues',
  'sqs:ListQueueTags',
  'sqs:SetQueueAttributes',
  'sqs:TagQueue',
  'sqs:UntagQueue',
]);

const expectedJournalActions = new Set([
  's3:CreateBucket',
  's3:DeleteBucketPolicy',
  's3:GetBucketAcl',
  's3:GetBucketObjectLockConfiguration',
  's3:GetBucketOwnershipControls',
  's3:GetBucketPolicy',
  's3:GetBucketPublicAccessBlock',
  's3:GetBucketTagging',
  's3:GetBucketVersioning',
  's3:GetEncryptionConfiguration',
  's3:GetLifecycleConfiguration',
  's3:ListAllMyBuckets',
  's3:ListBucket',
  's3:ListTagsForResource',
  's3:PutBucketObjectLockConfiguration',
  's3:PutBucketOwnershipControls',
  's3:PutBucketPolicy',
  's3:PutBucketPublicAccessBlock',
  's3:PutBucketTagging',
  's3:PutBucketVersioning',
  's3:PutEncryptionConfiguration',
  's3:PutLifecycleConfiguration',
  's3:TagResource',
  's3:UntagResource',
]);

const expectedJournalIamActions = new Set([
  'iam:CreateRole',
  'iam:DeleteRole',
  'iam:DeleteRolePolicy',
  'iam:GetRole',
  'iam:GetRolePolicy',
  'iam:ListAttachedRolePolicies',
  'iam:ListRolePolicies',
  'iam:ListRoles',
  'iam:PutRolePolicy',
  'iam:TagRole',
  'iam:UntagRole',
  'iam:UpdateAssumeRolePolicy',
  'iam:UpdateRole',
  'iam:UpdateRoleDescription',
]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function asArray(value) {
  return Array.isArray(value) ? value : value === undefined ? [] : [value];
}

function refValue(value) {
  return value && typeof value === 'object' && typeof value.Ref === 'string' ? value.Ref : null;
}

function fnSubValue(value) {
  return value && typeof value === 'object' && typeof value['Fn::Sub'] === 'string' ? value['Fn::Sub'] : null;
}

function getAtt(value) {
  const result = value?.['Fn::GetAtt'];
  return Array.isArray(result) && result.length === 2 ? result : null;
}

function statements(policyDocument) {
  return asArray(policyDocument?.Statement);
}

function statementBySid(policyDocument, sid) {
  return statements(policyDocument).find((statement) => statement.Sid === sid);
}

function actionSet(policyDocument) {
  return new Set(statements(policyDocument).flatMap((statement) => asArray(statement.Action)));
}

function assertSetEqual(actual, expected, label) {
  const missing = [...expected].filter((value) => !actual.has(value));
  const extra = [...actual].filter((value) => !expected.has(value));
  assert(missing.length === 0 && extra.length === 0, `${label} action set mismatch. Missing: ${missing.join(', ') || 'none'}; extra: ${extra.join(', ') || 'none'}.`);
}

function assertNoWildcardActions(policyDocument, label) {
  for (const action of actionSet(policyDocument)) {
    assert(typeof action === 'string' && !action.includes('*'), `${label} must not contain wildcard action: ${action}`);
  }
}

function inlinePolicy(role) {
  const policies = asArray(role?.Properties?.Policies);
  assert(policies.length === 1, `${role?.Properties?.RoleName ?? 'service role'} must have exactly one inline policy.`);
  assert(!role?.Properties?.ManagedPolicyArns, `${role.Properties.RoleName} must not attach managed policies.`);
  assert(!role?.Properties?.PermissionsBoundary, `${role.Properties.RoleName} must not define a permissions boundary in this bootstrap package.`);
  return policies[0]?.PolicyDocument;
}

function assertCloudFormationTrust(role, logicalId) {
  const trustStatements = statements(role?.Properties?.AssumeRolePolicyDocument);
  assert(trustStatements.length === 1, `${logicalId} trust policy must have exactly one statement.`);
  const trust = trustStatements[0];
  assert(trust.Effect === 'Allow', `${logicalId} trust statement must allow.`);
  assert(trust.Action === 'sts:AssumeRole', `${logicalId} trust must allow only sts:AssumeRole.`);
  assert(trust.Principal?.Service === 'cloudformation.amazonaws.com', `${logicalId} trust principal must be CloudFormation only.`);
  assert(!trust.Principal?.AWS && !trust.Principal?.Federated, `${logicalId} must not trust a human or federated principal.`);
  assert(!trust.Condition, `${logicalId} trust must not contain an unverified human/source condition.`);
}

function assertOnlyAllowedWildcardResources(policyDocument, allowedSids, label) {
  for (const statement of statements(policyDocument)) {
    if (asArray(statement.Resource).includes('*')) {
      assert(allowedSids.has(statement.Sid), `${label} statement ${statement.Sid} must not use Resource "*".`);
    }
  }
}

const resources = template.Resources ?? {};
const requiredResources = [
  'ReviewEmailOperatorsGroup',
  'ReviewEmailOperatorMembership',
  'ReviewEmailOperatorPermissionSet',
  'ReviewEmailOperatorAssignment',
  ...Object.keys(serviceRoleMap),
];
assert(JSON.stringify(Object.keys(resources).sort()) === JSON.stringify(requiredResources.sort()), 'Access template resource inventory must remain exact and sender-free.');

assert(template.Description?.includes('Source-controlled'), 'Template description must state that this is source-controlled access infrastructure.');
assert(template.Description?.includes('eu-central-1'), 'Template description must lock the bootstrap region to eu-central-1.');
assert(template.Parameters?.IdentityCenterInstanceArn && !('Default' in template.Parameters.IdentityCenterInstanceArn), 'IdentityCenterInstanceArn must be a deployment parameter without a default.');
assert(template.Parameters?.IdentityStoreId && !('Default' in template.Parameters.IdentityStoreId), 'IdentityStoreId must be a deployment parameter without a default.');
assert(template.Parameters?.OperatorUserId && !('Default' in template.Parameters.OperatorUserId), 'OperatorUserId must be a deployment parameter without a default.');
assert(template.Parameters?.TargetAccountId?.Default === ACCOUNT_ID, 'Target account must be locked to the approved account.');
assert(JSON.stringify(template.Parameters.TargetAccountId.AllowedValues) === JSON.stringify([ACCOUNT_ID]), 'TargetAccountId must have one allowed account.');
assert(template.Parameters?.DeploymentRegion?.Default === REGION, 'Deployment region must default to eu-central-1.');
assert(JSON.stringify(template.Parameters.DeploymentRegion.AllowedValues) === JSON.stringify([REGION]), 'DeploymentRegion must be locked to eu-central-1.');
for (const {
  approvalNameParameter,
  changeSetPrefix,
  executionExpiryParameter,
} of Object.values(stackRoleMap)) {
  const nameParameter = template.Parameters?.[approvalNameParameter];
  const expiryParameter = template.Parameters?.[executionExpiryParameter];
  assert(nameParameter?.Default === 'approval-disabled', `${approvalNameParameter} must fail closed by default.`);
  assert(
    nameParameter?.AllowedPattern?.includes(`^${changeSetPrefix}`),
    `${approvalNameParameter} must allow only its exact stack-specific prefix or the disabled sentinel.`,
  );
  assert(
    expiryParameter?.Default === '1970-01-01T00:00:00Z',
    `${executionExpiryParameter} must be expired by default.`,
  );
  assert(
    expiryParameter?.AllowedPattern?.includes('T') && expiryParameter.AllowedPattern.endsWith('Z$'),
    `${executionExpiryParameter} must require a UTC timestamp.`,
  );
}

for (const forbidden of ['AdministratorAccess', 'PowerUserAccess', 'AWS_SECRET_ACCESS_KEY', 'OperatorUserId": "', 'AWS::Lambda::Function', 'ses:SendEmail', 'ses:SendRawEmail']) {
  assert(!raw.includes(forbidden), `Access template contains forbidden content: ${forbidden}`);
}

const group = resources.ReviewEmailOperatorsGroup;
assert(group.Type === 'AWS::IdentityStore::Group', 'ReviewEmailOperatorsGroup must be an Identity Store group.');
assert(group.Properties?.DisplayName === 'RenuvexReviewEmailOperators', 'Review-email operator group name must remain stable.');
assert(refValue(group.Properties?.IdentityStoreId) === 'IdentityStoreId', 'Review-email operator group must use the IdentityStoreId parameter.');

const membership = resources.ReviewEmailOperatorMembership;
assert(membership.Type === 'AWS::IdentityStore::GroupMembership', 'ReviewEmailOperatorMembership must be an Identity Store group membership.');
assert(JSON.stringify(getAtt(membership.Properties?.GroupId)) === JSON.stringify(['ReviewEmailOperatorsGroup', 'GroupId']), 'Group membership must use GroupId via Fn::GetAtt, not Ref.');
assert(refValue(membership.Properties?.IdentityStoreId) === 'IdentityStoreId', 'Group membership must use the IdentityStoreId parameter.');
assert(refValue(membership.Properties?.MemberId?.UserId) === 'OperatorUserId', 'Group membership must use the parameterized operator user ID.');

const permissionSet = resources.ReviewEmailOperatorPermissionSet;
assert(permissionSet.Type === 'AWS::SSO::PermissionSet', 'ReviewEmailOperatorPermissionSet must be AWS::SSO::PermissionSet.');
assert(permissionSet.Properties?.Name === 'RenuvexReviewEmailOperator', 'Review-email permission-set name must remain stable.');
assert(permissionSet.Properties?.SessionDuration === 'PT2H', 'Review-email operator session must be two hours.');
assert(refValue(permissionSet.Properties?.InstanceArn) === 'IdentityCenterInstanceArn', 'Permission set must use the parameterized Identity Center instance ARN.');
assert(!permissionSet.Properties?.ManagedPolicies, 'Operator permission set must not use AWS managed policies.');
assert(!permissionSet.Properties?.CustomerManagedPolicyReferences, 'Operator permission set must not use customer managed policies.');
assert(!permissionSet.Properties?.PermissionsBoundary, 'Operator permission set must not attach a permissions boundary.');

const operatorPolicy = permissionSet.Properties?.InlinePolicy;
assert(operatorPolicy?.Version === '2012-10-17', 'Operator inline policy must use IAM policy version 2012-10-17.');
assertSetEqual(actionSet(operatorPolicy), expectedOperatorActions, 'Operator policy');
assertNoWildcardActions(operatorPolicy, 'Operator policy');
assertOnlyAllowedWildcardResources(operatorPolicy, new Set(['ValidateAndListCloudFormation']), 'Operator policy');

for (const action of actionSet(operatorPolicy)) {
  assert(action.startsWith('cloudformation:') || action === 'iam:PassRole', `Operator policy has a direct service permission: ${action}`);
  assert(!['cloudformation:CreateStack', 'cloudformation:UpdateStack', 'cloudformation:DeleteStack'].includes(action), `Operator policy must not allow direct stack mutation: ${action}`);
}

for (const [sid, expected] of Object.entries(stackRoleMap)) {
  const statement = statementBySid(operatorPolicy, sid);
  assert(statement?.Effect === 'Allow', `${sid} must exist and allow CreateChangeSet.`);
  assert(JSON.stringify(asArray(statement.Action)) === JSON.stringify(['cloudformation:CreateChangeSet']), `${sid} must allow only CreateChangeSet.`);
  assert(
    fnSubValue(statement.Resource) === `arn:\${AWS::Partition}:cloudformation:\${DeploymentRegion}:\${TargetAccountId}:stack/${expected.stackName}/*`,
    `${sid} must target only ${expected.stackName}.`,
  );
  assert(refValue(statement.Condition?.StringEquals?.['aws:RequestedRegion']) === 'DeploymentRegion', `${sid} must require the locked deployment region.`);
  assert(
    fnSubValue(statement.Condition?.StringEquals?.['cloudformation:RoleArn']) ===
      `arn:\${AWS::Partition}:iam::\${TargetAccountId}:role${ROLE_PATH}${expected.roleName}`,
    `${sid} must require the matching CloudFormation service role.`,
  );
  assert(
    refValue(statement.Condition?.StringEquals?.['cloudformation:ChangeSetName']) === expected.approvalNameParameter,
    `${sid} must require the administrator-staged exact change-set name.`,
  );
  assert(
    statement.Condition?.StringLike?.['cloudformation:ChangeSetName'] === `${expected.changeSetPrefix}*`,
    `${sid} must require the stack-specific change-set prefix.`,
  );
  assert(
    statement.Condition?.StringEquals?.['aws:RequestTag/Environment'] === 'production' &&
      statement.Condition?.StringEquals?.['aws:RequestTag/Project'] === 'renuvex-product-reviews' &&
      statement.Condition?.StringEquals?.['aws:RequestTag/Purpose'] === expected.purpose,
    `${sid} must require the exact provenance scope tags.`,
  );
  assert(
    statement.Condition?.StringLike?.['aws:RequestTag/SourceCommit'] === '?'.repeat(40),
    `${sid} must require a 40-character source commit tag.`,
  );
  assert(
    statement.Condition?.StringLike?.['aws:RequestTag/TemplateDigest'] === '?'.repeat(64),
    `${sid} must require a 64-character template digest tag.`,
  );
  assertSetEqual(
    new Set(asArray(statement.Condition?.['ForAllValues:StringEquals']?.['aws:TagKeys'])),
    new Set(['Environment', 'Project', 'Purpose', 'SourceCommit', 'TemplateDigest']),
    `${sid} tag-key allowlist`,
  );
  assert(statement.Condition?.Null?.['aws:TagKeys'] === 'false', `${sid} must require the tag-key request field.`);
  assert(statement.Condition?.Null?.['cloudformation:ImportResourceTypes'] === 'true', `${sid} must reject IMPORT change sets.`);
  if (expected.resourceTypes) {
    assertSetEqual(
      new Set(asArray(statement.Condition?.['ForAllValues:StringEquals']?.['cloudformation:ResourceTypes'])),
      new Set(expected.resourceTypes),
      `${sid} resource-type allowlist`,
    );
    assert(statement.Condition?.Null?.['cloudformation:ResourceTypes'] === 'false', `${sid} must require ResourceTypes.`);
  } else {
    assert(
      statement.Condition?.Null?.['cloudformation:ResourceTypes'] === 'true',
      `${sid} must omit ResourceTypes because CAPABILITY_NAMED_IAM is required.`,
    );
  }

  const execute = statementBySid(operatorPolicy, expected.executionSid);
  assert(execute?.Effect === 'Allow', `${expected.executionSid} must exist.`);
  assert(execute.Action === 'cloudformation:ExecuteChangeSet', `${expected.executionSid} must allow only ExecuteChangeSet.`);
  assert(
    fnSubValue(execute.Resource) === `arn:\${AWS::Partition}:cloudformation:\${DeploymentRegion}:\${TargetAccountId}:stack/${expected.stackName}/*`,
    `${expected.executionSid} must target only ${expected.stackName}.`,
  );
  assert(
    refValue(execute.Condition?.StringEquals?.['aws:RequestedRegion']) === 'DeploymentRegion',
    `${expected.executionSid} must require the locked region.`,
  );
  assert(
    refValue(execute.Condition?.StringEquals?.['cloudformation:ChangeSetName']) === expected.approvalNameParameter,
    `${expected.executionSid} must require the exact staged change-set name.`,
  );
  assert(
    execute.Condition?.StringLike?.['cloudformation:ChangeSetName'] === `${expected.changeSetPrefix}*`,
    `${expected.executionSid} must reject the disabled sentinel.`,
  );
  assert(
    refValue(execute.Condition?.DateLessThan?.['aws:CurrentTime']) === expected.executionExpiryParameter,
    `${expected.executionSid} must expire at the administrator-staged UTC deadline.`,
  );
}

const inspect = statementBySid(operatorPolicy, 'InspectApprovedReviewEmailChangeSets');
assert(inspect?.Effect === 'Allow', 'InspectApprovedReviewEmailChangeSets must exist.');
assert(
  !actionSet({ Statement: [inspect] }).has('cloudformation:ExecuteChangeSet') &&
    !actionSet({ Statement: [inspect] }).has('cloudformation:DeleteChangeSet'),
  'Read-only change-set inspection must not execute or delete change sets.',
);
assert(
  !actionSet(operatorPolicy).has('cloudformation:DeleteChangeSet'),
  'Operator must not delete a staged change set and recreate it under an approved name.',
);

const passRole = statementBySid(operatorPolicy, 'PassOnlyApprovedCloudFormationServiceRoles');
assert(passRole?.Action === 'iam:PassRole', 'Operator must have one exact iam:PassRole statement.');
assert(passRole?.Condition?.StringEquals?.['iam:PassedToService'] === 'cloudformation.amazonaws.com', 'iam:PassRole must be limited to CloudFormation.');
const expectedPassRoleArns = Object.values(serviceRoleMap).map((roleName) => `arn:\${AWS::Partition}:iam::\${TargetAccountId}:role${ROLE_PATH}${roleName}`);
assert(
  JSON.stringify(asArray(passRole.Resource).map(fnSubValue).sort()) === JSON.stringify(expectedPassRoleArns.sort()),
  'iam:PassRole resources must be the three exact CloudFormation service roles.',
);

const assignment = resources.ReviewEmailOperatorAssignment;
assert(assignment.Type === 'AWS::SSO::Assignment', 'ReviewEmailOperatorAssignment must be AWS::SSO::Assignment.');
assert(refValue(assignment.Properties?.InstanceArn) === 'IdentityCenterInstanceArn', 'Assignment must use the parameterized Identity Center instance.');
assert(JSON.stringify(getAtt(assignment.Properties?.PermissionSetArn)) === JSON.stringify(['ReviewEmailOperatorPermissionSet', 'PermissionSetArn']), 'Assignment must use the local permission set ARN.');
assert(JSON.stringify(getAtt(assignment.Properties?.PrincipalId)) === JSON.stringify(['ReviewEmailOperatorsGroup', 'GroupId']), 'Assignment must target the local operator group.');
assert(assignment.Properties?.PrincipalType === 'GROUP', 'Assignment must target a group, not a user directly.');
assert(refValue(assignment.Properties?.TargetId) === 'TargetAccountId', 'Assignment must target the locked account parameter.');
assert(assignment.Properties?.TargetType === 'AWS_ACCOUNT', 'Assignment target type must be AWS_ACCOUNT.');

for (const [logicalId, roleName] of Object.entries(serviceRoleMap)) {
  const role = resources[logicalId];
  assert(role.Type === 'AWS::IAM::Role', `${logicalId} must be AWS::IAM::Role.`);
  assert(role.DeletionPolicy === 'Retain', `${logicalId} must be retained on stack deletion.`);
  assert(role.UpdateReplacePolicy === 'Retain', `${logicalId} must be retained on replacement.`);
  assert(role.Properties?.RoleName === roleName, `${logicalId} role name must remain stable.`);
  assert(role.Properties?.Path === ROLE_PATH, `${logicalId} must use the dedicated CloudFormation role path.`);
  assert(role.Properties?.MaxSessionDuration === 3600, `${logicalId} service-role session must be one hour.`);
  assertCloudFormationTrust(role, logicalId);
}

const foundationPolicy = inlinePolicy(resources.ReviewEmailFoundationCloudFormationRole);
assertSetEqual(actionSet(foundationPolicy), expectedFoundationActions, 'Foundation service role');
assertNoWildcardActions(foundationPolicy, 'Foundation service role');
assertOnlyAllowedWildcardResources(
  foundationPolicy,
  new Set([
    'CreateSymmetricReviewEmailKmsKey',
    'CreateTaggedReviewEmailConfigurationSet',
    'CreateTaggedReviewEmailIdentity',
    'DescribeSesConfigurationSetForCloudFormationCompatibility',
    'ListKmsKeysAndAliases',
    'ListSnsControlPlane',
    'ListSqsControlPlane',
    'ListSesControlPlane',
  ]),
  'Foundation service role',
);
for (const action of actionSet(foundationPolicy)) {
  assert(!action.startsWith('iam:'), `Foundation service role must not have IAM permissions: ${action}`);
  assert(!action.startsWith('ses:Send'), `Foundation service role must not send email: ${action}`);
}
const createKmsKey = statementBySid(foundationPolicy, 'CreateSymmetricReviewEmailKmsKey');
assert(createKmsKey?.Action === 'kms:CreateKey' && createKmsKey.Resource === '*', 'KMS key creation must isolate only kms:CreateKey on Resource "*".');
assert(createKmsKey.Condition?.StringEquals?.['aws:RequestTag/Project'] === 'renuvex-product-reviews', 'KMS key creation must require the project request tag.');
assert(createKmsKey.Condition?.StringEquals?.['aws:RequestTag/Purpose'] === 'review-request-email', 'KMS key creation must require the purpose request tag.');
assert(createKmsKey.Condition?.StringEquals?.['aws:RequestTag/Environment'] === 'production', 'KMS key creation must require the production request tag.');
const scheduleKeyDeletion = statementBySid(foundationPolicy, 'ScheduleDeletionForTaggedReviewEmailKmsKey');
assert(scheduleKeyDeletion?.Action === 'kms:ScheduleKeyDeletion', 'KMS rollback cleanup must isolate kms:ScheduleKeyDeletion.');
assert(
  fnSubValue(scheduleKeyDeletion?.Resource) ===
    'arn:${AWS::Partition}:kms:${DeploymentRegion}:${TargetAccountId}:key/*',
  'KMS rollback cleanup must remain account/region key scoped.',
);
assert(
  scheduleKeyDeletion.Condition?.StringEquals?.['aws:ResourceTag/Environment'] === 'production' &&
    scheduleKeyDeletion.Condition?.StringEquals?.['aws:ResourceTag/Project'] === 'renuvex-product-reviews' &&
    scheduleKeyDeletion.Condition?.StringEquals?.['aws:ResourceTag/Purpose'] === 'review-request-email',
  'KMS rollback cleanup must require all three resource tags.',
);
assert(
  scheduleKeyDeletion.Condition?.NumericEquals?.['kms:ScheduleKeyDeletionPendingWindowInDays'] === '7',
  'KMS rollback cleanup must require the seven-day pending-deletion window.',
);
for (const [sid, action] of [
  ['CreateTaggedReviewEmailConfigurationSet', 'ses:CreateConfigurationSet'],
  ['CreateTaggedReviewEmailIdentity', 'ses:CreateEmailIdentity'],
]) {
  const statement = statementBySid(foundationPolicy, sid);
  assert(statement?.Action === action && statement.Resource === '*', `${sid} must isolate the SES create action on Resource "*".`);
  assert(refValue(statement.Condition?.StringEquals?.['aws:RequestedRegion']) === 'DeploymentRegion', `${sid} must require the locked deployment region.`);
  assert(statement.Condition?.StringEquals?.['aws:RequestTag/Environment'] === 'production', `${sid} must require the production request tag.`);
  assert(statement.Condition?.StringEquals?.['aws:RequestTag/Project'] === 'renuvex-product-reviews', `${sid} must require the project request tag.`);
  assert(statement.Condition?.StringEquals?.['aws:RequestTag/Purpose'] === 'review-request-email', `${sid} must require the purpose request tag.`);
}
const describeConfigurationSet = statementBySid(foundationPolicy, 'DescribeSesConfigurationSetForCloudFormationCompatibility');
assert(
  describeConfigurationSet?.Action === 'ses:DescribeConfigurationSet' && describeConfigurationSet.Resource === '*',
  'SES configuration-set compatibility read must isolate only ses:DescribeConfigurationSet on Resource "*".',
);
assert(
  refValue(describeConfigurationSet.Condition?.StringEquals?.['aws:RequestedRegion']) === 'DeploymentRegion',
  'SES configuration-set compatibility read must require the locked deployment region.',
);

const journalPolicy = inlinePolicy(resources.ReviewEmailJournalCloudFormationRole);
assertSetEqual(actionSet(journalPolicy), expectedJournalActions, 'Journal service role');
assertNoWildcardActions(journalPolicy, 'Journal service role');
assertOnlyAllowedWildcardResources(journalPolicy, new Set(['ListBucketsForCloudFormationReadHandler']), 'Journal service role');
for (const forbiddenAction of [
  's3:BypassGovernanceRetention',
  's3:DeleteBucket',
  's3:DeleteObject',
  's3:DeleteObjectVersion',
  's3:PutObject',
  's3:PutObjectRetention',
]) {
  assert(!actionSet(journalPolicy).has(forbiddenAction), `Journal service role must not allow ${forbiddenAction}.`);
}

const journalIamPolicy = inlinePolicy(resources.ReviewEmailJournalIamCloudFormationRole);
assertSetEqual(actionSet(journalIamPolicy), expectedJournalIamActions, 'Journal IAM service role');
assertNoWildcardActions(journalIamPolicy, 'Journal IAM service role');
assertOnlyAllowedWildcardResources(journalIamPolicy, new Set(['ListRolesForCloudFormationReadHandler']), 'Journal IAM service role');
for (const forbiddenAction of [
  'iam:AttachRolePolicy',
  'iam:CreateAccessKey',
  'iam:CreatePolicy',
  'iam:CreateUser',
  'iam:DeleteRolePermissionsBoundary',
  'iam:DetachRolePolicy',
  'iam:PassRole',
  'iam:PutRolePermissionsBoundary',
]) {
  assert(!actionSet(journalIamPolicy).has(forbiddenAction), `Journal IAM service role must not allow ${forbiddenAction}.`);
}

const managedJournalRoleArns = asArray(statementBySid(journalIamPolicy, 'ManageOnlyReviewEmailJournalRoles')?.Resource).map(fnSubValue).sort();
const expectedJournalRoleArns = [
  'renuvex-review-email-journal-genesis-operator',
  'renuvex-review-email-journal-restore-reader',
  'renuvex-review-email-journal-retention-extender',
  'renuvex-review-email-journal-writer',
].map((roleName) => `arn:\${AWS::Partition}:iam::\${TargetAccountId}:role/${roleName}`).sort();
assert(JSON.stringify(managedJournalRoleArns) === JSON.stringify(expectedJournalRoleArns), 'Journal IAM service role must target only the four existing journal roles.');

for (const outputName of [
  'ReviewEmailOperatorGroupId',
  'ReviewEmailOperatorPermissionSetArn',
  'ReviewEmailFoundationCloudFormationRoleArn',
  'ReviewEmailJournalCloudFormationRoleArn',
  'ReviewEmailJournalIamCloudFormationRoleArn',
]) {
  assert(template.Outputs?.[outputName], `Template must output ${outputName}.`);
}

console.log('review-email deployment-access CloudFormation template validation passed');
