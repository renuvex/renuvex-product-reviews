---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-24
updated: 2026-05-24
last_verified: 2026-05-24
confidence: high
tags:
  - adr
  - namespace
  - branding
  - widget
related:
  - "[[Decision_Index]]"
  - "[[ADR_0018_Widget_Ownership_And_Placement_Resilience]]"
  - "[[Ikas_Widget_Injection_Notes]]"
source_files:
  - "package.json"
  - "src/lib/storefront-scripts.ts"
  - "src/lib/storefront-widget-url.ts"
  - "src/widget/core/namespace.js"
  - "src/widget/core/script-identity.js"
  - "src/widget/loader.js"
  - "scripts/build-widget.mjs"
---

# ADR 0020: Renuvex Product Reviews Namespace Migration

## Status
Accepted.

## Context
The app started as `Yorum Paneli` with public technical identifiers such as
`ikr-*`, `data-ikr-*`, `IKR_*`, and the ikas script name
`yorum-paneli-widget`. The product is now part of the Renuvex brand family:

- Brand: `Renuvex`
- App: `Product Reviews`
- Technical key: `product-reviews`
- Public prefix: `renuvex-pr`
- ikas script name: `renuvex-product-reviews-widget`
- Turkish marketplace display name: `Renuvex - Urun Yorumlari`

The migration cannot be a hard rename in one deploy because storefronts can run
cached `widget.js` and hashed runtime chunks while ikas script records, CDN
cache, and browser cache converge. The existing public aliases are therefore a
compatibility contract during the expand phase.

## Decision
Canonical identity is now Renuvex Product Reviews, but public legacy aliases
remain readable and, where needed, writable during the expand phase.

The app writes canonical ikas script records with name
`renuvex-product-reviews-widget` and script marker
`data-renuvex-app="product-reviews"`. The reconciler still recognizes legacy
`yorum-paneli-widget`, `data-ikr-app="yorum-paneli"`, and the historical
`publicApiKey=<merchantId>` fallback so stale DB maps and old live scripts can
be adopted instead of duplicated.

Runtime identity is app-specific, not brand-global. `renuvex-pr` is the public
DOM/CSS prefix for Product Reviews only. Future Renuvex apps must use their own
app-specific prefix.

Preview events are canonicalized to `RENUVEX_PR_*` while still accepting and
emitting `IKR_*` aliases. Short-lived internal browser/Redis keys move to
`renuvex_pr_*`.

DOM/CSS migration uses an expand layer:

- Owned slots and badges emit `data-renuvex-*` plus legacy `data-ikr-*`.
- Legacy `ikr-*` class state is mirrored to `renuvex-pr-*` at runtime.
- Injected widget CSS is expanded so canonical selectors and CSS variables exist
  alongside legacy selectors.
- Single-id surfaces such as `#ikas-reviews-anchor`, `#ikas-reviews`,
  `#ikas-reviews-widget`, `#ikr-styles`, and `#ikr-icon-sprite` are not dual
  written in this phase because IDs cannot safely represent two contracts.

External service names are not changed in this ADR. Vercel project names,
Sentry project slugs, Upstash database names, and repository names are separate
ops changes.

## Reasoning
This is the standard expand/contract migration model for public storefront
assets. It lets new code become canonical without breaking cached old code or
existing ikas script records.

Deleting legacy aliases immediately would create unnecessary risk:

- ikas may still publish an old script record for a short window.
- browsers can keep old `widget.js` and hashed chunks during deployment.
- third-party conflict diagnostics still need to identify both old and new
  surfaces while the migration is observed.

Automatic deletion of duplicate ikas scripts is intentionally not part of this
phase. The reconciler reports duplicates and updates/adopts the strongest
app-owned match. Destructive cleanup requires a verified targeted delete
contract from ikas or an explicit ops-only repair flow.

## Consequences
Positive:

- New installs and manual repair write canonical Renuvex script identity.
- Legacy script records are adopted instead of duplicated.
- Admin preview supports both canonical and legacy event names.
- Observability keys, rate-limit prefixes, and build defines now use the
  app-specific Renuvex namespace.
- DOM inspection can identify Renuvex-owned surfaces without losing legacy
  compatibility.

Tradeoffs:

- Some DOM elements carry both namespaces during the expand phase.
- Generated CSS is larger because canonical selector copies are appended.
- Historical docs and old ADRs remain historical and are not rewritten.

Deferred:

- Contract cleanup removing `.ikr-*`, `data-ikr-*`, and `IKR_*`.
- External service/repository rename.
- Any hard removal of `#ikr-*` IDs after live retention proves no old runtime
  relies on them.

## Verification
Required checks for this migration:

- `pnpm build:widget`
- `node --check public/widget.js`
- `pnpm exec tsc --noEmit`
- `pnpm lint`
- `git diff --check`
- `node scripts/wiki-audit.mjs --changed-source-check`

Live verification should confirm that ikas `listStorefrontJSScript` reports one
active app-owned script named `renuvex-product-reviews-widget` with both
Renuvex and legacy markers, and that storefront pages load `widget.js`,
runtime chunks, settings, ratings, and reviews without duplicate widget DOM.
