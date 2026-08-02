import { beforeEach, describe, expect, it, vi } from 'vitest';

const authenticateIkasAdminRequestMock = vi.hoisted(() => vi.fn());
const resolveAdminMuxSignedPlaybackIdMock = vi.hoisted(() => vi.fn());
const signMuxPlaybackTokenMock = vi.hoisted(() => vi.fn());
const reportServerFailureMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/auth-helpers', () => ({
  authenticateIkasAdminRequest: authenticateIkasAdminRequestMock,
  ikasAdminAuthenticationResponse: vi.fn(),
}));

vi.mock('@/lib/media/admin-video-access', () => ({
  resolveAdminMuxSignedPlaybackId: resolveAdminMuxSignedPlaybackIdMock,
}));

vi.mock('@/lib/media/providers/mux', () => ({
  buildMuxPosterUrl: (playbackId: string, token: string) => `https://image.mux.com/${playbackId}/thumbnail.jpg?token=${token}`,
  signMuxPlaybackToken: signMuxPlaybackTokenMock,
}));

vi.mock('@/lib/server-failures', () => ({
  reportServerFailure: reportServerFailureMock,
}));

describe('/api/admin/reviews/video-thumbnail', () => {
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

  it('returns only a short-lived signed thumbnail URL for the exact tenant media', async () => {
    resolveAdminMuxSignedPlaybackIdMock.mockResolvedValue('signed-playback-1');
    signMuxPlaybackTokenMock.mockResolvedValue('thumbnail-token');
    const { GET } = await import('@/app/api/admin/reviews/video-thumbnail/route');

    const response = await GET(new Request('https://app.test/api/admin/reviews/video-thumbnail?mediaId=media-1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(resolveAdminMuxSignedPlaybackIdMock).toHaveBeenCalledWith({ mediaId: 'media-1', storeId: 'store-1' });
    expect(signMuxPlaybackTokenMock).toHaveBeenCalledOnce();
    expect(signMuxPlaybackTokenMock).toHaveBeenCalledWith('signed-playback-1', 'thumbnail', 900);
    expect(body).toEqual({
      data: {
        url: 'https://image.mux.com/signed-playback-1/thumbnail.jpg?token=thumbnail-token',
        expiresIn: 900,
      },
    });
    expect(body.data).not.toHaveProperty('playbackId');
    expect(body.data).not.toHaveProperty('playbackToken');
    expect(body.data).not.toHaveProperty('thumbnailToken');
  });

  it('rejects a missing media id without resolving or signing', async () => {
    const { GET } = await import('@/app/api/admin/reviews/video-thumbnail/route');
    const response = await GET(new Request('https://app.test/api/admin/reviews/video-thumbnail'));

    expect(response.status).toBe(400);
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    await expect(response.json()).resolves.toEqual({ error: 'invalid_media_id' });
    expect(resolveAdminMuxSignedPlaybackIdMock).not.toHaveBeenCalled();
    expect(signMuxPlaybackTokenMock).not.toHaveBeenCalled();
  });

  it('returns a no-store not-found response without signing', async () => {
    resolveAdminMuxSignedPlaybackIdMock.mockResolvedValue(null);
    const { GET } = await import('@/app/api/admin/reviews/video-thumbnail/route');
    const response = await GET(new Request('https://app.test/api/admin/reviews/video-thumbnail?mediaId=missing'));

    expect(response.status).toBe(404);
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    await expect(response.json()).resolves.toEqual({ error: 'video_not_found' });
    expect(signMuxPlaybackTokenMock).not.toHaveBeenCalled();
  });

  it('sanitizes signing failures and keeps the response private', async () => {
    resolveAdminMuxSignedPlaybackIdMock.mockResolvedValue('signed-playback-1');
    signMuxPlaybackTokenMock.mockRejectedValue(new Error('private-key-canary'));
    const { GET } = await import('@/app/api/admin/reviews/video-thumbnail/route');
    const response = await GET(new Request('https://app.test/api/admin/reviews/video-thumbnail?mediaId=media-1'));

    expect(response.status).toBe(500);
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    await expect(response.json()).resolves.toEqual({ error: 'admin_video_thumbnail_failed' });
    expect(reportServerFailureMock).toHaveBeenCalledWith('admin_video_thumbnail_failed');
  });
});
