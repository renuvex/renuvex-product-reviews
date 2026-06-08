import { createHash } from 'crypto';
import { describe, expect, it } from 'vitest';
import {
  normalizeCloudinaryUploadMetadata,
  verifyCloudinaryUploadResponseSignature,
} from '@/lib/review-media-metadata';

function signature(publicId: string, version: string, apiSecret: string, algorithm: 'sha1' | 'sha256' = 'sha1') {
  return createHash(algorithm)
    .update(`public_id=${publicId}&version=${version}${apiSecret}`, 'utf8')
    .digest('hex');
}

describe('review media metadata', () => {
  it('verifies Cloudinary upload response signatures', () => {
    const publicId = 'review_images/stores/store-1/review-a';
    const version = '1790000000';
    const apiSecret = 'unit-cloudinary-secret';

    expect(verifyCloudinaryUploadResponseSignature({
      publicId,
      version,
      apiSecret,
      signature: signature(publicId, version, apiSecret),
    })).toBe(true);

    expect(verifyCloudinaryUploadResponseSignature({
      publicId,
      version,
      apiSecret,
      signature: signature(publicId, version, apiSecret, 'sha256'),
    })).toBe(true);

    expect(verifyCloudinaryUploadResponseSignature({
      publicId,
      version,
      apiSecret,
      signature: 'bad-signature',
    })).toBe(false);
  });

  it('normalizes complete signed upload metadata', () => {
    const publicId = 'review_images/stores/store-1/review-a';
    const version = '1790000000';
    const apiSecret = 'unit-cloudinary-secret';
    const now = new Date('2026-06-08T00:00:00.000Z');

    expect(normalizeCloudinaryUploadMetadata({
      assetId: 'asset-123',
      publicId,
      version,
      resourceType: 'image',
      format: 'JPG',
      width: 1200,
      height: 1600,
      bytes: 450000,
      signature: signature(publicId, version, apiSecret),
    }, { expectedPublicId: publicId, apiSecret, now })).toEqual({
      assetId: 'asset-123',
      version,
      resourceType: 'image',
      format: 'jpg',
      mimeType: 'image/jpeg',
      width: 1200,
      height: 1600,
      bytes: 450000,
      metadataSource: 'upload_response',
      metadataStatus: 'complete',
      metadataFetchedAt: now,
    });
  });

  it('does not trust dimensions when signature or public id is invalid', () => {
    const publicId = 'review_images/stores/store-1/review-a';
    const now = new Date('2026-06-08T00:00:00.000Z');

    expect(normalizeCloudinaryUploadMetadata({
      publicId,
      version: '1790000000',
      resourceType: 'image',
      format: 'jpg',
      width: 1200,
      height: 1600,
      bytes: 450000,
      signature: 'bad-signature',
    }, { expectedPublicId: publicId, apiSecret: 'unit-cloudinary-secret', now })).toEqual({
      metadataSource: 'upload_response',
      metadataStatus: 'invalid_signature',
      metadataFetchedAt: now,
    });

    expect(normalizeCloudinaryUploadMetadata({
      publicId: 'review_images/stores/store-1/other',
      version: '1790000000',
      signature: 'bad-signature',
    }, { expectedPublicId: publicId, apiSecret: 'unit-cloudinary-secret', now })).toEqual({
      metadataSource: 'upload_response',
      metadataStatus: 'pending',
      metadataFetchedAt: now,
    });
  });
});
