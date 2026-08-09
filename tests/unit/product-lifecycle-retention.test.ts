import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  runCandidates: [] as Array<{ id: string; storeId: string }>,
  sweepCandidates: [] as Array<{ id: string }>,
  latestRunId: null as string | null,
  latestSweepId: null as string | null,
  lockInstallation: vi.fn(),
}));

vi.mock('@/lib/ikas-installation-lifecycle', () => ({
  lockIkasStoreInstallationLifecycle: mocks.lockInstallation,
}));

import {
  PRODUCT_LIFECYCLE_RETENTION_BATCH_SIZE,
  PRODUCT_LIFECYCLE_TERMINAL_RETENTION_DAYS,
  runProductLifecycleRetention,
} from '@/lib/product-lifecycle-retention';

function createDatabase() {
  const tx = {
    productReconciliationRun: {
      findFirst: vi.fn(async () => mocks.latestRunId ? { id: mocks.latestRunId } : null),
      deleteMany: vi.fn(async ({ where }: { where: { id: string } }) => ({
        count: where.id === mocks.latestRunId ? 0 : 1,
      })),
    },
    productSnapshot: {
      updateMany: vi.fn(async () => ({ count: 1 })),
    },
    productReconciliationSweep: {
      findFirst: vi.fn(async () => mocks.latestSweepId ? { id: mocks.latestSweepId } : null),
      deleteMany: vi.fn(async ({ where }: { where: { id: string } }) => ({
        count: where.id === mocks.latestSweepId ? 0 : 1,
      })),
    },
  };
  const db = {
    $queryRaw: vi.fn(async () => mocks.runCandidates),
    $transaction: vi.fn(async (callback: (client: typeof tx) => unknown) => callback(tx)),
    productReconciliationSweep: {
      findFirst: vi.fn(async () => mocks.latestSweepId ? { id: mocks.latestSweepId } : null),
      findMany: vi.fn(async () => mocks.sweepCandidates),
    },
  };
  return { db, tx };
}

describe('product lifecycle retention', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.runCandidates = [];
    mocks.sweepCandidates = [];
    mocks.latestRunId = null;
    mocks.latestSweepId = null;
    mocks.lockInstallation.mockResolvedValue(null);
  });

  it('uses a 42-day policy with a hard 100-row batch ceiling', async () => {
    const { db } = createDatabase();

    await runProductLifecycleRetention(db as never, {
      now: new Date('2026-08-09T00:00:00.000Z'),
      limit: 10_000,
    });

    expect(PRODUCT_LIFECYCLE_TERMINAL_RETENTION_DAYS).toBe(42);
    expect(PRODUCT_LIFECYCLE_RETENTION_BATCH_SIZE).toBe(100);
    expect(db.productReconciliationSweep.findMany).toHaveBeenCalledWith(expect.objectContaining({ take: 100 }));
  });

  it('rechecks and preserves the active installation latest successful run', async () => {
    mocks.runCandidates = [
      { id: 'run-protected', storeId: 'store-1' },
      { id: 'run-old', storeId: 'store-1' },
    ];
    mocks.latestRunId = 'run-protected';
    mocks.lockInstallation.mockResolvedValue({
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      generation: 3,
      stateVersion: 7,
      status: 'active',
    });
    const { db, tx } = createDatabase();

    const result = await runProductLifecycleRetention(db as never, {
      now: new Date('2026-08-09T00:00:00.000Z'),
    });

    expect(result.reconciliationRunCandidates).toBe(2);
    expect(result.reconciliationRunsDeleted).toBe(1);
    expect(tx.productReconciliationRun.deleteMany).toHaveBeenCalledTimes(1);
    expect(tx.productReconciliationRun.deleteMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: 'run-old', storeId: 'store-1' }),
    }));
    expect(tx.productSnapshot.updateMany).toHaveBeenCalledWith({
      where: { storeId: 'store-1', lastSeenReconciliationRunId: 'run-old' },
      data: { lastSeenReconciliationRunId: null },
    });
    expect(tx.productSnapshot).not.toHaveProperty('deleteMany');
  });

  it('preserves the global latest completed sweep while deleting older terminal sweeps', async () => {
    mocks.latestSweepId = 'sweep-protected';
    mocks.sweepCandidates = [{ id: 'sweep-protected' }, { id: 'sweep-old' }];
    const { db, tx } = createDatabase();

    const result = await runProductLifecycleRetention(db as never, {
      now: new Date('2026-08-09T00:00:00.000Z'),
    });

    expect(result.reconciliationSweepCandidates).toBe(2);
    expect(result.reconciliationSweepsDeleted).toBe(1);
    expect(tx.productReconciliationSweep.deleteMany).toHaveBeenCalledTimes(1);
    expect(tx.productReconciliationSweep.deleteMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: 'sweep-old' }),
    }));
  });

  it('scopes run and sweep retention so each continuation has one bounded responsibility', async () => {
    mocks.runCandidates = [{ id: 'run-old', storeId: 'store-1' }];
    mocks.sweepCandidates = [{ id: 'sweep-old' }];
    const runScope = createDatabase();

    const runs = await runProductLifecycleRetention(runScope.db as never, {
      now: new Date('2026-08-09T00:00:00.000Z'),
      scope: 'runs',
    });

    expect(runs).toMatchObject({
      reconciliationRunCandidates: 1,
      reconciliationRunsDeleted: 1,
      reconciliationSweepCandidates: 0,
      reconciliationSweepsDeleted: 0,
    });
    expect(runScope.db.productReconciliationSweep.findMany).not.toHaveBeenCalled();

    const sweepScope = createDatabase();
    const sweeps = await runProductLifecycleRetention(sweepScope.db as never, {
      now: new Date('2026-08-09T00:00:00.000Z'),
      scope: 'sweeps',
    });
    expect(sweeps).toMatchObject({
      reconciliationRunCandidates: 0,
      reconciliationRunsDeleted: 0,
      reconciliationSweepCandidates: 1,
      reconciliationSweepsDeleted: 1,
    });
    expect(sweepScope.db.$queryRaw).not.toHaveBeenCalled();
  });
});
