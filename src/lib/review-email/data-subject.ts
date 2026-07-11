import { createHash, randomUUID } from 'node:crypto';
import { Prisma, type PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { dispatchMediaProviderJob } from '@/lib/media/jobs';
import { requireActiveIkasStoreInstallation } from '@/lib/ikas-installation-lifecycle';
import { enqueueReviewMediaCleanup } from '@/lib/review-deletion';
import { applyReviewSummaryRemovals } from '@/lib/review-summary';
import { closeAndReverseReceiptAnalytics } from '@/lib/review-email/analytics';
import {
  canonicalizeEmailIdentity,
  decryptText,
  hashEmail,
  protectedEmail,
} from '@/lib/review-email/pii';
import { getReviewEmailPiiKeyRing } from '@/lib/review-email/config';
import { lockReviewEmailSubject } from '@/lib/review-email/subject-lock';
import {
  buildReviewEmailErasureJournalPayload,
  ReviewEmailJournalError,
  writeReviewEmailErasureJournal,
  type ReviewEmailErasureJournalPayload,
  type VerifiedJournalEvidence,
} from '@/lib/review-email/journal';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';

type DataSubjectDb = Pick<PrismaClient, '$transaction' | 'reviewEmailDataSubjectRun'>;

type SubjectInventory = {
  receiptIds: string[];
  requestIds: string[];
  directOrderSnapshotIds: string[];
  linkedOrderSnapshotIds: string[];
  reviewIds: string[];
  exactSubjectLookupHashes: string[];
  foldedSubjectLookupHashes: string[];
  opaqueResourceIds: string[];
  rowCounts: Record<string, number>;
};

export class ReviewEmailDataSubjectError extends Error {
  constructor(public readonly code: string, public readonly status: number, public readonly retryable = false) {
    super(code);
    this.name = 'ReviewEmailDataSubjectError';
  }
}

function sha256(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

export function hashDataSubjectIdempotencyKey(value: string): string {
  return sha256(value);
}

export function buildDataSubjectRequestDigest(input: { action: 'erase'; exactSubjectHash: string }): string {
  return sha256(JSON.stringify({ action: input.action, exactSubjectHash: input.exactSubjectHash }));
}

function sortedUnique(values: string[]): string[] {
  return [...new Set(values)].sort();
}

function inventoryFromProgress(progress: Prisma.JsonValue | null): SubjectInventory | null {
  if (!progress || typeof progress !== 'object' || Array.isArray(progress)) return null;
  const inventory = (progress as Record<string, Prisma.JsonValue>).inventory;
  if (!inventory || typeof inventory !== 'object' || Array.isArray(inventory)) return null;
  const row = inventory as Record<string, Prisma.JsonValue>;
  const stringArray = (key: string) => Array.isArray(row[key]) && row[key].every((value) => typeof value === 'string')
    ? row[key] as string[]
    : null;
  const receiptIds = stringArray('receiptIds');
  const requestIds = stringArray('requestIds');
  const directOrderSnapshotIds = stringArray('directOrderSnapshotIds');
  const linkedOrderSnapshotIds = stringArray('linkedOrderSnapshotIds');
  const reviewIds = stringArray('reviewIds');
  const exactSubjectLookupHashes = stringArray('exactSubjectLookupHashes');
  const foldedSubjectLookupHashes = stringArray('foldedSubjectLookupHashes');
  const opaqueResourceIds = stringArray('opaqueResourceIds');
  const rowCounts = row.rowCounts;
  if (!receiptIds || !requestIds || !directOrderSnapshotIds || !linkedOrderSnapshotIds || !reviewIds || !exactSubjectLookupHashes || !foldedSubjectLookupHashes || !opaqueResourceIds || !rowCounts || typeof rowCounts !== 'object' || Array.isArray(rowCounts)) {
    return null;
  }
  return {
    receiptIds,
    requestIds,
    directOrderSnapshotIds,
    linkedOrderSnapshotIds,
    reviewIds,
    exactSubjectLookupHashes,
    foldedSubjectLookupHashes,
    opaqueResourceIds,
    rowCounts: Object.fromEntries(Object.entries(rowCounts).map(([key, value]) => [key, typeof value === 'number' ? value : 0])),
  };
}

function assertEncryptedSubjectMatches(rows: Array<{ encrypted: string | null }>, exactCanonical: string): void {
  for (const row of rows) {
    if (!row.encrypted) continue;
    const decrypted = canonicalizeEmailIdentity(decryptText(row.encrypted));
    if (!decrypted || decrypted.exactCanonical !== exactCanonical) {
      throw new ReviewEmailDataSubjectError('ambiguous_subject', 409);
    }
  }
}

async function loadSubjectInventory(
  tx: Prisma.TransactionClient,
  input: {
    storeId: string;
    installationGeneration: number;
    exactCanonical: string;
    exactHashCandidates: string[];
    foldedHashCandidates: string[];
  },
): Promise<SubjectInventory> {
  const [receipts, requests, orders] = await Promise.all([
    tx.reviewRequestReceipt.findMany({
      where: {
        storeId: input.storeId,
        installationGeneration: input.installationGeneration,
        exactSubjectHash: { in: input.exactHashCandidates },
      },
      select: { id: true },
    }),
    tx.reviewRequest.findMany({
      where: { storeId: input.storeId, recipientEmailHash: { in: input.exactHashCandidates } },
      select: { id: true, receiptId: true, recipientEmailEncrypted: true, orderSnapshotId: true },
    }),
    tx.ikasOrderSnapshot.findMany({
      where: { storeId: input.storeId, customerEmailHash: { in: input.exactHashCandidates } },
      select: { id: true, customerEmailEncrypted: true },
    }),
  ]);
  assertEncryptedSubjectMatches(
    [
      ...requests.map((row) => ({ encrypted: row.recipientEmailEncrypted })),
      ...orders.map((row) => ({ encrypted: row.customerEmailEncrypted })),
    ],
    input.exactCanonical,
  );

  const receiptIds = sortedUnique([...receipts.map((row) => row.id), ...requests.flatMap((row) => row.receiptId ? [row.receiptId] : [])]);
  const requestIds = sortedUnique(requests.map((row) => row.id));
  const directOrderSnapshotIds = sortedUnique(orders.map((row) => row.id));
  const linkedOrderSnapshotIds = sortedUnique(requests.map((row) => row.orderSnapshotId));
  const orderSnapshotIds = sortedUnique([...directOrderSnapshotIds, ...linkedOrderSnapshotIds]);
  const reviews = await tx.review.findMany({
    where: {
      storeId: input.storeId,
      verifiedBuyer: true,
      OR: [
        ...(receiptIds.length ? [{ reviewRequestReceiptId: { in: receiptIds } }] : []),
        ...(requestIds.length ? [{ reviewRequestId: { in: requestIds } }] : []),
      ],
    },
    select: { id: true },
  });
  const reviewIds = sortedUnique(reviews.map((row) => row.id));
  const opaqueResourceIds = sortedUnique([
    ...receiptIds.map((id) => `receipt:${id}`),
    ...requestIds.map((id) => `request:${id}`),
    ...directOrderSnapshotIds.map((id) => `order-direct:${id}`),
    ...linkedOrderSnapshotIds.map((id) => `order-linked:${id}`),
    ...reviewIds.map((id) => `review:${id}`),
  ]);
  return {
    receiptIds,
    requestIds,
    directOrderSnapshotIds,
    linkedOrderSnapshotIds,
    reviewIds,
    exactSubjectLookupHashes: sortedUnique(input.exactHashCandidates),
    foldedSubjectLookupHashes: sortedUnique(input.foldedHashCandidates),
    opaqueResourceIds,
    rowCounts: {
      receipts: receiptIds.length,
      requests: requestIds.length,
      orderSnapshots: orderSnapshotIds.length,
      directOrderSnapshots: directOrderSnapshotIds.length,
      linkedOrderSnapshots: linkedOrderSnapshotIds.length,
      reviews: reviewIds.length,
    },
  };
}

async function lockIdempotencyKey(tx: Prisma.TransactionClient, storeId: string, idempotencyKeyHash: string): Promise<void> {
  await tx.$executeRaw`
    SELECT pg_advisory_xact_lock(hashtextextended(${`renuvex:review-email-dsr:${storeId}:${idempotencyKeyHash}`}, 0))
  `;
}

export async function createOrResumeReviewEmailDataSubjectRun(
  db: DataSubjectDb,
  input: {
    storeId: string;
    authorizedAppId: string;
    idempotencyKey: string;
    email: string;
    now?: Date;
  },
) {
  const now = input.now ?? new Date();
  const protectedSubject = protectedEmail(input.email);
  if (!protectedSubject) throw new ReviewEmailDataSubjectError('invalid_email', 400);
  const idempotencyKeyHash = hashDataSubjectIdempotencyKey(input.idempotencyKey);

  return db.$transaction(async (tx) => {
    const installation = await requireActiveIkasStoreInstallation(tx, input.storeId, input.authorizedAppId);
    await lockIdempotencyKey(tx, input.storeId, idempotencyKeyHash);
    const existing = await tx.reviewEmailDataSubjectRun.findUnique({
      where: { storeId_idempotencyKeyHash: { storeId: input.storeId, idempotencyKeyHash } },
    });
    if (existing) {
      if (!existing.requestDigestKeyVersion) throw new ReviewEmailDataSubjectError('request_digest_key_version_missing', 409);
      const exactSubjectHash = hashEmail(
        protectedSubject.exactCanonical,
        getReviewEmailPiiKeyRing(),
        existing.requestDigestKeyVersion,
      );
      const requestDigest = buildDataSubjectRequestDigest({ action: 'erase', exactSubjectHash });
      if (existing.requestDigest !== requestDigest || existing.action !== 'erase') {
        throw new ReviewEmailDataSubjectError('idempotency_key_reused', 409);
      }
      return { run: existing };
    }

    const requestDigest = buildDataSubjectRequestDigest({ action: 'erase', exactSubjectHash: protectedSubject.hash });

    await lockReviewEmailSubject(tx, {
      storeId: input.storeId,
      installationGeneration: installation.generation,
      foldedSubjectHash: protectedSubject.foldedHash,
    });
    const runId = randomUUID();
    await tx.reviewEmailSubjectBlock.upsert({
      where: {
        storeId_installationGeneration_foldedSubjectHash: {
          storeId: input.storeId,
          installationGeneration: installation.generation,
          foldedSubjectHash: protectedSubject.foldedHash,
        },
      },
      create: {
        storeId: input.storeId,
        installationGeneration: installation.generation,
        foldedSubjectHash: protectedSubject.foldedHash,
        foldedHashKeyVersion: protectedSubject.hashKeyVersion,
        normalizationVersion: protectedSubject.normalizationVersion,
        sourceRunId: runId,
      },
      update: { sourceRunId: runId, reason: 'subject_erasure' },
    });

    const requestIdsToFence = (await tx.reviewRequest.findMany({
      where: { storeId: input.storeId, recipientEmailHash: { in: protectedSubject.exactLookupHashes } },
      select: { id: true },
    })).map((request) => request.id);
    if (requestIdsToFence.length) {
      await tx.reviewRequest.updateMany({
        where: { id: { in: requestIdsToFence }, status: { notIn: ['submitted', 'cancelled', 'expired', 'suppressed'] } },
        data: { status: 'suppressed', cancelledAt: now, cancellationReason: 'subject_erasure_pending' },
      });
      await tx.reviewEmailJob.updateMany({
        where: { requestId: { in: requestIdsToFence }, status: { in: ['pending', 'leased', 'dispatched', 'processing', 'retrying', 'awaiting_confirmation'] } },
        data: { status: 'cancelled', completedAt: now, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'subject_erasure_pending' },
      });
      await tx.reviewRequestToken.updateMany({
        where: { requestId: { in: requestIdsToFence }, status: { in: ['prepared', 'active'] } },
        data: { status: 'revoked', revokedAt: now, revocationReason: 'subject_erasure_pending' },
      });
      await tx.reviewRequestSession.updateMany({
        where: { requestId: { in: requestIdsToFence }, status: 'active' },
        data: { status: 'revoked', revokedAt: now, revocationReason: 'subject_erasure_pending' },
      });
    }

    const inventory = await loadSubjectInventory(tx, {
      storeId: input.storeId,
      installationGeneration: installation.generation,
      exactCanonical: protectedSubject.exactCanonical,
      exactHashCandidates: protectedSubject.exactLookupHashes,
      foldedHashCandidates: protectedSubject.foldedLookupHashes,
    });
    const run = await tx.reviewEmailDataSubjectRun.create({
      data: {
        id: runId,
        storeId: input.storeId,
        installationGeneration: installation.generation,
        action: 'erase',
        normalizationVersion: protectedSubject.normalizationVersion,
        exactSubjectHash: protectedSubject.hash,
        exactSubjectKeyVersion: protectedSubject.hashKeyVersion,
        foldedSubjectHash: protectedSubject.foldedHash,
        foldedSubjectKeyVersion: protectedSubject.hashKeyVersion,
        idempotencyKeyHash,
        requestDigest,
        requestDigestKeyVersion: protectedSubject.hashKeyVersion,
        status: 'journal_pending',
        journalStatus: 'intent_recorded',
        progress: { phase: 'inventory_complete', inventory },
        rowCounts: inventory.rowCounts,
        startedAt: now,
      },
    });
    return { run };
  });
}

function journalPayloadForRun(
  run: {
    id: string;
    storeId: string;
    installationGeneration: number;
    normalizationVersion: number;
    exactSubjectKeyVersion: number | null;
    foldedSubjectKeyVersion: number | null;
    foldedSubjectHash: string | null;
    journalRetentionBaseAt: Date | null;
    createdAt: Date;
  },
  inventory: SubjectInventory,
): ReviewEmailErasureJournalPayload {
  if (!run.exactSubjectKeyVersion || !run.foldedSubjectKeyVersion || !run.foldedSubjectHash || !run.journalRetentionBaseAt) {
    throw new ReviewEmailDataSubjectError('subject_hash_key_version_missing', 409);
  }
  return buildReviewEmailErasureJournalPayload({
    schemaVersion: 1,
    runId: run.id,
    storeId: run.storeId,
    installationGeneration: run.installationGeneration,
    action: 'erase',
    exactHashKeyVersion: run.exactSubjectKeyVersion,
    foldedHashKeyVersion: run.foldedSubjectKeyVersion,
    normalizationVersion: run.normalizationVersion,
    foldedSubjectHash: run.foldedSubjectHash,
    exactSubjectLookupHashes: inventory.exactSubjectLookupHashes,
    foldedSubjectLookupHashes: inventory.foldedSubjectLookupHashes,
    opaqueResourceIds: inventory.opaqueResourceIds,
    rowCounts: inventory.rowCounts,
    actions: ['close_analytics', 'conditionally_erase_order_details', 'delete_verified_reviews', 'enqueue_media_cleanup'],
    createdAt: run.createdAt.toISOString(),
    retentionBaseAt: run.journalRetentionBaseAt.toISOString(),
  });
}

const DATA_SUBJECT_MAX_ATTEMPTS = 8;
const DATA_SUBJECT_LEASE_MS = 15 * 60 * 1000;
const DATA_SUBJECT_RETRY_BASE_MS = 15 * 60 * 1000;
const DATA_SUBJECT_RETRY_MAX_MS = 6 * 60 * 60 * 1000;

function dataSubjectRetryAt(now: Date, attempts: number): Date {
  const delay = Math.min(DATA_SUBJECT_RETRY_MAX_MS, DATA_SUBJECT_RETRY_BASE_MS * 2 ** Math.max(0, attempts - 1));
  return new Date(now.getTime() + delay);
}

type LockedOrderSnapshot = {
  id: string;
  customerEmailHash: string | null;
};

async function lockCandidateOrderSnapshots(
  tx: Prisma.TransactionClient,
  storeId: string,
  orderSnapshotIds: string[],
): Promise<LockedOrderSnapshot[]> {
  const ids = sortedUnique(orderSnapshotIds);
  if (!ids.length) return [];
  return tx.$queryRaw<LockedOrderSnapshot[]>(Prisma.sql`
    SELECT "id", "customerEmailHash"
    FROM "IkasOrderSnapshot"
    WHERE "storeId" = ${storeId}
      AND "id" IN (${Prisma.join(ids)})
    ORDER BY "id" ASC
    FOR UPDATE
  `);
}

async function claimDataSubjectRun(runId: string, now: Date) {
  const current = await prisma.reviewEmailDataSubjectRun.findUnique({ where: { id: runId } });
  if (!current) throw new ReviewEmailDataSubjectError('data_subject_run_not_found', 404);
  if (current.status === 'succeeded') return current;
  if (current.attempts >= DATA_SUBJECT_MAX_ATTEMPTS) {
    throw new ReviewEmailDataSubjectError('data_subject_retry_exhausted', 409);
  }
  const claimed = await prisma.reviewEmailDataSubjectRun.updateMany({
    where: {
      id: runId,
      attempts: current.attempts,
      status: current.status,
      OR: [{ nextRetryAt: null }, { nextRetryAt: { lte: now } }],
    },
    data: {
      status: 'processing',
      attempts: { increment: 1 },
      nextRetryAt: new Date(now.getTime() + DATA_SUBJECT_LEASE_MS),
      sanitizedErrorCode: null,
    },
  });
  if (claimed.count !== 1) throw new ReviewEmailDataSubjectError('data_subject_run_busy', 409, true);
  return prisma.reviewEmailDataSubjectRun.findUniqueOrThrow({ where: { id: runId } });
}

async function executeFrozenSubjectInventory(
  run: Awaited<ReturnType<typeof claimDataSubjectRun>>,
  inventory: SubjectInventory,
  now: Date,
) {
  if (!run.foldedSubjectHash || !run.foldedSubjectKeyVersion) {
    throw new ReviewEmailDataSubjectError('subject_hash_missing', 409);
  }
  const foldedSubjectHash = run.foldedSubjectHash;
  const foldedSubjectKeyVersion = run.foldedSubjectKeyVersion;
  return prisma.$transaction(async (tx) => {
    await lockReviewEmailSubject(tx, {
      storeId: run.storeId,
      installationGeneration: run.installationGeneration,
      foldedSubjectHash: run.foldedSubjectHash!,
    });
    const locked = await tx.$queryRaw<Array<{ status: string; journalStatus: string }>>`
      SELECT "status", "journalStatus" FROM "ReviewEmailDataSubjectRun" WHERE "id" = ${run.id} FOR UPDATE
    `;
    if (!locked[0] || locked[0].journalStatus !== 'verified') {
      throw new ReviewEmailDataSubjectError('journal_not_verified', 503, true);
    }
    if (locked[0].status === 'succeeded') return [];

    const candidateOrderSnapshotIds = sortedUnique([
      ...inventory.directOrderSnapshotIds,
      ...inventory.linkedOrderSnapshotIds,
    ]);
    const lockedOrderSnapshots = await lockCandidateOrderSnapshots(tx, run.storeId, candidateOrderSnapshotIds);
    const directOrderSnapshotIds = new Set(inventory.directOrderSnapshotIds);
    const exactSubjectLookupHashes = new Set(inventory.exactSubjectLookupHashes);

    await tx.reviewEmailSubjectBlock.upsert({
      where: {
        storeId_installationGeneration_foldedSubjectHash: {
          storeId: run.storeId,
          installationGeneration: run.installationGeneration,
          foldedSubjectHash,
        },
      },
      create: {
        storeId: run.storeId,
        installationGeneration: run.installationGeneration,
        foldedSubjectHash,
        foldedHashKeyVersion: foldedSubjectKeyVersion,
        normalizationVersion: run.normalizationVersion,
        sourceRunId: run.id,
      },
      update: { sourceRunId: run.id, reason: 'subject_erasure' },
    });

    for (const receiptId of inventory.receiptIds) {
      await closeAndReverseReceiptAnalytics(tx, receiptId, { now, reason: 'subject_erasure' });
    }
    const reviews = inventory.reviewIds.length
      ? await tx.review.findMany({ where: { id: { in: inventory.reviewIds }, storeId: run.storeId } })
      : [];
    const jobs = await enqueueReviewMediaCleanup(tx, reviews, 'data_subject_erasure');
    if (reviews.length) {
      await tx.review.deleteMany({ where: { id: { in: reviews.map((review) => review.id) }, storeId: run.storeId } });
      await applyReviewSummaryRemovals(tx, reviews);
    }
    const attemptIds = inventory.requestIds.length
      ? (await tx.reviewEmailAttempt.findMany({
          where: { job: { requestId: { in: inventory.requestIds } } },
          select: { id: true },
        })).map((attempt) => attempt.id)
      : [];
    if (attemptIds.length) await tx.reviewEmailEvent.deleteMany({ where: { attemptId: { in: attemptIds } } });
    const deletedRequests = inventory.requestIds.length
      ? await tx.reviewRequest.deleteMany({ where: { id: { in: inventory.requestIds }, storeId: run.storeId } })
      : { count: 0 };
    let deletedOrderSnapshots = 0;
    let scrubbedSharedOrderSnapshots = 0;
    let preservedChangedSubjectOrderSnapshots = 0;
    for (const orderSnapshot of lockedOrderSnapshots) {
      if (!directOrderSnapshotIds.has(orderSnapshot.id)) continue;
      if (!orderSnapshot.customerEmailHash || !exactSubjectLookupHashes.has(orderSnapshot.customerEmailHash)) {
        preservedChangedSubjectOrderSnapshots += 1;
        continue;
      }
      const remainingRequests = await tx.reviewRequest.count({
        where: { storeId: run.storeId, orderSnapshotId: orderSnapshot.id },
      });
      if (remainingRequests === 0) {
        const deleted = await tx.ikasOrderSnapshot.deleteMany({
          where: {
            id: orderSnapshot.id,
            storeId: run.storeId,
            customerEmailHash: { in: inventory.exactSubjectLookupHashes },
          },
        });
        deletedOrderSnapshots += deleted.count;
        continue;
      }
      const scrubbed = await tx.ikasOrderSnapshot.updateMany({
        where: {
          id: orderSnapshot.id,
          storeId: run.storeId,
          customerEmailHash: { in: inventory.exactSubjectLookupHashes },
        },
        data: {
          notificationsAccepted: null,
          guestCheckout: null,
          customerId: null,
          customerEmailHash: null,
          customerEmailFoldedHash: null,
          customerEmailHashKeyVersion: null,
          customerEmailEncrypted: null,
        },
      });
      scrubbedSharedOrderSnapshots += scrubbed.count;
    }
    if (inventory.foldedSubjectLookupHashes.length) {
      await tx.reviewEmailSuppression.deleteMany({
        where: { storeId: run.storeId, emailHash: { in: inventory.foldedSubjectLookupHashes } },
      });
    }
    const resultRowCounts = {
      ...inventory.rowCounts,
      matchedRequests: deletedRequests.count,
      deletedOrderSnapshots,
      scrubbedSharedOrderSnapshots,
      preservedChangedSubjectOrderSnapshots,
    };
    await tx.reviewEmailDataSubjectRun.update({
      where: { id: run.id },
      data: {
        status: 'succeeded',
        journalStatus: 'verified',
        progress: { phase: 'complete', result: resultRowCounts },
        rowCounts: resultRowCounts,
        exactSubjectHash: null,
        exactSubjectKeyVersion: null,
        foldedSubjectHash: null,
        foldedSubjectKeyVersion: null,
        subjectHashesClearedAt: now,
        finishedAt: now,
        nextRetryAt: null,
        sanitizedErrorCode: null,
      },
    });
    return jobs;
  });
}

export async function executeReviewEmailDataSubjectErasure(
  runId: string,
  input: { now?: Date } = {},
): Promise<{ runId: string; status: string; rowCounts: Prisma.JsonValue | null }> {
  const now = input.now ?? new Date();
  let run = await claimDataSubjectRun(runId, now);
  if (run.status === 'succeeded') return { runId, status: run.status, rowCounts: run.rowCounts };
  const inventory = inventoryFromProgress(run.progress);
  if (!inventory) {
    await prisma.reviewEmailDataSubjectRun.updateMany({
      where: { id: runId, status: 'processing' },
      data: {
        status: 'error',
        sanitizedErrorCode: 'data_subject_inventory_invalid',
        nextRetryAt: dataSubjectRetryAt(now, run.attempts),
      },
    });
    throw new ReviewEmailDataSubjectError('data_subject_inventory_invalid', 409);
  }

  try {
    if (!run.journalRetentionBaseAt) {
      await prisma.reviewEmailDataSubjectRun.updateMany({
        where: { id: run.id, journalRetentionBaseAt: null },
        data: { journalRetentionBaseAt: now },
      });
      run = await prisma.reviewEmailDataSubjectRun.findUniqueOrThrow({ where: { id: run.id } });
    }
    if (run.journalStatus !== 'verified') {
      await writeReviewEmailErasureJournal(prisma, {
        runId: run.id,
        createdAt: run.createdAt,
        retentionBaseAt: run.journalRetentionBaseAt!,
        installationGeneration: run.installationGeneration,
        payload: journalPayloadForRun(run, inventory),
      });
      run = await prisma.reviewEmailDataSubjectRun.findUniqueOrThrow({ where: { id: runId } });
    }
    if (run.journalStatus !== 'verified') throw new ReviewEmailDataSubjectError('journal_not_verified', 503, true);
    const cleanupJobs = await executeFrozenSubjectInventory(run, inventory, now);
    await Promise.allSettled(cleanupJobs.map((job) => dispatchMediaProviderJob(job.id)));
    const completed = await prisma.reviewEmailDataSubjectRun.findUniqueOrThrow({ where: { id: runId } });
    return { runId, status: completed.status, rowCounts: completed.rowCounts };
  } catch (error) {
    const normalizedError = error instanceof ReviewEmailJournalError && error.code === 'journal_not_configured'
      ? new ReviewEmailDataSubjectError('journal_not_configured', 503, true)
      : error;
    const failure = normalizeReviewEmailFailure('data_subject_erasure', normalizedError, { retryable: true });
    const current = await prisma.reviewEmailDataSubjectRun.findUnique({ where: { id: runId }, select: { attempts: true } });
    const attempts = current?.attempts ?? DATA_SUBJECT_MAX_ATTEMPTS;
    await prisma.reviewEmailDataSubjectRun.updateMany({
      where: { id: runId, status: { not: 'succeeded' } },
      data: {
        status: 'error',
        sanitizedErrorCode: failure.code,
        nextRetryAt: attempts < DATA_SUBJECT_MAX_ATTEMPTS ? dataSubjectRetryAt(now, attempts) : null,
      },
    });
    reportReviewEmailFailure('data_subject_erasure', failure, runId);
    throw normalizedError;
  }
}

export async function retryPendingReviewEmailDataSubjectRuns(input: { now?: Date; limit?: number } = {}) {
  const now = input.now ?? new Date();
  const limit = Math.min(Math.max(input.limit ?? 10, 1), 50);
  const staleInitialCutoff = new Date(now.getTime() - DATA_SUBJECT_LEASE_MS);
  const candidates = await prisma.reviewEmailDataSubjectRun.findMany({
    where: {
      status: { in: ['journal_pending', 'processing', 'error'] },
      attempts: { lt: DATA_SUBJECT_MAX_ATTEMPTS },
      OR: [
        { nextRetryAt: { lte: now } },
        { nextRetryAt: null, createdAt: { lte: staleInitialCutoff } },
      ],
    },
    orderBy: { createdAt: 'asc' },
    take: limit,
    select: { id: true },
  });
  let succeeded = 0;
  let failed = 0;
  const exhausted = await prisma.reviewEmailDataSubjectRun.count({
    where: { status: 'error', attempts: { gte: DATA_SUBJECT_MAX_ATTEMPTS } },
  });
  for (const candidate of candidates) {
    try {
      await executeReviewEmailDataSubjectErasure(candidate.id, { now });
      succeeded += 1;
    } catch {
      failed += 1;
    }
  }
  return { claimed: candidates.length, succeeded, failed, exhausted };
}

function inventoryFromJournalPayload(payload: ReviewEmailErasureJournalPayload): SubjectInventory {
  const ids = (prefix: string) => payload.opaqueResourceIds
    .filter((value) => value.startsWith(`${prefix}:`))
    .map((value) => value.slice(prefix.length + 1));
  return {
    receiptIds: ids('receipt'),
    requestIds: ids('request'),
    directOrderSnapshotIds: ids('order-direct'),
    linkedOrderSnapshotIds: ids('order-linked'),
    reviewIds: ids('review'),
    exactSubjectLookupHashes: payload.exactSubjectLookupHashes,
    foldedSubjectLookupHashes: payload.foldedSubjectLookupHashes,
    opaqueResourceIds: payload.opaqueResourceIds,
    rowCounts: payload.rowCounts,
  };
}

export async function replayReviewEmailDataSubjectJournalIntent(
  payload: ReviewEmailErasureJournalPayload,
  evidence: VerifiedJournalEvidence,
  now = new Date(),
) {
  const inventory = inventoryFromJournalPayload(payload);
  const retentionBaseAt = new Date(payload.retentionBaseAt);
  const createdAt = new Date(payload.createdAt);
  if (!Number.isFinite(retentionBaseAt.getTime()) || !Number.isFinite(createdAt.getTime())) {
    throw new ReviewEmailDataSubjectError('journal_payload_timestamp_invalid', 409);
  }
  await prisma.reviewEmailDataSubjectRun.upsert({
    where: { id: payload.runId },
    create: {
      id: payload.runId,
      storeId: payload.storeId,
      installationGeneration: payload.installationGeneration,
      action: 'erase',
      normalizationVersion: payload.normalizationVersion,
      foldedSubjectHash: payload.foldedSubjectHash,
      foldedSubjectKeyVersion: payload.foldedHashKeyVersion,
      idempotencyKeyHash: sha256(`journal-replay:${payload.runId}`),
      requestDigest: evidence.payloadSha256,
      journalKey: evidence.key,
      journalPayloadSha256: evidence.payloadSha256,
      journalVersionId: evidence.versionId,
      journalEtag: evidence.etag,
      journalChecksumSha256: evidence.checksumSha256,
      journalRetentionBaseAt: retentionBaseAt,
      journalObjectLockRetainUntil: evidence.objectLockRetainUntil,
      journalStatus: 'verified',
      status: 'journal_pending',
      progress: { phase: 'journal_replay_pending', inventory },
      rowCounts: payload.rowCounts,
      startedAt: createdAt,
      createdAt,
    },
    update: {
      journalKey: evidence.key,
      journalPayloadSha256: evidence.payloadSha256,
      journalVersionId: evidence.versionId,
      journalEtag: evidence.etag,
      journalChecksumSha256: evidence.checksumSha256,
      journalRetentionBaseAt: retentionBaseAt,
      journalObjectLockRetainUntil: evidence.objectLockRetainUntil,
      journalStatus: 'verified',
    },
  });
  const current = await prisma.reviewEmailDataSubjectRun.findUniqueOrThrow({ where: { id: payload.runId } });
  if (current.status === 'succeeded') return current;
  await prisma.reviewEmailDataSubjectRun.update({
    where: { id: payload.runId },
    data: {
      status: 'journal_pending',
      attempts: 0,
      nextRetryAt: null,
      foldedSubjectHash: payload.foldedSubjectHash,
      foldedSubjectKeyVersion: payload.foldedHashKeyVersion,
      progress: { phase: 'journal_replay_pending', inventory },
    },
  });
  await executeReviewEmailDataSubjectErasure(payload.runId, { now });
  return prisma.reviewEmailDataSubjectRun.findUniqueOrThrow({ where: { id: payload.runId } });
}

export async function getReviewEmailDataSubjectRun(storeId: string, authorizedAppId: string, runId: string) {
  const installation = await prisma.ikasStoreInstallation.findFirst({
    where: { storeId, authorizedAppId, status: 'active' },
    select: { generation: true },
  });
  if (!installation) throw new ReviewEmailDataSubjectError('ikas_installation_inactive', 409);
  return prisma.reviewEmailDataSubjectRun.findFirst({
    where: { id: runId, storeId, installationGeneration: installation.generation },
    select: {
      id: true,
      action: true,
      status: true,
      journalStatus: true,
      rowCounts: true,
      progress: true,
      sanitizedErrorCode: true,
      startedAt: true,
      finishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
