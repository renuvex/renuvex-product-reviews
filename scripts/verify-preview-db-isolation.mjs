import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function quoteCmdArg(value) {
  const raw = String(value);
  if (!/[\s&()^|<>]/.test(raw)) return raw;
  return `"${raw.replace(/"/g, '""')}"`;
}

function run(command, args, options = {}) {
  if (process.platform === 'win32' && command === 'vercel') {
    const commandLine = [command, ...args.map(quoteCmdArg)].join(' ');
    return execFileSync('cmd.exe', ['/d', '/c', commandLine], options);
  }
  return execFileSync(command, args, options);
}

function argValue(name) {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function currentBranch() {
  return run('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
}

function pullEnv(targetPath, environment, branch) {
  const args = ['env', 'pull', targetPath, '--environment', environment, '--yes'];
  if (branch) args.push('--git-branch', branch);
  run('vercel', args, { stdio: ['ignore', 'pipe', 'pipe'] });
}

function parseEnv(path) {
  const out = {};
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    if (!line || line.trimStart().startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function describeDbUrl(raw) {
  if (!raw) return { missing: true };
  const parsed = new URL(raw);
  const user = decodeURIComponent(parsed.username);
  const userProjectRef = user.match(/^postgres\.([^.]+)$/)?.[1] ?? null;
  const directHostProjectRef = parsed.hostname.match(/^db\.([^.]+)\.supabase\.co$/)?.[1] ?? null;
  return {
    missing: false,
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : null,
    database: parsed.pathname.replace(/^\//, ''),
    userPrefix: `${user.slice(0, Math.min(user.length, 8))}...`,
    projectRef: userProjectRef ?? directHostProjectRef,
    pgbouncer: parsed.searchParams.get('pgbouncer') === 'true',
  };
}

function sameTarget(left, right) {
  if (left.missing || right.missing) return false;
  if (left.projectRef && right.projectRef) return left.projectRef === right.projectRef;
  return left.host === right.host && left.port === right.port && left.database === right.database;
}

function output(result) {
  if (hasFlag('json')) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  console.dir(result, { depth: null, colors: process.stdout.isTTY });
}

const branch = argValue('branch') || currentBranch();
if (!branch) {
  throw new Error('Could not resolve current git branch. Pass --branch=<branch-name>.');
}

const workspace = mkdtempSync(join(tmpdir(), 'renuvex-preview-db-'));
const previewPath = join(workspace, 'preview.env');
const productionPath = join(workspace, 'production.env');

try {
  pullEnv(previewPath, 'preview', branch);
  pullEnv(productionPath, 'production');

  const preview = parseEnv(previewPath);
  const production = parseEnv(productionPath);
  const previewDatabase = describeDbUrl(preview.DATABASE_URL);
  const productionDatabase = describeDbUrl(production.DATABASE_URL);
  const previewDirect = describeDbUrl(preview.DIRECT_URL);
  const productionDirect = describeDbUrl(production.DIRECT_URL);
  const databaseSame = sameTarget(previewDatabase, productionDatabase);
  const directSame = sameTarget(previewDirect, productionDirect);
  const result = {
    mode: 'read-only',
    branch,
    previewDatabase,
    productionDatabase,
    previewDirect,
    productionDirect,
    isolated: !databaseSame && !directSame,
    failures: [
      previewDatabase.missing ? 'preview_DATABASE_URL_missing' : null,
      previewDirect.missing ? 'preview_DIRECT_URL_missing' : null,
      productionDatabase.missing ? 'production_DATABASE_URL_missing' : null,
      productionDirect.missing ? 'production_DIRECT_URL_missing' : null,
      databaseSame ? 'preview_DATABASE_URL_matches_production' : null,
      directSame ? 'preview_DIRECT_URL_matches_production' : null,
    ].filter(Boolean),
  };

  output(result);

  if (result.failures.length > 0) {
    throw new Error(`Preview DB isolation failed: ${result.failures.join(', ')}`);
  }
} finally {
  rmSync(workspace, { recursive: true, force: true });
}
