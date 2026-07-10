import { addDays } from '@/lib/review-email/time';
import {
  CLOSED_ORDER_LINE_STATUSES,
  CLOSED_ORDER_PACKAGE_STATUSES,
  DEFAULT_TOKEN_EXPIRES_DAYS,
} from '@/lib/review-email/constants';
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

function packageForLine(order: NormalizedOrder, lineId: string): NormalizedOrderPackage | null {
  return order.packages.find((pkg) => pkg.orderLineItemIds.includes(lineId)) ?? null;
}

function fallbackEventTime(order: NormalizedOrder, line: NormalizedOrderLine, pkg: NormalizedOrderPackage | null, now: Date): Date {
  return line.statusUpdatedAt ?? pkg?.updatedAt ?? order.updatedAt ?? order.orderedAt ?? now;
}

function closedReason(order: NormalizedOrder, line: NormalizedOrderLine): string | null {
  if (CLOSED_ORDER_LINE_STATUSES.has(line.status)) return `line_${line.status.toLowerCase()}`;
  if (order.orderPackageStatus && CLOSED_ORDER_PACKAGE_STATUSES.has(order.orderPackageStatus)) {
    return `order_${order.orderPackageStatus.toLowerCase()}`;
  }
  if (order.orderStatus === 'CANCELLED' || order.orderStatus === 'REFUNDED' || order.orderStatus === 'PARTIALLY_REFUNDED') {
    return `order_${order.orderStatus.toLowerCase()}`;
  }
  return null;
}

export function evaluateLineEligibility(order: NormalizedOrder, line: NormalizedOrderLine, now = new Date()): LineEligibility {
  const pkg = packageForLine(order, line.id);
  const packageId = pkg?.id ?? null;
  const packageStatus = pkg?.status ?? null;
  const reason = closedReason(order, line);
  if (reason) return { eligible: false, reason, packageId, packageStatus };

  if (!order.customerEmailHash) return { eligible: false, reason: 'missing_customer_email', packageId, packageStatus };
  if (order.notificationsAccepted !== true) return { eligible: false, reason: 'notifications_not_accepted', packageId, packageStatus };

  if (order.shippingMethod === 'SHIPMENT') {
    if (line.status === 'DELIVERED' || pkg?.status === 'DELIVERED' || order.orderPackageStatus === 'DELIVERED') {
      return {
        eligible: true,
        eligibleAt: fallbackEventTime(order, line, pkg, now),
        packageId,
        packageStatus,
      };
    }
    return { eligible: false, reason: 'shipment_not_delivered', packageId, packageStatus };
  }

  if (order.shippingMethod === 'CLICK_AND_COLLECT') {
    if (pkg?.status === 'READY_FOR_PICK_UP' || order.orderPackageStatus === 'READY_FOR_PICK_UP') {
      return {
        eligible: true,
        eligibleAt: fallbackEventTime(order, line, pkg, now),
        packageId,
        packageStatus,
      };
    }
    return { eligible: false, reason: 'pickup_not_ready', packageId, packageStatus };
  }

  if (order.shippingMethod === 'DIGITAL_DELIVERY' || order.shippingMethod === 'NO_SHIPMENT') {
    return { eligible: false, reason: 'shipping_method_disabled', packageId, packageStatus };
  }

  return { eligible: false, reason: 'unsupported_shipping_method', packageId, packageStatus };
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
