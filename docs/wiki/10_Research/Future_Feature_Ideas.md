---
type: research
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - research
  - ideas
related:
  - "[[Index]]"
  - "[[Roadmap]]"
---

# Future Feature Ideas

> Speculative ideas. Move to [[Roadmap]] when committed; delete or archive when rejected.

## Ideas

### Verified buyer badge
Cross-reference submission email against ikas order history. Display a "Verified buyer" badge next to qualifying reviews. Trust uplift is significant. We have ikas API access for order data.

### Coupon-on-review
After approved review, generate an ikas discount code; email customer. Use the bonus to drive review volume. Requires ikas discount API integration.

### AI moderation summary
On-demand LLM summary of a product's reviews, surfaced in admin (and maybe storefront — "AI summary of 200 reviews"). Cost: per-merchant token usage. Worth piloting.

### Per-storefront settings
Settings keyed by `(storeId, storefrontId, widgetId)` for merchants with locale variants. Today we're merchant-global. ikas already supports multi-storefront.

### Aspect / size feedback (Okendo-style)
Per-product configurable axes: "Size: runs small / true / runs large". Aggregate sliders. Differentiator for apparel.

### Review request via SMS
Twilio / similar. Higher engagement than email in some markets. Comply with TR opt-in regulations.

### CSV import from Judge.me / Loox
Acquisition tool — ease migration. Map their export columns into our `Review` schema.

### Theme app extension (if/when ikas exposes one)
Native theme widget instead of injected `<script>`. Better caching, theme-controlled placement. Investigate ikas docs.

### Native app store billing
If ikas supports app billing API, integrate to take payment via the platform.

### Per-merchant moderation rules
Custom profanity blocklist, auto-reject keywords, allowlist for trusted reviewers (by email).

### Rich review filters
"Show only reviews with photos AND 5 stars from verified buyers" — combine current filters with new ones.

### Sentiment chart
Aggregate sentiment trend over time per product (LLM or simple keyword).

## Obsidian Links
- [[Roadmap]]
- [[Competitor_Feature_Matrix]]
- [[Competitor_Insights]]
