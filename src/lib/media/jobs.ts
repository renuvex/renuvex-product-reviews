import type { Prisma } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import {
  MEDIA_JOB_ACTIONS,
  MEDIA_JOB_STALE_LOCK_MS,
  VIDEO_ASSET_RECONCILE_OFFSETS_MS,
  VIDEO_PROVIDER,
} from '@/lib/media/constants';
import {
  buildMuxPlaybackUrl,
  buildMuxPosterUrl,
  cancelMuxUpload,
  createMuxPlaybackId,
  deleteMuxAsset,
  deleteMuxPlaybackId,
  getMuxAsset,
  getMuxUpload,
  isMuxNotFound,
  listMuxPlaybackIds,
  MuxProviderError,
  type MuxPlaybackId,
} from '@/lib/media/providers/mux';
import { deleteCloudinaryReviewImages } from '@/lib/media/providers/cloudinary-image';
import {
  AWS_REVIEW_IMAGE_PROVIDER,
  deleteAwsReviewImageFamily,
  publishAwsReviewImageVariants,
  revokeAwsReviewImagePublicVariants,
} from '@/lib/media/providers/aws-review-image';
import { applyReviewSummaryVisibilityChange } from '@/lib/review-summary';
import { getVideoSessionForUpdate, releaseVideoQuota } from '@/lib/media/sessions';
import { matchesVideoModerationIntent } from '@/lib/media/moderation-intent';
import { applyMuxAssetState } from '@/lib/media/video-processing';
import { enqueueMediaProviderJob } from '@/lib/media/outbox';
import { dispatchMediaProviderJob } from '@/lib/media/dispatcher';
import { failSessionAndQueueCleanup } from '@/lib/media/lifecycle';

export { enqueueMediaProviderJob } from '@/lib/media/outbox';
export { dispatchMediaProviderJob } from '@/lib/media/dispatcher';
export {
  cancelSessionAndQueueCleanup,
  failSessionAndQueueCleanup,
} from '@/lib/media/lifecycle';

const resolveVideoAssetPayload = z.object({
  sessionId: z.string().uuid(),
  providerUploadId: z.string().min(1).max(256),
});
const moderationPayload = z.object({
  reviewId: z.string().uuid(),
  mediaId: z.string().uuid(),
  providerAssetId: z.string().min(1).max(256),
  moderationVersion: z.number().int().positive(),
});
const cleanupPayload = z.object({
  sessionId: z.string().uuid().optional(),
  providerUploadId: z.string().max(256).optional(),
  providerAssetId: z.string().max(256).optional(),
  pendingPublicId: z.string().max(512).optional(),
});
const cleanupImagePayload = z.object({
  publicIds: z.array(z.string().min(1).max(512)).min(1).max(100),
});
const cleanupAwsImagePayload = z.object({
  families: z.array(z.object({
    storeId: z.string().min(1).max(128),
    assetId: z.string().uuid(),
  })).min(1).max(50),
  reason: z.string().max(128).optional(),
});
const awsImageVariantMutationPayload = z.object({
  reviewId: z.string().uuid().optional(),
  mediaId: z.string().uuid().optional(),
  variantManifest: z.record(z.string(), z.unknown()),
});
const reconcileVideoPayload = z.object({
  sessionId: z.string().uuid(),
  providerUploadId: z.string().min(1).max(256).optional(),
  providerAssetId: z.string().min(1).max(256).optional(),
  startedAt: z.string().datetime(),
  checkIndex: z.number().int().min(0).max(VIDEO_ASSET_RECONCILE_OFFSETS_MS.length - 1),
  outcome: z.string().max(128).optional(),
  lastProviderErrorCode: z.string().max(128).optional(),
});
const expireUploadSessionPayload = z.object({
  sessionId: z.string().uuid(),
  expiresAt: z.string().datetime(),
});

type MediaJobLease = { key: string; ownerJobId: string; leaseVersion: number };
type MediaJobResult =
  | { status: 'succeeded'; payload?: Prisma.InputJsonValue }
  | { status: 'superseded'; payload?: Prisma.InputJsonValue }
  | { status: 'deferred'; delayMs: number; payload?: Prisma.InputJsonValue };

