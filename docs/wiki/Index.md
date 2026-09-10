---
type: context
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - index
  - ikas
  - reviews
related:
  - "[[Hot_Context]]"
  - "[[Project_Overview]]"
  - "[[Current_Status]]"
  - "[[Project_Index]]"
  - "[[Research_Index]]"
source_files: []
---

# Renuvex Product Reviews Wiki

Task router for the ikas merchant admin, storefront review runtime, Product ID
badges, media pipelines, and operational evidence. Source code is authoritative.

## Start Here
- [[Hot_Context]] - fast active context for new sessions
- [[Project_Overview]] - what the app is and who it's for
- [[Current_Status]] - current phase, working features, in-progress work
- [[Roadmap]] - planned features and rough sequence
- [[Open_Questions]] - uncertain areas that need a decision
- [[Glossary]] - domain vocabulary (ikas-specific and project-specific)
- [[Feature_Map]] - feature inventory with implementation status
- [[Project_Index]] - quick links to source code entry points

## Task Routing

| Task Type | Read First | Then Read | Then Inspect |
|---|---|---|---|
| New session / unclear task | [[Hot_Context]], [[Current_Status]] | [[Project_Overview]], [[Open_Questions]] | Focused `source_files` |
| Admin UI / widget editor task | [[Frontend_Map]], [[Widget_Customization]] | [[Feature_Map]], relevant widget pages | `src/features/admin-shell/*`, `src/features/review-moderation/*`, `src/features/widget-management/*` |
| Storefront widget task | [[Widget_Architecture]], [[Storefront_Widget_Overview]] | Relevant `08_Widgets` pages and ADRs | `src/widget/*`, `public/widget.js` |
| Badge placement / identity | [[Listing_Rating_Widget]], [[Product_Rating_Badge]] | [[ADR_0038_Runtime_Attested_Storefront_Placement]], [[ADR_0015_Canonical_Product_Identity]] | Placement, lifecycle, and focused browser tests |
| API task | [[Backend_API_Map]], [[API_Design]] | [[Ikas_API_Notes]], [[Security_And_Rate_Limits]] | `src/app/api/*`, `src/lib/*` |
| Database task | [[Database_Map]], [[Database_Schema]] | [[Decision_Index]] | `prisma/schema.prisma`, `prisma/models/*`, `prisma/migrations/*` |
| Auth / ikas install task | [[Auth_And_Installation_Flow]], [[Ikas_OAuth_Installation_Notes]] | [[Security_And_Rate_Limits]], [[ADR_0004_Ikas_Integration_Strategy]] | OAuth/API helper files |
| Deployment / observability task | [[Deployment_Notes]], [[Sentry_Operations]] | [[Config_And_Env_Map]], [[Caching_And_Performance]] | `next.config.js`, `vercel.json`, Sentry config files |
| Media / review email task | [[ADR_0034_AWS_Review_Image_Migration]], [[ADR_0032_Review_Video_On_Mux]] | [[ADR_0036_Review_Request_Email_Architecture]], [[Maintenance_Runbook]] | Media/email source and integration tests |
| Automated test / CI task | [[Test_Strategy]], [[Widget_Architecture]] | [[Backend_API_Map]], [[Widget_Performance]] | `tests/*`, `.github/workflows/*`, `package.json` |
| Recurring bug | [[Bug_Index]], [[Recurring_Problems]] | Relevant bug note, [[Problem_Resolution_Prompt]] | Related source files in the bug note |
| Architecture change | [[System_Architecture]], [[Decision_Index]] | Relevant ADRs | Affected modules and config |
| Research or historical evidence | [[Research_Index]] | Linked dated record | Its cited source or official primary source |
| Wiki maintenance | [[Agent_Rules]], [[Wiki_Maintenance_Prompt]] | [[New_Session_Start_Prompt]] | `docs/wiki/**`, `scripts/wiki-*` |

## Registries

- [[Project_Index]]: source entry points.
- [[Feature_Map]]: implemented and planned capabilities.
- [[Decision_Index]]: accepted, draft, and superseded ADRs.
- [[Bug_Index]]: open and fixed reusable failures.
- [[Research_Index]]: dated research, audits, and acceptance evidence.

Templates are under `11_Templates`; reusable agent procedures are under
`09_Prompts`. Do not add raw notes or chronology to the hot path.
