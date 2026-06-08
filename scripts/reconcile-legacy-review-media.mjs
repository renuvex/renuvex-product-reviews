// Copy-first reconciliation for legacy Review.images rows.
// Default mode is dry-run. Apply requires --apply plus explicit safety flags.
//
// Usage:
//   pnpm reviews:media:reconcile --cloudName=<cloudinaryCloudName>
//   pnpm reviews:media:reconcile --cloudName=<cloudinaryCloudName> --storeId=<merchantId> --allowLegacyGlobal --apply
//   pnpm reviews:media:reconcile --cloudName=<cloudinaryCloudName> --storeId=<merchantId> --allowLegacyGlobal --dropMissingLegacy --apply

import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import {
  argValue,
  classifyReviewImages,
  configuredCloudinaryApiCredentials,
  configuredCloudName,
  hasFlag,
  isTrustedTenantUrl,
  loadLocalEnvFiles,
} from './review-media-reconciliation-lib.mjs';

loadLocalEnvFiles();

const prisma = new PrismaClient();
const BATCH_SIZE = 100;

function scopeWhere(storeId, productId) {
  return {
    ...(storeId ? { storeId } : {}),
    ...(productId ? { productId } : {}),
  };
}

function toReviewMediaRows(review, urls, cloudName) {
  return urls.flatMap((url, position) => {
    if (!isTrustedTenantUrl(url, cloudName, review.storeId)) return [];
    const parsed = new URL(url).pathname.split('/').filter(Boolean);
    return [{
      reviewId: review.id,
      storeId: review.storeId,
      productId: review.productId,
      url,
      publicId: parsed.slice(4).join('/').replace(/\.[^.]+$/, ''),
      position,
      visible: review.status === 'approved',
    }];
  });
}

function classifyPlan(review, cloudName, options) {
  const classified = classifyReviewImages(review, cloudName);
  if (classified.parseKind !== 'array') {
    return { action: 'skip', reason: classified.parseKind, urls: [], copies: [] };
  }
  if (classified.items.length === 0) return { action: 'skip', reason: 'no_images', urls: [], copies: [] };

  const urls = [];
  const copies = [];
  for (const item of classified.items) {
    if (item.bucket === 'tenant_scoped_trusted') {
      urls.push(item.url);
      continue;
    }
    if (item.bucket === 'legacy_global_review_images') {
      if (!options.allowLegacyGlobal) return { action: 'skip', reason: 'legacy_global_requires_allow_flag', urls: [], copies: [] };
      if (!item.publicId || !item.targetPublicId) return { action: 'skip', reason: 'missing_public_id', urls: [], copies: [] };
      copies.push({
        sourceUrl: item.url,
        sourcePublicId: item.publicId,
        targetPublicId: item.targetPublicId,
        position: item.position,
      });
      urls.push(null);
      continue;
    }
    return { action: 'skip', reason: item.bucket, urls: [], copies: [] };
  }

  return { action: copies.length > 0 ? 'copy' : 'normalize', reason: null, urls, copies };
}

async function getExistingTargetUrl(targetPublicId) {
  try {
    const resource = await cloudinary.api.resource(targetPublicId, { resource_type: 'image' });
    return typeof resource?.secure_url === 'string' ? resource.secure_url : null;
  } catch (error) {
    if (error?.http_code === 404 || error?.error?.http_code === 404) return null;
    throw error;
  }
}

async function copyLegacyAsset(copy) {
  const existing = await getExistingTargetUrl(copy.targetPublicId);
  if (existing) return { secureUrl: existing, copied: false };

  const uploaded = await cloudinary.uploader.upload(copy.sourceUrl, {
      public_id: copy.targetPublicId,
      resource_type: 'image',
      overwrite: false,
      invalidate: false,
    })
    .catch((error) => {
      if (error?.http_code === 404 || error?.error?.http_code === 404 || String(error?.message || '').startsWith('Resource not found')) {
        return { missingSource: true };
      }
      throw error;
    });
  if (uploaded?.missingSource) return { secureUrl: null, copied: false, missingSource: true };
  if (!uploaded?.secure_url) throw new Error(`Cloudinary copy returned no secure_url for ${copy.sourcePublicId}`);
  return { secureUrl: uploaded.secure_url, copied: true };
}

