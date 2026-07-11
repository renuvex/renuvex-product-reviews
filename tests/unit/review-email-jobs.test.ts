import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  finalizeAcceptedReviewEmailAttempt,
  markReviewEmailSendAwaitingConfirmation,
  markReviewEmailSendFailed,
  markReviewEmailSendInitiated,
  prepareReviewEmailSend,
} from '@/lib/review-email/jobs';

function request(overrides: Record<string, unknown> = {}) {
  return {
    id: 'request-1',
    storeId: 'store-1',
    productId: 'product-1',
    status: 'sending',
    firstSentAt: null,
    submittedAt: null,
    reminderCount: 0,
    maxReminderCountSnapshot: 1,
    reminderDelayDaysSnapshot: 1,
    ...overrides,
  };
}

function attempt(overrides: Record<string, unknown> = {}) {
  return {
    id: 'attempt-1',
    jobId: 'job-1',
    status: 'sending',
    providerMessageId: null,
    acceptedAt: null,
    completedAt: null,
    job: {
      id: 'job-1',
      requestId: 'request-1',
      storeId: 'store-1',
      productId: 'product-1',
      kind: 'request',
      sequence: 0,
      request: request(),
    },
    ...overrides,
  };
}

function txForAttempt(row: ReturnType<typeof attempt>, requestUpdateCount = 1) {
  return {
    reviewEmailAttempt: {
      findUnique: vi.fn().mockResolvedValue(row),
      update: vi.fn().mockResolvedValue({ ...row, status: 'accepted' }),
    },
    reviewEmailJob: {
      update: vi.fn().mockResolvedValue({ ...row.job, status: 'sent' }),
      upsert: vi.fn().mockResolvedValue({ id: 'reminder-job' }),
    },
    reviewRequest: {
      updateMany: vi.fn().mockResolvedValue({ count: requestUpdateCount }),
    },
  };
}

