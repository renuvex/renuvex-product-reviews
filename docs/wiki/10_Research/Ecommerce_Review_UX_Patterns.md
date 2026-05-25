---
type: research
project: renuvex-product-reviews
status: draft
created: 2026-05-05
updated: 2026-05-10
tags:
  - research
  - ux
related:
  - "[[Index]]"
---

# E-commerce Review UX Patterns

## Summary
Catalog of UX patterns observed in best-in-class review widgets. Reference when designing layouts or new flows.

## Patterns
- **Star summary as headline**: Big star + average + count above the review list (we do this in `summary-layouts/hero` and `classic`).
- **Photo strip at top** (Loox/Okendo): collected images shown horizontally, click to lightbox. We have a photo gallery and a detail lightbox; current audit risks are tracked in [[Bug_Review_Detail_Lightbox_Risks]].
- **Filter chips**: rating quick-filters (5★, 4★, ...), photo-only filter. We support both.
- **Sort dropdown**: newest / highest / lowest / most-helpful. We have first three.
- **"Verified buyer" badge**: small icon next to author. We don't have this yet.
- **Aspect / size feedback** (Okendo): "Runs small / true / runs large" sliders aggregated. Differentiator for apparel.
- **Reply visibility**: merchant reply rendered inline under each review. We support this.
- **Submission flow**: multi-step modal (we have this) > single long form > inline edit. Multi-step gets higher photo-attach rates.
- **Review request UX**: post-purchase email with one-click rating link → optional photo step → optional comment. Industry-standard.

## Anti-patterns
- Modal that traps focus poorly
- Submission requires email AND captcha AND login (friction kills volume)
- Reviews lazy-loaded only on scroll (hurts SEO + analytics on review counts)

## TODO
- Document our current submission flow with screenshots when stable
- Review accessibility (keyboard nav, screen reader labels) for the modal

## Obsidian Links
- [[Product_Review_Widget]]
- [[Product_Review_Lightbox]]
- [[Widget_Customization]]
- [[Future_Feature_Ideas]]

## Change Log
- 2026-05-10: Replaced the "verify lightbox status" research note with the current documented lightbox status and linked open risks. Related note: [[Product_Review_Lightbox]].
