import { randomUUID } from 'node:crypto';
import type { Prisma, PrismaClient } from '@prisma/client';
import { DEFAULT_TOKEN_EXPIRES_DAYS, REVIEW_EMAIL_JOB_LEASE_MINUTES, REVIEW_EMAIL_PREPARED_ATTEMPT_TTL_MINUTES } from '@/lib/review-email/constants';
import { addDays } from '@/lib/review-email/time';
import { decryptText } from '@/lib/review-email/pii';
import { buildReviewRequestEmailUrl } from '@/lib/review-email/public-access';
import { prepareReviewRequestToken, activatePreparedReviewRequestToken } from '@/lib/review-email/tokens';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import { recordReviewEmailMetricContribution } from '@/lib/review-email/analytics';
import { normalizeReviewEmailFailure } from '@/lib/review-email/failures';

export const REVIEW_EMAIL_ACTIVE_JOB_STATUSES = ['pending', 'leased', 'dispatched', 'processing', 'retrying', 'awaiting_confirmation'] as const;
const CLOSED_REQUEST_STATUSES = ['submitted', 'cancelled', 'expired', 'suppressed'] as const;

type JobDb = Pick<PrismaClient, '$queryRaw' | '$transaction' | 'reviewEmailJob'>;

export type ClaimedReviewEmailJob = {
  id: string;
  requestId: string;
  kind: string;
  sequence: number;
  status: string;
  sendAfter: Date;
  dedupeKey: string;
  leaseOwner: string;
  leaseExpiresAt: Date;
  dispatchAttempts: number;
};

export type PreparedReviewEmailSend = {
  attemptId: string;
  correlationId: string;
  rawToken: string;
  reviewUrl: string;
  recipientEmail: string;
  templateVersion: string;
  locale: string;
  kind: string;
  sequence: number;
};

export class ReviewEmailJobError extends Error {
  constructor(
    public readonly code: string,
    message = code,
    public readonly retryable = false,
  ) {
    super(message);
    this.name = 'ReviewEmailJobError';
  }
}

export async function claimDueReviewEmailJobs(
  db: Pick<PrismaClient, '$queryRaw'>,
  input: { limit: number; leaseOwner: string; now?: Date },
): Promise<ClaimedReviewEmailJob[]> {
  const limit = Math.min(Math.max(input.limit, 1), 100);
  const now = input.now ?? new Date();
  const leaseExpiresAt = new Date(now.getTime() + REVIEW_EMAIL_JOB_LEASE_MINUTES * 60 * 1000);
  return db.$queryRaw<ClaimedReviewEmailJob[]>`
    UPDATE "ReviewEmailJob"
    SET "status" = 'leased',
        "leaseOwner" = ${input.leaseOwner},
        "leaseExpiresAt" = ${leaseExpiresAt},
        "dispatchAttempts" = "ReviewEmailJob"."dispatchAttempts" + 1,
        "lastErrorCode" = NULL,
        "updatedAt" = CURRENT_TIMESTAMP
    WHERE "id" IN (
      SELECT "id"
      FROM "ReviewEmailJob"
      WHERE (
          "status" IN ('pending', 'retrying')
          OR ("status" = 'leased' AND "leaseExpiresAt" < ${now})
        )
        AND "sendAfter" <= ${now}
      ORDER BY "sendAfter" ASC, "createdAt" ASC
      LIMIT ${limit}
      FOR UPDATE SKIP LOCKED
    )
    RETURNING "id", "requestId", "kind", "sequence", "status", "sendAfter",
      "dedupeKey", "leaseOwner", "leaseExpiresAt", "dispatchAttempts"
  `;
}

export async function markReviewEmailJobDispatched(
  db: Pick<PrismaClient, 'reviewEmailJob'>,
  input: { jobId: string; leaseOwner: string; queueMessageId: string; now?: Date },
): Promise<boolean> {
  const now = input.now ?? new Date();
  const updated = await db.reviewEmailJob.updateMany({
    where: {
      id: input.jobId,
      status: 'leased',
      leaseOwner: input.leaseOwner,
      leaseExpiresAt: { gt: now },
    },
    data: {
      status: 'dispatched',
      dispatchedAt: now,
      queueMessageId: input.queueMessageId,
      leaseOwner: null,
      leaseExpiresAt: null,
    },
  });
  return updated.count === 1;
}

