import { createHash, randomUUID } from 'node:crypto';
import type { Prisma, PrismaClient } from '@prisma/client';
import {
  DEFAULT_TOKEN_EXPIRES_DAYS,
  REVIEW_EMAIL_CATEGORY,
  REVIEW_EMAIL_CONFIRMATION_TIMEOUT_HOURS,
  REVIEW_EMAIL_INITIAL_COOLDOWN_DAYS,
  REVIEW_EMAIL_MAX_MANIFEST_ITEMS,
  REVIEW_EMAIL_MIN_PHYSICAL_GAP_HOURS,
  REVIEW_EMAIL_PREPARED_ATTEMPT_TTL_MINUTES,
  REVIEW_EMAIL_ROLLING_CAP_COUNT,
  REVIEW_EMAIL_ROLLING_CAP_DAYS,
} from '@/lib/review-email/constants';
import { canonicalizeJson, type CanonicalJsonValue } from '@/lib/review-email/canonical-json';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import { decryptText, hashFoldedEmailCandidates, hashProviderMessageId, piiHashVersion } from '@/lib/review-email/pii';
import { buildReviewRequestEmailUrl } from '@/lib/review-email/public-access';
import { addDays } from '@/lib/review-email/time';
import { lockReviewEmailRecipient } from '@/lib/review-email/subject-lock';
import { activatePreparedReviewEmailBatchToken, prepareReviewEmailBatchToken } from '@/lib/review-email/tokens';
import { buildReviewEmailUnsubscribeUrl, prepareReviewEmailUnsubscribeToken } from '@/lib/review-email/unsubscribe';
import {
  recordReviewEmailBatchMetricContribution,
  recordReviewEmailMetricContribution,
} from '@/lib/review-email/analytics';
import { lockActiveIkasStoreInstallationGeneration } from '@/lib/ikas-installation-lifecycle';

const CLOSED_BATCH_STATUSES = ['completed', 'cancelled', 'expired'] as const;
const CLOSED_REQUEST_STATUSES = ['submitted', 'skipped', 'cancelled', 'expired', 'suppressed'] as const;
const ACTIVE_JOB_STATUSES = ['pending', 'leased', 'dispatched', 'retrying'] as const;

type BatchJobDb = Pick<PrismaClient, '$transaction'>;

type BatchJobFailureOutcome = {
  state: 'error';
  code: string;
  retryable: boolean;
};

type PrepareBatchSendOutcome =
  | BatchJobFailureOutcome
  | { state: 'ready'; envelope: ProviderNeutralReviewEmailEnvelope };

type CommitBatchSendOutcome =
  | BatchJobFailureOutcome
  | { state: 'committed'; expiresAt: Date };

export type ReviewEmailAttemptManifestItem = {
  itemId: string;
  productId: string;
  position: number;
  productName: string | null;
  variantName: string | null;
};

export type ReviewEmailAttemptManifest = {
  schemaVersion: 1;
  batchId: string;
  membershipVersion: number;
  kind: 'request' | 'reminder';
  sequence: number;
  totalEligibleItems: number;
  items: ReviewEmailAttemptManifestItem[];
};

export type ProviderNeutralReviewEmailEnvelope = {
  attemptId: string;
  correlationId: string;
  recipient: string;
  templateVersion: string;
  locale: string;
  kind: 'request' | 'reminder';
  sequence: number;
  reviewUrl: string;
  unsubscribeUrl: string;
  headers: {
    listUnsubscribe: string;
    listUnsubscribePost: 'List-Unsubscribe=One-Click';
  };
  manifest: ReviewEmailAttemptManifest;
};

export class ReviewEmailBatchJobError extends Error {
  constructor(public readonly code: string, public readonly retryable = false) {
    super(code);
    this.name = 'ReviewEmailBatchJobError';
  }
}

function manifestDigest(manifest: ReviewEmailAttemptManifest): string {
  return createHash('sha256').update(canonicalizeJson(manifest as unknown as CanonicalJsonValue), 'utf8').digest('hex');
}

function parseAttemptManifest(value: Prisma.JsonValue | null): ReviewEmailAttemptManifest | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const manifest = value as Record<string, Prisma.JsonValue>;
  if (manifest.schemaVersion !== 1 || typeof manifest.batchId !== 'string' || !Array.isArray(manifest.items)) return null;
  const items: ReviewEmailAttemptManifestItem[] = [];
  for (const item of manifest.items) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
    const row = item as Record<string, Prisma.JsonValue>;
    if (typeof row.itemId !== 'string' || typeof row.productId !== 'string' || typeof row.position !== 'number') return null;
    items.push({
      itemId: row.itemId,
      productId: row.productId,
      position: row.position,
      productName: typeof row.productName === 'string' ? row.productName : null,
      variantName: typeof row.variantName === 'string' ? row.variantName : null,
    });
  }
  if (
    typeof manifest.membershipVersion !== 'number' ||
    (manifest.kind !== 'request' && manifest.kind !== 'reminder') ||
    typeof manifest.sequence !== 'number' ||
    typeof manifest.totalEligibleItems !== 'number'
  ) return null;
  return {
    schemaVersion: 1,
    batchId: manifest.batchId,
    membershipVersion: manifest.membershipVersion,
    kind: manifest.kind,
    sequence: manifest.sequence,
    totalEligibleItems: manifest.totalEligibleItems,
    items,
  };
}

