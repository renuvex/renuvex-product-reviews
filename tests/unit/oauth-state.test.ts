import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

const redisMocks = vi.hoisted(() => ({
  set: vi.fn(),
  getdel: vi.fn(),
  del: vi.fn(),
  constructor: vi.fn(),
}));

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(function Redis(options: unknown) {
    redisMocks.constructor(options);
    return {
      set: redisMocks.set,
      getdel: redisMocks.getdel,
      del: redisMocks.del,
    };
  }),
}));

const originalRedisUrl = process.env.KV_REST_API_URL;
const originalRedisToken = process.env.KV_REST_API_TOKEN;
const records = new Map<string, unknown>();

async function loadOAuthState() {
  return import('@/lib/oauth-state');
}

beforeEach(() => {
  vi.resetModules();
  records.clear();
  process.env.KV_REST_API_URL = 'https://redis.example.test';
  process.env.KV_REST_API_TOKEN = 'test-token';

  redisMocks.set.mockImplementation(async (key: string, value: unknown, options?: { nx?: boolean }) => {
    if (options?.nx && records.has(key)) return null;
    records.set(key, value);
    return 'OK';
  });
  redisMocks.getdel.mockImplementation(async (key: string) => {
    const value = records.get(key) ?? null;
    records.delete(key);
    return value;
  });
  redisMocks.del.mockImplementation(async (key: string) => (records.delete(key) ? 1 : 0));
});

afterAll(() => {
  if (originalRedisUrl === undefined) delete process.env.KV_REST_API_URL;
  else process.env.KV_REST_API_URL = originalRedisUrl;
  if (originalRedisToken === undefined) delete process.env.KV_REST_API_TOKEN;
  else process.env.KV_REST_API_TOKEN = originalRedisToken;
});

