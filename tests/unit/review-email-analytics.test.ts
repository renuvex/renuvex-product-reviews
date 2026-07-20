import { describe, expect, it, vi } from 'vitest';
import {
  closeAndReverseBatchAnalytics,
  closeAndReverseReceiptAnalytics,
  recordReviewEmailBatchMetricContribution,
  recordReviewEmailMetricContribution,
} from '@/lib/review-email/analytics';

function aggregate(overrides: Record<string, number> = {}) {
  return {
    accepted: 0,
    delivered: 0,
    delayed: 0,
    bounced: 0,
    complained: 0,
    rejected: 0,
    failed: 0,
    outcomeUnknown: 0,
    skipped: 0,
    reviewedRequests: 0,
    reviewsViaReminder: 0,
    initialRequestsIncluded: 0,
    reminderRequestsIncluded: 0,
    batchesWithReview: 0,
    completedBatches: 0,
    skippedRequests: 0,
    ...overrides,
  };
}

function receipt(overrides: Record<string, unknown> = {}) {
  return {
    id: 'receipt-1',
    storeId: 'store-1',
    installationGeneration: 2,
    exactSubjectHash: 'h2e:1:digest',
    analyticsManifest: null,
    analyticsClosedAt: null,
    analyticsCloseReason: null,
    metricsReversedAt: null,
    ...overrides,
  };
}

function batch(overrides: Record<string, unknown> = {}) {
  return {
    id: 'batch-1',
    storeId: 'store-1',
    installationGeneration: 2,
    recipientEmailHash: 'h2e:1:digest',
    analyticsManifest: null,
    analyticsClosedAt: null,
    analyticsCloseReason: null,
    metricsReversedAt: null,
    ...overrides,
  };
}

