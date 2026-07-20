import type { PrismaClient } from '@prisma/client';
import {
  REVIEW_EMAIL_CONFIRMATION_TIMEOUT_HOURS,
  REVIEW_EMAIL_MAINTENANCE_BATCH_SIZE,
  REVIEW_EMAIL_PREPARED_ATTEMPT_TTL_MINUTES,
} from '@/lib/review-email/constants';
import { getReviewRequestTokenKeyRing } from '@/lib/review-email/config';
import { cancelPendingReviewEmailJobs } from '@/lib/review-email/jobs';
import { reportCronTaskError } from '@/lib/cron-observability';
import {
  recordReviewEmailBatchMetricContribution,
  recordReviewEmailMetricContribution,
} from '@/lib/review-email/analytics';
import { runReviewEmailRetentionPurge, type ReviewEmailRetentionResult } from '@/lib/review-email/retention';

export type ReviewEmailMaintenanceResult = {
  stalePreparedAttempts: number;
  outcomeUnknownAttempts: number;
  expiredTokens: number;
  expiredSessions: number;
  expiredBatches: number;
  expiredRequests: number;
  activeKeyVersions: number[];
  retention: ReviewEmailRetentionResult;
};

export async function runReviewEmailLifecycleMaintenance(
  db: PrismaClient,
  input: { now?: Date; limit?: number } = {},
): Promise<ReviewEmailMaintenanceResult> {
  const now = input.now ?? new Date();
  const limit = Math.min(Math.max(input.limit ?? REVIEW_EMAIL_MAINTENANCE_BATCH_SIZE, 1), 500);
  const stalePreparedBefore = new Date(now.getTime() - REVIEW_EMAIL_PREPARED_ATTEMPT_TTL_MINUTES * 60 * 1000);
  const confirmationBefore = new Date(now.getTime() - REVIEW_EMAIL_CONFIRMATION_TIMEOUT_HOURS * 60 * 60 * 1000);

  const activeVersions = await db.reviewRequestToken.findMany({
    where: { status: { in: ['prepared', 'active'] } },
    distinct: ['tokenKeyVersion'],
    select: { tokenKeyVersion: true },
  });
  const activeKeyVersions = activeVersions.map((row) => row.tokenKeyVersion).sort((a, b) => a - b);
  if (activeKeyVersions.length > 0) {
    const keyRing = getReviewRequestTokenKeyRing();
    const missingVersions = activeKeyVersions.filter((version) => !keyRing.keys.has(version));
    if (missingVersions.length > 0) {
      throw new Error(`Review request token key ring is missing active version(s): ${missingVersions.join(',')}`);
    }
  }

  const stalePrepared = await db.reviewEmailAttempt.findMany({
    where: { status: 'prepared', sendInitiatedAt: null, createdAt: { lte: stalePreparedBefore } },
    orderBy: { createdAt: 'asc' },
    take: limit,
    select: { id: true, jobId: true },
  });
  for (const attempt of stalePrepared) {
    await db.$transaction(async (tx) => {
      const abandoned = await tx.reviewEmailAttempt.updateMany({
        where: { id: attempt.id, status: 'prepared', sendInitiatedAt: null },
        data: {
          status: 'abandoned_before_send',
          completedAt: now,
          errorCode: 'sender_crashed_before_send',
        },
      });
      if (abandoned.count !== 1) return;
      await tx.reviewRequestToken.updateMany({
        where: { attemptId: attempt.id, status: 'prepared' },
        data: { status: 'revoked', revokedAt: now, revocationReason: 'sender_crashed_before_send' },
      });
      await tx.reviewEmailUnsubscribeToken.updateMany({
        where: { createdFromAttemptId: attempt.id, status: 'active' },
        data: { status: 'revoked', revokedAt: now },
      });
      await tx.reviewEmailJob.updateMany({
        where: { id: attempt.jobId, status: { in: ['processing', 'leased', 'dispatched'] } },
        data: {
          status: 'retrying',
          leaseOwner: null,
          leaseExpiresAt: null,
          lastErrorCode: 'sender_crashed_before_send',
        },
      });
    });
  }

  const ambiguous = await db.reviewEmailAttempt.findMany({
    where: {
      status: { in: ['sending', 'awaiting_confirmation'] },
      OR: [
        { confirmationDeadlineAt: { lte: now } },
        { confirmationDeadlineAt: null, sendInitiatedAt: { lte: confirmationBefore } },
        {
          confirmationDeadlineAt: null,
          sendInitiatedAt: null,
          sendCommittedAt: { lte: confirmationBefore },
        },
      ],
    },
    orderBy: [{ confirmationDeadlineAt: 'asc' }, { sendInitiatedAt: 'asc' }, { sendCommittedAt: 'asc' }],
    take: limit,
    select: {
      id: true,
      jobId: true,
      sendInitiatedAt: true,
      sendCommittedAt: true,
      templateVersion: true,
      locale: true,
      job: { select: { requestId: true, batchId: true, kind: true, request: { select: { receiptId: true } } } },
    },
  });
  let outcomeUnknownAttempts = 0;
  for (const attempt of ambiguous) {
    await db.$transaction(async (tx) => {
      const unknown = await tx.reviewEmailAttempt.updateMany({
        where: { id: attempt.id, status: { in: ['sending', 'awaiting_confirmation'] } },
        data: {
          status: 'outcome_unknown',
          outcomeUnknownAt: now,
          completedAt: now,
          errorCode: 'ses_confirmation_timeout',
        },
      });
      if (unknown.count !== 1) return;
      outcomeUnknownAttempts += 1;
      await tx.reviewEmailJob.updateMany({
        where: { id: attempt.jobId, status: { in: ['processing', 'awaiting_confirmation'] } },
        data: {
          status: 'outcome_unknown',
          completedAt: now,
          leaseOwner: null,
          leaseExpiresAt: null,
          lastErrorCode: 'ses_confirmation_timeout',
        },
      });
      if (attempt.job.batchId) {
        await recordReviewEmailBatchMetricContribution(tx, {
          batchId: attempt.job.batchId,
          dedupeKey: `review-email-attempt:${attempt.id}:outcome-unknown`,
          metricDate: attempt.sendInitiatedAt ?? attempt.sendCommittedAt ?? now,
          kind: attempt.job.kind,
          templateVersion: attempt.templateVersion,
          locale: attempt.locale,
          metric: 'outcomeUnknown',
        });
      } else if (attempt.job.request?.receiptId) {
        await recordReviewEmailMetricContribution(tx, {
          receiptId: attempt.job.request.receiptId,
          dedupeKey: `review-email-attempt:${attempt.id}:outcome-unknown`,
          metricDate: attempt.sendInitiatedAt ?? attempt.sendCommittedAt ?? now,
          kind: attempt.job.kind,
          templateVersion: attempt.templateVersion,
          locale: attempt.locale,
          metric: 'outcomeUnknown',
        });
      }
      if (attempt.job.kind === 'request') {
        await tx.reviewRequest.updateMany({
          where: attempt.job.batchId
            ? { batchId: attempt.job.batchId, status: { in: ['sending', 'sent_unknown'] } }
            : { id: attempt.job.requestId ?? '__missing__', status: { in: ['sending', 'sent_unknown'] } },
          data: { status: 'sent_unknown' },
        });
      }
    });
  }
  if (outcomeUnknownAttempts > 0) {
    reportCronTaskError(
      'daily-maintenance',
      'review-email-outcome-unknown',
      new Error(`${outcomeUnknownAttempts} SES send attempt(s) require operator review`),
      { count: outcomeUnknownAttempts },
    );
  }

  const expiredTokens = await db.reviewRequestToken.updateMany({
    where: { status: 'active', expiresAt: { lte: now } },
    data: { status: 'expired' },
  });
  const expiredSessions = await db.reviewRequestSession.updateMany({
    where: { status: 'active', expiresAt: { lte: now } },
    data: { status: 'expired' },
  });

  const expirableBatches = await db.reviewEmailBatch.findMany({
    where: {
      status: { in: ['scheduled', 'sending', 'active'] },
      expiresAt: { lte: now },
    },
    orderBy: { expiresAt: 'asc' },
    take: limit,
    select: { id: true },
  });
  let expiredBatches = 0;
  for (const batch of expirableBatches) {
    await db.$transaction(async (tx) => {
      const expired = await tx.reviewEmailBatch.updateMany({
        where: { id: batch.id, status: { in: ['scheduled', 'sending', 'active'] }, expiresAt: { lte: now } },
        data: { status: 'expired', completedAt: now, cancellationReason: 'batch_expired' },
      });
      if (expired.count !== 1) return;
      expiredBatches += 1;
      await tx.reviewEmailJob.updateMany({
        where: { batchId: batch.id, status: { in: ['pending', 'leased', 'dispatched', 'processing', 'retrying', 'awaiting_confirmation'] } },
        data: { status: 'cancelled', completedAt: now, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'batch_expired' },
      });
      await tx.reviewRequest.updateMany({
        where: { batchId: batch.id, status: { in: ['scheduled', 'sending', 'sent', 'sent_unknown', 'error'] } },
        data: { status: 'expired', cancelledAt: now, cancellationReason: 'batch_expired' },
      });
      await tx.reviewRequestToken.updateMany({
        where: { batchId: batch.id, status: { in: ['prepared', 'active'] } },
        data: { status: 'expired' },
      });
      await tx.reviewRequestSession.updateMany({
        where: { batchId: batch.id, status: 'active' },
        data: { status: 'expired' },
      });
    });
  }

  const expirableRequests = await db.reviewRequest.findMany({
    where: {
      status: { in: ['scheduled', 'sending', 'sent', 'sent_unknown', 'error'] },
      expiresAt: { lte: now },
    },
    orderBy: { expiresAt: 'asc' },
    take: limit,
    select: { id: true },
  });
  let expiredRequests = 0;
  for (const request of expirableRequests) {
    await db.$transaction(async (tx) => {
      const expired = await tx.reviewRequest.updateMany({
        where: {
          id: request.id,
          status: { in: ['scheduled', 'sending', 'sent', 'sent_unknown', 'error'] },
          expiresAt: { lte: now },
        },
        data: { status: 'expired', cancelledAt: now, cancellationReason: 'request_expired' },
      });
      if (expired.count !== 1) return;
      expiredRequests += 1;
      await cancelPendingReviewEmailJobs(tx, request.id, 'request_expired', now);
      await tx.reviewRequestToken.updateMany({
        where: { requestId: request.id, status: { in: ['prepared', 'active'] } },
        data: { status: 'expired' },
      });
      await tx.reviewRequestSession.updateMany({
        where: { requestId: request.id, status: 'active' },
        data: { status: 'expired' },
      });
    });
  }

  const retention = await runReviewEmailRetentionPurge(db, { now });
  return {
    stalePreparedAttempts: stalePrepared.length,
    outcomeUnknownAttempts,
    expiredTokens: expiredTokens.count,
    expiredSessions: expiredSessions.count,
    expiredBatches,
    expiredRequests,
    activeKeyVersions,
    retention,
  };
}
