import { beforeEach, describe, expect, it, vi } from 'vitest';

type SyncSingleProductArgs = Parameters<
  (typeof import('@/lib/product-snapshots'))['syncSingleProductForStore']
>;
type HasRequiredInstallationFence = SyncSingleProductArgs extends [unknown, string, string, infer Fence]
  ? undefined extends Fence ? false : true
  : false;
const syncSingleProductRequiresInstallationFence: HasRequiredInstallationFence = true;

const mocks = vi.hoisted(() => ({
  transaction: vi.fn(),
  requireFence: vi.fn(),
  findMany: vi.fn(),
  executeRaw: vi.fn(),
  createMany: vi.fn(),
}));

const tx = {
  $executeRaw: mocks.executeRaw,
  productSnapshot: {
    findMany: mocks.findMany,
    createMany: mocks.createMany,
  },
};

vi.mock('@/lib/prisma', () => ({
  prisma: {
    $transaction: mocks.transaction,
  },
}));

vi.mock('@/lib/ikas-installation-lifecycle', () => ({
  requireActiveIkasStoreInstallationFence: mocks.requireFence,
}));

describe('exact product snapshot verification', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.transaction.mockImplementation((callback: (client: typeof tx) => unknown) => callback(tx));
    mocks.findMany.mockResolvedValue([]);
    mocks.executeRaw.mockResolvedValue(1);
    mocks.createMany.mockResolvedValue({ count: 1 });
    mocks.requireFence.mockResolvedValue({ status: 'active' });
  });

  it('does not mutate evidence when the provider request fails', async () => {
    const ikas = {
      queries: {
        listProductsForSync: vi.fn().mockResolvedValue({ isSuccess: false, data: null }),
      },
    };
    const { syncSingleProductForStore } = await import('@/lib/product-snapshots');

    await expect(syncSingleProductForStore(
      ikas as never,
      'store-1',
      'product-1',
      { authorizedAppId: 'app-1', generation: 1, stateVersion: 2 },
    )).rejects.toThrow('Failed to verify ikas product snapshot');

    expect(mocks.transaction).not.toHaveBeenCalled();
    expect(mocks.executeRaw).not.toHaveBeenCalled();
    expect(mocks.createMany).not.toHaveBeenCalled();
  });

  it('does not treat an incomplete provider page as exact-empty evidence', async () => {
    const ikas = {
      queries: {
        listProductsForSync: vi.fn().mockResolvedValue({
          isSuccess: true,
          data: { listProduct: { count: 0, limit: 1, page: 1, data: [] } },
        }),
      },
    };
    const { syncSingleProductForStore } = await import('@/lib/product-snapshots');

    await expect(syncSingleProductForStore(
      ikas as never,
      'store-1',
      'product-1',
      { authorizedAppId: 'app-1', generation: 1, stateVersion: 2 },
    )).rejects.toThrow('Failed to verify ikas product snapshot');

    expect(mocks.transaction).not.toHaveBeenCalled();
    expect(mocks.executeRaw).not.toHaveBeenCalled();
    expect(mocks.createMany).not.toHaveBeenCalled();
  });

  it('records webhook exact-empty evidence fail-closed without hard deletion', async () => {
    mocks.findMany.mockResolvedValue([{
      productId: 'product-1',
      lifecycleState: 'active_verified',
      slug: 'premium-shorts',
      name: 'Premium Shorts',
      providerCreatedAt: new Date('2026-01-01T00:00:00.000Z'),
      ikasUpdatedAt: new Date('2026-08-01T00:00:00.000Z'),
      lastVerifiedAt: new Date('2026-08-01T00:00:00.000Z'),
      exactEvidenceAuthorizedAppId: null,
      exactEvidenceGeneration: null,
      exactEvidenceStateVersion: null,
      unavailableAt: null,
      conflictDetectedAt: null,
      absenceFirstObservedAt: null,
      absenceLastObservedAt: null,
      absenceObservationCount: 0,
      absenceLastScheduleSlot: null,
      lastEvidenceSource: 'reconciliation_scan',
      lastSeenReconciliationRunId: null,
      lastSyncedAt: new Date('2026-08-01T00:00:00.000Z'),
    }]);
    const listProductsForSync = vi.fn().mockResolvedValue({
      isSuccess: true,
      data: {
        listProduct: { count: 0, hasNext: false, limit: 1, page: 1, data: [] },
      },
    });
    const { syncSingleProductForStore } = await import('@/lib/product-snapshots');

    await syncSingleProductForStore(
      { queries: { listProductsForSync } } as never,
      'store-1',
      'product-1',
      { authorizedAppId: 'app-1', generation: 1, stateVersion: 2 },
    );

    expect(listProductsForSync).toHaveBeenCalledWith({
      id: { eq: 'product-1' },
      pagination: { limit: 1, page: 1 },
    });
    expect(mocks.requireFence).toHaveBeenCalledOnce();
    expect(mocks.executeRaw).toHaveBeenCalledOnce();
    expect(mocks.createMany).not.toHaveBeenCalled();
    expect(tx.productSnapshot).not.toHaveProperty('deleteMany');
  });

  it('does not rewrite an unchanged active snapshot when coverage carries freshness', async () => {
    const verifiedAt = new Date('2026-08-01T00:00:00.000Z');
    mocks.findMany.mockResolvedValue([{
      productId: 'product-1',
      lifecycleState: 'active_verified',
      slug: 'premium-shorts',
      name: 'Premium Shorts',
      providerCreatedAt: new Date('2026-01-01T00:00:00.000Z'),
      ikasUpdatedAt: verifiedAt,
      lastVerifiedAt: verifiedAt,
      exactEvidenceAuthorizedAppId: 'app-1',
      exactEvidenceGeneration: 1,
      exactEvidenceStateVersion: 2,
      unavailableAt: null,
      conflictDetectedAt: null,
      absenceFirstObservedAt: null,
      absenceLastObservedAt: null,
      absenceObservationCount: 0,
      absenceLastScheduleSlot: null,
      lastEvidenceSource: 'reconciliation_scan',
      lastSeenReconciliationRunId: null,
      lastSyncedAt: verifiedAt,
    }]);
    const { applyExactProductEvidenceBatch } = await import('@/lib/product-snapshots');

    const result = await applyExactProductEvidenceBatch(tx as never, 'store-1', [{
      productId: 'product-1',
      product: {
        id: 'product-1',
        name: 'Premium Shorts',
        slug: 'premium-shorts',
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
        updatedAt: verifiedAt,
        deleted: false,
      },
    }], {
      source: 'reconciliation_scan',
      now: new Date('2026-08-03T00:00:00.000Z'),
      reconciliationTrigger: 'daily',
      scheduleSlot: '2026-08-03',
      provenance: { kind: 'catalog_coverage' },
    });

    expect(result).toMatchObject({ active_verified: 1, changedSnapshots: 0, createdSnapshots: 0 });
    expect(mocks.executeRaw).not.toHaveBeenCalled();
    expect(mocks.createMany).not.toHaveBeenCalled();
  });

  it('requires installation provenance in the point-exact API type', () => {
    expect(syncSingleProductRequiresInstallationFence).toBe(true);
  });

  it('requires the point-exact installation fence before reading or writing snapshots', async () => {
    mocks.requireFence.mockRejectedValueOnce(new Error('ikas_installation_inactive'));
    const { applyExactProductEvidence } = await import('@/lib/product-snapshots');

    await expect(applyExactProductEvidence(tx as never, 'store-1', 'product-1', null, {
      source: 'webhook_exact',
      provenance: {
        kind: 'point_exact',
        installationFence: { authorizedAppId: 'app-old', generation: 1, stateVersion: 1 },
      },
    })).rejects.toThrow('ikas_installation_inactive');

    expect(mocks.findMany).not.toHaveBeenCalled();
    expect(mocks.executeRaw).not.toHaveBeenCalled();
    expect(mocks.createMany).not.toHaveBeenCalled();
  });

  it('persists the exact installation tuple with a new point-exact snapshot', async () => {
    const { applyExactProductEvidence } = await import('@/lib/product-snapshots');
    const installationFence = { authorizedAppId: 'app-1', generation: 3, stateVersion: 7 };

    await applyExactProductEvidence(tx as never, 'store-1', 'product-1', {
      id: 'product-1',
      name: 'Premium Shorts',
      slug: 'premium-shorts',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-03T00:00:00.000Z'),
      deleted: false,
    }, {
      source: 'webhook_exact',
      provenance: { kind: 'point_exact', installationFence },
    });

    expect(mocks.requireFence).toHaveBeenCalledWith(tx, 'store-1', installationFence);
    expect(mocks.createMany).toHaveBeenCalledWith({
      data: [expect.objectContaining({
        exactEvidenceAuthorizedAppId: 'app-1',
        exactEvidenceGeneration: 3,
        exactEvidenceStateVersion: 7,
      })],
    });
  });
});
