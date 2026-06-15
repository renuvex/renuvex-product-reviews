import type { Prisma } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import {
  MEDIA_JOB_ACTIONS,
  MEDIA_JOB_STALE_LOCK_MS,
  VIDEO_INGEST_CLEANUP_DELAY_MS,
  VIDEO_INGEST_HARD_DEADLINE_MS,
  VIDEO_INGEST_RECHECK_DELAY_MS,
  VIDEO_STREAM_RECONCILE_OFFSETS_MS,
} from '@/lib/media/constants';
import {
  createStreamVideoFromUrl,
  deleteStreamVideo,
  findStreamVideoByCreator,
  getStreamVideo,
  setStreamVideoPublic,
  StreamProviderError,
} from '@/lib/media/providers/cloudflare-stream';
import {
  abortVideoMultipartUpload,
  copyVideoMasterToIngest,
  deleteVideoIngest,
  deleteVideoMaster,
} from '@/lib/media/providers/r2';
import { deleteCloudinaryReviewImages } from '@/lib/media/providers/cloudinary-image';
import { applyReviewSummaryVisibilityChange } from '@/lib/review-summary';
import { getVideoSessionForUpdate, releaseVideoReservation } from '@/lib/media/sessions';
import { videoIngestObjectKey } from '@/lib/media/video-policy';
import { matchesVideoModerationIntent } from '@/lib/media/moderation-intent';
import { applyStreamVideoState } from '@/lib/media/video-processing';
import {
  enqueueMediaProviderJob,
} from '@/lib/media/outbox';
import { dispatchMediaProviderJob } from '@/lib/media/dispatcher';
import { failSessionAndQueueCleanup } from '@/lib/media/lifecycle';

export { enqueueMediaProviderJob } from '@/lib/media/outbox';
export { dispatchMediaProviderJob } from '@/lib/media/dispatcher';
export {
  cancelSessionAndQueueCleanup,
  failSessionAndQueueCleanup,
} from '@/lib/media/lifecycle';

