// Durable, server-side backfill of ReviewMedia metadata from the Cloudinary
// Admin API. New uploads already self-populate metadata via the signed
// upload-response path (see review-media-metadata.ts). This module heals the
// remaining rows — legacy/reconciled rows and any upload-response row that
// could not be completed — as a background reconciliation pass driven by the
// daily-maintenance cron, so no manual local script run is required.
//
// Mirrors scripts/backfill-review-media-metadata.mjs, but importable by the
// Next.js runtime and dependency-injected for unit testing.

import { v2 as cloudinary } from 'cloudinary';
import type { Prisma, PrismaClient } from '@prisma/client';
import { getConfiguredCloudinaryCloudName } from '@/lib/review-images';
import { mimeTypeForReviewImageFormat, type ReviewMediaMetadataWrite } from '@/lib/review-media-metadata';

const ALLOWED_IMAGE_FORMATS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);
const ALLOWED_RESOURCE_TYPES = new Set(['image']);
const DEFAULT_CRON_LIMIT = 200;
const DEFAULT_BATCH_SIZE = 100;
const DEFAULT_CONCURRENCY = 3;

type CloudinaryResourceLike = {
  public_id?: unknown;
  asset_id?: unknown;
  version?: unknown;
  resource_type?: unknown;
  format?: unknown;
  width?: unknown;
  height?: unknown;
  bytes?: unknown;
};

export type CloudinaryResourceResult =
  | { status: 'ok'; data: ReviewMediaMetadataWrite }
  | { status: 'missing_asset' }
  | { status: 'public_id_mismatch' }
  | { status: 'error'; error: string };

export type ReviewMediaBackfillDeps = {
  // Returns the next batch of rows that still need metadata, ordered by publicId.
  findPending: (take: number, cursorPublicId: string | null) => Promise<Array<{ publicId: string }>>;
  // Persists resolved metadata for one row. A no-op implementation makes the run a dry-run.
  applyMetadata: (publicId: string, data: ReviewMediaMetadataWrite) => Promise<void>;
  // Fetches authoritative metadata for one asset (Cloudinary Admin API by default).
  fetchResource: (publicId: string) => Promise<CloudinaryResourceResult>;
};

export type ReviewMediaBackfillOptions = {
  limit?: number;
  batchSize?: number;
  concurrency?: number;
};

export type ReviewMediaBackfillResult = {
  processed: number;
  completed: number;
  partial: number;
  missing: number;
  errors: number;
};