function mediaJobSerialKey(job: { action: string; payload: Prisma.JsonValue }): string | null {
  if (!job.payload || typeof job.payload !== 'object' || Array.isArray(job.payload)) return null;
  const payload = job.payload as Record<string, Prisma.JsonValue>;
  const sessionId = typeof payload.sessionId === 'string' ? payload.sessionId : '';
  if (sessionId && job.action !== MEDIA_JOB_ACTIONS.cleanupImage) return `video-session:${sessionId}`;
  const providerAssetId = typeof payload.providerAssetId === 'string' ? payload.providerAssetId : '';
  if (providerAssetId) return `mux-asset:${providerAssetId}`;
  const mediaId = typeof payload.mediaId === 'string' ? payload.mediaId : '';
  if (
    mediaId &&
    (job.action === MEDIA_JOB_ACTIONS.publishImage || job.action === MEDIA_JOB_ACTIONS.revokeImagePublic)
  ) {
    return `image-media:${mediaId}`;
  }
  const families = Array.isArray(payload.families) ? payload.families : null;
  if (families && families.length === 1) {
    const family = families[0] as Record<string, Prisma.JsonValue>;
    if (typeof family.storeId === 'string' && typeof family.assetId === 'string') {
      return `image-family:${family.storeId}:${family.assetId}`;
    }
  }
  const providerUploadId = typeof payload.providerUploadId === 'string' ? payload.providerUploadId : '';
  if (providerUploadId) return `mux-upload:${providerUploadId}`;
  return null;
}

async function acquireMediaJobLease(key: string, ownerJobId: string): Promise<MediaJobLease | null> {
  const lockedUntil = new Date(Date.now() + MEDIA_JOB_STALE_LOCK_MS);
  const rows = await prisma.$queryRaw<Array<{ leaseVersion: number }>>`
    INSERT INTO "MediaProviderLease" ("key", "ownerJobId", "leaseVersion", "lockedUntil", "createdAt", "updatedAt")
    VALUES (${key}, ${ownerJobId}, 1, ${lockedUntil}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT ("key") DO UPDATE SET
      "ownerJobId" = EXCLUDED."ownerJobId",
      "leaseVersion" = "MediaProviderLease"."leaseVersion" + 1,
      "lockedUntil" = EXCLUDED."lockedUntil",
      "updatedAt" = CURRENT_TIMESTAMP
    WHERE "MediaProviderLease"."lockedUntil" < CURRENT_TIMESTAMP
       OR "MediaProviderLease"."ownerJobId" = ${ownerJobId}
    RETURNING "leaseVersion"
  `;
  return rows[0] ? { key, ownerJobId, leaseVersion: rows[0].leaseVersion } : null;
}

async function mediaJobLeaseIsCurrent(lease: MediaJobLease): Promise<boolean> {
  const rows = await prisma.$queryRaw<Array<{ owned: boolean }>>`
    SELECT EXISTS (
      SELECT 1 FROM "MediaProviderLease"
      WHERE "key" = ${lease.key}
        AND "ownerJobId" = ${lease.ownerJobId}
        AND "leaseVersion" = ${lease.leaseVersion}
        AND "lockedUntil" > CURRENT_TIMESTAMP
    ) AS "owned"
  `;
  return rows[0]?.owned === true;
}

async function releaseMediaJobLease(lease: MediaJobLease) {
  await prisma.$executeRaw`
    DELETE FROM "MediaProviderLease"
    WHERE "key" = ${lease.key}
      AND "ownerJobId" = ${lease.ownerJobId}
      AND "leaseVersion" = ${lease.leaseVersion}
  `;
}

async function requireCurrentLease(lease: MediaJobLease | null) {
  if (lease && !(await mediaJobLeaseIsCurrent(lease))) throw new Error('media_provider_lease_lost');
}

function providerErrorCode(error: unknown): string {
  if (error instanceof MuxProviderError) return error.code;
  return error instanceof Error ? error.name || error.message : 'mux_provider_unavailable';
}

function publicPlaybackIds(playbackIds: MuxPlaybackId[]): MuxPlaybackId[] {
  return playbackIds.filter((playbackId) => playbackId.policy === 'public' && playbackId.id);
}

