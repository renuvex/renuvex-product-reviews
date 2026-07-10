import { createHash, randomUUID } from 'node:crypto';
import { getRedirectUri } from '@/helpers/api-helpers';
import type {
  ikasAdminGraphQLAPIClient,
  ListOrdersForReviewRequestsQueryData,
  SaveOrderWebhooksMutationData,
} from '@/lib/ikas-client/generated/graphql';
import type { AuthToken } from '@/models/auth-token';
import { prisma } from '@/lib/prisma';
import type { Prisma, PrismaClient } from '@prisma/client';
import {
  REVIEW_EMAIL_RECONCILIATION_INITIAL_LOOKBACK_DAYS,
  REVIEW_EMAIL_RECONCILIATION_LEASE_MINUTES,
  REVIEW_EMAIL_RECONCILIATION_OVERLAP_MINUTES,
  REVIEW_EMAIL_WEBHOOK_SCOPES,
} from '@/lib/review-email/constants';
import {
  evaluateLineEligibility,
  firstRequestSendAfter,
  initialRequestExpiresAt,
  type NormalizedOrder,
  type NormalizedOrderLine,
  type NormalizedOrderPackage,
} from '@/lib/review-email/eligibility';
import { getEffectiveReviewEmailSettings } from '@/lib/review-email/settings';
import { protectedEmail } from '@/lib/review-email/pii';
import { timestampToDate } from '@/lib/review-email/time';
import { cancelPendingReviewEmailJobs } from '@/lib/review-email/jobs';

type IkasClient = ikasAdminGraphQLAPIClient<AuthToken>;
type IkasOrder = ListOrdersForReviewRequestsQueryData['data'][number];
type LifecycleDb = PrismaClient;

export type OrderReviewSyncResult = {
  orderId: string;
  linesSeen: number;
  requestsScheduled: number;
  requestsCancelled: number;
};

function asString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  return text ? text : null;
}

export function digestPayload(rawBody: string): string {
  return createHash('sha256').update(rawBody, 'utf8').digest('hex');
}

export function getOrderIdFromWebhookData(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const record = data as Record<string, unknown>;
  return (
    asString(record.id) ||
    asString(record.orderId) ||
    asString(record.orderID) ||
    getOrderIdFromWebhookData(record.order)
  );
}

export function buildOrderWebhookEndpoint(host: string) {
  const configuredOrigin = process.env.NEXT_PUBLIC_DEPLOY_URL?.trim();
  const origin = configuredOrigin || getRedirectUri(host);
  return new URL('/api/webhooks/ikas/orders', origin).toString();
}

export async function registerOrderWebhooks(ikas: IkasClient, endpoint: string): Promise<SaveOrderWebhooksMutationData> {
  const response = await ikas.mutations.saveOrderWebhooks({
    input: {
      endpoint,
      scopes: [...REVIEW_EMAIL_WEBHOOK_SCOPES],
    },
  });

  if (!response.isSuccess || !response.data?.saveWebhooks) {
    throw new Error('Failed to register ikas order webhooks');
  }

  return response.data.saveWebhooks;
}

export async function fetchIkasOrderForReviewRequest(ikas: IkasClient, orderId: string): Promise<IkasOrder | null> {
  const response = await ikas.queries.listOrdersForReviewRequests({
    id: { eq: orderId },
    pagination: { limit: 1, page: 1 },
  });
  if (!response.isSuccess) {
    throw new Error('Failed to list ikas order for review request');
  }
  return response.data?.listOrder?.data?.[0] ?? null;
}

function normalizePackages(order: IkasOrder): NormalizedOrderPackage[] {
  return (order.orderPackages ?? [])
    .filter((pkg) => !pkg.deleted)
    .map((pkg) => ({
      id: pkg.id,
      status: String(pkg.orderPackageFulfillStatus),
      orderLineItemIds: pkg.orderLineItemIds,
      updatedAt: timestampToDate(pkg.updatedAt),
    }));
}

function normalizeLines(order: IkasOrder): NormalizedOrderLine[] {
  return order.orderLineItems
    .filter((line) => !line.deleted && typeof line.variant.productId === 'string' && line.variant.productId.length > 0)
    .map((line) => ({
      id: line.id,
      productId: line.variant.productId!,
      variantId: line.variant.id ?? null,
      status: String(line.status),
      statusUpdatedAt: timestampToDate(line.statusUpdatedAt),
      quantity: Number.isFinite(line.quantity) ? line.quantity : null,
      productName: null,
      variantName: line.variant.name ?? null,
    }));
}

