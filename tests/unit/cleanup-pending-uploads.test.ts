import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MEDIA_JOB_ACTIONS } from '@/lib/media/constants';

const prismaMock = vi.hoisted(() => ({
  pendingReviewImage: {
    findMany: vi.fn(),
  },
  videoUploadSession: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
  $transaction: vi.fn(),
}));
const jobsMock = vi.hoisted(() => ({
  enqueueMediaProviderJob: vi.fn(),
  dispatchMediaProviderJob: vi.fn(),
  failSessionAndQueueCleanup: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/media/jobs', () => jobsMock);

describe('cleanupPendingUploads', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    prismaMock.videoUploadSession.findMany.mockResolvedValue([]);
    prismaMock.$transaction.mockImplementation(async (callback) => callback({}));
    jobsMock.enqueueMediaProviderJob.mockResolvedValue({ id: 'job-image' });
    jobsMock.dispatchMediaProviderJob.mockResolvedValue(true);
    jobsMock.failSessionAndQueueCleanup.mockResolvedValue({ id: 'job-video' });
  });

  it('queues expired Cloudinary image cleanup through the provider outbox', async () => {
    prismaMock.pendingReviewImage.findMany.mockResolvedValue([
      { publicId: 'image-b', storeId: 'store-1', provider: 'cloudinary', providerAssetId: null, uploadSessionId: null, sourceAssetId: null },
      { publicId: 'image-a', storeId: 'store-1', provider: 'cloudinary', providerAssetId: null, uploadSessionId: null, sourceAssetId: null },
    ]);
    const { cleanupPendingUploads } = await import('@/lib/cleanup-pending-uploads');

    const result = await cleanupPendingUploads();

    expect(jobsMock.enqueueMediaProviderJob).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
      provider: 'cloudinary',
      action: MEDIA_JOB_ACTIONS.cleanupImage,
      resourceType: 'image',
      payload: { publicIds: ['image-a', 'image-b'] },
    }));
    expect(jobsMock.dispatchMediaProviderJob).toHaveBeenCalledWith('job-image');
    expect(result).toEqual(expect.objectContaining({
      queuedImageJobs: 1,
      queuedImageAssets: 2,
      deletedRows: 0,
      deletedAssets: 0,
    }));
  });

  it('moves expired video sessions through the transactional failure and cleanup path', async () => {
    prismaMock.pendingReviewImage.findMany.mockResolvedValue([]);
    prismaMock.videoUploadSession.findMany.mockResolvedValue([{ id: 'session-1' }]);
    const { cleanupPendingUploads } = await import('@/lib/cleanup-pending-uploads');

    const result = await cleanupPendingUploads();

    expect(jobsMock.failSessionAndQueueCleanup).toHaveBeenCalledWith('session-1', 'upload_session_expired');
    expect(result).toEqual(expect.objectContaining({ queuedExpiredSessions: 1 }));
  });
});
