// scripts/migrate-widget-settings-media-gallery-keys.mjs
//
// Dry-run by default:
//   node scripts/migrate-widget-settings-media-gallery-keys.mjs
//
// Apply only after explicit approval:
//   node scripts/migrate-widget-settings-media-gallery-keys.mjs --write
//
// Scope: WidgetSettings.settings JSON rows for widgetId="reviews".
// Moves legacy photo gallery keys to the canonical media gallery contract.

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PrismaClient } from '@prisma/client';

loadLocalEnv();

const prisma = new PrismaClient();

const ALIASES = {
  showPhotoGallery: 'showMediaGallery',
  showPhotoGalleryTitle: 'showMediaGalleryTitle',
  photoGalleryTitle: 'mediaGalleryTitle',
  photoTitleColor: 'mediaGalleryTitleColor',
  photoArrowBgColor: 'mediaGalleryArrowBgColor',
  photoArrowTextColor: 'mediaGalleryArrowTextColor',
};

function parseEnvValue(rawValue) {
  const value = rawValue.trim();
  const quote = value[0];

  if ((quote === '"' || quote === "'") && value.endsWith(quote)) {
    return value.slice(1, -1);
  }

  return value;
}

function loadLocalEnv() {
  for (const filename of ['.env.local', '.env']) {
    const envPath = resolve(process.cwd(), filename);
    if (!existsSync(envPath)) continue;

    const content = readFileSync(envPath, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex <= 0) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      if (!key || Object.prototype.hasOwnProperty.call(process.env, key)) continue;

      process.env[key] = parseEnvValue(trimmed.slice(separatorIndex + 1));
    }
  }
}

function parseArgs(argv) {
  const args = {
    write: false,
    storeId: '',
  };

  for (const arg of argv) {
    if (arg === '--write') {
      args.write = true;
      continue;
    }
    if (arg.startsWith('--storeId=')) {
      args.storeId = arg.slice('--storeId='.length).trim();
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function stableJson(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
}

function normalizeSettings(settings) {
  const input = settings && typeof settings === 'object' && !Array.isArray(settings) ? settings : {};
  const normalized = { ...input };
  const moved = [];
  const removed = [];
  const conflicts = [];

  for (const [legacyKey, canonicalKey] of Object.entries(ALIASES)) {
    if (!Object.prototype.hasOwnProperty.call(normalized, legacyKey)) continue;

    if (!Object.prototype.hasOwnProperty.call(normalized, canonicalKey)) {
      normalized[canonicalKey] = normalized[legacyKey];
      moved.push(`${legacyKey}->${canonicalKey}`);
    } else {
      conflicts.push(`${legacyKey}->${canonicalKey}`);
    }

    delete normalized[legacyKey];
    removed.push(legacyKey);
  }

  return {
    normalized,
    changed: stableJson(input) !== stableJson(normalized),
    moved,
    removed,
    conflicts,
  };
}

async function run() {
  const args = parseArgs(process.argv.slice(2));
  const where = {
    widgetId: 'reviews',
    ...(args.storeId ? { storeId: args.storeId } : {}),
  };

  const rows = await prisma.widgetSettings.findMany({
    where,
    select: {
      id: true,
      storeId: true,
      widgetId: true,
      settings: true,
    },
    orderBy: { storeId: 'asc' },
  });

  let changed = 0;
  let written = 0;
  const details = [];

  for (const row of rows) {
    const result = normalizeSettings(row.settings);
    if (!result.changed) continue;

    changed++;
    details.push({
      id: row.id,
      storeId: row.storeId,
      moved: result.moved,
      removed: result.removed,
      conflicts: result.conflicts,
    });

    if (args.write) {
      await prisma.widgetSettings.update({
        where: { id: row.id },
        data: { settings: result.normalized },
      });
      written++;
    }
  }

  console.log(JSON.stringify({
    mode: args.write ? 'write' : 'dry-run',
    scanned: rows.length,
    changed,
    written,
    details,
  }, null, 2));
}

run()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
