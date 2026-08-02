import * as Sentry from '@sentry/nextjs';
import { Client } from '@upstash/qstash';
import { getMediaJobEndpoint, getQStashMediaConfig, MediaConfigError } from '@/lib/media/config';

function productReconciliationEndpoint(): string {
  return new URL('/api/internal/product-reconciliation', getMediaJobEndpoint()).toString();
}

export async function dispatchProductReconciliationRun(
  runId: string,
  delaySeconds = 0,
): Promise<boolean> {
  try {
    const config = getQStashMediaConfig();
    const client = new Client({ token: config.token });
    await client.publishJSON({
      url: productReconciliationEndpoint(),
      body: { runId },
      retries: 5,
      timeout: '60s',
      ...(delaySeconds > 0 ? { delay: delaySeconds } : {}),
    });
    return true;
  } catch (error) {
    if (!(error instanceof MediaConfigError)) {
      Sentry.captureException(new Error('product_reconciliation_dispatch_failed'), {
        tags: { source: 'product-reconciliation', task: 'dispatch' },
      });
    }
    return false;
  }
}
