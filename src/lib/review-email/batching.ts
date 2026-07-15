import { CLOSED_ORDER_LINE_STATUSES, CLOSED_ORDER_PACKAGE_STATUSES } from '@/lib/review-email/constants';
import type { NormalizedOrder, NormalizedOrderLine, NormalizedOrderPackage } from '@/lib/review-email/eligibility';

export type ReviewEmailBatchMember = {
  productId: string;
  representativeLine: NormalizedOrderLine;
  sourceLineItemIds: string[];
  eligibleAt: Date;
  position: number;
};

export type ReviewEmailDeliveryGroup = {
  deliveryGroupKey: string;
  groupingMode: 'package' | 'order_complete';
  eligibleAt: Date;
  members: ReviewEmailBatchMember[];
};

export type ReviewEmailGroupingResult = {
  groups: ReviewEmailDeliveryGroup[];
  productReasons: ReadonlyMap<string, string>;
};

export type ExistingReviewEmailBatchMember = {
  batchId: string | null;
  batchPosition: number | null;
  productId: string;
  status: string;
};

const ACTIVE_MEMBERSHIP_REQUEST_STATUSES = new Set(['scheduled', 'sending', 'sent', 'sent_unknown', 'error']);

export function reviewEmailBatchMembershipChanged(
  batchId: string,
  existing: readonly ExistingReviewEmailBatchMember[],
  desired: readonly ReviewEmailBatchMember[],
): boolean {
  const activeByProduct = new Set(
    existing
      .filter((request) => ACTIVE_MEMBERSHIP_REQUEST_STATUSES.has(request.status))
      .map((request) => request.productId),
  );
  const existingByProduct = new Set(existing.map((request) => request.productId));
  const currentKeys = existing
    .filter((request) => request.batchId === batchId && ACTIVE_MEMBERSHIP_REQUEST_STATUSES.has(request.status))
    .map((request) => `${request.productId}:${request.batchPosition ?? -1}`)
    .sort();
  const desiredKeys = desired
    .filter((member) => !existingByProduct.has(member.productId) || activeByProduct.has(member.productId))
    .map((member) => `${member.productId}:${member.position}`)
    .sort();
  return currentKeys.length !== desiredKeys.length || currentKeys.some((key, index) => key !== desiredKeys[index]);
}

function evidenceAt(order: NormalizedOrder, line: NormalizedOrderLine, packages: NormalizedOrderPackage[], now: Date): Date {
  const packageTime = packages
    .map((pkg) => pkg.updatedAt)
    .filter((value): value is Date => Boolean(value))
    .sort((left, right) => right.getTime() - left.getTime())[0];
  return line.statusUpdatedAt ?? packageTime ?? order.updatedAt ?? order.orderedAt ?? now;
}

function activePackagesForLine(order: NormalizedOrder, lineId: string): NormalizedOrderPackage[] {
  return order.packages
    .filter((pkg) => pkg.orderLineItemIds.includes(lineId) && !CLOSED_ORDER_PACKAGE_STATUSES.has(pkg.status))
    .sort((left, right) => left.id.localeCompare(right.id));
}

function lastDeliveredPackage(packages: NormalizedOrderPackage[]): NormalizedOrderPackage {
  return [...packages].sort((left, right) => {
    const time = (right.updatedAt?.getTime() ?? 0) - (left.updatedAt?.getTime() ?? 0);
    return time || right.id.localeCompare(left.id);
  })[0]!;
}

function allShipmentLinesTerminalDelivered(order: NormalizedOrder): boolean {
  const active = order.lines.filter((line) => !CLOSED_ORDER_LINE_STATUSES.has(line.status));
  return active.length > 0 && active.every((line) => line.status === 'DELIVERED') && order.orderPackageStatus === 'DELIVERED';
}

