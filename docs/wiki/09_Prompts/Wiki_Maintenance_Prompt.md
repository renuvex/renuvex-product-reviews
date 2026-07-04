---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-07-04
last_verified: 2026-07-04
confidence: high
tags:
  - wiki-maintenance
  - audit
related:
  - "[[Agent_Rules]]"
  - "[[Documentation_Update_Prompt]]"
source_files:
  - "scripts/wiki-audit.mjs"
  - "scripts/wiki-secret-scan.py"
  - "scripts/wiki-prune-report.py"
---

# Wiki Maintenance Prompt

The wiki should stay accurate, concise, and high-signal. Source code is the source of truth; the wiki is memory and routing.

## Wiki Health Commands

Run after important wiki updates, major project changes, release preparation, or when wiki drift is likely:

```bash
node scripts/wiki-audit.mjs
python scripts/wiki-secret-scan.py
python scripts/wiki-prune-report.py
```

After meaningful source changes, run this only when durable memory may be stale:

```bash
node scripts/wiki-audit.mjs --changed-source-check
```

These checks are advisory health tools. They are not mandatory pre-commit or pre-push gates unless the maintainer explicitly asks.

## Low-Token Memory Policy

- Keep `Hot_Context.md`, `Index.md`, and `AGENTS.md` short because every new
  agent session reads them first.
- Do not prune critical ADRs, runbooks, architecture pages, or benchmark notes
  just to satisfy a global word count. Add or maintain `## Agent Brief` instead.
- A good `Agent Brief` is 150-250 words and tells agents when to use the page,
  what the current truth is, which source files to verify first, and what not to
  assume.
- Move long historical rollout details to archive/history pages only with
  maintainer approval.

## Pruning Guidance

Suggest pruning when:

- `Hot_Context.md` exceeds 500 words
- `Hot_Context.md` carries detailed source routing that belongs in focused pages
- a long active page has no `## Agent Brief`
- a page mixes multiple unrelated topics
- a Change Log is longer than the useful current content
- the same decision appears in several pages
- active architecture/API/database/codebase pages are stale
- `09_Prompts` contains one-off task notes or project facts that belong elsewhere

Preserve ADRs, significant bug history, and problem-resolution notes. Ask before large cleanup.
