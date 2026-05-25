---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - prompts
  - codex
related:
  - "[[Index]]"
  - "[[Master_Project_Prompt]]"
---

# Codex Rules

> Notes for OpenAI Codex / similar agents. The same rules as [[Claude_Code_Rules]] apply.

## AGENTS.md
If you use Codex, generate an `AGENTS.md` mirroring the project root `CLAUDE.md`. Both files should reference the wiki the same way. Keep them in sync via the same edits.

## Differences vs Claude Code (if any)
- Codex has its own MCP / tool model — adapt the "Tools" section accordingly.
- The repo includes `pnpm apply:ai-rules` which uses `@intellectronica/ruler` to apply agent configs (see [package.json](package.json)). Investigate if you wire up multi-agent rules.

## Obsidian Links
- [[Claude_Code_Rules]]
- [[Master_Project_Prompt]]
