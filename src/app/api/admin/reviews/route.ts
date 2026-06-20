import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { getConfiguredCloudinaryCloudName, parseStoredReviewImages } from '@/lib/review-images';
import { applyReviewSummaryVisibilityChange } from '@/lib/review-summary';
import { dispatchMediaProviderJob } from '@/lib/media/jobs';
import { VIDEO_PROVIDER } from '@/lib/media/constants';
import {
  enqueueVideoReviewCleanup,
  getReviewForModerationUpdate,
  rejectVideoReview,
  requestVideoApproval,
  VideoModerationError,
} from '@/lib/media/moderation';

const REVIEW_NOT_FOUND = 'review-not-found';

/**
 * Handle GET requests: Fetch reviews for the authenticated merchant (paginated)
 * Query params: page (default 1), limit (default 20), status (optional filter)
 */
export async function GET(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const status = searchParams.get('status') || undefined;
    const skip = (page - 1) * limit;

    const where = {
      storeId: user.merchantId,
      ...(status && { status }),
    };

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          media: { orderBy: { position: 'asc' } },
        },
      }),
      prisma.review.count({ where }),
    ]);

    const cloudName = getConfiguredCloudinaryCloudName();
    const sanitizedReviews = reviews.map(review => ({
      ...review,
      images: JSON.stringify(parseStoredReviewImages(review.images, cloudName, review.storeId)),
      media: review.media.map((item) => ({
        id: item.id,
        type: item.resourceType === 'video' ? 'video' : 'image',
        url: item.resourceType === 'image' ? item.url : null,
        posterUrl: item.posterUrl,
        durationMs: item.durationMs,
        width: item.width,
        height: item.height,
        position: item.position,
        processingStatus: item.processingStatus,
        visible: item.visible,
      })),
    }));

    return NextResponse.json({
      data: sanitizedReviews,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * Handle DELETE requests: Delete a review permanently
 */
export async function DELETE(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }
    try {
      const jobs = await prisma.$transaction(async (tx) => {
        const existing = await getReviewForModerationUpdate(tx, id, user.merchantId);
        if (!existing) throw new Error(REVIEW_NOT_FOUND);

        const videoMedia = await tx.reviewMedia.findMany({
          where: { reviewId: id, resourceType: 'video', provider: VIDEO_PROVIDER },
          select: { id: true, providerAssetId: true, processingStatus: true },
        }) ?? [];
        const cleanupJobs = await enqueueVideoReviewCleanup(tx, existing, videoMedia);

        await tx.review.delete({
          where: { id },
        });
        await applyReviewSummaryVisibilityChange(tx, existing, null);
        return cleanupJobs;
      });
      await Promise.all(jobs.map((job) => dispatchMediaProviderJob(job.id)));
      return NextResponse.json({ message: 'Review deleted' });
    } catch (error) {
      if (error instanceof Error && error.message !== REVIEW_NOT_FOUND) {
        console.error('Error deleting review:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
      return NextResponse.json({ error: 'Review not found or unauthorized' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * Handle PUT requests: Update status or merchantReply for a review
 */
export async function PUT(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status, merchantReply } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }
    if (status !== undefined && !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid review status' }, { status: 400 });
    }

    // Mağaza yanıtı uzunluk sınırı — DB schema'da @db.VarChar(2000) ile ikinci
    // savunma katmanı var, ama API'da erken hata daha temiz mesaj verir.
    if (typeof merchantReply === 'string' && merchantReply.length > 2000) {
      return NextResponse.json(
        { error: 'Mağaza yanıtı 2000 karakteri aşamaz' },
        { status: 400 }
      );
    }

    try {
      const result = await prisma.$transaction(async (tx) => {
        const existing = await getReviewForModerationUpdate(tx, id, user.merchantId);
        if (!existing) throw new Error(REVIEW_NOT_FOUND);

        const videoMedia = status !== undefined && existing.hasVideo
          ? (await tx.reviewMedia.findMany({
              where: { reviewId: id, resourceType: 'video', provider: VIDEO_PROVIDER },
              select: { id: true, providerAssetId: true, processingStatus: true },
            }) ?? [])
          : [];
        if (existing.hasVideo && status !== undefined && videoMedia.length === 0) {
          throw new VideoModerationError('video_not_ready');
        }
        if (status === 'approved' && videoMedia.length > 0) {
          return requestVideoApproval(tx, existing, videoMedia, merchantReply);
        }
        if (status === 'rejected' && videoMedia.length > 0) {
          return rejectVideoReview(tx, existing, videoMedia, merchantReply);
        }

        const updated = await tx.review.update({
          where: { id },
          data: {
            ...(status !== undefined && { status }),
            ...(merchantReply !== undefined && { merchantReply }),
          },
        });
        if (status !== undefined && existing.status !== updated.status) {
          await tx.reviewMedia.updateMany({
            where: { reviewId: id },
            data: { visible: updated.status === 'approved' },
          });
        }
        await applyReviewSummaryVisibilityChange(tx, existing, updated);
        return { updated, jobs: [], processing: false as const };
      });
      await Promise.all(result.jobs.map((job) => dispatchMediaProviderJob(job.id)));
      return NextResponse.json({ data: result.updated, processing: result.processing }, { status: result.processing ? 202 : 200 });
    } catch (error) {
      if (error instanceof VideoModerationError) {
        return NextResponse.json({ error: 'Video henüz onaylanmaya hazır değil.' }, { status: 409 });
      }
      if (error instanceof Error && error.message !== REVIEW_NOT_FOUND) {
        console.error('Error updating review:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
      return NextResponse.json({ error: 'Review not found or unauthorized' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
