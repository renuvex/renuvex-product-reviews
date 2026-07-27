---
type: status
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-28
tags:
  - glossary
related:
  - "[[Index]]"
  - "[[Project_Overview]]"
  - "[[Ikas_Platform_Notes]]"
---

# Glossary

## Project / Domain
- **Renuvex Product Reviews** — canonical product name for this app.
- **Yorum Paneli** — historical Turkish project/display name. Kept only in old notes and compatibility context.
- **Review** — a customer rating + optional title + comment + images, attached to a product.
- **Approved / Pending / Rejected** — review `status` values. Public widget shows only `approved`.
- **Auto-approve mode** — `manual` / `4plus` / `5stars` / `all` — controls initial review status.
- **Rating badge** — small inline component showing `★★★★☆ (12)` next to product titles.
- **Listing rating** — rating badges injected into collection / search pages, one per product card.
- **Summary layout** — different visual styles for the per-product review summary block: `classic` / `compact` / `hero` / `minimal` / `split`.
- **Review layout** — different ways the review list is rendered: `card` / `gallery` / `list`.
- **Layout-aware setting** — a settings field that hides itself when the active layout doesn't `support` it (`layoutKey + supports` in `widgetDefs.ts`).
- **Preview mode** — widget.js running in `/preview` iframe with `window.__ikasPreviewMode = true`; reacts to the `RENUVEX_PR_SETTINGS_UPDATE` postMessage.
- **Author masking** — public review responses replace last name with initial: `Mert Wilson` → `Mert W.`.

## ikas-specific
- **ikas** — the e-commerce platform this app integrates with (Turkish Shopify equivalent). Admin GraphQL at `https://api.myikas.com/api/v2/admin/graphql`.
- **AppBridge** — `@ikas/app-helpers` SDK; lets the app receive a token while embedded in ikas Admin iframe.
- **Storefront** — a public shop frontend bound to a merchant. A merchant can have multiple (e.g. locale variants).
- **StorefrontJSScript** — ikas-managed `<script>` tag attached to a storefront. We use it to inject `widget.js` into every page of every storefront. Source uses non-destructive `createStorefrontJSScript` / `updateStorefrontJSScript`; delete is intentionally unused until ikas exposes a targeted, verified contract.
- **Authorized App** — an installation of this app for a specific merchant. Identified by `authorizedAppId`, primary key of `AuthToken`.
- **Merchant** — the ikas account that installed the app. `merchantId` is used everywhere as `storeId`.
- **publicApiKey** — query param the widget reads from its own `<script src>`; equals `merchantId`. Public, non-secret.

## Tech terms used in this project
- **JWT** — short-lived (4h) HS256 JWT signed with `CLIENT_SECRET`; sent as `Authorization: JWT <token>` from frontend to `/api/admin/*`.
- **Iron-session** — encrypted cookie session that holds the opaque browser
  binding for OAuth state; raw state is not stored in the cookie. Wrapped in
  [src/lib/session.ts](src/lib/session.ts).
- **Codegen** — `pnpm codegen` regenerates [src/lib/ikas-client/generated/graphql.ts](src/lib/ikas-client/generated/graphql.ts) from operations defined in [graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts).
- **Upstash Redis** — serverless Redis used for IP rate-limit counters and
  short-lived, single-use OAuth state transactions across Vercel instances.
- **AWS image upload intent** — server endpoint creates a tenant-scoped upload intent and returns a short-lived S3 presigned POST; client uploads directly to S3 without proxying through our server.

## Obsidian Links
- [[Project_Overview]]
- [[Ikas_Platform_Notes]]
- [[Database_Schema]]
- [[Widget_Architecture]]
