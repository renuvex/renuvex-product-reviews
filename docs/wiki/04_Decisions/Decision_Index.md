---
type: decision
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-16
tags:
  - adr
  - decisions
related:
  - "[[Index]]"
---

# Decision Index

> Architectural Decision Records (ADRs). When a decision changes, **create a new ADR** that supersedes the old one — never silently rewrite history.

## Active

| ID | Title | Status |
|---|---|---|
| [[ADR_0001_Project_Stack]] | Next.js 16 + Prisma + Postgres + Tailwind + shadcn | Accepted |
| [[ADR_0002_Widget_Injection_Strategy]] | Single bundled `widget.js` injected via ikas StorefrontJSScript | Accepted |
| [[ADR_0003_Review_Data_Model]] | Single denormalized `Review` table; `storeId === merchantId`; status as string literals | Accepted |
| [[ADR_0004_Ikas_Integration_Strategy]] | OAuth via `@ikas/admin-api-client` + GraphQL Codegen for typed operations | Accepted |
| [[ADR_0006_Trusted_Review_Image_URL_Policy]] | Review images must be app-owned Cloudinary URLs before storage or storefront render | Accepted |
| [[ADR_0007_Photo_Strip_Cap_And_Rotation]] | Photo strip fixed cap 15, newest-first rotation, dedicated fetch independent of main list | Accepted |
| [[ADR_0008_Cloud_Name_Build_Time_Only]] | Cloudinary cloud name is a build-time constant; removed from settings response and widget runtime cache | Accepted |
| [[ADR_0009_Sentry_Observability_Strategy]] | `@sentry/nextjs` on the panel with env-based DSN, `sendDefaultPii: false`, prod `tracesSampleRate: 0.1`, masked Replay; widget bundle stays out | Accepted |
| [[ADR_0010_Widget_Error_Forwarding]] | Widget-side `error`/`unhandledrejection` listener POSTs to `/api/public/widget-error`; server forwards to Sentry tagged `source: widget`. +637 bytes gzip; no SDK in widget. | Accepted |
| [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]] | Widget-scoped tap-highlight reset + controlled `:active` feedback + `:focus-visible` only + global input-modality tracker driving `restoreFocus`. New `src/widget/shared/` directory. | Accepted |
| [[ADR_0012_Pending_Upload_Registry]] | DB-tracked `PendingReviewImage` registry replaces Cloudinary scan-and-diff. Atomic submit transaction + daily cleanup + monthly fallback. No more 500-asset cap, no in-flight race. | Accepted |
| [[ADR_0013_Modular_Widget_Loader_Architecture]] | Internal loader + surface registry + single Storefront Events context module. Bundle stays one IIFE — no ESM/splitting/lazy-load in Phase 1. Extends ADR_0002. | Accepted |

## Superseded / Deprecated
*(none yet)*

## How to add an ADR
1. Copy [[Decision_Template]] → `04_Decisions/ADR_XXXX_short_title.md`
2. Increment number (latest in this index + 1)
3. Fill all sections: Context · Decision · Reasoning · Alternatives · Consequences · Related Source Files
4. Add a row to the Active table above
5. Link from related architecture pages so the ADR is discoverable

## Obsidian Links
- [[Decision_Template]]
- [[System_Architecture]]
- [[Open_Questions]]

## Change Log
- 2026-05-16: Added [[ADR_0013_Modular_Widget_Loader_Architecture]] — Phase 1 internal refactor of the storefront widget: a single Storefront Events context module, an in-bundle surface registry (`reviews-main` + `listing-badge`), and a thin loader. Bundle stays one IIFE; no ESM migration, code-splitting, or behavior change. Extends [[ADR_0002_Widget_Injection_Strategy]] (does not supersede it). `rating-badge` deferred to Phase 2.
- 2026-05-12: Added [[ADR_0012_Pending_Upload_Registry]] — DB-tracked `PendingReviewImage` registry replaces the Cloudinary scan-and-diff cleanup pattern. New `/api/public/upload/register` endpoint, atomic transaction in submit, daily cleanup cron, monthly fallback scan with cursor pagination + 30-day age filter. Eliminates the 500-asset cap and the in-flight race that the old design carried.
- 2026-05-12: Added [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]] — widget-scope tap-highlight reset + controlled `:active` feedback + `:focus-visible` only + global last-input-modality tracker driving `restoreFocus` for popovers/modals. New `src/widget/shared/` directory; filter dropdown and review submission wizard refactored to use the tracker.
- 2026-05-11: Added [[ADR_0010_Widget_Error_Forwarding]] — fills the visibility gap left by [[ADR_0009_Sentry_Observability_Strategy]]. Tiny widget-side reporter (1.6 KB raw / 637 bytes gzipped) forwards uncaught errors filtered to `widget.js` only, throttled per session, rate-limited per IP. Server records via the existing panel Sentry SDK with `source: widget` tag.
- 2026-05-11: Added [[ADR_0009_Sentry_Observability_Strategy]] — `@sentry/nextjs` wired into the panel with env-based DSN, `sendDefaultPii: false` (ikas OAuth header leak prevention), prod-only `tracesSampleRate: 0.1`, masked Session Replay, Vercel-Sentry integration for source map upload. Widget bundle intentionally excluded.
- 2026-05-11: Added [[ADR_0008_Cloud_Name_Build_Time_Only]] — cloud name moved to a single build-time source; removes `imagePolicy` from settings response and ~90 lines of widget runtime image-policy machinery. Structurally closes [[Bug_Cloud_Name_Silent_Image_Filter]].
- 2026-05-11: Added [[ADR_0007_Photo_Strip_Cap_And_Rotation]] — photo strip dataset decoupled from main list, fixed cap 15, newest-first rotation.
- 2026-05-10: Added [[ADR_0006_Trusted_Review_Image_URL_Policy]] for review image URL trust boundaries.
