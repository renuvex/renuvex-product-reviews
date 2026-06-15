import type { VideoUploadSession } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { VIDEO_MAX_BYTES, VIDEO_MAX_DURATION_MS, VIDEO_MIN_DURATION_MS } from '@/lib/media/constants';
import type { StreamVideo } from '@/lib/media/providers/cloudflare-stream';
import { deleteVideoIngest } from '@/lib/media/providers/r2';
import { failSessionAndQueueCleanup } from '@/lib/media/lifecycle';
import { markVideoSessionReady } from '@/lib/media/sessions';

export async function applyStreamVideoState(session: VideoUploadSession, video: StreamVideo) {
  if (!video.uid || (session.streamUid && video.uid !== session.streamUid)) {
    return { ok: false as const, code: 'stream_uid_mismatch' };
  }
  if (session.status === 'ready' || session.status === 'consumed') {
    return { ok: true as const, status: session.status as 'ready' | 'consumed' };
  }
  if (session.status === 'failed' || session.status === 'aborted') {
    return { ok: false as const, code: 'session_terminal' };
  }
  const providerState = video.status?.state ?? '';
  if (providerState === 'error') {
    await failSessionAndQueueCleanup(session.id, video.status?.errorReasonCode ?? 'stream_processing_failed');
    return { ok: false as const, code: 'stream_processing_failed' };
  }
  const pctComplete = Number(video.status?.pctComplete ?? 0);
  if (!video.readyToStream || providerState !== 'ready' || !Number.isFinite(pctComplete) || pctComplete < 100) {
    return { ok: true as const, status: 'processing' as const };
  }

  const durationMs = Math.round(Number(video.duration ?? 0) * 1000);
  const providerBytes = Number(video.size ?? session.bytes);
  if (!Number.isFinite(durationMs) || durationMs < VIDEO_MIN_DURATION_MS || durationMs > VIDEO_MAX_DURATION_MS) {
    await failSessionAndQueueCleanup(session.id, 'invalid_video_duration');
    return { ok: false as const, code: 'invalid_video_duration' };
  }
  if (!Number.isFinite(providerBytes) || providerBytes <= 0 || providerBytes > VIDEO_MAX_BYTES) {
    await failSessionAndQueueCleanup(session.id, 'invalid_video_size');
    return { ok: false as const, code: 'invalid_video_size' };
  }
  const playbackUrl = video.playback?.hls;
  const posterUrl = video.thumbnail;
  if (!playbackUrl || !posterUrl) return { ok: true as const, status: 'processing' as const };

  if (session.ingestObjectKey) await deleteVideoIngest(session.ingestObjectKey);
  await markVideoSessionReady({ sessionId: session.id, streamUid: video.uid, playbackUrl, posterUrl, durationMs });
  return { ok: true as const, status: 'ready' as const };
}

export async function findSessionForStreamVideo(video: StreamVideo) {
  const creator = typeof video.creator === 'string' ? video.creator : '';
  const metadataSessionId = typeof video.meta?.uploadSessionId === 'string' ? video.meta.uploadSessionId : '';
  if (creator || metadataSessionId) {
    const session = await prisma.videoUploadSession.findUnique({ where: { id: creator || metadataSessionId } });
    if (session) return session;
  }
  return video.uid ? prisma.videoUploadSession.findUnique({ where: { streamUid: video.uid } }) : null;
}
