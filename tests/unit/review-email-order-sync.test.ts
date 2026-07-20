import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { syncIkasOrderForReviewRequests } from '@/lib/review-email/ikas-orders';
import { buildReviewEmailDeliveryGroupKey } from '@/lib/review-email/batching';
import { protectedEmail } from '@/lib/review-email/pii';

function settings() {
  return {
    id: 'settings-1',
    storeId: 'store-1',
    enabled: true,
    eligibilityStartsAt: new Date('2026-07-01T00:00:00.000Z'),
    triggerMode: 'delivery',
    consentMode: 'current_customer_subscription',
    firstDelayDays: 1,
    reminderEnabled: true,
    reminderDelayDays: 1,
    maxReminderCount: 1,
    senderDisplayName: null,
    replyToEmailHash: null,
    replyToEmailEncrypted: null,
    replyToName: null,
    logoUrl: null,
    buttonColor: null,
    locale: 'tr',
    templateVersion: 'default_v1',
    orderWebhookStatus: 'verified',
    orderWebhookVerifiedAt: new Date('2026-07-01T00:00:00.000Z'),
    orderWebhookLastErrorCode: null,
    createdAt: new Date('2026-07-01T00:00:00.000Z'),
    updatedAt: new Date('2026-07-01T00:00:00.000Z'),
  };
}

function order(
  lines: unknown[] = [
    {
      id: 'line-1',
      deleted: false,
      quantity: 1,
      status: 'DELIVERED',
      statusUpdatedAt: new Date('2026-07-05T12:00:00.000Z').getTime(),
      variant: { id: 'variant-1', name: 'Default', productId: 'product-1' },
    },
  ],
) {
  return {
    id: 'order-1',
    orderNumber: '1001',
    merchantId: 'store-1',
    orderPackageStatus: 'DELIVERED',
    orderPaymentStatus: 'PAID',
    orderedAt: new Date('2026-07-01T00:00:00.000Z').getTime(),
    shippingMethod: 'SHIPMENT',
    status: 'CREATED',
    updatedAt: new Date('2026-07-05T12:00:00.000Z').getTime(),
    customerId: 'customer-1',
    customer: {
      id: 'customer-1',
      email: 'customer@example.com',
      isGuestCheckout: false,
      notificationsAccepted: true,
    },
    orderLineItems: lines,
    orderPackages: [
      {
        id: 'package-1',
        deleted: false,
        orderLineItemIds: lines.map((line) => (line as { id: string }).id),
        orderPackageFulfillStatus: 'DELIVERED',
        updatedAt: new Date('2026-07-05T11:00:00.000Z').getTime(),
      },
    ],
  };
}

