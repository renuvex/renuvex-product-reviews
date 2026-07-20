import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  applyDenial: vi.fn(),
  fetchOrder: vi.fn(),
  prepareBatchSend: vi.fn(),
  syncOrder: vi.fn(),
}));

vi.mock('@/lib/review-email/batch-jobs', () => ({
  applyReviewEmailConsentDenial: mocks.applyDenial,
  prepareReviewEmailBatchSend: mocks.prepareBatchSend,
}));

vi.mock('@/lib/review-email/ikas-orders', () => ({
  fetchIkasOrderForReviewRequest: mocks.fetchOrder,
  syncIkasOrderForReviewRequests: mocks.syncOrder,
}));

import {
  preflightIkasReviewEmailBatchSend,
  prepareIkasAuthorizedReviewEmailBatchSend,
} from '@/lib/review-email/ikas-send-preflight';
import { protectedEmail } from '@/lib/review-email/pii';

const NOW = new Date('2026-07-20T10:00:00.000Z');

function jobRows(recipientEmailHash: string) {
  return [
    {
      id: 'job-1',
      requestId: null,
      batchId: 'batch-1',
      storeId: 'store-1',
      batch: {
        id: 'batch-1',
        installationGeneration: 2,
        orderSnapshotId: 'order-snapshot-1',
        recipientVersion: 3,
        recipientEmailHash,
        orderSnapshot: {
          authorizedAppId: 'app-1',
          ikasOrderId: 'order-1',
        },
      },
    },
    {
      requestId: null,
      batchId: 'batch-1',
      status: 'pending',
      storeId: 'store-1',
      batch: {
        id: 'batch-1',
        status: 'scheduled',
        orderSnapshotId: 'order-snapshot-1',
        recipientVersion: 3,
        recipientEmailHash,
        orderSnapshot: {
          customerId: 'customer-1',
        },
      },
    },
  ];
}

function db(recipientEmailHash: string) {
  const rows = jobRows(recipientEmailHash);
  return {
    reviewEmailJob: {
      findUnique: vi.fn()
        .mockResolvedValueOnce(rows[0])
        .mockResolvedValueOnce(rows[1]),
    },
  };
}

function ikasCustomer(overrides: Record<string, unknown> = {}) {
  return {
    id: 'customer-1',
    email: 'Customer@example.com',
    deleted: false,
    subscriptionStatus: 'SUBSCRIBED',
    subscriptionStatusUpdatedAt: new Date('2026-07-19T12:00:00.000Z').getTime(),
    updatedAt: new Date('2026-07-19T12:00:00.000Z').getTime(),
    ...overrides,
  };
}

function ikas(customer: ReturnType<typeof ikasCustomer> | null = ikasCustomer()) {
  return {
    queries: {
      listCustomersForReviewEmailConsent: vi.fn().mockResolvedValue({
        isSuccess: true,
        data: {
          listCustomer: {
            count: 1,
            hasNext: false,
            limit: 1,
            page: 1,
            data: customer ? [customer] : [],
          },
        },
      }),
    },
  };
}

