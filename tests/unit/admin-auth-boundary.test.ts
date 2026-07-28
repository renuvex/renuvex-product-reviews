import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { sign } from 'jsonwebtoken';
import { createHmac } from 'node:crypto';

const mocks = vi.hoisted(() => ({
  transaction: vi.fn(),
  installationLock: vi.fn(),
  installationRows: vi.fn(),
  tokenFindUnique: vi.fn(),
  captureException: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    $transaction: mocks.transaction,
  },
}));

vi.mock('@sentry/nextjs', () => ({
  captureException: mocks.captureException,
}));

import { JwtHelpers } from '@/helpers/jwt-helpers';
import {
  authenticateIkasAdminRequest,
  ikasAdminAuthenticationResponse,
} from '@/lib/auth-helpers';

const SECRET = 'test-client-secret-at-least-32-bytes';
const NOW_SECONDS = Math.floor(Date.now() / 1000);

function jwt(
  claims: Record<string, unknown> = {},
  algorithm: 'HS256' | 'HS384' | 'HS512' = 'HS256',
) {
  return sign(
    {
      aud: 'app-1',
      sub: 'store-1',
      exp: NOW_SECONDS + 3600,
      ...claims,
    },
    SECRET,
    { algorithm },
  );
}

function request(token: string, scheme = 'JWT') {
  return new Request('https://app.renuvex.app/api/admin/settings', {
    headers: { Authorization: `${scheme} ${token}` },
  });
}

function rawHs256Jwt(payload: Record<string, unknown>) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

function activeInstallation(overrides: Record<string, unknown> = {}) {
  return {
    storeId: 'store-1',
    authorizedAppId: 'app-1',
    generation: 3,
    stateVersion: 7,
    status: 'active',
    ...overrides,
  };
}

function exactToken(overrides: Record<string, unknown> = {}) {
  return {
    merchantId: 'store-1',
    authorizedAppId: 'app-1',
    salesChannelId: null,
    accessToken: 'access-token',
    tokenType: 'Bearer',
    expiresIn: 3600,
    expireDate: new Date('2027-07-28T12:00:00.000Z'),
    refreshToken: 'refresh-token',
    scope: 'read_orders',
    createdAt: new Date('2026-07-28T12:00:00.000Z'),
    updatedAt: new Date('2026-07-28T12:00:00.000Z'),
    ...overrides,
  };
}

