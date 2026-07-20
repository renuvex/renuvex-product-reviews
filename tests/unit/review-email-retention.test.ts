import { describe, expect, it, vi } from 'vitest';

const analyticsMocks = vi.hoisted(() => ({
  closeBatch: vi.fn(),
  closeReceipt: vi.fn(),
}));

vi.mock('@/lib/review-email/analytics', () => ({
  closeAndReverseBatchAnalytics: analyticsMocks.closeBatch,
  closeAndReverseReceiptAnalytics: analyticsMocks.closeReceipt,
}));
import { runReviewEmailRetentionPurge } from '@/lib/review-email/retention';

describe('review email bounded retention', () => {
  it('reports bounded candidates without deleting in report mode', async () => {
    const tx = {
      $queryRaw: vi.fn()
        .mockResolvedValueOnce([{ id: 'request-1', receiptId: 'receipt-1', orderSnapshotId: 'order-1' }])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ id: 'token-1' }])
        .mockResolvedValueOnce([{ id: 'session-1' }])
        .mockResolvedValueOnce([{ id: 'contribution-1' }])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]),
    };
    const db = {
      reviewEmailPurgeRun: {
        create: vi.fn().mockResolvedValue({ id: 'run-1' }),
        update: vi.fn().mockResolvedValue({ id: 'run-1' }),
      },
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    const result = await runReviewEmailRetentionPurge(db as never, {
      mode: 'report',
      now: new Date('2026-07-10T12:00:00.000Z'),
    });

    expect(result.mode).toBe('report');
    expect(result.batches).toBe(1);
    expect(result.candidates).toMatchObject({ requests: 1, tokens: 1, sessions: 1, contributions: 1 });
    expect(result.deleted).toEqual({
      batchDetails: 0,
      batchTransportFamilies: 0,
      requests: 0,
      tokens: 0,
      sessions: 0,
      contributions: 0,
      orderSnapshots: 0,
      dataSubjectRuns: 0,
      orderWebhookEvents: 0,
      unmatchedProviderEvents: 0,
    });
    expect(db.reviewEmailPurgeRun.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'succeeded', batchesProcessed: 1 }),
    }));
  });

  it('scrubs batch PII and raw provider ids while retaining the reversal manifest', async () => {
    const queryRows = [
      [],
      [{ id: 'batch-1', orderSnapshotId: 'order-1' }],
      [], [], [], [], [], [],
      [], [], [], [], [], [], [], [],
    ];
    const tx = {
      $queryRaw: vi.fn().mockImplementation(async () => queryRows.shift() ?? []),
      reviewEmailAttempt: {
        findMany: vi.fn().mockResolvedValue([{ id: 'attempt-1' }]),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      reviewEmailEvent: {
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
      },
      reviewEmailMetricContribution: {
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
      },
      reviewEmailBatch: {
        update: vi.fn().mockResolvedValue({ id: 'batch-1' }),
        count: vi.fn().mockResolvedValue(0),
      },
      reviewRequest: { count: vi.fn().mockResolvedValue(0), deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewRequestSession: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewRequestToken: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewEmailDataSubjectRun: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
      ikasOrderWebhookEvent: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
      ikasOrderSnapshot: { deleteMany: vi.fn().mockResolvedValue({ count: 1 }) },
    };
    const db = {
      reviewEmailPurgeRun: {
        create: vi.fn().mockResolvedValue({ id: 'run-1' }),
        update: vi.fn().mockResolvedValue({ id: 'run-1' }),
      },
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };
    analyticsMocks.closeBatch.mockResolvedValue({ reversed: 0, alreadyClosed: false });

    const result = await runReviewEmailRetentionPurge(db as never, {
      mode: 'enforce',
      now: new Date('2026-07-10T12:00:00.000Z'),
    });

    expect(result.deleted.batchDetails).toBe(1);
    expect(tx.reviewEmailEvent.updateMany).toHaveBeenCalledWith({
      where: { attemptId: { in: ['attempt-1'] } },
      data: { providerMessageId: null },
    });
    expect(tx.reviewEmailMetricContribution.updateMany).toHaveBeenCalledWith({
      where: { batchId: 'batch-1' },
      data: { exactSubjectHash: null },
    });
    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['attempt-1'] } },
      data: expect.objectContaining({
        consentSource: null,
        consentStatus: null,
        consentStatusUpdatedAt: null,
        consentCheckedAt: null,
      }),
    });
    const update = tx.reviewEmailBatch.update.mock.calls[0]?.[0];
    expect(update.data).toMatchObject({
      recipientEmailHash: null,
      recipientEmailFoldedHash: null,
      recipientEmailEncrypted: null,
      piiScrubbedAt: new Date('2026-07-10T12:00:00.000Z'),
      detailPurgedAt: new Date('2026-07-10T12:00:00.000Z'),
    });
    expect(update.data).not.toHaveProperty('analyticsManifest');
  });

  it('physically purges closed batch transport details after the contribution tombstone window', async () => {
    const queryRows = [
      [],
      [],
      [{ id: 'batch-transport-1' }],
      [], [], [], [], [], [],
      [], [], [], [], [], [], [], [], [],
    ];
    const tx = {
      $queryRaw: vi.fn().mockImplementation(async () => queryRows.shift() ?? []),
      reviewEmailJob: {
        findMany: vi.fn().mockResolvedValue([{ id: 'job-1' }]),
        deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      reviewEmailAttempt: {
        findMany: vi.fn().mockResolvedValue([{ id: 'attempt-1' }]),
        updateMany: vi.fn().mockResolvedValue({ count: 0 }),
      },
      reviewEmailEvent: {
        updateMany: vi.fn().mockResolvedValue({ count: 0 }),
        deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      reviewEmailMetricContribution: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewRequest: { count: vi.fn().mockResolvedValue(0), deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewRequestSession: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewRequestToken: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewEmailDataSubjectRun: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
      ikasOrderWebhookEvent: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
      ikasOrderSnapshot: { deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
    };
    const db = {
      reviewEmailPurgeRun: {
        create: vi.fn().mockResolvedValue({ id: 'run-transport' }),
        update: vi.fn().mockResolvedValue({ id: 'run-transport' }),
      },
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    const result = await runReviewEmailRetentionPurge(db as never, {
      mode: 'enforce',
      now: new Date('2026-07-10T12:00:00.000Z'),
    });

    expect(result.deleted.batchTransportFamilies).toBe(1);
    expect(tx.reviewEmailEvent.deleteMany).toHaveBeenCalledWith({ where: { attemptId: { in: ['attempt-1'] } } });
    expect(tx.reviewEmailJob.deleteMany).toHaveBeenCalledWith({ where: { id: { in: ['job-1'] } } });
  });
});
