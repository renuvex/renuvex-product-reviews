import type { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { cleanupPendingUploads } from '@/lib/cleanup-pending-uploads';
import { runCleanupImages } from '@/lib/cleanup-orphan-images';
import { reportCronTaskError } from '@/lib/cron-observability';
import { reconcileStorefrontScripts } from '@/lib/reconcile-storefront-scripts';
import { reconcileStorefrontThemes } from '@/lib/storefront-theme-sync';
import {
  ensureVideoLifecycleJobs,
  reconcileProcessingVideos,
  redispatchDueMediaJobs,
} from '@/lib/media/reconciliation';
import { runReviewEmailLifecycleMaintenance } from '@/lib/review-email/maintenance';
import { retryFailedStoreReviewEmailErasures } from '@/lib/review-email/erasure';
import { retryPendingReviewEmailDataSubjectRuns } from '@/lib/review-email/data-subject';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';

export const SCHEDULED_JOB_TASKS = ['daily-maintenance-full', 'cleanup-images'] as const;
export type ScheduledJobTask = (typeof SCHEDULED_JOB_TASKS)[number];

const SCHEDULED_JOB_LOCK_TTL_MS = 30 * 60 * 1000;

export type DailyMaintenanceResult = {
  runFullMaintenance: boolean;
  storefrontThemes: unknown;
  pendingUploads: unknown;
  storefrontScripts: unknown;
  videoLifecycleJobs: unknown;
  videoReconciliation: unknown;
  mediaJobs: unknown;
  reviewEmailLifecycle: unknown;
  reviewEmailDataSubjectRetry: unknown;
  storeDataErasure: unknown;
  errors: Array<{ task: string; error: string }>;
};

export type JsonResponsePayload = Record<string, unknown>;

export type ScheduledRunnerResult = {
  status: number;
  body: JsonResponsePayload;
};

type PrismaForScheduledLock = Pick<PrismaClient, '$queryRaw' | '$executeRaw'>;

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'unknown';
}

export function parseScheduledJobTask(value: unknown): ScheduledJobTask | null {
  return typeof value === 'string' && SCHEDULED_JOB_TASKS.includes(value as ScheduledJobTask)
    ? (value as ScheduledJobTask)
    : null;
}

export function scheduledJobSlot(task: ScheduledJobTask, now = new Date()): string {
  const iso = now.toISOString();
  if (task === 'daily-maintenance-full') return iso.slice(0, 10);
  return iso.slice(0, 7);
}

export function shouldRunFullMaintenance(request: Request, now = new Date()): boolean {
  const url = new URL(request.url);
  if (url.searchParams.get('full') === '1') return true;
  return now.getUTCHours() === 3 && now.getUTCMinutes() < 5;
}

