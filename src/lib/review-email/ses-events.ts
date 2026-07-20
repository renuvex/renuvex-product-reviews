import { createHash } from 'node:crypto';
import type { Prisma, PrismaClient } from '@prisma/client';
import type { VerifiedSesSnsMessage } from '@/lib/email/ses-sns';
import { REVIEW_EMAIL_CATEGORY } from '@/lib/review-email/constants';
import {
  recordReviewEmailBatchMetricContribution,
  recordReviewEmailMetricContribution,
  type ReviewEmailMetric,
} from '@/lib/review-email/analytics';
import { finalizeAcceptedReviewEmailBatchAttempt } from '@/lib/review-email/batch-jobs';
import { cancelPendingReviewEmailJobs, finalizeAcceptedReviewEmailAttempt } from '@/lib/review-email/jobs';
import {
  hashProviderMessageId,
  hashProviderMessageIdCandidates,
  piiHashVersion,
} from '@/lib/review-email/pii';
import { lockReviewEmailRecipient, lockReviewEmailTransportEvent } from '@/lib/review-email/subject-lock';

type EventDb = Pick<PrismaClient, '$transaction'>;

function digestRawBody(rawBody: string): string {
  return createHash('sha256').update(rawBody, 'utf8').digest('hex');
}

function earlier(left: Date | null, right: Date): Date {
  return left && left < right ? left : right;
}

function later(left: Date | null, right: Date): Date {
  return left && left > right ? left : right;
}

function permanentSuppressionReason(message: VerifiedSesSnsMessage): 'bounce' | 'complaint' | null {
  if (message.sesEventType === 'COMPLAINT') return 'complaint';
  if (message.sesEventType === 'BOUNCE' && message.bounceType?.toUpperCase() === 'PERMANENT') return 'bounce';
  return null;
}

type EventAttempt = Prisma.ReviewEmailAttemptGetPayload<{
  include: {
    job: {
      include: {
        request: { include: { receipt: { select: { analyticsClosedAt: true } } } };
        batch: true;
      };
    };
  };
}>;

function attemptHasTerminalDeliveryFailure(attempt: EventAttempt): boolean {
  return Boolean(
    attempt.bouncedAt ||
    attempt.complainedAt ||
    attempt.rejectedAt ||
    ['bounced', 'complained', 'rejected', 'failed', 'confirmed_not_sent'].includes(attempt.status),
  );
}

function attemptAnalyticsClosed(attempt: EventAttempt): boolean {
  return Boolean(
    attempt.analyticsClosedAt ||
    attempt.job.batch?.analyticsClosedAt ||
    attempt.job.request?.receipt?.analyticsClosedAt,
  );
}

async function recordProviderMetric(
  tx: Prisma.TransactionClient,
  input: {
    attempt: EventAttempt;
    metric: ReviewEmailMetric;
    metricDate: Date;
  },
): Promise<void> {
  const dedupeKey = `review-email-attempt:${input.attempt.id}:${input.metric}`;
  if (input.attempt.job.batchId) {
    await recordReviewEmailBatchMetricContribution(tx, {
      batchId: input.attempt.job.batchId,
      dedupeKey,
      metricDate: input.metricDate,
      kind: input.attempt.job.kind,
      templateVersion: input.attempt.templateVersion,
      locale: input.attempt.locale,
      metric: input.metric,
    });
    return;
  }
  const receiptId = input.attempt.job.request?.receiptId;
  if (!receiptId) return;
  await recordReviewEmailMetricContribution(tx, {
    receiptId,
    dedupeKey,
    metricDate: input.metricDate,
    kind: input.attempt.job.kind,
    templateVersion: input.attempt.templateVersion,
    locale: input.attempt.locale,
    metric: input.metric,
  });
}

async function revokeAttemptAccess(
  tx: Prisma.TransactionClient,
  attempt: EventAttempt,
  reason: string,
  now: Date,
): Promise<void> {
  await tx.reviewRequestToken.updateMany({
    where: { attemptId: attempt.id, status: { in: ['prepared', 'active'] } },
    data: { status: 'revoked', revokedAt: now, revocationReason: reason },
  });
  const token = await tx.reviewRequestToken.findUnique({ where: { attemptId: attempt.id }, select: { id: true } });
  if (token) {
    await tx.reviewRequestSession.updateMany({
      where: { tokenId: token.id, status: 'active' },
      data: { status: 'revoked', revokedAt: now, revocationReason: reason },
    });
  }
}

