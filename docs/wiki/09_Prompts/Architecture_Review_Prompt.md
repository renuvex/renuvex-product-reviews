---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - prompts
  - architecture
related:
  - "[[Index]]"
  - "[[System_Architecture]]"
source_files:
  - "AGENTS.md"
---

# Architecture Review Prompt

> Use when asking the agent to review or design something with architectural impact.

## Body

Goal: <one sentence — what we're trying to do>
Constraints: <perf, deadline, ikas-platform, scope>

Before proposing:
1. Read `AGENTS.md`, `Hot_Context`, and the relevant task route.
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
- DB schema — follow expand/contract safety and call out overlap, lock,
  backfill, and rollback behavior.
- OAuth flow — call out re-install behavior, JWT/CLIENT_SECRET coupling.

## Obsidian Links
- [[System_Architecture]]
- [[Decision_Index]]
- [[Open_Questions]]
- [[Decision_Template]]
