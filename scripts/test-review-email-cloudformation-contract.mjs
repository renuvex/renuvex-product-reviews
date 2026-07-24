import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  canonicalJsonSha256,
  effectiveResourceLogicalIds,
  gitCommitIsAncestor,
  isDependencyOnlySsoAssignmentChange,
  isExistingStackUpdateChangeSet,
  materializeStackPolicy,
  parseSsoPermissionSetPhysicalId,
  parseStrictJsonBytes,
  parseStrictJsonText,
  readStrictJsonAtGitCommit,
  readStrictJsonFile,
} from './lib/review-email-cloudformation-contract.mjs';

const scriptsDirectory = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptsDirectory, '..');

const ordered = parseStrictJsonText('{\n  "z": 1,\n  "a": {"b": true}\n}\n', 'ordered fixture');
const reordered = parseStrictJsonText('{"a":{"b":true},"z":1}', 'reordered fixture');
assert.equal(
  canonicalJsonSha256(ordered),
  canonicalJsonSha256(reordered),
  'Canonical digest must not depend on object-key order or insignificant whitespace.',
);

const emoji = String.fromCodePoint(0x1f600);
assert.deepEqual(
  parseStrictJsonText(`{"emoji":"${emoji}"}`, 'valid supplementary Unicode scalar'),
  { emoji },
);
assert.throws(
  () => parseStrictJsonText('{"a":1,"a":2}', 'duplicate-key fixture'),
  /strict canonical JSON/,
);
assert.throws(
  () => parseStrictJsonText('{"a":1,}', 'trailing-comma fixture'),
  /not valid JSON/,
);
assert.throws(
  () => parseStrictJsonText('{"value":"\\ud800"}', 'high-surrogate fixture'),
  /unpaired high surrogate/,
);
assert.throws(
  () => parseStrictJsonText('{"value":"\\udc00"}', 'low-surrogate fixture'),
  /unpaired low surrogate/,
);
assert.throws(
  () => parseStrictJsonText('{"value":1.0}', 'non-canonical-number fixture'),
  /strict canonical JSON/,
);
assert.throws(
  () => parseStrictJsonBytes(Buffer.from([0x7b, 0x22, 0x61, 0x22, 0x3a, 0xc3, 0x28, 0x7d]), 'invalid UTF-8 fixture'),
  /not valid UTF-8/,
);
assert.throws(
  () => parseStrictJsonBytes(Buffer.from([0xef, 0xbb, 0xbf, 0x7b, 0x7d]), 'UTF-8 BOM fixture'),
  /must not contain a UTF-8 BOM/,
);
assert.deepEqual(
  parseSsoPermissionSetPhysicalId(
    'arn:aws:sso:::instance/ssoins-1234567890abcdef|arn:aws:sso:::permissionSet/ssoins-1234567890abcdef/ps-1234567890abcdef',
  ),
  {
    instanceArn: 'arn:aws:sso:::instance/ssoins-1234567890abcdef',
    permissionSetArn:
      'arn:aws:sso:::permissionSet/ssoins-1234567890abcdef/ps-1234567890abcdef',
  },
);
assert.throws(
  () => parseSsoPermissionSetPhysicalId('arn:aws:sso:::permissionSet/invalid'),
  /two ARN components/,
);

const existingStack = { StackId: 'stack-id' };
const updateChangeSet = {
  Changes: [{ ResourceChange: { Action: 'Modify', Details: [] } }],
  ImportExistingResources: false,
  OnStackFailure: null,
  StackId: 'stack-id',
};
assert.equal(isExistingStackUpdateChangeSet(updateChangeSet, existingStack), true);
assert.equal(
  isExistingStackUpdateChangeSet(
    {
      ...updateChangeSet,
      Changes: [{ ResourceChange: { Action: 'Import', Details: [] } }],
    },
    existingStack,
  ),
  false,
);
assert.equal(
  isExistingStackUpdateChangeSet({ ...updateChangeSet, OnStackFailure: 'ROLLBACK' }, existingStack),
  false,
);

const dependencyOnlyAssignmentChange = {
  Action: 'Modify',
  Details: [
    {
      ChangeSource: 'ResourceAttribute',
      CausingEntity: 'ReviewEmailOperatorPermissionSet.PermissionSetArn',
      Evaluation: 'Dynamic',
      Target: {
        Attribute: 'Properties',
        Name: 'PermissionSetArn',
        RequiresRecreation: 'Always',
      },
    },
  ],
  LogicalResourceId: 'ReviewEmailOperatorAssignment',
  Replacement: 'Conditional',
  ResourceType: 'AWS::SSO::Assignment',
  Scope: ['Properties'],
};
assert.equal(
  isDependencyOnlySsoAssignmentChange(
    dependencyOnlyAssignmentChange,
    'ReviewEmailOperatorAssignment',
    'ReviewEmailOperatorPermissionSet',
  ),
  true,
);
assert.equal(
  isDependencyOnlySsoAssignmentChange(
    {
      ...dependencyOnlyAssignmentChange,
      Details: [
        {
          ...dependencyOnlyAssignmentChange.Details[0],
          CausingEntity: 'UnexpectedPermissionSet.PermissionSetArn',
        },
      ],
    },
    'ReviewEmailOperatorAssignment',
    'ReviewEmailOperatorPermissionSet',
  ),
  false,
);

