import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildReviewRequestEmailUrl, isReviewRequestPublicHost } from '@/lib/review-email/public-access';
import {
  activatePreparedReviewEmailBatchToken,
  activatePreparedReviewRequestToken,
  claimReviewRequestForSubmission,
  claimReviewCenterItemForSubmission,
  createRawReviewRequestToken,
  exchangeReviewCenterTokenForSession,
  exchangeReviewRequestTokenForSession,
  hashReviewRequestToken,
  prepareReviewEmailBatchToken,
  prepareReviewRequestToken,
  resolveActiveReviewCenterToken,
  resolveActiveReviewRequestToken,
  ReviewRequestTokenError,
  skipReviewCenterItem,
} from '@/lib/review-email/tokens';

const KEY_ONE = 'one-secret-with-at-least-thirty-two-characters';
const KEY_TWO = 'two-secret-with-at-least-thirty-two-characters';

function tokenRow(rawToken: string, secret: string) {
  return {
    id: 'token-1',
    requestId: 'request-1',
    attemptId: 'attempt-1',
    tokenHash: hashReviewRequestToken(rawToken, secret),
    tokenKeyVersion: 1,
    status: 'active',
    expiresAt: new Date('2026-08-01T00:00:00.000Z'),
    consumedAt: null,
    revokedAt: null,
    revocationReason: null,
    createdAt: new Date('2026-07-01T00:00:00.000Z'),
    request: {
      id: 'request-1',
      storeId: 'store-1',
      productId: 'product-1',
      status: 'sent',
      expiresAt: new Date('2026-08-01T00:00:00.000Z'),
      orderLineSnapshot: { productName: 'Product', variantName: 'Default' },
    },
  };
}

function batchTokenRow(rawToken: string, secret: string) {
  return {
    id: 'batch-token-1',
    requestId: null,
    batchId: 'batch-1',
    attemptId: 'attempt-1',
    tokenHash: hashReviewRequestToken(rawToken, secret),
    tokenKeyVersion: 1,
    status: 'active',
    expiresAt: new Date('2026-08-01T00:00:00.000Z'),
    consumedAt: null,
    revokedAt: null,
    revocationReason: null,
    createdAt: new Date('2026-07-01T00:00:00.000Z'),
    batch: {
      id: 'batch-1',
      storeId: 'store-1',
      status: 'active',
      expiresAt: new Date('2026-08-01T00:00:00.000Z'),
      requests: [
        {
          id: 'request-1',
          productId: 'product-1',
          status: 'sent',
          orderLineSnapshot: { productName: 'Product One', variantName: 'Default' },
        },
        {
          id: 'request-2',
          productId: 'product-2',
          status: 'sent',
          orderLineSnapshot: { productName: 'Product Two', variantName: 'Default' },
        },
      ],
    },
  };
}

