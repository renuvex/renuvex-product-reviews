import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import {
  assertReviewRequestPublicHost,
  assertReviewRequestSameOrigin,
  clearReviewRequestSessionCookie,
  getReviewRequestSessionCookie,
  ReviewRequestHostError,
} from '@/lib/review-email/public-access';
import { resolveActiveReviewCenterSession, ReviewRequestTokenError, skipReviewCenterItem } from '@/lib/review-email/tokens';
import { reviewCenterRateLimit, secureReviewCenterResponse } from '@/lib/review-email/review-center-http';
import { enqueueMediaProviderJob } from '@/lib/media/outbox';
import { dispatchMediaProviderJob } from '@/lib/media/dispatcher';
import { MEDIA_JOB_ACTIONS, VIDEO_PROVIDER } from '@/lib/media/constants';
import { AWS_REVIEW_IMAGE_PROVIDER } from '@/lib/media/providers/aws-review-image';
import {
  recordReviewEmailBatchMetricContribution,
  recordReviewEmailMetricContribution,
} from '@/lib/review-email/analytics';

export async function POST(request: NextRequest, context: { params: Promise<{ itemId: string }> }) {
  try {
    assertReviewRequestPublicHost(request);
    assertReviewRequestSameOrigin(request);
    if (!isReviewEmailEnabled()) return secureReviewCenterResponse(NextResponse.json({ error: 'not_found' }, { status: 404 }));
    const limited = await reviewCenterRateLimit(request, 'skip', 20);
    if (limited) return limited;
    const session = await resolveActiveReviewCenterSession(prisma, getReviewRequestSessionCookie(request));
    const { itemId } = await context.params;
    if (!/^[0-9a-f-]{36}$/i.test(itemId)) {
      return secureReviewCenterResponse(NextResponse.json({ error: 'review_center_item_not_found' }, { status: 404 }));
    }
    const result = await prisma.$transaction(async (tx) => {
      const skipped = await skipReviewCenterItem(tx, {
        sessionId: session.id,
        tokenId: session.tokenId,
        batchId: session.batchId!,
        requestId: itemId,
      });
      const jobs: Array<{ id: string }> = [];
      if (skipped.state === 'skipped') {
        const item = await tx.reviewRequest.findUnique({
          where: { id: itemId },
          include: { batch: true },
        });
        if (item?.batch) {
          const metricDate = item.batch.firstSentAt ?? new Date();
          if (item.receiptId) {
            await recordReviewEmailMetricContribution(tx, {
              receiptId: item.receiptId,
              dedupeKey: `review-request-receipt:${item.receiptId}:skipped`,
              metricDate,
              kind: 'request',
              templateVersion: item.batch.templateVersionSnapshot,
              locale: item.batch.localeSnapshot,
              metric: 'skippedRequests',
            });
          }
          if (skipped.batchCompleted) {
            await recordReviewEmailBatchMetricContribution(tx, {
              batchId: item.batch.id,
              dedupeKey: `review-email-batch:${item.batch.id}:completed`,
              metricDate,
              kind: 'request',
              templateVersion: item.batch.templateVersionSnapshot,
              locale: item.batch.localeSnapshot,
              metric: 'completedBatches',
            });
          }
        }
        const pendingImages = await tx.pendingReviewImage.findMany({
          where: { reviewRequestId: itemId },
          select: { publicId: true, provider: true, providerAssetId: true, uploadSessionId: true },
        });
        for (const image of pendingImages) {
          if (image.provider !== AWS_REVIEW_IMAGE_PROVIDER || !image.providerAssetId) continue;
          jobs.push(await enqueueMediaProviderJob(tx, {
            dedupeKey: `review-request-skip:${itemId}:${image.publicId}`,
            storeId: session.batch!.storeId,
            uploadSessionId: image.uploadSessionId,
            provider: image.provider,
            action: MEDIA_JOB_ACTIONS.cleanupImage,
            resourceType: 'image',
            payload: {
              families: [{ storeId: session.batch!.storeId, assetId: image.providerAssetId }],
              reason: 'review_request_skipped',
            },
          }));
        }
        const videoSessions = await tx.videoUploadSession.findMany({
          where: { reviewRequestId: itemId },
          select: { id: true, providerUploadId: true, providerAssetId: true, publicId: true },
        });
        for (const video of videoSessions) {
          jobs.push(await enqueueMediaProviderJob(tx, {
            dedupeKey: `review-request-skip:${itemId}:video:${video.id}`,
            storeId: session.batch!.storeId,
            uploadSessionId: video.id,
            provider: VIDEO_PROVIDER,
            action: MEDIA_JOB_ACTIONS.cleanupVideo,
            resourceType: 'video',
            payload: {
              providerUploadId: video.providerUploadId ?? undefined,
              providerAssetId: video.providerAssetId ?? undefined,
              pendingPublicId: video.publicId ?? undefined,
            },
          }));
        }
      }
      return { skipped, jobs };
    });
    await Promise.all(result.jobs.map((job) => dispatchMediaProviderJob(job.id)));
    const status = result.skipped.state === 'already_submitted' ? 409 : 200;
    const response = NextResponse.json({ data: result.skipped }, { status });
    if (result.skipped.batchCompleted) clearReviewRequestSessionCookie(response);
    return secureReviewCenterResponse(response);
  } catch (error) {
    if (error instanceof ReviewRequestHostError) {
      return secureReviewCenterResponse(NextResponse.json({ error: error.code }, { status: error.status }));
    }
    if (error instanceof ReviewRequestTokenError) {
      return secureReviewCenterResponse(NextResponse.json({ error: error.code }, { status: error.status }));
    }
    return secureReviewCenterResponse(NextResponse.json({ error: 'review_center_skip_failed' }, { status: 500 }));
  }
}
