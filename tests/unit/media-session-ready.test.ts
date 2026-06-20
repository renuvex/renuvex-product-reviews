import { beforeEach, describe, expect, it, vi } from 'vitest';

const txMock = vi.hoisted(() => ({
  $queryRaw: vi.fn(),
  videoUploadSession: {
    updateMany: vi.fn(),
    update: vi.fn(),
  },
  storeVideoUsage: {
    updateMany: vi.fn(),
  },
  pendingReviewImage: {
    upsert: vi.fn(),
  },
  mediaProviderJob: {
    updateMany: vi.fn(),
  },
}));

const prismaMock = vi.hoisted(() => {
  let transactionTail = Promise.resolve();
  return {
    $transaction: vi.fn((callback: (tx: typeof txMock) => Promise<unknown>) => {
      const result = transactionTail.then(() => callback(txMock));
      transactionTail = result.then(() => undefined, () => undefined);
      return result;
    }),
  };
});

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/media/outbox', () => ({
  enqueueMediaProviderJob: vi.fn(),
  supersedeSessionLifecycleJobs: vi.fn(),
}));

describe('video ready transaction', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    txMock.videoUploadSession.updateMany.mockResolvedValue({ count: 1 });
    txMock.videoUploadSession.update.mockResolvedValue({ id: 'session-1', status: 'ready' });
    txMock.storeVideoUsage.updateMany.mockResolvedValue({ count: 1 });
    txMock.pendingReviewImage.upsert.mockResolvedValue({});
    txMock.mediaProviderJob.updateMany.mockResolvedValue({ count: 1 });
  });

  it('consumes quota and preserves the first readiness source under concurrent webhook and reconcile calls', async () => {
    const reserved = {
      id: 'session-1',
      storeId: 'store-1',
      productId: 'product-1',
      status: 'processing',
      quotaState: 'reserved',
      reservedMonth: new Date('2026-06-01T00:00:00.000Z'),
      mimeType: 'video/mp4',
      bytes: 5_000_000,
    };
    txMock.$queryRaw
      .mockResolvedValueOnce([reserved])
      .mockResolvedValueOnce([{ ...reserved, status: 'ready', quotaState: 'consumed' }]);

    const { markVideoSessionReady } = await import('@/lib/media/sessions');
    const input = {
      sessionId: 'session-1',
      providerUploadId: 'upload-1',
      providerAssetId: 'asset-1',
      signedPlaybackId: 'signed-playback-1',
      playbackUrl: 'https://stream.mux.com/signed-playback-1.m3u8',
      posterUrl: 'https://image.mux.com/signed-playback-1/thumbnail.jpg',
      durationMs: 12_000,
    };

    await Promise.all([
      markVideoSessionReady({ ...input, metadataSource: 'mux_webhook' }),
      markVideoSessionReady({ ...input, metadataSource: 'mux_reconcile' }),
    ]);

    expect(txMock.storeVideoUsage.updateMany).toHaveBeenCalledOnce();
    expect(txMock.pendingReviewImage.upsert).toHaveBeenCalledOnce();
    expect(txMock.pendingReviewImage.upsert).toHaveBeenCalledWith(expect.objectContaining({
      create: expect.objectContaining({ metadataSource: 'mux_webhook' }),
      update: expect.objectContaining({ metadataSource: 'mux_webhook' }),
    }));
  });
});
