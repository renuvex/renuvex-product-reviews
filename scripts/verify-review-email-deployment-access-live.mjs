import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readStrictJsonFile } from './lib/review-email-cloudformation-contract.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TEMPLATE_PATH = resolve(ROOT, 'infra/aws/review-email-deployment-access.cloudformation.json');
const EXPECTED_ACCOUNT_ID = '989086371563';
const EXPECTED_REGION = 'eu-central-1';
const EXPECTED_STACK_NAME = 'renuvex-review-email-access-prod';
const EXPECTED_OPERATOR_USERNAME = 'mert';
const EXPECTED_PRINCIPALS = {
  author: {
    assignmentLogicalId: 'ReviewEmailAuthorAssignment',
    groupLogicalId: 'ReviewEmailAuthorsGroup',
    groupName: 'RenuvexReviewEmailAuthors',
    membershipLogicalId: 'ReviewEmailAuthorMembership',
    permissionSetLogicalId: 'ReviewEmailAuthorPermissionSet',
    permissionSetName: 'RenuvexReviewEmailAuthor',
  },
  operator: {
    assignmentLogicalId: 'ReviewEmailOperatorAssignment',
    groupLogicalId: 'ReviewEmailOperatorsGroup',
    groupName: 'RenuvexReviewEmailOperators',
    membershipLogicalId: 'ReviewEmailOperatorMembership',
    permissionSetLogicalId: 'ReviewEmailOperatorPermissionSet',
    permissionSetName: 'RenuvexReviewEmailOperator',
  },
};
const EXPECTED_SERVICE_ROLES = {
  ReviewEmailFoundationCloudFormationRole: 'renuvex-review-email-foundation-cfn',
  ReviewEmailJournalCloudFormationRole: 'renuvex-review-email-journal-cfn',
  ReviewEmailJournalIamCloudFormationRole: 'renuvex-review-email-journal-iam-cfn',
};
const DOWNSTREAM_STACK_NAMES = [
  'renuvex-review-email-foundation-prod',
  'renuvex-review-email-erasure-journal-prod',
  'renuvex-review-email-erasure-journal-iam-prod',
];
const EXPECTED_STACK_RESOURCES = {
  ReviewEmailAuthorsGroup: 'AWS::IdentityStore::Group',
  ReviewEmailAuthorMembership: 'AWS::IdentityStore::GroupMembership',
  ReviewEmailAuthorPermissionSet: 'AWS::SSO::PermissionSet',
  ReviewEmailAuthorAssignment: 'AWS::SSO::Assignment',
  ReviewEmailOperatorsGroup: 'AWS::IdentityStore::Group',
  ReviewEmailOperatorMembership: 'AWS::IdentityStore::GroupMembership',
  ReviewEmailOperatorPermissionSet: 'AWS::SSO::PermissionSet',
  ReviewEmailOperatorAssignment: 'AWS::SSO::Assignment',
  ReviewEmailFoundationCloudFormationRole: 'AWS::IAM::Role',
  ReviewEmailJournalCloudFormationRole: 'AWS::IAM::Role',
  ReviewEmailJournalIamCloudFormationRole: 'AWS::IAM::Role',
};
const DISABLED_APPROVAL_PARAMETERS = {
  ApprovedFoundationChangeSetName: 'approval-disabled',
  ApprovedJournalChangeSetName: 'approval-disabled',
  ApprovedJournalIamChangeSetName: 'approval-disabled',
  FoundationExecutionApprovalExpiresAt: '1970-01-01T00:00:00Z',
  JournalExecutionApprovalExpiresAt: '1970-01-01T00:00:00Z',
  JournalIamExecutionApprovalExpiresAt: '1970-01-01T00:00:00Z',
};

const profile = readOption('--profile') || process.env.AWS_PROFILE || 'renuvex-readonly';
const region = readOption('--region') || process.env.AWS_REGION || EXPECTED_REGION;
const expectation = readOption('--expect') || 'ready';
const jsonOutput = process.argv.includes('--json');
const awsCli = resolveAwsCli();

