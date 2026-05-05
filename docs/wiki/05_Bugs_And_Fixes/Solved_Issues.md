---
type: bug
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - bugs
  - solved
related:
  - "[[Index]]"
  - "[[Bug_Index]]"
---

# Solved Issues

> Chronological log of solved issues. Entry per fix: short title + date + 1-line summary + link to detail (if a per-bug note exists). Useful for: "didn't we hit this before?"

## How to add an entry
- One-liner format: `- YYYY-MM-DD — short title — 1-line summary [[Bug_Detail_If_Any]]`
- Move long context into a dedicated `Bug_<title>.md` file under this folder.

## Log

### 2026-05-05
- Wiki seeded — no fixes recorded yet.

### Past (reconstructed from git history; verify before relying on)

> These entries are inferred from migration filenames and commit messages, not from a real bug log. Treat as tentative.

- 2026-04 — index churn — added redundant indexes on `Review`, then cleaned up. See migration `20260404170403_cleanup_redundant_indexes`. Lesson: profile queries before adding indexes.
- 2026-04 — `helpful` feature reverted — added `add_helpful_feature` then removed (`remove_review_helpful_table`, `remove_helpful_feature`). Approach didn't pan out; if revisited, plan a separate `ReviewVote` table.
- 2026-05 — color settings reshuffle — multiple add/remove migrations for color settings (basic vs advanced tier split). Lesson: settings churn benefits from soft removal (sanitize at read) rather than DB migrations.

## Obsidian Links
- [[Bug_Index]]
- [[Recurring_Problems]]
