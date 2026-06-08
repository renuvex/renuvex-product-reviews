---
type: database
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-08
last_verified: 2026-06-08
confidence: high
tags:
  - database
  - prisma
  - postgres
related:
  - "[[Index]]"
  - "[[Database_Schema]]"
  - "[[Important_Files]]"
  - "[[ADR_0026_Product_Review_Summary_Read_Model]]"
  - "[[ADR_0028_Review_Cursor_Pagination]]"
source_files:
  - "prisma/schema.prisma"
  - "prisma/migrations/20260606193000_add_product_review_summary/migration.sql"
  - "prisma/migrations/20260607120000_add_review_media_read_model/migration.sql"
  - "prisma/migrations/20260608120000_add_review_cursor_indexes/migration.sql"
  - "src/lib/review-media.ts"
  - "src/lib/review-summary.ts"
  - "scripts/rebuild-product-review-summaries.mjs"
  - "scripts/backfill-review-media.mjs"
  - "scripts/audit-legacy-review-media.mjs"
  - "scripts/reconcile-legacy-review-media.mjs"
---

# Database Map

## Summary
Postgres (Supabase) accessed via Prisma. Eight models: `AuthToken`, `Review`, `ReviewMedia`, `ProductReviewSummary`, `StoreSettings`, `WidgetSettings`, `ProductSnapshot`, `PendingReviewImage`. Pooler URL via `DATABASE_URL` (transaction pooler 6543, pgbouncer); migration URL via `DIRECT_URL` (session pooler 5432). Detailed field-level reference in [[Database_Schema]].

## Files

| File | Role |
|---|---|
| [prisma/schema.prisma](prisma/schema.prisma) | Schema source |
| [prisma/migrations/](prisma/migrations/) | Migration history (29+ files, 2026-03 → 2026-06) |
| [src/lib/prisma.ts](src/lib/prisma.ts) | Prisma client singleton |
| [src/models/auth-token/index.ts](src/models/auth-token/index.ts) | `AuthToken` interface |
| [src/models/auth-token/manager.ts](src/models/auth-token/manager.ts) | `AuthTokenManager.{get,put,delete}` |

## Models (one-line summaries)

| Model | Primary key | Purpose |
|---|---|---|
| `AuthToken` | `authorizedAppId` | OAuth tokens per app installation; refreshed by `onCheckToken` |
| `Review` | `id` (uuid) | Reviews; denormalized (`productName`, `slug`); status workflow |
| `ReviewMedia` | `id` (uuid), unique `publicId` | Normalized trusted review image rows; public photo filters use `Review.hasImages` and media display reads this table before legacy `Review.images` fallback |
| `ProductReviewSummary` | `id` (uuid), unique `(storeId, productId)` | Product-level aggregate read model for public badge, structured-data, and summary distribution |
| `StoreSettings` | `id` (uuid), unique `storeId` | Per-merchant config; tracks `storefrontScripts: Json` and non-sensitive `storefrontTheme: Json` sync state |
| `WidgetSettings` | `id` (uuid), unique `(storeId, widgetId)` | Per-widget JSON settings |
| `ProductSnapshot` | `id` (uuid), unique `(storeId, productId)` | Current ikas product slug/name snapshot for fallback resolution |
| `PendingReviewImage` | `publicId` | Registry of tenant-scoped Cloudinary uploads not yet attached to a `Review` |

## Index strategy
On `Review`:
- `[storeId, productId, status]` — canonical listing/search badge resolution by ikas product id
- `[storeId, status]` — admin filtered list
- `[storeId, slug, status]` — legacy combined slug fallback path (composite added 2026-04)

`[storeId, productId, status]` also covers the leftmost `(storeId, productId)` prefix, and `[storeId, slug, status]` covers `(storeId, slug)`. The old two-column prefix indexes were removed in `20260518130000_drop_redundant_review_indexes` to reduce write amplification on the highest-write table.

The migrations show iterative tuning: redundant indexes have been cleaned up more than once. Before adding a new index, scan `prisma/migrations/*` for past attempts.

On `ProductReviewSummary`:
- unique `[storeId, productId]` — public badge, structured-data, `/api/public/ratings`, and review summary distribution read this aggregate row instead of recomputing from raw `Review.groupBy()` on every storefront request.

