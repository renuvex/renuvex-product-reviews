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
  REVIEW_EMAIL_CATEGORY,
  ORDER_REVIEW_WEBHOOK_SCOPES,
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
import {
  buildOrderProductFingerprint,
  buildOrderProductFingerprintCandidates,
  buildReviewEmailBatchFingerprint,
  buildReviewEmailBatchFingerprintCandidates,
  protectedEmail,
} from '@/lib/review-email/pii';
import { timestampToDate } from '@/lib/review-email/time';
import { cancelPendingReviewEmailJobs } from '@/lib/review-email/jobs';
import { IkasInstallationError, requireActiveIkasStoreInstallation } from '@/lib/ikas-installation-lifecycle';
import { lockReviewEmailSubject } from '@/lib/review-email/subject-lock';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';
import { buildReviewEmailDeliveryGroups, reviewEmailBatchMembershipChanged } from '@/lib/review-email/batching';

type IkasClient = ikasAdminGraphQLAPIClient<AuthToken>;
type IkasOrder = ListOrdersForReviewRequestsQueryData['data'][number];
type LifecycleDb = PrismaClient;

const CLOSED_REVIEW_EMAIL_BATCH_STATUSES = new Set(['completed', 'cancelled', 'expired']);
const PRESERVED_REVIEW_REQUEST_MEMBERSHIP_STATUSES = new Set([
  'submitted',
  'cancelled',
  'expired',
  'suppressed',
  'sent',
  'sent_unknown',
  'sending',
  'skipped',
]);

export type OrderReviewSyncResult = {
  state: 'processed' | 'installation_inactive' | 'store_disabled' | 'eligibility_cutoff_missing';
  orderId: string;
  linesSeen: number;
  requestsScheduled: number;
  requestsCancelled: number;
};

export class ReviewEmailTenantMismatchError extends Error {
  constructor() {
    super('review_email_order_tenant_mismatch');
    this.name = 'ReviewEmailTenantMismatchError';
  }
}

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
  return asString(record.id) || asString(record.orderId) || asString(record.orderID) || getOrderIdFromWebhookData(record.order);
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
      scopes: [...ORDER_REVIEW_WEBHOOK_SCOPES],
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

export function normalizeIkasOrderForReviewRequests(input: { storeId: string; authorizedAppId: string; order: IkasOrder }): NormalizedOrder {
  if (input.order.merchantId !== input.storeId) {
    throw new ReviewEmailTenantMismatchError();
  }
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
    customerEmailFoldedHash: protectedCustomerEmail?.foldedHash ?? null,
    customerEmailHashKeyVersion: protectedCustomerEmail?.hashKeyVersion ?? null,
    customerEmailNormalizationVersion: protectedCustomerEmail?.normalizationVersion ?? 2,
    customerEmailLookupHashes: protectedCustomerEmail?.foldedLookupHashes ?? [],
    customerEmailExactLookupHashes: protectedCustomerEmail?.exactLookupHashes ?? [],
    customerEmailEncrypted: protectedCustomerEmail?.encrypted ?? null,
    lines: normalizeLines(input.order),
    packages: normalizePackages(input.order),
  };
}

async function cancelRequestForLine(tx: Prisma.TransactionClient, lineSnapshotId: string, reason: string, now: Date): Promise<boolean> {
  const request = await tx.reviewRequest.findFirst({
    where: {
      orderLineSnapshotId: lineSnapshotId,
      status: { in: ['scheduled', 'sending', 'sent', 'sent_unknown', 'error'] },
    },
    select: { id: true },
  });
  if (!request) return false;
  return cancelRequestById(tx, request.id, reason, now);
}

async function hasSuppression(tx: Prisma.TransactionClient, order: NormalizedOrder, now: Date): Promise<boolean> {
  if (!order.customerEmailLookupHashes.length) return false;
  const row = await tx.reviewEmailSuppression.findFirst({
    where: {
      storeId: order.storeId,
      category: REVIEW_EMAIL_CATEGORY,
      emailHash: { in: order.customerEmailLookupHashes },
      status: 'active',
      releasedAt: null,
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    },
    select: { id: true },
  });
  return Boolean(row);
}

