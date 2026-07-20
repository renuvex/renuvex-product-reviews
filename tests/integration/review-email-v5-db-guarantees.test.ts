import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import { runReviewEmailRetentionPurge } from '@/lib/review-email/retention';
import { closeAndReverseReceiptAnalytics } from '@/lib/review-email/analytics';
import {
  createOrResumeReviewEmailDataSubjectRun,
  executeReviewEmailDataSubjectErasure,
  replayReviewEmailDataSubjectJournalIntent,
} from '@/lib/review-email/data-subject';
import type { ReviewEmailErasureJournalPayload, VerifiedJournalEvidence } from '@/lib/review-email/journal';
import { hashEmail, hashFoldedEmail } from '@/lib/review-email/pii';
import { applyReviewEmailUnsubscribe, prepareReviewEmailUnsubscribeToken } from '@/lib/review-email/unsubscribe';

const integrationDatabaseUrl = process.env.REVIEW_EMAIL_INTEGRATION_DATABASE_URL;
const integrationDescribe = integrationDatabaseUrl ? describe : describe.skip;
const STORE_ID = 'review-email-v5-db-guarantees';
const AUTHORIZED_APP_ID = 'review-email-v5-app';
const TOKEN_KEY_RING = {
  currentVersion: 1,
  keys: new Map([[1, 'integration-unsubscribe-secret-at-least-32-characters']]),
};
const PII_KEY_RING = {
  currentVersion: 2,
  keys: new Map([
    [1, { hashSecret: 'integration-pii-hash-secret-v1-at-least-32-characters', encryptionKey: Buffer.alloc(32, 1) }],
    [2, { hashSecret: 'integration-pii-hash-secret-v2-at-least-32-characters', encryptionKey: Buffer.alloc(32, 2) }],
  ]),
};

async function cleanup() {
  await prisma.review.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewEmailMetricContribution.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewEmailDailyMetric.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewEmailUnsubscribeToken.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewEmailEvent.deleteMany({ where: { attempt: { job: { storeId: STORE_ID } } } });
  await prisma.reviewRequest.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewEmailBatch.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.ikasOrderSnapshot.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewEmailDataSubjectRun.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewEmailSubjectBlock.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewEmailSuppression.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewRequestReceipt.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.ikasStoreInstallation.deleteMany({ where: { storeId: STORE_ID } });
}

async function createOrderRequest(input: {
  suffix: string;
  orderId?: string;
  orderSnapshotId?: string;
  orderEmailHash: string;
  requestEmailHash: string;
}) {
  const order = input.orderSnapshotId
    ? await prisma.ikasOrderSnapshot.findUniqueOrThrow({ where: { id: input.orderSnapshotId } })
    : await prisma.ikasOrderSnapshot.create({
        data: {
          storeId: STORE_ID,
          authorizedAppId: 'app-1',
          ikasOrderId: input.orderId ?? `order-${input.suffix}`,
          shippingMethod: 'CARGO',
          orderStatus: 'FULFILLED',
          orderPackageStatus: 'DELIVERED',
          notificationsAccepted: true,
          guestCheckout: true,
          customerId: `customer-${input.suffix}`,
          customerEmailHash: input.orderEmailHash,
          customerEmailFoldedHash: `folded-${input.orderEmailHash}`,
          customerEmailHashKeyVersion: 1,
          customerEmailEncrypted: `encrypted-${input.orderEmailHash}`,
        },
      });
  const line = await prisma.ikasOrderLineSnapshot.create({
    data: {
      storeId: STORE_ID,
      orderSnapshotId: order.id,
      ikasOrderId: order.ikasOrderId,
      ikasOrderLineItemId: `line-${input.suffix}`,
      productId: `product-${input.suffix}`,
      lineStatus: 'DELIVERED',
      eligibleAt: new Date('2026-07-01T00:00:00.000Z'),
    },
  });
  const receipt = await prisma.reviewRequestReceipt.create({
    data: {
      storeId: STORE_ID,
      installationGeneration: 1,
      orderProductFingerprint: `op1:1:${input.suffix}`,
      fingerprintKeyVersion: 1,
      exactSubjectHash: input.requestEmailHash,
      exactSubjectKeyVersion: 1,
      normalizationVersion: 2,
    },
  });
  const request = await prisma.reviewRequest.create({
    data: {
      storeId: STORE_ID,
      productId: line.productId,
      orderSnapshotId: order.id,
      orderLineSnapshotId: line.id,
      receiptId: receipt.id,
      status: 'scheduled',
      recipientEmailHash: input.requestEmailHash,
      recipientEmailFoldedHash: `folded-${input.requestEmailHash}`,
      recipientEmailHashKeyVersion: 1,
    },
  });
  return { order, line, receipt, request };
}

function subjectInventory(input: {
  batchIds?: string[];
  unsubscribeTokenIds?: string[];
  receiptIds: string[];
  requestIds: string[];
  directOrderSnapshotIds: string[];
  linkedOrderSnapshotIds: string[];
  exactSubjectHash: string;
}) {
  return {
    batchIds: input.batchIds ?? [],
    unsubscribeTokenIds: input.unsubscribeTokenIds ?? [],
    receiptIds: input.receiptIds,
    requestIds: input.requestIds,
    directOrderSnapshotIds: input.directOrderSnapshotIds,
    linkedOrderSnapshotIds: input.linkedOrderSnapshotIds,
    reviewIds: [],
    exactSubjectLookupHashes: [input.exactSubjectHash],
    foldedSubjectLookupHashes: [`folded-${input.exactSubjectHash}`],
    opaqueResourceIds: [
      ...(input.batchIds ?? []).map((id) => `batch:${id}`),
      ...(input.unsubscribeTokenIds ?? []).map((id) => `unsubscribe-token:${id}`),
      ...input.receiptIds.map((id) => `receipt:${id}`),
      ...input.requestIds.map((id) => `request:${id}`),
      ...input.directOrderSnapshotIds.map((id) => `order-direct:${id}`),
      ...input.linkedOrderSnapshotIds.map((id) => `order-linked:${id}`),
    ].sort(),
    rowCounts: {
      batches: input.batchIds?.length ?? 0,
      unsubscribeTokens: input.unsubscribeTokenIds?.length ?? 0,
      receipts: input.receiptIds.length,
      requests: input.requestIds.length,
      orderSnapshots: new Set([...input.directOrderSnapshotIds, ...input.linkedOrderSnapshotIds]).size,
      directOrderSnapshots: input.directOrderSnapshotIds.length,
      linkedOrderSnapshots: input.linkedOrderSnapshotIds.length,
      reviews: 0,
    },
  };
}

