import type { Prisma, VideoUploadSession } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';
import { Client } from '@upstash/qstash';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getMediaJobEndpoint, getQStashMediaConfig, MediaConfigError } from '@/lib/media/config';
import {
  MEDIA_JOB_ACTIONS,
  MEDIA_JOB_STALE_LOCK_MS,
  VIDEO_INGEST_CLEANUP_DELAY_MS,
  VIDEO_INGEST_HARD_DEADLINE_MS,
  VIDEO_INGEST_RECHECK_DELAY_MS,
  type MediaJobAction,
} from '@/lib/media/constants';
import {
  createStreamVideoFromUrl,
  deleteStreamVideo,
  findStreamVideoByCreator,
  getStreamVideo,
  setStreamVideoPublic,
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

type TransactionClient = Prisma.TransactionClient;

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

export type EnqueueMediaJobInput = {
  dedupeKey: string;
  storeId?: string | null;
  reviewId?: string | null;
  mediaId?: string | null;
  uploadSessionId?: string | null;
  provider: string;
  action: MediaJobAction;
  resourceType: string;
  payload: Prisma.InputJsonValue;
  availableAt?: Date;
  maxAttempts?: number;
};

export async function enqueueMediaProviderJob(tx: TransactionClient, input: EnqueueMediaJobInput) {
  return tx.mediaProviderJob.upsert({
    where: { dedupeKey: input.dedupeKey },
    create: { ...input, status: 'pending' },
    update: {},
  });
}

export async function dispatchMediaProviderJob(jobId: string, delaySeconds = 0): Promise<boolean> {
  try {
    const config = getQStashMediaConfig();
    const client = new Client({ token: config.token });
    await client.publishJSON({
      url: getMediaJobEndpoint(),
      body: { jobId },
      retries: 5,
      timeout: '30s',
      ...(delaySeconds > 0 ? { delay: delaySeconds } : {}),
    });
    return true;
  } catch (error) {
    if (!(error instanceof MediaConfigError)) {
      Sentry.captureException(error, { tags: { source: 'media-job', task: 'dispatch' }, extra: { jobId } });
    }
    return false;
  }
}

type MediaJobLease = { key: string; ownerJobId: string; leaseVersion: number };
type MediaJobResult =
  | { status: 'succeeded' }
  | { status: 'superseded' }
  | { status: 'deferred'; delayMs: number };

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

async function prepareStream(payload: z.infer<typeof preparePayload>): Promise<MediaJobResult> {
  const session = await prisma.videoUploadSession.findUnique({ where: { id: payload.sessionId } });
  if (!session || ['failed', 'aborted', 'consumed'].includes(session.status)) return { status: 'superseded' };
  if (session.streamUid) return { status: 'succeeded' };

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
  await dispatchMediaProviderJob(deadlineJob.id, Math.ceil(VIDEO_INGEST_CLEANUP_DELAY_MS / 1000));

  const ingestUrl = await copyVideoMasterToIngest(session.masterObjectKey, ingestObjectKey, session.mimeType);
  const current = await prisma.videoUploadSession.findUnique({ where: { id: session.id }, select: { status: true } });
  if (!current || ['failed', 'aborted', 'consumed'].includes(current.status)) {
    await deleteVideoIngest(ingestObjectKey);
    return { status: 'superseded' };
  }

  const existing = await findStreamVideoByCreator(session.id);
  const video = existing ?? await createStreamVideoFromUrl({ url: ingestUrl, creator: session.id, name: `review-video-${session.id}` });
  if (!video.uid) throw new Error('stream_copy_missing_uid');
  const applied = await prisma.$transaction(async (tx) => {
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
    return true;
  });
  if (!applied) {
    await deleteStreamVideo(video.uid);
    await deleteVideoIngest(ingestObjectKey);
    return { status: 'superseded' };
  }
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
    const stillFetching = !video.readyToStream && video.status?.state !== 'error';
    if (stillFetching) return { status: 'deferred', delayMs: VIDEO_INGEST_RECHECK_DELAY_MS };
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
      data: { status: result.status, completedAt: new Date(), lockedAt: null, lastErrorCode: null },
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

function videoCleanupJobInput(session: VideoUploadSession): EnqueueMediaJobInput {
  return {
    dedupeKey: `cleanup-video:${session.id}`,
    storeId: session.storeId,
    uploadSessionId: session.id,
    provider: 'cloudflare_stream',
    action: MEDIA_JOB_ACTIONS.cleanupVideo,
    resourceType: 'video',
    payload: {
      sessionId: session.id,
      streamUid: session.streamUid ?? undefined,
      r2UploadId: session.r2UploadId ?? undefined,
      masterObjectKey: session.masterObjectKey,
      ingestObjectKey: session.ingestObjectKey ?? undefined,
      pendingPublicId: session.publicId ?? undefined,
    },
  };
}

export async function failSessionAndQueueCleanup(
  sessionId: string,
  errorCode: string,
  identifiers: { r2UploadId?: string | null } = {},
) {
  const job = await prisma.$transaction(async (tx) => {
    const session = await getVideoSessionForUpdate(tx, sessionId);
    if (!session || session.status === 'consumed') return null;
    await releaseVideoReservation(tx, session);
    const failed = await tx.videoUploadSession.update({
      where: { id: session.id },
      data: {
        status: 'failed',
        errorCode: errorCode.slice(0, 128),
        ...(identifiers.r2UploadId && !session.r2UploadId ? { r2UploadId: identifiers.r2UploadId } : {}),
      },
    });
    return enqueueMediaProviderJob(tx, videoCleanupJobInput(failed));
  });
  if (!job) return null;
  await dispatchMediaProviderJob(job.id);
  return job;
}

export async function cancelSessionAndQueueCleanup(sessionId: string) {
  const job = await prisma.$transaction(async (tx) => {
    const session = await getVideoSessionForUpdate(tx, sessionId);
    if (!session || session.status === 'consumed') return null;
    await releaseVideoReservation(tx, session);
    const aborted = await tx.videoUploadSession.update({
      where: { id: session.id },
      data: { status: 'aborted', errorCode: null },
    });
    return enqueueMediaProviderJob(tx, videoCleanupJobInput(aborted));
  });
  if (!job) return null;
  await dispatchMediaProviderJob(job.id);
  return job;
}
