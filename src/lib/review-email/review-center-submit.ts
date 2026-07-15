import type { Prisma, PrismaClient } from '@prisma/client';
import { buildAwsReviewMediaCreateManyData, type AwsPendingReviewImageMediaRow } from '@/lib/review-media';
import { applyReviewSummaryVisibilityChange } from '@/lib/review-summary';
import { MEDIA_JOB_ACTIONS, VIDEO_PROVIDER } from '@/lib/media/constants';
import { dispatchMediaProviderJob } from '@/lib/media/dispatcher';
import { enqueueMediaProviderJob, supersedeSessionLifecycleJobs } from '@/lib/media/outbox';
import {
  AWS_REVIEW_IMAGE_PROVIDER,
  sanitizeAwsReviewImageRefs,
} from '@/lib/media/providers/aws-review-image';
import { hashMediaToken } from '@/lib/media/video-policy';
import {
  recordReviewEmailBatchMetricContribution,
  recordReviewEmailMetricContribution,
} from '@/lib/review-email/analytics';
import { claimReviewCenterItemForSubmission, ReviewRequestTokenError } from '@/lib/review-email/tokens';

type SubmitDb = Pick<PrismaClient, '$transaction'>;

const PROHIBITED_WORDS = [
  'sik', 'orospu', 'got', 'amk', 'bok', 'yarrak', 'oc', 'pic', 'salak', 'aptal',
  'gerizekali', 'mal', 'serefsiz', 'kahpe', 'fuck', 'shit', 'bitch', 'ass', 'damn',
  'crap', 'bastard',
];

type ScopedPendingImage = AwsPendingReviewImageMediaRow & {
  reviewRequestId: string | null;
  reviewRequestSessionId: string | null;
  uploadExpiresAt: Date | null;
};

export class ReviewCenterSubmitError extends Error {
  constructor(public readonly code: string, public readonly status = 400) {
    super(code);
    this.name = 'ReviewCenterSubmitError';
  }
}

function requiredText(value: unknown, max: number): string {
  if (typeof value !== 'string') throw new ReviewCenterSubmitError('invalid_review_payload');
  const text = value.trim();
  if (!text || text.length > max) throw new ReviewCenterSubmitError('invalid_review_payload');
  return text;
}

function optionalText(value: unknown, max: number): string | null {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') throw new ReviewCenterSubmitError('invalid_review_payload');
  const text = value.trim();
  if (!text || text.length > max) throw new ReviewCenterSubmitError('invalid_review_payload');
  return text;
}

function containsProhibitedLanguage(value: string): boolean {
  const normalized = value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ');
  return PROHIBITED_WORDS.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(normalized));
}

function reviewAutoApprovalMode(value: Prisma.JsonValue | null | undefined): string {
  const settings = value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, Prisma.JsonValue>
    : {};
  const mode = settings.autoApprove;
  if (mode === true) return 'all';
  if (mode === false) return 'manual';
  return typeof mode === 'string' ? mode : 'manual';
}

function shouldAutoApprove(mode: string, rating: number): boolean {
  return mode === 'all' || mode === '5stars' && rating === 5 || mode === '4plus' && rating >= 4;
}

function manifestIncludesRequest(value: Prisma.JsonValue | null, requestId: string): boolean {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const items = (value as Record<string, Prisma.JsonValue>).items;
  return Array.isArray(items) && items.some((item) => (
    item !== null && typeof item === 'object' && !Array.isArray(item) &&
    (item as Record<string, Prisma.JsonValue>).itemId === requestId
  ));
}

async function findExistingReviewSubmission(
  tx: Prisma.TransactionClient,
  requestId: string,
  batchId: string,
): Promise<{ state: 'already_submitted'; reviewId: string; batchCompleted: boolean; jobs: [] } | null> {
  const existing = await tx.review.findFirst({
    where: {
      reviewRequestId: requestId,
      reviewRequest: { is: { batchId } },
    },
    select: {
      id: true,
      reviewRequest: { select: { batch: { select: { status: true } } } },
    },
  });
  return existing
    ? {
        state: 'already_submitted',
        reviewId: existing.id,
        batchCompleted: existing.reviewRequest?.batch?.status === 'completed',
        jobs: [],
      }
    : null;
}

