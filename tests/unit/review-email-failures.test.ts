import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { captureException } = vi.hoisted(() => ({ captureException: vi.fn() }));
vi.mock('@sentry/nextjs', () => ({ captureException }));

import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';

describe('review email failure sanitization', () => {
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });
  afterEach(() => vi.restoreAllMocks());

  it('replaces unknown exceptions before console and Sentry persistence surfaces', () => {
    const canary = 'Customer@Example.com\r\nraw-token postgres://user:secret@db.internal/reviews';
    const failure = normalizeReviewEmailFailure(
      'order_webhook',
      Object.assign(new Error(canary), { code: canary }),
      { retryable: true },
    );

    reportReviewEmailFailure('order_webhook', failure, 'opaque-event-id');

    expect(failure).toEqual({ code: 'order_webhook_processing_failed', retryable: true });
    expect(consoleError).toHaveBeenCalledWith('[review-email-failure]', {
      context: 'order_webhook',
      code: 'order_webhook_processing_failed',
      opaqueId: 'opaque-event-id',
    });
    const sentryError = captureException.mock.calls[0]?.[0] as Error;
    const sentryContext = captureException.mock.calls[0]?.[1];
    expect(sentryError.message).toBe('order_webhook_processing_failed');
    expect(JSON.stringify(sentryContext)).not.toContain(canary);
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain(canary);
  });

  it('preserves only allowlisted domain codes and rejects arbitrary error.code values', () => {
    expect(normalizeReviewEmailFailure('data_subject_erasure', {
      code: 'ambiguous_subject',
      retryable: false,
    })).toEqual({ code: 'ambiguous_subject', retryable: false });

    expect(normalizeReviewEmailFailure('data_subject_erasure', {
      code: 'arbitrary_provider_payload',
      retryable: true,
    })).toEqual({ code: 'data_subject_erasure_failed', retryable: true });

    expect(normalizeReviewEmailFailure('review_email_settings', new Error('postgres://user:secret@db.internal/reviews')))
      .toEqual({ code: 'review_email_settings_failed', retryable: false });
  });
});
