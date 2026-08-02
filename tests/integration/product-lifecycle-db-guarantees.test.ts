import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import { activateIkasStoreInstallation } from '@/lib/ikas-installation-lifecycle';
import { applyExactProductEvidence } from '@/lib/product-snapshots';

const integrationDatabaseUrl = process.env.REVIEW_EMAIL_INTEGRATION_DATABASE_URL;
const integrationDescribe = integrationDatabaseUrl ? describe : describe.skip;
const STORE_ID = 'product-lifecycle-db-test';

function token(authorizedAppId: string) {
  return {
    authorizedAppId,
    merchantId: STORE_ID,
    salesChannelId: null,
    accessToken: `access-${authorizedAppId}`,
    tokenType: 'Bearer',
    expiresIn: 3600,
    expireDate: '2027-08-03T13:00:00.000Z',
    refreshToken: `refresh-${authorizedAppId}`,
    scope: 'read_products',
  };
}

async function cleanupFixture() {
  await prisma.productReconciliationRun.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.review.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.productReviewSummary.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.productSnapshot.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.authToken.deleteMany({ where: { merchantId: STORE_ID } });
  await prisma.ikasStoreInstallation.deleteMany({ where: { storeId: STORE_ID } });
}

integrationDescribe('product lifecycle evidence guarantees (PostgreSQL)', () => {
  beforeAll(async () => {
    const parsed = new URL(integrationDatabaseUrl!);
    if (!['127.0.0.1', 'localhost'].includes(parsed.hostname)) {
      throw new Error('Product lifecycle integration tests require a local disposable PostgreSQL database');
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

  it('preserves historical reviews while unavailable evidence becomes a sticky identity conflict', async () => {
    const now = new Date('2026-08-03T03:00:00.000Z');
    await prisma.review.create({
      data: {
        storeId: STORE_ID,
        productId: 'product-old',
        rating: 5,
        author: 'Historical reviewer',
        status: 'approved',
        slug: 'shared-slug',
      },
    });
    await prisma.$transaction((tx) => applyExactProductEvidence(tx, STORE_ID, 'product-old', {
      id: 'product-old',
      name: 'Old product',
      slug: 'shared-slug',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: now,
      deleted: false,
    }, { source: 'integration_active', now }));
    await prisma.$transaction((tx) => applyExactProductEvidence(
      tx,
      STORE_ID,
      'product-old',
      null,
      { source: 'integration_unavailable', now: new Date('2026-08-03T04:00:00.000Z') },
    ));
    await prisma.$transaction((tx) => applyExactProductEvidence(tx, STORE_ID, 'product-old', {
      id: 'product-old',
      name: 'Reappeared product',
      slug: 'shared-slug',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-03T05:00:00.000Z'),
      deleted: false,
    }, { source: 'integration_reappeared', now: new Date('2026-08-03T05:00:00.000Z') }));

    await expect(prisma.productSnapshot.findUniqueOrThrow({
      where: { storeId_productId: { storeId: STORE_ID, productId: 'product-old' } },
    })).resolves.toMatchObject({ lifecycleState: 'identity_conflict', slug: 'shared-slug' });
    await expect(prisma.review.count({ where: { storeId: STORE_ID, productId: 'product-old' } }))
      .resolves.toBe(1);
  });

  it('keeps a new product with the same slug separate from old review ownership', async () => {
    await prisma.review.create({
      data: {
        storeId: STORE_ID,
        productId: 'product-old',
        rating: 4,
        author: 'Historical reviewer',
        status: 'approved',
        slug: 'same-slug',
      },
    });
    await prisma.$transaction((tx) => applyExactProductEvidence(tx, STORE_ID, 'product-new', {
      id: 'product-new',
      name: 'New product',
      slug: 'same-slug',
      createdAt: new Date('2026-08-03T00:00:00.000Z'),
      updatedAt: new Date('2026-08-03T00:00:00.000Z'),
      deleted: false,
    }, { source: 'integration_new_product', now: new Date('2026-08-03T00:00:00.000Z') }));

    await expect(prisma.review.count({ where: { storeId: STORE_ID, productId: 'product-new' } }))
      .resolves.toBe(0);
    await expect(prisma.review.count({ where: { storeId: STORE_ID, productId: 'product-old' } }))
      .resolves.toBe(1);
  });

  it('atomically closes old reconciliation work when a new installation generation activates', async () => {
    await activateIkasStoreInstallation(token('app-old') as never, new Date('2026-08-03T01:00:00.000Z'));
    const run = await prisma.productReconciliationRun.create({
      data: {
        storeId: STORE_ID,
        authorizedAppId: 'app-old',
        installationGeneration: 1,
        installationStateVersion: 1,
        trigger: 'daily',
        scheduleSlot: '2026-08-03',
        status: 'error',
        phase: 'verify',
        attempts: 3,
        nextRetryAt: new Date('2026-08-03T03:00:00.000Z'),
        lastErrorCode: 'product_provider_list_failed',
      },
    });

    const activatedAt = new Date('2026-08-03T02:00:00.000Z');
    await activateIkasStoreInstallation(token('app-new') as never, activatedAt);

    await expect(prisma.productReconciliationRun.findUniqueOrThrow({ where: { id: run.id } }))
      .resolves.toMatchObject({
        status: 'stale_ignored',
        phase: 'complete',
        finishedAt: activatedAt,
        nextRetryAt: null,
        lastErrorCode: null,
      });
  });
});
