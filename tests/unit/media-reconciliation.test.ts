import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  $transaction: vi.fn(),
  mediaProviderJob: {
    findMany: vi.fn(),
    upsert: vi.fn(),
  },
  videoUploadSession: {
    findMany: vi.fn(),
  },
}));
const jobsMock = vi.hoisted(() => ({
  dispatchMediaProviderJob: vi.fn(),
}));
const streamMock = vi.hoisted(() => ({ getStreamVideo: vi.fn() }));
const processingMock = vi.hoisted(() => ({ applyStreamVideoState: vi.fn() }));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/media/jobs', () => jobsMock);
vi.mock('@/lib/media/providers/cloudflare-stream', () => streamMock);
vi.mock('@/lib/media/video-processing', () => processingMock);

describe('media reconciliation', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    prismaMock.mediaProviderJob.findMany.mockResolvedValue([{ id: 'job-stale' }]);
    prismaMock.$transaction.mockImplementation(async (callback) => callback(prismaMock));
    jobsMock.dispatchMediaProviderJob.mockResolvedValue(true);
  });

  it('redispatches due and stale processing provider jobs', async () => {
    const { redispatchDueMediaJobs } = await import('@/lib/media/reconciliation');

    const result = await redispatchDueMediaJobs();

    expect(result).toEqual({ scanned: 1, dispatched: 1 });
    expect(prismaMock.mediaProviderJob.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: {
        OR: expect.arrayContaining([
          expect.objectContaining({ status: { in: ['pending', 'failed'] }, availableAt: expect.objectContaining({ lte: expect.any(Date) }) }),
          expect.objectContaining({ status: 'processing', lockedAt: expect.objectContaining({ lt: expect.any(Date) }) }),
          expect.objectContaining({ status: 'processing', lockedAt: null }),
        ]),
      },
    }));
    expect(jobsMock.dispatchMediaProviderJob).toHaveBeenCalledWith('job-stale');
  });

  it('backfills missing expiry and processing reconciliation jobs for pre-deploy sessions', async () => {
    const expiresAt = new Date(Date.now() + 60_000);
    prismaMock.videoUploadSession.findMany.mockResolvedValue([{
      id: '11111111-1111-4111-8111-111111111111',
      storeId: 'store-1',
      status: 'processing',
      streamUid: 'stream-1',
      expiresAt,
      createdAt: new Date(),
    }]);
    prismaMock.mediaProviderJob.upsert
      .mockResolvedValueOnce({ id: 'expiry-job', status: 'pending', availableAt: expiresAt })
      .mockResolvedValueOnce({
        id: 'reconcile-job',
        status: 'pending',
        availableAt: new Date(Date.now() + 10_000),
      });
    const { ensureVideoLifecycleJobs } = await import('@/lib/media/reconciliation');

    const result = await ensureVideoLifecycleJobs();

    expect(result).toEqual({ scanned: 1, expiryJobs: 1, reconcileJobs: 1, dispatched: 2 });
    expect(prismaMock.mediaProviderJob.upsert).toHaveBeenCalledTimes(2);
    expect(jobsMock.dispatchMediaProviderJob).toHaveBeenCalledTimes(2);
  });

  it('records maintenance as the source when daily reconciliation applies readiness', async () => {
    const session = {
      id: '11111111-1111-4111-8111-111111111111',
      status: 'processing',
      streamUid: 'stream-1',
    };
    const canonical = {
      uid: 'stream-1',
      readyToStream: true,
      status: { state: 'ready', pctComplete: 87 },
    };
    prismaMock.videoUploadSession.findMany.mockResolvedValue([session]);
    streamMock.getStreamVideo.mockResolvedValue(canonical);
    processingMock.applyStreamVideoState.mockResolvedValue({ ok: true, status: 'ready' });
    const { reconcileProcessingVideos } = await import('@/lib/media/reconciliation');

    const result = await reconcileProcessingVideos();

    expect(result).toEqual({ scanned: 1, ready: 1, processing: 0, failed: 0 });
    expect(processingMock.applyStreamVideoState).toHaveBeenCalledWith(
      session,
      canonical,
      'stream_maintenance',
    );
  });
});
