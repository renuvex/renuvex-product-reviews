import type { IkasStoreInstallation, Prisma, StoreDataErasureRun } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  beginIkasStoreInstallationErasure,
  lockIkasStoreInstallationLifecycle,
} from '@/lib/ikas-installation-lifecycle';
import { enqueueReviewMediaCleanup } from '@/lib/review-deletion';
import { applyReviewSummaryRemovals } from '@/lib/review-summary';
import { enqueueMediaProviderJob } from '@/lib/media/outbox';
import { dispatchMediaProviderJob } from '@/lib/media/jobs';
import { MEDIA_JOB_ACTIONS, VIDEO_PROVIDER } from '@/lib/media/constants';
import { AWS_REVIEW_IMAGE_PROVIDER } from '@/lib/media/providers/aws-review-image';
import {
  buildReviewEmailStoreErasureJournalPayload,
  writeReviewEmailStoreErasureJournal,
  type ReviewEmailStoreErasureJournalPayload,
  type VerifiedJournalEvidence,
} from '@/lib/review-email/journal';
import { dispatchStoreDataErasureRetry } from '@/lib/review-email/erasure-dispatcher';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';

const MAX_ERASURE_ATTEMPTS = 8;
const BASE_RETRY_DELAY_MS = 5 * 60 * 1000;
const MAX_RETRY_DELAY_MS = 6 * 60 * 60 * 1000;
const ERASURE_BATCH_SIZE = 100;
const ERASURE_MAX_BATCHES = 10;
const ERASURE_MAX_DURATION_MS = 8_000;

type ErasurePhase = 'reviews' | 'pending_images' | 'video_sessions' | 'review_requests' | 'review_batches' | 'orders' | 'finalize' | 'complete';
type ErasureProgress = { phase: ErasurePhase; deleted: Record<string, number> };

export type StoreReviewEmailErasureResult = {
  runId: string;
  state: 'succeeded' | 'pending' | 'stale_ignored' | 'exhausted';
  rowCounts: Record<string, number>;
};

export type StoreReviewEmailErasureRetryResult = {
  claimed: number;
  succeeded: number;
  pending: number;
  failed: number;
  exhausted: number;
};

function erasureRetryAt(now: Date, attempts: number): Date {
  const delay = Math.min(MAX_RETRY_DELAY_MS, BASE_RETRY_DELAY_MS * 2 ** Math.max(0, attempts - 1));
  return new Date(now.getTime() + delay);
}

function parseProgress(value: Prisma.JsonValue | null): ErasureProgress {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { phase: 'reviews', deleted: {} };
  const row = value as Record<string, Prisma.JsonValue>;
  const allowed: ErasurePhase[] = ['reviews', 'pending_images', 'video_sessions', 'review_requests', 'review_batches', 'orders', 'finalize', 'complete'];
  const phase = typeof row.phase === 'string' && allowed.includes(row.phase as ErasurePhase)
    ? row.phase as ErasurePhase
    : 'reviews';
  const deleted = row.deleted && typeof row.deleted === 'object' && !Array.isArray(row.deleted)
    ? Object.fromEntries(Object.entries(row.deleted).map(([key, count]) => [key, typeof count === 'number' ? count : 0]))
    : {};
  return { phase, deleted };
}

function addCount(progress: ErasureProgress, name: string, count: number): ErasureProgress {
  return { ...progress, deleted: { ...progress.deleted, [name]: (progress.deleted[name] ?? 0) + count } };
}

type StoreErasureMode = 'live_uninstall' | 'journal_restore_replay';

type StoreErasureFenceResult =
  | {
      action: 'proceed';
      installation: IkasStoreInstallation | null;
      mode: StoreErasureMode;
      run: StoreDataErasureRun;
    }
  | {
      action: 'terminal';
      run: StoreDataErasureRun;
      state: 'succeeded' | 'stale_ignored';
    };

function isTerminalStoreErasureStatus(status: string): status is 'succeeded' | 'stale_ignored' {
  return status === 'succeeded' || status === 'stale_ignored';
}

function isStoreErasureReplay(run: StoreDataErasureRun): boolean {
  return run.triggerSource === 'journal_restore_replay';
}

async function markStoreErasureRunStale(
  tx: Prisma.TransactionClient,
  run: StoreDataErasureRun,
  now: Date,
): Promise<StoreDataErasureRun> {
  await tx.storeDataErasureRun.update({
    where: { id: run.id },
    data: {
      status: 'stale_ignored',
      finishedAt: now,
      nextRetryAt: null,
      sanitizedErrorCode: null,
    },
  });
  return {
    ...run,
    status: 'stale_ignored',
    finishedAt: now,
    nextRetryAt: null,
    sanitizedErrorCode: null,
  };
}

