---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - widget
  - performance
related:
  - "[[Index]]"
  - "[[Caching_And_Performance]]"
  - "[[Widget_Architecture]]"
---

# Widget Performance

## Summary
The widget runs on every storefront page in the world that hosts our merchants. Bundle size, time to interactive, and request fan-out are the three numbers that matter.

## Current footprint
- Bundle: `public/widget.js` ≈ 165 KB minified (single IIFE).
- Initial requests on PDP: 2 (`/api/public/settings`, `/api/public/reviews`). Edge-cached `s-maxage=60, stale-while-revalidate=300`.
- Initial requests on listing page: 1 (`/api/public/ratings-by-slug` — bulk).
- Image upload: client-direct to Cloudinary; no proxy through our server.

## Hot levers
- **Bundle size**: avoid heavy deps. The widget is plain JS — no framework. Don't add one without an ADR.
- **Edge cache TTL**: currently 60s. Trade-off vs moderation latency. Don't lower without reason; consider raising for read-heavy merchants.
- **Listing-page badges**: bulk endpoint with single round-trip — preserve this pattern when adding features.
- **Image transformations**: prefer Cloudinary URL params (`f_auto,q_auto,w_400`) over post-load resizing.

## Anti-patterns to avoid
- Per-card requests on listing pages → quadratic cost.
- Synchronous DOM mutations in tight loops without `requestAnimationFrame` batching.
- Adding `<link>` or `<style>` elements that block paint — inject styles at end of body or via `adoptedStyleSheets`.
- Polling. Use the existing MutationObserver pattern.

## Measurement ideas (not yet wired)
- Add a `?w=<bundle-version>` to widget script src and report a Vercel Analytics event on first run, including bundle size + first-render time.
- Lighthouse CI for a representative storefront page.

## Notes
- When adding a feature, ask: "Does this need to ship to every page, or only to PDPs?" Listing-only / PDP-only branches matter.
- Heavy code paths should be lazy-imported via dynamic `<script>` injection from within the bundle, NOT bundled into the main script.
- Browser support target is ES2017 (per esbuild config). Don't use newer syntax that wouldn't transpile.

## Related Source Files
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
- [src/widget/](src/widget/)
- [public/widget.js](public/widget.js)

## Obsidian Links
- [[Caching_And_Performance]]
- [[Widget_Architecture]]
- [[Storefront_Widget_Overview]]
