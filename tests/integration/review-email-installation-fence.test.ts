import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import {
  activateIkasStoreInstallation,
  beginIkasStoreInstallationErasure,
  finishIkasStoreInstallationErasure,
} from '@/lib/ikas-installation-lifecycle';
import {
  eraseStoreReviewEmailData,
  processStoreDataErasureRun,
} from '@/lib/review-email/erasure';

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
  await prisma.storeDataErasureRun.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.review.deleteMany({ where: { storeId: STORE_ID } });
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

  beforeEach(async () => {
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

  it('atomically closes nonterminal uninstall runs when a new installation activates', async () => {
    await activateIkasStoreInstallation(token('app-old') as never, new Date('2026-07-10T11:00:00.000Z'));
    const run = await prisma.storeDataErasureRun.create({
      data: {
        storeId: STORE_ID,
        authorizedAppId: 'app-old',
        installationGeneration: 1,
        triggerSource: 'ikas_store_app_deleted',
        status: 'error',
        attempts: 4,
        nextRetryAt: new Date('2026-07-10T13:00:00.000Z'),
        sanitizedErrorCode: 'journal_not_configured',
        progress: { phase: 'reviews', deleted: { reviews: 17 } },
        rowCounts: { reviews: 17 },
      },
    });

    const activatedAt = new Date('2026-07-10T12:00:00.000Z');
    await activateIkasStoreInstallation(token('app-new') as never, activatedAt);

    await expect(prisma.storeDataErasureRun.findUniqueOrThrow({ where: { id: run.id } })).resolves.toMatchObject({
      status: 'stale_ignored',
      finishedAt: activatedAt,
      nextRetryAt: null,
      sanitizedErrorCode: null,
      progress: { phase: 'reviews', deleted: { reviews: 17 } },
      rowCounts: { reviews: 17 },
    });
  });

  it('fences an exhausted prior-generation run before deleting current installation data', async () => {
    await activateIkasStoreInstallation(token('app-old') as never, new Date('2026-07-10T11:00:00.000Z'));
    await activateIkasStoreInstallation(token('app-new') as never, new Date('2026-07-10T12:00:00.000Z'));
    const installation = await prisma.ikasStoreInstallation.findUniqueOrThrow({ where: { storeId: STORE_ID } });
    await prisma.review.create({
      data: {
        storeId: STORE_ID,
        productId: 'product-current',
        rating: 5,
        author: 'Current reviewer',
        status: 'approved',
        slug: 'current-review',
      },
    });
    const oldRun = await prisma.storeDataErasureRun.create({
      data: {
        storeId: STORE_ID,
        authorizedAppId: 'app-old',
        installationGeneration: installation.generation - 1,
        triggerSource: 'ikas_store_app_deleted',
        status: 'error',
        attempts: 8,
        journalStatus: 'pending',
        sanitizedErrorCode: 'journal_not_configured',
        progress: { phase: 'reviews', deleted: {} },
      },
    });

    const result = await processStoreDataErasureRun(oldRun.id, new Date('2026-07-10T12:05:00.000Z'));

    expect(result.state).toBe('stale_ignored');
    await expect(prisma.review.count({ where: { storeId: STORE_ID } })).resolves.toBe(1);
    await expect(prisma.authToken.findMany({ where: { merchantId: STORE_ID } })).resolves.toMatchObject([
      { authorizedAppId: 'app-new' },
    ]);
    await expect(prisma.ikasStoreInstallation.findUniqueOrThrow({ where: { storeId: STORE_ID } })).resolves.toMatchObject({
      authorizedAppId: 'app-new',
      status: 'active',
    });
  });

  it('serializes duplicate app-deleted webhooks into one retry-owned run', async () => {
    await activateIkasStoreInstallation(token('app-old') as never, new Date('2026-07-10T11:00:00.000Z'));
    const journalEnvironment = {
      region: process.env.AWS_REVIEW_EMAIL_JOURNAL_REGION,
      bucket: process.env.AWS_REVIEW_EMAIL_JOURNAL_BUCKET,
      activeDays: process.env.REVIEW_EMAIL_JOURNAL_ACTIVE_RETENTION_DAYS,
      lockDays: process.env.REVIEW_EMAIL_JOURNAL_OBJECT_LOCK_RETENTION_DAYS,
    };
    delete process.env.AWS_REVIEW_EMAIL_JOURNAL_REGION;
    delete process.env.AWS_REVIEW_EMAIL_JOURNAL_BUCKET;
    delete process.env.REVIEW_EMAIL_JOURNAL_ACTIVE_RETENTION_DAYS;
    delete process.env.REVIEW_EMAIL_JOURNAL_OBJECT_LOCK_RETENTION_DAYS;

    try {
      const results = await Promise.allSettled([
        eraseStoreReviewEmailData(STORE_ID, {
          authorizedAppId: 'app-old',
          triggerSource: 'ikas_store_app_deleted',
          now: new Date('2026-07-10T12:00:00.000Z'),
        }),
        eraseStoreReviewEmailData(STORE_ID, {
          authorizedAppId: 'app-old',
          triggerSource: 'ikas_store_app_deleted',
          now: new Date('2026-07-10T12:00:00.000Z'),
        }),
      ]);

      expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
      expect(results.filter((result) => result.status === 'rejected')).toHaveLength(1);
      expect(results.find((result) => result.status === 'fulfilled')).toMatchObject({
        value: { state: 'pending' },
      });
      await expect(prisma.storeDataErasureRun.count({ where: { storeId: STORE_ID } })).resolves.toBe(1);
    } finally {
      if (journalEnvironment.region === undefined) delete process.env.AWS_REVIEW_EMAIL_JOURNAL_REGION;
      else process.env.AWS_REVIEW_EMAIL_JOURNAL_REGION = journalEnvironment.region;
      if (journalEnvironment.bucket === undefined) delete process.env.AWS_REVIEW_EMAIL_JOURNAL_BUCKET;
      else process.env.AWS_REVIEW_EMAIL_JOURNAL_BUCKET = journalEnvironment.bucket;
      if (journalEnvironment.activeDays === undefined) delete process.env.REVIEW_EMAIL_JOURNAL_ACTIVE_RETENTION_DAYS;
      else process.env.REVIEW_EMAIL_JOURNAL_ACTIVE_RETENTION_DAYS = journalEnvironment.activeDays;
      if (journalEnvironment.lockDays === undefined) delete process.env.REVIEW_EMAIL_JOURNAL_OBJECT_LOCK_RETENTION_DAYS;
      else process.env.REVIEW_EMAIL_JOURNAL_OBJECT_LOCK_RETENTION_DAYS = journalEnvironment.lockDays;
    }
  });

  it('keeps a restore replay stale when activation is newer than journal evidence', async () => {
    await activateIkasStoreInstallation(token('app-new') as never, new Date('2026-07-10T12:00:00.000Z'));
    await prisma.review.create({
      data: {
        storeId: STORE_ID,
        productId: 'product-current',
        rating: 5,
        author: 'Current reviewer',
        status: 'approved',
        slug: 'current-review',
      },
    });
    const replay = await prisma.storeDataErasureRun.create({
      data: {
        storeId: STORE_ID,
        authorizedAppId: null,
        installationGeneration: 1,
        triggerSource: 'journal_restore_replay',
        status: 'pending',
        attempts: 0,
        journalStatus: 'verified',
        journalRetentionBaseAt: new Date('2026-07-01T12:00:00.000Z'),
        progress: { phase: 'reviews', deleted: {} },
        startedAt: new Date('2026-07-01T12:00:00.000Z'),
        createdAt: new Date('2026-07-01T12:00:00.000Z'),
      },
    });

    const result = await processStoreDataErasureRun(replay.id, new Date('2026-07-10T12:05:00.000Z'));

    expect(result.state).toBe('stale_ignored');
    await expect(prisma.review.count({ where: { storeId: STORE_ID } })).resolves.toBe(1);
    await expect(prisma.authToken.count({ where: { merchantId: STORE_ID } })).resolves.toBe(1);
  });
});
