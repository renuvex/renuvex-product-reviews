// scripts/build-widget.mjs - widget build script
// Usage: node scripts/build-widget.mjs [--theme=default|new-theme] [--watch]
//
// Phase 2 output model:
// - public/widget.js remains the classic ikas StorefrontJSScript entry.
// - public/widget-runtime/runtime.js is a short-cache compatibility shim.
// - public/widget-runtime/runtime-*.js and chunks/* are immutable ESM assets.

import * as esbuild from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync, readdirSync, statSync, rmSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const args = process.argv.slice(2);
const watchMode = args.includes('--watch');
const themeArg = args.find(a => a.startsWith('--theme='));
const theme = themeArg ? themeArg.split('=')[1] : 'default';
const buildTime = new Date().toISOString();

const validThemes = ['default', 'new-theme'];
if (!validThemes.includes(theme)) {
  console.error(`[build-widget] Unknown theme: "${theme}". Valid themes: ${validThemes.join(', ')}`);
  process.exit(1);
}

const classicOutfile = theme === 'default'
  ? resolve(ROOT, 'public/widget.js')
  : resolve(ROOT, `public/widget-${theme}.js`);

const runtimeOutdir = theme === 'default'
  ? resolve(ROOT, 'public/widget-runtime')
  : resolve(ROOT, `public/widget-runtime-${theme}`);
const runtimePublicPath = theme === 'default'
  ? 'widget-runtime/runtime.js'
  : `widget-runtime-${theme}/runtime.js`;
const runtimeOutdirPublicPrefix = theme === 'default'
  ? 'public/widget-runtime'
  : `public/widget-runtime-${theme}`;

const classicEntryPoint = resolve(ROOT, 'src/widget/classic-loader.js');
const runtimeEntryPoint = resolve(ROOT, 'src/widget/index.js');

// Theme aliases are kept for the existing build contract. Do not expand this
// without a theme-adapter plan; Phase 2 keeps one ikas script and one runtime.
const themeAlias = {
  'themes/ozy/styles.js': resolve(ROOT, `src/widget/themes/${theme}/styles.js`),
};

function readEnvFileValue(filePath, key) {
  try {
    var lines = readFileSync(filePath, 'utf8').split(/\r?\n/);
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line || line[0] === '#') continue;
      var eqIdx = line.indexOf('=');
      if (eqIdx === -1) continue;
      var envKey = line.slice(0, eqIdx).trim();
      if (envKey !== key) continue;
      var value = line.slice(eqIdx + 1).trim();
      if (
        (value[0] === '"' && value[value.length - 1] === '"') ||
        (value[0] === "'" && value[value.length - 1] === "'")
      ) {
        value = value.slice(1, -1);
      }
      return value;
    }
  } catch (_) {}
  return '';
}

function getEnvValue(key) {
  return process.env[key] ||
    readEnvFileValue(resolve(ROOT, '.env.local'), key) ||
    readEnvFileValue(resolve(ROOT, '.env'), key) ||
    '';
}

function normalizePublicCloudName(value) {
  const cloudName = typeof value === 'string' ? value.trim() : '';
  return /^[A-Za-z0-9_-]+$/.test(cloudName) ? cloudName : '';
}

const defaultReviewImageCloudName = normalizePublicCloudName(
  getEnvValue('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME') || getEnvValue('CLOUDINARY_CLOUD_NAME'),
);

function createDefine(runtimePath) {
  return {
    __IKR_DEFAULT_CLOUDINARY_CLOUD_NAME__: JSON.stringify(defaultReviewImageCloudName),
    __IKR_RUNTIME_PATH__: JSON.stringify(runtimePath),
  };
}

function createSharedOptions(runtimePath) {
  return {
    bundle: true,
    platform: 'browser',
    target: ['es2017'],
    minify: !watchMode,
    sourcemap: false,
    logLevel: 'info',
    alias: themeArg ? themeAlias : {},
    define: createDefine(runtimePath),
  };
}

function createClassicBuildOptions(runtimePath) {
  return {
    ...createSharedOptions(runtimePath),
    entryPoints: [classicEntryPoint],
    format: 'iife',
    outfile: classicOutfile,
    banner: { js: `/* ikas Reviews Widget classic loader - built ${buildTime} | theme: ${theme} */` },
    footer: { js: '' },
    globalName: undefined,
  };
}

function createRuntimeBuildOptions(hashedEntry) {
  return {
    ...createSharedOptions(runtimePublicPath),
    entryPoints: [{ in: runtimeEntryPoint, out: 'runtime' }],
    format: 'esm',
    splitting: true,
    outdir: runtimeOutdir,
    entryNames: hashedEntry ? '[name]-[hash]' : '[name]',
    chunkNames: 'chunks/[name]-[hash]',
    metafile: true,
    banner: { js: `/* ikas Reviews Widget ESM runtime | theme: ${theme} */` },
  };
}

