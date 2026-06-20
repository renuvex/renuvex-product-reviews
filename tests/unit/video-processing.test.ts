import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  videoUploadSession: { findUnique: vi.fn(), findFirst: vi.fn() },
}));
const lifecycleMock = vi.hoisted(() => ({ failSessionAndQueueCleanup: vi.fn() }));
const sessionsMock = vi.hoisted(() => ({ markVideoSessionReady: vi.fn() }));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/media/lifecycle', () => lifecycleMock);
vi.mock('@/lib/media/sessions', () => sessionsMock);

function session(overrides: Record<string, unknown> = {}) {
  return {
    id: '11111111-1111-4111-8111-111111111111',
    storeId: 'store-1',
    productId: 'product-1',
    status: 'processing',
    provider: 'mux',
    providerUploadId: 'upload-1',
    providerAssetId: 'asset-1',
    bytes: 5_000_000,
    ...overrides,
  };
}

function readyAsset(overrides: Record<string, unknown> = {}) {
  return {
    id: 'asset-1',
    upload_id: 'upload-1',
    status: 'ready',
    duration: 12,
    playback_ids: [{ id: 'signed-playback-1', policy: 'signed' }],
    passthrough: '11111111-1111-4111-8111-111111111111',
    ...overrides,
  };
}

describe('Mux video processing state', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('marks a ready Mux asset ready when a signed playback id exists', async () => {
    const { applyMuxAssetState } = await import('@/lib/media/video-processing');
    const result = await applyMuxAssetState(session() as never, readyAsset() as never, 'mux_reconcile');

    expect(result).toEqual({ ok: true, status: 'ready' });
    expect(sessionsMock.markVideoSessionReady).toHaveBeenCalledWith(expect.objectContaining({
      sessionId: '11111111-1111-4111-8111-111111111111',
      providerUploadId: 'upload-1',
      providerAssetId: 'asset-1',
      signedPlaybackId: 'signed-playback-1',
      playbackUrl: 'https://stream.mux.com/signed-playback-1.m3u8',
      posterUrl: 'https://image.mux.com/signed-playback-1/thumbnail.jpg',
      durationMs: 12_000,
      metadataSource: 'mux_reconcile',
    }));
  });

  it('keeps a preparing Mux asset in processing', async () => {
    const { applyMuxAssetState } = await import('@/lib/media/video-processing');
    const result = await applyMuxAssetState(session() as never, readyAsset({ status: 'preparing' }) as never, 'mux_webhook');

    expect(result).toEqual({ ok: true, status: 'processing' });
    expect(sessionsMock.markVideoSessionReady).not.toHaveBeenCalled();
  });

  it('waits until Mux exposes the signed playback id', async () => {
    const { applyMuxAssetState } = await import('@/lib/media/video-processing');
    const result = await applyMuxAssetState(session() as never, readyAsset({ playback_ids: [] }) as never, 'mux_webhook');

    expect(result).toEqual({ ok: true, status: 'processing' });
    expect(sessionsMock.markVideoSessionReady).not.toHaveBeenCalled();
  });

  it('moves Mux asset errors through durable cleanup', async () => {
    const { applyMuxAssetState } = await import('@/lib/media/video-processing');
    const result = await applyMuxAssetState(session() as never, readyAsset({
      status: 'errored',
      errors: { type: 'invalid_input', messages: ['invalid'] },
    }) as never, 'mux_webhook');

    expect(result).toEqual({ ok: false, code: 'mux_processing_failed' });
    expect(lifecycleMock.failSessionAndQueueCleanup).toHaveBeenCalledWith(
      '11111111-1111-4111-8111-111111111111',
      'invalid_input',
      { providerUploadId: 'upload-1', providerAssetId: 'asset-1' },
    );
  });

  it('rejects invalid duration after Mux processing', async () => {
    const { applyMuxAssetState } = await import('@/lib/media/video-processing');
    const result = await applyMuxAssetState(session() as never, readyAsset({ duration: 1 }) as never, 'mux_webhook');

    expect(result).toEqual({ ok: false, code: 'invalid_video_duration' });
    expect(lifecycleMock.failSessionAndQueueCleanup).toHaveBeenCalledWith(
      '11111111-1111-4111-8111-111111111111',
      'invalid_video_duration',
      { providerUploadId: 'upload-1', providerAssetId: 'asset-1' },
    );
  });

  it('rejects provider identity mismatches without mutating readiness', async () => {
    const { applyMuxAssetState } = await import('@/lib/media/video-processing');
    const result = await applyMuxAssetState(session() as never, readyAsset({ id: 'asset-2' }) as never, 'mux_reconcile');

    expect(result).toEqual({ ok: false, code: 'mux_asset_id_mismatch' });
    expect(sessionsMock.markVideoSessionReady).not.toHaveBeenCalled();
  });
});
