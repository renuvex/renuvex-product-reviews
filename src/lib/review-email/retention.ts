import { Prisma, type PrismaClient } from '@prisma/client';
import {
  REVIEW_EMAIL_CONTRIBUTION_RETENTION_DAYS,
  REVIEW_EMAIL_DETAIL_RETENTION_DAYS,
  REVIEW_EMAIL_PURGE_BATCH_SIZE,
  REVIEW_EMAIL_PURGE_MAX_BATCHES,
  REVIEW_EMAIL_PURGE_MAX_DURATION_MS,
  REVIEW_EMAIL_TERMINAL_TOKEN_SESSION_GRACE_DAYS,
} from '@/lib/review-email/constants';
import { getReviewEmailRetentionMode } from '@/lib/review-email/config';
import { closeAndReverseBatchAnalytics, closeAndReverseReceiptAnalytics } from '@/lib/review-email/analytics';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';

const TERMINAL_REQUEST_STATUSES = ['submitted', 'skipped', 'cancelled', 'expired', 'suppressed', 'error'] as const;
const TERMINAL_TOKEN_STATUSES = ['consumed', 'expired', 'revoked'] as const;
const TERMINAL_SESSION_STATUSES = ['consumed', 'expired', 'revoked'] as const;

type PurgeCounts = {
  batchDetails: number;
  batchTransportFamilies: number;
  requests: number;
  tokens: number;
  sessions: number;
  contributions: number;
  orderSnapshots: number;
  dataSubjectRuns: number;
  orderWebhookEvents: number;
  unmatchedProviderEvents: number;
};

export type ReviewEmailRetentionResult = {
  runId: string;
  mode: 'report' | 'enforce';
  batches: number;
  candidates: PurgeCounts;
  deleted: PurgeCounts;
  elapsedMs: number;
};

function subtractDays(value: Date, days: number): Date {
  return new Date(value.getTime() - days * 24 * 60 * 60 * 1000);
}

function emptyCounts(): PurgeCounts {
  return {
    batchDetails: 0,
    batchTransportFamilies: 0,
    requests: 0,
    tokens: 0,
    sessions: 0,
    contributions: 0,
    orderSnapshots: 0,
    dataSubjectRuns: 0,
    orderWebhookEvents: 0,
    unmatchedProviderEvents: 0,
  };
}

function addCounts(target: PurgeCounts, source: PurgeCounts): void {
  for (const key of Object.keys(target) as Array<keyof PurgeCounts>) target[key] += source[key];
}

