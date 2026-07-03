import type { Prisma } from '@prisma/client';
import { buildReviewImageThumbnailUrl, getReviewImagePublicId, isTrustedReviewImageUrl, parseStoredReviewImages } from '@/lib/review-images';
import { isTrustedMuxDeliveryUrl, parseMuxPlaybackIdFromDeliveryUrl } from '@/lib/media/providers/mux';
import { AWS_REVIEW_IMAGE_PROVIDER, buildAwsReviewImagePublicDescriptor, isTrustedAwsReviewImagePublicUrl } from '@/lib/media/providers/aws-review-image';
import { VIDEO_PROVIDER } from '@/lib/media/constants';
import type { ReviewMediaMetadataWrite } from '@/lib/review-media-metadata';

export type PublicReviewMediaRow = {
  url: string;
  position: number;
  resourceType?: string | null;
  provider?: string | null;
  providerAssetId?: string | null;
  posterUrl?: string | null;
  durationMs?: number | null;
  width?: number | null;
  height?: number | null;
  format?: string | null;
  mimeType?: string | null;
  bytes?: number | null;
  variantStatus?: string | null;
  variantManifest?: Prisma.JsonValue | null;
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

export type AwsPendingReviewImageMediaRow = {
  publicId: string;
  storeId: string | null;
  productId: string | null;
  uploadSessionId: string | null;
  assetId: string | null;
  providerAssetId: string | null;
  sourceAssetId: string | null;
  format: string | null;
  mimeType: string | null;
  width: number | null;
  height: number | null;
  bytes: number | null;
  sourceChecksumAlgorithm: string | null;
  sourceChecksumSha256: string | null;
  metadataSource: string | null;
  metadataStatus: string | null;
  metadataFetchedAt: Date | null;
  variantStatus: string | null;
  variantGeneratedAt: Date | null;
  variantManifest: Prisma.JsonValue | null;
};

export function buildAwsReviewMediaCreateManyData(input: {
  rows: AwsPendingReviewImageMediaRow[];
  storeId: string;
  productId: string;
  reviewId: string;
  visible: boolean;
}): Prisma.ReviewMediaCreateManyInput[] {
  return input.rows.map((row, position) => {
    const descriptor = buildAwsReviewImagePublicDescriptor(row.variantManifest);
    return {
      reviewId: input.reviewId,
      storeId: input.storeId,
      productId: input.productId,
      url: descriptor?.url ?? '',
      publicId: row.publicId,
      assetId: row.assetId,
      resourceType: 'image',
      provider: AWS_REVIEW_IMAGE_PROVIDER,
      providerAssetId: row.providerAssetId,
      processingStatus: row.variantStatus === 'private_ready' || row.variantStatus === 'public_ready' ? 'ready' : 'pending',
      sourceProvider: AWS_REVIEW_IMAGE_PROVIDER,
      sourceAssetId: row.sourceAssetId,
      format: row.format,
      mimeType: row.mimeType,
      width: row.width,
      height: row.height,
      bytes: row.bytes,
      sourceChecksumAlgorithm: row.sourceChecksumAlgorithm,
      sourceChecksumSha256: row.sourceChecksumSha256,
      metadataSource: row.metadataSource ?? 'aws_s3_register',
      metadataStatus: row.metadataStatus ?? 'complete',
      metadataFetchedAt: row.metadataFetchedAt,
      variantStatus: input.visible ? 'public_ready' : 'private_ready',
      variantGeneratedAt: row.variantGeneratedAt,
      variantPublishedAt: input.visible ? new Date() : null,
      variantManifest: row.variantManifest as Prisma.InputJsonValue,
      position,
      visible: input.visible,
    };
  });
}

export type PublicReviewMedia = {
  type: 'image' | 'video';
  url: string;
  playbackId?: string | null;
  thumbnailUrl: string | null;
  posterUrl: string | null;
  durationMs: number | null;
  position: number;
  width: number | null;
  height: number | null;
  format: string | null;
  mimeType: string | null;
  bytes: number | null;
  variants?: Array<{
    id: string;
    format: string;
    width: number;
    height: number;
    url: string;
  }>;
};

function publicMediaFromUrl(url: string, position: number, cloudName: string | null, storeId: string): PublicReviewMedia | null {
  if (!isTrustedReviewImageUrl(url, cloudName, storeId)) return null;
  return {
    type: 'image',
    url,
    thumbnailUrl: buildReviewImageThumbnailUrl(url, cloudName, storeId),
    posterUrl: null,
    durationMs: null,
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
    .flatMap<PublicReviewMedia>((item) => {
      if (item.resourceType === 'video') {
        if (item.provider !== VIDEO_PROVIDER) return [];
        const playbackId = parseMuxPlaybackIdFromDeliveryUrl(item.url);
        if (!playbackId || !isTrustedMuxDeliveryUrl(item.url, playbackId)) return [];
        if (!item.posterUrl || !isTrustedMuxDeliveryUrl(item.posterUrl, playbackId)) return [];
        return [{
          type: 'video' as const,
          url: item.url,
          playbackId,
          thumbnailUrl: item.posterUrl,
          posterUrl: item.posterUrl,
          durationMs: item.durationMs ?? null,
          position: item.position,
          width: item.width ?? null,
          height: item.height ?? null,
          format: item.format ?? null,
          mimeType: item.mimeType ?? null,
          bytes: item.bytes ?? null,
        }];
      }
      if (item.resourceType && item.resourceType !== 'image') return [];
      if (item.provider === AWS_REVIEW_IMAGE_PROVIDER) {
        if (item.variantStatus !== 'public_ready') return [];
        const descriptor = buildAwsReviewImagePublicDescriptor(item.variantManifest);
        if (!descriptor || !isTrustedAwsReviewImagePublicUrl(descriptor.url, storeId)) return [];
        return [{
          type: 'image' as const,
          url: descriptor.url,
          thumbnailUrl: descriptor.thumbnailUrl,
          posterUrl: null,
          durationMs: null,
          position: item.position,
          width: item.width ?? null,
          height: item.height ?? null,
          format: item.format ?? null,
          mimeType: item.mimeType ?? null,
          bytes: item.bytes ?? null,
          variants: descriptor.variants.filter((variant) => isTrustedAwsReviewImagePublicUrl(variant.url, storeId)),
        }];
      }
      if (item.provider && item.provider !== 'cloudinary') return [];
      if (!isTrustedReviewImageUrl(item.url, cloudName, storeId)) return [];
      return [{
        type: 'image' as const,
        url: item.url,
        thumbnailUrl: buildReviewImageThumbnailUrl(item.url, cloudName, storeId),
        posterUrl: null,
        durationMs: null,
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
  return publicMediaFromMediaOrLegacy(media, legacyImages, cloudName, storeId)
    .filter((item) => item.type === 'image')
    .map((item) => item.url);
}
