---
type: research
project: renuvex-product-reviews
status: active
created: 2026-05-29
updated: 2026-05-29
last_verified: 2026-05-29
confidence: high
tags:
  - seo
  - structured-data
  - jsonld
  - deployed-evidence
related:
  - "[[Structured_Data_And_Rich_Snippets]]"
  - "[[Widget_Performance]]"
  - "[[Test_Strategy]]"
source_files:
  - "scripts/verify-deployed-jsonld.mjs"
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "tests/widget-network-smoke.spec.ts"
---

# Structured Data Verification - 2026-05-29

## Summary
`pnpm verify:deployed-jsonld` loaded the deployed widget from `https://new-ikas-app.vercel.app` in a controlled Playwright harness and mocked public API responses. This verifies the browser runtime contract without changing production DB/admin settings.

The script validates:

- exactly one `#renuvex-pr-jsonld` script on the active badge path,
- parseable JSON,
- `@type: Product`,
- `aggregateRating.@type: AggregateRating`,
- `aggregateRating.ratingValue` between 1 and 5,
- positive integer `aggregateRating.reviewCount`,
- no JSON-LD when the badge is disabled,
- no JSON-LD when auto placement is unsupported.

## Command

```bash
pnpm verify:deployed-jsonld
```

Equivalent direct command:

```bash
node scripts/verify-deployed-jsonld.mjs
```

## Result

Measured at `2026-05-29T13:50:42.840Z`.

| Scenario | URL | JSON-LD count | Result |
|---|---|---:|---|
| controlled badge enabled | `https://merchant-seo.test/premium-shorts` | 1 | pass |
| controlled badge disabled | `https://merchant-seo.test/premium-shorts` | 0 | pass |
| controlled unsupported theme | `https://merchant-seo.test/premium-shorts` | 0 | pass |

Verifier note: the harness waits for `#renuvex-pr-jsonld` on scenarios where JSON-LD is expected, instead of treating `document.readyState === "complete"` as enough. This avoids false negatives when the deployed widget loads lazy chunks after the page document has already completed.

Active-path parsed payload:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Premium",
  "url": "https://merchant-seo.test/premium-shorts",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": 12,
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

## Google Verification Boundary

This automated script proves the deployed widget can inject valid JSON-LD into a rendered browser DOM. It does not prove Google Search eligibility by itself.

Google's current guidance says JavaScript-generated structured data can be processed when it is available in the rendered DOM, and recommends URL-mode Rich Results Test validation for JavaScript-generated structured data. The Product snippet guide requires `Product` markup to include one of `review`, `aggregateRating`, or `offers`; the widget uses `aggregateRating`.

Official references:

- https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript
- https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- https://support.google.com/webmasters/answer/7445569

## Manual Follow-Up

Use a real public PDP URL with approved reviews:

```bash
SEO_PDP_URL=https://example-store.ikas.shop/product-slug pnpm verify:deployed-jsonld
```

Then paste the same public URL into Google Rich Results Test:

https://search.google.com/test/rich-results

Record the shared Rich Results Test URL and result in a new dated research note. The Search Console Help page notes shared Rich Results Test links are valid for approximately 90 days.
