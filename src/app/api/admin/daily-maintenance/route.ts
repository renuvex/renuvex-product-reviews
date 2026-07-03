import { NextResponse } from 'next/server';
import { cleanupPendingUploads } from '@/lib/cleanup-pending-uploads';
import { reconcileStorefrontScripts } from '@/lib/reconcile-storefront-scripts';
import { reconcileStorefrontThemes } from '@/lib/storefront-theme-sync';
import { reportCronTaskError } from '@/lib/cron-observability';
import {
  ensureVideoLifecycleJobs,
  reconcileProcessingVideos,
  redispatchDueMediaJobs,
} from '@/lib/media/reconciliation';

const CRON_SECRET = process.env.CRON_SECRET;

function unauthorized(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!CRON_SECRET) return 'CRON_SECRET is not configured';
  return authHeader === `Bearer ${CRON_SECRET}` ? null : 'Unauthorized';
}

function shouldRunFullMaintenance(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get('full') === '1') return true;

  const now = new Date();
  return now.getUTCHours() === 3 && now.getUTCMinutes() < 5;
}

export async function GET(request: Request) {
  const authError = unauthorized(request);
  if (authError) {
    return NextResponse.json({ error: authError }, { status: authError === 'Unauthorized' ? 401 : 500 });
  }

  const errors: Array<{ task: string; error: string }> = [];
  let pendingUploads = null;
  let storefrontScripts = null;
  let storefrontThemes = null;
  let videoReconciliation = null;
  let videoLifecycleJobs = null;
  let mediaJobs = null;
  const runFullMaintenance = shouldRunFullMaintenance(request);

  try {
    storefrontThemes = await reconcileStorefrontThemes();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    reportCronTaskError('daily-maintenance', 'reconcile-storefront-themes', error);
    errors.push({ task: 'reconcile-storefront-themes', error: message });
  }

  if (runFullMaintenance) {
    try {
      pendingUploads = await cleanupPendingUploads();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown';
      reportCronTaskError('daily-maintenance', 'cleanup-pending-uploads', error);
      errors.push({ task: 'cleanup-pending-uploads', error: message });
    }

    try {
      storefrontScripts = await reconcileStorefrontScripts();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown';
      reportCronTaskError('daily-maintenance', 'reconcile-storefront-scripts', error);
      errors.push({ task: 'reconcile-storefront-scripts', error: message });
    }

    try {
      videoLifecycleJobs = await ensureVideoLifecycleJobs();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown';
      reportCronTaskError('daily-maintenance', 'video-lifecycle-jobs', error);
      errors.push({ task: 'video-lifecycle-jobs', error: message });
    }

    try {
      videoReconciliation = await reconcileProcessingVideos();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown';
      reportCronTaskError('daily-maintenance', 'video-processing-reconciliation', error);
      errors.push({ task: 'video-processing-reconciliation', error: message });
    }

    try {
      mediaJobs = await redispatchDueMediaJobs();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown';
      reportCronTaskError('daily-maintenance', 'media-job-redispatch', error);
      errors.push({ task: 'media-job-redispatch', error: message });
    }
  }

  return NextResponse.json(
    {
      data: {
        runFullMaintenance,
        storefrontThemes,
        pendingUploads,
        storefrontScripts,
        videoLifecycleJobs,
        videoReconciliation,
        mediaJobs,
        errors,
      },
    },
    { status: errors.length ? 500 : 200 },
  );
}
