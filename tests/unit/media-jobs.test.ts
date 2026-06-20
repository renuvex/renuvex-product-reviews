import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  MEDIA_JOB_ACTIONS,
  VIDEO_ASSET_RECONCILE_OFFSETS_MS,
} from '@/lib/media/constants';

const prismaMock = vi.hoisted(() => ({
  $queryRaw: vi.fn(),
  $executeRaw: vi.fn(),
  $transaction: vi.fn(),
  mediaProviderJob: {
    updateMany: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    upsert: vi.fn(),
  },
  review: {
    findUnique: vi.fn(),
    update: vi.fn(),
  },
  reviewMedia: {
    findUnique: vi.fn(),
    updateMany: vi.fn(),
  },
  videoUploadSession: {
    findUnique: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
  },
  storeVideoUsage: {
    updateMany: vi.fn(),
  },
  pendingReviewImage: {
    deleteMany: vi.fn(),
    upsert: vi.fn(),
  },
}));
const cloudinaryMock = vi.hoisted(() => ({
  deleteCloudinaryReviewImages: vi.fn(),
}));
const muxMock = vi.hoisted(() => {
  class TestMuxProviderError extends Error {
    constructor(public readonly code: string, message = code, public readonly status?: number) {
      super(message);
      this.name = 'MuxProviderError';
    }
  }
  return {
    buildMuxPlaybackUrl: (playbackId: string) => `https://stream.mux.com/${playbackId}.m3u8`,
    buildMuxPosterUrl: (playbackId: string) => `https://image.mux.com/${playbackId}/thumbnail.jpg`,
    cancelMuxUpload: vi.fn(),
    createMuxPlaybackId: vi.fn(),
    deleteMuxAsset: vi.fn(),
    deleteMuxPlaybackId: vi.fn(),
    getMuxAsset: vi.fn(),
    getMuxUpload: vi.fn(),
    isMuxNotFound: vi.fn((error: unknown) => (error as { status?: number })?.status === 404),
    listMuxPlaybackIds: vi.fn(),
    MuxProviderError: TestMuxProviderError,
  };
});
const qstashMock = vi.hoisted(() => ({ publishJSON: vi.fn() }));
const processingMock = vi.hoisted(() => ({ applyMuxAssetState: vi.fn() }));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/media/providers/cloudinary-image', () => cloudinaryMock);
vi.mock('@/lib/media/providers/mux', () => muxMock);
vi.mock('@/lib/media/video-processing', () => processingMock);
vi.mock('@/lib/review-summary', () => ({ applyReviewSummaryVisibilityChange: vi.fn() }));
vi.mock('@upstash/qstash', () => ({
  Client: class {
    publishJSON(input: unknown) {
      return qstashMock.publishJSON(input);
    }
  },
}));
vi.mock('@/lib/media/config', () => ({
  getMediaJobEndpoint: () => 'https://app.test/api/internal/media-jobs',
  getQStashMediaConfig: () => ({ token: 'qstash-token' }),
  MediaConfigError: class MediaConfigError extends Error {},
}));
vi.mock('@sentry/nextjs', () => ({ captureException: vi.fn() }));

const UUID_1 = '11111111-1111-4111-8111-111111111111';
const UUID_2 = '22222222-2222-4222-8222-222222222222';

function muxSession(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_1,
    storeId: 'store-1',
    productId: 'product-1',
    status: 'processing',
    quotaState: 'reserved',
    reservedMonth: new Date('2026-06-01T00:00:00.000Z'),
    expiresAt: new Date(Date.now() + 60_000),
    mimeType: 'video/mp4',
    bytes: 1024,
    provider: 'mux',
    providerUploadId: 'upload-1',
    providerAssetId: 'asset-1',
    publicId: 'mux:asset-1',
    ...overrides,
  };
}