describe('ikas admin JWT verification', () => {
  beforeEach(() => {
    vi.stubEnv('CLIENT_SECRET', SECRET);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('accepts only HS256 with required scalar identity and time claims', () => {
    expect(JwtHelpers.verifyToken(jwt())).toMatchObject({
      status: 'valid',
      claims: { aud: 'app-1', sub: 'store-1' },
    });
    expect(JwtHelpers.verifyToken(jwt({}, 'HS384'))).toEqual({ status: 'invalid' });
    expect(JwtHelpers.verifyToken(jwt({}, 'HS512'))).toEqual({ status: 'invalid' });
  });

  it.each([
    ['array aud', { aud: ['app-1'] }],
    ['empty aud', { aud: '  ' }],
    ['non-string sub', { sub: 123 }],
    ['empty sub', { sub: '' }],
    ['expired exp', { exp: NOW_SECONDS - 1 }],
  ])('rejects %s', (_label, claims) => {
    expect(JwtHelpers.verifyToken(jwt(claims))).toEqual({ status: 'invalid' });
  });

  it('rejects non-numeric exp and iat even when the signature is valid', () => {
    expect(JwtHelpers.verifyToken(rawHs256Jwt({
      aud: 'app-1',
      sub: 'store-1',
      exp: 'not-a-number',
      iat: NOW_SECONDS,
    }))).toEqual({ status: 'invalid' });
    expect(JwtHelpers.verifyToken(rawHs256Jwt({
      aud: 'app-1',
      sub: 'store-1',
      exp: NOW_SECONDS + 3600,
      iat: 'not-a-number',
    }))).toEqual({ status: 'invalid' });
  });

  it('rejects missing exp and missing iat', () => {
    const missingExp = sign(
      { aud: 'app-1', sub: 'store-1' },
      SECRET,
      { algorithm: 'HS256' },
    );
    const missingIat = sign(
      { aud: 'app-1', sub: 'store-1', exp: NOW_SECONDS + 3600 },
      SECRET,
      { algorithm: 'HS256', noTimestamp: true },
    );
    expect(JwtHelpers.verifyToken(missingExp)).toEqual({ status: 'invalid' });
    expect(JwtHelpers.verifyToken(missingIat)).toEqual({ status: 'invalid' });
  });

  it('distinguishes a missing server secret from an invalid credential', () => {
    vi.stubEnv('CLIENT_SECRET', '   ');
    expect(JwtHelpers.verifyToken(jwt())).toEqual({ status: 'configuration_error' });
  });
});

describe('active ikas admin principal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('CLIENT_SECRET', SECRET);
    vi.stubEnv('DEV_MERCHANT_ID', '');
    vi.stubEnv('DEV_AUTHORIZED_APP_ID', '');
    mocks.transaction.mockImplementation(async (callback) => callback({
      $executeRaw: mocks.installationLock,
      $queryRaw: mocks.installationRows,
      authToken: { findUnique: mocks.tokenFindUnique },
    }));
    mocks.installationLock.mockResolvedValue(0);
    mocks.installationRows.mockResolvedValue([activeInstallation()]);
    mocks.tokenFindUnique.mockResolvedValue(exactToken());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns an exact active installation and token pair', async () => {
    const result = await authenticateIkasAdminRequest(request(jwt()));
    expect(result).toMatchObject({
      ok: true,
      context: {
        principal: {
          merchantId: 'store-1',
          authorizedAppId: 'app-1',
          generation: 3,
          stateVersion: 7,
        },
        authToken: {
          merchantId: 'store-1',
          authorizedAppId: 'app-1',
        },
      },
    });
  });

  it.each([
    ['bare token', (token: string) => new Request('https://app.test', { headers: { Authorization: token } })],
    ['wrong scheme', (token: string) => request(token, 'Bearer')],
    ['extra material', (token: string) => new Request('https://app.test', { headers: { Authorization: `JWT ${token} extra` } })],
  ])('rejects a %s before storage lookup', async (_label, makeRequest) => {
    await expect(authenticateIkasAdminRequest(makeRequest(jwt()))).resolves.toMatchObject({
      ok: false,
      code: 'unauthorized',
      status: 401,
    });
    expect(mocks.transaction).not.toHaveBeenCalled();
  });

  it('rejects inactive, tenant-mismatched, and stale reinstall identities', async () => {
    mocks.installationRows.mockResolvedValueOnce([activeInstallation({ status: 'erasing' })]);
    await expect(authenticateIkasAdminRequest(request(jwt()))).resolves.toMatchObject({
      ok: false,
      code: 'unauthorized',
    });

    mocks.installationRows.mockResolvedValueOnce([activeInstallation({ authorizedAppId: 'app-new' })]);
    await expect(authenticateIkasAdminRequest(request(jwt()))).resolves.toMatchObject({
      ok: false,
      code: 'unauthorized',
    });

    mocks.installationRows.mockResolvedValueOnce([activeInstallation()]);
    mocks.tokenFindUnique.mockResolvedValueOnce(exactToken({ merchantId: 'other-store' }));
    await expect(authenticateIkasAdminRequest(request(jwt()))).resolves.toMatchObject({
      ok: false,
      code: 'unauthorized',
    });
  });

  it('uses reauthorization_required only for an active installation without its OAuth token', async () => {
    mocks.tokenFindUnique.mockResolvedValue(null);
    const result = await authenticateIkasAdminRequest(request(jwt()));
    expect(result).toEqual({
      ok: false,
      code: 'reauthorization_required',
      status: 409,
    });
  });

  it('fails closed with a stable unavailable response on configuration and DB errors', async () => {
    vi.stubEnv('CLIENT_SECRET', '');
    const missingSecret = await authenticateIkasAdminRequest(request(jwt()));
    expect(missingSecret).toMatchObject({
      ok: false,
      code: 'authentication_unavailable',
      status: 503,
    });

    vi.stubEnv('CLIENT_SECRET', SECRET);
    mocks.transaction.mockRejectedValueOnce(new Error('credential-canary'));
    const dbFailure = await authenticateIkasAdminRequest(request(jwt()));
    expect(dbFailure).toMatchObject({
      ok: false,
      code: 'authentication_unavailable',
      status: 503,
    });

    const response = ikasAdminAuthenticationResponse(dbFailure as never);
    expect(response.status).toBe(503);
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    await expect(response.json()).resolves.toEqual({ error: 'authentication_unavailable' });
  });

  it('does not enable development bypass unless both identities are configured', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('DEV_MERCHANT_ID', 'store-1');
    vi.stubEnv('DEV_AUTHORIZED_APP_ID', '');
    await expect(authenticateIkasAdminRequest(new Request('https://app.test'))).resolves.toMatchObject({
      ok: false,
      code: 'unauthorized',
    });

    vi.stubEnv('DEV_AUTHORIZED_APP_ID', 'app-1');
    await expect(authenticateIkasAdminRequest(new Request('https://app.test'))).resolves.toMatchObject({
      ok: true,
      context: { principal: { merchantId: 'store-1', authorizedAppId: 'app-1' } },
    });
  });
});
