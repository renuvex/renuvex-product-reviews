import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { anonymousPublicCorsOptions, withAnonymousPublicCors } from '@/lib/cors';
import { cancelSessionAndQueueCleanup } from '@/lib/media/jobs';
import { MediaRequestError, readJsonObject } from '@/lib/media/request';
import { getVideoSessionByToken } from '@/lib/media/sessions';

export async function OPTIONS() {
  return anonymousPublicCorsOptions(['DELETE']);
}

export async function DELETE(request: Request) {
  try {
    const body = await readJsonObject(request);
    const session = await getVideoSessionByToken(typeof body.token === 'string' ? body.token : '');
    if (!session) return withAnonymousPublicCors(NextResponse.json({ error: 'upload_not_found' }, { status: 404 }));
    const job = await cancelSessionAndQueueCleanup(session.id);
    if (!job) return withAnonymousPublicCors(NextResponse.json({ error: 'Upload can no longer be cancelled.' }, { status: 409 }));
    return withAnonymousPublicCors(NextResponse.json({ data: { status: 'cancelling' } }));
  } catch (error) {
    if (error instanceof MediaRequestError) return withAnonymousPublicCors(NextResponse.json({ error: error.code }, { status: 400 }));
    Sentry.captureException(error, { tags: { source: 'media-job', task: 'video-cancel' } });
    console.error('[video-delete] failed:', error);
    return withAnonymousPublicCors(NextResponse.json({ error: 'video_upload_cancel_failed' }, { status: 500 }));
  }
}
