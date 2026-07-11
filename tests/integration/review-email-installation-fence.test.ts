import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import {
  activateIkasStoreInstallation,
  beginIkasStoreInstallationErasure,
  finishIkasStoreInstallationErasure,
} from '@/lib/ikas-installation-lifecycle';

const integrationDatabaseUrl = process.env.REVIEW_EMAIL_INTEGRATION_DATABASE_URL;
const integrationDescribe = integrationDatabaseUrl ? describe : describe.skip;
const STORE_ID = 'review-email-installation-fence-test';

function token(authorizedAppId: string) {
  return {
    authorizedAppId,
    merchantId: STORE_ID,
    salesChannelId: null,
    accessToken: `access-${authorizedAppId}`,
    tokenType: 'Bearer',
    expiresIn: 3600,
    expireDate: '2026-07-10T13:00:00.000Z',
    refreshToken: `refresh-${authorizedAppId}`,
    scope: 'read_orders',
  };
}

async function cleanupFixture() {
  await prisma.authToken.deleteMany({ where: { merchantId: STORE_ID } });
  await prisma.ikasStoreInstallation.deleteMany({ where: { storeId: STORE_ID } });
}

integrationDescribe('review email installation fence (PostgreSQL)', () => {
  beforeAll(async () => {
    const parsed = new URL(integrationDatabaseUrl!);
    if (!['127.0.0.1', 'localhost'].includes(parsed.hostname)) {
      throw new Error('Review email integration tests require a local disposable PostgreSQL database');
    }
    if (process.env.DATABASE_URL !== integrationDatabaseUrl) {
      throw new Error('DATABASE_URL must match REVIEW_EMAIL_INTEGRATION_DATABASE_URL');
    }
    await cleanupFixture();
  });

  afterAll(async () => {
    await cleanupFixture();
    await prisma.$disconnect();
  });

  it('serializes uninstall and reinstall, then ignores the stale uninstall identity', async () => {
    await activateIkasStoreInstallation(token('app-old') as never);

    let signalErasureLock!: () => void;
    const erasureLockAcquired = new Promise<void>((resolve) => {
      signalErasureLock = resolve;
    });
    const erasure = prisma.$transaction(async (tx) => {
      const decision = await beginIkasStoreInstallationErasure(tx, {
        storeId: STORE_ID,
        authorizedAppId: 'app-old',
        now: new Date('2026-07-10T12:00:00.000Z'),
      });
      expect(decision.action).toBe('erase');
      signalErasureLock();
      await tx.$executeRaw`SELECT pg_sleep(0.4)`;
      await tx.authToken.deleteMany({ where: { merchantId: STORE_ID } });
      await finishIkasStoreInstallationErasure(tx, STORE_ID, new Date('2026-07-10T12:00:01.000Z'));
    });

    await erasureLockAcquired;
    const reinstall = activateIkasStoreInstallation(token('app-new') as never, new Date('2026-07-10T12:00:02.000Z'));
    await Promise.all([erasure, reinstall]);

    const installation = await prisma.ikasStoreInstallation.findUniqueOrThrow({
      where: { storeId: STORE_ID },
    });
    expect(installation).toMatchObject({
      authorizedAppId: 'app-new',
      generation: 2,
      status: 'active',
    });
    await expect(prisma.authToken.findMany({ where: { merchantId: STORE_ID } })).resolves.toMatchObject([{ authorizedAppId: 'app-new' }]);

    const staleDecision = await prisma.$transaction((tx) =>
      beginIkasStoreInstallationErasure(tx, {
        storeId: STORE_ID,
        authorizedAppId: 'app-old',
        now: new Date('2026-07-10T12:00:03.000Z'),
      }),
    );
    expect(staleDecision.action).toBe('stale');
    await expect(
      prisma.ikasStoreInstallation.findUniqueOrThrow({
        where: { storeId: STORE_ID },
      }),
    ).resolves.toMatchObject({ authorizedAppId: 'app-new', status: 'active' });
  });
});
