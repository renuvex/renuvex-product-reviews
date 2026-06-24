---
type: research
project: renuvex-product-reviews
status: active
created: 2026-06-21
updated: 2026-06-21
last_verified: 2026-06-21
confidence: medium
tags:
  - research
  - competitor
  - pricing
  - plans
  - packaging
related:
  - "[[Index]]"
  - "[[Review_App_Market_Research]]"
  - "[[Loox]]"
  - "[[Yotpo]]"
  - "[[Okendo]]"
  - "[[Judge_Me]]"
  - "[[Roadmap]]"
source_files:
  - "docs/wiki/06_Competitors/Loox.md"
  - "docs/wiki/06_Competitors/Yotpo.md"
  - "docs/wiki/06_Competitors/Okendo.md"
  - "docs/wiki/06_Competitors/Judge_Me.md"
  - "prisma/schema.prisma"
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/widget/structured-data/jsonld.js"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/upload/video/initiate/route.ts"
  - "src/app/api/admin/reviews/route.ts"
---

# Competitor Pricing And Plans

## Purpose
This is the single canonical competitor comparison page for Renuvex Product Reviews. Keep pricing, packaging, feature parity, and Renuvex positioning here instead of spreading comparison matrices across multiple wiki pages.

Individual competitor pages should hold competitor-specific notes:
- [[Loox]]
- [[Yotpo]]
- [[Okendo]]
- [[Judge_Me]]

## Evidence Boundaries
- Browser verification date: 2026-06-21.
- Competitor pricing is time-sensitive. Verify the official pages again before final public pricing, sales claims, or ikas App Store submission copy.
- Former local plan snapshots were checked against official browser-visible pages, then folded into this canonical wiki page so the temporary snapshot directory can be removed.
- Renuvex status reflects current local source and wiki evidence, not a public app-store pricing plan.
- When official sources conflict, this page records the conflict instead of choosing an unproven value.

## Official Sources Checked

| Competitor | Official sources used | Result |
| --- | --- | --- |
| Loox | `https://loox.app/pricing`, `https://apps.shopify.com/loox`, `https://help.loox.io/support/solutions/articles/501000162476-the-loox-beginner-plan` | Current public plan shape is Beginner, Convert, Unlimited. The old local `Scale` plan is not visible on current official pricing surfaces. Beginner price has a source conflict: Shopify listing shows Free, Loox help says $12.99/month after trial. |
| Judge.me | `https://judge.me/pricing`, `https://apps.shopify.com/judgeme` | Judge.me's own pricing URL was blocked by JavaScript/bot verification in the browser tool. The official Shopify App Store listing confirms Free and Awesome at $15/month. |
| Yotpo | `https://www.yotpo.com/pricing/`, `https://www.yotpo.com/get-started-reviews/` | Generic pricing page is demo-oriented. The browser-visible reviews plan page uses Free, Growth, Prime with order-tier pricing. The old local `FREE/STARTER/PRO/PREMIUM` snapshot is stale for this surface. |
| Okendo | `https://okendo.io/pricing/`, `https://apps.shopify.com/okendo-reviews` | Official site emphasizes platform/custom pricing and bundles. Shopify listing exposes Free, Essential, Growth, Power review-app tiers. The local snapshot missed the Shopify listing Free/Essential/Growth/Power details. |

## Current Plan Snapshot

| Product | Public/current plans verified | Price signal | Video reviews | Order/usage signal |
| --- | --- | --- | --- | --- |
| Renuvex Product Reviews | No public package yet | TBD | Implemented in source via Mux direct upload, quota, moderation, and public playback gates | Store-level monthly video quota exists in `StoreSettings.videoMonthlyLimit`; commercial package limits are not decided |
| Loox | Beginner, Convert, Unlimited | Beginner conflicting: Shopify listing says Free, Loox help says $12.99/month after trial; Convert $49.99/month; Unlimited $299.99/month | Convert and above | Beginner: 100 review request emails and up to 500 total orders; Convert includes 300 orders then usage pricing per extra 300 orders; Unlimited has unlimited review request emails |
| Judge.me | Free, Awesome | Free; Awesome $15/month | Free listing includes unlimited visual reviews; Awesome adds premium capabilities | No order cap found in official Shopify listing |
| Yotpo Reviews | Free, Growth, Prime | Free; Growth starts at $15/month but FAQ shows tiered prices up to $249 by order count; Prime starts at $119/month but FAQ shows $149-$499 by order count | Growth and Prime | Free up to 50 monthly orders; Growth up to 1,000 monthly orders; Prime up to 2,000 monthly orders |
| Okendo Reviews | Free, Essential, Growth, Power on Shopify; platform/custom plans on Okendo site | Free; Essential $19/month; Growth $119/month; Power $299/month; platform bundles custom | Shopify category and plan copy support photo/video review positioning; exact gating should be rechecked before sales copy | Free up to 50 orders/month; Essential up to 200; Growth up to 1,500; Power up to 3,500 |