async function ensureMuxPublicPlaybackId(assetId: string): Promise<MuxPlaybackId> {
  const existing = publicPlaybackIds(await listMuxPlaybackIds(assetId)).sort((a, b) => a.id.localeCompare(b.id));
  if (existing[0]) {
    await Promise.all(existing.slice(1).map((playbackId) => deleteMuxPlaybackId(assetId, playbackId.id)));
    return existing[0];
  }
  const created = await createMuxPlaybackId(assetId, 'public');
  const converged = publicPlaybackIds(await listMuxPlaybackIds(assetId)).sort((a, b) => a.id.localeCompare(b.id));
  await Promise.all(converged.slice(1).map((playbackId) => deleteMuxPlaybackId(assetId, playbackId.id)));
  return converged[0] ?? created;
}

async function deleteMuxPublicPlaybackIds(assetId: string) {
  const playbackIds = publicPlaybackIds(await listMuxPlaybackIds(assetId));
  await Promise.all(playbackIds.map((playbackId) => deleteMuxPlaybackId(assetId, playbackId.id)));
}

async function convergeMuxPublication(payload: z.infer<typeof moderationPayload>) {
  const media = await prisma.reviewMedia.findUnique({
    where: { id: payload.mediaId },
    select: {
      providerAssetId: true,
      processingStatus: true,
      visible: true,
      review: { select: { status: true } },
    },
  });
  if (!media || media.providerAssetId !== payload.providerAssetId) {
    await deleteMuxAsset(payload.providerAssetId);
    return 'deleted' as const;
  }
  const shouldBePublic = media.processingStatus === 'ready' && media.visible && media.review.status === 'approved';
  if (shouldBePublic) {
    await ensureMuxPublicPlaybackId(payload.providerAssetId);
    return 'public' as const;
  }
  await deleteMuxPublicPlaybackIds(payload.providerAssetId);
  return 'protected' as const;
}

async function ensureMuxReconcileJob(session: {
  id: string;
  storeId: string;
  providerUploadId?: string | null;
  providerAssetId?: string | null;
}) {
  const startedAt = new Date();
  const availableAt = new Date(startedAt.getTime() + VIDEO_ASSET_RECONCILE_OFFSETS_MS[0]);
  return prisma.$transaction((tx) => enqueueMediaProviderJob(tx, {
    dedupeKey: `reconcile-video:${session.id}`,
    storeId: session.storeId,
    uploadSessionId: session.id,
    provider: VIDEO_PROVIDER,
    action: MEDIA_JOB_ACTIONS.reconcileVideo,
    resourceType: 'video',
    availableAt,
    maxAttempts: 16,
    payload: {
      sessionId: session.id,
      ...(session.providerUploadId ? { providerUploadId: session.providerUploadId } : {}),
      ...(session.providerAssetId ? { providerAssetId: session.providerAssetId } : {}),
      startedAt: startedAt.toISOString(),
      checkIndex: 0,
    },
  }));
}

async function dispatchMuxReconcileJob(job: {
  id: string;
  status: string;
  availableAt: Date;
}) {
  if (job.status !== 'pending' && job.status !== 'failed') return;
  const dispatched = await dispatchMediaProviderJob(
    job.id,
    Math.max(1, Math.ceil((job.availableAt.getTime() - Date.now()) / 1000)),
  );
  if (!dispatched) throw new Error('mux_reconcile_dispatch_failed');
}

