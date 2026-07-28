import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { sign } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import {
  activateIkasStoreInstallation,
  beginIkasStoreInstallationErasure,
  finishIkasStoreInstallationErasure,
  requireActiveIkasStoreInstallationFence,
  resolveActiveIkasInstallationTokenPair,
} from '@/lib/ikas-installation-lifecycle';
import { authenticateIkasAdminRequest } from '@/lib/auth-helpers';
import { AuthTokenManager } from '@/models/auth-token/manager';

const integrationDatabaseUrl = process.env.REVIEW_EMAIL_INTEGRATION_DATABASE_URL;
const integrationDescribe = integrationDatabaseUrl ? describe : describe.skip;
const SECRET = 'integration-client-secret-at-least-32-bytes';
const STORE_PREFIX = 'admin-auth-fence-test';

function oauthToken(storeId: string, authorizedAppId: string) {
  return {
    authorizedAppId,
    merchantId: storeId,
    salesChannelId: null,
    accessToken: `access-${authorizedAppId}`,
    tokenType: 'Bearer',
    expiresIn: 3600,
    expireDate: '2027-07-28T13:00:00.000Z',
    refreshToken: `refresh-${authorizedAppId}`,
    scope: 'read_orders',
  };
}

function adminJwt(storeId: string, authorizedAppId: string) {
  const now = Math.floor(Date.now() / 1000);
  return sign(
    {
      aud: authorizedAppId,
      sub: storeId,
      iat: now,
      exp: now + 3600,
    },
    SECRET,
    { algorithm: 'HS256' },
  );
}

function adminRequest(storeId: string, authorizedAppId: string) {
  return new Request('https://app.renuvex.app/api/admin/settings', {
    headers: { Authorization: `JWT ${adminJwt(storeId, authorizedAppId)}` },
  });
}

async function cleanupFixtures() {
  await prisma.widgetSettings.deleteMany({ where: { storeId: { startsWith: STORE_PREFIX } } });
  await prisma.authToken.deleteMany({ where: { merchantId: { startsWith: STORE_PREFIX } } });
  await prisma.ikasStoreInstallation.deleteMany({ where: { storeId: { startsWith: STORE_PREFIX } } });
}

