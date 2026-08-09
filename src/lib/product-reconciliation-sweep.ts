import { randomUUID } from 'node:crypto';
import { Prisma, type ProductReconciliationRun, type ProductReconciliationSweep } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { isValidDailyScheduleSlot } from '@/lib/product-lifecycle';
import {
  startProductReconciliationRun,
  ProductReconciliationError,
} from '@/lib/product-reconciliation';
import {
  dispatchProductReconciliationRun,
  dispatchProductReconciliationSweep,
  type ProductReconciliationDispatchReason,
  type ProductReconciliationSweepDispatchRequest,
} from '@/lib/product-reconciliation-dispatcher';
import {
  PRODUCT_LIFECYCLE_RETENTION_BATCH_SIZE,
  runProductLifecycleRetention,
  type ProductLifecycleRetentionScope,
} from '@/lib/product-lifecycle-retention';

const INSTALLATION_DISCOVERY_PAGE_SIZE = 50;
const SWEEP_LEASE_MS = 5 * 60 * 1000;
const MAX_FAILURE_ATTEMPTS = 8;
const RETRY_BASE_MS = 5 * 60 * 1000;
const RETRY_MAX_MS = 6 * 60 * 60 * 1000;
const RUN_REDISPATCH_LIMIT = 50;
const SWEEP_REDISPATCH_LIMIT = 10;

const SWEEP_TERMINAL_STATUSES = new Set(['completed', 'exhausted']);
const RUN_TERMINAL_STATUSES = new Set(['completed', 'exhausted', 'stale_ignored']);

type ClaimedSweep = {
  state: 'claimed';
  sweep: ProductReconciliationSweep;
  leaseOwner: string;
};

type SweepClaimResult = ClaimedSweep | {
  state: 'terminal' | 'busy' | 'deferred';
  sweep: ProductReconciliationSweep;
};

type ActiveSweepPhase = 'discover' | 'retain_runs' | 'retain_sweeps';

export type ProductReconciliationSweepProcessResult = {
  sweepId: string;
  status: string;
  continuationRequired: boolean;
  continuation: ProductReconciliationSweepDispatchRequest | null;
};

function retryAt(now: Date, attempts: number): Date {
  const delay = Math.min(RETRY_MAX_MS, RETRY_BASE_MS * 2 ** Math.max(0, attempts - 1));
  return new Date(now.getTime() + delay);
}

function sweepResult(
  sweep: ProductReconciliationSweep,
  reason: ProductReconciliationDispatchReason | null = null,
  notBefore: Date | null = null,
): ProductReconciliationSweepProcessResult {
  return {
    sweepId: sweep.id,
    status: sweep.status,
    continuationRequired: reason !== null,
    continuation: reason ? { sweep, reason, notBefore } : null,
  };
}

async function claimSweep(id: string, now: Date): Promise<SweepClaimResult> {
  return prisma.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<ProductReconciliationSweep[]>`
      SELECT * FROM "ProductReconciliationSweep"
      WHERE "id" = ${id}
      FOR UPDATE
    `;
    const sweep = rows[0];
    if (!sweep) throw new ProductReconciliationError('product_reconciliation_sweep_not_found', false);
    if (SWEEP_TERMINAL_STATUSES.has(sweep.status)) return { state: 'terminal', sweep };
    if (sweep.leaseExpiresAt && sweep.leaseExpiresAt > now) return { state: 'busy', sweep };
    if (sweep.nextRetryAt && sweep.nextRetryAt > now) return { state: 'deferred', sweep };

    const leaseOwner = randomUUID();
    const claimed = await tx.productReconciliationSweep.update({
      where: { id },
      data: {
        status: 'scanning',
        leaseOwner,
        leaseExpiresAt: new Date(now.getTime() + SWEEP_LEASE_MS),
        nextRetryAt: null,
        lastErrorCode: null,
        startedAt: sweep.startedAt ?? now,
      },
    });
    return { state: 'claimed', sweep: claimed, leaseOwner };
  });
}