async function updateSessionWithMuxAsset(input: {
  sessionId: string;
  storeId: string;
  productId: string;
  mimeType: string;
  bytes: number;
  providerUploadId: string;
  providerAssetId: string;
}) {
  const publicId = `${VIDEO_PROVIDER}:${input.providerAssetId}`;
  const claimed = await prisma.videoUploadSession.updateMany({
    where: {
      id: input.sessionId,
      status: { in: ['uploading', 'completing', 'uploaded', 'processing'] },
      OR: [{ providerAssetId: null }, { providerAssetId: input.providerAssetId }],
    },
    data: {
      status: 'processing',
      provider: VIDEO_PROVIDER,
      providerUploadId: input.providerUploadId,
      providerAssetId: input.providerAssetId,
      publicId,
      errorCode: null,
    },
  });
  if (claimed.count === 0) return false;
  await prisma.pendingReviewImage.upsert({
    where: { publicId },
    create: {
      publicId,
      storeId: input.storeId,
      productId: input.productId,
      uploadSessionId: input.sessionId,
      url: null,
      resourceType: 'video',
      provider: VIDEO_PROVIDER,
      providerAssetId: input.providerAssetId,
      posterUrl: null,
      processingStatus: 'pending',
      sourceProvider: null,
      sourceAssetId: null,
      mimeType: input.mimeType,
      bytes: input.bytes,
      metadataSource: 'mux_upload',
      metadataStatus: 'pending',
    },
    update: {
      provider: VIDEO_PROVIDER,
      providerAssetId: input.providerAssetId,
      processingStatus: 'pending',
      sourceProvider: null,
      sourceAssetId: null,
      metadataSource: 'mux_upload',
      metadataStatus: 'pending',
    },
  });
  return true;
}

async function resolveMuxVideoAsset(payload: z.infer<typeof resolveVideoAssetPayload>): Promise<MediaJobResult> {
  const session = await prisma.videoUploadSession.findUnique({ where: { id: payload.sessionId } });
  if (!session || ['failed', 'aborted', 'consumed', 'ready'].includes(session.status)) return { status: 'superseded' };
  const providerUploadId = session.providerUploadId ?? payload.providerUploadId;
  if (!providerUploadId || providerUploadId !== payload.providerUploadId) return { status: 'superseded' };

  const upload = await getMuxUpload(providerUploadId);
  if (upload.status === 'errored' || upload.status === 'cancelled' || upload.status === 'timed_out') {
    await failSessionAndQueueCleanup(session.id, `mux_upload_${upload.status}`, { providerUploadId });
    return { status: 'succeeded', payload: { ...payload, outcome: upload.status } };
  }
  if (!upload.asset_id) {
    return { status: 'deferred', delayMs: 5_000, payload };
  }

  const claimed = await updateSessionWithMuxAsset({
    sessionId: session.id,
    storeId: session.storeId,
    productId: session.productId,
    mimeType: session.mimeType,
    bytes: session.bytes,
    providerUploadId,
    providerAssetId: upload.asset_id,
  });
  if (!claimed) return { status: 'superseded' };

  const current = await prisma.videoUploadSession.findUnique({ where: { id: session.id } });
  if (!current) return { status: 'superseded' };
  const reconcileJob = await ensureMuxReconcileJob({
    id: current.id,
    storeId: current.storeId,
    providerUploadId,
    providerAssetId: upload.asset_id,
  });

  try {
    const asset = await getMuxAsset(upload.asset_id);
    const result = await applyMuxAssetState(current, asset, 'mux_complete_poll');
    if (result.ok && (result.status === 'ready' || result.status === 'consumed')) {
      return { status: 'succeeded', payload: { ...payload, providerAssetId: upload.asset_id, outcome: result.status } };
    }
    if (!result.ok) return { status: 'succeeded', payload: { ...payload, providerAssetId: upload.asset_id, outcome: result.code } };
  } catch (error) {
    if (!isMuxNotFound(error)) throw error;
  }

  await dispatchMuxReconcileJob(reconcileJob);
  return { status: 'succeeded', payload: { ...payload, providerAssetId: upload.asset_id, outcome: 'processing' } };
}

function nextMuxReconcileResult(
  payload: z.infer<typeof reconcileVideoPayload>,
  providerErrorCode?: string,
): MediaJobResult {
  const nextIndex = payload.checkIndex + 1;
  if (nextIndex >= VIDEO_ASSET_RECONCILE_OFFSETS_MS.length) {
    return {
      status: 'succeeded',
      payload: {
        ...payload,
        outcome: 'mux_processing_delayed',
        ...(providerErrorCode ? { lastProviderErrorCode: providerErrorCode.slice(0, 128) } : {}),
      },
    };
  }
  const nextAt = new Date(payload.startedAt).getTime() + VIDEO_ASSET_RECONCILE_OFFSETS_MS[nextIndex];
  return {
    status: 'deferred',
    delayMs: Math.max(1_000, nextAt - Date.now()),
    payload: {
      ...payload,
      checkIndex: nextIndex,
      ...(providerErrorCode ? { lastProviderErrorCode: providerErrorCode.slice(0, 128) } : {}),
    },
  };
}

