import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  activateBatchToken: vi.fn(),
  lockRecipient: vi.fn(),
  prepareBatchToken: vi.fn(),
  prepareUnsubscribeToken: vi.fn(),
}));

vi.mock('@/lib/review-email/config', () => ({
  isReviewEmailEnabled: () => true,
}));

vi.mock('@/lib/review-email/pii', () => ({
  decryptText: () => 'Customer@example.com',
  hashFoldedEmailCandidates: () => ['folded-v2', 'folded-v1'],
  hashProviderMessageId: (value: string) => `provider:${value}`,
  piiHashVersion: () => 2,
}));

vi.mock('@/lib/review-email/public-access', () => ({
  buildReviewRequestEmailUrl: (token: string) => `https://reviews.renuvex.app/request#token=${token}`,
}));

vi.mock('@/lib/review-email/subject-lock', () => ({
  lockReviewEmailRecipient: mocks.lockRecipient,
}));

vi.mock('@/lib/review-email/tokens', () => ({
  activatePreparedReviewEmailBatchToken: mocks.activateBatchToken,
  prepareReviewEmailBatchToken: mocks.prepareBatchToken,
}));

vi.mock('@/lib/review-email/unsubscribe', () => ({
  buildReviewEmailUnsubscribeUrl: (token: string) => `https://reviews.renuvex.app/api/public/review-center/unsubscribe?token=${token}`,
  prepareReviewEmailUnsubscribeToken: mocks.prepareUnsubscribeToken,
}));

vi.mock('@/lib/review-email/analytics', () => ({
  recordReviewEmailBatchMetricContribution: vi.fn(),
  recordReviewEmailMetricContribution: vi.fn(),
}));

import {
  applyReviewEmailConsentDenial,
  commitReviewEmailBatchSend,
  finalizeAcceptedReviewEmailBatchAttempt,
  markReviewEmailBatchAwaitingConfirmation,
  markReviewEmailBatchConfirmedNotSent,
  prepareReviewEmailBatchSend,
  ReviewEmailBatchJobError,
} from '@/lib/review-email/batch-jobs';

const NOW = new Date('2026-07-15T10:00:00.000Z');

function request(overrides: Record<string, unknown> = {}) {
  return {
    id: 'request-1',
    productId: 'product-1',
    status: 'scheduled',
    batchPosition: 0,
    orderLineSnapshot: {
      productName: 'Product One',
      variantName: 'Default',
    },
    ...overrides,
  };
}

function batch(overrides: Record<string, unknown> = {}) {
  return {
    id: 'batch-1',
    orderSnapshotId: 'order-snapshot-1',
    storeId: 'store-1',
    installationGeneration: 3,
    status: 'scheduled',
    emailAccessStatus: 'allowed',
    membershipVersion: 1,
    recipientVersion: 1,
    recipientEmailHash: 'exact-v2',
    recipientEmailFoldedHash: 'folded-v2',
    recipientEmailHashKeyVersion: 2,
    recipientEmailNormalizationVersion: 2,
    recipientEmailEncrypted: 'encrypted-recipient',
    templateVersionSnapshot: 'default_v1',
    localeSnapshot: 'tr',
    maxReminderCountSnapshot: 1,
    reminderDelayDaysSnapshot: 1,
    groupingFrozenAt: null,
    recipientFrozenAt: null,
    firstSentAt: null,
    eligibilityStartsAtSnapshot: new Date('2026-07-01T00:00:00.000Z'),
    eligibleAt: new Date('2026-07-10T00:00:00.000Z'),
    expiresAt: null,
    requests: [request()],
    ...overrides,
  };
}

function job(
  overrides: Record<string, unknown> = {},
  batchOverrides: Record<string, unknown> = {},
) {
  return {
    id: 'job-1',
    requestId: null,
    batchId: 'batch-1',
    storeId: 'store-1',
    productId: null,
    kind: 'request',
    sequence: 0,
    status: 'pending',
    leaseVersion: 4,
    expiresAt: null,
    batch: batch(batchOverrides),
    attemptsLog: [],
    ...overrides,
  };
}

