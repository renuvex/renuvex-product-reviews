---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - adr
  - stack
related:
  - "[[Decision_Index]]"
  - "[[Dependency_Map]]"
  - "[[System_Architecture]]"
  - "[[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]"
  - "[[ADR_0034_AWS_Review_Image_Migration]]"
  - "[[ADR_0035_QStash_Scheduler_For_Maintenance]]"
source_files:
  - "package.json"
  - "prisma/schema.prisma"
  - "scripts/build-widget.mjs"
  - "public/widget-runtime/build-manifest.json"
  - "vercel.json"
  - "wrangler.widget.jsonc"
---

# ADR_0001 — Project Stack

## Status
Accepted

## Date
2026-05-05 (documenting an inherited decision; original decision predates this wiki)

## Context
We're building a SaaS review app for ikas merchants: merchant admin (iframe inside ikas Admin) + storefront widget + APIs. We needed a stack that:
- Plays well with ikas's `@ikas/admin-api-client` and AppBridge
- Supports server route handlers + cookies + GraphQL on the same runtime
- Lets a small team move fast on UI
- Has a sane DB story for multi-tenant data with rate-limited public APIs
- Deploys cleanly to Vercel

## Decision
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript - Next is
  pinned at `16.2.1` in `package.json`.
- **DB**: Postgres (Supabase), Prisma ORM
- **Styling**: Tailwind CSS v4 + shadcn/ui (Radix primitives)
- **Sessions**: iron-session for the opaque OAuth browser binding; Upstash
  Redis owns the bounded, single-use state transaction
- **Auth**: HS256 JWT (`jsonwebtoken`) for browser → server, signed with `CLIENT_SECRET`
- **Rate limit / ephemeral security state**: Upstash Redis (REST API for
  serverless compatibility)
- **Image storage/delivery**: private AWS S3 originals and variants delivered
  through CloudFront; upload uses signed direct-to-S3 requests.
- **Widget runtime**: vanilla JavaScript built by **esbuild** as a stable classic
  loader plus immutable split ESM runtime/chunks.
- **Codegen**: GraphQL Codegen for the ikas Admin client
- **Hosting/delivery**: Vercel (`fra1`) for the app and APIs; Cloudflare Worker
  Static Assets for the storefront loader/runtime and allowlisted public reads.
- **Maintenance scheduler**: QStash-signed daily and monthly jobs; manual admin
  routes remain authenticated operational fallbacks.
- **Package manager**: pnpm 10.4.1

## Reasoning
- **Next.js App Router** — single runtime for SSR pages, route handlers, and server actions; fits the "iframe admin + public widget API" model.
- **Prisma** — type-safe DB layer, mature migrations, good DX.
- **shadcn/ui** — copy-into-repo primitives; we control them, no version lock-in.
- **Vanilla JS widget** — every storefront pays for widget bytes and execution time; React/framework overhead is unjustified for a script that paints star ratings.
- **AWS signed direct upload** - image bodies do not proxy through the app;
  registration and variant processing remain server-authoritative.
- **Upstash REST** — works in serverless cold-starts; no socket pool to manage.

## Alternatives Considered
- **Remix / SvelteKit** — viable, but team familiarity and ikas SDK examples target Next.js.
- **DynamoDB / Mongo** — relational shape (reviews per product, status workflow, indexing) fits Postgres better.
- **Custom widget framework (Preact, Lit)** — adds bytes for marginal DX. Vanilla JS is acceptable at current complexity.
- **No GraphQL Codegen** — would lose type-safety on ikas operations; high cost, low gain.
- **Webpack production builds** vs Turbopack — currently `--webpack` due to compatibility; revisit when Turbopack production ships stable.

## Consequences
- Widget build outputs are checked into Git: `public/widget.js`, the manifest,
  current hashed runtime/chunks, and retention-required older assets. Every
  storefront source change requires the widget build/drift gates.
- Migrations run on every production deploy while old code may still serve.
  Breaking changes require expand/contract sequencing.
- Strong coupling to ikas: the `@ikas/admin-api-client` and AppBridge are not optional.
- `CLIENT_SECRET` is used for ikas OAuth and AppBridge JWT verification.
- Cold-start performance depends on Vercel + Supabase pooler health.

## Related Source Files
- [package.json](package.json)
- [src/globals/config.ts](src/globals/config.ts)
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
- [vercel.json](vercel.json)

## Related Notes
- [[Dependency_Map]]
- [[System_Architecture]]
- [[ADR_0002_Widget_Injection_Strategy]]
- [[ADR_0004_Ikas_Integration_Strategy]]
- [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]
- [[ADR_0034_AWS_Review_Image_Migration]]
- [[ADR_0035_QStash_Scheduler_For_Maintenance]]
