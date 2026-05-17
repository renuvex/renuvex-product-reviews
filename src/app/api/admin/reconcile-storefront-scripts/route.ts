import { NextResponse } from 'next/server';
import { reconcileStorefrontScripts } from '@/lib/reconcile-storefront-scripts';

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!CRON_SECRET) {
    console.error('[reconcile-storefront-scripts] CRON_SECRET is not configured');
    return NextResponse.json({ error: 'CRON_SECRET is not configured' }, { status: 500 });
  }
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    return NextResponse.json({ data: await reconcileStorefrontScripts() });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    console.error('[reconcile-storefront-scripts] ERROR:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
