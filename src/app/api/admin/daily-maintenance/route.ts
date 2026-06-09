import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cleanupPendingUploads } from '@/lib/cleanup-pending-uploads';
import { reconcileStorefrontScripts } from '@/lib/reconcile-storefront-scripts';
import { reconcileStorefrontThemes } from '@/lib/storefront-theme-sync';
import { runReviewMediaMetadataBackfill } from '@/lib/review-media-metadata-backfill';
import { reportCronTaskError, withCronMonitor } from '@/lib/cron-observability';

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

  return withCronMonitor('daily-maintenance', { schedule: '0 3 * * *', maxRuntime: 10 }, async () => {
    const errors: Array<{ task: string; error: string }> = [];
    let pendingUploads = null;
    let storefrontScripts = null;
    let storefrontThemes = null;
    let reviewMediaMetadata = null;
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
        reviewMediaMetadata = await runReviewMediaMetadataBackfill(prisma);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'unknown';
        reportCronTaskError('daily-maintenance', 'review-media-metadata-backfill', error);
        errors.push({ task: 'review-media-metadata-backfill', error: message });
      }
    }

    const value = NextResponse.json(
      {
        data: {
          runFullMaintenance,
          storefrontThemes,
          pendingUploads,
          storefrontScripts,
          reviewMediaMetadata,
          errors,
        },
      },
      { status: errors.length ? 500 : 200 },
    );
    return { hadErrors: errors.length > 0, value };
  });
}