async function reconcileMuxVideo(payload: z.infer<typeof reconcileVideoPayload>): Promise<MediaJobResult> {
  let session = await prisma.videoUploadSession.findUnique({ where: { id: payload.sessionId } });
  if (!session || ['ready', 'failed', 'aborted', 'consumed'].includes(session.status)) {
    return { status: 'superseded' };
  }

  let providerAssetId = session.providerAssetId ?? payload.providerAssetId ?? null;
  const providerUploadId = session.providerUploadId ?? payload.providerUploadId ?? null;
  if (!providerAssetId && providerUploadId) {
    try {
      const upload = await getMuxUpload(providerUploadId);
      if (upload.status === 'errored' || upload.status === 'cancelled' || upload.status === 'timed_out') {
        await failSessionAndQueueCleanup(session.id, `mux_upload_${upload.status}`, { providerUploadId });
        return { status: 'succeeded', payload: { ...payload, outcome: upload.status } };
      }
      providerAssetId = upload.asset_id ?? null;
      if (providerAssetId) {
        await updateSessionWithMuxAsset({
          sessionId: session.id,
          storeId: session.storeId,
          productId: session.productId,
          mimeType: session.mimeType,
          bytes: session.bytes,
          providerUploadId,
          providerAssetId,
        });
        session = await prisma.videoUploadSession.findUnique({ where: { id: session.id } });
        if (!session) return { status: 'superseded' };
      }
    } catch (error) {
      const code = providerErrorCode(error);
      Sentry.captureException(error, {
        tags: { source: 'media-job', provider: VIDEO_PROVIDER, action: MEDIA_JOB_ACTIONS.reconcileVideo, status: 'retrying' },
        extra: { sessionId: payload.sessionId, checkIndex: payload.checkIndex },
      });
      return nextMuxReconcileResult(payload, code);
    }
  }
  if (!providerAssetId) return nextMuxReconcileResult(payload);

  let asset;
  try {
    asset = await getMuxAsset(providerAssetId);
  } catch (error) {
    const code = providerErrorCode(error);
    if (payload.checkIndex === 0 || payload.checkIndex === VIDEO_ASSET_RECONCILE_OFFSETS_MS.length - 1) {
      Sentry.captureException(error, {
        tags: {
          source: 'media-job',
          provider: VIDEO_PROVIDER,
          action: MEDIA_JOB_ACTIONS.reconcileVideo,
          status: payload.checkIndex === VIDEO_ASSET_RECONCILE_OFFSETS_MS.length - 1 ? 'delayed' : 'retrying',
        },
        extra: { sessionId: payload.sessionId, checkIndex: payload.checkIndex },
      });
    }
    return nextMuxReconcileResult(payload, code);
  }

  const result = await applyMuxAssetState(session, asset, 'mux_reconcile');
  if (!result.ok || result.status === 'ready' || result.status === 'consumed') {
    return {
      status: 'succeeded',
      payload: {
        ...payload,
        providerAssetId,
        outcome: result.ok ? result.status : result.code,
      },
    };
  }
  return nextMuxReconcileResult({ ...payload, providerAssetId });
}

async function expireUploadSession(payload: z.infer<typeof expireUploadSessionPayload>): Promise<MediaJobResult> {
  const session = await prisma.videoUploadSession.findUnique({ where: { id: payload.sessionId } });
  if (!session || ['failed', 'aborted', 'consumed'].includes(session.status)) return { status: 'superseded' };

  const expiresAt = session.expiresAt.getTime();
  if (expiresAt > Date.now()) {
    return {
      status: 'deferred',
      delayMs: Math.max(1_000, expiresAt - Date.now()),
      payload: { sessionId: session.id, expiresAt: session.expiresAt.toISOString() },
    };
  }

  await failSessionAndQueueCleanup(session.id, 'upload_session_expired');
  return { status: 'succeeded' };
}

