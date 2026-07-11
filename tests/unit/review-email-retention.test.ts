import { describe, expect, it, vi } from 'vitest';
import { runReviewEmailRetentionPurge } from '@/lib/review-email/retention';

describe('review email bounded retention', () => {
  it('reports bounded candidates without deleting in report mode', async () => {
    const tx = {
      $queryRaw: vi.fn()
        .mockResolvedValueOnce([{ id: 'request-1', receiptId: 'receipt-1', orderSnapshotId: 'order-1' }])
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
});
