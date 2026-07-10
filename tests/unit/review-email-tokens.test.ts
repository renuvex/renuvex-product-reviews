import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildReviewRequestEmailUrl, isReviewRequestPublicHost } from '@/lib/review-email/public-access';
import {
  activatePreparedReviewRequestToken,
  claimReviewRequestForSubmission,
  createRawReviewRequestToken,
  exchangeReviewRequestTokenForSession,
  hashReviewRequestToken,
  prepareReviewRequestToken,
  resolveActiveReviewRequestToken,
  ReviewRequestTokenError,
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
});
