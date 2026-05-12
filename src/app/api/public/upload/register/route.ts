import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { prisma } from '@/lib/prisma';
import { Redis } from '@upstash/redis';
import { withCors, corsOptions } from '@/lib/cors';
import {
  getConfiguredCloudinaryCloudName,
  getReviewImagePublicId,
  isTrustedReviewImageUrl,
} from '@/lib/review-images';

// Registry endpoint for review-image uploads.
//
// Lifecycle (see ADR_0012):
//   1. Widget signs an upload via /api/public/upload/sign and uploads directly
//      to Cloudinary.
//   2. On successful upload, widget posts {secureUrl} here.
//   3. We extract publicId from the URL and create (or refresh) a
//      PendingReviewImage row.
//   4. /api/public/reviews POST atomically deletes pending rows for the
//      publicIds it commits.
//   5. /api/admin/cleanup-pending-uploads cron expires rows older than the
//      retention window and deletes the Cloudinary asset.
//
// Validation:
//   - URL must pass isTrustedReviewImageUrl (same guard the review submit
//     path uses) so we never register a public_id outside our trusted folder.
//   - Idempotent on publicId — repeated registers (e.g., retries) keep the
//     same row, the createdAt is not reset on conflict.
//   - Rate-limited per IP, same shape as the sign endpoint.

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const REGISTER_RATE_LIMIT_MAX = 30;
const REGISTER_RATE_LIMIT_WINDOW_SEC = 10 * 60;

function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 32);
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rlKey = `ikr_upload_reg_rl:${ip}`;
    const count = await redis.incr(rlKey);
    if (count === 1) await redis.expire(rlKey, REGISTER_RATE_LIMIT_WINDOW_SEC);
    if (count > REGISTER_RATE_LIMIT_MAX) {
      return withCors(NextResponse.json({ error: 'Çok fazla istek. Lütfen bekleyin.' }, { status: 429 }));
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return withCors(NextResponse.json({ error: 'Geçersiz istek gövdesi.' }, { status: 400 }));
    }

    const secureUrl = (body as { secureUrl?: unknown })?.secureUrl;
    const cloudName = getConfiguredCloudinaryCloudName();
    if (!isTrustedReviewImageUrl(secureUrl, cloudName)) {
      return withCors(NextResponse.json({ error: 'Geçersiz görsel URL.' }, { status: 400 }));
    }

    const publicId = getReviewImagePublicId(secureUrl, cloudName);
    if (!publicId) {
      return withCors(NextResponse.json({ error: 'Public ID çözümlenemedi.' }, { status: 400 }));
    }

    await prisma.pendingReviewImage.upsert({
      where: { publicId },
      update: {}, // do not reset createdAt on retry — keeps cleanup deterministic
      create: { publicId, ipHash: hashIp(ip) },
    });

    return withCors(NextResponse.json({ ok: true }));
  } catch (error) {
    console.error('[upload/register] ERROR:', error);
    return withCors(NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return corsOptions();
}