function maxDate(...values: Array<Date | null | undefined>): Date | null {
  return values.filter((value): value is Date => Boolean(value)).sort((left, right) => right.getTime() - left.getTime())[0] ?? null;
}

function batchJobFailure(code: string, retryable = false): BatchJobFailureOutcome {
  return { state: 'error', code, retryable };
}

function cutoffAllowsBatch(
  settings: { enabled: boolean; eligibilityStartsAt: Date | null } | null,
  batch: { eligibilityStartsAtSnapshot: Date | null; eligibleAt: Date | null },
): boolean {
  return Boolean(
    settings?.enabled &&
    settings.eligibilityStartsAt &&
    batch.eligibilityStartsAtSnapshot &&
    batch.eligibleAt &&
    settings.eligibilityStartsAt.getTime() === batch.eligibilityStartsAtSnapshot.getTime() &&
    batch.eligibleAt >= batch.eligibilityStartsAtSnapshot
  );
}

async function abandonPreparedBatchAttempt(
  tx: Prisma.TransactionClient,
  attemptId: string,
  now: Date,
  reason = 'sender_crashed_before_send',
): Promise<void> {
  await tx.reviewEmailAttempt.updateMany({
    where: { id: attemptId, status: 'prepared', sendCommittedAt: null },
    data: { status: 'abandoned_before_send', completedAt: now, errorCode: reason },
  });
  await tx.reviewRequestToken.updateMany({
    where: { attemptId, status: 'prepared' },
    data: { status: 'revoked', revokedAt: now, revocationReason: reason },
  });
  await tx.reviewEmailUnsubscribeToken.updateMany({
    where: { createdFromAttemptId: attemptId, status: 'active' },
    data: { status: 'revoked', revokedAt: now },
  });
}

async function effectiveSuppressionExists(
  tx: Prisma.TransactionClient,
  input: { storeId: string; foldedHashes: string[]; now: Date },
): Promise<boolean> {
  return Boolean(await tx.reviewEmailSuppression.findFirst({
    where: {
      storeId: input.storeId,
      category: REVIEW_EMAIL_CATEGORY,
      emailHash: { in: input.foldedHashes },
      status: 'active',
      releasedAt: null,
      OR: [{ expiresAt: null }, { expiresAt: { gt: input.now } }],
    },
    select: { id: true },
  }));
}

async function applyFrequencyGovernor(
  tx: Prisma.TransactionClient,
  input: {
    storeId: string;
    batchId: string;
    kind: 'request' | 'reminder';
    foldedHashes: string[];
    now: Date;
  },
): Promise<Date | null> {
  const rollingStart = addDays(input.now, -REVIEW_EMAIL_ROLLING_CAP_DAYS);
  const attempts = await tx.reviewEmailAttempt.findMany({
    where: {
      recipientEmailFoldedHash: { in: input.foldedHashes },
      sendCommittedAt: { gte: rollingStart },
      status: { not: 'confirmed_not_sent' },
      job: { storeId: input.storeId },
    },
    orderBy: { sendCommittedAt: 'desc' },
    select: {
      sendCommittedAt: true,
      job: { select: { batchId: true, kind: true } },
    },
  });
  const committed = attempts.filter((attempt): attempt is typeof attempt & { sendCommittedAt: Date } => Boolean(attempt.sendCommittedAt));
  const latest = committed[0]?.sendCommittedAt ?? null;
  const gapRelease = latest ? new Date(latest.getTime() + REVIEW_EMAIL_MIN_PHYSICAL_GAP_HOURS * 60 * 60 * 1000) : null;
  const initialLatest = input.kind === 'request'
    ? committed.find((attempt) => attempt.job.kind === 'request' && attempt.job.batchId !== input.batchId)?.sendCommittedAt ?? null
    : null;
  const initialRelease = initialLatest ? addDays(initialLatest, REVIEW_EMAIL_INITIAL_COOLDOWN_DAYS) : null;
  const capRelease = committed.length >= REVIEW_EMAIL_ROLLING_CAP_COUNT
    ? addDays(committed[REVIEW_EMAIL_ROLLING_CAP_COUNT - 1]!.sendCommittedAt, REVIEW_EMAIL_ROLLING_CAP_DAYS)
    : null;
  const releaseAt = maxDate(gapRelease, initialRelease, capRelease);
  return releaseAt && releaseAt > input.now ? releaseAt : null;
}

