import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  writeJournal: vi.fn(),
  dispatchRetry: vi.fn(),
  dispatchMedia: vi.fn(),
}));

const { prisma } = vi.hoisted(() => ({
  prisma: {
    storeDataErasureRun: {
      create: vi.fn(), findFirst: vi.fn(), findMany: vi.fn(), count: vi.fn(),
      updateMany: vi.fn(), findUnique: vi.fn(), findUniqueOrThrow: vi.fn(), update: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}));

vi.mock('@/lib/prisma', () => ({ prisma }));
vi.mock('@/lib/review-email/journal', () => ({
  buildReviewEmailStoreErasureJournalPayload: vi.fn((value) => value),
  writeReviewEmailStoreErasureJournal: mocks.writeJournal,
}));
vi.mock('@/lib/review-email/erasure-dispatcher', () => ({ dispatchStoreDataErasureRetry: mocks.dispatchRetry }));
vi.mock('@/lib/media/jobs', () => ({ dispatchMediaProviderJob: mocks.dispatchMedia }));
vi.mock('@/lib/review-deletion', () => ({ enqueueReviewMediaCleanup: vi.fn().mockResolvedValue([]) }));
vi.mock('@/lib/review-summary', () => ({ applyReviewSummaryRemovals: vi.fn() }));
vi.mock('@/lib/media/outbox', () => ({ enqueueMediaProviderJob: vi.fn() }));

import { eraseStoreReviewEmailData, retryFailedStoreReviewEmailErasures } from '@/lib/review-email/erasure';

function deleteModel(count = 0) {
  return { deleteMany: vi.fn().mockResolvedValue({ count }) };
}

describe('store review email erasure', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prisma.storeDataErasureRun.findUniqueOrThrow.mockReset();
    prisma.storeDataErasureRun.findUnique.mockReset();
    prisma.storeDataErasureRun.updateMany.mockReset();
    mocks.dispatchRetry.mockResolvedValue(true);
    mocks.dispatchMedia.mockResolvedValue(true);
  });

  it('verifies the immutable journal before bounded tenant deletion reaches finalization', async () => {
    const now = new Date('2026-07-10T12:00:00.000Z');
    let progress: unknown = { phase: 'reviews', deleted: {} };
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn(async (parts: TemplateStringsArray) => {
        const sql = Array.from(parts).join(' ');
        if (sql.includes('IkasStoreInstallation')) return [{ storeId: 'store-1', authorizedAppId: 'app-1', generation: 1, stateVersion: 1, status: 'active' }];
        return [{ progress, journalStatus: 'verified' }];
      }),
      ikasStoreInstallation: {
        update: vi.fn().mockResolvedValue({ storeId: 'store-1', authorizedAppId: 'app-1', generation: 1, status: 'erasing' }),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      storeDataErasureRun: {
        update: vi.fn(async ({ data }: { data: { progress?: unknown } }) => {
          if (data.progress) progress = data.progress;
          return { id: 'run-1' };
        }),
      },
      review: { findMany: vi.fn().mockResolvedValue([]), deleteMany: vi.fn() },
      pendingReviewImage: { findMany: vi.fn().mockResolvedValue([]), deleteMany: vi.fn() },
      videoUploadSession: { findMany: vi.fn().mockResolvedValue([]), deleteMany: vi.fn() },
      reviewRequest: { findMany: vi.fn().mockResolvedValue([]), deleteMany: vi.fn() },
      reviewEmailBatch: { findMany: vi.fn().mockResolvedValue([]), deleteMany: vi.fn() },
      reviewEmailEvent: { deleteMany: vi.fn() },
      ikasOrderSnapshot: { findMany: vi.fn().mockResolvedValue([]), deleteMany: vi.fn() },
      reviewEmailSettings: deleteModel(1),
      reviewEmailUnsubscribeToken: deleteModel(1),
      reviewEmailSuppression: deleteModel(1),
      reviewEmailSubjectBlock: deleteModel(1),
      reviewEmailMetricContribution: deleteModel(1),
      reviewEmailDailyMetric: deleteModel(1),
      reviewEmailDataSubjectRun: deleteModel(1),
      reviewRequestReceipt: deleteModel(1),
      ikasOrderWebhookEvent: deleteModel(1),
      ikasOrderReconciliationCursor: deleteModel(1),
      storeVideoUsage: deleteModel(1),
      authToken: deleteModel(1),
    };
    prisma.storeDataErasureRun.findFirst.mockResolvedValue(null);
    prisma.storeDataErasureRun.create.mockResolvedValue({ id: 'run-1' });
    prisma.storeDataErasureRun.findUniqueOrThrow
      .mockResolvedValueOnce({
        id: 'run-1', storeId: 'store-1', installationGeneration: null, journalRetentionBaseAt: null,
        journalStatus: 'pending', createdAt: now, attempts: 1, progress,
      })
      .mockResolvedValueOnce({
        id: 'run-1', storeId: 'store-1', installationGeneration: 1, journalRetentionBaseAt: now,
        journalStatus: 'pending', createdAt: now, attempts: 1, progress,
      })
      .mockResolvedValueOnce({
        id: 'run-1', storeId: 'store-1', installationGeneration: 1, journalRetentionBaseAt: now,
        journalStatus: 'verified', createdAt: now, attempts: 1, progress,
      });
    prisma.$transaction.mockImplementation(async (callback: (value: typeof tx) => unknown) => callback(tx));

    const result = await eraseStoreReviewEmailData('store-1', {
      authorizedAppId: 'app-1', triggerSource: 'ikas_store_app_deleted', now,
    });

    expect(result.state).toBe('succeeded');
    expect(mocks.writeJournal).toHaveBeenCalledTimes(1);
    expect(tx.authToken.deleteMany).toHaveBeenCalledWith({ where: { merchantId: 'store-1' } });
    expect(tx.ikasStoreInstallation.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'erased' }),
    }));
  });

  it('uses CAS retry claims and reports pending separately from failures', async () => {
    const now = new Date('2026-07-10T12:00:00.000Z');
    prisma.storeDataErasureRun.findMany.mockResolvedValue([{ id: 'run-1', storeId: 'store-1', authorizedAppId: 'app-1', attempts: 1, status: 'error' }]);
    prisma.storeDataErasureRun.count.mockResolvedValue(0);
    prisma.storeDataErasureRun.updateMany.mockResolvedValue({ count: 1 });
    prisma.storeDataErasureRun.findUniqueOrThrow.mockRejectedValue(new Error('temporary_database_failure'));
    prisma.storeDataErasureRun.findUnique.mockResolvedValue({ attempts: 2 });

    await expect(retryFailedStoreReviewEmailErasures({ now })).resolves.toEqual({
      claimed: 1, succeeded: 0, pending: 0, failed: 1, exhausted: 0,
    });
    expect(prisma.storeDataErasureRun.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: 'run-1', status: 'error', attempts: 1 }),
      data: expect.objectContaining({ status: 'processing', nextRetryAt: null }),
    }));
  });

  it('ignores a delayed uninstall event from an older installation generation before journaling', async () => {
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([{ storeId: 'store-1', authorizedAppId: 'app-new', generation: 2, status: 'active' }]),
      storeDataErasureRun: { update: vi.fn().mockResolvedValue({ id: 'run-old' }) },
    };
    prisma.storeDataErasureRun.findFirst.mockResolvedValue(null);
    prisma.storeDataErasureRun.create.mockResolvedValue({ id: 'run-old' });
    prisma.storeDataErasureRun.findUniqueOrThrow.mockResolvedValue({
      id: 'run-old', storeId: 'store-1', installationGeneration: null, journalStatus: 'pending', createdAt: new Date(), attempts: 1,
    });
    prisma.$transaction.mockImplementation(async (callback: (value: typeof tx) => unknown) => callback(tx));

    const result = await eraseStoreReviewEmailData('store-1', {
      authorizedAppId: 'app-old', triggerSource: 'ikas_store_app_deleted', now: new Date('2026-07-10T12:00:00.000Z'),
    });

    expect(result.state).toBe('stale_ignored');
    expect(mocks.writeJournal).not.toHaveBeenCalled();
  });
});
