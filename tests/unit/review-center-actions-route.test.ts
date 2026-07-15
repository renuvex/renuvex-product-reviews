import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  clearCookie: vi.fn(),
  resolveSession: vi.fn(),
  skipItem: vi.fn(),
  submitItem: vi.fn(),
  transaction: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    $transaction: mocks.transaction,
  },
}));

vi.mock('@/lib/review-email/config', () => ({ isReviewEmailEnabled: () => true }));

vi.mock('@/lib/review-email/public-access', () => ({
  assertReviewRequestPublicHost: vi.fn(),
  assertReviewRequestSameOrigin: vi.fn(),
  clearReviewRequestSessionCookie: mocks.clearCookie,
  getReviewRequestSessionCookie: () => 'raw-session',
  ReviewRequestHostError: class ReviewRequestHostError extends Error {
    code = 'invalid_review_request_host';
    status = 400;
  },
}));

vi.mock('@/lib/review-email/review-center-http', () => ({
  reviewCenterRateLimit: vi.fn().mockResolvedValue(null),
  secureReviewCenterResponse: <T>(response: T) => response,
}));

vi.mock('@/lib/review-email/tokens', () => ({
  resolveActiveReviewCenterSession: mocks.resolveSession,
  skipReviewCenterItem: mocks.skipItem,
  ReviewRequestTokenError: class ReviewRequestTokenError extends Error {
    code = 'invalid_review_request_session';
    status = 401;
  },
}));

vi.mock('@/lib/review-email/review-center-submit', () => ({
  submitReviewCenterItem: mocks.submitItem,
  ReviewCenterSubmitError: class ReviewCenterSubmitError extends Error {
    constructor(public readonly code: string, public readonly status = 400) {
      super(code);
    }
  },
}));

vi.mock('@/lib/media/dispatcher', () => ({ dispatchMediaProviderJob: vi.fn() }));
vi.mock('@/lib/media/outbox', () => ({ enqueueMediaProviderJob: vi.fn() }));
vi.mock('@/lib/review-email/analytics', () => ({
  recordReviewEmailBatchMetricContribution: vi.fn(),
  recordReviewEmailMetricContribution: vi.fn(),
}));

const ITEM_ID = '11111111-1111-4111-8111-111111111111';

function request(path: string): Request {
  return new Request(`https://reviews.renuvex.app${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://reviews.renuvex.app',
    },
    body: JSON.stringify({ rating: 5, author: 'Ada', comment: 'Useful product' }),
  });
}

describe('review center item action routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.resolveSession.mockResolvedValue({
      id: 'session-1',
      tokenId: 'token-1',
      batchId: 'batch-1',
      batch: { id: 'batch-1', storeId: 'store-1' },
    });
    mocks.transaction.mockImplementation(async (operation: (tx: object) => unknown) => operation({}));
  });

  it('rejects a malformed item id before invoking the submit domain service', async () => {
    const { POST } = await import('@/app/api/public/review-center/items/[itemId]/reviews/route');

    const response = await POST(request('/api/public/review-center/items/not-a-uuid/reviews') as never, {
      params: Promise.resolve({ itemId: 'not-a-uuid' }),
    });

    await expect(response.json()).resolves.toEqual({ error: 'review_center_item_not_found' });
    expect(response.status).toBe(404);
    expect(mocks.submitItem).not.toHaveBeenCalled();
  });

  it('preserves the item_skipped conflict from the submit transaction', async () => {
    const { POST } = await import('@/app/api/public/review-center/items/[itemId]/reviews/route');
    const { ReviewCenterSubmitError } = await import('@/lib/review-email/review-center-submit');
    mocks.submitItem.mockRejectedValue(new ReviewCenterSubmitError('item_skipped', 409));

    const response = await POST(request(`/api/public/review-center/items/${ITEM_ID}/reviews`) as never, {
      params: Promise.resolve({ itemId: ITEM_ID }),
    });

    await expect(response.json()).resolves.toEqual({ error: 'item_skipped' });
    expect(response.status).toBe(409);
  });

  it('clears the browser session cookie when the final skipped item completes the batch', async () => {
    const { POST } = await import('@/app/api/public/review-center/items/[itemId]/skip/route');
    mocks.skipItem.mockResolvedValue({ state: 'already_skipped', batchCompleted: true });

    const response = await POST(request(`/api/public/review-center/items/${ITEM_ID}/skip`) as never, {
      params: Promise.resolve({ itemId: ITEM_ID }),
    });

    await expect(response.json()).resolves.toEqual({
      data: { state: 'already_skipped', batchCompleted: true },
    });
    expect(response.status).toBe(200);
    expect(mocks.clearCookie).toHaveBeenCalledWith(response);
  });
});
