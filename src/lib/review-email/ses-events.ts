import { createHash } from 'node:crypto';
import type { Prisma, PrismaClient } from '@prisma/client';
import type { VerifiedSesSnsMessage } from '@/lib/email/ses-sns';
import { cancelPendingReviewEmailJobs, finalizeAcceptedReviewEmailAttempt } from '@/lib/review-email/jobs';
import { recordReviewEmailMetricContribution, type ReviewEmailMetric } from '@/lib/review-email/analytics';
import { piiHashVersion } from '@/lib/review-email/pii';

type EventDb = Pick<PrismaClient, '$transaction' | 'reviewEmailEvent'>;

function digestRawBody(rawBody: string): string {
  return createHash('sha256').update(rawBody, 'utf8').digest('hex');
}

function isPermanentSuppression(message: VerifiedSesSnsMessage): boolean {
  return message.sesEventType === 'COMPLAINT' ||
    (message.sesEventType === 'BOUNCE' && message.bounceType?.toUpperCase() === 'PERMANENT');
}

function suppressionReason(message: VerifiedSesSnsMessage): 'bounce' | 'complaint' | null {
  if (message.sesEventType === 'COMPLAINT') return 'complaint';
  if (message.sesEventType === 'BOUNCE' && message.bounceType?.toUpperCase() === 'PERMANENT') return 'bounce';
  return null;
}

async function suppressRequestForAttempt(
  tx: Prisma.TransactionClient,
  input: {
    attempt: {
      id: string;
      job: {
        requestId: string;
        storeId: string;
        request: { recipientEmailFoldedHash: string | null };
      };
    };
    message: VerifiedSesSnsMessage;
    now: Date;
  },
): Promise<void> {
  const reason = suppressionReason(input.message);
  const emailHash = input.attempt.job.request.recipientEmailFoldedHash;
  if (!reason || !emailHash) return;

  await tx.reviewEmailSuppression.upsert({
    where: {
      storeId_emailHash_reason: {
        storeId: input.attempt.job.storeId,
        emailHash,
        reason,
      },
    },
    create: {
      storeId: input.attempt.job.storeId,
      emailHash,
      reason,
      source: 'ses_event',
      providerEventId: input.message.messageId,
      emailHashKeyVersion: piiHashVersion(emailHash),
      emailNormalizationVersion: 2,
    },
    update: {
      source: 'ses_event',
      providerEventId: input.message.messageId,
      releasedAt: null,
    },
  });
  await tx.reviewRequest.updateMany({
    where: {
      id: input.attempt.job.requestId,
      status: { notIn: ['submitted', 'cancelled', 'expired', 'suppressed'] },
    },
    data: {
      status: 'suppressed',
      cancelledAt: input.now,
      cancellationReason: `ses_${reason}`,
    },
  });
  await cancelPendingReviewEmailJobs(tx, input.attempt.job.requestId, `ses_${reason}`, input.now);
  await tx.reviewRequestToken.updateMany({
    where: { requestId: input.attempt.job.requestId, status: { in: ['prepared', 'active'] } },
    data: { status: 'revoked', revokedAt: input.now, revocationReason: `ses_${reason}` },
  });
  await tx.reviewRequestSession.updateMany({
    where: { requestId: input.attempt.job.requestId, status: 'active' },
    data: { status: 'revoked', revokedAt: input.now, revocationReason: `ses_${reason}` },
  });
}

async function recordProviderMetric(
  tx: Prisma.TransactionClient,
  input: {
    attempt: {
      id: string;
      templateVersion: string;
      locale: string;
      job: { kind: string; request: { receiptId: string | null } };
    };
    messageId: string;
    metric: ReviewEmailMetric;
    metricDate: Date;
  },
): Promise<void> {
  const receiptId = input.attempt.job.request.receiptId;
  if (!receiptId) return;
  await recordReviewEmailMetricContribution(tx, {
    receiptId,
    dedupeKey: `review-email-provider-event:${input.messageId}:${input.metric}`,
    metricDate: input.metricDate,
    kind: input.attempt.job.kind,
    templateVersion: input.attempt.templateVersion,
    locale: input.attempt.locale,
    metric: input.metric,
  });
}

