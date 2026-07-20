import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  applyReviewEmailUnsubscribe,
  prepareReviewEmailUnsubscribeToken,
} from '@/lib/review-email/unsubscribe';

const TOKEN_SECRET = 'unsubscribe-secret-with-at-least-thirty-two-characters';
const EXACT_HASH = `h2e:1:${'a'.repeat(43)}`;

describe('review email unsubscribe preference lifecycle', () => {
  beforeEach(() => {
    process.env.REVIEW_REQUEST_PUBLIC_BASE_URL = 'https://reviews.renuvex.app';
  });

  afterEach(() => {
    delete process.env.REVIEW_REQUEST_PUBLIC_BASE_URL;
  });

  it('persists a store/category preference and cancels pending email without revoking review access', async () => {
    const now = new Date('2026-07-15T10:00:00.000Z');
    const tokenCreate = vi.fn().mockResolvedValue({ id: 'unsubscribe-token-1' });
    const prepareTx = {
      reviewEmailUnsubscribeToken: { create: tokenCreate },
    };
    const prepared = await prepareReviewEmailUnsubscribeToken(prepareTx as never, {
      storeId: 'store-1',
      recipientFoldedHash: 'folded-v1',
      recipientExactHash: EXACT_HASH,
      recipientExactHashKeyVersion: 1,
      recipientEmailNormalizationVersion: 2,
      attemptId: 'attempt-1',
      keyRing: { currentVersion: 1, keys: new Map([[1, TOKEN_SECRET]]) },
    });
    expect(prepared.rawToken).toMatch(/^u1\.[A-Za-z0-9_-]{43}$/);
    expect(tokenCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        storeId: 'store-1',
        category: 'review_request',
        recipientFoldedHash: 'folded-v1',
        recipientExactHash: EXACT_HASH,
        recipientExactHashKeyVersion: 1,
        recipientEmailNormalizationVersion: 2,
        createdFromAttemptId: 'attempt-1',
        status: 'active',
      }),
    });

    const token = {
      id: 'unsubscribe-token-1',
      storeId: 'store-1',
      category: 'review_request',
      recipientFoldedHash: 'folded-v1',
      recipientExactHash: EXACT_HASH,
      tokenKeyVersion: 1,
      status: 'active',
      createdFromAttempt: {
        recipientEmailEncrypted: 'encrypted-recipient',
      },
    };
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      reviewEmailUnsubscribeToken: {
        findUnique: vi.fn().mockResolvedValue(token),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      reviewEmailSuppression: { upsert: vi.fn().mockResolvedValue({ id: 'suppression-1' }) },
      reviewEmailBatch: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewEmailJob: { updateMany: vi.fn().mockResolvedValue({ count: 2 }) },
    };

    await expect(applyReviewEmailUnsubscribe(tx as never, prepared.rawToken, {
      now,
      keyRing: { currentVersion: 1, keys: new Map([[1, TOKEN_SECRET]]) },
    })).resolves.toEqual({ state: 'unsubscribed' });

    expect(tx.reviewEmailSuppression.upsert).toHaveBeenCalledWith({
      where: {
        storeId_emailHash_reason: {
          storeId: 'store-1',
          emailHash: 'folded-v1',
          reason: 'unsubscribe',
        },
      },
      create: {
        storeId: 'store-1',
        category: 'review_request',
        emailHash: 'folded-v1',
        recipientExactHash: EXACT_HASH,
        recipientEmailEncrypted: 'encrypted-recipient',
        reason: 'unsubscribe',
        source: 'recipient_one_click',
        status: 'active',
      },
      update: {
        category: 'review_request',
        status: 'active',
        recipientExactHash: EXACT_HASH,
        recipientEmailEncrypted: 'encrypted-recipient',
        releasedAt: null,
        expiresAt: null,
      },
    });
    expect(tx.reviewEmailJob.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ storeId: 'store-1' }),
      data: expect.objectContaining({ status: 'cancelled', lastErrorCode: 'recipient_unsubscribed' }),
    }));
    expect(tx).not.toHaveProperty('reviewRequestToken');
    expect(tx).not.toHaveProperty('reviewRequestSession');
  });

  it('treats a repeated one-click request as idempotent', async () => {
    const preparedTx = {
      reviewEmailUnsubscribeToken: { create: vi.fn().mockResolvedValue({ id: 'unsubscribe-token-1' }) },
    };
    const prepared = await prepareReviewEmailUnsubscribeToken(preparedTx as never, {
      storeId: 'store-1',
      recipientFoldedHash: 'folded-v1',
      recipientExactHash: EXACT_HASH,
      recipientExactHashKeyVersion: 1,
      recipientEmailNormalizationVersion: 2,
      attemptId: 'attempt-1',
      keyRing: { currentVersion: 1, keys: new Map([[1, TOKEN_SECRET]]) },
    });
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      reviewEmailUnsubscribeToken: {
        findUnique: vi.fn().mockResolvedValue({
          id: 'unsubscribe-token-1',
          storeId: 'store-1',
          category: 'review_request',
          recipientFoldedHash: 'folded-v1',
          recipientExactHash: EXACT_HASH,
          tokenKeyVersion: 1,
          status: 'used',
        }),
        updateMany: vi.fn(),
      },
      reviewEmailSuppression: { upsert: vi.fn().mockResolvedValue({ id: 'suppression-1' }) },
      reviewEmailBatch: { updateMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewEmailJob: { updateMany: vi.fn().mockResolvedValue({ count: 0 }) },
    };

    await expect(applyReviewEmailUnsubscribe(tx as never, prepared.rawToken, {
      keyRing: { currentVersion: 1, keys: new Map([[1, TOKEN_SECRET]]) },
    })).resolves.toEqual({ state: 'already_unsubscribed' });
    expect(tx.reviewEmailUnsubscribeToken.updateMany).not.toHaveBeenCalled();
    expect(tx.reviewEmailSuppression.upsert).toHaveBeenCalledTimes(1);
  });

  it('rejects an exact-hash snapshot whose encoded and declared key versions differ', async () => {
    const tx = {
      reviewEmailUnsubscribeToken: { create: vi.fn() },
    };

    await expect(prepareReviewEmailUnsubscribeToken(tx as never, {
      storeId: 'store-1',
      recipientFoldedHash: 'folded-v1',
      recipientExactHash: EXACT_HASH,
      recipientExactHashKeyVersion: 2,
      recipientEmailNormalizationVersion: 2,
      attemptId: 'attempt-1',
      keyRing: { currentVersion: 1, keys: new Map([[1, TOKEN_SECRET]]) },
    })).rejects.toThrow('invalid_review_email_unsubscribe_recipient_snapshot');
    expect(tx.reviewEmailUnsubscribeToken.create).not.toHaveBeenCalled();
  });

  it('creates an exact-address suppression after the originating attempt was purged', async () => {
    const preparedTx = {
      reviewEmailUnsubscribeToken: { create: vi.fn().mockResolvedValue({ id: 'unsubscribe-token-2' }) },
    };
    const prepared = await prepareReviewEmailUnsubscribeToken(preparedTx as never, {
      storeId: 'store-1',
      recipientFoldedHash: 'folded-v1',
      recipientExactHash: EXACT_HASH,
      recipientExactHashKeyVersion: 1,
      recipientEmailNormalizationVersion: 2,
      attemptId: 'attempt-2',
      keyRing: { currentVersion: 1, keys: new Map([[1, TOKEN_SECRET]]) },
    });
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      reviewEmailUnsubscribeToken: {
        findUnique: vi.fn().mockResolvedValue({
          id: 'unsubscribe-token-2',
          storeId: 'store-1',
          category: 'review_request',
          recipientFoldedHash: 'folded-v1',
          recipientExactHash: EXACT_HASH,
          tokenKeyVersion: 1,
          status: 'active',
          createdFromAttempt: null,
        }),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      reviewEmailSuppression: { upsert: vi.fn().mockResolvedValue({ id: 'suppression-2' }) },
      reviewEmailBatch: { updateMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewEmailJob: { updateMany: vi.fn().mockResolvedValue({ count: 0 }) },
    };

    await applyReviewEmailUnsubscribe(tx as never, prepared.rawToken, {
      keyRing: { currentVersion: 1, keys: new Map([[1, TOKEN_SECRET]]) },
    });

    expect(tx.reviewEmailSuppression.upsert).toHaveBeenCalledWith(expect.objectContaining({
      create: expect.objectContaining({
        recipientExactHash: EXACT_HASH,
        recipientEmailEncrypted: null,
      }),
      update: expect.objectContaining({
        recipientExactHash: EXACT_HASH,
        recipientEmailEncrypted: undefined,
      }),
    }));
  });
});
