import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TEMPLATE_PATH = resolve(ROOT, 'infra/aws/widget-cdn-canary.cloudformation.json');
const profile = readOption('--profile') || process.env.AWS_PROFILE || 'renuvex-widget-canary';
const awsCli = resolveAwsCli();

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
    process.env['ProgramFiles(x86)'] ? resolve(process.env['ProgramFiles(x86)'], 'Amazon/AWSCLIV2/aws.exe') : '',
  ].filter(Boolean);
  return candidates.find((candidate) => candidate === 'aws' || existsSync(candidate)) || 'aws';
}

function commandExistsOnPath(command) {
  const probe = process.platform === 'win32' ? 'where.exe' : 'which';
  const result = spawnSync(probe, [command], { encoding: 'utf8', stdio: 'pipe' });
  return result.status === 0;
}

if (!existsSync(TEMPLATE_PATH)) {
  console.error(`Missing CloudFormation template: ${TEMPLATE_PATH}`);
  process.exit(1);
}

const templateBody = `file://${TEMPLATE_PATH.replace(/\\/g, '/')}`;
const result = spawnSync(
  awsCli,
  ['cloudformation', 'validate-template', '--profile', profile, '--template-body', templateBody],
  {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: 'pipe',
  },
);

if (result.status !== 0) {
  process.stderr.write(result.stderr || result.stdout || 'CloudFormation template validation failed.\n');
  process.exit(result.status || 1);
}

process.stdout.write(result.stdout || 'CloudFormation template validation succeeded.\n');