export async function persistSesEmailEvent(
  db: EventDb,
  message: VerifiedSesSnsMessage,
  rawBody: string,
): Promise<{ status: 'created' | 'duplicate'; matchedAttempt: boolean }> {
  return db.$transaction(async (tx) => {
    const existing = await tx.reviewEmailEvent.findUnique({
      where: { snsMessageId: message.messageId },
      select: { id: true, attemptId: true },
    });
    if (existing) {
      return { status: 'duplicate' as const, matchedAttempt: Boolean(existing.attemptId) };
    }

    const attempt = message.sesMessageId || message.attemptCorrelationId
      ? await tx.reviewEmailAttempt.findFirst({
          where: {
            provider: 'ses',
            OR: [
              ...(message.sesMessageId ? [{ providerMessageId: message.sesMessageId }] : []),
              ...(message.attemptCorrelationId ? [{ correlationId: message.attemptCorrelationId }] : []),
            ],
          },
          include: {
            job: {
              include: {
                request: { select: { receiptId: true, recipientEmailFoldedHash: true } },
              },
            },
          },
        })
      : null;
    const now = message.providerTimestamp ?? new Date();

    await tx.reviewEmailEvent.create({
      data: {
        snsMessageId: message.messageId,
        providerMessageId: message.sesMessageId,
        eventType: message.sesEventType,
        attemptId: attempt?.id ?? null,
        status: 'processed',
        payloadDigest: digestRawBody(rawBody),
        bounceType: message.bounceType,
        bounceSubType: message.bounceSubType,
        complaintFeedbackType: message.complaintFeedbackType,
        providerTimestamp: message.providerTimestamp,
        processedAt: new Date(),
      },
    });

    if (!attempt || !message.sesEventType) {
      return { status: 'created' as const, matchedAttempt: Boolean(attempt) };
    }

    if (attempt.job.request.receiptId) {
      const receipt = await tx.reviewRequestReceipt.findUnique({
        where: { id: attempt.job.request.receiptId },
        select: { analyticsClosedAt: true },
      });
      if (receipt?.analyticsClosedAt) {
        await tx.reviewEmailEvent.update({
          where: { snsMessageId: message.messageId },
          data: { status: 'ignored', ignoredReason: 'ignored_subject_erased' },
        });
        return { status: 'created' as const, matchedAttempt: true };
      }
    }

    if (message.sesEventType === 'SEND' || message.sesEventType === 'DELIVERY') {
      await finalizeAcceptedReviewEmailAttempt(tx, {
        attemptId: attempt.id,
        providerMessageId: message.sesMessageId,
        acceptedAt: attempt.acceptedAt ?? now,
      });
      if (message.sesEventType === 'DELIVERY') {
        await tx.reviewEmailAttempt.update({
          where: { id: attempt.id },
          data: { status: 'delivery_confirmed', deliveryConfirmedAt: now },
        });
        await recordProviderMetric(tx, { attempt, messageId: message.messageId, metric: 'delivered', metricDate: now });
      }
    } else if (message.sesEventType === 'DELIVERY_DELAY') {
      await tx.reviewEmailAttempt.updateMany({
        where: { id: attempt.id, status: { notIn: ['bounced', 'complained', 'rejected', 'failed'] } },
        data: { status: 'delayed' },
      });
      await recordProviderMetric(tx, { attempt, messageId: message.messageId, metric: 'delayed', metricDate: now });
    } else if (message.sesEventType === 'REJECT' || message.sesEventType === 'RENDERING_FAILURE') {
      await tx.reviewEmailAttempt.update({
        where: { id: attempt.id },
        data: {
          status: message.sesEventType === 'REJECT' ? 'rejected' : 'failed',
          completedAt: now,
          errorCode: message.sesEventType,
        },
      });
      await tx.reviewRequestToken.updateMany({
        where: { attemptId: attempt.id, status: { in: ['prepared', 'active'] } },
        data: { status: 'revoked', revokedAt: now, revocationReason: message.sesEventType.toLowerCase() },
      });
      await tx.reviewEmailJob.update({
        where: { id: attempt.jobId },
        data: { status: 'failed', completedAt: now, lastErrorCode: message.sesEventType },
      });
      if (attempt.job.kind === 'request') {
        await tx.reviewRequest.updateMany({
          where: { id: attempt.job.requestId, status: { in: ['scheduled', 'sending', 'sent_unknown'] } },
          data: { status: 'error' },
        });
      }
      await recordProviderMetric(tx, {
        attempt,
        messageId: message.messageId,
        metric: message.sesEventType === 'REJECT' ? 'rejected' : 'failed',
        metricDate: now,
      });
    } else if (message.sesEventType === 'BOUNCE' || message.sesEventType === 'COMPLAINT') {
      await tx.reviewEmailAttempt.update({
        where: { id: attempt.id },
        data: {
          status: message.sesEventType === 'BOUNCE' ? 'bounced' : 'complained',
          completedAt: now,
          errorCode: message.sesEventType,
        },
      });
      if (isPermanentSuppression(message)) {
        await suppressRequestForAttempt(tx, { attempt, message, now });
      }
      await recordProviderMetric(tx, {
        attempt,
        messageId: message.messageId,
        metric: message.sesEventType === 'BOUNCE' ? 'bounced' : 'complained',
        metricDate: now,
      });
    }

    return { status: 'created' as const, matchedAttempt: true };
  });
}
