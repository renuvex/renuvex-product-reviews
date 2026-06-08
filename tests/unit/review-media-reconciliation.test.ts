import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  buildLegacyTargetPublicId,
  configuredCloudinaryApiCredentials,
  classifyReviewImages,
  configuredCloudName,
  isTrustedTenantUrl,
  loadLocalEnvFiles,
  parseLegacyImages,
  summarizeClassifiedReviews,
} from '../../scripts/review-media-reconciliation-lib.mjs';

const CLOUD_NAME = 'dtn7jhhuy';

function review(overrides: Record<string, unknown> = {}) {
  return {
    id: 'review-1',
    storeId: 'store-1',
    productId: 'product-1',
    status: 'approved',
    images: '[]',
    hasImages: false,
    media: [],
    ...overrides,
  };
}

describe('legacy review media reconciliation helpers', () => {
  it('requires a real cloud name and rejects placeholder values', () => {
    expect(configuredCloudName('dtn7jhhuy')).toBe('dtn7jhhuy');
    expect(configuredCloudName('your_cloud_name')).toBeNull();
    expect(configuredCloudName('bad cloud')).toBeNull();
  });

  it('rejects placeholder Cloudinary API credentials before apply operations', () => {
    expect(configuredCloudinaryApiCredentials({
      CLOUDINARY_API_KEY: 'real-key',
      CLOUDINARY_API_SECRET: 'real-secret',
      NODE_ENV: 'test',
    })).toEqual({ apiKey: 'real-key', apiSecret: 'real-secret' });
    expect(configuredCloudinaryApiCredentials({
      CLOUDINARY_API_KEY: 'your_api_key',
      CLOUDINARY_API_SECRET: 'real-secret',
      NODE_ENV: 'test',
    })).toBeNull();
    expect(configuredCloudinaryApiCredentials({
      CLOUDINARY_API_KEY: 'real-key',
      CLOUDINARY_API_SECRET: 'your_api_secret',
      NODE_ENV: 'test',
    })).toBeNull();
    expect(configuredCloudinaryApiCredentials({
      CLOUDINARY_API_KEY: 'real-key',
      CLOUDINARY_API_SECRET: 'SECRET_DEGERINI_BURAYA_TIRNAK_ICINDE_YAPISTIR',
      NODE_ENV: 'test',
    })).toBeNull();
  });

  it('loads local env files without overriding real provided values', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'review-media-env-'));
    fs.writeFileSync(path.join(dir, '.env.local'), [
      'CLOUDINARY_API_KEY="file-key"',
      'CLOUDINARY_API_SECRET="file-secret"',
      'EXISTING_VALUE=file-value',
      '# ignored comment',
    ].join('\n'));

    const env: NodeJS.ProcessEnv = { NODE_ENV: 'test', EXISTING_VALUE: 'shell-value' };
    loadLocalEnvFiles(dir, env);

    expect(env.CLOUDINARY_API_KEY).toBe('file-key');
    expect(env.CLOUDINARY_API_SECRET).toBe('file-secret');
    expect(env.EXISTING_VALUE).toBe('shell-value');
  });

  it('allows local env files to replace placeholder Cloudinary credentials', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'review-media-env-'));
    fs.writeFileSync(path.join(dir, '.env.local'), [
      'CLOUDINARY_API_KEY="file-key"',
      'CLOUDINARY_API_SECRET="file-secret"',
    ].join('\n'));

    const env: NodeJS.ProcessEnv = {
      NODE_ENV: 'test',
      CLOUDINARY_API_KEY: 'your_api_key',
      CLOUDINARY_API_SECRET: 'SECRET_DEGERINI_BURAYA_TIRNAK_ICINDE_YAPISTIR',
    };
    loadLocalEnvFiles(dir, env);

    expect(env.CLOUDINARY_API_KEY).toBe('file-key');
    expect(env.CLOUDINARY_API_SECRET).toBe('file-secret');
  });

  it('parses legacy images defensively and de-duplicates string URLs', () => {
    const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/review_images/sample.jpg`;
    expect(parseLegacyImages(JSON.stringify([url, url, 42, '']))).toEqual({ kind: 'array', urls: [url] });
    expect(parseLegacyImages('{bad')).toEqual({ kind: 'invalid_json', urls: [] });
    expect(parseLegacyImages(JSON.stringify({ url }))).toEqual({ kind: 'not_array', urls: [] });
  });

  it('classifies tenant-scoped URLs as trusted without planning a copy', () => {
    const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/review_images/stores/store-1/reviews/a.jpg`;
    const result = classifyReviewImages(review({ images: JSON.stringify([url]) }), CLOUD_NAME);

    expect(result.parseKind).toBe('array');
    expect(result.items).toMatchObject([
      {
        bucket: 'tenant_scoped_trusted',
        publicId: 'review_images/stores/store-1/reviews/a',
        targetPublicId: 'review_images/stores/store-1/reviews/a',
      },
    ]);
    expect(isTrustedTenantUrl(url, CLOUD_NAME, 'store-1')).toBe(true);
  });

  it('classifies old global review_images paths as copy-required legacy media', () => {
    const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/review_images/old-a.jpg`;
    const result = classifyReviewImages(review({ images: JSON.stringify([url]) }), CLOUD_NAME);

    expect(result.items[0].bucket).toBe('legacy_global_review_images');
    expect(result.items[0].publicId).toBe('review_images/old-a');
    expect(result.items[0].targetPublicId).toMatch(/^review_images\/stores\/store-1\/legacy\/review-1\/00-[a-f0-9]{12}$/);
    expect(isTrustedTenantUrl(url, CLOUD_NAME, 'store-1')).toBe(false);
  });

  it('does not trust wrong-store or foreign-cloud URLs', () => {
    const wrongStore = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/review_images/stores/store-2/reviews/a.jpg`;
    const foreignCloud = 'https://res.cloudinary.com/other-cloud/image/upload/v1/review_images/stores/store-1/reviews/a.jpg';
    const result = classifyReviewImages(review({ images: JSON.stringify([wrongStore, foreignCloud]) }), CLOUD_NAME);

    expect(result.items.map((item) => item.bucket)).toEqual(['tenant_scoped_wrong_store', 'foreign_cloudinary_cloud']);
  });

  it('builds deterministic target public ids per review, source and position', () => {
    const source = 'review_images/old-a';
    const first = buildLegacyTargetPublicId(review(), source, 0);
    const second = buildLegacyTargetPublicId(review(), source, 0);
    const differentPosition = buildLegacyTargetPublicId(review(), source, 1);

    expect(first).toBe(second);
    expect(first).not.toBe(differentPosition);
    expect(first).toMatch(/^review_images\/stores\/store-1\/legacy\/review-1\/00-[a-f0-9]{12}$/);
  });

  it('summarizes review and URL bucket counts for audit output', () => {
    const trusted = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/review_images/stores/store-1/reviews/a.jpg`;
    const legacy = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/review_images/old-a.jpg`;
    const summary = summarizeClassifiedReviews([
      review({ id: 'review-1', images: JSON.stringify([trusted]), hasImages: true, media: [{ visible: true }] }),
      review({ id: 'review-2', images: JSON.stringify([legacy]) }),
    ], CLOUD_NAME);

    expect(summary.totalLegacyUrls).toBe(2);
    expect(summary.buckets).toMatchObject({
      tenant_scoped_trusted: 1,
      legacy_global_review_images: 1,
    });
    expect(summary.reviewsByBucket).toMatchObject({
      tenant_scoped_trusted: 1,
      legacy_global_review_images: 1,
    });
    expect(summary.rowsWithReviewMedia).toBe(1);
    expect(summary.mediaVisibility.visible).toBe(1);
  });
});