export async function runDailyMaintenance(input: { full: boolean }): Promise<ScheduledRunnerResult> {
  const errors: Array<{ task: string; error: string }> = [];
  let pendingUploads = null;
  let storefrontScripts = null;
  let storefrontThemes = null;
  let videoReconciliation = null;
  let videoLifecycleJobs = null;
  let mediaJobs = null;
  let reviewEmailLifecycle = null;
  let reviewEmailDataSubjectRetry = null;
  let storeDataErasure = null;

  try {
    storefrontThemes = await reconcileStorefrontThemes();
  } catch (error) {
    const message = errorMessage(error);
    reportCronTaskError('daily-maintenance', 'reconcile-storefront-themes', error);
    errors.push({ task: 'reconcile-storefront-themes', error: message });
  }

  if (input.full) {
    try {
      pendingUploads = await cleanupPendingUploads();
    } catch (error) {
      const message = errorMessage(error);
      reportCronTaskError('daily-maintenance', 'cleanup-pending-uploads', error);
      errors.push({ task: 'cleanup-pending-uploads', error: message });
    }

    try {
      storefrontScripts = await reconcileStorefrontScripts();
    } catch (error) {
      const message = errorMessage(error);
      reportCronTaskError('daily-maintenance', 'reconcile-storefront-scripts', error);
      errors.push({ task: 'reconcile-storefront-scripts', error: message });
    }

    try {
      videoLifecycleJobs = await ensureVideoLifecycleJobs();
    } catch (error) {
      const message = errorMessage(error);
      reportCronTaskError('daily-maintenance', 'video-lifecycle-jobs', error);
      errors.push({ task: 'video-lifecycle-jobs', error: message });
    }

    try {
      videoReconciliation = await reconcileProcessingVideos();
    } catch (error) {
      const message = errorMessage(error);
      reportCronTaskError('daily-maintenance', 'video-processing-reconciliation', error);
      errors.push({ task: 'video-processing-reconciliation', error: message });
    }

    try {
      mediaJobs = await redispatchDueMediaJobs();
    } catch (error) {
      const message = errorMessage(error);
      reportCronTaskError('daily-maintenance', 'media-job-redispatch', error);
      errors.push({ task: 'media-job-redispatch', error: message });
    }

    try {
      reviewEmailLifecycle = await runReviewEmailLifecycleMaintenance(prisma);
    } catch (error) {
      const failure = normalizeReviewEmailFailure('retention_purge', error, { retryable: true });
      reportReviewEmailFailure('retention_purge', failure);
      errors.push({ task: 'review-email-lifecycle', error: failure.code });
    }

    try {
      reviewEmailDataSubjectRetry = await retryPendingReviewEmailDataSubjectRuns();
      if (reviewEmailDataSubjectRetry.failed > 0 || reviewEmailDataSubjectRetry.exhausted > 0) {
        reportCronTaskError(
          'daily-maintenance',
          'review-email-data-subject-retry',
          new Error('Review email data-subject erasure requires operator review'),
          reviewEmailDataSubjectRetry,
        );
      }
    } catch (error) {
      const failure = normalizeReviewEmailFailure('data_subject_erasure', error, { retryable: true });
      reportReviewEmailFailure('data_subject_erasure', failure);
      errors.push({ task: 'review-email-data-subject-retry', error: failure.code });
    }

    try {
      storeDataErasure = await retryFailedStoreReviewEmailErasures();
      if (storeDataErasure.failed > 0 || storeDataErasure.exhausted > 0) {
        reportCronTaskError(
          'daily-maintenance',
          'store-data-erasure-retry',
          new Error('Store data erasure requires operator review'),
          storeDataErasure,
        );
      }
    } catch (error) {
      const failure = normalizeReviewEmailFailure('store_erasure', error, { retryable: true });
      reportReviewEmailFailure('store_erasure', failure);
      errors.push({ task: 'store-data-erasure-retry', error: failure.code });
    }
  }

  const data: DailyMaintenanceResult = {
    runFullMaintenance: input.full,
    storefrontThemes,
    pendingUploads,
    storefrontScripts,
    videoLifecycleJobs,
    videoReconciliation,
    mediaJobs,
    reviewEmailLifecycle,
    reviewEmailDataSubjectRetry,
    storeDataErasure,
    errors,
  };
  return { status: errors.length ? 500 : 200, body: { data } };
}

type AuditInput = {
  startedAt: Date;
  startMs: number;
  status: 'ok' | 'tripped' | 'error' | 'skipped';
  trigger: 'cron' | 'manual';
  forced: boolean;
  scanned?: number;
  usedCount?: number;
  candidates?: number;
  quarantinedNew?: number;
  released?: number;
  deleted?: number;
  breakerTripped?: boolean;
  breakerReason?: string;
  sampleDeleted?: string[];
  error?: string;
};

async function persistCleanupAudit(input: AuditInput): Promise<void> {
  try {
    const sample = input.sampleDeleted && input.sampleDeleted.length ? input.sampleDeleted : undefined;
    await prisma.mediaCleanupRun.create({
      data: {
        startedAt: input.startedAt,
        finishedAt: new Date(),
        durationMs: Date.now() - input.startMs,
        status: input.status,
        trigger: input.trigger,
        forced: input.forced,
        scanned: input.scanned ?? 0,
        usedCount: input.usedCount ?? 0,
        candidates: input.candidates ?? 0,
        quarantinedNew: input.quarantinedNew ?? 0,
        released: input.released ?? 0,
        deleted: input.deleted ?? 0,
        breakerTripped: input.breakerTripped ?? false,
        breakerReason: input.breakerReason ? input.breakerReason.slice(0, 128) : null,
        sampleDeleted: sample,
        error: input.error ? input.error.slice(0, 512) : null,
      },
    });
  } catch (err) {
    console.error('[cleanup-images] audit write failed:', err);
  }
}

