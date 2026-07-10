import { describe, expect, it } from 'vitest';
import { isSensitiveReviewRequestPath } from '@/lib/review-email/sentry-privacy';

describe('review request browser telemetry privacy', () => {
  it('isolates only the review-request document path', () => {
    expect(isSensitiveReviewRequestPath('/request')).toBe(true);
    expect(isSensitiveReviewRequestPath('/request/')).toBe(true);
    expect(isSensitiveReviewRequestPath('/')).toBe(false);
    expect(isSensitiveReviewRequestPath('/api/public/review-request')).toBe(false);
    expect(isSensitiveReviewRequestPath('/request-example')).toBe(false);
  });
});
