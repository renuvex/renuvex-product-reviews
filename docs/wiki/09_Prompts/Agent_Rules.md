---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-07-04
last_verified: 2026-07-04
confidence: high
tags:
  - agent-rules
  - project-memory
related:
  - "[[Index]]"
  - "[[Documentation_Update_Prompt]]"
source_files:
  - "AGENTS.md"
---

# Agent Rules

## Summary

This page is the detailed project-memory procedure for AI coding agents. `AGENTS.md` remains the short operational entry point, with the ikas/Ruler rules taking precedence when they conflict with wiki-memory guidance.

## Memory Hierarchy

1. `AGENTS.md`
2. `docs/wiki/Hot_Context.md`
3. `docs/wiki/Index.md`
4. `## Agent Brief` sections in the 2-5 relevant wiki pages
5. related source/config/test files

## Strict Rules

- Stay inside the project root.
- Do not modify application source code during wiki maintenance tasks.
- Treat source code, config, migrations, tests, and runtime behavior as the source of truth.
- Use the wiki as memory and routing, not proof.
- Never document secrets, API keys, tokens, private credentials, or real env values.
- Preserve ADRs, important bug history, and problem-resolution notes.
- Do not delete, archive, rename, or move large wiki sections without maintainer confirmation.
- Do not commit, merge, push, install hooks, add package scripts, or create GitHub Actions unless explicitly asked.

## Memory Quality Gate

Add or update wiki content only when it creates durable project memory: architecture, decisions, integrations, recurring bugs, project status, meaningful feature behavior, or source-routing that future agents will need.

Do not update wiki for minor visual-only, copy-only, formatting-only, or low-impact changes.

If evidence is weak, add a focused item to [[Open_Questions]] instead of guessing.

Long critical pages are allowed when they preserve decisions, runbooks, evidence,
or incident history. To keep agent token cost low, any active long page should
start with `## Agent Brief`: when to read it, current truth, source files to
verify first, and assumptions to avoid. Keep `Hot_Context.md` and `Index.md`
short; move detailed source routing to focused pages.

## Source Dependency Verification

`source_files` are verification starting points, not complete dependency graphs. Start with the listed files, then follow relevant imports, exports, schemas, config, middleware, hooks, tests, and adjacent modules only when the task requires source-level verification.

Do not scan the entire codebase unless the migration or task genuinely requires it.

## Wiki Drift Check

After meaningful source changes, check whether a related wiki page exists. Update wiki only if durable memory changed. Use this advisory command when source/wiki drift review is useful:

```bash
node scripts/wiki-audit.mjs --changed-source-check
```

## Prompt Folder Rule

This repo already uses `docs/wiki/09_Prompts` for reusable agent procedures and `docs/wiki/08_Widgets` for widget domain memory. Keep procedures in `09_Prompts` unless the maintainer approves a folder renumbering migration.

## Append-Only Safety

For ADRs, significant bug notes, and problem-resolution memory, prefer appending updates or marking pages as outdated, superseded, or archived. Preserve the original lesson unless the maintainer approves a larger cleanup.
