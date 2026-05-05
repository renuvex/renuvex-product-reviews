---
type: widget
project: ikas-review-app
status: draft
created: 2026-05-05
updated: 2026-05-05
tags:
  - seo
  - structured-data
  - jsonld
related:
  - "[[Index]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Roadmap]]"
---

# Structured Data & Rich Snippets

## Summary
Google rich snippets — the ★ rating + count under a product link in SERPs — require structured data (JSON-LD) on the product page. Today, **we don't emit any**. Adding this is one of the highest-ROI SEO features for merchants. Status: **planned** ([[Roadmap]]).

## What we'd emit
For each product page with reviews:
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
And optionally individual `Review` entries for richness.

## Implementation options
1. **Client-side via widget.js** — widget injects a `<script type="application/ld+json">` after fetching reviews. Pro: zero theme changes. Con: Google's crawler may execute JS but execution timing matters; risk that JSON-LD lands too late.
2. **Server-rendered JSON-LD** — merchant adds an ikas theme include that fetches `/api/public/structured-data?storeId&productId` server-side and renders inline. Pro: SEO-bulletproof. Con: requires merchant theme edit (friction).
3. **Hybrid** — option 1 by default; document option 2 for advanced merchants who want full reliability.

## Decision criteria
- Test option 1 with a real ikas storefront via Google Search Console / Rich Results Test before committing.
- If Google treats it correctly, option 1 wins. Otherwise, do hybrid.

## Constraints
- Schema.org `aggregateRating` requires non-zero `reviewCount` and a `ratingValue` between 1..5. Don't emit when no approved reviews exist.
- `Product` requires either `offers`, `review`, or `aggregateRating` to be eligible for review snippets.
- The widget already has slug/productName in scope — but `Product.name` and `image` may need additional fetch from ikas if not present in DOM.

## Open questions
- Should we emit individual `review` entries (richer)? Privacy implications if author names are public.
- Should we expose this as a settings toggle (per-merchant opt-in)?
- Cache TTL for the structured-data endpoint (option 2)?

## Notes
- Rich snippets are subject to Google's quality guidelines — don't over-engineer; emit accurate data, nothing inflated.
- Schema.org spec changes occasionally. Pin our usage to current best-practice and review yearly.

## Related Source Files
- [src/widget/](src/widget/)
- [src/app/api/public/](src/app/api/public/) (no SD endpoint yet)

## Obsidian Links
- [[Roadmap]]
- [[Open_Questions]]
- [[Google_Rich_Snippets_Research]]
- [[Storefront_Widget_Overview]]
