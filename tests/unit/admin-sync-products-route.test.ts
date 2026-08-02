import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  authenticate: vi.fn(),
  authenticationResponse: vi.fn(),
  getIkas: vi.fn(),
  registerWebhooks: vi.fn(),
  startRun: vi.fn(),
  dispatch: vi.fn(),
  report: vi.fn(),
}));

vi.mock('@/lib/auth-helpers', () => ({
  authenticateIkasAdminRequest: mocks.authenticate,
  ikasAdminAuthenticationResponse: mocks.authenticationResponse,
  ikasAdminAuthorizationLostResponse: vi.fn(() => Response.json({ error: 'unauthorized' }, { status: 401 })),
}));
vi.mock('@/helpers/api-helpers', () => ({ getIkas: mocks.getIkas }));
vi.mock('@/lib/product-snapshots', () => ({
  buildProductWebhookEndpoint: vi.fn(() => 'https://app.renuvex.app/api/webhooks/ikas/products'),
  registerProductWebhooks: mocks.registerWebhooks,
}));
vi.mock('@/lib/product-reconciliation', () => ({
  startProductReconciliationRun: mocks.startRun,
}));
vi.mock('@/lib/product-reconciliation-dispatcher', () => ({
  dispatchProductReconciliationRun: mocks.dispatch,
}));
vi.mock('@/lib/server-failures', () => ({ reportServerFailure: mocks.report }));

import { POST } from '@/app/api/admin/sync-products/route';

const principal = {
  merchantId: 'store-1',
  authorizedAppId: 'app-1',
  generation: 3,
  stateVersion: 7,
};

describe('admin product sync route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.authenticate.mockResolvedValue({
      ok: true,
      context: { principal, authToken: { accessToken: 'test-token' } },
    });
    mocks.getIkas.mockReturnValue({ kind: 'ikas-client' });
    mocks.registerWebhooks.mockResolvedValue([
      { id: 'hook-1', scope: 'store/product/updated', endpoint: 'https://app.renuvex.app/api/webhooks/ikas/products' },
    ]);
    mocks.startRun.mockResolvedValue({
      run: { id: '11111111-1111-4111-8111-111111111111', status: 'pending' },
      created: true,
    });
    mocks.dispatch.mockResolvedValue(true);
  });

  it('registers webhooks and returns an opaque bounded reconciliation run', async () => {
    const response = await POST(new Request('https://app.renuvex.app/api/admin/sync-products', {
      method: 'POST',
      headers: { host: 'app.renuvex.app' },
    }) as never);

    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({
      data: {
        runId: '11111111-1111-4111-8111-111111111111',
        status: 'pending',
        webhooks: [{
          id: 'hook-1',
          scope: 'store/product/updated',
          endpoint: 'https://app.renuvex.app/api/webhooks/ikas/products',
        }],
      },
    });
    expect(mocks.startRun).toHaveBeenCalledWith({
      storeId: 'store-1',
      fence: principal,
      trigger: 'manual',
    });
    expect(mocks.dispatch).toHaveBeenCalledWith('11111111-1111-4111-8111-111111111111');
  });
});
