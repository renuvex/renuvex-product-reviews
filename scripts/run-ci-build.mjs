import { spawnSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { createCiEnvironment, resolvePnpmCommand } from './ci-environment.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const pnpm = resolvePnpmCommand();
const widgetOnly = process.argv.includes('--widget-only');
const ciEnvironment = createCiEnvironment(repoRoot);
const widgetEnvironment = createCiEnvironment(repoRoot, { widgetPublicOrigins: true });

const widgetCommands = [
  { args: ['build:widget'], env: widgetEnvironment },
  { args: ['check:generated:widget'], env: ciEnvironment },
];
const commands = widgetOnly
  ? widgetCommands
  : [
      { args: ['verify:auth-runtime-env'], env: ciEnvironment },
      { args: ['prisma:generate'], env: ciEnvironment },
      ...widgetCommands,
      { args: ['exec', 'next', 'build', '--webpack'], env: ciEnvironment },
    ];

for (const command of commands) {
  const { args, env } = command;
  console.log(`[ci-build] pnpm ${args.join(' ')}`);
  const result = spawnSync(pnpm.file, [...pnpm.prefix, ...args], {
    cwd: repoRoot,
    env,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
