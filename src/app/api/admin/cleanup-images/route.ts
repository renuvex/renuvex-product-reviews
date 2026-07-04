import { NextResponse } from 'next/server';
import { runCleanupImagesMaintenance } from '@/lib/scheduled-jobs';

// Monthly fallback orphan cleanup (ADR_0012), hardened per ADR_0030.
//
// Safety (ADR_0030): the orphan diff + two-phase quarantine + circuit-breaker
// live in src/lib/cleanup-orphan-images.ts. This route only handles manual/cron
// bearer auth and delegates the auditable cleanup runner to scheduled-jobs.
//   - ?force=1 overrides the ratio (G2) and absolute (G3) breakers after a human
//     has reviewed the audit row. It NEVER overrides the empty-used-set guard (G1).

const CRON_SECRET = process.env.CRON_SECRET;

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
  const result = await runCleanupImagesMaintenance({ force });
  return NextResponse.json(result.body, { status: result.status });
}
