---
type: status
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: medium
tags:
  - questions
  - uncertainty
related:
  - "[[Index]]"
  - "[[Current_Status]]"
  - "[[Roadmap]]"
  - "[[Theme_Adapter_Playbook]]"
  - "[[Structured_Data_And_Rich_Snippets]]"
  - "[[Ikas_OAuth_Installation_Notes]]"
source_files:
  - "src/lib/widgets/catalog.ts"
  - "src/widget/placement/capability.js"
  - "src/widget/structured-data/index.js"
  - "src/app/api/oauth/authorize/ikas/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/lib/product-snapshots.ts"
---

# Open Questions

> Anything uncertain about scope, architecture, or implementation. Resolve and either delete or convert to an ADR.

## Agent Brief

Use this page only to locate unresolved decisions. Do not treat an item here as
an accepted contract; verify current source/runtime and follow the linked ADR
before implementation. Review-email V5's accepted lifecycle lives in
[[ADR_0036_Review_Request_Email_Architecture]]; only its listed rollout and
product/legal gates remain open.

## Q&A widget scope

The `qa` catalog entry is a planned, non-configurable scaffold. Before adding a
table or endpoint, decide whether questions use a separate model, who can
answer, what moderation states exist, and whether verified purchase matters.

## Carousel and popup behavior

`carousel` and `popup` are also planned, non-configurable catalog scaffolds.
Before implementation, define their merchant selection rules, eligible review
set, placement/mount contract, dismissal behavior, and performance budget.

## Theme adapter coverage and provider signal

Ozy is the only automatic runtime-attested adapter. Unknown and ambiguous themes
fail closed. Before another theme is enabled, require a bounded signature,
negative cross-theme fixtures, browser tests, and a live canary. Provider-selected
placement remains blocked until Ikas exposes a supported active-theme or stable
placement signal. See [[Theme_Adapter_Playbook]] and
[[ADR_0038_Runtime_Attested_Storefront_Placement]].

## Structured data injection mechanism
The runtime already injects client-side Product `aggregateRating` JSON-LD only
when an eligible review/rating surface is present. Validate a public PDP through
the intended search-engine tooling. Consider a server/native alternative only
if that evidence shows the current mechanism is insufficient. See
[[Structured_Data_And_Rich_Snippets]].

## Multi-storefront settings and localization

`WidgetSettings` is merchant-wide, while one merchant can have multiple
storefronts/locales. Decide whether locale comes from Ikas storefront context or
a merchant setting, whether settings fork per storefront, and how translated
merchant labels are stored. Any i18n implementation must cover visible copy,
formatting, screen-reader text, and other accessible names together.

## OAuth scope correctness
The authorize route requests broader order/inventory scopes than current source
appears to mutate. Do not reduce them until Ikas confirms the exact
`saveWebhooks` dependency and a development-store reauthorization test proves
install, refresh, product/order webhooks, and script lifecycle. Canonical
evidence: [[Ikas_OAuth_Installation_Notes]].

## Profanity filter
The current TR/EN list is code-owned. Decide whether moderation remains a
global application policy or gains merchant-managed terms. Do not add a Redis
or database policy layer without a concrete product requirement and moderation
rules.

## Image lifecycle
AWS upload registration owns metadata and variants; QStash maintenance performs
bounded cleanup. Decide whether rejected reviews retain private admin-preview
objects for a support window or queue immediate object-family cleanup. Record
the retention rule before changing cleanup behavior.

## Review product-name snapshots

Product Lifecycle synchronizes current Ikas product identity snapshots, while
existing `Review.productName` values are submit-time display snapshots. Decide
whether old reviews should show historical names or current product names. Any
change must preserve `(storeId, productId)` ownership and avoid mass rewrites
without an explicit migration/rollback plan.

## Resolved Elsewhere

- Loader/module ownership: [[ADR_0013_Modular_Widget_Loader_Architecture]].
- Unknown-theme placement: [[ADR_0038_Runtime_Attested_Storefront_Placement]].
- Storefront event and SPA ordering: [[Ikas_Lifecycle_Mount_Questions]].
- Test coverage and release gates: [[Test_Strategy]].
- CORS isolation: [[Security_And_Rate_Limits]].
- PDP/listing transfer behavior: [[Widget_Performance]].
- Current image/video pipelines: [[ADR_0034_AWS_Review_Image_Migration]] and
  [[ADR_0032_Review_Video_On_Mux]].

## Obsidian Links
- [[Current_Status]]
- [[Roadmap]]
- [[Decision_Index]]
- [[Theme_Adapter_Playbook]]
- [[Structured_Data_And_Rich_Snippets]]
