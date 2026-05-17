---
type: architecture
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-17
tags:
  - architecture
  - system
related:
  - "[[Index]]"
  - "[[API_Design]]"
  - "[[Auth_And_Installation_Flow]]"
  - "[[Widget_Architecture]]"
---

# System Architecture

## Summary
A Next.js 16 (16.2) app on Vercel (eu-central / fra1) with three runtimes: the **merchant admin** (React iframe inside ikas Admin), the **storefront widget** (vanilla JS bundle injected into customer storefronts), and **API routes** that serve both. State lives in Postgres (Supabase) and Cloudinary; rate limits in Upstash Redis.

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
│   /api/public/*   CORS-open   ◄─── widget.js (storefronts)      │
│   /api/preview/*  iframe data                                    │
│                                                                 │
│   Cron weekly  ──►  Cloudinary cleanup                          │
└──────────────────────┬───────────────┬──────────────┬───────────┘
                       │               │              │
                       ▼               ▼              ▼
                 Postgres        Cloudinary      Upstash Redis
                 (Supabase)      review_images/   (rate limits)
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
2. `GET /api/oauth/authorize/ikas` sets CSRF state and redirects to ikas authorize URL.
3. ikas redirects back to `GET /api/oauth/callback/ikas?code&signature&state`.
4. Server validates HMAC signature → exchanges code → fetches merchant + authorized app → upserts `AuthToken` and `StoreSettings` → **for each storefront, creates or updates a `StorefrontJSScript` pointing to `<STOREFRONT_WIDGET_BASE_URL>/widget.js?publicApiKey=<merchantId>`** → issues 4h JWT → redirects to `/callback` (client) → ikas Admin.

See [[Auth_And_Installation_Flow]] for full trace.

### Storefront review submission
1. Customer opens product page; ikas serves the `<script src="…/widget.js…">` tag.
2. Widget reads `publicApiKey` (`= merchantId`) from script src.
3. Widget calls `/api/public/settings` (cached 60s/300s SWR), then `/api/public/reviews?storeId&productId`.
4. Customer clicks "Write a review" → multi-step modal → optional image uploads via Cloudinary (signed direct upload).
5. Submit → `POST /api/public/reviews` → server enforces profanity filter + rate limit → writes Review with status by auto-approve mode.

### Storefront listing badges
1. Listing page (collection / search) loads. Widget observer detects product cards.
2. Widget collects card slugs → `GET /api/public/ratings-by-slug?storeId&slugs=a,b,c` (cached at edge).
3. Widget injects `★ rating · count` badge into each card.

### Admin moderation
1. Admin UI calls `/api/admin/reviews?status=pending&page=1`. JWT validated, rows scoped to `merchantId`.
2. Merchant approves / rejects / replies → `PUT /api/admin/reviews`. Approved rows immediately appear on storefront (after edge cache TTL).

## Cross-cutting concerns

- **Auth boundary** at `getUserFromRequest`. Public APIs are CORS-open and rate-limited by IP.
- **Rate limit / abuse** via Upstash Redis (incr+expire pattern). Detail in [[Security_And_Rate_Limits]].
- **Caching** via Vercel edge. Detail in [[Caching_And_Performance]].
- **Image lifecycle**: client uploads directly to Cloudinary; URLs stored in `Review.images` (TEXT JSON); weekly cron sweeps orphans not referenced by any Review.

## Deployment topology
- Vercel project. Region `fra1`. Postgres on Supabase. Redis on Upstash. Cloudinary for images. ikas-side: registered app pointing OAuth callback to `<DEPLOY_URL>/api/oauth/callback/ikas`.
- See [[Deployment_Notes]].

## Notes
- **`storeId === merchantId`** everywhere. There is no separate store entity. Multi-storefront-per-merchant is partially modeled (`StoreSettings.storefrontScripts`) but settings/reviews are merchant-global.
- The widget bundle is a single static file. No runtime code-splitting. New features add to bundle size — keep an eye on [public/widget.js](public/widget.js) size (currently ~165 KB).
- The OAuth callback eagerly does the script injection. If ikas API is slow at install time, the install still succeeds because injection is wrapped in try/catch — but the merchant may not see the widget until manual re-inject.

## Related Source Files
- [src/app/api/](src/app/api/)
- [src/widget/index.js](src/widget/index.js)
- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- [vercel.json](vercel.json)

## Obsidian Links
- [[Auth_And_Installation_Flow]]
- [[API_Design]]
- [[Database_Schema]]
- [[Widget_Architecture]]
- [[Caching_And_Performance]]
- [[Security_And_Rate_Limits]]
- [[Deployment_Notes]]
