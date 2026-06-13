import { describe, expect, it } from 'vitest';
import {
  getMediaJobEndpoint,
  getR2MediaConfig,
  isVideoReviewsGloballyEnabled,
  MediaConfigError,
} from '@/lib/media/config';

describe('media configuration', () => {
  it('requires an explicit true value for the global rollout flag', () => {
    expect(isVideoReviewsGloballyEnabled({ VIDEO_REVIEWS_ENABLED: 'true' })).toBe(true);
    expect(isVideoReviewsGloballyEnabled({ VIDEO_REVIEWS_ENABLED: 'TRUE' })).toBe(false);
    expect(isVideoReviewsGloballyEnabled({})).toBe(false);
  });

  it('normalizes secure endpoint URLs without leaking credentials into the contract', () => {
    expect(getR2MediaConfig({
      CLOUDFLARE_R2_ENDPOINT: 'https://account.r2.cloudflarestorage.com/',
      CLOUDFLARE_R2_ACCESS_KEY_ID: 'key',
      CLOUDFLARE_R2_SECRET_ACCESS_KEY: 'secret',
      CLOUDFLARE_R2_MASTER_BUCKET: 'master',
      CLOUDFLARE_R2_INGEST_BUCKET: 'ingest',
      CLOUDFLARE_R2_INGEST_PUBLIC_BASE_URL: 'https://ingest.example.com/',
    })).toEqual({
      endpoint: 'https://account.r2.cloudflarestorage.com',
      accessKeyId: 'key',
      secretAccessKey: 'secret',
      masterBucket: 'master',
      ingestBucket: 'ingest',
      ingestPublicBaseUrl: 'https://ingest.example.com',
    });
  });

  it('rejects insecure or missing URLs and builds the internal QStash endpoint', () => {
    expect(() => getMediaJobEndpoint({ MEDIA_JOB_BASE_URL: 'http://app.example.com' })).toThrow(MediaConfigError);
    expect(getMediaJobEndpoint({ MEDIA_JOB_BASE_URL: 'https://app.example.com/' })).toBe('https://app.example.com/api/internal/media-jobs');
  });
});
