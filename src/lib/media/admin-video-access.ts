import 'server-only';

import { prisma } from '@/lib/prisma';
import { VIDEO_PROVIDER } from '@/lib/media/constants';

export async function resolveAdminMuxSignedPlaybackId(input: {
  mediaId: string;
  storeId: string;
}): Promise<string | null> {
  const media = await prisma.reviewMedia.findFirst({
    where: {
      id: input.mediaId,
      storeId: input.storeId,
      resourceType: 'video',
      provider: VIDEO_PROVIDER,
      processingStatus: 'ready',
      review: { storeId: input.storeId },
    },
    select: { providerAssetId: true },
  });
  if (!media?.providerAssetId) return null;

  const session = await prisma.videoUploadSession.findFirst({
    where: {
      storeId: input.storeId,
      provider: VIDEO_PROVIDER,
      providerAssetId: media.providerAssetId,
    },
    select: { signedPlaybackId: true },
  });
  const playbackId = session?.signedPlaybackId?.trim();
  return playbackId || null;
}
