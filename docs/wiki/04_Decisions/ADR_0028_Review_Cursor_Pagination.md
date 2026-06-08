---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-06-08
updated: 2026-06-08
last_verified: 2026-06-08
confidence: high
tags:
  - adr
  - database
  - performance
  - pagination
related:
  - "[[Decision_Index]]"
  - "[[ADR_0026_Product_Review_Summary_Read_Model]]"
  - "[[ADR_0027_Review_Media_Read_Model]]"
  - "[[Backend_API_Map]]"
  - "[[Database_Schema]]"
  - "[[Widget_Performance]]"
source_files:
  - "prisma/migrations/20260608120000_add_review_cursor_indexes/migration.sql"
  - "src/app/api/public/reviews/route.ts"
  - "src/widget/reviews-section/reviews-api.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/render/handlers.js"
  - "src/widget/reviews-section/render/request-token.js"
  - "src/widget/core/state.js"
  - "tests/unit/public-api-routes.test.ts"
  - "tests/widget-runtime-smoke.spec.ts"
---

# ADR_0028 - Review Cursor Pagination

## Status
Accepted

## Context
The storefront review list originally loaded more reviews with offset pagination: `page`, `limit`, and Prisma `skip`. That is simple and keeps numbered pages possible, but large offsets do not scale because the database still has to walk skipped rows. The previous sort contracts were also not fully deterministic for tied ratings because `highest` / `lowest` sorted only by `rating`.

ADR_0026 moved public aggregate values to `ProductReviewSummary`. ADR_0027 moved photo filtering and media display to `Review.hasImages` + `ReviewMedia`. The remaining hot public read path was the visible review list load-more flow.

## Decision
Keep the public response shape backwards-compatible, but add cursor/keyset pagination for load-more:

- `GET /api/public/reviews` accepts an optional opaque `cursor` parameter.
- Responses include `data.nextCursor` while preserving `reviews`, `totalCount`, `allCount`, `page`, `totalPages`, `hasMore`, `ratingCounts`, and `avgRating`.
- Legacy `page/limit` requests still work. The first page also returns `nextCursor`, so new widgets can switch load-more to cursor without breaking old consumers.
- Cursor requests do not pass Prisma `skip`; they use keyset `OR` conditions and `limit + 1`.
- Cursor values are opaque base64url JSON envelopes: `{ p, s }`. `p` is the pagination bookmark and query context; `s` is an HMAC-SHA256 signature over the canonical payload using server-only `REVIEW_CURSOR_SECRET`.
- Cursor payloads include store/product/sort/filter context and the last visible row values. Reuse across a different query returns `400`; tampering with the payload or sending an old unsigned cursor also returns `400`.
- Deterministic order is now:
  - `newest`: `createdAt desc, id desc`
  - `highest`: `rating desc, createdAt desc, id desc`
  - `lowest`: `rating asc, createdAt desc, id desc`
- The widget stores `currentNextCursor`. Load-more uses it when present and falls back to `page + 1` when talking to an older response without `nextCursor`.
- Sort, rating filter, photo filter, retry, product reset, and stale-request guards reset or validate cursor state.
- The photo strip stays independent: it still performs its capped first-page `hasImages=true&limit=15&orderBy=newest` request.

## Database Indexes
Migration `20260608120000_add_review_cursor_indexes` adds partial indexes for the public approved-review query shapes:

- `Review_approved_product_newest_cursor_idx`: `(storeId, productId, createdAt desc, id desc) where status='approved'`
- `Review_approved_product_rating_desc_cursor_idx`: `(storeId, productId, rating desc, createdAt desc, id desc) where status='approved'`
- `Review_approved_product_rating_asc_cursor_idx`: `(storeId, productId, rating asc, createdAt desc, id desc) where status='approved'`
- `Review_approved_photo_newest_cursor_idx`: `(storeId, productId, createdAt desc, id desc) where status='approved' and hasImages=true`

The older `Review_approved_hasImages_product_createdAt_idx` remains in place for deploy safety and unused-index cleanup can be handled later with production index evidence.

## Reasoning
- Keyset pagination keeps load-more cost stable as page depth grows.
- Keeping `page` preserves compatibility with old clients and future numbered pagination UI discussions.
- Adding `id` as the final tie-breaker makes slices deterministic even when many reviews share the same timestamp or rating.
- The cursor is opaque to clients and signed, not encrypted. It still contains only public pagination bookmark values, but the signature prevents clients from fabricating or modifying bookmarks.
- The change is additive: no public API fields are removed and no database column/table is dropped.

## Alternatives Considered
- Keep offset pagination until performance symptoms appear: simpler, but this leaves a known scaling issue on the main public review list path.
- Replace the API with cursor-only pagination: cleaner API, but breaking for any existing page-based consumer and premature while numbered pagination remains a possible future UI.
- Encrypt cursors: not necessary for public review bookmarks. Signing is sufficient because the payload is not secret; it only needs integrity protection.
- Reuse `CLIENT_SECRET` for cursor HMAC: rejected to avoid coupling review pagination to ikas OAuth/JWT secret rotation. `REVIEW_CURSOR_SECRET` is separate and server-only.
- Add rating-specific photo indexes now: not needed for the current widget photo filter, which forces `orderBy=newest`; add only with production query evidence.

## Consequences
- Public API tests must cover both legacy page and cursor paths.
- Widget tests must prove load-more sends `cursor` when available, resets cursor on sort/filter, rejects stale load-more responses, and keeps duplicate review guards.
- Count queries (`totalCount`, `totalPages`) are intentionally still present for response compatibility. A later count-read optimization should be its own phase.
- Numbered pagination UI is not implemented by this ADR. If added, it should use the preserved `page` contract or a separate anchor model.
- `REVIEW_CURSOR_SECRET` must be present in Vercel Production/Preview before deploying signed cursor code. Existing unsigned cursors are short-lived load-more bookmarks and are intentionally not accepted after this change.

## Related Source Files
- [prisma/migrations/20260608120000_add_review_cursor_indexes/migration.sql](prisma/migrations/20260608120000_add_review_cursor_indexes/migration.sql)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/widget/reviews-section/reviews-api.js](src/widget/reviews-section/reviews-api.js)
- [src/widget/reviews-section/render.js](src/widget/reviews-section/render.js)
- [src/widget/reviews-section/render/handlers.js](src/widget/reviews-section/render/handlers.js)
- [src/widget/reviews-section/render/request-token.js](src/widget/reviews-section/render/request-token.js)
- [src/widget/core/state.js](src/widget/core/state.js)
- [tests/unit/public-api-routes.test.ts](tests/unit/public-api-routes.test.ts)
- [tests/widget-runtime-smoke.spec.ts](tests/widget-runtime-smoke.spec.ts)
