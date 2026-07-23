import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  REVIEW_EMAIL_ACCOUNT_ID,
  REVIEW_EMAIL_REGION,
  canonicalJsonSha256,
} from './lib/review-email-cloudformation-contract.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TEMPLATE_PATH = resolve(ROOT, 'infra/aws/review-email-deployment-access.cloudformation.json');
const apply = process.argv.includes('--apply');
const changeSetName = readOption('--change-set-name');
const adminProfile = readOption('--admin-profile');
const readProfile = readOption('--read-profile') || 'renuvex-readonly';
const region = readOption('--region') || REVIEW_EMAIL_REGION;
const awsCli = resolveAwsCli();

if (!changeSetName) fail('--change-set-name is required.');
if (!/^renuvex-review-email-access-hardening-[a-z0-9][a-z0-9-]{0,95}$/.test(changeSetName)) {
  fail('Access hardening change-set name is invalid.');
}
if (!adminProfile) fail('--admin-profile is required; no default administrator profile is allowed.');
if (region !== REVIEW_EMAIL_REGION) fail(`Access hardening is locked to ${REVIEW_EMAIL_REGION}.`);
if (!existsSync(TEMPLATE_PATH)) fail(`Missing deployment-access template: ${TEMPLATE_PATH}`);

const sourceTemplate = JSON.parse(readFileSync(TEMPLATE_PATH, 'utf8'));
const sourceTemplateDigest = canonicalJsonSha256(sourceTemplate);
const sourceCommit = git(['rev-parse', 'HEAD']).trim();
assert(sourceCommit === git(['rev-parse', 'origin/main']).trim(), 'HEAD must match origin/main.');
assert(gitStatusIsClean(), 'Working tree must be clean before access hardening.');

const admin = awsJson(['sts', 'get-caller-identity'], adminProfile);
assert(admin.Account === REVIEW_EMAIL_ACCOUNT_ID, 'Administrator caller account is not the locked account.');
assert(
  /AWSReservedSSO_AdministratorAccess_/.test(admin.Arn ?? ''),
  'Access hardening requires a temporary AdministratorAccess SSO session.',
);
const reader = awsJson(['sts', 'get-caller-identity'], readProfile);
assert(reader.Account === REVIEW_EMAIL_ACCOUNT_ID, 'Read-only caller account is not the locked account.');

const stack = awsJson(
  ['cloudformation', 'describe-stacks', '--stack-name', REVIEW_EMAIL_ACCESS_STACK_NAME],
  readProfile,
).Stacks?.[0];
assert(stack, 'Deployment-access stack is missing.');
assert(stack.StackStatus === 'CREATE_COMPLETE' || stack.StackStatus === 'UPDATE_COMPLETE', 'Access stack is not stable.');
assert(stack.EnableTerminationProtection === true, 'Access stack termination protection must remain enabled.');

const liveParameters = Object.fromEntries(
  (stack.Parameters ?? []).map(({ ParameterKey, ParameterValue }) => [ParameterKey, ParameterValue]),
);
const parameters = Object.entries(sourceTemplate.Parameters ?? {}).map(([ParameterKey, definition]) =>
  ParameterKey in liveParameters
    ? { ParameterKey, UsePreviousValue: true }
    : { ParameterKey, ParameterValue: definition.Default },
);
for (const parameter of parameters) {
  assert(
    parameter.UsePreviousValue === true || parameter.ParameterValue !== undefined,
    `New parameter ${parameter.ParameterKey} must define a fail-closed default.`,
  );
}

process.stdout.write(`${JSON.stringify({
  changeSetName,
  effectiveMutation: apply,
  mode: apply ? 'apply' : 'dry-run',
  sourceCommit,
  sourceTemplateDigest,
  stackName: REVIEW_EMAIL_ACCESS_STACK_NAME,
}, null, 2)}\n`);

if (!apply) {
  process.stdout.write(
    'Dry run only. Access-hardening change-set creation requires --apply and separate explicit approval.\n',
  );
  process.exit(0);
}

const createArgs = [
  'cloudformation',
  'create-change-set',
  '--stack-name',
  REVIEW_EMAIL_ACCESS_STACK_NAME,
  '--change-set-name',
  changeSetName,
  '--change-set-type',
  'UPDATE',
  '--description',
  `source=${sourceCommit} template-sha256=${sourceTemplateDigest}`,
  '--template-body',
  `file://${TEMPLATE_PATH.replaceAll('\\', '/')}`,
  '--capabilities',
  'CAPABILITY_NAMED_IAM',
  '--parameters',
  JSON.stringify(parameters),
];
if ((stack.Tags ?? []).length > 0) {
  createArgs.push(
    '--tags',
    ...stack.Tags.map(({ Key, Value }) => `Key=${Key},Value=${Value}`),
  );
}
awsJson(createArgs, adminProfile);
runAws(
  [
    'cloudformation',
    'wait',
    'change-set-create-complete',
    '--stack-name',
    REVIEW_EMAIL_ACCESS_STACK_NAME,
    '--change-set-name',
    changeSetName,
  ],
  readProfile,
);
const verification = spawnSync(
  process.execPath,
  [
    resolve(ROOT, 'scripts/verify-review-email-access-hardening-change-set.mjs'),
    `--change-set-name=${changeSetName}`,
    `--profile=${readProfile}`,
    `--region=${region}`,
    '--json',
  ],
  { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' },
);
if (verification.status !== 0) {
  fail(
    `Access hardening change set was created but failed verification. It was not executed.\n${
      verification.stderr || verification.stdout
    }`,
  );
}
process.stdout.write(verification.stdout);
process.stdout.write('Access hardening change set is verified but not executed.\n');

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

function runAws(args, profile) {
  const result = spawnSync(
    awsCli,
    [...args, '--profile', profile, '--region', region, '--output', 'json', '--no-cli-pager'],
    { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' },
  );
  if (result.status !== 0) fail(sanitize(result.stderr || result.stdout || `${args[0]} ${args[1]} failed.`));
  return result;
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