async function purgeBatch(
  tx: Prisma.TransactionClient,
  input: { mode: 'report' | 'enforce'; now: Date; limit: number },
): Promise<{ candidates: PurgeCounts; deleted: PurgeCounts }> {
  const detailCutoff = subtractDays(input.now, REVIEW_EMAIL_DETAIL_RETENTION_DAYS);
  const contributionCutoff = subtractDays(input.now, REVIEW_EMAIL_CONTRIBUTION_RETENTION_DAYS);
  const terminalGraceCutoff = subtractDays(input.now, REVIEW_EMAIL_TERMINAL_TOKEN_SESSION_GRACE_DAYS);
  const requestRows = await tx.$queryRaw<Array<{ id: string; receiptId: string | null; orderSnapshotId: string }>>`
    SELECT "id", "receiptId", "orderSnapshotId"
    FROM "ReviewRequest"
    WHERE "status" IN (${Prisma.join([...TERMINAL_REQUEST_STATUSES])})
      AND "updatedAt" <= ${detailCutoff}
    ORDER BY "updatedAt" ASC
    LIMIT ${input.limit}
    FOR UPDATE SKIP LOCKED
  `;
  const batchRows = await tx.$queryRaw<Array<{ id: string; orderSnapshotId: string | null }>>`
    SELECT "id", "orderSnapshotId"
    FROM "ReviewEmailBatch"
    WHERE "status" IN ('completed', 'cancelled', 'expired')
      AND "detailPurgedAt" IS NULL
      AND COALESCE("completedAt", "cancelledAt", "expiresAt", "updatedAt") <= ${detailCutoff}
    ORDER BY "updatedAt" ASC
    LIMIT ${input.limit}
    FOR UPDATE SKIP LOCKED
  `;
  const batchTransportRows = await tx.$queryRaw<Array<{ id: string }>>`
    SELECT batch."id"
    FROM "ReviewEmailBatch" batch
    WHERE batch."detailPurgedAt" IS NOT NULL
      AND COALESCE(batch."analyticsClosedAt", batch."detailPurgedAt") <= ${contributionCutoff}
      AND EXISTS (
        SELECT 1 FROM "ReviewEmailJob" job WHERE job."batchId" = batch."id"
      )
    ORDER BY batch."detailPurgedAt" ASC
    LIMIT ${input.limit}
    FOR UPDATE OF batch SKIP LOCKED
  `;
  const tokenRows = await tx.$queryRaw<Array<{ id: string }>>`
    SELECT "id"
    FROM "ReviewRequestToken"
    WHERE "status" IN (${Prisma.join([...TERMINAL_TOKEN_STATUSES])})
      AND COALESCE("consumedAt", "revokedAt", "expiresAt", "createdAt") <= ${terminalGraceCutoff}
    ORDER BY "createdAt" ASC
    LIMIT ${input.limit}
    FOR UPDATE SKIP LOCKED
  `;
  const sessionRows = await tx.$queryRaw<Array<{ id: string }>>`
    SELECT "id"
    FROM "ReviewRequestSession"
    WHERE "status" IN (${Prisma.join([...TERMINAL_SESSION_STATUSES])})
      AND COALESCE("consumedAt", "revokedAt", "expiresAt", "createdAt") <= ${terminalGraceCutoff}
    ORDER BY "createdAt" ASC
    LIMIT ${input.limit}
    FOR UPDATE SKIP LOCKED
  `;
  const contributionRows = await tx.$queryRaw<Array<{ id: string }>>`
    SELECT contribution."id"
    FROM "ReviewEmailMetricContribution" contribution
    LEFT JOIN "ReviewRequestReceipt" receipt ON receipt."id" = contribution."receiptId"
    WHERE contribution."createdAt" <= ${contributionCutoff}
      AND (contribution."reversedAt" IS NOT NULL OR receipt."analyticsClosedAt" IS NOT NULL OR contribution."receiptId" IS NULL)
    ORDER BY contribution."createdAt" ASC
    LIMIT ${input.limit}
    FOR UPDATE OF contribution SKIP LOCKED
  `;
  const dataSubjectRunRows = await tx.$queryRaw<Array<{ id: string }>>`
    SELECT "id"
    FROM "ReviewEmailDataSubjectRun"
    WHERE "status" = 'succeeded'
      AND COALESCE("finishedAt", "updatedAt") <= ${detailCutoff}
    ORDER BY "updatedAt" ASC
    LIMIT ${input.limit}
    FOR UPDATE SKIP LOCKED
  `;
  const orderWebhookRows = await tx.$queryRaw<Array<{ id: string }>>`
    SELECT "id"
    FROM "IkasOrderWebhookEvent"
    WHERE "receivedAt" <= ${detailCutoff}
      AND "status" <> 'received'
    ORDER BY "receivedAt" ASC
    LIMIT ${input.limit}
    FOR UPDATE SKIP LOCKED
  `;
  const unmatchedProviderEventRows = await tx.$queryRaw<Array<{ id: string }>>`
    SELECT "id"
    FROM "ReviewEmailEvent"
    WHERE "attemptId" IS NULL
      AND "receivedAt" <= ${detailCutoff}
    ORDER BY "receivedAt" ASC
    LIMIT ${input.limit}
    FOR UPDATE SKIP LOCKED
  `;
  const candidates: PurgeCounts = {
    batchDetails: batchRows.length,
    batchTransportFamilies: batchTransportRows.length,
    requests: requestRows.length,
    tokens: tokenRows.length,
    sessions: sessionRows.length,
    contributions: contributionRows.length,
    orderSnapshots: 0,
    dataSubjectRuns: dataSubjectRunRows.length,
    orderWebhookEvents: orderWebhookRows.length,
    unmatchedProviderEvents: unmatchedProviderEventRows.length,
  };
  const deleted = emptyCounts();
  if (input.mode === 'report') return { candidates, deleted };

  for (const receiptId of [...new Set(requestRows.flatMap((row) => row.receiptId ? [row.receiptId] : []))]) {
    await closeAndReverseReceiptAnalytics(tx, receiptId, { now: input.now, reason: 'detail_retention' });
  }
  for (const batch of batchRows) {
    await closeAndReverseBatchAnalytics(tx, batch.id, { now: input.now, reason: 'detail_retention' });
    const attemptIds = (await tx.reviewEmailAttempt.findMany({
      where: { job: { batchId: batch.id } },
      select: { id: true },
    })).map((attempt) => attempt.id);
    if (attemptIds.length) {
      await tx.reviewEmailEvent.updateMany({
        where: { attemptId: { in: attemptIds } },
        data: { providerMessageId: null },
      });
      await tx.reviewEmailAttempt.updateMany({
        where: { id: { in: attemptIds } },
        data: {
          providerMessageId: null,
          recipientEmailHash: null,
          recipientEmailFoldedHash: null,
          recipientEmailHashKeyVersion: null,
          recipientEmailEncrypted: null,
          consentSource: null,
          consentStatus: null,
          consentStatusUpdatedAt: null,
          consentCheckedAt: null,
          contentManifest: Prisma.JsonNull,
          contentDigest: null,
          piiScrubbedAt: input.now,
        },
      });
    }
    await tx.reviewEmailMetricContribution.updateMany({
      where: { batchId: batch.id },
      data: { exactSubjectHash: null },
    });
    await tx.reviewEmailBatch.update({
      where: { id: batch.id },
      data: {
        orderSnapshotId: null,
        recipientEmailHash: null,
        recipientEmailFoldedHash: null,
        recipientEmailHashKeyVersion: null,
        recipientEmailEncrypted: null,
        piiScrubbedAt: input.now,
        detailPurgedAt: input.now,
      },
    });
    deleted.batchDetails += 1;
  }
  for (const batch of batchTransportRows) {
    const jobIds = (await tx.reviewEmailJob.findMany({
      where: { batchId: batch.id },
      select: { id: true },
    })).map((job) => job.id);
    if (!jobIds.length) continue;
    const attemptIds = (await tx.reviewEmailAttempt.findMany({
      where: { jobId: { in: jobIds } },
      select: { id: true },
    })).map((attempt) => attempt.id);
    if (attemptIds.length) {
      await tx.reviewEmailEvent.deleteMany({ where: { attemptId: { in: attemptIds } } });
    }
    await tx.reviewEmailJob.deleteMany({ where: { id: { in: jobIds } } });
    deleted.batchTransportFamilies += 1;
  }
  if (sessionRows.length) {
    deleted.sessions = (await tx.reviewRequestSession.deleteMany({ where: { id: { in: sessionRows.map((row) => row.id) } } })).count;
  }
  if (tokenRows.length) {
    deleted.tokens = (await tx.reviewRequestToken.deleteMany({ where: { id: { in: tokenRows.map((row) => row.id) } } })).count;
  }
  const requestIds = requestRows.map((row) => row.id);
  if (requestIds.length) {
    const requestAttemptIds = (await tx.reviewEmailAttempt.findMany({
      where: { job: { requestId: { in: requestIds } } },
      select: { id: true },
    })).map((attempt) => attempt.id);
    if (requestAttemptIds.length) {
      await tx.reviewEmailEvent.deleteMany({ where: { attemptId: { in: requestAttemptIds } } });
    }
    deleted.requests = (await tx.reviewRequest.deleteMany({ where: { id: { in: requestIds } } })).count;
  }
  if (contributionRows.length) {
    deleted.contributions = (await tx.reviewEmailMetricContribution.deleteMany({
      where: { id: { in: contributionRows.map((row) => row.id) } },
    })).count;
  }
  if (dataSubjectRunRows.length) {
    deleted.dataSubjectRuns = (await tx.reviewEmailDataSubjectRun.deleteMany({
      where: { id: { in: dataSubjectRunRows.map((row) => row.id) } },
    })).count;
  }
  if (orderWebhookRows.length) {
    deleted.orderWebhookEvents = (await tx.ikasOrderWebhookEvent.deleteMany({
      where: { id: { in: orderWebhookRows.map((row) => row.id) } },
    })).count;
  }
  if (unmatchedProviderEventRows.length) {
    deleted.unmatchedProviderEvents = (await tx.reviewEmailEvent.deleteMany({
      where: { id: { in: unmatchedProviderEventRows.map((row) => row.id) } },
    })).count;
  }

  const orderSnapshotIds = [...new Set([
    ...requestRows.map((row) => row.orderSnapshotId),
    ...batchRows.flatMap((row) => row.orderSnapshotId ? [row.orderSnapshotId] : []),
  ])];
  for (const orderSnapshotId of orderSnapshotIds) {
    const remaining = await tx.reviewRequest.count({ where: { orderSnapshotId } });
    const remainingBatches = await tx.reviewEmailBatch.count({ where: { orderSnapshotId } });
    if (remaining !== 0 || remainingBatches !== 0) continue;
    deleted.orderSnapshots += (await tx.ikasOrderSnapshot.deleteMany({
      where: { id: orderSnapshotId, updatedAt: { lte: detailCutoff } },
    })).count;
  }
  candidates.orderSnapshots = orderSnapshotIds.length;
  return { candidates, deleted };
}

