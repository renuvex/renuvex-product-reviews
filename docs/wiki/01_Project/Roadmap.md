---
type: roadmap
project: renuvex-product-reviews
status: draft
created: 2026-05-05
updated: 2026-06-21
last_verified: 2026-06-21
confidence: medium
tags:
  - roadmap
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Future_Feature_Ideas]]"
  - "[[Competitor_Pricing_And_Plans]]"
source_files:
  - "docs/wiki/10_Research/Competitor_Pricing_And_Plans.md"
---

# Roadmap

## Summary
Living roadmap. Order is rough priority, not committed dates. Tweak as decisions are made and file them as ADRs when they shape architecture.

## Near Term (next iterations)
- **Structured data / Rich snippets** — JSON-LD with `aggregateRating` injected on product pages so Google can show stars in SERPs. See [[Structured_Data_And_Rich_Snippets]]. Decide whether widget.js writes the JSON-LD client-side or whether a server route serves it for ikas theme include.
- **Q&A widget** — clarify scope; data model (separate `Question` table?), public submission endpoint, admin tab.
- **Review-request emails** — post-purchase trigger (likely via ikas webhook or polling), template, signed token URL for one-click rating.
- **CSV import/export** — admin endpoint for bulk import (migrating from another platform) and export.
- **Analytics tab** — review volume per week, average rating trend, response rate, conversion uplift (long-term — needs storefront analytics integration).

## Mid Term
- **Multi-language widget UI** — storefront copy currently Turkish-only; storefront-aware locale (ikas storefront locale → widget i18n key). No i18n layer exists yet: ALL strings are hardcoded TR including ~25 `aria-label`s, and browser auto-translate skips `aria-label` — so accessibility text needs an explicit i18n migration (sr-only text + `aria-labelledby` where it must survive translation). Scope detail: [[Open_Questions]].
- **Photo gallery improvements** — lightbox, lazy loading review thumbnails on listing pages.
- **Email notifications to merchant** on new pending review.
- **Webhook-based product rename sync** — currently `productName` is captured at submit time; product renames don't propagate.
- **Per-storefront widget settings** — currently settings are per-merchant; ikas merchants can have multiple storefronts (locale, currency variants).

## Longer Term / Speculative
- **Verified-buyer badge** (cross-check submission email against ikas order history)
- **Q&A → review request flow** (smart sequencing)
- **Loyalty/coupon-on-review** integration with ikas discount codes
- **AI moderation summary** (LLM auto-generates merchant-facing summaries; flags suspicious reviews)
- **Async media pipeline (image moderation + video foundation)** — queue + background workers to process uploaded media off the upload hot path (authoritative metadata, **image** moderation before public display, variant generation, future video). Distinct from the review-**text** "AI moderation summary" above. Deferred; trigger = image-moderation/video parity or upload volume outgrowing the daily cron. Analysis + cost/competitor evidence: [[Async_Media_Pipeline]].
- **Theme storefront blocks / sections** — instead of injected JS, register native ikas theme widgets (research [[Ikas_Theme_Limitations]]).

## Tech Debt / Quality
- Add tests for `/api/public/reviews` (POST validation matrix), widget settings sanitize/validate
- Replace `JSON.stringify(images)` text column with a relational `ReviewImage` table once we add lightbox/CDN-resize features
- Move profanity list to a config file (and consider Postgres ILIKE-based filter for scale)
- Review CORS policy — currently `Access-Control-Allow-Origin: *`; OK for read endpoints, consider tightening POST endpoints
- Revisit OAuth scope (`read_orders,write_orders,read_products,read_inventories,write_inventories`) — does the app actually need write_orders/write_inventories?
- **Authoritative review-media metadata at scale** — client upload-response dimensions are forgeable (cosmetic/self-inflicted, not a security issue); at thousands of stores / 1M+ images add a Cloudinary upload **webhook** (signed, server-to-server) as the authoritative source, with the daily-maintenance cron pull demoted to safety-net. Detail: [[ADR_0029_Review_Media_Metadata]] (Scale Evolution).

## Obsidian Links
- [[Current_Status]]
- [[Open_Questions]]
- [[Future_Feature_Ideas]]
- [[Competitor_Pricing_And_Plans]]
