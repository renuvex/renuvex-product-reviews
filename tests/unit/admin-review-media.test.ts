import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/media/providers/aws-review-image', () => ({
  AWS_REVIEW_IMAGE_PROVIDER: 'aws_s3',
  buildAwsReviewImagePublicDescriptor: (manifest: unknown) => manifest
    ? { url: 'https://media.test/full.webp', thumbnailUrl: 'https://media.test/thumb.webp' }
    : null,
}));

function media(overrides: Record<string, unknown> = {}) {
  return {
    id: 'media-1',
    resourceType: 'video',
    provider: 'mux',
    providerAssetId: 'must-not-leak',
    posterUrl: 'https://image.mux.com/signed-playback-1/thumbnail.jpg',
    variantStatus: 'pending',
    variantManifest: null,
    visible: false,
    durationMs: 12_000,
    width: 720,
    height: 1280,
    position: 0,
    processingStatus: 'ready',
    ...overrides,
  };
}

describe('admin review media serialization', () => {
  it('represents ready Mux videos as signed previews without leaking provider data or a raw poster URL', async () => {
    const { serializeAdminReviewMedia } = await import('@/lib/media/admin-review-media');
    const result = serializeAdminReviewMedia(media());

    expect(result).toMatchObject({
      id: 'media-1',
      type: 'video',
      url: null,
      thumbnailUrl: null,
      posterUrl: null,
      previewMode: 'signed',
      canPreview: true,
    });
    expect(result).not.toHaveProperty('provider');
    expect(result).not.toHaveProperty('providerAssetId');
  });

  it('fails closed for processing or unknown-provider video rows', async () => {
    const { serializeAdminReviewMedia } = await import('@/lib/media/admin-review-media');

    expect(serializeAdminReviewMedia(media({ processingStatus: 'processing' }))).toMatchObject({
      previewMode: 'unsupported',
      canPreview: false,
      posterUrl: null,
    });
    expect(serializeAdminReviewMedia(media({ provider: 'unknown' }))).toMatchObject({
      previewMode: 'unsupported',
      canPreview: false,
      posterUrl: null,
    });
  });

  it('preserves public and private AWS image preview behavior', async () => {
    const { serializeAdminReviewMedia } = await import('@/lib/media/admin-review-media');
    const publicImage = serializeAdminReviewMedia(media({
      resourceType: 'image',
      provider: 'aws_s3',
      variantStatus: 'public_ready',
      variantManifest: { variants: [] },
      visible: true,
    }));
    const privateImage = serializeAdminReviewMedia(media({
      resourceType: 'image',
      provider: 'aws_s3',
      variantManifest: { variants: [] },
      visible: false,
    }));

    expect(publicImage).toMatchObject({
      type: 'image',
      url: 'https://media.test/full.webp',
      thumbnailUrl: 'https://media.test/thumb.webp',
      previewMode: 'public',
      canPreview: true,
    });
    expect(privateImage).toMatchObject({
      url: null,
      thumbnailUrl: null,
      previewMode: 'signed',
      canPreview: true,
    });
  });
});