type SubjectInventoryFixture = ReturnType<typeof subjectInventory>;
type LegacySubjectInventoryFixture = Omit<SubjectInventoryFixture, 'unsubscribeTokenIds'>;

async function createVerifiedDsrRun(input: {
  runId: string;
  exactSubjectHash: string;
  inventory: SubjectInventoryFixture | LegacySubjectInventoryFixture;
}) {
  const now = new Date('2026-07-10T12:00:00.000Z');
  return prisma.reviewEmailDataSubjectRun.create({
    data: {
      id: input.runId,
      storeId: STORE_ID,
      installationGeneration: 1,
      action: 'erase',
      normalizationVersion: 2,
      exactSubjectHash: input.exactSubjectHash,
      exactSubjectKeyVersion: 1,
      foldedSubjectHash: `folded-${input.exactSubjectHash}`,
      foldedSubjectKeyVersion: 1,
      idempotencyKeyHash: `idempotency-${input.runId}`,
      requestDigest: `digest-${input.runId}`,
      status: 'journal_pending',
      journalStatus: 'verified',
      journalRetentionBaseAt: now,
      progress: { phase: 'inventory_complete', inventory: input.inventory },
      rowCounts: input.inventory.rowCounts,
      startedAt: now,
      createdAt: now,
    },
  });
}