On `ReviewMedia`:
- unique `publicId` - one Cloudinary asset belongs to one committed review image.
- unique `[reviewId, position]` plus `[reviewId, position]` index - stable per-review image ordering.
- `[storeId, productId, visible, createdAt]` - future media-gallery/photo-strip reads and tenant-scoped cleanup/reporting.

On `Review` media reads:
- partial `[storeId, productId, createdAt] where status='approved' and hasImages=true` - public photo-review list/photo strip hot path.

On `Review` cursor pagination:
- partial `[storeId, productId, createdAt desc, id desc] where status='approved'` - public `newest` review list/load-more.
- partial `[storeId, productId, rating desc, createdAt desc, id desc] where status='approved'` - public `highest` review list/load-more.
- partial `[storeId, productId, rating asc, createdAt desc, id desc] where status='approved'` - public `lowest` review list/load-more.
- partial `[storeId, productId, createdAt desc, id desc] where status='approved' and hasImages=true` - photo-review newest cursor path. The older photo index without `id` remains until production unused-index evidence supports cleanup.

## Migration workflow
- Local dev: `pnpm prisma:migrate` (creates + applies migration)
- Deploy: `pnpm build` runs `prisma generate && prisma migrate deploy && next build` — migrations apply on every Vercel deploy.
- ⚠️ Never `prisma db push` in production (only first-run via `pnpm prisma:init` for local).

### Migration safety (deploy-window rule)
`prisma migrate deploy` runs *during* the Vercel build, while the previous
deployment still serves traffic. For ~1-3 minutes the new schema and the old
code run together, so a migration must not break the old code.

- **Additive / backwards-compatible — one deploy is safe:** new table, new
  nullable column, new column with a default, new index. Old code simply
  ignores what it does not know about.
- **Breaking — must use expand/contract (two deploys):** drop or rename a
  column/table, add a `NOT NULL` column without a default, narrow a type, add a
  unique constraint to existing data.
  1. Deploy 1 — ship code that works with *both* the old and new shape (e.g.
     stop reading/writing the column); no destructive migration yet.
  2. Deploy 2 — apply the destructive migration once Deploy 1 is fully live, so
     no running code still depends on the old shape.
- A single breaking deploy at a quiet hour is acceptable only when a few minutes
  of transient errors is tolerable; expand/contract is the zero-downtime default.
- Example: `20260517160000_remove_product_snapshot_deleted` dropped a column in
  one deploy — safe only because the store had no live traffic. Do not repeat
  this pattern for live multi-merchant data.

## Recent migration themes (chronological)
- `init`, `add_product_slug_cache` — bootstrap
- `cleanup_and_auth_token_refactor`, `remove_widget_template` — early refactors
- `add_review_status_indexes`, several `add_*_index`, `cleanup_redundant_indexes` — perf tuning
- `add_storefront_scripts` — added `StoreSettings.storefrontScripts` JSON column
- `add_widget_settings` — `WidgetSettings` table
- `add_helpful_feature` then `remove_helpful_feature` — feature was tried and reverted
- `add_*_color_setting`, `remove_*_color_setting` — settings churn (visible in last week)
- `add_review_title`, `add_review_comment_length_limit`, `add_merchant_reply_length_limit` — review schema growth

- `add_product_review_summary` — product-level aggregate read model for public rating/summary reads