async function lockAndFenceStoreErasureRun(
  tx: Prisma.TransactionClient,
  input: {
    runId: string;
    storeId: string;
    now: Date;
    requireVerifiedJournal?: boolean;
  },
): Promise<StoreErasureFenceResult> {
  const installation = await lockIkasStoreInstallationLifecycle(tx, input.storeId);
  const rows = await tx.$queryRaw<StoreDataErasureRun[]>`
    SELECT * FROM "StoreDataErasureRun"
    WHERE "id" = ${input.runId}
    FOR UPDATE
  `;
  const run = rows[0];
  if (!run || run.storeId !== input.storeId) throw new Error('store_erasure_run_not_found');
  if (run.status === 'stale_ignored') {
    const finishedAt = run.finishedAt ?? input.now;
    if (run.finishedAt === null || run.nextRetryAt !== null || run.sanitizedErrorCode !== null) {
      await tx.storeDataErasureRun.update({
        where: { id: run.id },
        data: {
          finishedAt,
          nextRetryAt: null,
          sanitizedErrorCode: null,
        },
      });
    }
    return {
      action: 'terminal',
      run: {
        ...run,
        finishedAt,
        nextRetryAt: null,
        sanitizedErrorCode: null,
      },
      state: 'stale_ignored',
    };
  }
  if (run.status === 'succeeded') {
    return { action: 'terminal', run, state: 'succeeded' };
  }
  if (!run.installationGeneration) throw new Error('store_erasure_generation_missing');

  if (isStoreErasureReplay(run)) {
    if (run.authorizedAppId !== null) throw new Error('store_erasure_replay_identity_invalid');
    if (input.requireVerifiedJournal && run.journalStatus !== 'verified') {
      throw new Error('store_erasure_journal_not_verified');
    }
    const newerInstallation = installation && (
      installation.generation > run.installationGeneration ||
      installation.activatedAt.getTime() >= run.createdAt.getTime()
    );
    if (newerInstallation) {
      const staleRun = await markStoreErasureRunStale(tx, run, input.now);
      return { action: 'terminal', run: staleRun, state: 'stale_ignored' };
    }
    return { action: 'proceed', installation, mode: 'journal_restore_replay', run };
  }

  if (!run.authorizedAppId) throw new Error('store_erasure_authorized_app_missing');
  const exactLiveInstallation = installation &&
    installation.authorizedAppId === run.authorizedAppId &&
    installation.generation === run.installationGeneration &&
    installation.status === 'erasing';
  if (!exactLiveInstallation) {
    const staleRun = await markStoreErasureRunStale(tx, run, input.now);
    return { action: 'terminal', run: staleRun, state: 'stale_ignored' };
  }
  if (input.requireVerifiedJournal && run.journalStatus !== 'verified') {
    throw new Error('store_erasure_journal_not_verified');
  }
  return { action: 'proceed', installation, mode: 'live_uninstall', run };
}

async function prepareStoreErasure(runId: string, storeId: string, authorizedAppId: string, now: Date) {
  return prisma.$transaction(async (tx) => {
    await lockIkasStoreInstallationLifecycle(tx, storeId);
    const rows = await tx.$queryRaw<StoreDataErasureRun[]>`
      SELECT * FROM "StoreDataErasureRun"
      WHERE "id" = ${runId}
      FOR UPDATE
    `;
    const lockedRun = rows[0];
    if (
      !lockedRun ||
      lockedRun.storeId !== storeId ||
      lockedRun.authorizedAppId !== authorizedAppId
    ) {
      throw new Error('store_erasure_run_not_found');
    }
    if (lockedRun.installationGeneration) {
      return {
        stale: lockedRun.status === 'stale_ignored',
        generation: lockedRun.installationGeneration,
      };
    }
    const decision = await beginIkasStoreInstallationErasure(tx, { storeId, authorizedAppId, now });
    if (decision.action === 'stale') {
      await tx.storeDataErasureRun.update({
        where: { id: runId },
        data: {
          installationGeneration: decision.installation.generation,
          status: 'stale_ignored',
          finishedAt: now,
          nextRetryAt: null,
          sanitizedErrorCode: null,
        },
      });
      return { stale: true, generation: decision.installation.generation };
    }
    await tx.storeDataErasureRun.update({
      where: { id: runId },
      data: {
        installationGeneration: decision.installation.generation,
        journalRetentionBaseAt: now,
        progress: { phase: 'reviews', deleted: {} },
      },
    });
    return { stale: false, generation: decision.installation.generation };
  });
}

