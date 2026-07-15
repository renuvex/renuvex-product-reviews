import { describe, expect, it } from 'vitest';
import { buildReviewEmailDeliveryGroups, reviewEmailBatchMembershipChanged } from '@/lib/review-email/batching';
import type { NormalizedOrder, NormalizedOrderLine } from '@/lib/review-email/eligibility';

function line(id: string, productId = id, overrides: Partial<NormalizedOrderLine> = {}): NormalizedOrderLine {
  return {
    id,
    productId,
    variantId: `${id}-variant`,
    status: 'DELIVERED',
    statusUpdatedAt: new Date('2026-07-10T10:00:00.000Z'),
    quantity: 1,
    productName: `Product ${productId}`,
    variantName: null,
    ...overrides,
  };
}

function order(lines: NormalizedOrderLine[], overrides: Partial<NormalizedOrder> = {}): NormalizedOrder {
  return {
    storeId: 'store-1',
    authorizedAppId: 'app-1',
    ikasOrderId: 'order-1',
    orderNumber: '1001',
    shippingMethod: 'SHIPMENT',
    orderStatus: 'CREATED',
    orderPackageStatus: 'DELIVERED',
    orderPaymentStatus: 'PAID',
    orderedAt: new Date('2026-07-01T00:00:00.000Z'),
    updatedAt: new Date('2026-07-10T10:00:00.000Z'),
    notificationsAccepted: true,
    guestCheckout: false,
    customerId: 'customer-1',
    customerEmailHash: 'exact-hash',
    customerEmailFoldedHash: 'folded-hash',
    customerEmailHashKeyVersion: 1,
    customerEmailNormalizationVersion: 2,
    customerEmailLookupHashes: ['folded-hash'],
    customerEmailExactLookupHashes: ['exact-hash'],
    customerEmailEncrypted: 'encrypted-email',
    lines,
    packages: [{
      id: 'package-1',
      status: 'DELIVERED',
      orderLineItemIds: lines.map((item) => item.id),
      updatedAt: new Date('2026-07-10T09:00:00.000Z'),
    }],
    ...overrides,
  };
}

