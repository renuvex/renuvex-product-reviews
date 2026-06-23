import { describe, expect, it } from 'vitest';
import {
  describeVideoUploadError,
  shouldSurfaceManualRetryForUploadAttempt,
  shouldDiscardStoredVideoSession,
  videoProcessingPollDelayMs,
  VideoUploadRequestError,
} from '../../src/widget/reviews-section/review-form-modal/media/video-upload.js';

describe('video upload error presentation', () => {
  it.each([
    ['video_quota_exceeded', 'Bu mağaza bu ayki video yorum limitine ulaştı.', false],
    ['rate_limited', 'Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin.', false],
    ['video_upload_disabled', 'Video yükleme şu anda kullanılamıyor.', false],
    ['video_provider_unavailable', 'Video yükleme geçici olarak kullanılamıyor.', true],
    ['video_processing_delayed', 'Video hazırlanması beklenenden uzun sürüyor. Biraz sonra tekrar deneyin.', true],
  ])('maps %s to stable shopper copy and retry policy', (code, message, retryable) => {
    expect(describeVideoUploadError(new VideoUploadRequestError(code, 429, 60))).toEqual({
      code,
      message,
      retryable,
      retryAfterSec: 60,
    });
  });

  it('backs off status polling after 30 seconds and two minutes', () => {
    expect(videoProcessingPollDelayMs(0)).toBe(2000);
    expect(videoProcessingPollDelayMs(29_999)).toBe(2000);
    expect(videoProcessingPollDelayMs(30_000)).toBe(5000);
    expect(videoProcessingPollDelayMs(119_999)).toBe(5000);
    expect(videoProcessingPollDelayMs(120_000)).toBe(10_000);
  });

  it('keeps unknown network errors retryable with the generic copy', () => {
    expect(describeVideoUploadError(new Error('network_failed'))).toEqual({
      code: 'network_failed',
      message: 'Video yüklenemedi. Tekrar deneyin.',
      retryable: true,
      retryAfterSec: null,
    });
  });

  it('keeps only UpChunk transient HTTP failures in automatic retry mode', () => {
    expect(shouldSurfaceManualRetryForUploadAttempt('http_408')).toBe(false);
    expect(shouldSurfaceManualRetryForUploadAttempt('http_502')).toBe(false);
    expect(shouldSurfaceManualRetryForUploadAttempt('http_503')).toBe(false);
    expect(shouldSurfaceManualRetryForUploadAttempt('http_504')).toBe(false);

    expect(shouldSurfaceManualRetryForUploadAttempt('upchunk_error')).toBe(true);
    expect(shouldSurfaceManualRetryForUploadAttempt('upload_attempt_failed')).toBe(true);
    expect(shouldSurfaceManualRetryForUploadAttempt('http_0')).toBe(true);
    expect(shouldSurfaceManualRetryForUploadAttempt('http_500')).toBe(true);
  });

  it('discards a stored upload only when the server confirms the session is gone', () => {
    expect(shouldDiscardStoredVideoSession(new VideoUploadRequestError('upload_not_found', 404, null))).toBe(true);
    expect(shouldDiscardStoredVideoSession(new VideoUploadRequestError('invalid_or_expired_upload', 404, null))).toBe(true);
    expect(shouldDiscardStoredVideoSession(new VideoUploadRequestError('video_status_failed', 500, null))).toBe(false);
    expect(shouldDiscardStoredVideoSession(new Error('network_failed'))).toBe(false);
  });
});
