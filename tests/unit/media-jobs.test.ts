import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  MEDIA_JOB_ACTIONS,
  VIDEO_STREAM_RECONCILE_OFFSETS_MS,
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
  },
}));
const cloudinaryMock = vi.hoisted(() => ({
  deleteCloudinaryReviewImages: vi.fn(),
}));
const streamMock = vi.hoisted(() => ({
  createStreamVideoFromUrl: vi.fn(),
  deleteStreamVideo: vi.fn(),
  findStreamVideoByCreator: vi.fn(),
  getStreamVideo: vi.fn(),
  setStreamVideoPublic: vi.fn(),
}));
const qstashMock = vi.hoisted(() => ({ publishJSON: vi.fn() }));
const processingMock = vi.hoisted(() => ({ applyStreamVideoState: vi.fn() }));
const r2Mock = vi.hoisted(() => ({
  abortVideoMultipartUpload: vi.fn(),
  copyVideoMasterToIngest: vi.fn(),
  deleteVideoIngest: vi.fn(),
  deleteVideoMaster: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/media/providers/cloudinary-image', () => cloudinaryMock);
vi.mock('@/lib/media/providers/cloudflare-stream', () => streamMock);
vi.mock('@/lib/media/providers/r2', () => r2Mock);
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

describe('media provider jobs', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    prismaMock.mediaProviderJob.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.mediaProviderJob.update.mockResolvedValue({});
    prismaMock.mediaProviderJob.upsert.mockResolvedValue({ id: 'cleanup-job' });
    prismaMock.pendingReviewImage.deleteMany.mockResolvedValue({ count: 2 });
    prismaMock.$executeRaw.mockResolvedValue(1);
    prismaMock.$transaction.mockImplementation(async (callback) => callback(prismaMock));
    qstashMock.publishJSON.mockResolvedValue({ messageId: 'message-1' });
    cloudinaryMock.deleteCloudinaryReviewImages.mockResolvedValue(['image-a', 'image-b']);
    processingMock.applyStreamVideoState.mockResolvedValue({ ok: true, status: 'processing' });
    r2Mock.deleteVideoIngest.mockResolvedValue(undefined);
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
      provider: 'cloudflare_stream',
      action: MEDIA_JOB_ACTIONS.publishStream,
      payload: {
        reviewId: '11111111-1111-4111-8111-111111111111',
        mediaId: '22222222-2222-4222-8222-222222222222',
        streamUid: 'stream-1',
        moderationVersion: 3,
      },
      attempts: 1,
      maxAttempts: 8,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.review.findUnique.mockResolvedValue({ status: 'rejected', moderationVersion: 4 });
    prismaMock.reviewMedia.findUnique.mockResolvedValue({
      providerAssetId: 'stream-1',
      processingStatus: 'ready',
      visible: false,
      review: { status: 'rejected' },
    });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('publish-job');

    expect(result).toEqual({ processed: true, status: 'superseded' });
    expect(streamMock.setStreamVideoPublic).toHaveBeenCalledTimes(1);
    expect(streamMock.setStreamVideoPublic).toHaveBeenCalledWith('stream-1', false);
    expect(prismaMock.$executeRaw).toHaveBeenCalledOnce();
  });

  it('repairs provider visibility when moderation changes during an approval call', async () => {
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'publish-job',
      provider: 'cloudflare_stream',
      action: MEDIA_JOB_ACTIONS.publishStream,
      payload: {
        reviewId: '11111111-1111-4111-8111-111111111111',
        mediaId: '22222222-2222-4222-8222-222222222222',
        streamUid: 'stream-1',
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
      providerAssetId: 'stream-1',
      processingStatus: 'ready',
      visible: false,
      review: { status: 'rejected' },
    });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('publish-job');

    expect(result).toEqual({ processed: true, status: 'superseded' });
    expect(streamMock.setStreamVideoPublic.mock.calls).toEqual([
      ['stream-1', true],
      ['stream-1', false],
    ]);
    expect(prismaMock.review.update).not.toHaveBeenCalled();
  });

  it('defers a job without calling the provider while another worker owns the asset lease', async () => {
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'protect-job',
      provider: 'cloudflare_stream',
      action: MEDIA_JOB_ACTIONS.protectStream,
      payload: {
        reviewId: '11111111-1111-4111-8111-111111111111',
        mediaId: '22222222-2222-4222-8222-222222222222',
        streamUid: 'stream-1',
        moderationVersion: 4,
      },
      attempts: 1,
      maxAttempts: 8,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([]);
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('protect-job');

    expect(result).toEqual({ processed: false, reason: 'asset_busy' });
    expect(streamMock.setStreamVideoPublic).not.toHaveBeenCalled();
    expect(prismaMock.mediaProviderJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'pending', attempts: { decrement: 1 } }),
    }));
  });

  it('records session failure and its cleanup outbox job in one transaction', async () => {
    const current = {
      id: '11111111-1111-4111-8111-111111111111',
      storeId: 'store-1',
      productId: 'product-1',
      status: 'processing',
      quotaState: 'reserved',
      reservedMonth: new Date('2026-06-01T00:00:00.000Z'),
      r2UploadId: 'upload-1',
      masterObjectKey: 'master-1',
      ingestObjectKey: 'ingest-1',
      streamUid: 'stream-1',
      publicId: 'cloudflare_stream:stream-1',
    };
    prismaMock.$queryRaw.mockResolvedValueOnce([current]);
    prismaMock.videoUploadSession.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.storeVideoUsage.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.videoUploadSession.update.mockResolvedValue({ ...current, status: 'failed', quotaState: 'released' });
    const { failSessionAndQueueCleanup } = await import('@/lib/media/jobs');

    const result = await failSessionAndQueueCleanup(current.id, 'provider_failed');

    expect(result).toEqual({ id: 'cleanup-job' });
    expect(prismaMock.$transaction).toHaveBeenCalledOnce();
    expect(prismaMock.videoUploadSession.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'failed', errorCode: 'provider_failed' }),
    }));
    expect(prismaMock.mediaProviderJob.upsert).toHaveBeenCalledWith(expect.objectContaining({
      create: expect.objectContaining({
        action: MEDIA_JOB_ACTIONS.cleanupVideo,
        payload: expect.objectContaining({ r2UploadId: 'upload-1', streamUid: 'stream-1' }),
      }),
    }));
    expect(prismaMock.videoUploadSession.update.mock.invocationCallOrder[0])
      .toBeLessThan(prismaMock.mediaProviderJob.upsert.mock.invocationCallOrder[0]);
  });

  it('keeps a public ingest object while Stream is still fetching and schedules a state-aware recheck', async () => {
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'ingest-job',
      provider: 'cloudflare_r2',
      action: MEDIA_JOB_ACTIONS.cleanupIngest,
      payload: {
        sessionId: '11111111-1111-4111-8111-111111111111',
        ingestObjectKey: 'public-ingest/video.mp4',
        hardDeleteAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      },
      attempts: 1,
      maxAttempts: 64,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.videoUploadSession.findUnique.mockResolvedValue({
      id: '11111111-1111-4111-8111-111111111111',
      status: 'processing',
      streamUid: 'stream-1',
      ingestObjectKey: 'public-ingest/video.mp4',
    });
    streamMock.getStreamVideo.mockResolvedValue({
      uid: 'stream-1',
      readyToStream: false,
      status: { state: 'downloading' },
    });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('ingest-job');

    expect(result).toEqual({ processed: true, status: 'deferred' });
    expect(qstashMock.publishJSON).toHaveBeenCalledWith(expect.objectContaining({ delay: 30 * 60 }));
    expect(prismaMock.mediaProviderJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'pending', attempts: { decrement: 1 } }),
    }));
  });

  it('applies a ready Stream state from the ingest cleanup backstop before deleting the public copy', async () => {
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'ingest-job',
      provider: 'cloudflare_r2',
      action: MEDIA_JOB_ACTIONS.cleanupIngest,
      payload: {
        sessionId: '11111111-1111-4111-8111-111111111111',
        ingestObjectKey: 'public-ingest/video.mp4',
        hardDeleteAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      },
      attempts: 1,
      maxAttempts: 64,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    const current = {
      id: '11111111-1111-4111-8111-111111111111',
      status: 'processing',
      streamUid: 'stream-1',
      ingestObjectKey: 'public-ingest/video.mp4',
    };
    const canonical = {
      uid: 'stream-1',
      readyToStream: true,
      status: { state: 'ready', pctComplete: 100 },
    };
    prismaMock.videoUploadSession.findUnique.mockResolvedValue(current);
    prismaMock.videoUploadSession.updateMany.mockResolvedValue({ count: 1 });
    streamMock.getStreamVideo.mockResolvedValue(canonical);
    processingMock.applyStreamVideoState.mockResolvedValue({ ok: true, status: 'ready' });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('ingest-job');

    expect(result).toEqual({ processed: true, status: 'succeeded' });
    expect(processingMock.applyStreamVideoState).toHaveBeenCalledWith(
      current,
      canonical,
      'stream_ingest_cleanup',
    );
    expect(r2Mock.deleteVideoIngest).toHaveBeenCalledWith('public-ingest/video.mp4');
    expect(prismaMock.videoUploadSession.updateMany).toHaveBeenCalledWith({
      where: {
        id: current.id,
        ingestObjectKey: 'public-ingest/video.mp4',
      },
      data: { ingestObjectKey: null },
    });
  });

  it('redispatches the durable reconciliation job when prepare retries after the Stream uid was persisted', async () => {
    const availableAt = new Date(Date.now() + 10_000);
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'prepare-job',
      provider: 'cloudflare_stream',
      action: MEDIA_JOB_ACTIONS.prepareStream,
      payload: { sessionId: '11111111-1111-4111-8111-111111111111' },
      attempts: 2,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.videoUploadSession.findUnique.mockResolvedValue({
      id: '11111111-1111-4111-8111-111111111111',
      storeId: 'store-1',
      status: 'processing',
      streamUid: 'stream-1',
    });
    prismaMock.mediaProviderJob.upsert.mockResolvedValue({
      id: 'reconcile-job',
      status: 'pending',
      availableAt,
    });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('prepare-job');

    expect(result).toEqual({ processed: true, status: 'succeeded' });
    expect(prismaMock.mediaProviderJob.upsert).toHaveBeenCalledWith(expect.objectContaining({
      where: { dedupeKey: 'reconcile-stream:11111111-1111-4111-8111-111111111111' },
    }));
    expect(qstashMock.publishJSON).toHaveBeenCalledWith(expect.objectContaining({
      body: { jobId: 'reconcile-job' },
      delay: expect.any(Number),
    }));
    expect(streamMock.createStreamVideoFromUrl).not.toHaveBeenCalled();
  });

  it('recovers a processing session when the webhook is missed', async () => {
    const startedAt = new Date('2026-06-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(new Date(startedAt.getTime() + 10_000));
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'reconcile-job',
      provider: 'cloudflare_stream',
      action: MEDIA_JOB_ACTIONS.reconcileStream,
      payload: {
        sessionId: '11111111-1111-4111-8111-111111111111',
        streamUid: 'stream-1',
        startedAt: startedAt.toISOString(),
        checkIndex: 0,
      },
      attempts: 1,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    const current = {
      id: '11111111-1111-4111-8111-111111111111',
      status: 'processing',
      streamUid: 'stream-1',
    };
    prismaMock.videoUploadSession.findUnique.mockResolvedValue(current);
    const canonical = { uid: 'stream-1', readyToStream: true, status: { state: 'ready', pctComplete: 100 } };
    streamMock.getStreamVideo.mockResolvedValue(canonical);
    processingMock.applyStreamVideoState.mockResolvedValue({ ok: true, status: 'ready' });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('reconcile-job');

    expect(result).toEqual({ processed: true, status: 'succeeded' });
    expect(processingMock.applyStreamVideoState).toHaveBeenCalledWith(
      current,
      canonical,
      'stream_reconcile',
    );
    expect(prismaMock.mediaProviderJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        status: 'succeeded',
        payload: expect.objectContaining({ outcome: 'ready' }),
      }),
    }));
    vi.useRealTimers();
  });

  it('uses the bounded ten-check schedule and records delayed processing without deleting the video', async () => {
    expect(VIDEO_STREAM_RECONCILE_OFFSETS_MS).toEqual([
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
      provider: 'cloudflare_stream',
      action: MEDIA_JOB_ACTIONS.reconcileStream,
      payload: {
        sessionId: '11111111-1111-4111-8111-111111111111',
        streamUid: 'stream-1',
        startedAt: startedAt.toISOString(),
        checkIndex: 9,
      },
      attempts: 1,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.videoUploadSession.findUnique.mockResolvedValue({
      id: '11111111-1111-4111-8111-111111111111',
      status: 'processing',
      streamUid: 'stream-1',
    });
    streamMock.getStreamVideo.mockResolvedValue({
      uid: 'stream-1',
      readyToStream: false,
      status: { state: 'inprogress', pctComplete: 80 },
    });
    processingMock.applyStreamVideoState.mockResolvedValue({ ok: true, status: 'processing' });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('reconcile-job');

    expect(result).toEqual({ processed: true, status: 'succeeded' });
    expect(qstashMock.publishJSON).not.toHaveBeenCalled();
    expect(prismaMock.mediaProviderJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        status: 'succeeded',
        payload: expect.objectContaining({
          checkIndex: 9,
          outcome: 'stream_processing_delayed',
        }),
      }),
    }));
    vi.useRealTimers();
  });

  it('expires an abandoned reserved upload through the transactional cleanup path', async () => {
    const expired = {
      id: '11111111-1111-4111-8111-111111111111',
      storeId: 'store-1',
      productId: 'product-1',
      status: 'uploading',
      quotaState: 'reserved',
      reservedMonth: new Date('2026-06-01T00:00:00.000Z'),
      expiresAt: new Date(Date.now() - 1_000),
      r2UploadId: 'upload-1',
      masterObjectKey: 'master-1',
      ingestObjectKey: null,
      streamUid: null,
      publicId: null,
    };
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
    prismaMock.videoUploadSession.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.storeVideoUsage.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.videoUploadSession.update.mockResolvedValue({ ...expired, status: 'failed', quotaState: 'released' });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('expiry-job');

    expect(result).toEqual({ processed: true, status: 'succeeded' });
    expect(prismaMock.storeVideoUsage.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: { reservedCount: { decrement: 1 } },
    }));
    expect(prismaMock.mediaProviderJob.upsert).toHaveBeenCalledWith(expect.objectContaining({
      create: expect.objectContaining({ action: MEDIA_JOB_ACTIONS.cleanupVideo }),
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
        sessionId: '11111111-1111-4111-8111-111111111111',
        expiresAt: expiresAt.toISOString(),
      },
      attempts: 1,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.videoUploadSession.findUnique.mockResolvedValue({
      id: '11111111-1111-4111-8111-111111111111',
      status: 'uploading',
      expiresAt,
    });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('expiry-job');

    expect(result).toEqual({ processed: true, status: 'deferred' });
    expect(qstashMock.publishJSON).toHaveBeenCalledWith(expect.objectContaining({ delay: 60 }));
    expect(prismaMock.videoUploadSession.update).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('cleans an expired ready-but-unsubmitted video without refunding consumed quota', async () => {
    const expired = {
      id: '11111111-1111-4111-8111-111111111111',
      storeId: 'store-1',
      productId: 'product-1',
      status: 'ready',
      quotaState: 'consumed',
      reservedMonth: new Date('2026-06-01T00:00:00.000Z'),
      expiresAt: new Date(Date.now() - 1_000),
      r2UploadId: 'upload-1',
      masterObjectKey: 'master-1',
      ingestObjectKey: null,
      streamUid: 'stream-1',
      publicId: 'cloudflare_stream:stream-1',
    };
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
        payload: expect.objectContaining({ streamUid: 'stream-1', masterObjectKey: 'master-1' }),
      }),
    }));
  });

  it('never expires a review-consumed upload session', async () => {
    prismaMock.mediaProviderJob.findUnique.mockResolvedValue({
      id: 'expiry-job',
      provider: 'internal',
      action: MEDIA_JOB_ACTIONS.expireUploadSession,
      payload: {
        sessionId: '11111111-1111-4111-8111-111111111111',
        expiresAt: new Date(Date.now() - 1_000).toISOString(),
      },
      attempts: 1,
      maxAttempts: 16,
    });
    prismaMock.$queryRaw.mockResolvedValueOnce([{ leaseVersion: 1 }]);
    prismaMock.videoUploadSession.findUnique.mockResolvedValue({
      id: '11111111-1111-4111-8111-111111111111',
      status: 'consumed',
      expiresAt: new Date(Date.now() - 1_000),
    });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('expiry-job');

    expect(result).toEqual({ processed: true, status: 'superseded' });
    expect(prismaMock.mediaProviderJob.upsert).not.toHaveBeenCalled();
    expect(prismaMock.videoUploadSession.update).not.toHaveBeenCalled();
  });
});
