---
type: research
project: renuvex-product-reviews
status: archived
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-05-10
confidence: low
tags:
  - research
  - ux
related:
  - "[[Research_Index]]"
  - "[[Future_Feature_Ideas]]"
source_files: []
---

# E-commerce Review UX Patterns

## Summary

Archived May 2026 design notes. These observations are not a current competitor
audit or an accepted product contract. Verify current source and fresh primary
research before using them for a new design.

## Patterns
- **Star summary as headline**: Big star + average + count above the review list (we do this in `summary-layouts/hero` and `classic`).
- **Media gallery near the summary**: customer media opens into a detail
  lightbox. The current Renuvex contract is in [[Media_Gallery]] and
  [[Product_Review_Lightbox]]; the historical lightbox risks are fixed.
- **Filter chips**: rating quick-filters (5★, 4★, ...), photo-only filter. We support both.
- **Sort dropdown**: newest / highest / lowest / most-helpful. We have first three.
- **"Verified buyer" badge**: small icon next to author. We don't have this yet.
- **Aspect / size feedback** (Okendo): "Runs small / true / runs large" sliders aggregated. Differentiator for apparel.
- **Reply visibility**: merchant reply rendered inline under each review. We support this.
- **Submission flow**: compare multi-step, long-form, and inline flows using
  measured completion and media-attachment behavior rather than an assumed
  conversion claim.
- **Review requests**: post-purchase email can lead with rating and then request
  optional media/comment. The accepted Renuvex lifecycle is in
  [[ADR_0036_Review_Request_Email_Architecture]].

## Anti-patterns
- Modal that traps focus poorly
- Submission requires email AND captcha AND login (friction kills volume)
- Reviews lazy-loaded only on scroll (hurts SEO + analytics on review counts)

## Obsidian Links
- [[Product_Review_Widget]]
- [[Product_Review_Lightbox]]
- [[Widget_Customization]]
- [[Future_Feature_Ideas]]
