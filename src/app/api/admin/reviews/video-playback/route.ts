import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import {
  buildSignedStreamPlaybackUrl,
  createStreamPlaybackToken,
} from '@/lib/media/providers/cloudflare-stream';

export async function GET(request: Request) {
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const mediaId = new URL(request.url).searchParams.get('mediaId');
  if (!mediaId) return NextResponse.json({ error: 'Media ID is required' }, { status: 400 });

  const media = await prisma.reviewMedia.findFirst({
    where: {
      id: mediaId,
      resourceType: 'video',
      provider: 'cloudflare_stream',
      processingStatus: 'ready',
      review: { storeId: user.merchantId },
    },
    select: { providerAssetId: true },
  });
  if (!media?.providerAssetId) return NextResponse.json({ error: 'Video not found' }, { status: 404 });

  const token = await createStreamPlaybackToken(media.providerAssetId, 15 * 60);
  const response = NextResponse.json({
    data: {
      url: buildSignedStreamPlaybackUrl(media.providerAssetId, token),
      expiresIn: 15 * 60,
    },
  });
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