async function markSweepFailure(
  claimed: ClaimedSweep,
  code: string,
  now: Date,
): Promise<ProductReconciliationSweep> {
  return prisma.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<ProductReconciliationSweep[]>`
      SELECT * FROM "ProductReconciliationSweep"
      WHERE "id" = ${claimed.sweep.id}
      FOR UPDATE
    `;
    const sweep = rows[0];
    if (!sweep || SWEEP_TERMINAL_STATUSES.has(sweep.status) || sweep.leaseOwner !== claimed.leaseOwner) {
      return sweep ?? claimed.sweep;
    }
    const attempts = sweep.attempts + 1;
    const exhausted = attempts >= MAX_FAILURE_ATTEMPTS;
    return tx.productReconciliationSweep.update({
      where: { id: sweep.id },
      data: {
        status: exhausted ? 'exhausted' : 'error',
        attempts,
        dispatchFailedCount: { increment: code === 'product_reconciliation_dispatch_failed' ? 1 : 0 },
        leaseOwner: null,
        leaseExpiresAt: null,
        nextRetryAt: exhausted ? null : retryAt(now, attempts),
        lastErrorCode: code,
        finishedAt: exhausted ? now : null,
      },
    });
  });
}

function runDispatchReason(run: ProductReconciliationRun): ProductReconciliationDispatchReason {
  if (run.status === 'error') return 'retry';
  if (run.status === 'scanning' || run.status === 'verifying') return 'lease';
  return 'recovery';
}

function runDispatchNotBefore(run: ProductReconciliationRun): Date | null {
  if (run.status === 'error') return run.nextRetryAt;
  if (run.status === 'scanning' || run.status === 'verifying') return run.leaseExpiresAt;
  return null;
}

function isActiveSweepPhase(value: string): value is ActiveSweepPhase {
  return value === 'discover' || value === 'retain_runs' || value === 'retain_sweeps';
}

async function commitRetentionPhase(
  claimed: ClaimedSweep,
  scope: Exclude<ProductLifecycleRetentionScope, 'both'>,
  candidateCount: number,
  deletedCount: number,
  now: Date,
): Promise<ProductReconciliationSweepProcessResult> {
  if (candidateCount >= PRODUCT_LIFECYCLE_RETENTION_BATCH_SIZE && deletedCount === 0) {
    throw new ProductReconciliationError('product_lifecycle_retention_no_progress');
  }
  return prisma.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<ProductReconciliationSweep[]>`
      SELECT * FROM "ProductReconciliationSweep"
      WHERE "id" = ${claimed.sweep.id}
      FOR UPDATE
    `;
    const sweep = rows[0];
    if (!sweep || sweep.leaseOwner !== claimed.leaseOwner) {
      throw new ProductReconciliationError('product_reconciliation_sweep_lease_lost');
    }

    const hasMore = candidateCount >= PRODUCT_LIFECYCLE_RETENTION_BATCH_SIZE;
    const completed = scope === 'sweeps' && !hasMore;
    const phase = scope === 'runs'
      ? (hasMore ? 'retain_runs' : 'retain_sweeps')
      : (hasMore ? 'retain_sweeps' : 'complete');
    const updated = await tx.productReconciliationSweep.update({
      where: { id: sweep.id },
      data: {
        status: completed ? 'completed' : 'pending',
        phase,
        retainedRunCount: scope === 'runs' ? { increment: deletedCount } : undefined,
        retainedSweepCount: scope === 'sweeps' ? { increment: deletedCount } : undefined,
        leaseOwner: null,
        leaseExpiresAt: null,
        nextRetryAt: completed ? null : now,
        lastErrorCode: null,
        finishedAt: completed ? now : null,
      },
    });
    return completed ? sweepResult(updated) : sweepResult(updated, 'progress');
  });
}

async function processRetentionPhase(
  claimed: ClaimedSweep,
  phase: 'retain_runs' | 'retain_sweeps',
  now: Date,
): Promise<ProductReconciliationSweepProcessResult> {
  const scope = phase === 'retain_runs' ? 'runs' : 'sweeps';
  const retention = await runProductLifecycleRetention(prisma, { now, scope });
  return commitRetentionPhase(
    claimed,
    scope,
    scope === 'runs'
      ? retention.reconciliationRunCandidates
      : retention.reconciliationSweepCandidates,
    scope === 'runs'
      ? retention.reconciliationRunsDeleted
      : retention.reconciliationSweepsDeleted,
    now,
  );
}

