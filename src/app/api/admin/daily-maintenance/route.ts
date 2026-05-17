import { NextResponse } from 'next/server';
import { cleanupPendingUploads } from '@/lib/cleanup-pending-uploads';
import { reconcileStorefrontScripts } from '@/lib/reconcile-storefront-scripts';

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

  const errors: Array<{ task: string; error: string }> = [];
  let pendingUploads = null;
  let storefrontScripts = null;

  try {
    pendingUploads = await cleanupPendingUploads();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    console.error('[daily-maintenance] cleanup-pending-uploads failed:', error);
    errors.push({ task: 'cleanup-pending-uploads', error: message });
  }

  try {
    storefrontScripts = await reconcileStorefrontScripts();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    console.error('[daily-maintenance] reconcile-storefront-scripts failed:', error);
    errors.push({ task: 'reconcile-storefront-scripts', error: message });
  }

  return NextResponse.json(
    {
      data: {
        pendingUploads,
        storefrontScripts,
        errors,
      },
    },
    { status: errors.length ? 500 : 200 },
  );
}