async function ensureStoreErasureJournal(
  runId: string,
  storeId: string,
  now: Date,
): Promise<StoreErasureFenceResult> {
  const preflight = await prisma.$transaction(async (tx) => {
    const fenced = await lockAndFenceStoreErasureRun(tx, { runId, storeId, now });
    if (fenced.action === 'terminal') return fenced;
    if (fenced.run.journalRetentionBaseAt) return fenced;
    const run = await tx.storeDataErasureRun.update({
      where: { id: runId },
      data: { journalRetentionBaseAt: now },
    });
    return { ...fenced, run };
  });
  if (preflight.action === 'terminal' || preflight.run.journalStatus === 'verified') {
    return preflight;
  }

  const installationGeneration = preflight.run.installationGeneration;
  const retentionBaseAt = preflight.run.journalRetentionBaseAt;
  if (!installationGeneration) throw new Error('store_erasure_generation_missing');
  if (!retentionBaseAt) throw new Error('store_erasure_retention_base_missing');
  try {
    await writeReviewEmailStoreErasureJournal(prisma, {
      runId: preflight.run.id,
      createdAt: preflight.run.createdAt,
      retentionBaseAt,
      installationGeneration,
      payload: buildReviewEmailStoreErasureJournalPayload({
        schemaVersion: 1,
        runId: preflight.run.id,
        storeId: preflight.run.storeId,
        installationGeneration,
        action: 'store_uninstall',
        actions: [
          'delete_review_email_data',
          'delete_verified_reviews',
          'enqueue_media_cleanup',
          'delete_pending_upload_data',
          'delete_auth_token',
        ],
        createdAt: preflight.run.createdAt.toISOString(),
        retentionBaseAt: retentionBaseAt.toISOString(),
      }),
    });
  } catch (error) {
    const afterFailure = await prisma.$transaction((tx) =>
      lockAndFenceStoreErasureRun(tx, { runId, storeId, now }),
    );
    if (afterFailure.action === 'terminal') return afterFailure;
    throw error;
  }

  return prisma.$transaction((tx) =>
    lockAndFenceStoreErasureRun(tx, {
      runId,
      storeId,
      now,
      requireVerifiedJournal: true,
    }),
  );
}