if (!['absent', 'ready'].includes(expectation)) {
  fail('Expected --expect=absent or --expect=ready.');
}
if (region !== EXPECTED_REGION) {
  fail(`Review-email deployment access must be verified in ${EXPECTED_REGION}.`);
}
if (!existsSync(TEMPLATE_PATH)) {
  fail(`Missing deployment-access template: ${TEMPLATE_PATH}`);
}

const template = readStrictJsonFile(TEMPLATE_PATH, 'deployment-access template');
const caller = awsJson(['sts', 'get-caller-identity']);
assert(caller.Account === EXPECTED_ACCOUNT_ID, 'AWS caller account does not match the locked production account.');

const instances = awsJson(['sso-admin', 'list-instances']).Instances ?? [];
assert(instances.length === 1, 'Expected exactly one IAM Identity Center instance.');
const instance = instances[0];
const renderContext = {
  'AWS::AccountId': EXPECTED_ACCOUNT_ID,
  'AWS::Partition': 'aws',
  DeploymentRegion: EXPECTED_REGION,
  IdentityCenterInstanceArn: instance.InstanceArn,
  IdentityStoreId: instance.IdentityStoreId,
  JournalBucketName: template.Parameters.JournalBucketName.Default,
  TargetAccountId: EXPECTED_ACCOUNT_ID,
};

const stack = optionalAwsJson(
  ['cloudformation', 'describe-stacks', '--stack-name', EXPECTED_STACK_NAME],
  isCloudFormationNotFound,
)?.Stacks?.[0] ?? null;
const principalSurfaces = Object.fromEntries(
  Object.entries(EXPECTED_PRINCIPALS).map(([key, expected]) => [
    key,
    {
      expected,
      groups: awsJson([
        'identitystore',
        'list-groups',
        '--identity-store-id',
        instance.IdentityStoreId,
        '--filters',
        `AttributePath=DisplayName,AttributeValue=${expected.groupName}`,
      ]).Groups ?? [],
      permissionSets: findPermissionSetsByName(instance.InstanceArn, expected.permissionSetName),
    },
  ]),
);
const serviceRoles = Object.values(EXPECTED_SERVICE_ROLES)
  .map((roleName) => optionalAwsJson(['iam', 'get-role', '--role-name', roleName], isIamNotFound)?.Role ?? null)
  .filter(Boolean);
const downstreamStacks = DOWNSTREAM_STACK_NAMES
  .map((stackName) => optionalAwsJson(
    ['cloudformation', 'describe-stacks', '--stack-name', stackName],
    isCloudFormationNotFound,
  )?.Stacks?.[0] ?? null)
  .filter(Boolean);

if (expectation === 'absent') {
  assert(stack === null, 'Access stack must be absent before bootstrap.');
  for (const { expected, groups, permissionSets } of Object.values(principalSurfaces)) {
    assert(groups.length === 0, `${expected.groupName} must be absent before bootstrap.`);
    assert(permissionSets.length === 0, `${expected.permissionSetName} must be absent before bootstrap.`);
  }
  assert(serviceRoles.length === 0, 'Review-email CloudFormation service roles must be absent before bootstrap.');
  assert(downstreamStacks.length === 0, 'Downstream review-email stacks must remain absent before bootstrap.');
  report({
    account: EXPECTED_ACCOUNT_ID,
    expectation,
    authorGroupCount: 0,
    operatorGroupCount: 0,
    permissionSetCount: 0,
    region,
    serviceRoleCount: 0,
    stackStatus: 'ABSENT',
  });
  process.exit(0);
}

assert(stack, 'Access stack is missing.');
assert(
  ['CREATE_COMPLETE', 'UPDATE_COMPLETE', 'UPDATE_ROLLBACK_COMPLETE'].includes(stack.StackStatus),
  `Access stack is not in a stable complete state: ${stack.StackStatus}.`,
);
assert(stack.EnableTerminationProtection === true, 'Access stack termination protection must be enabled.');
for (const { expected, groups, permissionSets } of Object.values(principalSurfaces)) {
  assert(groups.length === 1, `Expected exactly one ${expected.groupName} group.`);
  assert(permissionSets.length === 1, `Expected exactly one ${expected.permissionSetName} permission set.`);
}
assert(serviceRoles.length === 3, 'Expected exactly three review-email CloudFormation service roles.');
assert(downstreamStacks.length === 0, 'Bootstrap must not create downstream review-email stacks.');

