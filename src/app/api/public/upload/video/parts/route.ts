import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { withCors, corsOptions } from '@/lib/cors';
import { partitionVideoBytes } from '@/lib/media/video-policy';
import { getVideoSessionByToken } from '@/lib/media/sessions';
import { listVideoUploadParts, signVideoUploadParts } from '@/lib/media/providers/r2';
import { MediaRequestError, readJsonObject } from '@/lib/media/request';

export async function OPTIONS(request: Request) {
  return corsOptions(request);
}

export async function POST(request: Request) {
  try {
    const body = await readJsonObject(request);
    const session = await getVideoSessionByToken(typeof body.token === 'string' ? body.token : '');
    if (!session || !session.r2UploadId || session.expiresAt <= new Date()) {
      return withCors(NextResponse.json({ error: 'invalid_or_expired_upload' }, { status: 404 }), request);
    }
    if (!['uploading', 'initiated'].includes(session.status)) {
      return withCors(NextResponse.json({ error: 'upload_not_resumable' }, { status: 409 }), request);
    }
    const allParts = partitionVideoBytes(session.bytes);
    const completed = await listVideoUploadParts(session.masterObjectKey, session.r2UploadId);
    const completedNumbers = new Set(completed.map((part) => part.partNumber));
    const requested = Array.isArray(body.partNumbers)
      ? body.partNumbers
        .map(Number)
        .filter((value) => Number.isInteger(value) && value >= 1 && value <= allParts.length && !completedNumbers.has(value))
      : allParts.filter((part) => !completedNumbers.has(part.partNumber)).map((part) => part.partNumber);
    const partNumbers = Array.from(new Set(requested)).slice(0, 20);
    const signed = await signVideoUploadParts({ key: session.masterObjectKey, uploadId: session.r2UploadId, partNumbers });
    return withCors(NextResponse.json({ data: { parts: signed, completed } }), request);
  } catch (error) {
    if (error instanceof MediaRequestError) return withCors(NextResponse.json({ error: error.code }, { status: 400 }), request);
    Sentry.captureException(error, { tags: { source: 'media-job', task: 'video-parts' } });
    console.error('[video-parts] failed:', error);
    return withCors(NextResponse.json({ error: 'video_parts_failed' }, { status: 500 }), request);
  }
}
