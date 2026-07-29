import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import {
  GET as resolveReviewRequest,
  POST as exchangeReviewRequest,
} from '@/app/api/public/review-request/route';

const tokenMock = vi.hoisted(() => ({
  exchangeReviewRequestTokenForSession: vi.fn(),
  resolveActiveReviewRequestSession: vi.fn(),
}));
const { accessMock, ReviewRequestHostErrorMock } = vi.hoisted(() => {
  class ReviewRequestHostError extends Error {
    readonly status = 404;
  }
  return {
    ReviewRequestHostErrorMock: ReviewRequestHostError,
    accessMock: {
      assertReviewRequestPublicHost: vi.fn(),
      assertReviewRequestSameOrigin: vi.fn(),
      clearReviewRequestSessionCookie: vi.fn(),
      getReviewRequestSessionCookie: vi.fn(),
      setReviewRequestSessionCookie: vi.fn(),
    },
  };
});
const rateLimitMock = vi.hoisted(() => ({
  checkFixedWindowRateLimit: vi.fn(),
  getClientIp: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({ prisma: {} }));
vi.mock('@/lib/review-email/config', () => ({ isReviewEmailEnabled: () => true }));
vi.mock('@/lib/public-rate-limit', () => rateLimitMock);
vi.mock('@/lib/review-email/public-access', () => ({
  ...accessMock,
  ReviewRequestHostError: ReviewRequestHostErrorMock,
}));
vi.mock('@/lib/review-email/tokens', () => ({
  ...tokenMock,
  ReviewRequestTokenError: class ReviewRequestTokenError extends Error {},
}));

const requestState = {
  request: {
    storeId: 'store-1',
    productId: 'product-1',
    expiresAt: new Date('2026-08-09T12:00:00.000Z'),
    orderLineSnapshot: { productName: 'Product', variantName: 'Default' },
  },
  expiresAt: new Date('2026-07-10T14:00:00.000Z'),
};

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  rateLimitMock.getClientIp.mockReturnValue('203.0.113.10');
  rateLimitMock.checkFixedWindowRateLimit.mockResolvedValue({ allowed: true, retryAfterSec: 60 });
  accessMock.assertReviewRequestSameOrigin.mockImplementation((request: Request) => {
    if (request.headers.get('origin') !== 'https://reviews.renuvex.app') {
      throw new ReviewRequestHostErrorMock();
    }
  });
  accessMock.getReviewRequestSessionCookie.mockReturnValue('raw-session');
  tokenMock.exchangeReviewRequestTokenForSession.mockResolvedValue({
    ...requestState,
    rawSession: 'new-raw-session',
    token: requestState,
  });
  tokenMock.resolveActiveReviewRequestSession.mockResolvedValue(requestState);
});

describe('/api/public/review-request', () => {
  it('rate limits before token lookup without putting the raw token in the Redis key', async () => {
    rateLimitMock.checkFixedWindowRateLimit.mockResolvedValueOnce({ allowed: false, retryAfterSec: 17 });
    const request = new Request('https://reviews.renuvex.app/api/public/review-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://reviews.renuvex.app',
        'x-forwarded-for': '198.51.100.10',
      },
      body: JSON.stringify({ token: 'v1.raw-secret-token' }),
    }) as NextRequest;
    const response = await exchangeReviewRequest(request);

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('17');
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(tokenMock.exchangeReviewRequestTokenForSession).not.toHaveBeenCalled();
    expect(rateLimitMock.checkFixedWindowRateLimit).toHaveBeenCalledWith({
      key: expect.stringMatching(/^renuvex_review_request:[a-f0-9]{32}$/),
      max: 30,
      windowSec: 60,
      label: 'review-request',
    });
    expect(JSON.stringify(rateLimitMock.checkFixedWindowRateLimit.mock.calls)).not.toContain('raw-secret-token');
  });

  it('exchanges the body token while preserving private no-store response headers', async () => {
    const response = await exchangeReviewRequest(new NextRequest('https://reviews.renuvex.app/api/public/review-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://reviews.renuvex.app',
      },
      body: JSON.stringify({ token: 'v1.raw-secret-token' }),
    }));

    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(response.headers.get('Referrer-Policy')).toBe('no-referrer');
    expect(tokenMock.exchangeReviewRequestTokenForSession).toHaveBeenCalledWith({}, 'v1.raw-secret-token');
    expect(accessMock.setReviewRequestSessionCookie).toHaveBeenCalledWith(
      expect.anything(),
      'new-raw-session',
      requestState.expiresAt,
    );
  });

  it('keeps GET session reads host-only without requiring an Origin header', async () => {
    const response = await resolveReviewRequest(new NextRequest(
      'https://reviews.renuvex.app/api/public/review-request',
    ));

    expect(response.status).toBe(200);
    expect(tokenMock.resolveActiveReviewRequestSession).toHaveBeenCalledWith({}, 'raw-session');
    expect(accessMock.assertReviewRequestSameOrigin).not.toHaveBeenCalled();
  });

  it.each([
    ['missing', undefined],
    ['null', 'null'],
    ['wrong', 'https://attacker.example'],
  ])('rejects a %s Origin before rate limiting or token exchange', async (_label, origin) => {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    if (origin) headers.set('Origin', origin);

    const response = await exchangeReviewRequest(new NextRequest('https://reviews.renuvex.app/api/public/review-request', {
      method: 'POST',
      headers,
      body: JSON.stringify({ token: 'v1.raw-secret-token' }),
    }));

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: 'not_found' });
    expect(rateLimitMock.checkFixedWindowRateLimit).not.toHaveBeenCalled();
    expect(tokenMock.exchangeReviewRequestTokenForSession).not.toHaveBeenCalled();
    expect(accessMock.setReviewRequestSessionCookie).not.toHaveBeenCalled();
  });
});
