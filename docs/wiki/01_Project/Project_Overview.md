---
type: status
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-28
last_verified: 2026-06-28
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
  - "workers/widget-delivery/src/index.ts"
---

# Project Overview

## Summary
Renuvex Product Reviews is a SaaS-style review and rating app for ikas e-commerce merchants. It provides a merchant admin panel for moderating reviews, a customizable storefront widget that collects and displays reviews on product pages, and listing-level rating badges. The repo started from `ikas-app-starter-template` and has been extended with a review domain on top of the OAuth + Prisma + GraphQL foundation.

## Product Goal
Compete with global review apps within the ikas ecosystem. See [[Competitor_Pricing_And_Plans]] for positioning.

## Who It's For
- ikas merchants who want product reviews on their storefront
- Merchants who care about Google rich-snippet star ratings (SEO/CTR uplift)
- Stores wanting moderation control (auto-approve thresholds, profanity filter, manual reply)

## Core Capabilities
- **Review collection** — public POST endpoint for storefront submissions, with profanity filter, IP rate-limit, AWS-backed image upload
- **Moderation** — admin dashboard lists/filters reviews; merchant can approve/reject/delete and reply
- **Storefront widget** — single bundled `widget.js` injected into all storefronts; renders product widgets, rating badges, listing badges
- **Widget customization** — per-merchant settings stored in `WidgetSettings`, schema-driven UI, real-time iframe preview
- **Auto-approval modes** — manual / 4plus / 5stars / all
- **Auto script injection** — on OAuth install, registers a `StorefrontJSScript` per storefront pointing to `/widget.js?publicApiKey=<merchantId>`

## Tech Stack (one-line)
Next.js 16 (16.2) App Router · React 19 · TypeScript · Prisma + Postgres (Supabase) · Tailwind v4 + shadcn/ui · iron-session + JWT · esbuild widget bundle · AWS S3/CloudFront review images · Mux video · Upstash Redis/QStash · Vercel (fra1 backend). Full detail in [[ADR_0001_Project_Stack]] and [[Dependency_Map]]. (Note: the public README and generated/local rule files such as `CLAUDE.md` may still say "Next.js 15"; `package.json` is authoritative.)

## Architecture in One Picture
- **Merchant** opens the app inside ikas Admin (iframe). AppBridge → JWT → calls `/api/admin/*`.
- **Storefront** loads `/widget.js?publicApiKey=<merchantId>` injected by ikas. The widget script/static assets can be served from `widget.renuvex.app`; public API calls still target the backend/API origin (`app.renuvex.app`) and remain CORS-open.
- **Preview** runs widget.js on `/preview` route in an iframe; admin posts settings via `postMessage`.
- **AWS S3/CloudFront** receives signed image uploads and serves public variants. **Upstash Redis** rate-limits public endpoints. **QStash** runs daily maintenance plus monthly orphan-image fallback cleanup through signed internal scheduler calls.

See [[System_Architecture]] for the diagram-level view.

## Boundaries (what this app is NOT)
- Not a full PIM. It does not own product data — fetched on-the-fly from ikas Admin GraphQL when needed.
- Not a marketing/email tool yet. No review-request emails, no post-purchase triggers (yet — see [[Roadmap]]).
- Not multi-store-per-merchant aware in a complex way: storeId == merchantId throughout.
- Not a fully localized product yet. The storefront widget is Turkish-first today; English/German support needs the planned i18n layer in [[Roadmap]] and [[Open_Questions]].

## Related Source Files
- [README.md](README.md) — public-facing project README
- [package.json](package.json) — scripts and dependencies
- [src/app/page.tsx](src/app/page.tsx) — entry that triggers auth flow
- [src/widget/index.js](src/widget/index.js) — widget entry point

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