describe('review email delivery grouping', () => {
  it('groups twenty delivered products into one package batch', () => {
    const lines = Array.from({ length: 20 }, (_, index) => line(`line-${index + 1}`, `product-${index + 1}`));
    const result = buildReviewEmailDeliveryGroups(order(lines));

    expect(result.groups).toHaveLength(1);
    expect(result.groups[0]).toMatchObject({ deliveryGroupKey: 'package:package-1', groupingMode: 'package' });
    expect(result.groups[0]!.members).toHaveLength(20);
    expect(new Set(result.groups[0]!.members.map((member) => member.productId)).size).toBe(20);
  });

  it('groups twenty delivered products split ten-by-ten into two package batches', () => {
    const lines = Array.from({ length: 20 }, (_, index) => line(`line-${index + 1}`, `product-${index + 1}`));
    const result = buildReviewEmailDeliveryGroups(order(lines, {
      packages: [
        {
          id: 'package-1',
          status: 'DELIVERED',
          orderLineItemIds: lines.slice(0, 10).map((item) => item.id),
          updatedAt: new Date('2026-07-10T09:00:00.000Z'),
        },
        {
          id: 'package-2',
          status: 'DELIVERED',
          orderLineItemIds: lines.slice(10).map((item) => item.id),
          updatedAt: new Date('2026-07-10T11:00:00.000Z'),
        },
      ],
    }));

    expect(result.groups.map((group) => ({
      deliveryGroupKey: group.deliveryGroupKey,
      productIds: group.members.map((member) => member.productId),
    }))).toEqual([
      {
        deliveryGroupKey: 'package:package-1',
        productIds: Array.from({ length: 10 }, (_, index) => `product-${index + 1}`),
      },
      {
        deliveryGroupKey: 'package:package-2',
        productIds: Array.from({ length: 10 }, (_, index) => `product-${index + 11}`),
      },
    ]);
    const groupedProductIds = result.groups.flatMap((group) => group.members.map((member) => member.productId));
    expect(groupedProductIds).toHaveLength(20);
    expect(new Set(groupedProductIds).size).toBe(20);
    expect(result.productReasons.size).toBe(0);
  });

  it('deduplicates variants and quantities at product scope', () => {
    const lines = [
      line('line-1', 'product-1', { variantId: 'small', quantity: 2 }),
      line('line-2', 'product-1', { variantId: 'large', quantity: 1 }),
    ];
    const result = buildReviewEmailDeliveryGroups(order(lines));

    expect(result.groups[0]!.members).toEqual([
      expect.objectContaining({ productId: 'product-1', sourceLineItemIds: ['line-1', 'line-2'] }),
    ]);
  });

  it('waits for every split package before assigning one product request', () => {
    const lines = [
      line('line-1', 'product-1'),
      line('line-2', 'product-1', { status: 'SHIPPED' }),
    ];
    const result = buildReviewEmailDeliveryGroups(order(lines, {
      orderPackageStatus: 'PARTIALLY_DELIVERED',
      packages: [
        { id: 'package-1', status: 'DELIVERED', orderLineItemIds: ['line-1'], updatedAt: new Date('2026-07-10T09:00:00.000Z') },
        { id: 'package-2', status: 'SHIPPED', orderLineItemIds: ['line-2'], updatedAt: new Date('2026-07-10T11:00:00.000Z') },
      ],
    }));

    expect(result.groups).toHaveLength(0);
    expect(result.productReasons.get('product-1')).toBe('shipment_not_delivered');
  });

  it('uses the persisted first eligibility timestamp and a safe order fallback', () => {
    const firstEligibleAt = new Date('2026-07-02T08:00:00.000Z');
    const lines = [line('line-1', 'product-1')];
    const result = buildReviewEmailDeliveryGroups(
      order(lines, { packages: [] }),
      new Date('2026-07-15T00:00:00.000Z'),
      { eligibleAtByLineId: new Map([['line-1', firstEligibleAt]]) },
    );

    expect(result.groups).toEqual([
      expect.objectContaining({ deliveryGroupKey: 'order:complete', eligibleAt: firstEligibleAt }),
    ]);
  });

  it('keeps digital and no-shipment orders disabled in the first release', () => {
    const lines = [line('line-1', 'product-1')];
    expect(buildReviewEmailDeliveryGroups(order(lines, { shippingMethod: 'DIGITAL_DELIVERY' })).groups).toEqual([]);
    expect(buildReviewEmailDeliveryGroups(order(lines, { shippingMethod: 'NO_SHIPMENT' })).groups).toEqual([]);
  });

  it('fails closed with missing_customer_email even after package delivery', () => {
    const lines = [line('line-1', 'product-1'), line('line-2', 'product-2')];
    const result = buildReviewEmailDeliveryGroups(order(lines, {
      customerEmailHash: null,
      customerEmailFoldedHash: null,
      customerEmailHashKeyVersion: null,
      customerEmailLookupHashes: [],
      customerEmailExactLookupHashes: [],
      customerEmailEncrypted: null,
    }));

    expect(result.groups).toEqual([]);
    expect([...result.productReasons.entries()]).toEqual([
      ['product-1', 'missing_customer_email'],
      ['product-2', 'missing_customer_email'],
    ]);
  });

  it('keeps membership version stable for an idempotent canonical reread', () => {
    const members = buildReviewEmailDeliveryGroups(order([line('line-1', 'product-1')])).groups[0]!.members;

    expect(reviewEmailBatchMembershipChanged('batch-1', [{
      batchId: 'batch-1',
      batchPosition: 0,
      productId: 'product-1',
      status: 'scheduled',
    }], members)).toBe(false);
  });

  it('detects product moves and removals that must invalidate prepared attempts', () => {
    const members = buildReviewEmailDeliveryGroups(order([line('line-1', 'product-1')])).groups[0]!.members;
    const existing = [
      { batchId: 'batch-old', batchPosition: 0, productId: 'product-1', status: 'scheduled' },
      { batchId: 'batch-old', batchPosition: 1, productId: 'product-2', status: 'scheduled' },
    ];

    expect(reviewEmailBatchMembershipChanged('batch-new', existing, members)).toBe(true);
    expect(reviewEmailBatchMembershipChanged('batch-old', existing, members)).toBe(true);
  });
});
