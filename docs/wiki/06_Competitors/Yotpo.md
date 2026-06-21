---
type: research
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-21
last_verified: 2026-06-21
confidence: medium
tags:
  - competitor
  - research
  - pricing
related:
  - "[[Index]]"
  - "[[Competitor_Pricing_And_Plans]]"
  - "[[Yotpo_Protein_Ocean_Widget_Research]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
source_files:
  - "docs/wiki/10_Research/Competitor_Pricing_And_Plans.md"
  - "docs/wiki/10_Research/Yotpo_Protein_Ocean_Widget_Research.md"
---

# Yotpo

## Verification Snapshot
- Checked on 2026-06-21 through Yotpo's generic pricing page and the browser-visible Reviews plan page.
- The generic pricing page is demo-oriented and does not expose a detailed reviews matrix in the browser output.
- The accessible Reviews plan page uses Free, Growth, and Prime, plus order-tiered pricing. This supersedes the older local `FREE/STARTER/PRO/PREMIUM` snapshot for review-app packaging.

## Current Reviews Plans

| Plan | Verified price signal | Verified usage signal | Verified notable features |
| --- | --- | --- | --- |
| Free | $0/month | Up to 50 monthly orders | Review request emails, on-site widgets, moderation, social push, SEO page, SMS review requests |
| Growth | Starts at $15/month; FAQ shows Growth order-tier prices from $19 to $249 | Up to 1,000 monthly orders | Photo/video reviews, product and site reviews in one flow, reviews carousel, rich snippets, manual requests, coupons/email upsells |
| Prime | Starts at $119/month; FAQ shows Prime order-tier prices from $149 to $499 | Up to 2,000 monthly orders | Google Shopping Ads, Google Seller Ratings, Community Q&A, product blocklist, product grouping, Walmart/Target syndication, multi-login |
| Premium | Contact/sales path for higher order volume or advanced needs | Above the public Reviews tiers | Dedicated success and advanced features; exact terms require sales verification |

## Product Positioning
Yotpo is an enterprise-leaning review, UGC, loyalty, SMS, and retention platform. Its review product is feature-rich, but the current public pricing surface is order-tiered and more complex than SMB merchants usually expect.

## Strengths To Learn From
- Strong review request and content generation loops.
- Rich SEO and syndication story: Google Shopping, Google Seller Ratings, Walmart/Target syndication on higher tiers.
- Enterprise-style Q&A, product grouping, multi-login, and broader suite positioning.
- Modular storefront architecture observed on an ikas storefront: loader script, declarative placeholders, lazy modules, rich API-backed data surfaces.

## Weaknesses / Gaps For Renuvex Positioning
- Complexity and order-tier pricing can be too heavy for smaller ikas merchants.
- The product suite is broad; copying it wholesale would bloat Renuvex before the core review workflow is fully polished.
- It is not ikas-native even though Yotpo can run on ikas storefronts through scripts/placeholders.

## Renuvex Implications
- Keep the useful Yotpo architectural lesson: small loader, separate surfaces, lazy modules, API-backed review data, and explicit product identity.
- Do not copy enterprise bloat into the first pricing model.
- Priority parity gaps versus Yotpo: review-request email, Q&A, product grouping, verified buyer/order integration, import/export, and analytics.
- Renuvex can compete locally by making those features ikas-native and simpler.

## Live ikas Storefront Observation - 2026-05-15
See [[Yotpo_Protein_Ocean_Widget_Research]] for the read-only inspection of Protein Ocean's ikas product page.

Key findings:
- Yotpo ran on ikas storefronts using script tags plus declarative `yotpo-widget-instance` placeholders.
- The observed page loaded separate modules for star ratings, main reviews, media gallery, Q&A, filters, CSS overrides, fonts, and analytics.
- The observed runtime exposed Yotpo globals and a webpack-backed widget runtime.
- The architecture lesson is not to copy Yotpo's entire enterprise product. The useful pattern is a small loader, declarative widget instances, lazy modules, and separate dynamic APIs.

Reference architecture: [[Yotpo_Style_Widget_Modular_Architecture]]

## Obsidian Links
- [[Competitor_Pricing_And_Plans]]
- [[Yotpo_Protein_Ocean_Widget_Research]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Roadmap]]
