---
type: prompt
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - prompts
  - documentation
  - lint
related:
  - "[[Index]]"
---

# Documentation Update Prompt (Lint / Health Check)

> Use periodically to keep the wiki accurate. This is also the **lint workflow** referenced from CLAUDE.md.

## Body

Run a documentation health check across `docs/wiki/`. Report findings; fix the easy ones inline; flag the rest.

## Checks

### Per-file checks
For every `.md` under `docs/wiki/` (except `Index.md`, which has a different shape, and the root `Raw_Notes.md`):
- [ ] Has YAML frontmatter with at least: `type`, `project`, `status`, `created`, `updated`, `tags`, `related`.
- [ ] `updated` field is reasonably current (>30 days old → flag for review).
- [ ] Has a `# Title` H1.
- [ ] Has a `## Summary` section.
- [ ] Has a `## Obsidian Links` (or `## Related Notes`) section with at least one link.

### Cross-file checks
- [ ] Every `[[Page]]` link in the wiki resolves to an existing file.
- [ ] Every page has at least one inbound link from another page (no orphans, except templates/index).
- [ ] Every important page is reachable from `[[Index]]`.

### Type-specific checks
- ADRs in `04_Decisions/`:
  - [ ] Have `## Status` (Accepted / Proposed / Superseded / Deprecated)
  - [ ] Have `## Date`
  - [ ] Have `## Context`, `## Decision`, `## Reasoning`, `## Alternatives`, `## Consequences`
  - [ ] Listed in `Decision_Index.md`
- Bug notes in `05_Bugs_And_Fixes/`:
  - [ ] Have `## Status` (Open / Fixed / Monitoring)
  - [ ] Have `## Symptoms`, `## Root Cause`, `## Fix` (when status is Fixed)
  - [ ] Listed in `Bug_Index.md`
- Architecture pages have `## Related Source Files` pointing to real paths.

### Currency checks
- [ ] `01_Project/Current_Status.md` — does the "In Progress" section still match HEAD? Cross-check recent commits.
- [ ] `02_Codebase_Map/Folder_Structure.md` — does the tree match the real `src/` layout?
- [ ] `02_Codebase_Map/Important_Files.md` — are listed files still present?
- [ ] `04_Decisions/*.md` — any decisions that the code now contradicts? Should they be marked superseded with a new ADR?

### Wiki update logging discipline
- [ ] Pages that have been substantively edited since the last lint pass should have their frontmatter `updated: YYYY-MM-DD` reflect that.
- [ ] Pages with major behavior / architecture / feature changes since their last `## Change Log` entry should have a new entry capturing what changed.
- [ ] Conversely: no `## Change Log` entries that look fabricated, padded with trivia, or duplicated. Each entry should have date + short summary + (optional) related source files / ADR / bug / feature.
- [ ] No `## Change Log` entries from copy / formatting / visual-only tweaks.
- [ ] Pages that ship without a `## Change Log` are fine — only require one once a meaningful update happens.

### Source-file references
- [ ] Architecture and codebase-map pages cite real source files (paths exist).
- [ ] Migration filenames cited in pages still exist in `prisma/migrations/`.

## Output format
Report grouped as:
- **Auto-fixed** (frontmatter normalization, broken-link fixes for renames, etc.)
- **Manual review** (potential staleness, missing context, conflicting claims)
- **New questions for [[Open_Questions]]** (genuine uncertainty surfaced by the audit)

## Cadence suggestion
- After every chunk of feature work
- Monthly health-pass even when no features shipped
- Before major roadmap reviews

## Obsidian Links
- [[Index]]
- [[Open_Questions]]
- [[Decision_Index]]
- [[Bug_Index]]
- [[Existing_AI_Rules_And_Ikas_CLI_Instructions]]
- [[Claude_Code_Rules]]

## Change Log
- **2026-05-05** — Added "Wiki update logging discipline" check-list mirroring the new canonical rule in `/AGENTS.md`. The lint workflow now verifies `updated:` frontmatter freshness and the presence/absence of `## Change Log` entries proportional to actual changes. Related: [[Claude_Code_Rules]], [[Existing_AI_Rules_And_Ikas_CLI_Instructions]].
