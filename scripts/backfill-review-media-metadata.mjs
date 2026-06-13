// Backfill ReviewMedia metadata from Cloudinary Admin API.
// Usage:
//   pnpm reviews:media:metadata:backfill --cloudName=<cloudinaryCloudName>
//   pnpm reviews:media:metadata:backfill --cloudName=<cloudinaryCloudName> --apply
//   pnpm reviews:media:metadata:backfill --storeId=<merchantId> --limit=500 --concurrency=3

import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEFAULT_BATCH_SIZE = 100;
const DEFAULT_CONCURRENCY = 3;
const ALLOWED_IMAGE_FORMATS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

function loadEnvFile(fileName) {
  const fullPath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(fullPath)) return;
  for (const line of fs.readFileSync(fullPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

function argValue(name) {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length)?.trim() || null;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function positiveInt(value, fallback, max = 1000) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, max) : fallback;
}

function configuredCloudName(explicitCloudName) {
  const cloudName = (explicitCloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || '').trim();
  if (cloudName === 'your_cloud_name' || cloudName === 'your-cloud-name') return null;
  return /^[A-Za-z0-9_-]+$/.test(cloudName) ? cloudName : null;
}

function normalizeStoreId(value) {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{1,128}$/.test(value.trim()) ? value.trim() : null;
}

function mimeTypeForFormat(format) {
  if (format === 'jpg' || format === 'jpeg') return 'image/jpeg';
  if (format === 'png') return 'image/png';
  if (format === 'webp') return 'image/webp';
  if (format === 'gif') return 'image/gif';
  if (format === 'avif') return 'image/avif';
  return null;
}

function positiveMetadataInt(value) {
  return Number.isInteger(value) && value > 0 && value <= 2147483647 ? value : null;
}

function metadataFromResource(resource) {
  const format = typeof resource.format === 'string' ? resource.format.toLowerCase() : null;
  const resourceType = typeof resource.resource_type === 'string' ? resource.resource_type.toLowerCase() : 'image';
  const width = positiveMetadataInt(resource.width);
  const height = positiveMetadataInt(resource.height);
  const bytes = positiveMetadataInt(resource.bytes);
  const complete = resourceType === 'image' && format && ALLOWED_IMAGE_FORMATS.has(format) && width && height && bytes;
  return {
    assetId: typeof resource.asset_id === 'string' ? resource.asset_id.slice(0, 128) : null,
    version: resource.version !== undefined && resource.version !== null ? String(resource.version).slice(0, 64) : null,
    resourceType: resourceType === 'image' ? 'image' : resourceType.slice(0, 32),
    format: format && ALLOWED_IMAGE_FORMATS.has(format) ? format : null,
    mimeType: mimeTypeForFormat(format),
    width,
    height,
    bytes,
    metadataSource: 'admin_api',
    metadataStatus: complete ? 'complete' : 'partial',
    metadataFetchedAt: new Date(),
  };
}

function metadataWhere(storeId, productId) {
  return {
    provider: 'cloudinary',
    resourceType: 'image',
    ...(storeId ? { storeId } : {}),
    ...(productId ? { productId } : {}),
    OR: [
      { metadataStatus: { not: 'complete' } },
      { width: null },
      { height: null },
      { format: null },
      { bytes: null },
    ],
  };
}

async function mapConcurrent(items, concurrency, mapper) {
  const results = [];
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const current = items[index++];
      results.push(await mapper(current));
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

async function fetchCloudinaryMetadata(publicId) {
  try {
    const resource = await cloudinary.api.resource(publicId, { resource_type: 'image' });
    if (resource.public_id !== publicId) {
      return { status: 'public_id_mismatch', data: null };
    }
    return { status: 'ok', data: metadataFromResource(resource) };
  } catch (error) {
    const httpCode = error?.http_code || error?.error?.http_code;
    if (httpCode === 404) return { status: 'missing_asset', data: null };
    return { status: 'error', error: error instanceof Error ? error.message : String(error), data: null };
  }
}

async function run() {
  const storeId = normalizeStoreId(argValue('storeId'));
  const productId = argValue('productId');
  if (argValue('storeId') && !storeId) throw new Error('--storeId is invalid');
  if (productId && !storeId) throw new Error('--productId requires --storeId');

  const cloudName = configuredCloudName(argValue('cloudName'));
  if (!cloudName) throw new Error('A real Cloudinary cloud name is required.');
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiKey || !apiSecret || apiKey.includes('YOUR_') || apiSecret.includes('YOUR_')) {
    throw new Error('Real CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET values are required.');
  }

  const apply = hasFlag('apply');
  const limit = positiveInt(argValue('limit'), Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER);
  const batchSize = positiveInt(argValue('batchSize'), DEFAULT_BATCH_SIZE, 500);
  const concurrency = positiveInt(argValue('concurrency'), DEFAULT_CONCURRENCY, 5);
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

  let processed = 0;
  let completed = 0;
  let partial = 0;
  let missing = 0;
  let errors = 0;
  let cursorPublicId = null;

  while (processed < limit) {
    const take = Math.min(batchSize, limit - processed);
    const rows = await prisma.reviewMedia.findMany({
      where: metadataWhere(storeId, productId),
      orderBy: { publicId: 'asc' },
      take,
      ...(cursorPublicId ? { cursor: { publicId: cursorPublicId }, skip: 1 } : {}),
      select: { publicId: true },
    });
    if (rows.length === 0) break;

    const results = await mapConcurrent(rows, concurrency, async (row) => {
      const result = await fetchCloudinaryMetadata(row.publicId);
      if (!apply) return { row, result };
      if (result.status === 'ok' && result.data) {
        await prisma.reviewMedia.update({ where: { publicId: row.publicId }, data: result.data });
      } else if (result.status === 'missing_asset') {
        await prisma.reviewMedia.update({
          where: { publicId: row.publicId },
          data: { metadataSource: 'admin_api', metadataStatus: 'missing_asset', metadataFetchedAt: new Date() },
        });
      }
      return { row, result };
    });

    for (const { result } of results) {
      processed += 1;
      if (result.status === 'ok' && result.data?.metadataStatus === 'complete') completed += 1;
      else if (result.status === 'ok') partial += 1;
      else if (result.status === 'missing_asset') missing += 1;
      else errors += 1;
    }
    cursorPublicId = rows[rows.length - 1].publicId;
    console.log(`[review-media-metadata] processed=${processed} complete=${completed} partial=${partial} missing=${missing} errors=${errors} apply=${apply}`);
    if (rows.length < take) break;
  }

  console.log(JSON.stringify({
    apply,
    processed,
    completed,
    partial,
    missing,
    errors,
  }, null, 2));
}

run()
  .catch((error) => {
    console.error('[review-media-metadata] Backfill failed:', error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