async function publishVideo(payload: z.infer<typeof moderationPayload>, lease: MediaJobLease | null): Promise<MediaJobResult> {
  const candidate = await prisma.review.findUnique({ where: { id: payload.reviewId } });
  if (!matchesVideoModerationIntent(candidate, 'pending', payload.moderationVersion)) {
    await convergeMuxPublication(payload);
    return { status: 'superseded' };
  }
  const publicPlaybackId = await ensureMuxPublicPlaybackId(payload.providerAssetId);
  await requireCurrentLease(lease);
  const publicPlaybackUrl = buildMuxPlaybackUrl(publicPlaybackId.id);
  const publicPosterUrl = buildMuxPosterUrl(publicPlaybackId.id);
  const applied = await prisma.$transaction(async (tx) => {
    const existing = await tx.review.findUnique({ where: { id: payload.reviewId } });
    if (!matchesVideoModerationIntent(existing, 'pending', payload.moderationVersion)) return false;
    const updated = await tx.review.update({ where: { id: payload.reviewId }, data: { status: 'approved' } });
    await tx.reviewMedia.updateMany({
      where: {
        id: payload.mediaId,
        reviewId: payload.reviewId,
        provider: VIDEO_PROVIDER,
        providerAssetId: payload.providerAssetId,
        processingStatus: 'ready',
      },
      data: {
        visible: true,
        url: publicPlaybackUrl,
        posterUrl: publicPosterUrl,
      },
    });
    await tx.videoUploadSession.updateMany({
      where: { provider: VIDEO_PROVIDER, providerAssetId: payload.providerAssetId },
      data: {
        publicPlaybackId: publicPlaybackId.id,
        playbackUrl: publicPlaybackUrl,
        posterUrl: publicPosterUrl,
      },
    });
    await applyReviewSummaryVisibilityChange(tx, existing, updated);
    return true;
  });
  if (!applied) {
    await convergeMuxPublication(payload);
    return { status: 'superseded' };
  }
  return { status: 'succeeded' };
}

async function protectVideo(payload: z.infer<typeof moderationPayload>, lease: MediaJobLease | null): Promise<MediaJobResult> {
  const candidate = await prisma.review.findUnique({ where: { id: payload.reviewId } });
  if (!matchesVideoModerationIntent(candidate, 'rejected', payload.moderationVersion)) {
    await convergeMuxPublication(payload);
    return { status: 'superseded' };
  }
  await deleteMuxPublicPlaybackIds(payload.providerAssetId);
  await requireCurrentLease(lease);
  const current = await prisma.review.findUnique({ where: { id: payload.reviewId } });
  if (!matchesVideoModerationIntent(current, 'rejected', payload.moderationVersion)) {
    await convergeMuxPublication(payload);
    return { status: 'superseded' };
  }
  await prisma.$transaction(async (tx) => {
    await tx.reviewMedia.updateMany({
      where: { id: payload.mediaId, reviewId: payload.reviewId, provider: VIDEO_PROVIDER, providerAssetId: payload.providerAssetId },
      data: { visible: false },
    });
    await tx.videoUploadSession.updateMany({
      where: { provider: VIDEO_PROVIDER, providerAssetId: payload.providerAssetId },
      data: { publicPlaybackId: null },
    });
  });
  return { status: 'succeeded' };
}

async function cleanupVideo(payload: z.infer<typeof cleanupPayload>): Promise<MediaJobResult> {
  const providerAssetIds = new Set<string>();
  if (payload.providerAssetId) providerAssetIds.add(payload.providerAssetId);

  if (payload.providerUploadId) {
    let shouldCancelUpload = false;
    try {
      const upload = await getMuxUpload(payload.providerUploadId);
      if (upload.asset_id) providerAssetIds.add(upload.asset_id);
      else if (upload.status === 'waiting') shouldCancelUpload = true;
    } catch (error) {
      if (!isMuxNotFound(error) && providerAssetIds.size === 0) throw error;
    }
    if (shouldCancelUpload) {
      try {
        await cancelMuxUpload(payload.providerUploadId);
      } catch (error) {
        if (providerAssetIds.size === 0) throw error;
      }
    }
  }

  await Promise.all([...providerAssetIds].map((providerAssetId) => deleteMuxAsset(providerAssetId)));
  await prisma.$transaction(async (tx) => {
    if (payload.pendingPublicId) await tx.pendingReviewImage.deleteMany({ where: { publicId: payload.pendingPublicId } });
    if (payload.sessionId) {
      const session = await getVideoSessionForUpdate(tx, payload.sessionId);
      if (session && session.status !== 'consumed') {
        await releaseVideoQuota(tx, session);
        await tx.videoUploadSession.update({ where: { id: session.id }, data: { status: 'aborted', errorCode: null } });
      }
    }
  });
  const recoveredProviderAssetId = [...providerAssetIds][0];
  return recoveredProviderAssetId && recoveredProviderAssetId !== payload.providerAssetId
    ? { status: 'succeeded', payload: { ...payload, providerAssetId: recoveredProviderAssetId } }
    : { status: 'succeeded' };
}

