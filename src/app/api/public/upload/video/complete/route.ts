import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '@/lib/prisma';
import { anonymousPublicCorsOptions, withAnonymousPublicCors } from '@/lib/cors';
import { MEDIA_JOB_ACTIONS, VIDEO_PROVIDER } from '@/lib/media/constants';
import { dispatchMediaProviderJob, enqueueMediaProviderJob, failSessionAndQueueCleanup } from '@/lib/media/jobs';
import { MediaRequestError, readJsonObject } from '@/lib/media/request';
import { getVideoSessionByToken } from '@/lib/media/sessions';

export async function OPTIONS() {
  return anonymousPublicCorsOptions(['POST']);
}

export async function POST(request: Request) {
  let sessionId: string | null = null;
  try {
    const body = await readJsonObject(request);
    const session = await getVideoSessionByToken(typeof body.token === 'string' ? body.token : '');
    if (!session || !session.providerUploadId || session.expiresAt <= new Date()) {
      return withAnonymousPublicCors(NextResponse.json({ error: 'invalid_or_expired_upload' }, { status: 404 }));
    }
    sessionId = session.id;
    if (session.status === 'uploaded' || session.status === 'processing') {
      return withAnonymousPublicCors(NextResponse.json({ data: { status: 'processing' } }));
    }
    if (session.status === 'ready') {
      return withAnonymousPublicCors(NextResponse.json({ data: { status: session.status } }));
    }
    if (session.status !== 'uploading') {
      return withAnonymousPublicCors(NextResponse.json({ error: 'upload_not_completable' }, { status: 409 }));
    }

    const job = await prisma.$transaction(async (tx) => {
      const claimed = await tx.videoUploadSession.updateMany({
        where: { id: session.id, status: 'uploading' },
        data: { status: 'uploaded' },
      });
      if (claimed.count === 0) return null;
      return enqueueMediaProviderJob(tx, {
        dedupeKey: `resolve-video-asset:${session.id}`,
        storeId: session.storeId,
        uploadSessionId: session.id,
        provider: VIDEO_PROVIDER,
        action: MEDIA_JOB_ACTIONS.resolveVideoAsset,
        resourceType: 'video',
        payload: { sessionId: session.id, providerUploadId: session.providerUploadId },
      });
    });
    if (job) await dispatchMediaProviderJob(job.id);
    return withAnonymousPublicCors(NextResponse.json({ data: { status: 'processing' } }));
  } catch (error) {
    if (error instanceof MediaRequestError) return withAnonymousPublicCors(NextResponse.json({ error: error.code }, { status: 400 }));
    if (sessionId) {
      try {
        await failSessionAndQueueCleanup(sessionId, 'complete_failed');
      } catch (cleanupError) {
        console.error('[video-complete] failed to persist cleanup outbox:', cleanupError);
      }
    }
    Sentry.captureException(error, { tags: { source: 'media-job', task: 'video-complete' } });
    console.error('[video-complete] failed:', error);
    return withAnonymousPublicCors(NextResponse.json({ error: 'video_upload_complete_failed' }, { status: 500 }));
  }
}
