import { NextResponse } from 'next/server';
import { withCors, corsOptions } from '@/lib/cors';
import { partitionVideoBytes } from '@/lib/media/video-policy';
import { getVideoSessionByToken } from '@/lib/media/sessions';
import { listVideoUploadParts, signVideoUploadParts } from '@/lib/media/providers/r2';

export async function OPTIONS(request: Request) {
  return corsOptions(request);
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const session = await getVideoSessionByToken(typeof body.token === 'string' ? body.token : '');
    if (!session || !session.r2UploadId || session.expiresAt <= new Date()) {
      return withCors(NextResponse.json({ error: 'Geçersiz veya süresi dolmuş yükleme.' }, { status: 404 }), request);
    }
    if (!['uploading', 'initiated'].includes(session.status)) {
      return withCors(NextResponse.json({ error: 'Yükleme bu durumda devam ettirilemez.' }, { status: 409 }), request);
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
    console.error('[video-parts] failed:', error);
    return withCors(NextResponse.json({ error: 'Video parçaları hazırlanamadı.' }, { status: 500 }), request);
  }
}
