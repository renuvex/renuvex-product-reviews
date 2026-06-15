import { randomUUID } from 'crypto';
import type { Prisma, VideoUploadSession } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { MEDIA_JOB_ACTIONS, VIDEO_UPLOAD_SESSION_TTL_MS } from '@/lib/media/constants';
import { enqueueMediaProviderJob, supersedeSessionLifecycleJobs } from '@/lib/media/outbox';
import {
  createOpaqueMediaToken,
  hashMediaToken,
  utcMonthStart,
  videoMasterObjectKey,
} from '@/lib/media/video-policy';

export class VideoQuotaError extends Error {
  constructor() {
    super('video_quota_exceeded');
    this.name = 'VideoQuotaError';
  }
}

type TransactionClient = Prisma.TransactionClient;
export type VideoReadinessSource =
  | 'stream_webhook'
  | 'stream_reconcile'
  | 'stream_ingest_cleanup'
  | 'stream_maintenance';

export async function getVideoSessionForUpdate(tx: TransactionClient, sessionId: string) {
  const rows = await tx.$queryRaw<VideoUploadSession[]>`
    SELECT * FROM "VideoUploadSession"
    WHERE "id" = ${sessionId}
    FOR UPDATE
  `;
  return rows[0] ?? null;
}

async function reserveQuota(tx: TransactionClient, storeId: string, month: Date, limit: number) {
  await tx.$executeRaw`
    INSERT INTO "StoreVideoUsage" ("storeId", "month", "reservedCount", "consumedCount", "createdAt", "updatedAt")
    VALUES (${storeId}, ${month}, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT ("storeId", "month") DO NOTHING
  `;
  const rows = await tx.$queryRaw<Array<{ reservedCount: number }>>`
    UPDATE "StoreVideoUsage"
    SET "reservedCount" = "reservedCount" + 1, "updatedAt" = CURRENT_TIMESTAMP
    WHERE "storeId" = ${storeId}
      AND "month" = ${month}
      AND ("reservedCount" + "consumedCount") < ${limit}
    RETURNING "reservedCount"
  `;
  if (rows.length !== 1) throw new VideoQuotaError();
}

export async function createReservedVideoSession(input: {
  storeId: string;
  productId: string;
  mimeType: string;
  bytes: number;
  fileFingerprint?: string | null;
  monthlyLimit: number;
  now?: Date;
}) {
  const now = input.now ?? new Date();
  const id = randomUUID();
  const token = createOpaqueMediaToken();
  const month = utcMonthStart(now);
  const result = await prisma.$transaction(async (tx) => {
    await reserveQuota(tx, input.storeId, month, input.monthlyLimit);
    const session = await tx.videoUploadSession.create({
      data: {
        id,
        tokenHash: hashMediaToken(token),
        storeId: input.storeId,
        productId: input.productId,
        mimeType: input.mimeType,
        bytes: input.bytes,
        fileFingerprint: input.fileFingerprint?.slice(0, 128) || null,
        masterObjectKey: videoMasterObjectKey(input.storeId, id),
        reservedMonth: month,
        expiresAt: new Date(now.getTime() + VIDEO_UPLOAD_SESSION_TTL_MS),
      },
    });
    const expiryJob = await enqueueMediaProviderJob(tx, {
      dedupeKey: `expire-upload-session:${session.id}`,
      storeId: session.storeId,
      uploadSessionId: session.id,
      provider: 'internal',
      action: MEDIA_JOB_ACTIONS.expireUploadSession,
      resourceType: 'video',
      availableAt: session.expiresAt,
      maxAttempts: 16,
      payload: {
        sessionId: session.id,
        expiresAt: session.expiresAt.toISOString(),
      },
    });
    return { session, expiryJob };
  }, { isolationLevel: 'Serializable' });
  return { ...result, token };
}

export async function getVideoSessionByToken(token: string): Promise<VideoUploadSession | null> {
  if (typeof token !== 'string' || token.length < 32 || token.length > 256) return null;
  return prisma.videoUploadSession.findUnique({ where: { tokenHash: hashMediaToken(token) } });
}

export async function releaseVideoReservation(tx: TransactionClient, session: VideoUploadSession) {
  if (session.quotaState !== 'reserved') return false;
  const claim = await tx.videoUploadSession.updateMany({
    where: { id: session.id, quotaState: 'reserved' },
    data: { quotaState: 'released' },
  });
  if (claim.count === 0) return false;
  await tx.storeVideoUsage.updateMany({
    where: { storeId: session.storeId, month: session.reservedMonth, reservedCount: { gt: 0 } },
    data: { reservedCount: { decrement: 1 } },
  });
  return true;
}

export async function markVideoSessionReady(input: {
  sessionId: string;
  streamUid: string;
  playbackUrl: string;
  posterUrl: string;
  durationMs: number;
  metadataSource: VideoReadinessSource;
}) {
  return prisma.$transaction(async (tx) => {
    const session = await getVideoSessionForUpdate(tx, input.sessionId);
    if (!session) return null;
    if (session.status === 'failed' || session.status === 'aborted') return null;
    if (session.status === 'ready' || session.status === 'consumed') return session;
    if (session.quotaState === 'reserved') {
      const claim = await tx.videoUploadSession.updateMany({
        where: { id: session.id, quotaState: 'reserved' },
        data: { quotaState: 'consumed' },
      });
      if (claim.count === 1) {
        await tx.storeVideoUsage.updateMany({
          where: { storeId: session.storeId, month: session.reservedMonth, reservedCount: { gt: 0 } },
          data: { reservedCount: { decrement: 1 }, consumedCount: { increment: 1 } },
        });
      }
    }
    const publicId = `cloudflare_stream:${input.streamUid}`;
    await supersedeSessionLifecycleJobs(tx, session.id, [MEDIA_JOB_ACTIONS.reconcileStream]);
    const updated = await tx.videoUploadSession.update({
      where: { id: session.id },
      data: {
        status: session.status === 'consumed' ? 'consumed' : 'ready',
        streamUid: input.streamUid,
        publicId,
        playbackUrl: input.playbackUrl,
        posterUrl: input.posterUrl,
        durationMs: input.durationMs,
        ingestObjectKey: null,
        errorCode: null,
      },
    });
    await tx.pendingReviewImage.upsert({
      where: { publicId },
      create: {
        publicId,
        storeId: session.storeId,
        productId: session.productId,
        uploadSessionId: session.id,
        url: input.playbackUrl,
        resourceType: 'video',
        provider: 'cloudflare_stream',
        providerAssetId: input.streamUid,
        posterUrl: input.posterUrl,
        durationMs: input.durationMs,
        processingStatus: 'ready',
        sourceProvider: 'cloudflare_r2',
        sourceAssetId: session.masterObjectKey,
        mimeType: session.mimeType,
        bytes: session.bytes,
        metadataSource: input.metadataSource,
        metadataStatus: 'complete',
        metadataFetchedAt: new Date(),
      },
      update: {
        url: input.playbackUrl,
        providerAssetId: input.streamUid,
        posterUrl: input.posterUrl,
        durationMs: input.durationMs,
        processingStatus: 'ready',
        metadataSource: input.metadataSource,
        metadataStatus: 'complete',
        metadataFetchedAt: new Date(),
      },
    });
    return updated;
  });
}
