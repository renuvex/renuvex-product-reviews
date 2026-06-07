import type { Prisma, ProductReviewSummary } from '@prisma/client';
import { getConfiguredCloudinaryCloudName, parseStoredReviewImages } from '@/lib/review-images';

export const APPROVED_REVIEW_STATUS = 'approved';

type SummaryClient = Pick<Prisma.TransactionClient, 'productReviewSummary' | 'review'>;

export type ReviewSummaryReview = {
  storeId: string;
  productId: string;
  rating: number;
  status: string;
  images?: string | null;
  createdAt?: Date | string | null;
};

export type ProductReviewSummaryStats = {
  allCount: number;
  ratingCounts: [number, number, number, number, number];
  avgRating: string | null;
};

type SummaryDelta = {
  storeId: string;
  productId: string;
  approvedCount: number;
  ratingSum: number;
  rating1Count: number;
  rating2Count: number;
  rating3Count: number;
  rating4Count: number;
  rating5Count: number;
  photoReviewCount: number;
};

const ZERO_RATING_COUNTS: [number, number, number, number, number] = [0, 0, 0, 0, 0];

function ratingBucketKey(rating: number): keyof Pick<
  SummaryDelta,
  'rating1Count' | 'rating2Count' | 'rating3Count' | 'rating4Count' | 'rating5Count'
> | null {
  if (rating === 1) return 'rating1Count';
  if (rating === 2) return 'rating2Count';
  if (rating === 3) return 'rating3Count';
  if (rating === 4) return 'rating4Count';
  if (rating === 5) return 'rating5Count';
  return null;
}

function reviewHasTrustedImages(review: ReviewSummaryReview): boolean {
  return parseStoredReviewImages(review.images, getConfiguredCloudinaryCloudName(), review.storeId).length > 0;
}

function emptyDelta(storeId: string, productId: string): SummaryDelta {
  return {
    storeId,
    productId,
    approvedCount: 0,
    ratingSum: 0,
    rating1Count: 0,
    rating2Count: 0,
    rating3Count: 0,
    rating4Count: 0,
    rating5Count: 0,
    photoReviewCount: 0,
  };
}

function addReviewToDelta(delta: SummaryDelta, review: ReviewSummaryReview, direction: 1 | -1) {
  if (review.status !== APPROVED_REVIEW_STATUS) return;
  const bucketKey = ratingBucketKey(review.rating);
  if (!bucketKey) return;
  delta.approvedCount += direction;
  delta.ratingSum += review.rating * direction;
  delta[bucketKey] += direction;
  if (reviewHasTrustedImages(review)) delta.photoReviewCount += direction;
}

function deltaKey(storeId: string, productId: string) {
  return `${storeId}\u0000${productId}`;
}

function isNoopDelta(delta: SummaryDelta) {
  return (
    delta.approvedCount === 0 &&
    delta.ratingSum === 0 &&
    delta.rating1Count === 0 &&
    delta.rating2Count === 0 &&
    delta.rating3Count === 0 &&
    delta.rating4Count === 0 &&
    delta.rating5Count === 0 &&
    delta.photoReviewCount === 0
  );
}

function hasNegativeCounts(summary: ProductReviewSummary) {
  return (
    summary.approvedCount < 0 ||
    summary.ratingSum < 0 ||
    summary.rating1Count < 0 ||
    summary.rating2Count < 0 ||
    summary.rating3Count < 0 ||
    summary.rating4Count < 0 ||
    summary.rating5Count < 0 ||
    summary.photoReviewCount < 0
  );
}

function hasNegativeDelta(delta: SummaryDelta) {
  return (
    delta.approvedCount < 0 ||
    delta.ratingSum < 0 ||
    delta.rating1Count < 0 ||
    delta.rating2Count < 0 ||
    delta.rating3Count < 0 ||
    delta.rating4Count < 0 ||
    delta.rating5Count < 0 ||
    delta.photoReviewCount < 0
  );
}

function summaryUpdateDataFromDelta(delta: SummaryDelta): Prisma.ProductReviewSummaryUpdateInput {
  return {
    approvedCount: { increment: delta.approvedCount },
    ratingSum: { increment: delta.ratingSum },
    rating1Count: { increment: delta.rating1Count },
    rating2Count: { increment: delta.rating2Count },
    rating3Count: { increment: delta.rating3Count },
    rating4Count: { increment: delta.rating4Count },
    rating5Count: { increment: delta.rating5Count },
    photoReviewCount: { increment: delta.photoReviewCount },
  };
}

function summaryCreateDataFromDelta(delta: SummaryDelta): Prisma.ProductReviewSummaryCreateInput {
  const approvedCount = Math.max(0, delta.approvedCount);
  const ratingSum = Math.max(0, delta.ratingSum);
  return {
    storeId: delta.storeId,
    productId: delta.productId,
    approvedCount,
    ratingSum,
    averageRating: approvedCount > 0 ? ratingSum / approvedCount : 0,
    rating1Count: Math.max(0, delta.rating1Count),
    rating2Count: Math.max(0, delta.rating2Count),
    rating3Count: Math.max(0, delta.rating3Count),
    rating4Count: Math.max(0, delta.rating4Count),
    rating5Count: Math.max(0, delta.rating5Count),
    photoReviewCount: Math.max(0, delta.photoReviewCount),
  };
}

