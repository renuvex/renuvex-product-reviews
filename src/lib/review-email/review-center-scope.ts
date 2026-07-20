import type { PrismaClient } from '@prisma/client';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import {
  assertReviewRequestSameOrigin,
  getReviewRequestSessionCookie,
  isReviewRequestPublicHost,
} from '@/lib/review-email/public-access';
import { resolveActiveReviewCenterSession, ReviewRequestTokenError } from '@/lib/review-email/tokens';

const ITEM_ID_PATTERN = /^[0-9a-f-]{36}$/i;
const ACTIVE_ITEM_STATUSES = ['sending', 'sent', 'sent_unknown'] as const;

export type ReviewCenterItemScope = {
  sessionId: string;
  tokenId: string;
  batchId: string;
  storeId: string;
  requestId: string;
  productId: string;
};

export async function resolveReviewCenterItemScope(
  db: Pick<PrismaClient, 'reviewRequestSession'>,
  request: Request,
  itemId: unknown,
): Promise<ReviewCenterItemScope | null> {
  if (!isReviewRequestPublicHost(request)) return null;
  const hostname = request.headers.get('host')?.split(':')[0]?.toLowerCase() ?? '';
  if (
    typeof itemId !== 'string' &&
    process.env.NODE_ENV !== 'production' &&
    ['localhost', '127.0.0.1', '[::1]'].includes(hostname)
  ) {
    return null;
  }
  assertReviewRequestSameOrigin(request);
  if (!isReviewEmailEnabled()) throw new ReviewRequestTokenError('review_center_not_found', undefined, 404);
  if (typeof itemId !== 'string' || !ITEM_ID_PATTERN.test(itemId)) {
    throw new ReviewRequestTokenError('review_center_item_not_found', undefined, 404);
  }
  const session = await resolveActiveReviewCenterSession(db, getReviewRequestSessionCookie(request));
  const item = session.batch.requests.find((candidate) => candidate.id === itemId);
  if (!item || !ACTIVE_ITEM_STATUSES.includes(item.status as (typeof ACTIVE_ITEM_STATUSES)[number])) {
    throw new ReviewRequestTokenError('review_center_item_not_submittable', undefined, 409);
  }
  return {
    sessionId: session.id,
    tokenId: session.tokenId,
    batchId: session.batch.id,
    storeId: session.batch.storeId,
    requestId: item.id,
    productId: item.productId,
  };
}
