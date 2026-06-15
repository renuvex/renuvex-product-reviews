import * as Sentry from '@sentry/nextjs';
import { Client } from '@upstash/qstash';
import {
  getMediaJobEndpoint,
  getQStashMediaConfig,
  MediaConfigError,
} from '@/lib/media/config';

export async function dispatchMediaProviderJob(jobId: string, delaySeconds = 0): Promise<boolean> {
  try {
    const config = getQStashMediaConfig();
    const client = new Client({ token: config.token });
    await client.publishJSON({
      url: getMediaJobEndpoint(),
      body: { jobId },
      retries: 5,
      timeout: '30s',
      ...(delaySeconds > 0 ? { delay: delaySeconds } : {}),
    });
    return true;
  } catch (error) {
    if (!(error instanceof MediaConfigError)) {
      Sentry.captureException(error, {
        tags: { source: 'media-job', task: 'dispatch' },
        extra: { jobId },
      });
    }
    return false;
  }
}