async function refreshDerivedSummaryFields(client: SummaryClient, storeId: string, productId: string) {
  const summary = await client.productReviewSummary.findUnique({
    where: { storeId_productId: { storeId, productId } },
  });
  if (!summary) return;
  if (hasNegativeCounts(summary)) {
    await recomputeProductReviewSummary(client, storeId, productId);
    return;
  }

  const lastApproved = summary.approvedCount > 0
    ? await client.review.aggregate({
        where: { storeId, productId, status: APPROVED_REVIEW_STATUS },
        _max: { createdAt: true },
      })
    : null;

  await client.productReviewSummary.update({
    where: { storeId_productId: { storeId, productId } },
    data: {
      averageRating: summary.approvedCount > 0 ? summary.ratingSum / summary.approvedCount : 0,
      lastReviewAt: summary.approvedCount > 0 ? lastApproved?._max.createdAt ?? null : null,
    },
  });
}

async function applyProductReviewSummaryDelta(client: SummaryClient, delta: SummaryDelta) {
  if (isNoopDelta(delta)) return;

  const existing = await client.productReviewSummary.findUnique({
    where: { storeId_productId: { storeId: delta.storeId, productId: delta.productId } },
  });
  if (!existing && delta.approvedCount < 0) {
    await recomputeProductReviewSummary(client, delta.storeId, delta.productId);
    return;
  }
  if (!existing && hasNegativeDelta(delta)) {
    await recomputeProductReviewSummary(client, delta.storeId, delta.productId);
    return;
  }

  if (existing) {
    await client.productReviewSummary.update({
      where: { storeId_productId: { storeId: delta.storeId, productId: delta.productId } },
      data: summaryUpdateDataFromDelta(delta),
    });
  } else {
    await client.productReviewSummary.upsert({
      where: { storeId_productId: { storeId: delta.storeId, productId: delta.productId } },
      create: summaryCreateDataFromDelta(delta),
      update: summaryUpdateDataFromDelta(delta),
    });
  }

  await refreshDerivedSummaryFields(client, delta.storeId, delta.productId);
}

export async function applyReviewSummaryVisibilityChange(
  client: SummaryClient,
  before: ReviewSummaryReview | null,
  after: ReviewSummaryReview | null,
) {
  const deltas = new Map<string, SummaryDelta>();
  for (const [review, direction] of [[before, -1], [after, 1]] as const) {
    if (!review) continue;
    const key = deltaKey(review.storeId, review.productId);
    const delta = deltas.get(key) ?? emptyDelta(review.storeId, review.productId);
    addReviewToDelta(delta, review, direction);
    deltas.set(key, delta);
  }

  for (const delta of deltas.values()) {
    await applyProductReviewSummaryDelta(client, delta);
  }
}

export async function recomputeProductReviewSummary(client: SummaryClient, storeId: string, productId: string) {
  const reviews = await client.review.findMany({
    where: { storeId, productId, status: APPROVED_REVIEW_STATUS },
    select: { storeId: true, productId: true, rating: true, status: true, images: true, createdAt: true },
  });

  const exact = emptyDelta(storeId, productId);
  let lastReviewAt: Date | null = null;
  for (const review of reviews) {
    addReviewToDelta(exact, review, 1);
    if (!lastReviewAt || review.createdAt > lastReviewAt) lastReviewAt = review.createdAt;
  }

  const approvedCount = Math.max(0, exact.approvedCount);
  const ratingSum = Math.max(0, exact.ratingSum);
  await client.productReviewSummary.upsert({
    where: { storeId_productId: { storeId, productId } },
    create: {
      ...summaryCreateDataFromDelta(exact),
      averageRating: approvedCount > 0 ? ratingSum / approvedCount : 0,
      lastReviewAt,
    },
    update: {
      approvedCount,
      ratingSum,
      averageRating: approvedCount > 0 ? ratingSum / approvedCount : 0,
      rating1Count: Math.max(0, exact.rating1Count),
      rating2Count: Math.max(0, exact.rating2Count),
      rating3Count: Math.max(0, exact.rating3Count),
      rating4Count: Math.max(0, exact.rating4Count),
      rating5Count: Math.max(0, exact.rating5Count),
      photoReviewCount: Math.max(0, exact.photoReviewCount),
      lastReviewAt,
    },
  });
}

export function summaryStats(summary: ProductReviewSummary | null | undefined): ProductReviewSummaryStats {
  if (!summary || summary.approvedCount <= 0) {
    return { allCount: 0, ratingCounts: [...ZERO_RATING_COUNTS], avgRating: null };
  }

  return {
    allCount: summary.approvedCount,
    ratingCounts: [
      summary.rating1Count,
      summary.rating2Count,
      summary.rating3Count,
      summary.rating4Count,
      summary.rating5Count,
    ],
    avgRating: (summary.ratingSum / summary.approvedCount).toFixed(1),
  };
}

export function publicRatingFromSummary(summary: ProductReviewSummary | null | undefined): { avg: string; count: number } | null {
  if (!summary || summary.approvedCount <= 0) return null;
  return {
    avg: (summary.ratingSum / summary.approvedCount).toFixed(1),
    count: summary.approvedCount,
  };
}
