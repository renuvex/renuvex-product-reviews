import { prisma } from '@/lib/prisma';
import { dispatchMediaProviderJob } from '@/lib/media/jobs';
import { getStreamVideo } from '@/lib/media/providers/cloudflare-stream';
import { applyStreamVideoState } from '@/lib/media/video-processing';
import { MEDIA_JOB_STALE_LOCK_MS } from '@/lib/media/constants';

export async function reconcileProcessingVideos(limit = 50) {
  const sessions = await prisma.videoUploadSession.findMany({
    where: { status: 'processing', streamUid: { not: null } },
    orderBy: { updatedAt: 'asc' },
    take: Math.max(1, Math.min(200, limit)),
  });
  let ready = 0;
  let processing = 0;
  let failed = 0;
  for (const session of sessions) {
    try {
      const video = await getStreamVideo(session.streamUid!);
      const result = await applyStreamVideoState(session, video);
      if (result.ok && result.status === 'ready') ready += 1;
      else if (result.ok) processing += 1;
      else failed += 1;
    } catch {
      failed += 1;
    }
  }
  return { scanned: sessions.length, ready, processing, failed };
}

export async function redispatchDueMediaJobs(limit = 100) {
  const now = new Date();
  const staleBefore = new Date(now.getTime() - MEDIA_JOB_STALE_LOCK_MS);
  const jobs = await prisma.mediaProviderJob.findMany({
    where: {
      OR: [
        { status: { in: ['pending', 'failed'] }, availableAt: { lte: now } },
        { status: 'processing', lockedAt: { lt: staleBefore } },
        { status: 'processing', lockedAt: null },
      ],
    },
    orderBy: { availableAt: 'asc' },
    take: Math.max(1, Math.min(500, limit)),
    select: { id: true },
  });
  const results = await Promise.all(jobs.map((job) => dispatchMediaProviderJob(job.id)));
  return { scanned: jobs.length, dispatched: results.filter(Boolean).length };
}
