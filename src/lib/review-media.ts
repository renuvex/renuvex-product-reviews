import type { Prisma } from '@prisma/client';
import { buildReviewImageThumbnailUrl, getReviewImagePublicId, isTrustedReviewImageUrl, parseStoredReviewImages } from '@/lib/review-images';
import type { ReviewMediaMetadataWrite } from '@/lib/review-media-metadata';

export type PublicReviewMediaRow = {
  url: string;
  position: number;
  width?: number | null;
  height?: number | null;
  format?: string | null;
  mimeType?: string | null;
  bytes?: number | null;
};

export type ReviewMediaWriteInput = {
  urls: string[];
  cloudName: string | null;
  storeId: string;
  productId: string;
  reviewId: string;
  visible: boolean;
  metadataByPublicId?: Map<string, ReviewMediaMetadataWrite>;
};

export function buildReviewMediaCreateManyData(input: ReviewMediaWriteInput): Prisma.ReviewMediaCreateManyInput[] {
  return input.urls.flatMap((url, position) => {
    const publicId = getReviewImagePublicId(url, input.cloudName, input.storeId);
    if (!publicId) return [];
    const metadata = input.metadataByPublicId?.get(publicId) ?? {};
    return [{
      reviewId: input.reviewId,
      storeId: input.storeId,
      productId: input.productId,
      url,
      publicId,
      ...metadata,
      position,
      visible: input.visible,
    }];
  });
}

export type PublicReviewMedia = {
  url: string;
  thumbnailUrl: string | null;
  position: number;
  width: number | null;
  height: number | null;
  format: string | null;
  mimeType: string | null;
  bytes: number | null;
};

function publicMediaFromUrl(url: string, position: number, cloudName: string | null, storeId: string): PublicReviewMedia | null {
  if (!isTrustedReviewImageUrl(url, cloudName, storeId)) return null;
  return {
    url,
    thumbnailUrl: buildReviewImageThumbnailUrl(url, cloudName, storeId),
    position,
    width: null,
    height: null,
    format: null,
    mimeType: null,
    bytes: null,
  };
}

export function publicMediaFromMediaOrLegacy(
  media: PublicReviewMediaRow[] | null | undefined,
  legacyImages: string | null | undefined,
  cloudName: string | null,
  storeId: string,
): PublicReviewMedia[] {
  const mediaItems = (media ?? [])
    .slice()
    .sort((a, b) => a.position - b.position)
    .flatMap((item) => {
      if (!isTrustedReviewImageUrl(item.url, cloudName, storeId)) return [];
      return [{
        url: item.url,
        thumbnailUrl: buildReviewImageThumbnailUrl(item.url, cloudName, storeId),
        position: item.position,
        width: item.width ?? null,
        height: item.height ?? null,
        format: item.format ?? null,
        mimeType: item.mimeType ?? null,
        bytes: item.bytes ?? null,
      }];
    });

  if (mediaItems.length > 0) return mediaItems;
  return parseStoredReviewImages(legacyImages, cloudName, storeId)
    .flatMap((url, position) => {
      const item = publicMediaFromUrl(url, position, cloudName, storeId);
      return item ? [item] : [];
    });
}

export function publicImagesFromMediaOrLegacy(
  media: PublicReviewMediaRow[] | null | undefined,
  legacyImages: string | null | undefined,
  cloudName: string | null,
  storeId: string,
): string[] {
  return publicMediaFromMediaOrLegacy(media, legacyImages, cloudName, storeId).map((item) => item.url);
}
