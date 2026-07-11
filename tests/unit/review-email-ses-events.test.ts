import { describe, expect, it, vi } from 'vitest';
import { persistSesEmailEvent } from '@/lib/review-email/ses-events';
import type { VerifiedSesSnsMessage } from '@/lib/email/ses-sns';

function message(overrides: Partial<VerifiedSesSnsMessage> = {}): VerifiedSesSnsMessage {
  return {
    messageId: 'sns-1',
    topicArn: 'arn:aws:sns:eu-central-1:989086371563:events',
    type: 'Notification',
    sesEventType: 'BOUNCE',
    sesMessageId: null,
    attemptCorrelationId: '0123456789abcdef0123456789abcdef',
    bounceType: 'Permanent',
    bounceSubType: 'General',
    complaintFeedbackType: null,
    providerTimestamp: new Date('2026-07-10T12:00:00.000Z'),
    ...overrides,
  };
}

function attempt(overrides: Record<string, unknown> = {}) {
  return {
    id: 'attempt-1',
    jobId: 'job-1',
    status: 'accepted',
    providerMessageId: null,
    acceptedAt: new Date('2026-07-10T11:00:00.000Z'),
    completedAt: new Date('2026-07-10T11:00:00.000Z'),
    templateVersion: 'default_v1',
    locale: 'tr',
    job: {
      id: 'job-1',
      requestId: 'request-1',
      storeId: 'store-1',
      productId: 'product-1',
      kind: 'request',
      sequence: 0,
      request: {
        id: 'request-1',
        storeId: 'store-1',
        productId: 'product-1',
        status: 'sent',
        firstSentAt: new Date('2026-07-10T11:00:00.000Z'),
        submittedAt: null,
        reminderCount: 0,
        maxReminderCountSnapshot: 1,
        reminderDelayDaysSnapshot: 1,
        recipientEmailHash: 'email-hash',
        recipientEmailFoldedHash: 'folded-email-hash',
        receiptId: null,
      },
    },
    ...overrides,
  };
}

function txForAttempt(row: ReturnType<typeof attempt>) {
  return {
    reviewEmailEvent: {
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({ id: 'event-1' }),
      update: vi.fn().mockResolvedValue({ id: 'event-1' }),
    },
    reviewEmailAttempt: {
      findFirst: vi.fn().mockResolvedValue(row),
      findUnique: vi.fn().mockResolvedValue(row),
      update: vi.fn().mockResolvedValue(row),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    reviewEmailSuppression: { upsert: vi.fn().mockResolvedValue({ id: 'suppression-1' }) },
    reviewRequest: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
    reviewEmailJob: {
      update: vi.fn().mockResolvedValue({ id: 'job-1' }),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      upsert: vi.fn().mockResolvedValue({ id: 'reminder-1' }),
    },
    reviewRequestToken: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
    reviewRequestSession: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
    reviewRequestReceipt: { findUnique: vi.fn().mockResolvedValue(null) },
  };
}

describe('SES event persistence', () => {
  it('matches by correlation tag and suppresses on permanent bounce', async () => {
    const row = attempt();
    const tx = txForAttempt(row);
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };

    const result = await persistSesEmailEvent(db as never, message(), '{"signed":"body"}');

    expect(result).toEqual({ status: 'created', matchedAttempt: true });
    expect(tx.reviewEmailAttempt.findFirst).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        OR: [{ correlationId: '0123456789abcdef0123456789abcdef' }],
      }),
    }));
    expect(tx.reviewEmailSuppression.upsert).toHaveBeenCalled();
    expect(tx.reviewRequest.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'suppressed', cancellationReason: 'ses_bounce' }),
    }));
    expect(tx.reviewRequestToken.updateMany).toHaveBeenCalled();
    expect(tx.reviewRequestSession.updateMany).toHaveBeenCalled();
  });

  it('recovers an outcome_unknown attempt when a later SES SEND event arrives', async () => {
    const row = attempt({
      status: 'outcome_unknown',
      acceptedAt: null,
      completedAt: new Date('2026-07-10T11:30:00.000Z'),
      job: {
        ...attempt().job,
        request: { ...attempt().job.request, status: 'sent_unknown', firstSentAt: null },
      },
    });
    const tx = txForAttempt(row);
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };

    await persistSesEmailEvent(db as never, message({
      sesEventType: 'SEND',
      bounceType: null,
      bounceSubType: null,
    }), '{}');

    expect(tx.reviewEmailAttempt.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'accepted' }),
    }));
    expect(tx.reviewEmailJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'sent' }),
    }));
    expect(tx.reviewEmailJob.upsert).toHaveBeenCalledWith(expect.objectContaining({
      where: { requestId_kind_sequence: { requestId: 'request-1', kind: 'reminder', sequence: 1 } },
    }));
  });

  it('records but ignores a late provider event after subject erasure closes analytics', async () => {
    const row = attempt({
      job: {
        ...attempt().job,
        request: { ...attempt().job.request, receiptId: 'receipt-1' },
      },
    });
    const tx = txForAttempt(row);
    tx.reviewRequestReceipt.findUnique.mockResolvedValue({ analyticsClosedAt: new Date('2026-07-10T11:30:00.000Z') });
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };

    const result = await persistSesEmailEvent(db as never, message(), '{}');

    expect(result).toEqual({ status: 'created', matchedAttempt: true });
    expect(tx.reviewEmailEvent.update).toHaveBeenCalledWith({
      where: { snsMessageId: 'sns-1' },
      data: { status: 'ignored', ignoredReason: 'ignored_subject_erased' },
    });
    expect(tx.reviewEmailSuppression.upsert).not.toHaveBeenCalled();
    expect(tx.reviewEmailAttempt.update).not.toHaveBeenCalled();
  });
});
