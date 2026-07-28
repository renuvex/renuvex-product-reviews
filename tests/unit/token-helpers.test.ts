import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getAuthorizedAppId: vi.fn(),
  getNewToken: vi.fn(),
}));

vi.mock('@ikas/app-helpers', () => ({
  AppBridgeHelper: {
    getAuthorizedAppId: mocks.getAuthorizedAppId,
    getNewToken: mocks.getNewToken,
  },
}));

function jwt(exp: number): string {
  const payload = Buffer.from(JSON.stringify({ exp, marker: '10\u00ff' })).toString('base64url');
  return `header.${payload}.signature`;
}

function createSessionStorage() {
  const values = new Map<string, string>();
  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => values.set(key, value)),
    removeItem: vi.fn((key: string) => values.delete(key)),
    clear: vi.fn(() => values.clear()),
    key: vi.fn((index: number) => [...values.keys()][index] ?? null),
    get length() {
      return values.size;
    },
  };
}

function setIframeContext(isIframe: boolean) {
  const frameWindow: Record<string, unknown> = {};
  frameWindow.self = isIframe ? {} : frameWindow;
  frameWindow.top = isIframe ? {} : frameWindow;
  vi.stubGlobal('window', frameWindow);
}

describe('TokenHelpers AppBridge token contract', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal('sessionStorage', createSessionStorage());
    setIframeContext(true);
    mocks.getAuthorizedAppId.mockResolvedValue('authorized-app-1');
    mocks.getNewToken.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches and caches an AppBridge token on a cold iframe start', async () => {
    const freshToken = jwt(Math.floor(Date.now() / 1000) + 3600);
    mocks.getNewToken.mockResolvedValue(freshToken);
    const { TokenHelpers } = await import('@/helpers/token-helpers');

    await expect(TokenHelpers.getTokenForIframeApp()).resolves.toBe(freshToken);

    expect(mocks.getAuthorizedAppId).toHaveBeenCalledOnce();
    expect(mocks.getNewToken).toHaveBeenCalledOnce();
    expect(sessionStorage.setItem).toHaveBeenCalledWith('token-authorized-app-1', freshToken);
  });

  it('returns a valid app-scoped cached token without requesting a replacement', async () => {
    const cachedToken = jwt(Math.floor(Date.now() / 1000) + 3600);
    sessionStorage.setItem('token-authorized-app-1', cachedToken);
    const { TokenHelpers } = await import('@/helpers/token-helpers');

    await expect(TokenHelpers.getTokenForIframeApp()).resolves.toBe(cachedToken);

    expect(mocks.getNewToken).not.toHaveBeenCalled();
  });

  it('removes an expired cached token and replaces it through AppBridge', async () => {
    const expiredToken = jwt(Math.floor(Date.now() / 1000) - 60);
    const freshToken = jwt(Math.floor(Date.now() / 1000) + 3600);
    sessionStorage.setItem('token-authorized-app-1', expiredToken);
    mocks.getNewToken.mockResolvedValue(freshToken);
    const { TokenHelpers } = await import('@/helpers/token-helpers');

    await expect(TokenHelpers.getTokenForIframeApp()).resolves.toBe(freshToken);

    expect(sessionStorage.removeItem).toHaveBeenCalledWith('token-authorized-app-1');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('token-authorized-app-1', freshToken);
  });

  it('removes a malformed cached token and recovers through AppBridge', async () => {
    const freshToken = jwt(Math.floor(Date.now() / 1000) + 3600);
    sessionStorage.setItem('token-authorized-app-1', 'not-a-jwt');
    mocks.getNewToken.mockResolvedValue(freshToken);
    const { TokenHelpers } = await import('@/helpers/token-helpers');

    await expect(TokenHelpers.getTokenForIframeApp()).resolves.toBe(freshToken);

    expect(sessionStorage.removeItem).toHaveBeenCalledWith('token-authorized-app-1');
    expect(mocks.getNewToken).toHaveBeenCalledOnce();
    expect(sessionStorage.setItem).toHaveBeenCalledWith('token-authorized-app-1', freshToken);
  });

  it('does not reuse a token cached for a different authorized app', async () => {
    const otherAppToken = jwt(Math.floor(Date.now() / 1000) + 3600);
    const currentAppToken = jwt(Math.floor(Date.now() / 1000) + 3600);
    sessionStorage.setItem('token-authorized-app-2', otherAppToken);
    mocks.getNewToken.mockResolvedValue(currentAppToken);
    const { TokenHelpers } = await import('@/helpers/token-helpers');

    await expect(TokenHelpers.getTokenForIframeApp()).resolves.toBe(currentAppToken);

    expect(sessionStorage.getItem).toHaveBeenCalledWith('token-authorized-app-1');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('token-authorized-app-1', currentAppToken);
  });

  it('fails closed when AppBridge cannot provide an authorized app identity', async () => {
    mocks.getAuthorizedAppId.mockResolvedValue(null);
    const { TokenHelpers } = await import('@/helpers/token-helpers');

    await expect(TokenHelpers.getTokenForIframeApp()).resolves.toBeNull();

    expect(mocks.getNewToken).not.toHaveBeenCalled();
    expect(sessionStorage.setItem).not.toHaveBeenCalled();
  });

  it('does not call AppBridge outside an iframe', async () => {
    setIframeContext(false);
    const { TokenHelpers } = await import('@/helpers/token-helpers');

    await expect(TokenHelpers.getTokenForIframeApp()).resolves.toBeNull();

    expect(mocks.getAuthorizedAppId).not.toHaveBeenCalled();
    expect(mocks.getNewToken).not.toHaveBeenCalled();
  });
});
