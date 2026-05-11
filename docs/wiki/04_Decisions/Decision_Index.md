---
type: decision
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-11
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
- 2026-05-11: Added [[ADR_0008_Cloud_Name_Build_Time_Only]] — cloud name moved to a single build-time source; removes `imagePolicy` from settings response and ~90 lines of widget runtime image-policy machinery. Structurally closes [[Bug_Cloud_Name_Silent_Image_Filter]].
- 2026-05-11: Added [[ADR_0007_Photo_Strip_Cap_And_Rotation]] — photo strip dataset decoupled from main list, fixed cap 15, newest-first rotation.
- 2026-05-10: Added [[ADR_0006_Trusted_Review_Image_URL_Policy]] for review image URL trust boundaries.
