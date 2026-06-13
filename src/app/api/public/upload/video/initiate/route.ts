import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';
import { getClientIp, checkFixedWindowRateLimit } from '@/lib/public-rate-limit';
import { getVideoFeatureAccess, verifyVideoReviewTarget } from '@/lib/media/access';
import { getQStashMediaConfig, getR2MediaConfig, getStreamMediaConfig, MediaConfigError } from '@/lib/media/config';
import { createVideoMultipartUpload } from '@/lib/media/providers/r2';
import { failSessionAndQueueCleanup } from '@/lib/media/jobs';
import { createReservedVideoSession, VideoQuotaError } from '@/lib/media/sessions';
import { partitionVideoBytes, validateVideoUploadInput } from '@/lib/media/video-policy';

export async function OPTIONS(request: Request) {
  return corsOptions(request);
}

export async function POST(request: Request) {
  let createdSessionId: string | null = null;
  let createdUploadId: string | null = null;
  try {
    const body = await request.json() as Record<string, unknown>;
    const storeId = typeof body.storeId === 'string' ? body.storeId.trim().slice(0, 128) : '';
    const productId = typeof body.productId === 'string' ? body.productId.trim().slice(0, 128) : '';
    if (!storeId || !productId) return withCors(NextResponse.json({ error: 'Eksik parametre.' }, { status: 400 }), request);
    const upload = validateVideoUploadInput({ mimeType: body.mimeType, bytes: body.bytes });
    if (!upload.ok) return withCors(NextResponse.json({ error: upload.code }, { status: 400 }), request);

    const ipHash = createHash('sha256').update(getClientIp(request)).digest('hex').slice(0, 32);
    const rate = await checkFixedWindowRateLimit({
      key: `renuvex_pr_video_init:${ipHash}`,
      max: 10,
      windowSec: 10 * 60,
      label: 'video-upload-initiate',
    });
    if (!rate.allowed) return withCors(NextResponse.json({ error: 'Çok fazla video yükleme denemesi.' }, { status: 429 }), request);

    const [access, target] = await Promise.all([getVideoFeatureAccess(storeId), verifyVideoReviewTarget(storeId, productId)]);
    if (!access.enabled) return withCors(NextResponse.json({ error: 'Video yükleme bu mağaza için kullanılamıyor.' }, { status: 403 }), request);
    if (!target) return withCors(NextResponse.json({ error: 'Ürün doğrulanamadı.' }, { status: 400 }), request);

    // Fail closed before reserving quota when provider/job configuration is incomplete.
    getR2MediaConfig();
    getStreamMediaConfig();
    getQStashMediaConfig();

    const { session, token } = await createReservedVideoSession({
      storeId,
      productId,
      mimeType: upload.mimeType,
      bytes: upload.bytes,
      fileFingerprint: typeof body.fileFingerprint === 'string' ? body.fileFingerprint : null,
      monthlyLimit: access.monthlyLimit,
    });
    createdSessionId = session.id;
    const uploadId = await createVideoMultipartUpload(session.masterObjectKey, session.mimeType);
    createdUploadId = uploadId;
    await prisma.videoUploadSession.update({ where: { id: session.id }, data: { status: 'uploading', r2UploadId: uploadId } });
    return withCors(NextResponse.json({
      data: {
        token,
        partSize: 10 * 1024 * 1024,
        partCount: partitionVideoBytes(session.bytes).length,
        maxParallelParts: 3,
        expiresAt: session.expiresAt.toISOString(),
      },
    }, { status: 201 }), request);
  } catch (error) {
    if (createdSessionId) {
      try {
        await failSessionAndQueueCleanup(createdSessionId, 'initiate_failed', { r2UploadId: createdUploadId });
      } catch (cleanupError) {
        console.error('[video-initiate] failed to persist cleanup outbox:', cleanupError);
      }
    }
    if (error instanceof VideoQuotaError) return withCors(NextResponse.json({ error: 'Aylık video kotası doldu.' }, { status: 429 }), request);
    if (error instanceof MediaConfigError) {
      console.error('[video-initiate] provider configuration is incomplete:', error.code);
      return withCors(NextResponse.json({ error: 'Video yükleme geçici olarak kullanılamıyor.' }, { status: 503 }), request);
    }
    console.error('[video-initiate] failed:', error);
    return withCors(NextResponse.json({ error: 'Video yükleme başlatılamadı.' }, { status: 500 }), request);
  }
}
