---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-05-13
last_verified: 2026-05-13
confidence: high
tags:
  - ide-agent
  - project-memory
related:
  - "[[Agent_Rules]]"
  - "[[New_Session_Start_Prompt]]"
source_files:
  - "AGENTS.md"
---

# IDE Agent Usage

These rules apply to AI coding agents and LLM IDEs with file access.

Default workflow:

1. Read `AGENTS.md`.
2. Read `docs/wiki/Hot_Context.md`.
3. Read `docs/wiki/Index.md`.
4. Pick the relevant task route.
5. Read only relevant wiki pages.
6. Inspect related source files.
7. Make changes only in the allowed scope for the task.
8. Update wiki only if durable memory changed.
9. Run wiki audit commands when useful.

Do not create IDE-specific rule files, Git hooks, package scripts, or GitHub Actions unless the maintainer explicitly asks.