export async function cancelPendingReviewEmailJobs(tx: Prisma.TransactionClient, requestId: string, reason: string, now = new Date()): Promise<void> {
  await tx.reviewEmailJob.updateMany({
    where: { requestId, status: { in: [...REVIEW_EMAIL_ACTIVE_JOB_STATUSES] } },
    data: {
      status: 'cancelled',
      completedAt: now,
      leaseOwner: null,
      leaseExpiresAt: null,
      lastErrorCode: reason,
    },
  });
}

export async function cancelActiveReviewEmailJobsForStore(
  tx: Prisma.TransactionClient,
  storeId: string,
  reason: string,
  now = new Date(),
): Promise<void> {
  await tx.reviewEmailJob.updateMany({
    where: { storeId, status: { in: [...REVIEW_EMAIL_ACTIVE_JOB_STATUSES] } },
    data: {
      status: 'cancelled',
      completedAt: now,
      leaseOwner: null,
      leaseExpiresAt: null,
      lastErrorCode: reason,
    },
  });
}

export async function markReviewEmailJobSkipped(db: Pick<PrismaClient, 'reviewEmailJob'>, jobId: string, reason: string, now = new Date()) {
  return db.reviewEmailJob.update({
    where: { id: jobId },
    data: {
      status: 'skipped',
      completedAt: now,
      leaseOwner: null,
      leaseExpiresAt: null,
      lastErrorCode: reason,
    },
  });
}

async function closeRequestBeforeSend(
  tx: Prisma.TransactionClient,
  input: { requestId: string; status: 'cancelled' | 'expired' | 'suppressed'; reason: string; now: Date },
): Promise<void> {
  await tx.reviewRequest.updateMany({
    where: { id: input.requestId, status: { notIn: [...CLOSED_REQUEST_STATUSES] } },
    data: {
      status: input.status,
      cancelledAt: input.now,
      cancellationReason: input.reason,
    },
  });
  await cancelPendingReviewEmailJobs(tx, input.requestId, input.reason, input.now);
  await tx.reviewRequestToken.updateMany({
    where: { requestId: input.requestId, status: { in: ['prepared', 'active'] } },
    data: { status: 'revoked', revokedAt: input.now, revocationReason: input.reason },
  });
  await tx.reviewRequestSession.updateMany({
    where: { requestId: input.requestId, status: 'active' },
    data: { status: 'revoked', revokedAt: input.now, revocationReason: input.reason },
  });
}

async function abandonPreparedAttempt(tx: Prisma.TransactionClient, attemptId: string, now: Date): Promise<void> {
  await tx.reviewEmailAttempt.updateMany({
    where: { id: attemptId, status: 'prepared', sendInitiatedAt: null },
    data: {
      status: 'abandoned_before_send',
      completedAt: now,
      errorCode: 'sender_crashed_before_send',
    },
  });
  await tx.reviewRequestToken.updateMany({
    where: { attemptId, status: 'prepared' },
    data: { status: 'revoked', revokedAt: now, revocationReason: 'sender_crashed_before_send' },
  });
}

