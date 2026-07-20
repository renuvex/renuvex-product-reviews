import { describe, expect, it } from 'vitest';
import {
  buildReviewEmailDeliveryGroupKey,
  buildReviewEmailDeliveryGroups,
  reviewEmailBatchMembershipChanged,
} from '@/lib/review-email/batching';
import type { NormalizedOrder, NormalizedOrderLine } from '@/lib/review-email/eligibility';

const ELIGIBILITY_STARTS_AT = new Date('2026-07-01T00:00:00.000Z');

function buildGroups(
  value: NormalizedOrder,
  input: {
    eligibleAtByLineId?: ReadonlyMap<string, Date | null>;
    ineligibleReasonByLineId?: ReadonlyMap<string, string | null>;
  } = {},
) {
  return buildReviewEmailDeliveryGroups(value, { eligibilityStartsAt: ELIGIBILITY_STARTS_AT, ...input });
}

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
    const result = buildGroups(order(lines));

    expect(result.groups).toHaveLength(1);
    expect(result.groups[0]).toMatchObject({
      deliveryGroupKey: buildReviewEmailDeliveryGroupKey(lines.map((item) => item.id)),
      groupingMode: 'package',
    });
    expect(result.groups[0]!.members).toHaveLength(20);
    expect(new Set(result.groups[0]!.members.map((member) => member.productId)).size).toBe(20);
  });

  it('groups twenty delivered products split ten-by-ten into two package batches', () => {
    const lines = Array.from({ length: 20 }, (_, index) => line(`line-${index + 1}`, `product-${index + 1}`));
    const result = buildGroups(order(lines, {
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

    const productsByGroup = new Map(result.groups.map((group) => [
      group.deliveryGroupKey,
      group.members.map((member) => member.productId),
    ]));
    expect(productsByGroup.get(buildReviewEmailDeliveryGroupKey(lines.slice(0, 10).map((item) => item.id)))).toEqual(
      Array.from({ length: 10 }, (_, index) => `product-${index + 1}`),
    );
    expect(productsByGroup.get(buildReviewEmailDeliveryGroupKey(lines.slice(10).map((item) => item.id)))).toEqual(
      Array.from({ length: 10 }, (_, index) => `product-${index + 11}`),
    );
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
    const result = buildGroups(order(lines));

    expect(result.groups[0]!.members).toEqual([
      expect.objectContaining({ productId: 'product-1', sourceLineItemIds: ['line-1', 'line-2'] }),
    ]);
  });

  it('waits for every split package before assigning one product request', () => {
    const lines = [
      line('line-1', 'product-1'),
      line('line-2', 'product-1', { status: 'SHIPPED' }),
    ];
    const result = buildGroups(order(lines, {
      orderPackageStatus: 'PARTIALLY_DELIVERED',
      packages: [
        { id: 'package-1', status: 'DELIVERED', orderLineItemIds: ['line-1'], updatedAt: new Date('2026-07-10T09:00:00.000Z') },
        { id: 'package-2', status: 'SHIPPED', orderLineItemIds: ['line-2'], updatedAt: new Date('2026-07-10T11:00:00.000Z') },
      ],
    }));

    expect(result.groups).toHaveLength(0);
    expect(result.productReasons.get('product-1')).toBe('line_not_delivered');
  });

  it('does not create a batch without exact package membership', () => {
    const firstEligibleAt = new Date('2026-07-02T08:00:00.000Z');
    const lines = [line('line-1', 'product-1')];
    const result = buildGroups(
      order(lines, { packages: [] }),
      { eligibleAtByLineId: new Map([['line-1', firstEligibleAt]]) },
    );

    expect(result.groups).toEqual([]);
    expect(result.productReasons.get('product-1')).toBe('package_evidence_incomplete');
  });

  it('uses delivered package and line evidence for digital and no-shipment orders', () => {
    const lines = [line('line-1', 'product-1')];
    expect(buildGroups(order(lines, { shippingMethod: 'DIGITAL_DELIVERY' })).groups).toHaveLength(1);
    expect(buildGroups(order(lines, { shippingMethod: 'NO_SHIPMENT' })).groups).toHaveLength(1);
  });

  it('keeps the delivery-group key stable when ikas recreates a package with the same lines', () => {
    const lines = [line('line-2', 'product-2'), line('line-1', 'product-1')];
    const first = buildGroups(order(lines, {
      packages: [{
        id: 'old-package-id',
        status: 'DELIVERED',
        orderLineItemIds: ['line-2', 'line-1'],
        updatedAt: new Date('2026-07-10T09:00:00.000Z'),
      }],
    }));
    const recreated = buildGroups(order(lines, {
      packages: [{
        id: 'new-package-id',
        status: 'DELIVERED',
        orderLineItemIds: ['line-1', 'line-2', 'line-1'],
        updatedAt: new Date('2026-08-01T09:00:00.000Z'),
      }],
    }));

    expect(first.groups[0]?.deliveryGroupKey).toBe(recreated.groups[0]?.deliveryGroupKey);
  });

  it('fails closed with missing_customer_email even after package delivery', () => {
    const lines = [line('line-1', 'product-1'), line('line-2', 'product-2')];
    const result = buildGroups(order(lines, {
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
    const members = buildGroups(order([line('line-1', 'product-1')])).groups[0]!.members;

    expect(reviewEmailBatchMembershipChanged('batch-1', [{
      batchId: 'batch-1',
      batchPosition: 0,
      productId: 'product-1',
      status: 'scheduled',
    }], members)).toBe(false);
  });

  it('detects product moves and removals that must invalidate prepared attempts', () => {
    const members = buildGroups(order([line('line-1', 'product-1')])).groups[0]!.members;
    const existing = [
      { batchId: 'batch-old', batchPosition: 0, productId: 'product-1', status: 'scheduled' },
      { batchId: 'batch-old', batchPosition: 1, productId: 'product-2', status: 'scheduled' },
    ];

    expect(reviewEmailBatchMembershipChanged('batch-new', existing, members)).toBe(true);
    expect(reviewEmailBatchMembershipChanged('batch-old', existing, members)).toBe(true);
  });

  it('does not turn an explicit null line-evidence row into package or order fallback evidence', () => {
    const lines = [line('line-1', 'product-1', { statusUpdatedAt: null })];
    const result = buildGroups(order(lines, {
      updatedAt: new Date('2026-08-01T00:00:00.000Z'),
      packages: [{
        id: 'package-1',
        status: 'DELIVERED',
        orderLineItemIds: ['line-1'],
        updatedAt: new Date('2026-08-01T00:00:00.000Z'),
      }],
    }), {
      eligibleAtByLineId: new Map([['line-1', null]]),
      ineligibleReasonByLineId: new Map([['line-1', 'missing_exact_delivery_timestamp']]),
    });

    expect(result.groups).toEqual([]);
    expect(result.productReasons.get('product-1')).toBe('missing_exact_delivery_timestamp');
  });

  it('does not reuse persisted line evidence from an earlier activation epoch', () => {
    const result = buildGroups(order([line('line-1', 'product-1')]), {
      eligibleAtByLineId: new Map([['line-1', new Date('2026-06-30T23:59:59.000Z')]]),
      ineligibleReasonByLineId: new Map([['line-1', null]]),
    });

    expect(result.groups).toEqual([]);
    expect(result.productReasons.get('product-1')).toBe('delivery_before_email_activation');
  });

  it('uses the latest exact line timestamp when one product spans required lines', () => {
    const first = line('line-1', 'product-1', { statusUpdatedAt: new Date('2026-07-05T08:00:00.000Z') });
    const last = line('line-2', 'product-1', { statusUpdatedAt: new Date('2026-07-07T12:00:00.000Z') });
    const result = buildGroups(order([first, last]));

    expect(result.groups[0]?.members[0]?.eligibleAt).toEqual(last.statusUpdatedAt);
    expect(result.groups[0]?.eligibleAt).toEqual(last.statusUpdatedAt);
  });

  it('waits when any required line lacks exact terminal evidence', () => {
    const lines = [
      line('line-1', 'product-1'),
      line('line-2', 'product-1', { statusUpdatedAt: null }),
    ];
    const result = buildGroups(order(lines));

    expect(result.groups).toEqual([]);
    expect(result.productReasons.get('product-1')).toBe('missing_exact_delivery_timestamp');
  });
});