async function processStoreErasureBatch(runId: string, storeId: string, now: Date) {
  return prisma.$transaction(async (tx) => {
    const fenced = await lockAndFenceStoreErasureRun(tx, {
      runId,
      storeId,
      now,
      requireVerifiedJournal: true,
    });
    if (fenced.action === 'terminal') {
      return {
        progress: parseProgress(fenced.run.progress),
        jobs: [] as Array<{ id: string }>,
        terminalState: fenced.state,
      };
    }
    let progress = parseProgress(fenced.run.progress);
    const jobs: Array<{ id: string }> = [];

    if (progress.phase === 'reviews') {
      const reviews = await tx.review.findMany({ where: { storeId }, orderBy: { id: 'asc' }, take: ERASURE_BATCH_SIZE });
      if (reviews.length) {
        jobs.push(...await enqueueReviewMediaCleanup(tx, reviews, 'store_uninstall'));
        await tx.review.deleteMany({ where: { id: { in: reviews.map((review) => review.id) }, storeId } });
        await applyReviewSummaryRemovals(tx, reviews);
        progress = addCount(progress, 'reviews', reviews.length);
      } else progress = { ...progress, phase: 'pending_images' };
    } else if (progress.phase === 'pending_images') {
      const pending = await tx.pendingReviewImage.findMany({
        where: { storeId },
        orderBy: { publicId: 'asc' },
        take: ERASURE_BATCH_SIZE,
        select: { publicId: true, provider: true, providerAssetId: true, uploadSessionId: true },
      });
      for (const item of pending) {
        if (item.provider === AWS_REVIEW_IMAGE_PROVIDER && item.providerAssetId) {
          jobs.push(await enqueueMediaProviderJob(tx, {
            dedupeKey: `store-uninstall:${runId}:image:${item.providerAssetId}`,
            storeId,
            provider: AWS_REVIEW_IMAGE_PROVIDER,
            action: MEDIA_JOB_ACTIONS.cleanupImage,
            resourceType: 'image',
            payload: { families: [{ storeId, assetId: item.providerAssetId }], reason: 'store_uninstall' },
          }));
        } else if (item.provider === VIDEO_PROVIDER) {
          jobs.push(await enqueueMediaProviderJob(tx, {
            dedupeKey: `store-uninstall:${runId}:pending-video:${item.publicId}`,
            storeId,
            uploadSessionId: item.uploadSessionId,
            provider: VIDEO_PROVIDER,
            action: MEDIA_JOB_ACTIONS.cleanupVideo,
            resourceType: 'video',
            payload: { pendingPublicId: item.publicId, providerAssetId: item.providerAssetId ?? undefined },
          }));
        }
      }
      if (pending.length) {
        await tx.pendingReviewImage.deleteMany({ where: { publicId: { in: pending.map((item) => item.publicId) }, storeId } });
        progress = addCount(progress, 'pendingReviewImages', pending.length);
      } else progress = { ...progress, phase: 'video_sessions' };
    } else if (progress.phase === 'video_sessions') {
      const sessions = await tx.videoUploadSession.findMany({ where: { storeId }, orderBy: { id: 'asc' }, take: ERASURE_BATCH_SIZE });
      for (const session of sessions) {
        jobs.push(await enqueueMediaProviderJob(tx, {
          dedupeKey: `store-uninstall:${runId}:video:${session.id}`,
          storeId,
          uploadSessionId: session.id,
          provider: VIDEO_PROVIDER,
          action: MEDIA_JOB_ACTIONS.cleanupVideo,
          resourceType: 'video',
          payload: {
            providerUploadId: session.providerUploadId ?? undefined,
            providerAssetId: session.providerAssetId ?? undefined,
            pendingPublicId: session.publicId ?? undefined,
          },
        }));
      }
      if (sessions.length) {
        await tx.videoUploadSession.deleteMany({ where: { id: { in: sessions.map((session) => session.id) }, storeId } });
        progress = addCount(progress, 'videoUploadSessions', sessions.length);
      } else progress = { ...progress, phase: 'review_requests' };
    } else if (progress.phase === 'review_requests') {
      const requests = await tx.reviewRequest.findMany({
        where: { storeId },
        orderBy: { id: 'asc' },
        take: ERASURE_BATCH_SIZE,
        select: { id: true, jobs: { select: { attemptsLog: { select: { id: true } } } } },
      });
      const attemptIds = requests.flatMap((request) => request.jobs.flatMap((job) => job.attemptsLog.map((attempt) => attempt.id)));
      if (attemptIds.length) await tx.reviewEmailEvent.deleteMany({ where: { attemptId: { in: attemptIds } } });
      if (requests.length) {
        await tx.reviewRequest.deleteMany({ where: { id: { in: requests.map((request) => request.id) }, storeId } });
        progress = addCount(progress, 'reviewRequests', requests.length);
      } else progress = { ...progress, phase: 'review_batches' };
    } else if (progress.phase === 'review_batches') {
      const batches = await tx.reviewEmailBatch.findMany({
        where: { storeId },
        orderBy: { id: 'asc' },
        take: ERASURE_BATCH_SIZE,
        select: { id: true, jobs: { select: { attemptsLog: { select: { id: true } } } } },
      });
      const attemptIds = batches.flatMap((batch) => batch.jobs.flatMap((job) => job.attemptsLog.map((attempt) => attempt.id)));
      if (attemptIds.length) await tx.reviewEmailEvent.deleteMany({ where: { attemptId: { in: attemptIds } } });
      if (batches.length) {
        await tx.reviewEmailBatch.deleteMany({ where: { id: { in: batches.map((batch) => batch.id) }, storeId } });
        progress = addCount(progress, 'reviewEmailBatches', batches.length);
      } else progress = { ...progress, phase: 'orders' };
    } else if (progress.phase === 'orders') {
      const orders = await tx.ikasOrderSnapshot.findMany({ where: { storeId }, orderBy: { id: 'asc' }, take: ERASURE_BATCH_SIZE, select: { id: true } });
      if (orders.length) {
        await tx.ikasOrderSnapshot.deleteMany({ where: { id: { in: orders.map((order) => order.id) }, storeId } });
        progress = addCount(progress, 'orderSnapshots', orders.length);
      } else progress = { ...progress, phase: 'finalize' };
    } else if (progress.phase === 'finalize') {
      const counts = {
        reviewEmailSettings: (await tx.reviewEmailSettings.deleteMany({ where: { storeId } })).count,
        reviewEmailUnsubscribeTokens: (await tx.reviewEmailUnsubscribeToken.deleteMany({ where: { storeId } })).count,
        reviewEmailSuppressions: (await tx.reviewEmailSuppression.deleteMany({ where: { storeId } })).count,
        reviewEmailSubjectBlocks: (await tx.reviewEmailSubjectBlock.deleteMany({ where: { storeId } })).count,
        reviewEmailContributions: (await tx.reviewEmailMetricContribution.deleteMany({ where: { storeId } })).count,
        reviewEmailMetrics: (await tx.reviewEmailDailyMetric.deleteMany({ where: { storeId } })).count,
        reviewEmailDataSubjectRuns: (await tx.reviewEmailDataSubjectRun.deleteMany({ where: { storeId } })).count,
        reviewRequestReceipts: (await tx.reviewRequestReceipt.deleteMany({ where: { storeId } })).count,
        ikasOrderWebhookEvents: (await tx.ikasOrderWebhookEvent.deleteMany({ where: { storeId } })).count,
        reconciliationCursors: (await tx.ikasOrderReconciliationCursor.deleteMany({ where: { storeId } })).count,
        storeVideoUsage: (await tx.storeVideoUsage.deleteMany({ where: { storeId } })).count,
        authTokens: fenced.mode === 'live_uninstall'
          ? (await tx.authToken.deleteMany({
              where: {
                merchantId: storeId,
                authorizedAppId: fenced.run.authorizedAppId!,
              },
            })).count
          : (await tx.authToken.deleteMany({ where: { merchantId: storeId } })).count,
      };
      for (const [name, count] of Object.entries(counts)) progress = addCount(progress, name, count);
      if (fenced.mode === 'live_uninstall') {
        const installation = await tx.ikasStoreInstallation.updateMany({
          where: {
            storeId,
            authorizedAppId: fenced.run.authorizedAppId!,
            generation: fenced.run.installationGeneration!,
            status: 'erasing',
          },
          data: { status: 'erased', stateVersion: { increment: 1 }, erasedAt: now },
        });
        if (installation.count !== 1) throw new Error('store_erasure_installation_finalize_conflict');
      } else if (fenced.installation) {
        const installation = await tx.ikasStoreInstallation.updateMany({
          where: {
            storeId,
            generation: fenced.installation.generation,
            stateVersion: fenced.installation.stateVersion,
          },
          data: { status: 'erased', stateVersion: { increment: 1 }, erasedAt: now },
        });
        if (installation.count !== 1) throw new Error('store_erasure_installation_finalize_conflict');
      }
      progress = { ...progress, phase: 'complete' };
    }

    await tx.storeDataErasureRun.update({
      where: { id: runId },
      data: {
        progress,
        rowCounts: progress.deleted,
        ...(progress.phase === 'complete'
          ? { status: 'succeeded', finishedAt: now, nextRetryAt: null, sanitizedErrorCode: null }
          : { status: 'processing' }),
      },
    });
    return { progress, jobs, terminalState: null };
  });
}

