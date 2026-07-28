import { NextResponse } from 'next/server';
import {
  authenticateIkasAdminRequest,
  ikasAdminAuthenticationResponse,
} from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import {
  buildMuxPosterUrl,
  buildMuxSignedPlaybackUrl,
  signMuxPlaybackToken,
} from '@/lib/media/providers/mux';
import { VIDEO_PROVIDER } from '@/lib/media/constants';
import { reportServerFailure } from '@/lib/server-failures';

export async function GET(request: Request) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);
    const user = auth.context.principal;
    const mediaId = new URL(request.url).searchParams.get('mediaId');
    if (!mediaId) return NextResponse.json({ error: 'Media ID is required' }, { status: 400 });

    const media = await prisma.reviewMedia.findFirst({
      where: {
        id: mediaId,
        resourceType: 'video',
        provider: VIDEO_PROVIDER,
        processingStatus: 'ready',
        review: { storeId: user.merchantId },
      },
      select: { providerAssetId: true },
    });
    if (!media?.providerAssetId) return NextResponse.json({ error: 'Video not found' }, { status: 404 });

    const session = await prisma.videoUploadSession.findFirst({
      where: { provider: VIDEO_PROVIDER, providerAssetId: media.providerAssetId },
      select: { signedPlaybackId: true },
    });
    if (!session?.signedPlaybackId) return NextResponse.json({ error: 'Video not found' }, { status: 404 });

    const [playbackToken, thumbnailToken] = await Promise.all([
      signMuxPlaybackToken(session.signedPlaybackId, 'video', 15 * 60),
      signMuxPlaybackToken(session.signedPlaybackId, 'thumbnail', 15 * 60),
    ]);
    const response = NextResponse.json({
      data: {
        playbackId: session.signedPlaybackId,
        playbackToken,
        thumbnailToken,
        url: buildMuxSignedPlaybackUrl(session.signedPlaybackId, playbackToken),
        posterUrl: buildMuxPosterUrl(session.signedPlaybackId, thumbnailToken),
        expiresIn: 15 * 60,
      },
    });
    response.headers.set('Cache-Control', 'private, no-store');
    return response;
  } catch {
    reportServerFailure('admin_video_preview_failed');
    return NextResponse.json({ error: 'admin_video_preview_failed' }, { status: 500 });
  }
}
