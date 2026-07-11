import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { syncIkasOrderForReviewRequests } from '@/lib/review-email/ikas-orders';

function settings() {
  return {
    id: 'settings-1',
    storeId: 'store-1',
    enabled: true,
    triggerMode: 'delivery',
    consentMode: 'strict_notifications_accepted',
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
        orderLineItemIds: ['line-1'],
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
        findMany: vi.fn().mockResolvedValue([{ id: 'line-snapshot-1', ikasOrderLineItemId: 'line-1', productId: 'product-1', eligibleAt: firstEligibleAt }]),
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
      reviewEmailJob: { upsert: vi.fn().mockResolvedValue({ id: 'job-1' }) },
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
        update: expect.objectContaining({ eligibleAt: firstEligibleAt }),
      }),
    );
    expect(tx.reviewRequest.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          eligibleAt: firstEligibleAt,
          sendAfter: new Date('2026-07-03T10:00:00.000Z'),
          firstDelayDaysSnapshot: 1,
          reminderDelayDaysSnapshot: 1,
          maxReminderCountSnapshot: 1,
          notificationsAcceptedSnapshot: true,
          templateVersionSnapshot: 'default_v1',
          localeSnapshot: 'tr',
          recipientEmailHash: expect.any(String),
          recipientEmailFoldedHash: expect.any(String),
          recipientEmailEncrypted: expect.any(String),
        }),
      }),
    );
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
        findFirst: vi.fn().mockResolvedValue({ id: 'request-1' }),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
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
      reviewEmailJob: { upsert: vi.fn().mockResolvedValue({ id: 'job-1' }) },
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
    expect(tx.reviewEmailJob.upsert).toHaveBeenCalledTimes(1);
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
