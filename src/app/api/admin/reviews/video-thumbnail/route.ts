import { NextResponse } from 'next/server';
import {
  authenticateIkasAdminRequest,
  ikasAdminAuthenticationResponse,
} from '@/lib/auth-helpers';
import { resolveAdminMuxSignedPlaybackId } from '@/lib/media/admin-video-access';
import { buildMuxPosterUrl, signMuxPlaybackToken } from '@/lib/media/providers/mux';
import { reportServerFailure } from '@/lib/server-failures';

export const runtime = 'nodejs';

const THUMBNAIL_TTL_SECONDS = 15 * 60;

function privateJson(body: unknown, status = 200) {
  const response = NextResponse.json(body, { status });
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

export async function GET(request: Request) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);

    const mediaId = new URL(request.url).searchParams.get('mediaId')?.trim();
    if (!mediaId) return privateJson({ error: 'invalid_media_id' }, 400);

    const playbackId = await resolveAdminMuxSignedPlaybackId({
      mediaId,
      storeId: auth.context.principal.merchantId,
    });
    if (!playbackId) return privateJson({ error: 'video_not_found' }, 404);

    const thumbnailToken = await signMuxPlaybackToken(playbackId, 'thumbnail', THUMBNAIL_TTL_SECONDS);
    return privateJson({
      data: {
        url: buildMuxPosterUrl(playbackId, thumbnailToken),
        expiresIn: THUMBNAIL_TTL_SECONDS,
      },
    });
  } catch {
    reportServerFailure('admin_video_thumbnail_failed');
    return privateJson({ error: 'admin_video_thumbnail_failed' }, 500);
  }
}
