---
type: bug
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-12
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

### 2026-05-12
- Widget - Filter Menu Keyboard Accessibility - Review summary filter dropdown is now fully keyboard accessible: options are real buttons with menuitem semantics, the trigger exposes `aria-haspopup` / `aria-expanded`, focus moves into the menu on open and back to the trigger on close, and tabbing out auto-closes. [[Bug_Filter_Menu_Keyboard_Accessibility]]
- Widget - Review Wizard Focus Trap Accessibility - Multi-step review submission wizard now keeps keyboard focus inside the modal, focuses the active step, restores the opening focus on close, and shows visible focus outlines. [[Bug_Review_Wizard_Focus_Trap_Accessibility]]
- Widget - Lightbox Mobile Review Switch Scroll State - Review switches now reset every modal scroll layer after layout settles, and fixed-body locking is limited to iOS/WebKit instead of all touch/mobile browsers. [[Bug_Lightbox_Mobile_Review_Switch_Scroll_State]]
- Widget - Lightbox Mobile Pull To Refresh - Photo lightbox now locks root overscroll so long-comment scroll boundaries do not leak into browser pull-to-refresh. [[Bug_Lightbox_Mobile_Pull_To_Refresh]]

### 2026-05-11
- Widget - CSS Template Backtick Crash - Removed raw backticks from the storefront CSS template literal so deployed `widget.js` no longer crashes with `ReferenceError: modal is not defined` before render. [[Bug_Widget_CSS_Template_Backtick_Crash]]
- Widget - Product Widget Auto Mount - PDP review block now creates a fallback `#ikas-reviews-anchor` when the theme does not provide one, preventing the review area and product-title badge from disappearing together. [[Bug_Product_Widget_Missing_Auto_Mount]]
- Widget - Review Image Error Fallback - Broken review images no longer show browser broken-image icons; thumbnails hide failed images, the lightbox main image shows a neutral placeholder, and failures log via `console.warn`. [[Bug_Review_Image_Error_Fallback]]
- Architecture - Cloud Name Build-Time Only - Cloudinary cloud name is now a single build-time constant injected by the widget build script. Settings response `imagePolicy` field, widget runtime cache, setter, and warn helper removed (~90 lines). Structurally closes [[Bug_Cloud_Name_Silent_Image_Filter]]. [[ADR_0008_Cloud_Name_Build_Time_Only]]
- Widget - Review Image Policy Fallback - Trusted review image rendering now survives missing settings `imagePolicy.cloudName` via build-time public cloud fallback, last-valid widget cache, and explicit fail-closed logging. (Superseded same day by ADR_0008 — defensive runtime layers became redundant.) [[Bug_Cloud_Name_Silent_Image_Filter]]
- Widget - Lightbox Tablet Viewport And Scroll - Photo lightbox now uses a stacked 641-800 px tablet/landscape layout, mobile `vh` / `svh` / `dvh` fallbacks, and explicit scroll containment. [[Bug_Lightbox_Tablet_Viewport_And_Scroll]]
- Widget - Lightbox Focus Trap Accessibility - Photo lightbox now exposes dialog semantics, traps `Tab` focus inside the modal, and restores previous focus on close. [[Bug_Lightbox_Focus_Trap_Accessibility]]
- Widget - Review Fetch Error State - Review fetch failures now show a retryable error state instead of `Henüz yorum yok`; load-more failures keep a retry button. [[Bug_Review_Fetch_Error_Empty_State]]
- Widget - Lightbox Loaded Collection Navigation - Card/list/gallery modal navigation now walks one canonical loaded review collection for the active sort/filter state instead of caller page slices. [[Bug_Review_Detail_Lightbox_Risks]]
- Widget - Lightbox Body Scroll and History Close - Photo lightbox now restores previous inline body scroll styles and normal UI close no longer calls `history.go(-1)` into storefront history. [[Bug_Review_Detail_Lightbox_Risks]]
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
