---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-29
last_verified: 2026-07-29
tags:
  - architecture
  - system
related:
  - "[[Index]]"
  - "[[API_Design]]"
  - "[[Auth_And_Installation_Flow]]"
  - "[[Widget_Architecture]]"
  - "[[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]"
source_files:
  - "src/app/api/oauth/authorize/ikas/route.ts"
  - "src/app/api/oauth/callback/ikas/route.ts"
  - "src/lib/oauth-state.ts"
  - "src/lib/session.ts"
  - "src/widget/core/origins.js"
  - "workers/widget-delivery/src/index.ts"
  - "wrangler.widget.jsonc"
---

# System Architecture

## Summary
A Next.js 16 (16.2) app on Vercel (eu-central / fra1) with three primary application runtimes: the **merchant admin** (React iframe inside ikas Admin), the **storefront widget** (vanilla JS bundle injected into customer storefronts), and **API routes** that serve both. The Cloudflare Worker widget-delivery target is intentionally a fourth edge delivery layer: it serves `widget.renuvex.app` static widget files and, after V2 cutover, only selected cacheable public reads. It does not own settings side effects, upload, submit, Mux, QStash, DB, image-provider, or webhook behavior. State lives in Postgres (Supabase); review images live in AWS S3/CloudFront; rate limits in Upstash Redis.

## Components

```
┌─────────────────────────────────────────────────────────────────┐
│                        ikas Admin (browser)                     │
│   ┌────────────────────────────────────────────────────────┐    │
│   │  iframe → app.example.com/dashboard                    │    │
│   │  React admin (JWT in sessionStorage, bridge via axios) │    │
│   └────────────────────────────────────────────────────────┘    │
└───────────────────┬─────────────────────────────────────────────┘
                    │  Authorization: JWT <token>
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│            Next.js app on Vercel (region: fra1)                 │
│                                                                 │
│   /api/admin/*    JWT-gated   ───►  Prisma ─► Postgres (Supabase)│
│   /api/oauth/*    install     ───►  ikas Admin GraphQL          │
│   /api/public/*   policy-bound ◄── widget.js / review center    │
│   /api/preview/*  iframe data                                    │
│                                                                 │
│   Cron jobs    ──►  theme sync + daily/monthly maintenance       │
└──────────────────────┬───────────────┬──────────────┬───────────┘
                       │               │              │
                       ▼               ▼              ▼
                 Postgres        AWS S3/CloudFront  Upstash Redis
                 (Supabase)      review_images/stores/<storeId>/   (rate limits)
                                  signed uploads


┌─────────────────────────────────────────────────────────────────┐
│                Customer storefront (any ikas store)              │
│                                                                 │
│   <script src="…/widget.js?publicApiKey=<merchantId>" async>    │
│   widget.js   ──► /api/public/settings (config)                 │
│                ──► /api/public/reviews (read + write)           │
│                ──► /api/public/ratings-by-slug (listing badges) │
│                ──► /api/public/upload/sign (then direct→CDN)    │
└─────────────────────────────────────────────────────────────────┘
```

## Data flow

### Install
1. Merchant clicks "install" in ikas App Store (or visits `?storeName=` on the deploy URL).
   A live ikas dashboard install may first call the registered callback with
   `code` and `storeName` but no state. That unbound code is discarded; one
   browser/store-scoped Redis marker permits a 303 restart at step 2. A second
   state-less callback fails closed.
2. `GET /api/oauth/authorize/ikas` creates a browser-bound, ten-minute Redis
   state transaction and redirects to the ikas authorize URL.
3. ikas redirects back to
   `GET /api/oauth/callback/ikas?code&storeName&state[&signature]`.
4. Server atomically consumes state required for token exchange, validates the
   signature when supplied, exchanges the code, fetches merchant + authorized app, upserts
    `AuthToken` and `StoreSettings`, **creates or updates each storefront's
    `StorefrontJSScript` pointing to
    `<STOREFRONT_WIDGET_BASE_URL>/widget.js?publicApiKey=<merchantId>` and records
    active theme metadata**, then redirects directly to the trusted ikas Admin
    authorized-app URL. The embedded frontend obtains its admin JWT from
    AppBridge; the OAuth callback never places a bearer token in a URL.

See [[Auth_And_Installation_Flow]] for full trace.

