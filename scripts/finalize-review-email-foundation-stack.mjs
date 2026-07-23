import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  FOUNDATION_STACK_TAGS,
  REVIEW_EMAIL_ACCOUNT_ID,
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  REVIEW_EMAIL_REGION,
  canonicalJsonSha256,
  effectiveResourceLogicalIds,
  parseJsonDocument,
} from './lib/review-email-cloudformation-contract.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TEMPLATE_PATH = resolve(ROOT, 'infra/aws/review-email-foundation.cloudformation.json');
const STACK_POLICY_PATH = resolve(ROOT, 'infra/aws/review-email-foundation.stack-policy.json');
const apply = process.argv.includes('--apply');
const adminProfile = readOption('--admin-profile');
const region = readOption('--region') || REVIEW_EMAIL_REGION;
const awsCli = resolveAwsCli();

if (!adminProfile) fail('--admin-profile is required; no default administrator profile is allowed.');
if (region !== REVIEW_EMAIL_REGION) fail(`Foundation finalization is locked to ${REVIEW_EMAIL_REGION}.`);
if (!existsSync(TEMPLATE_PATH) || !existsSync(STACK_POLICY_PATH)) {
  fail('Foundation template or stack policy is missing.');
}

const template = JSON.parse(readFileSync(TEMPLATE_PATH, 'utf8'));
const stackPolicy = JSON.parse(readFileSync(STACK_POLICY_PATH, 'utf8'));
const templateDigest = canonicalJsonSha256(template);
const stackPolicyDigest = canonicalJsonSha256(stackPolicy);
const sourceCommit = git(['rev-parse', 'HEAD']).trim();
assert(sourceCommit === git(['rev-parse', 'origin/main']).trim(), 'HEAD must match origin/main.');
assert(gitStatusIsClean(), 'Working tree must be clean before foundation finalization.');

const caller = awsJson(['sts', 'get-caller-identity']);
assert(caller.Account === REVIEW_EMAIL_ACCOUNT_ID, 'Administrator caller account is not the locked account.');
assert(
  /AWSReservedSSO_AdministratorAccess_/.test(caller.Arn ?? ''),
  'Foundation finalization requires a temporary AdministratorAccess SSO session.',
);

const stack = awsJson([
  'cloudformation',
  'describe-stacks',
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
]).Stacks?.[0];
assert(stack?.StackStatus === 'CREATE_COMPLETE', 'Foundation must be CREATE_COMPLETE before stack policy is applied.');
const stackTags = Object.fromEntries((stack.Tags ?? []).map(({ Key, Value }) => [Key, Value]));
assertDeepEqual(
  stackTags,
  {
    ...FOUNDATION_STACK_TAGS,
    SourceCommit: sourceCommit,
    TemplateDigest: templateDigest,
  },
  'Foundation stack tags',
);

const storedTemplateResponse = awsJson([
  'cloudformation',
  'get-template',
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  '--template-stage',
  'Original',
]);
assert(
  (storedTemplateResponse.StagesAvailable ?? []).includes('Original'),
  'Foundation stack does not expose the Original template stage.',
);
const storedTemplate = parseJsonDocument(storedTemplateResponse.TemplateBody, 'Original stack template');
assert(
  canonicalJsonSha256(storedTemplate) === templateDigest,
  'Canonical deployed template digest differs from local source.',
);

const expectedParameters = Object.fromEntries(
  Object.entries(template.Parameters ?? {}).map(([name, definition]) => [name, definition.Default ?? '']),
);
const expectedLogicalIds = effectiveResourceLogicalIds(template, expectedParameters);
const resources = awsJson([
  'cloudformation',
  'list-stack-resources',
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
]).StackResourceSummaries ?? [];
assert(resources.length === expectedLogicalIds.length, 'Foundation stack resource count is unexpected.');
const actualResourceTypes = {};
for (const resource of resources) {
  assert(resource.ResourceStatus.endsWith('_COMPLETE'), `${resource.LogicalResourceId} is not complete.`);
  actualResourceTypes[resource.LogicalResourceId] = resource.ResourceType;
}
const expectedResourceTypes = Object.fromEntries(
  expectedLogicalIds.map((logicalId) => [logicalId, template.Resources[logicalId].Type]),
);
assertDeepEqual(actualResourceTypes, expectedResourceTypes, 'Foundation stack resource inventory');

process.stdout.write(`${JSON.stringify({
  effectiveMutation: apply,
  mode: apply ? 'apply' : 'dry-run',
  sourceCommit,
  stackName: REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  stackPolicyDigest,
  templateDigest,
  terminationProtectionBefore: stack.EnableTerminationProtection === true,
}, null, 2)}\n`);

if (!apply) {
  process.stdout.write(
    'Dry run only. Stack-policy and termination-protection mutations require --apply and separate explicit approval.\n',
  );
  process.exit(0);
}

runAws([
  'cloudformation',
  'set-stack-policy',
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  '--stack-policy-body',
  `file://${STACK_POLICY_PATH.replaceAll('\\', '/')}`,
]);
const livePolicyResponse = awsJson([
  'cloudformation',
  'get-stack-policy',
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
]);
const livePolicy = parseJsonDocument(livePolicyResponse.StackPolicyBody, 'Live foundation stack policy');
assert(canonicalJsonSha256(livePolicy) === stackPolicyDigest, 'Live stack policy differs from source.');

runAws([
  'cloudformation',
  'update-termination-protection',
  '--enable-termination-protection',
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
]);
const finalized = awsJson([
  'cloudformation',
  'describe-stacks',
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
]).Stacks?.[0];
assert(finalized?.EnableTerminationProtection === true, 'Foundation termination protection was not enabled.');
assert(finalized?.StackStatus === 'CREATE_COMPLETE', 'Foundation status changed during finalization.');
process.stdout.write('Foundation stack policy and termination protection are verified.\n');

function gitStatusIsClean() {
  const unstaged = spawnSync('git', ['diff', '--quiet'], { cwd: ROOT, stdio: 'pipe' });
  const staged = spawnSync('git', ['diff', '--cached', '--quiet'], { cwd: ROOT, stdio: 'pipe' });
  return unstaged.status === 0 &&
    staged.status === 0 &&
    git(['ls-files', '--others', '--exclude-standard']).trim() === '';
}

function git(args) {
  const result = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
  if (result.status !== 0) fail(result.stderr || result.stdout || `git ${args[0]} failed.`);
  return result.stdout;
}

function awsJson(args) {
  const result = runAws(args);
  try {
    return JSON.parse(result.stdout || '{}');
  } catch {
    fail(`AWS CLI returned invalid JSON for ${args[0]} ${args[1]}.`);
  }
}

function runAws(args) {
  const result = spawnSync(
    awsCli,
    [...args, '--profile', adminProfile, '--region', region, '--output', 'json', '--no-cli-pager'],
    { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' },
  );
  if (result.status !== 0) fail(sanitize(result.stderr || result.stdout || `${args[0]} ${args[1]} failed.`));
  return result;
}

function assertDeepEqual(actual, expected, label) {
  assert(
    canonicalJsonSha256(actual) === canonicalJsonSha256(expected),
    `${label} does not match the source contract.`,
  );
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function fail(message) {
  process.stderr.write(`${String(message).trim()}\n`);
  process.exit(1);
}

function sanitize(value) {
  return String(value)
    .replace(/arn:aws:[^\s"']+/g, '[redacted-arn]')
    .replace(/\b[A-Z0-9]{20}\b/g, '[redacted-access-key-id]')
    .trim();
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