async function hasSubjectBlock(
  tx: Prisma.TransactionClient,
  input: { storeId: string; installationGeneration: number; foldedLookupHashes: string[] },
): Promise<boolean> {
  if (input.foldedLookupHashes.length === 0) return false;
  const row = await tx.reviewEmailSubjectBlock.findFirst({
    where: {
      storeId: input.storeId,
      installationGeneration: input.installationGeneration,
      foldedSubjectHash: { in: input.foldedLookupHashes },
    },
    select: { id: true },
  });
  return Boolean(row);
}

async function cancelRequestById(
  tx: Prisma.TransactionClient,
  requestId: string,
  reason: string,
  now: Date,
): Promise<boolean> {
  const cancelled = await tx.reviewRequest.updateMany({
    where: { id: requestId, status: { in: ['scheduled', 'sending', 'sent', 'sent_unknown', 'error'] } },
    data: { status: reason === 'suppressed' || reason === 'subject_erased' ? 'suppressed' : 'cancelled', cancelledAt: now, cancellationReason: reason },
  });
  if (cancelled.count !== 1) return false;
  await cancelPendingReviewEmailJobs(tx, requestId, reason, now);
  await tx.reviewRequestToken.updateMany({
    where: { requestId, status: { in: ['prepared', 'active'] } },
    data: { status: 'revoked', revokedAt: now, revocationReason: reason },
  });
  await tx.reviewRequestSession.updateMany({
    where: { requestId, status: 'active' },
    data: { status: 'revoked', revokedAt: now, revocationReason: reason },
  });
  return true;
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
  try {
    return await db.$transaction(async (tx) => {
      const installation = await requireActiveIkasStoreInstallation(tx, input.storeId, input.authorizedAppId);
      const settings = await getEffectiveReviewEmailSettings(tx, input.storeId);
      if (!settings.enabled) {
        return {
          state: 'store_disabled' as const,
          orderId: input.order.id,
          linesSeen: 0,
          requestsScheduled: 0,
          requestsCancelled: 0,
        };
      }
      if (!settings.eligibilityStartsAt) {
        return {
          state: 'eligibility_cutoff_missing' as const,
          orderId: input.order.id,
          linesSeen: 0,
          requestsScheduled: 0,
          requestsCancelled: 0,
        };
      }
      const order = normalizeIkasOrderForReviewRequests(input);

      if (order.customerEmailFoldedHash) {
        await lockReviewEmailSubject(tx, {
          storeId: order.storeId,
          installationGeneration: installation.generation,
          foldedSubjectHash: order.customerEmailFoldedHash,
        });
      }
      const subjectBlocked = await hasSubjectBlock(tx, {
        storeId: order.storeId,
        installationGeneration: installation.generation,
        foldedLookupHashes: order.customerEmailLookupHashes,
      });

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
          customerId: subjectBlocked ? null : order.customerId,
          customerEmailHash: subjectBlocked ? null : order.customerEmailHash,
          customerEmailFoldedHash: subjectBlocked ? null : order.customerEmailFoldedHash,
          customerEmailHashKeyVersion: subjectBlocked ? null : order.customerEmailHashKeyVersion,
          customerEmailNormalizationVersion: order.customerEmailNormalizationVersion,
          customerEmailEncrypted: subjectBlocked ? null : order.customerEmailEncrypted,
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
          customerId: subjectBlocked ? null : order.customerId,
          customerEmailHash: subjectBlocked ? null : order.customerEmailHash,
          customerEmailFoldedHash: subjectBlocked ? null : order.customerEmailFoldedHash,
          customerEmailHashKeyVersion: subjectBlocked ? null : order.customerEmailHashKeyVersion,
          customerEmailNormalizationVersion: order.customerEmailNormalizationVersion,
          customerEmailEncrypted: subjectBlocked ? null : order.customerEmailEncrypted,
        },
      });
      await tx.$queryRaw<Array<{ id: string }>>`
        SELECT "id"
        FROM "IkasOrderSnapshot"
        WHERE "id" = ${orderSnapshot.id}
        FOR UPDATE
      `;

      const suppressed = subjectBlocked || await hasSuppression(tx, order, now);
      const existingLineRows = await tx.ikasOrderLineSnapshot.findMany({
        where: { storeId: order.storeId, ikasOrderId: order.ikasOrderId },
        select: { id: true, ikasOrderLineItemId: true, productId: true, eligibleAt: true },
      });
      const existingLines = new Map(existingLineRows.map((line) => [line.ikasOrderLineItemId, line]));
      const canonicalLineIds = new Set(order.lines.map((line) => line.id));
      const canonicalProductIds = new Set(order.lines.map((line) => line.productId));
      let requestsScheduled = 0;
      let requestsCancelled = 0;

      const canonicalLines: Array<{
        line: NormalizedOrderLine;
        snapshot: { id: string };
        eligibleAt: Date | null;
        ineligibleReason: string | null;
      }> = [];

      for (const line of order.lines) {
        const eligibility = evaluateLineEligibility(order, line, settings.eligibilityStartsAt);
        const priorLine = existingLines.get(line.id);
        const stableEligibleAt = eligibility.eligible
          ? priorLine?.eligibleAt && priorLine.eligibleAt >= settings.eligibilityStartsAt
            ? priorLine.eligibleAt
            : eligibility.eligibleAt
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
        canonicalLines.push({
          line,
          snapshot: lineSnapshot,
          eligibleAt: stableEligibleAt,
          ineligibleReason: eligibility.eligible ? null : eligibility.reason,
        });
      }

      for (const missingLine of existingLineRows.filter((line) => !canonicalLineIds.has(line.ikasOrderLineItemId))) {
        await tx.ikasOrderLineSnapshot.update({
          where: { id: missingLine.id },
          data: { eligibleAt: null, ineligibleReason: 'line_missing_from_canonical_order' },
        });
        if (!canonicalProductIds.has(missingLine.productId) && await cancelRequestForLine(tx, missingLine.id, 'line_missing_from_canonical_order', now)) {
          requestsCancelled += 1;
        }
      }

      const existingOrderRequests = await tx.reviewRequest.findMany({
        where: { storeId: order.storeId, orderSnapshotId: orderSnapshot.id },
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          productId: true,
          status: true,
          sendAfter: true,
          receiptId: true,
          batchId: true,
          batchPosition: true,
        },
      });
      if (suppressed) {
        const reason = subjectBlocked ? 'subject_erased' : 'suppressed';
        for (const request of existingOrderRequests) {
          if (await cancelRequestById(tx, request.id, reason, now)) requestsCancelled += 1;
        }
        await tx.reviewEmailBatch.updateMany({
          where: { orderSnapshotId: orderSnapshot.id, status: { in: ['scheduled', 'sending', 'active'] } },
          data: { emailAccessStatus: 'suppressed', status: 'cancelled', cancelledAt: now, cancellationReason: reason },
        });
      } else {
        const grouping = buildReviewEmailDeliveryGroups(order, {
          eligibilityStartsAt: settings.eligibilityStartsAt,
          eligibleAtByLineId: new Map(canonicalLines.map((entry) => [entry.line.id, entry.eligibleAt])),
          ineligibleReasonByLineId: new Map(canonicalLines.map((entry) => [entry.line.id, entry.ineligibleReason])),
        });
        const desiredProducts = new Set(grouping.groups.flatMap((group) => group.members.map((member) => member.productId)));
        const lineSnapshotsByIkasId = new Map(canonicalLines.map((entry) => [entry.line.id, entry.snapshot]));
        const existingBatches = await tx.reviewEmailBatch.findMany({
          where: {
            storeId: order.storeId,
            installationGeneration: installation.generation,
            orderSnapshotId: orderSnapshot.id,
          },
          orderBy: { createdAt: 'asc' },
        });
        let reusableFallback = existingBatches.find((batch) =>
          batch.deliveryGroupKey === 'order:complete' &&
          batch.groupingFrozenAt === null &&
          ['scheduled', 'sending'].includes(batch.status)
        ) ?? null;
        let preservedFallback = existingBatches.find((batch) =>
          batch.deliveryGroupKey === 'order:complete' &&
          (batch.groupingFrozenAt !== null || CLOSED_REVIEW_EMAIL_BATCH_STATUSES.has(batch.status))
        ) ?? null;
        const incrementedMembershipVersions = new Set<string>();
        const batchesNeedingMembershipIncrement = new Set<string>();

        for (const deliveryGroup of grouping.groups) {
          const fingerprintInput = {
            schemaVersion: 1 as const,
            storeId: order.storeId,
            installationGeneration: installation.generation,
            ikasOrderId: order.ikasOrderId,
            groupingMode: deliveryGroup.groupingMode,
            deliveryGroupKey: deliveryGroup.deliveryGroupKey,
          };
          const batchFingerprint = buildReviewEmailBatchFingerprint(fingerprintInput);
          const batchFingerprintCandidates = buildReviewEmailBatchFingerprintCandidates(fingerprintInput);
          const sendAfter = firstRequestSendAfter(deliveryGroup.eligibleAt, settings);
          const deliveryGroupProducts = new Set(deliveryGroup.members.map((member) => member.productId));
          let batch = existingBatches.find((candidate) =>
            candidate.deliveryGroupKey === deliveryGroup.deliveryGroupKey || batchFingerprintCandidates.includes(candidate.batchFingerprint)
          ) ?? null;

          if (!batch && deliveryGroup.groupingMode === 'package') {
            const preservedMembershipBatch = existingBatches.find((candidate) =>
              (candidate.groupingFrozenAt !== null || CLOSED_REVIEW_EMAIL_BATCH_STATUSES.has(candidate.status)) &&
              existingOrderRequests.some((request) => (
                request.batchId === candidate.id && deliveryGroupProducts.has(request.productId)
              ))
            ) ?? null;
            batch = preservedFallback ?? preservedMembershipBatch;
          }

          if (!batch && reusableFallback && deliveryGroup.groupingMode === 'package') {
            batch = await tx.reviewEmailBatch.update({
              where: { id: reusableFallback.id },
              data: {
                deliveryGroupKey: deliveryGroup.deliveryGroupKey,
                deliveryGroupMode: deliveryGroup.groupingMode,
                groupingVersion: { increment: 1 },
                batchFingerprint,
                fingerprintKeyVersion: Number(batchFingerprint.split(':')[1]),
                eligibleAt: deliveryGroup.eligibleAt,
                sendAfter,
                expiresAt: initialRequestExpiresAt(sendAfter),
              },
            });
            reusableFallback = null;
          }

          if (!batch) {
            batch = await tx.reviewEmailBatch.findFirst({
              where: {
                storeId: order.storeId,
                installationGeneration: installation.generation,
                batchFingerprint: { in: batchFingerprintCandidates },
              },
            });
            if (batch && !existingBatches.some((candidate) => candidate.id === batch!.id)) {
              existingBatches.push(batch);
            }
          }

          if (!batch) {
            batch = await tx.reviewEmailBatch.create({
              data: {
                storeId: order.storeId,
                installationGeneration: installation.generation,
                orderSnapshotId: orderSnapshot.id,
                deliveryGroupKey: deliveryGroup.deliveryGroupKey,
                deliveryGroupMode: deliveryGroup.groupingMode,
                batchFingerprint,
                fingerprintKeyVersion: Number(batchFingerprint.split(':')[1]),
                recipientEmailHash: order.customerEmailHash,
                recipientEmailFoldedHash: order.customerEmailFoldedHash,
                recipientEmailHashKeyVersion: order.customerEmailHashKeyVersion,
                recipientEmailNormalizationVersion: order.customerEmailNormalizationVersion,
                recipientEmailEncrypted: order.customerEmailEncrypted,
                eligibilityStartsAtSnapshot: settings.eligibilityStartsAt,
                firstDelayDaysSnapshot: settings.firstDelayDays,
                reminderDelayDaysSnapshot: settings.reminderDelayDays,
                maxReminderCountSnapshot: settings.reminderEnabled ? Math.min(settings.maxReminderCount, 1) : 0,
                templateVersionSnapshot: settings.templateVersion,
                localeSnapshot: settings.locale,
                status: 'scheduled',
                emailAccessStatus: 'allowed',
                eligibleAt: deliveryGroup.eligibleAt,
                sendAfter,
                expiresAt: initialRequestExpiresAt(sendAfter),
              },
            });
            existingBatches.push(batch);
          } else if (!batch.groupingFrozenAt && ['scheduled', 'sending'].includes(batch.status)) {
            const recipientChanged = !batch.recipientEmailHash ||
              !order.customerEmailExactLookupHashes.includes(batch.recipientEmailHash);
            const membershipChanged = reviewEmailBatchMembershipChanged(batch.id, existingOrderRequests, deliveryGroup.members);
            if (membershipChanged) incrementedMembershipVersions.add(batch.id);
            batch = await tx.reviewEmailBatch.update({
              where: { id: batch.id },
              data: {
                membershipVersion: membershipChanged ? { increment: 1 } : undefined,
                recipientEmailHash: order.customerEmailHash,
                recipientEmailFoldedHash: order.customerEmailFoldedHash,
                recipientEmailHashKeyVersion: order.customerEmailHashKeyVersion,
                recipientEmailNormalizationVersion: order.customerEmailNormalizationVersion,
                recipientEmailEncrypted: order.customerEmailEncrypted,
                recipientVersion: recipientChanged ? { increment: 1 } : undefined,
                recipientChangedAt: recipientChanged ? now : undefined,
                eligibilityStartsAtSnapshot: batch.eligibilityStartsAtSnapshot ?? settings.eligibilityStartsAt,
                eligibleAt: deliveryGroup.eligibleAt,
                sendAfter,
                expiresAt: initialRequestExpiresAt(sendAfter),
              },
            });
          }

          const selectedBatchId = batch.id;
          const frozenMembershipChanged = Boolean(
            batch.groupingFrozenAt &&
            !CLOSED_REVIEW_EMAIL_BATCH_STATUSES.has(batch.status) &&
            !incrementedMembershipVersions.has(selectedBatchId) &&
            deliveryGroup.members.some((member) => {
              const existing = existingOrderRequests.find((request) => request.productId === member.productId) ?? null;
              return !existing || (
                !PRESERVED_REVIEW_REQUEST_MEMBERSHIP_STATUSES.has(existing.status) &&
                (existing.batchId !== selectedBatchId || existing.batchPosition !== member.position)
              );
            })
          );
          if (frozenMembershipChanged) {
            batch = await tx.reviewEmailBatch.update({
              where: { id: batch.id },
              data: { membershipVersion: { increment: 1 } },
            });
            incrementedMembershipVersions.add(batch.id);
            const batchIndex = existingBatches.findIndex((candidate) => candidate.id === selectedBatchId);
            if (batchIndex >= 0) existingBatches[batchIndex] = batch;
            if (preservedFallback?.id === selectedBatchId) preservedFallback = batch;
          }

          const frozenRecipientChanged = Boolean(
            batch.groupingFrozenAt &&
            batch.recipientEmailHash &&
            !order.customerEmailExactLookupHashes.includes(batch.recipientEmailHash),
          );
          if (frozenRecipientChanged && ['sending', 'active'].includes(batch.status)) {
            batch = await tx.reviewEmailBatch.update({
              where: { id: batch.id },
              data: {
                status: 'cancelled',
                emailAccessStatus: 'recipient_changed',
                recipientChangedAt: now,
                cancelledAt: now,
                cancellationReason: 'recipient_changed_after_send_commit',
              },
            });
            await tx.reviewEmailJob.updateMany({
              where: {
                batchId: batch.id,
                status: { in: ['pending', 'leased', 'dispatched', 'processing', 'retrying', 'awaiting_confirmation'] },
              },
              data: {
                status: 'cancelled',
                completedAt: now,
                leaseOwner: null,
                leaseExpiresAt: null,
                lastErrorCode: 'recipient_changed_after_send_commit',
              },
            });
            await tx.reviewRequestToken.updateMany({
              where: { batchId: batch.id, status: { in: ['prepared', 'active'] } },
              data: { status: 'revoked', revokedAt: now, revocationReason: 'recipient_changed_after_send_commit' },
            });
            await tx.reviewRequestSession.updateMany({
              where: { batchId: batch.id, status: 'active' },
              data: { status: 'revoked', revokedAt: now, revocationReason: 'recipient_changed_after_send_commit' },
            });
          }

          if (CLOSED_REVIEW_EMAIL_BATCH_STATUSES.has(batch.status)) {
            for (const member of deliveryGroup.members) {
              const fingerprintInputForProduct = { ikasOrderId: order.ikasOrderId, productId: member.productId };
              const receipt = await tx.reviewRequestReceipt.findFirst({
                where: {
                  storeId: order.storeId,
                  installationGeneration: installation.generation,
                  orderProductFingerprint: { in: buildOrderProductFingerprintCandidates(fingerprintInputForProduct) },
                },
              });
              if (!receipt) {
                const fingerprint = buildOrderProductFingerprint(fingerprintInputForProduct);
                await tx.reviewRequestReceipt.create({
                  data: {
                    storeId: order.storeId,
                    installationGeneration: installation.generation,
                    orderProductFingerprint: fingerprint,
                    fingerprintKeyVersion: Number(fingerprint.split(':')[1]),
                    normalizationVersion: order.customerEmailNormalizationVersion,
                    analyticsClosedAt: now,
                    analyticsCloseReason: 'late_after_batch_closed',
                  },
                });
              }
            }
            continue;
          }

          for (const member of deliveryGroup.members) {
            const representativeSnapshot = lineSnapshotsByIkasId.get(member.representativeLine.id);
            if (!representativeSnapshot) throw new Error('review_email_line_snapshot_missing');
            const existingRequests = existingOrderRequests.filter((request) => request.productId === member.productId);
            const fingerprintInputForProduct = { ikasOrderId: order.ikasOrderId, productId: member.productId };
            const productFingerprint = buildOrderProductFingerprint(fingerprintInputForProduct);
            const existingReceipt = await tx.reviewRequestReceipt.findFirst({
              where: {
                storeId: order.storeId,
                installationGeneration: installation.generation,
                orderProductFingerprint: { in: buildOrderProductFingerprintCandidates(fingerprintInputForProduct) },
              },
            });
            const receipt = existingReceipt ?? await tx.reviewRequestReceipt.create({
              data: {
                storeId: order.storeId,
                installationGeneration: installation.generation,
                orderProductFingerprint: productFingerprint,
                fingerprintKeyVersion: Number(productFingerprint.split(':')[1]),
                normalizationVersion: order.customerEmailNormalizationVersion,
                exactSubjectHash: order.customerEmailHash,
                exactSubjectKeyVersion: order.customerEmailHashKeyVersion,
              },
            });
            if (receipt.analyticsClosedAt) continue;

            const existing = existingRequests.find((request) => request.receiptId === receipt.id) ?? existingRequests[0] ?? null;
            if (existing && PRESERVED_REVIEW_REQUEST_MEMBERSHIP_STATUSES.has(existing.status)) {
              if (!existing.receiptId || !existing.batchId) {
                await tx.reviewRequest.updateMany({
                  where: { id: existing.id },
                  data: { receiptId: existing.receiptId ?? receipt.id, batchId: existing.batchId ?? batch.id },
                });
              }
              continue;
            }

            if (existing) {
              if (existing.batchId && existing.batchId !== batch.id && !incrementedMembershipVersions.has(existing.batchId)) {
                batchesNeedingMembershipIncrement.add(existing.batchId);
              }
              await cancelPendingReviewEmailJobs(tx, existing.id, 'migrated_to_batch_envelope', now);
              await tx.reviewRequest.update({
                where: { id: existing.id },
                data: {
                  receiptId: receipt.id,
                  batchId: batch.id,
                  batchPosition: member.position,
                  membershipVersion: batch.membershipVersion,
                  sourceLineItemIds: member.sourceLineItemIds,
                  orderLineSnapshotId: representativeSnapshot.id,
                  eligibleAt: member.eligibleAt,
                  sendAfter: batch.sendAfter,
                  recipientEmailHash: order.customerEmailHash,
                  recipientEmailFoldedHash: order.customerEmailFoldedHash,
                  recipientEmailHashKeyVersion: order.customerEmailHashKeyVersion,
                  recipientEmailNormalizationVersion: order.customerEmailNormalizationVersion,
                  recipientEmailEncrypted: order.customerEmailEncrypted,
                  expiresAt: batch.expiresAt,
                },
              });
              existing.batchId = batch.id;
              existing.batchPosition = member.position;
            } else {
              const created = await tx.reviewRequest.create({
                data: {
                  storeId: order.storeId,
                  productId: member.productId,
                  orderSnapshotId: orderSnapshot.id,
                  orderLineSnapshotId: representativeSnapshot.id,
                  batchId: batch.id,
                  batchPosition: member.position,
                  membershipVersion: batch.membershipVersion,
                  sourceLineItemIds: member.sourceLineItemIds,
                  receiptId: receipt.id,
                  status: 'scheduled',
                  eligibleAt: member.eligibleAt,
                  sendAfter: batch.sendAfter,
                  firstDelayDaysSnapshot: settings.firstDelayDays,
                  reminderDelayDaysSnapshot: settings.reminderDelayDays,
                  maxReminderCountSnapshot: settings.reminderEnabled ? Math.min(settings.maxReminderCount, 1) : 0,
                  triggerModeSnapshot: settings.triggerMode,
                  consentModeSnapshot: settings.consentMode,
                  notificationsAcceptedSnapshot: order.notificationsAccepted,
                  templateVersionSnapshot: settings.templateVersion,
                  localeSnapshot: settings.locale,
                  recipientEmailHash: order.customerEmailHash,
                  recipientEmailFoldedHash: order.customerEmailFoldedHash,
                  recipientEmailHashKeyVersion: order.customerEmailHashKeyVersion,
                  recipientEmailNormalizationVersion: order.customerEmailNormalizationVersion,
                  recipientEmailEncrypted: order.customerEmailEncrypted,
                  expiresAt: batch.expiresAt,
                },
              });
              existingOrderRequests.push({
                id: created.id,
                productId: member.productId,
                status: 'scheduled',
                sendAfter: batch.sendAfter,
                receiptId: receipt.id,
                batchId: batch.id,
                batchPosition: member.position,
              });
              requestsScheduled += 1;
            }
          }

          const initialJob = await tx.reviewEmailJob.findFirst({
            where: { batchId: batch.id, kind: 'request', sequence: 0 },
            select: { id: true },
          });
          if (!initialJob && !batch.groupingFrozenAt) {
            await tx.reviewEmailJob.create({
              data: {
                requestId: null,
                batchId: batch.id,
                storeId: order.storeId,
                productId: null,
                kind: 'request',
                sequence: 0,
                status: 'pending',
                sendAfter: batch.sendAfter ?? sendAfter,
                expiresAt: batch.expiresAt,
                dedupeKey: `review-email-batch:${batch.id}:request:0`,
              },
            });
          }
        }

        for (const request of existingOrderRequests.filter((candidate) => !desiredProducts.has(candidate.productId))) {
          const reason = grouping.productReasons.get(request.productId) ?? 'product_no_longer_eligible';
          if (await cancelRequestById(tx, request.id, reason, now)) {
            requestsCancelled += 1;
            if (request.batchId && !incrementedMembershipVersions.has(request.batchId)) {
              batchesNeedingMembershipIncrement.add(request.batchId);
            }
          }
        }
        for (const batchId of batchesNeedingMembershipIncrement) {
          if (incrementedMembershipVersions.has(batchId)) continue;
          await tx.reviewEmailBatch.updateMany({
            where: { id: batchId, groupingFrozenAt: null, status: { in: ['scheduled', 'sending'] } },
            data: { membershipVersion: { increment: 1 } },
          });
          incrementedMembershipVersions.add(batchId);
        }
      }

      return {
        state: 'processed' as const,
        orderId: order.ikasOrderId,
        linesSeen: order.lines.length,
        requestsScheduled,
        requestsCancelled,
      };
    });
  } catch (error) {
    if (error instanceof IkasInstallationError && error.code === 'ikas_installation_inactive') {
      return {
        state: 'installation_inactive',
        orderId: input.order.id,
        linesSeen: 0,
        requestsScheduled: 0,
        requestsCancelled: 0,
      };
    }
    throw error;
  }
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

