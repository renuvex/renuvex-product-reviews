import { prisma } from '@/lib/prisma';
import { dispatchMediaProviderJob } from '@/lib/media/jobs';
import { getMuxAsset } from '@/lib/media/providers/mux';
import { applyMuxAssetState } from '@/lib/media/video-processing';
import {
  MEDIA_JOB_ACTIONS,
  MEDIA_JOB_STALE_LOCK_MS,
  VIDEO_ASSET_RECONCILE_OFFSETS_MS,
  VIDEO_PROVIDER,
} from '@/lib/media/constants';
import { enqueueMediaProviderJob } from '@/lib/media/outbox';

function delaySecondsUntil(availableAt: Date) {
  return Math.max(1, Math.ceil((availableAt.getTime() - Date.now()) / 1000));
}

export async function ensureVideoLifecycleJobs(limit = 200) {
  const sessions = await prisma.videoUploadSession.findMany({
    where: {
      status: { in: ['initiated', 'uploading', 'uploaded', 'processing', 'ready'] },
    },
    orderBy: { createdAt: 'asc' },
    take: Math.max(1, Math.min(500, limit)),
  });
  let expiryJobs = 0;
  let reconcileJobs = 0;
  let dispatched = 0;

  for (const session of sessions) {
    const jobs = await prisma.$transaction(async (tx) => {
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
      if (session.status !== 'processing' || (!session.providerAssetId && !session.providerUploadId)) {
        return { expiryJob, reconcileJob: null };
      }
      const startedAt = new Date();
      const availableAt = new Date(startedAt.getTime() + VIDEO_ASSET_RECONCILE_OFFSETS_MS[0]);
      const reconcileJob = await enqueueMediaProviderJob(tx, {
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
      });
      return { expiryJob, reconcileJob };
    });

    if (jobs.expiryJob.status === 'pending' || jobs.expiryJob.status === 'failed') {
      expiryJobs += 1;
      if (await dispatchMediaProviderJob(jobs.expiryJob.id, delaySecondsUntil(jobs.expiryJob.availableAt))) dispatched += 1;
    }
    if (jobs.reconcileJob && (jobs.reconcileJob.status === 'pending' || jobs.reconcileJob.status === 'failed')) {
      reconcileJobs += 1;
      if (await dispatchMediaProviderJob(jobs.reconcileJob.id, delaySecondsUntil(jobs.reconcileJob.availableAt))) dispatched += 1;
    }
  }

  return { scanned: sessions.length, expiryJobs, reconcileJobs, dispatched };
}

export async function reconcileProcessingVideos(limit = 50) {
  const sessions = await prisma.videoUploadSession.findMany({
    where: { status: 'processing', provider: VIDEO_PROVIDER, providerAssetId: { not: null } },
    orderBy: { updatedAt: 'asc' },
    take: Math.max(1, Math.min(200, limit)),
  });
  let ready = 0;
  let processing = 0;
  let failed = 0;
  for (const session of sessions) {
    try {
      const asset = await getMuxAsset(session.providerAssetId!);
      const result = await applyMuxAssetState(session, asset, 'mux_maintenance');
      if (result.ok && result.status === 'ready') ready += 1;
      else if (result.ok) processing += 1;
      else failed += 1;
    } catch {
      failed += 1;
    }
  }
  return { scanned: sessions.length, ready, processing, failed };
}

export async function redispatchDueMediaJobs(limit = 100) {
  const now = new Date();
  const staleBefore = new Date(now.getTime() - MEDIA_JOB_STALE_LOCK_MS);
  const jobs = await prisma.mediaProviderJob.findMany({
    where: {
      OR: [
        { status: { in: ['pending', 'failed'] }, availableAt: { lte: now } },
        { status: 'processing', lockedAt: { lt: staleBefore } },
        { status: 'processing', lockedAt: null },
      ],
    },
    orderBy: { availableAt: 'asc' },
    take: Math.max(1, Math.min(500, limit)),
    select: { id: true },
  });
  const results = await Promise.all(jobs.map((job) => dispatchMediaProviderJob(job.id)));
  return { scanned: jobs.length, dispatched: results.filter(Boolean).length };
}