async function applyReviewPlan(review, plannedUrls, cloudName) {
  const mediaRows = toReviewMediaRows(review, plannedUrls, cloudName);
  if (mediaRows.length !== plannedUrls.length) {
    throw new Error(`Refusing to write untrusted reconciled URLs for review ${review.id}`);
  }

  await prisma.$transaction(async (tx) => {
    await tx.review.update({
      where: { id: review.id },
      data: {
        images: JSON.stringify(plannedUrls),
        hasImages: mediaRows.length > 0,
      },
    });
    await tx.reviewMedia.deleteMany({ where: { reviewId: review.id } });
    if (mediaRows.length > 0) {
      await tx.reviewMedia.createMany({ data: mediaRows, skipDuplicates: true });
    }
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
  return repaired;
}

async function collectReviews(storeId, productId, cursorId) {
  return prisma.review.findMany({
    where: {
      ...scopeWhere(storeId, productId),
      images: { not: null },
    },
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
      media: {
        select: { id: true, publicId: true, visible: true },
        orderBy: { position: 'asc' },
      },
    },
  });
}

async function run() {
  const storeId = argValue(process.argv, 'storeId');
  const productId = argValue(process.argv, 'productId');
  const cloudName = configuredCloudName(argValue(process.argv, 'cloudName'));
  const apply = hasFlag(process.argv, 'apply');
  const allowLegacyGlobal = hasFlag(process.argv, 'allowLegacyGlobal');
  const dropMissingLegacy = hasFlag(process.argv, 'dropMissingLegacy');
  const debugEnv = hasFlag(process.argv, 'debugEnv');
  const limit = Number.parseInt(argValue(process.argv, 'limit') || '0', 10);

  if (productId && !storeId) throw new Error('--productId requires --storeId');
  if (!cloudName) throw new Error('A real --cloudName=<cloudinaryCloudName> is required.');
  if (apply && !storeId) throw new Error('--apply requires --storeId to keep legacy reconciliation explicitly scoped.');
  if (apply && allowLegacyGlobal) {
    const credentials = configuredCloudinaryApiCredentials();
    if (debugEnv) {
      const apiKey = process.env.CLOUDINARY_API_KEY || '';
      const apiSecret = process.env.CLOUDINARY_API_SECRET || '';
      console.error('[review-media-reconcile] env:', JSON.stringify({
        keySet: !!apiKey,
        secretSet: !!apiSecret,
        keyLen: apiKey.length,
        secretLen: apiSecret.length,
        keyPlaceholder: apiKey.includes('BURAYA') || apiKey.includes('your_'),
        secretPlaceholder: apiSecret.includes('BURAYA') || apiSecret.includes('SECRET_DEGERINI') || apiSecret.includes('your_'),
        ready: !!credentials,
      }));
    }
    if (!credentials) throw new Error('--apply with legacy global assets requires CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.');
    cloudinary.config({ cloud_name: cloudName, api_key: credentials.apiKey, api_secret: credentials.apiSecret });
  }

  const totals = {
    mode: apply ? 'apply' : 'dryRun',
    scope: { storeId: storeId || null, productId: productId || null },
    scanned: 0,
    plannedCopies: 0,
    copiedAssets: 0,
    reusedTargetAssets: 0,
    missingSourceAssets: 0,
    droppedMissingLegacyUrls: 0,
    reviewsWithDroppedLegacyUrls: 0,
    normalizedReviews: 0,
    skipped: {},
    summaryRowsRepaired: 0,
  };

  let cursorId = null;
  while (true) {
    const reviews = await collectReviews(storeId, productId, cursorId);
    if (reviews.length === 0) break;

    for (const review of reviews) {
      if (limit > 0 && totals.scanned >= limit) break;
      totals.scanned += 1;
      const plan = classifyPlan(review, cloudName, { allowLegacyGlobal });
      if (plan.action === 'skip') {
        totals.skipped[plan.reason] = (totals.skipped[plan.reason] || 0) + 1;
        continue;
      }

      totals.plannedCopies += plan.copies.length;
      if (!apply) continue;

      const plannedUrls = [...plan.urls];
      for (const copy of plan.copies) {
        const result = await copyLegacyAsset(copy);
        if (result.missingSource) {
          totals.missingSourceAssets += 1;
          if (!dropMissingLegacy) {
            throw new Error(`Legacy source asset is missing for review ${review.id}; rerun with --dropMissingLegacy to remove broken legacy URL references.`);
          }
          plannedUrls[copy.position] = null;
          continue;
        }
        plannedUrls[copy.position] = result.secureUrl;
        result.copied ? totals.copiedAssets += 1 : totals.reusedTargetAssets += 1;
      }

      if (plannedUrls.some((url) => url !== null && (typeof url !== 'string' || !url))) {
        throw new Error(`Internal planning error left empty URL slots for review ${review.id}`);
      }
      const finalUrls = plannedUrls.filter((url) => typeof url === 'string' && url);
      const dropped = plannedUrls.length - finalUrls.length;
      if (dropped > 0) {
        totals.droppedMissingLegacyUrls += dropped;
        totals.reviewsWithDroppedLegacyUrls += 1;
      }
      await applyReviewPlan(review, finalUrls, cloudName);
      totals.normalizedReviews += 1;
    }

    if (limit > 0 && totals.scanned >= limit) break;
    cursorId = reviews[reviews.length - 1].id;
    console.log(`[review-media-reconcile] scanned=${totals.scanned} plannedCopies=${totals.plannedCopies} normalized=${totals.normalizedReviews}`);
  }

  if (apply) totals.summaryRowsRepaired = await repairPhotoReviewCounts(storeId, productId);
  console.log(JSON.stringify(totals, null, 2));
}

run()
  .catch((error) => {
    console.error('[review-media-reconcile] Reconciliation failed:', error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
