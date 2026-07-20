import { describe, expect, it, vi } from 'vitest';
import { submitReviewCenterItem } from '@/lib/review-email/review-center-submit';

describe('review center submit scope', () => {
  it('scopes an idempotent existing-review lookup to the active batch', async () => {
    const tx = {
      review: {
        findFirst: vi.fn().mockResolvedValue({
          id: 'review-1',
          reviewRequest: { batch: { status: 'active' } },
        }),
      },
    };
    const db = {
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    await expect(submitReviewCenterItem(db as never, {
      sessionId: 'session-1',
      tokenId: 'token-1',
      batchId: 'batch-1',
      requestId: 'request-1',
      rating: 5,
      title: null,
      comment: 'Useful product.',
      author: 'Customer',
      images: [],
      videoToken: null,
    })).resolves.toEqual({
      state: 'already_submitted',
      reviewId: 'review-1',
      batchCompleted: false,
    });

    expect(tx.review.findFirst).toHaveBeenCalledWith({
      where: {
        reviewRequestId: 'request-1',
        reviewRequest: { is: { batchId: 'batch-1' } },
      },
      select: {
        id: true,
        reviewRequest: { select: { batch: { select: { status: true } } } },
      },
    });
  });
});