export async function runCleanupImagesMaintenance(input: { force?: boolean } = {}): Promise<ScheduledRunnerResult> {
  const force = input.force ?? false;
  const trigger: 'cron' | 'manual' = force ? 'manual' : 'cron';
  const startedAt = new Date();
  const startMs = Date.now();

  try {
    const result = await runCleanupImages(prisma, { force });

    await persistCleanupAudit({
      startedAt,
      startMs,
      status: result.status,
      trigger,
      forced: force,
      scanned: result.scanned,
      usedCount: result.usedCount,
      candidates: result.currentOrphans,
      quarantinedNew: result.quarantinedNew,
      released: result.released,
      deleted: result.deleted,
      breakerTripped: result.breakerTripped,
      breakerReason: result.breakerReason,
      sampleDeleted: result.sampleDeleted,
    });

    if (result.status === 'tripped') {
      reportCronTaskError(
        'cleanup-images',
        'breaker-tripped',
        new Error(`cleanup breaker tripped: ${result.breakerReason ?? 'unknown'}`),
        { scanned: result.scanned, usedCount: result.usedCount, currentOrphans: result.currentOrphans, forced: force },
      );
    }

    return {
      status: 200,
      body: {
        message:
          result.status === 'tripped'
            ? 'Safety threshold tripped - no deletion was performed; review is required.'
            : 'Cleanup completed.',
        ...result,
      },
    };
  } catch (error) {
    const message = errorMessage(error);
    reportCronTaskError('cleanup-images', 'cleanup-images', error);
    await persistCleanupAudit({ startedAt, startMs, status: 'error', trigger, forced: force, error: message });
    return { status: 500, body: { error: message } };
  }
}

export type ScheduledJobClaim =
  | { state: 'claimed'; attempts: number }
  | { state: 'already_processed'; attempts: number }
  | { state: 'in_progress'; attempts: number };

export async function claimScheduledJobRun(
  db: PrismaForScheduledLock,
  task: ScheduledJobTask,
  scheduleSlot: string,
  now = new Date(),
): Promise<ScheduledJobClaim> {
  const lockedUntil = new Date(now.getTime() + SCHEDULED_JOB_LOCK_TTL_MS);
  const rows = await db.$queryRaw<Array<{ result: string; attempts: number; existingStatus: string | null }>>`
    WITH attempt AS (
      INSERT INTO "ScheduledJobRunLock" ("task", "scheduleSlot", "status", "attempts", "lockedUntil", "startedAt", "updatedAt")
      VALUES (${task}, ${scheduleSlot}, 'processing', 1, ${lockedUntil}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT ("task", "scheduleSlot") DO UPDATE SET
        "status" = 'processing',
        "attempts" = "ScheduledJobRunLock"."attempts" + 1,
        "lockedUntil" = EXCLUDED."lockedUntil",
        "lastError" = NULL,
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE "ScheduledJobRunLock"."status" = 'error'
        OR ("ScheduledJobRunLock"."status" = 'processing' AND "ScheduledJobRunLock"."lockedUntil" < CURRENT_TIMESTAMP)
      RETURNING "attempts"
    )
    SELECT 'claimed' AS "result", "attempts", NULL::text AS "existingStatus" FROM attempt
    UNION ALL
    SELECT 'existing' AS "result", "attempts", "status" AS "existingStatus"
    FROM "ScheduledJobRunLock"
    WHERE "task" = ${task}
      AND "scheduleSlot" = ${scheduleSlot}
      AND NOT EXISTS (SELECT 1 FROM attempt)
    LIMIT 1
  `;

  const row = rows[0];
  if (!row || row.result === 'claimed') return { state: 'claimed', attempts: row?.attempts ?? 1 };
  if (row.existingStatus === 'succeeded') return { state: 'already_processed', attempts: row.attempts };
  return { state: 'in_progress', attempts: row.attempts };
}

export async function completeScheduledJobRun(
  db: PrismaForScheduledLock,
  task: ScheduledJobTask,
  scheduleSlot: string,
): Promise<void> {
  await db.$executeRaw`
    UPDATE "ScheduledJobRunLock"
    SET "status" = 'succeeded',
        "completedAt" = CURRENT_TIMESTAMP,
        "lockedUntil" = NULL,
        "lastError" = NULL,
        "updatedAt" = CURRENT_TIMESTAMP
    WHERE "task" = ${task}
      AND "scheduleSlot" = ${scheduleSlot}
  `;
}

export async function failScheduledJobRun(
  db: PrismaForScheduledLock,
  task: ScheduledJobTask,
  scheduleSlot: string,
  error: unknown,
): Promise<void> {
  await db.$executeRaw`
    UPDATE "ScheduledJobRunLock"
    SET "status" = 'error',
        "lockedUntil" = NULL,
        "lastError" = ${errorMessage(error).slice(0, 512)},
        "updatedAt" = CURRENT_TIMESTAMP
    WHERE "task" = ${task}
      AND "scheduleSlot" = ${scheduleSlot}
  `;
}

export async function runScheduledJobTask(task: ScheduledJobTask): Promise<ScheduledRunnerResult> {
  if (task === 'daily-maintenance-full') return runDailyMaintenance({ full: true });
  return runCleanupImagesMaintenance({ force: false });
}
