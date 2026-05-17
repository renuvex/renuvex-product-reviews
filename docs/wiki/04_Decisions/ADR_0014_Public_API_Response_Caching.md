---
type: decision
project: ikas-review-app
status: draft
created: 2026-05-17
updated: 2026-05-17
last_verified: 2026-05-17
confidence: medium
tags:
  - adr
  - caching
  - redis
  - performance
  - api
related:
  - "[[Decision_Index]]"
  - "[[Caching_And_Performance]]"
  - "[[Widget_Performance]]"
  - "[[Security_And_Rate_Limits]]"
  - "[[ADR_0013_Modular_Widget_Loader_Architecture]]"
source_files:
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
---

# ADR_0014 — Public API Response Caching (Upstash Redis)

## Status
Proposed — **draft for discussion after ADR_0013 Phase 3.** Not yet decided.

## Date
2026-05-17

## Context

The storefront widget reads merchant data through three public, unauthenticated
endpoints, called on essentially every storefront page load:

- `GET /api/public/settings` — per-merchant widget settings.
- `GET /api/public/reviews` — paginated reviews + rating aggregates for one product.
- `GET /api/public/ratings-by-slug` — bulk rating summaries for a list of product
  slugs (listing / search / carousel pages).

Each handler queries Supabase Postgres directly. `reviews` runs three Prisma
queries per request (`findMany`, `count`, `groupBy`). Each response sets
`Cache-Control: s-maxage=60, stale-while-revalidate=300`, so the Vercel CDN edge
caches the rendered response.

Upstash Redis is already provisioned for the project (`@upstash/redis`,
`KV_REST_API_URL` / `KV_REST_API_TOKEN`) but is currently used only for POST
rate-limiting (`reviews`, `upload`, `widget-error`) — not for read caching.

The widget runs on every page of every merchant storefront. As traffic grows, the
open question is whether the Vercel CDN edge cache alone is sufficient, or whether
a shared application-level cache is needed to keep Postgres load and cost bounded.

### Where the CDN edge cache is weak

The CDN handles popular, low-cardinality URLs well — a hot product's `reviews`
response is served from the edge without touching the function or DB. But:

- **`ratings-by-slug` has a high-cardinality `slugs=` query param.** Every
  listing / search / carousel page produces a different slug combination → a
  different CDN cache key → a low hit rate. Yet this endpoint is called on the
  most pages.
- **Long-tail products** viewed less than once per 60 s never benefit from the
  TTL — every view is a CDN miss.
- The CDN cache is **per-edge-region**; each Vercel region revalidates
  independently.

On every CDN miss the function runs and hits Postgres. At scale that is
connection pressure, added latency on the widget's critical path, and pressure
toward a larger (costlier) Supabase tier.

## Decision

**(Proposed — not yet decided.)** Introduce a Redis read-through cache layer
inside the public read endpoints, sitting between the function and Postgres:

```
browser sessionStorage → Vercel CDN edge → [Redis read-through] → Postgres
```

Scope and priority:

1. **`ratings-by-slug` first.** Worst CDN hit rate, highest call volume. Cache
   **per slug** (`ikr_rating:<storeId>:<slug>`), not per URL — so the cache is
   shared across every slug-combination URL. This is the structural win the CDN
   cannot replicate.
2. **`reviews` GET — second.** The CDN covers popular products; Redis helps the
   long tail. Key by the full query shape (`storeId`, `productId`, `page`,
   `orderBy`, `rating`, `hasImages`, `limit`).
3. **`settings` — low priority.** Low cardinality; the CDN already handles it
   well. Cache only if measurement shows it matters.
4. **Invalidation v1: TTL-only**, ~60 s, matching the current CDN staleness
   window — zero invalidation code. A later iteration may add explicit
   invalidation on review moderation and settings changes.

This is **separate from ADR_0013 Phase 3** (widget-loader asset caching + ikas
script lifecycle). It is a data-layer decision and gets its own ADR.

## Reasoning

- **Redis offloads Postgres on CDN-miss paths.** A Redis read (~1 ms) replaces
  1–3 Postgres queries (~10–50 ms) whenever the CDN misses but the data is
  cached. That is exactly the long-tail and high-cardinality traffic the CDN does
  not cover.
- **Per-slug keying decouples the cache from URL cardinality.** The CDN keys on
  the full URL; `ratings-by-slug?slugs=a,b,c` and `?slugs=b,c,d` are distinct CDN
  entries even though they overlap. A per-slug Redis key is reused across all of
  them.
- **Upstash is already provisioned.** No new infrastructure — this expands an
  existing dependency, lowering the cost of trying it.
- **Cost.** Upstash is pay-per-request and Redis reads are cheap; offloading
  Postgres can keep Supabase on a smaller tier and protects the connection pool
  under load.
- **TTL-only v1 keeps the change small.** It accepts exactly the staleness the
  CDN already has today, so it introduces no new correctness surface — only a
  faster path on CDN misses.

## Alternatives Considered

- **Do nothing — rely on the CDN edge cache only.** Simplest; already in place.
  Adequate until measurement shows Postgres is the bottleneck. The risk is
  discovering the limit under real load rather than ahead of it. This is the
  honest default if traffic stays modest.
- **Raise the CDN `s-maxage`.** Cheap, but does not help `ratings-by-slug`
  (cardinality, not TTL, is its problem) and raises staleness uniformly across
  all endpoints.
- **Full Redis cache on all three endpoints from day one.** More invalidation
  surface for little gain on `settings`; over-builds before measurement.
- **Redis with explicit invalidation from the start.** Fresher data, but couples
  every moderation / settings write to cache-key bookkeeping. TTL-only v1 is
  simpler and matches today's behaviour; explicit invalidation can be added later
  if the staleness window proves too long.

## Consequences

- Adds a cache layer to own and reason about. The real cost is invalidation,
  deliberately deferred by the TTL-only v1.
- A staleness window equal to the TTL — already true under the current CDN config.
- Slightly higher Upstash request volume and cost (low; Redis commands are cheap).
- Endpoint handlers gain a small shared Redis get/set wrapper; keep it in one
  helper, not copy-pasted across routes.
- Decision is deferred until after ADR_0013 Phase 3. Revisit with real metrics:
  Supabase DB connection / query load and Vercel function invocation counts. If
  those show the CDN is already absorbing the load, this ADR can be closed as
  "not needed yet."

## Related Source Files
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/app/api/public/settings/route.ts](src/app/api/public/settings/route.ts)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)

## Related Notes
- [[Decision_Index]]
- [[Caching_And_Performance]]
- [[Widget_Performance]]
- [[Security_And_Rate_Limits]]
- [[ADR_0013_Modular_Widget_Loader_Architecture]]
- [[System_Architecture]]
