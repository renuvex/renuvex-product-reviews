import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DISABLED_APPROVAL_EXPIRY,
  FOUNDATION_STACK_TAGS,
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  REVIEW_EMAIL_ACCOUNT_ID,
  REVIEW_EMAIL_FOUNDATION_ROLE_NAME,
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  REVIEW_EMAIL_REGION,
  canonicalJsonSha256,
  declaredResourceTypes,
  readStrictJsonFile,
} from './lib/review-email-cloudformation-contract.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TEMPLATE_PATH = resolve(ROOT, 'infra/aws/review-email-foundation.cloudformation.json');
const STACK_POLICY_PATH = resolve(ROOT, 'infra/aws/review-email-foundation.stack-policy.json');
const apply = process.argv.includes('--apply');
const changeSetName = readOption('--change-set-name');
const authorProfile = readOption('--author-profile') || 'renuvex-review-email-author';
const readProfile = readOption('--read-profile') || 'renuvex-readonly';
const region = readOption('--region') || REVIEW_EMAIL_REGION;
const awsCli = resolveAwsCli();

if (!changeSetName) fail('--change-set-name is required.');
if (!/^renuvex-review-email-foundation-[a-z0-9][a-z0-9-]{0,95}$/.test(changeSetName)) {
  fail('Change-set name does not match the locked foundation prefix.');
}
if (region !== REVIEW_EMAIL_REGION) fail(`Foundation deployment is locked to ${REVIEW_EMAIL_REGION}.`);
if (!existsSync(TEMPLATE_PATH)) fail(`Missing foundation template: ${TEMPLATE_PATH}`);
if (!existsSync(STACK_POLICY_PATH)) fail(`Missing foundation stack policy: ${STACK_POLICY_PATH}`);

const template = readStrictJsonFile(TEMPLATE_PATH, 'foundation template');
const templateDigest = canonicalJsonSha256(template);
const stackPolicy = readStrictJsonFile(STACK_POLICY_PATH, 'foundation stack policy');
const stackPolicyDigest = canonicalJsonSha256(stackPolicy);
const sourceCommit = git(['rev-parse', 'HEAD']).trim();
const originMain = git(['rev-parse', 'origin/main']).trim();
assert(sourceCommit === originMain, 'HEAD must match origin/main.');
assert(/^[a-f0-9]{40}$/.test(sourceCommit), 'Source commit must be a full Git SHA.');
assert(gitStatusIsClean(), 'Working tree must be clean before change-set creation.');

const caller = awsJson(['sts', 'get-caller-identity'], readProfile);
assert(caller.Account === REVIEW_EMAIL_ACCOUNT_ID, 'Read-only caller account is not the locked account.');
if (apply) {
  const author = awsJson(['sts', 'get-caller-identity'], authorProfile);
  assert(author.Account === REVIEW_EMAIL_ACCOUNT_ID, 'Author caller account is not the locked account.');
  assert(
    /AWSReservedSSO_RenuvexReviewEmailAuthor_/.test(author.Arn ?? ''),
    'Mutation profile is not the dedicated review-email change-set author.',
  );
}

const accessStack = awsJson(
  ['cloudformation', 'describe-stacks', '--stack-name', REVIEW_EMAIL_ACCESS_STACK_NAME],
  readProfile,
).Stacks?.[0];
assert(accessStack, 'Deployment-access stack is missing.');
const accessParameters = Object.fromEntries(
  (accessStack.Parameters ?? []).map(({ ParameterKey, ParameterValue }) => [ParameterKey, ParameterValue]),
);
assert(
  accessParameters.ApprovedFoundationChangeSetName === changeSetName,
  'Administrator must stage this exact change-set name before creation.',
);
assert(
  accessParameters.FoundationExecutionApprovalExpiresAt === DISABLED_APPROVAL_EXPIRY,
  'Execute approval must remain closed while the change set is being created and reviewed.',
);

const existingFoundation = optionalAwsJson(
  ['cloudformation', 'describe-stacks', '--stack-name', REVIEW_EMAIL_FOUNDATION_STACK_NAME],
  readProfile,
  isCloudFormationNotFound,
)?.Stacks?.[0];
assert(!existingFoundation, 'Foundation stack already exists; this source-only creator supports first CREATE only.');

