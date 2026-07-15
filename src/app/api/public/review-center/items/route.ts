import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import {
  assertReviewRequestPublicHost,
  clearReviewRequestSessionCookie,
  getReviewRequestSessionCookie,
  ReviewRequestHostError,
} from '@/lib/review-email/public-access';
import { resolveActiveReviewCenterSession, ReviewRequestTokenError } from '@/lib/review-email/tokens';
import { reviewCenterRateLimit, secureReviewCenterResponse } from '@/lib/review-email/review-center-http';

type ItemCursor = { position: number; id: string };

function decodeCursor(value: string | null): ItemCursor | null {
  if (!value || value.length > 512) return null;
  try {
    const parsed = JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as Partial<ItemCursor>;
    return Number.isInteger(parsed.position) && typeof parsed.id === 'string' && parsed.id.length <= 64
      ? { position: parsed.position!, id: parsed.id }
      : null;
  } catch {
    return null;
  }
}

function encodeCursor(value: ItemCursor): string {
  return Buffer.from(JSON.stringify(value), 'utf8').toString('base64url');
}

export async function GET(request: NextRequest) {
  try {
    assertReviewRequestPublicHost(request);
    if (!isReviewEmailEnabled()) return secureReviewCenterResponse(NextResponse.json({ error: 'not_found' }, { status: 404 }));
    const limited = await reviewCenterRateLimit(request, 'items', 60);
    if (limited) return limited;
    const session = await resolveActiveReviewCenterSession(prisma, getReviewRequestSessionCookie(request));
    const url = new URL(request.url);
    const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || 20, 1), 50);
    const cursor = decodeCursor(url.searchParams.get('cursor'));
    const rows = await prisma.reviewRequest.findMany({
      where: {
        batchId: session.batchId,
        ...(cursor ? {
          OR: [
            { batchPosition: { gt: cursor.position } },
            { batchPosition: cursor.position, id: { gt: cursor.id } },
          ],
        } : {}),
      },
      orderBy: [{ batchPosition: 'asc' }, { id: 'asc' }],
      take: limit + 1,
      include: { orderLineSnapshot: true },
    });
    const hasNext = rows.length > limit;
    const page = rows.slice(0, limit);
    const last = page.at(-1);
    const [totalCount, remainingCount, products] = await Promise.all([
      prisma.reviewRequest.count({ where: { batchId: session.batchId } }),
      prisma.reviewRequest.count({
        where: { batchId: session.batchId, status: { in: ['scheduled', 'sending', 'sent', 'sent_unknown', 'error'] } },
      }),
      prisma.productSnapshot.findMany({
        where: {
          storeId: session.batch.storeId,
          productId: { in: [...new Set(page.map((item) => item.productId))] },
        },
        select: { productId: true, name: true },
      }),
    ]);
    const productNames = new Map(products.map((product) => [product.productId, product.name]));
    return secureReviewCenterResponse(NextResponse.json({
      data: {
        items: page.map((item) => ({
          itemId: item.id,
          productId: item.productId,
          productName: item.orderLineSnapshot.productName ?? productNames.get(item.productId) ?? null,
          variantName: item.orderLineSnapshot.variantName,
          status: item.status,
          canSubmit: ['sending', 'sent', 'sent_unknown'].includes(item.status),
        })),
        totalCount,
        remainingCount,
        nextCursor: hasNext && last ? encodeCursor({ position: last.batchPosition ?? 0, id: last.id }) : null,
      },
    }));
  } catch (error) {
    const response = error instanceof ReviewRequestHostError
      ? NextResponse.json({ error: error.code }, { status: error.status })
      : error instanceof ReviewRequestTokenError
        ? NextResponse.json({ error: error.code }, { status: error.status })
        : NextResponse.json({ error: 'review_center_items_failed' }, { status: 500 });
    if (error instanceof ReviewRequestTokenError) clearReviewRequestSessionCookie(response);
    return secureReviewCenterResponse(response);
  }
}
