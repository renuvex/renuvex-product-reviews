import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PLAN_PATH = resolve(ROOT, '.tmp/widget-aws-canary-upload-plan.json');

const args = new Set(process.argv.slice(2));
const apply = args.has('--apply');
const summaryOnly = args.has('--summary');
const skipExisting = args.has('--skip-existing');
const bucket = readOption('--bucket') || process.env.AWS_WIDGET_CANARY_BUCKET || '';
const profile = readOption('--profile') || process.env.AWS_PROFILE || 'renuvex-widget-canary';
const awsCli = resolveAwsCli();

function readOption(name) {
  const prefix = `${name}=`;
  const found = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length).trim() : '';
}

function shellQuote(value) {
  const stringValue = String(value);
  if (/^[A-Za-z0-9_./:@%+=,-]+$/.test(stringValue)) return stringValue;
  return `"${stringValue.replace(/"/g, '\\"')}"`;
}

function resolveAwsCli() {
  if (process.env.AWS_CLI) return process.env.AWS_CLI;
  const candidates = [
    commandExistsOnPath('aws') ? 'aws' : '',
    process.env.ProgramFiles ? resolve(process.env.ProgramFiles, 'Amazon/AWSCLIV2/aws.exe') : '',
    process.env['ProgramFiles(x86)'] ? resolve(process.env['ProgramFiles(x86)'], 'Amazon/AWSCLIV2/aws.exe') : '',
  ].filter(Boolean);
  return candidates.find((candidate) => candidate === 'aws' || existsSync(candidate)) || 'aws';
}

function commandExistsOnPath(command) {
  const probe = process.platform === 'win32' ? 'where.exe' : 'which';
  const result = spawnSync(probe, [command], { encoding: 'utf8', stdio: 'pipe' });
  return result.status === 0;
}

function putObjectArgs(file) {
  return [
    's3api',
    'put-object',
    '--profile',
    profile,
    '--bucket',
    bucket,
    '--key',
    file.key,
    '--body',
    resolve(ROOT, file.file),
    '--content-type',
    file.contentType,
    '--cache-control',
    file.cacheControl,
  ];
}

function commandString(commandArgs) {
  return [awsCli, ...commandArgs].map(shellQuote).join(' ');
}

if (!bucket || !/^renuvex-widget-[a-z0-9][a-z0-9.-]*[a-z0-9]$/.test(bucket)) {
  console.error('AWS widget canary bucket is required and must match renuvex-widget-*.');
  console.error('Pass --bucket=renuvex-widget-canary-... or set AWS_WIDGET_CANARY_BUCKET.');
  process.exit(1);
}

if (!existsSync(PLAN_PATH)) {
  console.error('Missing upload plan. Run pnpm aws:widget:prepare-assets first.');
  process.exit(1);
}

const plan = JSON.parse(readFileSync(PLAN_PATH, 'utf8'));
let files = Array.isArray(plan.files) ? plan.files : [];
if (files.length === 0) {
  console.error('Upload plan is empty.');
  process.exit(1);
}

if (apply && skipExisting) {
  const existingKeys = listExistingKeys();
  const originalCount = files.length;
  files = files.filter((file) => !existingKeys.has(file.key));
  console.log(`[aws-widget-upload] skip-existing=true existing=${existingKeys.size} remaining=${files.length} skipped=${originalCount - files.length}`);
}

console.log(`[aws-widget-upload] bucket=${bucket} profile=${profile} files=${files.length} mode=${apply ? 'apply' : 'dry-run'}`);

if (!apply && summaryOnly) {
  for (const file of files.slice(0, 5)) {
    console.log(`[dry-run-sample] ${commandString(putObjectArgs(file))}`);
  }
  console.log(`[aws-widget-upload] dry-run summary only. Suppressed ${Math.max(files.length - 5, 0)} additional put-object commands.`);
  console.log('[aws-widget-upload] add --apply only after the S3 bucket exists and explicit approval is given.');
  process.exit(0);
}

for (const file of files) {
  const commandArgs = putObjectArgs(file);
  if (!apply) {
    console.log(`[dry-run] ${commandString(commandArgs)}`);
    continue;
  }

  const result = spawnSync(awsCli, commandArgs, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout || `Failed to upload ${file.key}\n`);
    process.exit(result.status || 1);
  }
  console.log(`[uploaded] ${file.key} ${file.bytes} bytes`);
}

if (!apply) {
  console.log('[aws-widget-upload] dry-run only. Add --apply after the S3 bucket exists and explicit approval is given.');
}

function listExistingKeys() {
  const existing = new Set();
  let token = '';

  do {
    const commandArgs = [
      's3api',
      'list-objects-v2',
      '--profile',
      profile,
      '--bucket',
      bucket,
      '--output',
      'json',
    ];
    if (token) {
      commandArgs.push('--continuation-token', token);
    }

    const result = spawnSync(awsCli, commandArgs, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: 'pipe',
    });

    if (result.status !== 0) {
      process.stderr.write(result.stderr || result.stdout || 'Failed to list existing S3 objects.\n');
      process.exit(result.status || 1);
    }

    const payload = JSON.parse(result.stdout || '{}');
    for (const object of payload.Contents || []) {
      if (object?.Key) existing.add(object.Key);
    }
    token = payload.IsTruncated ? payload.NextContinuationToken || '' : '';
  } while (token);

  return existing;
}
