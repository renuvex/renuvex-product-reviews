import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_SEC = 24 * 60 * 60; // 24 saat

async function checkRateLimit(ip: string, reviewId: string): Promise<boolean> {
  const key = `ikr_hl:${ip}:${reviewId}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RATE_LIMIT_WINDOW_SEC);
  return count <= RATE_LIMIT_MAX;
}

export async function OPTIONS() {
  return corsOptions();
}

/**
 * POST: helpfulCount +1
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const { reviewId } = await params;

  if (!reviewId) {
    return withCors(NextResponse.json({ error: 'Geçersiz yorum ID.' }, { status: 400 }));
  }

  try {
    const review = await prisma.review.findFirst({
      where: { id: reviewId, status: 'approved' },
      select: { id: true },
    });
    if (!review) {
      return withCors(NextResponse.json({ error: 'Yorum bulunamadı.' }, { status: 404 }));
    }

    if (!await checkRateLimit(ip, reviewId)) {
      return withCors(NextResponse.json({ error: 'Limit aşıldı.' }, { status: 429 }));
    }

    const updated = await prisma.review.update({
      where: { id: reviewId },
      data: { helpfulCount: { increment: 1 } },
      select: { helpfulCount: true },
    });

    return withCors(NextResponse.json({ helpfulCount: updated.helpfulCount }, { status: 201 }));
  } catch (error: any) {
    console.error('[POST] Helpful ERROR:', error);
    return withCors(NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 }));
  }
}

/**
 * DELETE: helpfulCount -1 (min 0)
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const { reviewId } = await params;

  if (!reviewId) {
    return withCors(NextResponse.json({ error: 'Geçersiz yorum ID.' }, { status: 400 }));
  }

  try {
    const review = await prisma.review.findFirst({
      where: { id: reviewId, status: 'approved' },
      select: { id: true, helpfulCount: true },
    });
    if (!review) {
      return withCors(NextResponse.json({ error: 'Yorum bulunamadı.' }, { status: 404 }));
    }

    const newCount = Math.max(review.helpfulCount - 1, 0);
    const updated = await prisma.review.update({
      where: { id: reviewId },
      data: { helpfulCount: newCount },
      select: { helpfulCount: true },
    });

    return withCors(NextResponse.json({ helpfulCount: updated.helpfulCount }));
  } catch (error: any) {
    console.error('[DELETE] Helpful ERROR:', error);
    return withCors(NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 }));
  }
}
