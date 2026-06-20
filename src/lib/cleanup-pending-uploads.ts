import { createHash } from 'crypto';
import { prisma } from '@/lib/prisma';
import { MEDIA_JOB_ACTIONS, VIDEO_PROVIDER } from '@/lib/media/constants';
import { dispatchMediaProviderJob, enqueueMediaProviderJob, failSessionAndQueueCleanup } from '@/lib/media/jobs';

const PENDING_TTL_HOURS = 24;
const BATCH_SIZE = 200; // safely under Cloudinary's 100/request delete cap x 2 calls
const CLOUDINARY_DELETE_BATCH_SIZE = 100;

export type CleanupPendingUploadsSummary = {
  message: string;
  deleted?: number;
  deletedRows?: number;
  deletedAssets?: number;
  queuedImageJobs?: number;
  queuedImageAssets?: number;
  queuedVideoJobs?: number;
  queuedExpiredSessions?: number;
};

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function cleanupImageDedupeKey(publicIds: string[]) {
  const digest = createHash('sha256').update(publicIds.join('\0')).digest('hex').slice(0, 48);
  return `cleanup-image:${digest}`;
}

export async function cleanupPendingUploads(): Promise<CleanupPendingUploadsSummary> {
  const cutoff = new Date(Date.now() - PENDING_TTL_HOURS * 60 * 60 * 1000);

  const [expired, expiredSessions] = await Promise.all([
    prisma.pendingReviewImage.findMany({
      where: { createdAt: { lt: cutoff } },
      orderBy: { createdAt: 'asc' },
      take: BATCH_SIZE,
      select: {
        publicId: true,
        storeId: true,
        provider: true,
        providerAssetId: true,
        uploadSessionId: true,
      },
    }),
    prisma.videoUploadSession.findMany({
      where: { expiresAt: { lt: new Date() }, status: { in: ['initiated', 'uploading', 'uploaded', 'processing', 'failed'] } },
      take: BATCH_SIZE,
    }),
  ]);

  if (expired.length === 0 && expiredSessions.length === 0) {
    return { message: 'No expired pending uploads.', deleted: 0 };
  }

  const imageIds = expired.filter((row) => row.provider === 'cloudinary').map((row) => row.publicId).sort();
  const jobs = [];
  for (const imageChunk of chunk(imageIds, CLOUDINARY_DELETE_BATCH_SIZE)) {
    const job = await prisma.$transaction((tx) => enqueueMediaProviderJob(tx, {
      dedupeKey: cleanupImageDedupeKey(imageChunk),
      provider: 'cloudinary',
      action: MEDIA_JOB_ACTIONS.cleanupImage,
      resourceType: 'image',
      payload: { publicIds: imageChunk },
    }));
    jobs.push(job);
  }

  const videoRows = expired.filter((row) => row.provider === VIDEO_PROVIDER);
  const handledSessionIds = new Set<string>();
  let queuedVideoJobs = 0;
  let queuedExpiredSessions = 0;
  for (const row of videoRows) {
    if (row.uploadSessionId) {
      handledSessionIds.add(row.uploadSessionId);
      const job = await failSessionAndQueueCleanup(row.uploadSessionId, 'pending_media_expired');
      if (job) queuedVideoJobs += 1;
      continue;
    }
    const job = await prisma.$transaction((tx) => enqueueMediaProviderJob(tx, {
      dedupeKey: `cleanup-video:${row.publicId}`,
      storeId: row.storeId,
      provider: VIDEO_PROVIDER,
      action: MEDIA_JOB_ACTIONS.cleanupVideo,
      resourceType: 'video',
      payload: {
        providerAssetId: row.providerAssetId ?? undefined,
        pendingPublicId: row.publicId,
      },
    }));
    jobs.push(job);
    queuedVideoJobs += 1;
  }
  for (const session of expiredSessions) {
    if (handledSessionIds.has(session.id)) continue;
    const job = await failSessionAndQueueCleanup(session.id, 'upload_session_expired');
    if (job) queuedExpiredSessions += 1;
  }
  await Promise.all(jobs.map((job) => dispatchMediaProviderJob(job.id)));

  return {
    message: 'Cleanup complete.',
    deletedRows: 0,
    deletedAssets: 0,
    queuedImageJobs: Math.ceil(imageIds.length / CLOUDINARY_DELETE_BATCH_SIZE),
    queuedImageAssets: imageIds.length,
    queuedVideoJobs,
    queuedExpiredSessions,
  };
}