integrationDescribe('admin auth installation fence (PostgreSQL)', () => {
  beforeAll(async () => {
    const parsed = new URL(integrationDatabaseUrl!);
    if (!['127.0.0.1', 'localhost'].includes(parsed.hostname)) {
      throw new Error('Admin auth integration tests require a local disposable PostgreSQL database');
    }
    if (process.env.DATABASE_URL !== integrationDatabaseUrl) {
      throw new Error('DATABASE_URL must match REVIEW_EMAIL_INTEGRATION_DATABASE_URL');
    }
    vi.stubEnv('CLIENT_SECRET', SECRET);
    await cleanupFixtures();
  });

  afterEach(async () => {
    await cleanupFixtures();
  });

  afterAll(async () => {
    vi.unstubAllEnvs();
    await cleanupFixtures();
    await prisma.$disconnect();
  });

  it('rejects an old JWT after uninstall and accepts only the new reinstall identity', async () => {
    const storeId = `${STORE_PREFIX}-reinstall`;
    await activateIkasStoreInstallation(oauthToken(storeId, 'admin-auth-app-old') as never);
    await expect(authenticateIkasAdminRequest(adminRequest(storeId, 'admin-auth-app-old'))).resolves.toMatchObject({
      ok: true,
    });

    await prisma.$transaction(async (tx) => {
      await beginIkasStoreInstallationErasure(tx, {
        storeId,
        authorizedAppId: 'admin-auth-app-old',
        now: new Date('2026-07-28T10:00:00.000Z'),
      });
      await tx.authToken.deleteMany({ where: { merchantId: storeId } });
      await finishIkasStoreInstallationErasure(tx, storeId, new Date('2026-07-28T10:00:01.000Z'));
    });

    await expect(authenticateIkasAdminRequest(adminRequest(storeId, 'admin-auth-app-old'))).resolves.toMatchObject({
      ok: false,
      code: 'unauthorized',
    });

    await activateIkasStoreInstallation(
      oauthToken(storeId, 'admin-auth-app-new') as never,
      new Date('2026-07-28T10:00:02.000Z'),
    );
    await expect(authenticateIkasAdminRequest(adminRequest(storeId, 'admin-auth-app-new'))).resolves.toMatchObject({
      ok: true,
      context: {
        principal: {
          authorizedAppId: 'admin-auth-app-new',
          generation: 2,
        },
      },
    });
    await expect(authenticateIkasAdminRequest(adminRequest(storeId, 'admin-auth-app-old'))).resolves.toMatchObject({
      ok: false,
      code: 'unauthorized',
    });
  });

  it('reports reauthorization only when the active exact installation has lost its token', async () => {
    const storeId = `${STORE_PREFIX}-missing-token`;
    await activateIkasStoreInstallation(oauthToken(storeId, 'admin-auth-app-missing') as never);
    await prisma.authToken.delete({ where: { authorizedAppId: 'admin-auth-app-missing' } });

    await expect(authenticateIkasAdminRequest(adminRequest(storeId, 'admin-auth-app-missing'))).resolves.toEqual({
      ok: false,
      code: 'reauthorization_required',
      status: 409,
    });
  });

  it('serializes exact-pair reads with same-store OAuth reauthorization', async () => {
    const storeId = `${STORE_PREFIX}-pair-snapshot`;
    await activateIkasStoreInstallation(oauthToken(storeId, 'admin-auth-app-pair') as never);

    let signalPairRead!: () => void;
    const pairRead = new Promise<void>((resolve) => {
      signalPairRead = resolve;
    });
    let releasePairRead!: () => void;
    const release = new Promise<void>((resolve) => {
      releasePairRead = resolve;
    });

    const oldPairPromise = prisma.$transaction(async (tx) => {
      const pair = await resolveActiveIkasInstallationTokenPair(
        tx,
        storeId,
        'admin-auth-app-pair',
      );
      signalPairRead();
      await release;
      return pair;
    });

    await pairRead;
    let reauthorizationCompleted = false;
    const reauthorization = activateIkasStoreInstallation({
      ...oauthToken(storeId, 'admin-auth-app-pair'),
      accessToken: 'access-rotated',
      refreshToken: 'refresh-rotated',
    } as never).then((installation) => {
      reauthorizationCompleted = true;
      return installation;
    });

    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(reauthorizationCompleted).toBe(false);

    releasePairRead();
    const [oldPair, newInstallation] = await Promise.all([oldPairPromise, reauthorization]);
    expect(oldPair).toMatchObject({
      status: 'active',
      installation: { stateVersion: 1 },
      authToken: { accessToken: 'access-admin-auth-app-pair' },
    });
    expect(newInstallation.stateVersion).toBe(2);

    const newPair = await prisma.$transaction((tx) => resolveActiveIkasInstallationTokenPair(
      tx,
      storeId,
      'admin-auth-app-pair',
    ));
    expect(newPair).toMatchObject({
      status: 'active',
      installation: { stateVersion: 2 },
      authToken: { accessToken: 'access-rotated' },
    });
  });

  it('rejects a stale refresh when the row changed but the refresh token did not rotate', async () => {
    const storeId = `${STORE_PREFIX}-refresh-revision`;
    const authorizedAppId = 'admin-auth-app-refresh-revision';
    await activateIkasStoreInstallation(oauthToken(storeId, authorizedAppId) as never);

    const staleToken = await AuthTokenManager.getExact(authorizedAppId, storeId);
    expect(staleToken?.updatedAt).toBeTruthy();

    await prisma.authToken.update({
      where: { authorizedAppId },
      data: {
        accessToken: 'access-from-concurrent-update',
        refreshToken: staleToken!.refreshToken,
        updatedAt: new Date(new Date(staleToken!.updatedAt!).getTime() + 1_000),
      },
    });

    const persisted = await AuthTokenManager.updateExisting(
      {
        ...staleToken!,
        accessToken: 'access-from-stale-refresh',
        refreshToken: staleToken!.refreshToken,
      },
      {
        refreshToken: staleToken!.refreshToken,
        updatedAt: staleToken!.updatedAt!,
      },
    );

    expect(persisted).toBeUndefined();
    await expect(prisma.authToken.findUnique({ where: { authorizedAppId } })).resolves.toMatchObject({
      accessToken: 'access-from-concurrent-update',
      refreshToken: staleToken!.refreshToken,
    });
  });

  it('does not recreate local state when uninstall commits before the final mutation fence', async () => {
    const storeId = `${STORE_PREFIX}-race`;
    const installation = await activateIkasStoreInstallation(oauthToken(storeId, 'admin-auth-app-race') as never);
    const fence = {
      authorizedAppId: 'admin-auth-app-race',
      generation: installation.generation,
      stateVersion: installation.stateVersion,
    };

    let signalErasureLock!: () => void;
    const erasureLockAcquired = new Promise<void>((resolve) => {
      signalErasureLock = resolve;
    });
    const erasure = prisma.$transaction(async (tx) => {
      await beginIkasStoreInstallationErasure(tx, {
        storeId,
        authorizedAppId: 'admin-auth-app-race',
        now: new Date('2026-07-28T11:00:00.000Z'),
      });
      signalErasureLock();
      await tx.$executeRaw`SELECT pg_sleep(0.3)`;
      await tx.authToken.deleteMany({ where: { merchantId: storeId } });
      await finishIkasStoreInstallationErasure(tx, storeId, new Date('2026-07-28T11:00:01.000Z'));
    });

    await erasureLockAcquired;
    const staleMutation = prisma.$transaction(async (tx) => {
      await requireActiveIkasStoreInstallationFence(tx, storeId, fence);
      await tx.widgetSettings.create({
        data: { storeId, widgetId: 'reviews', settings: {} },
      });
    });

    await erasure;
    await expect(staleMutation).rejects.toMatchObject({ code: 'ikas_installation_inactive' });
    await expect(prisma.widgetSettings.count({ where: { storeId } })).resolves.toBe(0);
  });
});
