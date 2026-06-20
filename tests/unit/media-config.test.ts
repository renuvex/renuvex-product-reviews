import { describe, expect, it } from 'vitest';
import {
  getMediaJobEndpoint,
  getMuxApiConfig,
  getMuxWebhookConfig,
  getMuxVideoQuality,
  getVideoUploadClientConfig,
  isVideoReviewsGloballyEnabled,
  MediaConfigError,
} from '@/lib/media/config';

describe('media configuration', () => {
  it('requires an explicit true value for the global rollout flag', () => {
    expect(isVideoReviewsGloballyEnabled({ VIDEO_REVIEWS_ENABLED: 'true' })).toBe(true);
    expect(isVideoReviewsGloballyEnabled({ VIDEO_REVIEWS_ENABLED: 'TRUE' })).toBe(false);
    expect(isVideoReviewsGloballyEnabled({})).toBe(false);
  });

  it('rejects insecure or missing URLs and builds the internal QStash endpoint', () => {
    expect(() => getMediaJobEndpoint({ MEDIA_JOB_BASE_URL: 'http://app.example.com' })).toThrow(MediaConfigError);
    expect(getMediaJobEndpoint({ MEDIA_JOB_BASE_URL: 'https://app.example.com/' })).toBe('https://app.example.com/api/internal/media-jobs');
  });

  it('requires server-only Mux API credentials and explicit product video quality', () => {
    const env = {
      MUX_TOKEN_ID: 'token-id',
      MUX_TOKEN_SECRET: 'token-secret',
      MUX_SIGNING_KEY_ID: 'signing-key-id',
      MUX_SIGNING_KEY_PRIVATE: 'private-key',
      MUX_VIDEO_QUALITY: 'plus',
    };

    expect(getMuxApiConfig(env)).toEqual({
      tokenId: 'token-id',
      tokenSecret: 'token-secret',
      signingKeyId: 'signing-key-id',
      signingKeyPrivate: 'private-key',
    });
    expect(getMuxVideoQuality(env)).toBe('plus');
    expect(() => getMuxVideoQuality({ ...env, MUX_VIDEO_QUALITY: 'premium' })).toThrow(MediaConfigError);
  });

  it('keeps Mux webhook secret separate from upload and signing config', () => {
    const apiEnv = {
      MUX_TOKEN_ID: 'token-id',
      MUX_TOKEN_SECRET: 'token-secret',
      MUX_SIGNING_KEY_ID: 'signing-key-id',
      MUX_SIGNING_KEY_PRIVATE: 'private-key',
    };

    expect(getMuxApiConfig(apiEnv)).toEqual({
      tokenId: 'token-id',
      tokenSecret: 'token-secret',
      signingKeyId: 'signing-key-id',
      signingKeyPrivate: 'private-key',
    });
    expect(() => getMuxWebhookConfig(apiEnv)).toThrow(MediaConfigError);
    expect(getMuxWebhookConfig({ MUX_WEBHOOK_SECRET: 'webhook-secret' })).toEqual({ webhookSecret: 'webhook-secret' });
  });

  it('uses the conservative default upload chunk and retry settings', () => {
    expect(getVideoUploadClientConfig({})).toEqual({
      chunkSizeKb: 8192,
      chunkAttempts: 5,
    });
  });

  it('falls back to defaults for invalid environment values', () => {
    expect(getVideoUploadClientConfig({
      VIDEO_UPLOAD_CHUNK_SIZE_KB: 'not-a-number',
      VIDEO_UPLOAD_CHUNK_ATTEMPTS: '0',
    })).toEqual({
      chunkSizeKb: 8192,
      chunkAttempts: 5,
    });
  });

  it('clamps upload config to supported bounds', () => {
    expect(getVideoUploadClientConfig({
      VIDEO_UPLOAD_CHUNK_SIZE_KB: '999999',
      VIDEO_UPLOAD_CHUNK_ATTEMPTS: '99',
    })).toEqual({
      chunkSizeKb: 30_720,
      chunkAttempts: 8,
    });

    expect(getVideoUploadClientConfig({
      VIDEO_UPLOAD_CHUNK_SIZE_KB: '1024',
      VIDEO_UPLOAD_CHUNK_ATTEMPTS: '1',
    })).toEqual({
      chunkSizeKb: 5120,
      chunkAttempts: 3,
    });
  });

  it('normalizes chunk size to a 256 KB multiple', () => {
    expect(getVideoUploadClientConfig({
      VIDEO_UPLOAD_CHUNK_SIZE_KB: '8300',
      VIDEO_UPLOAD_CHUNK_ATTEMPTS: '6',
    })).toEqual({
      chunkSizeKb: 8192,
      chunkAttempts: 6,
    });
  });
});
