import { beforeEach, describe, expect, it, vi } from 'vitest';

const { prisma } = vi.hoisted(() => ({
  prisma: {
    $transaction: vi.fn(),
  },
}));

vi.mock('@/lib/prisma', () => ({ prisma }));

import { activateIkasStoreInstallation, ensureActiveIkasStoreInstallation } from '@/lib/ikas-installation-lifecycle';

function token(overrides: Record<string, unknown> = {}) {
  return {
    authorizedAppId: 'app-new',
    merchantId: 'store-1',
    salesChannelId: null,
    accessToken: 'access-token',
    tokenType: 'Bearer',
    expiresIn: 3600,
    expireDate: '2026-07-10T13:00:00.000Z',
    refreshToken: 'refresh-token',
    scope: 'read_orders',
    ...overrides,
  };
}

describe('ikas installation lifecycle fence', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('activates a reinstall as a new generation in the same token transaction', async () => {
    const current = {
      storeId: 'store-1',
      authorizedAppId: 'app-old',
      generation: 3,
      stateVersion: 7,
      status: 'erased',
    };
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([current]),
      authToken: {
        deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
        create: vi.fn().mockResolvedValue({ authorizedAppId: 'app-new' }),
      },
      ikasStoreInstallation: {
        upsert: vi.fn().mockResolvedValue({
          ...current,
          authorizedAppId: 'app-new',
          generation: 4,
          stateVersion: 8,
          status: 'active',
        }),
      },
    };
    prisma.$transaction.mockImplementation(async (callback: (value: typeof tx) => unknown) => callback(tx));

    const result = await activateIkasStoreInstallation(token() as never, new Date('2026-07-10T12:00:00.000Z'));

    expect(result).toMatchObject({ authorizedAppId: 'app-new', generation: 4, status: 'active' });
    expect(tx.authToken.deleteMany).toHaveBeenCalledWith({ where: { merchantId: 'store-1' } });
    expect(tx.ikasStoreInstallation.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        update: expect.objectContaining({
          authorizedAppId: 'app-new',
          generation: 4,
          stateVersion: 8,
          status: 'active',
        }),
      }),
    );
  });

  it('does not resurrect an erased installation with the same authorized app id', async () => {
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([
        {
          storeId: 'store-1',
          authorizedAppId: 'app-new',
          generation: 3,
          stateVersion: 7,
          status: 'erased',
        },
      ]),
      authToken: { deleteMany: vi.fn(), create: vi.fn() },
      ikasStoreInstallation: { upsert: vi.fn() },
    };
    prisma.$transaction.mockImplementation(async (callback: (value: typeof tx) => unknown) => callback(tx));

    await expect(activateIkasStoreInstallation(token() as never)).rejects.toMatchObject({
      code: 'ikas_installation_reactivation_rejected',
    });
    expect(tx.authToken.deleteMany).not.toHaveBeenCalled();
    expect(tx.ikasStoreInstallation.upsert).not.toHaveBeenCalled();
  });

  it('lazily seeds the lifecycle row only from a tenant-matching auth token', async () => {
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([]),
      authToken: {
        findUnique: vi.fn().mockResolvedValue({
          merchantId: 'store-1',
          authorizedAppId: 'app-new',
        }),
      },
      ikasStoreInstallation: {
        create: vi.fn().mockResolvedValue({
          storeId: 'store-1',
          authorizedAppId: 'app-new',
          generation: 1,
          stateVersion: 1,
          status: 'active',
        }),
      },
    };
    prisma.$transaction.mockImplementation(async (callback: (value: typeof tx) => unknown) => callback(tx));

    await expect(ensureActiveIkasStoreInstallation('store-1', 'app-new')).resolves.toMatchObject({
      status: 'active',
      generation: 1,
    });
    expect(tx.ikasStoreInstallation.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ storeId: 'store-1', authorizedAppId: 'app-new' }),
      }),
    );
  });
});
