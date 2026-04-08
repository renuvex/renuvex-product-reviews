import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptions();
}

/**
 * POST: Yorumu faydalı olarak işaretle
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
    // Yorum var mı ve approved mi kontrol et
    const review = await prisma.review.findFirst({
      where: { id: reviewId, status: 'approved' },
      select: { id: true },
    });
    if (!review) {
      return withCors(NextResponse.json({ error: 'Yorum bulunamadı.' }, { status: 404 }));
    }

    // Zaten oylamış mı?
    const existing = await prisma.reviewHelpful.findUnique({
      where: { reviewId_ip: { reviewId, ip } },
    });
    if (existing) {
      return withCors(NextResponse.json({ error: 'Zaten oyladınız.' }, { status: 409 }));
    }

    // Kaydet + sayacı artır (transaction)
    const [, updatedReview] = await prisma.$transaction([
      prisma.reviewHelpful.create({ data: { reviewId, ip } }),
      prisma.review.update({
        where: { id: reviewId },
        data: { helpfulCount: { increment: 1 } },
        select: { helpfulCount: true },
      }),
    ]);

    return withCors(NextResponse.json({ helpfulCount: updatedReview.helpfulCount }, { status: 201 }));
  } catch (error: any) {
    console.error('[POST] Helpful ERROR:', error);
    return withCors(NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 }));
  }
}

/**
 * DELETE: Faydalı oyunu geri al
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const { reviewId } = await params;

  if (!reviewId) {
    return withCors(NextResponse.json({ error: 'Geçersiz yorum ID.' }, { status: 400 }));
  }

  try {
    const existing = await prisma.reviewHelpful.findUnique({
      where: { reviewId_ip: { reviewId, ip } },
    });
    if (!existing) {
      return withCors(NextResponse.json({ error: 'Oy bulunamadı.' }, { status: 404 }));
    }

    // Sil + sayacı azalt (transaction, 0'ın altına düşmesini engelle)
    const [, updatedReview] = await prisma.$transaction([
      prisma.reviewHelpful.delete({ where: { reviewId_ip: { reviewId, ip } } }),
      prisma.review.update({
        where: { id: reviewId },
        data: { helpfulCount: { decrement: 1 } },
        select: { helpfulCount: true },
      }),
    ]);
    // Sayaç 0'ın altına düştüyse sıfırla (tutarsızlık güvencesi)
    let finalCount = updatedReview.helpfulCount;
    if (finalCount < 0) {
      await prisma.review.update({ where: { id: reviewId }, data: { helpfulCount: 0 } });
      finalCount = 0;
    }

    return withCors(NextResponse.json({ helpfulCount: finalCount }));
  } catch (error: any) {
    console.error('[DELETE] Helpful ERROR:', error);
    return withCors(NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 }));
  }
}
