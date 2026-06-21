import type { VideoUploadSession } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { MEDIA_JOB_ACTIONS, VIDEO_PROVIDER } from '@/lib/media/constants';
import { dispatchMediaProviderJob } from '@/lib/media/dispatcher';
import {
  enqueueMediaProviderJob,
  supersedeSessionLifecycleJobs,
  type EnqueueMediaJobInput,
} from '@/lib/media/outbox';
import { getVideoSessionForUpdate, releaseVideoQuota } from '@/lib/media/sessions';

function videoCleanupJobInput(session: VideoUploadSession): EnqueueMediaJobInput {
  return {
    dedupeKey: `cleanup-video:${session.id}`,
    storeId: session.storeId,
    uploadSessionId: session.id,
    provider: VIDEO_PROVIDER,
    action: MEDIA_JOB_ACTIONS.cleanupVideo,
    resourceType: 'video',
    payload: {
      sessionId: session.id,
      providerUploadId: session.providerUploadId ?? undefined,
      providerAssetId: session.providerAssetId ?? undefined,
      pendingPublicId: session.publicId ?? undefined,
    },
  };
}

export async function failSessionAndQueueCleanup(
  sessionId: string,
  errorCode: string,
  identifiers: { providerUploadId?: string | null; providerAssetId?: string | null } = {},
) {
  const job = await prisma.$transaction(async (tx) => {
    const session = await getVideoSessionForUpdate(tx, sessionId);
    if (!session || session.status === 'consumed') return null;
    await releaseVideoQuota(tx, session);
    await supersedeSessionLifecycleJobs(tx, session.id, [
      MEDIA_JOB_ACTIONS.reconcileVideo,
      MEDIA_JOB_ACTIONS.expireUploadSession,
    ]);
    const failed = await tx.videoUploadSession.update({
      where: { id: session.id },
      data: {
        status: 'failed',
        errorCode: errorCode.slice(0, 128),
        ...(identifiers.providerUploadId && !session.providerUploadId ? { providerUploadId: identifiers.providerUploadId } : {}),
        ...(identifiers.providerAssetId && !session.providerAssetId ? { providerAssetId: identifiers.providerAssetId } : {}),
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
    await releaseVideoQuota(tx, session);
    await supersedeSessionLifecycleJobs(tx, session.id, [
      MEDIA_JOB_ACTIONS.reconcileVideo,
      MEDIA_JOB_ACTIONS.expireUploadSession,
    ]);
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