## Detailed Plan Records

These records are intentionally duplicated here instead of living in temporary local snapshot files. Keep this section compact enough to scan, but detailed enough that package decisions do not require restoring the deleted snapshot directory.

### Loox

Verified sources: Loox pricing, Shopify App Store listing, and Loox Beginner help article.

Important source conflict:
- Shopify App Store lists Beginner as Free.
- Loox Help lists Beginner as `$12.99/month` after trial with 100 monthly review request emails and a 500 total-order cap.
- Loox pricing page exposes Beginner, Convert, and Unlimited, but the browser-rendered price text for Beginner is inconsistent enough that public comparison copy should not publish a single Beginner price without checking the actual billing flow.

| Plan | Price / billing signal | Usage signal | Included / notable features |
| --- | --- | --- | --- |
| Beginner | Free on Shopify listing; `$12.99/month` in Loox Help after trial; Loox pricing page has conflicting rendered Beginner price text | 100 monthly review request emails; up to 500 total orders after trial | Review request emails, photo-review discount, 10+ widgets, reviews importer, Shop App syndication, SEO, multilingual basics |
| Convert | `$49.99/month` on Shopify listing and Loox pricing page | 300 orders included in base price, then usage-priced extra 300-order blocks | Video reviews, smart visual sorting, review highlights, AI translations/replies/stories, Google/Meta/TikTok syndication, integrations/API access, referrals, Loox branding removal |
| Unlimited | `$299.99/month` | Unlimited review request emails; referrals/upsells positioned as unlimited | Everything in Convert plus unlimited review requests/referrals/upsells and priority-support positioning |

Renuvex implications:
- Do not copy Loox's full growth-suite scope immediately.
- Priority parity gaps are review-request email, review carousel, import/export, incentive controls, and package-level branding controls.
- Loox is Shopify/global-first; Renuvex's ikas-native install and Turkish merchant UX remain the local-market wedge.

### Judge.me

Verified sources: Judge.me pricing URL and Shopify App Store listing. The direct Judge.me pricing page could not be read by the browser tool because it required JavaScript/bot verification, so the Shopify App Store listing is the verified official plan surface for this snapshot.

| Plan | Price / billing signal | Usage signal | Included / notable features |
| --- | --- | --- | --- |
| Free | Free | Unlimited product and store reviews; unlimited visual reviews on the listing | Review widget, star rating badge, carousels, Google rich snippets/MyBusiness, trust badge/medals, Shop App/Etsy/Amazon sync, reviews importer, AliExpress sync |
| Awesome | `$15/month` | No order cap found in the official Shopify listing | AI replies/summaries/translations, 130+ integrations including Klaviyo and Gorgias, 16 widgets including snippets/Q&A/reviews page, advanced collection/reminders, coupons/referrals, Google Shopping, Meta/TikTok Shop sync, social push, widget/email customization, CSS |

Renuvex implications:
- Judge.me is the affordability and breadth benchmark, not the video-cost benchmark.
- Renuvex should not market unlimited video without a Mux and support cost model.
- Priority parity gaps are import/export, review-request email, Q&A, coupons/referrals, multi-language, verified buyer, social/Google surfaces, and broader integrations.

### Yotpo Reviews

Verified sources: Yotpo generic pricing page and Yotpo Reviews plan page. The generic pricing page is demo-oriented in the browser output; the browser-visible Reviews page is the concrete plan source for this snapshot.

| Plan | Price / billing signal | Usage signal | Included / notable features |
| --- | --- | --- | --- |
| Free | `$0/month` | Up to 50 monthly orders | Review request emails, on-site widgets, review moderation, social push, SEO page, SMS review requests |
| Growth | Starts at `$15/month`; FAQ/browser-visible copy also shows tiered order pricing up to higher monthly prices | Up to 1,000 monthly orders | Photo/video reviews, product and site reviews in one flow, reviews carousel, rich snippets, manual review requests, coupons and email upsells |
| Prime | Starts at `$119/month`; FAQ/browser-visible copy also shows tiered order pricing for higher order counts | Up to 2,000 monthly orders | Google Shopping Ads, Google Seller Ratings, Community Q&A, product blocklist, product grouping, Walmart/Target syndication depending visible surface, multi-login |
| Premium | Sales/contact path | Above public tiers | Advanced features, higher-volume needs, and dedicated success require sales verification |

