---
type: log
project: ikas-review-app
status: active
created: 2026-05-13
updated: 2026-05-16
last_verified: 2026-05-16
confidence: high
tags:
  - log
  - project-memory
related:
  - "[[Index]]"
  - "[[Hot_Context]]"
source_files:
  - "AGENTS.md"
  - "docs/wiki/Index.md"
  - "scripts/wiki-audit.mjs"
---

# Project Log

## 2026-05-16 - research | ikas developer feedback on storefront script integration
- Summary: Recorded a direct ikas developer answer about single-loader architecture, theme selectors, and script ordering.
- Key takeaways: single loader + multiple modules is an accepted ikas pattern; no official stable ids / `data-*` attributes for page areas today; Storefront Events is the supported page/product context mechanism; standard `data-*` attributes are planned (ikas Studio) but not yet broadly available; `isHighPriority` + `order` control load order relative to Facebook/Google scripts.
- Updated wiki pages: [[Ikas_Storefront_Script_Capabilities]] (new "ikas Developer Feedback — 2026-05-16" section), [[Yotpo_Style_Widget_Modular_Architecture]] (Open Questions)
- Decision direction: use Storefront Events for context; treat theme-class selectors as a temporary fallback only, not the architecture; plan migration to ikas `data-*` attributes when broadly available.
- No application source code changed.

## 2026-05-15 - research | Yotpo-style widget architecture on ikas
- Summary: Added read-only research and architecture notes from Protein Ocean's Yotpo installation on an ikas storefront, plus ikas StorefrontJSScript capability notes.
- Updated wiki pages: [[Index]], [[Hot_Context]], [[Yotpo]], [[Ikas_Widget_Injection_Notes]], [[Widget_Architecture]], [[Storefront_Widget_Overview]], [[Widget_Performance]]
- New wiki pages: [[Yotpo_Protein_Ocean_Widget_Research]], [[Ikas_Storefront_Script_Capabilities]], [[Yotpo_Style_Widget_Modular_Architecture]]
- Key takeaway: ikas can support a Yotpo-like model, but this project should use one ikas-injected loader per storefront and lazy-load widget modules from its own runtime.
- Related files: `src/widget/*`, `scripts/build-widget.mjs`, `src/lib/ikas-client/graphql-requests.ts`, `src/app/api/admin/inject-scripts/route.ts`, `src/app/api/oauth/callback/ikas/route.ts`

## 2026-05-13 - maintenance | Second-brain setup migration
- Summary: Migrated the existing wiki memory system to the second-brain setup without moving or deleting existing docs.
- Updated wiki pages: [[Hot_Context]], [[Index]], [[Open_Questions]], [[Agent_Rules]], [[Documentation_Update_Prompt]], [[Wiki_Maintenance_Prompt]]
- Related files: `AGENTS.md`, `scripts/wiki-audit.mjs`, `scripts/wiki-secret-scan.py`, `scripts/wiki-prune-report.py`
- Related decision/bug/feature/problem: none
