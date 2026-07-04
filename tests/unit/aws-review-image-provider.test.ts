import { beforeEach, describe, expect, it, vi } from 'vitest';

const s3SendMock = vi.hoisted(() => vi.fn());

vi.mock('@aws-sdk/client-s3', () => {
  class Command {
    constructor(public readonly input: Record<string, unknown>) {}
  }
  function S3Client() {
    return { send: s3SendMock };
  }
  return {
    CopyObjectCommand: Command,
    DeleteObjectsCommand: Command,
    GetObjectCommand: Command,
    GetObjectTaggingCommand: Command,
    HeadObjectCommand: Command,
    ListObjectsV2Command: Command,
    PutObjectCommand: Command,
    PutObjectTaggingCommand: Command,
    S3Client: vi.fn(S3Client),
  };
});

vi.mock('@aws-sdk/client-cloudfront', () => {
  class Command {
    constructor(public readonly input: Record<string, unknown>) {}
  }
  function CloudFrontClient() {
    return { send: vi.fn() };
  }
  return {
    CloudFrontClient: vi.fn(CloudFrontClient),
    CreateInvalidationCommand: Command,
  };
});

vi.mock('@aws-sdk/cloudfront-signer', () => ({
  getSignedUrl: vi.fn(() => 'https://media.renuvex.app/private-signed-preview'),
}));

vi.mock('@aws-sdk/s3-presigned-post', () => ({
  createPresignedPost: vi.fn(),
}));

vi.mock('@vercel/oidc-aws-credentials-provider', () => ({
  awsCredentialsProvider: vi.fn(),
}));