function outputToPublicPath(output) {
  return output.replace(/\\/g, '/').replace(/^public\//, '');
}

function createManifest(metafile, runtimeEntry) {
  return {
    builtAt: buildTime,
    theme,
    entry: runtimeEntry,
    stableEntry: runtimePublicPath,
    outputs: Object.keys(metafile.outputs)
      .filter((output) => output.replace(/\\/g, '/').indexOf(runtimeOutdirPublicPrefix) !== -1)
      .map((output) => {
        var normalized = output.replace(/\\/g, '/');
        var item = metafile.outputs[output];
        return {
          file: normalized.replace(/^public\//, ''),
          bytes: item.bytes,
          entryPoint: item.entryPoint || null,
          imports: (item.imports || []).map((imp) => ({
            path: imp.path,
            kind: imp.kind || null,
          })),
        };
      }),
  };
}

function findRuntimeEntryOutput(metafile) {
  return Object.keys(metafile.outputs).find((output) => metafile.outputs[output].entryPoint === 'src/widget/index.js');
}

function writeStableRuntimeShim(runtimeEntry) {
  var entryFile = runtimeEntry.split('/').pop();
  writeFileSync(
    resolve(runtimeOutdir, 'runtime.js'),
    `/* ikas Reviews Widget stable runtime shim - built ${buildTime} | theme: ${theme} */\nimport './${entryFile}';\n`,
  );
}

// Bounded retention for old content-hashed runtime/chunk files. They are
// immutable, so a browser/CDN holding an older widget.js loader may still
// import an old hash for a short window after a deploy — deleting it
// immediately would 404 the runtime. widget.js is served
// `max-age=300, must-revalidate`, so that window is minutes; old unreferenced
// files are kept RUNTIME_RETENTION_DAYS (a large margin) then pruned so
// public/widget-runtime/ does not grow without bound.
//
// Files emitted by the current build are kept regardless of age. The age
// signal is file mtime: a git checkout/clone can only reset mtime to "now"
// (never older), so a misread mtime can only delay pruning, never delete a
// still-needed file. A fresh clone therefore just postpones cleanup by up to
// the retention window — it is never unsafe.
const RUNTIME_RETENTION_DAYS = 7;

function pruneOldRuntimeFiles(manifest) {
  try {
    const cutoff = Date.now() - RUNTIME_RETENTION_DAYS * 24 * 60 * 60 * 1000;
    const live = new Set(
      (manifest.outputs || []).map((o) => String(o.file).replace(/\\/g, '/').split('/').pop()),
    );

    const candidates = [];
    for (const name of readdirSync(runtimeOutdir)) {
      if (/^runtime-[0-9A-Za-z]+\.js$/.test(name)) candidates.push(name);
    }
    try {
      for (const name of readdirSync(resolve(runtimeOutdir, 'chunks'))) {
        if (name.endsWith('.js')) candidates.push('chunks/' + name);
      }
    } catch (_) { /* no chunks directory yet */ }

    let removed = 0;
    for (const rel of candidates) {
      if (live.has(rel.split('/').pop())) continue;
      const full = resolve(runtimeOutdir, rel);
      try {
        if (statSync(full).mtimeMs < cutoff) {
          rmSync(full);
          removed += 1;
        }
      } catch (_) { /* skip a single file we cannot stat/remove */ }
    }
    if (removed > 0) {
      console.log(`[build-widget] Pruned ${removed} unreferenced runtime file(s) older than ${RUNTIME_RETENTION_DAYS} days`);
    }
  } catch (err) {
    // Pruning is housekeeping — it must never fail the build.
    console.warn('[build-widget] WARN runtime prune skipped:', err && err.message);
  }
}

if (watchMode) {
  mkdirSync(runtimeOutdir, { recursive: true });
  const classicCtx = await esbuild.context(createClassicBuildOptions(runtimePublicPath));
  const runtimeCtx = await esbuild.context(createRuntimeBuildOptions(false));
  await Promise.all([classicCtx.watch(), runtimeCtx.watch()]);
  console.log(`[build-widget] Watching src/widget/ -> ${classicOutfile} + ${runtimeOutdir}`);
} else {
  // Old hashed runtime/chunk files are left in place for cached widget.js
  // loaders that may still reference them during and after a deploy; files
  // past the retention window are pruned by pruneOldRuntimeFiles below.
  mkdirSync(runtimeOutdir, { recursive: true });

  const runtimeResult = await esbuild.build(createRuntimeBuildOptions(true));
  const runtimeEntryOutput = findRuntimeEntryOutput(runtimeResult.metafile);
  if (!runtimeEntryOutput) {
    console.error('[build-widget] ERROR Could not find ESM runtime entry output.');
    process.exit(1);
  }
  const runtimeEntryPublicPath = outputToPublicPath(runtimeEntryOutput);
  writeStableRuntimeShim(runtimeEntryPublicPath);

  const classicResult = await esbuild.build(createClassicBuildOptions(runtimeEntryPublicPath));

  if (classicResult.errors.length || runtimeResult.errors.length) {
    console.error('[build-widget] Build failed:', classicResult.errors.concat(runtimeResult.errors));
    process.exit(1);
  }

  const manifest = createManifest(runtimeResult.metafile, runtimeEntryPublicPath);
  writeFileSync(
    resolve(runtimeOutdir, 'build-manifest.json'),
    JSON.stringify(manifest, null, 2),
  );
  pruneOldRuntimeFiles(manifest);

  const { execSync } = await import('child_process');
  try {
    execSync(`node --check "${classicOutfile}"`, { stdio: 'pipe' });
    console.log(`[build-widget] OK Syntax -> ${classicOutfile}`);
    console.log(`[build-widget] OK ESM runtime -> ${resolve(runtimeOutdir, 'runtime.js')}`);
  } catch (e) {
    console.error('[build-widget] ERROR Syntax error in classic output:', e.stderr?.toString());
    process.exit(1);
  }
}
