---
type: research
project: renuvex-product-reviews
status: draft
created: 2026-05-05
updated: 2026-05-05
tags:
  - research
  - seo
  - jsonld
related:
  - "[[Index]]"
  - "[[Structured_Data_And_Rich_Snippets]]"
---

# Google Rich Snippets Research

## Summary
Notes on what Google requires + accepts for product review rich snippets. Inputs to the [[Structured_Data_And_Rich_Snippets]] decision.

## Key reference points (verify before relying on)
- Schema: `Product` with `aggregateRating` and optional `review`.
- `aggregateRating` requires `ratingValue`, `reviewCount`, optional `bestRating`/`worstRating`.
- Google Search Console "Rich Results Test" — primary tool for verifying our output renders as a rich snippet.
- Google supports JSON-LD injected via JS in some cases — but timing matters (must be in the rendered HTML when Googlebot snapshots).

## Open questions
- Does Googlebot render our `widget.js` and pick up JSON-LD inserted client-side on real ikas storefronts? Test on a real merchant.
- If client-side fails, we need a server-rendered include (theme-side merchant edit) — quantify the friction.
- Should we emit `review` entries (richer snippet but more data exposure)?

## Useful tools
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Product spec: https://schema.org/Product

## TODO
- Pick one merchant, deploy a JSON-LD injecting widget version, verify with Rich Results Test.
- Compare snippet eligibility before/after.

## Obsidian Links
- [[Structured_Data_And_Rich_Snippets]]
- [[Roadmap]]
