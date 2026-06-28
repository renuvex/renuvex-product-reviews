import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PUBLIC_DIR = resolve(ROOT, 'public');
const TMP_DIR = resolve(ROOT, '.tmp');
const OUT_DIR = resolve(ROOT, '.tmp/widget-worker-assets');
const WRANGLER_ENV_FILE = resolve(ROOT, '.tmp/widget-worker.env');
const MANIFEST_PATH = resolve(PUBLIC_DIR, 'widget-runtime/build-manifest.json');

function normalizeRelativePath(value) {
  return String(value || '').replace(/\\/g, '/').replace(/^\/+/, '');
}

function assertInside(parent, child, label) {
  const rel = relative(parent, child);
  if (rel === '' || (!rel.startsWith('..') && !isAbsolute(rel))) {
    return;
  }
  throw new Error(`${label} escaped expected directory: ${child}`);
}

function readManifestOutputFiles() {
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  const outputs = Array.isArray(manifest.outputs) ? manifest.outputs : [];
  return outputs.map((item) => normalizeRelativePath(item.file)).filter(Boolean);
}

function trackedWidgetFiles() {
  const raw = execFileSync('git', ['ls-files', '-z', '--', 'public/widget.js', 'public/widget-runtime'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  return raw
    .split('\0')
    .map(normalizeRelativePath)
    .filter((file) => {
      if (!file) return false;
      if (file === 'public/widget.js') return true;
      if (file === 'public/widget-runtime/build-manifest.json') return true;
      return /^public\/widget-runtime\/(?:runtime-[0-9A-Za-z]+\.js|runtime\.js|chunks\/[^/]+\.js)$/.test(file);
    });
}

function sourcePathForPublicFile(publicRelativePath) {
  const src = resolve(PUBLIC_DIR, publicRelativePath);
  assertInside(PUBLIC_DIR, src, 'source');
  return src;
}

function destinationPathForPublicFile(publicRelativePath) {
  const dest = resolve(OUT_DIR, publicRelativePath);
  assertInside(OUT_DIR, dest, 'destination');
  return dest;
}

function copyPublicFile(publicRelativePath, required) {
  const src = sourcePathForPublicFile(publicRelativePath);
  if (!existsSync(src)) {
    if (required) throw new Error(`Missing required widget asset: public/${publicRelativePath}`);
    return false;
  }

  const dest = destinationPathForPublicFile(publicRelativePath);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  return true;
}

const requiredFiles = new Set([
  'widget.js',
  'widget-runtime/runtime.js',
  'widget-runtime/build-manifest.json',
  ...readManifestOutputFiles(),
]);

const deployFiles = new Set(requiredFiles);
for (const tracked of trackedWidgetFiles()) {
  deployFiles.add(tracked.replace(/^public\//, ''));
}

mkdirSync(TMP_DIR, { recursive: true });
assertInside(TMP_DIR, OUT_DIR, 'worker asset output');
rmSync(OUT_DIR, { recursive: true, force: true });
writeFileSync(WRANGLER_ENV_FILE, '# Intentionally empty. Keeps wrangler widget types/deploy isolated from app .env files.\n');

let copied = 0;
for (const file of Array.from(deployFiles).sort()) {
  const isRequired = requiredFiles.has(file);
  if (copyPublicFile(file, isRequired)) copied += 1;
}

console.log(`[worker-assets] copied=${copied} required=${requiredFiles.size} output=${relative(ROOT, OUT_DIR).replace(/\\/g, '/')}`);