Renuvex implications:
- Yotpo is the enterprise architecture and feature-breadth benchmark.
- The useful pattern is modular storefront surfaces, lazy modules, explicit product identity, and API-backed review data.
- Priority parity gaps are review-request email, Q&A, product grouping, verified buyer/order integration, import/export, and analytics.

### Okendo Reviews

Verified sources: Okendo official pricing page and Shopify App Store listing. The official website emphasizes custom platform/bundle pricing, while the Shopify listing exposes concrete Reviews app tiers.

#### Okendo official website surface

| Surface | Price / billing signal | Usage / scope signal | Included / notable features |
| --- | --- | --- | --- |
| Okendo Platform | Custom pricing | Monthly order-volume selector present | Reviews, Loyalty, Quizzes, Referrals, and Surveys in one platform; onboarding/success/solution support positioning |
| Okendo Platform Scale | Custom pricing | No usage caps; fixed annual price for unlimited orders | Enterprise/break-out brand positioning with uncapped order growth during subscription |
| Bundles | Custom pricing | Three-product bundles for growth goals | Proof/personalization, retention/loyalty, and customer-insight bundles |
| Individual products | Custom pricing | Product-specific expansion | Reviews, Loyalty, Quizzes, Referrals, Surveys |

#### Shopify Reviews tiers

| Plan | Price / billing signal | Usage signal | Included / notable features |
| --- | --- | --- | --- |
| Free | Free | Up to 50 orders/month | Automated review request emails, smart review form, rewards engine, review displays, Google SEO snippets, review grouping, moderation |
| Essential | `$19/month`; annual option shown on listing | Up to 200 orders/month | Everything in Free |
| Growth | `$119/month`; annual option shown on listing | Up to 1,500 orders/month | Everything in Essential plus AI review summaries, AI review keywords, TikTok Shop integration, Q&A widget |
| Power | `$299/month`; annual option shown on listing | Up to 3,500 orders/month | Review campaigns, advanced CSS editor, email/SMS integrations, advanced reporting, managed onboarding |

Renuvex implications:
- Okendo is the premium UX and attribute-review benchmark.
- Renuvex should learn from Okendo's polished default widgets and aspect/attribute questions later, without copying the full platform bundle too early.
- Priority parity gaps remain email requests, verified buyer, import/export, Q&A, analytics, and polished high-volume display surfaces.

## Renuvex Baseline

| Area | Current evidence | Competitive implication |
| --- | --- | --- |
| Native ikas integration | OAuth, AppBridge, ikas admin API, storefront script injection, and ikas-aware widget runtime exist in source/wiki. | This is the main local-market advantage because the compared competitors are Shopify/global-first, not ikas-native. |
| Photo reviews | Cloudinary signed uploads, trusted image policy, pending registry, and image cleanup are implemented. | Renuvex can compete with base photo-review collection and display. |
| Video reviews | Mux direct upload, provider-neutral video sessions, media jobs, webhook audit, signed admin playback, public playback IDs, quota, and cleanup lifecycle exist in source. | Technically competitive, but packaging, UX polish, and video-specific controls still need product work. |
| Review moderation | Pending/approved/rejected status, auto-approval modes, merchant reply, delete, and profanity filter exist. | Strong enough for SMB launch, weaker than enterprise AI/sentiment suites. |
| Storefront widgets | PDP review section, summary layouts, card/gallery/list review layouts, title badge, listing badges, media gallery, media lightbox, and live preview exist. Carousel/popup/Q&A are scaffolded or unverified. | Strong customization direction; missing separate carousel/popup/Q&A parity. |
| Structured data | Independent Product AggregateRating JSON-LD surface exists in `src/widget/structured-data/jsonld.js`. | This closes a key SEO parity item. Validate in Google tools before public claims. |
| Outreach | No post-purchase review request email flow yet. | Major parity gap versus all four competitors. |
| Import/export | No CSV import/export yet. | Major migration/acquisition gap, especially versus Judge.me and Loox. |
| Verified buyer | Not implemented. | High-value ikas-native differentiator because ikas order data can support it. |
| Multi-language | Storefront copy is currently Turkish-oriented; no full i18n layer. | Required before competing globally; less urgent for Turkish ikas MVP. |
| AI analytics/moderation | Not implemented as product feature. | Optional later; do not copy enterprise bloat before core collection/display/outreach is solid. |

## Feature Comparison

Legend: `Yes` = browser/source verified, `Partial` = exists only in some tiers or scaffolded locally, `No` = not present in current evidence, `Unknown` = not proven from verified sources.

