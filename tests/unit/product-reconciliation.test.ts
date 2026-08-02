import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  run: {} as Record<string, unknown>,
  installation: {} as Record<string, unknown> | null,
  providerResponses: [] as Array<Record<string, unknown>>,
  candidates: [] as Array<{ productId: string }>,
  lockInstallation: vi.fn(),
  listProductsForSync: vi.fn(),
  applyEvidence: vi.fn(),
  executeRaw: vi.fn(),
  dispatch: vi.fn(),
}));

vi.mock('@/lib/prisma', () => {
  const tx = {
    $queryRaw: vi.fn(async () => [{ ...mocks.run }]),
    $executeRaw: mocks.executeRaw,
    authToken: {
      findUnique: vi.fn(async () => ({
        authorizedAppId: 'app-1',
        merchantId: 'store-1',
        accessToken: 'encrypted',
        refreshToken: 'encrypted',
      })),
    },
    productReconciliationRun: {
      update: vi.fn(async ({ data }: { data: Record<string, unknown> }) => {
        for (const [key, value] of Object.entries(data)) {
          if (value && typeof value === 'object' && 'increment' in value) {
            const increment = Number((value as { increment: number }).increment);
            mocks.run[key] = Number(mocks.run[key] ?? 0) + increment;
          } else {
            mocks.run[key] = value;
          }
        }
        mocks.run.updatedAt = new Date('2026-08-03T00:00:00.000Z');
        return { ...mocks.run };
      }),
    },
  };
  return {
    prisma: {
      $transaction: vi.fn(async (callback: (client: typeof tx) => unknown) => callback(tx)),
      productReconciliationRun: {
        findUnique: vi.fn(async () => ({ ...mocks.run })),
        findMany: vi.fn(async () => []),
      },
      productSnapshot: {
        findMany: vi.fn(async () => mocks.candidates),
      },
      ikasStoreInstallation: {
        findMany: vi.fn(async () => []),
      },
    },
  };
});
vi.mock('@/lib/ikas-installation-lifecycle', () => ({
  lockIkasStoreInstallationLifecycle: mocks.lockInstallation,
}));
vi.mock('@/helpers/api-helpers', () => ({
  getIkas: vi.fn(() => ({ queries: { listProductsForSync: mocks.listProductsForSync } })),
}));
vi.mock('@/models/auth-token/manager', () => ({
  AuthTokenManager: { fromDatabaseRow: vi.fn(() => ({ accessToken: 'test-token' })) },
}));
vi.mock('@/lib/product-snapshots', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/product-snapshots')>();
  return { ...actual, applyExactProductEvidenceBatch: mocks.applyEvidence };
});
vi.mock('@/lib/product-reconciliation-dispatcher', () => ({
  dispatchProductReconciliationRun: mocks.dispatch,
}));

import { processProductReconciliationRun } from '@/lib/product-reconciliation';

const RUN_ID = '11111111-1111-4111-8111-111111111111';
const NOW = new Date('2026-08-03T03:00:00.000Z');

