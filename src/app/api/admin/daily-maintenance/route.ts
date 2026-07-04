import { NextResponse } from 'next/server';
import { runDailyMaintenance, shouldRunFullMaintenance } from '@/lib/scheduled-jobs';

const CRON_SECRET = process.env.CRON_SECRET;

function unauthorized(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!CRON_SECRET) return 'CRON_SECRET is not configured';
  return authHeader === `Bearer ${CRON_SECRET}` ? null : 'Unauthorized';
}

export async function GET(request: Request) {
  const authError = unauthorized(request);
  if (authError) {
    return NextResponse.json({ error: authError }, { status: authError === 'Unauthorized' ? 401 : 500 });
  }

  const result = await runDailyMaintenance({ full: shouldRunFullMaintenance(request) });
  return NextResponse.json(result.body, { status: result.status });
}
