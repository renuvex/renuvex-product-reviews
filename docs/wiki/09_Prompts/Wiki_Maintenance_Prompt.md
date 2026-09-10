---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - wiki-maintenance
  - audit
related:
  - "[[Agent_Rules]]"
  - "[[Index]]"
  - "[[Open_Questions]]"
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

For a scoped documentation edit these checks are advisory. For a dedicated wiki
maintenance pass they are acceptance gates.

## Low-Token Memory Policy

- Keep `Hot_Context.md`, `Index.md`, and `AGENTS.md` short because every new
  agent session reads them first.
- Do not prune critical ADRs, runbooks, architecture pages, or benchmark notes
  just to satisfy a global word count. Add or maintain `## Agent Brief` instead.
- A good `Agent Brief` is normally 80-180 words and tells agents when to use the page,
  what the current truth is, which source files to verify first, and what not to
  assume.
- Keep exact deployment identifiers, runtime hashes, measurements, and provider
  observations in dated evidence records, not hot-path pages.

## Maintenance Workflow

1. Verify a clean current `origin/main` baseline and inventory all worktrees so
   uncommitted user material is not overwritten.
2. Build a disposition list with backlinks, current owner, source evidence, and
   one of `keep`, `revise`, `migrate`, `archive`, `supersede`, or `delete`.
3. Migrate unique durable facts before removing duplicate text or files.
4. Reverify implementation claims from focused source/config/test files. Do not
   infer production state from repository shape alone.
5. Update links and status metadata, then run all health commands.
6. Review the final diff for unintended formatting, line-ending, or unrelated
   changes before commit.

## Status And Metadata

- `active`: current operational or implementation guidance.
- `draft`: unresolved proposal or research backlog; never an accepted contract.
- `archived`: dated evidence retained for history, not current truth.
- `superseded`: stable compatibility target that names its replacement.
- `outdated`: known incorrect and awaiting repair; do not leave this state after
  a maintenance pass when correction or archival is possible.
- `updated` records an actual page edit. `last_verified` records an evidence
  check and must not be mass-bumped. `confidence` reflects evidence quality.
- `source_files` contains a small set of real project-relative verification
  anchors. Use `[]` only when a page genuinely has no source owner.

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

Do not preserve duplication merely by moving it to an archive folder. Git owns
edit chronology; ADRs, bug notes, runbooks, and dated records own durable
history. Preserve stable supersession pointers when old links may still matter.

## Required Review

- Every Obsidian link resolves and every active page is reachable from a task
  route or domain registry without making `Index.md` a directory dump.
- ADRs appear in `Decision_Index`; bug notes appear in `Bug_Index`.
- Active implementation pages have honest verification metadata and existing
  `source_files`.
- External prices, limits, product capabilities, and official-platform claims
  are rechecked from primary sources or clearly labeled as dated snapshots.
- No secret, token, private credential, personal workstation path, or maintainer
  identity is added.
- No general `Change Log` or duplicate solved-issue ledger remains.
