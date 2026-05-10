---
type: bug
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-11
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

### 2026-05-11
- Performance — Cloudinary Transformation Widths — `optimizeImageUrl(url, width)` is now parametric; strip/card/list thumbnails request 300 px, gallery tile 600 px, lightbox mini 200 px, lightbox main keeps the 1200 px default. Strip thumbnail transfer reduced ~%85; lightbox quality unchanged. Named constants (`PHOTO_STRIP_THUMB_WIDTH`, `GALLERY_TILE_WIDTH`, `LIGHTBOX_MINI_THUMB_WIDTH`, `LIGHTBOX_MAIN_WIDTH`) exported from [helpers.js](src/widget/core/helpers.js). [[Photo_Strip]]
- Performance — Photo Thumbnail Lazy Loading and srcset — Review photo thumbnails now use responsive `srcset`, async decoding, native lazy/eager loading, and explicit dimensions; first 3 strip thumbnails stay eager and the lightbox main image keeps eager loading with dimensions. [[Bug_Photo_Strip_Lazy_Loading_And_Srcset]]
- Widget — Photo Strip Stale State — Photo strip now uses dedicated `hasImages=true&limit=15&orderBy=newest` fetch; cap 15, newest-first rotation, independent of sort/filter/load-more. Lightbox navigates the dedicated dataset, closing the paged-slice navigation risk. [[Photo_Strip]] [[ADR_0007_Photo_Strip_Cap_And_Rotation]]

### 2026-05-10
- Security - Review Image URL Allowlist - Public review submissions now reject third-party/data image URLs and widget/admin/public read paths only expose trusted Cloudinary review images. [[Bug_Review_Detail_Lightbox_Risks]]
- Bug — Photo-less Gallery Lightbox — Gallery long-text reviews without valid images now expand inline instead of opening the photo detail lightbox; `openReviewModal` also returns early for empty image sets. [[Bug_Review_Detail_Lightbox_Risks]]

### 2026-05-07
- UI/UX — Button Height Sync — Implemented `align-items: stretch` in `classic` and `split` layouts to ensure "Write Review" and "Filter" buttons always match in height.
- Layout — Standardized Spacing — Increased vertical gap between summary blocks to 20px (ferahlık) for premium aesthetic.
- Bug — Split Layout Shift — Fixed bar chart jumping when recommendation percentage was hidden by using a placeholder element.
- Bug — Split Mobile Gap — Fixed massive blank gap in split mobile view caused by hidden recommendation placeholders.
- Responsive — Split Tablet Breakpoint — Changed split layout breakpoint to 768px to ensure tablets use the optimized mobile view.
- Layout — Compact Spacing Leak — Fixed 20px gap leak in compact mobile layout and synchronized its internal dropdown panel to 20px.

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
