import { Client } from '@upstash/qstash';
import { getMediaJobEndpoint, getQStashMediaConfig, MediaConfigError } from '@/lib/media/config';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';

function storeErasureEndpoint(): string {
  return new URL('/api/internal/review-email/store-erasure', getMediaJobEndpoint()).toString();
}

export async function dispatchStoreDataErasureRetry(runId: string, delaySeconds = 300): Promise<boolean> {
  try {
    const config = getQStashMediaConfig();
    const client = new Client({ token: config.token });
    await client.publishJSON({
      url: storeErasureEndpoint(),
      body: { runId },
      retries: 5,
      timeout: '60s',
      ...(delaySeconds > 0 ? { delay: delaySeconds } : {}),
    });
    return true;
  } catch (error) {
    if (!(error instanceof MediaConfigError)) {
      reportReviewEmailFailure(
        'store_erasure',
        normalizeReviewEmailFailure('store_erasure', error, { retryable: true }),
        runId,
      );
    }
    return false;
  }
}