### Storefront review submission
1. Customer opens product page; ikas serves the `<script src="…/widget.js…">` tag.
2. Widget reads `publicApiKey` (`= merchantId`) from script src and computes `ASSET_BASE` from the script origin.
3. Widget calls `READ_API_BASE /api/public/settings` (cached 60s/300s SWR), then `READ_API_BASE /api/public/reviews?storeId&productId`. If settings returns `runtime.themeSyncDue`, the widget sends a non-blocking `POST API_BASE /api/public/storefront-theme/lazy-sync`. In the Worker delivery target, `ASSET_BASE` is `https://widget.renuvex.app`, `API_BASE` is `https://app.renuvex.app`, and `READ_API_BASE` is `https://widget.renuvex.app` for allowlisted public settings/ratings/reviews reads.
4. Customer clicks "Write a review" → multi-step modal → optional image uploads via AWS S3 presigned POST and register.
5. Submit → `POST /api/public/reviews` → server enforces profanity filter + rate limit → writes Review with status by auto-approve mode.

### Storefront listing badges
1. Listing page (collection / search) loads. Widget observer detects product cards.
2. Widget collects card slugs → `GET /api/public/ratings-by-slug?storeId&slugs=a,b,c` (cached at edge).
3. Widget injects `★ rating · count` badge into each card.

### Admin moderation
1. Admin UI calls `/api/admin/reviews?status=pending&page=1`. JWT validated, rows scoped to `merchantId`.
2. Merchant approves / rejects / replies → `PUT /api/admin/reviews`. Approved rows immediately appear on storefront (after edge cache TTL).

### Theme sync
1. Install and manual script repair update scripts and theme metadata from the same ikas `listStorefront` read.
2. Dashboard open and settings save call only lightweight theme sync; they do not reconcile StorefrontJSScript records.
3. If a different active `themeId` is observed, it is stored as pending while public settings keep serving the previous stable adapter.
4. QStash daily maintenance verifies pending themes and promotes them to stable only when the same `themeId` is still active. Sub-daily verification would need a separate QStash-backed delayed verification design.

## Cross-cutting concerns

- **Auth boundary** at `authenticateIkasAdminRequest`: strict HS256 AppBridge
  JWT plus exact active installation and matching OAuth token. Mutation paths
  repeat the installation generation/state fence in their final transaction.
  Anonymous storefront APIs use wildcard CORS without credentials and are
  rate-limited per route; review-session APIs use exact host/origin with no
  CORS.
- **Rate limit / abuse** via Upstash Redis (incr+expire pattern). Detail in [[Security_And_Rate_Limits]].
- **Caching** via Vercel edge. Detail in [[Caching_And_Performance]].
- **Image lifecycle**: client uploads directly to S3; `ReviewMedia` stores AWS variant manifests and `Review.images` is compatibility-only; daily maintenance expires abandoned pending uploads and monthly cleanup scans AWS object families from DB evidence.
- **Theme lifecycle**: private/admin-triggered sync plus maintenance verification. The storefront browser never calls ikas Admin APIs.

## Deployment topology
- Vercel project. Region `fra1`. Postgres on Supabase. Redis on Upstash. AWS S3/CloudFront for review images. ikas-side: registered app pointing OAuth callback to `<DEPLOY_URL>/api/oauth/callback/ikas`.
- Live widget static delivery: Cloudflare Worker Static Assets for `widget.renuvex.app`, with V2 source support for only selected public-read proxying and no data/provider bindings. `app.renuvex.app` remains the backend/API/write origin.
- See [[Deployment_Notes]].

## Notes
- **`storeId === merchantId`** everywhere. There is no separate store entity. Multi-storefront-per-merchant is partially modeled (`StoreSettings.storefrontScripts`) but settings/reviews are merchant-global.
- The widget bundle is a single static file. No runtime code-splitting. New features add to bundle size — keep an eye on [public/widget.js](public/widget.js) size (currently ~165 KB).
- The OAuth callback eagerly does the script injection. If ikas API is slow at install time, the install still succeeds because injection is wrapped in try/catch — but the merchant may not see the widget until manual re-inject.

## Related Source Files
- [src/app/api/](src/app/api/)
- [src/widget/index.js](src/widget/index.js)
- [src/widget/core/origins.js](src/widget/core/origins.js)
- [workers/widget-delivery/src/index.ts](workers/widget-delivery/src/index.ts)
- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- [vercel.json](vercel.json)

## Obsidian Links
- [[Auth_And_Installation_Flow]]
- [[API_Design]]
- [[Database_Schema]]
- [[Widget_Architecture]]
- [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]
- [[Caching_And_Performance]]
- [[Security_And_Rate_Limits]]
- [[Deployment_Notes]]