async function cleanupCloudinaryImages(payload: z.infer<typeof cleanupImagePayload>): Promise<MediaJobResult> {
  const deleted = await deleteCloudinaryReviewImages(payload.publicIds);
  await prisma.pendingReviewImage.deleteMany({ where: { publicId: { in: deleted }, provider: 'cloudinary' } });
  return { status: 'succeeded' };
}

async function cleanupAwsImages(payload: z.infer<typeof cleanupAwsImagePayload>): Promise<MediaJobResult> {
  const invalidatePublicVariants = payload.reason !== 'pending_media_expired';
  for (const family of payload.families) {
    await deleteAwsReviewImageFamily(family.storeId, family.assetId, { invalidatePublicVariants });
  }
  await prisma.pendingReviewImage.deleteMany({
    where: {
      provider: AWS_REVIEW_IMAGE_PROVIDER,
      OR: payload.families.map((family) => ({
        storeId: family.storeId,
        providerAssetId: family.assetId,
      })),
    },
  });
  return { status: 'succeeded' };
}

async function publishAwsImage(payload: z.infer<typeof awsImageVariantMutationPayload>): Promise<MediaJobResult> {
  await publishAwsReviewImageVariants(payload.variantManifest);
  if (payload.mediaId) {
    await prisma.reviewMedia.updateMany({
      where: { id: payload.mediaId, provider: AWS_REVIEW_IMAGE_PROVIDER, resourceType: 'image' },
      data: { variantStatus: 'public_ready', variantPublishedAt: new Date(), variantRevokedAt: null },
    });
  }
  return { status: 'succeeded' };
}

async function revokeAwsImagePublic(payload: z.infer<typeof awsImageVariantMutationPayload>): Promise<MediaJobResult> {
  await revokeAwsReviewImagePublicVariants(payload.variantManifest);
  if (payload.mediaId) {
    await prisma.reviewMedia.updateMany({
      where: { id: payload.mediaId, provider: AWS_REVIEW_IMAGE_PROVIDER, resourceType: 'image' },
      data: { variantStatus: 'private_ready', variantRevokedAt: new Date() },
    });
  }
  return { status: 'succeeded' };
}

