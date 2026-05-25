---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - prompts
  - architecture
related:
  - "[[Index]]"
  - "[[System_Architecture]]"
---

# Architecture Review Prompt

> Use when asking the agent to review or design something with architectural impact.

## Body

Goal: <one sentence — what we're trying to do>
Constraints: <perf, deadline, ikas-platform, scope>

Before proposing:
1. Read `docs/wiki/Index.md` and the relevant `03_Architecture/*` page.
2. Scan `docs/wiki/04_Decisions/` — does an existing ADR cover this? If so, propose a new ADR that supersedes it; don't silently contradict.
3. Read `docs/wiki/01_Project/Open_Questions.md` — does this resolve any?
4. Identify dependencies on ikas (MCP introspection if you'll touch GraphQL ops).

Output:
- Plain-English plan with file paths and small code sketches.
- Affected files + risks (which existing files change, which new ones).
- ADR draft if the decision is non-trivial.
- Links from related wiki pages → new ADR.

If you propose changes to:
- Storefront widget (`src/widget/*`) — call out bundle-size impact.
- Public APIs (`/api/public/*`) — call out backwards-compatibility for cached `widget.js` on storefronts.
- DB schema — call out migration complexity, lock impact, rollback story.
- OAuth flow — call out re-install behavior, JWT/CLIENT_SECRET coupling.

## Obsidian Links
- [[System_Architecture]]
- [[Decision_Index]]
- [[Open_Questions]]
- [[Decision_Template]]
