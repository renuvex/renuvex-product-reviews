---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-24
updated: 2026-05-25
last_verified: 2026-05-25
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
Accepted. Current contract: hard cleanup completed on 2026-05-25. The original
expand-phase decision below is retained as history; the update notes define the
active namespace behavior.

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

- External service/repository rename (Vercel project, Sentry slug, Upstash DB, repo).

Update 2026-05-25 — contract phase completed. Because only the dev store is
installed (no real merchant installs), the expand/contract overlap window was
unnecessary, so the legacy aliases were removed in one pass: all `.ikr-*`,
`data-ikr-*`, `IKR_*`, `--ikr-*`, `#ikr-*`, and `yorum-paneli` identifiers are
gone from source and the active runtime bundle. `core/namespace.js` is reduced
to the single-namespace preview helpers (the runtime class-mirror observer and
CSS expand layer are removed). The storefront matcher dropped its legacy
name/marker tiers; the still-legacy live ikas script record is adopted via the
`publicApiKey` fallback and rewritten to canonical on the next reconcile, so no
duplicate is created. During the follow-up audit, unreferenced old hashed
runtime chunks were removed from the repo because there are no real merchant
installs yet; future builds can still retain recent canonical chunks for normal
cache safety.

Update 2026-05-25 (mount contract) — the public mount point moved from the id
`#ikas-reviews-anchor` to the attribute `data-renuvex-widget="reviews"`, a
scalable per-widget scheme (future widgets such as a carousel use
`data-renuvex-widget="carousel"`). The review-section ids were renamed
`#ikas-reviews`→`#renuvex-reviews` and `#ikas-reviews-widget`→
`#renuvex-reviews-widget` (badge scroll target + IkasEvents subscribe id
updated). (Supersedes the expand-phase note above that left `#ikas-reviews*`
untouched.)

Update 2026-05-25 (opt-in mount + badge decoupling) — the review section is now
opt-in: it renders only where the merchant places
`<div data-renuvex-widget="reviews"></div>`. The previous auto-create fallback
(insert after the product container, else `main`/`body`) was removed, so a
missing mount means no review section (and no surprise footer placement). The
PDP rating badge was decoupled from the review render: it auto-places on the
product title and is gated only by the badge widget toggle, so badges (PDP title
+ listing) work independently of the review mount. Rationale: explicit
merchant-controlled placement for the review block; badges stay zero-config.
Supersedes the auto-mount in [[Bug_Product_Widget_Missing_Auto_Mount]].

## Verification
Required checks for this migration:

- `pnpm build:widget`
- `node --check public/widget.js`
- `pnpm exec tsc --noEmit`
- `pnpm lint`
- `git diff --check`
- `node scripts/wiki-audit.mjs --changed-source-check`

Live verification should confirm that ikas `listStorefrontJSScript` reports one
active app-owned script named `renuvex-product-reviews-widget` with canonical
Renuvex markers, and that storefront pages load `widget.js`, runtime chunks,
settings, ratings, and reviews without duplicate widget DOM.
