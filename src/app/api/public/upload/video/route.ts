import { NextResponse } from 'next/server';
import { withCors, corsOptions } from '@/lib/cors';
import { cancelSessionAndQueueCleanup } from '@/lib/media/jobs';
import { getVideoSessionByToken } from '@/lib/media/sessions';

export async function OPTIONS(request: Request) {
  return corsOptions(request);
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const session = await getVideoSessionByToken(typeof body.token === 'string' ? body.token : '');
    if (!session) return withCors(NextResponse.json({ error: 'Yükleme bulunamadı.' }, { status: 404 }), request);
    const job = await cancelSessionAndQueueCleanup(session.id);
    if (!job) return withCors(NextResponse.json({ error: 'Upload can no longer be cancelled.' }, { status: 409 }), request);
    return withCors(NextResponse.json({ data: { status: 'cancelling' } }), request);
  } catch (error) {
    console.error('[video-delete] failed:', error);
    return withCors(NextResponse.json({ error: 'Video yükleme iptal edilemedi.' }, { status: 500 }), request);
  }
}
