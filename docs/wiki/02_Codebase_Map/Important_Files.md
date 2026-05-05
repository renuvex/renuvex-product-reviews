---
type: codebase
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - critical-files
related:
  - "[[Index]]"
  - "[[Folder_Structure]]"
  - "[[Project_Index]]"
---

# Important Files

> Hot-list of files that future Claude must be careful with. Each entry: **what it does**, **why it matters**, **what to watch out for**.

## Schema / source-of-truth

### [src/components/home-page/widgets/widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts)
- **What:** Per-widget settings schema (groups, fields, types, defaults, conditional visibility, layout-aware `supports` rules).
- **Why it matters:** Drives admin UI rendering AND server-side defaults / sanitize / validate via [src/lib/widget-settings.ts](src/lib/widget-settings.ts). The widget.js consumes the resulting settings JSON. Single source of truth.
- **Be careful:**
  - Any new field needs a `default`. Older saved settings rows will be merged with defaults at read time.
  - If you remove a field, remember it may still exist in some merchants' saved JSON. `sanitizeSettings` filters unknown keys at read time, but you may want a migration to clean DB rows.
  - The `showWhen.layoutKey + supports` pattern reads layout meta from `src/widget/{summary,review}-layouts/index.js`. New layouts must declare their `supports` map.

## Admin widget editor

### [src/components/home-page/widgets/editor/ColorPickerField.tsx](src/components/home-page/widgets/editor/ColorPickerField.tsx)
- **What:** Shared admin color picker used by schema-driven widget color fields and local-only preview controls.
- **Why it matters:** Keeps color picker UX consistent across the settings panel and preview toolbar. Supports alpha hex values, checker preview, popover editing, and debounced commits.
- **Be careful:** Preview-only controls can use this component without writing to `WidgetSettings`; keep DB persistence decisions in the caller.

### [prisma/schema.prisma](prisma/schema.prisma)
- **What:** 4 models — `AuthToken`, `Review`, `StoreSettings`, `WidgetSettings`.
- **Why it matters:** Touched by every feature. `Review` has tuned indexes for common widget query shapes (`storeId+status+slug`, `storeId+productId`).
- **Be careful:**
  - When adding indexes, check [prisma/migrations/20260404170403_cleanup_redundant_indexes/](prisma/migrations/20260404170403_cleanup_redundant_indexes/) — there's a history of churn here.
  - `Review.images` is a TEXT (`JSON.stringify(string[])`), not a relation. Keep the parser in sync if format changes.
  - `Review.comment` and `Review.merchantReply` have `@db.VarChar(2000)` — DB-level cap. API layer also enforces. Don't lift one without the other.
  - `WidgetSettings.settings` is `Json @default("{}")`. Never read it without going through `sanitizeSettings + getWidgetDefaults`.

## Auth / OAuth

