import { beforeEach, describe, expect, it, vi } from 'vitest';

const authenticateIkasAdminRequestMock = vi.hoisted(() => vi.fn());
const resolveAdminMuxSignedPlaybackIdMock = vi.hoisted(() => vi.fn());
const signMuxPlaybackTokenMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/auth-helpers', () => ({
  authenticateIkasAdminRequest: authenticateIkasAdminRequestMock,
  ikasAdminAuthenticationResponse: vi.fn(),
}));

vi.mock('@/lib/media/admin-video-access', () => ({
  resolveAdminMuxSignedPlaybackId: resolveAdminMuxSignedPlaybackIdMock,
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
    authenticateIkasAdminRequestMock.mockResolvedValue({
      ok: true,
      context: {
        principal: {
          merchantId: 'store-1',
          authorizedAppId: 'app-1',
          generation: 1,
          stateVersion: 1,
        },
        authToken: {},
      },
    });
  });

  it('returns Mux Player signed playback attributes without caching', async () => {
    resolveAdminMuxSignedPlaybackIdMock.mockResolvedValue('signed-playback-1');
    signMuxPlaybackTokenMock
      .mockResolvedValueOnce('video-token')
      .mockResolvedValueOnce('thumbnail-token');
    const { GET } = await import('@/app/api/admin/reviews/video-playback/route');

    const response = await GET(new Request('https://app.test/api/admin/reviews/video-playback?mediaId=media-1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(resolveAdminMuxSignedPlaybackIdMock).toHaveBeenCalledWith({
      mediaId: 'media-1',
      storeId: 'store-1',
    });
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
