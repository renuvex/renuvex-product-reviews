import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import type { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => ({
  redisSet: vi.fn(),
  redisGetDel: vi.fn(),
  getSession: vi.fn(),
  sessionSave: vi.fn(),
  getOAuthUrl: vi.fn(),
  getTokenWithAuthorizationCode: vi.fn(),
  getRedirectUri: vi.fn(),
  validateCodeSignature: vi.fn(),
  getIkas: vi.fn(),
  getIkasV1: vi.fn(),
  activateInstallation: vi.fn(),
  after: vi.fn(),
  createJwt: vi.fn(),
  storeSettingsUpsert: vi.fn(),
  ensureStorefrontScripts: vi.fn(),
  registerProductWebhooks: vi.fn(),
  syncAllProductsForStore: vi.fn(),
  isReviewEmailEnabled: vi.fn(),
}));

vi.mock('next/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/server')>();
  return {
    ...actual,
    after: mocks.after,
  };
});

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(function Redis() {
    return {
      set: mocks.redisSet,
      getdel: mocks.redisGetDel,
    };
  }),
}));

vi.mock('@/globals/config', () => ({
  config: {
    adminUrl: 'https://admin.myikas.com/store/{storeName}',
    oauth: {
      clientId: 'client-id',
      clientSecret: 'client-secret',
      scope: 'read_orders,read_customers',
      redirectUri: 'https://app.renuvex.app/api/oauth/callback/ikas',
    },
  },
}));

vi.mock('@/lib/session', () => ({
  getSession: mocks.getSession,
}));

vi.mock('@ikas/admin-api-client', () => ({
  OAuthAPI: {
    getOAuthUrl: mocks.getOAuthUrl,
    getTokenWithAuthorizationCode: mocks.getTokenWithAuthorizationCode,
  },
}));

vi.mock('@/helpers/api-helpers', () => ({
  getRedirectUri: mocks.getRedirectUri,
  getIkas: mocks.getIkas,
  getIkasV1: mocks.getIkasV1,
}));

vi.mock('@/helpers/token-helpers', () => ({
  TokenHelpers: {
    validateCodeSignature: mocks.validateCodeSignature,
  },
}));

vi.mock('@/helpers/jwt-helpers', () => ({
  JwtHelpers: {
    createToken: mocks.createJwt,
  },
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    storeSettings: { upsert: mocks.storeSettingsUpsert },
    reviewEmailSettings: { findUnique: vi.fn() },
  },
}));

vi.mock('@/lib/storefront-scripts', () => ({
  ensureStorefrontScripts: mocks.ensureStorefrontScripts,
}));

vi.mock('@/lib/product-snapshots', () => ({
  buildProductWebhookEndpoint: vi.fn(() => 'https://app.renuvex.app/api/webhooks/ikas/products'),
  registerProductWebhooks: mocks.registerProductWebhooks,
  syncAllProductsForStore: mocks.syncAllProductsForStore,
}));

vi.mock('@/lib/review-email/config', () => ({
  isReviewEmailEnabled: mocks.isReviewEmailEnabled,
}));

vi.mock('@/lib/review-email/ikas-orders', () => ({
  buildOrderWebhookEndpoint: vi.fn(),
  registerOrderWebhooks: vi.fn(),
}));

vi.mock('@/lib/ikas-installation-lifecycle', () => ({
  activateIkasStoreInstallation: mocks.activateInstallation,
}));

vi.mock('@/lib/review-email/settings', () => ({
  updateReviewEmailWebhookStateForInstallation: vi.fn(),
}));

const originalRedisUrl = process.env.KV_REST_API_URL;
const originalRedisToken = process.env.KV_REST_API_TOKEN;
const records = new Map<string, unknown>();
const session: {
  oauthBrowserBinding?: string;
  merchantId?: string;
  authorizedAppId?: string;
  expiresAt?: Date;
  save: ReturnType<typeof vi.fn>;
} = {
  save: mocks.sessionSave,
};

function request(url: string): NextRequest {
  return new Request(url, { headers: { host: 'app.renuvex.app' } }) as unknown as NextRequest;
}

async function authorize(storeName = 'dev-store'): Promise<string> {
  const { GET } = await import('@/app/api/oauth/authorize/ikas/route');
  const response = await GET(request(`https://app.renuvex.app/api/oauth/authorize/ikas?storeName=${encodeURIComponent(storeName)}`));
  expect(response.status).toBe(307);
  const location = response.headers.get('location');
  expect(location).toBeTruthy();
  return new URL(location!).searchParams.get('state')!;
}

async function callback(params: {
  code?: string;
  storeName?: string;
  state?: string;
  signature?: string;
}) {
  const url = new URL('https://app.renuvex.app/api/oauth/callback/ikas');
  if (params.code !== undefined) url.searchParams.set('code', params.code);
  if (params.storeName !== undefined) url.searchParams.set('storeName', params.storeName);
  if (params.state !== undefined) url.searchParams.set('state', params.state);
  if (params.signature !== undefined) url.searchParams.set('signature', params.signature);
  const { GET } = await import('@/app/api/oauth/callback/ikas/route');
  return GET(request(url.toString()));
}

