import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import { claimReviewCenterItemForSubmission } from '@/lib/review-email/tokens';

const integrationDatabaseUrl = process.env.REVIEW_EMAIL_INTEGRATION_DATABASE_URL;
const integrationDescribe = integrationDatabaseUrl ? describe : describe.skip;
const STORE_ID = 'review-email-batch-db-guarantees';

async function cleanup() {
  const jobs = await prisma.reviewEmailJob.findMany({
    where: { storeId: STORE_ID },
    select: { id: true },
  });
  const attemptIds = await prisma.reviewEmailAttempt.findMany({
    where: { jobId: { in: jobs.map((job) => job.id) } },
    select: { id: true },
  });
  await prisma.reviewEmailEvent.deleteMany({
    where: {
      OR: [
        { attemptId: { in: attemptIds.map((attempt) => attempt.id) } },
        { transportEventId: { startsWith: 'batch-db-' } },
      ],
    },
  });
  await prisma.reviewEmailUnsubscribeToken.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewRequestSession.deleteMany({ where: { batch: { storeId: STORE_ID } } });
  await prisma.reviewRequestToken.deleteMany({ where: { batch: { storeId: STORE_ID } } });
  await prisma.reviewEmailAttempt.deleteMany({ where: { job: { storeId: STORE_ID } } });
  await prisma.reviewEmailJob.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewEmailMetricContribution.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewRequest.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.reviewEmailBatch.deleteMany({ where: { storeId: STORE_ID } });
  await prisma.ikasOrderSnapshot.deleteMany({ where: { storeId: STORE_ID } });
}

async function createOrder(suffix: string) {
  return prisma.ikasOrderSnapshot.create({
    data: {
      storeId: STORE_ID,
      authorizedAppId: 'app-1',
      ikasOrderId: `order-${suffix}`,
      shippingMethod: 'CARGO',
      orderStatus: 'FULFILLED',
      orderPackageStatus: 'DELIVERED',
      notificationsAccepted: true,
      guestCheckout: true,
    },
  });
}

async function createBatch(suffix: string, overrides: Record<string, unknown> = {}) {
  const order = await createOrder(suffix);
  const batch = await prisma.reviewEmailBatch.create({
    data: {
      storeId: STORE_ID,
      installationGeneration: 1,
      orderSnapshotId: order.id,
      deliveryGroupKey: `package:${suffix}`,
      deliveryGroupMode: 'package',
      batchFingerprint: `rb1:1:${suffix}`,
      fingerprintKeyVersion: 1,
      ...overrides,
    },
  });
  return { order, batch };
}

async function createBatchRequest(suffix: string) {
  const { order, batch } = await createBatch(suffix);
  const line = await prisma.ikasOrderLineSnapshot.create({
    data: {
      storeId: STORE_ID,
      orderSnapshotId: order.id,
      ikasOrderId: order.ikasOrderId,
      ikasOrderLineItemId: `line-${suffix}`,
      productId: `product-${suffix}`,
      lineStatus: 'DELIVERED',
    },
  });
  const request = await prisma.reviewRequest.create({
    data: {
      storeId: STORE_ID,
      productId: line.productId,
      orderSnapshotId: order.id,
      orderLineSnapshotId: line.id,
      batchId: batch.id,
      status: 'scheduled',
    },
  });
  return { order, batch, line, request };
}