export async function startProductReconciliationSweep(
  scheduleSlot: string,
  now = new Date(),
): Promise<{ sweep: ProductReconciliationSweep; created: boolean }> {
  if (!isValidDailyScheduleSlot(scheduleSlot)) {
    throw new ProductReconciliationError('product_reconciliation_schedule_slot_invalid', false);
  }
  const existing = await prisma.productReconciliationSweep.findUnique({ where: { scheduleSlot } });
  if (existing) return { sweep: existing, created: false };
  const active = await prisma.productReconciliationSweep.findFirst({
    where: { status: { in: ['pending', 'scanning', 'error'] } },
    orderBy: { createdAt: 'asc' },
  });
  if (active) return { sweep: active, created: false };
  try {
    const sweep = await prisma.productReconciliationSweep.create({
      data: { scheduleSlot, status: 'pending', nextRetryAt: now },
    });
    return { sweep, created: true };
  } catch (error) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2002') throw error;
    const concurrent = await prisma.productReconciliationSweep.findUnique({ where: { scheduleSlot } }) ??
      await prisma.productReconciliationSweep.findFirst({
        where: { status: { in: ['pending', 'scanning', 'error'] } },
        orderBy: { createdAt: 'asc' },
      });
    if (!concurrent) throw error;
    return { sweep: concurrent, created: false };
  }
}

export async function processProductReconciliationSweep(
  sweepId: string,
  input: { now?: Date } = {},
): Promise<ProductReconciliationSweepProcessResult> {
  const now = input.now ?? new Date();
  const claim = await claimSweep(sweepId, now);
  if (claim.state !== 'claimed') {
    if (claim.state === 'busy') return sweepResult(claim.sweep, 'lease', claim.sweep.leaseExpiresAt);
    if (claim.state === 'deferred') return sweepResult(claim.sweep, 'retry', claim.sweep.nextRetryAt);
    return sweepResult(claim.sweep);
  }

  try {
    if (!isActiveSweepPhase(claim.sweep.phase)) {
      throw new ProductReconciliationError('product_reconciliation_sweep_phase_invalid', false);
    }
    if (claim.sweep.phase === 'retain_runs' || claim.sweep.phase === 'retain_sweeps') {
      return await processRetentionPhase(claim, claim.sweep.phase, now);
    }

    const installations = await prisma.ikasStoreInstallation.findMany({
      where: {
        status: 'active',
        storeId: claim.sweep.cursorStoreId ? { gt: claim.sweep.cursorStoreId } : undefined,
      },
      orderBy: { storeId: 'asc' },
      take: INSTALLATION_DISCOVERY_PAGE_SIZE,
      select: {
        storeId: true,
        authorizedAppId: true,
        generation: true,
        stateVersion: true,
      },
    });

    let dispatchedCount = 0;
    for (const installation of installations) {
      let run: ProductReconciliationRun;
      try {
        ({ run } = await startProductReconciliationRun({
          storeId: installation.storeId,
          fence: {
            authorizedAppId: installation.authorizedAppId,
            generation: installation.generation,
            stateVersion: installation.stateVersion,
          },
          trigger: 'daily',
          scheduleSlot: claim.sweep.scheduleSlot,
          now,
        }));
      } catch (error) {
        if (error instanceof ProductReconciliationError && error.code === 'product_reconciliation_installation_inactive') {
          continue;
        }
        throw error;
      }
      if (RUN_TERMINAL_STATUSES.has(run.status)) continue;
      const dispatched = await dispatchProductReconciliationRun({
        run,
        reason: runDispatchReason(run),
        notBefore: runDispatchNotBefore(run),
      });
      if (!dispatched) throw new ProductReconciliationError('product_reconciliation_dispatch_failed');
      dispatchedCount += 1;
    }

    return await prisma.$transaction(async (tx) => {
      const rows = await tx.$queryRaw<ProductReconciliationSweep[]>`
        SELECT * FROM "ProductReconciliationSweep"
        WHERE "id" = ${claim.sweep.id}
        FOR UPDATE
      `;
      const sweep = rows[0];
      if (!sweep || sweep.leaseOwner !== claim.leaseOwner) {
        throw new ProductReconciliationError('product_reconciliation_sweep_lease_lost');
      }
      const discoveryComplete = installations.length < INSTALLATION_DISCOVERY_PAGE_SIZE;
      const updated = await tx.productReconciliationSweep.update({
        where: { id: sweep.id },
        data: {
          status: 'pending',
          phase: discoveryComplete ? 'retain_runs' : 'discover',
          cursorStoreId: installations.at(-1)?.storeId ?? sweep.cursorStoreId,
          discoveredCount: { increment: installations.length },
          dispatchedCount: { increment: dispatchedCount },
          leaseOwner: null,
          leaseExpiresAt: null,
          nextRetryAt: now,
          lastErrorCode: null,
          finishedAt: null,
        },
      });
      return sweepResult(updated, 'progress');
    });
  } catch (error) {
    const code = error instanceof ProductReconciliationError
      ? error.code
      : 'product_reconciliation_sweep_failed';
    const failed = await markSweepFailure(claim, code, now);
    if (failed.status === 'exhausted') return sweepResult(failed);
    return sweepResult(failed, 'retry', failed.nextRetryAt);
  }
}