export function normalizeIkasOrderForReviewRequests(input: {
  storeId: string;
  authorizedAppId: string;
  order: IkasOrder;
}): NormalizedOrder {
  const protectedCustomerEmail = protectedEmail(input.order.customer?.email);
  return {
    storeId: input.storeId,
    authorizedAppId: input.authorizedAppId,
    ikasOrderId: input.order.id,
    orderNumber: input.order.orderNumber ?? null,
    shippingMethod: String(input.order.shippingMethod),
    orderStatus: String(input.order.status),
    orderPackageStatus: input.order.orderPackageStatus ? String(input.order.orderPackageStatus) : null,
    orderPaymentStatus: input.order.orderPaymentStatus ? String(input.order.orderPaymentStatus) : null,
    orderedAt: timestampToDate(input.order.orderedAt),
    updatedAt: timestampToDate(input.order.updatedAt),
    notificationsAccepted: input.order.customer?.notificationsAccepted ?? null,
    guestCheckout: input.order.customer?.isGuestCheckout ?? null,
    customerId: input.order.customer?.id ?? input.order.customerId ?? null,
    customerEmailHash: protectedCustomerEmail?.hash ?? null,
    customerEmailEncrypted: protectedCustomerEmail?.encrypted ?? null,
    lines: normalizeLines(input.order),
    packages: normalizePackages(input.order),
  };
}

async function cancelRequestForLine(
  tx: Prisma.TransactionClient,
  lineSnapshotId: string,
  reason: string,
  now: Date,
): Promise<boolean> {
  const request = await tx.reviewRequest.findFirst({
    where: {
      orderLineSnapshotId: lineSnapshotId,
      status: { in: ['scheduled', 'sending', 'sent', 'sent_unknown', 'error'] },
    },
    select: { id: true },
  });
  if (!request) return false;
  const cancelled = await tx.reviewRequest.updateMany({
    where: { id: request.id, status: { in: ['scheduled', 'sending', 'sent', 'sent_unknown', 'error'] } },
    data: { status: reason === 'suppressed' ? 'suppressed' : 'cancelled', cancelledAt: now, cancellationReason: reason },
  });
  if (cancelled.count !== 1) return false;
  await cancelPendingReviewEmailJobs(tx, request.id, reason, now);
  await tx.reviewRequestToken.updateMany({
    where: { requestId: request.id, status: { in: ['prepared', 'active'] } },
    data: { status: 'revoked', revokedAt: now, revocationReason: reason },
  });
  await tx.reviewRequestSession.updateMany({
    where: { requestId: request.id, status: 'active' },
    data: { status: 'revoked', revokedAt: now, revocationReason: reason },
  });
  return true;
}

async function hasSuppression(tx: Prisma.TransactionClient, order: NormalizedOrder, now: Date): Promise<boolean> {
  if (!order.customerEmailHash) return false;
  const row = await tx.reviewEmailSuppression.findFirst({
    where: {
      storeId: order.storeId,
      emailHash: order.customerEmailHash,
      releasedAt: null,
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    },
    select: { id: true },
  });
  return Boolean(row);
}

