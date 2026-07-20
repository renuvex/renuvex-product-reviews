import { addDays } from '@/lib/review-email/time';
import { CLOSED_ORDER_LINE_STATUSES, CLOSED_ORDER_PACKAGE_STATUSES, DEFAULT_TOKEN_EXPIRES_DAYS } from '@/lib/review-email/constants';
import type { EffectiveReviewEmailSettings } from '@/lib/review-email/settings';

export type NormalizedOrderPackage = {
  id: string;
  status: string;
  orderLineItemIds: string[];
  updatedAt: Date | null;
};

export type NormalizedOrderLine = {
  id: string;
  productId: string;
  variantId: string | null;
  status: string;
  statusUpdatedAt: Date | null;
  quantity: number | null;
  productName: string | null;
  variantName: string | null;
};

export type NormalizedOrder = {
  storeId: string;
  authorizedAppId: string;
  ikasOrderId: string;
  orderNumber: string | null;
  shippingMethod: string;
  orderStatus: string;
  orderPackageStatus: string | null;
  orderPaymentStatus: string | null;
  orderedAt: Date | null;
  updatedAt: Date | null;
  notificationsAccepted: boolean | null;
  guestCheckout: boolean | null;
  customerId: string | null;
  customerEmailHash: string | null;
  customerEmailFoldedHash: string | null;
  customerEmailHashKeyVersion: number | null;
  customerEmailNormalizationVersion: number;
  customerEmailLookupHashes: string[];
  customerEmailExactLookupHashes: string[];
  customerEmailEncrypted: string | null;
  lines: NormalizedOrderLine[];
  packages: NormalizedOrderPackage[];
};

export type LineEligibility =
  | {
      eligible: true;
      eligibleAt: Date;
      packageId: string | null;
      packageStatus: string | null;
    }
  | {
      eligible: false;
      reason: string;
      packageId: string | null;
      packageStatus: string | null;
    };

function packagesForLine(order: NormalizedOrder, lineId: string): NormalizedOrderPackage[] {
  return order.packages
    .filter((pkg) => pkg.orderLineItemIds.includes(lineId))
    .sort((left, right) => left.id.localeCompare(right.id));
}

function closedReason(order: NormalizedOrder, line: NormalizedOrderLine): string | null {
  if (CLOSED_ORDER_LINE_STATUSES.has(line.status)) return `line_${line.status.toLowerCase()}`;
  if (order.orderStatus === 'CANCELLED' || order.orderStatus === 'REFUNDED') {
    return `order_${order.orderStatus.toLowerCase()}`;
  }
  return null;
}

export function evaluateLineEligibility(
  order: NormalizedOrder,
  line: NormalizedOrderLine,
  eligibilityStartsAt: Date,
): LineEligibility {
  const packages = packagesForLine(order, line.id);
  const activePackages = packages.filter((pkg) => !CLOSED_ORDER_PACKAGE_STATUSES.has(pkg.status));
  const pkg = activePackages.length === 1 ? activePackages[0]! : packages[0] ?? null;
  const packageId = pkg?.id ?? null;
  const packageStatus = pkg?.status ?? null;
  const reason = closedReason(order, line);
  if (reason) return { eligible: false, reason, packageId, packageStatus };

  if (!order.customerEmailHash) return { eligible: false, reason: 'missing_customer_email', packageId, packageStatus };
  if (order.orderPaymentStatus === 'FAILED') {
    return { eligible: false, reason: 'payment_failed', packageId, packageStatus };
  }

  if (!['SHIPMENT', 'CLICK_AND_COLLECT', 'DIGITAL_DELIVERY', 'NO_SHIPMENT'].includes(order.shippingMethod)) {
    return { eligible: false, reason: 'unsupported_shipping_method', packageId, packageStatus };
  }

  if (activePackages.length > 1) {
    return { eligible: false, reason: 'ambiguous_package_membership', packageId, packageStatus };
  }
  if (activePackages.length === 0) {
    const closedPackage = packages.find((candidate) => CLOSED_ORDER_PACKAGE_STATUSES.has(candidate.status));
    return {
      eligible: false,
      reason: closedPackage ? `package_${closedPackage.status.toLowerCase()}` : 'package_evidence_incomplete',
      packageId: closedPackage?.id ?? null,
      packageStatus: closedPackage?.status ?? null,
    };
  }
  if (line.status !== 'DELIVERED') return { eligible: false, reason: 'line_not_delivered', packageId, packageStatus };
  if (pkg?.status !== 'DELIVERED') return { eligible: false, reason: 'package_not_delivered', packageId, packageStatus };
  if (!line.statusUpdatedAt) return { eligible: false, reason: 'missing_exact_delivery_timestamp', packageId, packageStatus };
  if (line.statusUpdatedAt < eligibilityStartsAt) {
    return { eligible: false, reason: 'delivery_before_email_activation', packageId, packageStatus };
  }
  return { eligible: true, eligibleAt: line.statusUpdatedAt, packageId, packageStatus };
}

export function firstRequestSendAfter(eligibleAt: Date, settings: Pick<EffectiveReviewEmailSettings, 'firstDelayDays'>): Date {
  return addDays(eligibleAt, settings.firstDelayDays);
}

export function reminderSendAfter(firstSentAt: Date, settings: Pick<EffectiveReviewEmailSettings, 'reminderDelayDays'>): Date {
  return addDays(firstSentAt, settings.reminderDelayDays);
}

export function initialRequestExpiresAt(sendAfter: Date): Date {
  return addDays(sendAfter, DEFAULT_TOKEN_EXPIRES_DAYS);
}