export async function runProductReconciliationMaintenance(
  input: { now?: Date } = {},
) {
  const now = input.now ?? new Date();
  let dispatchFailed = 0;
  let redispatchedRuns = 0;
  let redispatchedSweeps = 0;

  const dueRuns = await prisma.productReconciliationRun.findMany({
    where: {
      status: { in: ['pending', 'scanning', 'verifying', 'error'] },
      OR: [
        { status: 'pending', OR: [{ nextRetryAt: null }, { nextRetryAt: { lte: now } }] },
        { status: 'error', OR: [{ nextRetryAt: null }, { nextRetryAt: { lte: now } }] },
        {
          status: { in: ['scanning', 'verifying'] },
          OR: [{ leaseExpiresAt: null }, { leaseExpiresAt: { lte: now } }],
        },
      ],
    },
    orderBy: { updatedAt: 'asc' },
    take: RUN_REDISPATCH_LIMIT,
  });
  for (const run of dueRuns) {
    const dispatched = await dispatchProductReconciliationRun({
      run,
      reason: 'recovery',
      notBefore: runDispatchNotBefore(run),
    });
    if (dispatched) redispatchedRuns += 1;
    else dispatchFailed += 1;
  }

  const dueSweeps = await prisma.productReconciliationSweep.findMany({
    where: {
      status: { in: ['pending', 'scanning', 'error'] },
      OR: [
        { status: 'pending', OR: [{ nextRetryAt: null }, { nextRetryAt: { lte: now } }] },
        { status: 'error', OR: [{ nextRetryAt: null }, { nextRetryAt: { lte: now } }] },
        { status: 'scanning', OR: [{ leaseExpiresAt: null }, { leaseExpiresAt: { lte: now } }] },
      ],
    },
    orderBy: { updatedAt: 'asc' },
    take: SWEEP_REDISPATCH_LIMIT,
  });
  for (const sweep of dueSweeps) {
    const dispatched = await dispatchProductReconciliationSweep({
      sweep,
      reason: 'recovery',
      notBefore: sweep.status === 'scanning' ? sweep.leaseExpiresAt : sweep.nextRetryAt,
    });
    if (dispatched) redispatchedSweeps += 1;
    else dispatchFailed += 1;
  }

  const scheduleSlot = now.toISOString().slice(0, 10);
  const started = await startProductReconciliationSweep(scheduleSlot, now);
  const createdSweeps = started.created ? 1 : 0;
  let dispatchedSweeps = 0;
  const alreadyRedispatched = dueSweeps.some((sweep) => sweep.id === started.sweep.id);
  if (started.created || (!SWEEP_TERMINAL_STATUSES.has(started.sweep.status) && !alreadyRedispatched)) {
    if (await dispatchProductReconciliationSweep({ sweep: started.sweep, reason: 'initial' })) {
      dispatchedSweeps += 1;
    } else {
      dispatchFailed += 1;
    }
  }

  return {
    createdSweeps,
    dispatchedSweeps,
    dispatchFailed,
    redispatchedRuns,
    redispatchedSweeps,
  };
}