async function closeBatchEmailAccess(
  tx: Prisma.TransactionClient,
  attempt: EventAttempt,
  reason: string,
  now: Date,
): Promise<void> {
  const batchId = attempt.job.batchId;
  if (!batchId) return;
  await tx.reviewEmailBatch.updateMany({
    where: { id: batchId, status: { in: ['scheduled', 'sending', 'active'] } },
    data: {
      status: 'cancelled',
      emailAccessStatus: reason === 'ses_complaint' || reason === 'ses_permanent_bounce' ? 'suppressed' : 'delivery_failed',
      cancelledAt: now,
      cancellationReason: reason,
    },
  });
  await tx.reviewEmailJob.updateMany({
    where: {
      batchId,
      id: { not: attempt.jobId },
      status: { in: ['pending', 'leased', 'dispatched', 'processing', 'retrying', 'awaiting_confirmation'] },
    },
    data: { status: 'cancelled', completedAt: now, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: reason },
  });
  await tx.reviewRequest.updateMany({
    where: { batchId, status: { in: ['scheduled', 'sending', 'sent', 'sent_unknown'] } },
    data: { status: 'error', cancellationReason: reason },
  });
  await tx.reviewRequestToken.updateMany({
    where: { batchId, status: { in: ['prepared', 'active'] } },
    data: { status: 'revoked', revokedAt: now, revocationReason: reason },
  });
  await tx.reviewRequestSession.updateMany({
    where: { batchId, status: 'active' },
    data: { status: 'revoked', revokedAt: now, revocationReason: reason },
  });
}

async function createDurableSuppression(
  tx: Prisma.TransactionClient,
  attempt: EventAttempt,
  message: VerifiedSesSnsMessage,
  now: Date,
): Promise<void> {
  const reason = permanentSuppressionReason(message);
  const emailHash = attempt.job.batch?.recipientEmailFoldedHash ?? attempt.job.request?.recipientEmailFoldedHash;
  if (!reason || !emailHash) return;
  const batch = attempt.job.batch;
  const request = attempt.job.request;
  await tx.reviewEmailSuppression.upsert({
    where: { storeId_emailHash_reason: { storeId: attempt.job.storeId, emailHash, reason } },
    create: {
      storeId: attempt.job.storeId,
      emailHash,
      category: REVIEW_EMAIL_CATEGORY,
      recipientExactHash: batch?.recipientEmailHash ?? request?.recipientEmailHash ?? null,
      recipientEmailEncrypted: batch?.recipientEmailEncrypted ?? request?.recipientEmailEncrypted ?? null,
      installationGeneration: batch?.installationGeneration ?? null,
      reason,
      source: 'ses_event',
      status: 'active',
      bounceType: message.bounceType,
      bounceSubType: message.bounceSubType,
      providerEventId: message.messageId,
      emailHashKeyVersion: piiHashVersion(emailHash),
      emailNormalizationVersion: 2,
    },
    update: {
      source: 'ses_event',
      status: 'active',
      bounceType: message.bounceType,
      bounceSubType: message.bounceSubType,
      providerEventId: message.messageId,
      releasedAt: null,
      expiresAt: null,
    },
  });
  if (batch) {
    await closeBatchEmailAccess(tx, attempt, reason === 'complaint' ? 'ses_complaint' : 'ses_permanent_bounce', now);
    return;
  }
  if (!request || !attempt.job.requestId) return;
  await tx.reviewRequest.updateMany({
    where: { id: attempt.job.requestId, status: { notIn: ['submitted', 'cancelled', 'expired', 'suppressed'] } },
    data: { status: 'suppressed', cancelledAt: now, cancellationReason: `ses_${reason}` },
  });
  await cancelPendingReviewEmailJobs(tx, attempt.job.requestId, `ses_${reason}`, now);
  await tx.reviewRequestToken.updateMany({
    where: { requestId: attempt.job.requestId, status: { in: ['prepared', 'active'] } },
    data: { status: 'revoked', revokedAt: now, revocationReason: `ses_${reason}` },
  });
  await tx.reviewRequestSession.updateMany({
    where: { requestId: attempt.job.requestId, status: 'active' },
    data: { status: 'revoked', revokedAt: now, revocationReason: `ses_${reason}` },
  });
}

