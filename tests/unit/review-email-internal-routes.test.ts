import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => ({
  claimDueReviewEmailJobs: vi.fn(),
  getAuthToken: vi.fn(),
  reconcile: vi.fn(),
  ensureInstallation: vi.fn(),
  getSettings: vi.fn(),
  getIkas: vi.fn(),
}));

vi.mock('@/lib/review-email/jobs', () => ({
  claimDueReviewEmailJobs: mocks.claimDueReviewEmailJobs,
}));
vi.mock('@/models/auth-token/manager', () => ({
  AuthTokenManager: { get: mocks.getAuthToken },
}));
vi.mock('@/lib/review-email/ikas-orders', () => ({
  reconcileIkasOrdersForReviewRequests: mocks.reconcile,
}));
vi.mock('@/lib/ikas-installation-lifecycle', () => ({
  ensureActiveIkasStoreInstallation: mocks.ensureInstallation,
  IkasInstallationError: class IkasInstallationError extends Error {
    constructor(public readonly code: string) {
      super(code);
    }
  },
}));
vi.mock('@/lib/review-email/settings', () => ({
  getEffectiveReviewEmailSettings: mocks.getSettings,
}));
vi.mock('@/helpers/api-helpers', () => ({ getIkas: mocks.getIkas }));
vi.mock('@/lib/prisma', () => ({ prisma: {} }));

function request(path: string, body: unknown) {
  return new NextRequest(`https://app.renuvex.app${path}`, {
    method: 'POST',
    headers: {
      authorization: 'Bearer cron-secret',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

describe('review email internal route guards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    process.env.CRON_SECRET = 'cron-secret';
  });

  afterEach(() => {
    delete process.env.CRON_SECRET;
    delete process.env.REVIEW_EMAIL_ENABLED;
  });

  it('does not claim due jobs while the global feature flag is off', async () => {
    const { POST } = await import('@/app/api/internal/review-email/due-jobs/route');

    const response = await POST(request('/api/internal/review-email/due-jobs', {}));

    expect(response.status).toBe(409);
    expect(await response.json()).toEqual({ error: 'review_email_feature_disabled' });
    expect(mocks.claimDueReviewEmailJobs).not.toHaveBeenCalled();
  });

  it('derives reconciliation store ownership from the authorized app token', async () => {
    process.env.REVIEW_EMAIL_ENABLED = 'true';
    mocks.getAuthToken.mockResolvedValue({ authorizedAppId: 'app-1', merchantId: 'store-1' });
    const { POST } = await import('@/app/api/internal/review-email/reconcile-orders/route');

    const response = await POST(
      request('/api/internal/review-email/reconcile-orders', {
        authorizedAppId: 'app-1',
        storeId: 'store-2',
      }),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'reconcile_tenant_mismatch' });
    expect(mocks.ensureInstallation).not.toHaveBeenCalled();
    expect(mocks.reconcile).not.toHaveBeenCalled();
  });

  it('runs reconciliation only for an active installation with enabled merchant settings', async () => {
    process.env.REVIEW_EMAIL_ENABLED = 'true';
    const authToken = { authorizedAppId: 'app-1', merchantId: 'store-1' };
    mocks.getAuthToken.mockResolvedValue(authToken);
    mocks.getSettings.mockResolvedValue({ enabled: true });
    mocks.reconcile.mockResolvedValue({ state: 'completed', pages: 1, orders: 1 });
    mocks.getIkas.mockReturnValue({ queries: {} });
    const { POST } = await import('@/app/api/internal/review-email/reconcile-orders/route');

    const response = await POST(
      request('/api/internal/review-email/reconcile-orders', {
        authorizedAppId: 'app-1',
      }),
    );

    expect(response.status).toBe(200);
    expect(mocks.ensureInstallation).toHaveBeenCalledWith('store-1', 'app-1');
    expect(mocks.reconcile).toHaveBeenCalledWith(expect.anything(), {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
    });
  });
});
