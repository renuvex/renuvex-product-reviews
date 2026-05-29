import { describe, expect, test } from 'vitest';
import { buildProductAggregateRatingJsonLd, STRUCTURED_DATA_SCRIPT_ID } from '../../src/widget/structured-data/jsonld.js';

describe('structured-data JSON-LD builder', () => {
  test('builds Product AggregateRating with stable entity id and numeric rating fields', () => {
    const payload = buildProductAggregateRatingJsonLd({
      productName: 'Premium',
      url: 'https://merchant.test/premium-shorts?Color=Black#reviews',
      entityId: 'https://merchant.test/premium-shorts#product',
      ratingValue: '4.8',
      reviewCount: 12,
    });

    expect(payload).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': 'https://merchant.test/premium-shorts#product',
      name: 'Premium',
      url: 'https://merchant.test/premium-shorts?Color=Black',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.8,
        reviewCount: 12,
        bestRating: '5',
        worstRating: '1',
      },
    });
  });

  test('keeps the owned script id stable for cleanup and verifier tooling', () => {
    expect(STRUCTURED_DATA_SCRIPT_ID).toBe('renuvex-pr-jsonld');
  });
});