async function executeStoreReviewEmailErasure(
  runId: string,
  storeId: string,
  authorizedAppId: string | null,
  now = new Date(),
  options: { dispatchRetry?: boolean } = {},
): Promise<StoreReviewEmailErasureResult> {
  try {
    let run = await prisma.storeDataErasureRun.findUniqueOrThrow({ where: { id: runId } });
    if (!run.installationGeneration) {
      if (!authorizedAppId) throw new Error('store_erasure_authorized_app_missing');
      const prepared = await prepareStoreErasure(runId, storeId, authorizedAppId, now);
      if (prepared.stale) return { runId, state: 'stale_ignored', rowCounts: {} };
    }
    const journal = await ensureStoreErasureJournal(runId, storeId, now);
    if (journal.action === 'terminal') {
      return {
        runId,
        state: journal.state,
        rowCounts: parseProgress(journal.run.progress).deleted,
      };
    }
    run = journal.run;
    if (run.journalStatus !== 'verified') throw new Error('store_erasure_journal_not_verified');

    const startedAt = Date.now();
    const jobIds = new Set<string>();
    let progress = parseProgress(run.progress);
    let terminalState: 'succeeded' | 'stale_ignored' | null = null;
    for (let batch = 0; batch < ERASURE_MAX_BATCHES && Date.now() - startedAt < ERASURE_MAX_DURATION_MS && progress.phase !== 'complete'; batch += 1) {
      const result = await processStoreErasureBatch(runId, storeId, now);
      progress = result.progress;
      result.jobs.forEach((job) => jobIds.add(job.id));
      if (result.terminalState) {
        terminalState = result.terminalState;
        break;
      }
    }
    await Promise.allSettled([...jobIds].map((jobId) => dispatchMediaProviderJob(jobId)));
    if (terminalState) return { runId, state: terminalState, rowCounts: progress.deleted };
    if (progress.phase === 'complete') return { runId, state: 'succeeded', rowCounts: progress.deleted };
    const pending = await prisma.$transaction(async (tx) => {
      const fenced = await lockAndFenceStoreErasureRun(tx, { runId, storeId, now });
      if (fenced.action === 'terminal') return fenced;
      const updated = await tx.storeDataErasureRun.update({
        where: { id: runId },
        data: { status: 'pending', attempts: 0, nextRetryAt: erasureRetryAt(now, 0), finishedAt: null },
      });
      return { ...fenced, run: updated };
    });
    if (pending.action === 'terminal') {
      return {
        runId,
        state: pending.state,
        rowCounts: parseProgress(pending.run.progress).deleted,
      };
    }
    if (options.dispatchRetry !== false) {
      await dispatchStoreDataErasureRetry(runId, Math.ceil((erasureRetryAt(now, 0).getTime() - now.getTime()) / 1000));
    }
    return { runId, state: 'pending', rowCounts: progress.deleted };
  } catch (error) {
    const current = await prisma.storeDataErasureRun.findUnique({ where: { id: runId }, select: { attempts: true } });
    const attempts = (current?.attempts ?? MAX_ERASURE_ATTEMPTS) + 1;
    const failure = normalizeReviewEmailFailure('store_erasure', error, { retryable: true });
    await prisma.storeDataErasureRun.updateMany({
      where: { id: runId, status: { notIn: ['succeeded', 'stale_ignored'] } },
      data: {
        status: 'error',
        attempts,
        finishedAt: null,
        nextRetryAt: attempts < MAX_ERASURE_ATTEMPTS ? erasureRetryAt(now, attempts) : null,
        sanitizedErrorCode: failure.code,
      },
    });
    if (options.dispatchRetry !== false && attempts < MAX_ERASURE_ATTEMPTS) {
      await dispatchStoreDataErasureRetry(runId, Math.ceil((erasureRetryAt(now, attempts).getTime() - now.getTime()) / 1000));
    }
    reportReviewEmailFailure('store_erasure', failure, runId);
    throw error;
  }
}

