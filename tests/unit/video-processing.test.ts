import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  videoUploadSession: { findUnique: vi.fn() },
}));
const r2Mock = vi.hoisted(() => ({ deleteVideoIngest: vi.fn() }));
const jobsMock = vi.hoisted(() => ({ failSessionAndQueueCleanup: vi.fn() }));
const sessionsMock = vi.hoisted(() => ({ markVideoSessionReady: vi.fn() }));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/media/providers/r2', () => r2Mock);
vi.mock('@/lib/media/lifecycle', () => jobsMock);
vi.mock('@/lib/media/sessions', () => sessionsMock);

function session(overrides: Record<string, unknown> = {}) {
  return {
    id: '11111111-1111-4111-8111-111111111111',
    storeId: 'store-1',
    productId: 'product-1',
    status: 'processing',
    streamUid: 'stream-1',
    bytes: 5_000_000,
    ingestObjectKey: 'public-ingest/video.mp4',
    ...overrides,
  };
}

function readyVideo(overrides: Record<string, unknown> = {}) {
  return {
    uid: 'stream-1',
    duration: 12,
    size: 5_000_000,
    readyToStream: true,
    thumbnail: 'https://videodelivery.net/stream-1/thumbnails/thumbnail.jpg',
    playback: { hls: 'https://videodelivery.net/stream-1/manifest/video.m3u8' },
    status: { state: 'ready', pctComplete: 100 },
    ...overrides,
  };
}

describe('Cloudflare Stream processing state', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not publish a video before the highest-quality encode reaches 100 percent', async () => {
    const { applyStreamVideoState } = await import('@/lib/media/video-processing');
    const result = await applyStreamVideoState(session() as never, readyVideo({
      status: { state: 'ready', pctComplete: 99 },
    }));

    expect(result).toEqual({ ok: true, status: 'processing' });
    expect(r2Mock.deleteVideoIngest).not.toHaveBeenCalled();
    expect(sessionsMock.markVideoSessionReady).not.toHaveBeenCalled();
  });

  it('requires the provider state to be ready even if readyToStream is true', async () => {
    const { applyStreamVideoState } = await import('@/lib/media/video-processing');
    const result = await applyStreamVideoState(session() as never, readyVideo({
      status: { state: 'inprogress', pctComplete: 100 },
    }));

    expect(result).toEqual({ ok: true, status: 'processing' });
    expect(sessionsMock.markVideoSessionReady).not.toHaveBeenCalled();
  });

  it('deletes the transient ingest object and marks the session ready at full encode completion', async () => {
    const { applyStreamVideoState } = await import('@/lib/media/video-processing');
    const result = await applyStreamVideoState(session() as never, readyVideo());

    expect(result).toEqual({ ok: true, status: 'ready' });
    expect(r2Mock.deleteVideoIngest).toHaveBeenCalledWith('public-ingest/video.mp4');
    expect(sessionsMock.markVideoSessionReady).toHaveBeenCalledWith(expect.objectContaining({
      sessionId: '11111111-1111-4111-8111-111111111111',
      streamUid: 'stream-1',
      durationMs: 12_000,
    }));
  });

  it('moves provider errors through the durable cleanup path', async () => {
    const { applyStreamVideoState } = await import('@/lib/media/video-processing');
    const result = await applyStreamVideoState(session() as never, readyVideo({
      readyToStream: false,
      status: { state: 'error', errorReasonCode: 'ERR_PROCESSING' },
    }));

    expect(result).toEqual({ ok: false, code: 'stream_processing_failed' });
    expect(jobsMock.failSessionAndQueueCleanup).toHaveBeenCalledWith(
      '11111111-1111-4111-8111-111111111111',
      'ERR_PROCESSING',
    );
  });
});
