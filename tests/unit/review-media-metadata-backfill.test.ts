import { describe, expect, it } from 'vitest';
import {
  backfillReviewMediaMetadata,
  metadataFromCloudinaryResource,
  reviewMediaMetadataBackfillWhere,
  type CloudinaryResourceResult,
  type ReviewMediaBackfillDeps,
} from '@/lib/review-media-metadata-backfill';
import type { ReviewMediaMetadataWrite } from '@/lib/review-media-metadata';

describe('metadataFromCloudinaryResource', () => {
  it('marks a complete image as complete with a derived mimeType', () => {
    const data = metadataFromCloudinaryResource({
      public_id: 'review_images/stores/s/abc',
      asset_id: 'a'.repeat(40),
      version: 1700000000,
      resource_type: 'image',
      format: 'JPG',
      width: 1080,
      height: 1920,
      bytes: 250000,
    });
    expect(data.metadataSource).toBe('admin_api');
    expect(data.metadataStatus).toBe('complete');
    expect(data.format).toBe('jpg');
    expect(data.mimeType).toBe('image/jpeg');
    expect(data.width).toBe(1080);
    expect(data.height).toBe(1920);
    expect(data.bytes).toBe(250000);
    expect(data.version).toBe('1700000000');
  });

  it('falls back to partial when a dimension is missing', () => {
    const data = metadataFromCloudinaryResource({ resource_type: 'image', format: 'png', width: 100, height: 0, bytes: 10 });
    expect(data.metadataStatus).toBe('partial');
    expect(data.height).toBeUndefined();
  });

  it('drops a disallowed format and stays partial', () => {
    const data = metadataFromCloudinaryResource({ resource_type: 'image', format: 'tiff', width: 100, height: 100, bytes: 100 });
    expect(data.format).toBeUndefined();
    expect(data.mimeType).toBeUndefined();
    expect(data.metadataStatus).toBe('partial');
  });
});

describe('reviewMediaMetadataBackfillWhere', () => {
  it('targets non-terminal rows only', () => {
    expect(reviewMediaMetadataBackfillWhere()).toEqual({
      provider: 'cloudinary',
      resourceType: 'image',
      metadataStatus: { notIn: ['complete', 'missing_asset'] },
    });
  });

  it('scopes by storeId when provided', () => {
    expect(reviewMediaMetadataBackfillWhere('store-1')).toEqual({
      provider: 'cloudinary',
      resourceType: 'image',
      storeId: 'store-1',
      metadataStatus: { notIn: ['complete', 'missing_asset'] },
    });
  });
});

describe('backfillReviewMediaMetadata', () => {
  const complete: CloudinaryResourceResult = {
    status: 'ok',
    data: { metadataSource: 'admin_api', metadataStatus: 'complete', width: 1, height: 1, bytes: 1, format: 'jpg' },
  };
  const partial: CloudinaryResourceResult = {
    status: 'ok',
    data: { metadataSource: 'admin_api', metadataStatus: 'partial' },
  };

  function buildDeps(pending: string[], resultsByPublicId: Record<string, CloudinaryResourceResult>) {
    const writes: Array<{ publicId: string; status: ReviewMediaMetadataWrite['metadataStatus'] }> = [];
    const deps: ReviewMediaBackfillDeps = {
      findPending: async (take, cursor) => {
        const start = cursor ? pending.indexOf(cursor) + 1 : 0;
        return pending.slice(start, start + take).map((publicId) => ({ publicId }));
      },
      applyMetadata: async (publicId, data) => {
        writes.push({ publicId, status: data.metadataStatus });
      },
      fetchResource: async (publicId) => resultsByPublicId[publicId] ?? { status: 'error', error: 'unmocked' },
    };
    return { deps, writes };
  }

  it('writes resolvable rows, tallies counts, and never writes on a transport error', async () => {
    // `d` mimics a stale prod api_key returning 401 — it must NOT corrupt the row.
    const { deps, writes } = buildDeps(['a', 'b', 'c', 'd'], {
      a: complete,
      b: partial,
      c: { status: 'missing_asset' },
      d: { status: 'error', error: '401 - unknown api_key' },
    });

    const result = await backfillReviewMediaMetadata(deps, { batchSize: 10, concurrency: 1 });

    expect(result).toEqual({ processed: 4, completed: 1, partial: 1, missing: 1, errors: 1 });
    expect(writes.map((w) => w.publicId).sort()).toEqual(['a', 'b', 'c']);
    expect(writes.find((w) => w.publicId === 'c')?.status).toBe('missing_asset');
    expect(writes.some((w) => w.publicId === 'd')).toBe(false);
  });

  it('never writes when every fetch fails (stale key safety)', async () => {
    const { deps, writes } = buildDeps(['a', 'b'], {
      a: { status: 'error', error: '401' },
      b: { status: 'error', error: '401' },
    });
    const result = await backfillReviewMediaMetadata(deps, { batchSize: 10, concurrency: 2 });
    expect(result).toEqual({ processed: 2, completed: 0, partial: 0, missing: 0, errors: 2 });
    expect(writes).toHaveLength(0);
  });

  it('respects the per-run limit', async () => {
    const { deps, writes } = buildDeps(['a', 'b', 'c', 'd', 'e'], {
      a: complete, b: complete, c: complete, d: complete, e: complete,
    });
    const result = await backfillReviewMediaMetadata(deps, { limit: 2, batchSize: 100, concurrency: 1 });
    expect(result.processed).toBe(2);
    expect(writes).toHaveLength(2);
  });

  it('paginates across batches via the publicId cursor', async () => {
    const { deps, writes } = buildDeps(['a', 'b', 'c'], { a: complete, b: complete, c: complete });
    const result = await backfillReviewMediaMetadata(deps, { batchSize: 1, concurrency: 1 });
    expect(result.processed).toBe(3);
    expect(writes.map((w) => w.publicId)).toEqual(['a', 'b', 'c']);
  });
});
