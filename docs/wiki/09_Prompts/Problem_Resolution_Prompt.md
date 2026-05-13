---
type: prompt
project: ikas-review-app
status: active
created: 2026-05-13
updated: 2026-05-13
last_verified: 2026-05-13
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

Use project-relative source paths only. Do not put source paths inside Obsidian links.