function clampInt(value: number | undefined, fallback: number, min: number, max: number): number {
  if (value === undefined || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

function positiveMetadataInt(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isInteger(value) && value > 0 && value <= 2147483647 ? value : undefined;
}

function shortLower(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().toLowerCase();
  return normalized && normalized.length <= maxLength ? normalized : undefined;
}

// Pure normalizer — converts a Cloudinary Admin API resource into a metadata
// write, applying the same allowlists and integer bounds as the upload-response
// path. metadataSource is always 'admin_api' (authoritative).
export function metadataFromCloudinaryResource(resource: CloudinaryResourceLike): ReviewMediaMetadataWrite {
  const resourceTypeRaw = shortLower(resource.resource_type, 32) ?? 'image';
  const isImage = ALLOWED_RESOURCE_TYPES.has(resourceTypeRaw);
  const formatRaw = shortLower(resource.format, 32);
  const format = formatRaw && ALLOWED_IMAGE_FORMATS.has(formatRaw) ? formatRaw : undefined;
  const width = positiveMetadataInt(resource.width);
  const height = positiveMetadataInt(resource.height);
  const bytes = positiveMetadataInt(resource.bytes);
  const complete = isImage && !!format && !!width && !!height && !!bytes;

  return {
    assetId: typeof resource.asset_id === 'string' ? resource.asset_id.slice(0, 128) : undefined,
    version:
      resource.version !== undefined && resource.version !== null ? String(resource.version).slice(0, 64) : undefined,
    resourceType: isImage ? 'image' : resourceTypeRaw.slice(0, 32),
    format,
    mimeType: mimeTypeForReviewImageFormat(format),
    width,
    height,
    bytes,
    metadataSource: 'admin_api',
    metadataStatus: complete ? 'complete' : 'partial',
    metadataFetchedAt: new Date(),
  };
}

// Rows worth retrying: anything not yet 'complete' and not terminally
// 'missing_asset'. Unlike the one-off script, the recurring cron treats
// missing_asset as terminal so absent assets are not re-fetched forever.
export function reviewMediaMetadataBackfillWhere(storeId?: string): Prisma.ReviewMediaWhereInput {
  return {
    provider: 'cloudinary',
    resourceType: 'image',
    ...(storeId ? { storeId } : {}),
    metadataStatus: { notIn: ['complete', 'missing_asset'] },
  };
}

async function mapConcurrent<T, R>(items: T[], concurrency: number, mapper: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];
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

function extractHttpCode(error: unknown): number | undefined {
  if (error && typeof error === 'object') {
    const candidate = error as { http_code?: unknown; error?: { http_code?: unknown } };
    if (typeof candidate.http_code === 'number') return candidate.http_code;
    if (candidate.error && typeof candidate.error === 'object' && typeof candidate.error.http_code === 'number') {
      return candidate.error.http_code;
    }
  }
  return undefined;
}

// Core loop — dependency-injected so it is unit-testable without Cloudinary or
// a database. Only writes for resolvable results; transport/auth errors (e.g. a
// stale api_key returning 401) are counted but never corrupt a row.
export async function backfillReviewMediaMetadata(
  deps: ReviewMediaBackfillDeps,
  options: ReviewMediaBackfillOptions = {},
): Promise<ReviewMediaBackfillResult> {
  const limit = options.limit !== undefined ? clampInt(options.limit, DEFAULT_CRON_LIMIT, 1, 100000) : Number.POSITIVE_INFINITY;
  const batchSize = clampInt(options.batchSize, DEFAULT_BATCH_SIZE, 1, 500);
  const concurrency = clampInt(options.concurrency, DEFAULT_CONCURRENCY, 1, 5);

  let processed = 0;
  let completed = 0;
  let partial = 0;
  let missing = 0;
  let errors = 0;
  let cursorPublicId: string | null = null;

  while (processed < limit) {
    const take = Math.min(batchSize, limit - processed);
    const rows = await deps.findPending(take, cursorPublicId);
    if (rows.length === 0) break;

    const results = await mapConcurrent(rows, concurrency, async (row) => {
      const result = await deps.fetchResource(row.publicId);
      if (result.status === 'ok') {
        await deps.applyMetadata(row.publicId, result.data);
      } else if (result.status === 'missing_asset') {
        await deps.applyMetadata(row.publicId, {
          metadataSource: 'admin_api',
          metadataStatus: 'missing_asset',
          metadataFetchedAt: new Date(),
        });
      }
      return result;
    });

    for (const result of results) {
      processed += 1;
      if (result.status === 'ok' && result.data.metadataStatus === 'complete') completed += 1;
      else if (result.status === 'ok') partial += 1;
      else if (result.status === 'missing_asset') missing += 1;
      else errors += 1;
    }

    cursorPublicId = rows[rows.length - 1].publicId;
    if (rows.length < take) break;
  }

  return { processed, completed, partial, missing, errors };
}

async function fetchCloudinaryResourceMetadata(publicId: string): Promise<CloudinaryResourceResult> {
  try {
    const resource = (await cloudinary.api.resource(publicId, { resource_type: 'image' })) as CloudinaryResourceLike;
    if (resource.public_id !== publicId) return { status: 'public_id_mismatch' };
    return { status: 'ok', data: metadataFromCloudinaryResource(resource) };
  } catch (error) {
    if (extractHttpCode(error) === 404) return { status: 'missing_asset' };
    return { status: 'error', error: error instanceof Error ? error.message : String(error) };
  }
}

// Builds production deps from env: configures Cloudinary with the prod
// credentials (same as cleanup-images) and wires Prisma reads/writes. Returns
// null when Cloudinary config is missing so the caller can skip cleanly.
export function createReviewMediaBackfillDeps(
  prisma: Pick<PrismaClient, 'reviewMedia'>,
  storeId?: string,
): ReviewMediaBackfillDeps | null {
  const cloudName = getConfiguredCloudinaryCloudName();
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return null;

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  const where = reviewMediaMetadataBackfillWhere(storeId);

  return {
    findPending: (take, cursorPublicId) =>
      prisma.reviewMedia.findMany({
        where,
        orderBy: { publicId: 'asc' },
        take,
        ...(cursorPublicId ? { cursor: { publicId: cursorPublicId }, skip: 1 } : {}),
        select: { publicId: true },
      }),
    applyMetadata: async (publicId, data) => {
      await prisma.reviewMedia.update({ where: { publicId }, data });
    },
    fetchResource: fetchCloudinaryResourceMetadata,
  };
}

export type ReviewMediaBackfillMaintenanceResult =
  | { status: 'skipped_no_cloudinary_config' }
  | ({ status: 'ran' } & ReviewMediaBackfillResult);

// Convenience entry point for the daily-maintenance cron.
export async function runReviewMediaMetadataBackfill(
  prisma: Pick<PrismaClient, 'reviewMedia'>,
  options: ReviewMediaBackfillOptions = {},
): Promise<ReviewMediaBackfillMaintenanceResult> {
  const deps = createReviewMediaBackfillDeps(prisma);
  if (!deps) return { status: 'skipped_no_cloudinary_config' };
  const result = await backfillReviewMediaMetadata(deps, { limit: options.limit ?? DEFAULT_CRON_LIMIT, ...options });
  return { status: 'ran', ...result };
}
