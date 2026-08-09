import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  sweep: {} as Record<string, unknown>,
  installations: [] as Array<{
    storeId: string;
    authorizedAppId: string;
    generation: number;
    stateVersion: number;
  }>,
  startRun: vi.fn(),
  dispatchRun: vi.fn(),
  dispatchSweep: vi.fn(),
  retention: vi.fn(),
}));

vi.mock('@/lib/prisma', () => {
  const updateSweep = vi.fn(async ({ data }: { data: Record<string, unknown> }) => {
    for (const [key, value] of Object.entries(data)) {
      if (value && typeof value === 'object' && 'increment' in value) {
        mocks.sweep[key] = Number(mocks.sweep[key] ?? 0) + Number((value as { increment: number }).increment);
      } else {
        mocks.sweep[key] = value;
      }
    }
    return { ...mocks.sweep };
  });
  const tx = {
    $queryRaw: vi.fn(async () => [{ ...mocks.sweep }]),
    productReconciliationSweep: { update: updateSweep },
  };
  return {
    prisma: {
      $transaction: vi.fn(async (callback: (client: typeof tx) => unknown) => callback(tx)),
      productReconciliationSweep: {
        findUnique: vi.fn(async () => null),
        findFirst: vi.fn(async () => null),
        create: vi.fn(async ({ data }: { data: Record<string, unknown> }) => ({
          ...mocks.sweep,
          ...data,
        })),
        findMany: vi.fn(async () => []),
      },
      productReconciliationRun: { findMany: vi.fn(async () => []) },
      ikasStoreInstallation: {
        findMany: vi.fn(async () => mocks.installations),
      },
    },
  };
});
vi.mock('@/lib/product-reconciliation', () => ({
  startProductReconciliationRun: mocks.startRun,
  ProductReconciliationError: class ProductReconciliationError extends Error {
    constructor(public readonly code: string, public readonly retryable = true) {
      super(code);
    }
  },
}));
vi.mock('@/lib/product-reconciliation-dispatcher', () => ({
  dispatchProductReconciliationRun: mocks.dispatchRun,
  dispatchProductReconciliationSweep: mocks.dispatchSweep,
}));
vi.mock('@/lib/product-lifecycle-retention', () => ({
  PRODUCT_LIFECYCLE_RETENTION_BATCH_SIZE: 100,
  runProductLifecycleRetention: mocks.retention,
}));

import { prisma } from '@/lib/prisma';
import {
  processProductReconciliationSweep,
  runProductReconciliationMaintenance,
  startProductReconciliationSweep,
} from '@/lib/product-reconciliation-sweep';

const SWEEP_ID = '22222222-2222-4222-8222-222222222222';
const NOW = new Date('2026-08-09T03:00:00.000Z');

function resetSweep(overrides: Record<string, unknown> = {}) {
  mocks.sweep = {
    id: SWEEP_ID,
    scheduleSlot: '2026-08-09',
    status: 'pending',
    phase: 'discover',
    cursorStoreId: null,
    discoveredCount: 0,
    dispatchedCount: 0,
    dispatchFailedCount: 0,
    retainedRunCount: 0,
    retainedSweepCount: 0,
    attempts: 0,
    leaseOwner: null,
    leaseExpiresAt: null,
    nextRetryAt: NOW,
    lastErrorCode: null,
    startedAt: null,
    finishedAt: null,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  };
}

function installation(index: number) {
  return {
    storeId: `store-${String(index).padStart(4, '0')}`,
    authorizedAppId: `app-${index}`,
    generation: 1,
    stateVersion: 1,
  };
}

function runFor(storeId: string) {
  return {
    id: `run-${storeId}`,
    storeId,
    status: 'pending',
    phase: 'scan',
    nextPage: 1,
    candidateCursor: null,
    attempts: 0,
    leaseExpiresAt: null,
    nextRetryAt: NOW,
  };
}