export async function runReviewEmailRetentionPurge(
  db: PrismaClient,
  input: { now?: Date; mode?: 'report' | 'enforce' } = {},
): Promise<ReviewEmailRetentionResult> {
  const now = input.now ?? new Date();
  const mode = input.mode ?? getReviewEmailRetentionMode();
  const startedMs = Date.now();
  const run = await db.reviewEmailPurgeRun.create({
    data: { mode, status: 'running', batchSize: REVIEW_EMAIL_PURGE_BATCH_SIZE },
  });
  const candidates = emptyCounts();
  const deleted = emptyCounts();
  let batches = 0;

  try {
    while (batches < REVIEW_EMAIL_PURGE_MAX_BATCHES && Date.now() - startedMs < REVIEW_EMAIL_PURGE_MAX_DURATION_MS) {
      const batch = await db.$transaction((tx) => purgeBatch(tx, {
        mode,
        now,
        limit: REVIEW_EMAIL_PURGE_BATCH_SIZE,
      }));
      addCounts(candidates, batch.candidates);
      addCounts(deleted, batch.deleted);
      batches += 1;
      const candidateCount = Object.values(batch.candidates).reduce((total, count) => total + count, 0);
      if (candidateCount === 0 || mode === 'report') break;
    }
    const elapsedMs = Date.now() - startedMs;
    await db.reviewEmailPurgeRun.update({
      where: { id: run.id },
      data: {
        status: 'succeeded',
        batchesProcessed: batches,
        candidates,
        deleted,
        elapsedMs,
        finishedAt: new Date(),
      },
    });
    return { runId: run.id, mode, batches, candidates, deleted, elapsedMs };
  } catch (error) {
    const failure = normalizeReviewEmailFailure('retention_purge', error, { retryable: true });
    await db.reviewEmailPurgeRun.update({
      where: { id: run.id },
      data: {
        status: 'failed',
        batchesProcessed: batches,
        candidates,
        deleted,
        elapsedMs: Date.now() - startedMs,
        sanitizedErrorCode: failure.code,
        finishedAt: new Date(),
      },
    });
    reportReviewEmailFailure('retention_purge', failure, run.id);
    throw error;
  }
}
