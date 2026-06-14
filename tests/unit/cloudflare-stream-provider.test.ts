import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VIDEO_MAX_BYTES, VIDEO_MAX_DURATION_MS } from '@/lib/media/constants';

describe('Cloudflare Stream provider contract', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.stubEnv('CLOUDFLARE_ACCOUNT_ID', 'account-id');
    vi.stubEnv('CLOUDFLARE_STREAM_API_TOKEN', 'stream-token');
    vi.stubEnv('CLOUDFLARE_STREAM_CUSTOMER_CODE', 'customer-code');
    vi.stubEnv('CLOUDFLARE_STREAM_WEBHOOK_SECRET', 'webhook-secret');
  });

  it('uses the documented copy URL field and server-side upload limits', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, result: { uid: 'stream-1' } }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const { createStreamVideoFromUrl } = await import('@/lib/media/providers/cloudflare-stream');

    await createStreamVideoFromUrl({
      url: 'https://media-ingest.example.com/session/video.mp4',
      creator: 'session-1',
      name: 'review-video.mp4',
    });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(String(init.body))).toEqual({
      url: 'https://media-ingest.example.com/session/video.mp4',
      creator: 'session-1',
      meta: { uploadSessionId: 'session-1' },
      name: 'review-video.mp4',
      requireSignedURLs: true,
      maxDurationSeconds: VIDEO_MAX_DURATION_MS / 1000,
      maxSizeBytes: VIDEO_MAX_BYTES,
      thumbnailTimestampPct: 0.1,
    });
  });
});
