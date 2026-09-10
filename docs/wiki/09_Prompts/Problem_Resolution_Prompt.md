---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - problem-resolution
  - debugging
related:
  - "[[Agent_Rules]]"
  - "[[Bug_Index]]"
source_files: []
---

# Problem Resolution Prompt

Document a solved problem only if it creates reusable debugging memory.

## When To Add A Bug Note

Create or update bug/problem memory for significant, recurring, hard-to-debug, production-impacting, integration, database, auth, deployment, security, performance, accessibility, or architecture-related issues.

Small visual bugs, copy-only fixes, formatting issues, and one-off bugs with no future debugging value should not be documented.

## Investigation Loop

1. Read [[Recurring_Problems]], [[Debugging_Notes]], and the relevant source.
2. State the smallest evidence-backed hypothesis.
3. Run the narrowest check that can prove or reject it.
4. Trace the full behavioral path when a boundary is involved; do not report a
   local or server-only result as end-to-end success.
5. Fix the proven cause, add regression coverage proportional to risk, and run
   the real acceptance path.
6. Record only the reusable lesson. Keep raw command output and transient
   debugging chronology out of the wiki.

## Bug Note Shape

Use a focused page and link it from [[Bug_Index]] when the issue is important enough to keep:

- Severity
- Affected area
- Symptoms
- Root cause
- Fix
- Verification
- Regression test status
- Verification command or manual check
- Prevention or future note
- Related source files
- Related wiki pages

Update [[Bug_Index]] directly. Do not maintain a second chronological solved
issues list or add a page-level `Change Log`.

Use project-relative source paths only. Do not put source paths inside Obsidian links.