export async function syncIkasOrderForReviewRequests(
  db: LifecycleDb,
  input: {
    storeId: string;
    authorizedAppId: string;
    order: IkasOrder;
    now?: Date;
  },
): Promise<OrderReviewSyncResult> {
  const now = input.now ?? new Date();
  const order = normalizeIkasOrderForReviewRequests(input);
  const settings = await getEffectiveReviewEmailSettings(db, input.storeId);

  return db.$transaction(async (tx) => {
    const orderSnapshot = await tx.ikasOrderSnapshot.upsert({
      where: { storeId_ikasOrderId: { storeId: order.storeId, ikasOrderId: order.ikasOrderId } },
      create: {
        storeId: order.storeId,
        authorizedAppId: order.authorizedAppId,
        ikasOrderId: order.ikasOrderId,
        orderNumber: order.orderNumber,
        shippingMethod: order.shippingMethod,
        orderStatus: order.orderStatus,
        orderPackageStatus: order.orderPackageStatus,
        orderPaymentStatus: order.orderPaymentStatus,
        orderedAt: order.orderedAt,
        ikasUpdatedAt: order.updatedAt,
        notificationsAccepted: order.notificationsAccepted,
        guestCheckout: order.guestCheckout,
        customerId: order.customerId,
        customerEmailHash: order.customerEmailHash,
        customerEmailEncrypted: order.customerEmailEncrypted,
      },
      update: {
        authorizedAppId: order.authorizedAppId,
        orderNumber: order.orderNumber,
        shippingMethod: order.shippingMethod,
        orderStatus: order.orderStatus,
        orderPackageStatus: order.orderPackageStatus,
        orderPaymentStatus: order.orderPaymentStatus,
        orderedAt: order.orderedAt,
        ikasUpdatedAt: order.updatedAt,
        notificationsAccepted: order.notificationsAccepted,
        guestCheckout: order.guestCheckout,
        customerId: order.customerId,
        customerEmailHash: order.customerEmailHash,
        customerEmailEncrypted: order.customerEmailEncrypted,
      },
    });

    const suppressed = await hasSuppression(tx, order, now);
    const existingLineRows = await tx.ikasOrderLineSnapshot.findMany({
      where: { storeId: order.storeId, ikasOrderId: order.ikasOrderId },
      select: { id: true, ikasOrderLineItemId: true, eligibleAt: true },
    });
    const existingLines = new Map(existingLineRows.map((line) => [line.ikasOrderLineItemId, line]));
    const canonicalLineIds = new Set(order.lines.map((line) => line.id));
    let requestsScheduled = 0;
    let requestsCancelled = 0;

    for (const line of order.lines) {
      const eligibility = evaluateLineEligibility(order, line, now);
      const priorLine = existingLines.get(line.id);
      const stableEligibleAt = eligibility.eligible
        ? priorLine?.eligibleAt ?? eligibility.eligibleAt
        : null;
      const lineSnapshot = await tx.ikasOrderLineSnapshot.upsert({
        where: { storeId_ikasOrderLineItemId: { storeId: order.storeId, ikasOrderLineItemId: line.id } },
        create: {
          storeId: order.storeId,
          orderSnapshotId: orderSnapshot.id,
          ikasOrderId: order.ikasOrderId,
          ikasOrderLineItemId: line.id,
          productId: line.productId,
          variantId: line.variantId,
          lineStatus: line.status,
          lineStatusUpdatedAt: line.statusUpdatedAt,
          quantity: line.quantity,
          productName: line.productName,
          variantName: line.variantName,
          packageId: eligibility.packageId,
          packageStatus: eligibility.packageStatus,
          eligibleAt: stableEligibleAt,
          ineligibleReason: eligibility.eligible ? null : eligibility.reason,
        },
        update: {
          orderSnapshotId: orderSnapshot.id,
          ikasOrderId: order.ikasOrderId,
          productId: line.productId,
          variantId: line.variantId,
          lineStatus: line.status,
          lineStatusUpdatedAt: line.statusUpdatedAt,
          quantity: line.quantity,
          productName: line.productName,
          variantName: line.variantName,
          packageId: eligibility.packageId,
          packageStatus: eligibility.packageStatus,
          eligibleAt: stableEligibleAt,
          ineligibleReason: eligibility.eligible ? null : eligibility.reason,
        },
      });

      if (!eligibility.eligible) {
        if (await cancelRequestForLine(tx, lineSnapshot.id, eligibility.reason, now)) requestsCancelled += 1;
        continue;
      }
      if (!stableEligibleAt) {
        if (await cancelRequestForLine(tx, lineSnapshot.id, 'missing_eligibility_timestamp', now)) requestsCancelled += 1;
        continue;
      }
      const existing = await tx.reviewRequest.findUnique({
        where: { storeId_orderLineSnapshotId: { storeId: order.storeId, orderLineSnapshotId: lineSnapshot.id } },
        select: { id: true, status: true, sendAfter: true },
      });
      if (suppressed) {
        if (await cancelRequestForLine(tx, lineSnapshot.id, 'suppressed', now)) requestsCancelled += 1;
        continue;
      }
      if (existing && ['submitted', 'cancelled', 'expired', 'suppressed', 'sent', 'sent_unknown', 'sending'].includes(existing.status)) {
        continue;
      }
      if (!settings.enabled) {
        if (await cancelRequestForLine(tx, lineSnapshot.id, 'store_email_disabled', now)) requestsCancelled += 1;
        continue;
      }

      const sendAfter = existing?.sendAfter ?? firstRequestSendAfter(stableEligibleAt, settings);
      const request = await tx.reviewRequest.upsert({
        where: { storeId_orderLineSnapshotId: { storeId: order.storeId, orderLineSnapshotId: lineSnapshot.id } },
        create: {
          storeId: order.storeId,
          productId: line.productId,
          orderSnapshotId: orderSnapshot.id,
          orderLineSnapshotId: lineSnapshot.id,
          status: 'scheduled',
          eligibleAt: stableEligibleAt,
          sendAfter,
          firstDelayDaysSnapshot: settings.firstDelayDays,
          reminderDelayDaysSnapshot: settings.reminderDelayDays,
          maxReminderCountSnapshot: settings.reminderEnabled ? settings.maxReminderCount : 0,
          triggerModeSnapshot: settings.triggerMode,
          consentModeSnapshot: settings.consentMode,
          notificationsAcceptedSnapshot: order.notificationsAccepted,
          templateVersionSnapshot: settings.templateVersion,
          localeSnapshot: settings.locale,
          recipientEmailHash: order.customerEmailHash,
          recipientEmailEncrypted: order.customerEmailEncrypted,
          expiresAt: initialRequestExpiresAt(sendAfter),
        },
        update: {},
      });

      await tx.reviewEmailJob.upsert({
        where: { requestId_kind_sequence: { requestId: request.id, kind: 'request', sequence: 0 } },
        create: {
          requestId: request.id,
          storeId: order.storeId,
          productId: line.productId,
          kind: 'request',
          sequence: 0,
          status: 'pending',
          sendAfter,
          dedupeKey: `review-email:${request.id}:request:0`,
        },
        update: {},
      });
      if (!existing) requestsScheduled += 1;
    }

    for (const missingLine of existingLineRows.filter((line) => !canonicalLineIds.has(line.ikasOrderLineItemId))) {
      await tx.ikasOrderLineSnapshot.update({
        where: { id: missingLine.id },
        data: { eligibleAt: null, ineligibleReason: 'line_missing_from_canonical_order' },
      });
      if (await cancelRequestForLine(tx, missingLine.id, 'line_missing_from_canonical_order', now)) {
        requestsCancelled += 1;
      }
    }

    return {
      orderId: order.ikasOrderId,
      linesSeen: order.lines.length,
      requestsScheduled,
      requestsCancelled,
    };
  });
}