export type OrderReconciliationLeaseAcquisition =
  | { state: 'acquired'; lease: OrderReconciliationLease }
  | { state: 'lease_busy' | 'installation_inactive' | 'store_disabled' | 'eligibility_cutoff_missing' };

type ReconciliationLeaseDb = Pick<PrismaClient, '$transaction'>;
type ReconciliationDb = Pick<PrismaClient, 'ikasOrderReconciliationCursor'>;

export async function acquireOrderReconciliationLease(
  db: ReconciliationLeaseDb,
  input: { storeId: string; authorizedAppId: string; owner: string; now?: Date },
): Promise<OrderReconciliationLeaseAcquisition> {
  const now = input.now ?? new Date();
  const leaseExpiresAt = new Date(now.getTime() + REVIEW_EMAIL_RECONCILIATION_LEASE_MINUTES * 60 * 1000);
  try {
    return await db.$transaction(async (tx) => {
      const installation = await requireActiveIkasStoreInstallation(tx, input.storeId, input.authorizedAppId);
      const settings = await getEffectiveReviewEmailSettings(tx, input.storeId);
      if (!settings.enabled) return { state: 'store_disabled' as const };
      if (!settings.eligibilityStartsAt) return { state: 'eligibility_cutoff_missing' as const };

      await tx.ikasOrderReconciliationCursor.upsert({
        where: { storeId: input.storeId },
        create: {
          storeId: input.storeId,
          authorizedAppId: input.authorizedAppId,
          overlapMinutes: REVIEW_EMAIL_RECONCILIATION_OVERLAP_MINUTES,
          status: 'idle',
        },
        update: {},
      });

      const current = await tx.ikasOrderReconciliationCursor.findUniqueOrThrow({
        where: { storeId: input.storeId },
      });
      if (current.leaseExpiresAt && current.leaseExpiresAt > now && current.leaseOwner !== input.owner) {
        return { state: 'lease_busy' as const };
      }

      const overlapMs = current.overlapMinutes * 60 * 1000;
      const defaultStart = new Date(now.getTime() - REVIEW_EMAIL_RECONCILIATION_INITIAL_LOOKBACK_DAYS * 24 * 60 * 60 * 1000);
      const proposedWindowStart = current.windowStart ?? new Date((current.lastCheckpointAt ?? defaultStart).getTime() - overlapMs);
      const windowStart = proposedWindowStart < installation.activatedAt ? installation.activatedAt : proposedWindowStart;
      const windowEnd = current.windowEnd ?? now;
      const nextPage = current.windowStart ? current.nextPage : 1;
      const version = current.leaseVersion + 1;
      const claimed = await tx.ikasOrderReconciliationCursor.updateMany({
        where: {
          storeId: input.storeId,
          leaseVersion: current.leaseVersion,
          OR: [{ leaseExpiresAt: null }, { leaseExpiresAt: { lte: now } }, { leaseOwner: input.owner }],
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
          lastErrorCode: null,
        },
      });
      if (claimed.count !== 1) return { state: 'lease_busy' as const };

      return {
        state: 'acquired' as const,
        lease: {
          storeId: input.storeId,
          owner: input.owner,
          version,
          windowStart,
          windowEnd,
          nextPage,
          leaseExpiresAt,
        },
      };
    });
  } catch (error) {
    if (error instanceof IkasInstallationError && error.code === 'ikas_installation_inactive') {
      return { state: 'installation_inactive' };
    }
    throw error;
  }
}

