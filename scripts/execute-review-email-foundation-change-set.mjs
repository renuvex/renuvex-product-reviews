import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  REVIEW_EMAIL_ACCOUNT_ID,
  REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  REVIEW_EMAIL_REGION,
} from './lib/review-email-cloudformation-contract.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const apply = process.argv.includes('--apply');
const changeSetName = readOption('--change-set-name');
const adminProfile = readOption('--admin-profile');
const operatorProfile = readOption('--operator-profile') || 'renuvex-review-email';
const readProfile = readOption('--read-profile') || 'renuvex-readonly';
const region = readOption('--region') || REVIEW_EMAIL_REGION;
const awsCli = resolveAwsCli();

if (!changeSetName) fail('--change-set-name is required.');
if (!adminProfile) fail('--admin-profile is required; no default administrator profile is allowed.');
if (!/^renuvex-review-email-foundation-[a-z0-9][a-z0-9-]{0,95}$/.test(changeSetName)) {
  fail('Change-set name does not match the locked foundation prefix.');
}
if (region !== REVIEW_EMAIL_REGION) fail(`Foundation execution is locked to ${REVIEW_EMAIL_REGION}.`);

verifyChangeSet();
const expiry = new Date(Math.ceil((Date.now() + 10 * 60_000) / 1000) * 1000)
  .toISOString()
  .replace('.000Z', 'Z');
process.stdout.write(`${JSON.stringify({
  approvalExpiresAt: expiry,
  changeSetName,
  effectiveMutation: apply,
  mode: apply ? 'apply' : 'dry-run',
  retainExceptOnCreate: true,
  stackName: REVIEW_EMAIL_FOUNDATION_STACK_NAME,
}, null, 2)}\n`);

if (!apply) {
  process.stdout.write(
    'Dry run only. Execution requires --apply after separate approval of the verified change set.\n',
  );
  process.exit(0);
}

let executeAccepted = false;
let operationError = null;
let closeError = null;
try {
  runNode([
    resolve(ROOT, 'scripts/set-review-email-foundation-execution-approval.mjs'),
    '--mode=open',
    `--change-set-name=${changeSetName}`,
    `--expires-at=${expiry}`,
    `--admin-profile=${adminProfile}`,
    `--region=${region}`,
    '--apply',
  ]);

  const operator = awsJson(['sts', 'get-caller-identity'], operatorProfile);
  assert(operator.Account === REVIEW_EMAIL_ACCOUNT_ID, 'Operator caller account is not the locked account.');
  assert(
    /AWSReservedSSO_RenuvexReviewEmailOperator_/.test(operator.Arn ?? ''),
    'Execution profile is not the dedicated review-email operator.',
  );
  runAws(
    [
      'cloudformation',
      'execute-change-set',
      '--stack-name',
      REVIEW_EMAIL_FOUNDATION_STACK_NAME,
      '--change-set-name',
      changeSetName,
      '--retain-except-on-create',
    ],
    operatorProfile,
  );
  executeAccepted = true;
} catch (error) {
  operationError = error;
} finally {
  try {
    runNode([
      resolve(ROOT, 'scripts/set-review-email-foundation-execution-approval.mjs'),
      '--mode=close',
      `--admin-profile=${adminProfile}`,
      `--region=${region}`,
      '--apply',
    ]);
  } catch (error) {
    closeError = error;
  }
}

if (closeError) {
  fail(
    `Foundation execute approval cleanup failed. The IAM DateLessThan deadline still bounds authorization, but manual verification is required.\n${closeError.message}`,
  );
}
if (operationError) fail(operationError.message);
assert(executeAccepted, 'CloudFormation did not accept ExecuteChangeSet.');

const waitResult = runAws(
  [
    'cloudformation',
    'wait',
    'stack-create-complete',
    '--stack-name',
    REVIEW_EMAIL_FOUNDATION_STACK_NAME,
  ],
  readProfile,
  true,
);
if (waitResult.status !== 0) {
  fail(
    `ExecuteChangeSet was accepted and approval was closed, but stack creation did not complete. Inspect stack events without retrying the send path.\n${sanitize(
      waitResult.stderr || waitResult.stdout,
    )}`,
  );
}
process.stdout.write(
  'Foundation stack reached CREATE_COMPLETE and execute approval was closed. Apply stack policy and termination protection through the separate finalizer gate.\n',
);

function verifyChangeSet() {
  runNode([
    resolve(ROOT, 'scripts/verify-review-email-foundation-change-set.mjs'),
    `--change-set-name=${changeSetName}`,
    `--profile=${readProfile}`,
    `--region=${region}`,
    '--json',
  ]);
}

function runNode(args) {
  const result = spawnSync(process.execPath, args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: 'pipe',
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `${args[0]} failed.`);
  }
  if (result.stdout) process.stdout.write(result.stdout);
}

function awsJson(args, profile) {
  const result = runAws(args, profile);
  try {
    return JSON.parse(result.stdout || '{}');
  } catch {
    fail(`AWS CLI returned invalid JSON for ${args[0]} ${args[1]}.`);
  }
}

function runAws(args, profile, allowFailure = false) {
  const result = spawnSync(
    awsCli,
    [...args, '--profile', profile, '--region', region, '--output', 'json', '--no-cli-pager'],
    { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' },
  );
  if (!allowFailure && result.status !== 0) {
    throw new Error(sanitize(result.stderr || result.stdout || `${args[0]} ${args[1]} failed.`));
  }
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
