import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MEDIA_JOB_ACTIONS } from '@/lib/media/constants';

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

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/media/providers/cloudinary-image', () => cloudinaryMock);
vi.mock('@/lib/media/providers/cloudflare-stream', () => streamMock);
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
    streamMock.getStreamVideo.mockResolvedValue({ readyToStream: false, status: { state: 'downloading' } });
    const { processMediaProviderJob } = await import('@/lib/media/jobs');

    const result = await processMediaProviderJob('ingest-job');

    expect(result).toEqual({ processed: true, status: 'deferred' });
    expect(qstashMock.publishJSON).toHaveBeenCalledWith(expect.objectContaining({ delay: 30 * 60 }));
    expect(prismaMock.mediaProviderJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'pending', attempts: { decrement: 1 } }),
    }));
  });
});
