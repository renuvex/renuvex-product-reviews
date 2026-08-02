import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  reviewMedia: { findFirst: vi.fn() },
  videoUploadSession: { findFirst: vi.fn() },
}));

vi.mock('server-only', () => ({}));
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));

describe('admin Mux video access', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('resolves a signed playback id only through the exact tenant media and session pair', async () => {
    prismaMock.reviewMedia.findFirst.mockResolvedValue({ providerAssetId: 'asset-1' });
    prismaMock.videoUploadSession.findFirst.mockResolvedValue({ signedPlaybackId: ' signed-playback-1 ' });
    const { resolveAdminMuxSignedPlaybackId } = await import('@/lib/media/admin-video-access');

    await expect(resolveAdminMuxSignedPlaybackId({ mediaId: 'media-1', storeId: 'store-1' }))
      .resolves.toBe('signed-playback-1');

    expect(prismaMock.reviewMedia.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'media-1',
        storeId: 'store-1',
        resourceType: 'video',
        provider: 'mux',
        processingStatus: 'ready',
        review: { storeId: 'store-1' },
      },
      select: { providerAssetId: true },
    });
    expect(prismaMock.videoUploadSession.findFirst).toHaveBeenCalledWith({
      where: {
        storeId: 'store-1',
        provider: 'mux',
        providerAssetId: 'asset-1',
      },
      select: { signedPlaybackId: true },
    });
  });

  it('fails closed before session lookup when the tenant media is missing', async () => {
    prismaMock.reviewMedia.findFirst.mockResolvedValue(null);
    const { resolveAdminMuxSignedPlaybackId } = await import('@/lib/media/admin-video-access');

    await expect(resolveAdminMuxSignedPlaybackId({ mediaId: 'media-1', storeId: 'store-1' }))
      .resolves.toBeNull();
    expect(prismaMock.videoUploadSession.findFirst).not.toHaveBeenCalled();
  });

  it('fails closed when the exact tenant session has no signed playback id', async () => {
    prismaMock.reviewMedia.findFirst.mockResolvedValue({ providerAssetId: 'asset-1' });
    prismaMock.videoUploadSession.findFirst.mockResolvedValue({ signedPlaybackId: null });
    const { resolveAdminMuxSignedPlaybackId } = await import('@/lib/media/admin-video-access');

    await expect(resolveAdminMuxSignedPlaybackId({ mediaId: 'media-1', storeId: 'store-1' }))
      .resolves.toBeNull();
  });
});
