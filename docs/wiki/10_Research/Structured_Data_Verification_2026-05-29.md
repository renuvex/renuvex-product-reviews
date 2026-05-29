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
  - "src/widget/structured-data/index.js"
  - "src/widget/structured-data/jsonld.js"
  - "src/widget/core/rating-summary.js"
  - "tests/widget-network-smoke.spec.ts"
---

# Structured Data Verification - 2026-05-29

## Summary
`pnpm verify:deployed-jsonld` loads the deployed widget from `https://new-ikas-app.vercel.app` in a controlled Playwright harness and mocks public API responses. This verifies the browser runtime contract without changing production DB/admin settings.

Note: the measured result below was captured before the 2026-05-29 structured-data split. The script contract has since been updated so JSON-LD is owned by the independent `structured-data` surface and can render when the visual badge is disabled but an explicit review section is visible. Re-run the command after the structured-data deployment and append a fresh result table.

The script validates:

- exactly one `#renuvex-pr-jsonld` script on eligible visible rating/review paths,
- parseable JSON,
- `@type: Product`,
- `aggregateRating.@type: AggregateRating`,
- `aggregateRating.ratingValue` between 1 and 5,
- positive integer `aggregateRating.reviewCount`,
- JSON-LD when badge is disabled but an explicit review mount renders visible ratings,
- no JSON-LD when both visual badge and explicit review section are absent,
- no JSON-LD when the rich snippets setting is disabled.

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

Superseded expectation after structured-data split:

| Scenario | Expected JSON-LD |
|---|---:|
| badge enabled + review mount present | 1 |
| badge enabled + review mount absent | 1 |
| badge disabled + review mount present | 1 |
| badge disabled + review mount absent | 0 |
| unsupported auto-placement + review mount present | 1 |
| rich snippets disabled | 0 |

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
