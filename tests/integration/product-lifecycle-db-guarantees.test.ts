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
  await prisma.productReconciliationSweep.deleteMany({
    where: { scheduleSlot: { in: ['2099-01-01', '2099-01-02'] } },
  });
  await prisma.productCatalogCoverage.deleteMany({ where: { storeId: STORE_ID } });
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
      {
        source: 'integration_absence_first',
        now: new Date('2026-08-03T04:00:00.000Z'),
        reconciliationTrigger: 'daily',
        scheduleSlot: '2026-08-03',
      },
    ));
    await prisma.$transaction((tx) => applyExactProductEvidence(
      tx,
      STORE_ID,
      'product-old',
      null,
      {
        source: 'integration_absence_confirmed',
        now: new Date('2026-08-04T04:00:00.000Z'),
        reconciliationTrigger: 'daily',
        scheduleSlot: '2026-08-04',
      },
    ));
    await prisma.$transaction((tx) => applyExactProductEvidence(tx, STORE_ID, 'product-old', {
      id: 'product-old',
      name: 'Reappeared product',
      slug: 'shared-slug',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-04T05:00:00.000Z'),
      deleted: false,
    }, { source: 'integration_reappeared', now: new Date('2026-08-04T05:00:00.000Z') }));

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
    await prisma.productReconciliationObservation.create({
      data: {
        runId: run.id,
        storeId: STORE_ID,
        productId: 'product-from-old-generation',
        evidence: 'present',
        observedAt: new Date('2026-08-03T01:30:00.000Z'),
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
    await expect(prisma.productReconciliationObservation.count({ where: { runId: run.id } }))
      .resolves.toBe(0);
  });

  it('does not rewrite an unchanged active snapshot when coverage carries freshness', async () => {
    const firstEvidenceAt = new Date('2026-08-03T03:00:00.000Z');
    const product = {
      id: 'product-stable',
      name: 'Stable product',
      slug: 'stable-product',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-08-01T00:00:00.000Z'),
      deleted: false,
    };
    await prisma.$transaction((tx) => applyExactProductEvidence(
      tx,
      STORE_ID,
      product.id,
      product,
      { source: 'integration_scan', now: firstEvidenceAt, freshnessMode: 'coverage' },
    ));
    const before = await prisma.productSnapshot.findUniqueOrThrow({
      where: { storeId_productId: { storeId: STORE_ID, productId: product.id } },
    });

    const result = await prisma.$transaction((tx) => applyExactProductEvidence(
      tx,
      STORE_ID,
      product.id,
      product,
      {
        source: 'integration_scan',
        now: new Date('2026-08-04T03:00:00.000Z'),
        freshnessMode: 'coverage',
      },
    ));
    const after = await prisma.productSnapshot.findUniqueOrThrow({
      where: { storeId_productId: { storeId: STORE_ID, productId: product.id } },
    });

    expect(result.changedSnapshots).toBe(0);
    expect(result.createdSnapshots).toBe(0);
    expect(after.updatedAt.getTime()).toBe(before.updatedAt.getTime());
    expect(after.lastVerifiedAt?.getTime()).toBe(before.lastVerifiedAt?.getTime());
  });

  it('enforces a single global nonterminal reconciliation sweep', async () => {
    const first = await prisma.productReconciliationSweep.create({
      data: { scheduleSlot: '2099-01-01', status: 'pending', phase: 'discover' },
    });

    await expect(prisma.productReconciliationSweep.create({
      data: { scheduleSlot: '2099-01-02', status: 'pending', phase: 'discover' },
    })).rejects.toMatchObject({ code: 'P2002' });

    await prisma.productReconciliationSweep.update({
      where: { id: first.id },
      data: { status: 'completed', phase: 'complete', finishedAt: new Date() },
    });
    await expect(prisma.productReconciliationSweep.create({
      data: { scheduleSlot: '2099-01-02', status: 'pending', phase: 'discover' },
    })).resolves.toMatchObject({ scheduleSlot: '2099-01-02' });
  });
});
