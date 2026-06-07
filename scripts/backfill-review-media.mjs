// Backfill normalized ReviewMedia rows from legacy Review.images.
// Usage:
//   pnpm reviews:media:backfill
//   pnpm reviews:media:backfill --cloudName=<cloudinaryCloudName>
//   pnpm reviews:media:backfill --storeId=<merchantId>
//   pnpm reviews:media:backfill --storeId=<merchantId> --productId=<ikasProductId>

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const BATCH_SIZE = 250;
const ALLOWED_IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

function argValue(name) {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length)?.trim() || null;
}

function configuredCloudName(explicitCloudName) {
  const cloudName = (explicitCloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || '').trim();
  if (cloudName === 'your_cloud_name' || cloudName === 'your-cloud-name') return null;
  return /^[A-Za-z0-9_-]+$/.test(cloudName) ? cloudName : null;
}

function normalizeStoreId(value) {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{1,128}$/.test(value.trim()) ? value.trim() : null;
}

function isTrustedReviewImageUrl(value, cloudName, storeId) {
  if (typeof value !== 'string' || !cloudName) return false;
  const normalizedStoreId = normalizeStoreId(storeId);
  if (!normalizedStoreId) return false;
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    return false;
  }
  if (url.protocol !== 'https:' || url.hostname !== 'res.cloudinary.com' || url.username || url.password || url.port || url.search || url.hash) {
    return false;
  }
  const lowerPath = url.pathname.toLowerCase();
  if (lowerPath.includes('%2f') || lowerPath.includes('%5c')) return false;
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length < 8) return false;
  if (parts[0] !== cloudName || parts[1] !== 'image' || parts[2] !== 'upload') return false;
  if (!/^v\d+$/.test(parts[3]) || parts[4] !== 'review_images' || parts[5] !== 'stores' || parts[6] !== normalizedStoreId) return false;
  if (parts.slice(7).some((part) => part === '.' || part === '..')) return false;
  const fileName = parts[parts.length - 1];
  const extension = fileName.includes('.') ? fileName.split('.').pop()?.toLowerCase() : '';
  return !!extension && ALLOWED_IMAGE_EXTENSIONS.has(extension);
}

function parseTrustedImages(value, cloudName, storeId) {
  if (!value || !cloudName) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((url, index) => parsed.indexOf(url) === index && isTrustedReviewImageUrl(url, cloudName, storeId))
      : [];
  } catch {
    return [];
  }
}

function publicIdFromUrl(url, cloudName, storeId) {
  if (!isTrustedReviewImageUrl(url, cloudName, storeId)) return null;
  const parts = new URL(url).pathname.split('/').filter(Boolean);
  return parts.slice(4).join('/').replace(/\.[^.]+$/, '');
}

function scopeWhere(storeId, productId) {
  return {
    ...(storeId ? { storeId } : {}),
    ...(productId ? { productId } : {}),
  };
}

async function processReview(review, cloudName) {
  const urls = parseTrustedImages(review.images, cloudName, review.storeId);
  const mediaRows = urls.flatMap((url, position) => {
    const publicId = publicIdFromUrl(url, cloudName, review.storeId);
    if (!publicId) return [];
    return [{
      reviewId: review.id,
      storeId: review.storeId,
      productId: review.productId,
      url,
      publicId,
      position,
      visible: review.status === 'approved',
    }];
  });
  const hasImages = mediaRows.length > 0;

  return prisma.$transaction(async (tx) => {
    const deleted = await tx.reviewMedia.deleteMany({ where: { reviewId: review.id } });
    const created = mediaRows.length > 0
      ? await tx.reviewMedia.createMany({ data: mediaRows, skipDuplicates: true })
      : { count: 0 };

    if (review.hasImages !== hasImages) {
      await tx.review.update({
        where: { id: review.id },
        data: { hasImages },
      });
    }

    return {
      hasImages,
      deleted: deleted.count,
      created: created.count,
      skippedDuplicate: Math.max(0, mediaRows.length - created.count),
    };
  });
}

async function repairPhotoReviewCounts(storeId, productId) {
  const where = scopeWhere(storeId, productId);
  const [summaries, groups] = await Promise.all([
    prisma.productReviewSummary.findMany({
      where,
      select: { storeId: true, productId: true, photoReviewCount: true },
    }),
    prisma.review.groupBy({
      by: ['storeId', 'productId'],
      where: { ...where, status: 'approved', hasImages: true },
      _count: { _all: true },
    }),
  ]);

  const counts = new Map(groups.map((row) => [`${row.storeId}\u0000${row.productId}`, row._count._all]));
  let repaired = 0;
  let missingSummaries = 0;

  for (const summary of summaries) {
    const key = `${summary.storeId}\u0000${summary.productId}`;
    const exactCount = counts.get(key) ?? 0;
    if (summary.photoReviewCount === exactCount) continue;
    await prisma.productReviewSummary.update({
      where: { storeId_productId: { storeId: summary.storeId, productId: summary.productId } },
      data: { photoReviewCount: exactCount },
    });
    repaired += 1;
  }

  const summaryKeys = new Set(summaries.map((row) => `${row.storeId}\u0000${row.productId}`));
  for (const key of counts.keys()) {
    if (!summaryKeys.has(key)) missingSummaries += 1;
  }

  return { repaired, missingSummaries };
}

async function run() {
  const storeId = argValue('storeId');
  const productId = argValue('productId');
  const explicitCloudName = argValue('cloudName');
  if (productId && !storeId) throw new Error('--productId requires --storeId');

  const cloudName = configuredCloudName(explicitCloudName);
  if (!cloudName) {
    throw new Error('A real Cloudinary cloud name is required; refusing to backfill ReviewMedia with an unknown or placeholder trusted tenant policy.');
  }

  const where = scopeWhere(storeId, productId);
  let cursorId = null;
  let processed = 0;
  let withImages = 0;
  let mediaCreated = 0;
  let mediaDeleted = 0;
  let skippedDuplicates = 0;

  while (true) {
    const reviews = await prisma.review.findMany({
      where,
      orderBy: { id: 'asc' },
      take: BATCH_SIZE,
      ...(cursorId ? { cursor: { id: cursorId }, skip: 1 } : {}),
      select: {
        id: true,
        storeId: true,
        productId: true,
        status: true,
        images: true,
        hasImages: true,
      },
    });
    if (reviews.length === 0) break;

    for (const review of reviews) {
      const result = await processReview(review, cloudName);
      processed += 1;
      if (result.hasImages) withImages += 1;
      mediaCreated += result.created;
      mediaDeleted += result.deleted;
      skippedDuplicates += result.skippedDuplicate;
    }

    cursorId = reviews[reviews.length - 1].id;
    console.log(`[review-media] processed=${processed} withImages=${withImages} mediaCreated=${mediaCreated}`);
  }

  const summaryRepair = await repairPhotoReviewCounts(storeId, productId);
  console.log(JSON.stringify({
    processed,
    withImages,
    mediaCreated,
    mediaDeleted,
    skippedDuplicates,
    summaryRowsRepaired: summaryRepair.repaired,
    summaryRowsMissing: summaryRepair.missingSummaries,
  }, null, 2));
}

run()
  .catch((error) => {
    console.error('[review-media] Backfill failed:', error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