## Notes
- `Review.images` is **legacy TEXT containing `JSON.stringify(string[])`**. New writes keep it as a compatibility mirror; public image display reads `ReviewMedia` first and falls back to the legacy mirror during transition/backfill.
- `Review.hasImages` is the indexed public photo-review facet. Do not reintroduce `Review.images contains` for public filters.
- `ProductReviewSummary` is a read model, not source of truth. If manual DB edits/imports bypass normal review write paths, run `pnpm reviews:summaries:rebuild`.
- `ReviewMedia` is the normalized media read model. If legacy/imported data bypassed normal review write paths, run `pnpm reviews:media:backfill --cloudName=<cloudinaryCloudName>`; the script rejects placeholder cloud names.
- Legacy global Cloudinary paths (`review_images/...` without `stores/<storeId>`) are not trusted tenant media. Audit them with `pnpm reviews:media:audit --cloudName=<cloudinaryCloudName>` and reconcile copy-first with `pnpm reviews:media:reconcile --cloudName=<cloudinaryCloudName> --storeId=<merchantId> --allowLegacyGlobal --apply`. Use `--dropMissingLegacy` only for verified missing source assets. See [[Legacy_Review_Media_Reconciliation]].
- `Review.status` is a string column, not a Postgres enum. Code uses `'pending' | 'approved' | 'rejected'` literals. Be consistent.
- `StoreSettings.storefrontScripts` is a JSON map `{ [storefrontId]: ikasScriptId }` used as an idempotency cache. Remote ikas script listing is the source of truth when available, so re-installs adopt/update existing scripts instead of creating duplicates. See [[Auth_And_Installation_Flow]].
- `StoreSettings.storefrontTheme` stores non-sensitive active storefront/theme sync state resolved from `listStorefront.themes[].isMainTheme`. Current app-layer shape is `{ syncStatus, stable, pending, lastCheckedAt, verificationDueAt, verifiedAt }`; public settings expose only the stable `runtime.themeAdapterKey/source` to select Ozy vs generic adapter.
- `AuthToken` has `merchantId` (column) AND `authorizedAppId` (PK). Both are needed: `authorizedAppId` is unique per install, `merchantId` is shared across installs. The callback `deleteMany({ where: { merchantId } })` uses this to clean reinstalls.

## Related Source Files
- [prisma/schema.prisma](prisma/schema.prisma)
- [prisma/migrations/](prisma/migrations/)
- [src/lib/prisma.ts](src/lib/prisma.ts)
- [src/lib/review-media.ts](src/lib/review-media.ts)
- [scripts/audit-legacy-review-media.mjs](scripts/audit-legacy-review-media.mjs)
- [scripts/reconcile-legacy-review-media.mjs](scripts/reconcile-legacy-review-media.mjs)
- [src/models/auth-token/manager.ts](src/models/auth-token/manager.ts)

## Obsidian Links
- [[Database_Schema]]
- [[Auth_And_Installation_Flow]]
- [[ADR_0003_Review_Data_Model]]
- [[ADR_0026_Product_Review_Summary_Read_Model]]
- [[ADR_0027_Review_Media_Read_Model]]
- [[Legacy_Review_Media_Reconciliation]]

## Change Log
- 2026-06-08: Applied test-store legacy review media reconciliation. Copied 10 available old global assets, dropped 30 missing source URLs with explicit cleanup, and verified zero remaining global `review_images/...` URLs. See [[Legacy_Review_Media_Reconciliation]].
- 2026-06-07: Added `Review.hasImages` and `ReviewMedia` as the normalized media read model for indexed public photo-review filters; `Review.images` remains a legacy mirror. See [[ADR_0027_Review_Media_Read_Model]].
- 2026-06-08: Added review-list cursor indexes for keyset pagination while keeping legacy `page/limit` compatibility. See [[ADR_0028_Review_Cursor_Pagination]].
- 2026-06-06: Added `ProductReviewSummary` to the model map and documented that public rating/summary aggregates now read from this per-product read model. See [[ADR_0026_Product_Review_Summary_Read_Model]].
- 2026-05-23: Changed `StoreSettings.storefrontTheme` semantics from flat metadata to a backwards-compatible v2 stable/pending sync state; no schema migration required.
- 2026-05-23: Added nullable `StoreSettings.storefrontTheme` JSONB for active theme metadata used by runtime adapter selection.
- 2026-05-18: Added `PendingReviewImage.storeId` for D3 tenant-scoped Cloudinary upload tracking.
- 2026-05-18: Removed redundant Review prefix indexes `[storeId, productId]` and `[storeId, slug]`; the wider composite indexes cover those query prefixes and the drop-only migration is backwards-compatible.
- 2026-05-17: Added the migration safety (deploy-window / expand-contract) rule to the migration workflow section.
- 2026-05-17: Documented `[storeId, productId, status]` for canonical product-id listing/search badge reads and corrected the model count to include `PendingReviewImage`.
- 2026-05-17: Added `ProductSnapshot` to the model map for webhook/backfill-maintained product identity resolution.