async function checkpointOrderReconciliationPage(db: ReconciliationDb, lease: OrderReconciliationLease, nextPage: number, now: Date): Promise<void> {
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

async function completeOrderReconciliationLease(db: ReconciliationDb, lease: OrderReconciliationLease, now: Date): Promise<void> {
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
      lastErrorCode: null,
      leaseOwner: null,
      leaseExpiresAt: null,
    },
  });
  if (updated.count !== 1) throw new Error('review_email_reconciliation_lease_lost');
}

async function failOrderReconciliationLease(db: ReconciliationDb, lease: OrderReconciliationLease, error: unknown, now: Date): Promise<void> {
  const failure = normalizeReviewEmailFailure('order_reconciliation', error, { retryable: true });
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
      lastErrorCode: failure.code,
      leaseOwner: null,
      leaseExpiresAt: null,
    },
  });
  reportReviewEmailFailure('order_reconciliation', failure);
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
  state: 'completed' | 'lease_busy' | 'installation_inactive' | 'store_disabled' | 'eligibility_cutoff_missing';
  pages: number;
  orders: number;
  requestsScheduled: number;
  requestsCancelled: number;
  windowStart?: Date;
  windowEnd?: Date;
}> {
  const startedAt = input.now ?? new Date();
  const limit = Math.min(Math.max(input.limit ?? 200, 1), 200);
  const acquisition = await acquireOrderReconciliationLease(prisma, {
    storeId: input.storeId,
    authorizedAppId: input.authorizedAppId,
    owner: input.owner ?? randomUUID(),
    now: startedAt,
  });
  if (acquisition.state !== 'acquired') {
    return {
      state: acquisition.state,
      pages: 0,
      orders: 0,
      requestsScheduled: 0,
      requestsCancelled: 0,
    };
  }
  const lease = acquisition.lease;

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
        if (result.state !== 'processed') {
          if (result.state === 'store_disabled' || result.state === 'eligibility_cutoff_missing') {
            await completeOrderReconciliationLease(prisma, lease, new Date());
          }
          return {
            state: result.state,
            pages,
            orders,
            requestsScheduled,
            requestsCancelled,
            windowStart: lease.windowStart,
            windowEnd: lease.windowEnd,
          };
        }
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
  return new Set<string>(ORDER_REVIEW_WEBHOOK_SCOPES);
}