export async function processStoreDataErasureRun(runId: string, now = new Date()) {
  let run = await prisma.storeDataErasureRun.findUnique({ where: { id: runId } });
  if (!run) throw new Error('store_erasure_run_not_found');
  if (isTerminalStoreErasureStatus(run.status)) {
    return { runId, state: run.status, rowCounts: parseProgress(run.progress).deleted };
  }
  if (!run.installationGeneration) {
    if (!run.authorizedAppId) throw new Error('store_erasure_authorized_app_missing');
    const prepared = await prepareStoreErasure(run.id, run.storeId, run.authorizedAppId, now);
    if (prepared.stale) return { runId, state: 'stale_ignored', rowCounts: parseProgress(run.progress).deleted };
    run = await prisma.storeDataErasureRun.findUniqueOrThrow({ where: { id: runId } });
  }
  const storeId = run.storeId;

  const fenced = await prisma.$transaction((tx) =>
    lockAndFenceStoreErasureRun(tx, {
      runId,
      storeId,
      now,
    }),
  );
  if (fenced.action === 'terminal') {
    return {
      runId,
      state: fenced.state,
      rowCounts: parseProgress(fenced.run.progress).deleted,
    };
  }
  run = fenced.run;
  if (run.status === 'error' && run.attempts >= MAX_ERASURE_ATTEMPTS) {
    return { runId, state: 'exhausted', rowCounts: parseProgress(run.progress).deleted };
  }
  const claim = await prisma.storeDataErasureRun.updateMany({
    where: {
      id: run.id,
      status: run.status,
      attempts: run.attempts,
      OR: [{ nextRetryAt: null }, { nextRetryAt: { lte: now } }],
    },
    data: { status: 'processing', nextRetryAt: null, sanitizedErrorCode: null },
  });
  if (claim.count !== 1) return { runId, state: 'busy', rowCounts: parseProgress(run.progress).deleted };
  return executeStoreReviewEmailErasure(run.id, run.storeId, run.authorizedAppId, now);
}

