import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  authenticateIkasAdminRequest,
  ikasAdminAuthorizationLostResponse,
  ikasAdminAuthenticationResponse,
} from '@/lib/auth-helpers';
import { applyReviewSummaryRemovals, applyReviewSummaryVisibilityChange } from '@/lib/review-summary';
import { dispatchMediaProviderJob } from '@/lib/media/jobs';
import { MEDIA_JOB_ACTIONS, VIDEO_PROVIDER } from '@/lib/media/constants';
import { enqueueMediaProviderJob } from '@/lib/media/outbox';
import {
  AWS_REVIEW_IMAGE_PROVIDER,
  buildAwsReviewImagePublicDescriptor,
  publishAwsReviewImageVariants,
  revokeAwsReviewImagePublicVariants,
} from '@/lib/media/providers/aws-review-image';
import {
  getReviewForModerationUpdate,
  rejectVideoReview,
  requestVideoApproval,
  VideoModerationError,
} from '@/lib/media/moderation';
import { enqueueReviewMediaCleanup } from '@/lib/review-deletion';
import {
  IkasInstallationError,
  requireActiveIkasStoreInstallationFence,
} from '@/lib/ikas-installation-lifecycle';
import { reportServerFailure } from '@/lib/server-failures';
import { serializeAdminReviewMedia } from '@/lib/media/admin-review-media';

const REVIEW_NOT_FOUND = 'review-not-found';

async function compensatePublishedAwsReviewImages(manifests: unknown[], context: string) {
  for (const manifest of manifests) {
    try {
      await revokeAwsReviewImagePublicVariants(manifest);
    } catch {
      reportServerFailure('admin_reviews_media_compensation_failed');
    }
  }
}

/**
 * Handle GET requests: Fetch reviews for the authenticated merchant (paginated)
 * Query params: page (default 1), limit (default 20), status (optional filter)
 */
export async function GET(request: Request) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);
    const user = auth.context.principal;

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
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        skip,
        take: limit,
        select: {
          id: true,
          productId: true,
          productName: true,
          rating: true,
          comment: true,
          author: true,
          status: true,
          merchantReply: true,
          hasVideo: true,
          createdAt: true,
          media: {
            orderBy: { position: 'asc' },
            select: {
              id: true,
              resourceType: true,
              provider: true,
              variantStatus: true,
              variantManifest: true,
              visible: true,
              durationMs: true,
              width: true,
              height: true,
              position: true,
              processingStatus: true,
            },
          },
        },
      }),
      prisma.review.count({ where }),
    ]);

    const sanitizedReviews = reviews.map(review => ({
      ...review,
      images: JSON.stringify([]),
      media: review.media.map(serializeAdminReviewMedia),
    }));

    return NextResponse.json({
      data: sanitizedReviews,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch {
    reportServerFailure('admin_reviews_list_failed');
    return NextResponse.json({ error: 'admin_reviews_list_failed' }, { status: 500 });
  }
}

/**
 * Handle DELETE requests: Delete a review permanently
 */
export async function DELETE(request: Request) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);
    const user = auth.context.principal;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }
    try {
      const jobs = await prisma.$transaction(async (tx) => {
        await requireActiveIkasStoreInstallationFence(tx, user.merchantId, user);
        const existing = await getReviewForModerationUpdate(tx, id, user.merchantId);
        if (!existing) throw new Error(REVIEW_NOT_FOUND);

        const cleanupJobs = await enqueueReviewMediaCleanup(tx, [existing], 'review_deleted');

        await tx.review.delete({
          where: { id },
        });
        await applyReviewSummaryRemovals(tx, [existing]);
        return cleanupJobs;
      });
      await Promise.all(jobs.map((job) => dispatchMediaProviderJob(job.id)));
      return NextResponse.json({ message: 'Review deleted' });
    } catch (error) {
      if (error instanceof IkasInstallationError) {
        return ikasAdminAuthorizationLostResponse();
      }
      if (error instanceof Error && error.message !== REVIEW_NOT_FOUND) {
        reportServerFailure('admin_reviews_delete_failed');
        return NextResponse.json({ error: 'admin_reviews_delete_failed' }, { status: 500 });
      }
      return NextResponse.json({ error: 'Review not found or unauthorized' }, { status: 404 });
    }
  } catch {
    reportServerFailure('admin_reviews_delete_failed');
    return NextResponse.json({ error: 'admin_reviews_delete_failed' }, { status: 500 });
  }
}

/**
 * Handle PUT requests: Update status or merchantReply for a review
 */
