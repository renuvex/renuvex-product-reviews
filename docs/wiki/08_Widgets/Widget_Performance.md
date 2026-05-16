---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-15
last_verified: 2026-05-15
confidence: high
tags:
  - widget
  - performance
related:
  - "[[Index]]"
  - "[[Caching_And_Performance]]"
  - "[[Widget_Architecture]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[Yotpo_Protein_Ocean_Widget_Research]]"
source_files:
  - "scripts/build-widget.mjs"
  - "src/widget/index.js"
  - "public/widget.js"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
---

# Widget Performance

## Summary
The widget runs on every storefront page in the world that hosts our merchants. Bundle size, time to interactive, and request fan-out are the three numbers that matter.

## Current footprint
- Bundle: `public/widget.js` is a single IIFE. The deployed `https://new-ikas-app.vercel.app/widget.js?...` response measured `177763` bytes on 2026-05-15.
- Initial requests on PDP: 2 (`/api/public/settings`, `/api/public/reviews`). Edge-cached `s-maxage=60, stale-while-revalidate=300`.
- Initial requests on listing page: 1 (`/api/public/ratings-by-slug` — bulk).
- Image upload: client-direct to Cloudinary; no proxy through our server.

## 2026-05-15 Live Observations

Dev store smoke test:

- storefront HTML included one `new-ikas-app.vercel.app/widget.js` script tag
- homepage DOM had listing badges mounted
- product page DOM had `#ikas-reviews-widget` and `#ikas-reviews-anchor`
- public settings, reviews, and ratings endpoints returned 200
- deployed widget response header was `Cache-Control: public, max-age=0, must-revalidate`

Yotpo/Protein Ocean reference:

- Yotpo uses many small versioned modules instead of one ever-growing widget bundle
- static Yotpo modules used long cache headers such as `max-age=31536000`
- dynamic review/rating/Q&A API responses used `max-age=0, no-cache, no-store`
- page runtime loaded star rating, main reviews, Q&A, media gallery, filters, CSS overrides, fonts, and pixels as separate resources

## Hot levers
- **Bundle size**: avoid heavy deps. The widget is plain JS — no framework. Don't add one without an ADR.
- **Edge cache TTL**: currently 60s. Trade-off vs moderation latency. Don't lower without reason; consider raising for read-heavy merchants.
- **Listing-page badges**: bulk endpoint with single round-trip — preserve this pattern when adding features.
- **Image transformations**: prefer Cloudinary URL params (`f_auto,q_auto,w_400`) over post-load resizing.
- **Module split**: new major surfaces such as Q&A, media gallery upgrades, review summaries, analytics, and schema should be lazy modules behind a loader.

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
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Yotpo_Protein_Ocean_Widget_Research]]
