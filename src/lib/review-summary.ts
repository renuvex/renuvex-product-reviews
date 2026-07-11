import type { Prisma, ProductReviewSummary } from '@prisma/client';

export const APPROVED_REVIEW_STATUS = 'approved';

type SummaryClient = Pick<Prisma.TransactionClient, 'productReviewSummary' | 'review'>;

export type ReviewSummaryReview = {
  storeId: string;
  productId: string;
  rating: number;
  status: string;
  images?: string | null;
  hasImages?: boolean | null;
  hasVideo?: boolean | null;
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
  photoRating1Count: number;
  photoRating2Count: number;
  photoRating3Count: number;
  photoRating4Count: number;
  photoRating5Count: number;
  mediaReviewCount: number;
  mediaRating1Count: number;
  mediaRating2Count: number;
  mediaRating3Count: number;
  mediaRating4Count: number;
  mediaRating5Count: number;
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

function photoRatingBucketKey(rating: number): keyof Pick<
  SummaryDelta,
  'photoRating1Count' | 'photoRating2Count' | 'photoRating3Count' | 'photoRating4Count' | 'photoRating5Count'
> | null {
  if (rating === 1) return 'photoRating1Count';
  if (rating === 2) return 'photoRating2Count';
  if (rating === 3) return 'photoRating3Count';
  if (rating === 4) return 'photoRating4Count';
  if (rating === 5) return 'photoRating5Count';
  return null;
}

function mediaRatingBucketKey(rating: number): keyof Pick<
  SummaryDelta,
  'mediaRating1Count' | 'mediaRating2Count' | 'mediaRating3Count' | 'mediaRating4Count' | 'mediaRating5Count'
> | null {
  if (rating === 1) return 'mediaRating1Count';
  if (rating === 2) return 'mediaRating2Count';
  if (rating === 3) return 'mediaRating3Count';
  if (rating === 4) return 'mediaRating4Count';
  if (rating === 5) return 'mediaRating5Count';
  return null;
}

function reviewHasTrustedImages(review: ReviewSummaryReview): boolean {
  return review.hasImages === true;
}

function reviewHasMedia(review: ReviewSummaryReview): boolean {
  return reviewHasTrustedImages(review) || review.hasVideo === true;
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
    photoRating1Count: 0,
    photoRating2Count: 0,
    photoRating3Count: 0,
    photoRating4Count: 0,
    photoRating5Count: 0,
    mediaReviewCount: 0,
    mediaRating1Count: 0,
    mediaRating2Count: 0,
    mediaRating3Count: 0,
    mediaRating4Count: 0,
    mediaRating5Count: 0,
  };
}

