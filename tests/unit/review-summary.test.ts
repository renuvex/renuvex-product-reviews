import { describe, expect, it, vi } from 'vitest';
import {
  applyReviewSummaryVisibilityChange,
  applyReviewSummaryRemovals,
  filteredReviewTotal,
  publicRatingFromSummary,
  recomputeProductReviewSummary,
  summaryStats,
  type ReviewSummaryReview,
} from '@/lib/review-summary';

function summary(overrides: Record<string, unknown> = {}) {
  return {
    id: 'summary-1',
    storeId: 'store-1',
    productId: 'product-1',
    approvedCount: 2,
    ratingSum: 9,
    averageRating: 4.5,
    rating1Count: 0,
    rating2Count: 0,
    rating3Count: 0,
    rating4Count: 1,
    rating5Count: 1,
    photoReviewCount: 1,
    photoRating1Count: 0,
    photoRating2Count: 0,
    photoRating3Count: 0,
    photoRating4Count: 0,
    photoRating5Count: 1,
    mediaReviewCount: 1,
    mediaRating1Count: 0,
    mediaRating2Count: 0,
    mediaRating3Count: 0,
    mediaRating4Count: 0,
    mediaRating5Count: 1,
    lastReviewAt: new Date('2026-05-28T00:00:00.000Z'),
    createdAt: new Date('2026-05-28T00:00:00.000Z'),
    updatedAt: new Date('2026-05-28T00:00:00.000Z'),
    ...overrides,
  };
}

function approvedReview(overrides: Partial<ReviewSummaryReview> = {}): ReviewSummaryReview {
  return {
    storeId: 'store-1',
    productId: 'product-1',
    rating: 5,
    status: 'approved',
    images: null,
    hasImages: false,
    hasVideo: false,
    createdAt: new Date('2026-05-28T00:00:00.000Z'),
    ...overrides,
  };
}

function fakeClient() {
  return {
    productReviewSummary: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
    },
    review: {
      aggregate: vi.fn(),
      findMany: vi.fn(),
    },
  };
}

type ReviewSummaryClient = Parameters<typeof applyReviewSummaryVisibilityChange>[0];

function asReviewSummaryClient(client: ReturnType<typeof fakeClient>): ReviewSummaryClient {
  return client as unknown as ReviewSummaryClient;
}

