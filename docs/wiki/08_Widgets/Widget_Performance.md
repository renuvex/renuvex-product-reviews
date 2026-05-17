---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-17
last_verified: 2026-05-17
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
  - "src/widget/classic-loader.js"
  - "src/widget/index.js"
  - "src/widget/core/lazy-modules.js"
  - "public/widget.js"
  - "public/widget-runtime/build-manifest.json"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
---

# Widget Performance

## Summary
The widget runs on every storefront page in the world that hosts our merchants. Bundle size, time to interactive, and request fan-out are the three numbers that matter.

## Current footprint
- Phase 2 local build output on 2026-05-17: `public/widget.js` is a classic compatibility loader (~1.6 KB), `public/widget-runtime/runtime.js` is the ESM runtime entry (~9.6 KB), and heavy PDP/product rendering is behind lazy ESM chunks.
- `public/widget-runtime/build-manifest.json` records output bytes and import kinds. In the local build, the runtime entry has dynamic imports for product bootstrap, listing badges, and preview/product render.
- The deployed pre-Phase-2 `https://new-ikas-app.vercel.app/widget.js?...` response measured `177763` bytes on 2026-05-15. Re-measure after deployment before claiming live performance improvement.
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
- **Module split**: current Phase 2 work uses one classic ikas-compatible loader plus lazy ESM modules. New major surfaces such as Q&A, media gallery upgrades, review summaries, analytics, and schema should follow the same loader/registry pattern.

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
- Heavy code paths should stay behind the ESM lazy module boundary and should not be statically imported by `src/widget/loader.js`, `src/widget/index.js`, or always-loaded core modules.
- Browser support target is ES2017 (per esbuild config). Don't use newer syntax that wouldn't transpile.

## Related Source Files
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
- [src/widget/](src/widget/)
- [public/widget.js](public/widget.js)
- [public/widget-runtime/build-manifest.json](public/widget-runtime/build-manifest.json)

## Obsidian Links
- [[Caching_And_Performance]]
- [[Widget_Architecture]]
- [[Storefront_Widget_Overview]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Yotpo_Protein_Ocean_Widget_Research]]
