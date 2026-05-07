---
type: status
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - overview
  - product
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Roadmap]]"
  - "[[System_Architecture]]"
---

# Project Overview

## Summary
Yorum Paneli is a SaaS-style review and rating app for ikas e-commerce merchants. It provides a merchant admin panel for moderating reviews, a customizable storefront widget that collects and displays reviews on product pages, and listing-level rating badges. The repo started from `ikas-app-starter-template` and has been extended with a review domain on top of the OAuth + Prisma + GraphQL foundation.

## Product Goal
Compete with global review apps within the ikas ecosystem. See [[Competitor_Feature_Matrix]] and [[Competitor_Insights]] for positioning.

## Who It's For
- ikas merchants who want product reviews on their storefront
- Merchants who care about Google rich-snippet star ratings (SEO/CTR uplift)
- Stores wanting moderation control (auto-approve thresholds, profanity filter, manual reply)

## Core Capabilities
- **Review collection** — public POST endpoint for storefront submissions, with profanity filter, IP rate-limit, image upload via Cloudinary
- **Moderation** — admin dashboard lists/filters reviews; merchant can approve/reject/delete and reply
- **Storefront widget** — single bundled `widget.js` injected into all storefronts; renders product widgets, rating badges, listing badges
- **Widget customization** — per-merchant settings stored in `WidgetSettings`, schema-driven UI, real-time iframe preview
- **Auto-approval modes** — manual / 4plus / 5stars / all
- **Auto script injection** — on OAuth install, registers a `StorefrontJSScript` per storefront pointing to `/widget.js?publicApiKey=<merchantId>`

## Tech Stack (one-line)
Next.js 16 (16.2) App Router · React 19 · TypeScript · Prisma + Postgres (Supabase) · Tailwind v4 + shadcn/ui · iron-session + JWT · esbuild widget bundle · Cloudinary · Upstash Redis · Vercel (fra1, weekly cron). Full detail in [[ADR_0001_Project_Stack]] and [[Dependency_Map]]. (Note: the public README and the Ruler-generated CLAUDE.md/AGENTS.md still say "Next.js 15" — those docs lag the actual `package.json` version.)

## Architecture in One Picture
- **Merchant** opens the app inside ikas Admin (iframe). AppBridge → JWT → calls `/api/admin/*`.
- **Storefront** loads `/widget.js?publicApiKey=<merchantId>` injected by ikas. Widget calls `/api/public/*` (CORS-open).
- **Preview** runs widget.js on `/preview` route in an iframe; admin posts settings via `postMessage`.
- **Cloudinary** receives signed image uploads. **Upstash Redis** rate-limits public endpoints. **Cron** cleans up orphan images weekly.

See [[System_Architecture]] for the diagram-level view.

## Boundaries (what this app is NOT)
- Not a full PIM. It does not own product data — fetched on-the-fly from ikas Admin GraphQL when needed.
- Not a marketing/email tool yet. No review-request emails, no post-purchase triggers (yet — see [[Roadmap]]).
- Not multi-store-per-merchant aware in a complex way: storeId == merchantId throughout.

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

## Notes
- The project name in package.json is still `ikas-app-starter-template` — historical artifact, not a product name. Display name is "yorum-paneli" / "Yorum Paneli".
- Comments and UI copy are mostly Turkish; code identifiers and this wiki are English. Keep that pattern.
- All state is keyed on `merchantId` (used as `storeId` everywhere). There is no separate "store" abstraction yet.
