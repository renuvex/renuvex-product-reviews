---
type: prompt
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - prompts
  - debugging
related:
  - "[[Index]]"
  - "[[Debugging_Notes]]"
---

# Debug Prompt

> Use when asking the agent to debug an issue. Keeps the diagnostic loop tight.

## Body

Symptom: <one sentence — what does the user see / what's broken>
Context: <which page / which merchant / when started / what changed recently>

Before proposing fixes:
1. Read `docs/wiki/05_Bugs_And_Fixes/Recurring_Problems.md` — is this a known pattern?
2. Read `docs/wiki/05_Bugs_And_Fixes/Debugging_Notes.md` — is there a known recipe?
3. Identify the smallest hypothesis that explains the symptom. State it.
4. Propose **one** verification step (a log to add, a query to run, a file to read).
5. Wait for results.

Once root cause is identified:
- File a `Bug_<title>.md` under `docs/wiki/05_Bugs_And_Fixes/` using `Bug_Template.md`.
- Update `Bug_Index.md`.
- If fix changes architecture → new ADR.
- Update `Recurring_Problems.md` if it's a class of bug we've seen before.

## Notes
- Don't propose multiple speculative fixes at once. The wiki is a knowledge base; we want **one** documented root cause per bug.
- Add a `Prevention` line in the bug note — what would have caught this earlier?

## Obsidian Links
- [[Debugging_Notes]]
- [[Bug_Index]]
- [[Recurring_Problems]]
- [[Bug_Template]]
