---
type: codebase
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-08-01
tags:
  - quick-reference
related:
  - "[[Index]]"
  - "[[Folder_Structure]]"
  - "[[Important_Files]]"
---

# Project Index — Quick Source-Code Pointers

> Cheat sheet for "where is X". When you need to find a thing fast, start here, then drill into [[Important_Files]] for context.

## Entry points
- App entry / auth bootstrap → [src/app/page.tsx](src/app/page.tsx) → [src/app/hooks/use-base-home-page.ts](src/app/hooks/use-base-home-page.ts)
- Widget bundle entry → [src/widget/index.js](src/widget/index.js) → built to [public/widget.js](public/widget.js)
- Preview iframe → [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts)
- Layout / theming → [src/app/layout.tsx](src/app/layout.tsx), [src/app/globals.css](src/app/globals.css)

## OAuth + Auth
- Authorize redirect → [src/app/api/oauth/authorize/ikas/route.ts](src/app/api/oauth/authorize/ikas/route.ts)
- Callback (token exchange + auto inject) → [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- JWT verification → [src/helpers/jwt-helpers.ts](src/helpers/jwt-helpers.ts)
- AppBridge JWT cache + ikas signature helper → [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts)
- ikas API client + token refresh → [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)
- Session (iron-session) → [src/lib/session.ts](src/lib/session.ts)
- JWT verification middleware → [src/lib/auth-helpers.ts](src/lib/auth-helpers.ts)

## Admin API
- Reviews (list/update/delete) → [src/app/api/admin/reviews/route.ts](src/app/api/admin/reviews/route.ts)
- Settings (per-widget) → [src/app/api/admin/settings/route.ts](src/app/api/admin/settings/route.ts)
- Inject scripts (manual re-inject) → [src/app/api/admin/inject-scripts/route.ts](src/app/api/admin/inject-scripts/route.ts)
- Cleanup orphan AWS image families (cron) → [src/app/api/admin/daily-maintenance/route.ts](src/app/api/admin/daily-maintenance/route.ts), [src/app/api/admin/cleanup-images/route.ts](src/app/api/admin/cleanup-images/route.ts)
- Example ikas-backed admin call → [src/app/api/ikas/get-merchant/route.ts](src/app/api/ikas/get-merchant/route.ts)

## Public API (explicit anonymous or session policy)
- Reviews list + submit → [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- Listing badges (bulk avg+count by slug) → [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)
- Widget settings (read by widget.js) → [src/app/api/public/settings/route.ts](src/app/api/public/settings/route.ts)
- AWS image upload sign/register -> [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts), [src/app/api/public/upload/register/route.ts](src/app/api/public/upload/register/route.ts)

## Preview pipeline
- Iframe HTML → [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts)
- Settings persistence (preview-only) → [src/app/api/preview/settings/route.ts](src/app/api/preview/settings/route.ts)
- Reviews fixture for preview → [src/app/api/preview/reviews/route.ts](src/app/api/preview/reviews/route.ts)

## Database
- Schema entrypoint → [prisma/schema.prisma](prisma/schema.prisma); domain models → [prisma/models/](prisma/models/)
- Migrations → [prisma/migrations/](prisma/migrations/)
- Prisma client → [src/lib/prisma.ts](src/lib/prisma.ts)
- AuthToken model wrapper → [src/models/auth-token/](src/models/auth-token/)

## Widget (storefront bundle source)
- Entry → [src/widget/index.js](src/widget/index.js)
- Config (publicApiKey extraction) → [src/widget/core/config.js](src/widget/core/config.js)
- DOM observer → [src/widget/observer.js](src/widget/observer.js)
- Events → [src/widget/events.js](src/widget/events.js)
- Icons registry API → [src/widget/icons/index.js](src/widget/icons/index.js)
- Review section bootstrap/render → [src/widget/reviews-section/](src/widget/reviews-section/)
- Listing badges → [src/widget/listing-badges/](src/widget/listing-badges/)
- Review layouts → [src/widget/review-layouts/](src/widget/review-layouts/)
- Summary layouts → [src/widget/summary-layouts/](src/widget/summary-layouts/)
- Themes → [src/widget/themes/](src/widget/themes/)

## Settings schema (single source of truth)
- Widget catalog (release/configuration + settings contract) → [src/lib/widgets/catalog.ts](src/lib/widgets/catalog.ts)
- Server-side helpers (defaults, sanitize, validate) → [src/lib/widget-settings.ts](src/lib/widget-settings.ts)
- Design tokens → [src/lib/design-tokens.ts](src/lib/design-tokens.ts)

## Admin UI (React)
- Dashboard route group → [src/app/dashboard/](src/app/dashboard/)
- Persistent admin shell → [src/features/admin-shell/AdminShell.tsx](src/features/admin-shell/AdminShell.tsx)
- Review moderation → [src/features/review-moderation/](src/features/review-moderation/)
- Widget management → [src/features/widget-management/](src/features/widget-management/)
- Live preview route → [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts)
- shadcn/ui primitives → [src/components/ui/](src/components/ui/)

## ikas Admin GraphQL
- Operation definitions → [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts)
- Codegen config → [src/lib/ikas-client/codegen.ts](src/lib/ikas-client/codegen.ts)
- Generated types/client → [src/lib/ikas-client/generated/graphql.ts](src/lib/ikas-client/generated/graphql.ts)

## Config / Build / Deploy
- env contract → [.env.example](.env.example)
- App config (oauth, urls) → [src/globals/config.ts](src/globals/config.ts)
- ikas dev settings → [ikas.config.json](ikas.config.json)
- Next config → [next.config.js](next.config.js)
- Vercel (region + cron) → [vercel.json](vercel.json)
- Widget build script → [scripts/build-widget.mjs](scripts/build-widget.mjs)
- Tailwind v4 styles → [src/app/globals.css](src/app/globals.css)
- TS config → [tsconfig.json](tsconfig.json)

## Obsidian Links
- [[Folder_Structure]]
- [[Important_Files]]
- [[Frontend_Map]]
- [[Backend_API_Map]]

## Change Log
- 2026-05-12: Updated the quick pointer for widget icons after splitting the registry under [src/widget/icons/](src/widget/icons/).
