// scripts/clean-widget-runtime-untracked.mjs
// Default dry-run helper for local widget build leftovers. It only targets
// untracked hash-named widget runtime files that are not referenced by the
// current build manifest. Tracked retention files are intentionally ignored.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const RUNTIME_ROOT = resolve(ROOT, 'public', 'widget-runtime');
const MANIFEST_PATH = resolve(RUNTIME_ROOT, 'build-manifest.json');

const args = new Set(process.argv.slice(2));
const apply = args.has('--apply');
const json = args.has('--json');

function normalizePath(value) {
  return String(value).replace(/\\/g, '/').replace(/^\.\//, '');
}

function toPublicManifestPath(file) {
  const normalized = normalizePath(file);
  return normalized.startsWith('public/') ? normalized : `public/${normalized}`;
}

function isInside(parent, child) {
  const rel = relative(parent, child);
  return rel === '' || (!!rel && !rel.startsWith('..') && !isAbsolute(rel));
}

function readManifestPaths() {
  if (!existsSync(MANIFEST_PATH)) {
    throw new Error(`Missing widget runtime manifest: ${MANIFEST_PATH}`);
  }

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  const live = new Set(['public/widget-runtime/runtime.js']);

  for (const output of manifest.outputs || []) {
    live.add(toPublicManifestPath(output.file));
    for (const imp of output.imports || []) {
      if (imp.path) live.add(normalizePath(imp.path));
    }
  }

  return { manifest, live };
}

function readUntrackedRuntimeFiles() {
  const status = execFileSync('git', ['status', '--porcelain=v1', '-z', '--', 'public/widget-runtime'], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  return status
    .split('\0')
    .filter(Boolean)
    .filter((entry) => entry.startsWith('?? '))
    .map((entry) => normalizePath(entry.slice(3)));
}

function validateManifest(manifest, live) {
  const outputs = new Set(
    (manifest.outputs || [])
      .map((output) => output.file || output.path)
      .filter(Boolean)
      .map((file) => toPublicManifestPath(file)),
  );
  const missing = [];

  if (!manifest.entry) {
    missing.push('manifest.entry');
  } else if (!outputs.has(toPublicManifestPath(manifest.entry))) {
    missing.push(`manifest entry output: ${manifest.entry}`);
  }

  for (const file of live) {
    const fullPath = resolve(ROOT, file);
    if (!existsSync(fullPath)) missing.push(file);
  }

  return missing.sort();
}

function isRuntimeCandidate(file) {
  return (
    /^public\/widget-runtime\/runtime-[0-9A-Za-z]+\.js$/.test(file) ||
    /^public\/widget-runtime\/chunks\/[^/]+\.js$/.test(file)
  );
}

function deleteFile(file, currentUntracked) {
  const fullPath = resolve(ROOT, file);
  if (!isInside(RUNTIME_ROOT, fullPath)) {
    throw new Error(`Refusing to delete outside widget runtime: ${file}`);
  }
  if (!currentUntracked.has(file)) {
    throw new Error(`Refusing to delete a file that is no longer untracked: ${file}`);
  }
  rmSync(fullPath);
}

const { manifest, live } = readManifestPaths();
const manifestProblems = validateManifest(manifest, live);
const untracked = readUntrackedRuntimeFiles();
const candidates = untracked
  .filter((file) => isRuntimeCandidate(file))
  .filter((file) => !live.has(file))
  .sort();
const skippedReferenced = untracked
  .filter((file) => isRuntimeCandidate(file))
  .filter((file) => live.has(file))
  .sort();
const skippedOutOfScope = untracked.filter((file) => !isRuntimeCandidate(file)).sort();

if (apply) {
  if (manifestProblems.length > 0) {
    throw new Error(`Refusing to apply cleanup with invalid widget runtime manifest: ${manifestProblems.join(', ')}`);
  }
  const currentUntracked = new Set(readUntrackedRuntimeFiles());
  for (const file of candidates) deleteFile(file, currentUntracked);
}

const result = {
  mode: apply ? 'apply' : 'dry-run',
  manifestEntry: manifest.entry || null,
  manifestValid: manifestProblems.length === 0,
  manifestProblems,
  deletedCount: apply ? candidates.length : 0,
  deleteCandidateCount: candidates.length,
  deleteCandidates: candidates,
  skippedReferenced,
  skippedOutOfScope,
};

if (json) {
  console.log(JSON.stringify(result, null, 2));
} else {
  const action = apply ? 'deleted' : 'would delete';
  console.log(`[clean-widget-runtime-untracked] ${result.mode}: ${action} ${candidates.length} file(s)`);
  if (!result.manifestValid) {
    console.log(`[clean-widget-runtime-untracked] Manifest problems: ${manifestProblems.join(', ')}`);
  }
  for (const file of candidates) console.log(`  - ${file}`);
  if (!apply && candidates.length > 0) {
    console.log('[clean-widget-runtime-untracked] Run with --apply to delete these local untracked files.');
  }
  if (apply) {
    console.log('[clean-widget-runtime-untracked] Tracked runtime retention files were not touched.');
  }
  if (skippedReferenced.length > 0) {
    console.log(`[clean-widget-runtime-untracked] Kept ${skippedReferenced.length} manifest-referenced untracked file(s).`);
  }
  if (skippedOutOfScope.length > 0) {
    console.log(`[clean-widget-runtime-untracked] Ignored ${skippedOutOfScope.length} untracked path(s) outside the cleanup pattern.`);
  }
}
