import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const WORKER_ASSETS_DIR = resolve(ROOT, '.tmp/widget-worker-assets');
const AWS_ASSETS_DIR = resolve(ROOT, '.tmp/widget-aws-canary-assets');
const UPLOAD_PLAN_PATH = resolve(ROOT, '.tmp/widget-aws-canary-upload-plan.json');

const STABLE_CACHE_CONTROL = 'public, max-age=0, must-revalidate';
const IMMUTABLE_CACHE_CONTROL = 'public, max-age=31536000, immutable';
const NO_STORE_CACHE_CONTROL = 'no-store';

function assertInside(parent, child, label) {
  const rel = relative(parent, child);
  if (rel === '' || (!rel.startsWith('..') && !isAbsolute(rel))) return;
  throw new Error(`${label} escaped expected directory: ${child}`);
}

function runPrepareWorkerAssets() {
  const result = spawnSync(process.execPath, ['scripts/prepare-widget-worker-assets.mjs'], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: 'pipe',
  });
  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout || 'Failed to prepare worker widget assets.\n');
    process.exit(result.status || 1);
  }
  if (result.stdout) process.stdout.write(result.stdout);
}

function copyDirectory(srcDir, destDir) {
  assertInside(ROOT, srcDir, 'source directory');
  assertInside(ROOT, destDir, 'destination directory');
  mkdirSync(destDir, { recursive: true });

  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    const src = join(srcDir, entry.name);
    const dest = join(destDir, entry.name);
    assertInside(srcDir, src, 'source');
    assertInside(destDir, dest, 'destination');

    if (entry.isDirectory()) {
      copyDirectory(src, dest);
    } else if (entry.isFile()) {
      mkdirSync(dirname(dest), { recursive: true });
      copyFileSync(src, dest);
    }
  }
}

function walkFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(full));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

function toKey(filePath) {
  const rel = relative(AWS_ASSETS_DIR, filePath).replace(/\\/g, '/');
  if (!rel || rel.startsWith('../')) throw new Error(`Invalid asset path: ${filePath}`);
  return rel;
}

function contentTypeForKey(key) {
  if (key.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (key.endsWith('.json')) return 'application/json; charset=utf-8';
  if (key === '__health') return 'application/json; charset=utf-8';
  const ext = extname(key).toLowerCase();
  if (ext === '.map') return 'application/json; charset=utf-8';
  return 'application/octet-stream';
}

function cacheControlForKey(key) {
  if (key === '__health') return NO_STORE_CACHE_CONTROL;
  if (key === 'widget.js' || key === 'widget-runtime/runtime.js' || key === 'widget-runtime/build-manifest.json') {
    return STABLE_CACHE_CONTROL;
  }
  if (/^widget-runtime\/runtime-[0-9A-Za-z]+\.js$/.test(key) || /^widget-runtime\/chunks\/[^/]+\.js$/.test(key)) {
    return IMMUTABLE_CACHE_CONTROL;
  }
  return STABLE_CACHE_CONTROL;
}

function makeUploadPlan() {
  return walkFiles(AWS_ASSETS_DIR)
    .map((filePath) => {
      const key = toKey(filePath);
      return {
        key,
        file: relative(ROOT, filePath).replace(/\\/g, '/'),
        bytes: statSync(filePath).size,
        contentType: contentTypeForKey(key),
        cacheControl: cacheControlForKey(key),
      };
    })
    .sort((a, b) => a.key.localeCompare(b.key));
}

runPrepareWorkerAssets();

if (!existsSync(WORKER_ASSETS_DIR)) {
  throw new Error(`Worker asset directory was not created: ${relative(ROOT, WORKER_ASSETS_DIR)}`);
}

assertInside(resolve(ROOT, '.tmp'), AWS_ASSETS_DIR, 'AWS canary asset output');
rmSync(AWS_ASSETS_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
copyDirectory(WORKER_ASSETS_DIR, AWS_ASSETS_DIR);

writeFileSync(
  join(AWS_ASSETS_DIR, '__health'),
  `${JSON.stringify({ ok: true, service: 'renuvex-widget-aws-canary-assets' })}\n`,
  'utf8',
);

const plan = {
  generatedAt: new Date().toISOString(),
  outputDir: relative(ROOT, AWS_ASSETS_DIR).replace(/\\/g, '/'),
  files: makeUploadPlan(),
};

writeFileSync(UPLOAD_PLAN_PATH, `${JSON.stringify(plan, null, 2)}\n`, 'utf8');
const immutable = plan.files.filter((file) => file.cacheControl === IMMUTABLE_CACHE_CONTROL).length;
const stable = plan.files.filter((file) => file.cacheControl === STABLE_CACHE_CONTROL).length;
console.log(`[aws-widget-assets] files=${plan.files.length} stable=${stable} immutable=${immutable} output=${plan.outputDir}`);
console.log(`[aws-widget-assets] uploadPlan=${relative(ROOT, UPLOAD_PLAN_PATH).replace(/\\/g, '/')}`);
