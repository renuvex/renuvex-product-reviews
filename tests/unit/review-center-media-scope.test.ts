import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  assertSameOrigin: vi.fn(),
  isPublicHost: vi.fn(),
  resolveSession: vi.fn(),
}));

vi.mock('@/lib/review-email/config', () => ({ isReviewEmailEnabled: () => true }));

vi.mock('@/lib/review-email/public-access', () => ({
  assertReviewRequestSameOrigin: mocks.assertSameOrigin,
  getReviewRequestSessionCookie: () => 'raw-session',
  isReviewRequestPublicHost: mocks.isPublicHost,
}));

vi.mock('@/lib/review-email/tokens', () => ({
  resolveActiveReviewCenterSession: mocks.resolveSession,
  ReviewRequestTokenError: class ReviewRequestTokenError extends Error {
    constructor(public readonly code: string, message = code, public readonly status = 400) {
      super(message);
    }
  },
}));

import { resolveReviewCenterItemScope } from '@/lib/review-email/review-center-scope';

const ITEM_ID = '11111111-1111-4111-8111-111111111111';

describe('review center media ownership scope', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.isPublicHost.mockReturnValue(true);
    mocks.resolveSession.mockResolvedValue({
      id: 'session-1',
      tokenId: 'token-1',
      batch: {
        id: 'batch-1',
        storeId: 'store-1',
        requests: [
          { id: ITEM_ID, productId: 'product-1', status: 'sent' },
          { id: '22222222-2222-4222-8222-222222222222', productId: 'product-2', status: 'submitted' },
        ],
      },
    });
  });

  it('derives tenant, product and request ownership only from the active session membership', async () => {
    const request = new Request('https://reviews.renuvex.app/api/public/upload/sign', {
      method: 'POST',
      headers: { Origin: 'https://reviews.renuvex.app' },
    });

    await expect(resolveReviewCenterItemScope({} as never, request, ITEM_ID)).resolves.toEqual({
      sessionId: 'session-1',
      tokenId: 'token-1',
      batchId: 'batch-1',
      storeId: 'store-1',
      requestId: ITEM_ID,
      productId: 'product-1',
    });
    expect(mocks.assertSameOrigin).toHaveBeenCalledWith(request);
  });

  it('rejects media ownership for a terminal or non-member item', async () => {
    const { ReviewRequestTokenError } = await import('@/lib/review-email/tokens');
    const request = new Request('https://reviews.renuvex.app/api/public/upload/sign', {
      method: 'POST',
      headers: { Origin: 'https://reviews.renuvex.app' },
    });

    await expect(resolveReviewCenterItemScope(
      {} as never,
      request,
      '22222222-2222-4222-8222-222222222222',
    )).rejects.toBeInstanceOf(ReviewRequestTokenError);
    await expect(resolveReviewCenterItemScope(
      {} as never,
      request,
      '33333333-3333-4333-8333-333333333333',
    )).rejects.toMatchObject({ code: 'review_center_item_not_submittable', status: 409 });
  });

  it('leaves existing storefront upload routes unchanged outside the review-request host', async () => {
    mocks.isPublicHost.mockReturnValue(false);

    await expect(resolveReviewCenterItemScope(
      {} as never,
      new Request('https://app.renuvex.app/api/public/upload/sign', { method: 'POST' }),
      ITEM_ID,
    )).resolves.toBeNull();
    expect(mocks.resolveSession).not.toHaveBeenCalled();
  });
});