async function waitForBlockedQuery(tableName: string): Promise<void> {
  const deadline = Date.now() + 5_000;
  while (Date.now() < deadline) {
    const rows = await prisma.$queryRaw<Array<{ blocked: boolean }>>`
      SELECT EXISTS (
        SELECT 1
        FROM pg_stat_activity
        WHERE pid <> pg_backend_pid()
          AND wait_event_type = 'Lock'
          AND query LIKE ${`%${tableName}%`}
      ) AS "blocked"
    `;
    if (rows[0]?.blocked) return;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error(`expected blocked PostgreSQL query for ${tableName}`);
}

integrationDescribe('review email V5 database guarantees (PostgreSQL)', () => {
  beforeAll(async () => {
    const parsed = new URL(integrationDatabaseUrl!);
    if (!['127.0.0.1', 'localhost'].includes(parsed.hostname)) {
      throw new Error('Review email integration tests require a local disposable PostgreSQL database');
    }
    process.env.REVIEW_EMAIL_PII_CURRENT_KEY_VERSION = '2';
    process.env.REVIEW_REQUEST_PUBLIC_BASE_URL = 'https://reviews.renuvex.app';
    process.env.REVIEW_EMAIL_PII_KEYS_JSON = JSON.stringify({
      1: {
        hashSecret: 'integration-pii-hash-secret-v1-at-least-32-characters',
        encryptionKeyB64: Buffer.alloc(32, 1).toString('base64'),
      },
      2: {
        hashSecret: 'integration-pii-hash-secret-v2-at-least-32-characters',
        encryptionKeyB64: Buffer.alloc(32, 2).toString('base64'),
      },
    });
    await cleanup();
    await prisma.ikasStoreInstallation.create({
      data: {
        storeId: STORE_ID,
        authorizedAppId: AUTHORIZED_APP_ID,
        generation: 1,
        status: 'active',
      },
    });
  });

  afterAll(async () => {
    await cleanup();
    delete process.env.REVIEW_EMAIL_PII_CURRENT_KEY_VERSION;
    delete process.env.REVIEW_EMAIL_PII_KEYS_JSON;
    delete process.env.REVIEW_REQUEST_PUBLIC_BASE_URL;
    await prisma.$disconnect();
  });

  it('allows only one DSR run for storeId plus idempotencyKeyHash', async () => {
    const create = () => prisma.reviewEmailDataSubjectRun.create({
      data: {
        storeId: STORE_ID,
        installationGeneration: 1,
        idempotencyKeyHash: 'a'.repeat(64),
        requestDigest: 'b'.repeat(64),
      },
    });
    const results = await Promise.allSettled([create(), create()]);
    expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    expect(await prisma.reviewEmailDataSubjectRun.count({
      where: { storeId: STORE_ID, idempotencyKeyHash: 'a'.repeat(64) },
    })).toBe(1);
  });

  it('allows only one receipt per installation order-product fingerprint', async () => {
    const create = () => prisma.reviewRequestReceipt.create({
      data: {
        storeId: STORE_ID,
        installationGeneration: 1,
        orderProductFingerprint: 'op1:1:duplicate-fingerprint',
        fingerprintKeyVersion: 1,
      },
    });
    const results = await Promise.allSettled([create(), create()]);
    expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    expect(await prisma.reviewRequestReceipt.count({
      where: { storeId: STORE_ID, orderProductFingerprint: 'op1:1:duplicate-fingerprint' },
    })).toBe(1);
  });

  it('allows only one review to consume a review request receipt', async () => {
    const receipt = await prisma.reviewRequestReceipt.create({
      data: {
        storeId: STORE_ID,
        installationGeneration: 1,
        orderProductFingerprint: 'op1:1:review-consumption',
        fingerprintKeyVersion: 1,
      },
    });
    const create = (suffix: string) => prisma.review.create({
      data: {
        storeId: STORE_ID,
        productId: 'product-1',
        rating: 5,
        author: 'Verified buyer',
        status: 'pending',
        slug: `product-${suffix}`,
        reviewRequestReceiptId: receipt.id,
        verifiedBuyer: true,
      },
    });
    const results = await Promise.allSettled([create('a'), create('b')]);
    expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    expect(await prisma.review.count({ where: { reviewRequestReceiptId: receipt.id } })).toBe(1);
  });

  it('executes the bounded retention scan with PostgreSQL status filters', async () => {
    const result = await runReviewEmailRetentionPurge(prisma, {
      mode: 'report',
      now: new Date('2026-07-10T12:00:00.000Z'),
    });

    expect(result.mode).toBe('report');
    expect(result.batches).toBe(1);
    expect(await prisma.reviewEmailPurgeRun.findUnique({
      where: { id: result.runId },
      select: { status: true },
    })).toEqual({ status: 'succeeded' });

    await prisma.reviewEmailPurgeRun.delete({ where: { id: result.runId } });
  });

  it('accepts frozen DSR progress written before unsubscribe token IDs were added', async () => {
    const currentInventory = subjectInventory({
      receiptIds: [],
      requestIds: [],
      directOrderSnapshotIds: [],
      linkedOrderSnapshotIds: [],
      exactSubjectHash: 'exact-legacy-progress',
    });
    const { unsubscribeTokenIds, ...legacyInventory } = currentInventory;
    expect(unsubscribeTokenIds).toEqual([]);
    const runId = '10000000-0000-4000-8000-000000000008';
    await createVerifiedDsrRun({
      runId,
      exactSubjectHash: 'exact-legacy-progress',
      inventory: legacyInventory,
    });

    await executeReviewEmailDataSubjectErasure(runId, {
      now: new Date('2026-07-10T12:00:00.000Z'),
    });

    expect(await prisma.reviewEmailDataSubjectRun.findUnique({
      where: { id: runId },
      select: { status: true },
    })).toEqual({ status: 'succeeded' });
  });

  it('reverses retained manifest analytics after the contribution row has expired', async () => {
    const metricDate = new Date('2026-01-01T00:00:00.000Z');
    const receipt = await prisma.reviewRequestReceipt.create({
      data: {
        storeId: STORE_ID,
        installationGeneration: 1,
        orderProductFingerprint: 'op1:1:manifest-authority',
        fingerprintKeyVersion: 1,
        analyticsManifest: [{
          dedupeKey: 'expired-contribution', metricDate: metricDate.toISOString(), kind: 'request',
          templateVersion: 'default_v1', locale: 'tr', metric: 'delivered', delta: 1,
        }],
        analyticsClosedAt: new Date('2026-01-02T00:00:00.000Z'),
        analyticsCloseReason: 'detail_retention',
      },
    });
    await prisma.reviewEmailDailyMetric.create({
      data: {
        storeId: STORE_ID, installationGeneration: 1, metricDate, kind: 'request',
        templateVersion: 'default_v1', locale: 'tr', delivered: 1,
      },
    });

    await prisma.$transaction((tx) => closeAndReverseReceiptAnalytics(tx, receipt.id, {
      now: new Date('2026-07-10T12:00:00.000Z'),
      reason: 'subject_erasure',
    }));

    expect(await prisma.reviewEmailDailyMetric.findFirst({ where: { storeId: STORE_ID }, select: { delivered: true } })).toEqual({ delivered: 0 });
    expect(await prisma.reviewRequestReceipt.findUnique({
      where: { id: receipt.id },
      select: { analyticsCloseReason: true, metricsReversedAt: true, analyticsManifest: true },
    })).toMatchObject({ analyticsCloseReason: 'subject_erasure', analyticsManifest: null, metricsReversedAt: expect.any(Date) });
  });

  it('rejects parent order and line deletion while a review request is alive', async () => {
    const family = await createOrderRequest({
      suffix: 'restrict-parent-delete',
      orderEmailHash: 'exact-subject-a',
      requestEmailHash: 'exact-subject-a',
    });

    await expect(prisma.ikasOrderSnapshot.delete({ where: { id: family.order.id } })).rejects.toMatchObject({ code: 'P2003' });
    await expect(prisma.ikasOrderLineSnapshot.delete({ where: { id: family.line.id } })).rejects.toMatchObject({ code: 'P2003' });
    expect(await prisma.reviewRequest.findUnique({ where: { id: family.request.id } })).not.toBeNull();
  });

  it('scrubs direct-subject PII without deleting another subject request on a shared order', async () => {
    const subjectA = await createOrderRequest({
      suffix: 'shared-a',
      orderId: 'shared-order',
      orderEmailHash: 'exact-subject-a',
      requestEmailHash: 'exact-subject-a',
    });
    const subjectB = await createOrderRequest({
      suffix: 'shared-b',
      orderSnapshotId: subjectA.order.id,
      orderEmailHash: 'exact-subject-a',
      requestEmailHash: 'exact-subject-b',
    });
    const inventory = subjectInventory({
      receiptIds: [subjectA.receipt.id],
      requestIds: [subjectA.request.id],
      directOrderSnapshotIds: [subjectA.order.id],
      linkedOrderSnapshotIds: [subjectA.order.id],
      exactSubjectHash: 'exact-subject-a',
    });
    await createVerifiedDsrRun({
      runId: '10000000-0000-4000-8000-000000000001',
      exactSubjectHash: 'exact-subject-a',
      inventory,
    });

    const result = await executeReviewEmailDataSubjectErasure('10000000-0000-4000-8000-000000000001', {
      now: new Date('2026-07-10T12:00:00.000Z'),
    });

    expect(await prisma.reviewRequest.findUnique({ where: { id: subjectA.request.id } })).toBeNull();
    expect(await prisma.reviewRequest.findUnique({ where: { id: subjectB.request.id } })).not.toBeNull();
    expect(await prisma.reviewRequestReceipt.findUnique({ where: { id: subjectB.receipt.id } })).not.toBeNull();
    expect(await prisma.ikasOrderSnapshot.findUnique({
      where: { id: subjectA.order.id },
      select: {
        customerId: true,
        customerEmailHash: true,
        customerEmailFoldedHash: true,
        customerEmailHashKeyVersion: true,
        customerEmailEncrypted: true,
      },
    })).toEqual({
      customerId: null,
      customerEmailHash: null,
      customerEmailFoldedHash: null,
      customerEmailHashKeyVersion: null,
      customerEmailEncrypted: null,
    });
    expect(result.rowCounts).toMatchObject({
      matchedRequests: 1,
      deletedOrderSnapshots: 0,
      scrubbedSharedOrderSnapshots: 1,
      preservedChangedSubjectOrderSnapshots: 0,
    });
  });

  it('deletes the direct order family after the final matched request is removed', async () => {
    const family = await createOrderRequest({
      suffix: 'final-request',
      orderEmailHash: 'exact-final-subject',
      requestEmailHash: 'exact-final-subject',
    });
    const inventory = subjectInventory({
      receiptIds: [family.receipt.id],
      requestIds: [family.request.id],
      directOrderSnapshotIds: [family.order.id],
      linkedOrderSnapshotIds: [family.order.id],
      exactSubjectHash: 'exact-final-subject',
    });
    await createVerifiedDsrRun({
      runId: '10000000-0000-4000-8000-000000000002',
      exactSubjectHash: 'exact-final-subject',
      inventory,
    });

    const result = await executeReviewEmailDataSubjectErasure('10000000-0000-4000-8000-000000000002', {
      now: new Date('2026-07-10T12:00:00.000Z'),
    });

    expect(await prisma.ikasOrderSnapshot.findUnique({ where: { id: family.order.id } })).toBeNull();
    expect(await prisma.ikasOrderLineSnapshot.findUnique({ where: { id: family.line.id } })).toBeNull();
    expect(result.rowCounts).toMatchObject({ deletedOrderSnapshots: 1, scrubbedSharedOrderSnapshots: 0 });
  });

  it('scrubs provider evidence and deletes every attempt-bound unsubscribe token during DSR', async () => {
    const family = await createOrderRequest({
      suffix: 'batch-evidence',
      orderEmailHash: 'exact-batch-evidence',
      requestEmailHash: 'exact-batch-evidence',
    });
    const batch = await prisma.reviewEmailBatch.create({
      data: {
        storeId: STORE_ID,
        installationGeneration: 1,
        orderSnapshotId: family.order.id,
        deliveryGroupKey: 'order:order-batch-evidence:complete',
        deliveryGroupMode: 'order_complete',
        batchFingerprint: 'batch-fingerprint-evidence',
        fingerprintKeyVersion: 1,
        recipientEmailHash: 'exact-batch-evidence',
        recipientEmailFoldedHash: 'folded-exact-batch-evidence',
        recipientEmailHashKeyVersion: 1,
        recipientEmailEncrypted: 'encrypted-exact-batch-evidence',
      },
    });
    await prisma.reviewRequest.update({
      where: { id: family.request.id },
      data: { batchId: batch.id, batchPosition: 0 },
    });
    const job = await prisma.reviewEmailJob.create({
      data: {
        batchId: batch.id,
        storeId: STORE_ID,
        kind: 'request',
        sendAfter: new Date('2026-07-02T00:00:00.000Z'),
        dedupeKey: 'batch-evidence-request',
      },
    });
    const attempt = await prisma.reviewEmailAttempt.create({
      data: {
        jobId: job.id,
        attemptNumber: 1,
        correlationId: 'batch-evidence-correlation',
        providerMessageId: 'provider-message-batch-evidence',
        providerMessageIdHash: 'provider-message-hash-batch-evidence',
        providerMessageIdHashKeyVersion: 1,
        recipientEmailHash: 'exact-batch-evidence',
        recipientEmailFoldedHash: 'folded-exact-batch-evidence',
        recipientEmailHashKeyVersion: 1,
        recipientEmailEncrypted: 'encrypted-exact-batch-evidence',
        consentSource: 'ikas_list_customer',
        consentStatus: 'SUBSCRIBED',
        consentStatusUpdatedAt: new Date('2026-07-02T09:59:00.000Z'),
        consentCheckedAt: new Date('2026-07-02T10:00:00.000Z'),
      },
    });
    await prisma.reviewEmailUnsubscribeToken.create({
      data: {
        storeId: STORE_ID,
        recipientFoldedHash: 'folded-exact-batch-evidence',
        recipientExactHash: 'h2e:1:exact-batch-evidence',
        recipientExactHashKeyVersion: 1,
        recipientEmailNormalizationVersion: 2,
        tokenHash: 'c'.repeat(64),
        createdFromAttemptId: attempt.id,
        status: 'used',
        usedAt: new Date('2026-07-03T00:00:00.000Z'),
      },
    });
    const event = await prisma.reviewEmailEvent.create({
      data: {
        transport: 'sns',
        transportEventId: 'batch-evidence-event',
        providerMessageId: 'provider-message-batch-evidence',
        providerMessageIdHash: 'provider-message-hash-batch-evidence',
        providerMessageIdHashKeyVersion: 1,
        eventType: 'DELIVERY',
        attemptId: attempt.id,
      },
    });
    const inventory = subjectInventory({
      batchIds: [batch.id],
      receiptIds: [family.receipt.id],
      requestIds: [family.request.id],
      directOrderSnapshotIds: [family.order.id],
      linkedOrderSnapshotIds: [family.order.id],
      exactSubjectHash: 'exact-batch-evidence',
    });
    const runId = '10000000-0000-4000-8000-000000000006';
    await createVerifiedDsrRun({ runId, exactSubjectHash: 'exact-batch-evidence', inventory });

    await executeReviewEmailDataSubjectErasure(runId, {
      now: new Date('2026-07-10T12:00:00.000Z'),
    });

    expect(await prisma.reviewEmailUnsubscribeToken.findUnique({
      where: { tokenHash: 'c'.repeat(64) },
    })).toBeNull();
    expect(await prisma.reviewEmailAttempt.findUnique({
      where: { id: attempt.id },
      select: {
        providerMessageId: true,
        providerMessageIdHash: true,
        recipientEmailHash: true,
        recipientEmailFoldedHash: true,
        recipientEmailEncrypted: true,
        consentSource: true,
        consentStatus: true,
        consentStatusUpdatedAt: true,
        consentCheckedAt: true,
        analyticsClosedAt: true,
        piiScrubbedAt: true,
      },
    })).toMatchObject({
      providerMessageId: null,
      providerMessageIdHash: 'provider-message-hash-batch-evidence',
      recipientEmailHash: null,
      recipientEmailFoldedHash: null,
      recipientEmailEncrypted: null,
      consentSource: null,
      consentStatus: null,
      consentStatusUpdatedAt: null,
      consentCheckedAt: null,
      analyticsClosedAt: expect.any(Date),
      piiScrubbedAt: expect.any(Date),
    });
    expect(await prisma.reviewEmailEvent.findUnique({
      where: { id: event.id },
      select: { providerMessageId: true, providerMessageIdHash: true, attemptId: true },
    })).toEqual({
      providerMessageId: null,
      providerMessageIdHash: 'provider-message-hash-batch-evidence',
      attemptId: attempt.id,
    });
  });

  it('uses exact HMAC candidates instead of a folded collision when freezing unsubscribe tokens for DSR', async () => {
    const exactEmailA = 'CaseCollision@example.com';
    const exactEmailB = 'casecollision@example.com';
    const exactHashA = hashEmail(exactEmailA, PII_KEY_RING, 1);
    const exactHashB = hashEmail(exactEmailB, PII_KEY_RING, 1);
    const foldedHashA = hashFoldedEmail(exactEmailA, PII_KEY_RING, 1);
    const foldedHashB = hashFoldedEmail(exactEmailB, PII_KEY_RING, 1);
    expect(exactHashA).not.toBe(exactHashB);
    expect(foldedHashA).toBe(foldedHashB);

    const [tokenA, tokenB] = await Promise.all([
      prisma.reviewEmailUnsubscribeToken.create({
        data: {
          storeId: STORE_ID,
          recipientFoldedHash: foldedHashA,
          recipientExactHash: exactHashA,
          recipientExactHashKeyVersion: 1,
          recipientEmailNormalizationVersion: 2,
          tokenHash: 'd'.repeat(64),
          tokenKeyVersion: 1,
          status: 'active',
        },
      }),
      prisma.reviewEmailUnsubscribeToken.create({
        data: {
          storeId: STORE_ID,
          recipientFoldedHash: foldedHashB,
          recipientExactHash: exactHashB,
          recipientExactHashKeyVersion: 1,
          recipientEmailNormalizationVersion: 2,
          tokenHash: 'e'.repeat(64),
          tokenKeyVersion: 1,
          status: 'used',
        },
      }),
    ]);

    const created = await createOrResumeReviewEmailDataSubjectRun(prisma, {
      storeId: STORE_ID,
      authorizedAppId: AUTHORIZED_APP_ID,
      idempotencyKey: '20000000-0000-4000-8000-000000000001',
      email: exactEmailA,
      now: new Date('2026-07-10T12:00:00.000Z'),
    });
    const progress = created.run.progress as {
      inventory: { unsubscribeTokenIds: string[]; opaqueResourceIds: string[] };
    };
    expect(progress.inventory.unsubscribeTokenIds).toEqual([tokenA.id]);
    expect(progress.inventory.opaqueResourceIds).toContain(`unsubscribe-token:${tokenA.id}`);
    expect(progress.inventory.opaqueResourceIds).not.toContain(`unsubscribe-token:${tokenB.id}`);

    await prisma.reviewEmailDataSubjectRun.update({
      where: { id: created.run.id },
      data: { journalStatus: 'verified' },
    });
    await executeReviewEmailDataSubjectErasure(created.run.id, {
      now: new Date('2026-07-10T12:01:00.000Z'),
    });

    expect(await prisma.reviewEmailUnsubscribeToken.findUnique({ where: { id: tokenA.id } })).toBeNull();
    expect(await prisma.reviewEmailUnsubscribeToken.findUnique({ where: { id: tokenB.id } })).not.toBeNull();
  });

  it('keeps exact identity through attempt purge, old-link unsubscribe, and later DSR', async () => {
    const exactEmailA = 'DetachedCase@example.com';
    const exactEmailB = 'detachedcase@example.com';
    const exactHashA = hashEmail(exactEmailA, PII_KEY_RING, 1);
    const exactHashB = hashEmail(exactEmailB, PII_KEY_RING, 1);
    const foldedHash = hashFoldedEmail(exactEmailA, PII_KEY_RING, 1);
    expect(foldedHash).toBe(hashFoldedEmail(exactEmailB, PII_KEY_RING, 1));

    const oldDate = new Date('2025-01-01T00:00:00.000Z');
    const batch = await prisma.reviewEmailBatch.create({
      data: {
        storeId: STORE_ID,
        installationGeneration: 1,
        deliveryGroupKey: 'order:detached-unsubscribe:complete',
        deliveryGroupMode: 'order_complete',
        batchFingerprint: 'batch-fingerprint-detached-unsubscribe',
        fingerprintKeyVersion: 1,
        status: 'completed',
        completedAt: oldDate,
        analyticsClosedAt: oldDate,
        analyticsCloseReason: 'detail_retention',
        piiScrubbedAt: oldDate,
        detailPurgedAt: oldDate,
      },
    });
    const job = await prisma.reviewEmailJob.create({
      data: {
        batchId: batch.id,
        storeId: STORE_ID,
        kind: 'request',
        status: 'sent',
        sendAfter: oldDate,
        completedAt: oldDate,
        dedupeKey: 'detached-unsubscribe-request',
      },
    });
    const attempt = await prisma.reviewEmailAttempt.create({
      data: {
        jobId: job.id,
        attemptNumber: 1,
        correlationId: 'detached-unsubscribe-correlation',
        status: 'accepted',
        acceptedAt: oldDate,
      },
    });
    const prepared = await prisma.$transaction((tx) => prepareReviewEmailUnsubscribeToken(tx, {
      storeId: STORE_ID,
      recipientFoldedHash: foldedHash,
      recipientExactHash: exactHashA,
      recipientExactHashKeyVersion: 1,
      recipientEmailNormalizationVersion: 2,
      attemptId: attempt.id,
      keyRing: TOKEN_KEY_RING,
    }));
    const detachedToken = await prisma.reviewEmailUnsubscribeToken.findUniqueOrThrow({
      where: { createdFromAttemptId: attempt.id },
    });
    const controlToken = await prisma.reviewEmailUnsubscribeToken.create({
      data: {
        storeId: STORE_ID,
        recipientFoldedHash: foldedHash,
        recipientExactHash: exactHashB,
        recipientExactHashKeyVersion: 1,
        recipientEmailNormalizationVersion: 2,
        tokenHash: 'f'.repeat(64),
        tokenKeyVersion: 1,
        status: 'active',
      },
    });

    const purge = await runReviewEmailRetentionPurge(prisma, {
      mode: 'enforce',
      now: new Date('2026-07-10T12:00:00.000Z'),
    });
    expect(purge.deleted.batchTransportFamilies).toBeGreaterThanOrEqual(1);
    expect(await prisma.reviewEmailAttempt.findUnique({ where: { id: attempt.id } })).toBeNull();
    expect(await prisma.reviewEmailUnsubscribeToken.findUnique({
      where: { id: detachedToken.id },
      select: { createdFromAttemptId: true, recipientExactHash: true },
    })).toEqual({ createdFromAttemptId: null, recipientExactHash: exactHashA });

    await prisma.$transaction((tx) => applyReviewEmailUnsubscribe(tx, prepared.rawToken, {
      now: new Date('2026-07-10T12:02:00.000Z'),
      keyRing: TOKEN_KEY_RING,
    }));
    expect(await prisma.reviewEmailSuppression.findUnique({
      where: {
        storeId_emailHash_reason: {
          storeId: STORE_ID,
          emailHash: foldedHash,
          reason: 'unsubscribe',
        },
      },
      select: { recipientExactHash: true, recipientEmailEncrypted: true },
    })).toEqual({ recipientExactHash: exactHashA, recipientEmailEncrypted: null });

    const created = await createOrResumeReviewEmailDataSubjectRun(prisma, {
      storeId: STORE_ID,
      authorizedAppId: AUTHORIZED_APP_ID,
      idempotencyKey: '20000000-0000-4000-8000-000000000002',
      email: exactEmailA,
      now: new Date('2026-07-10T12:03:00.000Z'),
    });
    const progress = created.run.progress as { inventory: { unsubscribeTokenIds: string[] } };
    expect(progress.inventory.unsubscribeTokenIds).toContain(detachedToken.id);
    expect(progress.inventory.unsubscribeTokenIds).not.toContain(controlToken.id);
    await prisma.reviewEmailDataSubjectRun.update({
      where: { id: created.run.id },
      data: { journalStatus: 'verified' },
    });
    await executeReviewEmailDataSubjectErasure(created.run.id, {
      now: new Date('2026-07-10T12:04:00.000Z'),
    });

    expect(await prisma.reviewEmailUnsubscribeToken.findUnique({ where: { id: detachedToken.id } })).toBeNull();
    expect(await prisma.reviewEmailUnsubscribeToken.findUnique({ where: { id: controlToken.id } })).not.toBeNull();
    expect(await prisma.reviewEmailSuppression.findFirst({
      where: { storeId: STORE_ID, recipientExactHash: exactHashA },
    })).toBeNull();
    await prisma.reviewEmailPurgeRun.delete({ where: { id: purge.runId } });
  });

  it('preserves an order whose current exact subject changed after inventory was frozen', async () => {
    const family = await createOrderRequest({
      suffix: 'changed-subject',
      orderEmailHash: 'exact-old-subject',
      requestEmailHash: 'exact-old-subject',
    });
    const inventory = subjectInventory({
      receiptIds: [family.receipt.id],
      requestIds: [family.request.id],
      directOrderSnapshotIds: [family.order.id],
      linkedOrderSnapshotIds: [family.order.id],
      exactSubjectHash: 'exact-old-subject',
    });
    await prisma.ikasOrderSnapshot.update({
      where: { id: family.order.id },
      data: {
        customerEmailHash: 'exact-new-subject',
        customerEmailFoldedHash: 'folded-exact-new-subject',
        customerEmailEncrypted: 'encrypted-exact-new-subject',
      },
    });
    await createVerifiedDsrRun({
      runId: '10000000-0000-4000-8000-000000000003',
      exactSubjectHash: 'exact-old-subject',
      inventory,
    });

    const result = await executeReviewEmailDataSubjectErasure('10000000-0000-4000-8000-000000000003', {
      now: new Date('2026-07-10T12:00:00.000Z'),
    });

    expect(await prisma.ikasOrderSnapshot.findUnique({
      where: { id: family.order.id },
      select: { customerEmailHash: true, customerEmailEncrypted: true },
    })).toEqual({
      customerEmailHash: 'exact-new-subject',
      customerEmailEncrypted: 'encrypted-exact-new-subject',
    });
    expect(result.rowCounts).toMatchObject({
      deletedOrderSnapshots: 0,
      scrubbedSharedOrderSnapshots: 0,
      preservedChangedSubjectOrderSnapshots: 1,
    });
  });

  it('serializes DSR against a different-subject reconciliation without losing the new request', async () => {
    const subjectA = await createOrderRequest({
      suffix: 'race-a',
      orderId: 'race-order',
      orderEmailHash: 'exact-race-a',
      requestEmailHash: 'exact-race-a',
    });
    const inventory = subjectInventory({
      receiptIds: [subjectA.receipt.id],
      requestIds: [subjectA.request.id],
      directOrderSnapshotIds: [subjectA.order.id],
      linkedOrderSnapshotIds: [subjectA.order.id],
      exactSubjectHash: 'exact-race-a',
    });
    const runId = '10000000-0000-4000-8000-000000000005';
    await createVerifiedDsrRun({ runId, exactSubjectHash: 'exact-race-a', inventory });

    let releaseReceiptLock!: () => void;
    let receiptLockReady!: () => void;
    const release = new Promise<void>((resolve) => { releaseReceiptLock = resolve; });
    const ready = new Promise<void>((resolve) => { receiptLockReady = resolve; });
    const blocker = prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "ReviewRequestReceipt" WHERE "id" = ${subjectA.receipt.id} FOR UPDATE`;
      receiptLockReady();
      await release;
    }, { timeout: 15_000 });
    await ready;

    const dsr = executeReviewEmailDataSubjectErasure(runId, {
      now: new Date('2026-07-10T12:00:00.000Z'),
    });
    await waitForBlockedQuery('ReviewRequestReceipt');

    const reconciliation = prisma.$transaction(async (tx) => {
      const order = await tx.ikasOrderSnapshot.upsert({
        where: { storeId_ikasOrderId: { storeId: STORE_ID, ikasOrderId: 'race-order' } },
        create: {
          storeId: STORE_ID,
          authorizedAppId: 'app-1',
          ikasOrderId: 'race-order',
          shippingMethod: 'CARGO',
          orderStatus: 'FULFILLED',
          orderPackageStatus: 'DELIVERED',
          customerEmailHash: 'exact-race-b',
          customerEmailFoldedHash: 'folded-exact-race-b',
          customerEmailHashKeyVersion: 1,
        },
        update: {
          customerEmailHash: 'exact-race-b',
          customerEmailFoldedHash: 'folded-exact-race-b',
          customerEmailHashKeyVersion: 1,
        },
      });
      const line = await tx.ikasOrderLineSnapshot.create({
        data: {
          storeId: STORE_ID,
          orderSnapshotId: order.id,
          ikasOrderId: order.ikasOrderId,
          ikasOrderLineItemId: 'line-race-b',
          productId: 'product-race-b',
          lineStatus: 'DELIVERED',
        },
      });
      const receipt = await tx.reviewRequestReceipt.create({
        data: {
          storeId: STORE_ID,
          installationGeneration: 1,
          orderProductFingerprint: 'op1:1:race-b',
          fingerprintKeyVersion: 1,
          exactSubjectHash: 'exact-race-b',
          exactSubjectKeyVersion: 1,
          normalizationVersion: 2,
        },
      });
      return tx.reviewRequest.create({
        data: {
          storeId: STORE_ID,
          productId: line.productId,
          orderSnapshotId: order.id,
          orderLineSnapshotId: line.id,
          receiptId: receipt.id,
          recipientEmailHash: 'exact-race-b',
          recipientEmailFoldedHash: 'folded-exact-race-b',
          recipientEmailHashKeyVersion: 1,
        },
      });
    }, { timeout: 15_000 });
    await waitForBlockedQuery('IkasOrderSnapshot');
    releaseReceiptLock();

    await Promise.all([blocker, dsr, reconciliation]);

    expect(await prisma.reviewRequest.findUnique({ where: { id: subjectA.request.id } })).toBeNull();
    expect(await prisma.reviewRequest.findFirst({
      where: { storeId: STORE_ID, recipientEmailHash: 'exact-race-b' },
    })).not.toBeNull();
  });

  it('locks related attempts before analytics parents during DSR execution', async () => {
    const family = await createOrderRequest({
      suffix: 'attempt-lock-order',
      orderEmailHash: 'exact-attempt-lock',
      requestEmailHash: 'exact-attempt-lock',
    });
    const job = await prisma.reviewEmailJob.create({
      data: {
        requestId: family.request.id,
        storeId: STORE_ID,
        productId: family.request.productId,
        kind: 'request',
        sequence: 0,
        status: 'sent',
        sendAfter: new Date('2026-07-02T00:00:00.000Z'),
        dedupeKey: 'review-email-dsr-attempt-lock',
      },
    });
    const attempt = await prisma.reviewEmailAttempt.create({
      data: {
        jobId: job.id,
        attemptNumber: 1,
        correlationId: 'dsr-attempt-lock-correlation',
        status: 'accepted',
        recipientEmailHash: 'exact-attempt-lock',
        acceptedAt: new Date('2026-07-02T00:00:00.000Z'),
      },
    });
    const inventory = subjectInventory({
      receiptIds: [family.receipt.id],
      requestIds: [family.request.id],
      directOrderSnapshotIds: [family.order.id],
      linkedOrderSnapshotIds: [family.order.id],
      exactSubjectHash: 'exact-attempt-lock',
    });
    const runId = '10000000-0000-4000-8000-000000000007';
    await createVerifiedDsrRun({ runId, exactSubjectHash: 'exact-attempt-lock', inventory });

    let releaseReceiptLock!: () => void;
    let receiptLockReady!: () => void;
    const release = new Promise<void>((resolve) => { releaseReceiptLock = resolve; });
    const ready = new Promise<void>((resolve) => { receiptLockReady = resolve; });
    const blocker = prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "ReviewRequestReceipt" WHERE "id" = ${family.receipt.id} FOR UPDATE`;
      receiptLockReady();
      await release;
    }, { timeout: 15_000 });
    await ready;

    const dsr = executeReviewEmailDataSubjectErasure(runId, {
      now: new Date('2026-07-10T12:00:00.000Z'),
    });
    await waitForBlockedQuery('ReviewRequestReceipt');
    const attemptProbe = prisma.$transaction(async (tx) => tx.$queryRaw`
      SELECT "id" FROM "ReviewEmailAttempt" WHERE "id" = ${attempt.id} FOR UPDATE
    `, { timeout: 15_000 });
    await waitForBlockedQuery('ReviewEmailAttempt');

    releaseReceiptLock();
    await Promise.all([blocker, dsr, attemptProbe]);
    expect(await prisma.reviewEmailAttempt.findUnique({ where: { id: attempt.id } })).toBeNull();
  });

  it('uses the same conditional order-erasure helper during journal replay', async () => {
    const family = await createOrderRequest({
      suffix: 'journal-replay',
      orderEmailHash: 'exact-replay-subject',
      requestEmailHash: 'exact-replay-subject',
    });
    const unsubscribeToken = await prisma.reviewEmailUnsubscribeToken.create({
      data: {
        storeId: STORE_ID,
        recipientFoldedHash: 'folded-exact-replay-subject',
        recipientExactHash: 'h2e:1:exact-replay-subject',
        recipientExactHashKeyVersion: 1,
        recipientEmailNormalizationVersion: 2,
        tokenHash: 'g'.repeat(64),
        tokenKeyVersion: 1,
        status: 'used',
      },
    });
    const inventory = subjectInventory({
      unsubscribeTokenIds: [unsubscribeToken.id],
      receiptIds: [family.receipt.id],
      requestIds: [family.request.id],
      directOrderSnapshotIds: [family.order.id],
      linkedOrderSnapshotIds: [family.order.id],
      exactSubjectHash: 'exact-replay-subject',
    });
    const createdAt = new Date('2026-07-10T12:00:00.000Z');
    const runId = '10000000-0000-4000-8000-000000000004';
    const journalPayload: ReviewEmailErasureJournalPayload = {
      schemaVersion: 1,
      runId,
      storeId: STORE_ID,
      installationGeneration: 1,
      action: 'erase',
      exactHashKeyVersion: 1,
      foldedHashKeyVersion: 1,
      normalizationVersion: 2,
      foldedSubjectHash: 'folded-exact-replay-subject',
      exactSubjectLookupHashes: inventory.exactSubjectLookupHashes,
      foldedSubjectLookupHashes: inventory.foldedSubjectLookupHashes,
      opaqueResourceIds: inventory.opaqueResourceIds,
      rowCounts: inventory.rowCounts,
      actions: ['conditionally_erase_order_details', 'delete_unsubscribe_tokens'],
      createdAt: createdAt.toISOString(),
      retentionBaseAt: createdAt.toISOString(),
    };
    const evidence: VerifiedJournalEvidence = {
      key: `erasure-journal/v1/2026/07/10/${runId}.json`,
      payloadSha256: 'a'.repeat(64),
      versionId: 'version-1',
      etag: '"etag"',
      checksumSha256: 'checksum',
      objectLockRetainUntil: new Date('2026-08-21T12:00:00.000Z'),
    };

    await replayReviewEmailDataSubjectJournalIntent(journalPayload, evidence, createdAt);

    expect(await prisma.ikasOrderSnapshot.findUnique({ where: { id: family.order.id } })).toBeNull();
    expect(await prisma.reviewEmailUnsubscribeToken.findUnique({ where: { id: unsubscribeToken.id } })).toBeNull();
    expect(await prisma.reviewEmailDataSubjectRun.findUnique({
      where: { id: runId },
      select: { status: true, rowCounts: true },
    })).toMatchObject({ status: 'succeeded', rowCounts: { deletedOrderSnapshots: 1 } });
  });

  it('replays a legacy journal with no unsubscribe-token resource prefix', async () => {
    const createdAt = new Date('2026-07-10T12:00:00.000Z');
    const runId = '10000000-0000-4000-8000-000000000009';
    const journalPayload: ReviewEmailErasureJournalPayload = {
      schemaVersion: 1,
      runId,
      storeId: STORE_ID,
      installationGeneration: 1,
      action: 'erase',
      exactHashKeyVersion: 1,
      foldedHashKeyVersion: 1,
      normalizationVersion: 2,
      foldedSubjectHash: 'folded-legacy-journal',
      exactSubjectLookupHashes: ['exact-legacy-journal'],
      foldedSubjectLookupHashes: ['folded-legacy-journal'],
      opaqueResourceIds: [],
      rowCounts: {},
      actions: ['conditionally_erase_order_details'],
      createdAt: createdAt.toISOString(),
      retentionBaseAt: createdAt.toISOString(),
    };
    const evidence: VerifiedJournalEvidence = {
      key: `erasure-journal/v1/2026/07/10/${runId}.json`,
      payloadSha256: 'b'.repeat(64),
      versionId: 'version-legacy',
      etag: '"legacy-etag"',
      checksumSha256: 'legacy-checksum',
      objectLockRetainUntil: new Date('2026-08-21T12:00:00.000Z'),
    };

    await replayReviewEmailDataSubjectJournalIntent(journalPayload, evidence, createdAt);

    expect(await prisma.reviewEmailDataSubjectRun.findUnique({
      where: { id: runId },
      select: { status: true },
    })).toEqual({ status: 'succeeded' });
  });
});
