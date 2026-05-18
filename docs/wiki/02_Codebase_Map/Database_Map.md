---
type: database
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-18
tags:
  - database
  - prisma
  - postgres
related:
  - "[[Index]]"
  - "[[Database_Schema]]"
  - "[[Important_Files]]"
---

# Database Map

## Summary
Postgres (Supabase) accessed via Prisma. Six models: `AuthToken`, `Review`, `StoreSettings`, `WidgetSettings`, `ProductSnapshot`, `PendingReviewImage`. Pooler URL via `DATABASE_URL` (transaction pooler 6543, pgbouncer); migration URL via `DIRECT_URL` (session pooler 5432). Detailed field-level reference in [[Database_Schema]].

## Files

| File | Role |
|---|---|
| [prisma/schema.prisma](prisma/schema.prisma) | Schema source |
| [prisma/migrations/](prisma/migrations/) | Migration history (29+ files, 2026-03 → 2026-05) |
| [src/lib/prisma.ts](src/lib/prisma.ts) | Prisma client singleton |
| [src/models/auth-token/index.ts](src/models/auth-token/index.ts) | `AuthToken` interface |
| [src/models/auth-token/manager.ts](src/models/auth-token/manager.ts) | `AuthTokenManager.{get,put,delete}` |

## Models (one-line summaries)

| Model | Primary key | Purpose |
|---|---|---|
| `AuthToken` | `authorizedAppId` | OAuth tokens per app installation; refreshed by `onCheckToken` |
| `Review` | `id` (uuid) | Reviews; denormalized (`productName`, `slug`); status workflow |
| `StoreSettings` | `id` (uuid), unique `storeId` | Per-merchant config; tracks `storefrontScripts: Json` map |
| `WidgetSettings` | `id` (uuid), unique `(storeId, widgetId)` | Per-widget JSON settings |
| `ProductSnapshot` | `id` (uuid), unique `(storeId, productId)` | Current ikas product slug/name snapshot for fallback resolution |
| `PendingReviewImage` | `publicId` | Registry of Cloudinary uploads not yet attached to a `Review` |

## Index strategy
On `Review`:
- `[storeId, productId, status]` — canonical listing/search badge resolution by ikas product id
- `[storeId, status]` — admin filtered list
- `[storeId, slug, status]` — legacy combined slug fallback path (composite added 2026-04)

`[storeId, productId, status]` also covers the leftmost `(storeId, productId)` prefix, and `[storeId, slug, status]` covers `(storeId, slug)`. The old two-column prefix indexes were removed in `20260518130000_drop_redundant_review_indexes` to reduce write amplification on the highest-write table.

The migrations show iterative tuning: redundant indexes have been cleaned up more than once. Before adding a new index, scan `prisma/migrations/*` for past attempts.

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

## Notes
- `Review.images` is **TEXT containing `JSON.stringify(string[])`**, not a relation. Parsing happens at the API layer with try/catch.
- `Review.status` is a string column, not a Postgres enum. Code uses `'pending' | 'approved' | 'rejected'` literals. Be consistent.
- `StoreSettings.storefrontScripts` is a JSON map `{ [storefrontId]: ikasScriptId }` — the OAuth callback maintains this map so re-installs update existing scripts in place rather than creating duplicates. See [[Auth_And_Installation_Flow]].
- `AuthToken` has `merchantId` (column) AND `authorizedAppId` (PK). Both are needed: `authorizedAppId` is unique per install, `merchantId` is shared across installs. The callback `deleteMany({ where: { merchantId } })` uses this to clean reinstalls.

## Related Source Files
- [prisma/schema.prisma](prisma/schema.prisma)
- [prisma/migrations/](prisma/migrations/)
- [src/lib/prisma.ts](src/lib/prisma.ts)
- [src/models/auth-token/manager.ts](src/models/auth-token/manager.ts)

## Obsidian Links
- [[Database_Schema]]
- [[Auth_And_Installation_Flow]]
- [[ADR_0003_Review_Data_Model]]

## Change Log
- 2026-05-18: Removed redundant Review prefix indexes `[storeId, productId]` and `[storeId, slug]`; the wider composite indexes cover those query prefixes and the drop-only migration is backwards-compatible.
- 2026-05-17: Added the migration safety (deploy-window / expand-contract) rule to the migration workflow section.
- 2026-05-17: Documented `[storeId, productId, status]` for canonical product-id listing/search badge reads and corrected the model count to include `PendingReviewImage`.
- 2026-05-17: Added `ProductSnapshot` to the model map for webhook/backfill-maintained product identity resolution.