export async function prepareReviewEmailSend(
  db: Pick<PrismaClient, '$transaction'>,
  jobId: string,
  input: { now?: Date } = {},
): Promise<PreparedReviewEmailSend> {
  if (!isReviewEmailEnabled()) {
    throw new ReviewEmailJobError('review_email_feature_disabled');
  }
  const now = input.now ?? new Date();
  const staleBefore = new Date(now.getTime() - REVIEW_EMAIL_PREPARED_ATTEMPT_TTL_MINUTES * 60 * 1000);

  return db.$transaction(async (tx) => {
    const job = await tx.reviewEmailJob.findUnique({
      where: { id: jobId },
      include: {
        request: true,
        attemptsLog: { orderBy: { attemptNumber: 'desc' }, take: 1, include: { token: true } },
      },
    });
    if (!job) throw new ReviewEmailJobError('review_email_job_not_found');
    if (['sent', 'skipped', 'failed', 'cancelled', 'outcome_unknown'].includes(job.status)) {
      throw new ReviewEmailJobError('review_email_job_closed');
    }
    if (CLOSED_REQUEST_STATUSES.includes(job.request.status as (typeof CLOSED_REQUEST_STATUSES)[number])) {
      await cancelPendingReviewEmailJobs(tx, job.requestId, `request_${job.request.status}`, now);
      throw new ReviewEmailJobError('review_email_request_closed');
    }
    if (job.request.expiresAt && job.request.expiresAt <= now) {
      await closeRequestBeforeSend(tx, {
        requestId: job.requestId,
        status: 'expired',
        reason: 'request_expired',
        now,
      });
      throw new ReviewEmailJobError('review_email_request_expired');
    }

    const latestAttempt = job.attemptsLog[0];
    if (latestAttempt?.status === 'prepared' && latestAttempt.sendInitiatedAt === null) {
      if (latestAttempt.createdAt > staleBefore) {
        throw new ReviewEmailJobError('review_email_attempt_in_progress', undefined, true);
      }
      await abandonPreparedAttempt(tx, latestAttempt.id, now);
    } else if (latestAttempt?.status === 'sending' && latestAttempt.sendInitiatedAt) {
      await tx.reviewEmailAttempt.update({
        where: { id: latestAttempt.id },
        data: { status: 'awaiting_confirmation', errorCode: 'sender_result_missing' },
      });
      await tx.reviewEmailJob.update({
        where: { id: job.id },
        data: {
          status: 'awaiting_confirmation',
          leaseOwner: null,
          leaseExpiresAt: null,
          lastErrorCode: 'sender_result_missing',
        },
      });
      if (job.kind === 'request') {
        await tx.reviewRequest.updateMany({
          where: { id: job.requestId, status: { in: ['scheduled', 'sending'] } },
          data: { status: 'sent_unknown' },
        });
      }
      throw new ReviewEmailJobError('review_email_send_awaiting_confirmation');
    } else if (latestAttempt && ['accepted', 'awaiting_confirmation', 'outcome_unknown', 'delivery_confirmed'].includes(latestAttempt.status)) {
      throw new ReviewEmailJobError('review_email_send_already_initiated');
    }

    const currentSettings = await tx.reviewEmailSettings.findUnique({
      where: { storeId: job.storeId },
      select: { enabled: true, reminderEnabled: true, maxReminderCount: true },
    });
    if (!currentSettings?.enabled && job.kind === 'request') {
      await closeRequestBeforeSend(tx, {
        requestId: job.requestId,
        status: 'cancelled',
        reason: 'store_email_disabled',
        now,
      });
      throw new ReviewEmailJobError('review_email_store_disabled');
    }
    if (
      job.kind === 'reminder' &&
      (!currentSettings?.enabled || !currentSettings.reminderEnabled || currentSettings.maxReminderCount < job.sequence)
    ) {
      await tx.reviewEmailJob.update({
        where: { id: job.id },
        data: {
          status: 'skipped',
          completedAt: now,
          leaseOwner: null,
          leaseExpiresAt: null,
          lastErrorCode: currentSettings?.enabled ? 'reminders_disabled' : 'store_email_disabled',
        },
      });
      throw new ReviewEmailJobError(currentSettings?.enabled ? 'review_email_reminders_disabled' : 'review_email_store_disabled');
    }
    if (!job.request.recipientEmailHash || !job.request.recipientEmailFoldedHash || !job.request.recipientEmailEncrypted) {
      await closeRequestBeforeSend(tx, {
        requestId: job.requestId,
        status: 'cancelled',
        reason: 'missing_recipient_email',
        now,
      });
      throw new ReviewEmailJobError('review_email_recipient_missing');
    }
    const suppression = await tx.reviewEmailSuppression.findFirst({
      where: {
        storeId: job.storeId,
        emailHash: job.request.recipientEmailFoldedHash,
        releasedAt: null,
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
      },
      select: { id: true },
    });
    if (suppression) {
      await closeRequestBeforeSend(tx, {
        requestId: job.requestId,
        status: 'suppressed',
        reason: 'recipient_suppressed',
        now,
      });
      throw new ReviewEmailJobError('review_email_recipient_suppressed');
    }

    const claimed = await tx.reviewEmailJob.updateMany({
      where: { id: job.id, status: { in: ['pending', 'leased', 'dispatched', 'retrying', 'processing'] } },
      data: { status: 'processing', leaseOwner: null, leaseExpiresAt: null },
    });
    if (claimed.count !== 1) {
      throw new ReviewEmailJobError('review_email_job_not_claimable', undefined, true);
    }

    const attemptNumber = (latestAttempt?.attemptNumber ?? 0) + 1;
    const correlationId = randomUUID().replaceAll('-', '');
    const attempt = await tx.reviewEmailAttempt.create({
      data: {
        jobId: job.id,
        attemptNumber,
        correlationId,
        provider: 'ses',
        recipientEmailHash: job.request.recipientEmailHash,
        templateVersion: job.request.templateVersionSnapshot,
        locale: job.request.localeSnapshot,
        status: 'prepared',
      },
      select: { id: true },
    });
    const token = await prepareReviewRequestToken(tx, {
      requestId: job.requestId,
      attemptId: attempt.id,
    });

    return {
      attemptId: attempt.id,
      correlationId,
      rawToken: token.rawToken,
      reviewUrl: buildReviewRequestEmailUrl(token.rawToken),
      recipientEmail: decryptText(job.request.recipientEmailEncrypted),
      templateVersion: job.request.templateVersionSnapshot,
      locale: job.request.localeSnapshot,
      kind: job.kind,
      sequence: job.sequence,
    };
  });
}

