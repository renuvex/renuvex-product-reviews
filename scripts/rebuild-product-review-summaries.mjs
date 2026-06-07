// Rebuild ProductReviewSummary from approved Review rows.
// Usage:
//   node scripts/rebuild-product-review-summaries.mjs
//   node scripts/rebuild-product-review-summaries.mjs --storeId=<merchantId>
//   node scripts/rebuild-product-review-summaries.mjs --storeId=<merchantId> --productId=<ikasProductId>

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ALLOWED_IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

function argValue(name) {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length)?.trim() || null;
}

function configuredCloudName() {
  const cloudName = (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || '').trim();
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
    return Array.isArray(parsed) ? parsed.filter((url) => isTrustedReviewImageUrl(url, cloudName, storeId)) : [];
  } catch {
    return [];
  }
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
    lastReviewAt: null,
  };
}

function addReview(summary, review, cloudName) {
  if (!Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) return;
  summary.approvedCount += 1;
  summary.ratingSum += review.rating;
  summary[`rating${review.rating}Count`] += 1;
  if (parseTrustedImages(review.images, cloudName, summary.storeId).length > 0) summary.photoReviewCount += 1;
  if (!summary.lastReviewAt || review.createdAt > summary.lastReviewAt) summary.lastReviewAt = review.createdAt;
}

async function recomputeOne(storeId, productId, cloudName) {
  const reviews = await prisma.review.findMany({
    where: { storeId, productId, status: 'approved' },
    select: { rating: true, images: true, createdAt: true },
  });
  const summary = emptySummary(storeId, productId);
  for (const review of reviews) addReview(summary, review, cloudName);
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

  const cloudName = configuredCloudName();
  if (!cloudName) {
    console.warn('[review-summary] Cloudinary cloud name is missing; photoReviewCount will be rebuilt as 0.');
  }

  const keys = await collectKeys(storeId, productId);
  console.log(`[review-summary] Rebuilding ${keys.length} product summary row(s).`);

  let rebuilt = 0;
  for (const key of keys) {
    const summary = await recomputeOne(key.storeId, key.productId, cloudName);
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
