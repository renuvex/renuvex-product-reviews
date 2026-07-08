import { NextResponse } from 'next/server';
import { cleanupPendingUploads } from '@/lib/cleanup-pending-uploads';

// Primary orphan cleanup driven by the PendingReviewImage registry. QStash daily
// maintenance runs the same helper beside storefront script reconciliation; this
// route stays as a CRON_SECRET-gated manual/ops entrypoint.

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!CRON_SECRET) {
    console.error('[cleanup-pending-uploads] CRON_SECRET is not configured');
    return NextResponse.json({ error: 'CRON_SECRET is not configured' }, { status: 500 });
  }
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    return NextResponse.json(await cleanupPendingUploads());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    console.error('[cleanup-pending-uploads] ERROR:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
