---
type: codebase
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-18
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

### [src/components/home-page/widgets/editor/SettingsPanel.tsx](src/components/home-page/widgets/editor/SettingsPanel.tsx)
- **What:** Schema-driven admin settings renderer. Converts every `SettingField` from [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts) into the correct control.
- **Why it matters:** It is the bridge between schema metadata and merchant-facing customization UX.
- **Be careful:** Keep stored setting values stable. UI-only rendering changes, such as visual select cards, should not rename setting keys or option values.

### [src/components/home-page/widgets/editor/VisualSelectGrid.tsx](src/components/home-page/widgets/editor/VisualSelectGrid.tsx)
- **What:** Admin-only visual choice card renderer for `select` options that declare `preview` metadata.
- **Why it matters:** Lets layout choices show mini visual sketches while preserving simple string values in `WidgetSettings`.
- **Be careful:** Do not move storefront rendering logic here. These previews are explanatory admin sketches, not production widget components.

### [src/components/home-page/widgets/editor/ColorPickerField.tsx](src/components/home-page/widgets/editor/ColorPickerField.tsx)
- **What:** Shared admin color picker used by schema-driven widget color fields and local-only preview controls.
- **Why it matters:** Keeps color picker UX consistent across the settings panel and preview toolbar. Admin edits emit opaque `#rrggbb` values, while backend/runtime still tolerate alpha defaults and legacy saved `#rrggbbaa` values.
- **Be careful:** Preview-only controls can use this component without writing to `WidgetSettings`; keep DB persistence decisions in the caller. Do not re-enable user-facing alpha unless the UX for transparent defaults is redesigned.

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
  - Script injection is now non-destructive: the callback delegates to `ensureStorefrontScripts()` and uses only ikas create/update mutations. Do not reintroduce zero-argument `deleteStorefrontJSScript()` unless ikas provides a targeted, verified delete/list contract.

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
- **What:** GET (paginated reviews + rating distribution, explicit public field whitelist) and POST (submit, with StoreSettings/ProductSnapshot target verification, profanity + rate limit + auto-approve mode).
- **Be careful:**
  - **Highest-blast-radius surface in the app.** It's CORS-open and accepts user content from anywhere on the internet.
  - Profanity list is hard-coded in the file; updating means redeploy.
  - Rate limit is per IP, 3/10min. Bypass risk if the attacker rotates IPs — by design we accept this trade-off.
  - `containsProfanity` is called on `title`, `comment`, `author`. If you add a new free-text field, pass it through too.
  - Do not trust public `slug`, `productName`, or `email` from the browser. Review identity/name snapshots come from `ProductSnapshot`; public email stays blank until a verified buyer flow exists.
  - Review image input/output must go through [src/lib/review-images.ts](src/lib/review-images.ts), not ad hoc `JSON.parse` or URL prefix checks.

### [src/lib/review-images.ts](src/lib/review-images.ts)
- **What:** Shared server-side policy for review image URLs.
- **Why it matters:** Prevents public review submissions from storing third-party tracking images and filters legacy DB image rows before public/admin responses.
- **Be careful:**
  - Keep this policy aligned with widget `getTrustedReviewImages()` in [src/widget/core/helpers.js](src/widget/core/helpers.js).
  - No-image reviews must still succeed when Cloudinary env is missing; only non-empty image payloads require a valid cloud name.
  - Do not reintroduce broad `https://` or `data:image` acceptance in public API or widget rendering.

### [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts)
- **What:** Issues short-lived Cloudinary upload signature for a verified store; rate-limited 10/10min/IP.
- **Be careful:** The signature only authorizes uploads to `folder=review_images/stores/<storeId>`. Do not return a client-chosen folder or remove StoreSettings verification.

### [src/lib/cors.ts](src/lib/cors.ts)
- **What:** `withCors` adds `Access-Control-Allow-Origin: *` to all `/api/public/*` responses.
- **Be careful:** Wide-open by design (unknown storefront domains). If you tighten, do it per-merchant via `StoreSettings.allowedOrigins` (not implemented).

## Widget runtime

### [src/widget/index.js](src/widget/index.js)
- **What:** Entry point. Detects preview vs prod mode. Wires events, observer, modal listener.
- **Be careful:** Top of file imports many modules — module-level side effects (e.g. `core/config.js` reading `<script src>`) must be SSR-safe (already guarded with `typeof document`).

### [src/widget/icons/index.js](src/widget/icons/index.js)
- **What:** Public icon API used by storefront runtime, admin setting definitions, icon picker, and admin preview rendering.
- **Why it matters:** Review/rating icons and filter button icons are split into dedicated registries under [src/widget/icons/](src/widget/icons/) but exposed from one import point. This keeps runtime rendering and admin choices synchronized.
- **Be careful:** New icon consumers should import from `src/widget/icons/index.js`. [src/widget/icons.js](src/widget/icons.js) remains only as a backward-compatible re-export.

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
- **What:** `regions: ["fra1"]`, daily maintenance cron (`/api/admin/daily-maintenance`), monthly Cloudinary fallback cleanup, and widget static asset cache headers.
- **Be careful:** Cron routes require `Bearer ${CRON_SECRET}` and refuse to run if `CRON_SECRET` is missing in Vercel env.

## Observability (Sentry)

