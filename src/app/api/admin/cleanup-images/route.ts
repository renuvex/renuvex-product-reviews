import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { getConfiguredCloudinaryCloudName, getReviewImagePublicId, parseStoredReviewImages } from '@/lib/review-images';
import { reportCronTaskError } from '@/lib/cron-observability';

// Monthly fallback orphan cleanup (see ADR_0012).
//
// Primary cleanup is /api/admin/cleanup-pending-uploads, driven by the
// PendingReviewImage registry. That covers the normal lifecycle. This
// endpoint exists for the edge cases:
//   - Widget's fire-and-forget register call failed for a successful upload.
//   - A legacy upload predates the registry contract.
//   - Manual ops uploads that bypassed the widget.
//
// Design:
//   - Paginates Cloudinary listing via next_cursor — no 500-asset cap.
//   - Only considers assets older than ORPHAN_AGE_DAYS so in-flight uploads
//     and recently-committed reviews cannot race against the diff.
//   - Compares Cloudinary listing against ReviewMedia, with Review.images as
//     a legacy transition fallback.
//   - Deletes orphans in batches of 100 (Cloudinary delete cap).

const CRON_SECRET = process.env.CRON_SECRET;
const ORPHAN_AGE_DAYS = 30;
const LIST_PAGE_SIZE = 500;

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!CRON_SECRET) {
    console.error('[cleanup-images] CRON_SECRET is not configured');
    return NextResponse.json({ error: 'CRON_SECRET is not configured' }, { status: 500 });
  }
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const cloudName = getConfiguredCloudinaryCloudName();
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      console.error('[cleanup-images] Cloudinary config is missing');
      return NextResponse.json({ error: 'Cloudinary config missing' }, { status: 500 });
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    // 1. Build the set of publicIds currently attached to reviews.
    const usedPublicIds = new Set<string>();
    const mediaRows = await prisma.reviewMedia.findMany({
      select: { publicId: true },
    });
    for (const row of mediaRows) {
      if (row.publicId) usedPublicIds.add(row.publicId);
    }

    // Legacy transition fallback: pre-ReviewMedia rows may still only have
    // Review.images until the media backfill has run.
    const reviews = await prisma.review.findMany({
      where: { images: { not: null } },
      select: { storeId: true, images: true },
    });
    for (const review of reviews) {
      if (!review.images) continue;
      const urls = parseStoredReviewImages(review.images, cloudName, review.storeId);
      for (const url of urls) {
        const publicId = getReviewImagePublicId(url, cloudName, review.storeId);
        if (publicId) usedPublicIds.add(publicId);
      }
    }

    // 2. Walk the entire review_images/ folder with cursor pagination.
    const cutoff = Date.now() - ORPHAN_AGE_DAYS * 24 * 60 * 60 * 1000;
    const orphans: string[] = [];
    let nextCursor: string | undefined;
    let scanned = 0;
    do {
      const result: { resources: Array<{ public_id: string; created_at: string }>; next_cursor?: string } =
        await cloudinary.api.resources({
          type: 'upload',
          prefix: 'review_images/',
          max_results: LIST_PAGE_SIZE,
          next_cursor: nextCursor,
        });
      scanned += result.resources.length;
      for (const asset of result.resources) {
        if (usedPublicIds.has(asset.public_id)) continue;
        const createdAt = Date.parse(asset.created_at);
        if (Number.isFinite(createdAt) && createdAt < cutoff) {
          orphans.push(asset.public_id);
        }
      }
      nextCursor = result.next_cursor;
    } while (nextCursor);

    if (orphans.length === 0) {
      return NextResponse.json({ message: 'Temizlenecek görsel yok.', scanned, deleted: 0 });
    }

    let deleted = 0;
    for (let i = 0; i < orphans.length; i += 100) {
      const batch = orphans.slice(i, i + 100);
      try {
        await cloudinary.api.delete_resources(batch);
        deleted += batch.length;
      } catch (err) {
        console.error('[cleanup-images] delete batch failed:', err);
      }
    }

    return NextResponse.json({ message: 'Temizleme tamamlandı.', scanned, deleted });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    reportCronTaskError('cleanup-images', 'cleanup-images', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
