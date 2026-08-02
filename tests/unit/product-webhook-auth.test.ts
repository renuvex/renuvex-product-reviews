import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  transaction: vi.fn(),
  resolvePair: vi.fn(),
  fromDatabaseRow: vi.fn(),
  getIkas: vi.fn(),
  syncProduct: vi.fn(),
}));

vi.mock('@ikas/admin-api-client', () => ({
  validateIkasWebhookSignature: vi.fn(() => true),
  getParsedIkasWebhookData: vi.fn(() => ({ productId: 'product-1' })),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: { $transaction: mocks.transaction },
}));

vi.mock('@/lib/ikas-installation-lifecycle', () => ({
  resolveActiveIkasInstallationTokenPair: mocks.resolvePair,
}));

vi.mock('@/models/auth-token/manager', () => ({
  AuthTokenManager: { fromDatabaseRow: mocks.fromDatabaseRow },
}));

vi.mock('@/helpers/api-helpers', () => ({
  getIkas: mocks.getIkas,
}));

vi.mock('@/lib/product-snapshots', () => ({
  PRODUCT_WEBHOOK_SCOPES: ['store/product/updated'],
  getProductIdFromWebhookData: vi.fn(() => 'product-1'),
  syncSingleProductForStore: mocks.syncProduct,
}));

function request() {
  return new Request('https://app.renuvex.app/api/webhooks/ikas/products', {
    method: 'POST',
    body: JSON.stringify({
      id: 'event-1',
      scope: 'store/product/updated',
      merchantId: 'store-1',
      authorizedAppId: 'app-1',
      data: '{}',
      signature: 'signature',
    }),
  });
}

describe('product webhook installation/token pairing', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.stubEnv('CLIENT_SECRET', 'test-client-secret-at-least-32-bytes');
    const tx = { marker: 'tx' };
    mocks.transaction.mockImplementation((callback) => callback(tx));
    mocks.resolvePair.mockResolvedValue({
      status: 'active',
      installation: {
        authorizedAppId: 'app-1',
        generation: 3,
        stateVersion: 7,
      },
      authToken: { authorizedAppId: 'app-1', merchantId: 'store-1' },
    });
    mocks.fromDatabaseRow.mockReturnValue({
      authorizedAppId: 'app-1',
      merchantId: 'store-1',
      accessToken: 'access-token',
    });
    mocks.getIkas.mockReturnValue({ client: true });
    mocks.syncProduct.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('uses one locked exact-pair snapshot for provider read and final write fence', async () => {
    const { POST } = await import('@/app/api/webhooks/ikas/products/route');

    const response = await POST(request());

    expect(response.status).toBe(200);
    expect(mocks.resolvePair).toHaveBeenCalledWith(
      expect.objectContaining({ marker: 'tx' }),
      'store-1',
      'app-1',
    );
    expect(mocks.syncProduct).toHaveBeenCalledWith(
      { client: true },
      'store-1',
      'product-1',
      {
        authorizedAppId: 'app-1',
        generation: 3,
        stateVersion: 7,
      },
    );
  });

  it('does not start provider work for an inactive installation', async () => {
    mocks.resolvePair.mockResolvedValueOnce({ status: 'inactive' });
    const { POST } = await import('@/app/api/webhooks/ikas/products/route');

    const response = await POST(request());

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      ok: true,
      skipped: 'ikas_installation_inactive',
    });
    expect(mocks.getIkas).not.toHaveBeenCalled();
    expect(mocks.syncProduct).not.toHaveBeenCalled();
  });
});
