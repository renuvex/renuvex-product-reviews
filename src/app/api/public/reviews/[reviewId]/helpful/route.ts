import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptions();
}

/**
 * POST: helpfulCount +1
 */
export async function POST(
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
      select: { id: true },
    });
    if (!review) {
      return withCors(NextResponse.json({ error: 'Yorum bulunamadı.' }, { status: 404 }));
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