function manifest(overrides: Record<string, unknown> = {}) {
  return {
    schemaVersion: 1,
    batchId: 'batch-1',
    membershipVersion: 1,
    kind: 'request',
    sequence: 0,
    totalEligibleItems: 1,
    items: [{
      itemId: 'request-1',
      productId: 'product-1',
      position: 0,
      productName: 'Product One',
      variantName: 'Default',
    }],
    ...overrides,
  };
}

function preparedAttempt(overrides: Record<string, unknown> = {}) {
  return {
    id: 'attempt-1',
    jobId: 'job-1',
    attemptNumber: 1,
    status: 'prepared',
    sendCommittedAt: null,
    sendInitiatedAt: null,
    confirmationDeadlineAt: null,
    consentSource: 'ikas_list_customer',
    consentStatus: 'SUBSCRIBED',
    consentStatusUpdatedAt: new Date('2026-07-14T12:00:00.000Z'),
    consentCheckedAt: NOW,
    createdAt: new Date('2026-07-15T09:59:00.000Z'),
    recipientEmailFoldedHash: 'folded-v2',
    recipientEmailEncrypted: 'encrypted-recipient',
    recipientVersion: 1,
    contentManifest: manifest(),
    job: {
      id: 'job-1',
      requestId: null,
      batchId: 'batch-1',
      storeId: 'store-1',
      kind: 'request',
      sequence: 0,
      batch: batch(),
    },
    ...overrides,
  };
}

function consentEvidence(overrides: Record<string, unknown> = {}) {
  return {
    source: 'ikas_list_customer' as const,
    status: 'SUBSCRIBED' as const,
    statusUpdatedAt: new Date('2026-07-14T12:00:00.000Z'),
    checkedAt: NOW,
    storeId: 'store-1',
    batchId: 'batch-1',
    orderSnapshotId: 'order-snapshot-1',
    recipientVersion: 1,
    recipientExactLookupHashes: ['exact-v2', 'exact-v1'],
    ...overrides,
  };
}

