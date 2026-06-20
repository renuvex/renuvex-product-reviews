import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MEDIA_JOB_ACTIONS, VIDEO_UPLOAD_SESSION_TTL_MS } from '@/lib/media/constants';

const prismaMock = vi.hoisted(() => ({
  $executeRaw: vi.fn(),
  $queryRaw: vi.fn(),
  $transaction: vi.fn(),
  videoUploadSession: {
    create: vi.fn(),
  },
  mediaProviderJob: {
    upsert: vi.fn(),
  },
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));

describe('video session creation', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    prismaMock.$executeRaw.mockResolvedValue(1);
    prismaMock.$queryRaw.mockResolvedValue([{ reservedCount: 1 }]);
    prismaMock.$transaction.mockImplementation(async (callback) => callback(prismaMock));
    prismaMock.mediaProviderJob.upsert.mockResolvedValue({ id: 'expiry-job' });
  });

  it('writes the quota reservation, session and expiry outbox in one serializable transaction', async () => {
    const now = new Date('2026-06-15T12:00:00.000Z');
    prismaMock.videoUploadSession.create.mockImplementation(async ({ data }) => ({
      ...data,
      id: data.id,
      expiresAt: data.expiresAt,
    }));
    const { createReservedVideoSession } = await import('@/lib/media/sessions');

    const result = await createReservedVideoSession({
      storeId: 'store-1',
      productId: 'product-1',
      mimeType: 'video/mp4',
      bytes: 20 * 1024 * 1024,
      monthlyLimit: 5,
      now,
    });

    expect(prismaMock.$transaction).toHaveBeenCalledWith(expect.any(Function), {
      isolationLevel: 'Serializable',
    });
    expect(result.session.expiresAt).toEqual(new Date(now.getTime() + VIDEO_UPLOAD_SESSION_TTL_MS));
    expect(result.expiryJob).toEqual({ id: 'expiry-job' });
    expect(prismaMock.videoUploadSession.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ provider: 'mux' }),
    }));
    expect(prismaMock.mediaProviderJob.upsert).toHaveBeenCalledWith(expect.objectContaining({
      create: expect.objectContaining({
        action: MEDIA_JOB_ACTIONS.expireUploadSession,
        availableAt: new Date(now.getTime() + VIDEO_UPLOAD_SESSION_TTL_MS),
        uploadSessionId: result.session.id,
      }),
    }));
    expect(prismaMock.videoUploadSession.create.mock.invocationCallOrder[0])
      .toBeLessThan(prismaMock.mediaProviderJob.upsert.mock.invocationCallOrder[0]);
  });
});
