import { NextResponse } from 'next/server';
import { withCors, corsOptions } from '@/lib/cors';
import { getVideoSessionByToken } from '@/lib/media/sessions';

export async function OPTIONS(request: Request) {
  return corsOptions(request);
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token') ?? '';
  const session = await getVideoSessionByToken(token);
  if (!session) return withCors(NextResponse.json({ error: 'upload_not_found' }, { status: 404 }), request);
  const publicStatus = session.status === 'completing' || session.status === 'uploaded' ? 'processing' : session.status;
  return withCors(NextResponse.json({
    data: {
      status: publicStatus,
      errorCode: session.errorCode,
      durationMs: publicStatus === 'ready' ? session.durationMs : null,
      // Do not expose pending/admin signed playback IDs through the public upload
      // status API. The widget keeps its local preview until the review is saved.
      posterUrl: null,
      expiresAt: session.expiresAt.toISOString(),
    },
  }), request);
}