describe('media provider jobs', () => {
  beforeEach(() => {
    vi.useRealTimers();
    vi.resetModules();
    vi.clearAllMocks();
    prismaMock.mediaProviderJob.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.mediaProviderJob.update.mockResolvedValue({});
    prismaMock.mediaProviderJob.upsert.mockResolvedValue({
      id: 'provider-job',
      status: 'pending',
      availableAt: new Date(Date.now() + 10_000),
    });
    prismaMock.pendingReviewImage.deleteMany.mockResolvedValue({ count: 2 });
    prismaMock.pendingReviewImage.upsert.mockResolvedValue({});
    prismaMock.videoUploadSession.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.videoUploadSession.update.mockResolvedValue(muxSession({ status: 'failed', quotaState: 'released' }));
    prismaMock.storeVideoUsage.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.$executeRaw.mockResolvedValue(1);
    prismaMock.$transaction.mockImplementation(async (callback) => callback(prismaMock));
    qstashMock.publishJSON.mockResolvedValue({ messageId: 'message-1' });
    cloudinaryMock.deleteCloudinaryReviewImages.mockResolvedValue(['image-a', 'image-b']);
    muxMock.cancelMuxUpload.mockResolvedValue(undefined);
    muxMock.createMuxPlaybackId.mockResolvedValue({ id: 'public-1', policy: 'public' });
    muxMock.deleteMuxAsset.mockResolvedValue(undefined);
    muxMock.deleteMuxPlaybackId.mockResolvedValue(undefined);
    muxMock.getMuxAsset.mockResolvedValue({ id: 'asset-1', status: 'preparing', playback_ids: [{ id: 'signed-1', policy: 'signed' }] });
    muxMock.getMuxUpload.mockResolvedValue({ id: 'upload-1', status: 'asset_created', asset_id: 'asset-1' });
    muxMock.listMuxPlaybackIds.mockResolvedValue([]);
    processingMock.applyMuxAssetState.mockResolvedValue({ ok: true, status: 'processing' });
  });

  it('claims stale processing jobs and cleans Cloudinary images through the outbox', async () => {
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'job-1',
      provider: 'cloudinary',
      action: MEDIA_JOB_ACTIONS.cleanupImage,
      payload: { publicIds: ['image-a', 'image-b'] },
      attempts: 1,
      maxAttempts: 8,
    });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('job-1');

    expect(result).toEqual({ processed: true, status: 'succeeded' });
    expect(prismaMock.mediaProviderJob.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        OR: expect.arrayContaining([
          expect.objectContaining({ status: 'processing', lockedAt: expect.objectContaining({ lt: expect.any(Date) }) }),
          expect.objectContaining({ status: 'processing', lockedAt: null }),
        ]),
      }),
    }));
    expect(cloudinaryMock.deleteCloudinaryReviewImages).toHaveBeenCalledWith(['image-a', 'image-b']);
    expect(prismaMock.pendingReviewImage.deleteMany).toHaveBeenCalledWith({
      where: { publicId: { in: ['image-a', 'image-b'] }, provider: 'cloudinary' },
    });
  });

  it('serializes provider mutations and converges a stale approval to the latest protected state', async () => {
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'publish-job',
      provider: 'mux',
      action: MEDIA_JOB_ACTIONS.publishVideo,
      payload: {
        reviewId: UUID_1,
        mediaId: UUID_2,
        providerAssetId: 'asset-1',
        moderationVersion: 3,
      },
      attempts: 1,
      maxAttempts: 8,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.review.findUnique.mockResolvedValue({ status: 'rejected', moderationVersion: 4 });
    prismaMock.reviewMedia.findUnique.mockResolvedValue({
      providerAssetId: 'asset-1',
      processingStatus: 'ready',
      visible: false,
      review: { status: 'rejected' },
    });
    muxMock.listMuxPlaybackIds.mockResolvedValue([
      { id: 'signed-1', policy: 'signed' },
      { id: 'public-1', policy: 'public' },
    ]);
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('publish-job');

    expect(result).toEqual({ processed: true, status: 'superseded' });
    expect(muxMock.deleteMuxPlaybackId).toHaveBeenCalledWith('asset-1', 'public-1');
    expect(prismaMock.$executeRaw).toHaveBeenCalledOnce();
  });

  it('repairs provider visibility when moderation changes during an approval call', async () => {
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'publish-job',
      provider: 'mux',
      action: MEDIA_JOB_ACTIONS.publishVideo,
      payload: {
        reviewId: UUID_1,
        mediaId: UUID_2,
        providerAssetId: 'asset-1',
        moderationVersion: 3,
      },
      attempts: 1,
      maxAttempts: 8,
    });
    prismaMock.$queryRaw
      .mockResolvedValueOnce([{ leaseVersion: 1 }])
      .mockResolvedValueOnce([{ owned: true }]);
    prismaMock.review.findUnique
      .mockResolvedValueOnce({ status: 'pending', moderationVersion: 3 })
      .mockResolvedValueOnce({ status: 'rejected', moderationVersion: 4 });
    prismaMock.reviewMedia.findUnique.mockResolvedValue({
      providerAssetId: 'asset-1',
      processingStatus: 'ready',
      visible: false,
      review: { status: 'rejected' },
    });
    muxMock.listMuxPlaybackIds
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: 'public-1', policy: 'public' }])
      .mockResolvedValueOnce([{ id: 'public-1', policy: 'public' }]);
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('publish-job');

    expect(result).toEqual({ processed: true, status: 'superseded' });
    expect(muxMock.createMuxPlaybackId).toHaveBeenCalledWith('asset-1', 'public');
    expect(muxMock.deleteMuxPlaybackId).toHaveBeenCalledWith('asset-1', 'public-1');
    expect(prismaMock.review.update).not.toHaveBeenCalled();
  });

  it('defers a job without calling the provider while another worker owns the asset lease', async () => {
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'protect-job',
      provider: 'mux',
      action: MEDIA_JOB_ACTIONS.protectVideo,
      payload: {
        reviewId: UUID_1,
        mediaId: UUID_2,
        providerAssetId: 'asset-1',
        moderationVersion: 4,
      },
      attempts: 1,
      maxAttempts: 8,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([]);
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('protect-job');

    expect(result).toEqual({ processed: false, reason: 'asset_busy' });
    expect(muxMock.deleteMuxPlaybackId).not.toHaveBeenCalled();
    expect(prismaMock.mediaProviderJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'pending', attempts: { decrement: 1 } }),
    }));
  });

  it('records session failure and its cleanup outbox job in one transaction', async () => {
    const current = muxSession({ status: 'processing', providerUploadId: 'upload-1', providerAssetId: 'asset-1' });
    prismaMock.$queryRaw.mockResolvedValueOnce([current]);
    prismaMock.videoUploadSession.update.mockResolvedValue({ ...current, status: 'failed', quotaState: 'released' });
    const { failSessionAndQueueCleanup } = await import('@/lib/media/jobs');

    const result = await failSessionAndQueueCleanup(current.id, 'provider_failed');

    expect(result).toEqual(expect.objectContaining({ id: 'provider-job' }));
    expect(prismaMock.$transaction).toHaveBeenCalledOnce();
    expect(prismaMock.videoUploadSession.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'failed', errorCode: 'provider_failed' }),
    }));
    expect(prismaMock.mediaProviderJob.upsert).toHaveBeenCalledWith(expect.objectContaining({
      create: expect.objectContaining({
        action: MEDIA_JOB_ACTIONS.cleanupVideo,
        payload: expect.objectContaining({ providerUploadId: 'upload-1', providerAssetId: 'asset-1' }),
      }),
    }));
    expect(qstashMock.publishJSON).toHaveBeenCalledWith(expect.objectContaining({ body: { jobId: 'provider-job' } }));
  });

  it('defers resolve work while Mux has not attached an asset to the upload', async () => {
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'resolve-job',
      provider: 'mux',
      action: MEDIA_JOB_ACTIONS.resolveVideoAsset,
      payload: { sessionId: UUID_1, providerUploadId: 'upload-1' },
      attempts: 1,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.videoUploadSession.findUnique.mockResolvedValue(muxSession({ status: 'uploaded', providerAssetId: null }));
    muxMock.getMuxUpload.mockResolvedValue({ id: 'upload-1', status: 'waiting', asset_id: null });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('resolve-job');

    expect(result).toEqual({ processed: true, status: 'deferred' });
    expect(prismaMock.mediaProviderJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        status: 'pending',
        attempts: { decrement: 1 },
        payload: { sessionId: UUID_1, providerUploadId: 'upload-1' },
      }),
    }));
    expect(qstashMock.publishJSON).toHaveBeenCalledWith(expect.objectContaining({ delay: 5 }));
  });

  it('claims a created Mux asset and redispatches the durable reconciliation job', async () => {
    const current = muxSession({ status: 'uploaded', providerAssetId: null, publicId: null });
    const processing = muxSession({ status: 'processing' });
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'resolve-job',
      provider: 'mux',
      action: MEDIA_JOB_ACTIONS.resolveVideoAsset,
      payload: { sessionId: UUID_1, providerUploadId: 'upload-1' },
      attempts: 1,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.videoUploadSession.findUnique
      .mockResolvedValueOnce(current)
      .mockResolvedValueOnce(processing);
    muxMock.getMuxUpload.mockResolvedValue({ id: 'upload-1', status: 'asset_created', asset_id: 'asset-1' });
    processingMock.applyMuxAssetState.mockResolvedValue({ ok: true, status: 'processing' });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('resolve-job');

    expect(result).toEqual({ processed: true, status: 'succeeded' });
    expect(prismaMock.videoUploadSession.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        status: 'processing',
        provider: 'mux',
        providerUploadId: 'upload-1',
        providerAssetId: 'asset-1',
        publicId: 'mux:asset-1',
      }),
    }));
    expect(prismaMock.pendingReviewImage.upsert).toHaveBeenCalledWith(expect.objectContaining({
      create: expect.objectContaining({
        publicId: 'mux:asset-1',
        provider: 'mux',
        providerAssetId: 'asset-1',
        sourceProvider: null,
        sourceAssetId: null,
      }),
    }));
    expect(processingMock.applyMuxAssetState).toHaveBeenCalledWith(
      processing,
      expect.objectContaining({ id: 'asset-1' }),
      'mux_complete_poll',
    );
    expect(qstashMock.publishJSON).toHaveBeenCalledWith(expect.objectContaining({
      body: { jobId: 'provider-job' },
      delay: expect.any(Number),
    }));
  });

  it('recovers a processing session when the Mux asset-ready webhook is missed', async () => {
    const startedAt = new Date('2026-06-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(new Date(startedAt.getTime() + 10_000));
    const current = muxSession({ status: 'processing' });
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'reconcile-job',
      provider: 'mux',
      action: MEDIA_JOB_ACTIONS.reconcileVideo,
      payload: {
        sessionId: UUID_1,
        providerUploadId: 'upload-1',
        providerAssetId: 'asset-1',
        startedAt: startedAt.toISOString(),
        checkIndex: 0,
      },
      attempts: 1,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.videoUploadSession.findUnique.mockResolvedValue(current);
    const asset = { id: 'asset-1', status: 'ready', playback_ids: [{ id: 'signed-1', policy: 'signed' }] };
    muxMock.getMuxAsset.mockResolvedValue(asset);
    processingMock.applyMuxAssetState.mockResolvedValue({ ok: true, status: 'ready' });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('reconcile-job');

    expect(result).toEqual({ processed: true, status: 'succeeded' });
    expect(processingMock.applyMuxAssetState).toHaveBeenCalledWith(current, asset, 'mux_reconcile');
    expect(prismaMock.mediaProviderJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        status: 'succeeded',
        payload: expect.objectContaining({ outcome: 'ready', providerAssetId: 'asset-1' }),
      }),
    }));
  });

  it('uses the bounded ten-check schedule and records delayed processing without deleting the asset', async () => {
    expect(VIDEO_ASSET_RECONCILE_OFFSETS_MS).toEqual([
      10_000,
      20_000,
      30_000,
      45_000,
      60_000,
      90_000,
      120_000,
      180_000,
      300_000,
      600_000,
    ]);
    const startedAt = new Date('2026-06-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(new Date(startedAt.getTime() + 600_000));
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'reconcile-job',
      provider: 'mux',
      action: MEDIA_JOB_ACTIONS.reconcileVideo,
      payload: {
        sessionId: UUID_1,
        providerUploadId: 'upload-1',
        providerAssetId: 'asset-1',
        startedAt: startedAt.toISOString(),
        checkIndex: 9,
      },
      attempts: 1,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.videoUploadSession.findUnique.mockResolvedValue(muxSession({ status: 'processing' }));
    muxMock.getMuxAsset.mockResolvedValue({ id: 'asset-1', status: 'preparing' });
    processingMock.applyMuxAssetState.mockResolvedValue({ ok: true, status: 'processing' });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('reconcile-job');

    expect(result).toEqual({ processed: true, status: 'succeeded' });
    expect(qstashMock.publishJSON).not.toHaveBeenCalled();
    expect(muxMock.deleteMuxAsset).not.toHaveBeenCalled();
    expect(prismaMock.mediaProviderJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        status: 'succeeded',
        payload: expect.objectContaining({
          checkIndex: 9,
          outcome: 'mux_processing_delayed',
        }),
      }),
    }));
  });

  it('expires an abandoned reserved upload through the transactional cleanup path', async () => {
    const expired = muxSession({
      status: 'uploading',
      expiresAt: new Date(Date.now() - 1_000),
      providerAssetId: null,
      publicId: null,
    });
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'expiry-job',
      provider: 'internal',
      action: MEDIA_JOB_ACTIONS.expireUploadSession,
      payload: { sessionId: expired.id, expiresAt: expired.expiresAt.toISOString() },
      attempts: 1,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw
      .mockResolvedValueOnce([{ leaseVersion: 1 }])
      .mockResolvedValueOnce([expired]);
    prismaMock.videoUploadSession.findUnique.mockResolvedValue(expired);
    prismaMock.videoUploadSession.update.mockResolvedValue({ ...expired, status: 'failed', quotaState: 'released' });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('expiry-job');

    expect(result).toEqual({ processed: true, status: 'succeeded' });
    expect(prismaMock.storeVideoUsage.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: { reservedCount: { decrement: 1 } },
    }));
    expect(prismaMock.mediaProviderJob.upsert).toHaveBeenCalledWith(expect.objectContaining({
      create: expect.objectContaining({
        action: MEDIA_JOB_ACTIONS.cleanupVideo,
        payload: expect.objectContaining({ sessionId: expired.id, providerUploadId: 'upload-1' }),
      }),
    }));
  });

  it('defers an upload expiry delivery that arrives before the authoritative session deadline', async () => {
    const now = new Date('2026-06-15T12:00:00.000Z');
    const expiresAt = new Date(now.getTime() + 60_000);
    vi.useFakeTimers();
    vi.setSystemTime(now);
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'expiry-job',
      provider: 'internal',
      action: MEDIA_JOB_ACTIONS.expireUploadSession,
      payload: {
        sessionId: UUID_1,
        expiresAt: expiresAt.toISOString(),
      },
      attempts: 1,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.videoUploadSession.findUnique.mockResolvedValue(muxSession({ status: 'uploading', expiresAt }));
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('expiry-job');

    expect(result).toEqual({ processed: true, status: 'deferred' });
    expect(qstashMock.publishJSON).toHaveBeenCalledWith(expect.objectContaining({ delay: 60 }));
    expect(prismaMock.videoUploadSession.update).not.toHaveBeenCalled();
  });

  it('cleans an expired ready-but-unsubmitted video without refunding consumed quota', async () => {
    const expired = muxSession({
      status: 'ready',
      quotaState: 'consumed',
      expiresAt: new Date(Date.now() - 1_000),
      publicId: 'mux:asset-1',
    });
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'expiry-job',
      provider: 'internal',
      action: MEDIA_JOB_ACTIONS.expireUploadSession,
      payload: { sessionId: expired.id, expiresAt: expired.expiresAt.toISOString() },
      attempts: 1,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw
      .mockResolvedValueOnce([{ leaseVersion: 1 }])
      .mockResolvedValueOnce([expired]);
    prismaMock.videoUploadSession.findUnique.mockResolvedValue(expired);
    prismaMock.videoUploadSession.update.mockResolvedValue({ ...expired, status: 'failed' });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('expiry-job');

    expect(result).toEqual({ processed: true, status: 'succeeded' });
    expect(prismaMock.storeVideoUsage.updateMany).not.toHaveBeenCalled();
    expect(prismaMock.mediaProviderJob.upsert).toHaveBeenCalledWith(expect.objectContaining({
      create: expect.objectContaining({
        action: MEDIA_JOB_ACTIONS.cleanupVideo,
        payload: expect.objectContaining({ providerUploadId: 'upload-1', providerAssetId: 'asset-1', pendingPublicId: 'mux:asset-1' }),
      }),
    }));
  });

  it('never expires a review-consumed upload session', async () => {
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'expiry-job',
      provider: 'internal',
      action: MEDIA_JOB_ACTIONS.expireUploadSession,
      payload: {
        sessionId: UUID_1,
        expiresAt: new Date(Date.now() - 1_000).toISOString(),
      },
      attempts: 1,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.videoUploadSession.findUnique.mockResolvedValue(muxSession({
      status: 'consumed',
      expiresAt: new Date(Date.now() - 1_000),
    }));
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('expiry-job');

    expect(result).toEqual({ processed: true, status: 'superseded' });
    expect(prismaMock.mediaProviderJob.upsert).not.toHaveBeenCalled();
    expect(prismaMock.videoUploadSession.update).not.toHaveBeenCalled();
  });
});