beforeEach(() => {
  vi.resetModules();
  records.clear();
  delete session.oauthBrowserBinding;
  delete session.merchantId;
  delete session.authorizedAppId;
  delete session.expiresAt;
  process.env.KV_REST_API_URL = 'https://redis.example.test';
  process.env.KV_REST_API_TOKEN = 'test-token';

  mocks.getSession.mockResolvedValue(session);
  mocks.getOAuthUrl.mockImplementation(({ storeName }: { storeName: string }) => `https://${storeName}.myikas.com/api/admin/oauth`);
  mocks.getRedirectUri.mockReturnValue('https://app.renuvex.app/api/oauth/callback/ikas');
  mocks.getTokenWithAuthorizationCode.mockResolvedValue({ data: null });
  mocks.validateCodeSignature.mockImplementation((_code: string, signature: string) => signature === 'valid-signature');
  mocks.createJwt.mockReturnValue('admin-jwt');
  mocks.getIkasV1.mockReturnValue({ kind: 'v1-client' });
  mocks.isReviewEmailEnabled.mockReturnValue(false);
  mocks.redisSet.mockImplementation(async (key: string, value: unknown, options?: { nx?: boolean }) => {
    if (options?.nx && records.has(key)) return null;
    records.set(key, value);
    return 'OK';
  });
  mocks.redisGetDel.mockImplementation(async (key: string) => {
    const value = records.get(key) ?? null;
    records.delete(key);
    return value;
  });
});

afterAll(() => {
  if (originalRedisUrl === undefined) delete process.env.KV_REST_API_URL;
  else process.env.KV_REST_API_URL = originalRedisUrl;
  if (originalRedisToken === undefined) delete process.env.KV_REST_API_TOKEN;
  else process.env.KV_REST_API_TOKEN = originalRedisToken;
});

