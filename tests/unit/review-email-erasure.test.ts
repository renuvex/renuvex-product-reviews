import { beforeEach, describe, expect, it, vi } from 'vitest';

const { prisma } = vi.hoisted(() => ({
  prisma: {
    storeDataErasureRun: {
      create: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
      updateMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}));
vi.mock('@/lib/prisma', () => ({ prisma }));

import {
  eraseStoreReviewEmailData,
  retryFailedStoreReviewEmailErasures,
} from '@/lib/review-email/erasure';

function countDeleteModel(count = 0) {
  return {
    count: vi.fn().mockResolvedValue(count),
    deleteMany: vi.fn().mockResolvedValue({ count }),
  };
}

describe('store review email erasure', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deletes auth tokens and review-email PII in the same successful transaction', async () => {
    const tx = {
      authToken: countDeleteModel(1),
      reviewEmailSettings: countDeleteModel(1),
      reviewEmailSuppression: countDeleteModel(1),
      ikasOrderWebhookEvent: countDeleteModel(1),
      ikasOrderReconciliationCursor: countDeleteModel(1),
      reviewRequest: {
        findMany: vi.fn().mockResolvedValue([]),
        deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
      },
      reviewEmailEvent: countDeleteModel(0),
      reviewRequestToken: countDeleteModel(0),
      reviewRequestSession: countDeleteModel(0),
      ikasOrderLineSnapshot: countDeleteModel(0),
      ikasOrderSnapshot: countDeleteModel(0),
      storeDataErasureRun: { update: vi.fn().mockResolvedValue({ id: 'run-1' }) },
    };
    prisma.storeDataErasureRun.create.mockResolvedValue({ id: 'run-1' });
    prisma.$transaction.mockImplementation(async (callback: (value: typeof tx) => unknown) => callback(tx));

    const result = await eraseStoreReviewEmailData('store-1', {
      triggerSource: 'ikas_store_app_deleted',
      now: new Date('2026-07-10T12:00:00.000Z'),
    });

    expect(result.rowCounts.authToken).toBe(1);
    expect(tx.authToken.deleteMany).toHaveBeenCalledWith({ where: { merchantId: 'store-1' } });
    expect(tx.reviewEmailSuppression.deleteMany).toHaveBeenCalledWith({ where: { storeId: 'store-1' } });
    expect(tx.storeDataErasureRun.update).toHaveBeenLastCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'succeeded', progress: { phase: 'complete' } }),
    }));
  });

  it('retries failed erasure with a CAS and keeps bounded error evidence', async () => {
    const now = new Date('2026-07-10T12:00:00.000Z');
    prisma.storeDataErasureRun.findMany.mockResolvedValue([{ id: 'run-1', storeId: 'store-1', attempts: 1 }]);
    prisma.storeDataErasureRun.count.mockResolvedValue(0);
    prisma.storeDataErasureRun.updateMany.mockResolvedValue({ count: 1 });
    prisma.storeDataErasureRun.findUnique.mockResolvedValue({ attempts: 2 });
    prisma.storeDataErasureRun.update.mockResolvedValue({ id: 'run-1' });
    prisma.$transaction.mockRejectedValue(new Error('temporary_database_failure'));

    const result = await retryFailedStoreReviewEmailErasures({ now });

    expect(result).toEqual({ claimed: 1, succeeded: 0, failed: 1, exhausted: 0 });
    expect(prisma.storeDataErasureRun.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: 'run-1', status: 'error', attempts: 1 }),
      data: expect.objectContaining({ status: 'processing', attempts: { increment: 1 } }),
    }));
    expect(prisma.storeDataErasureRun.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        status: 'error',
        progress: { phase: 'retry_scheduled' },
        nextRetryAt: expect.any(Date),
      }),
    }));
  });
});