describe('review email job lifecycle', () => {
  beforeEach(() => {
    process.env.REVIEW_EMAIL_ENABLED = 'true';
  });

  afterEach(() => {
    delete process.env.REVIEW_EMAIL_ENABLED;
  });

  it('creates reminder sequence one from the actual first acceptance time', async () => {
    const acceptedAt = new Date('2026-07-05T15:30:00.000Z');
    const tx = txForAttempt(attempt());

    await finalizeAcceptedReviewEmailAttempt(tx as never, {
      attemptId: 'attempt-1',
      providerMessageId: 'ses-message-1',
      acceptedAt,
    });

    expect(tx.reviewRequest.updateMany).toHaveBeenCalledWith({
      where: { id: 'request-1', status: { notIn: ['submitted', 'cancelled', 'expired', 'suppressed'] } },
      data: { status: 'sent', firstSentAt: acceptedAt },
    });
    expect(tx.reviewEmailJob.upsert).toHaveBeenCalledWith({
      where: { requestId_kind_sequence: { requestId: 'request-1', kind: 'reminder', sequence: 1 } },
      create: {
        requestId: 'request-1',
        storeId: 'store-1',
        productId: 'product-1',
        kind: 'reminder',
        sequence: 1,
        status: 'pending',
        sendAfter: new Date('2026-07-06T15:30:00.000Z'),
        dedupeKey: 'review-email:request-1:reminder:1',
      },
      update: {},
    });
    expect(tx.reviewRequest.updateMany).toHaveBeenCalledWith({
      where: {
        id: 'request-1',
        status: { notIn: ['submitted', 'cancelled', 'expired', 'suppressed'] },
        OR: [{ expiresAt: null }, { expiresAt: { lt: new Date('2026-08-05T15:30:00.000Z') } }],
      },
      data: { expiresAt: new Date('2026-08-05T15:30:00.000Z') },
    });
  });

  it('keeps a max-delay reminder request alive for the reminder token window', async () => {
    const acceptedAt = new Date('2026-07-05T15:30:00.000Z');
    const tx = txForAttempt(
      attempt({
        job: {
          id: 'job-1',
          kind: 'request',
          sequence: 0,
          requestId: 'request-1',
          request: request({ reminderDelayDaysSnapshot: 30 }),
        },
      }),
    );

    await finalizeAcceptedReviewEmailAttempt(tx as never, {
      attemptId: 'attempt-1',
      acceptedAt,
    });

    expect(tx.reviewEmailJob.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          sendAfter: new Date('2026-08-04T15:30:00.000Z'),
        }),
      }),
    );
    expect(tx.reviewRequest.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: [{ expiresAt: null }, { expiresAt: { lt: new Date('2026-09-03T15:30:00.000Z') } }],
        }),
        data: { expiresAt: new Date('2026-09-03T15:30:00.000Z') },
      }),
    );
  });

  it('creates reminder sequence two only after reminder one is accepted', async () => {
    const acceptedAt = new Date('2026-07-07T15:30:00.000Z');
    const row = attempt({
      job: {
        id: 'job-2',
        requestId: 'request-1',
        storeId: 'store-1',
        productId: 'product-1',
        kind: 'reminder',
        sequence: 1,
        request: request({ status: 'sent', reminderCount: 0, maxReminderCountSnapshot: 2 }),
      },
    });
    const tx = txForAttempt(row);

    await finalizeAcceptedReviewEmailAttempt(tx as never, { attemptId: 'attempt-1', acceptedAt });

    expect(tx.reviewEmailJob.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { requestId_kind_sequence: { requestId: 'request-1', kind: 'reminder', sequence: 2 } },
        create: expect.objectContaining({
          sequence: 2,
          sendAfter: new Date('2026-07-08T15:30:00.000Z'),
        }),
      }),
    );
  });

  it('does not create a reminder if the request CAS reports a closed request', async () => {
    const tx = txForAttempt(attempt(), 0);

    await finalizeAcceptedReviewEmailAttempt(tx as never, {
      attemptId: 'attempt-1',
      acceptedAt: new Date('2026-07-05T15:30:00.000Z'),
    });

    expect(tx.reviewEmailJob.upsert).not.toHaveBeenCalled();
  });

  it('anchors token and request expiry to sendInitiatedAt', async () => {
    const sendInitiatedAt = new Date('2026-07-10T12:00:00.000Z');
    const row = attempt({ status: 'prepared', sendInitiatedAt: null });
    const tx = {
      reviewEmailAttempt: {
        findUnique: vi.fn().mockResolvedValue(row),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      reviewRequestToken: {
        findUnique: vi.fn().mockResolvedValue({ id: 'token-1', requestId: 'request-1', status: 'prepared' }),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      reviewRequest: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewEmailJob: { update: vi.fn().mockResolvedValue({ id: 'job-1' }) },
    };
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };

    const result = await markReviewEmailSendInitiated(db as never, 'attempt-1', sendInitiatedAt);

    expect(result.expiresAt).toEqual(new Date('2026-08-09T12:00:00.000Z'));
    expect(tx.reviewRequestToken.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { status: 'active', expiresAt: new Date('2026-08-09T12:00:00.000Z') },
      }),
    );
    expect(tx.reviewRequest.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'sending', expiresAt: new Date('2026-08-09T12:00:00.000Z') }),
      }),
    );
  });

  it('moves an ambiguous SES result to awaiting_confirmation without retrying', async () => {
    const row = attempt({
      status: 'sending',
      sendInitiatedAt: new Date('2026-07-10T12:00:00.000Z'),
    });
    const tx = {
      reviewEmailAttempt: {
        findUnique: vi.fn().mockResolvedValue(row),
        update: vi.fn().mockResolvedValue(row),
      },
      reviewEmailJob: { update: vi.fn().mockResolvedValue({ id: 'job-1' }) },
      reviewRequest: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
    };
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };

    await markReviewEmailSendAwaitingConfirmation(db as never, 'attempt-1');

    expect(tx.reviewEmailAttempt.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { status: 'awaiting_confirmation', errorCode: 'ses_result_unknown' },
      }),
    );
    expect(tx.reviewEmailJob.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'awaiting_confirmation' }),
      }),
    );
    expect(tx.reviewRequest.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { status: 'sent_unknown' },
      }),
    );
  });

  it('normalizes arbitrary sender failure codes before DB persistence', async () => {
    const row = attempt({ status: 'sending' });
    const tx = {
      reviewEmailAttempt: {
        findUnique: vi.fn().mockResolvedValue(row),
        update: vi.fn().mockResolvedValue(row),
      },
      reviewRequestToken: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewRequestSession: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewEmailJob: { update: vi.fn().mockResolvedValue(row.job) },
      reviewRequest: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
    };
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };

    await markReviewEmailSendFailed(db as never, 'attempt-1', {
      errorCode: 'Customer@Example.com\r\nraw-token postgres://user:secret@db.internal/reviews',
      retryable: false,
    });

    expect(tx.reviewEmailAttempt.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ errorCode: 'review_email_send_failed' }),
    }));
    expect(tx.reviewEmailJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ lastErrorCode: 'review_email_send_failed' }),
    }));
  });

  it('skips a disabled reminder without revoking the already-sent review link', async () => {
    const job = {
      id: 'job-reminder-1',
      requestId: 'request-1',
      storeId: 'store-1',
      productId: 'product-1',
      kind: 'reminder',
      sequence: 1,
      status: 'dispatched',
      request: {
        ...request({ status: 'sent' }),
        expiresAt: new Date('2026-08-01T00:00:00.000Z'),
        recipientEmailHash: 'email-hash',
        recipientEmailEncrypted: 'encrypted',
        templateVersionSnapshot: 'default_v1',
        localeSnapshot: 'tr',
      },
      attemptsLog: [],
    };
    const tx = {
      reviewEmailJob: {
        findUnique: vi.fn().mockResolvedValue(job),
        update: vi.fn().mockResolvedValue({ ...job, status: 'skipped' }),
      },
      reviewEmailSettings: {
        findUnique: vi.fn().mockResolvedValue({ enabled: false, reminderEnabled: false, maxReminderCount: 0 }),
      },
      reviewRequest: { updateMany: vi.fn() },
      reviewRequestToken: { updateMany: vi.fn() },
      reviewRequestSession: { updateMany: vi.fn() },
    };
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };

    await expect(
      prepareReviewEmailSend(db as never, job.id, {
        now: new Date('2026-07-10T12:00:00.000Z'),
      }),
    ).rejects.toMatchObject({ code: 'review_email_store_disabled' });

    expect(tx.reviewEmailJob.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'skipped', lastErrorCode: 'store_email_disabled' }),
      }),
    );
    expect(tx.reviewRequest.updateMany).not.toHaveBeenCalled();
    expect(tx.reviewRequestToken.updateMany).not.toHaveBeenCalled();
  });

  it('fails closed before sender preparation when the global feature is disabled', async () => {
    delete process.env.REVIEW_EMAIL_ENABLED;
    const db = { $transaction: vi.fn() };

    await expect(prepareReviewEmailSend(db as never, 'job-1')).rejects.toMatchObject({
      code: 'review_email_feature_disabled',
    });
    expect(db.$transaction).not.toHaveBeenCalled();
  });
});
