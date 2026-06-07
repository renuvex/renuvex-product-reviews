import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { getConfiguredCloudinaryCloudName, parseStoredReviewImages } from '@/lib/review-images';
import { applyReviewSummaryVisibilityChange } from '@/lib/review-summary';

const REVIEW_NOT_FOUND = 'review-not-found';

/**
 * Handle GET requests: Fetch reviews for the authenticated merchant (paginated)
 * Query params: page (default 1), limit (default 20), status (optional filter)
 */
export async function GET(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const status = searchParams.get('status') || undefined;
    const skip = (page - 1) * limit;

    const where = {
      storeId: user.merchantId,
      ...(status && { status }),
    };

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.review.count({ where }),
    ]);

    const cloudName = getConfiguredCloudinaryCloudName();
    const sanitizedReviews = reviews.map(review => ({
      ...review,
      images: JSON.stringify(parseStoredReviewImages(review.images, cloudName, review.storeId)),
    }));

    return NextResponse.json({
      data: sanitizedReviews,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * Handle DELETE requests: Delete a review permanently
 */
export async function DELETE(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    try {
      await prisma.$transaction(async (tx) => {
        const existing = await tx.review.findFirst({
          where: { id, storeId: user.merchantId },
        });
        if (!existing) throw new Error(REVIEW_NOT_FOUND);

        await tx.review.delete({
          where: { id },
        });
        await applyReviewSummaryVisibilityChange(tx, existing, null);
      });
      return NextResponse.json({ message: 'Review deleted' });
    } catch (error) {
      if (error instanceof Error && error.message !== REVIEW_NOT_FOUND) {
        console.error('Error deleting review:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
      return NextResponse.json({ error: 'Review not found or unauthorized' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * Handle PUT requests: Update status or merchantReply for a review
 */
export async function PUT(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status, merchantReply } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    // Mağaza yanıtı uzunluk sınırı — DB schema'da @db.VarChar(2000) ile ikinci
    // savunma katmanı var, ama API'da erken hata daha temiz mesaj verir.
    if (typeof merchantReply === 'string' && merchantReply.length > 2000) {
      return NextResponse.json(
        { error: 'Mağaza yanıtı 2000 karakteri aşamaz' },
        { status: 400 }
      );
    }

    try {
      const updatedReview = await prisma.$transaction(async (tx) => {
        const existing = await tx.review.findFirst({
          where: { id, storeId: user.merchantId },
        });
        if (!existing) throw new Error(REVIEW_NOT_FOUND);

        const updated = await tx.review.update({
          where: { id },
          data: {
            ...(status !== undefined && { status }),
            ...(merchantReply !== undefined && { merchantReply }),
          },
        });
        await applyReviewSummaryVisibilityChange(tx, existing, updated);
        return updated;
      });
      return NextResponse.json({ data: updatedReview });
    } catch (error) {
      if (error instanceof Error && error.message !== REVIEW_NOT_FOUND) {
        console.error('Error updating review:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
      return NextResponse.json({ error: 'Review not found or unauthorized' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
