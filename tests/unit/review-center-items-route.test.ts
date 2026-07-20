import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  count: vi.fn(),
  findItems: vi.fn(),
  findProducts: vi.fn(),
  resolveSession: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    reviewRequest: {
      count: mocks.count,
      findMany: mocks.findItems,
    },
    productSnapshot: {
      findMany: mocks.findProducts,
    },
  },
}));

vi.mock('@/lib/review-email/config', () => ({ isReviewEmailEnabled: () => true }));

vi.mock('@/lib/review-email/public-access', () => ({
  assertReviewRequestPublicHost: vi.fn(),
  clearReviewRequestSessionCookie: vi.fn(),
  getReviewRequestSessionCookie: () => 'raw-session',
  ReviewRequestHostError: class ReviewRequestHostError extends Error {
    code = 'invalid_review_request_host';
    status = 400;
  },
}));

vi.mock('@/lib/review-email/tokens', () => ({
  resolveActiveReviewCenterSession: mocks.resolveSession,
  ReviewRequestTokenError: class ReviewRequestTokenError extends Error {
    code = 'invalid_review_request_session';
    status = 401;
  },
}));

vi.mock('@/lib/review-email/review-center-http', () => ({
  reviewCenterRateLimit: vi.fn().mockResolvedValue(null),
  secureReviewCenterResponse: <T>(response: T) => response,
}));

describe('review center items route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.resolveSession.mockResolvedValue({
      id: 'session-1',
      batchId: 'batch-1',
      batch: { id: 'batch-1', storeId: 'store-1' },
    });
    mocks.findItems.mockResolvedValue([{
      id: 'request-1',
      productId: 'product-1',
      batchPosition: 0,
      status: 'sent',
      orderLineSnapshot: { productName: null, variantName: 'Default' },
    }]);
    mocks.count.mockResolvedValueOnce(1).mockResolvedValueOnce(1);
    mocks.findProducts.mockResolvedValue([{ productId: 'product-1', name: 'Product One' }]);
  });

  it('uses the tenant-scoped product snapshot when order-line product name is absent', async () => {
    const { GET } = await import('@/app/api/public/review-center/items/route');

    const response = await GET(new Request('https://reviews.renuvex.app/api/public/review-center/items') as never);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(mocks.findProducts).toHaveBeenCalledWith({
      where: { storeId: 'store-1', productId: { in: ['product-1'] } },
      select: { productId: true, name: true },
    });
    expect(body.data.items[0]).toMatchObject({
      itemId: 'request-1',
      productId: 'product-1',
      productName: 'Product One',
    });
  });
});
