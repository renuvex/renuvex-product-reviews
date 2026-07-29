import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GET, PUT } from '@/app/api/admin/settings/route';
import { IkasInstallationError } from '@/lib/ikas-installation-lifecycle';

const prismaMock = vi.hoisted(() => ({
  $transaction: vi.fn(),
  widgetSettings: { findMany: vi.fn(), upsert: vi.fn() },
}));
const authMock = vi.hoisted(() => ({
  authenticateIkasAdminRequest: vi.fn(),
  ikasAdminAuthorizationLostResponse: vi.fn(),
  ikasAdminAuthenticationResponse: vi.fn(),
}));
const accessMock = vi.hoisted(() => ({ getVideoFeatureAccess: vi.fn() }));
const lifecycleMock = vi.hoisted(() => ({ requireFence: vi.fn() }));
const themeMock = vi.hoisted(() => ({ sync: vi.fn() }));
const afterMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/auth-helpers', () => authMock);
vi.mock('@/lib/media/access', () => accessMock);
vi.mock('@/lib/ikas-installation-lifecycle', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/ikas-installation-lifecycle')>();
  return {
    ...actual,
    requireActiveIkasStoreInstallationFence: lifecycleMock.requireFence,
  };
});
vi.mock('@/lib/storefront-theme-sync', () => ({
  syncStorefrontThemeForToken: themeMock.sync,
}));
vi.mock('next/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/server')>();
  return { ...actual, after: afterMock };
});

beforeEach(() => {
  vi.clearAllMocks();
  authMock.authenticateIkasAdminRequest.mockResolvedValue({
    ok: true,
    context: {
      principal: {
        merchantId: 'store-1',
        authorizedAppId: 'app-1',
        generation: 1,
        stateVersion: 1,
      },
      authToken: {},
    },
  });
  authMock.ikasAdminAuthorizationLostResponse.mockImplementation(() => new Response(
    JSON.stringify({ error: 'unauthorized' }),
    { status: 401, headers: { 'content-type': 'application/json' } },
  ));
  prismaMock.$transaction.mockImplementation(async (callback) => callback({
    widgetSettings: prismaMock.widgetSettings,
  }));
  lifecycleMock.requireFence.mockResolvedValue({
    storeId: 'store-1',
    authorizedAppId: 'app-1',
    generation: 1,
    stateVersion: 1,
    status: 'active',
  });
  prismaMock.widgetSettings.upsert.mockResolvedValue({
    storeId: 'store-1',
    widgetId: 'reviews',
    settings: { videoReviewsEnabled: true },
  });
  prismaMock.widgetSettings.findMany.mockResolvedValue([
    { widgetId: 'reviews', settings: { videoReviewsEnabled: true } },
  ]);
  accessMock.getVideoFeatureAccess.mockResolvedValue({
    enabled: false,
    reason: 'quota_exceeded',
    monthlyLimit: 5,
    reservedCount: 1,
    consumedCount: 4,
    usedCount: 5,
    remainingCount: 0,
  });
});

describe('GET /api/admin/settings', () => {
  it('returns video usage as read-only metadata beside editable settings', async () => {
    const response = await GET(new Request('https://app.test/api/admin/settings'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.reviews.videoReviewsEnabled).toBe(true);
    expect(body.data.reviews).not.toHaveProperty('videoUsage');
    expect(body.meta.videoUsage).toEqual({
      monthlyLimit: 5,
      reservedCount: 1,
      consumedCount: 4,
      usedCount: 5,
      remainingCount: 0,
      effective: false,
      reason: 'quota_exceeded',
    });
  });
});

describe('PUT /api/admin/settings', () => {
  it('rechecks the installation fence in the final settings transaction', async () => {
    const response = await PUT(new Request('https://app.test/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify({
        widgetId: 'reviews',
        settings: { videoReviewsEnabled: true },
      }),
    }));

    expect(response.status).toBe(200);
    expect(lifecycleMock.requireFence).toHaveBeenCalledWith(
      expect.anything(),
      'store-1',
      expect.objectContaining({
        authorizedAppId: 'app-1',
        generation: 1,
        stateVersion: 1,
      }),
    );
    expect(prismaMock.widgetSettings.upsert).toHaveBeenCalledOnce();
  });

  it('returns unauthorized when uninstall wins before settings persistence', async () => {
    lifecycleMock.requireFence.mockRejectedValueOnce(
      new IkasInstallationError('ikas_installation_inactive'),
    );

    const response = await PUT(new Request('https://app.test/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify({
        widgetId: 'reviews',
        settings: { videoReviewsEnabled: true },
      }),
    }));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: 'unauthorized' });
    expect(prismaMock.widgetSettings.upsert).not.toHaveBeenCalled();
  });
});