integrationDescribe('review email batch database guarantees (PostgreSQL)', () => {
  beforeAll(async () => {
    const parsed = new URL(integrationDatabaseUrl!);
    if (!['127.0.0.1', 'localhost'].includes(parsed.hostname)) {
      throw new Error('Review email integration tests require a local disposable PostgreSQL database');
    }
    if (process.env.DATABASE_URL !== integrationDatabaseUrl) {
      throw new Error('DATABASE_URL must match REVIEW_EMAIL_INTEGRATION_DATABASE_URL');
    }
    await cleanup();
  });

  afterAll(async () => {
    await cleanup();
    await prisma.$disconnect();
  });

  it('allows one live delivery group when old and new HMAC writers race', async () => {
    const order = await createOrder('hmac-race');
    const create = (fingerprint: string, keyVersion: number) => prisma.reviewEmailBatch.create({
      data: {
        storeId: STORE_ID,
        installationGeneration: 1,
        orderSnapshotId: order.id,
        deliveryGroupKey: 'package:shared',
        deliveryGroupMode: 'package',
        batchFingerprint: fingerprint,
        fingerprintKeyVersion: keyVersion,
      },
    });

    const results = await Promise.allSettled([
      create('rb1:1:old-writer', 1),
      create('rb1:2:new-writer', 2),
    ]);
    expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    await expect(prisma.reviewEmailBatch.count({
      where: {
        storeId: STORE_ID,
        orderSnapshotId: order.id,
        deliveryGroupKey: 'package:shared',
      },
    })).resolves.toBe(1);
  });

  it('allows one product request in a batch even when separate lines race', async () => {
    const { order, batch } = await createBatch('product-race');
    const lines = await Promise.all([1, 2].map((index) => prisma.ikasOrderLineSnapshot.create({
      data: {
        storeId: STORE_ID,
        orderSnapshotId: order.id,
        ikasOrderId: order.ikasOrderId,
        ikasOrderLineItemId: `line-product-race-${index}`,
        productId: 'shared-product',
        lineStatus: 'DELIVERED',
      },
    })));
    const create = (lineId: string) => prisma.reviewRequest.create({
      data: {
        storeId: STORE_ID,
        productId: 'shared-product',
        orderSnapshotId: order.id,
        orderLineSnapshotId: lineId,
        batchId: batch.id,
        status: 'scheduled',
      },
    });

    const results = await Promise.allSettled(lines.map((line) => create(line.id)));
    expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    await expect(prisma.reviewRequest.count({ where: { batchId: batch.id } })).resolves.toBe(1);
  });

  it('rejects cross-store batch, request, and job ownership', async () => {
    const order = await createOrder('tenant-fk-order');
    await expect(prisma.reviewEmailBatch.create({
      data: {
        storeId: 'another-store',
        installationGeneration: 1,
        orderSnapshotId: order.id,
        deliveryGroupKey: 'package:tenant-fk-order',
        deliveryGroupMode: 'package',
        batchFingerprint: 'rb1:1:tenant-fk-order',
        fingerprintKeyVersion: 1,
      },
    })).rejects.toMatchObject({ code: 'P2003' });

    const { order: validOrder, batch } = await createBatch('tenant-fk-targets');
    const line = await prisma.ikasOrderLineSnapshot.create({
      data: {
        storeId: STORE_ID,
        orderSnapshotId: validOrder.id,
        ikasOrderId: validOrder.ikasOrderId,
        ikasOrderLineItemId: 'line-tenant-fk-targets',
        productId: 'product-tenant-fk-targets',
        lineStatus: 'DELIVERED',
      },
    });

    await expect(prisma.reviewRequest.create({
      data: {
        storeId: 'another-store',
        productId: line.productId,
        orderSnapshotId: validOrder.id,
        orderLineSnapshotId: line.id,
        batchId: batch.id,
        status: 'scheduled',
      },
    })).rejects.toMatchObject({ code: 'P2003' });

    await expect(prisma.reviewEmailJob.create({
      data: {
        requestId: null,
        batchId: batch.id,
        storeId: 'another-store',
        productId: null,
        kind: 'request',
        sequence: 0,
        sendAfter: new Date(),
        dedupeKey: 'batch-db-cross-store-job',
      },
    })).rejects.toMatchObject({ code: 'P2003' });
  });

  it('rejects email jobs with both or neither request and batch targets', async () => {
    const { batch, request } = await createBatchRequest('job-xor');
    await expect(prisma.reviewEmailJob.create({
      data: {
        requestId: request.id,
        batchId: batch.id,
        storeId: STORE_ID,
        productId: request.productId,
        kind: 'request',
        sequence: 0,
        sendAfter: new Date(),
        dedupeKey: 'batch-db-job-both',
      },
    })).rejects.toThrow();
    await expect(prisma.reviewEmailJob.create({
      data: {
        requestId: null,
        batchId: null,
        storeId: STORE_ID,
        productId: null,
        kind: 'request',
        sequence: 0,
        sendAfter: new Date(),
        dedupeKey: 'batch-db-job-neither',
      },
    })).rejects.toThrow();
  });

  it('requires committed attempts to retain recipient evidence until scrubbed', async () => {
    const { batch } = await createBatch('recipient-check');
    const job = await prisma.reviewEmailJob.create({
      data: {
        requestId: null,
        batchId: batch.id,
        storeId: STORE_ID,
        productId: null,
        kind: 'request',
        sequence: 0,
        sendAfter: new Date(),
        dedupeKey: 'batch-db-recipient-job',
      },
    });
    await expect(prisma.reviewEmailAttempt.create({
      data: {
        jobId: job.id,
        attemptNumber: 1,
        correlationId: 'batchdbrecipientmissing000000000001',
        status: 'sending',
        sendCommittedAt: new Date(),
      },
    })).rejects.toThrow();

    await expect(prisma.reviewEmailAttempt.create({
      data: {
        jobId: job.id,
        attemptNumber: 2,
        correlationId: 'batchdbrecipientpresent00000000001',
        status: 'sending',
        sendCommittedAt: new Date(),
        recipientEmailHash: 'exact-hash',
        recipientEmailFoldedHash: 'folded-hash',
        recipientEmailEncrypted: 'encrypted-email',
      },
    })).resolves.toMatchObject({ jobId: job.id, status: 'sending' });
  });

  it('dedupes transport events and retains sanitized evidence after attempt deletion', async () => {
    const { batch } = await createBatch('event-ledger');
    const job = await prisma.reviewEmailJob.create({
      data: {
        requestId: null,
        batchId: batch.id,
        storeId: STORE_ID,
        productId: null,
        kind: 'request',
        sequence: 0,
        sendAfter: new Date(),
        dedupeKey: 'batch-db-event-job',
      },
    });
    const attempt = await prisma.reviewEmailAttempt.create({
      data: {
        jobId: job.id,
        attemptNumber: 1,
        correlationId: 'batchdbeventledger0000000000000001',
      },
    });
    const createEvent = () => prisma.reviewEmailEvent.create({
      data: {
        transport: 'sns',
        transportEventId: 'batch-db-transport-event-1',
        eventType: 'DELIVERY_DELAY',
        attemptId: attempt.id,
      },
    });
    const results = await Promise.allSettled([createEvent(), createEvent()]);
    expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);

    await prisma.reviewEmailAttempt.delete({ where: { id: attempt.id } });
    await expect(prisma.reviewEmailEvent.findFirstOrThrow({
      where: { transportEventId: 'batch-db-transport-event-1' },
      select: { attemptId: true },
    })).resolves.toEqual({ attemptId: null });
  });

  it('serializes sibling terminal transitions before deciding batch completion', async () => {
    const { order, batch } = await createBatch('completion-race', { status: 'active' });
    const lines = await Promise.all([1, 2].map((index) => prisma.ikasOrderLineSnapshot.create({
      data: {
        storeId: STORE_ID,
        orderSnapshotId: order.id,
        ikasOrderId: order.ikasOrderId,
        ikasOrderLineItemId: `line-completion-race-${index}`,
        productId: `product-completion-race-${index}`,
        lineStatus: 'DELIVERED',
      },
    })));
    const requests = await Promise.all(lines.map((line, index) => prisma.reviewRequest.create({
      data: {
        storeId: STORE_ID,
        productId: line.productId,
        orderSnapshotId: order.id,
        orderLineSnapshotId: line.id,
        batchId: batch.id,
        batchPosition: index,
        status: 'sent',
      },
    })));
    const job = await prisma.reviewEmailJob.create({
      data: {
        requestId: null,
        batchId: batch.id,
        storeId: STORE_ID,
        productId: null,
        kind: 'request',
        sequence: 0,
        status: 'sent',
        sendAfter: new Date(),
        dedupeKey: 'batch-db-completion-race-job',
      },
    });
    const attempt = await prisma.reviewEmailAttempt.create({
      data: {
        jobId: job.id,
        attemptNumber: 1,
        correlationId: 'batchdbcompletionrace0000000000001',
        status: 'accepted',
      },
    });
    const token = await prisma.reviewRequestToken.create({
      data: {
        requestId: null,
        batchId: batch.id,
        attemptId: attempt.id,
        tokenHash: 'batch-db-completion-race-token',
        status: 'active',
        expiresAt: new Date(Date.now() + 60_000),
      },
    });
    const session = await prisma.reviewRequestSession.create({
      data: {
        requestId: null,
        batchId: batch.id,
        tokenId: token.id,
        sessionHash: 'batch-db-completion-race-session',
        status: 'active',
        expiresAt: new Date(Date.now() + 60_000),
      },
    });

    let releaseBlocker!: () => void;
    let signalLocked!: () => void;
    const blockerReleased = new Promise<void>((resolve) => { releaseBlocker = resolve; });
    const blockerLocked = new Promise<void>((resolve) => { signalLocked = resolve; });
    const blocker = prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "ReviewEmailBatch" WHERE "id" = ${batch.id} FOR UPDATE`;
      signalLocked();
      await blockerReleased;
    }, { timeout: 10_000 });
    await blockerLocked;

    let settled = 0;
    const submit = (requestId: string) => prisma.$transaction((tx) => claimReviewCenterItemForSubmission(tx, {
      sessionId: session.id,
      tokenId: token.id,
      batchId: batch.id,
      requestId,
    }), { timeout: 10_000 }).finally(() => { settled += 1; });
    const submissions = requests.map((request) => submit(request.id));
    await new Promise((resolve) => setTimeout(resolve, 150));
    const settledWhileLocked = settled;
    releaseBlocker();
    await blocker;
    expect(settledWhileLocked).toBe(0);
    const results = await Promise.all(submissions);
    expect(results.filter((result) => result.batchCompleted)).toHaveLength(1);
    await expect(prisma.reviewEmailBatch.findUniqueOrThrow({
      where: { id: batch.id },
      select: { status: true, completedAt: true },
    })).resolves.toMatchObject({ status: 'completed', completedAt: expect.any(Date) });
    await expect(prisma.reviewRequest.count({
      where: { batchId: batch.id, status: { in: ['scheduled', 'sending', 'sent', 'sent_unknown', 'error'] } },
    })).resolves.toBe(0);
  });
});