export function buildReviewEmailDeliveryGroups(
  order: NormalizedOrder,
  now = new Date(),
  input: { eligibleAtByLineId?: ReadonlyMap<string, Date | null> } = {},
): ReviewEmailGroupingResult {
  const productReasons = new Map<string, string>();
  if (order.shippingMethod === 'DIGITAL_DELIVERY' || order.shippingMethod === 'NO_SHIPMENT') {
    for (const line of order.lines) productReasons.set(line.productId, 'shipping_method_disabled');
    return { groups: [], productReasons };
  }
  if (order.shippingMethod !== 'SHIPMENT' && order.shippingMethod !== 'CLICK_AND_COLLECT') {
    for (const line of order.lines) productReasons.set(line.productId, 'unsupported_shipping_method');
    return { groups: [], productReasons };
  }
  if (!order.customerEmailHash || order.notificationsAccepted !== true) {
    const reason = order.customerEmailHash ? 'notifications_not_accepted' : 'missing_customer_email';
    for (const line of order.lines) productReasons.set(line.productId, reason);
    return { groups: [], productReasons };
  }

  const productLines = new Map<string, Array<{ line: NormalizedOrderLine; orderPosition: number }>>();
  order.lines.forEach((line, orderPosition) => {
    if (CLOSED_ORDER_LINE_STATUSES.has(line.status)) return;
    const entries = productLines.get(line.productId) ?? [];
    entries.push({ line, orderPosition });
    productLines.set(line.productId, entries);
  });

  const groupedMembers = new Map<string, { groupingMode: 'package' | 'order_complete'; members: ReviewEmailBatchMember[] }>();
  const safeOrderFallback = order.shippingMethod === 'SHIPMENT'
    ? allShipmentLinesTerminalDelivered(order)
    : order.orderPackageStatus === 'READY_FOR_PICK_UP';

  for (const [productId, entries] of productLines) {
    const packageSets = entries.map(({ line }) => activePackagesForLine(order, line.id));
    if (packageSets.some((packages) => packages.length > 1)) {
      productReasons.set(productId, 'ambiguous_package_membership');
      continue;
    }

    const packages = [...new Map(packageSets.flat().map((pkg) => [pkg.id, pkg])).values()];
    const expectedStatus = order.shippingMethod === 'SHIPMENT' ? 'DELIVERED' : 'READY_FOR_PICK_UP';
    const allLinesReady = entries.every(({ line }, index) => {
      const pkg = packageSets[index]?.[0];
      return line.status === 'DELIVERED' || pkg?.status === expectedStatus;
    });
    if (!allLinesReady) {
      productReasons.set(productId, order.shippingMethod === 'SHIPMENT' ? 'shipment_not_delivered' : 'pickup_not_ready');
      continue;
    }

    let deliveryGroupKey: string;
    let groupingMode: 'package' | 'order_complete';
    if (packages.length > 0 && packageSets.every((set) => set.length === 1)) {
      const owner = lastDeliveredPackage(packages);
      deliveryGroupKey = `package:${owner.id}`;
      groupingMode = 'package';
    } else if (packages.length === 0 && safeOrderFallback) {
      deliveryGroupKey = 'order:complete';
      groupingMode = 'order_complete';
    } else {
      productReasons.set(productId, 'package_evidence_incomplete');
      continue;
    }

    const eligibleAt = entries
      .map(({ line }, index) => input.eligibleAtByLineId?.get(line.id) ?? evidenceAt(order, line, packageSets[index] ?? [], now))
      .sort((left, right) => right.getTime() - left.getTime())[0]!;
    const representative = [...entries].sort((left, right) => left.orderPosition - right.orderPosition || left.line.id.localeCompare(right.line.id))[0]!;
    const member: ReviewEmailBatchMember = {
      productId,
      representativeLine: representative.line,
      sourceLineItemIds: entries.map(({ line }) => line.id).sort(),
      eligibleAt,
      position: representative.orderPosition,
    };
    const group = groupedMembers.get(deliveryGroupKey) ?? { groupingMode, members: [] };
    group.members.push(member);
    groupedMembers.set(deliveryGroupKey, group);
  }

  const groups = [...groupedMembers.entries()]
    .map(([deliveryGroupKey, group]) => ({
      deliveryGroupKey,
      groupingMode: group.groupingMode,
      eligibleAt: [...group.members].sort((left, right) => right.eligibleAt.getTime() - left.eligibleAt.getTime())[0]!.eligibleAt,
      members: group.members.sort((left, right) => left.position - right.position || left.productId.localeCompare(right.productId)),
    }))
    .sort((left, right) => left.eligibleAt.getTime() - right.eligibleAt.getTime() || left.deliveryGroupKey.localeCompare(right.deliveryGroupKey));

  return { groups, productReasons };
}
