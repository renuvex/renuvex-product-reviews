---
type: decision
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - adr
  - stack
related:
  - "[[Decision_Index]]"
  - "[[Dependency_Map]]"
  - "[[System_Architecture]]"
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
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript — pinned at `16.2.1` in `package.json`. (Some legacy docs/rule files still say "Next.js 15"; treat the pinned version as authoritative.)
- **DB**: Postgres (Supabase), Prisma ORM
- **Styling**: Tailwind CSS v4 + shadcn/ui (Radix primitives)
- **Sessions**: iron-session for OAuth state cookie
- **Auth**: HS256 JWT (`jsonwebtoken`) for browser → server, signed with `CLIENT_SECRET`
- **Rate limit**: Upstash Redis (REST API for serverless compatibility)
- **Image storage**: Cloudinary with signed direct uploads
- **Widget bundle**: vanilla JS bundled by **esbuild** (separate from Next pipeline)
- **Codegen**: GraphQL Codegen for the ikas Admin client
- **Hosting**: Vercel (region `fra1`), one weekly cron
- **Package manager**: pnpm 10.4.1

## Reasoning
- **Next.js App Router** — single runtime for SSR pages, route handlers, and server actions; fits the "iframe admin + public widget API" model.
- **Prisma** — type-safe DB layer, mature migrations, good DX.
- **shadcn/ui** — copy-into-repo primitives; we control them, no version lock-in.
- **Vanilla JS widget** — every storefront pays for widget bytes and execution time; React/framework overhead is unjustified for a script that paints star ratings.
- **Cloudinary signed direct upload** — body never proxies through our server; offloads bandwidth + transformation.
- **Upstash REST** — works in serverless cold-starts; no socket pool to manage.

## Alternatives Considered
- **Remix / SvelteKit** — viable, but team familiarity and ikas SDK examples target Next.js.
- **DynamoDB / Mongo** — relational shape (reviews per product, status workflow, indexing) fits Postgres better.
- **Custom widget framework (Preact, Lit)** — adds bytes for marginal DX. Vanilla JS is acceptable at current complexity.
- **No GraphQL Codegen** — would lose type-safety on ikas operations; high cost, low gain.
- **Webpack production builds** vs Turbopack — currently `--webpack` due to compatibility; revisit when Turbopack production ships stable.

## Consequences
- The widget bundle is checked into git (`public/widget.js`). Every change requires `pnpm build:widget` before commit.
- Migrations run on every deploy (`prisma migrate deploy`). Risky migrations need careful sequencing.
- Strong coupling to ikas: the `@ikas/admin-api-client` and AppBridge are not optional.
- `CLIENT_SECRET` does double duty (OAuth + JWT signing).
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