export async function submitReviewCenterItem(
  db: SubmitDb,
  input: {
    sessionId: string;
    tokenId: string;
    batchId: string;
    requestId: string;
    rating: unknown;
    title: unknown;
    comment: unknown;
    author: unknown;
    images: unknown;
    videoToken: unknown;
    now?: Date;
  },
): Promise<{ state: 'created' | 'already_submitted'; reviewId: string; batchCompleted: boolean }> {
  const rating = typeof input.rating === 'number' ? input.rating : Number(input.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new ReviewCenterSubmitError('invalid_review_payload');
  const title = optionalText(input.title, 160);
  const comment = requiredText(input.comment, 2000);
  const author = requiredText(input.author, 120);
  if (containsProhibitedLanguage(title ?? '') || containsProhibitedLanguage(comment) || containsProhibitedLanguage(author)) {
    throw new ReviewCenterSubmitError('review_contains_prohibited_language');
  }
  const imageRefs = sanitizeAwsReviewImageRefs(input.images);
  if (!imageRefs.ok) throw new ReviewCenterSubmitError('invalid_review_image_reference');
  const videoToken = typeof input.videoToken === 'string' ? input.videoToken.trim() : '';
  if (videoToken && imageRefs.refs.length > 0) throw new ReviewCenterSubmitError('mixed_review_media_not_allowed');
  const now = input.now ?? new Date();

  const result = await db.$transaction(async (tx) => {
    const existing = await findExistingReviewSubmission(tx, input.requestId, input.batchId);
    if (existing) return existing;

    const request = await tx.reviewRequest.findFirst({
      where: { id: input.requestId, batchId: input.batchId },
      include: { batch: true, orderLineSnapshot: true },
    });
    if (!request?.batch) throw new ReviewRequestTokenError('review_center_item_not_found', undefined, 404);
    let claimed: { batchCompleted: boolean };
    try {
      claimed = await claimReviewCenterItemForSubmission(tx, {
        sessionId: input.sessionId,
        tokenId: input.tokenId,
        batchId: input.batchId,
        requestId: input.requestId,
        now,
      });
    } catch (error) {
      if (error instanceof ReviewRequestTokenError && error.code === 'review_center_item_not_submittable') {
        const committed = await findExistingReviewSubmission(tx, input.requestId, input.batchId);
        if (committed) return committed;
        const terminal = await tx.reviewRequest.findFirst({
          where: { id: input.requestId, batchId: input.batchId },
          select: { status: true },
        });
        if (terminal?.status === 'skipped') throw new ReviewCenterSubmitError('item_skipped', 409);
      }
      throw error;
    }
    const [product, widget] = await Promise.all([
      tx.productSnapshot.findUnique({
        where: { storeId_productId: { storeId: request.storeId, productId: request.productId } },
        select: { slug: true, name: true },
      }),
      tx.widgetSettings.findUnique({
        where: { storeId_widgetId: { storeId: request.storeId, widgetId: 'reviews' } },
        select: { settings: true },
      }),
    ]);
    if (!product) throw new ReviewCenterSubmitError('review_product_unavailable', 409);

    const pendingRows = imageRefs.refs.length
      ? await tx.pendingReviewImage.findMany({
          where: {
            storeId: request.storeId,
            productId: request.productId,
            provider: AWS_REVIEW_IMAGE_PROVIDER,
            uploadSessionId: { in: imageRefs.refs.map((ref) => ref.uploadSessionId) },
            reviewRequestId: request.id,
            reviewRequestSessionId: input.sessionId,
          },
        })
      : [];
    const bySession = new Map(pendingRows.map((row) => [row.uploadSessionId, row as ScopedPendingImage]));
    const images = imageRefs.refs.map((ref) => {
      const row = bySession.get(ref.uploadSessionId);
      if (
        !row || row.providerAssetId !== ref.assetId || row.sourceAssetId !== ref.objectKey ||
        row.mimeType !== ref.contentType || row.bytes !== ref.bytes ||
        row.sourceChecksumAlgorithm !== 'SHA256' || row.sourceChecksumSha256 !== ref.checksumSha256 ||
        row.variantStatus !== 'private_ready' || !row.variantManifest ||
        row.reviewRequestId !== request.id || row.reviewRequestSessionId !== input.sessionId ||
        (row.uploadExpiresAt !== null && row.uploadExpiresAt <= now)
      ) throw new ReviewCenterSubmitError('invalid_review_image_reference');
      return row;
    });

    const videoSession = videoToken
      ? await tx.videoUploadSession.findUnique({ where: { tokenHash: hashMediaToken(videoToken) } })
      : null;
    if (videoToken && (
      !videoSession || videoSession.storeId !== request.storeId || videoSession.productId !== request.productId ||
      videoSession.reviewRequestId !== request.id || videoSession.reviewRequestSessionId !== input.sessionId ||
      videoSession.status !== 'ready' || videoSession.expiresAt <= now ||
      !videoSession.publicId || videoSession.provider !== VIDEO_PROVIDER || !videoSession.providerAssetId ||
      !videoSession.playbackUrl || !videoSession.posterUrl || !videoSession.durationMs
    )) throw new ReviewCenterSubmitError('invalid_review_video_reference');

    const approvalMode = reviewAutoApprovalMode(widget?.settings);
    const status = videoSession ? 'pending' : shouldAutoApprove(approvalMode, rating) ? 'approved' : 'pending';
    if (videoSession) {
      const consumed = await tx.videoUploadSession.updateMany({
        where: { id: videoSession.id, status: 'ready', reviewRequestId: request.id, reviewRequestSessionId: input.sessionId },
        data: { status: 'consumed', consumedAt: now },
      });
      if (consumed.count !== 1) throw new ReviewCenterSubmitError('invalid_review_video_reference');
      await supersedeSessionLifecycleJobs(tx, videoSession.id, [MEDIA_JOB_ACTIONS.expireUploadSession, MEDIA_JOB_ACTIONS.reconcileVideo]);
    }

    const review = await tx.review.create({
      data: {
        storeId: request.storeId,
        productId: request.productId,
        slug: product.slug ?? '',
        productName: product.name ?? request.orderLineSnapshot.productName,
        rating,
        title,
        comment,
        author,
        email: '',
        images: null,
        hasImages: images.length > 0,
        hasVideo: Boolean(videoSession),
        status,
        reviewRequestId: request.id,
        reviewRequestReceiptId: request.receiptId,
        verifiedBuyer: true,
        verifiedAt: now,
        verificationSource: 'review_request_email',
      },
    });

    const jobs: Array<{ id: string }> = [];
    const mediaRows = buildAwsReviewMediaCreateManyData({
      rows: images,
      storeId: request.storeId,
      productId: request.productId,
      reviewId: review.id,
      visible: false,
    });
    for (const [index, mediaData] of mediaRows.entries()) {
      const media = await tx.reviewMedia.create({ data: mediaData });
      if (status === 'approved') {
        jobs.push(await enqueueMediaProviderJob(tx, {
          dedupeKey: `publish-review-center-image:${review.id}:${media.id}`,
          storeId: request.storeId,
          reviewId: review.id,
          mediaId: media.id,
          provider: AWS_REVIEW_IMAGE_PROVIDER,
          action: MEDIA_JOB_ACTIONS.publishImage,
          resourceType: 'image',
          payload: {
            reviewId: review.id,
            mediaId: media.id,
            variantManifest: images[index]!.variantManifest as Prisma.InputJsonValue,
          },
        }));
      }
    }

    if (videoSession) {
      const pendingVideo = await tx.pendingReviewImage.findUnique({
        where: { publicId: videoSession.publicId! },
        select: { metadataSource: true, metadataStatus: true, metadataFetchedAt: true },
      });
      await tx.reviewMedia.create({
        data: {
          reviewId: review.id,
          storeId: request.storeId,
          productId: request.productId,
          url: videoSession.playbackUrl!,
          publicId: videoSession.publicId!,
          resourceType: 'video',
          provider: VIDEO_PROVIDER,
          providerAssetId: videoSession.providerAssetId,
          posterUrl: videoSession.posterUrl,
          durationMs: videoSession.durationMs,
          processingStatus: 'ready',
          mimeType: videoSession.mimeType,
          bytes: videoSession.bytes,
          metadataSource: pendingVideo?.metadataSource ?? 'mux_webhook',
          metadataStatus: pendingVideo?.metadataStatus ?? 'complete',
          metadataFetchedAt: pendingVideo?.metadataFetchedAt ?? now,
          position: 0,
          visible: false,
        },
      });
      await tx.pendingReviewImage.deleteMany({
        where: { uploadSessionId: videoSession.id, reviewRequestId: request.id, reviewRequestSessionId: input.sessionId },
      });
    }
    if (images.length > 0) {
      await tx.pendingReviewImage.deleteMany({
        where: {
          publicId: { in: images.map((image) => image.publicId) },
          reviewRequestId: request.id,
          reviewRequestSessionId: input.sessionId,
        },
      });
    }
    await applyReviewSummaryVisibilityChange(tx, null, review);

    const sourceToken = await tx.reviewRequestToken.findUnique({
      where: { id: input.tokenId },
      include: { attempt: { include: { job: true } } },
    });
    const sourceAttempt = sourceToken?.attempt ?? null;
    const includedInSourceAttempt = sourceAttempt ? manifestIncludesRequest(sourceAttempt.contentManifest, request.id) : false;
    const cohortAt = request.batch.firstSentAt ?? sourceAttempt?.acceptedAt ?? sourceAttempt?.sendCommittedAt ?? now;
    if (request.receiptId) {
      await recordReviewEmailMetricContribution(tx, {
        receiptId: request.receiptId,
        dedupeKey: `review-request-receipt:${request.receiptId}:reviewed`,
        metricDate: cohortAt,
        kind: 'request',
        templateVersion: request.batch.templateVersionSnapshot,
        locale: request.batch.localeSnapshot,
        metric: 'reviewedRequests',
      });
      if (includedInSourceAttempt && sourceAttempt?.job.kind === 'reminder') {
        await recordReviewEmailMetricContribution(tx, {
          receiptId: request.receiptId,
          dedupeKey: `review-request-receipt:${request.receiptId}:reviewed-via-reminder`,
          metricDate: cohortAt,
          kind: 'reminder',
          templateVersion: sourceAttempt.templateVersion,
          locale: sourceAttempt.locale,
          metric: 'reviewsViaReminder',
        });
      }
    }
    await recordReviewEmailBatchMetricContribution(tx, {
      batchId: request.batch.id,
      dedupeKey: `review-email-batch:${request.batch.id}:has-review`,
      metricDate: cohortAt,
      kind: 'request',
      templateVersion: request.batch.templateVersionSnapshot,
      locale: request.batch.localeSnapshot,
      metric: 'batchesWithReview',
    });
    if (claimed.batchCompleted) {
      await recordReviewEmailBatchMetricContribution(tx, {
        batchId: request.batch.id,
        dedupeKey: `review-email-batch:${request.batch.id}:completed`,
        metricDate: cohortAt,
        kind: 'request',
        templateVersion: request.batch.templateVersionSnapshot,
        locale: request.batch.localeSnapshot,
        metric: 'completedBatches',
      });
    }
    return { state: 'created' as const, reviewId: review.id, batchCompleted: claimed.batchCompleted, jobs };
  });

  await Promise.all(result.jobs.map((job) => dispatchMediaProviderJob(job.id)));
  return { state: result.state, reviewId: result.reviewId, batchCompleted: result.batchCompleted };
}
