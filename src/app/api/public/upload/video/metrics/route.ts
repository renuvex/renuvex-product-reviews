import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';
import { getClientIp, checkFixedWindowRateLimit } from '@/lib/public-rate-limit';
import { MediaRequestError, readJsonObject } from '@/lib/media/request';
import { getVideoSessionByToken } from '@/lib/media/sessions';

const MAX_TIMING_MS = 60 * 60 * 1000;
const MAX_COUNTER = 10_000;
const MAX_CHUNK_SIZE_KB = 30_720;
const MAX_CHUNK_ATTEMPTS = 8;

function boundedInteger(value: unknown, min: number, max: number): number | null {
  const parsed = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  if (!Number.isFinite(parsed)) return null;
  return Math.min(max, Math.max(min, Math.round(parsed)));
}

function optionalTiming(value: unknown): number | null {
  return boundedInteger(value, 0, MAX_TIMING_MS);
}

function sanitizeStatus(value: unknown): string {
  const raw = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (!/^[a-z_]{1,32}$/.test(raw)) return 'unknown';
  return raw;
}

function sanitizeErrorCode(value: unknown): string | null {
  const raw = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (!raw) return null;
  return /^[a-z0-9_.:-]{1,128}$/.test(raw) ? raw : 'invalid_error_code';
}

export async function OPTIONS(request: Request) {
  return corsOptions(request);
}

export async function POST(request: Request) {
  try {
    const ipHash = createHash('sha256').update(getClientIp(request)).digest('hex').slice(0, 32);
    const rate = await checkFixedWindowRateLimit({
      key: `renuvex_pr_video_metrics:${ipHash}`,
      max: 60,
      windowSec: 10 * 60,
      label: 'video-upload-metrics',
    });
    if (!rate.allowed) {
      const response = NextResponse.json({ error: 'rate_limited' }, { status: 429 });
      response.headers.set('Retry-After', String(rate.retryAfterSec));
      return withCors(response, request);
    }

    const body = await readJsonObject(request);
    const session = await getVideoSessionByToken(typeof body.token === 'string' ? body.token : '');
    if (!session) return withCors(NextResponse.json({ error: 'upload_not_found' }, { status: 404 }), request);

    const chunkSizeKb = boundedInteger(body.chunkSizeKb, 0, MAX_CHUNK_SIZE_KB) ?? 0;
    const chunkAttempts = boundedInteger(body.chunkAttempts, 0, MAX_CHUNK_ATTEMPTS) ?? 0;
    const retryClicks = boundedInteger(body.retryClicks, 0, MAX_COUNTER) ?? 0;
    const upchunkErrors = boundedInteger(body.upchunkErrors, 0, MAX_COUNTER) ?? 0;

    await prisma.videoUploadPerformanceSample.upsert({
      where: { uploadSessionId: session.id },
      create: {
        uploadSessionId: session.id,
        storeId: session.storeId,
        productId: session.productId,
        provider: session.provider || 'mux',
        fileBytes: session.bytes,
        chunkSizeKb,
        chunkAttempts,
        retryClicks,
        upchunkErrors,
        firstErrorCode: sanitizeErrorCode(body.firstErrorCode),
        directUploadMs: optionalTiming(body.directUploadMs),
        completeMs: optionalTiming(body.completeMs),
        processingPollMs: optionalTiming(body.processingPollMs),
        totalClientMs: optionalTiming(body.totalClientMs),
        finalStatus: sanitizeStatus(body.finalStatus),
      },
      update: {
        chunkSizeKb,
        chunkAttempts,
        retryClicks,
        upchunkErrors,
        firstErrorCode: sanitizeErrorCode(body.firstErrorCode),
        directUploadMs: optionalTiming(body.directUploadMs),
        completeMs: optionalTiming(body.completeMs),
        processingPollMs: optionalTiming(body.processingPollMs),
        totalClientMs: optionalTiming(body.totalClientMs),
        finalStatus: sanitizeStatus(body.finalStatus),
      },
    });

    return withCors(NextResponse.json({ data: { status: 'recorded' } }, { status: 202 }), request);
  } catch (error) {
    if (error instanceof MediaRequestError) return withCors(NextResponse.json({ error: error.code }, { status: 400 }), request);
    Sentry.captureException(error, { tags: { source: 'media-metrics', task: 'video-upload-metrics' } });
    console.error('[video-metrics] failed:', error);
    return withCors(NextResponse.json({ error: 'video_metrics_failed' }, { status: 500 }), request);
  }
}