export async function processMediaProviderJob(jobId: string) {
  const now = new Date();
  const staleBefore = new Date(now.getTime() - MEDIA_JOB_STALE_LOCK_MS);
  const claim = await prisma.mediaProviderJob.updateMany({
    where: {
      id: jobId,
      availableAt: { lte: now },
      OR: [
        { status: { in: ['pending', 'failed'] } },
        { status: 'processing', lockedAt: { lt: staleBefore } },
        { status: 'processing', lockedAt: null },
      ],
    },
    data: { status: 'processing', lockedAt: now, attempts: { increment: 1 } },
  });
  if (claim.count === 0) return { processed: false, reason: 'not_claimable' as const };
  const job = await prisma.mediaProviderJob.findUnique({ where: { id: jobId } });
  if (!job) return { processed: false, reason: 'missing' as const };
  let lease: MediaJobLease | null = null;
  try {
    const serialKey = mediaJobSerialKey(job);
    if (serialKey) {
      lease = await acquireMediaJobLease(serialKey, job.id);
      if (!lease) {
        const retryDelayMs = 2_000;
        await prisma.mediaProviderJob.update({
          where: { id: job.id },
          data: {
            status: 'pending',
            availableAt: new Date(Date.now() + retryDelayMs),
            lockedAt: null,
            attempts: { decrement: 1 },
          },
        });
        await dispatchMediaProviderJob(job.id, Math.ceil(retryDelayMs / 1000));
        return { processed: false, reason: 'asset_busy' as const };
      }
    }

    let result: MediaJobResult;
    if (job.action === MEDIA_JOB_ACTIONS.resolveVideoAsset) result = await resolveMuxVideoAsset(resolveVideoAssetPayload.parse(job.payload));
    else if (job.action === MEDIA_JOB_ACTIONS.publishVideo) result = await publishVideo(moderationPayload.parse(job.payload), lease);
    else if (job.action === MEDIA_JOB_ACTIONS.protectVideo) result = await protectVideo(moderationPayload.parse(job.payload), lease);
    else if (job.action === MEDIA_JOB_ACTIONS.cleanupVideo) result = await cleanupVideo(cleanupPayload.parse(job.payload));
    else if (job.action === MEDIA_JOB_ACTIONS.cleanupImage && job.provider === 'cloudinary') result = await cleanupCloudinaryImages(cleanupImagePayload.parse(job.payload));
    else if (job.action === MEDIA_JOB_ACTIONS.cleanupImage && job.provider === AWS_REVIEW_IMAGE_PROVIDER) result = await cleanupAwsImages(cleanupAwsImagePayload.parse(job.payload));
    else if (job.action === MEDIA_JOB_ACTIONS.publishImage && job.provider === AWS_REVIEW_IMAGE_PROVIDER) result = await publishAwsImage(awsImageVariantMutationPayload.parse(job.payload));
    else if (job.action === MEDIA_JOB_ACTIONS.revokeImagePublic && job.provider === AWS_REVIEW_IMAGE_PROVIDER) result = await revokeAwsImagePublic(awsImageVariantMutationPayload.parse(job.payload));
    else if (job.action === MEDIA_JOB_ACTIONS.reconcileVideo) result = await reconcileMuxVideo(reconcileVideoPayload.parse(job.payload));
    else if (job.action === MEDIA_JOB_ACTIONS.expireUploadSession) result = await expireUploadSession(expireUploadSessionPayload.parse(job.payload));
    else throw new Error('unsupported_media_job_action');

    if (result.status === 'deferred') {
      const availableAt = new Date(Date.now() + result.delayMs);
      await prisma.mediaProviderJob.update({
        where: { id: job.id },
        data: {
          status: 'pending',
          availableAt,
          lockedAt: null,
          lastErrorCode: null,
          attempts: { decrement: 1 },
          ...(result.payload ? { payload: result.payload } : {}),
        },
      });
      if (lease) {
        await releaseMediaJobLease(lease);
        lease = null;
      }
      await dispatchMediaProviderJob(job.id, Math.ceil(result.delayMs / 1000));
      return { processed: true, status: 'deferred' as const };
    }
    await prisma.mediaProviderJob.update({
      where: { id: job.id },
      data: {
        status: result.status,
        completedAt: new Date(),
        lockedAt: null,
        lastErrorCode: null,
        ...(result.payload ? { payload: result.payload } : {}),
      },
    });
    return { processed: true, status: result.status };
  } catch (error) {
    const code = error instanceof Error ? (error.name || error.message) : 'unknown';
    const dead = job.attempts >= job.maxAttempts;
    await prisma.mediaProviderJob.update({
      where: { id: job.id },
      data: {
        status: dead ? 'dead' : 'failed',
        availableAt: new Date(Date.now() + Math.min(60 * 60 * 1000, 2 ** Math.min(job.attempts, 10) * 1000)),
        lockedAt: null,
        lastErrorCode: code.slice(0, 128),
        lastErrorAt: new Date(),
      },
    });
    Sentry.captureException(error, {
      tags: { source: 'media-job', provider: job.provider, action: job.action, status: dead ? 'dead' : 'failed' },
      extra: { jobId: job.id, attempts: job.attempts },
    });
    throw error;
  } finally {
    if (lease) await releaseMediaJobLease(lease);
  }
}
