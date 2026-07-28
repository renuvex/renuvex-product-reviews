import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { AuthToken } from '@/models/auth-token';

const mocks = vi.hoisted(() => ({
  refreshToken: vi.fn(),
  updateExisting: vi.fn(),
}));

vi.mock('@ikas/admin-api-client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@ikas/admin-api-client')>();
  return {
    ...actual,
    OAuthAPI: {
      ...actual.OAuthAPI,
      refreshToken: mocks.refreshToken,
    },
  };
});

vi.mock('@/models/auth-token/manager', () => ({
  AuthTokenManager: { updateExisting: mocks.updateExisting },
}));

import { onCheckToken } from '@/helpers/api-helpers';

function expiredToken(): AuthToken {
  return {
    authorizedAppId: 'app-1',
    merchantId: 'store-1',
    salesChannelId: null,
    accessToken: 'access-old',
    tokenType: 'Bearer',
    expiresIn: 3600,
    expireDate: '2020-01-01T00:00:00.000Z',
    refreshToken: 'refresh-old',
    scope: 'read_orders',
    updatedAt: '2026-07-28T12:00:00.000Z',
  };
}

describe('ikas token refresh persistence', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('CLIENT_SECRET', 'test-client-secret-at-least-32-bytes');
    vi.stubEnv('NEXT_PUBLIC_CLIENT_ID', 'client-1');
    mocks.refreshToken.mockResolvedValue({
      data: {
        access_token: 'access-new',
        refresh_token: 'refresh-new',
        token_type: 'Bearer',
        expires_in: 7200,
      },
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('persists with a compare-and-set on the exact row revision used by the request', async () => {
    const token = expiredToken();
    mocks.updateExisting.mockImplementation(async (updated) => updated);

    const result = await onCheckToken(token);

    expect(mocks.updateExisting).toHaveBeenCalledWith(
      expect.objectContaining({
        authorizedAppId: 'app-1',
        merchantId: 'store-1',
        accessToken: 'access-new',
        refreshToken: 'refresh-new',
      }),
      {
        refreshToken: 'refresh-old',
        updatedAt: '2026-07-28T12:00:00.000Z',
      },
    );
    expect(result).toMatchObject({
      accessToken: 'access-new',
      tokenData: { refreshToken: 'refresh-new' },
    });
    expect(token).toMatchObject({
      accessToken: 'access-old',
      refreshToken: 'refresh-old',
    });
  });

  it('does not expose an in-flight refresh when reauthorization already replaced the row', async () => {
    const token = expiredToken();
    mocks.updateExisting.mockResolvedValue(undefined);

    await expect(onCheckToken(token)).resolves.toEqual({ accessToken: undefined });
    expect(token).toMatchObject({
      accessToken: 'access-old',
      refreshToken: 'refresh-old',
    });
  });

  it('fails closed before the provider call when the token has no persisted row revision', async () => {
    const token = expiredToken();
    delete token.updatedAt;

    await expect(onCheckToken(token)).resolves.toEqual({ accessToken: undefined });
    expect(mocks.refreshToken).not.toHaveBeenCalled();
    expect(mocks.updateExisting).not.toHaveBeenCalled();
  });
});