| Feature | Renuvex | Loox | Judge.me | Yotpo Reviews | Okendo Reviews |
| --- | --- | --- | --- | --- | --- |
| Native ikas install | Yes | No | No | No | No |
| Product review collection | Yes | Yes | Yes | Yes | Yes |
| Photo reviews | Yes | Yes | Yes | Yes | Yes |
| Video reviews | Yes | Convert+ | Yes | Growth+ | Yes |
| Review request email | No | Yes | Yes | Yes | Yes |
| SMS review request | No | Unknown | Yes | Yes | Unknown |
| Coupons or incentives | No | Yes | Yes | Yes | Rewards engine on Okendo listing |
| Star rating widget | Yes | Yes | Yes | Yes | Yes |
| Listing/category badges | Yes | Yes | Yes | Yes | Yes |
| Review carousel | Scaffold/unverified | Yes | Yes | Yes | Yes |
| Media gallery | Yes for review lightbox/media gallery, not a separate UGC gallery product | Yes | Yes | Visual UGC path exists | Yes |
| Q&A | Scaffold/unverified | Unknown | Awesome | Prime | Growth+ on Shopify listing |
| Product grouping | No | Yes | Awesome | Prime | Yes |
| Rich snippets / SEO | Yes in source | Yes | Yes | Yes | Yes |
| Google Shopping / Seller Ratings | No | Convert+ syndication | Awesome Google Shopping | Prime | Add-on or higher tiers depending surface |
| Meta/TikTok syndication | No | Convert+ | Awesome | Yes in syndication copy | TikTok/Meta higher tiers or add-ons |
| Review import | No | Yes | Yes | Yes migration support | Yes |
| CSV export | No | Unknown | Yes in feature listing | Unknown | Unknown |
| Branding removal | Configurable Renuvex UI not packaged yet | Convert+ | Awesome removes/extends premium customization | Paid tiers | Unknown |
| Advanced CSS/customization | Strong admin visual controls; no full custom CSS product promise | Convert+ / widgets | Awesome custom CSS | Higher tiers | Power+ / platform |
| Analytics dashboard | No dedicated review analytics dashboard | Engagement/conversion tracking listed | Reporting/analytics listed | Dashboards/reporting listed | Reporting listed |
| API/webhooks for merchants | No public merchant API | Convert+ API/webhooks visible on Loox pricing | Unknown | Premium/API docs exist | Add-on/higher tier |

## Packaging Implications For Renuvex

### Starter
- Should not compete by copying Judge.me's unlimited-everything economics without usage guardrails.
- Best starter promise: ikas-native install, review widget, star/listing badges, photo reviews, moderation, structured data, and simple customization.
- Video can be included as a limited allowance or disabled by default until pricing is proven against Mux cost.

### Growth
- Should include the features merchants expect once ads and order volume grow: video reviews with a visible quota, review-request email, import/export, verified buyer badge, richer customization, and review carousel.
- This tier should be the main Loox/Yotpo alternative for ikas merchants because Loox/Yotpo become materially more expensive once visual reviews, syndication, or order tiers matter.

### Pro
- Should target high-volume stores needing higher video quota, priority support, advanced display modules, multi-language, richer analytics, and eventually AI summaries/moderation.
- Do not promise enterprise syndication, retailer syndication, or full API/webhook surfaces until those contracts exist.

## Historical Source Corrections

| Former local snapshot | Finding | Action |
| --- | --- | --- |
| Loox snapshot | Included an old `Scale` plan not visible on current official pricing surfaces. Beginner pricing conflicts across official Loox/Shopify/help pages. | Folded the current Beginner/Convert/Unlimited shape and the Beginner price conflict into this page. |
| Yotpo snapshot | Used `FREE/STARTER/PRO/PREMIUM`, but browser-visible official reviews page uses Free/Growth/Prime plus tiered order pricing. | Folded Free/Growth/Prime into this page and recorded that the generic pricing page is demo-oriented. |
| Okendo snapshot | Focused on platform/custom plans and missed Shopify App Store Free/Essential/Growth/Power review tiers. | Folded both official website custom/platform positioning and Shopify review-app pricing tiers into this page. |
| Judge.me snapshot | Mostly aligned with Shopify listing, but the direct Judge.me pricing page could not be read because of JS/bot verification. | Folded Shopify listing details into this page and recorded the blocked direct page. |

## Stop Rules For Future Pricing Work
- Do not publish exact TRY package prices from this page without rechecking official competitor pages, USD/TRY, ikas commission, VAT, Mux usage, Cloudinary usage, Vercel/Supabase/Upstash costs, and support cost.
- Do not claim parity for carousel, popup, Q&A, review-request emails, import/export, verified buyer, multi-language, AI, or merchant API until source and tests prove it.
- Do not keep separate comparison matrices or temporary plan snapshot files. Update this page and the relevant individual competitor profile instead.

## Obsidian Links
- [[Loox]]
- [[Yotpo]]
- [[Okendo]]
- [[Judge_Me]]
- [[Review_App_Market_Research]]
- [[Roadmap]]
