// scripts/build-widget.mjs - widget build script
// Usage: node scripts/build-widget.mjs [--theme=default|new-theme] [--watch]
//
// Phase 2 output model:
// - public/widget.js remains the classic ikas StorefrontJSScript entry.
// - public/widget-runtime/runtime.js is a short-cache compatibility shim.
// - public/widget-runtime/runtime-*.js and chunks/* are immutable ESM assets.

import * as esbuild from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
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

if (watchMode) {
  mkdirSync(runtimeOutdir, { recursive: true });
  const classicCtx = await esbuild.context(createClassicBuildOptions(runtimePublicPath));
  const runtimeCtx = await esbuild.context(createRuntimeBuildOptions(false));
  await Promise.all([classicCtx.watch(), runtimeCtx.watch()]);
  console.log(`[build-widget] Watching src/widget/ -> ${classicOutfile} + ${runtimeOutdir}`);
} else {
  // Keep old hashed runtime/chunk files available for cached widget.js loaders
  // that may still reference them during and after a deploy.
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

  writeFileSync(
    resolve(runtimeOutdir, 'build-manifest.json'),
    JSON.stringify(createManifest(runtimeResult.metafile, runtimeEntryPublicPath), null, 2),
  );

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
