import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const scopes = {
  widget: ['public/widget.js', 'public/widget-runtime'],
  ikas: [
    'src/lib/ikas-client/generated/graphql.ts',
    'src/lib/ikas-client/generated/v1-graphql.ts',
    'src/types/ikas-order-enum-globals.d.ts',
  ],
};

const scopeOption = process.argv.find((argument) => argument.startsWith('--scope='));
const scope = scopeOption?.slice('--scope='.length);
const paths = scope ? scopes[scope] : undefined;

if (!paths) {
  console.error(`usage: node scripts/check-generated-artifacts.mjs --scope=${Object.keys(scopes).join('|')}`);
  process.exit(2);
}

function gitOutput(args) {
  return execFileSync('git', args, {
    cwd: repoRoot,
    encoding: 'utf8',
  }).trim();
}

const status = gitOutput(['status', '--porcelain=v1', '--untracked-files=all', '--', ...paths]);
const untracked = status
  .split(/\r?\n/)
  .filter((line) => line.startsWith('?? '))
  .map((line) => line.slice(3));
const unstaged = gitOutput(['diff', '--name-only', '--', ...paths]).split(/\r?\n/).filter(Boolean);
const staged = gitOutput(['diff', '--cached', '--name-only', '--', ...paths]).split(/\r?\n/).filter(Boolean);
const drift = [...new Set([...untracked, ...unstaged, ...staged])];

if (drift.length > 0) {
  console.error(`generated_artifact_drift:${scope}`);
  console.error(drift.join('\n'));
  process.exit(1);
}

console.log(`generated_artifacts_clean:${scope}`);
