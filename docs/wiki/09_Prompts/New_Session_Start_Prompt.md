---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-05-13
last_verified: 2026-05-13
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
7. Summarize the task understanding before editing when the task is non-trivial.
8. Update wiki only when durable project memory changed.
9. If wiki conflicts with source code, trust source code and update or flag the wiki.
10. If uncertain, ask the maintainer or add an item to [[Open_Questions]].