export async function replayStoreDataErasureJournalIntent(
  payload: ReviewEmailStoreErasureJournalPayload,
  evidence: VerifiedJournalEvidence,
  now = new Date(),
) {
  const createdAt = new Date(payload.createdAt);
  const retentionBaseAt = new Date(payload.retentionBaseAt);
  if (!Number.isFinite(createdAt.getTime()) || !Number.isFinite(retentionBaseAt.getTime())) {
    throw new Error('store_erasure_journal_timestamp_invalid');
  }
  await prisma.$transaction(async (tx) => {
    await lockIkasStoreInstallationLifecycle(tx, payload.storeId);
    const rows = await tx.$queryRaw<StoreDataErasureRun[]>`
      SELECT * FROM "StoreDataErasureRun"
      WHERE "id" = ${payload.runId}
      FOR UPDATE
    `;
    const existing = rows[0];
    if (existing) {
      const evidenceMatches = (
        (existing.journalKey === null || existing.journalKey === evidence.key) &&
        (
          existing.journalPayloadSha256 === null ||
          existing.journalPayloadSha256 === evidence.payloadSha256
        )
      );
      if (
        existing.storeId !== payload.storeId ||
        existing.triggerSource !== 'journal_restore_replay' ||
        existing.authorizedAppId !== null ||
        existing.installationGeneration !== payload.installationGeneration ||
        existing.createdAt.getTime() !== createdAt.getTime() ||
        !evidenceMatches
      ) {
        throw new Error('store_erasure_replay_run_conflict');
      }
      await tx.storeDataErasureRun.update({
        where: { id: payload.runId },
        data: {
          journalKey: evidence.key,
          journalPayloadSha256: evidence.payloadSha256,
          journalVersionId: evidence.versionId,
          journalEtag: evidence.etag,
          journalChecksumSha256: evidence.checksumSha256,
          journalRetentionBaseAt: retentionBaseAt,
          journalRetainUntil: evidence.objectLockRetainUntil,
          journalStatus: 'verified',
        },
      });
      return;
    }
    await tx.storeDataErasureRun.create({
      data: {
        id: payload.runId,
        storeId: payload.storeId,
        installationGeneration: payload.installationGeneration,
        triggerSource: 'journal_restore_replay',
        status: 'pending',
        attempts: 0,
        journalKey: evidence.key,
        journalPayloadSha256: evidence.payloadSha256,
        journalVersionId: evidence.versionId,
        journalEtag: evidence.etag,
        journalChecksumSha256: evidence.checksumSha256,
        journalRetentionBaseAt: retentionBaseAt,
        journalRetainUntil: evidence.objectLockRetainUntil,
        journalStatus: 'verified',
        progress: { phase: 'reviews', deleted: {} },
        startedAt: createdAt,
        createdAt,
      },
    });
  });
  for (let invocation = 0; invocation < 1_000; invocation += 1) {
    const result = await executeStoreReviewEmailErasure(payload.runId, payload.storeId, null, now, { dispatchRetry: false });
    if (result.state === 'succeeded' || result.state === 'stale_ignored') return result;
    await prisma.storeDataErasureRun.updateMany({
      where: { id: payload.runId, status: 'pending' },
      data: { status: 'processing', nextRetryAt: null },
    });
  }
  throw new Error('store_erasure_replay_batch_limit_exceeded');
}