const resourceTypes = declaredResourceTypes(template);
const tags = {
  ...FOUNDATION_STACK_TAGS,
  SourceCommit: sourceCommit,
  StackPolicyDigest: stackPolicyDigest,
  TemplateDigest: templateDigest,
};
const roleArn =
  `arn:aws:iam::${REVIEW_EMAIL_ACCOUNT_ID}:role/renuvex/review-email/cloudformation/` +
  REVIEW_EMAIL_FOUNDATION_ROLE_NAME;
const parameters = Object.entries(template.Parameters ?? {}).map(([ParameterKey, definition]) => ({
  ParameterKey,
  ParameterValue: definition.Default ?? '',
}));
const createArgs = [
  'cloudformation',
  'create-change-set',
  '--stack-name',
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  '--change-set-name',
  changeSetName,
  '--change-set-type',
  'CREATE',
  '--description',
  `source=${sourceCommit} template-sha256=${templateDigest} stack-policy-sha256=${stackPolicyDigest}`,
  '--template-body',
  `file://${TEMPLATE_PATH.replaceAll('\\', '/')}`,
  '--role-arn',
  roleArn,
  '--on-stack-failure',
  'ROLLBACK',
  '--resource-types',
  ...resourceTypes,
  '--parameters',
  JSON.stringify(parameters),
  '--tags',
  ...Object.entries(tags).map(([Key, Value]) => `Key=${Key},Value=${Value}`),
];

process.stdout.write(`${JSON.stringify({
  authorIdentityVerified: apply,
  changeSetName,
  effectiveMutation: apply,
  mode: apply ? 'apply' : 'dry-run',
  onStackFailure: 'ROLLBACK',
  resourceTypes,
  sourceCommit,
  stackPolicyDigest,
  stackName: REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  templateDigest,
}, null, 2)}\n`);

if (!apply) {
  process.stdout.write('Dry run only. Creation requires --apply after a separate explicit mutation approval.\n');
  process.exit(0);
}

awsJson(createArgs, authorProfile);
runAws(
  [
    'cloudformation',
    'wait',
    'change-set-create-complete',
    '--stack-name',
    REVIEW_EMAIL_FOUNDATION_STACK_NAME,
    '--change-set-name',
    changeSetName,
  ],
  readProfile,
);
const verification = spawnSync(
  process.execPath,
  [
    resolve(ROOT, 'scripts/verify-review-email-foundation-change-set.mjs'),
    `--change-set-name=${changeSetName}`,
    `--profile=${readProfile}`,
    `--region=${region}`,
    '--json',
  ],
  { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' },
);
if (verification.status !== 0) {
  fail(
    `Change set was created but failed source verification. It was not deleted or executed.\n${
      verification.stderr || verification.stdout
    }`,
  );
}
process.stdout.write(verification.stdout);
process.stdout.write('Change set is verified but execute approval remains closed.\n');

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

function awsJson(args, profile) {
  const result = runAws(args, profile);
  try {
    return JSON.parse(result.stdout || '{}');
  } catch {
    fail(`AWS CLI returned invalid JSON for ${args[0]} ${args[1]}.`);
  }
}

function optionalAwsJson(args, profile, expectedFailure) {
  const result = runAws(args, profile, true);
  if (result.status === 0) {
    try {
      return JSON.parse(result.stdout || '{}');
    } catch {
      fail(`AWS CLI returned invalid JSON for ${args[0]} ${args[1]}.`);
    }
  }
  if (expectedFailure(result.stderr || result.stdout || '')) return null;
  fail(sanitize(result.stderr || result.stdout || `${args[0]} ${args[1]} failed.`));
}

function runAws(args, profile, allowFailure = false) {
  const result = spawnSync(
    awsCli,
    [...args, '--profile', profile, '--region', region, '--output', 'json', '--no-cli-pager'],
    { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' },
  );
  if (!allowFailure && result.status !== 0) {
    fail(sanitize(result.stderr || result.stdout || `${args[0]} ${args[1]} failed.`));
  }
  return result;
}

function isCloudFormationNotFound(value) {
  return /ValidationError.*does not exist|Stack with id .* does not exist/is.test(value);
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
