import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalClientSecret = process.env.CLIENT_SECRET;

const mocks = vi.hoisted(() => ({
  getSettings: vi.fn(),
  erase: vi.fn(),
  getAuthToken: vi.fn(),
  fetchOrder: vi.fn(),
  syncOrder: vi.fn(),
  ensureInstallation: vi.fn(),
  requireInstallation: vi.fn(),
  getIkas: vi.fn(),
  eventFind: vi.fn(),
  eventCreate: vi.fn(),
  eventUpdate: vi.fn(),
}));

vi.mock('@/globals/config', () => ({ config: { oauth: { clientSecret: 'client-secret' } } }));
vi.mock('@sentry/nextjs', () => ({ captureException: vi.fn() }));
vi.mock('@ikas/admin-api-client', () => ({
  validateIkasWebhookSignature: vi.fn(() => true),
  getParsedIkasWebhookData: vi.fn(() => ({ orderId: 'order-1' })),
}));
vi.mock('@/lib/review-email/settings', () => ({
  getEffectiveReviewEmailSettings: mocks.getSettings,
}));
vi.mock('@/lib/review-email/erasure', () => ({
  eraseStoreReviewEmailData: mocks.erase,
}));
vi.mock('@/models/auth-token/manager', () => ({
  AuthTokenManager: { get: mocks.getAuthToken },
}));
vi.mock('@/helpers/api-helpers', () => ({ getIkas: mocks.getIkas }));
vi.mock('@/lib/ikas-installation-lifecycle', () => ({
  ensureActiveIkasStoreInstallation: mocks.ensureInstallation,
  requireActiveIkasStoreInstallation: mocks.requireInstallation,
  IkasInstallationError: class IkasInstallationError extends Error {
    constructor(public readonly code: string) {
      super(code);
    }
  },
}));
vi.mock('@/lib/review-email/ikas-orders', () => ({
  digestPayload: vi.fn(() => 'digest'),
  fetchIkasOrderForReviewRequest: mocks.fetchOrder,
  getOrderIdFromWebhookData: vi.fn(() => 'order-1'),
  reviewRequestWebhookScopeSet: vi.fn(() => new Set(['store/order/created', 'store/order/updated'])),
  syncIkasOrderForReviewRequests: mocks.syncOrder,
}));
vi.mock('@/lib/prisma', () => ({
  prisma: {
    $transaction: vi.fn(async (callback: (tx: unknown) => unknown) =>
      callback({
        ikasOrderWebhookEvent: {
          findUnique: mocks.eventFind,
          create: mocks.eventCreate,
          update: mocks.eventUpdate,
        },
      }),
    ),
    ikasOrderWebhookEvent: {
      findUnique: mocks.eventFind,
      create: mocks.eventCreate,
      updateMany: mocks.eventUpdate,
    },
  },
}));

function webhookRequest(scope: string) {
  return new Request('https://app.renuvex.app/api/webhooks/ikas/orders', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      id: `event-${scope}`,
      scope,
      merchantId: 'store-1',
      authorizedAppId: 'app-1',
      data: '{}',
      signature: 'signature',
    }),
  });
}

describe('ikas review email webhook route guards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    process.env.REVIEW_EMAIL_ENABLED = 'true';
    process.env.CLIENT_SECRET = 'client-secret';
    mocks.eventFind.mockResolvedValue(null);
    mocks.eventCreate.mockResolvedValue({ id: 'event-row-1' });
    mocks.eventUpdate.mockResolvedValue({ id: 'event-row-1' });
    mocks.getAuthToken.mockResolvedValue({ authorizedAppId: 'app-1', merchantId: 'store-1' });
  });

  afterEach(() => {
    delete process.env.REVIEW_EMAIL_ENABLED;
    if (originalClientSecret === undefined) delete process.env.CLIENT_SECRET;
    else process.env.CLIENT_SECRET = originalClientSecret;
  });

  it('skips a disabled merchant without recording or fetching canonical order PII', async () => {
    mocks.getSettings.mockResolvedValue({ enabled: false });
    const { POST } = await import('@/app/api/webhooks/ikas/orders/route');

    const response = await POST(webhookRequest('store/order/updated'));

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ ok: true, skipped: 'store_email_disabled' });
    expect(mocks.eventCreate).not.toHaveBeenCalled();
    expect(mocks.fetchOrder).not.toHaveBeenCalled();
    expect(mocks.syncOrder).not.toHaveBeenCalled();
  });

  it('passes the signed installation identity into uninstall erasure even when email is globally off', async () => {
    delete process.env.REVIEW_EMAIL_ENABLED;
    mocks.erase.mockResolvedValue({ runId: 'run-1', state: 'succeeded', rowCounts: {} });
    const { POST } = await import('@/app/api/webhooks/ikas/orders/route');

    const response = await POST(webhookRequest('store/app/deleted'));

    expect(response.status).toBe(200);
    expect(mocks.erase).toHaveBeenCalledWith('store-1', {
      authorizedAppId: 'app-1',
      triggerSource: 'ikas_store_app_deleted',
    });
  });

  it('does not recreate webhook audit data after uninstall wins the lifecycle lock', async () => {
    mocks.getSettings.mockResolvedValue({ enabled: true });
    const { IkasInstallationError } = await import('@/lib/ikas-installation-lifecycle');
    mocks.requireInstallation.mockRejectedValue(new IkasInstallationError('ikas_installation_inactive'));
    const { POST } = await import('@/app/api/webhooks/ikas/orders/route');

    const response = await POST(webhookRequest('store/order/updated'));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, skipped: 'ikas_installation_inactive' });
    expect(mocks.eventCreate).not.toHaveBeenCalled();
    expect(mocks.fetchOrder).not.toHaveBeenCalled();
  });

  it('persists only a sanitized fallback code when canonical processing throws', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    mocks.getSettings.mockResolvedValue({ enabled: true });
    mocks.requireInstallation.mockResolvedValue({ storeId: 'store-1', generation: 1, status: 'active' });
    mocks.ensureInstallation.mockResolvedValue({ storeId: 'store-1', generation: 1, status: 'active' });
    mocks.fetchOrder.mockRejectedValue(new Error(
      'Customer@Example.com\r\nraw-token postgres://user:secret@db.internal/reviews',
    ));
    const { POST } = await import('@/app/api/webhooks/ikas/orders/route');

    const response = await POST(webhookRequest('store/order/updated'));

    expect(response.status).toBe(500);
    expect(mocks.eventUpdate).toHaveBeenLastCalledWith(expect.objectContaining({
      data: { status: 'error', lastErrorCode: 'order_webhook_processing_failed' },
    }));
    expect(JSON.stringify(mocks.eventUpdate.mock.calls)).not.toContain('Customer@Example.com');
  });
});
