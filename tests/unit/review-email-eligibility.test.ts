import { describe, expect, it } from 'vitest';
import {
  evaluateLineEligibility,
  firstRequestSendAfter,
  initialRequestExpiresAt,
  reminderSendAfter,
  type NormalizedOrder,
  type NormalizedOrderLine,
} from '@/lib/review-email/eligibility';

const ELIGIBILITY_STARTS_AT = new Date('2026-07-01T00:00:00.000Z');

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
    const eligible = evaluateLineEligibility(order(), line(), ELIGIBILITY_STARTS_AT);

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
    expect(evaluateLineEligibility(order({ shippingMethod: 'DIGITAL_DELIVERY' }), line(), ELIGIBILITY_STARTS_AT)).toMatchObject({
      eligible: false,
      reason: 'shipping_method_disabled',
    });
    expect(evaluateLineEligibility(order({ notificationsAccepted: false }), line(), ELIGIBILITY_STARTS_AT)).toMatchObject({
      eligible: false,
      reason: 'notifications_not_accepted',
    });
  });

  it('does not close an unaffected delivered line for a partial order cancellation or refund', () => {
    expect(evaluateLineEligibility(order({
      orderStatus: 'PARTIALLY_REFUNDED',
      orderPackageStatus: 'PARTIALLY_CANCELLED',
    }), line(), ELIGIBILITY_STARTS_AT)).toMatchObject({ eligible: true });

    expect(evaluateLineEligibility(order({
      orderStatus: 'PARTIALLY_REFUNDED',
      orderPackageStatus: 'PARTIALLY_REFUNDED',
    }), line({ status: 'REFUNDED' }), ELIGIBILITY_STARTS_AT)).toMatchObject({ eligible: false, reason: 'line_refunded' });
  });

  it('uses only the exact line terminal timestamp for the activation cutoff', () => {
    const startsAt = new Date('2026-07-10T00:00:00.000Z');
    const oldDelivery = line({ statusUpdatedAt: new Date('2026-07-09T23:59:59.999Z') });
    const laterGenericUpdate = order({
      updatedAt: new Date('2026-08-08T00:00:00.000Z'),
      packages: [{
        id: 'package-1',
        status: 'DELIVERED',
        orderLineItemIds: ['line-1'],
        updatedAt: new Date('2026-08-08T00:00:00.000Z'),
      }],
    });

    expect(evaluateLineEligibility(laterGenericUpdate, oldDelivery, startsAt)).toMatchObject({
      eligible: false,
      reason: 'delivery_before_email_activation',
    });
    expect(evaluateLineEligibility(laterGenericUpdate, line({ statusUpdatedAt: null }), startsAt)).toMatchObject({
      eligible: false,
      reason: 'missing_exact_delivery_timestamp',
    });
    expect(evaluateLineEligibility(laterGenericUpdate, line({ status: 'SHIPPED' }), startsAt)).toMatchObject({
      eligible: false,
      reason: 'shipment_not_delivered',
    });
  });

  it('fails closed for click-and-collect without an exact ready transition timestamp', () => {
    expect(evaluateLineEligibility(order({
      shippingMethod: 'CLICK_AND_COLLECT',
      orderPackageStatus: 'READY_FOR_PICK_UP',
      packages: [{
        id: 'package-1',
        status: 'READY_FOR_PICK_UP',
        orderLineItemIds: ['line-1'],
        updatedAt: new Date('2026-07-02T00:00:00.000Z'),
      }],
    }), line(), ELIGIBILITY_STARTS_AT)).toMatchObject({
      eligible: false,
      reason: 'pickup_timestamp_unverified',
    });
  });
});
