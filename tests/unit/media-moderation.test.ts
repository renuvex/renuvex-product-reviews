import type { Review } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import { matchesVideoModerationIntent } from '@/lib/media/moderation-intent';
import { requestVideoApproval, VideoModerationError } from '@/lib/media/moderation';

const summaryMock = vi.hoisted(() => ({ applyReviewSummaryVisibilityChange: vi.fn() }));
vi.mock('@/lib/review-summary', () => summaryMock);

function review(overrides: Partial<Review> = {}): Review {
  return {
    id: 'review-1',
    storeId: 'store-1',
    productId: 'product-1',
    rating: 5,
    comment: 'Great',
    author: 'Mert',
    email: '',
    status: 'pending',
    reviewRequestId: null,
    reviewRequestReceiptId: null,
    verifiedBuyer: false,
    verifiedAt: null,
    verificationSource: null,
    merchantReply: null,
    images: null,
    hasImages: false,
    hasVideo: true,
    moderationVersion: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    productName: 'Product',
    slug: 'product',
    title: null,
    ...overrides,
  };
}

describe('video moderation intent', () => {
  it('matches only the current status and monotonically increasing version', () => {
    expect(matchesVideoModerationIntent({ status: 'pending', moderationVersion: 3 }, 'pending', 3)).toBe(true);
    expect(matchesVideoModerationIntent({ status: 'rejected', moderationVersion: 3 }, 'pending', 3)).toBe(false);
    expect(matchesVideoModerationIntent({ status: 'pending', moderationVersion: 4 }, 'pending', 3)).toBe(false);
  });

  it('queues approval with the next version and keeps the review hidden until provider success', async () => {
    const update = vi.fn().mockResolvedValue(review({ moderationVersion: 3 }));
    const updateMany = vi.fn().mockResolvedValue({ count: 1 });
    const upsert = vi.fn().mockResolvedValue({ id: 'job-1' });
    const tx = {
      review: { update },
      reviewMedia: { updateMany },
      mediaProviderJob: { upsert },
    };

    const result = await requestVideoApproval(tx as never, review(), [{
      id: 'media-1',
      providerAssetId: 'asset-1',
      processingStatus: 'ready',
    }], undefined);

    expect(result.processing).toBe(true);
    expect(update).toHaveBeenCalledWith({
      where: { id: 'review-1' },
      data: { status: 'pending', moderationVersion: { increment: 1 } },
    });
    expect(updateMany).toHaveBeenCalledWith({
      where: { reviewId: 'review-1', resourceType: 'video' },
      data: { visible: false },
    });
    expect(upsert).toHaveBeenCalledWith(expect.objectContaining({
      where: { dedupeKey: 'publish-video:review-1:media-1:v3' },
      create: expect.objectContaining({
        payload: expect.objectContaining({ moderationVersion: 3, providerAssetId: 'asset-1' }),
      }),
    }));
  });

  it('refuses approval while provider processing is incomplete', async () => {
    const tx = { review: { update: vi.fn() }, reviewMedia: { updateMany: vi.fn() }, mediaProviderJob: { upsert: vi.fn() } };
    await expect(requestVideoApproval(tx as never, review(), [{
      id: 'media-1',
      providerAssetId: 'asset-1',
      processingStatus: 'pending',
    }], undefined)).rejects.toEqual(expect.objectContaining<Partial<VideoModerationError>>({ code: 'video_not_ready' }));
  });

  it('uses the database-returned moderation version for concurrent decisions', async () => {
    const update = vi.fn().mockResolvedValue(review({ moderationVersion: 4 }));
    const upsert = vi.fn().mockResolvedValue({ id: 'job-1' });
    const tx = {
      review: { update },
      reviewMedia: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      mediaProviderJob: { upsert },
    };

    await requestVideoApproval(tx as never, review({ moderationVersion: 2 }), [{
      id: 'media-1',
      providerAssetId: 'asset-1',
      processingStatus: 'ready',
    }], undefined);

    expect(upsert).toHaveBeenCalledWith(expect.objectContaining({
      where: { dedupeKey: 'publish-video:review-1:media-1:v4' },
      create: expect.objectContaining({ payload: expect.objectContaining({ moderationVersion: 4 }) }),
    }));
  });

  it('removes an already-approved review from the summary while provider publication is pending', async () => {
    const existing = review({ status: 'approved', moderationVersion: 4 });
    const updated = review({ status: 'pending', moderationVersion: 5 });
    const tx = {
      review: { update: vi.fn().mockResolvedValue(updated) },
      reviewMedia: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      mediaProviderJob: { upsert: vi.fn().mockResolvedValue({ id: 'job-1' }) },
    };

    await requestVideoApproval(tx as never, existing, [{
      id: 'media-1',
      providerAssetId: 'asset-1',
      processingStatus: 'ready',
    }], undefined);

    expect(summaryMock.applyReviewSummaryVisibilityChange).toHaveBeenCalledWith(tx, existing, updated);
  });
});
