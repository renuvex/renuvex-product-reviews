import { describe, expect, it } from 'vitest';
import {
  evaluateLineEligibility,
  firstRequestSendAfter,
  initialRequestExpiresAt,
  reminderSendAfter,
  type NormalizedOrder,
  type NormalizedOrderLine,
} from '@/lib/review-email/eligibility';

function line(overrides: Partial<NormalizedOrderLine> = {}): NormalizedOrderLine {
  return {
    id: 'line-1',
    productId: 'product-1',
    variantId: 'variant-1',
    status: 'DELIVERED',
    statusUpdatedAt: new Date('2026-07-01T10:00:00.000Z'),
    quantity: 1,
    productName: 'Test product',
    variantName: 'Default',
    ...overrides,
  };
}

function order(overrides: Partial<NormalizedOrder> = {}): NormalizedOrder {
  return {
    storeId: 'store-1',
    authorizedAppId: 'auth-1',
    ikasOrderId: 'order-1',
    orderNumber: '1001',
    shippingMethod: 'SHIPMENT',
    orderStatus: 'CREATED',
    orderPackageStatus: 'DELIVERED',
    orderPaymentStatus: 'PAID',
    orderedAt: new Date('2026-06-30T10:00:00.000Z'),
    updatedAt: new Date('2026-07-01T10:00:00.000Z'),
    notificationsAccepted: true,
    guestCheckout: false,
    customerId: 'customer-1',
    customerEmailHash: 'email-hash',
    customerEmailFoldedHash: 'folded-email-hash',
    customerEmailHashKeyVersion: 1,
    customerEmailNormalizationVersion: 2,
    customerEmailLookupHashes: ['email-hash'],
    customerEmailExactLookupHashes: ['email-hash'],
    customerEmailEncrypted: 'email-encrypted',
    lines: [line()],
    packages: [
      {
        id: 'package-1',
        status: 'DELIVERED',
        orderLineItemIds: ['line-1'],
        updatedAt: new Date('2026-07-01T09:00:00.000Z'),
      },
    ],
    ...overrides,
  };
}

describe('review email eligibility timing', () => {
  it('schedules the first request one day after delivery eligibility by default', () => {
    const eligible = evaluateLineEligibility(order(), line());

    expect(eligible).toMatchObject({ eligible: true });
    if (!eligible.eligible) throw new Error('expected eligibility');

    expect(firstRequestSendAfter(eligible.eligibleAt, { firstDelayDays: 1 }).toISOString()).toBe('2026-07-02T10:00:00.000Z');
  });

  it('schedules reminder from the actual firstSentAt, not the delivery timestamp', () => {
    const deliveredAt = new Date('2026-07-01T10:00:00.000Z');
    const firstSentAt = new Date('2026-07-05T15:30:00.000Z');

    expect(firstRequestSendAfter(deliveredAt, { firstDelayDays: 1 }).toISOString()).toBe('2026-07-02T10:00:00.000Z');
    expect(reminderSendAfter(firstSentAt, { reminderDelayDays: 1 }).toISOString()).toBe('2026-07-06T15:30:00.000Z');
  });

  it('keeps the unsent request alive for one token window after its due time', () => {
    const sendAfter = new Date('2026-07-31T10:00:00.000Z');
    expect(initialRequestExpiresAt(sendAfter)).toEqual(new Date('2026-08-30T10:00:00.000Z'));
  });

  it('does not mark digital or notification-denied orders eligible in the first release', () => {
    expect(evaluateLineEligibility(order({ shippingMethod: 'DIGITAL_DELIVERY' }), line())).toMatchObject({
      eligible: false,
      reason: 'shipping_method_disabled',
    });
    expect(evaluateLineEligibility(order({ notificationsAccepted: false }), line())).toMatchObject({
      eligible: false,
      reason: 'notifications_not_accepted',
    });
  });

  it('does not close an unaffected delivered line for a partial order cancellation or refund', () => {
    expect(evaluateLineEligibility(order({
      orderStatus: 'PARTIALLY_REFUNDED',
      orderPackageStatus: 'PARTIALLY_CANCELLED',
    }), line())).toMatchObject({ eligible: true });

    expect(evaluateLineEligibility(order({
      orderStatus: 'PARTIALLY_REFUNDED',
      orderPackageStatus: 'PARTIALLY_REFUNDED',
    }), line({ status: 'REFUNDED' }))).toMatchObject({ eligible: false, reason: 'line_refunded' });
  });
});