function addReviewToDelta(delta: SummaryDelta, review: ReviewSummaryReview, direction: 1 | -1) {
  if (review.status !== APPROVED_REVIEW_STATUS) return;
  const bucketKey = ratingBucketKey(review.rating);
  if (!bucketKey) return;
  delta.approvedCount += direction;
  delta.ratingSum += review.rating * direction;
  delta[bucketKey] += direction;
  if (reviewHasTrustedImages(review)) {
    const photoBucketKey = photoRatingBucketKey(review.rating);
    delta.photoReviewCount += direction;
    if (photoBucketKey) delta[photoBucketKey] += direction;
  }
  if (reviewHasMedia(review)) {
    const mediaBucketKey = mediaRatingBucketKey(review.rating);
    delta.mediaReviewCount += direction;
    if (mediaBucketKey) delta[mediaBucketKey] += direction;
  }
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
    delta.photoReviewCount === 0 &&
    delta.photoRating1Count === 0 &&
    delta.photoRating2Count === 0 &&
    delta.photoRating3Count === 0 &&
    delta.photoRating4Count === 0 &&
    delta.photoRating5Count === 0 &&
    delta.mediaReviewCount === 0 &&
    delta.mediaRating1Count === 0 &&
    delta.mediaRating2Count === 0 &&
    delta.mediaRating3Count === 0 &&
    delta.mediaRating4Count === 0 &&
    delta.mediaRating5Count === 0
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
    summary.photoReviewCount < 0 ||
    summary.photoRating1Count < 0 ||
    summary.photoRating2Count < 0 ||
    summary.photoRating3Count < 0 ||
    summary.photoRating4Count < 0 ||
    summary.photoRating5Count < 0 ||
    summary.mediaReviewCount < 0 ||
    summary.mediaRating1Count < 0 ||
    summary.mediaRating2Count < 0 ||
    summary.mediaRating3Count < 0 ||
    summary.mediaRating4Count < 0 ||
    summary.mediaRating5Count < 0
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
    delta.photoReviewCount < 0 ||
    delta.photoRating1Count < 0 ||
    delta.photoRating2Count < 0 ||
    delta.photoRating3Count < 0 ||
    delta.photoRating4Count < 0 ||
    delta.photoRating5Count < 0 ||
    delta.mediaReviewCount < 0 ||
    delta.mediaRating1Count < 0 ||
    delta.mediaRating2Count < 0 ||
    delta.mediaRating3Count < 0 ||
    delta.mediaRating4Count < 0 ||
    delta.mediaRating5Count < 0
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
    photoRating1Count: { increment: delta.photoRating1Count },
    photoRating2Count: { increment: delta.photoRating2Count },
    photoRating3Count: { increment: delta.photoRating3Count },
    photoRating4Count: { increment: delta.photoRating4Count },
    photoRating5Count: { increment: delta.photoRating5Count },
    mediaReviewCount: { increment: delta.mediaReviewCount },
    mediaRating1Count: { increment: delta.mediaRating1Count },
    mediaRating2Count: { increment: delta.mediaRating2Count },
    mediaRating3Count: { increment: delta.mediaRating3Count },
    mediaRating4Count: { increment: delta.mediaRating4Count },
    mediaRating5Count: { increment: delta.mediaRating5Count },
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
    photoRating1Count: Math.max(0, delta.photoRating1Count),
    photoRating2Count: Math.max(0, delta.photoRating2Count),
    photoRating3Count: Math.max(0, delta.photoRating3Count),
    photoRating4Count: Math.max(0, delta.photoRating4Count),
    photoRating5Count: Math.max(0, delta.photoRating5Count),
    mediaReviewCount: Math.max(0, delta.mediaReviewCount),
    mediaRating1Count: Math.max(0, delta.mediaRating1Count),
    mediaRating2Count: Math.max(0, delta.mediaRating2Count),
    mediaRating3Count: Math.max(0, delta.mediaRating3Count),
    mediaRating4Count: Math.max(0, delta.mediaRating4Count),
    mediaRating5Count: Math.max(0, delta.mediaRating5Count),
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

export async function applyReviewSummaryRemovals(
  client: SummaryClient,
  reviews: readonly ReviewSummaryReview[],
) {
  const deltas = new Map<string, SummaryDelta>();
  for (const review of reviews) {
    const key = deltaKey(review.storeId, review.productId);
    const delta = deltas.get(key) ?? emptyDelta(review.storeId, review.productId);
    addReviewToDelta(delta, review, -1);
    deltas.set(key, delta);
  }
  for (const delta of deltas.values()) {
    await applyProductReviewSummaryDelta(client, delta);
  }
}

export async function recomputeProductReviewSummary(client: SummaryClient, storeId: string, productId: string) {
  const reviews = await client.review.findMany({
    where: { storeId, productId, status: APPROVED_REVIEW_STATUS },
    select: { storeId: true, productId: true, rating: true, status: true, images: true, hasImages: true, hasVideo: true, createdAt: true },
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
      photoRating1Count: Math.max(0, exact.photoRating1Count),
      photoRating2Count: Math.max(0, exact.photoRating2Count),
      photoRating3Count: Math.max(0, exact.photoRating3Count),
      photoRating4Count: Math.max(0, exact.photoRating4Count),
      photoRating5Count: Math.max(0, exact.photoRating5Count),
      mediaReviewCount: Math.max(0, exact.mediaReviewCount),
      mediaRating1Count: Math.max(0, exact.mediaRating1Count),
      mediaRating2Count: Math.max(0, exact.mediaRating2Count),
      mediaRating3Count: Math.max(0, exact.mediaRating3Count),
      mediaRating4Count: Math.max(0, exact.mediaRating4Count),
      mediaRating5Count: Math.max(0, exact.mediaRating5Count),
      lastReviewAt,
    },
  });
}

export function filteredReviewTotal(
  summary: ProductReviewSummary | null | undefined,
  filters: { ratingFilter?: number | null; hasImagesFilter?: boolean; hasMediaFilter?: boolean },
): number {
  if (!summary || summary.approvedCount <= 0) return 0;
  const ratingFilter = filters.ratingFilter ?? null;
  const hasImagesFilter = filters.hasImagesFilter === true;
  const hasMediaFilter = filters.hasMediaFilter === true;

  if (hasMediaFilter && ratingFilter) {
    if (ratingFilter === 1) return summary.mediaRating1Count;
    if (ratingFilter === 2) return summary.mediaRating2Count;
    if (ratingFilter === 3) return summary.mediaRating3Count;
    if (ratingFilter === 4) return summary.mediaRating4Count;
    if (ratingFilter === 5) return summary.mediaRating5Count;
    return 0;
  }

  if (hasMediaFilter) return summary.mediaReviewCount;

  if (hasImagesFilter && ratingFilter) {
    if (ratingFilter === 1) return summary.photoRating1Count;
    if (ratingFilter === 2) return summary.photoRating2Count;
    if (ratingFilter === 3) return summary.photoRating3Count;
    if (ratingFilter === 4) return summary.photoRating4Count;
    if (ratingFilter === 5) return summary.photoRating5Count;
    return 0;
  }

  if (hasImagesFilter) return summary.photoReviewCount;

  if (ratingFilter) {
    if (ratingFilter === 1) return summary.rating1Count;
    if (ratingFilter === 2) return summary.rating2Count;
    if (ratingFilter === 3) return summary.rating3Count;
    if (ratingFilter === 4) return summary.rating4Count;
    if (ratingFilter === 5) return summary.rating5Count;
    return 0;
  }

  return summary.approvedCount;
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
