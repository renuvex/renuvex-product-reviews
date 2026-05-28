---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-28
last_verified: 2026-05-28
confidence: medium
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
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
---

# Structured Data & Rich Snippets

## Summary
Google rich snippets need Product structured data with an `aggregateRating` on the product page. The widget now emits client-side JSON-LD from the independent PDP rating-badge surface when a trusted rating summary exists. The runtime does not emit JSON-LD when the badge is disabled, the active theme is unsupported for auto-placement, or the product has no rating summary.

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

The JSON-LD writer lives with `rating-badge/inject.js`, not the review section. This matches ADR_0024: JSON-LD is a badge/rating-summary concern, and stale structured data is cleaned with stale PDP badge DOM on SPA navigation or disabled/unsupported paths.

## Automated Checks
- `pnpm test:widget-smoke` verifies JSON-LD exists when the PDP badge path is active.
- `pnpm test:widget-smoke` verifies JSON-LD is absent when the badge is disabled or auto-placement is unsupported.
- `pnpm test:widget-runtime` verifies JSON-LD presence across representative review section layout combinations.

These tests prove the browser runtime contract. They do not prove Google indexing behavior.

## Live SEO Verification Playbook
Use this after a production deploy that changes rating-badge, settings, product identity, or JSON-LD behavior:

1. Open a public PDP with approved reviews and visible PDP badge.
2. In DevTools, confirm one `<script id="renuvex-pr-jsonld" type="application/ld+json">` exists after widget idle.
3. Paste the public PDP URL into Google Rich Results Test: https://search.google.com/test/rich-results
4. Confirm Google renders the page and sees Product `aggregateRating`.
5. Record the URL, deploy hash, widget runtime hash, result, and date in [[Log]] or a dedicated SEO verification note.

If Google does not see client-injected JSON-LD reliably, revisit the hybrid/server-rendered option.

## Constraints
- Schema.org `aggregateRating` requires non-zero `reviewCount` and a `ratingValue` between 1..5. Do not emit when no approved reviews exist.
- Google may render JS, but the timing and indexing behavior must be proven on a real ikas storefront.
- Server-rendered JSON-LD would be more SEO-reliable but requires an ikas theme include or another platform-supported server-side surface.

## Open Questions
- Should we emit individual `review` entries? This has privacy implications if author names are public.
- Should we expose this as a settings toggle?
- Should we add a server-rendered structured-data endpoint for merchants who want the strongest SEO guarantee?

## Related Source Files
- [src/widget/rating-badge/inject.js](src/widget/rating-badge/inject.js)
- [src/widget/rating-badge/index.js](src/widget/rating-badge/index.js)
- [tests/widget-network-smoke.spec.ts](tests/widget-network-smoke.spec.ts)

## Obsidian Links
- [[Roadmap]]
- [[Open_Questions]]
- [[Google_Rich_Snippets_Research]]
- [[Storefront_Widget_Overview]]
- [[Test_Strategy]]