describe('review request token and session lifecycle', () => {
  afterEach(() => {
    delete process.env.REVIEW_REQUEST_PUBLIC_BASE_URL;
  });

  it('resolves an old token version while a newer key is current', async () => {
    const rawToken = createRawReviewRequestToken(1);
    const row = tokenRow(rawToken, KEY_ONE);
    const db = {
      reviewRequestToken: {
        findUnique: vi.fn().mockResolvedValue(row),
        updateMany: vi.fn(),
      },
    };

    const resolved = await resolveActiveReviewRequestToken(
      db as never,
      rawToken,
      new Date('2026-07-10T00:00:00.000Z'),
      { currentVersion: 2, keys: new Map([[1, KEY_ONE], [2, KEY_TWO]]) },
    );

    expect(resolved.id).toBe('token-1');
    expect(db.reviewRequestToken.findUnique).toHaveBeenCalledWith({
      where: { tokenHash: hashReviewRequestToken(rawToken, KEY_ONE) },
      include: expect.any(Object),
    });
  });

  it('fails closed when the token key version is no longer in the key ring', async () => {
    const rawToken = createRawReviewRequestToken(1);
    const db = { reviewRequestToken: { findUnique: vi.fn(), updateMany: vi.fn() } };

    await expect(resolveActiveReviewRequestToken(
      db as never,
      rawToken,
      new Date('2026-07-10T00:00:00.000Z'),
      { currentVersion: 2, keys: new Map([[2, KEY_TWO]]) },
    )).rejects.toBeInstanceOf(ReviewRequestTokenError);
    expect(db.reviewRequestToken.findUnique).not.toHaveBeenCalled();
  });

  it('prepares only a hash and activates the token for 30 days at sendInitiatedAt', async () => {
    const tx = {
      reviewRequestToken: {
        create: vi.fn().mockResolvedValue({ id: 'token-1' }),
        findUnique: vi.fn().mockResolvedValue({ id: 'token-1', requestId: 'request-1', status: 'prepared' }),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
    };
    const prepared = await prepareReviewRequestToken(tx as never, {
      requestId: 'request-1',
      attemptId: 'attempt-1',
      keyRing: { currentVersion: 2, keys: new Map([[2, KEY_TWO]]) },
    });

    expect(prepared.rawToken).toMatch(/^v2\.[A-Za-z0-9_-]{43}$/);
    expect(tx.reviewRequestToken.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        tokenHash: hashReviewRequestToken(prepared.rawToken, KEY_TWO),
        tokenKeyVersion: 2,
        status: 'prepared',
        expiresAt: null,
      }),
      select: { id: true },
    });

    const sendInitiatedAt = new Date('2026-07-10T12:00:00.000Z');
    const active = await activatePreparedReviewRequestToken(tx as never, { attemptId: 'attempt-1', sendInitiatedAt });
    expect(active.expiresAt).toEqual(new Date('2026-08-09T12:00:00.000Z'));
  });

  it('puts the raw token in the URL fragment rather than path or query', () => {
    process.env.REVIEW_REQUEST_PUBLIC_BASE_URL = 'https://reviews.renuvex.app';
    const rawToken = createRawReviewRequestToken(1);
    const url = new URL(buildReviewRequestEmailUrl(rawToken));

    expect(url.origin).toBe('https://reviews.renuvex.app');
    expect(url.pathname).toBe('/request');
    expect(url.search).toBe('');
    expect(new URLSearchParams(url.hash.slice(1)).get('token')).toBe(rawToken);
  });

  it('keeps the customer flow isolated to the configured reviews host', () => {
    process.env.REVIEW_REQUEST_PUBLIC_BASE_URL = 'https://reviews.renuvex.app';

    expect(isReviewRequestPublicHost(new Request('https://reviews.renuvex.app/request', {
      headers: { host: 'reviews.renuvex.app' },
    }))).toBe(true);
    expect(isReviewRequestPublicHost(new Request('https://app.renuvex.app/request', {
      headers: { host: 'app.renuvex.app' },
    }))).toBe(false);
  });

  it('exchanges a token for a two-hour session without persisting the raw token', async () => {
    const rawToken = createRawReviewRequestToken(1);
    const row = tokenRow(rawToken, KEY_ONE);
    const tx = {
      reviewRequestToken: { findFirst: vi.fn().mockResolvedValue({ id: 'token-1' }) },
      reviewRequestSession: {
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        create: vi.fn().mockResolvedValue({ id: 'session-1' }),
      },
    };
    const db = {
      reviewRequestToken: {
        findUnique: vi.fn().mockResolvedValue(row),
        updateMany: vi.fn(),
      },
      reviewRequestSession: {},
      $transaction: vi.fn(async (callback) => callback(tx)),
    };
    const now = new Date('2026-07-10T12:00:00.000Z');

    const session = await exchangeReviewRequestTokenForSession(db as never, rawToken, {
      now,
      keyRing: { currentVersion: 1, keys: new Map([[1, KEY_ONE]]) },
      sessionSecret: 'session-secret-with-at-least-thirty-two-characters',
    });

    expect(session.expiresAt).toEqual(new Date('2026-07-10T14:00:00.000Z'));
    expect(session.rawSession).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(JSON.stringify(tx.reviewRequestSession.create.mock.calls)).not.toContain(rawToken);
  });

  it('claims request, session, and token with conditional updates before review creation', async () => {
    const tx = {
      reviewRequest: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewRequestSession: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewRequestToken: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewEmailJob: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
    };
    const now = new Date('2026-07-10T12:00:00.000Z');

    await claimReviewRequestForSubmission(tx as never, {
      requestId: 'request-1',
      tokenId: 'token-1',
      sessionId: 'session-1',
      now,
    });

    expect(tx.reviewRequest.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: 'request-1', submittedAt: null }),
      data: { status: 'submitted', submittedAt: now },
    }));
    expect(tx.reviewRequestSession.updateMany).toHaveBeenCalled();
    expect(tx.reviewRequestToken.updateMany).toHaveBeenCalled();
  });

  it('rejects the second parallel submit when the request CAS is already lost', async () => {
    const tx = {
      reviewRequest: { updateMany: vi.fn().mockResolvedValue({ count: 0 }) },
      reviewRequestSession: { updateMany: vi.fn() },
      reviewRequestToken: { updateMany: vi.fn() },
      reviewEmailJob: { updateMany: vi.fn() },
    };

    await expect(claimReviewRequestForSubmission(tx as never, {
      requestId: 'request-1',
      tokenId: 'token-1',
      sessionId: 'session-1',
    })).rejects.toBeInstanceOf(ReviewRequestTokenError);
    expect(tx.reviewRequestSession.updateMany).not.toHaveBeenCalled();
  });

  it('prepares and activates a batch token for thirty days at send commit', async () => {
    const tx = {
      reviewRequestToken: {
        create: vi.fn().mockResolvedValue({ id: 'batch-token-1' }),
        findUnique: vi.fn().mockResolvedValue({ id: 'batch-token-1', batchId: 'batch-1', status: 'prepared' }),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
    };
    const prepared = await prepareReviewEmailBatchToken(tx as never, {
      batchId: 'batch-1',
      attemptId: 'attempt-1',
      keyRing: { currentVersion: 1, keys: new Map([[1, KEY_ONE]]) },
    });
    expect(tx.reviewRequestToken.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ requestId: null, batchId: 'batch-1', status: 'prepared' }),
      select: { id: true },
    });

    const sendCommittedAt = new Date('2026-07-10T12:00:00.000Z');
    const active = await activatePreparedReviewEmailBatchToken(tx as never, { attemptId: 'attempt-1', sendCommittedAt });
    expect(active).toEqual({
      tokenId: 'batch-token-1',
      batchId: 'batch-1',
      expiresAt: new Date('2026-08-09T12:00:00.000Z'),
    });
    expect(prepared.rawToken).toMatch(/^v1\.[A-Za-z0-9_-]{43}$/);
  });

  it('allows the same active batch token to create independent two-hour device sessions', async () => {
    const rawToken = createRawReviewRequestToken(1);
    const row = batchTokenRow(rawToken, KEY_ONE);
    const tx = {
      reviewRequestToken: { findFirst: vi.fn().mockResolvedValue({ id: 'batch-token-1' }) },
      reviewRequestSession: {
        create: vi.fn()
          .mockResolvedValueOnce({ id: 'session-phone' })
          .mockResolvedValueOnce({ id: 'session-desktop' }),
      },
    };
    const db = {
      reviewRequestToken: {
        findUnique: vi.fn().mockResolvedValue(row),
        updateMany: vi.fn(),
      },
      reviewRequestSession: {},
      $transaction: vi.fn(async (callback) => callback(tx)),
    };
    const options = {
      now: new Date('2026-07-10T12:00:00.000Z'),
      keyRing: { currentVersion: 1, keys: new Map([[1, KEY_ONE]]) },
      sessionSecret: 'session-secret-with-at-least-thirty-two-characters',
    };

    const phone = await exchangeReviewCenterTokenForSession(db as never, rawToken, options);
    const desktop = await exchangeReviewCenterTokenForSession(db as never, rawToken, options);

    expect(phone.sessionId).toBe('session-phone');
    expect(desktop.sessionId).toBe('session-desktop');
    expect(phone.rawSession).not.toBe(desktop.rawSession);
    expect(tx.reviewRequestSession.create).toHaveBeenCalledTimes(2);
    expect(db.reviewRequestToken.updateMany).not.toHaveBeenCalled();
    await expect(resolveActiveReviewCenterToken(
      db as never,
      rawToken,
      options.now,
      options.keyRing,
    )).resolves.toMatchObject({ id: 'batch-token-1', batchId: 'batch-1' });
  });

  it('keeps sibling access active after an intermediate product submit', async () => {
    const tx = {
      $queryRaw: vi.fn().mockResolvedValue([{ id: 'batch-1' }]),
      reviewRequest: {
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        count: vi.fn().mockResolvedValue(1),
      },
      reviewRequestSession: {
        count: vi.fn().mockResolvedValue(1),
        updateMany: vi.fn(),
      },
      reviewRequestToken: {
        count: vi.fn().mockResolvedValue(1),
        updateMany: vi.fn(),
      },
      reviewEmailBatch: { updateMany: vi.fn() },
      reviewEmailJob: { updateMany: vi.fn() },
    };

    await expect(claimReviewCenterItemForSubmission(tx as never, {
      sessionId: 'session-1',
      tokenId: 'token-1',
      batchId: 'batch-1',
      requestId: 'request-1',
      now: new Date('2026-07-10T12:00:00.000Z'),
    })).resolves.toEqual({ batchCompleted: false });

    expect(tx.$queryRaw).toHaveBeenCalledTimes(1);
    expect(tx.$queryRaw.mock.invocationCallOrder[0]).toBeLessThan(tx.reviewRequest.updateMany.mock.invocationCallOrder[0]!);
    expect(tx.reviewEmailBatch.updateMany).not.toHaveBeenCalled();
    expect(tx.reviewRequestToken.updateMany).not.toHaveBeenCalled();
    expect(tx.reviewRequestSession.updateMany).not.toHaveBeenCalled();
  });

  it('atomically closes the batch and revokes all access after the final product submit', async () => {
    const now = new Date('2026-07-10T12:00:00.000Z');
    const tx = {
      $queryRaw: vi.fn().mockResolvedValue([{ id: 'batch-1' }]),
      reviewRequest: {
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
        count: vi.fn().mockResolvedValue(0),
      },
      reviewRequestSession: {
        count: vi.fn().mockResolvedValue(1),
        updateMany: vi.fn().mockResolvedValue({ count: 2 }),
      },
      reviewRequestToken: {
        count: vi.fn().mockResolvedValue(1),
        updateMany: vi.fn().mockResolvedValue({ count: 2 }),
      },
      reviewEmailBatch: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewEmailJob: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
    };

    await expect(claimReviewCenterItemForSubmission(tx as never, {
      sessionId: 'session-1',
      tokenId: 'token-1',
      batchId: 'batch-1',
      requestId: 'request-2',
      now,
    })).resolves.toEqual({ batchCompleted: true });

    expect(tx.$queryRaw).toHaveBeenCalledTimes(1);
    expect(tx.reviewEmailBatch.updateMany).toHaveBeenCalledWith({
      where: { id: 'batch-1', status: { in: ['scheduled', 'sending', 'active'] } },
      data: { status: 'completed', completedAt: now },
    });
    expect(tx.reviewEmailJob.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ batchId: 'batch-1' }),
      data: expect.objectContaining({ status: 'cancelled', lastErrorCode: 'batch_completed' }),
    }));
    expect(tx.reviewRequestToken.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { batchId: 'batch-1', status: { in: ['prepared', 'active'] } },
    }));
    expect(tx.reviewRequestSession.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { batchId: 'batch-1', status: 'active' },
    }));
  });

  it('treats a repeated product skip as idempotent without consuming sibling access', async () => {
    const tx = {
      $queryRaw: vi.fn().mockResolvedValue([{ id: 'batch-1' }]),
      reviewRequest: {
        findFirst: vi.fn().mockResolvedValue({ status: 'skipped' }),
        count: vi.fn().mockResolvedValue(1),
        updateMany: vi.fn(),
      },
      reviewRequestSession: { count: vi.fn(), updateMany: vi.fn() },
      reviewRequestToken: { updateMany: vi.fn() },
      reviewEmailBatch: { updateMany: vi.fn() },
      reviewEmailJob: { updateMany: vi.fn() },
    };

    await expect(skipReviewCenterItem(tx as never, {
      sessionId: 'session-1',
      tokenId: 'token-1',
      batchId: 'batch-1',
      requestId: 'request-1',
    })).resolves.toEqual({ state: 'already_skipped', batchCompleted: false });
    expect(tx.reviewRequest.updateMany).not.toHaveBeenCalled();
    expect(tx.reviewRequestSession.updateMany).not.toHaveBeenCalled();
  });

  it('reports submit as the winner when a concurrent skip loses its CAS', async () => {
    const tx = {
      $queryRaw: vi.fn().mockResolvedValue([{ id: 'batch-1' }]),
      reviewRequest: {
        findFirst: vi.fn()
          .mockResolvedValueOnce({ status: 'sent' })
          .mockResolvedValueOnce({ status: 'submitted' }),
        updateMany: vi.fn().mockResolvedValue({ count: 0 }),
      },
      reviewRequestSession: { count: vi.fn().mockResolvedValue(1) },
      reviewRequestToken: { count: vi.fn().mockResolvedValue(1) },
    };

    await expect(skipReviewCenterItem(tx as never, {
      sessionId: 'session-1',
      tokenId: 'token-1',
      batchId: 'batch-1',
      requestId: 'request-1',
    })).resolves.toEqual({ state: 'already_submitted', batchCompleted: false });

    expect(tx.reviewRequest.findFirst).toHaveBeenCalledTimes(2);
  });
});
