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
- 2026-05-11 - [[Bug_Cloud_Name_Silent_Image_Filter]] - When `/api/public/settings` returns 404/5xx with no stale cache, widget filters out **all** trusted review images (strip + card/list/gallery), not just the strip. Silent outage, no log, no alarm. (K3)
- 2026-05-10 - [[Bug_Review_Detail_Lightbox_Risks]] - Remaining body/history handling lightbox risks can still conflict with storefront state. (Paged-navigation slice limitation closed 2026-05-11 by [[ADR_0007_Photo_Strip_Cap_And_Rotation]].)

## Recently fixed (verify periodically)
- 2026-05-11 - [[Bug_Photo_Strip_Lazy_Loading_And_Srcset]] - Photo strip, card/list/gallery thumbnails, and lightbox mini thumbs now use lazy/eager policy, async decoding, responsive `srcset`, and explicit dimensions. Main lightbox image keeps eager loading with explicit dimensions.
- 2026-05-11 - [[Photo_Strip]] - Photo strip now uses dedicated `hasImages=true&limit=15` fetch independent of the main list. Load-more and sort/filter no longer leave the strip in a stale state; lightbox navigation walks the dedicated strip dataset. See [[ADR_0007_Photo_Strip_Cap_And_Rotation]].
- 2026-05-10 - [[Bug_Review_Detail_Lightbox_Risks]] - Photo-less gallery long-text read-more no longer opens the photo detail lightbox; it expands inline, and `openReviewModal` guards empty image sets.
- 2026-05-10 - [[Bug_Review_Detail_Lightbox_Risks]] - Public review image URLs are now restricted to trusted Cloudinary assets before storage or storefront render.

## Change Log
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
