---
type: research
project: renuvex-product-reviews
status: active
created: 2026-05-15
updated: 2026-05-17
last_verified: 2026-05-17
confidence: high
tags:
  - research
  - yotpo
  - competitor
  - widget
  - storefront
related:
  - "[[Yotpo]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Widget_Performance]]"
source_files:
  - "src/widget/index.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/listing-badges/index.js"
  - "scripts/build-widget.mjs"
---

# Yotpo Protein Ocean Widget Research

## Summary

This page records the read-only browser, console, DOM, and network inspection of `https://proteinocean.com/whey-protein` on 2026-05-15. The goal was to understand how a mature Yotpo installation runs on an ikas storefront and to capture architectural lessons for the ikas Review App.

No storefront action was performed. No forms, cart actions, panel changes, API writes, database writes, migrations, package installs, or deployments were run.

Scope guardrail: this is a benchmark from one merchant storefront, not a canonical
ikas app implementation. Protein Ocean may include merchant-specific theme code,
custom Yotpo configuration, or enterprise Yotpo behavior that should not be copied
blindly. Use these findings as comparison material for Phase 2 planning, and
validate any adopted pattern against official ikas docs, ikas MCP introspection,
direct ikas developer feedback, and this app's dev-store behavior.

## Target

- Page: `https://proteinocean.com/whey-protein`
- Platform signals: ikas storefront assets from `cdn.myikas.com`, `api.myikas.com`, and `window.IkasEvents`.
- Review provider: Yotpo.
- Product page title observed: `En Iyi Whey Protein Tozu (Biskuvili, Cikolatali ve +11 Aroma)`.

## Method

Chrome DevTools Protocol was used in headless Chrome with:

- full page load
- wait period for async scripts
- scroll steps to trigger lazy widgets
- DOM inspection
- console and runtime exception collection
- network response collection
- network failure collection
- browser audit issue collection

Sensitive query-string values were redacted in notes. Public widget keys are not treated as secrets, but this page still avoids storing the full Yotpo app key because the source page URL is enough to reproduce the observation.

## High-Level Evidence

Observed runtime counts after page load and scroll:

| Signal | Value |
|---|---:|
| Network responses | 296 |
| Failed or aborted requests | 9 |
| Runtime exceptions | 0 |
| Console entries | 2 warnings |
| Browser log entries | 1 network error |
| Yotpo script elements in DOM | 12 |
| Yotpo-related DOM elements | 1902 |
| Review-related DOM elements | 445 |
| Star-related DOM elements | 340 |
| JSON-LD blocks | 6 |
| Iframes | 1 |

The failed or aborted requests were analytics or tracking calls such as Google collect and site event collection. The Yotpo review widget path itself loaded without a runtime exception in this run.

## Yotpo Loader And Placeholder Pattern

The raw HTML includes both a Yotpo loader and a direct Yotpo widget script:

- `https://cdn-widgetsrepository.yotpo.com/v1/loader/...`
- `https://staticw2.yotpo.com/.../widget.js`

The storefront contains declarative placeholder elements like:

```html
<div
  class="yotpo-widget-instance yotpo-product-detail-v2"
  data-yotpo-instance-id="607214"
  data-yotpo-product-id="87db987c-348f-460f-a179-54f9546edbb8">
</div>
```

Related product and listing placeholders use the same `yotpo-widget-instance` pattern with different `data-yotpo-product-id` values.

Runtime globals observed:

- `Yotpo`
- `yotpo`
- `yotpoSeoEl`
- `yotpoWidgetsContainer`
- `webpackYotpoMainWidget`

## Yotpo Module Loading Pattern

Yotpo does not ship the whole review system as one storefront bundle. The observed page loaded separate assets for:

- widget loader
- widget initializer
- review star ratings
- main reviews widget
- questions and answers
- media gallery chunks
- filters and filters container chunks
- fonts and CSS overrides
- analytics or pixel bundle

Examples:

- `widget-reviews-star-ratings/app.v0.9.9-5790.js`
- `widget-reviews-main-widget/app.v0.117.4-7293.js`
- `widget-questions-and-answers/app.v0.6.4-5823.js`
- `widget-reviews-main-widget/js/app-media-gallery...js`
- `widget-reviews-main-widget/js/app-filters...js`

This is the main architectural lesson: a small loader discovers instances, then loads only the widget modules needed by the page.

## Network Host Summary

Top Yotpo-related hosts in the focused run:

