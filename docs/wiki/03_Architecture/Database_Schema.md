---
type: database
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-23
tags:
  - database
  - prisma
  - schema
related:
  - "[[Index]]"
  - "[[Database_Map]]"
  - "[[ADR_0003_Review_Data_Model]]"
  - "[[ADR_0012_Pending_Upload_Registry]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
---

# Database Schema

## Summary
PostgreSQL via Prisma. Six models. Source of truth: [prisma/schema.prisma](prisma/schema.prisma).

## Models

### `AuthToken`
ikas OAuth tokens, one row per app installation.

| Field | Type | Notes |
|---|---|---|
| `merchantId` | String | Indexed via PK side; reused as `storeId` everywhere |
| `authorizedAppId` | String `@id` | PK — unique per (merchant, app) install |
| `salesChannelId` | String? | From ikas |
| `createdAt`, `updatedAt` | DateTime | Standard |
| `accessToken` | String | OAuth access token |
| `tokenType` | String | Usually "bearer" |
| `expiresIn` | Int | Seconds |
| `expireDate` | DateTime | Computed at issue + refresh |
| `refreshToken` | String | OAuth refresh token |
| `scope` | String? | Space-separated scopes |

Behavior: `onCheckToken` ([src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)) refreshes when expired and writes back via `AuthTokenManager.put`.
On install, `prisma.authToken.deleteMany({ where: { merchantId } })` clears stale tokens for that merchant before upsert.

### `Review`
Customer reviews. Public storefront submits; admin moderates.

| Field | Type | Notes |
|---|---|---|
| `id` | String `@id @default(uuid())` | |
| `storeId` | String | Equals `merchantId` |
| `productId` | String | ikas product id |
| `rating` | Int | 1..5 (validated in API) |
| `comment` | String? `@db.VarChar(2000)` | Capped at DB AND API |
| `author` | String | Min 2, max 40 chars |
| `email` | String? | Optional |
| `status` | String `@default("pending")` | `pending` / `approved` / `rejected` (string literals, not enum) |
| `merchantReply` | String? `@db.VarChar(2000)` | Capped |
| `images` | String? | TEXT containing `JSON.stringify(string[])` |
| `createdAt`, `updatedAt` | DateTime | |
| `productName` | String? | Snapshot at submit time (not synced if product later renamed) |
| `slug` | String | Required since 2026-04-04 migration |
| `title` | String? | Optional, max 60 chars |

Indexes:
- `[storeId, productId, status]`
- `[storeId, status]`
- `[storeId, slug, status]`

The two wider composite indexes also cover the old `(storeId, productId)` and
`(storeId, slug)` prefix lookups, so the standalone prefix indexes were removed
in migration `20260518130000_drop_redundant_review_indexes`.

Common queries:
- Public: `findMany({ storeId, productId, status: 'approved' })` + ordering + filters
- Public listing badges: primary `groupBy({ by: ['productId'], where: { storeId, productId: { in: ids }, status: 'approved' } })`; legacy fallback `findMany({ storeId, slug: { in: slugs }, status: 'approved' })`
- Admin: `findMany({ storeId, status? })` ordered by `createdAt desc`

### `StoreSettings`
Per-merchant config. One row per merchant, created on OAuth callback.

| Field | Type | Notes |
|---|---|---|
| `id` | String `@id @default(uuid())` | |
| `storeId` | String `@unique` | == merchantId |
| `createdAt`, `updatedAt` | DateTime | |
| `storefrontScripts` | Json? | Map: `{ [storefrontId]: ikasScriptId }` |
| `storefrontTheme` | Json? | Non-sensitive active storefront/theme metadata for runtime adapter selection |

The `storefrontScripts` map is an idempotency cache for re-installs and re-syncs. When v1 `listStorefrontJSScript` is available, the remote ikas script record is treated as source of truth and the map can be adopted/refreshed.

The `storefrontTheme` JSON is resolved from Admin API `listStorefront.themes[].isMainTheme` plus `mainStorefrontThemeId` fallback during script reconciliation. Public settings expose only `runtime.themeAdapterKey/source`, not the full theme metadata.

### `WidgetSettings`
Per-widget JSON config.

| Field | Type | Notes |
|---|---|---|
| `id` | String `@id @default(uuid())` | |
| `storeId` | String | |
| `widgetId` | String | One of `reviews` / `badge` / `carousel` / `popup` / `qa` / `summary` |
| `settings` | Json `@default("{}")` | Free-form, validated by `widgetDefs.ts` schema |
| `createdAt`, `updatedAt` | DateTime | |

Constraints:
- `@@unique([storeId, widgetId])` — one row per (merchant, widget)
- `@@index([storeId])`

Read pattern (admin and public): `getWidgetDefaults(widgetId) ⊕ sanitizeSettings(widgetId, row.settings)`. See [src/lib/widget-settings.ts](src/lib/widget-settings.ts).

### `ProductSnapshot`
Local read model for ikas product identity snapshots. ikas remains the source of truth.

