---
type: bug
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-11
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
- 2026-05-11 - [[Bug_Review_Image_Error_Fallback]] - No `onerror` handler on any review image; Cloudinary 404 / asset rename produces broken-image icon for up to 7 days until the weekly cleanup cron runs. Silent failure (no telemetry). (K2)

## Recently fixed (verify periodically)
- 2026-05-11 - [[Bug_Cloud_Name_Silent_Image_Filter]] - Structurally closed by [[ADR_0008_Cloud_Name_Build_Time_Only]]: cloud name is now a single build-time constant. Runtime image-policy cache, setter, settings field, and warn helper removed.
- 2026-05-11 - [[Bug_Lightbox_Tablet_Viewport_And_Scroll]] - Photo lightbox now uses a stacked 641-800 px tablet/landscape shell, mobile `vh` / `svh` / `dvh` fallbacks, and explicit scroll containment.
- 2026-05-11 - [[Bug_Lightbox_Focus_Trap_Accessibility]] - Photo lightbox now exposes dialog semantics, traps keyboard focus inside the modal, and restores previous focus on close.
- 2026-05-11 - [[Bug_Review_Fetch_Error_Empty_State]] - Review fetch failures now render a retryable error state instead of the normal empty-review state; load-more failures keep a retry button.
- 2026-05-11 - [[Bug_Review_Detail_Lightbox_Risks]] - Card/list/gallery lightbox navigation now uses one canonical loaded review collection for the active sort/filter state instead of caller page slices.
- 2026-05-11 - [[Bug_Photo_Strip_Lazy_Loading_And_Srcset]] - Photo strip, card/list/gallery thumbnails, and lightbox mini thumbs now use lazy/eager policy, async decoding, responsive `srcset`, and explicit dimensions. Main lightbox image keeps eager loading with explicit dimensions.
- 2026-05-11 - [[Photo_Strip]] - Photo strip now uses dedicated `hasImages=true&limit=15` fetch independent of the main list. Load-more and sort/filter no longer leave the strip in a stale state; lightbox navigation walks the dedicated strip dataset. See [[ADR_0007_Photo_Strip_Cap_And_Rotation]].
- 2026-05-10 - [[Bug_Review_Detail_Lightbox_Risks]] - Photo-less gallery long-text read-more no longer opens the photo detail lightbox; it expands inline, and `openReviewModal` guards empty image sets.
- 2026-05-10 - [[Bug_Review_Detail_Lightbox_Risks]] - Public review image URLs are now restricted to trusted Cloudinary assets before storage or storefront render.

## Change Log
- 2026-05-11: Re-marked [[Bug_Cloud_Name_Silent_Image_Filter]] as structurally closed via [[ADR_0008_Cloud_Name_Build_Time_Only]] — runtime sources that could fail (`imagePolicy` settings field, localStorage policy cache, `setTrustedReviewImageCloudName` setter) all removed. Cloud name is now a single build-time constant.
- 2026-05-11: Marked [[Bug_Cloud_Name_Silent_Image_Filter]] fixed after adding a durable review image policy fallback/cache contract and public settings stale-if-error. (Superseded same day by structural closure above.)
- 2026-05-11: Added [[Bug_Lightbox_Tablet_Viewport_And_Scroll]] after fixing the 641-800 px cramped desktop modal range and mobile viewport-unit handling.
- 2026-05-11: Added [[Bug_Lightbox_Focus_Trap_Accessibility]] after fixing modal focus escaping to storefront controls.
- 2026-05-11: Added [[Bug_Review_Fetch_Error_Empty_State]] after fixing review fetch failures being rendered as empty review lists.
- 2026-05-11: Marked [[Bug_Review_Detail_Lightbox_Risks]] fixed after card/list/gallery lightbox navigation switched from caller page slices to one canonical loaded review collection.
- 2026-05-11: Updated [[Bug_Review_Detail_Lightbox_Risks]] after fixing body scroll restoration and removing unconditional `history.go(-1)` from normal modal close.
- 2026-05-11: Marked [[Bug_Photo_Strip_Lazy_Loading_And_Srcset]] fixed after adding responsive `srcset`, native lazy/eager loading, async decoding, and explicit dimensions to review thumbnail render paths.
- 2026-05-11: Filed three open photo-related defects discovered during the photo strip refactor analysis — [[Bug_Photo_Strip_Lazy_Loading_And_Srcset]] (P2), [[Bug_Review_Image_Error_Fallback]] (K2), [[Bug_Cloud_Name_Silent_Image_Filter]] (K3). Each entry includes scenario, root cause file:line evidence, and proposed fix direction.
- 2026-05-11: Closed the lightbox "paged navigation limited to caller review slices" risk via [[ADR_0007_Photo_Strip_Cap_And_Rotation]] — strip and lightbox now share a dedicated newest-first 15-review dataset.
- 2026-05-10: Marked review image URL allowlisting as fixed while keeping paged navigation and body/history lightbox risks open.
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