describe('ikas order review request sync', () => {
  beforeEach(() => {
    process.env.REVIEW_EMAIL_PII_CURRENT_KEY_VERSION = '1';
    process.env.REVIEW_EMAIL_PII_KEYS_JSON = JSON.stringify({
      1: {
        hashSecret: 'hash-secret-with-at-least-thirty-two-characters',
        encryptionKeyB64: Buffer.alloc(32, 7).toString('base64'),
      },
    });
  });

  afterEach(() => {
    delete process.env.REVIEW_EMAIL_PII_CURRENT_KEY_VERSION;
    delete process.env.REVIEW_EMAIL_PII_KEYS_JSON;
  });

  it('preserves the first eligibleAt and freezes request settings and recipient snapshots', async () => {
    const firstEligibleAt = new Date('2026-07-02T10:00:00.000Z');
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([
        {
          storeId: 'store-1',
          authorizedAppId: 'app-1',
          status: 'active',
          generation: 1,
        },
      ]),
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue(settings()) },
      reviewEmailSubjectBlock: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderSnapshot: { upsert: vi.fn().mockResolvedValue({ id: 'order-snapshot-1' }) },
      reviewEmailSuppression: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderLineSnapshot: {
        findMany: vi.fn().mockResolvedValue([{
          id: 'line-snapshot-1',
          ikasOrderLineItemId: 'line-1',
          productId: 'product-1',
          eligibleAt: firstEligibleAt,
          firstDeliveredAt: firstEligibleAt,
        }]),
        upsert: vi.fn().mockResolvedValue({ id: 'line-snapshot-1' }),
        update: vi.fn(),
      },
      reviewRequest: {
        findMany: vi.fn().mockResolvedValue([]),
        create: vi.fn().mockImplementation(async ({ data }) => ({ id: 'request-1', ...data })),
      },
      reviewRequestReceipt: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({ id: 'receipt-1', analyticsClosedAt: null }),
      },
      reviewEmailBatch: {
        findMany: vi.fn().mockResolvedValue([]),
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockImplementation(async ({ data }) => ({ id: 'batch-1', groupingFrozenAt: null, membershipVersion: 1, ...data })),
      },
      reviewEmailJob: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({ id: 'job-1' }),
      },
      reviewRequestToken: { updateMany: vi.fn() },
      reviewRequestSession: { updateMany: vi.fn() },
    };
    const db = {
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    await syncIkasOrderForReviewRequests(db as never, {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      order: order() as never,
      now: new Date('2026-07-10T00:00:00.000Z'),
    });

    expect(tx.ikasOrderLineSnapshot.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        update: expect.objectContaining({
          eligibleAt: firstEligibleAt,
          firstDeliveredAt: firstEligibleAt,
        }),
      }),
    );
    expect(tx.reviewEmailSuppression.findFirst).toHaveBeenCalledWith({
      where: expect.objectContaining({
        storeId: 'store-1',
        category: 'review_request',
        status: 'active',
        releasedAt: null,
      }),
      select: { id: true },
    });
    expect(tx.reviewRequest.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          eligibleAt: firstEligibleAt,
          sendAfter: new Date('2026-07-03T10:00:00.000Z'),
          firstDelayDaysSnapshot: 1,
          reminderDelayDaysSnapshot: 1,
          maxReminderCountSnapshot: 1,
          consentModeSnapshot: 'current_customer_subscription',
          notificationsAcceptedSnapshot: true,
          templateVersionSnapshot: 'default_v1',
          localeSnapshot: 'tr',
          recipientEmailHash: expect.any(String),
          recipientEmailFoldedHash: expect.any(String),
          recipientEmailEncrypted: expect.any(String),
        }),
      }),
    );
    expect(tx.reviewEmailBatch.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        eligibilityStartsAtSnapshot: new Date('2026-07-01T00:00:00.000Z'),
      }),
    }));
  });

  it('keeps immutable first delivery evidence when a later refund overwrites line statusUpdatedAt', async () => {
    const firstDeliveredAt = new Date('2026-07-05T12:00:00.000Z');
    const refundUpdatedAt = new Date('2026-07-12T12:00:00.000Z');
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([{
        storeId: 'store-1', authorizedAppId: 'app-1', status: 'active', generation: 1,
      }]),
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue(settings()) },
      reviewEmailSubjectBlock: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderSnapshot: { upsert: vi.fn().mockResolvedValue({ id: 'order-snapshot-1' }) },
      reviewEmailSuppression: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderLineSnapshot: {
        findMany: vi.fn().mockResolvedValue([{
          id: 'line-snapshot-1',
          ikasOrderLineItemId: 'line-1',
          productId: 'product-1',
          eligibleAt: firstDeliveredAt,
          firstDeliveredAt,
        }]),
        upsert: vi.fn().mockResolvedValue({ id: 'line-snapshot-1' }),
        update: vi.fn(),
      },
      reviewRequest: { findMany: vi.fn().mockResolvedValue([]) },
      reviewEmailBatch: { findMany: vi.fn().mockResolvedValue([]) },
      reviewRequestToken: { updateMany: vi.fn() },
      reviewRequestSession: { updateMany: vi.fn() },
    };
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };
    const refundedOrder = order([{
      id: 'line-1',
      deleted: false,
      quantity: 1,
      status: 'REFUND_REQUESTED',
      statusUpdatedAt: refundUpdatedAt.getTime(),
      variant: { id: 'variant-1', name: 'Default', productId: 'product-1' },
    }]);
    refundedOrder.orderPackages[0]!.orderPackageFulfillStatus = 'REFUND_REQUESTED';

    await syncIkasOrderForReviewRequests(db as never, {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      order: refundedOrder as never,
      now: refundUpdatedAt,
    });

    expect(tx.ikasOrderLineSnapshot.upsert).toHaveBeenCalledWith(expect.objectContaining({
      update: expect.objectContaining({
        lineStatus: 'REFUND_REQUESTED',
        lineStatusUpdatedAt: refundUpdatedAt,
        firstDeliveredAt,
        eligibleAt: null,
        ineligibleReason: 'line_refund_requested',
      }),
    }));
  });

  it('cancels an active request when its line disappears from the canonical order', async () => {
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([
        {
          storeId: 'store-1',
          authorizedAppId: 'app-1',
          status: 'active',
          generation: 1,
        },
      ]),
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue(settings()) },
      reviewEmailSubjectBlock: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderSnapshot: { upsert: vi.fn().mockResolvedValue({ id: 'order-snapshot-1' }) },
      reviewEmailSuppression: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderLineSnapshot: {
        findMany: vi.fn().mockResolvedValue([{ id: 'line-snapshot-1', ikasOrderLineItemId: 'line-1', productId: 'product-1', eligibleAt: new Date() }]),
        upsert: vi.fn(),
        update: vi.fn().mockResolvedValue({ id: 'line-snapshot-1' }),
      },
      reviewRequest: {
        findMany: vi.fn().mockResolvedValue([]),
        findFirst: vi.fn().mockResolvedValue({ id: 'request-1' }),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      reviewEmailBatch: { findMany: vi.fn().mockResolvedValue([]) },
      reviewEmailJob: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewRequestToken: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewRequestSession: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
    };
    const db = {
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    const result = await syncIkasOrderForReviewRequests(db as never, {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      order: order([]) as never,
    });

    expect(result.requestsCancelled).toBe(1);
    expect(tx.ikasOrderLineSnapshot.update).toHaveBeenCalledWith({
      where: { id: 'line-snapshot-1' },
      data: { eligibleAt: null, ineligibleReason: 'line_missing_from_canonical_order' },
    });
    expect(tx.reviewRequestToken.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ revocationReason: 'line_missing_from_canonical_order' }),
      }),
    );
  });

  it('creates one receipt and one request for multiple variants of the same product in one order', async () => {
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([{
        storeId: 'store-1', authorizedAppId: 'app-1', status: 'active', generation: 1,
      }]),
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue(settings()) },
      reviewEmailSubjectBlock: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderSnapshot: { upsert: vi.fn().mockResolvedValue({ id: 'order-snapshot-1' }) },
      reviewEmailSuppression: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderLineSnapshot: {
        findMany: vi.fn().mockResolvedValue([]),
        upsert: vi.fn().mockImplementation(async ({ create }) => ({
          id: `snapshot-${create.ikasOrderLineItemId}`,
        })),
        update: vi.fn(),
      },
      reviewRequest: {
        findMany: vi.fn().mockResolvedValue([]),
        create: vi.fn().mockResolvedValue({ id: 'request-1' }),
      },
      reviewRequestReceipt: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({ id: 'receipt-1', analyticsClosedAt: null }),
      },
      reviewEmailBatch: {
        findMany: vi.fn().mockResolvedValue([]),
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockImplementation(async ({ data }) => ({ id: 'batch-1', groupingFrozenAt: null, membershipVersion: 1, ...data })),
      },
      reviewEmailJob: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({ id: 'job-1' }),
      },
      reviewRequestToken: { updateMany: vi.fn() },
      reviewRequestSession: { updateMany: vi.fn() },
    };
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };
    const lines = [
      {
        id: 'line-1', deleted: false, quantity: 1, status: 'DELIVERED',
        statusUpdatedAt: new Date('2026-07-05T12:00:00.000Z').getTime(),
        variant: { id: 'variant-1', name: 'Small', productId: 'product-1' },
      },
      {
        id: 'line-2', deleted: false, quantity: 1, status: 'DELIVERED',
        statusUpdatedAt: new Date('2026-07-06T12:00:00.000Z').getTime(),
        variant: { id: 'variant-2', name: 'Large', productId: 'product-1' },
      },
    ];

    const result = await syncIkasOrderForReviewRequests(db as never, {
      storeId: 'store-1', authorizedAppId: 'app-1', order: order(lines) as never,
    });

    expect(result.linesSeen).toBe(2);
    expect(result.requestsScheduled).toBe(1);
    expect(tx.reviewRequestReceipt.create).toHaveBeenCalledTimes(1);
    expect(tx.reviewRequest.create).toHaveBeenCalledTimes(1);
    expect(tx.reviewEmailBatch.create).toHaveBeenCalledTimes(1);
    expect(tx.reviewEmailJob.create).toHaveBeenCalledTimes(1);
  });

  it('reuses a purged terminal batch tombstone by fingerprint without scheduling email again', async () => {
    const tombstone = {
      id: 'batch-tombstone',
      storeId: 'store-1',
      installationGeneration: 1,
      orderSnapshotId: null,
      deliveryGroupKey: 'package:package-1',
      deliveryGroupMode: 'package',
      batchFingerprint: 'rb1:1:tombstone',
      fingerprintKeyVersion: 1,
      groupingFrozenAt: new Date('2026-01-01T00:00:00.000Z'),
      membershipVersion: 1,
      recipientEmailHash: null,
      recipientEmailFoldedHash: null,
      status: 'completed',
      detailPurgedAt: new Date('2026-07-01T00:00:00.000Z'),
    };
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([{
        storeId: 'store-1', authorizedAppId: 'app-1', status: 'active', generation: 1,
      }]),
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue(settings()) },
      reviewEmailSubjectBlock: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderSnapshot: { upsert: vi.fn().mockResolvedValue({ id: 'order-snapshot-new' }) },
      reviewEmailSuppression: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderLineSnapshot: {
        findMany: vi.fn().mockResolvedValue([]),
        upsert: vi.fn().mockResolvedValue({ id: 'line-snapshot-new' }),
        update: vi.fn(),
      },
      reviewRequest: { findMany: vi.fn().mockResolvedValue([]), create: vi.fn() },
      reviewRequestReceipt: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({ id: 'receipt-late', analyticsClosedAt: new Date() }),
      },
      reviewEmailBatch: {
        findMany: vi.fn().mockResolvedValue([]),
        findFirst: vi.fn().mockResolvedValue(tombstone),
        create: vi.fn(),
        update: vi.fn(),
      },
      reviewEmailJob: { findFirst: vi.fn(), create: vi.fn() },
      reviewRequestToken: { updateMany: vi.fn() },
      reviewRequestSession: { updateMany: vi.fn() },
    };
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };

    const result = await syncIkasOrderForReviewRequests(db as never, {
      storeId: 'store-1', authorizedAppId: 'app-1', order: order() as never,
      now: new Date('2026-07-10T00:00:00.000Z'),
    });

    expect(result.requestsScheduled).toBe(0);
    expect(tx.reviewEmailBatch.findFirst).toHaveBeenCalledWith({
      where: {
        storeId: 'store-1',
        installationGeneration: 1,
        batchFingerprint: { in: expect.any(Array) },
      },
    });
    expect(tx.reviewEmailBatch.create).not.toHaveBeenCalled();
    expect(tx.reviewRequest.create).not.toHaveBeenCalled();
    expect(tx.reviewEmailJob.create).not.toHaveBeenCalled();
    expect(tx.reviewRequestReceipt.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        analyticsCloseReason: 'late_after_batch_closed',
      }),
    });
  });

  it('keeps late package members in a frozen package batch without creating a second initial email', async () => {
    const frozenAt = new Date('2026-07-06T12:00:00.000Z');
    const frozenBatch = {
      id: 'batch-fallback',
      storeId: 'store-1',
      installationGeneration: 1,
      deliveryGroupKey: buildReviewEmailDeliveryGroupKey(['line-1']),
      deliveryGroupMode: 'package',
      batchFingerprint: 'rb1:1:fallback',
      fingerprintKeyVersion: 1,
      groupingFrozenAt: frozenAt,
      membershipVersion: 1,
      recipientEmailFoldedHash: null,
      status: 'active',
    };
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([{
        storeId: 'store-1', authorizedAppId: 'app-1', status: 'active', generation: 1,
      }]),
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue(settings()) },
      reviewEmailSubjectBlock: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderSnapshot: { upsert: vi.fn().mockResolvedValue({ id: 'order-snapshot-1' }) },
      reviewEmailSuppression: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderLineSnapshot: {
        findMany: vi.fn().mockResolvedValue([{
          id: 'snapshot-line-1',
          ikasOrderLineItemId: 'line-1',
          productId: 'product-1',
          eligibleAt: new Date('2026-07-05T12:00:00.000Z'),
          firstDeliveredAt: new Date('2026-07-05T12:00:00.000Z'),
        }]),
        upsert: vi.fn().mockImplementation(async ({ create }) => ({ id: `snapshot-${create.ikasOrderLineItemId}` })),
        update: vi.fn(),
      },
      reviewRequest: {
        findMany: vi.fn().mockResolvedValue([{
          id: 'request-1',
          productId: 'product-1',
          status: 'sent',
          sendAfter: new Date('2026-07-06T12:00:00.000Z'),
          receiptId: 'receipt-1',
          batchId: 'batch-fallback',
          batchPosition: 0,
        }]),
        create: vi.fn().mockImplementation(async ({ data }) => ({ id: 'request-2', ...data })),
        updateMany: vi.fn(),
      },
      reviewRequestReceipt: {
        findFirst: vi.fn()
          .mockResolvedValueOnce({ id: 'receipt-1', analyticsClosedAt: null })
          .mockResolvedValueOnce(null),
        create: vi.fn().mockResolvedValue({ id: 'receipt-2', analyticsClosedAt: null }),
      },
      reviewEmailBatch: {
        findMany: vi.fn().mockResolvedValue([frozenBatch]),
        create: vi.fn(),
        update: vi.fn().mockImplementation(async ({ data }) => ({
          ...frozenBatch,
          membershipVersion: data.membershipVersion ? 2 : 1,
        })),
        updateMany: vi.fn(),
      },
      reviewEmailJob: {
        findFirst: vi.fn().mockResolvedValue({ id: 'existing-initial-job' }),
        create: vi.fn(),
      },
      reviewRequestToken: { updateMany: vi.fn() },
      reviewRequestSession: { updateMany: vi.fn() },
    };
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };
    const lines = [
      {
        id: 'line-1', deleted: false, quantity: 1, status: 'DELIVERED',
        statusUpdatedAt: new Date('2026-07-05T12:00:00.000Z').getTime(),
        variant: { id: 'variant-1', name: 'Default', productId: 'product-1' },
      },
      {
        id: 'line-2', deleted: false, quantity: 1, status: 'DELIVERED',
        statusUpdatedAt: new Date('2026-07-07T12:00:00.000Z').getTime(),
        variant: { id: 'variant-2', name: 'Default', productId: 'product-2' },
      },
    ];

    const result = await syncIkasOrderForReviewRequests(db as never, {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      order: order(lines) as never,
      now: new Date('2026-07-08T00:00:00.000Z'),
    });

    expect(result.requestsScheduled).toBe(1);
    expect(tx.reviewEmailBatch.create).not.toHaveBeenCalled();
    expect(tx.reviewEmailBatch.update).toHaveBeenCalledWith({
      where: { id: 'batch-fallback' },
      data: { membershipVersion: { increment: 1 } },
    });
    expect(tx.reviewRequest.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ batchId: 'batch-fallback', productId: 'product-2', membershipVersion: 2 }),
    }));
    expect(tx.reviewEmailJob.create).not.toHaveBeenCalled();
  });

  it('closes reminder access when a frozen recipient changes only by local-part casing', async () => {
    const previousRecipient = protectedEmail('Customer@example.com');
    const currentRecipient = protectedEmail('customer@example.com');
    if (!previousRecipient || !currentRecipient) throw new Error('test_recipient_protection_failed');
    const frozenAt = new Date('2026-07-06T12:00:00.000Z');
    const batch = {
      id: 'batch-1',
      storeId: 'store-1',
      installationGeneration: 1,
      deliveryGroupKey: 'package:package-1',
      deliveryGroupMode: 'package',
      batchFingerprint: 'rb1:1:existing',
      fingerprintKeyVersion: 1,
      groupingFrozenAt: frozenAt,
      membershipVersion: 1,
      recipientEmailHash: previousRecipient.hash,
      recipientEmailFoldedHash: previousRecipient.foldedHash,
      status: 'active',
    };
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([{
        storeId: 'store-1', authorizedAppId: 'app-1', status: 'active', generation: 1,
      }]),
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue(settings()) },
      reviewEmailSubjectBlock: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderSnapshot: { upsert: vi.fn().mockResolvedValue({ id: 'order-snapshot-1' }) },
      reviewEmailSuppression: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderLineSnapshot: {
        findMany: vi.fn().mockResolvedValue([{
          id: 'line-snapshot-1', ikasOrderLineItemId: 'line-1', productId: 'product-1',
          eligibleAt: new Date('2026-07-05T12:00:00.000Z'),
        }]),
        upsert: vi.fn().mockResolvedValue({ id: 'line-snapshot-1' }),
        update: vi.fn(),
      },
      reviewRequest: {
        findMany: vi.fn().mockResolvedValue([{
          id: 'request-1', productId: 'product-1', status: 'sent',
          sendAfter: new Date('2026-07-06T12:00:00.000Z'), receiptId: 'receipt-1',
          batchId: 'batch-1', batchPosition: 0,
        }]),
      },
      reviewRequestReceipt: { findFirst: vi.fn().mockResolvedValue({ id: 'receipt-1', analyticsClosedAt: null }) },
      reviewEmailBatch: {
        findMany: vi.fn().mockResolvedValue([batch]),
        update: vi.fn().mockImplementation(async ({ data }) => ({ ...batch, ...data })),
        updateMany: vi.fn(),
      },
      reviewEmailJob: { updateMany: vi.fn() },
      reviewRequestToken: { updateMany: vi.fn() },
      reviewRequestSession: { updateMany: vi.fn() },
    };
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };
    const changedOrder = order();
    changedOrder.customer.email = 'customer@example.com';

    await syncIkasOrderForReviewRequests(db as never, {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      order: changedOrder as never,
      now: new Date('2026-07-08T00:00:00.000Z'),
    });

    expect(previousRecipient.foldedHash).toBe(currentRecipient.foldedHash);
    expect(tx.reviewEmailBatch.update).toHaveBeenCalledWith({
      where: { id: 'batch-1' },
      data: expect.objectContaining({
        status: 'cancelled',
        emailAccessStatus: 'recipient_changed',
        cancellationReason: 'recipient_changed_after_send_commit',
      }),
    });
    expect(tx.reviewEmailJob.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ lastErrorCode: 'recipient_changed_after_send_commit' }),
    }));
    expect(tx.reviewRequestToken.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ revocationReason: 'recipient_changed_after_send_commit' }),
    }));
  });

  it('does not persist canonical order PII while the merchant setting is disabled', async () => {
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([
        {
          storeId: 'store-1',
          authorizedAppId: 'app-1',
          status: 'active',
          generation: 1,
        },
      ]),
      reviewEmailSettings: {
        findUnique: vi.fn().mockResolvedValue({ ...settings(), enabled: false }),
      },
      ikasOrderSnapshot: { upsert: vi.fn() },
    };
    const db = {
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    const result = await syncIkasOrderForReviewRequests(db as never, {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      order: order() as never,
    });

    expect(result.state).toBe('store_disabled');
    expect(tx.ikasOrderSnapshot.upsert).not.toHaveBeenCalled();
  });

  it('fails closed before persisting order PII when an enabled store has no activation cutoff', async () => {
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([{
        storeId: 'store-1', authorizedAppId: 'app-1', status: 'active', generation: 1,
      }]),
      reviewEmailSettings: {
        findUnique: vi.fn().mockResolvedValue({ ...settings(), eligibilityStartsAt: null }),
      },
      ikasOrderSnapshot: { upsert: vi.fn() },
    };
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };

    const result = await syncIkasOrderForReviewRequests(db as never, {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      order: order() as never,
    });

    expect(result.state).toBe('eligibility_cutoff_missing');
    expect(tx.ikasOrderSnapshot.upsert).not.toHaveBeenCalled();
  });

  it('rejects a canonical ikas order from another merchant before persisting PII', async () => {
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([
        {
          storeId: 'store-1',
          authorizedAppId: 'app-1',
          status: 'active',
          generation: 1,
        },
      ]),
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue(settings()) },
      ikasOrderSnapshot: { upsert: vi.fn() },
    };
    const db = {
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    await expect(
      syncIkasOrderForReviewRequests(db as never, {
        storeId: 'store-1',
        authorizedAppId: 'app-1',
        order: { ...order(), merchantId: 'store-2' } as never,
      }),
    ).rejects.toMatchObject({ message: 'review_email_order_tenant_mismatch' });
    expect(tx.ikasOrderSnapshot.upsert).not.toHaveBeenCalled();
  });
});
