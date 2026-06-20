import { describe, expect, it } from 'vitest';
import {
  getMediaJobEndpoint,
  getMuxApiConfig,
  getMuxWebhookConfig,
  getMuxVideoQuality,
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
});
