import type { PrismaClient } from '@prisma/client';
import type {
  ikasAdminGraphQLAPIClient,
  ListCustomersForReviewEmailConsentQueryData,
} from '@/lib/ikas-client/generated/graphql';
import type { AuthToken } from '@/models/auth-token';
import {
  applyReviewEmailConsentDenial,
  prepareReviewEmailBatchSend,
  type ProviderNeutralReviewEmailEnvelope,
  type ReviewEmailConsentDenialReason,
  type ReviewEmailConsentEvidence,
} from '@/lib/review-email/batch-jobs';
import {
  fetchIkasOrderForReviewRequest,
  syncIkasOrderForReviewRequests,
} from '@/lib/review-email/ikas-orders';
import { protectedEmail } from '@/lib/review-email/pii';
import { timestampToDate } from '@/lib/review-email/time';

type IkasClient = ikasAdminGraphQLAPIClient<AuthToken>;
type IkasCustomer = ListCustomersForReviewEmailConsentQueryData['data'][number];

export class ReviewEmailIkasSendPreflightError extends Error {
  constructor(
    public readonly code: string,
    public readonly retryable: boolean,
  ) {
    super(code);
    this.name = 'ReviewEmailIkasSendPreflightError';
  }
}

async function deny(
  db: PrismaClient,
  jobId: string,
  reason: ReviewEmailConsentDenialReason,
  revokeAccess: boolean,
  now: Date,
): Promise<never> {
  await applyReviewEmailConsentDenial(db, jobId, { reason, revokeAccess, now });
  throw new ReviewEmailIkasSendPreflightError(`review_email_${reason}`, false);
}

async function fetchCurrentCustomer(
  ikas: IkasClient,
  customerId: string,
): Promise<IkasCustomer | null> {
  const response = await ikas.queries.listCustomersForReviewEmailConsent({
    id: { eq: customerId },
    pagination: { limit: 1, page: 1 },
  });
  if (!response.isSuccess) {
    throw new ReviewEmailIkasSendPreflightError('review_email_customer_read_failed', true);
  }
  return response.data?.listCustomer?.data?.find((customer) => customer.id === customerId) ?? null;
}

export async function preflightIkasReviewEmailBatchSend(
  ikas: IkasClient,
  db: PrismaClient,
  jobId: string,
  input: { now?: Date } = {},
): Promise<ReviewEmailConsentEvidence> {
  const target = await db.reviewEmailJob.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      requestId: true,
      batchId: true,
      storeId: true,
      batch: {
        select: {
          id: true,
          installationGeneration: true,
          orderSnapshotId: true,
          recipientVersion: true,
          recipientEmailHash: true,
          orderSnapshot: {
            select: {
              authorizedAppId: true,
              ikasOrderId: true,
            },
          },
        },
      },
    },
  });
  if (!target?.batch || !target.batchId || target.requestId || !target.batch.orderSnapshot) {
    throw new ReviewEmailIkasSendPreflightError('review_email_batch_job_not_found', false);
  }

  let canonicalOrder;
  try {
    canonicalOrder = await fetchIkasOrderForReviewRequest(
      ikas,
      target.batch.orderSnapshot.ikasOrderId,
    );
  } catch {
    throw new ReviewEmailIkasSendPreflightError('review_email_order_read_failed', true);
  }
  const checkedAt = input.now ?? new Date();
  if (!canonicalOrder) {
    return deny(db, jobId, 'order_missing', true, checkedAt);
  }

  const syncResult = await syncIkasOrderForReviewRequests(db, {
    storeId: target.storeId,
    authorizedAppId: target.batch.orderSnapshot.authorizedAppId,
    order: canonicalOrder,
    now: checkedAt,
  });
  if (syncResult.state !== 'processed') {
    throw new ReviewEmailIkasSendPreflightError(
      `review_email_preflight_${syncResult.state}`,
      false,
    );
  }

  const refreshed = await db.reviewEmailJob.findUnique({
    where: { id: jobId },
    select: {
      requestId: true,
      batchId: true,
      status: true,
      storeId: true,
      batch: {
        select: {
          id: true,
          status: true,
          orderSnapshotId: true,
          recipientVersion: true,
          recipientEmailHash: true,
          orderSnapshot: {
            select: {
              customerId: true,
            },
          },
        },
      },
    },
  });
  if (
    !refreshed?.batch ||
    !refreshed.batchId ||
    refreshed.requestId ||
    refreshed.batch.status === 'cancelled' ||
    refreshed.batch.status === 'completed' ||
    refreshed.batch.status === 'expired' ||
    refreshed.status === 'cancelled'
  ) {
    throw new ReviewEmailIkasSendPreflightError('review_email_batch_closed', false);
  }

  const customerId = refreshed.batch.orderSnapshot?.customerId;
  if (!customerId) return deny(db, jobId, 'customer_missing', true, checkedAt);

  let customer: IkasCustomer | null;
  try {
    customer = await fetchCurrentCustomer(ikas, customerId);
  } catch (error) {
    if (error instanceof ReviewEmailIkasSendPreflightError) throw error;
    throw new ReviewEmailIkasSendPreflightError('review_email_customer_read_failed', true);
  }
  if (!customer) return deny(db, jobId, 'customer_missing', true, checkedAt);
  if (customer.deleted) return deny(db, jobId, 'customer_deleted', true, checkedAt);

  const currentRecipient = protectedEmail(customer.email);
  if (
    !currentRecipient ||
    !refreshed.batch.recipientEmailHash ||
    !currentRecipient.exactLookupHashes.includes(refreshed.batch.recipientEmailHash)
  ) {
    return deny(db, jobId, 'recipient_mismatch', true, checkedAt);
  }

  if (customer.subscriptionStatus !== 'SUBSCRIBED') {
    const reason: ReviewEmailConsentDenialReason =
      customer.subscriptionStatus === 'NOT_SUBSCRIBED'
        ? 'customer_not_subscribed'
        : customer.subscriptionStatus === 'PENDING_CONFIRMATION'
          ? 'customer_subscription_pending'
          : 'customer_subscription_unknown';
    return deny(db, jobId, reason, false, checkedAt);
  }

  return {
    source: 'ikas_list_customer',
    status: 'SUBSCRIBED',
    statusUpdatedAt: timestampToDate(customer.subscriptionStatusUpdatedAt),
    checkedAt,
    storeId: refreshed.storeId,
    batchId: refreshed.batch.id,
    orderSnapshotId: refreshed.batch.orderSnapshotId!,
    recipientVersion: refreshed.batch.recipientVersion,
    recipientExactLookupHashes: currentRecipient.exactLookupHashes,
  };
}

export async function prepareIkasAuthorizedReviewEmailBatchSend(
  ikas: IkasClient,
  db: PrismaClient,
  jobId: string,
  input: { now?: Date; expectedLeaseVersion?: number } = {},
): Promise<ProviderNeutralReviewEmailEnvelope> {
  const consentEvidence = await preflightIkasReviewEmailBatchSend(ikas, db, jobId, {
    now: input.now,
  });
  return prepareReviewEmailBatchSend(db, jobId, {
    consentEvidence,
    now: input.now,
    expectedLeaseVersion: input.expectedLeaseVersion,
  });
}
