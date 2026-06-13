import { describe, expect, it, vi } from 'vitest';
import { releaseVideoReservation } from '@/lib/media/sessions';

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
    };

    const [first, second] = await Promise.all([
      releaseVideoReservation(tx as never, session as never),
      releaseVideoReservation(tx as never, session as never),
    ]);

    expect([first, second].sort()).toEqual([false, true]);
    expect(usageUpdateMany).toHaveBeenCalledOnce();
  });
});
