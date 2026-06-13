import { NextResponse } from 'next/server';
import { withCors, corsOptions } from '@/lib/cors';
import { getVideoSessionByToken } from '@/lib/media/sessions';

export async function OPTIONS(request: Request) {
  return corsOptions(request);
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token') ?? '';
  const session = await getVideoSessionByToken(token);
  if (!session) return withCors(NextResponse.json({ error: 'Yükleme bulunamadı.' }, { status: 404 }), request);
  const publicStatus = session.status === 'completing' || session.status === 'uploaded' ? 'processing' : session.status;
  return withCors(NextResponse.json({
    data: {
      status: publicStatus,
      errorCode: session.errorCode,
      durationMs: publicStatus === 'ready' ? session.durationMs : null,
      posterUrl: publicStatus === 'ready' ? session.posterUrl : null,
      expiresAt: session.expiresAt.toISOString(),
    },
  }), request);
}
