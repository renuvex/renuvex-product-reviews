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
    expect(prismaMock.widgetSettings.findMany).toHaveBeenCalledWith({
      where: { storeId: 'store-1', widgetId: { in: ['reviews', 'badge'] } },
    });
  });

  it('omits planned and unknown rows even if storage returns them', async () => {
    prismaMock.widgetSettings.findMany.mockResolvedValueOnce([
      { widgetId: 'reviews', settings: { enabled: true } },
      { widgetId: 'carousel', settings: { injected: true } },
      { widgetId: 'unknown', settings: { injected: true } },
    ]);

    const response = await GET(new Request('https://app.test/api/admin/settings'));
    const body = await response.json();

    expect(body.data.reviews.enabled).toBe(true);
    expect(body.data).not.toHaveProperty('carousel');
    expect(body.data).not.toHaveProperty('unknown');
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

  it.each([
    ['malformed JSON', '{'],
    ['null body', 'null'],
    ['array body', '[]'],
    ['scalar body', '42'],
  ])('rejects %s before starting persistence', async (_label, body) => {
    const response = await PUT(new Request('https://app.test/api/admin/settings', {
      method: 'PUT',
      body,
    }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'invalid_request_body' });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
    expect(afterMock).not.toHaveBeenCalled();
  });

  it('rejects an unknown widget before persistence', async () => {
    const response = await PUT(new Request('https://app.test/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify({ widgetId: 'unknown', settings: {} }),
    }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'invalid_widget_id' });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
    expect(afterMock).not.toHaveBeenCalled();
  });

  it.each([
    ['missing', {}],
    ['null', { widgetId: null, settings: {} }],
    ['array', { widgetId: [], settings: {} }],
    ['empty', { widgetId: '', settings: {} }],
  ])('rejects a %s widget ID before persistence', async (_label, body) => {
    const response = await PUT(new Request('https://app.test/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(body),
    }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'invalid_widget_id' });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
    expect(afterMock).not.toHaveBeenCalled();
  });

  it('rejects a planned widget before settings shape and side effects', async () => {
    const response = await PUT(new Request('https://app.test/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify({ widgetId: 'carousel', settings: null }),
    }));

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({ error: 'widget_not_available' });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
    expect(lifecycleMock.requireFence).not.toHaveBeenCalled();
    expect(prismaMock.widgetSettings.upsert).not.toHaveBeenCalled();
    expect(afterMock).not.toHaveBeenCalled();
  });

  it.each([null, [], 'settings', 1])('rejects non-object settings %j', async (settings) => {
    const response = await PUT(new Request('https://app.test/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify({ widgetId: 'reviews', settings }),
    }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'invalid_widget_settings' });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
    expect(afterMock).not.toHaveBeenCalled();
  });

  it('returns a fixed validation error for invalid configurable settings', async () => {
    const response = await PUT(new Request('https://app.test/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify({ widgetId: 'reviews', settings: { enabled: 'yes' } }),
    }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'invalid_widget_settings' });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
    expect(afterMock).not.toHaveBeenCalled();
  });
});
