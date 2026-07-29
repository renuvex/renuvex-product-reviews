import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  assertReviewRequestSameOrigin,
  resolvePublicReviewSubmissionChannel,
  ReviewRequestHostError,
} from '@/lib/review-email/public-access';

describe('review-center same-origin boundary', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('accepts only the exact configured origin', () => {
    vi.stubEnv('REVIEW_REQUEST_PUBLIC_BASE_URL', 'https://reviews.renuvex.app');
    expect(() => assertReviewRequestSameOrigin(new Request('https://reviews.renuvex.app/request', {
      headers: { Origin: 'https://reviews.renuvex.app' },
    }))).not.toThrow();

    for (const origin of [
      null,
      'null',
      'http://reviews.renuvex.app',
      'https://reviews.renuvex.app:444',
      'https://sub.reviews.renuvex.app',
      'https://reviews.renuvex.app.attacker.example',
      'https://renuvex.app',
    ]) {
      const headers = origin === null ? undefined : { Origin: origin };
      expect(() => assertReviewRequestSameOrigin(new Request('https://reviews.renuvex.app/request', { headers })))
        .toThrow(ReviewRequestHostError);
    }
  });

  it('selects storefront only when neither the review host nor a legacy session is present', () => {
    vi.stubEnv('REVIEW_REQUEST_PUBLIC_BASE_URL', 'https://reviews.renuvex.app');

    expect(resolvePublicReviewSubmissionChannel(
      new Request('https://merchant.example/api/public/reviews', {
        headers: { Host: 'merchant.example', Origin: 'https://arbitrary.example' },
      }),
      { reviewEmailEnabled: false, reviewRequestSession: '' },
    )).toBe('storefront');
  });

  it('does not require review-host configuration for a disabled anonymous storefront submit', () => {
    vi.stubEnv('REVIEW_REQUEST_PUBLIC_BASE_URL', '');

    expect(resolvePublicReviewSubmissionChannel(
      new Request('https://merchant.example/api/public/reviews', {
        headers: { Host: 'merchant.example', Origin: 'https://merchant.example' },
      }),
      { reviewEmailEnabled: false, reviewRequestSession: '' },
    )).toBe('storefront');

    expect(() => resolvePublicReviewSubmissionChannel(
      new Request('https://merchant.example/api/public/reviews', {
        headers: {
          Host: 'merchant.example',
          Origin: 'https://merchant.example',
        },
      }),
      { reviewEmailEnabled: false, reviewRequestSession: 'legacy-session' },
    )).toThrow(ReviewRequestHostError);
  });

  it('requires the feature, exact host, and exact origin for legacy review submissions', () => {
    vi.stubEnv('REVIEW_REQUEST_PUBLIC_BASE_URL', 'https://reviews.renuvex.app');

    const exactRequest = new Request('https://reviews.renuvex.app/api/public/reviews', {
      headers: {
        Host: 'reviews.renuvex.app',
        Origin: 'https://reviews.renuvex.app',
      },
    });
    expect(resolvePublicReviewSubmissionChannel(exactRequest, {
      reviewEmailEnabled: true,
      reviewRequestSession: 'session',
    })).toBe('review_request');

    expect(() => resolvePublicReviewSubmissionChannel(exactRequest, {
      reviewEmailEnabled: false,
      reviewRequestSession: 'session',
    })).toThrow(ReviewRequestHostError);

    expect(() => resolvePublicReviewSubmissionChannel(
      new Request('https://merchant.example/api/public/reviews', {
        headers: {
          Host: 'merchant.example',
          Origin: 'https://reviews.renuvex.app',
        },
      }),
      { reviewEmailEnabled: true, reviewRequestSession: 'session' },
    )).toThrow(ReviewRequestHostError);

    for (const origin of [null, 'null', 'https://attacker.example']) {
      const headers = new Headers({ Host: 'reviews.renuvex.app' });
      if (origin !== null) headers.set('Origin', origin);
      expect(() => resolvePublicReviewSubmissionChannel(
        new Request('https://reviews.renuvex.app/api/public/reviews', { headers }),
        { reviewEmailEnabled: true, reviewRequestSession: 'session' },
      )).toThrow(ReviewRequestHostError);
    }
  });
});