export async function markReviewEmailSendInitiated(
  db: Pick<PrismaClient, '$transaction'>,
  attemptId: string,
  now = new Date(),
): Promise<{ expiresAt: Date }> {
  return db.$transaction(async (tx) => {
    const attempt = await tx.reviewEmailAttempt.findUnique({
      where: { id: attemptId },
      include: { job: { include: { request: true } } },
    });
    if (!attempt || attempt.status !== 'prepared' || attempt.sendInitiatedAt) {
      throw new ReviewEmailJobError('review_email_attempt_not_prepared');
    }

    const activated = await activatePreparedReviewRequestToken(tx, { attemptId, sendInitiatedAt: now });
    const requestExpiresAt =
      attempt.job.request.expiresAt && attempt.job.request.expiresAt > activated.expiresAt ? attempt.job.request.expiresAt : activated.expiresAt;
    const requestUpdated = await tx.reviewRequest.updateMany({
      where: {
        id: attempt.job.requestId,
        status: { notIn: [...CLOSED_REQUEST_STATUSES] },
      },
      data: {
        status: attempt.job.kind === 'request' ? 'sending' : attempt.job.request.status,
        expiresAt: requestExpiresAt,
      },
    });
    if (requestUpdated.count !== 1) throw new ReviewEmailJobError('review_email_request_closed');

    const attemptUpdated = await tx.reviewEmailAttempt.updateMany({
      where: { id: attemptId, status: 'prepared', sendInitiatedAt: null },
      data: { status: 'sending', sendInitiatedAt: now },
    });
    if (attemptUpdated.count !== 1) throw new ReviewEmailJobError('review_email_attempt_not_prepared');

    await tx.reviewEmailJob.update({
      where: { id: attempt.jobId },
      data: { status: 'processing', lastErrorCode: null },
    });
    return { expiresAt: activated.expiresAt };
  });
}

