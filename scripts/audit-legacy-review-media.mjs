// Read-only audit for legacy Review.images rows.
// Usage:
//   pnpm reviews:media:audit --cloudName=<cloudinaryCloudName>
//   pnpm reviews:media:audit --cloudName=<cloudinaryCloudName> --storeId=<merchantId>
//   pnpm reviews:media:audit --cloudName=<cloudinaryCloudName> --storeId=<merchantId> --productId=<ikasProductId>

import { PrismaClient } from '@prisma/client';
import {
  argValue,
  configuredCloudName,
  loadLocalEnvFiles,
  summarizeClassifiedReviews,
} from './review-media-reconciliation-lib.mjs';

loadLocalEnvFiles();

const prisma = new PrismaClient();

function scopeWhere(storeId, productId) {
  return {
    ...(storeId ? { storeId } : {}),
    ...(productId ? { productId } : {}),
  };
}

async function collectReviews(storeId, productId) {
  return prisma.review.findMany({
    where: {
      ...scopeWhere(storeId, productId),
      images: { not: null },
    },
    orderBy: { id: 'asc' },
    select: {
      id: true,
      storeId: true,
      productId: true,
      status: true,
      images: true,
      hasImages: true,
      media: {
        where: { provider: 'cloudinary', resourceType: 'image' },
        select: {
          id: true,
          publicId: true,
          visible: true,
        },
        orderBy: { position: 'asc' },
      },
    },
  });
}

async function collectConsistency(storeId, productId) {
  const where = scopeWhere(storeId, productId);
  const [summaryRows, hasImagesGroups, orphanMediaRows, reviewMediaCount] = await Promise.all([
    prisma.productReviewSummary.findMany({
      where,
      select: { storeId: true, productId: true, photoReviewCount: true },
    }),
    prisma.review.groupBy({
      by: ['storeId', 'productId'],
      where: { ...where, status: 'approved', hasImages: true },
      _count: { _all: true },
    }),
    prisma.$queryRaw`
      SELECT COUNT(*)::INTEGER AS count
      FROM "ReviewMedia" m
      LEFT JOIN "Review" r ON r.id = m."reviewId"
      WHERE r.id IS NULL
        AND m."provider" = 'cloudinary'
        AND m."resourceType" = 'image'
    `,
    prisma.reviewMedia.count({
      where: { ...where, provider: 'cloudinary', resourceType: 'image' },
    }),
  ]);

  const exact = new Map(hasImagesGroups.map((row) => [`${row.storeId}\u0000${row.productId}`, row._count._all]));
  const mismatches = [];
  for (const row of summaryRows) {
    const key = `${row.storeId}\u0000${row.productId}`;
    const expected = exact.get(key) ?? 0;
    if (row.photoReviewCount !== expected) {
      mismatches.push({
        storeId: row.storeId,
        productId: row.productId,
        summaryPhotoReviewCount: row.photoReviewCount,
        exactApprovedHasImagesCount: expected,
      });
    }
  }

  return {
    reviewMediaCount,
    orphanMediaCount: Number(orphanMediaRows?.[0]?.count ?? 0),
    productReviewSummaryPhotoMismatches: mismatches,
  };
}

async function run() {
  const storeId = argValue(process.argv, 'storeId');
  const productId = argValue(process.argv, 'productId');
  const cloudName = configuredCloudName(argValue(process.argv, 'cloudName'));
  if (productId && !storeId) throw new Error('--productId requires --storeId');
  if (!cloudName) throw new Error('A real --cloudName=<cloudinaryCloudName> is required for deterministic legacy media classification.');

  const reviews = await collectReviews(storeId, productId);
  const [summary, consistency] = await Promise.all([
    Promise.resolve(summarizeClassifiedReviews(reviews, cloudName)),
    collectConsistency(storeId, productId),
  ]);

  console.log(JSON.stringify({
    scope: { storeId: storeId || null, productId: productId || null },
    ...summary,
    ...consistency,
  }, null, 2));
}

run()
  .catch((error) => {
    console.error('[review-media-audit] Audit failed:', error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
