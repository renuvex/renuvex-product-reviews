---
type: status
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-10
tags:
  - features
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Roadmap]]"
---

# Feature Map

> Snapshot of features and where they live. Update whenever a feature is added, removed, or significantly refactored.

## Status legend
- ✅ shipped & working
- 🚧 partial / in progress
- ❓ scaffold or unverified — see [[Open_Questions]]
- 📅 planned — see [[Roadmap]]

## Authentication & Installation
| Feature | Status | Source |
|---|---|---|
| OAuth authorize redirect | ✅ | [src/app/api/oauth/authorize/ikas/route.ts](src/app/api/oauth/authorize/ikas/route.ts) |
| OAuth callback (HMAC sig validation, token exchange) | ✅ | [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts) |
| AppBridge token in iframe | ✅ | [src/app/hooks/use-base-home-page.ts](src/app/hooks/use-base-home-page.ts) |
| JWT-gated admin API | ✅ | [src/lib/auth-helpers.ts](src/lib/auth-helpers.ts) |
| Auto refresh of expired access tokens | ✅ | [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts) `onCheckToken` |
| Manual store-name entry fallback | ✅ | [src/app/authorize-store/page.tsx](src/app/authorize-store/page.tsx) |

## Review Lifecycle
| Feature | Status | Source |
|---|---|---|
| Public submit (POST) with validation | ✅ | [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts) |
| IP rate limit (3 / 10min) | ✅ | same file, Upstash Redis |
| Profanity filter (TR + EN) | ✅ | same file, `PROFANITY_LIST` constant |
| Auto-approve modes (`manual` / `4plus` / `5stars` / `all`) | ✅ | same file |
| Image upload (Cloudinary signed) | ✅ | [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts) |
| Author masking on public output | ✅ | `maskAuthor` in public reviews route |
| Public read with rating filter, photo filter, sort | ✅ | same file (GET) |
| Ratings-by-slug bulk endpoint (listing badges) | ✅ | [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts) |

## Admin / Moderation
| Feature | Status | Source |
|---|---|---|
| Reviews list / pagination / status filter | ✅ | [src/app/api/admin/reviews/route.ts](src/app/api/admin/reviews/route.ts) |
| Update status / merchant reply | ✅ | same file (PUT) |
| Delete review | ✅ | same file (DELETE) |
| Admin UI (table, dialog, tabs) | ✅ | [src/components/home-page/](src/components/home-page/) |
| Widget settings GET/PUT | ✅ | [src/app/api/admin/settings/route.ts](src/app/api/admin/settings/route.ts) |
| Inject scripts (re-inject button) | ✅ | [src/app/api/admin/inject-scripts/route.ts](src/app/api/admin/inject-scripts/route.ts) |
| Image cleanup cron | ✅ | [src/app/api/admin/cleanup-images/route.ts](src/app/api/admin/cleanup-images/route.ts), [vercel.json](vercel.json) |

## Storefront Widget
| Feature | Status | Source |
|---|---|---|
| Bundle build (esbuild, IIFE, minified) | ✅ | [scripts/build-widget.mjs](scripts/build-widget.mjs) |
| Widget bootstrap / mutation observer (SPA themes) | ✅ | [src/widget/index.js](src/widget/index.js), [observer.js](src/widget/observer.js) |
| Product review widget (form, list, summary) | ✅ | [src/widget/product-widget/](src/widget/product-widget/) |
| Review form modal (multi-step wizard) | ✅ | [src/widget/product-widget/review-form-modal/](src/widget/product-widget/review-form-modal/) |
| Review detail lightbox (photo modal) | ✅ with open audit risks | [src/widget/product-widget/review-modal.js](src/widget/product-widget/review-modal.js), [[Product_Review_Lightbox]], [[Bug_Review_Detail_Lightbox_Risks]] |
| Summary layouts (classic/compact/hero/minimal/split) | ✅ | [src/widget/summary-layouts/](src/widget/summary-layouts/) |
| Review layouts (card/gallery/list) | ✅ | [src/widget/review-layouts/](src/widget/review-layouts/) |
| Listing-page rating badges | ✅ | [src/widget/listing-badges/](src/widget/listing-badges/) |
| Theme variant build (`--theme=new-theme`) | 🚧 | [scripts/build-widget.mjs](scripts/build-widget.mjs); runtime selection unclear |
| Carousel widget | ❓ | id registered in `widgetDefs.ts`; verify implementation |
| Popup widget | ❓ | same |
| Q&A widget | ❓ | same |
| Settings live preview via postMessage | ✅ | [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts), [src/widget/index.js](src/widget/index.js) |

## SEO / Structured Data
| Feature | Status | Source |
|---|---|---|
| JSON-LD `aggregateRating` injection | 📅 | [[Structured_Data_And_Rich_Snippets]] |

## Notifications / Outreach
| Feature | Status | Source |
|---|---|---|
| Review-request email | 📅 | none yet |
| Merchant new-review notification email | 📅 | none yet |

## Imports / Exports
| Feature | Status | Source |
|---|---|---|
| CSV import | 📅 | none |
| CSV export | 📅 | none |

## Obsidian Links
- [[Current_Status]]
- [[Roadmap]]
- [[Storefront_Widget_Overview]]
- [[Product_Review_Lightbox]]
- [[API_Design]]
- [[Backend_API_Map]]

## Change Log
- 2026-05-10: Added review detail lightbox to the storefront widget feature inventory and linked its open audit risks. Related source: [src/widget/product-widget/review-modal.js](src/widget/product-widget/review-modal.js), related bug: [[Bug_Review_Detail_Lightbox_Risks]].
