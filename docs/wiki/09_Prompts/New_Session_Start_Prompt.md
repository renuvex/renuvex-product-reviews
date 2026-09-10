---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - new-session
  - project-memory
related:
  - "[[Agent_Rules]]"
  - "[[Hot_Context]]"
source_files:
  - "AGENTS.md"
---

# New Session Start Prompt

Before working on this project:

1. Read `AGENTS.md`.
2. Read `docs/wiki/Hot_Context.md`.
3. Read `docs/wiki/Index.md`.
4. Identify the task domain from the routing table.
5. Read only the relevant 2-5 wiki pages.
6. Inspect related source/config/test files.
7. Treat `source_files` as starting points and verify the relevant dependency
   path before changing behavior.
8. Update wiki only when durable project memory changed, using the ownership
   rules in [[Agent_Rules]].
9. If wiki conflicts with source code, trust source code and repair or flag the
   wiki. Never bump `last_verified` without an evidence check.
10. Put genuine unresolved decisions in [[Open_Questions]]; do not guess.
