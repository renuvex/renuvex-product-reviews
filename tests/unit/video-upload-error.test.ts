import { describe, expect, it } from 'vitest';
import {
  describeVideoUploadError,
  VideoUploadRequestError,
} from '../../src/widget/reviews-section/review-form-modal/media/video-upload.js';

describe('video upload error presentation', () => {
  it.each([
    ['video_quota_exceeded', 'Bu mağaza bu ayki video yorum limitine ulaştı.', false],
    ['rate_limited', 'Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin.', false],
    ['video_upload_disabled', 'Video yükleme şu anda kullanılamıyor.', false],
    ['video_provider_unavailable', 'Video yükleme geçici olarak kullanılamıyor.', true],
  ])('maps %s to stable shopper copy and retry policy', (code, message, retryable) => {
    expect(describeVideoUploadError(new VideoUploadRequestError(code, 429, 60))).toEqual({
      code,
      message,
      retryable,
      retryAfterSec: 60,
    });
  });

  it('keeps unknown network errors retryable with the generic copy', () => {
    expect(describeVideoUploadError(new Error('network_failed'))).toEqual({
      code: 'network_failed',
      message: 'Video yüklenemedi. Tekrar deneyin.',
      retryable: true,
      retryAfterSec: null,
    });
  });
});
