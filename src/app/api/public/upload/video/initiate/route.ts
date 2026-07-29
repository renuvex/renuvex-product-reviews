import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '@/lib/prisma';
import { anonymousPublicCorsOptions, withAnonymousPublicCors } from '@/lib/cors';
import { getClientIp, checkFixedWindowRateLimit } from '@/lib/public-rate-limit';
import { getVideoFeatureAccess, verifyVideoReviewTarget } from '@/lib/media/access';
import { getMuxApiConfig, getMuxVideoQuality, getQStashMediaConfig, getVideoUploadClientConfig, MediaConfigError } from '@/lib/media/config';
import { createMuxDirectUpload } from '@/lib/media/providers/mux';
import { dispatchMediaProviderJob, failSessionAndQueueCleanup } from '@/lib/media/jobs';
import { MediaRequestError, readJsonObject } from '@/lib/media/request';
import { createReservedVideoSession, VideoQuotaError } from '@/lib/media/sessions';
import { validateVideoUploadInput } from '@/lib/media/video-policy';
import { resolveReviewCenterItemScope } from '@/lib/review-email/review-center-scope';
import { ReviewRequestTokenError } from '@/lib/review-email/tokens';
import { ReviewRequestHostError } from '@/lib/review-email/public-access';

function muxCorsOrigin(request: Request): string {
  const origin = request.headers.get('origin')?.trim();
  if (origin) {
    const parsed = new URL(origin);
    return parsed.origin;
  }
  const fallback = process.env.STOREFRONT_WIDGET_BASE_URL || process.env.NEXT_PUBLIC_DEPLOY_URL || '';
  if (!fallback) throw new MediaConfigError('missing_config', 'STOREFRONT_WIDGET_BASE_URL is not configured');
  return new URL(fallback).origin;
}

export async function OPTIONS() {
  return anonymousPublicCorsOptions(['POST']);
}

export async function POST(request: Request) {
  let createdSessionId: string | null = null;
  let createdUploadId: string | null = null;
  try {
    const body = await readJsonObject(request);
    const scope = await resolveReviewCenterItemScope(prisma, request, body.itemId);
    const storeId = scope?.storeId ?? (typeof body.storeId === 'string' ? body.storeId.trim().slice(0, 128) : '');
    const productId = scope?.productId ?? (typeof body.productId === 'string' ? body.productId.trim().slice(0, 128) : '');
    if (!storeId || !productId) return withAnonymousPublicCors(NextResponse.json({ error: 'missing_parameters' }, { status: 400 }));
    const upload = validateVideoUploadInput({ mimeType: body.mimeType, bytes: body.bytes });
    if (!upload.ok) return withAnonymousPublicCors(NextResponse.json({ error: upload.code }, { status: 400 }));

    const ipHash = createHash('sha256').update(getClientIp(request)).digest('hex').slice(0, 32);
    const rate = await checkFixedWindowRateLimit({
      key: `renuvex_pr_video_init:${ipHash}`,
      max: 10,
      windowSec: 10 * 60,
      label: 'video-upload-initiate',
    });
    if (!rate.allowed) {
      const response = NextResponse.json({ error: 'rate_limited' }, { status: 429 });
      response.headers.set('Retry-After', String(rate.retryAfterSec));
      return withAnonymousPublicCors(response);
    }

    const [access, target] = await Promise.all([getVideoFeatureAccess(storeId), verifyVideoReviewTarget(storeId, productId)]);
    if (!access.enabled) {
      if (access.reason === 'quota_exceeded') {
        return withAnonymousPublicCors(NextResponse.json({ error: 'video_quota_exceeded' }, { status: 429 }));
      }
      if (access.reason === 'provider_unavailable') {
        return withAnonymousPublicCors(NextResponse.json({ error: 'video_provider_unavailable' }, { status: 503 }));
      }
      return withAnonymousPublicCors(NextResponse.json({ error: 'video_upload_disabled' }, { status: 403 }));
    }
    if (!target) return withAnonymousPublicCors(NextResponse.json({ error: 'invalid_product' }, { status: 400 }));

    // Fail closed before reserving quota when provider/job configuration is incomplete.
    getMuxApiConfig();
    const videoQuality = getMuxVideoQuality();
    const uploadClient = getVideoUploadClientConfig();
    getQStashMediaConfig();

    const { session, token, expiryJob } = await createReservedVideoSession({
      storeId,
      productId,
      mimeType: upload.mimeType,
      bytes: upload.bytes,
      fileFingerprint: typeof body.fileFingerprint === 'string' ? body.fileFingerprint : null,
      reviewRequestId: scope?.requestId ?? null,
      reviewRequestSessionId: scope?.sessionId ?? null,
      monthlyLimit: access.monthlyLimit,
    });
    createdSessionId = session.id;
    const muxUpload = await createMuxDirectUpload({
      corsOrigin: muxCorsOrigin(request),
      passthrough: session.id,
      videoQuality,
    });
    if (!muxUpload.id || !muxUpload.url) throw new Error('mux_direct_upload_incomplete');
    createdUploadId = muxUpload.id;
    await prisma.videoUploadSession.update({
      where: { id: session.id },
      data: { status: 'uploading', providerUploadId: muxUpload.id },
    });
    await dispatchMediaProviderJob(
      expiryJob.id,
      Math.max(1, Math.ceil((session.expiresAt.getTime() - Date.now()) / 1000)),
    );
    return withAnonymousPublicCors(NextResponse.json({
      data: {
        token,
        uploadUrl: muxUpload.url,
        chunkSize: uploadClient.chunkSizeKb,
        chunkAttempts: uploadClient.chunkAttempts,
        expiresAt: session.expiresAt.toISOString(),
      },
    }, { status: 201 }));
  } catch (error) {
    if (createdSessionId) {
      try {
        await failSessionAndQueueCleanup(createdSessionId, 'initiate_failed', { providerUploadId: createdUploadId });
      } catch (cleanupError) {
        console.error('[video-initiate] failed to persist cleanup outbox:', cleanupError);
      }
    }
    if (error instanceof MediaRequestError) return withAnonymousPublicCors(NextResponse.json({ error: error.code }, { status: 400 }));
    if (error instanceof ReviewRequestHostError || error instanceof ReviewRequestTokenError) {
      return withAnonymousPublicCors(NextResponse.json({ error: error.code }, { status: error.status }));
    }
    if (error instanceof VideoQuotaError) return withAnonymousPublicCors(NextResponse.json({ error: 'video_quota_exceeded' }, { status: 429 }));
    if (error instanceof MediaConfigError) {
      console.error('[video-initiate] provider configuration is incomplete:', error.code);
      return withAnonymousPublicCors(NextResponse.json({ error: 'video_provider_unavailable' }, { status: 503 }));
    }
    Sentry.captureException(error, { tags: { source: 'media-job', task: 'video-initiate' } });
    console.error('[video-initiate] failed:', error);
    return withAnonymousPublicCors(NextResponse.json({ error: 'video_upload_initiate_failed' }, { status: 500 }));
  }
}
