import type { Prisma } from '@prisma/client';
import { getReviewImagePublicId, isTrustedReviewImageUrl, parseStoredReviewImages } from '@/lib/review-images';

export type PublicReviewMediaRow = {
  url: string;
  position: number;
};

export type ReviewMediaWriteInput = {
  urls: string[];
  cloudName: string | null;
  storeId: string;
  productId: string;
  reviewId: string;
  visible: boolean;
};

export function buildReviewMediaCreateManyData(input: ReviewMediaWriteInput): Prisma.ReviewMediaCreateManyInput[] {
  return input.urls.flatMap((url, position) => {
    const publicId = getReviewImagePublicId(url, input.cloudName, input.storeId);
    if (!publicId) return [];
    return [{
      reviewId: input.reviewId,
      storeId: input.storeId,
      productId: input.productId,
      url,
      publicId,
      position,
      visible: input.visible,
    }];
  });
}

export function publicImagesFromMediaOrLegacy(
  media: PublicReviewMediaRow[] | null | undefined,
  legacyImages: string | null | undefined,
  cloudName: string | null,
  storeId: string,
): string[] {
  const mediaImages = (media ?? [])
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((item) => item.url)
    .filter((url): url is string => isTrustedReviewImageUrl(url, cloudName, storeId));

  if (mediaImages.length > 0) return mediaImages;
  return parseStoredReviewImages(legacyImages, cloudName, storeId);
}