describe('ikas current-customer review email send preflight', () => {
  beforeEach(() => {
    process.env.REVIEW_EMAIL_PII_CURRENT_KEY_VERSION = '2';
    process.env.REVIEW_EMAIL_PII_KEYS_JSON = JSON.stringify({
      1: {
        hashSecret: 'old-hash-secret-with-at-least-thirty-two-characters',
        encryptionKeyB64: Buffer.alloc(32, 3).toString('base64'),
      },
      2: {
        hashSecret: 'new-hash-secret-with-at-least-thirty-two-characters',
        encryptionKeyB64: Buffer.alloc(32, 7).toString('base64'),
      },
    });
    vi.clearAllMocks();
    mocks.fetchOrder.mockResolvedValue({
      id: 'order-1',
      customer: { notificationsAccepted: false },
    });
    mocks.syncOrder.mockResolvedValue({
      state: 'processed',
      orderId: 'order-1',
      linesSeen: 1,
      requestsScheduled: 0,
      requestsCancelled: 0,
    });
    mocks.prepareBatchSend.mockResolvedValue({ attemptId: 'attempt-1' });
  });

  afterEach(() => {
    delete process.env.REVIEW_EMAIL_PII_CURRENT_KEY_VERSION;
    delete process.env.REVIEW_EMAIL_PII_KEYS_JSON;
  });

  it('authorizes a subscribed exact customer even when the order snapshot consent is false', async () => {
    const recipient = protectedEmail('Customer@example.com');
    if (!recipient) throw new Error('test_recipient_missing');
    const database = db(recipient.hash);
    const client = ikas();

    const evidence = await preflightIkasReviewEmailBatchSend(
      client as never,
      database as never,
      'job-1',
      { now: NOW },
    );

    expect(mocks.syncOrder).toHaveBeenCalledWith(database, expect.objectContaining({
      order: expect.objectContaining({
        customer: { notificationsAccepted: false },
      }),
    }));
    expect(client.queries.listCustomersForReviewEmailConsent).toHaveBeenCalledWith({
      id: { eq: 'customer-1' },
      pagination: { limit: 1, page: 1 },
    });
    expect(evidence).toMatchObject({
      source: 'ikas_list_customer',
      status: 'SUBSCRIBED',
      checkedAt: NOW,
      batchId: 'batch-1',
      recipientVersion: 3,
    });
    expect(evidence.recipientExactLookupHashes).toContain(recipient.hash);
    expect(mocks.applyDenial).not.toHaveBeenCalled();
  });

  it('keeps a transient customer API failure retryable without writing consent denial', async () => {
    const recipient = protectedEmail('Customer@example.com');
    if (!recipient) throw new Error('test_recipient_missing');
    const client = ikas();
    client.queries.listCustomersForReviewEmailConsent.mockResolvedValue({
      isSuccess: false,
      data: null,
    } as never);

    await expect(preflightIkasReviewEmailBatchSend(
      client as never,
      db(recipient.hash) as never,
      'job-1',
      { now: NOW },
    )).rejects.toMatchObject({
      code: 'review_email_customer_read_failed',
      retryable: true,
    });
    expect(mocks.applyDenial).not.toHaveBeenCalled();
  });

  it.each([
    ['NOT_SUBSCRIBED', 'customer_not_subscribed'],
    ['PENDING_CONFIRMATION', 'customer_subscription_pending'],
  ])('closes an unsent lifecycle for current status %s', async (status, reason) => {
    const recipient = protectedEmail('Customer@example.com');
    if (!recipient) throw new Error('test_recipient_missing');

    await expect(preflightIkasReviewEmailBatchSend(
      ikas(ikasCustomer({ subscriptionStatus: status })) as never,
      db(recipient.hash) as never,
      'job-1',
      { now: NOW },
    )).rejects.toMatchObject({ code: `review_email_${reason}`, retryable: false });

    expect(mocks.applyDenial).toHaveBeenCalledWith(
      expect.anything(),
      'job-1',
      { reason, revokeAccess: false, now: NOW },
    );
  });

  it('revokes access when the current customer email no longer exactly matches', async () => {
    const recipient = protectedEmail('Customer@example.com');
    if (!recipient) throw new Error('test_recipient_missing');

    await expect(preflightIkasReviewEmailBatchSend(
      ikas(ikasCustomer({ email: 'customer@example.com' })) as never,
      db(recipient.hash) as never,
      'job-1',
      { now: NOW },
    )).rejects.toMatchObject({ code: 'review_email_recipient_mismatch' });

    expect(mocks.applyDenial).toHaveBeenCalledWith(
      expect.anything(),
      'job-1',
      { reason: 'recipient_mismatch', revokeAccess: true, now: NOW },
    );
  });

  it.each([
    ['missing', null, 'customer_missing'],
    ['deleted', ikasCustomer({ deleted: true }), 'customer_deleted'],
  ])('revokes access when the current customer is %s', async (_label, customer, reason) => {
    const recipient = protectedEmail('Customer@example.com');
    if (!recipient) throw new Error('test_recipient_missing');

    await expect(preflightIkasReviewEmailBatchSend(
      ikas(customer) as never,
      db(recipient.hash) as never,
      'job-1',
      { now: NOW },
    )).rejects.toMatchObject({ code: `review_email_${reason}`, retryable: false });

    expect(mocks.applyDenial).toHaveBeenCalledWith(
      expect.anything(),
      'job-1',
      { reason, revokeAccess: true, now: NOW },
    );
  });

  it('passes only fresh preflight evidence into attempt preparation', async () => {
    const recipient = protectedEmail('Customer@example.com');
    if (!recipient) throw new Error('test_recipient_missing');
    const database = db(recipient.hash);
    const client = ikas();

    await prepareIkasAuthorizedReviewEmailBatchSend(
      client as never,
      database as never,
      'job-1',
      { now: NOW, expectedLeaseVersion: 4 },
    );

    expect(mocks.prepareBatchSend).toHaveBeenCalledWith(
      database,
      'job-1',
      {
        consentEvidence: expect.objectContaining({
          status: 'SUBSCRIBED',
          checkedAt: NOW,
        }),
        now: NOW,
        expectedLeaseVersion: 4,
      },
    );
  });
});
