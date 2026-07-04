import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  reviewMedia: {
    findFirst: vi.fn(),
  },
}));

const getUserFromRequestMock = vi.hoisted(() => vi.fn());
const signAwsReviewImagePrivatePreviewUrlMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

vi.mock('@/lib/auth-helpers', () => ({
  getUserFromRequest: getUserFromRequestMock,
}));

vi.mock('@/lib/media/providers/aws-review-image', () => ({
  AWS_REVIEW_IMAGE_PROVIDER: 'aws_s3',
  signAwsReviewImagePrivatePreviewUrl: signAwsReviewImagePrivatePreviewUrlMock,
}));

describe('/api/admin/reviews/image-preview', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    getUserFromRequestMock.mockReturnValue({ merchantId: 'store-1', authorizedAppId: 'app-1' });
    signAwsReviewImagePrivatePreviewUrlMock.mockReturnValue('https://media.renuvex.app/private-signed-thumb.webp?Signature=redacted');
  });

  it('returns a no-store signed thumbnail preview for the requested AWS image variant', async () => {
    const variantManifest = { variants: [{ id: 'thumb_320x427', format: 'webp' }] };
    prismaMock.reviewMedia.findFirst.mockResolvedValue({ variantManifest });
    const { GET } = await import('@/app/api/admin/reviews/image-preview/route');

    const response = await GET(new Request('https://app.test/api/admin/reviews/image-preview?mediaId=media-1&variant=thumb_320x427'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(prismaMock.reviewMedia.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'media-1',
        resourceType: 'image',
        provider: 'aws_s3',
        processingStatus: 'ready',
        review: { storeId: 'store-1' },
      },
      select: { variantManifest: true },
    });
    expect(signAwsReviewImagePrivatePreviewUrlMock).toHaveBeenCalledWith({
      manifest: variantManifest,
      variantId: 'thumb_320x427',
      format: 'webp',
      ttlSeconds: 900,
    });
    expect(body.data).toEqual({
      url: 'https://media.renuvex.app/private-signed-thumb.webp?Signature=redacted',
      expiresIn: 900,
    });
  });
});
