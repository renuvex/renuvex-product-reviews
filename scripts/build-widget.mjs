// scripts/build-widget.mjs — widget.js build script
// Kullanım: node scripts/build-widget.mjs [--theme=default|new-theme] [--watch]

import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const args = process.argv.slice(2);
const watchMode = args.includes('--watch');
const themeArg = args.find(a => a.startsWith('--theme='));
const theme = themeArg ? themeArg.split('=')[1] : 'default';

const validThemes = ['default', 'new-theme'];
if (!validThemes.includes(theme)) {
  console.error(`[build-widget] Unknown theme: "${theme}". Valid themes: ${validThemes.join(', ')}`);
  process.exit(1);
}

const outfile = theme === 'default'
  ? resolve(ROOT, 'public/widget.js')
  : resolve(ROOT, `public/widget-${theme}.js`);

const entryPoint = resolve(ROOT, 'src/widget/index.js');

// Tema selector'ı doğru tema klasöründen al
const themeAlias = {
  'themes/ozy/listing-selector.js': resolve(ROOT, `src/widget/themes/${theme}/listing-selector.js`),
  'themes/ozy/styles.js': resolve(ROOT, `src/widget/themes/${theme}/styles.js`),
};

const banner = `/* ikas Reviews Widget — built ${new Date().toISOString()} | theme: ${theme} */\n;(function(){\'use strict\';`;
const footer = `})();`;

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

const buildOptions = {
  entryPoints: [entryPoint],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2017'],
  outfile,
  banner: { js: `/* ikas Reviews Widget — built ${new Date().toISOString()} | theme: ${theme} */` },
  footer: { js: '' },
  // IIFE wrapper — mevcut widget.js ile aynı ;(function(){ 'use strict'; ... })(); yapısı
  globalName: undefined,
  minify: !watchMode, // watch modunda okunabilir, prod build'de minified
  sourcemap: false,
  logLevel: 'info',
  alias: themeArg ? themeAlias : {},
  define: {
    __IKR_DEFAULT_CLOUDINARY_CLOUD_NAME__: JSON.stringify(defaultReviewImageCloudName),
  },
};

if (watchMode) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log(`[build-widget] Watching src/widget/ → ${outfile}`);
} else {
  const result = await esbuild.build(buildOptions);
  if (result.errors.length) {
    console.error('[build-widget] Build failed:', result.errors);
    process.exit(1);
  }

  // Build sonrası syntax kontrolü
  const { execSync } = await import('child_process');
  try {
    execSync(`node --check "${outfile}"`, { stdio: 'pipe' });
    console.log(`[build-widget] ✓ Syntax OK → ${outfile}`);
  } catch (e) {
    console.error('[build-widget] ✗ Syntax error in output:', e.stderr?.toString());
    process.exit(1);
  }
}
