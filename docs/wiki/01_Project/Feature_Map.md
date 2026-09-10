---
type: status
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - features
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Roadmap]]"
  - "[[Open_Questions]]"
  - "[[Storefront_Widget_Overview]]"
source_files:
  - "src/lib/widgets/catalog.ts"
  - "src/widget/surfaces/index.js"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/lib/product-lifecycle.ts"
  - "src/lib/review-email/config.ts"
  - "src/lib/scheduled-jobs.ts"
---

# Feature Map

## Agent Brief

Use this page as a compact product inventory. Follow [[Current_Status]] for
release gates, [[Roadmap]] for ordering, and focused pages for evidence. Core
reviews are live on the production test store. Product ID badge placement is
deployed and passed Canary 1, but final closeout is open. Ozy is the only
verified automatic placement adapter. Review-request email is deployed but
disabled. Carousel, popup, and Q&A are planned catalog entries only.

## Status Legend

- **Live**: implemented and active on the production test store.
- **Partial**: has a stated coverage or acceptance boundary.
- **Disabled**: implementation exists, but customer behavior is off.
- **Planned**: product or runtime implementation is incomplete.

## Authentication And Installation

| Capability | Status | Boundary |
|---|---|---|
| Ikas OAuth install | Live | Browser-bound state, optional supplied-signature validation, token exchange, and active installation persistence. |
| Embedded admin authentication | Live | AppBridge JWT and shared installation/token verification protect admin routes. |
| Storefront script lifecycle | Live | Non-destructive create/update, stored script identity, token refresh, and scheduled reconciliation. |

## Reviews And Media

| Capability | Status | Boundary |
|---|---|---|
| Public submit and read | Live | Validation, filters, sorting, pagination, author masking, profanity checks, and IP rate limiting. |
| Moderation | Live | Admin filters, approve/reject/delete, merchant replies, and private-media preview. |
| Rating summaries | Live | Product ID is the canonical lookup identity. |
| ID-less listing discovery | Live | `ratings-by-slug` resolves slug once to Product ID, fails closed, and returns `no-store`; slug is not review or cache identity. |
| Review images | Live | Private AWS intake, validated variants, signed moderation preview, and trusted CloudFront delivery. |
| Review video | Live | Mux upload, readiness, moderation, preview/playback, reconciliation, quota, and cleanup paths. |
| Form wizard and lightbox | Live | Responsive dialogs, focus handling, media fallbacks, and live setting updates; known lightbox audit risks are fixed. |
| Review-request email | Disabled | Backend/schema exist behind `REVIEW_EMAIL_ENABLED`; sender, merchant UI, and live delivery acceptance remain gated. |

## Admin And Storefront

| Capability | Status | Boundary |
|---|---|---|
| Admin dashboard and settings | Live | Review moderation, per-widget settings, script recovery, and authenticated APIs. |
| Widget preview | Live | Canonical route is `/preview/<widgetId>/<scene>`; bare `/preview` is a compatibility redirect. |
| Stable loader/runtime | Live | `public/widget.js` loads the manifest-selected ESM runtime; retained hashes protect cached loaders. |
| PDP review section | Live | Opt-in mount renders summary, filters, layouts, form, reviews, media, and load-more. |
| PDP rating badge | Live | Strict proof requires exact Product ID equality on slot and visible badge. |
| Listing/home/search/slider/quick-view badges | Partial | Strict Product ID-backed Ozy placement passed Canary 1; lifecycle continuity, Canary 2, and Sentry alert delivery remain. |
| SPA and recycled-card safety | Live | Event generations, proof revalidation, mutation observation, lazy hydration, dedupe, and self-heal retire stale identity. |
| Structured Product rating data | Partial | Eligible surfaces emit `aggregateRating` JSON-LD; public SEO acceptance remains open. |
| Non-Ozy automatic placement | Partial | Unknown or ambiguous themes fail closed; each new adapter needs explicit acceptance. |
| Storefront localization | Partial | Merchant labels exist, but general copy and accessible names remain Turkish-first. |
| Carousel, popup, and Q&A | Planned | Catalog-only, non-configurable scaffolds; define behavior in [[Open_Questions]] first. |

## Platform And Product Gaps

| Capability | Status | Boundary |
|---|---|---|
| Cloudflare widget delivery | Live | Static assets and eligible read caching only; writes/media/lifecycle stay on the application origin. |
| Public API caching | Live | Route-specific; settings, ratings, and eligible review reads may cache, while identity discovery uses `no-store`. |
| QStash maintenance | Live | Signed daily/monthly jobs; `vercel.json` is not the scheduler. |
| Sentry monitoring | Live | Next.js SDK plus bounded widget reports without a storefront SDK. |
| Badge health alerts | Partial | Events exist; external rules and delivery test need fresh owner approval. |
| Product Lifecycle Release A | Live | Evidence, tombstones, reconciliation, retention, fencing, and fail-closed resolution support badge identity. |
| Product Lifecycle Release B | Planned | Consumer-wide enforcement, managed-scale evidence, and conflict operations require a separate release. |
| Widget quality gates | Live | Build/drift, budget, unit/runtime, placement, and critical browser checks are established. |
| CSV import/export | Planned | See [[Roadmap]]. |
| Review analytics | Planned | See [[Roadmap]]. |
| Complete locale system | Planned | See [[Roadmap]] and [[Open_Questions]]. |
| Additional theme adapters | Planned | See [[Theme_Adapter_Playbook]]. |
| Review-request email activation | Disabled | Separate gated rollout, unrelated to badge closeout or Release A. |

## Canonical Links

- Current production truth: [[Current_Status]]
- Work ordering: [[Roadmap]]
- Unresolved decisions: [[Open_Questions]]
- Storefront architecture: [[Storefront_Widget_Overview]]
- Badge acceptance: [[Badge_Product_ID_Closeout_Acceptance_2026-09-09]]