export async function eraseStoreReviewEmailData(
  storeId: string,
  input: { authorizedAppId: string; triggerSource: string; now?: Date },
): Promise<StoreReviewEmailErasureResult> {
  const now = input.now ?? new Date();
  const acquired = await prisma.$transaction(async (tx) => {
    const current = await lockIkasStoreInstallationLifecycle(tx, storeId);
    await tx.storeDataErasureRun.updateMany({
      where: {
        storeId,
        status: { in: ['processing', 'pending', 'error'] },
        OR: [
          { authorizedAppId: null },
          { authorizedAppId: { not: input.authorizedAppId } },
        ],
      },
      data: {
        status: 'stale_ignored',
        finishedAt: now,
        nextRetryAt: null,
        sanitizedErrorCode: null,
      },
    });
    const rows = await tx.$queryRaw<StoreDataErasureRun[]>`
      SELECT * FROM "StoreDataErasureRun"
      WHERE "storeId" = ${storeId}
        AND "authorizedAppId" = ${input.authorizedAppId}
      ORDER BY "startedAt" DESC
      LIMIT 1
      FOR UPDATE
    `;
    const existing = rows[0];
    if (existing) {
      const rowCounts = parseProgress(existing.progress).deleted;
      if (isTerminalStoreErasureStatus(existing.status)) {
        return {
          execute: false as const,
          result: { runId: existing.id, state: existing.status, rowCounts },
        };
      }
      if (existing.status === 'error' && existing.attempts >= MAX_ERASURE_ATTEMPTS) {
        return {
          execute: false as const,
          result: { runId: existing.id, state: 'exhausted' as const, rowCounts },
        };
      }
      const exactCurrent = existing.installationGeneration !== null &&
        current?.authorizedAppId === existing.authorizedAppId &&
        current.generation === existing.installationGeneration &&
        current.status === 'erasing';
      if (!exactCurrent) {
        const stale = await markStoreErasureRunStale(tx, existing, now);
        return {
          execute: false as const,
          result: {
            runId: stale.id,
            state: 'stale_ignored' as const,
            rowCounts: parseProgress(stale.progress).deleted,
          },
        };
      }
      return {
        execute: false as const,
        result: { runId: existing.id, state: 'pending' as const, rowCounts },
      };
    }

    const decision = await beginIkasStoreInstallationErasure(tx, {
      storeId,
      authorizedAppId: input.authorizedAppId,
      now,
    });
    const stale = decision.action === 'stale';
    const run = await tx.storeDataErasureRun.create({
      data: {
        storeId,
        authorizedAppId: input.authorizedAppId,
        installationGeneration: decision.installation.generation,
        triggerSource: input.triggerSource,
        status: stale ? 'stale_ignored' : 'processing',
        attempts: 0,
        journalRetentionBaseAt: stale ? null : now,
        progress: { phase: 'reviews', deleted: {} },
        ...(stale ? { finishedAt: now } : {}),
      },
    });
    if (stale) {
      return {
        execute: false as const,
        result: { runId: run.id, state: 'stale_ignored' as const, rowCounts: {} },
      };
    }
    return { execute: true as const, run };
  });
  if (!acquired.execute) return acquired.result;
  return executeStoreReviewEmailErasure(acquired.run.id, storeId, input.authorizedAppId, now);
}

export async function retryFailedStoreReviewEmailErasures(input: { now?: Date; limit?: number } = {}): Promise<StoreReviewEmailErasureRetryResult> {
  const now = input.now ?? new Date();
  const limit = Math.min(Math.max(input.limit ?? 10, 1), 50);
  const candidates = await prisma.storeDataErasureRun.findMany({
    where: {
      status: { in: ['pending', 'error', 'processing'] },
      AND: [
        { OR: [{ status: { not: 'error' } }, { attempts: { lt: MAX_ERASURE_ATTEMPTS } }] },
        { OR: [{ nextRetryAt: { lte: now } }, { status: 'processing', startedAt: { lte: new Date(now.getTime() - ERASURE_MAX_DURATION_MS) } }] },
      ],
    },
    orderBy: { startedAt: 'asc' },
    take: limit,
    select: {
      id: true,
      storeId: true,
      authorizedAppId: true,
      attempts: true,
      status: true,
      triggerSource: true,
    },
  });
  let exhausted = await prisma.storeDataErasureRun.count({ where: { status: 'error', attempts: { gte: MAX_ERASURE_ATTEMPTS } } });
  let claimed = 0;
  let succeeded = 0;
  let pending = 0;
  let failed = 0;
  for (const candidate of candidates) {
    if (!candidate.authorizedAppId && candidate.triggerSource !== 'journal_restore_replay') {
      await prisma.storeDataErasureRun.update({
        where: { id: candidate.id },
        data: {
          status: 'error',
          attempts: MAX_ERASURE_ATTEMPTS,
          nextRetryAt: null,
          sanitizedErrorCode: 'store_erasure_authorized_app_missing',
        },
      });
      exhausted += 1;
      continue;
    }
    const claim = await prisma.storeDataErasureRun.updateMany({
      where: { id: candidate.id, status: candidate.status, attempts: candidate.attempts },
      data: { status: 'processing', nextRetryAt: null, sanitizedErrorCode: null },
    });
    if (claim.count !== 1) continue;
    claimed += 1;
    try {
      const result = await executeStoreReviewEmailErasure(candidate.id, candidate.storeId, candidate.authorizedAppId, now);
      if (result.state === 'succeeded' || result.state === 'stale_ignored') succeeded += 1;
      else pending += 1;
    } catch {
      failed += 1;
    }
  }
  return { claimed, succeeded, pending, failed, exhausted };
}