readStrictJsonFile(
  new URL('../infra/aws/review-email-deployment-access.cloudformation.json', import.meta.url),
  'deployment-access template',
);
readStrictJsonFile(
  new URL('../infra/aws/review-email-foundation.cloudformation.json', import.meta.url),
  'foundation template',
);
readStrictJsonFile(
  new URL('../infra/aws/review-email-foundation.stack-policy.json', import.meta.url),
  'foundation stack policy',
);
const foundationTemplate = readStrictJsonFile(
  new URL('../infra/aws/review-email-foundation.cloudformation.json', import.meta.url),
  'foundation template',
);
const foundationStackPolicy = readStrictJsonFile(
  new URL('../infra/aws/review-email-foundation.stack-policy.json', import.meta.url),
  'foundation stack policy',
);
const defaultParameters = Object.fromEntries(
  Object.entries(foundationTemplate.Parameters)
    .map(([name, definition]) => [name, definition.Default ?? '']),
);
const defaultEffectiveIds = effectiveResourceLogicalIds(
  foundationTemplate,
  defaultParameters,
);
const defaultEffectivePolicy = materializeStackPolicy(
  foundationStackPolicy,
  defaultEffectiveIds,
);
const defaultProtectedResources = defaultEffectivePolicy.Statement
  .flatMap((statement) => Array.isArray(statement.Resource) ? statement.Resource : [statement.Resource])
  .filter((resource) => resource !== '*');
assert.equal(
  defaultProtectedResources.includes(
    'LogicalResourceId/ReviewEmailEventsHttpsSubscription',
  ),
  false,
);
assert.deepEqual(
  defaultProtectedResources
    .map((resource) => resource.replace('LogicalResourceId/', ''))
    .sort(),
  defaultEffectiveIds,
);
const subscriptionEffectivePolicy = materializeStackPolicy(
  foundationStackPolicy,
  effectiveResourceLogicalIds(
    foundationTemplate,
    {
      ...defaultParameters,
      FeedbackEndpointUrl: 'https://app.renuvex.app/api/internal/email-events/ses',
    },
  ),
);
assert.equal(
  subscriptionEffectivePolicy.Statement
    .flatMap((statement) => Array.isArray(statement.Resource) ? statement.Resource : [statement.Resource])
    .includes('LogicalResourceId/ReviewEmailEventsHttpsSubscription'),
  true,
);
assert.throws(
  () => materializeStackPolicy(
    { Statement: [{ Effect: 'Deny', Resource: 'LogicalResourceId/Invalid*' }] },
    defaultEffectiveIds,
  ),
  /Unsupported stack policy Resource/,
);

const headResult = spawnSync('git', ['rev-parse', 'HEAD'], {
  cwd: root,
  encoding: 'utf8',
  stdio: 'pipe',
});
assert.equal(headResult.status, 0, headResult.stderr || 'Unable to resolve HEAD.');
const head = headResult.stdout.trim();
assert.equal(gitCommitIsAncestor(root, head, 'HEAD'), true);
assert.equal(
  canonicalJsonSha256(
    readStrictJsonAtGitCommit(
      root,
      head,
      'infra/aws/review-email-foundation.cloudformation.json',
      'committed foundation template',
    ),
  ),
  canonicalJsonSha256(
    readStrictJsonFile(
      new URL('../infra/aws/review-email-foundation.cloudformation.json', import.meta.url),
      'current foundation template',
    ),
  ),
);
assert.throws(
  () => readStrictJsonAtGitCommit(root, head, '../package.json', 'unsafe committed path'),
  /unsafe repository path/,
);
assert.throws(
  () =>
    readStrictJsonAtGitCommit(
      root,
      'not-a-commit',
      'infra/aws/review-email-foundation.cloudformation.json',
    ),
  /full lowercase Git SHA/,
);

const infrastructureScripts = readdirSync(scriptsDirectory)
  .filter((name) => name.endsWith('.mjs') && name.includes('review-email'))
  .map((name) => resolve(scriptsDirectory, name));
infrastructureScripts.push(
  resolve(scriptsDirectory, 'lib', 'review-email-cloudformation-contract.mjs'),
);
for (const scriptPath of infrastructureScripts) {
  const syntax = spawnSync(process.execPath, ['--check', scriptPath], {
    encoding: 'utf8',
    stdio: 'pipe',
  });
  assert.equal(
    syntax.status,
    0,
    `Review-email infrastructure script has invalid syntax: ${scriptPath}\n${syntax.stderr || syntax.stdout}`,
  );
}

process.stdout.write('review-email CloudFormation canonical JSON contract tests passed\n');
