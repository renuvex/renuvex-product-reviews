import { prisma } from '@/lib/prisma';

const MAX_ERASURE_ATTEMPTS = 8;
const BASE_RETRY_DELAY_MS = 5 * 60 * 1000;
const MAX_RETRY_DELAY_MS = 6 * 60 * 60 * 1000;

export type StoreReviewEmailErasureResult = {
  runId: string;
  rowCounts: Record<string, number>;
};

export type StoreReviewEmailErasureRetryResult = {
  claimed: number;
  succeeded: number;
  failed: number;
  exhausted: number;
};

function erasureRetryAt(now: Date, attempts: number): Date {
  const delay = Math.min(MAX_RETRY_DELAY_MS, BASE_RETRY_DELAY_MS * 2 ** Math.max(0, attempts - 1));
  return new Date(now.getTime() + delay);
}

async function executeStoreReviewEmailErasure(
  runId: string,
  storeId: string,
  now = new Date(),
): Promise<StoreReviewEmailErasureResult> {
  try {
    const rowCounts = await prisma.$transaction(async (tx) => {
      const requestRows = await tx.reviewRequest.findMany({
        where: { storeId },
        select: { id: true, jobs: { select: { id: true, attemptsLog: { select: { id: true } } } } },
      });
      const requestIds = requestRows.map((request) => request.id);
      const jobIds = requestRows.flatMap((request) => request.jobs.map((job) => job.id));
      const attemptIds = requestRows.flatMap((request) =>
        request.jobs.flatMap((job) => job.attemptsLog.map((attempt) => attempt.id))
      );

      const counts: Record<string, number> = {
        authToken: await tx.authToken.count({ where: { merchantId: storeId } }),
        reviewEmailSettings: await tx.reviewEmailSettings.count({ where: { storeId } }),
        reviewEmailSuppression: await tx.reviewEmailSuppression.count({ where: { storeId } }),
        ikasOrderWebhookEvent: await tx.ikasOrderWebhookEvent.count({ where: { storeId } }),
        ikasOrderReconciliationCursor: await tx.ikasOrderReconciliationCursor.count({ where: { storeId } }),
        reviewRequest: requestIds.length,
        reviewEmailJob: jobIds.length,
        reviewEmailAttempt: attemptIds.length,
        reviewEmailEvent: attemptIds.length
          ? await tx.reviewEmailEvent.count({ where: { attemptId: { in: attemptIds } } })
          : 0,
        reviewRequestToken: requestIds.length
          ? await tx.reviewRequestToken.count({ where: { requestId: { in: requestIds } } })
          : 0,
        reviewRequestSession: requestIds.length
          ? await tx.reviewRequestSession.count({ where: { requestId: { in: requestIds } } })
          : 0,
        ikasOrderLineSnapshot: await tx.ikasOrderLineSnapshot.count({ where: { storeId } }),
        ikasOrderSnapshot: await tx.ikasOrderSnapshot.count({ where: { storeId } }),
      };

      await tx.storeDataErasureRun.update({
        where: { id: runId },
        data: { progress: { phase: 'deleting', rowCounts: counts } },
      });

      if (attemptIds.length) {
        await tx.reviewEmailEvent.deleteMany({ where: { attemptId: { in: attemptIds } } });
      }
      await tx.reviewRequest.deleteMany({ where: { storeId } });
      await tx.ikasOrderSnapshot.deleteMany({ where: { storeId } });
      await tx.reviewEmailSuppression.deleteMany({ where: { storeId } });
      await tx.ikasOrderWebhookEvent.deleteMany({ where: { storeId } });
      await tx.ikasOrderReconciliationCursor.deleteMany({ where: { storeId } });
      await tx.reviewEmailSettings.deleteMany({ where: { storeId } });
      await tx.authToken.deleteMany({ where: { merchantId: storeId } });

      await tx.storeDataErasureRun.update({
        where: { id: runId },
        data: {
          status: 'succeeded',
          finishedAt: now,
          nextRetryAt: null,
          rowCounts: counts,
          progress: { phase: 'complete' },
          error: null,
        },
      });
      return counts;
    });

    return { runId, rowCounts };
  } catch (error) {
    const current = await prisma.storeDataErasureRun.findUnique({
      where: { id: runId },
      select: { attempts: true },
    });
    const attempts = current?.attempts ?? MAX_ERASURE_ATTEMPTS;
    await prisma.storeDataErasureRun.update({
      where: { id: runId },
      data: {
        status: 'error',
        finishedAt: now,
        nextRetryAt: attempts < MAX_ERASURE_ATTEMPTS ? erasureRetryAt(now, attempts) : null,
        progress: { phase: attempts < MAX_ERASURE_ATTEMPTS ? 'retry_scheduled' : 'exhausted' },
        error: error instanceof Error ? error.message.slice(0, 512) : 'unknown',
      },
    });
    throw error;
  }
}

export async function eraseStoreReviewEmailData(
  storeId: string,
  input: { triggerSource: string; now?: Date },
): Promise<StoreReviewEmailErasureResult> {
  const now = input.now ?? new Date();
  const run = await prisma.storeDataErasureRun.create({
    data: {
      storeId,
      triggerSource: input.triggerSource,
      status: 'processing',
      attempts: 1,
      progress: { phase: 'inventory' },
    },
  });
  return executeStoreReviewEmailErasure(run.id, storeId, now);
}

export async function retryFailedStoreReviewEmailErasures(
  input: { now?: Date; limit?: number } = {},
): Promise<StoreReviewEmailErasureRetryResult> {
  const now = input.now ?? new Date();
  const limit = Math.min(Math.max(input.limit ?? 10, 1), 50);
  const candidates = await prisma.storeDataErasureRun.findMany({
    where: {
      status: 'error',
      attempts: { lt: MAX_ERASURE_ATTEMPTS },
      nextRetryAt: { lte: now },
    },
    orderBy: { nextRetryAt: 'asc' },
    take: limit,
    select: { id: true, storeId: true, attempts: true },
  });
  const exhausted = await prisma.storeDataErasureRun.count({
    where: { status: 'error', attempts: { gte: MAX_ERASURE_ATTEMPTS } },
  });

  let claimed = 0;
  let succeeded = 0;
  let failed = 0;
  for (const candidate of candidates) {
    const claim = await prisma.storeDataErasureRun.updateMany({
      where: {
        id: candidate.id,
        status: 'error',
        attempts: candidate.attempts,
        nextRetryAt: { lte: now },
      },
      data: {
        status: 'processing',
        attempts: { increment: 1 },
        nextRetryAt: null,
        progress: { phase: 'retrying' },
        error: null,
      },
    });
    if (claim.count !== 1) continue;
    claimed += 1;
    try {
      await executeStoreReviewEmailErasure(candidate.id, candidate.storeId, now);
      succeeded += 1;
    } catch {
      failed += 1;
    }
  }

  return { claimed, succeeded, failed, exhausted };
}