async function finalizeAcceptedAttempt(
  tx: Prisma.TransactionClient,
  attempt: EventAttempt,
  message: VerifiedSesSnsMessage,
  now: Date,
): Promise<void> {
  if (attemptHasTerminalDeliveryFailure(attempt)) return;
  if (attempt.status === 'outcome_unknown') {
    const correction = {
      dedupeKey: `review-email-attempt:${attempt.id}:outcome-unknown-resolved`,
      metricDate: attempt.outcomeUnknownAt ?? attempt.sendCommittedAt ?? now,
      kind: attempt.job.kind,
      templateVersion: attempt.templateVersion,
      locale: attempt.locale,
      metric: 'outcomeUnknown' as const,
      delta: -1,
    };
    if (attempt.job.batchId) {
      await recordReviewEmailBatchMetricContribution(tx, { batchId: attempt.job.batchId, ...correction });
    } else if (attempt.job.request?.receiptId) {
      await recordReviewEmailMetricContribution(tx, { receiptId: attempt.job.request.receiptId, ...correction });
    }
  }
  if (attempt.job.batchId) {
    await finalizeAcceptedReviewEmailBatchAttempt(tx, {
      attemptId: attempt.id,
      providerMessageId: message.sesMessageId,
      acceptedAt: attempt.acceptedAt ?? now,
    });
    return;
  }
  if (attempt.job.requestId && attempt.job.request) {
    await finalizeAcceptedReviewEmailAttempt(tx, {
      attemptId: attempt.id,
      providerMessageId: message.sesMessageId,
      acceptedAt: attempt.acceptedAt ?? now,
    });
  }
}