async function scheduleNextReminder(
  tx: Prisma.TransactionClient,
  input: {
    request: {
      id: string;
      storeId: string;
      productId: string;
      reminderCount: number;
      maxReminderCountSnapshot: number;
      reminderDelayDaysSnapshot: number;
      submittedAt: Date | null;
      status: string;
    };
    previousSequence: number;
    acceptedAt: Date;
  },
): Promise<void> {
  const nextSequence = input.previousSequence + 1;
  if (
    input.request.maxReminderCountSnapshot < nextSequence ||
    input.request.submittedAt ||
    CLOSED_REQUEST_STATUSES.includes(input.request.status as (typeof CLOSED_REQUEST_STATUSES)[number])
  ) {
    return;
  }

  const sendAfter = addDays(input.acceptedAt, input.request.reminderDelayDaysSnapshot);
  const minimumRequestExpiresAt = addDays(sendAfter, DEFAULT_TOKEN_EXPIRES_DAYS);
  await tx.reviewEmailJob.upsert({
    where: {
      requestId_kind_sequence: {
        requestId: input.request.id,
        kind: 'reminder',
        sequence: nextSequence,
      },
    },
    create: {
      requestId: input.request.id,
      storeId: input.request.storeId,
      productId: input.request.productId,
      kind: 'reminder',
      sequence: nextSequence,
      status: 'pending',
      sendAfter,
      dedupeKey: `review-email:${input.request.id}:reminder:${nextSequence}`,
    },
    update: {},
  });
  await tx.reviewRequest.updateMany({
    where: {
      id: input.request.id,
      status: { notIn: [...CLOSED_REQUEST_STATUSES] },
      OR: [{ expiresAt: null }, { expiresAt: { lt: minimumRequestExpiresAt } }],
    },
    data: { expiresAt: minimumRequestExpiresAt },
  });
}

export async function finalizeAcceptedReviewEmailAttempt(
  tx: Prisma.TransactionClient,
  input: {
    attemptId: string;
    providerMessageId?: string | null;
    acceptedAt?: Date;
  },
): Promise<void> {
  const acceptedAt = input.acceptedAt ?? new Date();
  const attempt = await tx.reviewEmailAttempt.findUnique({
    where: { id: input.attemptId },
    include: { job: { include: { request: true } } },
  });
  if (!attempt) throw new ReviewEmailJobError('review_email_attempt_not_found');
  if (['rejected', 'failed', 'bounced', 'complained', 'abandoned_before_send'].includes(attempt.status)) {
    throw new ReviewEmailJobError('review_email_attempt_closed');
  }

  await tx.reviewEmailAttempt.update({
    where: { id: attempt.id },
    data: {
      status: attempt.status === 'delivery_confirmed' ? 'delivery_confirmed' : 'accepted',
      providerMessageId: input.providerMessageId ?? attempt.providerMessageId,
      acceptedAt: attempt.acceptedAt ?? acceptedAt,
      completedAt: attempt.completedAt ?? acceptedAt,
      errorCode: null,
    },
  });
  await tx.reviewEmailJob.update({
    where: { id: attempt.jobId },
    data: {
      status: 'sent',
      completedAt: acceptedAt,
      leaseOwner: null,
      leaseExpiresAt: null,
      lastErrorCode: null,
    },
  });

  if (attempt.job.request.receiptId) {
    await recordReviewEmailMetricContribution(tx, {
      receiptId: attempt.job.request.receiptId,
      dedupeKey: `review-email-attempt:${attempt.id}:accepted`,
      metricDate: attempt.acceptedAt ?? acceptedAt,
      kind: attempt.job.kind,
      templateVersion: attempt.templateVersion,
      locale: attempt.locale,
      metric: 'accepted',
    });
  }

  if (attempt.job.kind === 'request') {
    const firstSentAt = attempt.job.request.firstSentAt ?? acceptedAt;
    const updated = await tx.reviewRequest.updateMany({
      where: { id: attempt.job.requestId, status: { notIn: [...CLOSED_REQUEST_STATUSES] } },
      data: { status: 'sent', firstSentAt },
    });
    if (updated.count === 1) {
      await scheduleNextReminder(tx, {
        request: { ...attempt.job.request, status: 'sent' },
        previousSequence: 0,
        acceptedAt: firstSentAt,
      });
    }
    return;
  }

  const reminderCount = Math.max(attempt.job.request.reminderCount, attempt.job.sequence);
  const updated = await tx.reviewRequest.updateMany({
    where: { id: attempt.job.requestId, status: { notIn: [...CLOSED_REQUEST_STATUSES] } },
    data: { lastReminderSentAt: acceptedAt, reminderCount },
  });
  if (updated.count === 1) {
    await scheduleNextReminder(tx, {
      request: { ...attempt.job.request, reminderCount },
      previousSequence: attempt.job.sequence,
      acceptedAt,
    });
  }
}

