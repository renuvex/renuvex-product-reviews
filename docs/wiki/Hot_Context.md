---
type: context
project: ikas-review-app
status: active
created: 2026-05-13
updated: 2026-05-13
last_verified: 2026-05-13
confidence: medium
tags:
  - hot-context
  - project-memory
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Project_Overview]]"
source_files:
  - "package.json"
  - "prisma/schema.prisma"
  - "src/widget/index.js"
  - "src/app/api/public/reviews/route.ts"
  - "src/components/home-page/widgets/widgetDefs.ts"
---

# Hot Context

## Current Focus
- Active development on an ikas review/rating app with merchant admin, storefront widget, review submission, image upload, moderation, and settings preview flows.
- The wiki is already a Full-style project memory vault with ADRs, bug notes, ikas notes, widget notes, research, and prompt/rule pages.
- This migration adds the missing second-brain routing files and advisory audit scripts without changing application source code.

## Must Know
- Source code, config, migrations, tests, and runtime behavior are the source of truth; wiki pages are routing and memory.
- Existing prompt procedures live in `09_Prompts`, while `08_Widgets` is a domain folder. Do not create a duplicate `08_Prompts` folder without a folder migration plan.
- Important wiki pages should use focused `source_files` as verification starting points, not exhaustive dependency graphs.
- Do not document secrets or real env values. Env names and purposes are acceptable.

## Recent Important Changes
- Recent documented work includes pending upload registry cleanup, widget touch-feedback/focus modality, Sentry observability, and widget error forwarding.
- `package.json` pins Next.js `16.2.1`; older generated rule files or README text that says Next.js 15 is stale unless verified and updated.
- `scripts/wiki-audit.mjs`, `scripts/wiki-secret-scan.py`, and `scripts/wiki-prune-report.py` are advisory health checks.

## Current Risks / Open Questions
- Structured data injection, review-request emails, CSV import/export, analytics, localization, and test coverage remain documented gaps.
- The prompt folder numbering mismatch is preserved as-is for now: canonical procedures stay under `09_Prompts`.

## Read Next
- [[Current_Status]]
- [[Project_Overview]]
- [[Open_Questions]]
- [[Agent_Rules]]
- [[Wiki_Maintenance_Prompt]]
