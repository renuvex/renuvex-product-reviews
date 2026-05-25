---
type: research
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-15
last_verified: 2026-05-15
confidence: high
tags:
  - competitor
  - research
related:
  - "[[Index]]"
  - "[[Competitor_Feature_Matrix]]"
  - "[[Yotpo_Protein_Ocean_Widget_Research]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
source_files: []
---

# Yotpo

## Summary
Enterprise-tier reviews + UGC + loyalty + SMS suite. Heavy integrations. Targets bigger merchants.

## Strengths to learn from
- Verified-buyer integration with order history
- Rich syndication (Google Shopping, Facebook, Instagram)
- AI moderation / sentiment summary

## Weaknesses / Gaps (for our market)
- Pricing/complexity overkill for SMB ikas merchants
- Setup overhead

## Notes for our app
- Target the SMB sweet spot: features that matter (rich snippets, photos, simple email) without enterprise overhead.
- Verified-buyer badge by cross-referencing ikas order history is a high-leverage feature.

## Live ikas Storefront Observation - 2026-05-15

See [[Yotpo_Protein_Ocean_Widget_Research]] for the full read-only inspection of Protein Ocean's ikas product page.

Key findings:

- Yotpo runs on ikas storefronts using script tags plus declarative `yotpo-widget-instance` placeholders.
- The observed product page loaded separate Yotpo modules for star ratings, main reviews, media gallery, Q&A, filters, CSS overrides, fonts, and analytics.
- The observed Yotpo runtime exposed `Yotpo`, `yotpo`, `yotpoSeoEl`, `yotpoWidgetsContainer`, and `webpackYotpoMainWidget`.
- The observed Yotpo review API returned `23735` reviews, `4.82608` average rating, star distribution, verified buyer flags, review media, and Q&A data.
- The architecture lesson is not to copy Yotpo's whole enterprise feature set. The useful pattern is a small loader, declarative widget instances, lazy modules, and separate dynamic APIs.

## Architecture Lesson

For this project, the Yotpo-style target is one ikas-injected loader script plus an internal widget registry:

- `rating-badge`
- `reviews-main`
- `listing-badge`
- `media-gallery`
- `questions-answers`
- `review-form`
- `schema`

Reference architecture: [[Yotpo_Style_Widget_Modular_Architecture]]

## Obsidian Links
- [[Competitor_Feature_Matrix]]
- [[Competitor_Insights]]
- [[Yotpo_Protein_Ocean_Widget_Research]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
