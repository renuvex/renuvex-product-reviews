---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-24
last_verified: 2026-06-24
confidence: high
tags:
  - performance
  - caching
related:
  - "[[Index]]"
  - "[[API_Design]]"
  - "[[System_Architecture]]"
  - "[[Bug_Cloud_Name_Silent_Image_Filter]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
  - "[[ADR_0026_Product_Review_Summary_Read_Model]]"
source_files:
  - "prisma/schema.prisma"
  - "vercel.json"
  - "scripts/build-widget.mjs"
  - "scripts/clean-widget-runtime-untracked.mjs"
  - "scripts/rebuild-product-review-summaries.mjs"
  - "scripts/backfill-review-media.mjs"
  - "src/lib/review-media.ts"
  - "src/lib/review-summary.ts"
  - "src/widget/core/cache.js"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "tests/unit/widget-asset-cache.test.ts"
---

# Caching & Performance

## Summary
Two cache layers matter: (1) Vercel **edge cache** for public read APIs and (2) the widget's **sessionStorage cache** (with in-memory fallback when sessionStorage is unavailable / quota-exceeded). Postgres indexes ([[Database_Schema]]) cover the hot query shapes.

## Edge cache (Vercel CDN)

Set on:
- `GET /api/public/reviews` — per-product reviews + rating distribution
- `GET /api/public/ratings` — bulk listing/search badges by canonical ikas product id
- `GET /api/public/ratings-by-slug` — bulk badges
- `GET /api/public/settings` — widget config

Default header value: `s-maxage=60, stale-while-revalidate=300`.

2026-06-06 update: public rating badge, structured-data, and review summary distribution values are now backed by `ProductReviewSummary`; the `/api/public/reviews` list rows still come from `Review`.
2026-06-07 update: public `hasImages=true` reads now use indexed `Review.hasImages`, and review image display reads normalized `ReviewMedia` before falling back to legacy `Review.images`.
2026-06-08 update: public review list load-more now uses `nextCursor` keyset pagination when available. Legacy `page/limit` remains for compatibility, but cursor requests do not use Prisma `skip`.
2026-06-08 update: public review-list `totalCount` / `totalPages` now come from `ProductReviewSummary` buckets, including `photoRating*Count` for `hasImages=true&rating=N`; the public hot path no longer calls raw `Review.count()`.
2026-06-25 update: video-enabled public media filtering now uses `hasMedia=true` with `ProductReviewSummary.mediaReviewCount` / `mediaRating*Count`, so `Fotoğraf ve Video` totals stay read-model backed instead of raw `Review.count()`.
- 60s fresh window
- 300s SWR — stale responses served while revalidation runs in the background

`GET /api/public/settings` additionally sends `stale-if-error=604800` so CDN layers that support it can keep serving the last settings response for transient origin failures.

### Implications
- New reviews can take **up to 60s** to appear on storefronts (acceptable trade-off).
- After 60–360s, cache may serve stale data with a refresh in flight — this is the "stale-while-revalidate" design.
- **Cache key includes query params** by default, so different sort/filter combos cache separately.

## Static widget assets (Vercel CDN headers)

`public/widget.js`, the revalidated `public/widget-runtime/runtime.js` compatibility
shim, the content-hashed runtime entry, and the content-hashed chunks are served
by Vercel's static layer.
`vercel.json` `headers` sets a three-tier `Cache-Control` policy:

| Asset | `Cache-Control` | Rationale |
|---|---|---|
| `/widget.js` | `public, max-age=0, must-revalidate` | Stable URL the ikas StorefrontJSScript record points to. It must revalidate on reload so bugfix deploys can propagate immediately while the heavy content-hashed runtime stays immutable. |
| `/widget-runtime/runtime.js` | `public, max-age=0, must-revalidate` | Stable compatibility shim for older cached loaders; it follows the loader revalidation policy. |
| `/widget-runtime/runtime-*.js` | `public, max-age=31536000, immutable` | Content-hashed runtime entry; current `widget.js` imports this direct path. |
| `/widget-runtime/chunks/*` | `public, max-age=31536000, immutable` | Content-hashed filenames — a code change yields a new filename, so old chunks are safe to cache for a year. |

