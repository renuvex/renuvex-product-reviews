import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  reviewMedia: {
    findFirst: vi.fn(),
  },
  videoUploadSession: {
    findFirst: vi.fn(),
  },
}));

const getUserFromRequestMock = vi.hoisted(() => vi.fn());
const signMuxPlaybackTokenMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

vi.mock('@/lib/auth-helpers', () => ({
  getUserFromRequest: getUserFromRequestMock,
}));

vi.mock('@/lib/media/providers/mux', () => ({
  buildMuxPosterUrl: (playbackId: string, token?: string) => `https://image.mux.com/${playbackId}/thumbnail.jpg${token ? `?token=${token}` : ''}`,
  buildMuxSignedPlaybackUrl: (playbackId: string, token: string) => `https://stream.mux.com/${playbackId}.m3u8?token=${token}`,
  signMuxPlaybackToken: signMuxPlaybackTokenMock,
}));

describe('/api/admin/reviews/video-playback', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    getUserFromRequestMock.mockReturnValue({ merchantId: 'store-1', authorizedAppId: 'app-1' });
  });

  it('returns Mux Player signed playback attributes without caching', async () => {
    prismaMock.reviewMedia.findFirst.mockResolvedValue({ providerAssetId: 'asset-1' });
    prismaMock.videoUploadSession.findFirst.mockResolvedValue({ signedPlaybackId: 'signed-playback-1' });
    signMuxPlaybackTokenMock
      .mockResolvedValueOnce('video-token')
      .mockResolvedValueOnce('thumbnail-token');
    const { GET } = await import('@/app/api/admin/reviews/video-playback/route');

    const response = await GET(new Request('https://app.test/api/admin/reviews/video-playback?mediaId=media-1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(body.data).toEqual({
      playbackId: 'signed-playback-1',
      playbackToken: 'video-token',
      thumbnailToken: 'thumbnail-token',
      url: 'https://stream.mux.com/signed-playback-1.m3u8?token=video-token',
      posterUrl: 'https://image.mux.com/signed-playback-1/thumbnail.jpg?token=thumbnail-token',
      expiresIn: 900,
    });
  });
});