describe('ikas OAuth route state contract', () => {
  it('canonicalizes the store, persists a browser binding, and redirects only after state storage succeeds', async () => {
    const state = await authorize('  My-Store  ');

    expect(state).toMatch(/^[a-f0-9]{64}$/);
    expect(session.oauthBrowserBinding).toMatch(/^[a-f0-9]{64}$/);
    expect(mocks.sessionSave).toHaveBeenCalledOnce();
    expect(mocks.getOAuthUrl).toHaveBeenCalledWith({ storeName: 'my-store' });
    expect(mocks.redisSet).toHaveBeenCalledOnce();
  });

  it('returns 503 and does not redirect when state storage is unavailable', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    mocks.redisSet.mockRejectedValueOnce(new Error('raw-token state-value provider-body'));
    const { GET } = await import('@/app/api/oauth/authorize/ikas/route');

    const response = await GET(request('https://app.renuvex.app/api/oauth/authorize/ikas?storeName=dev-store'));

    expect(response.status).toBe(503);
    expect(response.headers.get('location')).toBeNull();
    expect(consoleError).toHaveBeenCalledWith('[oauth-authorize] oauth_state_store_unavailable');
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain('raw-token');
  });

  it.each([
    { code: undefined, storeName: 'dev-store', state: 'a'.repeat(64) },
    { code: 'code-value', storeName: undefined, state: 'a'.repeat(64) },
    { code: 'code-value', storeName: 'dev-store', state: undefined },
    { code: 'code-value', storeName: 'dev-store', state: 'malformed' },
  ])('rejects missing or malformed callback fields before state or provider work', async (params) => {
    const response = await callback(params);

    expect(response.status).toBe(400);
    expect(mocks.redisGetDel).not.toHaveBeenCalled();
    expect(mocks.getTokenWithAuthorizationCode).not.toHaveBeenCalled();
  });

  it('consumes a valid state before token exchange and rejects replay after provider failure', async () => {
    const state = await authorize('Dev-Store');

    const first = await callback({ code: 'code-value', storeName: 'dev-store', state });
    const replay = await callback({ code: 'code-value', storeName: 'dev-store', state });

    expect(first.status).toBe(500);
    expect(replay.status).toBe(400);
    expect(mocks.getTokenWithAuthorizationCode).toHaveBeenCalledOnce();
    expect(mocks.getTokenWithAuthorizationCode).toHaveBeenCalledWith(
      {
        code: 'code-value',
        client_id: 'client-id',
        client_secret: 'client-secret',
        redirect_uri: 'https://app.renuvex.app/api/oauth/callback/ikas',
      },
      { storeName: 'dev-store' },
    );
    expect(mocks.validateCodeSignature).not.toHaveBeenCalled();
  });

  it('rejects a missing or wrong browser binding without consuming the valid transaction', async () => {
    const state = await authorize();
    const correctBinding = session.oauthBrowserBinding!;
    session.oauthBrowserBinding = 'b'.repeat(64);

    const wrongBrowser = await callback({ code: 'code-value', storeName: 'dev-store', state });
    session.oauthBrowserBinding = correctBinding;
    const correctBrowser = await callback({ code: 'code-value', storeName: 'dev-store', state });

    expect(wrongBrowser.status).toBe(400);
    expect(correctBrowser.status).toBe(500);
    expect(mocks.getTokenWithAuthorizationCode).toHaveBeenCalledOnce();
  });

  it('rejects a missing browser binding without reading or consuming Redis', async () => {
    const state = await authorize();
    const correctBinding = session.oauthBrowserBinding!;
    delete session.oauthBrowserBinding;

    const missingBinding = await callback({ code: 'code-value', storeName: 'dev-store', state });
    expect(missingBinding.status).toBe(400);
    expect(mocks.redisGetDel).not.toHaveBeenCalled();

    session.oauthBrowserBinding = correctBinding;
    expect((await callback({ code: 'code-value', storeName: 'dev-store', state })).status).toBe(500);
    expect(mocks.getTokenWithAuthorizationCode).toHaveBeenCalledOnce();
  });

  it('consumes and rejects a state when callback storeName does not match the frozen transaction', async () => {
    const state = await authorize('dev-store');

    const mismatch = await callback({ code: 'code-value', storeName: 'other-store', state });
    const replay = await callback({ code: 'code-value', storeName: 'dev-store', state });

    expect(mismatch.status).toBe(400);
    expect(replay.status).toBe(400);
    expect(mocks.getTokenWithAuthorizationCode).not.toHaveBeenCalled();
  });

  it('rejects a provided invalid signature before consuming state', async () => {
    const state = await authorize();

    const invalid = await callback({
      code: 'code-value',
      storeName: 'dev-store',
      state,
      signature: 'invalid-signature',
    });
    const valid = await callback({
      code: 'code-value',
      storeName: 'dev-store',
      state,
      signature: 'valid-signature',
    });

    expect(invalid.status).toBe(400);
    expect(valid.status).toBe(500);
    expect(mocks.redisGetDel).toHaveBeenCalledOnce();
    expect(mocks.getTokenWithAuthorizationCode).toHaveBeenCalledOnce();
  });

  it('supports two independent pending states for the same browser binding', async () => {
    const firstState = await authorize();
    const secondState = await authorize();

    expect(firstState).not.toBe(secondState);
    expect(mocks.sessionSave).toHaveBeenCalledOnce();
    expect((await callback({ code: 'code-1', storeName: 'dev-store', state: firstState })).status).toBe(500);
    expect((await callback({ code: 'code-2', storeName: 'dev-store', state: secondState })).status).toBe(500);
    expect(mocks.getTokenWithAuthorizationCode).toHaveBeenCalledTimes(2);
  });

  it('keeps the normal installation flow after a valid state is consumed', async () => {
    const ikasClient = {
      queries: {
        getMerchant: vi.fn().mockResolvedValue({
          isSuccess: true,
          data: { getMerchant: { id: 'merchant-1', storeName: 'dev-store' } },
        }),
        getAuthorizedApp: vi.fn().mockResolvedValue({
          isSuccess: true,
          data: { getAuthorizedApp: { id: 'authorized-app-1', salesChannelId: null } },
        }),
      },
    };
    mocks.getIkas.mockReturnValue(ikasClient);
    mocks.getTokenWithAuthorizationCode.mockResolvedValue({
      data: {
        access_token: 'access-token',
        refresh_token: 'refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'read_orders,read_customers',
      },
    });
    const state = await authorize();

    const response = await callback({ code: 'code-value', storeName: 'dev-store', state });

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toContain('https://app.renuvex.app/callback?');
    expect(response.headers.get('location')).toContain('token=admin-jwt');
    expect(mocks.activateInstallation).toHaveBeenCalledOnce();
    expect(mocks.storeSettingsUpsert).toHaveBeenCalledWith({
      where: { storeId: 'merchant-1' },
      update: {},
      create: { storeId: 'merchant-1' },
    });
    expect(mocks.ensureStorefrontScripts).toHaveBeenCalledOnce();
    expect(mocks.registerProductWebhooks).toHaveBeenCalledOnce();
    expect(mocks.after).toHaveBeenCalledOnce();
    expect(session).toMatchObject({
      oauthBrowserBinding: expect.stringMatching(/^[a-f0-9]{64}$/),
      merchantId: 'merchant-1',
      authorizedAppId: 'authorized-app-1',
      expiresAt: expect.any(Date),
    });
    expect(mocks.sessionSave).toHaveBeenCalledTimes(2);
  });

  it('fails closed on callback storage uncertainty without leaking callback credentials', async () => {
    const state = await authorize();
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    mocks.redisGetDel.mockRejectedValueOnce(new Error(`code-value ${state} raw-signature`));

    const response = await callback({
      code: 'code-value',
      storeName: 'dev-store',
      state,
      signature: 'valid-signature',
    });

    expect(response.status).toBe(503);
    expect(mocks.getTokenWithAuthorizationCode).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledWith('[oauth-callback] oauth_state_store_unavailable');
    const logs = JSON.stringify(consoleError.mock.calls);
    expect(logs).not.toContain('code-value');
    expect(logs).not.toContain(state);
    expect(logs).not.toContain('raw-signature');
  });
});
