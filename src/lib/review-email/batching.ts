import { createHash } from 'node:crypto';
import { CLOSED_ORDER_LINE_STATUSES, CLOSED_ORDER_PACKAGE_STATUSES } from '@/lib/review-email/constants';
import { canonicalizeJson } from '@/lib/review-email/canonical-json';
import {
  evaluateLineEligibility,
  type NormalizedOrder,
  type NormalizedOrderLine,
  type NormalizedOrderPackage,
} from '@/lib/review-email/eligibility';

export type ReviewEmailBatchMember = {
  productId: string;
  representativeLine: NormalizedOrderLine;
  sourceLineItemIds: string[];
  eligibleAt: Date;
  position: number;
};

export type ReviewEmailDeliveryGroup = {
  deliveryGroupKey: string;
  groupingMode: 'package';
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

function activePackagesForLine(order: NormalizedOrder, lineId: string): NormalizedOrderPackage[] {
  return order.packages
    .filter((pkg) => pkg.orderLineItemIds.includes(lineId) && !CLOSED_ORDER_PACKAGE_STATUSES.has(pkg.status))
    .sort((left, right) => left.id.localeCompare(right.id));
}

export function buildReviewEmailDeliveryGroupKey(orderLineItemIds: readonly string[]): string {
  const sortedLineIds = [...new Set(orderLineItemIds)].sort();
  const canonical = canonicalizeJson({
    schemaVersion: 1,
    orderLineItemIds: sortedLineIds,
  });
  return `package-lines-v1:${createHash('sha256').update(canonical, 'utf8').digest('hex')}`;
}

export function buildReviewEmailDeliveryGroups(
  order: NormalizedOrder,
  input: {
    eligibilityStartsAt: Date;
    eligibleAtByLineId?: ReadonlyMap<string, Date | null>;
    ineligibleReasonByLineId?: ReadonlyMap<string, string | null>;
  },
): ReviewEmailGroupingResult {
  const productReasons = new Map<string, string>();
  if (!['SHIPMENT', 'CLICK_AND_COLLECT', 'DIGITAL_DELIVERY', 'NO_SHIPMENT'].includes(order.shippingMethod)) {
    for (const line of order.lines) productReasons.set(line.productId, 'unsupported_shipping_method');
    return { groups: [], productReasons };
  }
  if (!order.customerEmailHash) {
    for (const line of order.lines) productReasons.set(line.productId, 'missing_customer_email');
    return { groups: [], productReasons };
  }

  const productLines = new Map<string, Array<{ line: NormalizedOrderLine; orderPosition: number }>>();
  order.lines.forEach((line, orderPosition) => {
    if (CLOSED_ORDER_LINE_STATUSES.has(line.status)) return;
    const entries = productLines.get(line.productId) ?? [];
    entries.push({ line, orderPosition });
    productLines.set(line.productId, entries);
  });

  const groupedMembers = new Map<string, { groupingMode: 'package'; members: ReviewEmailBatchMember[] }>();

  for (const [productId, entries] of productLines) {
    const packageSets = entries.map(({ line }) => activePackagesForLine(order, line.id));
    if (packageSets.some((packages) => packages.length > 1)) {
      productReasons.set(productId, 'ambiguous_package_membership');
      continue;
    }

    if (packageSets.some((packages) => packages.length === 0)) {
      productReasons.set(productId, 'package_evidence_incomplete');
      continue;
    }

    const eligibility = entries.map(({ line }) => {
      const persistedEvidence = input.eligibleAtByLineId?.has(line.id)
        ? input.eligibleAtByLineId.get(line.id) ?? null
        : line.statusUpdatedAt;
      const evaluated = evaluateLineEligibility(
        order,
        { ...line, statusUpdatedAt: persistedEvidence },
        input.eligibilityStartsAt,
      );
      if (input.eligibleAtByLineId?.has(line.id)) {
        return {
          eligibleAt: evaluated.eligible ? evaluated.eligibleAt : null,
          reason: evaluated.eligible
            ? null
            : input.ineligibleReasonByLineId?.get(line.id) ?? evaluated.reason,
        };
      }
      return evaluated.eligible
        ? { eligibleAt: evaluated.eligibleAt, reason: null }
        : { eligibleAt: null, reason: evaluated.reason };
    });
    const ineligible = eligibility.find((entry) => !entry.eligibleAt);
    if (ineligible) {
      productReasons.set(productId, ineligible.reason ?? 'missing_exact_delivery_timestamp');
      continue;
    }

    const eligibleAt = eligibility
      .map((entry) => entry.eligibleAt!)
      .sort((left, right) => right.getTime() - left.getTime())[0]!;
    const owner = entries
      .map((entry, index) => ({
        package: packageSets[index]![0]!,
        eligibleAt: eligibility[index]!.eligibleAt!,
      }))
      .sort((left, right) => (
        right.eligibleAt.getTime() - left.eligibleAt.getTime() ||
        buildReviewEmailDeliveryGroupKey(left.package.orderLineItemIds)
          .localeCompare(buildReviewEmailDeliveryGroupKey(right.package.orderLineItemIds))
      ))[0]!.package;
    const deliveryGroupKey = buildReviewEmailDeliveryGroupKey(owner.orderLineItemIds);
    const representative = [...entries].sort((left, right) => left.orderPosition - right.orderPosition || left.line.id.localeCompare(right.line.id))[0]!;
    const member: ReviewEmailBatchMember = {
      productId,
      representativeLine: representative.line,
      sourceLineItemIds: entries.map(({ line }) => line.id).sort(),
      eligibleAt,
      position: representative.orderPosition,
    };
    const group = groupedMembers.get(deliveryGroupKey) ?? { groupingMode: 'package' as const, members: [] };
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