const stackParameters = Object.fromEntries(
  (stack.Parameters ?? []).map(({ ParameterKey, ParameterValue }) => [ParameterKey, ParameterValue]),
);
assert(stackParameters.TargetAccountId === EXPECTED_ACCOUNT_ID, 'Stack target account parameter drifted.');
assert(stackParameters.DeploymentRegion === EXPECTED_REGION, 'Stack deployment region parameter drifted.');
assert(stackParameters.IdentityCenterInstanceArn === instance.InstanceArn, 'Stack Identity Center instance drifted.');
assert(stackParameters.IdentityStoreId === instance.IdentityStoreId, 'Stack Identity Store drifted.');
for (const [name, expected] of Object.entries(DISABLED_APPROVAL_PARAMETERS)) {
  assert(
    stackParameters[name] === expected,
    `${name} must be fail-closed outside an explicitly approved execution window.`,
  );
}
Object.assign(renderContext, stackParameters);

verifyStackResources();
for (const [label, { expected, groups, permissionSets }] of Object.entries(principalSurfaces)) {
  verifyGroup(groups[0], stackParameters.OperatorUserId, label);
  verifyPermissionSet(permissionSets[0], groups[0].GroupId, expected, label);
  verifyProvisionedSsoRole(expected.permissionSetName, label);
}
for (const [logicalId, roleName] of Object.entries(EXPECTED_SERVICE_ROLES)) {
  verifyServiceRole(logicalId, roleName);
}

report({
  account: EXPECTED_ACCOUNT_ID,
  assignmentCount: 2,
  authorGroupCount: 1,
  authorMembershipCount: 1,
  expectation,
  operatorGroupCount: 1,
  operatorMembershipCount: 1,
  permissionSetCount: 2,
  region,
  serviceRoleCount: 3,
  stackResourceCount: 11,
  stackStatus: stack.StackStatus,
  terminationProtection: true,
});

function verifyStackResources() {
  const resources = awsJson([
    'cloudformation',
    'list-stack-resources',
    '--stack-name',
    EXPECTED_STACK_NAME,
  ]).StackResourceSummaries ?? [];
  assert(resources.length === 11, 'Access stack must contain exactly eleven resources.');
  const actual = Object.fromEntries(
    resources.map(({ LogicalResourceId, ResourceType }) => [LogicalResourceId, ResourceType]),
  );
  assertDeepEqual(actual, EXPECTED_STACK_RESOURCES, 'Access stack resource inventory');
  for (const resource of resources) {
    assert(
      resource.ResourceStatus.endsWith('_COMPLETE'),
      `Stack resource ${resource.LogicalResourceId} is not complete.`,
    );
  }
}

function verifyGroup(group, expectedUserId, label) {
  const memberships = awsJson([
    'identitystore',
    'list-group-memberships',
    '--identity-store-id',
    instance.IdentityStoreId,
    '--group-id',
    group.GroupId,
  ]).GroupMemberships ?? [];
  assert(memberships.length === 1, `Review-email ${label} group must contain exactly one membership.`);
  const userId = memberships[0]?.MemberId?.UserId;
  assert(userId === expectedUserId, `${label} group membership does not match the stack parameter.`);
  const user = awsJson([
    'identitystore',
    'describe-user',
    '--identity-store-id',
    instance.IdentityStoreId,
    '--user-id',
    userId,
  ]);
  assert(user.UserName === EXPECTED_OPERATOR_USERNAME, `${label} group member is not the approved user.`);
}