export async function persistSesEmailEvent(
  db: EventDb,
  message: VerifiedSesSnsMessage,
  rawBody: string,
): Promise<{ status: 'created' | 'duplicate'; matchedAttempt: boolean }> {
  return db.$transaction(async (tx) => {
    await lockReviewEmailTransportEvent(tx, {
      transport: 'sns',
      transportEventId: message.messageId,
    });
    const existing = await tx.reviewEmailEvent.findFirst({
      where: {
        OR: [
          { transport: 'sns', transportEventId: message.messageId },
          { snsMessageId: message.messageId },
        ],
      },
      select: { id: true, attemptId: true },
    });
    if (existing) return { status: 'duplicate' as const, matchedAttempt: Boolean(existing.attemptId) };

    const providerHashes = message.sesMessageId ? hashProviderMessageIdCandidates(message.sesMessageId) : [];
    const attemptCandidate = message.sesMessageId || message.attemptCorrelationId
      ? await tx.reviewEmailAttempt.findFirst({
          where: {
            provider: 'ses',
            OR: [
              ...(message.sesMessageId ? [{ providerMessageId: message.sesMessageId }] : []),
              ...(providerHashes.length ? [{ providerMessageIdHash: { in: providerHashes } }] : []),
              ...(message.attemptCorrelationId ? [{ correlationId: message.attemptCorrelationId }] : []),
            ],
          },
          select: { id: true },
        })
      : null;
    if (attemptCandidate) {
      await tx.$queryRaw`
        SELECT "id"
        FROM "ReviewEmailAttempt"
        WHERE "id" = ${attemptCandidate.id}
        FOR UPDATE
      `;
    }
    const attempt = attemptCandidate
      ? await tx.reviewEmailAttempt.findUnique({
          where: { id: attemptCandidate.id },
          include: {
            job: {
              include: {
                request: { include: { receipt: { select: { analyticsClosedAt: true } } } },
                batch: true,
              },
            },
          },
        })
      : null;
    const providerMessageIdHash = message.sesMessageId ? hashProviderMessageId(message.sesMessageId) : null;
    const ignoredAfterErasure = Boolean(attempt && attemptAnalyticsClosed(attempt));
    const unmatched = attempt === null;
    const event = await tx.reviewEmailEvent.create({
      data: {
        snsMessageId: message.messageId,
        transport: 'sns',
        transportEventId: message.messageId,
        providerMessageId: ignoredAfterErasure || unmatched ? null : message.sesMessageId,
        providerMessageIdHash,
        providerMessageIdHashKeyVersion: providerMessageIdHash ? piiHashVersion(providerMessageIdHash) : null,
        eventType: message.sesEventType,
        attemptId: attempt?.id ?? null,
        status: ignoredAfterErasure ? 'ignored' : unmatched ? 'unmatched_sanitized' : 'processed',
        ignoredReason: ignoredAfterErasure ? 'ignored_subject_erased' : unmatched ? 'attempt_not_found' : null,
        payloadDigest: digestRawBody(rawBody),
        bounceType: message.bounceType,
        bounceSubType: message.bounceSubType,
        complaintFeedbackType: message.complaintFeedbackType,
        providerTimestamp: message.providerTimestamp,
        processedAt: new Date(),
      },
    });
    if (!attempt || !message.sesEventType || ignoredAfterErasure) {
      return { status: 'created' as const, matchedAttempt: Boolean(attempt) };
    }

    const now = message.providerTimestamp ?? new Date();
    if (message.sesEventType === 'SEND') {
      await finalizeAcceptedAttempt(tx, attempt, message, now);
    } else if (message.sesEventType === 'DELIVERY') {
      await finalizeAcceptedAttempt(tx, attempt, message, now);
      await tx.reviewEmailAttempt.update({
        where: { id: attempt.id },
        data: {
          deliveredAt: earlier(attempt.deliveredAt, now),
          deliveryConfirmedAt: earlier(attempt.deliveryConfirmedAt, now),
          status: attemptHasTerminalDeliveryFailure(attempt) ? attempt.status : 'delivery_confirmed',
        },
      });
      if (attempt.job.batchId && !attemptHasTerminalDeliveryFailure(attempt)) {
        await tx.reviewEmailBatch.updateMany({
          where: { id: attempt.job.batchId, firstDeliveredAt: null },
          data: { firstDeliveredAt: now },
        });
      }
      await recordProviderMetric(tx, { attempt, metric: 'delivered', metricDate: now });
    } else if (message.sesEventType === 'DELIVERY_DELAY') {
      await tx.reviewEmailAttempt.update({
        where: { id: attempt.id },
        data: {
          firstDeliveryDelayedAt: earlier(attempt.firstDeliveryDelayedAt, now),
          lastDeliveryDelayedAt: later(attempt.lastDeliveryDelayedAt, now),
          status: attemptHasTerminalDeliveryFailure(attempt) || attempt.deliveredAt ? attempt.status : 'delayed',
        },
      });
      await recordProviderMetric(tx, { attempt, metric: 'delayed', metricDate: now });
    } else if (message.sesEventType === 'REJECT' || message.sesEventType === 'RENDERING_FAILURE') {
      const reason = message.sesEventType === 'REJECT' ? 'ses_reject' : 'ses_rendering_failure';
      await tx.reviewEmailAttempt.update({
        where: { id: attempt.id },
        data: {
          status: message.sesEventType === 'REJECT' ? 'rejected' : 'failed',
          rejectedAt: message.sesEventType === 'REJECT' ? earlier(attempt.rejectedAt, now) : attempt.rejectedAt,
          completedAt: now,
          errorCode: reason,
        },
      });
      await tx.reviewEmailJob.update({
        where: { id: attempt.jobId },
        data: { status: 'failed', completedAt: now, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: reason },
      });
      await revokeAttemptAccess(tx, attempt, reason, now);
      if (attempt.job.batchId) await closeBatchEmailAccess(tx, attempt, reason, now);
      else if (attempt.job.requestId) {
        await tx.reviewRequest.updateMany({
          where: { id: attempt.job.requestId, status: { in: ['scheduled', 'sending', 'sent_unknown'] } },
          data: { status: 'error', cancellationReason: reason },
        });
      }
      await recordProviderMetric(tx, {
        attempt,
        metric: message.sesEventType === 'REJECT' ? 'rejected' : 'failed',
        metricDate: now,
      });
    } else if (message.sesEventType === 'BOUNCE' || message.sesEventType === 'COMPLAINT') {
      const reason = message.sesEventType === 'BOUNCE' ? 'ses_bounce' : 'ses_complaint';
      const recipientFoldedHash = attempt.job.batch?.recipientEmailFoldedHash ??
        attempt.job.request?.recipientEmailFoldedHash;
      if (recipientFoldedHash) {
        await lockReviewEmailRecipient(tx, {
          storeId: attempt.job.storeId,
          category: REVIEW_EMAIL_CATEGORY,
          foldedSubjectHash: recipientFoldedHash,
        });
      }
      await tx.reviewEmailAttempt.update({
        where: { id: attempt.id },
        data: {
          status: message.sesEventType === 'COMPLAINT' || attempt.complainedAt ? 'complained' : 'bounced',
          bouncedAt: message.sesEventType === 'BOUNCE' ? earlier(attempt.bouncedAt, now) : attempt.bouncedAt,
          complainedAt: message.sesEventType === 'COMPLAINT' ? earlier(attempt.complainedAt, now) : attempt.complainedAt,
          completedAt: now,
          errorCode: reason,
        },
      });
      await tx.reviewEmailJob.update({
        where: { id: attempt.jobId },
        data: { status: 'failed', completedAt: now, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: reason },
      });
      await revokeAttemptAccess(tx, attempt, reason, now);
      if (attempt.job.batchId) await closeBatchEmailAccess(tx, attempt, reason, now);
      else if (attempt.job.requestId) await cancelPendingReviewEmailJobs(tx, attempt.job.requestId, reason, now);
      await createDurableSuppression(tx, attempt, message, now);
      await recordProviderMetric(tx, {
        attempt,
        metric: message.sesEventType === 'BOUNCE' ? 'bounced' : 'complained',
        metricDate: now,
      });
    }

    void event;
    return { status: 'created' as const, matchedAttempt: true };
  });
}