describe('OAuth state transaction store', () => {
  it('stores a 256-bit state under hashed binding and state keys with a bounded TTL', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-28T10:00:00.000Z'));
    const { createOAuthBrowserBinding, issueOAuthStateTransaction, OAUTH_STATE_TTL_SECONDS } = await loadOAuthState();
    const browserBinding = createOAuthBrowserBinding();

    const result = await issueOAuthStateTransaction({
      browserBinding,
      storeName: 'dev-store',
      redirectUri: 'https://app.renuvex.app/api/oauth/callback/ikas',
    });

    expect(browserBinding).toMatch(/^[a-f0-9]{64}$/);
    expect(result).toEqual({
      state: expect.stringMatching(/^[a-f0-9]{64}$/),
      expiresInSeconds: 600,
    });
    expect(OAUTH_STATE_TTL_SECONDS).toBe(600);

    const [key, value, options] = redisMocks.set.mock.calls[0] as [string, unknown, unknown];
    expect(key).toMatch(/^oauth:state:v1:[a-f0-9]{64}:[a-f0-9]{64}$/);
    expect(key).not.toContain(browserBinding);
    expect(key).not.toContain(result.state);
    expect(JSON.stringify(value)).not.toContain(browserBinding);
    expect(JSON.stringify(value)).not.toContain(result.state);
    expect(value).toEqual({
      version: 1,
      storeName: 'dev-store',
      redirectUri: 'https://app.renuvex.app/api/oauth/callback/ikas',
      createdAt: '2026-07-28T10:00:00.000Z',
    });
    expect(options).toEqual({ nx: true, ex: 600 });
    vi.useRealTimers();
  });

  it('atomically consumes a transaction once', async () => {
    const { consumeOAuthStateTransaction, createOAuthBrowserBinding, issueOAuthStateTransaction } = await loadOAuthState();
    const browserBinding = createOAuthBrowserBinding();
    const issued = await issueOAuthStateTransaction({
      browserBinding,
      storeName: 'dev-store',
      redirectUri: 'https://app.renuvex.app/api/oauth/callback/ikas',
    });

    await expect(consumeOAuthStateTransaction({ browserBinding, state: issued.state })).resolves.toMatchObject({
      version: 1,
      storeName: 'dev-store',
    });
    await expect(consumeOAuthStateTransaction({ browserBinding, state: issued.state })).resolves.toBeNull();
  });

  it('claims one bounded dashboard bootstrap without storing raw identity values', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-28T10:00:00.000Z'));
    const { claimOAuthDashboardBootstrap, createOAuthBrowserBinding } = await loadOAuthState();
    const browserBinding = createOAuthBrowserBinding();

    await expect(claimOAuthDashboardBootstrap({ browserBinding, storeName: 'Dev-Store' })).resolves.toBe(true);
    await expect(claimOAuthDashboardBootstrap({ browserBinding, storeName: 'dev-store' })).resolves.toBe(false);

    const [key, value, options] = redisMocks.set.mock.calls[0] as [string, unknown, unknown];
    expect(key).toMatch(/^oauth:dashboard-bootstrap:v1:[a-f0-9]{64}:[a-f0-9]{64}$/);
    expect(key).not.toContain(browserBinding);
    expect(key).not.toContain('dev-store');
    expect(JSON.stringify(value)).not.toContain(browserBinding);
    expect(JSON.stringify(value)).not.toContain('dev-store');
    expect(value).toEqual({ version: 1, createdAt: '2026-07-28T10:00:00.000Z' });
    expect(options).toEqual({ nx: true, ex: 600 });
    vi.useRealTimers();
  });

  it('clears a claimed dashboard bootstrap after a state-bearing callback', async () => {
    const { claimOAuthDashboardBootstrap, clearOAuthDashboardBootstrap, createOAuthBrowserBinding } =
      await loadOAuthState();
    const browserBinding = createOAuthBrowserBinding();

    await expect(claimOAuthDashboardBootstrap({ browserBinding, storeName: 'dev-store' })).resolves.toBe(true);
    await expect(clearOAuthDashboardBootstrap({ browserBinding, storeName: 'dev-store' })).resolves.toBeUndefined();
    await expect(claimOAuthDashboardBootstrap({ browserBinding, storeName: 'dev-store' })).resolves.toBe(true);
    expect(redisMocks.del).toHaveBeenCalledOnce();
  });

  it('does not consume the valid transaction when a different browser binding is used', async () => {
    const { consumeOAuthStateTransaction, createOAuthBrowserBinding, issueOAuthStateTransaction } = await loadOAuthState();
    const browserBinding = createOAuthBrowserBinding();
    const issued = await issueOAuthStateTransaction({
      browserBinding,
      storeName: 'dev-store',
      redirectUri: 'https://app.renuvex.app/api/oauth/callback/ikas',
    });

    await expect(
      consumeOAuthStateTransaction({
        browserBinding: createOAuthBrowserBinding(),
        state: issued.state,
      }),
    ).resolves.toBeNull();
    await expect(consumeOAuthStateTransaction({ browserBinding, state: issued.state })).resolves.toMatchObject({
      storeName: 'dev-store',
    });
  });

  it('rejects malformed state or binding values before reading Redis', async () => {
    const { consumeOAuthStateTransaction } = await loadOAuthState();

    await expect(consumeOAuthStateTransaction({ browserBinding: 'invalid', state: 'invalid' })).resolves.toBeNull();
    expect(redisMocks.getdel).not.toHaveBeenCalled();
  });

  it('fails closed when Redis configuration or commands are unavailable', async () => {
    const { createOAuthBrowserBinding, issueOAuthStateTransaction, OAuthStateStoreError } = await loadOAuthState();
    delete process.env.KV_REST_API_URL;

    await expect(
      issueOAuthStateTransaction({
        browserBinding: createOAuthBrowserBinding(),
        storeName: 'dev-store',
        redirectUri: 'https://app.renuvex.app/api/oauth/callback/ikas',
      }),
    ).rejects.toBeInstanceOf(OAuthStateStoreError);

    vi.resetModules();
    process.env.KV_REST_API_URL = 'https://redis.example.test';
    redisMocks.set.mockRejectedValueOnce(new Error('network failure containing raw provider details'));
    const reloaded = await loadOAuthState();
    await expect(
      reloaded.issueOAuthStateTransaction({
        browserBinding: reloaded.createOAuthBrowserBinding(),
        storeName: 'dev-store',
        redirectUri: 'https://app.renuvex.app/api/oauth/callback/ikas',
      }),
    ).rejects.toMatchObject({ code: 'oauth_state_store_unavailable' });

    redisMocks.set.mockRejectedValueOnce(new Error('network failure'));
    await expect(
      reloaded.claimOAuthDashboardBootstrap({
        browserBinding: reloaded.createOAuthBrowserBinding(),
        storeName: 'dev-store',
      }),
    ).rejects.toMatchObject({ code: 'oauth_state_store_unavailable' });
  });

  it('fails closed instead of overwriting an existing transaction key', async () => {
    const { createOAuthBrowserBinding, issueOAuthStateTransaction } = await loadOAuthState();
    redisMocks.set.mockResolvedValueOnce(null);

    await expect(
      issueOAuthStateTransaction({
        browserBinding: createOAuthBrowserBinding(),
        storeName: 'dev-store',
        redirectUri: 'https://app.renuvex.app/api/oauth/callback/ikas',
      }),
    ).rejects.toMatchObject({ code: 'oauth_state_store_unavailable' });
  });

  it('canonicalizes only valid ikas store DNS labels', async () => {
    const { ikasStoreNameSchema } = await loadOAuthState();

    expect(ikasStoreNameSchema.parse('  My-Store  ')).toBe('my-store');
    expect(ikasStoreNameSchema.safeParse('store.example').success).toBe(false);
    expect(ikasStoreNameSchema.safeParse('-store').success).toBe(false);
    expect(ikasStoreNameSchema.safeParse('store-').success).toBe(false);
    expect(ikasStoreNameSchema.safeParse('a'.repeat(64)).success).toBe(false);
  });
});
