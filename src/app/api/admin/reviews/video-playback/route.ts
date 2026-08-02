import { NextResponse } from 'next/server';
import {
  authenticateIkasAdminRequest,
  ikasAdminAuthenticationResponse,
} from '@/lib/auth-helpers';
import { resolveAdminMuxSignedPlaybackId } from '@/lib/media/admin-video-access';
import {
  buildMuxPosterUrl,
  buildMuxSignedPlaybackUrl,
  signMuxPlaybackToken,
} from '@/lib/media/providers/mux';
import { reportServerFailure } from '@/lib/server-failures';

export async function GET(request: Request) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);
    const user = auth.context.principal;
    const mediaId = new URL(request.url).searchParams.get('mediaId');
    if (!mediaId) return NextResponse.json({ error: 'Media ID is required' }, { status: 400 });

    const playbackId = await resolveAdminMuxSignedPlaybackId({
      mediaId,
      storeId: user.merchantId,
    });
    if (!playbackId) return NextResponse.json({ error: 'Video not found' }, { status: 404 });

    const [playbackToken, thumbnailToken] = await Promise.all([
      signMuxPlaybackToken(playbackId, 'video', 15 * 60),
      signMuxPlaybackToken(playbackId, 'thumbnail', 15 * 60),
    ]);
    const response = NextResponse.json({
      data: {
        playbackId,
        playbackToken,
        thumbnailToken,
        url: buildMuxSignedPlaybackUrl(playbackId, playbackToken),
        posterUrl: buildMuxPosterUrl(playbackId, thumbnailToken),
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
