import { describe, expect, test } from 'vitest';
import { isTrustedReviewImageUrl } from '../../src/widget/core/helpers.js';

describe('widget review image trust policy', () => {
  test('accepts only the simplified AWS public review image URL shape', () => {
    expect(isTrustedReviewImageUrl('https://media.renuvex.app/reviews/00000000-0000-4000-8000-000000000001/thumb_640x854.webp')).toBe(true);
    expect(isTrustedReviewImageUrl('https://media.renuvex.app/reviews/00000000-0000-4000-8000-000000000001/w1200.jpeg')).toBe(true);

    expect(isTrustedReviewImageUrl('https://media.renuvex.app/reviews/00000000-0000-4000-8000-000000000001/w1200.jpeg?width=1200')).toBe(false);
    expect(isTrustedReviewImageUrl('https://media.renuvex.app/reviews/00000000-0000-4000-8000-000000000001/unknown.webp')).toBe(false);
    expect(isTrustedReviewImageUrl('https://media.renuvex.app/review-images/v1/public/stores/store-1/assets/00000000-0000-4000-8000-000000000001/variants/w1200.jpeg')).toBe(false);
    expect(isTrustedReviewImageUrl('https://renuvex-review-images-prod-989086371563-eu-central-1.s3.eu-central-1.amazonaws.com/reviews/00000000-0000-4000-8000-000000000001/w1200.jpeg')).toBe(false);
  });
});
