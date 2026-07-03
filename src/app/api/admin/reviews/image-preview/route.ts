import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import {
  AWS_REVIEW_IMAGE_PROVIDER,
  signAwsReviewImagePrivatePreviewUrl,
  type AwsReviewImageVariantId,
} from '@/lib/media/providers/aws-review-image';

export const runtime = 'nodejs';

const ALLOWED_PREVIEW_VARIANTS = new Set<string>(['w200', 'w300', 'w400', 'w600', 'w1200', 'thumb_320x427', 'thumb_640x854']);

export async function GET(request: Request) {
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const searchParams = new URL(request.url).searchParams;
  const mediaId = searchParams.get('mediaId');
  const rawVariant = searchParams.get('variant') || 'w1200';
  const variant = ALLOWED_PREVIEW_VARIANTS.has(rawVariant) ? rawVariant as AwsReviewImageVariantId : 'w1200';
  if (!mediaId) return NextResponse.json({ error: 'Media ID is required' }, { status: 400 });

  const media = await prisma.reviewMedia.findFirst({
    where: {
      id: mediaId,
      resourceType: 'image',
      provider: AWS_REVIEW_IMAGE_PROVIDER,
      processingStatus: 'ready',
      review: { storeId: user.merchantId },
    },
    select: { variantManifest: true },
  });
  if (!media?.variantManifest) return NextResponse.json({ error: 'Image not found' }, { status: 404 });

  const response = NextResponse.json({
    data: {
      url: signAwsReviewImagePrivatePreviewUrl({
        manifest: media.variantManifest,
        variantId: variant,
        format: 'webp',
        ttlSeconds: 15 * 60,
      }),
      expiresIn: 15 * 60,
    },
  });
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