function verifyPermissionSet(permissionSet, expectedGroupId, expected, label) {
  assert(permissionSet.SessionDuration === 'PT2H', `${label} permission-set session must be PT2H.`);
  const expectedPolicy = renderTemplateValue(
    template.Resources[expected.permissionSetLogicalId].Properties.InlinePolicy,
    renderContext,
  );
  const actualPolicyResponse = awsJson([
    'sso-admin',
    'get-inline-policy-for-permission-set',
    '--instance-arn',
    instance.InstanceArn,
    '--permission-set-arn',
    permissionSet.PermissionSetArn,
  ]);
  assertPolicyEqual(
    parsePolicyDocument(actualPolicyResponse.InlinePolicy),
    expectedPolicy,
    `${label} permission-set inline policy`,
  );

  const managedPolicies = awsJson([
    'sso-admin',
    'list-managed-policies-in-permission-set',
    '--instance-arn',
    instance.InstanceArn,
    '--permission-set-arn',
    permissionSet.PermissionSetArn,
  ]).AttachedManagedPolicies ?? [];
  assert(managedPolicies.length === 0, `${label} permission set must not have AWS managed policies.`);

  const customerPolicies = awsJson([
    'sso-admin',
    'list-customer-managed-policy-references-in-permission-set',
    '--instance-arn',
    instance.InstanceArn,
    '--permission-set-arn',
    permissionSet.PermissionSetArn,
  ]).CustomerManagedPolicyReferences ?? [];
  assert(customerPolicies.length === 0, `${label} permission set must not have customer managed policies.`);

  const boundary = optionalAwsJson(
    [
      'sso-admin',
      'get-permissions-boundary-for-permission-set',
      '--instance-arn',
      instance.InstanceArn,
      '--permission-set-arn',
      permissionSet.PermissionSetArn,
    ],
    isSsoNotFound,
  );
  assert(!boundary?.PermissionsBoundary, `${label} permission set must not have a permissions boundary.`);

  const assignments = awsJson([
    'sso-admin',
    'list-account-assignments',
    '--instance-arn',
    instance.InstanceArn,
    '--account-id',
    EXPECTED_ACCOUNT_ID,
    '--permission-set-arn',
    permissionSet.PermissionSetArn,
  ]).AccountAssignments ?? [];
  assert(assignments.length === 1, `Expected exactly one account assignment for the ${label} permission set.`);
  assert(assignments[0].PrincipalType === 'GROUP', `${label} permission set must be assigned to a group.`);
  assert(assignments[0].PrincipalId === expectedGroupId, `${label} permission set is assigned to the wrong group.`);

  const provisioned = awsJson([
    'sso-admin',
    'list-permission-sets-provisioned-to-account',
    '--instance-arn',
    instance.InstanceArn,
    '--account-id',
    EXPECTED_ACCOUNT_ID,
  ]).PermissionSets ?? [];
  assert(
    provisioned.includes(permissionSet.PermissionSetArn),
    `${label} permission set is not provisioned to the target account.`,
  );
}

function verifyServiceRole(logicalId, roleName) {
  const sourceRole = template.Resources[logicalId];
  const actualRole = awsJson(['iam', 'get-role', '--role-name', roleName]).Role;
  assert(
    actualRole.Path === sourceRole.Properties.Path,
    `${roleName} path does not match the source template.`,
  );
  assertPolicyEqual(
    parsePolicyDocument(actualRole.AssumeRolePolicyDocument),
    renderTemplateValue(sourceRole.Properties.AssumeRolePolicyDocument, renderContext),
    `${roleName} trust policy`,
  );
  assert(!actualRole.PermissionsBoundary, `${roleName} must not have a permissions boundary.`);

  const expectedTags = Object.fromEntries(
    sourceRole.Properties.Tags.map(({ Key, Value }) => [Key, Value]),
  );
  const actualTags = Object.fromEntries((actualRole.Tags ?? []).map(({ Key, Value }) => [Key, Value]));
  for (const [key, value] of Object.entries(expectedTags)) {
    assert(actualTags[key] === value, `${roleName} tag ${key} does not match the source template.`);
  }

  const expectedInlinePolicies = sourceRole.Properties.Policies ?? [];
  assert(expectedInlinePolicies.length === 1, `${logicalId} must define exactly one inline policy.`);
  const rolePolicyNames = awsJson(['iam', 'list-role-policies', '--role-name', roleName]).PolicyNames ?? [];
  assertDeepEqual(
    [...rolePolicyNames].sort(),
    expectedInlinePolicies.map(({ PolicyName }) => PolicyName).sort(),
    `${roleName} inline policy names`,
  );
  const livePolicy = awsJson([
    'iam',
    'get-role-policy',
    '--role-name',
    roleName,
    '--policy-name',
    expectedInlinePolicies[0].PolicyName,
  ]).PolicyDocument;
  assertPolicyEqual(
    parsePolicyDocument(livePolicy),
    renderTemplateValue(expectedInlinePolicies[0].PolicyDocument, renderContext),
    `${roleName} inline policy`,
  );

  const attachedPolicies = awsJson([
    'iam',
    'list-attached-role-policies',
    '--role-name',
    roleName,
  ]).AttachedPolicies ?? [];
  assert(attachedPolicies.length === 0, `${roleName} must not have managed policies.`);
}

