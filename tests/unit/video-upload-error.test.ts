import { describe, expect, it } from 'vitest';
import {
  describeVideoUploadError,
  shouldDiscardStoredVideoSession,
  videoProcessingPollDelayMs,
  videoUploadProgressPercent,
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

  it('starts resumed upload progress from already completed multipart parts', () => {
    const partSize = 10 * 1024 * 1024;
    expect(videoUploadProgressPercent(
      25 * 1024 * 1024,
      partSize,
      [1, 2],
      {},
    )).toBe(76);
    expect(videoUploadProgressPercent(
      25 * 1024 * 1024,
      partSize,
      [1, 2],
      { 3: 2.5 * 1024 * 1024 },
    )).toBe(86);
  });

  it('keeps unknown network errors retryable with the generic copy', () => {
    expect(describeVideoUploadError(new Error('network_failed'))).toEqual({
      code: 'network_failed',
      message: 'Video yüklenemedi. Tekrar deneyin.',
      retryable: true,
      retryAfterSec: null,
    });
  });

  it('discards a stored upload only when the server confirms the session is gone', () => {
    expect(shouldDiscardStoredVideoSession(new VideoUploadRequestError('upload_not_found', 404, null))).toBe(true);
    expect(shouldDiscardStoredVideoSession(new VideoUploadRequestError('invalid_or_expired_upload', 404, null))).toBe(true);
    expect(shouldDiscardStoredVideoSession(new VideoUploadRequestError('video_status_failed', 500, null))).toBe(false);
    expect(shouldDiscardStoredVideoSession(new Error('network_failed'))).toBe(false);
  });
});