| Field | Type | Notes |
|---|---|---|
| `id` | String `@id @default(uuid())` | |
| `storeId` | String | Equals `merchantId` |
| `productId` | String | ikas product UUID |
| `slug` | String? | Current ikas slug snapshot |
| `name` | String? | Current ikas name snapshot |
| `ikasUpdatedAt` | DateTime? | ikas product `updatedAt` timestamp |
| `lastSyncedAt` | DateTime | Last local sync time |

Indexes:
- unique `[storeId, productId]`
- `[storeId, slug]`

Maintained by install-time `listProduct` backfill, `/api/admin/sync-products`, and `/api/webhooks/ikas/products`.

### `PendingReviewImage`
Registry of Cloudinary uploads not yet attached to a `Review`. See [[ADR_0012_Pending_Upload_Registry]].

| Field | Type | Notes |
|---|---|---|
| `publicId` | String `@id` | Cloudinary `public_id` derived from the upload's `secure_url` |
| `storeId` | String? | Merchant/tenant that owns the pending upload; nullable only for pre-D3 rows |
| `createdAt` | DateTime `@default(now())` | Used by the cleanup cron's age filter |
| `ipHash` | String? | sha256(ip).slice(0,32) — optional abuse signal, not user identity |

Indexes:
- `[createdAt]` — cleanup cron walks this
- `[storeId, createdAt]` — tenant-scoped pending upload lookup / future tenant cleanup

Lifecycle:
1. Widget POSTs `{storeId}` to `/api/public/upload/sign`; the endpoint verifies `StoreSettings` and signs `review_images/stores/<storeId>`.
2. Widget uploads to the signed Cloudinary folder, then POSTs `{storeId, secureUrl}` to `/api/public/upload/register`.
3. The register endpoint validates the URL against the tenant-scoped trusted policy and upserts a `PendingReviewImage` row with `storeId`.
4. `/api/public/reviews` POST runs the review insert and `deleteMany({ publicId: { in: ... }, storeId })` inside one `prisma.$transaction`.
5. `/api/admin/daily-maintenance` runs the pending-upload cleanup helper daily; `/api/admin/cleanup-pending-uploads` remains an explicit maintenance endpoint for the same helper. It deletes rows where `createdAt < now - 24h` plus their Cloudinary assets.
6. Monthly `/api/admin/cleanup-images` is the safety-net fallback for uploads that bypassed the registry — it now paginates Cloudinary via `next_cursor` and only deletes assets older than 30 days.

## Conventions
- All multi-tenant tables key on `storeId` (which is `merchantId`). No table is shared cross-tenant.
- String enums (status, widgetId) are not Postgres enums — kept as strings to avoid migrations on every state addition. Trade-off: type-safety lives in TS only.
- Timestamps default to UTC; format on display.

## Migrations
History documented in [[Database_Map]]. Notable themes: index churn (added → cleaned up), `helpful` feature (added → reverted), color settings churn (recent).

## Notes
- **JSON columns** (`settings`, `storefrontScripts`, `storefrontTheme`) are not validated at the DB layer. All validation must live in app code. Don't trust their shape after manual DB edits.
- `Review.images` could be a separate `ReviewImage` table; today it's TEXT JSON for simplicity. Migrate when image features grow (lightbox, ordering, alt text).
- No soft-delete. `prisma.review.delete` is hard delete.

## Related Source Files
- [prisma/schema.prisma](prisma/schema.prisma)
- [prisma/migrations/](prisma/migrations/)
- [src/lib/widget-settings.ts](src/lib/widget-settings.ts)
- [src/models/auth-token/manager.ts](src/models/auth-token/manager.ts)

## Obsidian Links
- [[Database_Map]]
- [[ADR_0003_Review_Data_Model]]
- [[ADR_0012_Pending_Upload_Registry]]
- [[Auth_And_Installation_Flow]]
- [[Widget_Customization]]

## Change Log
- 2026-05-23: Added nullable `StoreSettings.storefrontTheme` JSONB for active theme metadata used by runtime adapter selection.
- 2026-05-18: Added nullable `PendingReviewImage.storeId` plus `[storeId, createdAt]` for D3 tenant-scoped Cloudinary uploads. New writes always set `storeId`; nullable exists for safe migration over old rows.
- 2026-05-18: Removed redundant Review prefix indexes `[storeId, productId]` and `[storeId, slug]`; retained `[storeId, productId, status]`, `[storeId, status]`, and `[storeId, slug, status]`.
- 2026-05-17: Removed unused `ProductSnapshot.deleted` column + `[storeId, slug, deleted]` index — ikas has no product-delete webhook scope, so it was always false. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added `[storeId, productId, status]` index for canonical product-id listing/search rating reads. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added `ProductSnapshot` read model for current ikas product id/slug/name resolution.
- 2026-05-12: Added `PendingReviewImage` model — registry of Cloudinary uploads not yet attached to a Review. See [[ADR_0012_Pending_Upload_Registry]].