describe('review email analytics contribution ledger', () => {
  it('increments an aggregate only when the unique contribution is inserted', async () => {
    const tx = {
      $queryRaw: vi.fn().mockResolvedValue([receipt()]),
      $executeRaw: vi.fn().mockResolvedValue(1),
      reviewEmailMetricContribution: { createMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewEmailDailyMetric: { findUniqueOrThrow: vi.fn().mockResolvedValue(aggregate({ delivered: 1 })) },
      reviewRequestReceipt: { update: vi.fn().mockResolvedValue({ id: 'receipt-1' }) },
    };

    const result = await recordReviewEmailMetricContribution(tx as never, {
      receiptId: 'receipt-1',
      dedupeKey: 'provider-event:event-1:delivered',
      metricDate: new Date('2026-07-10T12:00:00.000Z'),
      kind: 'request',
      templateVersion: 'default_v1',
      locale: 'tr',
      metric: 'delivered',
    });

    expect(result).toBe('recorded');
    expect(tx.$executeRaw).toHaveBeenCalledTimes(1);
    expect(tx.reviewRequestReceipt.update).toHaveBeenCalledWith(expect.objectContaining({
      data: { analyticsManifest: [expect.objectContaining({ metric: 'delivered', delta: 1 })] },
    }));
  });

  it('does not increment after the subject analytics fence closes', async () => {
    const tx = {
      $queryRaw: vi.fn().mockResolvedValue([receipt({ analyticsClosedAt: new Date() })]),
      $executeRaw: vi.fn(),
      reviewEmailMetricContribution: { createMany: vi.fn() },
    };
    await expect(recordReviewEmailMetricContribution(tx as never, {
      receiptId: 'receipt-1',
      dedupeKey: 'late-event',
      metricDate: new Date(),
      kind: 'request',
      templateVersion: 'default_v1',
      locale: 'tr',
      metric: 'bounced',
    })).resolves.toBe('analytics_closed');
    expect(tx.reviewEmailMetricContribution.createMany).not.toHaveBeenCalled();
  });

  it('does not increment a batch metric when the semantic contribution already exists', async () => {
    const tx = {
      $queryRaw: vi.fn().mockResolvedValue([batch()]),
      $executeRaw: vi.fn(),
      reviewEmailMetricContribution: { createMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewEmailBatch: { update: vi.fn() },
    };

    await expect(recordReviewEmailBatchMetricContribution(tx as never, {
      batchId: 'batch-1',
      dedupeKey: 'review-email-attempt:attempt-1:delivered',
      metricDate: new Date('2026-07-10T12:00:00.000Z'),
      kind: 'request',
      templateVersion: 'default_v1',
      locale: 'tr',
      metric: 'delivered',
    })).resolves.toBe('duplicate');
    expect(tx.$executeRaw).not.toHaveBeenCalled();
    expect(tx.reviewEmailBatch.update).not.toHaveBeenCalled();
  });

  it('reverses each manifest contribution once and clears subject linkage', async () => {
    const tx = {
      $queryRaw: vi.fn().mockResolvedValue([receipt({
        analyticsManifest: [{
          dedupeKey: 'event-1',
          metricDate: '2026-07-10T00:00:00.000Z',
          kind: 'request',
          templateVersion: 'default_v1',
          locale: 'tr',
          metric: 'accepted',
          delta: 1,
        }],
      })]),
      $executeRaw: vi.fn().mockResolvedValue(1),
      reviewEmailMetricContribution: {
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      reviewEmailDailyMetric: { findUniqueOrThrow: vi.fn().mockResolvedValue(aggregate()) },
      reviewRequestReceipt: { update: vi.fn().mockResolvedValue({ id: 'receipt-1' }) },
    };

    const result = await closeAndReverseReceiptAnalytics(tx as never, 'receipt-1', {
      now: new Date('2026-07-11T00:00:00.000Z'),
      reason: 'subject_erasure',
    });

    expect(result).toEqual({ reversed: 1, alreadyClosed: false });
    expect(tx.reviewEmailMetricContribution.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ exactSubjectHash: null, reversedAt: expect.any(Date) }),
    }));
    expect(tx.reviewRequestReceipt.update).toHaveBeenLastCalledWith(expect.objectContaining({
      data: expect.objectContaining({ exactSubjectHash: null, metricsReversedAt: expect.any(Date) }),
    }));
  });

  it('uses the receipt manifest as the reversal authority after contribution tombstone retention', async () => {
    const tx = {
      $queryRaw: vi.fn().mockResolvedValue([receipt({
        analyticsClosedAt: new Date('2026-01-01T00:00:00.000Z'),
        analyticsCloseReason: 'detail_retention',
        analyticsManifest: [{
          dedupeKey: 'expired-contribution-row',
          metricDate: '2026-01-01T00:00:00.000Z',
          kind: 'request',
          templateVersion: 'default_v1',
          locale: 'tr',
          metric: 'delivered',
          delta: 1,
        }],
      })]),
      $executeRaw: vi.fn().mockResolvedValue(1),
      reviewEmailMetricContribution: { updateMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewEmailDailyMetric: { findUniqueOrThrow: vi.fn().mockResolvedValue(aggregate()) },
      reviewRequestReceipt: { update: vi.fn().mockResolvedValue({ id: 'receipt-1' }) },
    };

    await expect(closeAndReverseReceiptAnalytics(tx as never, 'receipt-1', {
      now: new Date('2026-07-11T00:00:00.000Z'),
      reason: 'subject_erasure',
    })).resolves.toEqual({ reversed: 1, alreadyClosed: false });
    expect(tx.$executeRaw).toHaveBeenCalledTimes(1);
    expect(tx.reviewRequestReceipt.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ analyticsCloseReason: 'subject_erasure' }),
    }));
  });

  it('uses the batch manifest as the reversal authority after contribution tombstone retention', async () => {
    const tx = {
      $queryRaw: vi.fn().mockResolvedValue([batch({
        analyticsClosedAt: new Date('2026-01-01T00:00:00.000Z'),
        analyticsCloseReason: 'detail_retention',
        analyticsManifest: [{
          dedupeKey: 'expired-batch-contribution-row',
          metricDate: '2026-01-01T00:00:00.000Z',
          kind: 'request',
          templateVersion: 'default_v1',
          locale: 'tr',
          metric: 'accepted',
          delta: 1,
        }],
      })]),
      $executeRaw: vi.fn().mockResolvedValue(1),
      reviewEmailMetricContribution: { updateMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewEmailDailyMetric: { findUniqueOrThrow: vi.fn().mockResolvedValue(aggregate()) },
      reviewEmailBatch: { update: vi.fn().mockResolvedValue({ id: 'batch-1' }) },
    };

    await expect(closeAndReverseBatchAnalytics(tx as never, 'batch-1', {
      now: new Date('2026-07-11T00:00:00.000Z'),
      reason: 'subject_erasure',
    })).resolves.toEqual({ reversed: 1, alreadyClosed: false });
    expect(tx.$executeRaw).toHaveBeenCalledTimes(1);
    expect(tx.reviewEmailBatch.update).toHaveBeenLastCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        recipientEmailHash: null,
        recipientEmailFoldedHash: null,
        recipientEmailEncrypted: null,
        analyticsManifest: expect.anything(),
        metricsReversedAt: expect.any(Date),
      }),
    }));
  });
});