| Host | Count | Status | Main role |
|---|---:|---|---|
| `api-cdn.yotpo.com` | 58 | 200 | review, rating, Q&A API; preflight plus fetch |
| `staticw2.yotpo.com` | 21 | 200 | core widget script, CSS, fonts, batch widget config |
| `cdn-yotpo-images-production.yotpo.com` | 19 | 200 | review images |
| `p.yotpo.com` | 11 | 200 | analytics pixels |
| `cdn-widgetsrepository.yotpo.com` | 7 | 200 | versioned widget modules and fonts |
| `p.yotpoapi.com` | 6 | 200 | analytics pixels |

## API Evidence

### Product Data

Endpoint pattern:

```text
https://api-cdn.yotpo.com/v3/storefront/stores/{storeKey}/products/{productId}/productData?include=reviewsSummary,topics&lang=tr
```

Observed data:

- `storeId`
- `productId`
- `externalId`
- review topics
- summary topics
- Turkish localized topic summaries

This is a strong reference for a future AI or topic summary feature, but it is not a minimum viable requirement.

### Reviews

Endpoint pattern:

```text
https://api-cdn.yotpo.com/v3/storefront/store/{storeKey}/product/{productId}/reviews?page=1&perPage=10&sort=date,smart,images,rating,badge
```

Observed data:

- `pagination.total = 23735`
- `bottomline.totalReview = 23735`
- `bottomline.averageScore = 4.82608`
- `starDistribution = { 1: 19, 2: 65, 3: 508, 4: 2841, 5: 20302 }`
- sample review included `verifiedBuyer: true`
- sample review included incentive metadata such as coupon incentive flags

### Star Distribution

Endpoint pattern:

```text
https://api-cdn.yotpo.com/v1/star_distribution/store/{storeKey}/product/{productId}
```

Observed data:

```json
{"1":19,"2":65,"3":508,"4":2841,"5":20302}
```

### Questions And Answers

Endpoint pattern:

```text
https://api-cdn.yotpo.com/v1/widget/{storeKey}/products/{productId}/questions
```

Observed data:

- `questions = 26`
- `answers = 26`
- store-owner answers are represented in the response

### Rich Snippets

The browser runtime saw a 200 response for the Yotpo rich snippets path. A direct shell request to the same path returned 404 in a later check. Treat this endpoint as runtime-context dependent and do not assume it is a stable unauthenticated API.

## Cache Pattern

Yotpo separates cache policy by resource type:

- versioned widget modules and static assets use long cache headers such as `max-age=31536000`
- widget CSS and font assets use medium-long cache headers such as `max-age=604800`
- review, rating, and Q&A API responses use `max-age=0, no-cache, no-store`
- pixel calls are private or short-lived

This separation is a better reference than the current project state, where the whole production `widget.js` is served as a single asset with `public, max-age=0, must-revalidate`.

## SEO And Structured Data Observation

The raw ikas page contained Product JSON-LD, but the Product JSON-LD block did not include `aggregateRating` in the raw HTML response checked by shell. Yotpo also calls a rich-snippets API at runtime.

Do not infer that Yotpo relies only on client-side JSON-LD. The exact indexing strategy needs separate SEO validation before copying.

## Console And Browser Logs

Console warnings observed:

- Hotjar did not launch because the run used a headless browser user agent.
- Meta Pixel reported a duplicate pixel ID.

Browser network log:

- one Yandex cookie sync image returned HTTP 400.

No Yotpo runtime exception was observed.

## Lessons For This Project

- A single loader plus multiple widget modules is the target architecture for a Yotpo-like experience.
- Declarative placeholder elements are valuable. They reduce brittle title and container detection when the merchant or theme can place them.
- Auto-mount via theme adapters is still needed for ikas merchants that cannot or will not place custom markup.
- Product identity mapping must be explicit. Yotpo used an external product UUID in widget placeholders, while the raw Product JSON-LD used a different `productId` value. Our app must define a canonical product identity contract for ikas product id, variant id, slug, and storefront route.
- Verified buyer support depends on order and customer integration. Yotpo review data exposes `verifiedBuyer`; our current data model does not.
- Static asset caching should be separated from dynamic review data caching.
- Q&A and media gallery should be separate modules, not folded into the first loader bundle.

## Sources

- Live page inspected: `https://proteinocean.com/whey-protein`
- Official ikas Storefront API docs: [Storefronts](https://ikas.dev/docs/api/admin-api/storefronts)
- Official ikas Storefront Events docs: [Quick Start](https://builders.ikas.com/docs/storefront-events/quick-start)
- Related local source: [src/widget/index.js](src/widget/index.js), [src/widget/reviews-section/bootstrap.js](src/widget/reviews-section/bootstrap.js), [scripts/build-widget.mjs](scripts/build-widget.mjs)

## Obsidian Links

- [[Yotpo]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Widget_Performance]]
- [[Storefront_Widget_Overview]]
