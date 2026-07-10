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

function order(lines: unknown[] = [{
  id: 'line-1',
  deleted: false,
  quantity: 1,
  status: 'DELIVERED',
  statusUpdatedAt: new Date('2026-07-05T12:00:00.000Z').getTime(),
  variant: { id: 'variant-1', name: 'Default', productId: 'product-1' },
}]) {
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
    orderPackages: [{
      id: 'package-1',
      deleted: false,
      orderLineItemIds: ['line-1'],
      orderPackageFulfillStatus: 'DELIVERED',
      updatedAt: new Date('2026-07-05T11:00:00.000Z').getTime(),
    }],
  };
}

describe('ikas order review request sync', () => {
  beforeEach(() => {
    process.env.REVIEW_EMAIL_HASH_SECRET = 'hash-secret-with-at-least-thirty-two-characters';
    process.env.REVIEW_EMAIL_PII_ENCRYPTION_KEY_B64 = Buffer.alloc(32, 7).toString('base64');
  });

  afterEach(() => {
    delete process.env.REVIEW_EMAIL_HASH_SECRET;
    delete process.env.REVIEW_EMAIL_PII_ENCRYPTION_KEY_B64;
  });

  it('preserves the first eligibleAt and freezes request settings and recipient snapshots', async () => {
    const firstEligibleAt = new Date('2026-07-02T10:00:00.000Z');
    const tx = {
      ikasOrderSnapshot: { upsert: vi.fn().mockResolvedValue({ id: 'order-snapshot-1' }) },
      reviewEmailSuppression: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderLineSnapshot: {
        findMany: vi.fn().mockResolvedValue([{ id: 'line-snapshot-1', ikasOrderLineItemId: 'line-1', eligibleAt: firstEligibleAt }]),
        upsert: vi.fn().mockResolvedValue({ id: 'line-snapshot-1' }),
        update: vi.fn(),
      },
      reviewRequest: {
        findUnique: vi.fn().mockResolvedValue(null),
        upsert: vi.fn().mockImplementation(async ({ create }) => ({ id: 'request-1', ...create })),
      },
      reviewEmailJob: { upsert: vi.fn().mockResolvedValue({ id: 'job-1' }) },
      reviewRequestToken: { updateMany: vi.fn() },
      reviewRequestSession: { updateMany: vi.fn() },
    };
    const db = {
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue(settings()) },
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    await syncIkasOrderForReviewRequests(db as never, {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      order: order() as never,
      now: new Date('2026-07-10T00:00:00.000Z'),
    });

    expect(tx.ikasOrderLineSnapshot.upsert).toHaveBeenCalledWith(expect.objectContaining({
      update: expect.objectContaining({ eligibleAt: firstEligibleAt }),
    }));
    expect(tx.reviewRequest.upsert).toHaveBeenCalledWith(expect.objectContaining({
      create: expect.objectContaining({
        eligibleAt: firstEligibleAt,
        sendAfter: new Date('2026-07-03T10:00:00.000Z'),
        firstDelayDaysSnapshot: 1,
        reminderDelayDaysSnapshot: 1,
        maxReminderCountSnapshot: 1,
        notificationsAcceptedSnapshot: true,
        templateVersionSnapshot: 'default_v1',
        localeSnapshot: 'tr',
        recipientEmailHash: expect.any(String),
        recipientEmailEncrypted: expect.any(String),
      }),
      update: {},
    }));
  });

  it('cancels an active request when its line disappears from the canonical order', async () => {
    const tx = {
      ikasOrderSnapshot: { upsert: vi.fn().mockResolvedValue({ id: 'order-snapshot-1' }) },
      reviewEmailSuppression: { findFirst: vi.fn().mockResolvedValue(null) },
      ikasOrderLineSnapshot: {
        findMany: vi.fn().mockResolvedValue([{ id: 'line-snapshot-1', ikasOrderLineItemId: 'line-1', eligibleAt: new Date() }]),
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
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue(settings()) },
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
    expect(tx.reviewRequestToken.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ revocationReason: 'line_missing_from_canonical_order' }),
    }));
  });
});
