---
type: architecture
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-11
tags:
  - performance
  - caching
related:
  - "[[Index]]"
  - "[[API_Design]]"
  - "[[System_Architecture]]"
  - "[[Bug_Cloud_Name_Silent_Image_Filter]]"
---

# Caching & Performance

## Summary
Two cache layers matter: (1) Vercel **edge cache** for public read APIs and (2) the widget's **sessionStorage cache** (with in-memory fallback when sessionStorage is unavailable / quota-exceeded). Postgres indexes ([[Database_Schema]]) cover the hot query shapes.

## Edge cache (Vercel CDN)

Set on:
- `GET /api/public/reviews` — per-product reviews + rating distribution
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

## Widget client cache
[src/widget/core/cache.js](src/widget/core/cache.js) wraps `sessionStorage` with an in-memory fallback. Avoids redundant fetches when the user clicks pagination, opens/closes modal, navigates between products in the same tab, etc. **Persists** for the duration of the browser tab (sessionStorage semantics) — cleared when the tab is closed.

Settings have a 5-minute fresh window in the widget and a 7-day stale tolerance for transient settings fetch failures. Review image policy is cached separately under `ikr_image_policy_<publicApiKey>` for 7 days so the trusted Cloudinary cloud contract survives malformed settings responses without opening the widget to third-party images.

## DB query patterns
See [[Database_Schema]] for index coverage. Notable hot paths:
- Public reviews: covered by `[storeId, productId]` and `[storeId, slug, status]`.
- Listing badges: covered by `[storeId, slug]` (`select: { slug, rating }` is index-only-friendly).
- Admin filtered list: covered by `[storeId, status]`.
- The migration history shows we cleaned up redundant indexes once already — be selective.

## ikas API calls
- Refresh path runs only when `expireDate < now`. Otherwise the existing accessToken is reused.
- OAuth callback issues several GraphQL calls in parallel (`getMerchant + getAuthorizedApp`, `listStorefront`, then per-storefront upserts via `Promise.all`).
- No cache for ikas responses today — they're called sparingly (install + manual re-inject).

## Widget bundle size
- [public/widget.js](public/widget.js) is currently ~165 KB (minified).
- Loaded `async` so it doesn't block first paint, but TTFB matters since merchants pay for storefront performance.
- Adding heavy features (rich previews, lottie animations, etc.) → consider lazy-loading via dynamic `<script>` injection from within the bundle.

## Image performance
- Cloudinary URLs come pre-CDN'd. Storefront images can use Cloudinary transformations (`f_auto,q_auto,w_400`) — verify the widget URLs include these params.
- No lazy-loading attribute set on image tags by default — review when adding photo gallery to listing pages.

## Possible improvements (not done)
- Add `Vary: Origin` header to safely tighten CORS later.
- Postgres connection pooling: already on PgBouncer transaction-mode (`?pgbouncer=true`). Verify Prisma has appropriate `connection_limit` — default is per-instance, watch for cold-start storms.
- Move `widget.js` from `public/` to a CDN with longer TTL + immutable filenames (versioned). Today it's served by Vercel from origin.

## Notes
- Don't add caching that requires invalidation logic without a story for **how** invalidation happens. The current model — short TTL + SWR — is intentionally invalidation-free.
- When experimenting with longer TTLs, remember moderation latency: the time between approve in admin and visible on storefront is bounded by `s-maxage`.

## Related Source Files
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)
- [src/app/api/public/settings/route.ts](src/app/api/public/settings/route.ts)
- [src/widget/core/cache.js](src/widget/core/cache.js)

## Obsidian Links
- [[API_Design]]
- [[Database_Schema]]
- [[Widget_Architecture]]
- [[Widget_Performance]]
- [[Bug_Cloud_Name_Silent_Image_Filter]]

## Change Log
- 2026-05-11: Documented public settings `stale-if-error=604800`, 7-day widget stale settings tolerance, and separate 7-day review image policy cache. Related bug: [[Bug_Cloud_Name_Silent_Image_Filter]].
