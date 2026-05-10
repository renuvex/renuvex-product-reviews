---
type: bug
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-10
tags:
  - bugs
related:
  - "[[Index]]"
  - "[[Solved_Issues]]"
  - "[[Recurring_Problems]]"
  - "[[Debugging_Notes]]"
---

# Bug Index

> Master list of tracked bugs. Add an entry when a real bug is found, with link to a per-bug note. Mark fixed bugs and link to the resolution.

## Open
- 2026-05-10 - [[Bug_Review_Detail_Lightbox_Risks]] - Remaining review detail lightbox risks: navigation is limited to caller review slices, image URL allowlisting is missing, and body/history handling can conflict with storefront state.

## Recently fixed (verify periodically)
- 2026-05-10 - [[Bug_Review_Detail_Lightbox_Risks]] - Photo-less gallery long-text read-more no longer opens the photo detail lightbox; it expands inline, and `openReviewModal` guards empty image sets.

## Change Log
- 2026-05-10: Marked the photo-less gallery read-more lightbox defect as fixed while keeping the remaining lightbox risks open.

## Recurring problems
See [[Recurring_Problems]] for patterns that come back across versions.

## How to file a bug
1. Copy [[Bug_Template]] → `05_Bugs_And_Fixes/Bug_<short-title>.md`
2. Fill: Date · Status · Area · Symptoms · Root Cause · Fix · Files Changed · Prevention
3. Add a row to this index
4. Cross-link from [[Solved_Issues]] when fixed

## Obsidian Links
- [[Solved_Issues]]
- [[Recurring_Problems]]
- [[Debugging_Notes]]
- [[Bug_Template]]