export type OrderReconciliationLease = {
  storeId: string;
  owner: string;
  version: number;
  windowStart: Date;
  windowEnd: Date;
  nextPage: number;
  leaseExpiresAt: Date;
};

type ReconciliationDb = Pick<PrismaClient, 'ikasOrderReconciliationCursor'>;

export async function acquireOrderReconciliationLease(
  db: ReconciliationDb,
  input: { storeId: string; authorizedAppId: string; owner: string; now?: Date },
): Promise<OrderReconciliationLease | null> {
  const now = input.now ?? new Date();
  const leaseExpiresAt = new Date(now.getTime() + REVIEW_EMAIL_RECONCILIATION_LEASE_MINUTES * 60 * 1000);
  await db.ikasOrderReconciliationCursor.upsert({
    where: { storeId: input.storeId },
    create: {
      storeId: input.storeId,
      authorizedAppId: input.authorizedAppId,
      overlapMinutes: REVIEW_EMAIL_RECONCILIATION_OVERLAP_MINUTES,
      status: 'idle',
    },
    update: {},
  });

  const current = await db.ikasOrderReconciliationCursor.findUniqueOrThrow({
    where: { storeId: input.storeId },
  });
  if (current.leaseExpiresAt && current.leaseExpiresAt > now && current.leaseOwner !== input.owner) {
    return null;
  }

  const overlapMs = current.overlapMinutes * 60 * 1000;
  const defaultStart = new Date(now.getTime() - REVIEW_EMAIL_RECONCILIATION_INITIAL_LOOKBACK_DAYS * 24 * 60 * 60 * 1000);
  const windowStart = current.windowStart ?? new Date((current.lastCheckpointAt ?? defaultStart).getTime() - overlapMs);
  const windowEnd = current.windowEnd ?? now;
  const nextPage = current.windowStart ? current.nextPage : 1;
  const version = current.leaseVersion + 1;
  const claimed = await db.ikasOrderReconciliationCursor.updateMany({
    where: {
      storeId: input.storeId,
      leaseVersion: current.leaseVersion,
      OR: [
        { leaseExpiresAt: null },
        { leaseExpiresAt: { lte: now } },
        { leaseOwner: input.owner },
      ],
    },
    data: {
      authorizedAppId: input.authorizedAppId,
      leaseOwner: input.owner,
      leaseExpiresAt,
      leaseVersion: version,
      windowStart,
      windowEnd,
      nextPage,
      status: 'running',
      lastErrorAt: null,
      lastError: null,
    },
  });
  if (claimed.count !== 1) return null;

  return {
    storeId: input.storeId,
    owner: input.owner,
    version,
    windowStart,
    windowEnd,
    nextPage,
    leaseExpiresAt,
  };
}

