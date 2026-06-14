import { NextResponse } from 'next/server';
import { withCors, corsOptions } from '@/lib/cors';
import { cancelSessionAndQueueCleanup } from '@/lib/media/jobs';
import { MediaRequestError, readJsonObject } from '@/lib/media/request';
import { getVideoSessionByToken } from '@/lib/media/sessions';

export async function OPTIONS(request: Request) {
  return corsOptions(request);
}

export async function DELETE(request: Request) {
  try {
    const body = await readJsonObject(request);
    const session = await getVideoSessionByToken(typeof body.token === 'string' ? body.token : '');
    if (!session) return withCors(NextResponse.json({ error: 'upload_not_found' }, { status: 404 }), request);
    const job = await cancelSessionAndQueueCleanup(session.id);
    if (!job) return withCors(NextResponse.json({ error: 'Upload can no longer be cancelled.' }, { status: 409 }), request);
    return withCors(NextResponse.json({ data: { status: 'cancelling' } }), request);
  } catch (error) {
    if (error instanceof MediaRequestError) return withCors(NextResponse.json({ error: error.code }, { status: 400 }), request);
    console.error('[video-delete] failed:', error);
    return withCors(NextResponse.json({ error: 'video_upload_cancel_failed' }, { status: 500 }), request);
  }
}
