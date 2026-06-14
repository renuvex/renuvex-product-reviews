import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';
import { MEDIA_JOB_ACTIONS, VIDEO_MAX_BYTES } from '@/lib/media/constants';
import { dispatchMediaProviderJob, enqueueMediaProviderJob, failSessionAndQueueCleanup } from '@/lib/media/jobs';
import {
  completeVideoMultipartUpload,
  headVideoMaster,
  listVideoUploadParts,
  readVideoMasterPrefix,
} from '@/lib/media/providers/r2';
import { MediaRequestError, readJsonObject } from '@/lib/media/request';
import { getVideoSessionByToken } from '@/lib/media/sessions';
import { hasIsoBaseMediaFtyp, normalizeCompletedParts, partitionVideoBytes } from '@/lib/media/video-policy';

export async function OPTIONS(request: Request) {
  return corsOptions(request);
}

export async function POST(request: Request) {
  let sessionId: string | null = null;
  try {
    const body = await readJsonObject(request);
    const session = await getVideoSessionByToken(typeof body.token === 'string' ? body.token : '');
    if (!session || !session.r2UploadId || session.expiresAt <= new Date()) {
      return withCors(NextResponse.json({ error: 'invalid_or_expired_upload' }, { status: 404 }), request);
    }
    sessionId = session.id;
    if (session.status === 'completing' || session.status === 'uploaded' || session.status === 'processing') {
      return withCors(NextResponse.json({ data: { status: 'processing' } }), request);
    }
    if (session.status === 'ready') {
      return withCors(NextResponse.json({ data: { status: session.status } }), request);
    }
    if (session.status !== 'uploading') {
      return withCors(NextResponse.json({ error: 'upload_not_completable' }, { status: 409 }), request);
    }

    const clientParts = normalizeCompletedParts(body.parts);
    if (!clientParts) {
      return withCors(NextResponse.json({ error: 'invalid_video_parts' }, { status: 400 }), request);
    }

    const providerParts = await listVideoUploadParts(session.masterObjectKey, session.r2UploadId);
    const expected = partitionVideoBytes(session.bytes);
    const providerMap = new Map(providerParts.map((part) => [part.partNumber, part]));
    const exact = expected.length === clientParts.length && expected.every((part) => {
      const remote = providerMap.get(part.partNumber);
      const client = clientParts.find((item) => item.PartNumber === part.partNumber);
      return remote && client && remote.size === part.size && remote.etag === client.ETag;
    });
    if (!exact) {
      return withCors(NextResponse.json({ error: 'video_parts_mismatch' }, { status: 409 }), request);
    }

    const claim = await prisma.videoUploadSession.updateMany({
      where: { id: session.id, status: 'uploading' },
      data: { status: 'completing' },
    });
    if (claim.count === 0) {
      const current = await prisma.videoUploadSession.findUnique({ where: { id: session.id }, select: { status: true } });
      if (current && ['completing', 'uploaded', 'processing'].includes(current.status)) {
        return withCors(NextResponse.json({ data: { status: 'processing' } }), request);
      }
      if (current?.status === 'ready') {
        return withCors(NextResponse.json({ data: { status: 'ready' } }), request);
      }
      return withCors(NextResponse.json({ error: 'upload_not_completable' }, { status: 409 }), request);
    }

    await completeVideoMultipartUpload({ key: session.masterObjectKey, uploadId: session.r2UploadId, parts: clientParts });
    const [head, prefix] = await Promise.all([headVideoMaster(session.masterObjectKey), readVideoMasterPrefix(session.masterObjectKey)]);
    if (head.bytes !== session.bytes || head.bytes > VIDEO_MAX_BYTES || head.mimeType.toLowerCase() !== session.mimeType || !hasIsoBaseMediaFtyp(prefix)) {
      await failSessionAndQueueCleanup(session.id, 'invalid_master_object');
      return withCors(NextResponse.json({ error: 'invalid_video_master' }, { status: 400 }), request);
    }

    const job = await prisma.$transaction(async (tx) => {
      await tx.videoUploadSession.update({ where: { id: session.id }, data: { status: 'uploaded' } });
      return enqueueMediaProviderJob(tx, {
        dedupeKey: `prepare-stream:${session.id}`,
        storeId: session.storeId,
        uploadSessionId: session.id,
        provider: 'cloudflare_stream',
        action: MEDIA_JOB_ACTIONS.prepareStream,
        resourceType: 'video',
        payload: { sessionId: session.id },
      });
    });
    await dispatchMediaProviderJob(job.id);
    return withCors(NextResponse.json({ data: { status: 'processing' } }), request);
  } catch (error) {
    if (error instanceof MediaRequestError) return withCors(NextResponse.json({ error: error.code }, { status: 400 }), request);
    if (sessionId) {
      try {
        await failSessionAndQueueCleanup(sessionId, 'complete_failed');
      } catch (cleanupError) {
        console.error('[video-complete] failed to persist cleanup outbox:', cleanupError);
      }
    }
    console.error('[video-complete] failed:', error);
    return withCors(NextResponse.json({ error: 'video_upload_complete_failed' }, { status: 500 }), request);
  }
}
