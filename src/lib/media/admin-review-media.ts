import { VIDEO_PROVIDER } from '@/lib/media/constants';
import {
  AWS_REVIEW_IMAGE_PROVIDER,
  buildAwsReviewImagePublicDescriptor,
} from '@/lib/media/providers/aws-review-image';

export interface AdminReviewMediaSource {
  id: string;
  resourceType: string;
  provider: string;
  variantStatus: string;
  variantManifest: unknown;
  visible: boolean;
  durationMs: number | null;
  width: number | null;
  height: number | null;
  position: number;
  processingStatus: string;
}

export function serializeAdminReviewMedia(item: AdminReviewMediaSource) {
  const awsImage = item.resourceType === 'image' && item.provider === AWS_REVIEW_IMAGE_PROVIDER;
  const awsDescriptor = awsImage
    ? buildAwsReviewImagePublicDescriptor(item.variantManifest)
    : null;
  const awsPublicReady = awsImage && item.variantStatus === 'public_ready' && item.visible;
  const muxVideo = item.resourceType === 'video' && item.provider === VIDEO_PROVIDER;
  const muxVideoReady = muxVideo && item.processingStatus === 'ready';

  return {
    id: item.id,
    type: item.resourceType === 'video' ? 'video' as const : 'image' as const,
    variantStatus: item.variantStatus,
    url: awsPublicReady ? awsDescriptor?.url ?? null : null,
    thumbnailUrl: awsPublicReady ? awsDescriptor?.thumbnailUrl ?? null : null,
    posterUrl: null,
    durationMs: item.durationMs,
    width: item.width,
    height: item.height,
    position: item.position,
    processingStatus: item.processingStatus,
    visible: item.visible,
    previewMode: awsImage
      ? (awsPublicReady ? 'public' as const : 'signed' as const)
      : (muxVideoReady ? 'signed' as const : 'unsupported' as const),
    canPreview: awsImage ? Boolean(item.variantManifest) : muxVideoReady,
  };
}