function requestIsEligibleForAttempt(status: string, kind: 'request' | 'reminder'): boolean {
  if (CLOSED_REQUEST_STATUSES.includes(status as (typeof CLOSED_REQUEST_STATUSES)[number])) return false;
  return kind === 'request' ? ['scheduled', 'error'].includes(status) : ['sent', 'sent_unknown', 'error'].includes(status);
}

export async function prepareReviewEmailBatchSend(
  db: BatchJobDb,
  jobId: string,
  input: { now?: Date; expectedLeaseVersion?: number } = {},
): Promise<ProviderNeutralReviewEmailEnvelope> {
  if (!isReviewEmailEnabled()) throw new ReviewEmailBatchJobError('review_email_feature_disabled');
  const now = input.now ?? new Date();
  const staleBefore = new Date(now.getTime() - REVIEW_EMAIL_PREPARED_ATTEMPT_TTL_MINUTES * 60 * 1000);
  const outcome: PrepareBatchSendOutcome = await db.$transaction(async (tx) => {
    const job = await tx.reviewEmailJob.findUnique({
      where: { id: jobId },
      include: {
        batch: {
          include: {
            requests: { include: { orderLineSnapshot: true }, orderBy: [{ batchPosition: 'asc' }, { id: 'asc' }] },
          },
        },
        attemptsLog: { orderBy: { attemptNumber: 'desc' }, take: 1 },
      },
    });
    if (!job?.batch || !job.batchId || job.requestId) return batchJobFailure('review_email_batch_job_not_found');
    if (input.expectedLeaseVersion !== undefined && job.leaseVersion !== input.expectedLeaseVersion) {
      return batchJobFailure('review_email_job_lease_lost', true);
    }
    const installation = await lockActiveIkasStoreInstallationGeneration(
      tx,
      job.storeId,
      job.batch.installationGeneration,
    );
    const latestAttempt = job.attemptsLog[0];
    const recoverableProcessing = job.status === 'processing' && Boolean(
      latestAttempt && (latestAttempt.status === 'prepared' || latestAttempt.sendCommittedAt),
    );
    if (CLOSED_BATCH_STATUSES.includes(job.batch.status as (typeof CLOSED_BATCH_STATUSES)[number])) {
      if (latestAttempt?.status === 'prepared' && !latestAttempt.sendCommittedAt) {
        await abandonPreparedBatchAttempt(tx, latestAttempt.id, now, 'batch_closed_before_send');
      }
      await tx.reviewEmailJob.updateMany({
        where: { id: job.id, status: { notIn: ['sent', 'failed', 'cancelled', 'skipped'] } },
        data: { status: 'cancelled', completedAt: now, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'batch_closed' },
      });
      return batchJobFailure('review_email_batch_closed');
    }
    if (!ACTIVE_JOB_STATUSES.includes(job.status as (typeof ACTIVE_JOB_STATUSES)[number]) && !recoverableProcessing) {
      return batchJobFailure('review_email_job_not_claimable', job.status === 'processing');
    }
    if (job.expiresAt && job.expiresAt <= now) {
      if (latestAttempt?.status === 'prepared' && !latestAttempt.sendCommittedAt) {
        await abandonPreparedBatchAttempt(tx, latestAttempt.id, now, 'job_expired_before_send');
      }
      await tx.reviewEmailJob.update({ where: { id: job.id }, data: { status: 'cancelled', completedAt: now, lastErrorCode: 'job_expired' } });
      return batchJobFailure('review_email_job_expired');
    }

    if (latestAttempt?.status === 'prepared' && !latestAttempt.sendCommittedAt) {
      if (latestAttempt.createdAt > staleBefore) return batchJobFailure('review_email_attempt_in_progress', true);
      await abandonPreparedBatchAttempt(tx, latestAttempt.id, now);
      await tx.reviewEmailJob.update({
        where: { id: job.id },
        data: { status: 'retrying', completedAt: null, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'sender_crashed_before_send' },
      });
    } else if (latestAttempt?.sendCommittedAt) {
      await tx.reviewEmailAttempt.updateMany({
        where: { id: latestAttempt.id, status: { in: ['sending', 'prepared'] } },
        data: { status: 'awaiting_confirmation', errorCode: 'sender_result_missing' },
      });
      await tx.reviewEmailJob.update({
        where: { id: job.id },
        data: { status: 'awaiting_confirmation', leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'sender_result_missing' },
      });
      return batchJobFailure('review_email_send_awaiting_confirmation');
    }

    if (
      !job.batch.recipientEmailEncrypted ||
      !job.batch.recipientEmailHash ||
      !job.batch.recipientEmailFoldedHash ||
      !job.batch.recipientEmailHashKeyVersion ||
      piiHashVersion(job.batch.recipientEmailHash) !== job.batch.recipientEmailHashKeyVersion
    ) {
      return batchJobFailure('review_email_recipient_missing');
    }
    const recipient = decryptText(job.batch.recipientEmailEncrypted);
    const foldedHashes = hashFoldedEmailCandidates(recipient);
    await lockReviewEmailRecipient(tx, {
      storeId: job.storeId,
      category: REVIEW_EMAIL_CATEGORY,
      foldedSubjectHash: job.batch.recipientEmailFoldedHash,
    });
    const settings = await tx.reviewEmailSettings.findUnique({ where: { storeId: job.storeId } });
    if (
      !installation || !settings || !cutoffAllowsBatch(settings, job.batch) || job.batch.emailAccessStatus !== 'allowed' ||
      await effectiveSuppressionExists(tx, { storeId: job.storeId, foldedHashes, now })
    ) {
      await tx.reviewEmailJob.update({
        where: { id: job.id },
        data: { status: 'cancelled', completedAt: now, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'email_access_denied' },
      });
      return batchJobFailure('review_email_access_denied');
    }
    if (job.kind === 'reminder' && (!settings.reminderEnabled || job.batch.maxReminderCountSnapshot < job.sequence)) {
      await tx.reviewEmailJob.update({
        where: { id: job.id },
        data: { status: 'skipped', completedAt: now, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'reminders_disabled' },
      });
      return batchJobFailure('review_email_reminders_disabled');
    }
    if (job.kind === 'reminder') {
      const initialAttempt = await tx.reviewEmailAttempt.findFirst({
        where: { job: { batchId: job.batchId, kind: 'request' }, sendCommittedAt: { not: null } },
        orderBy: { sendCommittedAt: 'desc' },
        select: {
          firstDeliveryDelayedAt: true,
          lastDeliveryDelayedAt: true,
          deliveredAt: true,
          bouncedAt: true,
          complainedAt: true,
          rejectedAt: true,
          status: true,
        },
      });
      if (!initialAttempt || initialAttempt.bouncedAt || initialAttempt.complainedAt || initialAttempt.rejectedAt) {
        await tx.reviewEmailJob.update({
          where: { id: job.id },
          data: { status: 'cancelled', completedAt: now, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'initial_delivery_failed' },
        });
        return batchJobFailure('review_email_initial_delivery_failed');
      }
      if (initialAttempt.firstDeliveryDelayedAt && !initialAttempt.deliveredAt) {
        const delayBase = initialAttempt.lastDeliveryDelayedAt ?? initialAttempt.firstDeliveryDelayedAt;
        const retryAt = new Date(Math.max(now.getTime(), delayBase.getTime()) + REVIEW_EMAIL_MIN_PHYSICAL_GAP_HOURS * 60 * 60 * 1000);
        await tx.reviewEmailJob.update({
          where: { id: job.id },
          data: { status: 'pending', sendAfter: retryAt, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'initial_delivery_delayed' },
        });
        return batchJobFailure('review_email_initial_delivery_delayed', true);
      }
    }

    const releaseAt = await applyFrequencyGovernor(tx, {
      storeId: job.storeId,
      batchId: job.batchId,
      kind: job.kind as 'request' | 'reminder',
      foldedHashes,
      now,
    });
    if (releaseAt) {
      await tx.reviewEmailJob.update({
        where: { id: job.id },
        data: { status: 'pending', sendAfter: releaseAt, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'frequency_governor_deferred' },
      });
      return batchJobFailure('review_email_frequency_deferred', true);
    }

    const unresolved = job.batch.requests.filter((request) => requestIsEligibleForAttempt(request.status, job.kind as 'request' | 'reminder'));
    if (unresolved.length === 0) {
      await tx.reviewEmailJob.update({ where: { id: job.id }, data: { status: 'cancelled', completedAt: now, lastErrorCode: 'no_eligible_items' } });
      return batchJobFailure('review_email_no_eligible_items');
    }
    const productNames = new Map(
      (await tx.productSnapshot.findMany({
        where: {
          storeId: job.storeId,
          productId: { in: [...new Set(unresolved.map((request) => request.productId))] },
        },
        select: { productId: true, name: true },
      })).map((product) => [product.productId, product.name]),
    );
    const manifest: ReviewEmailAttemptManifest = {
      schemaVersion: 1,
      batchId: job.batch.id,
      membershipVersion: job.batch.membershipVersion,
      kind: job.kind as 'request' | 'reminder',
      sequence: job.sequence,
      totalEligibleItems: unresolved.length,
      items: unresolved.slice(0, REVIEW_EMAIL_MAX_MANIFEST_ITEMS).map((request, position) => ({
        itemId: request.id,
        productId: request.productId,
        position,
        productName: request.orderLineSnapshot.productName ?? productNames.get(request.productId) ?? null,
        variantName: request.orderLineSnapshot.variantName,
      })),
    };
    const claimed = await tx.reviewEmailJob.updateMany({
      where: {
        id: job.id,
        status: { in: [...ACTIVE_JOB_STATUSES] },
        leaseVersion: job.leaseVersion,
      },
      data: { status: 'processing', leaseOwner: null, leaseExpiresAt: null, lastErrorCode: null },
    });
    if (claimed.count !== 1) return batchJobFailure('review_email_job_not_claimable', true);

    const attempt = await tx.reviewEmailAttempt.create({
      data: {
        jobId: job.id,
        attemptNumber: (latestAttempt?.attemptNumber ?? 0) + 1,
        correlationId: randomUUID().replaceAll('-', ''),
        provider: 'ses',
        recipientEmailHash: job.batch.recipientEmailHash,
        recipientEmailFoldedHash: job.batch.recipientEmailFoldedHash,
        recipientEmailHashKeyVersion: job.batch.recipientEmailHashKeyVersion,
        recipientEmailNormalizationVersion: job.batch.recipientEmailNormalizationVersion,
        recipientEmailEncrypted: job.batch.recipientEmailEncrypted,
        recipientVersion: job.batch.recipientVersion,
        templateVersion: job.batch.templateVersionSnapshot,
        locale: job.batch.localeSnapshot,
        contentManifest: manifest,
        contentDigest: manifestDigest(manifest),
        status: 'prepared',
      },
    });
    const token = await prepareReviewEmailBatchToken(tx, { batchId: job.batch.id, attemptId: attempt.id });
    const unsubscribe = await prepareReviewEmailUnsubscribeToken(tx, {
      storeId: job.storeId,
      recipientFoldedHash: job.batch.recipientEmailFoldedHash,
      recipientExactHash: job.batch.recipientEmailHash,
      recipientExactHashKeyVersion: job.batch.recipientEmailHashKeyVersion,
      recipientEmailNormalizationVersion: job.batch.recipientEmailNormalizationVersion,
      attemptId: attempt.id,
    });
    return {
      state: 'ready' as const,
      envelope: {
        attemptId: attempt.id,
        correlationId: attempt.correlationId,
        recipient,
        templateVersion: attempt.templateVersion,
        locale: attempt.locale,
        kind: manifest.kind,
        sequence: manifest.sequence,
        reviewUrl: buildReviewRequestEmailUrl(token.rawToken),
        unsubscribeUrl: unsubscribe.unsubscribeUrl,
        headers: {
          listUnsubscribe: `<${buildReviewEmailUnsubscribeUrl(unsubscribe.rawToken)}>`,
          listUnsubscribePost: 'List-Unsubscribe=One-Click',
        },
        manifest,
      },
    };
  });
  if (outcome.state === 'error') throw new ReviewEmailBatchJobError(outcome.code, outcome.retryable);
  return outcome.envelope;
}