const preparePayload = z.object({ sessionId: z.string().uuid() });
const moderationPayload = z.object({
  reviewId: z.string().uuid(),
  mediaId: z.string().uuid(),
  streamUid: z.string().min(1).max(128),
  moderationVersion: z.number().int().positive(),
});
const cleanupPayload = z.object({
  sessionId: z.string().uuid().optional(),
  streamUid: z.string().max(128).optional(),
  r2UploadId: z.string().max(1024).optional(),
  masterObjectKey: z.string().max(1024).optional(),
  ingestObjectKey: z.string().max(1024).optional(),
  pendingPublicId: z.string().max(512).optional(),
});
const cleanupIngestPayload = z.object({
  sessionId: z.string().uuid(),
  ingestObjectKey: z.string().max(1024),
  hardDeleteAt: z.string().datetime(),
});
const cleanupImagePayload = z.object({
  publicIds: z.array(z.string().min(1).max(512)).min(1).max(100),
});
const reconcileStreamPayload = z.object({
  sessionId: z.string().uuid(),
  streamUid: z.string().min(1).max(128),
  startedAt: z.string().datetime(),
  checkIndex: z.number().int().min(0).max(VIDEO_STREAM_RECONCILE_OFFSETS_MS.length - 1),
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
  const streamUid = typeof payload.streamUid === 'string' ? payload.streamUid : '';
  if (streamUid) return `stream:${streamUid}`;
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

async function convergeStreamPublication(payload: z.infer<typeof moderationPayload>) {
  const media = await prisma.reviewMedia.findUnique({
    where: { id: payload.mediaId },
    select: {
      providerAssetId: true,
      processingStatus: true,
      visible: true,
      review: { select: { status: true } },
    },
  });
  if (!media || media.providerAssetId !== payload.streamUid) {
    await deleteStreamVideo(payload.streamUid);
    return 'deleted' as const;
  }
  const shouldBePublic = media.processingStatus === 'ready' && media.visible && media.review.status === 'approved';
  await setStreamVideoPublic(payload.streamUid, shouldBePublic);
  return shouldBePublic ? 'public' as const : 'protected' as const;
}

async function ensureStreamReconcileJob(session: {
  id: string;
  storeId: string;
  streamUid: string;
}) {
  const startedAt = new Date();
  const availableAt = new Date(startedAt.getTime() + VIDEO_STREAM_RECONCILE_OFFSETS_MS[0]);
  return prisma.$transaction((tx) => enqueueMediaProviderJob(tx, {
    dedupeKey: `reconcile-stream:${session.id}`,
    storeId: session.storeId,
    uploadSessionId: session.id,
    provider: 'cloudflare_stream',
    action: MEDIA_JOB_ACTIONS.reconcileStream,
    resourceType: 'video',
    availableAt,
    maxAttempts: 16,
    payload: {
      sessionId: session.id,
      streamUid: session.streamUid,
      startedAt: startedAt.toISOString(),
      checkIndex: 0,
    },
  }));
}

async function dispatchStreamReconcileJob(job: {
  id: string;
  status: string;
  availableAt: Date;
}) {
  if (job.status !== 'pending' && job.status !== 'failed') return;
  const dispatched = await dispatchMediaProviderJob(
    job.id,
    Math.max(1, Math.ceil((job.availableAt.getTime() - Date.now()) / 1000)),
  );
  if (!dispatched) throw new Error('stream_reconcile_dispatch_failed');
}

async function prepareStream(payload: z.infer<typeof preparePayload>): Promise<MediaJobResult> {
  const session = await prisma.videoUploadSession.findUnique({ where: { id: payload.sessionId } });
  if (!session || ['failed', 'aborted', 'consumed'].includes(session.status)) return { status: 'superseded' };
  if (session.streamUid) {
    const reconcileJob = await ensureStreamReconcileJob({
      id: session.id,
      storeId: session.storeId,
      streamUid: session.streamUid,
    });
    await dispatchStreamReconcileJob(reconcileJob);
    return { status: 'succeeded' };
  }

  const now = new Date();
  const ingestObjectKey = session.ingestObjectKey ?? videoIngestObjectKey(session.id);
  const cleanupAvailableAt = new Date(now.getTime() + VIDEO_INGEST_CLEANUP_DELAY_MS);
  const hardDeleteAt = new Date(now.getTime() + VIDEO_INGEST_HARD_DEADLINE_MS);
  const deadlineJob = await prisma.$transaction(async (tx) => {
    const claimed = await tx.videoUploadSession.updateMany({
      where: { id: session.id, status: { in: ['uploaded', 'completing', 'processing'] }, streamUid: null },
      data: { ingestObjectKey },
    });
    if (claimed.count === 0) return null;
    return enqueueMediaProviderJob(tx, {
      dedupeKey: `cleanup-ingest:${session.id}:${ingestObjectKey}`,
      storeId: session.storeId,
      uploadSessionId: session.id,
      provider: 'cloudflare_r2',
      action: MEDIA_JOB_ACTIONS.cleanupIngest,
      resourceType: 'video',
      availableAt: cleanupAvailableAt,
      maxAttempts: 64,
      payload: { sessionId: session.id, ingestObjectKey, hardDeleteAt: hardDeleteAt.toISOString() },
    });
  });
  if (!deadlineJob) return { status: 'superseded' };
  if (!await dispatchMediaProviderJob(deadlineJob.id, Math.ceil(VIDEO_INGEST_CLEANUP_DELAY_MS / 1000))) {
    throw new Error('ingest_cleanup_dispatch_failed');
  }

  const ingestUrl = await copyVideoMasterToIngest(session.masterObjectKey, ingestObjectKey, session.mimeType);
  const current = await prisma.videoUploadSession.findUnique({ where: { id: session.id }, select: { status: true } });
  if (!current || ['failed', 'aborted', 'consumed'].includes(current.status)) {
    await deleteVideoIngest(ingestObjectKey);
    return { status: 'superseded' };
  }

  const existing = await findStreamVideoByCreator(session.id);
  const video = existing ?? await createStreamVideoFromUrl({ url: ingestUrl, creator: session.id, name: `review-video-${session.id}` });
  if (!video.uid) throw new Error('stream_copy_missing_uid');
  const processingStartedAt = new Date();
  const firstReconcileAt = new Date(processingStartedAt.getTime() + VIDEO_STREAM_RECONCILE_OFFSETS_MS[0]);
  const reconcileJob = await prisma.$transaction(async (tx) => {
    const claimed = await tx.videoUploadSession.updateMany({
      where: {
        id: session.id,
        status: { in: ['uploaded', 'completing', 'processing'] },
        OR: [{ streamUid: null }, { streamUid: video.uid }],
      },
      data: {
        status: 'processing',
        ingestObjectKey,
        streamUid: video.uid,
        publicId: `cloudflare_stream:${video.uid}`,
        playbackUrl: video.playback?.hls ?? null,
        posterUrl: video.thumbnail ?? null,
      },
    });
    if (claimed.count === 0) return false;
    await tx.pendingReviewImage.upsert({
      where: { publicId: `cloudflare_stream:${video.uid}` },
      create: {
        publicId: `cloudflare_stream:${video.uid}`,
        storeId: session.storeId,
        productId: session.productId,
        uploadSessionId: session.id,
        url: video.playback?.hls ?? null,
        resourceType: 'video',
        provider: 'cloudflare_stream',
        providerAssetId: video.uid,
        posterUrl: video.thumbnail ?? null,
        processingStatus: 'pending',
        sourceProvider: 'cloudflare_r2',
        sourceAssetId: session.masterObjectKey,
        mimeType: session.mimeType,
        bytes: session.bytes,
        metadataSource: 'stream_copy',
        metadataStatus: 'pending',
      },
      update: {
        providerAssetId: video.uid,
        url: video.playback?.hls ?? null,
        posterUrl: video.thumbnail ?? null,
        processingStatus: 'pending',
      },
    });
    return enqueueMediaProviderJob(tx, {
      dedupeKey: `reconcile-stream:${session.id}`,
      storeId: session.storeId,
      uploadSessionId: session.id,
      provider: 'cloudflare_stream',
      action: MEDIA_JOB_ACTIONS.reconcileStream,
      resourceType: 'video',
      availableAt: firstReconcileAt,
      maxAttempts: 16,
      payload: {
        sessionId: session.id,
        streamUid: video.uid,
        startedAt: processingStartedAt.toISOString(),
        checkIndex: 0,
      },
    });
  });
  if (!reconcileJob) {
    await deleteStreamVideo(video.uid);
    await deleteVideoIngest(ingestObjectKey);
    return { status: 'superseded' };
  }
  await dispatchStreamReconcileJob(reconcileJob);
  return { status: 'succeeded' };
}

function nextStreamReconcileResult(
  payload: z.infer<typeof reconcileStreamPayload>,
  providerErrorCode?: string,
): MediaJobResult {
  const nextIndex = payload.checkIndex + 1;
  if (nextIndex >= VIDEO_STREAM_RECONCILE_OFFSETS_MS.length) {
    return {
      status: 'succeeded',
      payload: {
        ...payload,
        outcome: 'stream_processing_delayed',
        ...(providerErrorCode ? { lastProviderErrorCode: providerErrorCode.slice(0, 128) } : {}),
      },
    };
  }
  const nextAt = new Date(payload.startedAt).getTime() + VIDEO_STREAM_RECONCILE_OFFSETS_MS[nextIndex];
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

async function reconcileStream(payload: z.infer<typeof reconcileStreamPayload>): Promise<MediaJobResult> {
  const session = await prisma.videoUploadSession.findUnique({ where: { id: payload.sessionId } });
  if (!session || ['ready', 'failed', 'aborted', 'consumed'].includes(session.status)) {
    return { status: 'superseded' };
  }
  if (!session.streamUid || session.streamUid !== payload.streamUid) return { status: 'superseded' };

  let video;
  try {
    video = await getStreamVideo(payload.streamUid);
  } catch (error) {
    const code = error instanceof StreamProviderError
      ? error.code
      : error instanceof Error
        ? error.name || error.message
        : 'stream_provider_unavailable';
    if (payload.checkIndex === 0 || payload.checkIndex === VIDEO_STREAM_RECONCILE_OFFSETS_MS.length - 1) {
      Sentry.captureException(error, {
        tags: {
          source: 'media-job',
          provider: 'cloudflare_stream',
          action: MEDIA_JOB_ACTIONS.reconcileStream,
          status: payload.checkIndex === VIDEO_STREAM_RECONCILE_OFFSETS_MS.length - 1 ? 'delayed' : 'retrying',
        },
        extra: { sessionId: payload.sessionId, checkIndex: payload.checkIndex },
      });
    }
    return nextStreamReconcileResult(payload, code);
  }

  const result = await applyStreamVideoState(session, video);
  if (!result.ok || result.status === 'ready' || result.status === 'consumed') {
    return {
      status: 'succeeded',
      payload: {
        ...payload,
        outcome: result.ok ? result.status : result.code,
      },
    };
  }
  return nextStreamReconcileResult(payload);
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

async function publishStream(payload: z.infer<typeof moderationPayload>, lease: MediaJobLease | null): Promise<MediaJobResult> {
  const candidate = await prisma.review.findUnique({ where: { id: payload.reviewId } });
  if (!matchesVideoModerationIntent(candidate, 'pending', payload.moderationVersion)) {
    await convergeStreamPublication(payload);
    return { status: 'superseded' };
  }
  await setStreamVideoPublic(payload.streamUid, true);
  await requireCurrentLease(lease);
  const applied = await prisma.$transaction(async (tx) => {
    const existing = await tx.review.findUnique({ where: { id: payload.reviewId } });
    if (!matchesVideoModerationIntent(existing, 'pending', payload.moderationVersion)) return false;
    const updated = await tx.review.update({ where: { id: payload.reviewId }, data: { status: 'approved' } });
    await tx.reviewMedia.updateMany({
      where: { id: payload.mediaId, reviewId: payload.reviewId, processingStatus: 'ready' },
      data: { visible: true },
    });
    await applyReviewSummaryVisibilityChange(tx, existing, updated);
    return true;
  });
  if (!applied) {
    await convergeStreamPublication(payload);
    return { status: 'superseded' };
  }
  return { status: 'succeeded' };
}

async function protectStream(payload: z.infer<typeof moderationPayload>, lease: MediaJobLease | null): Promise<MediaJobResult> {
  const candidate = await prisma.review.findUnique({ where: { id: payload.reviewId } });
  if (!matchesVideoModerationIntent(candidate, 'rejected', payload.moderationVersion)) {
    await convergeStreamPublication(payload);
    return { status: 'superseded' };
  }
  await setStreamVideoPublic(payload.streamUid, false);
  await requireCurrentLease(lease);
  const current = await prisma.review.findUnique({ where: { id: payload.reviewId } });
  if (!matchesVideoModerationIntent(current, 'rejected', payload.moderationVersion)) {
    await convergeStreamPublication(payload);
    return { status: 'superseded' };
  }
  return { status: 'succeeded' };
}

async function cleanupVideo(payload: z.infer<typeof cleanupPayload>): Promise<MediaJobResult> {
  if (payload.streamUid) await deleteStreamVideo(payload.streamUid);
  if (payload.ingestObjectKey) await deleteVideoIngest(payload.ingestObjectKey);
  if (payload.r2UploadId && payload.masterObjectKey) {
    await abortVideoMultipartUpload(payload.masterObjectKey, payload.r2UploadId);
  }
  if (payload.masterObjectKey) await deleteVideoMaster(payload.masterObjectKey);
  await prisma.$transaction(async (tx) => {
    if (payload.pendingPublicId) await tx.pendingReviewImage.deleteMany({ where: { publicId: payload.pendingPublicId } });
    if (payload.sessionId) {
      const session = await getVideoSessionForUpdate(tx, payload.sessionId);
      if (session && session.status !== 'consumed') {
        await releaseVideoReservation(tx, session);
        await tx.videoUploadSession.update({ where: { id: session.id }, data: { status: 'aborted', errorCode: null } });
      }
    }
  });
  return { status: 'succeeded' };
}

async function cleanupIngest(payload: z.infer<typeof cleanupIngestPayload>): Promise<MediaJobResult> {
  const session = await prisma.videoUploadSession.findUnique({ where: { id: payload.sessionId } });
  if (!session || session.ingestObjectKey !== payload.ingestObjectKey) {
    await deleteVideoIngest(payload.ingestObjectKey);
    return { status: 'succeeded' };
  }

  const hardDeleteAt = new Date(payload.hardDeleteAt);
  const terminal = ['ready', 'consumed', 'failed', 'aborted'].includes(session.status);
  if (!terminal && session.streamUid && hardDeleteAt > new Date()) {
    const video = await getStreamVideo(session.streamUid);
    const result = await applyStreamVideoState(session, video);
    if (result.ok && result.status === 'processing') {
      return { status: 'deferred', delayMs: VIDEO_INGEST_RECHECK_DELAY_MS };
    }
  } else if (!terminal && hardDeleteAt > new Date()) {
    return { status: 'deferred', delayMs: VIDEO_INGEST_RECHECK_DELAY_MS };
  }

  await deleteVideoIngest(payload.ingestObjectKey);
  await prisma.videoUploadSession.updateMany({
    where: { id: session.id, ingestObjectKey: payload.ingestObjectKey },
    data: { ingestObjectKey: null },
  });
  return { status: 'succeeded' };
}

async function cleanupCloudinaryImages(payload: z.infer<typeof cleanupImagePayload>): Promise<MediaJobResult> {
  const deleted = await deleteCloudinaryReviewImages(payload.publicIds);
  await prisma.pendingReviewImage.deleteMany({ where: { publicId: { in: deleted }, provider: 'cloudinary' } });
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
    if (job.action === MEDIA_JOB_ACTIONS.prepareStream) result = await prepareStream(preparePayload.parse(job.payload));
    else if (job.action === MEDIA_JOB_ACTIONS.publishStream) result = await publishStream(moderationPayload.parse(job.payload), lease);
    else if (job.action === MEDIA_JOB_ACTIONS.protectStream) result = await protectStream(moderationPayload.parse(job.payload), lease);
    else if (job.action === MEDIA_JOB_ACTIONS.cleanupVideo) result = await cleanupVideo(cleanupPayload.parse(job.payload));
    else if (job.action === MEDIA_JOB_ACTIONS.cleanupIngest) result = await cleanupIngest(cleanupIngestPayload.parse(job.payload));
    else if (job.action === MEDIA_JOB_ACTIONS.cleanupImage) result = await cleanupCloudinaryImages(cleanupImagePayload.parse(job.payload));
    else if (job.action === MEDIA_JOB_ACTIONS.reconcileStream) result = await reconcileStream(reconcileStreamPayload.parse(job.payload));
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
