import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  assertReviewRequestSameOrigin,
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
});