export async function PUT(request: Request) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);
    const user = auth.context.principal;

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

    const awsImagePublishPreflightIds = new Set<string>();
    const awsImagePublishPreflightManifests: unknown[] = [];
    if (status === 'approved') {
      const reviewForAwsPreflight = await prisma.review.findFirst({
        where: { id, storeId: user.merchantId },
        select: { id: true, hasVideo: true },
      });
      if (reviewForAwsPreflight && !reviewForAwsPreflight.hasVideo) {
        const awsImagesToPublish = await prisma.reviewMedia.findMany({
          where: {
            reviewId: id,
            resourceType: 'image',
            provider: AWS_REVIEW_IMAGE_PROVIDER,
            variantStatus: { not: 'public_ready' },
          },
          select: { id: true, variantManifest: true },
        }) ?? [];
        try {
          for (const item of awsImagesToPublish) {
            await publishAwsReviewImageVariants(item.variantManifest);
            awsImagePublishPreflightIds.add(item.id);
            awsImagePublishPreflightManifests.push(item.variantManifest);
          }
        } catch {
          reportServerFailure('admin_reviews_media_publish_failed');
          if (awsImagePublishPreflightManifests.length > 0) {
            await compensatePublishedAwsReviewImages(awsImagePublishPreflightManifests, 'Admin review update');
          }
          return NextResponse.json({ error: 'Image publication failed.' }, { status: 500 });
        }
      }
    }

    try {
      const result = await prisma.$transaction(async (tx) => {
        await requireActiveIkasStoreInstallationFence(tx, user.merchantId, user);
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

        const awsImageMedia = status !== undefined
          ? (await tx.reviewMedia.findMany({
              where: { reviewId: id, resourceType: 'image', provider: AWS_REVIEW_IMAGE_PROVIDER },
              select: { id: true, variantManifest: true, variantStatus: true },
            }) ?? [])
          : [];
        if (status === 'approved' && awsImageMedia.length > 0) {
          for (const item of awsImageMedia) {
            if (item.variantStatus !== 'public_ready' && !awsImagePublishPreflightIds.has(item.id)) {
              throw new Error('aws_image_publish_preflight_changed');
            }
          }
        }

        const awsPublicUrlsForLegacyMirror = status === 'approved' && awsImageMedia.length > 0
          ? awsImageMedia.map((item) => buildAwsReviewImagePublicDescriptor(item.variantManifest)?.url).filter((url): url is string => Boolean(url))
          : null;
        if (status === 'approved' && awsImageMedia.length > 0 && awsPublicUrlsForLegacyMirror?.length !== awsImageMedia.length) {
          throw new Error('aws_image_public_descriptor_invalid');
        }
        const shouldClearAwsLegacyMirror = (status === 'pending' || status === 'rejected') && awsImageMedia.length > 0;

        const updated = await tx.review.update({
          where: { id },
          data: {
            ...(status !== undefined && { status }),
            ...(merchantReply !== undefined && { merchantReply }),
            ...(awsPublicUrlsForLegacyMirror ? { images: JSON.stringify(awsPublicUrlsForLegacyMirror) } : {}),
            ...(shouldClearAwsLegacyMirror ? { images: JSON.stringify([]) } : {}),
          },
        });
        if (status !== undefined && existing.status !== updated.status) {
          await tx.reviewMedia.updateMany({
            where: { reviewId: id },
            data: { visible: updated.status === 'approved' },
          });
          if (awsImageMedia.length > 0 && updated.status === 'approved') {
            await tx.reviewMedia.updateMany({
              where: { reviewId: id, resourceType: 'image', provider: AWS_REVIEW_IMAGE_PROVIDER },
              data: { variantStatus: 'public_ready', variantPublishedAt: new Date(), variantRevokedAt: null },
            });
          }
          if (awsImageMedia.length > 0 && updated.status !== 'approved') {
            await tx.reviewMedia.updateMany({
              where: { reviewId: id, resourceType: 'image', provider: AWS_REVIEW_IMAGE_PROVIDER },
              data: { variantStatus: 'private_ready', variantRevokedAt: new Date() },
            });
          }
        }
        const jobs = [];
        if (status !== undefined && updated.status !== 'approved' && awsImageMedia.length > 0) {
          for (const item of awsImageMedia) {
            if (item.variantStatus !== 'public_ready') continue;
            jobs.push(await enqueueMediaProviderJob(tx, {
              dedupeKey: `revoke-aws-image-public:${id}:${item.id}:${updated.updatedAt.getTime()}`,
              storeId: existing.storeId,
              reviewId: id,
              mediaId: item.id,
              provider: AWS_REVIEW_IMAGE_PROVIDER,
              action: MEDIA_JOB_ACTIONS.revokeImagePublic,
              resourceType: 'image',
              payload: { reviewId: id, mediaId: item.id, variantManifest: item.variantManifest },
            }));
          }
        }
        await applyReviewSummaryVisibilityChange(tx, existing, updated);
        return { updated, jobs, processing: false as const };
      });
      await Promise.all(result.jobs.map((job) => dispatchMediaProviderJob(job.id)));
      return NextResponse.json({ data: result.updated, processing: result.processing }, { status: result.processing ? 202 : 200 });
    } catch (error) {
      if (awsImagePublishPreflightManifests.length > 0) {
        await compensatePublishedAwsReviewImages(awsImagePublishPreflightManifests, 'Admin review update');
      }
      if (error instanceof IkasInstallationError) {
        return ikasAdminAuthorizationLostResponse();
      }
      if (error instanceof VideoModerationError) {
        return NextResponse.json({ error: 'Video henüz onaylanmaya hazır değil.' }, { status: 409 });
      }
      if (error instanceof Error && error.message !== REVIEW_NOT_FOUND) {
        reportServerFailure('admin_reviews_update_failed');
        return NextResponse.json({ error: 'admin_reviews_update_failed' }, { status: 500 });
      }
      return NextResponse.json({ error: 'Review not found or unauthorized' }, { status: 404 });
    }
  } catch {
    reportServerFailure('admin_reviews_update_failed');
    return NextResponse.json({ error: 'admin_reviews_update_failed' }, { status: 500 });
  }
}