describe('review summary read model', () => {
  it('upserts a product summary when an approved review becomes visible', async () => {
    const client = fakeClient();
    client.productReviewSummary.findUnique.mockResolvedValue(null);

    await applyReviewSummaryVisibilityChange(asReviewSummaryClient(client), null, approvedReview());

    expect(client.productReviewSummary.create).not.toHaveBeenCalled();
    expect(client.productReviewSummary.upsert).toHaveBeenCalledWith({
      where: { storeId_productId: { storeId: 'store-1', productId: 'product-1' } },
      create: expect.objectContaining({
        storeId: 'store-1',
        productId: 'product-1',
        approvedCount: 1,
        ratingSum: 5,
        rating5Count: 1,
      }),
      update: expect.objectContaining({
        approvedCount: { increment: 1 },
        ratingSum: { increment: 5 },
        rating5Count: { increment: 1 },
      }),
    });
  });

  it('decrements an existing summary when an approved review is hidden', async () => {
    const client = fakeClient();
    client.productReviewSummary.findUnique
      .mockResolvedValueOnce(summary())
      .mockResolvedValueOnce(summary({ approvedCount: 1, ratingSum: 4, rating5Count: 0, photoReviewCount: 1 }));
    client.review.aggregate.mockResolvedValue({ _max: { createdAt: new Date('2026-05-27T00:00:00.000Z') } });

    await applyReviewSummaryVisibilityChange(asReviewSummaryClient(client), approvedReview(), approvedReview({ status: 'rejected' }));

    expect(client.productReviewSummary.update).toHaveBeenNthCalledWith(1, {
      where: { storeId_productId: { storeId: 'store-1', productId: 'product-1' } },
      data: expect.objectContaining({
        approvedCount: { increment: -1 },
        ratingSum: { increment: -5 },
        rating5Count: { increment: -1 },
      }),
    });
    expect(client.productReviewSummary.update).toHaveBeenNthCalledWith(2, {
      where: { storeId_productId: { storeId: 'store-1', productId: 'product-1' } },
      data: {
        averageRating: 4,
        lastReviewAt: new Date('2026-05-27T00:00:00.000Z'),
      },
    });
  });

  it('keeps merchant reply only changes as a no-op', async () => {
    const client = fakeClient();
    await applyReviewSummaryVisibilityChange(asReviewSummaryClient(client), approvedReview(), approvedReview());

    expect(client.productReviewSummary.findUnique).not.toHaveBeenCalled();
    expect(client.productReviewSummary.create).not.toHaveBeenCalled();
    expect(client.productReviewSummary.update).not.toHaveBeenCalled();
  });

  it('recalculates lastReviewAt from the remaining approved rows after a batch removal', async () => {
    const client = fakeClient();
    client.productReviewSummary.findUnique
      .mockResolvedValueOnce(summary())
      .mockResolvedValueOnce(summary({ approvedCount: 1, ratingSum: 4, rating5Count: 0 }));
    client.review.aggregate.mockResolvedValue({ _max: { createdAt: new Date('2026-05-20T00:00:00.000Z') } });

    await applyReviewSummaryRemovals(asReviewSummaryClient(client), [approvedReview()]);

    expect(client.review.aggregate).toHaveBeenCalledWith({
      where: { storeId: 'store-1', productId: 'product-1', status: 'approved' },
      _max: { createdAt: true },
    });
    expect(client.productReviewSummary.update).toHaveBeenLastCalledWith(expect.objectContaining({
      data: { averageRating: 4, lastReviewAt: new Date('2026-05-20T00:00:00.000Z') },
    }));
  });

  it('uses the indexed hasImages flag for photo review summary deltas', async () => {
    const client = fakeClient();
    client.productReviewSummary.findUnique.mockResolvedValue(null);

    await applyReviewSummaryVisibilityChange(asReviewSummaryClient(client), null, approvedReview({ hasImages: true }));

    expect(client.productReviewSummary.upsert).toHaveBeenCalledWith({
      where: { storeId_productId: { storeId: 'store-1', productId: 'product-1' } },
      create: expect.objectContaining({
        approvedCount: 1,
        photoReviewCount: 1,
        photoRating5Count: 1,
      }),
      update: expect.objectContaining({
        approvedCount: { increment: 1 },
        photoReviewCount: { increment: 1 },
        photoRating5Count: { increment: 1 },
      }),
    });
  });

  it('uses image or video flags for media review summary deltas', async () => {
    const client = fakeClient();
    client.productReviewSummary.findUnique.mockResolvedValue(null);

    await applyReviewSummaryVisibilityChange(asReviewSummaryClient(client), null, approvedReview({ hasVideo: true }));

    expect(client.productReviewSummary.upsert).toHaveBeenCalledWith({
      where: { storeId_productId: { storeId: 'store-1', productId: 'product-1' } },
      create: expect.objectContaining({
        approvedCount: 1,
        mediaReviewCount: 1,
        mediaRating5Count: 1,
        photoReviewCount: 0,
      }),
      update: expect.objectContaining({
        approvedCount: { increment: 1 },
        mediaReviewCount: { increment: 1 },
        mediaRating5Count: { increment: 1 },
        photoReviewCount: { increment: 0 },
      }),
    });
  });

  it('recomputes one product summary exactly from approved review rows', async () => {
    const client = fakeClient();
    client.review.findMany.mockResolvedValue([
      approvedReview({
        rating: 5,
        hasImages: true,
        createdAt: new Date('2026-05-28T00:00:00.000Z'),
      }),
      approvedReview({ rating: 4, createdAt: new Date('2026-05-27T00:00:00.000Z') }),
      approvedReview({ rating: 3, hasVideo: true, createdAt: new Date('2026-05-26T00:00:00.000Z') }),
    ]);

    await recomputeProductReviewSummary(asReviewSummaryClient(client), 'store-1', 'product-1');

    expect(client.productReviewSummary.upsert).toHaveBeenCalledWith({
      where: { storeId_productId: { storeId: 'store-1', productId: 'product-1' } },
      create: expect.objectContaining({
        approvedCount: 3,
        ratingSum: 12,
        averageRating: 4,
        rating3Count: 1,
        rating4Count: 1,
        rating5Count: 1,
        photoReviewCount: 1,
        photoRating5Count: 1,
        mediaReviewCount: 2,
        mediaRating3Count: 1,
        mediaRating5Count: 1,
      }),
      update: expect.objectContaining({
        approvedCount: 3,
        ratingSum: 12,
        averageRating: 4,
        rating3Count: 1,
        rating4Count: 1,
        rating5Count: 1,
        photoReviewCount: 1,
        photoRating5Count: 1,
        mediaReviewCount: 2,
        mediaRating3Count: 1,
        mediaRating5Count: 1,
      }),
    });
  });

  it('derives filtered public totals from the summary row', () => {
    const row = summary({
      approvedCount: 10,
      rating1Count: 1,
      rating2Count: 2,
      rating3Count: 3,
      rating4Count: 1,
      rating5Count: 3,
      photoReviewCount: 4,
      photoRating1Count: 1,
      photoRating2Count: 0,
      photoRating3Count: 1,
      photoRating4Count: 0,
      photoRating5Count: 2,
      mediaReviewCount: 6,
      mediaRating1Count: 1,
      mediaRating2Count: 1,
      mediaRating3Count: 1,
      mediaRating4Count: 1,
      mediaRating5Count: 2,
    });

    expect(filteredReviewTotal(row, {})).toBe(10);
    expect(filteredReviewTotal(row, { ratingFilter: 3 })).toBe(3);
    expect(filteredReviewTotal(row, { hasImagesFilter: true })).toBe(4);
    expect(filteredReviewTotal(row, { ratingFilter: 5, hasImagesFilter: true })).toBe(2);
    expect(filteredReviewTotal(row, { hasMediaFilter: true })).toBe(6);
    expect(filteredReviewTotal(row, { ratingFilter: 2, hasMediaFilter: true })).toBe(1);
    expect(filteredReviewTotal(null, { ratingFilter: 5, hasImagesFilter: true })).toBe(0);
  });

  it('formats public stats without exposing empty summaries', () => {
    expect(publicRatingFromSummary(summary({ approvedCount: 0, ratingSum: 0 }))).toBeNull();
    expect(publicRatingFromSummary(summary({ approvedCount: 8, ratingSum: 36 }))).toEqual({ avg: '4.5', count: 8 });
    expect(summaryStats(summary({ approvedCount: 8, ratingSum: 36, rating1Count: 1, rating4Count: 0, rating5Count: 7 }))).toEqual({
      allCount: 8,
      ratingCounts: [1, 0, 0, 0, 7],
      avgRating: '4.5',
    });
  });
});