function verifyProvisionedSsoRole(permissionSetName, label) {
  const roles = awsJson(['iam', 'list-roles']).Roles ?? [];
  const matching = roles.filter((role) =>
    role.RoleName.startsWith(`AWSReservedSSO_${permissionSetName}_`));
  assert(matching.length === 1, `Expected exactly one provisioned IAM Identity Center ${label} role.`);
}

function findPermissionSetsByName(instanceArn, name) {
  const arns = awsJson([
    'sso-admin',
    'list-permission-sets',
    '--instance-arn',
    instanceArn,
  ]).PermissionSets ?? [];
  const matches = [];
  for (const permissionSetArn of arns) {
    const permissionSet = awsJson([
      'sso-admin',
      'describe-permission-set',
      '--instance-arn',
      instanceArn,
      '--permission-set-arn',
      permissionSetArn,
    ]).PermissionSet;
    if (permissionSet?.Name === name) matches.push(permissionSet);
  }
  return matches;
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

function parsePolicyDocument(value) {
  if (value && typeof value === 'object') return value;
  assert(typeof value === 'string' && value.length > 0, 'Policy document is missing.');
  try {
    return JSON.parse(value);
  } catch {
    return JSON.parse(decodeURIComponent(value));
  }
}

function assertPolicyEqual(actual, expected, label) {
  assertDeepEqual(normalizePolicy(actual), normalizePolicy(expected), label);
}

function normalizePolicy(value, key = '') {
  if (Array.isArray(value)) {
    const normalized = value.map((item) => normalizePolicy(item, key));
    if (['Action', 'NotAction', 'Resource', 'NotResource', 'Statement'].includes(key)) {
      return normalized.sort((left, right) =>
        JSON.stringify(left).localeCompare(JSON.stringify(right)));
    }
    return normalized;
  }
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((childKey) => [childKey, normalizePolicy(value[childKey], childKey)]),
  );
}

function assertDeepEqual(actual, expected, label) {
  const actualJson = JSON.stringify(normalizePolicy(actual));
  const expectedJson = JSON.stringify(normalizePolicy(expected));
  assert(actualJson === expectedJson, `${label} does not match the source template.`);
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
  fail(sanitizeAwsError(result.stderr || result.stdout || `${args[0]} ${args[1]} failed.`));
}

function runAws(args, allowFailure = false) {
  const result = spawnSync(
    awsCli,
    [
      ...args,
      '--profile',
      profile,
      '--region',
      region,
      '--output',
      'json',
      '--no-cli-pager',
    ],
    {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: 'pipe',
    },
  );
  if (!allowFailure && result.status !== 0) {
    fail(sanitizeAwsError(result.stderr || result.stdout || `${args[0]} ${args[1]} failed.`));
  }
  return result;
}

function sanitizeAwsError(value) {
  return String(value)
    .replace(/arn:aws:[^\s"']+/g, '[redacted-arn]')
    .replace(/\bd-[0-9a-f]{10}\b/gi, '[redacted-identity-store-id]')
    .replace(
      /\b(?:[0-9a-f]{10}-)?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
      '[redacted-identity-id]',
    )
    .replace(/\b[0-9a-f]{8}-[0-9a-f-]{27,}\b/gi, '[redacted-id]')
    .trim();
}

function isCloudFormationNotFound(value) {
  return /ValidationError.*does not exist|Stack with id .* does not exist/is.test(value);
}

function isIamNotFound(value) {
  return /NoSuchEntity/is.test(value);
}

function isSsoNotFound(value) {
  return /ResourceNotFoundException/is.test(value);
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
    `Review-email deployment access live verification passed (${summary.expectation}, ${summary.stackStatus}).\n`,
  );
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function fail(message) {
  process.stderr.write(`Review-email deployment access verification failed: ${message}\n`);
  process.exit(1);
}
