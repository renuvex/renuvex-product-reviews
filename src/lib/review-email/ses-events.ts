import { createHash } from 'node:crypto';
import type { Prisma, PrismaClient } from '@prisma/client';
import type { VerifiedSesSnsMessage } from '@/lib/email/ses-sns';
import { cancelPendingReviewEmailJobs, finalizeAcceptedReviewEmailAttempt } from '@/lib/review-email/jobs';

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
        request: { recipientEmailHash: string | null };
      };
    };
    message: VerifiedSesSnsMessage;
    now: Date;
  },
): Promise<void> {
  const reason = suppressionReason(input.message);
  const emailHash = input.attempt.job.request.recipientEmailHash;
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
                request: { select: { recipientEmailHash: true } },
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
      }
    } else if (message.sesEventType === 'DELIVERY_DELAY') {
      await tx.reviewEmailAttempt.updateMany({
        where: { id: attempt.id, status: { notIn: ['bounced', 'complained', 'rejected', 'failed'] } },
        data: { status: 'delayed' },
      });
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
    }

    return { status: 'created' as const, matchedAttempt: true };
  });
}