function transaction(jobRow: ReturnType<typeof job> | null = job()) {
  const tx = {
    $executeRaw: vi.fn().mockResolvedValue(1),
    $queryRaw: vi.fn().mockResolvedValue([{
      storeId: 'store-1', status: 'active', generation: 3,
    }]),
    ikasStoreInstallation: {
      findUnique: vi.fn().mockResolvedValue({ status: 'active', generation: 3 }),
    },
    reviewEmailAttempt: {
      create: vi.fn().mockResolvedValue({
        id: 'attempt-new',
        correlationId: 'correlation-1',
        templateVersion: 'default_v1',
        locale: 'tr',
      }),
      findMany: vi.fn().mockResolvedValue([]),
      findUnique: vi.fn().mockResolvedValue(null),
      update: vi.fn().mockResolvedValue({}),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    productSnapshot: {
      findMany: vi.fn().mockResolvedValue([{ productId: 'product-1', name: 'Product One' }]),
    },
    reviewEmailBatch: {
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    reviewEmailJob: {
      create: vi.fn().mockResolvedValue({ id: 'reminder-job-1' }),
      findFirst: vi.fn().mockResolvedValue(null),
      findUnique: vi.fn().mockResolvedValue(jobRow),
      update: vi.fn().mockResolvedValue({}),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    reviewEmailSettings: {
      findUnique: vi.fn().mockResolvedValue({
        enabled: true,
        eligibilityStartsAt: new Date('2026-07-01T00:00:00.000Z'),
        reminderEnabled: true,
      }),
    },
    reviewEmailSuppression: {
      findFirst: vi.fn().mockResolvedValue(null),
    },
    reviewEmailUnsubscribeToken: {
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    reviewRequest: {
      count: vi.fn().mockResolvedValue(1),
      findMany: vi.fn().mockResolvedValue([{ id: 'request-1', receiptId: null }]),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    reviewRequestToken: {
      findUnique: vi.fn().mockResolvedValue({ id: 'token-1' }),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    reviewRequestSession: {
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
  };
  const db = {
    $transaction: vi.fn(async (callback: (client: typeof tx) => unknown) => callback(tx)),
  };
  return { db, tx };
}

describe('review email batch sender transaction boundaries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.prepareBatchToken.mockResolvedValue({ rawToken: 'raw-review-token' });
    mocks.prepareUnsubscribeToken.mockResolvedValue({
      rawToken: 'raw-unsubscribe-token',
      unsubscribeUrl: 'https://reviews.renuvex.app/api/public/review-center/unsubscribe?token=raw-unsubscribe-token',
    });
    mocks.activateBatchToken.mockResolvedValue({
      tokenId: 'token-1',
      batchId: 'batch-1',
      expiresAt: new Date('2026-08-14T10:00:00.000Z'),
    });
  });

  it('abandons a stale pre-provider attempt and prepares a new attempt', async () => {
    const stale = preparedAttempt({ createdAt: new Date('2026-07-15T09:30:00.000Z') });
    const row = job({ status: 'processing', attemptsLog: [stale] });
    const { db, tx } = transaction(row);

    const envelope = await prepareReviewEmailBatchSend(db as never, 'job-1', {
      now: NOW,
      consentEvidence: consentEvidence(),
    });

    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith({
      where: { id: 'attempt-1', status: 'prepared', sendCommittedAt: null },
      data: {
        status: 'abandoned_before_send',
        completedAt: NOW,
        errorCode: 'sender_crashed_before_send',
      },
    });
    expect(tx.reviewRequestToken.updateMany).toHaveBeenCalledWith({
      where: { attemptId: 'attempt-1', status: 'prepared' },
      data: {
        status: 'revoked',
        revokedAt: NOW,
        revocationReason: 'sender_crashed_before_send',
      },
    });
    expect(tx.reviewEmailAttempt.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        attemptNumber: 2,
        status: 'prepared',
        consentSource: 'ikas_list_customer',
        consentStatus: 'SUBSCRIBED',
        consentStatusUpdatedAt: new Date('2026-07-14T12:00:00.000Z'),
        consentCheckedAt: NOW,
      }),
    }));
    expect(envelope.attemptId).toBe('attempt-new');
  });

  it('uses the product snapshot when ikas order-line data has no product name', async () => {
    const row = job({}, { requests: [request({ orderLineSnapshot: { productName: null, variantName: 'Default' } })] });
    const { db } = transaction(row);

    const envelope = await prepareReviewEmailBatchSend(db as never, 'job-1', {
      now: NOW,
      consentEvidence: consentEvidence(),
    });

    expect(envelope.manifest.items[0]?.productName).toBe('Product One');
    expect(mocks.prepareUnsubscribeToken).toHaveBeenCalledWith(expect.anything(), {
      storeId: 'store-1',
      recipientFoldedHash: 'folded-v2',
      recipientExactHash: 'exact-v2',
      recipientExactHashKeyVersion: 2,
      recipientEmailNormalizationVersion: 2,
      attemptId: 'attempt-new',
    });
  });

  it('persists awaiting confirmation instead of retrying a committed attempt', async () => {
    const committedAt = new Date('2026-07-15T09:55:00.000Z');
    const row = job({
      status: 'processing',
      attemptsLog: [preparedAttempt({ status: 'sending', sendCommittedAt: committedAt })],
    });
    const { db, tx } = transaction(row);

    await expect(prepareReviewEmailBatchSend(db as never, 'job-1', {
      now: NOW,
      consentEvidence: consentEvidence(),
    })).rejects.toMatchObject({
      code: 'review_email_send_awaiting_confirmation',
      retryable: false,
    });

    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith({
      where: { id: 'attempt-1', status: { in: ['sending', 'prepared'] } },
      data: {
        status: 'awaiting_confirmation',
        errorCode: 'sender_result_missing',
        confirmationDeadlineAt: new Date('2026-07-16T09:55:00.000Z'),
      },
    });
    expect(tx.reviewEmailJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'awaiting_confirmation' }),
    }));
    expect(tx.reviewEmailAttempt.create).not.toHaveBeenCalled();
  });

  it('preserves a persisted confirmation deadline when the sender result is ambiguous', async () => {
    const deadline = new Date('2026-07-16T12:30:00.000Z');
    const { db, tx } = transaction();
    tx.reviewEmailAttempt.findUnique.mockResolvedValue(preparedAttempt({
      status: 'sending',
      sendCommittedAt: new Date('2026-07-15T09:55:00.000Z'),
      sendInitiatedAt: new Date('2026-07-15T09:56:00.000Z'),
      confirmationDeadlineAt: deadline,
    }));

    await markReviewEmailBatchAwaitingConfirmation(db as never, 'attempt-1');

    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith({
      where: { id: 'attempt-1', status: { in: ['sending', 'prepared'] } },
      data: {
        status: 'awaiting_confirmation',
        errorCode: 'sender_result_missing',
        confirmationDeadlineAt: deadline,
      },
    });
    expect(tx.reviewRequestToken.updateMany).not.toHaveBeenCalled();
    expect(tx.reviewRequestSession.updateMany).not.toHaveBeenCalled();
  });

  it('derives a missing legacy confirmation deadline from the provider-call timestamp', async () => {
    const { db, tx } = transaction();
    tx.reviewEmailAttempt.findUnique.mockResolvedValue(preparedAttempt({
      status: 'sending',
      sendCommittedAt: new Date('2026-07-15T09:55:00.000Z'),
      sendInitiatedAt: new Date('2026-07-15T09:56:00.000Z'),
      confirmationDeadlineAt: null,
    }));

    await markReviewEmailBatchAwaitingConfirmation(db as never, 'attempt-1');

    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        confirmationDeadlineAt: new Date('2026-07-16T09:56:00.000Z'),
      }),
    }));
  });

  it('persists access denial before returning a sender error', async () => {
    const { db, tx } = transaction();
    tx.reviewEmailSettings.findUnique.mockResolvedValue({ enabled: false, eligibilityStartsAt: null, reminderEnabled: true });

    await expect(prepareReviewEmailBatchSend(db as never, 'job-1', {
      now: NOW,
      consentEvidence: consentEvidence(),
    })).rejects.toMatchObject({
      code: 'review_email_access_denied',
    });

    expect(tx.reviewEmailJob.update).toHaveBeenCalledWith({
      where: { id: 'job-1' },
      data: {
        status: 'cancelled',
        completedAt: NOW,
        leaseOwner: null,
        leaseExpiresAt: null,
        lastErrorCode: 'email_access_denied',
      },
    });
    expect(tx.reviewEmailAttempt.create).not.toHaveBeenCalled();
  });

  it('closes an unsent batch when current customer consent is denied', async () => {
    const { db, tx } = transaction();

    await applyReviewEmailConsentDenial(db as never, 'job-1', {
      reason: 'customer_not_subscribed',
      revokeAccess: false,
      now: NOW,
    });

    expect(tx.reviewEmailBatch.updateMany).toHaveBeenCalledWith({
      where: { id: 'batch-1', status: { in: ['scheduled', 'sending', 'active'] } },
      data: {
        status: 'cancelled',
        emailAccessStatus: 'consent_denied',
        cancelledAt: NOW,
        cancellationReason: 'customer_not_subscribed',
      },
    });
    expect(tx.reviewRequest.updateMany).toHaveBeenCalledWith({
      where: {
        batchId: 'batch-1',
        status: { in: ['scheduled', 'sending', 'error'] },
        firstSentAt: null,
      },
      data: {
        status: 'cancelled',
        cancelledAt: NOW,
        cancellationReason: 'customer_not_subscribed',
      },
    });
    expect(tx.reviewRequestToken.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ revocationReason: 'customer_not_subscribed' }),
    }));
  });

  it('stops a reminder after consent denial without revoking an existing review link', async () => {
    const row = job(
      { kind: 'reminder', sequence: 1 },
      { status: 'active', firstSentAt: new Date('2026-07-14T10:00:00.000Z') },
    );
    const { db, tx } = transaction(row);

    await applyReviewEmailConsentDenial(db as never, 'job-1', {
      reason: 'customer_subscription_pending',
      revokeAccess: false,
      now: NOW,
    });

    expect(tx.reviewEmailBatch.updateMany).toHaveBeenCalledWith({
      where: { id: 'batch-1', status: { in: ['scheduled', 'sending', 'active'] } },
      data: {
        emailAccessStatus: 'consent_denied',
        cancellationReason: 'customer_subscription_pending',
      },
    });
    expect(tx.reviewRequestToken.updateMany).not.toHaveBeenCalled();
    expect(tx.reviewRequestSession.updateMany).not.toHaveBeenCalled();
  });

  it('does not prepare a batch from an earlier activation epoch', async () => {
    const { db, tx } = transaction(job({}, {
      eligibilityStartsAtSnapshot: new Date('2026-06-01T00:00:00.000Z'),
    }));

    await expect(prepareReviewEmailBatchSend(db as never, 'job-1', {
      now: NOW,
      consentEvidence: consentEvidence(),
    })).rejects.toMatchObject({
      code: 'review_email_access_denied',
    });
    expect(tx.reviewEmailAttempt.create).not.toHaveBeenCalled();
  });

  it('abandons a prepared attempt when membership changed before send commit', async () => {
    const attempt = preparedAttempt({
      contentManifest: manifest({ membershipVersion: 1 }),
      job: preparedAttempt().job,
    });
    attempt.job.batch = batch({ membershipVersion: 2 });
    const { db, tx } = transaction();
    tx.reviewEmailAttempt.findUnique.mockResolvedValue(attempt);

    await expect(commitReviewEmailBatchSend(db as never, 'attempt-1', NOW)).rejects.toMatchObject({
      code: 'review_email_batch_changed_before_send_commit',
      retryable: true,
    });

    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith({
      where: { id: 'attempt-1', status: 'prepared', sendCommittedAt: null },
      data: {
        status: 'abandoned_before_send',
        completedAt: NOW,
        errorCode: 'batch_changed_before_send_commit',
      },
    });
    expect(tx.reviewEmailJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'retrying' }),
    }));
    expect(mocks.activateBatchToken).not.toHaveBeenCalled();
  });

  it('lets suppression win before the provider-call authorization boundary', async () => {
    const { db, tx } = transaction();
    tx.reviewEmailAttempt.findUnique.mockResolvedValue(preparedAttempt());
    tx.reviewEmailSuppression.findFirst.mockResolvedValue({ id: 'suppression-1' });

    await expect(commitReviewEmailBatchSend(db as never, 'attempt-1', NOW)).rejects.toMatchObject({
      code: 'review_email_send_commit_denied',
    });

    expect(mocks.lockRecipient).toHaveBeenCalled();
    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        status: 'abandoned_before_send',
        errorCode: 'email_access_denied_before_send_commit',
      }),
    }));
    expect(tx.reviewEmailJob.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'cancelled', lastErrorCode: 'email_access_denied' }),
    }));
    expect(mocks.activateBatchToken).not.toHaveBeenCalled();
  });

  it('does not commit a prepared attempt after the store activation cutoff changes', async () => {
    const { db, tx } = transaction();
    tx.reviewEmailAttempt.findUnique.mockResolvedValue(preparedAttempt());
    tx.reviewEmailSettings.findUnique.mockResolvedValue({
      enabled: true,
      eligibilityStartsAt: new Date('2026-07-14T00:00:00.000Z'),
      reminderEnabled: true,
    });

    await expect(commitReviewEmailBatchSend(db as never, 'attempt-1', NOW)).rejects.toMatchObject({
      code: 'review_email_send_commit_denied',
    });
    expect(mocks.activateBatchToken).not.toHaveBeenCalled();
    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ errorCode: 'email_access_denied_before_send_commit' }),
    }));
  });

  it('rechecks the governor under the send-commit recipient lock', async () => {
    const { db, tx } = transaction();
    tx.reviewEmailAttempt.findUnique.mockResolvedValue(preparedAttempt());
    tx.reviewEmailAttempt.findMany.mockResolvedValue([{
      sendCommittedAt: new Date('2026-07-15T09:00:00.000Z'),
      job: { batchId: 'batch-2', kind: 'request' },
    }]);

    await expect(commitReviewEmailBatchSend(db as never, 'attempt-1', NOW)).rejects.toMatchObject({
      code: 'review_email_frequency_deferred',
      retryable: true,
    });

    expect(mocks.lockRecipient).toHaveBeenCalled();
    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        status: 'abandoned_before_send',
        errorCode: 'frequency_governor_deferred_before_send_commit',
      }),
    }));
    expect(tx.reviewEmailJob.update).toHaveBeenCalledWith({
      where: { id: 'job-1' },
      data: {
        status: 'pending',
        sendAfter: new Date('2026-07-22T09:00:00.000Z'),
        completedAt: null,
        leaseOwner: null,
        leaseExpiresAt: null,
        lastErrorCode: 'frequency_governor_deferred',
      },
    });
    expect(mocks.activateBatchToken).not.toHaveBeenCalled();
  });

  it('commits token, attempt, and batch freeze as one provider-call authorization transaction', async () => {
    const { db, tx } = transaction();
    tx.reviewEmailAttempt.findUnique.mockResolvedValue(preparedAttempt());

    const result = await commitReviewEmailBatchSend(db as never, 'attempt-1', NOW);

    expect(mocks.activateBatchToken).toHaveBeenCalledWith(tx, {
      attemptId: 'attempt-1',
      sendCommittedAt: NOW,
    });
    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith({
      where: {
        id: 'attempt-1',
        status: 'prepared',
        sendCommittedAt: null,
        recipientVersion: 1,
      },
      data: {
        status: 'sending',
        sendCommittedAt: NOW,
        sendInitiatedAt: NOW,
        confirmationDeadlineAt: new Date('2026-07-16T10:00:00.000Z'),
      },
    });
    expect(tx.reviewEmailBatch.updateMany).toHaveBeenCalledWith({
      where: {
        id: 'batch-1',
        recipientVersion: 1,
        membershipVersion: 1,
        status: { in: ['scheduled', 'sending', 'active'] },
      },
      data: {
        status: 'sending',
        groupingFrozenAt: NOW,
        recipientFrozenAt: NOW,
        expiresAt: new Date('2026-08-14T10:00:00.000Z'),
      },
    });
    expect(result.expiresAt).toEqual(new Date('2026-08-14T10:00:00.000Z'));
  });

  it('abandons the prepared token when current-customer evidence is older than sixty seconds', async () => {
    const { db, tx } = transaction();
    tx.reviewEmailAttempt.findUnique.mockResolvedValue(preparedAttempt({
      consentCheckedAt: new Date(NOW.getTime() - 61_000),
    }));

    await expect(commitReviewEmailBatchSend(db as never, 'attempt-1', NOW)).rejects.toMatchObject({
      code: 'review_email_consent_evidence_stale',
      retryable: true,
    });

    expect(tx.reviewEmailAttempt.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        status: 'abandoned_before_send',
        errorCode: 'consent_evidence_stale_before_send_commit',
      }),
    }));
    expect(mocks.activateBatchToken).not.toHaveBeenCalled();
  });

  it('extends batch and request expiry through the reminder token window', async () => {
    const { tx } = transaction();
    tx.reviewEmailAttempt.findUnique.mockResolvedValue(preparedAttempt({
      status: 'sending',
      sendCommittedAt: NOW,
      acceptedAt: null,
      templateVersion: 'default_v1',
      locale: 'tr',
      job: {
        ...preparedAttempt().job,
        batch: batch({
          reminderDelayDaysSnapshot: 30,
          expiresAt: new Date('2026-08-14T10:00:00.000Z'),
        }),
      },
    }));

    await finalizeAcceptedReviewEmailBatchAttempt(tx as never, {
      attemptId: 'attempt-1',
      acceptedAt: NOW,
      providerMessageId: 'ses-message-1',
    });

    const reminderSendAfter = new Date('2026-08-14T10:00:00.000Z');
    const reminderExpiresAt = new Date('2026-09-13T10:00:00.000Z');
    expect(tx.reviewEmailBatch.updateMany).toHaveBeenCalledWith({
      where: {
        id: 'batch-1',
        OR: [{ expiresAt: null }, { expiresAt: { lt: reminderExpiresAt } }],
      },
      data: { expiresAt: reminderExpiresAt },
    });
    expect(tx.reviewRequest.updateMany).toHaveBeenCalledWith({
      where: {
        batchId: 'batch-1',
        status: 'sent',
        OR: [{ expiresAt: null }, { expiresAt: { lt: reminderExpiresAt } }],
      },
      data: { expiresAt: reminderExpiresAt },
    });
    expect(tx.reviewEmailJob.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        batchId: 'batch-1',
        kind: 'reminder',
        sendAfter: reminderSendAfter,
        expiresAt: reminderExpiresAt,
      }),
    });
  });

  it('revokes an undelivered unsubscribe token after confirmed_not_sent', async () => {
    const { db, tx } = transaction();
    tx.reviewEmailAttempt.findUnique.mockResolvedValue(preparedAttempt({
      status: 'awaiting_confirmation',
      sendCommittedAt: new Date('2026-07-15T09:55:00.000Z'),
      job: preparedAttempt().job,
    }));

    await markReviewEmailBatchConfirmedNotSent(db as never, 'attempt-1', NOW);

    expect(tx.reviewEmailUnsubscribeToken.updateMany).toHaveBeenCalledWith({
      where: { createdFromAttemptId: 'attempt-1', status: 'active' },
      data: { status: 'revoked', revokedAt: NOW },
    });
    expect(tx.reviewRequestToken.updateMany).toHaveBeenCalledWith({
      where: { attemptId: 'attempt-1', status: { in: ['prepared', 'active'] } },
      data: { status: 'revoked', revokedAt: NOW, revocationReason: 'confirmed_not_sent' },
    });
    expect(tx.reviewRequestSession.updateMany).toHaveBeenCalledWith({
      where: { tokenId: 'token-1', status: 'active' },
      data: { status: 'revoked', revokedAt: NOW, revocationReason: 'confirmed_not_sent' },
    });
    expect(tx.reviewEmailJob.update).toHaveBeenCalledWith({
      where: { id: 'job-1' },
      data: {
        status: 'retrying',
        sendAfter: NOW,
        completedAt: null,
        lastErrorCode: 'confirmed_not_sent',
      },
    });
  });

  it('uses typed errors for sender state transitions', () => {
    const error = new ReviewEmailBatchJobError('review_email_test', true);
    expect(error).toMatchObject({ code: 'review_email_test', retryable: true });
  });
});
