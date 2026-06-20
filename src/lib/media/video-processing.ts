import type { VideoUploadSession } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { VIDEO_MAX_DURATION_MS, VIDEO_MIN_DURATION_MS, VIDEO_PROVIDER } from '@/lib/media/constants';
import {
  buildMuxPlaybackUrl,
  buildMuxPosterUrl,
  type MuxAsset,
} from '@/lib/media/providers/mux';
import { failSessionAndQueueCleanup } from '@/lib/media/lifecycle';
import {
  markVideoSessionReady,
  type VideoReadinessSource,
} from '@/lib/media/sessions';

function signedPlaybackId(asset: MuxAsset): string | null {
  return asset.playback_ids?.find((playbackId) => playbackId.policy === 'signed')?.id ?? null;
}

function muxAssetSessionId(asset: MuxAsset): string {
  const meta = (asset as MuxAsset & { meta?: Record<string, unknown> }).meta;
  const metaExternalId = typeof meta?.external_id === 'string' ? meta.external_id : '';
  const metaCreatorId = typeof meta?.creator_id === 'string' ? meta.creator_id : '';
  return asset.passthrough || metaExternalId || metaCreatorId || '';
}

export async function applyMuxAssetState(
  session: VideoUploadSession,
  asset: MuxAsset,
  metadataSource: VideoReadinessSource,
) {
  if (!asset.id || (session.providerAssetId && asset.id !== session.providerAssetId)) {
    return { ok: false as const, code: 'mux_asset_id_mismatch' };
  }
  if (asset.upload_id && session.providerUploadId && asset.upload_id !== session.providerUploadId) {
    return { ok: false as const, code: 'mux_upload_id_mismatch' };
  }
  if (session.status === 'ready' || session.status === 'consumed') {
    return { ok: true as const, status: session.status as 'ready' | 'consumed' };
  }
  if (session.status === 'failed' || session.status === 'aborted') {
    return { ok: false as const, code: 'session_terminal' };
  }
  if (asset.status === 'errored') {
    await failSessionAndQueueCleanup(session.id, asset.errors?.type ?? 'mux_processing_failed', {
      providerUploadId: asset.upload_id,
      providerAssetId: asset.id,
    });
    return { ok: false as const, code: 'mux_processing_failed' };
  }
  if (asset.status !== 'ready') {
    return { ok: true as const, status: 'processing' as const };
  }

  const durationMs = Math.round(Number(asset.duration ?? 0) * 1000);
  if (!Number.isFinite(durationMs) || durationMs < VIDEO_MIN_DURATION_MS || durationMs > VIDEO_MAX_DURATION_MS) {
    await failSessionAndQueueCleanup(session.id, 'invalid_video_duration', {
      providerUploadId: asset.upload_id,
      providerAssetId: asset.id,
    });
    return { ok: false as const, code: 'invalid_video_duration' };
  }

  const playbackId = signedPlaybackId(asset);
  if (!playbackId) return { ok: true as const, status: 'processing' as const };

  await markVideoSessionReady({
    sessionId: session.id,
    providerUploadId: asset.upload_id ?? session.providerUploadId,
    providerAssetId: asset.id,
    signedPlaybackId: playbackId,
    playbackUrl: buildMuxPlaybackUrl(playbackId),
    posterUrl: buildMuxPosterUrl(playbackId),
    durationMs,
    metadataSource,
  });
  return { ok: true as const, status: 'ready' as const };
}

export async function findSessionForMuxAsset(asset: MuxAsset) {
  const sessionId = muxAssetSessionId(asset);
  if (sessionId) {
    const session = await prisma.videoUploadSession.findUnique({ where: { id: sessionId } });
    if (session) return session;
  }
  if (asset.upload_id) {
    const session = await prisma.videoUploadSession.findFirst({
      where: { provider: VIDEO_PROVIDER, providerUploadId: asset.upload_id },
    });
    if (session) return session;
  }
  return asset.id
    ? prisma.videoUploadSession.findFirst({ where: { provider: VIDEO_PROVIDER, providerAssetId: asset.id } })
    : null;
}
