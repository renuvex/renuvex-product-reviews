---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-14
last_verified: 2026-06-14
confidence: high
tags:
  - seo
  - structured-data
  - jsonld
related:
  - "[[Index]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Roadmap]]"
  - "[[Test_Strategy]]"
source_files:
  - "scripts/verify-deployed-jsonld.mjs"
  - "src/widget/structured-data/index.js"
  - "src/widget/structured-data/jsonld.js"
  - "src/widget/surfaces/structured-data.surface.js"
  - "src/widget/core/rating-summary.js"
  - "src/widget/rating-badge/index.js"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/unit/structured-data-jsonld.test.ts"
  - "docs/wiki/10_Research/Structured_Data_Verification_2026-05-29.md"
---

# Structured Data & Rich Snippets

## Summary
Google rich snippets need Product structured data with an `aggregateRating` on the product page. The widget emits client-side JSON-LD from an independent `structured-data` surface when a trusted rating summary exists and a Renuvex rating/review surface is visible or expected to be visible. JSON-LD is no longer owned by the visual PDP badge.

## Current Runtime Contract
For each PDP with a rating summary:

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Product Title",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": 12
  }
}
```

The JSON-LD writer lives in `structured-data/jsonld.js`. `rating-badge/inject.js` owns only the visual PDP badge DOM. SPA navigation cleanup calls both the badge cleanup hook and the structured-data cleanup hook without importing either lazy chunk from `events.js`.

Emission rules:

- `reviews.richSnippetsEnabled !== false` (admin: `Ürün Yorumları` → `SEO` → `Google Rich Snippets`, default `true`).
- Approved review count is greater than `0`.
- At least one visible Renuvex rating/review surface exists or is expected: PDP badge, explicit review section, or a future rating surface that declares visibility.
- Badge disabled does **not** disable JSON-LD when the explicit review section renders.
- Unsupported/generic themes disable auto-placement badges, but explicit review sections can still support JSON-LD.

## Automated Checks
- `pnpm test:widget-smoke` verifies JSON-LD across badge on/off, review mount present/absent, unsupported theme, rich-snippet toggle, and zero-approved-review scenarios.
- `pnpm test:widget-runtime` verifies JSON-LD presence across representative review section layout combinations.
- `pnpm verify:deployed-jsonld` loads the deployed widget from `https://widget.renuvex.app` in a controlled browser harness, mocks public API responses, and verifies exactly one parseable `Product` JSON-LD object with `AggregateRating` for visible rating/review scenarios. It also verifies no JSON-LD when no visible surface exists or the rich-snippet toggle is disabled.

These tests prove the browser runtime contract. They do not prove Google indexing behavior.

## Google Guidance
The runtime strategy is consistent with Google's current JavaScript structured-data guidance:

- Google Search can process structured data that is present in the rendered DOM after JavaScript execution.
- Google recommends testing JavaScript-generated structured data with the URL mode of the Rich Results Test, because code-input testing has JavaScript limitations such as CORS.
- Product snippets require `Product` markup with one of `review`, `aggregateRating`, or `offers`; this widget emits `aggregateRating` only when a trusted non-zero rating summary exists.
- Structured data must represent page content visible to users. This is why the structured-data surface is independent from badge styling but still gated by visible/expected Renuvex rating content.

Official references:

- https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript
- https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- https://support.google.com/webmasters/answer/7445569

## Live SEO Verification Playbook
Use this after a production deploy that changes structured-data, rating-badge, settings, product identity, or JSON-LD behavior:

1. Open a public PDP with approved reviews and a visible Renuvex rating/review surface.
2. In DevTools, confirm one `<script id="renuvex-pr-jsonld" type="application/ld+json">` exists after widget idle.
3. Run `pnpm verify:deployed-jsonld` for the controlled deployed harness, or `SEO_PDP_URL=<public-pdp-url> pnpm verify:deployed-jsonld` for a real URL-level check.
4. Paste the public PDP URL into Google Rich Results Test: https://search.google.com/test/rich-results
5. Confirm Google renders the page and sees Product `aggregateRating`.
6. Record the URL, deploy hash, widget runtime hash, result, and date in [[Structured_Data_Verification_2026-05-29]] or a new dated SEO verification note.

If Google does not see client-injected JSON-LD reliably, revisit the hybrid/server-rendered option.

## Constraints
- `aggregateRating` requires non-zero `reviewCount` and a `ratingValue` between 1..5. Do not emit when no approved reviews exist.
- Google may render JS, but the timing and indexing behavior must be proven on a real ikas storefront.
- Server-rendered JSON-LD would be more SEO-reliable but requires an ikas theme include or another platform-supported server-side surface.
- Google Shopping / Merchant Center Product Ratings is a separate feed/program, not solved by this JSON-LD surface alone.

## Open Questions
- Should we emit individual `review` entries? This has privacy implications if author names are public.
- Should we add a server-rendered structured-data endpoint for merchants who want the strongest SEO guarantee?
- Should we build Google Merchant Center Product Ratings XML feed support after product identifier sync is reliable?

## Related Source Files
- [src/widget/structured-data/index.js](src/widget/structured-data/index.js)
- [src/widget/structured-data/jsonld.js](src/widget/structured-data/jsonld.js)
- [src/widget/rating-badge/index.js](src/widget/rating-badge/index.js)
- [tests/widget-network-smoke.spec.ts](tests/widget-network-smoke.spec.ts)

## Obsidian Links
- [[Roadmap]]
- [[Open_Questions]]
- [[Google_Rich_Snippets_Research]]
- [[Storefront_Widget_Overview]]
- [[Test_Strategy]]
