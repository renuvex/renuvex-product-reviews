import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  mediaProviderJob: {
    findMany: vi.fn(),
  },
  videoUploadSession: {
    findMany: vi.fn(),
  },
}));
const jobsMock = vi.hoisted(() => ({
  dispatchMediaProviderJob: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/media/jobs', () => jobsMock);
vi.mock('@/lib/media/providers/cloudflare-stream', () => ({ getStreamVideo: vi.fn() }));
vi.mock('@/lib/media/video-processing', () => ({ applyStreamVideoState: vi.fn() }));

describe('media reconciliation', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    prismaMock.mediaProviderJob.findMany.mockResolvedValue([{ id: 'job-stale' }]);
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
});