async function checkpointOrderReconciliationPage(
  db: ReconciliationDb,
  lease: OrderReconciliationLease,
  nextPage: number,
  now: Date,
): Promise<void> {
  const leaseExpiresAt = new Date(now.getTime() + REVIEW_EMAIL_RECONCILIATION_LEASE_MINUTES * 60 * 1000);
  const updated = await db.ikasOrderReconciliationCursor.updateMany({
    where: {
      storeId: lease.storeId,
      leaseOwner: lease.owner,
      leaseVersion: lease.version,
      status: 'running',
    },
    data: { nextPage, leaseExpiresAt },
  });
  if (updated.count !== 1) throw new Error('review_email_reconciliation_lease_lost');
}

async function completeOrderReconciliationLease(
  db: ReconciliationDb,
  lease: OrderReconciliationLease,
  now: Date,
): Promise<void> {
  const updated = await db.ikasOrderReconciliationCursor.updateMany({
    where: {
      storeId: lease.storeId,
      leaseOwner: lease.owner,
      leaseVersion: lease.version,
      status: 'running',
    },
    data: {
      lastCheckpointAt: lease.windowEnd,
      windowStart: null,
      windowEnd: null,
      nextPage: 1,
      status: 'idle',
      lastSuccessAt: now,
      lastErrorAt: null,
      lastError: null,
      leaseOwner: null,
      leaseExpiresAt: null,
    },
  });
  if (updated.count !== 1) throw new Error('review_email_reconciliation_lease_lost');
}

async function failOrderReconciliationLease(
  db: ReconciliationDb,
  lease: OrderReconciliationLease,
  error: unknown,
  now: Date,
): Promise<void> {
  await db.ikasOrderReconciliationCursor.updateMany({
    where: {
      storeId: lease.storeId,
      leaseOwner: lease.owner,
      leaseVersion: lease.version,
      status: 'running',
    },
    data: {
      status: 'error',
      lastErrorAt: now,
      lastError: (error instanceof Error ? error.message : 'unknown').slice(0, 512),
      leaseOwner: null,
      leaseExpiresAt: null,
    },
  });
}

export async function reconcileIkasOrdersForReviewRequests(
  ikas: IkasClient,
  input: {
    storeId: string;
    authorizedAppId: string;
    limit?: number;
    owner?: string;
    now?: Date;
  },
): Promise<{
  state: 'completed' | 'lease_busy';
  pages: number;
  orders: number;
  requestsScheduled: number;
  requestsCancelled: number;
  windowStart?: Date;
  windowEnd?: Date;
}> {
  const startedAt = input.now ?? new Date();
  const limit = Math.min(Math.max(input.limit ?? 200, 1), 200);
  const lease = await acquireOrderReconciliationLease(prisma, {
    storeId: input.storeId,
    authorizedAppId: input.authorizedAppId,
    owner: input.owner ?? randomUUID(),
    now: startedAt,
  });
  if (!lease) {
    return { state: 'lease_busy', pages: 0, orders: 0, requestsScheduled: 0, requestsCancelled: 0 };
  }

  let page = lease.nextPage;
  let pages = 0;
  let orders = 0;
  let requestsScheduled = 0;
  let requestsCancelled = 0;

  try {
    while (true) {
      const response = await ikas.queries.listOrdersForReviewRequests({
        updatedAt: { gte: lease.windowStart.getTime(), lte: lease.windowEnd.getTime() },
        pagination: { limit, page },
      });
      const payload = response.data?.listOrder;
      if (!response.isSuccess || !payload) {
        throw new Error('Failed to list ikas orders for review request reconciliation');
      }
      pages += 1;
      for (const order of payload.data) {
        const result = await syncIkasOrderForReviewRequests(prisma, {
          storeId: input.storeId,
          authorizedAppId: input.authorizedAppId,
          order,
        });
        orders += 1;
        requestsScheduled += result.requestsScheduled;
        requestsCancelled += result.requestsCancelled;
      }
      if (!payload.hasNext) break;
      page += 1;
      await checkpointOrderReconciliationPage(prisma, lease, page, new Date());
    }

    await completeOrderReconciliationLease(prisma, lease, new Date());
    return {
      state: 'completed',
      pages,
      orders,
      requestsScheduled,
      requestsCancelled,
      windowStart: lease.windowStart,
      windowEnd: lease.windowEnd,
    };
  } catch (error) {
    await failOrderReconciliationLease(prisma, lease, error, new Date());
    throw error;
  }
}

export function reviewRequestWebhookScopeSet(): ReadonlySet<string> {
  return new Set<string>(REVIEW_EMAIL_WEBHOOK_SCOPES);
}