export async function commitReviewEmailBatchSend(
  db: BatchJobDb,
  attemptId: string,
  now = new Date(),
): Promise<{ expiresAt: Date }> {
  const outcome: CommitBatchSendOutcome = await db.$transaction(async (tx) => {
    const attempt = await tx.reviewEmailAttempt.findUnique({
      where: { id: attemptId },
      include: { job: { include: { batch: true } } },
    });
    const batch = attempt?.job.batch;
    if (!attempt || !batch || !attempt.job.batchId || attempt.job.requestId || attempt.status !== 'prepared' || attempt.sendCommittedAt) {
      return batchJobFailure('review_email_attempt_not_prepared');
    }
    if (!attempt.recipientEmailFoldedHash || !attempt.recipientEmailEncrypted) return batchJobFailure('review_email_recipient_missing');
    const manifest = parseAttemptManifest(attempt.contentManifest);
    const stalePreparedAttempt =
      !manifest ||
      manifest.batchId !== batch.id ||
      manifest.membershipVersion !== batch.membershipVersion ||
      manifest.kind !== attempt.job.kind ||
      manifest.sequence !== attempt.job.sequence ||
      batch.recipientVersion !== attempt.recipientVersion;
    if (stalePreparedAttempt) {
      await abandonPreparedBatchAttempt(tx, attempt.id, now, 'batch_changed_before_send_commit');
      await tx.reviewEmailJob.update({
        where: { id: attempt.jobId },
        data: { status: 'retrying', sendAfter: now, completedAt: null, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'batch_changed_before_send_commit' },
      });
      return batchJobFailure('review_email_batch_changed_before_send_commit', true);
    }
    if (CLOSED_BATCH_STATUSES.includes(batch.status as (typeof CLOSED_BATCH_STATUSES)[number])) {
      await abandonPreparedBatchAttempt(tx, attempt.id, now, 'batch_closed_before_send_commit');
      await tx.reviewEmailJob.update({
        where: { id: attempt.jobId },
        data: { status: 'cancelled', completedAt: now, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'batch_closed_before_send_commit' },
      });
      return batchJobFailure('review_email_send_commit_denied');
    }
    const installation = await lockActiveIkasStoreInstallationGeneration(
      tx,
      attempt.job.storeId,
      batch.installationGeneration,
    );
    await lockReviewEmailRecipient(tx, {
      storeId: attempt.job.storeId,
      category: REVIEW_EMAIL_CATEGORY,
      foldedSubjectHash: attempt.recipientEmailFoldedHash,
    });
    const recipient = decryptText(attempt.recipientEmailEncrypted);
    const foldedHashes = hashFoldedEmailCandidates(recipient);
    const settings = await tx.reviewEmailSettings.findUnique({ where: { storeId: attempt.job.storeId } });
    const suppressed = await effectiveSuppressionExists(tx, { storeId: attempt.job.storeId, foldedHashes, now });
    if (
      !installation || !cutoffAllowsBatch(settings, batch) || suppressed || batch.emailAccessStatus !== 'allowed'
    ) {
      await abandonPreparedBatchAttempt(tx, attempt.id, now, 'email_access_denied_before_send_commit');
      await tx.reviewEmailJob.update({
        where: { id: attempt.jobId },
        data: { status: 'cancelled', completedAt: now, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'email_access_denied' },
      });
      return batchJobFailure('review_email_send_commit_denied');
    }
    const releaseAt = await applyFrequencyGovernor(tx, {
      storeId: attempt.job.storeId,
      batchId: batch.id,
      kind: attempt.job.kind as 'request' | 'reminder',
      foldedHashes,
      now,
    });
    if (releaseAt) {
      await abandonPreparedBatchAttempt(tx, attempt.id, now, 'frequency_governor_deferred_before_send_commit');
      await tx.reviewEmailJob.update({
        where: { id: attempt.jobId },
        data: {
          status: 'pending',
          sendAfter: releaseAt,
          completedAt: null,
          leaseOwner: null,
          leaseExpiresAt: null,
          lastErrorCode: 'frequency_governor_deferred',
        },
      });
      return batchJobFailure('review_email_frequency_deferred', true);
    }
    const activated = await activatePreparedReviewEmailBatchToken(tx, { attemptId, sendCommittedAt: now });
    const confirmationDeadlineAt = new Date(now.getTime() + REVIEW_EMAIL_CONFIRMATION_TIMEOUT_HOURS * 60 * 60 * 1000);
    const committed = await tx.reviewEmailAttempt.updateMany({
      where: { id: attemptId, status: 'prepared', sendCommittedAt: null, recipientVersion: batch.recipientVersion },
      data: { status: 'sending', sendCommittedAt: now, sendInitiatedAt: now, confirmationDeadlineAt },
    });
    if (committed.count !== 1) throw new ReviewEmailBatchJobError('review_email_attempt_not_prepared');
    const frozen = await tx.reviewEmailBatch.updateMany({
      where: {
        id: batch.id,
        recipientVersion: batch.recipientVersion,
        membershipVersion: batch.membershipVersion,
        status: { in: ['scheduled', 'sending', 'active'] },
      },
      data: {
        status: 'sending',
        groupingFrozenAt: batch.groupingFrozenAt ?? now,
        recipientFrozenAt: batch.recipientFrozenAt ?? now,
        expiresAt: maxDate(batch.expiresAt, activated.expiresAt),
      },
    });
    if (frozen.count !== 1) throw new ReviewEmailBatchJobError('review_email_batch_changed_during_send_commit', true);
    await tx.reviewRequest.updateMany({
      where: { batchId: batch.id, status: { in: ['scheduled', 'error'] } },
      data: { status: 'sending', expiresAt: activated.expiresAt },
    });
    await tx.reviewEmailJob.update({ where: { id: attempt.jobId }, data: { status: 'processing', lastErrorCode: null } });
    return { state: 'committed' as const, expiresAt: activated.expiresAt };
  });
  if (outcome.state === 'error') throw new ReviewEmailBatchJobError(outcome.code, outcome.retryable);
  return { expiresAt: outcome.expiresAt };
}