### [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- **What:** OAuth callback. HMAC-SHA256 signature validation → token exchange → fetch merchant + authorized app → upsert AuthToken → upsert StoreSettings → auto-inject widget script per storefront → JWT → redirect to admin.
- **Be careful:**
  - This route does a LOT (auth + side-effects). If you add work here, prefer a separate endpoint or a defensive try/catch like the existing script-injection block (it logs but doesn't fail the install).
  - On every install, `prisma.authToken.deleteMany({ merchantId })` runs first — this is intentional for re-install hygiene. Don't remove without a plan.
  - When `existingScripts` is empty (DB reset / fresh install), it calls `deleteStorefrontJSScript()` (no args) which **wipes ALL scripts** on the merchant — including OTHER apps if any. Verify with ikas docs before changing.

### [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)
- **What:** `getIkas(token)` builds the GraphQL client; `onCheckToken` auto-refreshes expired tokens and persists the new pair.
- **Be careful:** `onCheckToken` is invoked by the ikas client on every call. If it throws, requests fail silently (returns `accessToken: undefined`). Logging is minimal — add structured logs if you debug refresh issues.

### [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts)
- **What:** AppBridge token retrieval, `validateCodeSignature(code, signature, clientSecret)` HMAC check.
- **Be careful:** Don't bypass the signature check in callback. It's the OAuth code-injection defense.

### [src/helpers/jwt-helpers.ts](src/helpers/jwt-helpers.ts)
- **What:** Issues HS256 JWT with `merchantId` as `subject`, `authorizedAppId` as `audience`, 4h expiry, signed with `CLIENT_SECRET`.
- **Be careful:** `process.env.CLIENT_SECRET || ''` — if env is missing, you get an empty-key signature, which is catastrophic. Don't ship without env validation.

### [src/lib/auth-helpers.ts](src/lib/auth-helpers.ts)
- **What:** `getUserFromRequest()` — verifies JWT, returns `{ merchantId, authorizedAppId }`.
- **Why it matters:** Every `/api/admin/*` route gates on this. Treat as the trust boundary.

## Public-facing surface

### [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- **What:** GET (paginated reviews + rating distribution) and POST (submit, with profanity + rate limit + auto-approve mode).
- **Be careful:**
  - **Highest-blast-radius surface in the app.** It's CORS-open and accepts user content from anywhere on the internet.
  - Profanity list is hard-coded in the file; updating means redeploy.
  - Rate limit is per IP, 3/10min. Bypass risk if the attacker rotates IPs — by design we accept this trade-off.
  - `containsProfanity` is called on `title`, `comment`, `author`. If you add a new free-text field, pass it through too.
  - `JSON.parse(r.images)` wrapped in try/catch — output gracefully degrades to `[]`.

### [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts)
- **What:** Issues short-lived Cloudinary upload signature; rate-limited 10/10min/IP.
- **Be careful:** The signature only authorizes uploads to `folder=review_images`. Don't widen the signed params without re-checking abuse vectors.

### [src/lib/cors.ts](src/lib/cors.ts)
- **What:** `withCors` adds `Access-Control-Allow-Origin: *` to all `/api/public/*` responses.
- **Be careful:** Wide-open by design (unknown storefront domains). If you tighten, do it per-merchant via `StoreSettings.allowedOrigins` (not implemented).

## Widget runtime

### [src/widget/index.js](src/widget/index.js)
- **What:** Entry point. Detects preview vs prod mode. Wires events, observer, modal listener.
- **Be careful:** Top of file imports many modules — module-level side effects (e.g. `core/config.js` reading `<script src>`) must be SSR-safe (already guarded with `typeof document`).

### [src/widget/core/config.js](src/widget/core/config.js)
- **What:** Reads `publicApiKey` and base URL from the widget's own `<script>` tag.
- **Be careful:** SSR-safe (guarded). If anything above this in the import graph reads `document` unguarded, the dashboard build will break — already happened (see `core/config.js` comment).

### [public/widget.js](public/widget.js)
- **What:** Built bundle.
- **Be careful:** **Never hand-edit.** Run `pnpm build:widget` after `src/widget/*` changes. Output is checked into git.

## Build / deploy

### [scripts/build-widget.mjs](scripts/build-widget.mjs)
- **What:** esbuild driver. IIFE format, ES2017 target, minified in prod, `node --check` validates output.
- **Be careful:** `--theme=new-theme` aliases swap theme files at bundle time. If you add a theme variant, declare it in the `validThemes` allowlist and provide all aliased modules.

### [vercel.json](vercel.json)
- **What:** `regions: ["fra1"]` and one weekly cron (`/api/admin/cleanup-images` Mon 03:00 UTC).
- **Be careful:** The cron route checks `Bearer ${CRON_SECRET}`. Set it in Vercel env. Without it, the route is unauthenticated.

## Obsidian Links
- [[Folder_Structure]]
- [[Project_Index]]
- [[Auth_And_Installation_Flow]]
- [[Database_Schema]]
- [[Widget_Architecture]]
- [[Security_And_Rate_Limits]]
