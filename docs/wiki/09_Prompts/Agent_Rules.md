---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - agent-rules
  - project-memory
related:
  - "[[Index]]"
  - "[[New_Session_Start_Prompt]]"
  - "[[Wiki_Maintenance_Prompt]]"
  - "[[Problem_Resolution_Prompt]]"
  - "[[Architecture_Review_Prompt]]"
  - "[[Database_Review_Prompt]]"
  - "[[Widget_Development_Prompt]]"
source_files:
  - "AGENTS.md"
---

# Agent Rules

## Summary

This page is the project-memory procedure for coding agents. `AGENTS.md` is the
canonical operational contract and takes precedence if this page drifts.

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

If evidence is weak, add a focused item to [[Open_Questions]] instead of
guessing. Do not turn a transient command result, deployment identifier, or
one-off visual tweak into project memory.

## Canonical Ownership

| Information | Canonical owner |
|---|---|
| Current production and release state | [[Current_Status]] |
| Planned work | [[Roadmap]] |
| Unresolved decisions | [[Open_Questions]] |
| Accepted architecture and trade-offs | ADR plus [[Decision_Index]] |
| Reusable failure, cause, fix, regression | Bug note plus [[Bug_Index]] |
| Repeatable operation | Focused runbook |
| Deploy, canary, benchmark, or research proof | Dated evidence record |
| Edit and commit chronology | Git history |

Link to the owner instead of copying its detailed text. Current-state maps may
summarize a contract, but must not maintain a second rollout history.

Long critical pages are allowed when they preserve decisions, runbooks,
evidence, or incident history. An active long page starts with a concise
`## Agent Brief`: when to read it, current truth, source anchors, and assumptions
to avoid. Keep `Hot_Context.md` and `Index.md` short; move detailed routing to
focused pages.

## Source Dependency Verification

`source_files` are verification starting points, not complete dependency graphs. Start with the listed files, then follow relevant imports, exports, schemas, config, middleware, hooks, tests, and adjacent modules only when the task requires source-level verification.

Do not scan the entire codebase unless the migration or task genuinely requires it.

## Wiki Drift Check

After meaningful source changes, check whether a related wiki page exists. Update wiki only if durable memory changed. Use this advisory command when source/wiki drift review is useful:

```bash
node scripts/wiki-audit.mjs --changed-source-check
```

Use Git for chronology. Do not add a general project-log entry or a routine
page-level `Change Log`. When an edit changes durable behavior, update the
current body and its canonical ADR, bug, runbook, or acceptance record.

## Prompt Folder Rule

This repo already uses `docs/wiki/09_Prompts` for reusable agent procedures and `docs/wiki/08_Widgets` for widget domain memory. Keep procedures in `09_Prompts` unless the maintainer approves a folder renumbering migration.

Use [[New_Session_Start_Prompt]] for session routing,
[[Wiki_Maintenance_Prompt]] for documentation cleanup,
[[Problem_Resolution_Prompt]] for verified fixes, and the focused
[[Architecture_Review_Prompt]], [[Database_Review_Prompt]], or
[[Widget_Development_Prompt]] when that domain is the task.

## Historical Safety

Do not silently rewrite an accepted decision or erase a significant failure.
Use explicit status, supersession links, amendment sections, or dated evidence.
Before deleting or merging a page, verify backlinks and move every unique
durable fact to its canonical owner. Git history is recovery evidence, not a
substitute for operational facts that current agents still need.
