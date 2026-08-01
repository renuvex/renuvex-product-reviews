import { spawn } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { createCiEnvironment, resolvePnpmCommand } from './ci-environment.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pnpm = resolvePnpmCommand();
const hostname = process.env.RENUVEX_CI_HOSTNAME || '127.0.0.1';
const port = process.env.RENUVEX_CI_PORT || '3211';
const environment = createCiEnvironment(repoRoot);

const child = spawn(
  pnpm.file,
  [...pnpm.prefix, 'exec', 'next', 'start', '--hostname', hostname, '--port', port],
  {
    cwd: repoRoot,
    env: environment,
    stdio: 'inherit',
  },
);

function stopChild(signal) {
  if (!child.killed) child.kill(signal);
}

process.on('SIGINT', () => stopChild('SIGINT'));
process.on('SIGTERM', () => stopChild('SIGTERM'));

child.on('error', (error) => {
  console.error(`[ci-start] ${error.message}`);
  process.exitCode = 1;
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exitCode = code ?? 1;
});
