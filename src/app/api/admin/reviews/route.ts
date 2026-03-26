import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth-helpers';

/**
 * Handle GET requests: Fetch all reviews for the authenticated merchant
 */
export async function GET(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const reviews = await prisma.review.findMany({
      where: { storeId: user.merchantId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
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

    // Verify the review belongs to the authenticated merchant
    const existingReview = await prisma.review.findUnique({ where: { id } });
    if (!existingReview || existingReview.storeId !== user.merchantId) {
      return NextResponse.json({ error: 'Review not found or unauthorized' }, { status: 404 });
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(merchantReply !== undefined && { merchantReply }),
      },
    });

    return NextResponse.json({ data: updatedReview });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
