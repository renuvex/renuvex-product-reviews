import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { runCleanupImages } from '@/lib/cleanup-orphan-images';
import { reportCronTaskError, withCronMonitor } from '@/lib/cron-observability';

// Monthly fallback orphan cleanup (ADR_0012), hardened per ADR_0030.
//
// Primary cleanup is /api/admin/cleanup-pending-uploads, driven by the
// PendingReviewImage registry. This endpoint is the fallback for edge cases
// (register call failed, legacy uploads, manual ops uploads).
//
// Safety (ADR_0030): the orphan diff + two-phase quarantine + circuit-breaker
// live in src/lib/cleanup-orphan-images.ts. This route only handles auth, the
// Sentry cron monitor, and persisting the MediaCleanupRun audit row.
//   - ?force=1 overrides the ratio (G2) and absolute (G3) breakers after a human
//     has reviewed the audit row. It NEVER overrides the empty-used-set guard (G1).

const CRON_SECRET = process.env.CRON_SECRET;

type AuditInput = {
  startedAt: Date;
  startMs: number;
  status: 'ok' | 'tripped' | 'error' | 'skipped';
  trigger: 'cron' | 'manual';
  forced: boolean;
  scanned?: number;
  usedCount?: number;
  candidates?: number;
  quarantinedNew?: number;
  released?: number;
  deleted?: number;
  breakerTripped?: boolean;
  breakerReason?: string;
  sampleDeleted?: string[];
  error?: string;
};

// Persist one MediaCleanupRun row per execution. Best-effort: an audit failure
// must never break the cron.
async function persistAudit(input: AuditInput): Promise<void> {
  try {
    const sample = input.sampleDeleted && input.sampleDeleted.length ? input.sampleDeleted : undefined;
    await prisma.mediaCleanupRun.create({
      data: {
        startedAt: input.startedAt,
        finishedAt: new Date(),
        durationMs: Date.now() - input.startMs,
        status: input.status,
        trigger: input.trigger,
        forced: input.forced,
        scanned: input.scanned ?? 0,
        usedCount: input.usedCount ?? 0,
        candidates: input.candidates ?? 0,
        quarantinedNew: input.quarantinedNew ?? 0,
        released: input.released ?? 0,
        deleted: input.deleted ?? 0,
        breakerTripped: input.breakerTripped ?? false,
        breakerReason: input.breakerReason ? input.breakerReason.slice(0, 128) : null,
        sampleDeleted: sample,
        error: input.error ? input.error.slice(0, 512) : null,
      },
    });
  } catch (err) {
    console.error('[cleanup-images] audit write failed:', err);
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!CRON_SECRET) {
    console.error('[cleanup-images] CRON_SECRET is not configured');
    return NextResponse.json({ error: 'CRON_SECRET is not configured' }, { status: 500 });
  }
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const force = new URL(request.url).searchParams.get('force') === '1';
  const trigger: 'cron' | 'manual' = force ? 'manual' : 'cron';

  return withCronMonitor<NextResponse>('cleanup-images', { schedule: '0 4 1 * *', maxRuntime: 10 }, async () => {
    const startedAt = new Date();
    const startMs = Date.now();

    try {
      const result = await runCleanupImages(prisma, { force });

      if (result.status === 'skipped_no_cloudinary_config') {
        reportCronTaskError('cleanup-images', 'cleanup-images', new Error('Cloudinary config missing'));
        await persistAudit({ startedAt, startMs, status: 'skipped', trigger, forced: force, error: 'cloudinary_config_missing' });
        return { hadErrors: true, value: NextResponse.json({ error: 'Cloudinary config missing' }, { status: 500 }) };
      }

      await persistAudit({
        startedAt,
        startMs,
        status: result.status,
        trigger,
        forced: force,
        scanned: result.scanned,
        usedCount: result.usedCount,
        candidates: result.currentOrphans,
        quarantinedNew: result.quarantinedNew,
        released: result.released,
        deleted: result.deleted,
        breakerTripped: result.breakerTripped,
        breakerReason: result.breakerReason,
        sampleDeleted: result.sampleDeleted,
      });

      if (result.status === 'tripped') {
        // A trip is a controlled, alert-worthy safety action: surface it loudly
        // (rich Sentry issue + monitor 'error' via hadErrors) but return 200 — the
        // function did its job, it just declined to delete.
        reportCronTaskError(
          'cleanup-images',
          'breaker-tripped',
          new Error(`cleanup breaker tripped: ${result.breakerReason ?? 'unknown'}`),
          { scanned: result.scanned, usedCount: result.usedCount, currentOrphans: result.currentOrphans, forced: force },
        );
      }

      const value = NextResponse.json({
        message:
          result.status === 'tripped'
            ? 'Güvenlik eşiği aşıldı — silme yapılmadı, inceleme gerekli.'
            : 'Temizleme tamamlandı.',
        ...result,
      });
      return { hadErrors: result.status === 'tripped', value };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown';
      reportCronTaskError('cleanup-images', 'cleanup-images', error);
      await persistAudit({ startedAt, startMs, status: 'error', trigger, forced: force, error: message });
      return { hadErrors: true, value: NextResponse.json({ error: message }, { status: 500 }) };
    }
  });
}