export async function markReviewEmailSendAccepted(
  db: JobDb,
  attemptId: string,
  input: { providerMessageId: string; acceptedAt?: Date },
): Promise<void> {
  await db.$transaction((tx) =>
    finalizeAcceptedReviewEmailAttempt(tx, {
      attemptId,
      providerMessageId: input.providerMessageId,
      acceptedAt: input.acceptedAt,
    }),
  );
}

export async function markReviewEmailSendAwaitingConfirmation(
  db: Pick<PrismaClient, '$transaction'>,
  attemptId: string,
  now = new Date(),
): Promise<void> {
  await db.$transaction(async (tx) => {
    const attempt = await tx.reviewEmailAttempt.findUnique({
      where: { id: attemptId },
      include: { job: { include: { request: true } } },
    });
    if (!attempt || !attempt.sendInitiatedAt || !['sending', 'awaiting_confirmation'].includes(attempt.status)) {
      throw new ReviewEmailJobError('review_email_attempt_not_sending');
    }
    await tx.reviewEmailAttempt.update({
      where: { id: attempt.id },
      data: { status: 'awaiting_confirmation', errorCode: 'ses_result_unknown' },
    });
    await tx.reviewEmailJob.update({
      where: { id: attempt.jobId },
      data: {
        status: 'awaiting_confirmation',
        leaseOwner: null,
        leaseExpiresAt: null,
        lastErrorCode: 'ses_result_unknown',
      },
    });
    if (attempt.job.kind === 'request') {
      await tx.reviewRequest.updateMany({
        where: { id: attempt.job.requestId, status: { in: ['scheduled', 'sending'] } },
        data: { status: 'sent_unknown' },
      });
    }
  });
}

export async function markReviewEmailSendFailed(
  db: Pick<PrismaClient, '$transaction'>,
  attemptId: string,
  input: { errorCode: string; retryable: boolean; rejected?: boolean; now?: Date },
): Promise<void> {
  const now = input.now ?? new Date();
  const failure = normalizeReviewEmailFailure('email_send', {
    code: input.errorCode,
    retryable: input.retryable,
  });
  await db.$transaction(async (tx) => {
    const attempt = await tx.reviewEmailAttempt.findUnique({
      where: { id: attemptId },
      include: { job: { include: { request: true } } },
    });
    if (!attempt) throw new ReviewEmailJobError('review_email_attempt_not_found');
    if (attempt.status === 'awaiting_confirmation' || attempt.status === 'accepted' || attempt.status === 'delivery_confirmed') {
      throw new ReviewEmailJobError('review_email_attempt_result_ambiguous');
    }

    await tx.reviewEmailAttempt.update({
      where: { id: attempt.id },
      data: {
        status: input.rejected ? 'rejected' : 'failed',
        completedAt: now,
        errorCode: failure.code,
      },
    });
    await tx.reviewRequestToken.updateMany({
      where: { attemptId: attempt.id, status: { in: ['prepared', 'active'] } },
      data: { status: 'revoked', revokedAt: now, revocationReason: 'send_failed' },
    });
    await tx.reviewRequestSession.updateMany({
      where: { token: { attemptId: attempt.id }, status: 'active' },
      data: { status: 'revoked', revokedAt: now, revocationReason: 'send_failed' },
    });
    await tx.reviewEmailJob.update({
      where: { id: attempt.jobId },
      data: {
        status: input.retryable ? 'retrying' : 'failed',
        completedAt: input.retryable ? null : now,
        leaseOwner: null,
        leaseExpiresAt: null,
        lastErrorCode: failure.code,
      },
    });
    if (attempt.job.request.receiptId) {
      await recordReviewEmailMetricContribution(tx, {
        receiptId: attempt.job.request.receiptId,
        dedupeKey: `review-email-attempt:${attempt.id}:${input.rejected ? 'rejected' : 'failed'}`,
        metricDate: now,
        kind: attempt.job.kind,
        templateVersion: attempt.templateVersion,
        locale: attempt.locale,
        metric: input.rejected ? 'rejected' : 'failed',
      });
    }
    if (attempt.job.kind === 'request') {
      await tx.reviewRequest.updateMany({
        where: { id: attempt.job.requestId, status: { in: ['scheduled', 'sending'] } },
        data: { status: input.retryable ? 'scheduled' : 'error' },
      });
    }
  });
}