On page reload, a widget code deploy revalidates the stable loader/shim instead
of waiting behind a client-side `max-age` window. The runtime entry and chunks
are content-hashed and immutable; their hashes exclude volatile build timestamps,
and the build script keeps old hashed runtime/chunk files in place so an already
open tab or intermediary cache holding a previous `widget.js` does not point at a
missing asset after deploy. `runtime.js` remains only as a stable compatibility
shim. This static-asset policy is independent of the API edge cache above and
does not affect moderation latency.

Local build runs can also leave untracked hash-named runtime files that are not
referenced by the current `build-manifest.json`. Those files are not part of the
runtime retention contract until committed. Use `pnpm clean:widget-runtime` for
a dry-run report and `pnpm clean:widget-runtime:apply` only when intentionally
cleaning local manifest-unreferenced untracked files. The helper does not touch
tracked retention files.

## Widget client cache
[src/widget/core/cache.js](src/widget/core/cache.js) wraps `sessionStorage` with an in-memory fallback. Avoids redundant fetches when the user clicks pagination, opens/closes modal, navigates between products in the same tab, etc. **Persists** for the duration of the browser tab (sessionStorage semantics) — cleared when the tab is closed.

Settings have a 5-minute fresh window in the widget and a 24-hour stale tolerance for transient settings fetch failures. The trusted Cloudinary cloud name is **not** in settings — it is injected as a build-time constant into the widget bundle (see [[ADR_0008_Cloud_Name_Build_Time_Only]]); no per-store runtime image-policy cache exists.

## DB query patterns
See [[Database_Schema]] for index coverage. Notable hot paths:
- Public reviews: covered by `[storeId, productId]`.
- Public photo reviews and image-only media-gallery reads: covered by the partial `Review(storeId, productId, createdAt) where status='approved' and hasImages=true` index; public video/media reads also have the approved-video newest partial index for the video side of `hasMedia=true`. Do not use `Review.images contains` text scans.
- Public review list load-more: covered by partial cursor indexes for `newest`, `highest`, and `lowest` orderings. Keep the API's deterministic `createdAt + id` tie-breakers aligned with those indexes.
- Listing badges: primary product-id path covered by `[storeId, productId, status]`; legacy slug fallback covered by `[storeId, slug, status]`.
- Admin filtered list: covered by `[storeId, status]`.

`ProductReviewSummary` owns the hot aggregate read path for `/api/public/ratings`, resolved `/api/public/ratings-by-slug`, unfiltered review summary distribution, and exact review-list totals across rating/photo/media filters. Future high-read widgets should add explicit read models instead of public fan-out over raw review aggregates.
`ReviewMedia` owns normalized review media rows, while `Review.hasImages` and `Review.hasVideo` own the public media facets. Future media-heavy widgets should read structured media rows rather than parsing legacy `Review.images`.
`GET /api/public/reviews` owns row pagination. New infinite-list or load-more consumers should use `nextCursor`; keep `page/limit` only for compatibility or future numbered pagination UI.

- The migration history shows we cleaned up redundant indexes once already — be selective.

## ikas API calls
- Refresh path runs only when `expireDate < now`. Otherwise the existing accessToken is reused.
- OAuth callback issues several GraphQL calls in parallel (`getMerchant + getAuthorizedApp`, `listStorefront`, then per-storefront upserts via `Promise.all`).
- No cache for ikas responses today — they're called sparingly (install + manual re-inject).

## Widget bundle size
- Post-Phase-3 the widget is split: [public/widget.js](public/widget.js) is a ~1.6 KB classic loader, `public/widget-runtime/runtime.js` is a tiny compatibility shim, the active ESM entry is a ~9.8 KB `runtime-*.js`, and the bulk lives in lazy-loaded content-hashed chunks (largest ~147 KB). See [[Widget_Performance]] and [[ADR_0013_Modular_Widget_Loader_Architecture]].
- Loaded `async` so it doesn't block first paint, but TTFB matters since merchants pay for storefront performance.
- Adding heavy features → keep them behind the lazy ESM module boundary, not statically imported by the always-loaded loader/runtime.

## Image performance
- Cloudinary URLs come pre-CDN'd. Storefront images can use Cloudinary transformations (`f_auto,q_auto,w_400`) — verify the widget URLs include these params.
- No lazy-loading attribute set on image tags by default — review when adding photo gallery to listing pages.