describe('product reconciliation sweep', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetSweep();
    mocks.installations = [];
    mocks.startRun.mockImplementation(async ({ storeId }: { storeId: string }) => ({
      run: runFor(storeId),
      created: true,
    }));
    mocks.dispatchRun.mockResolvedValue(true);
    mocks.dispatchSweep.mockResolvedValue(true);
    mocks.retention.mockResolvedValue({
      reconciliationRunCandidates: 0,
      reconciliationRunsDeleted: 0,
      reconciliationSweepCandidates: 0,
      reconciliationSweepsDeleted: 0,
    });
  });

  it('rejects a non-daily schedule slot before touching the database', async () => {
    await expect(startProductReconciliationSweep('2026-02-30', NOW))
      .rejects.toMatchObject({ code: 'product_reconciliation_schedule_slot_invalid' });
    expect(prisma.productReconciliationSweep.findUnique).not.toHaveBeenCalled();
  });

  it('reuses the single nonterminal sweep instead of overlapping daily discovery', async () => {
    vi.mocked(prisma.productReconciliationSweep.findFirst).mockResolvedValueOnce(mocks.sweep as never);

    const result = await startProductReconciliationSweep('2026-08-10', NOW);

    expect(result).toEqual({ sweep: mocks.sweep, created: false });
    expect(prisma.productReconciliationSweep.create).not.toHaveBeenCalled();
  });

  it('recovers due and structurally incomplete run or sweep leases', async () => {
    await runProductReconciliationMaintenance({ now: NOW });

    expect(prisma.productReconciliationRun.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        OR: expect.arrayContaining([
          expect.objectContaining({ status: 'pending', OR: expect.arrayContaining([{ nextRetryAt: null }]) }),
          expect.objectContaining({
            status: { in: ['scanning', 'verifying'] },
            OR: expect.arrayContaining([{ leaseExpiresAt: null }]),
          }),
        ]),
      }),
      take: 50,
    }));
    expect(prisma.productReconciliationSweep.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        OR: expect.arrayContaining([
          expect.objectContaining({ status: 'error', OR: expect.arrayContaining([{ nextRetryAt: null }]) }),
          expect.objectContaining({ status: 'scanning', OR: expect.arrayContaining([{ leaseExpiresAt: null }]) }),
        ]),
      }),
      take: 10,
    }));
  });

  it('discovers at most 50 installations and persists the cursor before continuation', async () => {
    mocks.installations = Array.from({ length: 50 }, (_, index) => installation(index + 1));

    const result = await processProductReconciliationSweep(SWEEP_ID, { now: NOW });

    const discoveryCall = vi.mocked(prisma.ikasStoreInstallation.findMany).mock.calls[0]?.[0];
    expect(discoveryCall).toMatchObject({
      where: { status: 'active', storeId: undefined },
      orderBy: { storeId: 'asc' },
      take: 50,
    });
    expect(mocks.startRun).toHaveBeenCalledTimes(50);
    expect(mocks.dispatchRun).toHaveBeenCalledTimes(50);
    expect(result).toMatchObject({ status: 'pending', continuationRequired: true });
    expect(result.continuation).toMatchObject({ reason: 'progress' });
    expect(mocks.sweep).toMatchObject({
      cursorStoreId: 'store-0050',
      discoveredCount: 50,
      dispatchedCount: 50,
      status: 'pending',
      phase: 'discover',
    });
  });

  it('does not advance the durable cursor when a page dispatch fails', async () => {
    mocks.installations = [installation(1), installation(2)];
    mocks.dispatchRun.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

    const result = await processProductReconciliationSweep(SWEEP_ID, { now: NOW });

    expect(result).toMatchObject({ status: 'error', continuationRequired: true });
    expect(result.continuation).toMatchObject({
      reason: 'retry',
      notBefore: new Date('2026-08-09T03:05:00.000Z'),
    });
    expect(mocks.sweep).toMatchObject({
      cursorStoreId: null,
      dispatchFailedCount: 1,
      attempts: 1,
      lastErrorCode: 'product_reconciliation_dispatch_failed',
    });
  });

  it('moves a short final page through bounded retention phases before completion', async () => {
    mocks.installations = [installation(1)];

    const discovery = await processProductReconciliationSweep(SWEEP_ID, { now: NOW });

    expect(discovery).toMatchObject({
      sweepId: SWEEP_ID,
      status: 'pending',
      continuationRequired: true,
      continuation: { reason: 'progress' },
    });
    expect(mocks.sweep).toMatchObject({
      cursorStoreId: 'store-0001',
      discoveredCount: 1,
      dispatchedCount: 1,
      phase: 'retain_runs',
      finishedAt: null,
    });

    const runRetention = await processProductReconciliationSweep(SWEEP_ID, { now: NOW });
    expect(runRetention).toMatchObject({
      status: 'pending',
      continuationRequired: true,
    });
    expect(mocks.retention).toHaveBeenLastCalledWith(prisma, { now: NOW, scope: 'runs' });
    expect(mocks.sweep).toMatchObject({ phase: 'retain_sweeps' });

    const completed = await processProductReconciliationSweep(SWEEP_ID, { now: NOW });
    expect(completed).toEqual({
      sweepId: SWEEP_ID,
      status: 'completed',
      continuationRequired: false,
      continuation: null,
    });
    expect(mocks.retention).toHaveBeenLastCalledWith(prisma, { now: NOW, scope: 'sweeps' });
    expect(mocks.sweep).toMatchObject({
      phase: 'complete',
      finishedAt: NOW,
    });
  });

  it('continues a full retention batch without repeating installation discovery', async () => {
    resetSweep({ phase: 'retain_runs' });
    mocks.retention.mockResolvedValueOnce({
      reconciliationRunCandidates: 100,
      reconciliationRunsDeleted: 100,
      reconciliationSweepCandidates: 0,
      reconciliationSweepsDeleted: 0,
    });

    const result = await processProductReconciliationSweep(SWEEP_ID, { now: NOW });

    expect(result).toMatchObject({ status: 'pending', continuationRequired: true });
    expect(prisma.ikasStoreInstallation.findMany).not.toHaveBeenCalled();
    expect(mocks.sweep).toMatchObject({
      phase: 'retain_runs',
      retainedRunCount: 100,
    });
  });

  it('retries instead of looping on a full retention batch with no progress', async () => {
    resetSweep({ phase: 'retain_runs' });
    mocks.retention.mockResolvedValueOnce({
      reconciliationRunCandidates: 100,
      reconciliationRunsDeleted: 0,
      reconciliationSweepCandidates: 0,
      reconciliationSweepsDeleted: 0,
    });

    const result = await processProductReconciliationSweep(SWEEP_ID, { now: NOW });

    expect(result).toMatchObject({
      status: 'error',
      continuationRequired: true,
      continuation: { reason: 'retry' },
    });
    expect(mocks.sweep).toMatchObject({
      phase: 'retain_runs',
      attempts: 1,
      lastErrorCode: 'product_lifecycle_retention_no_progress',
    });
  });
});
