---
type: architecture
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-17
tags:
  - performance
  - caching
related:
  - "[[Index]]"
  - "[[API_Design]]"
  - "[[System_Architecture]]"
  - "[[Bug_Cloud_Name_Silent_Image_Filter]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
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
- 60s fresh window
- 300s SWR — stale responses served while revalidation runs in the background

`GET /api/public/settings` additionally sends `stale-if-error=604800` so CDN layers that support it can keep serving the last settings response for transient origin failures.

### Implications
- New reviews can take **up to 60s** to appear on storefronts (acceptable trade-off).
- After 60–360s, cache may serve stale data with a refresh in flight — this is the "stale-while-revalidate" design.
- **Cache key includes query params** by default, so different sort/filter combos cache separately.

## Static widget assets (Vercel CDN headers)

`public/widget.js`, `public/widget-runtime/runtime.js`, and the content-hashed
`public/widget-runtime/chunks/*.js` are served by Vercel's static layer.
`vercel.json` `headers` sets a three-tier `Cache-Control` policy:

| Asset | `Cache-Control` | Rationale |
|---|---|---|
| `/widget.js` | `public, max-age=300, must-revalidate` | Stable URL the ikas StorefrontJSScript record points to — widget code deploys must propagate. |
| `/widget-runtime/runtime.js` | `public, max-age=300, must-revalidate` | Stable name, imported by the loader at a fixed path; cannot be `immutable` as-is. |
| `/widget-runtime/chunks/*` | `public, max-age=31536000, immutable` | Content-hashed filenames — a code change yields a new filename, so old chunks are safe to cache for a year. |

A widget code deploy reaches returning visitors within ~5 minutes (the
loader/runtime `max-age`). Content-hashing `runtime.js` so it too can be
`immutable` is a deferred [[ADR_0013_Modular_Widget_Loader_Architecture]] Phase 3
follow-up. This static-asset policy is independent of the API edge cache above
and does not affect moderation latency.

## Widget client cache
[src/widget/core/cache.js](src/widget/core/cache.js) wraps `sessionStorage` with an in-memory fallback. Avoids redundant fetches when the user clicks pagination, opens/closes modal, navigates between products in the same tab, etc. **Persists** for the duration of the browser tab (sessionStorage semantics) — cleared when the tab is closed.

Settings have a 5-minute fresh window in the widget and a 7-day stale tolerance for transient settings fetch failures. The trusted Cloudinary cloud name is **not** in settings — it is injected as a build-time constant into the widget bundle (see [[ADR_0008_Cloud_Name_Build_Time_Only]]); no per-store runtime image-policy cache exists.

## DB query patterns
See [[Database_Schema]] for index coverage. Notable hot paths:
- Public reviews: covered by `[storeId, productId]`.
- Listing badges: primary product-id path covered by `[storeId, productId, status]`; legacy slug fallback covered by `[storeId, slug, status]`.
- Admin filtered list: covered by `[storeId, status]`.
- The migration history shows we cleaned up redundant indexes once already — be selective.

## ikas API calls
- Refresh path runs only when `expireDate < now`. Otherwise the existing accessToken is reused.
- OAuth callback issues several GraphQL calls in parallel (`getMerchant + getAuthorizedApp`, `listStorefront`, then per-storefront upserts via `Promise.all`).
- No cache for ikas responses today — they're called sparingly (install + manual re-inject).

## Widget bundle size
- Post-Phase-2 the widget is split: [public/widget.js](public/widget.js) is a ~1.6 KB classic loader, `public/widget-runtime/runtime.js` is the ~9.8 KB ESM runtime entry, and the bulk lives in lazy-loaded content-hashed chunks (largest ~147 KB). See [[Widget_Performance]] and [[ADR_0013_Modular_Widget_Loader_Architecture]].
- Loaded `async` so it doesn't block first paint, but TTFB matters since merchants pay for storefront performance.
- Adding heavy features → keep them behind the lazy ESM module boundary, not statically imported by the always-loaded loader/runtime.

## Image performance
- Cloudinary URLs come pre-CDN'd. Storefront images can use Cloudinary transformations (`f_auto,q_auto,w_400`) — verify the widget URLs include these params.
- No lazy-loading attribute set on image tags by default — review when adding photo gallery to listing pages.

## Possible improvements (not done)
- Add `Vary: Origin` header to safely tighten CORS later.
- Postgres connection pooling: already on PgBouncer transaction-mode (`?pgbouncer=true`). Verify Prisma has appropriate `connection_limit` — default is per-instance, watch for cold-start storms.
- Content-hash `widget-runtime/runtime.js` (resolved from the loader) so it can join the `immutable` chunk tier instead of the 5-minute loader tier. Deferred [[ADR_0013_Modular_Widget_Loader_Architecture]] Phase 3 follow-up.

## Notes
- Don't add caching that requires invalidation logic without a story for **how** invalidation happens. The current model — short TTL + SWR — is intentionally invalidation-free.
- When experimenting with longer TTLs, remember moderation latency: the time between approve in admin and visible on storefront is bounded by `s-maxage`.

## Related Source Files
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/app/api/public/ratings/route.ts](src/app/api/public/ratings/route.ts)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)
- [src/app/api/public/settings/route.ts](src/app/api/public/settings/route.ts)
- [src/widget/core/cache.js](src/widget/core/cache.js)

## Obsidian Links
- [[API_Design]]
- [[Database_Schema]]
- [[Widget_Architecture]]
- [[Widget_Performance]]
- [[Bug_Cloud_Name_Silent_Image_Filter]]
- [[ADR_0015_Canonical_Product_Identity]]

## Change Log
- 2026-05-17: Added `/api/public/ratings` product-id endpoint and `[storeId, productId, status]` hot-path index for canonical listing/search badge reads. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added the "Static widget assets" section — `vercel.json` `headers` now sets a three-tier `Cache-Control` split (short-cache loader/runtime, `immutable` content-hashed chunks). Refreshed the stale pre-Phase-2 bundle-size note. Related: [[ADR_0013_Modular_Widget_Loader_Architecture]] Phase 3.
- 2026-05-11: Documented public settings `stale-if-error=604800` and 7-day widget stale settings tolerance. The separate `ikr_image_policy_<publicApiKey>` cache was added on 2026-05-11 then removed the same day by [[ADR_0008_Cloud_Name_Build_Time_Only]] — cloud name is now a build-time constant and no runtime image-policy cache exists. Related bug: [[Bug_Cloud_Name_Silent_Image_Filter]].