### [sentry.server.config.ts](sentry.server.config.ts) / [sentry.edge.config.ts](sentry.edge.config.ts) / [src/instrumentation-client.ts](src/instrumentation-client.ts)
- **What:** Sentry runtime init for Node, Edge, and browser. Wired through [src/instrumentation.ts](src/instrumentation.ts).
- **Why it matters:** Controls every Sentry behavior — DSN source, PII attachment, sample rates, Replay masking.
- **Be careful:**
  - **`sendDefaultPii: false`** is intentional. Default-true would auto-attach `Authorization` headers (ikas OAuth tokens) and cookies (iron-session JWT) to every captured event. Do not flip this without a `beforeSend` scrubber covering every sensitive header and body field. See [[ADR_0009_Sentry_Observability_Strategy]].
  - DSN must stay env-driven (`process.env.NEXT_PUBLIC_SENTRY_DSN`). Hardcoding it back makes rotation impossible without a deploy.
  - `tracesSampleRate: 0.1` in production. Bumping to `1` will burn the Sentry quota in days at current panel traffic.
  - Replay uses `maskAllText: true` + `blockAllMedia: true`. Disabling either ships merchant data to Sentry.

### [src/instrumentation.ts](src/instrumentation.ts)
- **What:** Next.js instrumentation entry. Conditionally imports the right Sentry runtime config; exports `onRequestError = Sentry.captureRequestError`.
- **Be careful:** Don't add other instrumentation logic here. Keep it Sentry-only — Next.js calls this once at runtime startup.

### [src/app/global-error.tsx](src/app/global-error.tsx)
- **What:** App Router root error boundary. Captures uncaught render errors via `Sentry.captureException`.
- **Be careful:** Keep the capture call. UX polish is fine; removing the capture silently disables panel error reporting for the worst class of failures.

### [next.config.js](next.config.js) — Sentry wrapper
- **What:** Wrapped with `withSentryConfig`. `widenClientFileUpload`, `automaticVercelMonitors`, debug-log tree-shake.
- **Be careful:** Any change to `next.config.js` must preserve the `withSentryConfig` wrapper around `module.exports`. The wizard-injected block is appended below the user config — keep that ordering.

### [src/widget/core/error-reporter.js](src/widget/core/error-reporter.js)
- **What:** Tiny in-widget listener that forwards uncaught widget errors to the panel via `/api/public/widget-error`. Side-effect imported as the first line of [src/widget/index.js](src/widget/index.js).
- **Why it matters:** Closes the visibility gap left by ADR_0009 (no SDK in widget). 637 bytes gzip on the bundle.
- **Be careful:**
  - Must remain the first import in [src/widget/index.js](src/widget/index.js) so its listeners attach before any other module evaluates.
  - The reporter must **never throw**. Every internal step is wrapped in try/catch. If you add logic, preserve that invariant.
  - Filters by `widget.js` substring in `event.filename` or stack. If the widget is ever served under a different filename, this filter must be updated or the reporter will go silent.
  - Session cap (5) and 2-second throttle protect against error-loop floods. Don't remove them.

### [src/app/api/public/widget-error/route.ts](src/app/api/public/widget-error/route.ts)
- **What:** Public POST endpoint that receives widget error reports, rate-limits per IP (30/60s via Upstash key `renuvex_pr_werr_rl:`), then calls `Sentry.captureException` with `source: widget` tag.
- **Why it matters:** Single ingress for widget-originated Sentry events. Must stay cheap (no DB write, no heavy parsing).
- **Be careful:**
  - Always returns 200 — never leak filtering/rate-limit decisions to the caller. Storefronts don't need that information and exposing it just helps attackers shape abuse.
  - Field length caps (`clip`) are deliberate. Lift only if there's a real need.
  - Don't add CORS strictness here — this endpoint must accept POST from arbitrary merchant storefront origins, same as the rest of `/api/public/*`.

## Obsidian Links
- [[Folder_Structure]]
- [[Project_Index]]
- [[Auth_And_Installation_Flow]]
- [[Database_Schema]]
- [[Widget_Architecture]]
- [[Security_And_Rate_Limits]]

## Change Log
- 2026-05-12: Added [src/widget/icons/index.js](src/widget/icons/index.js) to the widget runtime hot-list after splitting review/rating and filter icon registries under [src/widget/icons/](src/widget/icons/).
- 2026-05-11: Added [src/widget/core/error-reporter.js](src/widget/core/error-reporter.js) and [src/app/api/public/widget-error/route.ts](src/app/api/public/widget-error/route.ts) under Observability. Together they close the widget-side visibility gap from ADR_0009 by forwarding uncaught widget errors to Sentry via a 637-byte (gzip) in-widget reporter and a rate-limited server endpoint. See [[ADR_0010_Widget_Error_Forwarding]].
- 2026-05-11: Added the Observability (Sentry) section: [sentry.server.config.ts](sentry.server.config.ts), [sentry.edge.config.ts](sentry.edge.config.ts), [src/instrumentation.ts](src/instrumentation.ts), [src/instrumentation-client.ts](src/instrumentation-client.ts), [src/app/global-error.tsx](src/app/global-error.tsx), and the `withSentryConfig` wrapping in [next.config.js](next.config.js). Each entry calls out the `sendDefaultPii: false` invariant, env-driven DSN, prod sample rates, and the wizard-wrapper ordering rule. See [[ADR_0009_Sentry_Observability_Strategy]].
- 2026-05-10: Added [src/lib/review-images.ts](src/lib/review-images.ts) as the source of truth for trusted review image URL validation.
- 2026-05-08: Added [SettingsPanel.tsx](src/components/home-page/widgets/editor/SettingsPanel.tsx) and [VisualSelectGrid.tsx](src/components/home-page/widgets/editor/VisualSelectGrid.tsx) to the admin widget editor hot-list after introducing schema-driven visual choice cards.