function resetRun(overrides: Record<string, unknown> = {}) {
  mocks.run = {
    id: RUN_ID,
    storeId: 'store-1',
    authorizedAppId: 'app-1',
    installationGeneration: 2,
    installationStateVersion: 4,
    trigger: 'daily',
    scheduleSlot: '2026-08-03',
    status: 'pending',
    phase: 'scan',
    nextPage: 1,
    candidateCursor: null,
    scannedCount: 0,
    verifiedCount: 0,
    activeCount: 0,
    unavailableCount: 0,
    conflictCount: 0,
    reconstructedCount: 0,
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

describe('product reconciliation runner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetRun();
    mocks.installation = {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      generation: 2,
      stateVersion: 4,
      status: 'active',
    };
    mocks.lockInstallation.mockImplementation(async () => mocks.installation);
    mocks.candidates = [];
    mocks.executeRaw.mockResolvedValue(0);
    mocks.applyEvidence.mockResolvedValue({
      active_verified: 0,
      unavailable_verified: 0,
      identity_conflict: 0,
    });
    mocks.listProductsForSync.mockImplementation(async () => mocks.providerResponses.shift());
    mocks.providerResponses = [];
  });

  it('does not manufacture unavailable evidence when the provider scan fails', async () => {
    mocks.providerResponses.push({ isSuccess: false, data: null });

    await expect(processProductReconciliationRun(RUN_ID, { now: NOW }))
      .rejects.toMatchObject({ code: 'product_provider_list_failed' });

    expect(mocks.applyEvidence).not.toHaveBeenCalled();
    expect(mocks.executeRaw).not.toHaveBeenCalled();
    expect(mocks.run.status).toBe('error');
    expect(mocks.run.lastErrorCode).toBe('product_provider_list_failed');
  });

  it('retries an incomplete provider page instead of treating missing hasNext as a full scan', async () => {
    mocks.providerResponses.push({
      isSuccess: true,
      data: { listProduct: { count: 0, page: 1, limit: 200, data: [] } },
    });

    await expect(processProductReconciliationRun(RUN_ID, { now: NOW }))
      .rejects.toMatchObject({ code: 'product_provider_contract_invalid' });

    expect(mocks.applyEvidence).not.toHaveBeenCalled();
    expect(mocks.executeRaw).not.toHaveBeenCalled();
    expect(mocks.run.phase).toBe('scan');
    expect(mocks.run.status).toBe('error');
  });

  it('does not reconstruct or verify missing products before the final scan page', async () => {
    mocks.providerResponses.push({
      isSuccess: true,
      data: {
        listProduct: {
          count: 2,
          page: 1,
          limit: 200,
          hasNext: true,
          data: [{ id: 'product-1', name: 'One', slug: 'one', createdAt: NOW, updatedAt: NOW, deleted: false }],
        },
      },
    });
    mocks.applyEvidence.mockResolvedValueOnce({
      active_verified: 1,
      unavailable_verified: 0,
      identity_conflict: 0,
    });

    const result = await processProductReconciliationRun(RUN_ID, { now: NOW });

    expect(result).toEqual({ runId: RUN_ID, status: 'pending', continuationRequired: true });
    expect(mocks.applyEvidence).toHaveBeenCalledWith(expect.anything(), 'store-1', [
      expect.objectContaining({ productId: 'product-1' }),
    ], expect.objectContaining({ source: 'reconciliation_scan', reconciliationRunId: RUN_ID }));
    expect(mocks.executeRaw).not.toHaveBeenCalled();
    expect(mocks.run.phase).toBe('scan');
    expect(mocks.run.nextPage).toBe(2);
  });

  it('marks an exact-empty candidate unavailable only after a complete scan', async () => {
    mocks.providerResponses.push(
      {
        isSuccess: true,
        data: {
          listProduct: {
            count: 1,
            page: 1,
            limit: 200,
            hasNext: false,
            data: [{ id: 'product-1', name: 'One', slug: 'one', createdAt: NOW, updatedAt: NOW, deleted: false }],
          },
        },
      },
      {
        isSuccess: true,
        data: { listProduct: { count: 0, page: 1, limit: 50, hasNext: false, data: [] } },
      },
    );
    mocks.executeRaw.mockResolvedValueOnce(1);
    mocks.applyEvidence
      .mockResolvedValueOnce({ active_verified: 1, unavailable_verified: 0, identity_conflict: 0 })
      .mockResolvedValueOnce({ active_verified: 0, unavailable_verified: 1, identity_conflict: 0 });

    const scanResult = await processProductReconciliationRun(RUN_ID, { now: NOW });
    expect(scanResult.continuationRequired).toBe(true);
    expect(mocks.executeRaw).toHaveBeenCalledOnce();
    expect(mocks.run.phase).toBe('verify');

    mocks.candidates = [{ productId: 'missing-product' }];
    const verifyResult = await processProductReconciliationRun(RUN_ID, { now: NOW });
    expect(verifyResult.continuationRequired).toBe(true);
    expect(mocks.applyEvidence).toHaveBeenLastCalledWith(expect.anything(), 'store-1', [
      { productId: 'missing-product', product: null },
    ], expect.objectContaining({ source: 'reconciliation_exact' }));

    mocks.candidates = [];
    const completeResult = await processProductReconciliationRun(RUN_ID, { now: NOW });
    expect(completeResult).toEqual({ runId: RUN_ID, status: 'completed', continuationRequired: false });
  });

  it('rejects an exact response whose count proves the returned data is incomplete', async () => {
    resetRun({ phase: 'verify' });
    mocks.candidates = [{ productId: 'missing-product' }];
    mocks.providerResponses.push({
      isSuccess: true,
      data: {
        listProduct: {
          count: 1,
          page: 1,
          limit: 50,
          hasNext: false,
          data: [],
        },
      },
    });

    await expect(processProductReconciliationRun(RUN_ID, { now: NOW }))
      .rejects.toMatchObject({ code: 'product_provider_contract_invalid' });

    expect(mocks.applyEvidence).not.toHaveBeenCalled();
    expect(mocks.run.status).toBe('error');
    expect(mocks.run.lastErrorCode).toBe('product_provider_contract_invalid');
  });

  it('closes an old-generation run as stale before any provider call', async () => {
    mocks.installation = {
      storeId: 'store-1',
      authorizedAppId: 'app-2',
      generation: 3,
      stateVersion: 5,
      status: 'active',
    };

    const result = await processProductReconciliationRun(RUN_ID, { now: NOW });

    expect(result).toEqual({ runId: RUN_ID, status: 'stale_ignored', continuationRequired: false });
    expect(mocks.listProductsForSync).not.toHaveBeenCalled();
    expect(mocks.applyEvidence).not.toHaveBeenCalled();
    expect(mocks.run.finishedAt).toEqual(NOW);
  });
});
