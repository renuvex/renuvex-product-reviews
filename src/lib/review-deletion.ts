import type { Prisma, Review } from '@prisma/client';
import { MEDIA_JOB_ACTIONS, VIDEO_PROVIDER } from '@/lib/media/constants';
import { enqueueMediaProviderJob } from '@/lib/media/outbox';
import { AWS_REVIEW_IMAGE_PROVIDER } from '@/lib/media/providers/aws-review-image';
import { enqueueVideoReviewCleanup } from '@/lib/media/moderation';

export async function enqueueReviewMediaCleanup(
  tx: Prisma.TransactionClient,
  reviews: readonly Review[],
  reason: string,
) {
  const jobs = [];
  for (const review of reviews) {
    const media = await tx.reviewMedia.findMany({
      where: { reviewId: review.id },
      select: { id: true, provider: true, resourceType: true, providerAssetId: true, processingStatus: true, storeId: true },
    });
    const videoMedia = media.filter((item) => item.resourceType === 'video' && item.provider === VIDEO_PROVIDER);
    jobs.push(...await enqueueVideoReviewCleanup(tx, review, videoMedia));

    for (const item of media) {
      if (item.resourceType !== 'image' || item.provider !== AWS_REVIEW_IMAGE_PROVIDER || !item.providerAssetId) continue;
      jobs.push(await enqueueMediaProviderJob(tx, {
        dedupeKey: `cleanup-aws-image:${review.id}:${item.providerAssetId}`,
        storeId: item.storeId,
        reviewId: review.id,
        provider: AWS_REVIEW_IMAGE_PROVIDER,
        action: MEDIA_JOB_ACTIONS.cleanupImage,
        resourceType: 'image',
        payload: {
          families: [{ storeId: item.storeId, assetId: item.providerAssetId }],
          reason,
        },
      }));
    }
  }
  return jobs;
}
