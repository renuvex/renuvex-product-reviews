import type { Prisma, Review, ReviewMedia } from '@prisma/client';
import { MEDIA_JOB_ACTIONS } from '@/lib/media/constants';
import { enqueueMediaProviderJob } from '@/lib/media/jobs';
import { applyReviewSummaryVisibilityChange } from '@/lib/review-summary';

type TransactionClient = Prisma.TransactionClient;
type VideoMedia = Pick<ReviewMedia, 'id' | 'providerAssetId' | 'processingStatus' | 'sourceAssetId'>;

export async function getReviewForModerationUpdate(tx: TransactionClient, reviewId: string, storeId: string) {
  const rows = await tx.$queryRaw<Review[]>`
    SELECT * FROM "Review"
    WHERE "id" = ${reviewId} AND "storeId" = ${storeId}
    FOR UPDATE
  `;
  return rows[0] ?? null;
}

export class VideoModerationError extends Error {
  constructor(public readonly code: 'video_not_ready' | 'video_provider_id_missing') {
    super(code);
    this.name = 'VideoModerationError';
  }
}

function requireModeratableVideo(media: VideoMedia[]) {
  if (media.some((item) => item.processingStatus !== 'ready')) throw new VideoModerationError('video_not_ready');
  if (media.some((item) => !item.providerAssetId)) throw new VideoModerationError('video_provider_id_missing');
}

export async function requestVideoApproval(
  tx: TransactionClient,
  existing: Review,
  media: VideoMedia[],
  merchantReply: string | null | undefined,
) {
  requireModeratableVideo(media);
  const updated = await tx.review.update({
    where: { id: existing.id },
    data: {
      status: 'pending',
      moderationVersion: { increment: 1 },
      ...(merchantReply !== undefined ? { merchantReply } : {}),
    },
  });
  const moderationVersion = updated.moderationVersion;
  await tx.reviewMedia.updateMany({ where: { reviewId: existing.id, resourceType: 'video' }, data: { visible: false } });
  if (existing.status === 'approved') await applyReviewSummaryVisibilityChange(tx, existing, updated);
  const jobs = [];
  for (const item of media) {
    jobs.push(await enqueueMediaProviderJob(tx, {
      dedupeKey: `publish-stream:${existing.id}:${item.id}:v${moderationVersion}`,
      storeId: existing.storeId,
      reviewId: existing.id,
      mediaId: item.id,
      provider: 'cloudflare_stream',
      action: MEDIA_JOB_ACTIONS.publishStream,
      resourceType: 'video',
      payload: {
        reviewId: existing.id,
        mediaId: item.id,
        streamUid: item.providerAssetId!,
        moderationVersion,
      },
    }));
  }
  return { updated, jobs, processing: true as const };
}

export async function rejectVideoReview(
  tx: TransactionClient,
  existing: Review,
  media: VideoMedia[],
  merchantReply: string | null | undefined,
) {
  requireModeratableVideo(media);
  const updated = await tx.review.update({
    where: { id: existing.id },
    data: {
      status: 'rejected',
      moderationVersion: { increment: 1 },
      ...(merchantReply !== undefined ? { merchantReply } : {}),
    },
  });
  const moderationVersion = updated.moderationVersion;
  await tx.reviewMedia.updateMany({ where: { reviewId: existing.id, resourceType: 'video' }, data: { visible: false } });
  await applyReviewSummaryVisibilityChange(tx, existing, updated);
  const jobs = [];
  for (const item of media) {
    jobs.push(await enqueueMediaProviderJob(tx, {
      dedupeKey: `protect-stream:${existing.id}:${item.id}:v${moderationVersion}`,
      storeId: existing.storeId,
      reviewId: existing.id,
      mediaId: item.id,
      provider: 'cloudflare_stream',
      action: MEDIA_JOB_ACTIONS.protectStream,
      resourceType: 'video',
      payload: {
        reviewId: existing.id,
        mediaId: item.id,
        streamUid: item.providerAssetId!,
        moderationVersion,
      },
    }));
  }
  return { updated, jobs, processing: false as const };
}

export async function enqueueVideoReviewCleanup(tx: TransactionClient, review: Review, media: VideoMedia[]) {
  const jobs = [];
  for (const item of media) {
    jobs.push(await enqueueMediaProviderJob(tx, {
      dedupeKey: `cleanup-review-video:${review.id}:${item.id}`,
      storeId: review.storeId,
      reviewId: review.id,
      mediaId: item.id,
      provider: 'cloudflare_stream',
      action: MEDIA_JOB_ACTIONS.cleanupVideo,
      resourceType: 'video',
      payload: {
        streamUid: item.providerAssetId ?? undefined,
        masterObjectKey: item.sourceAssetId ?? undefined,
      },
    }));
  }
  return jobs;
}