export async function finalizeAcceptedReviewEmailBatchAttempt(
  tx: Prisma.TransactionClient,
  input: { attemptId: string; acceptedAt: Date; providerMessageId?: string | null },
): Promise<void> {
  const attempt = await tx.reviewEmailAttempt.findUnique({
    where: { id: input.attemptId },
    include: { job: { include: { batch: true } } },
  });
  const batch = attempt?.job.batch;
  if (!attempt || !batch || !attempt.sendCommittedAt) throw new ReviewEmailBatchJobError('review_email_attempt_not_committed');
  const firstAcceptance = attempt.acceptedAt === null;
  const providerMessageId = input.providerMessageId?.trim() || null;
  const providerMessageIdHash = providerMessageId ? hashProviderMessageId(providerMessageId) : null;
  await tx.reviewEmailAttempt.update({
    where: { id: attempt.id },
    data: {
      status: 'accepted',
      acceptedAt: attempt.acceptedAt ?? input.acceptedAt,
      providerMessageId: providerMessageId ?? attempt.providerMessageId,
      providerMessageIdHash: providerMessageIdHash ?? attempt.providerMessageIdHash,
      providerMessageIdHashKeyVersion: providerMessageIdHash ? piiHashVersion(providerMessageIdHash) : attempt.providerMessageIdHashKeyVersion,
      completedAt: input.acceptedAt,
      errorCode: null,
    },
  });
  await tx.reviewEmailJob.update({
    where: { id: attempt.jobId },
    data: { status: 'sent', completedAt: input.acceptedAt, lastErrorCode: null, leaseOwner: null, leaseExpiresAt: null },
  });
  if (!firstAcceptance) return;
  await recordReviewEmailBatchMetricContribution(tx, {
    batchId: batch.id,
    dedupeKey: `review-email-attempt:${attempt.id}:accepted`,
    metricDate: attempt.acceptedAt ?? input.acceptedAt,
    kind: attempt.job.kind,
    templateVersion: attempt.templateVersion,
    locale: attempt.locale,
    metric: 'accepted',
  });
  const manifest = parseAttemptManifest(attempt.contentManifest);
  if (!manifest || manifest.batchId !== batch.id) throw new ReviewEmailBatchJobError('review_email_attempt_manifest_invalid');
  const includedRequests = await tx.reviewRequest.findMany({
    where: { batchId: batch.id, id: { in: manifest.items.map((item) => item.itemId) } },
    select: { id: true, receiptId: true },
  });
  for (const request of includedRequests) {
    if (!request.receiptId) continue;
    await recordReviewEmailMetricContribution(tx, {
      receiptId: request.receiptId,
      dedupeKey: `review-email-attempt:${attempt.id}:request:${request.id}:included`,
      metricDate: attempt.acceptedAt ?? input.acceptedAt,
      kind: attempt.job.kind,
      templateVersion: attempt.templateVersion,
      locale: attempt.locale,
      metric: attempt.job.kind === 'request' ? 'initialRequestsIncluded' : 'reminderRequestsIncluded',
    });
  }
  if (attempt.job.kind === 'request') {
    await tx.reviewEmailBatch.updateMany({
      where: { id: batch.id, status: { in: ['sending', 'scheduled', 'active'] } },
      data: { status: 'active', firstSentAt: batch.firstSentAt ?? input.acceptedAt },
    });
    await tx.reviewRequest.updateMany({
      where: { batchId: batch.id, status: { in: ['scheduled', 'sending', 'sent_unknown', 'error'] } },
      data: { status: 'sent', firstSentAt: input.acceptedAt },
    });
    if (batch.emailAccessStatus === 'allowed' && batch.maxReminderCountSnapshot > 0) {
      const unresolved = await tx.reviewRequest.count({ where: { batchId: batch.id, status: 'sent' } });
      if (unresolved > 0) {
        const sendAfter = addDays(input.acceptedAt, batch.reminderDelayDaysSnapshot);
        const reminderExpiresAt = addDays(sendAfter, DEFAULT_TOKEN_EXPIRES_DAYS);
        await tx.reviewEmailBatch.updateMany({
          where: {
            id: batch.id,
            OR: [{ expiresAt: null }, { expiresAt: { lt: reminderExpiresAt } }],
          },
          data: { expiresAt: reminderExpiresAt },
        });
        await tx.reviewRequest.updateMany({
          where: {
            batchId: batch.id,
            status: 'sent',
            OR: [{ expiresAt: null }, { expiresAt: { lt: reminderExpiresAt } }],
          },
          data: { expiresAt: reminderExpiresAt },
        });
        const existingReminder = await tx.reviewEmailJob.findFirst({ where: { batchId: batch.id, kind: 'reminder', sequence: 1 } });
        if (!existingReminder) {
          await tx.reviewEmailJob.create({
            data: {
              requestId: null,
              batchId: batch.id,
              storeId: batch.storeId,
              productId: null,
              kind: 'reminder',
              sequence: 1,
              status: 'pending',
              sendAfter,
              expiresAt: reminderExpiresAt,
              dedupeKey: `review-email-batch:${batch.id}:reminder:1`,
            },
          });
        }
      }
    }
  } else {
    await tx.reviewEmailBatch.updateMany({
      where: { id: batch.id, status: 'active' },
      data: { reminderCount: { increment: 1 }, lastReminderSentAt: input.acceptedAt },
    });
    await tx.reviewRequest.updateMany({
      where: { batchId: batch.id, status: { in: ['sent', 'sent_unknown'] } },
      data: { lastReminderSentAt: input.acceptedAt, reminderCount: { increment: 1 } },
    });
  }
}