## Possible improvements (not done)
- Add `Vary: Origin` header to safely tighten CORS later.
- Postgres connection pooling: already on PgBouncer transaction-mode (`?pgbouncer=true`). Verify Prisma has appropriate `connection_limit` — default is per-instance, watch for cold-start storms.
- Re-measure deployed transfer size after the hashed runtime deploy and record the live network baseline in [[Widget_Performance]].

## Notes
- Don't add caching that requires invalidation logic without a story for **how** invalidation happens. The current model — short TTL + SWR — is intentionally invalidation-free.
- When experimenting with longer TTLs, remember moderation latency: the time between approve in admin and visible on storefront is bounded by `s-maxage`.

## Related Source Files
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/app/api/public/ratings/route.ts](src/app/api/public/ratings/route.ts)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)
- [src/app/api/public/settings/route.ts](src/app/api/public/settings/route.ts)
- [src/lib/review-media.ts](src/lib/review-media.ts)
- [src/widget/core/cache.js](src/widget/core/cache.js)

## Obsidian Links
- [[API_Design]]
- [[Database_Schema]]
- [[Widget_Architecture]]
- [[Widget_Performance]]
- [[Bug_Cloud_Name_Silent_Image_Filter]]
- [[ADR_0015_Canonical_Product_Identity]]
- [[ADR_0026_Product_Review_Summary_Read_Model]]
- [[ADR_0027_Review_Media_Read_Model]]

## Change Log
- 2026-06-24: Added `scripts/clean-widget-runtime-untracked.mjs` and npm wrappers to separate local untracked widget build leftovers from the committed seven-day runtime retention contract. The default command is dry-run; `--apply` deletes only untracked files outside the current manifest.
- 2026-06-08: Public review-list exact `totalCount` / `totalPages` moved from raw `Review.count()` to `ProductReviewSummary` buckets, preserving response shape while removing the remaining aggregate scan from the public read path.
- 2026-06-07: Public photo-review filtering moved from `Review.images` text matching to indexed `Review.hasImages`; normalized image rows live in `ReviewMedia`. See [[ADR_0027_Review_Media_Read_Model]].
- 2026-06-08: Public review list load-more moved from offset-only pagination to cursor/keyset pagination while preserving page compatibility. See [[ADR_0028_Review_Cursor_Pagination]].
- 2026-06-06: Public rating badge, structured-data, and unfiltered review summary aggregates moved to `ProductReviewSummary`; 2026-06-08 extended it to exact filtered review-list counts. List rows still use `Review`. Future high-read widgets should define explicit read models before adding public fan-out.
- 2026-06-02: Changed the stable storefront loader and stable runtime shim cache headers from `max-age=300` to `max-age=0, must-revalidate`; content-hashed runtime/chunk assets remain one-year immutable. This keeps widget bugfix deploy propagation immediate on reload without giving up immutable cache performance for heavy assets.
- 2026-05-18: Reduced widget-side stale settings tolerance from 7 days to 24 hours. Transient settings outages still have a same-tab fallback, but merchant changes cannot remain hidden behind a week-long stale cache.
- 2026-05-17: Runtime versioning completed: production builds emit a content-hashed `runtime-*.js`, `widget.js` imports that direct path, and stable `runtime.js` remains a revalidated compatibility shim for older cached loaders. Related: [[ADR_0013_Modular_Widget_Loader_Architecture]] Phase 3.
- 2026-05-17: Added `/api/public/ratings` product-id endpoint and `[storeId, productId, status]` hot-path index for canonical listing/search badge reads. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added the "Static widget assets" section — `vercel.json` `headers` now sets a three-tier `Cache-Control` split (revalidated stable loader/runtime, `immutable` content-hashed chunks). Refreshed the stale pre-Phase-2 bundle-size note. Related: [[ADR_0013_Modular_Widget_Loader_Architecture]] Phase 3.
- 2026-05-11: Documented public settings `stale-if-error=604800` and 7-day widget stale settings tolerance. A separate legacy image-policy cache was added on 2026-05-11 then removed the same day by [[ADR_0008_Cloud_Name_Build_Time_Only]] — cloud name is now a build-time constant and no runtime image-policy cache exists. Related bug: [[Bug_Cloud_Name_Silent_Image_Filter]].
