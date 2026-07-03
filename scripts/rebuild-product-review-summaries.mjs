// Rebuild ProductReviewSummary from approved Review rows.
// Usage:
//   node scripts/rebuild-product-review-summaries.mjs
//   node scripts/rebuild-product-review-summaries.mjs --storeId=<merchantId>
//   node scripts/rebuild-product-review-summaries.mjs --storeId=<merchantId> --productId=<ikasProductId>

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function argValue(name) {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length)?.trim() || null;
}

function emptySummary(storeId, productId) {
  return {
    storeId,
    productId,
    approvedCount: 0,
    ratingSum: 0,
    averageRating: 0,
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
    lastReviewAt: null,
  };
}

function addReview(summary, review) {
  if (!Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) return;
  summary.approvedCount += 1;
  summary.ratingSum += review.rating;
  summary[`rating${review.rating}Count`] += 1;
  const hasTrustedImages = review.hasImages === true;
  if (hasTrustedImages) {
    summary.photoReviewCount += 1;
    summary[`photoRating${review.rating}Count`] += 1;
  }
  if (hasTrustedImages || review.hasVideo === true) {
    summary.mediaReviewCount += 1;
    summary[`mediaRating${review.rating}Count`] += 1;
  }
  if (!summary.lastReviewAt || review.createdAt > summary.lastReviewAt) summary.lastReviewAt = review.createdAt;
}

async function recomputeOne(storeId, productId) {
  const reviews = await prisma.review.findMany({
    where: { storeId, productId, status: 'approved' },
    select: { rating: true, images: true, hasImages: true, hasVideo: true, createdAt: true },
  });
  const summary = emptySummary(storeId, productId);
  for (const review of reviews) addReview(summary, review);
  summary.averageRating = summary.approvedCount > 0 ? summary.ratingSum / summary.approvedCount : 0;

  await prisma.productReviewSummary.upsert({
    where: { storeId_productId: { storeId, productId } },
    create: summary,
    update: summary,
  });
  return summary;
}

async function collectKeys(storeId, productId) {
  if (storeId && productId) return [{ storeId, productId }];

  const where = storeId ? { storeId } : {};
  const [approvedGroups, existingSummaries] = await Promise.all([
    prisma.review.groupBy({
      by: ['storeId', 'productId'],
      where: { ...where, status: 'approved' },
    }),
    prisma.productReviewSummary.findMany({
      where,
      select: { storeId: true, productId: true },
    }),
  ]);

  const keys = new Map();
  for (const row of approvedGroups) keys.set(`${row.storeId}\u0000${row.productId}`, { storeId: row.storeId, productId: row.productId });
  for (const row of existingSummaries) keys.set(`${row.storeId}\u0000${row.productId}`, row);
  return Array.from(keys.values()).sort((a, b) => (a.storeId + a.productId).localeCompare(b.storeId + b.productId));
}

async function run() {
  const storeId = argValue('storeId');
  const productId = argValue('productId');
  if (productId && !storeId) throw new Error('--productId requires --storeId');

  const keys = await collectKeys(storeId, productId);
  console.log(`[review-summary] Rebuilding ${keys.length} product summary row(s).`);

  let rebuilt = 0;
  for (const key of keys) {
    const summary = await recomputeOne(key.storeId, key.productId);
    rebuilt += 1;
    console.log(`[review-summary] ${rebuilt}/${keys.length} ${key.storeId}/${key.productId}: count=${summary.approvedCount}, avg=${summary.averageRating.toFixed(1)}`);
  }
}

run()
  .catch((error) => {
    console.error('[review-summary] Rebuild failed:', error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