export async function markReviewEmailBatchAwaitingConfirmation(
  db: BatchJobDb,
  attemptId: string,
  now = new Date(),
): Promise<void> {
  await db.$transaction(async (tx) => {
    const attempt = await tx.reviewEmailAttempt.findUnique({ where: { id: attemptId }, include: { job: true } });
    if (!attempt?.job.batchId || !attempt.sendCommittedAt) throw new ReviewEmailBatchJobError('review_email_attempt_not_committed');
    await tx.reviewEmailAttempt.updateMany({
      where: { id: attemptId, status: { in: ['sending', 'prepared'] } },
      data: { status: 'awaiting_confirmation', errorCode: 'sender_result_missing', confirmationDeadlineAt: attempt.confirmationDeadlineAt ?? now },
    });
    await tx.reviewEmailJob.update({
      where: { id: attempt.jobId },
      data: { status: 'awaiting_confirmation', leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'sender_result_missing' },
    });
    if (attempt.job.kind === 'request') {
      await tx.reviewRequest.updateMany({ where: { batchId: attempt.job.batchId, status: 'sending' }, data: { status: 'sent_unknown' } });
    }
  });
}

export async function markReviewEmailBatchConfirmedNotSent(
  db: BatchJobDb,
  attemptId: string,
  now = new Date(),
): Promise<void> {
  await db.$transaction(async (tx) => {
    const attempt = await tx.reviewEmailAttempt.findUnique({ where: { id: attemptId }, include: { job: true } });
    if (!attempt?.job.batchId || !attempt.sendCommittedAt || !['awaiting_confirmation', 'outcome_unknown'].includes(attempt.status)) {
      throw new ReviewEmailBatchJobError('review_email_attempt_not_confirmable');
    }
    if (attempt.status === 'outcome_unknown') {
      await recordReviewEmailBatchMetricContribution(tx, {
        batchId: attempt.job.batchId,
        dedupeKey: `review-email-attempt:${attempt.id}:outcome-unknown-confirmed-not-sent`,
        metricDate: attempt.outcomeUnknownAt ?? attempt.sendCommittedAt,
        kind: attempt.job.kind,
        templateVersion: attempt.templateVersion,
        locale: attempt.locale,
        metric: 'outcomeUnknown',
        delta: -1,
      });
    }
    await tx.reviewEmailAttempt.update({
      where: { id: attemptId },
      data: { status: 'confirmed_not_sent', completedAt: now, errorCode: 'confirmed_not_sent' },
    });
    await tx.reviewRequestToken.updateMany({
      where: { attemptId, status: { in: ['prepared', 'active'] } },
      data: { status: 'revoked', revokedAt: now, revocationReason: 'confirmed_not_sent' },
    });
    await tx.reviewEmailUnsubscribeToken.updateMany({
      where: { createdFromAttemptId: attemptId, status: 'active' },
      data: { status: 'revoked', revokedAt: now },
    });
    const attemptToken = await tx.reviewRequestToken.findUnique({ where: { attemptId }, select: { id: true } });
    await tx.reviewRequestSession.updateMany({
      where: { tokenId: attemptToken?.id ?? '__missing__', status: 'active' },
      data: { status: 'revoked', revokedAt: now, revocationReason: 'confirmed_not_sent' },
    });
    await tx.reviewEmailJob.update({
      where: { id: attempt.jobId },
      data: { status: 'retrying', sendAfter: now, completedAt: null, lastErrorCode: 'confirmed_not_sent' },
    });
    if (attempt.job.kind === 'request') {
      await tx.reviewEmailBatch.updateMany({ where: { id: attempt.job.batchId, status: 'sending' }, data: { status: 'scheduled' } });
      await tx.reviewRequest.updateMany({ where: { batchId: attempt.job.batchId, status: 'sent_unknown' }, data: { status: 'scheduled' } });
    }
  });
}
