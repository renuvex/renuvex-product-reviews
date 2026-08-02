import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  transaction: vi.fn(),
  requireFence: vi.fn(),
  findMany: vi.fn(),
  update: vi.fn(),
  create: vi.fn(),
}));

const tx = {
  productSnapshot: {
    findMany: mocks.findMany,
    update: mocks.update,
    create: mocks.create,
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
    mocks.create.mockResolvedValue({ lifecycleState: 'unavailable_verified' });
    mocks.update.mockResolvedValue({ lifecycleState: 'unavailable_verified' });
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
    expect(mocks.update).not.toHaveBeenCalled();
    expect(mocks.create).not.toHaveBeenCalled();
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
    expect(mocks.update).not.toHaveBeenCalled();
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it('records an exact empty response as unavailable without hard deletion', async () => {
    mocks.findMany.mockResolvedValue([{
      productId: 'product-1',
      lifecycleState: 'active_verified',
      slug: 'premium-shorts',
      name: 'Premium Shorts',
      providerCreatedAt: new Date('2026-01-01T00:00:00.000Z'),
      ikasUpdatedAt: new Date('2026-08-01T00:00:00.000Z'),
      unavailableAt: null,
      conflictDetectedAt: null,
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
    expect(mocks.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { storeId_productId: { storeId: 'store-1', productId: 'product-1' } },
      data: expect.objectContaining({ lifecycleState: 'unavailable_verified' }),
    }));
    expect(tx.productSnapshot).not.toHaveProperty('deleteMany');
  });
});
