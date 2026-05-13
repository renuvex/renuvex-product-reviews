---
type: prompt
project: ikas-review-app
status: active
created: 2026-05-13
updated: 2026-05-13
last_verified: 2026-05-13
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

## Pruning Guidance

Suggest pruning when:

- `Hot_Context.md` exceeds 500 words
- a page mixes multiple unrelated topics
- a Change Log is longer than the useful current content
- the same decision appears in several pages
- active architecture/API/database/codebase pages are stale
- `09_Prompts` contains one-off task notes or project facts that belong elsewhere

Preserve ADRs, significant bug history, and problem-resolution notes. Ask before large cleanup.
