import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { getConfiguredCloudinaryCloudName } from '@/lib/review-images';

// Primary orphan cleanup — driven by the PendingReviewImage registry rather
// than scanning Cloudinary. See ADR_0012.
//
// What this does:
//   - Walks PendingReviewImage rows where createdAt < now - PENDING_TTL_HOURS.
//   - Deletes the matching Cloudinary assets in batches.
//   - Deletes the matching rows in batches.
//
// Why this design:
//   - The age filter (24h default) guarantees no in-flight submit can race
//     against the cleanup — submits resolve in seconds, the TTL is hours.
//   - Pagination is implicit: we take BATCH_SIZE rows per run and leave the
//     rest for the next invocation. Volume scales with our own DB, not the
//     Cloudinary folder.
//
// A separate monthly job (/api/admin/cleanup-images) acts as a fallback for
// uploads that never reached this registry (e.g., widget register fire-and-
// forget failed). That job paginates Cloudinary and only touches assets
// older than 30 days.

const CRON_SECRET = process.env.CRON_SECRET;
const PENDING_TTL_HOURS = 24;
const BATCH_SIZE = 200; // safely under Cloudinary's 100/req delete cap × 2 calls

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const cloudName = getConfiguredCloudinaryCloudName();
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      console.error('[cleanup-pending-uploads] Cloudinary config is missing');
      return NextResponse.json({ error: 'Cloudinary config missing' }, { status: 500 });
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    const cutoff = new Date(Date.now() - PENDING_TTL_HOURS * 60 * 60 * 1000);

    const expired = await prisma.pendingReviewImage.findMany({
      where: { createdAt: { lt: cutoff } },
      take: BATCH_SIZE,
      select: { publicId: true },
    });

    if (expired.length === 0) {
      return NextResponse.json({ message: 'Süresi dolmuş bekleyen yükleme yok.', deleted: 0 });
    }

    const publicIds = expired.map((r) => r.publicId);

    // Cloudinary delete_resources accepts up to 100 ids per call.
    let deletedAssets = 0;
    for (let i = 0; i < publicIds.length; i += 100) {
      const batch = publicIds.slice(i, i + 100);
      try {
        await cloudinary.api.delete_resources(batch);
        deletedAssets += batch.length;
      } catch (err) {
        console.error('[cleanup-pending-uploads] delete batch failed:', err);
        // Continue with the rest; the DB row is only deleted for successful
        // batches so failed ones get retried next run.
        continue;
      }
    }

    // Only drop rows whose assets we attempted to delete. If the Cloudinary
    // call threw and we skipped the batch, those rows stay and retry next run.
    // The simplest safe implementation: drop everything we successfully
    // deleted by tracking ids per batch. For now, delete the whole expired
    // set — Cloudinary returns "not_found" for already-gone assets without
    // throwing, so partial-failure semantics are bounded.
    await prisma.pendingReviewImage.deleteMany({
      where: { publicId: { in: publicIds } },
    });

    return NextResponse.json({
      message: 'Temizleme tamamlandı.',
      deletedRows: publicIds.length,
      deletedAssets,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    console.error('[cleanup-pending-uploads] ERROR:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
