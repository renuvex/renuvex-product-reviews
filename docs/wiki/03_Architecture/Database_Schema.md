---
type: database
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - database
  - prisma
  - schema
related:
  - "[[Index]]"
  - "[[Database_Map]]"
  - "[[ADR_0003_Review_Data_Model]]"
---

# Database Schema

## Summary
PostgreSQL via Prisma. Four models. Source of truth: [prisma/schema.prisma](prisma/schema.prisma).

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
- `[storeId, productId]`
- `[storeId, slug]`
- `[storeId, status]`
- `[storeId, slug, status]`

Common queries:
- Public: `findMany({ storeId, productId, status: 'approved' })` + ordering + filters
- Public listing badges: `findMany({ storeId, slug: { in: slugs }, status: 'approved' })`, `select: { slug, rating }`
- Admin: `findMany({ storeId, status? })` ordered by `createdAt desc`

### `StoreSettings`
Per-merchant config. One row per merchant, created on OAuth callback.

| Field | Type | Notes |
|---|---|---|
| `id` | String `@id @default(uuid())` | |
| `storeId` | String `@unique` | == merchantId |
| `createdAt`, `updatedAt` | DateTime | |
| `storefrontScripts` | Json? | Map: `{ [storefrontId]: ikasScriptId }` |

The `storefrontScripts` map is what makes script injection idempotent across re-installs and re-syncs.

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

## Conventions
- All multi-tenant tables key on `storeId` (which is `merchantId`). No table is shared cross-tenant.
- String enums (status, widgetId) are not Postgres enums — kept as strings to avoid migrations on every state addition. Trade-off: type-safety lives in TS only.
- Timestamps default to UTC; format on display.

## Migrations
History documented in [[Database_Map]]. Notable themes: index churn (added → cleaned up), `helpful` feature (added → reverted), color settings churn (recent).

## Notes
- **JSON columns** (`settings`, `storefrontScripts`) are not validated at the DB layer. All validation must live in app code. Don't trust their shape after manual DB edits.
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
- [[Auth_And_Installation_Flow]]
- [[Widget_Customization]]
