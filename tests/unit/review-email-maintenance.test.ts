import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { reportCronTaskError, runReviewEmailRetentionPurge } = vi.hoisted(() => ({
  reportCronTaskError: vi.fn(),
  runReviewEmailRetentionPurge: vi.fn(),
}));
vi.mock('@/lib/cron-observability', () => ({ reportCronTaskError }));
vi.mock('@/lib/review-email/retention', () => ({ runReviewEmailRetentionPurge }));

import { runReviewEmailLifecycleMaintenance } from '@/lib/review-email/maintenance';

function configuredKeyRing() {
  process.env.REVIEW_REQUEST_TOKEN_CURRENT_KEY_VERSION = '1';
  process.env.REVIEW_REQUEST_TOKEN_KEYS_JSON = JSON.stringify({
    1: 'review-token-key-with-at-least-thirty-two-characters',
  });
}

describe('review email lifecycle maintenance', () => {
  beforeEach(() => {
    configuredKeyRing();
    reportCronTaskError.mockReset();
    runReviewEmailRetentionPurge.mockReset();
    runReviewEmailRetentionPurge.mockResolvedValue({
      runId: 'purge-1', mode: 'report', batches: 1, candidates: {}, deleted: {}, elapsedMs: 1,
    });
  });

  afterEach(() => {
    delete process.env.REVIEW_REQUEST_TOKEN_CURRENT_KEY_VERSION;
    delete process.env.REVIEW_REQUEST_TOKEN_KEYS_JSON;
  });

  it('abandons pre-send crashes, quarantines unknown SES outcomes, and expires bounded rows', async () => {
    const tx = {
      reviewEmailAttempt: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewEmailUnsubscribeToken: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewRequestToken: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewEmailJob: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewRequest: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewRequestSession: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
    };
    const db = {
      reviewRequestToken: {
        findMany: vi.fn().mockResolvedValue([{ tokenKeyVersion: 1 }]),
        updateMany: vi.fn().mockResolvedValue({ count: 2 }),
      },
      reviewEmailAttempt: {
        findMany: vi.fn()
          .mockResolvedValueOnce([{ id: 'prepared-1', jobId: 'job-1' }])
          .mockResolvedValueOnce([{
            id: 'unknown-1',
            jobId: 'job-2',
            sendInitiatedAt: new Date('2026-07-09T00:00:00.000Z'),
            sendCommittedAt: new Date('2026-07-09T00:00:00.000Z'),
            templateVersion: 'default_v1',
            locale: 'tr',
            job: { requestId: 'request-2', kind: 'request', request: { receiptId: null } },
          }]),
      },
      reviewRequestSession: { updateMany: vi.fn().mockResolvedValue({ count: 3 }) },
      reviewEmailBatch: { findMany: vi.fn().mockResolvedValue([]) },
      reviewRequest: {
        findMany: vi.fn().mockResolvedValue([{ id: 'request-3' }]),
      },
      $transaction: vi.fn(async (callback: (transaction: typeof tx) => unknown) => callback(tx)),
    };

    const result = await runReviewEmailLifecycleMaintenance(db as never, {
      now: new Date('2026-07-10T12:00:00.000Z'),
      limit: 10,
    });

    expect(result).toEqual({
      stalePreparedAttempts: 1,
      outcomeUnknownAttempts: 1,
      expiredTokens: 2,
      expiredSessions: 3,
      expiredBatches: 0,
      expiredRequests: 1,
      activeKeyVersions: [1],
      retention: { runId: 'purge-1', mode: 'report', batches: 1, candidates: {}, deleted: {}, elapsedMs: 1 },
    });
    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'abandoned_before_send' }),
    }));
    expect(tx.reviewEmailUnsubscribeToken.updateMany).toHaveBeenCalledWith({
      where: { createdFromAttemptId: 'prepared-1', status: 'active' },
      data: { status: 'revoked', revokedAt: new Date('2026-07-10T12:00:00.000Z') },
    });
    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'outcome_unknown' }),
    }));
    expect(db.reviewEmailAttempt.findMany).toHaveBeenNthCalledWith(2, expect.objectContaining({
      where: {
        status: { in: ['sending', 'awaiting_confirmation'] },
        OR: [
          { confirmationDeadlineAt: { lte: new Date('2026-07-10T12:00:00.000Z') } },
          {
            confirmationDeadlineAt: null,
            sendInitiatedAt: { lte: new Date('2026-07-09T12:00:00.000Z') },
          },
          {
            confirmationDeadlineAt: null,
            sendInitiatedAt: null,
            sendCommittedAt: { lte: new Date('2026-07-09T12:00:00.000Z') },
          },
        ],
      },
    }));
    expect(tx.reviewRequestToken.updateMany).not.toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ attemptId: 'unknown-1' }) }),
    );
    expect(tx.reviewRequestSession.updateMany).not.toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ attemptId: 'unknown-1' }) }),
    );
    expect(reportCronTaskError).toHaveBeenCalledWith(
      'daily-maintenance',
      'review-email-outcome-unknown',
      expect.any(Error),
      { count: 1 },
    );
  });

  it('fails before maintenance if an active token key version was removed', async () => {
    const db = {
      reviewRequestToken: {
        findMany: vi.fn().mockResolvedValue([{ tokenKeyVersion: 2 }]),
      },
    };

    await expect(runReviewEmailLifecycleMaintenance(db as never)).rejects.toThrow(
      'missing active version(s): 2',
    );
  });
});
