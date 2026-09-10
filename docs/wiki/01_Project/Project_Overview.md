---
type: status
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - overview
  - product
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Roadmap]]"
  - "[[System_Architecture]]"
  - "[[Competitor_Pricing_And_Plans]]"
  - "[[Open_Questions]]"
  - "[[Storefront_Widget_Overview]]"
source_files:
  - "package.json"
  - "README.md"
  - "AGENTS.md"
  - "src/app/page.tsx"
  - "src/widget/index.js"
  - "src/widget/core/origins.js"
  - "src/widget/structured-data/index.js"
  - "src/lib/product-lifecycle.ts"
  - "src/lib/review-email/config.ts"
  - "workers/widget-delivery/src/index.ts"
---

# Project Overview

## Summary
Renuvex Product Reviews is a review and rating app for ikas merchants. It
provides review collection and moderation, customizable storefront review
surfaces, Product ID-backed rating badges, review media, and Product
`aggregateRating` structured data. The repository extends the ikas OAuth,
Prisma, and typed GraphQL starter foundation with a production-oriented review
domain.

## Product Goal
Compete with global review apps within the ikas ecosystem. See [[Competitor_Pricing_And_Plans]] for positioning.

## Who It's For
- ikas merchants who want product reviews on their storefront
- Merchants who care about Google rich-snippet star ratings (SEO/CTR uplift)
- Stores wanting moderation control (auto-approve thresholds, profanity filter, manual reply)

## Core Capabilities
- **Review collection** - public submission with validation, profanity checks,
  rate limits, AWS images, and optional Mux video.
- **Moderation** - merchant review listing, approve/reject/delete, replies, and
  private media preview.
- **Storefront runtime** - opt-in product review section plus independent PDP,
  listing, search, slider, and quick-view rating badges.
- **Product identity** - `(storeId, productId)` ownership, lifecycle evidence,
  reconciliation, and fail-closed slug-to-ID discovery.
- **Customization** - per-merchant `WidgetSettings`, schema-driven editor, and
  real-time iframe preview.
- **SEO** - client-side Product `aggregateRating` JSON-LD tied to an eligible
  visible review/rating surface.
- **Installation** - OAuth registration and non-destructive
  `StorefrontJSScript` lifecycle per storefront.

## Tech Stack (one-line)
Next.js 16.2.1 App Router · React 19 · TypeScript · Prisma + Postgres (Supabase) · Tailwind v4 + shadcn/ui · iron-session + JWT · esbuild widget bundle · AWS S3/CloudFront review images · Mux video · Upstash Redis/QStash · Vercel (fra1 backend). Full detail lives in [[ADR_0001_Project_Stack]] and [[Dependency_Map]]; `package.json` is authoritative for versions.

## Architecture in One Picture
- **Merchant** opens the app inside ikas Admin (iframe). AppBridge → JWT → calls `/api/admin/*`.
- **Storefront** loads `/widget.js?publicApiKey=<merchantId>` injected by ikas.
  The widget script/static assets can be served from `widget.renuvex.app`;
  anonymous API calls target `app.renuvex.app` with wildcard CORS and no
  credentials. Review-center/session APIs remain isolated to the review host
  and do not expose CORS.
- **Preview** uses prerendered `/preview/<widgetId>/<scene>` iframe routes; the
  admin sends settings through the versioned `postMessage` protocol. The bare
  `/preview` route is a compatibility redirect.
- **AWS S3/CloudFront** receives signed image uploads and serves public variants. **Upstash Redis** rate-limits public endpoints. **QStash** runs daily maintenance plus monthly orphan-image fallback cleanup through signed internal scheduler calls.

See [[System_Architecture]] for the diagram-level view.

## Boundaries (what this app is NOT)
- Not a full PIM. Ikas remains the product authority; Renuvex stores bounded
  product identity snapshots and lifecycle evidence, not a merchant catalog.
- Not an active marketing/email product. The review-request backend and schema
  are deployed but disabled; no outbound sender or live shopper email flow is
  accepted. See [[ADR_0036_Review_Request_Email_Architecture]] and [[Roadmap]].
- Not multi-store-per-merchant aware in a complex way: storeId == merchantId throughout.
- Not a fully localized product yet. The storefront widget is Turkish-first today; English/German support needs the planned i18n layer in [[Roadmap]] and [[Open_Questions]].

## Obsidian Links
- [[Current_Status]]
- [[Roadmap]]
- [[Feature_Map]]
- [[System_Architecture]]
- [[Auth_And_Installation_Flow]]
- [[Storefront_Widget_Overview]]
- [[Open_Questions]]

## Notes
- The package name is `renuvex-product-reviews`. Public technical identity is app-specific: `product-reviews`, `renuvex-pr`, and `renuvex-product-reviews-widget`.
- The hard namespace contract is now Renuvex-only in source and active generated widget assets. Historical notes may still mention `ikr` / `yorum-paneli`, but current code should use `renuvex-pr`, `renuvex_pr`, `product-reviews`, and `renuvex-product-reviews-widget`.
- Code identifiers and project memory should be English/global. Turkish remains acceptable only for merchant-facing copy where the ikas marketplace/admin experience requires it.
- All state is keyed on `merchantId` (used as `storeId` everywhere). There is no separate "store" abstraction yet.
