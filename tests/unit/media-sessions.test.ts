import { describe, expect, it, vi } from 'vitest';
import { releaseVideoQuota } from '@/lib/media/sessions';

describe('video quota lifecycle', () => {
  it('releases one reservation at most once under concurrent cleanup attempts', async () => {
    const updateMany = vi.fn()
      .mockResolvedValueOnce({ count: 1 })
      .mockResolvedValueOnce({ count: 0 });
    const usageUpdateMany = vi.fn().mockResolvedValue({ count: 1 });
    const tx = {
      videoUploadSession: { updateMany },
      storeVideoUsage: { updateMany: usageUpdateMany },
    };
    const session = {
      id: 'session-1',
      storeId: 'store-1',
      reservedMonth: new Date('2026-06-01T00:00:00.000Z'),
      quotaState: 'reserved',
      status: 'uploading',
      consumedAt: null,
    };

    const [first, second] = await Promise.all([
      releaseVideoQuota(tx as never, session as never),
      releaseVideoQuota(tx as never, session as never),
    ]);

    expect([first, second].sort()).toEqual([false, true]);
    expect(usageUpdateMany).toHaveBeenCalledOnce();
  });

  it('releases consumed quota once when a ready session was never submitted', async () => {
    const updateMany = vi.fn().mockResolvedValueOnce({ count: 1 });
    const usageUpdateMany = vi.fn().mockResolvedValue({ count: 1 });
    const tx = {
      videoUploadSession: { updateMany },
      storeVideoUsage: { updateMany: usageUpdateMany },
    };
    const session = {
      id: 'session-1',
      storeId: 'store-1',
      reservedMonth: new Date('2026-06-01T00:00:00.000Z'),
      quotaState: 'consumed',
      status: 'ready',
      consumedAt: null,
    };

    await expect(releaseVideoQuota(tx as never, session as never)).resolves.toBe(true);

    expect(updateMany).toHaveBeenCalledWith({
      where: { id: 'session-1', quotaState: 'consumed', status: { not: 'consumed' }, consumedAt: null },
      data: { quotaState: 'released' },
    });
    expect(usageUpdateMany).toHaveBeenCalledWith({
      where: { storeId: 'store-1', month: session.reservedMonth, consumedCount: { gt: 0 } },
      data: { consumedCount: { decrement: 1 } },
    });
  });

  it('does not release quota for a review-consumed session', async () => {
    const updateMany = vi.fn();
    const usageUpdateMany = vi.fn();
    const tx = {
      videoUploadSession: { updateMany },
      storeVideoUsage: { updateMany: usageUpdateMany },
    };
    const session = {
      id: 'session-1',
      storeId: 'store-1',
      reservedMonth: new Date('2026-06-01T00:00:00.000Z'),
      quotaState: 'consumed',
      status: 'consumed',
      consumedAt: new Date('2026-06-21T12:00:00.000Z'),
    };

    await expect(releaseVideoQuota(tx as never, session as never)).resolves.toBe(false);

    expect(updateMany).not.toHaveBeenCalled();
    expect(usageUpdateMany).not.toHaveBeenCalled();
  });
});