describe('AWS review image provider', () => {
  beforeEach(() => {
    vi.resetModules();
    s3SendMock.mockReset();
    s3SendMock.mockResolvedValue({});
    process.env.AWS_REVIEW_IMAGES_REGION = 'eu-central-1';
    process.env.AWS_REVIEW_IMAGES_BUCKET = 'review-image-bucket';
    process.env.AWS_REVIEW_IMAGES_PUBLIC_BASE_URL = 'https://media.renuvex.app';
    delete process.env.AWS_REVIEW_IMAGES_ROLE_ARN;
  });

  it('replaces S3 metadata when publishing public variants so immutable cache control is applied', async () => {
    const { publishAwsReviewImageVariants } = await import('@/lib/media/providers/aws-review-image');

    await publishAwsReviewImageVariants({
      schemaVersion: 1,
      provider: 'aws_s3',
      variantSetVersion: 'review-images-v1',
      storeId: 'store-1',
      assetId: '11111111-1111-4111-8111-111111111111',
      generatedAt: '2026-07-03T00:00:00.000Z',
      source: {
        key: 'review-images/v1/private/stores/store-1/assets/11111111-1111-4111-8111-111111111111/original.png',
        contentType: 'image/png',
        width: 100,
        height: 100,
        bytes: 1024,
        checksumAlgorithm: 'SHA256',
        checksumSha256: 'abc',
      },
      variants: [{
        id: 'w1200',
        format: 'jpeg',
        width: 100,
        height: 100,
        bytes: 2048,
        key: 'review-images/v1/private/stores/store-1/assets/11111111-1111-4111-8111-111111111111/variants/w1200.jpeg',
        publicKey: 'reviews/11111111-1111-4111-8111-111111111111/w1200.jpeg',
        url: 'https://media.renuvex.app/reviews/11111111-1111-4111-8111-111111111111/w1200.jpeg',
        contentType: 'image/jpeg',
        checksumSha256: 'def',
      }],
    });

    const copyInput = s3SendMock.mock.calls[0]?.[0]?.input;
    expect(copyInput).toMatchObject({
      Bucket: 'review-image-bucket',
      Key: 'reviews/11111111-1111-4111-8111-111111111111/w1200.jpeg',
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=31536000, immutable',
      MetadataDirective: 'REPLACE',
      Metadata: {
        'renuvex-store-id': 'store-1',
        'renuvex-asset-id': '11111111-1111-4111-8111-111111111111',
        'renuvex-variant-id': 'w1200',
        'renuvex-variant-format': 'jpeg',
      },
      TaggingDirective: 'REPLACE',
    });
    expect(new URLSearchParams(String(copyInput.Tagging)).get('renuvex_state')).toBe('public_ready');
    expect(s3SendMock.mock.calls[1]?.[0]?.input).toMatchObject({
      Bucket: 'review-image-bucket',
      Key: 'reviews/11111111-1111-4111-8111-111111111111/w1200.jpeg',
    });
  });

  it('builds simplified public descriptors and trusts only the new public URL shape', async () => {
    const {
      buildAwsReviewImagePublicDescriptor,
      isTrustedAwsReviewImagePublicUrl,
    } = await import('@/lib/media/providers/aws-review-image');

    const descriptor = buildAwsReviewImagePublicDescriptor({
      schemaVersion: 1,
      provider: 'aws_s3',
      variantSetVersion: 'review-images-v1',
      storeId: 'store-1',
      assetId: '11111111-1111-4111-8111-111111111111',
      generatedAt: '2026-07-03T00:00:00.000Z',
      source: {
        key: 'review-images/v1/private/stores/store-1/assets/11111111-1111-4111-8111-111111111111/original.png',
        contentType: 'image/png',
        width: 100,
        height: 100,
        bytes: 1024,
        checksumAlgorithm: 'SHA256',
        checksumSha256: 'abc',
      },
      variants: [{
        id: 'thumb_320x427',
        format: 'webp',
        width: 320,
        height: 427,
        bytes: 2048,
        key: 'review-images/v1/private/stores/store-1/assets/11111111-1111-4111-8111-111111111111/variants/thumb_320x427.webp',
        publicKey: 'reviews/11111111-1111-4111-8111-111111111111/thumb_320x427.webp',
        url: 'https://media.renuvex.app/reviews/11111111-1111-4111-8111-111111111111/thumb_320x427.webp',
        contentType: 'image/webp',
        checksumSha256: 'def',
      }],
    });

    expect(descriptor?.url).toBe('https://media.renuvex.app/reviews/11111111-1111-4111-8111-111111111111/thumb_320x427.webp');
    expect(isTrustedAwsReviewImagePublicUrl('https://media.renuvex.app/reviews/11111111-1111-4111-8111-111111111111/thumb_320x427.webp')).toBe(true);
    expect(isTrustedAwsReviewImagePublicUrl('https://media.renuvex.app/reviews/11111111-1111-4111-8111-111111111111/thumb_320x427.webp?width=320')).toBe(false);
    expect(isTrustedAwsReviewImagePublicUrl('https://media.renuvex.app/review-images/v1/public/stores/store-1/assets/11111111-1111-4111-8111-111111111111/variants/thumb_320x427.webp')).toBe(false);
    expect(isTrustedAwsReviewImagePublicUrl('https://review-image-bucket.s3.eu-central-1.amazonaws.com/reviews/11111111-1111-4111-8111-111111111111/thumb_320x427.webp')).toBe(false);
  });

  it('lists private, new public, and transitional legacy public prefixes when deleting an image family', async () => {
    const { deleteAwsReviewImageFamily } = await import('@/lib/media/providers/aws-review-image');

    await deleteAwsReviewImageFamily('store-1', '11111111-1111-4111-8111-111111111111', { invalidatePublicVariants: false });

    expect(s3SendMock.mock.calls.map((call) => call[0].input?.Prefix).filter(Boolean)).toEqual([
      'review-images/v1/private/stores/store-1/assets/11111111-1111-4111-8111-111111111111/',
      'reviews/11111111-1111-4111-8111-111111111111/',
      'review-images/v1/public/stores/store-1/assets/11111111-1111-4111-8111-111111111111/',
    ]);
  });
});
