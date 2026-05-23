---
type: ikas
project: ikas-review-app
status: active
created: 2026-05-15
updated: 2026-05-23
last_verified: 2026-05-23
confidence: high
tags:
  - ikas
  - storefront
  - widget
  - script-injection
  - mcp
related:
  - "[[Ikas_Widget_Injection_Notes]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[ADR_0002_Widget_Injection_Strategy]]"
  - "[[Ikas_API_Notes]]"
source_files:
  - "src/lib/ikas-client/graphql-requests.ts"
  - "src/lib/ikas-client/v1-graphql-requests.ts"
  - "src/lib/ikas-client/generated/graphql.ts"
  - "src/lib/ikas-client/generated/v1-graphql.ts"
  - "src/app/api/oauth/callback/ikas/route.ts"
  - "src/app/api/admin/inject-scripts/route.ts"
  - "src/app/api/admin/daily-maintenance/route.ts"
  - "src/app/api/admin/reconcile-storefront-scripts/route.ts"
  - "src/lib/storefront-scripts.ts"
  - "src/lib/storefront-widget-url.ts"
  - "src/lib/storefront-theme.ts"
---

# ikas Storefront Script Capabilities

## Summary

ikas supports storing JavaScript snippets per storefront. This is enough to run a Yotpo-style storefront loader for this project. The preferred architecture is still one project-owned loader script per storefront, not one ikas script record per widget module. Script content now includes project-owned `data-ikr-*` markers so reconciliation can identify/adopt the correct remote record without depending only on a cached DB id.

## Official Documentation Evidence

The official Storefront API page says the Storefront API can save and embed JavaScript in storefront themes so scripts can run in the theme.

The same page documents `StorefrontJSScript` with fields including:

- `id`
- `authorizedAppId`
- `contentType`
- `fileName`
- `isActive`
- `isHighPriority`
- `name`
- `order`
- `scriptContent`
- `storeAppId`
- `storefrontId`

The official docs also show `listStorefrontJSScript(storefrontId)` returning an array of scripts. That array return shape is the practical evidence that multiple script records can exist for a storefront.

Source: [ikas Storefronts API](https://ikas.dev/docs/api/admin-api/storefronts)

## MCP Evidence

Read-only ikas MCP introspection on 2026-05-15 confirmed the current MCP schema exposes:

- `createStorefrontJSScript(input: CreateStorefrontJSScriptInput!): StorefrontJSScript!`
- `updateStorefrontJSScript(input: UpdateStorefrontJSScriptInput!): StorefrontJSScript!`
- `deleteStorefrontJSScript: Boolean!`

`CreateStorefrontJSScriptInput` includes:

- `contentType`
- `fileName`
- `isHighPriority`
- `name`
- `scriptContent`
- `storefrontId`

`StorefrontJSScript` includes `order`, `isHighPriority`, `scriptContent`, `name`, and `storefrontId`.

This MCP naming differs from the current public docs, which show `saveStorefrontJSScript` and `deleteStorefrontJSScript(storefrontIdList)`. Treat the generated local client and MCP schema as the implementation source for codegen work, but re-check the official docs and MCP before changing script management.

### MCP Recheck - 2026-05-17

Read-only ikas MCP recheck on 2026-05-17 still exposed:

- `createStorefrontJSScript(input: CreateStorefrontJSScriptInput!): StorefrontJSScript!`
- `updateStorefrontJSScript(input: UpdateStorefrontJSScriptInput!): StorefrontJSScript!`
- `deleteStorefrontJSScript: Boolean!`

The same MCP list/introspect run did **not** expose `listStorefrontJSScript`; `introspect("listStorefrontJSScript")` returned invalid operation. It also did not expose `listStorefront` through MCP, although the current generated project client contains and uses `listStorefront`.

Confidence: high for the MCP observation, but do not treat it as the final platform contract. It conflicts with public docs and with generated project code in different directions. Before Phase 3 script lifecycle work, re-run MCP and codegen against the active app schema.

## ikas Developer Feedback — 2026-05-16

This section records a direct answer from an ikas developer about storefront script integration. Treat this as authoritative for ikas *intent and direction*, above scraped docs, when designing the storefront widget architecture.

### What was asked

- Is a single loader script managing multiple small widgets/modules the recommended and stable approach on ikas (versus one storefront script record per module)?
- Is it appropriate to mount/render modules in the needed areas and re-mount on SPA transitions / lazy-loaded content?
- Across different ikas themes, product card / product title / product detail DOM class names change. Instead of keeping theme-based selector lists, is there a more stable ikas-recommended method?
  - Official/stable `data-*` attributes for product cards?
  - A reliable way to read product id / variant id / slug from the DOM?
  - Official mount points / slots / extension points for product card, product title, product detail?
  - Recommended official way to mount widgets without depending on theme classes?
  - Is there a way to detect the active storefront theme?
  - Can `isHighPriority` and `order` be used for script ordering, and are there special rules?

### ikas developer's answer (authoritative)

- **Single loader + multiple modules is an accepted, used pattern.** ikas's own partners and ikas's own features do exactly this. ikas did not push a one-script-record-per-module model.
- **There are NO official stable ids or `data-*` attributes today** that mark specific page areas (e.g. "under the product name", "above the category filters") across themes. ikas does not currently have a feature that exposes such anchored areas.
- **Storefront Events is the documented, supported mechanism for page/product context.** When the user navigates to a product detail page, ikas pushes an event together with the product data, so the app can know which page the user is on and which product is shown. Docs: <https://builders.ikas.com/docs/storefront-events>
- **Standard `data-` attributes are planned but not yet available.** ikas has upcoming ikas Studio work that will introduce `data-` prefixed standard attributes, but it is early. Even once shipped, it will not be present on many stores for a while — so it cannot be relied on yet.
- **`isHighPriority` loads the script before Facebook / Google scripts.** This matters for apps that manage cookies/consent. For `order`: setting `order` to `0` or `1` with priority `false` means the Facebook/Google scripts will run before this app's script.

### Active theme follow-up - 2026-05-23

Direct ikas developer feedback: there is no dedicated active-theme detector. However, calling `listStorefront` and selecting the theme where `themes[].isMainTheme` is `true` can be used to identify the published theme/storefront context. Treat this as an Admin/API-side signal for adapter selection, not as a storefront runtime DOM or mount-point contract.

Schema verification on 2026-05-23 confirmed `isMainTheme` belongs to the nested `StorefrontTheme` type, not directly to `Storefront`. The current generated query requests `mainStorefrontThemeId` and `themes { id name themeId themeVersionId isMainTheme deleted }`. The app resolves this into `StoreSettings.storefrontTheme` and exposes only non-sensitive runtime adapter metadata through `/api/public/settings`.

### Implications for this project

- Keep one project-owned loader `StorefrontJSScript` per storefront. This is confirmed as an accepted ikas pattern, not a workaround.
- **Do not build theme adapters as the primary mechanism, and do not hack around missing anchors.** The correct, ikas-sanctioned source of page/product context is Storefront Events — not DOM class heuristics. Theme-class selectors should be treated as a temporary fallback only, not the architecture.
- There is currently no official DOM mount point. Until ikas Studio `data-*` attributes ship and reach enough stores, mounting still requires the app's own anchor/placeholder logic, but page and product identity must come from Storefront Events rather than DOM scraping.
- Active theme adapter selection uses `listStorefront.themes[].isMainTheme` plus `mainStorefrontThemeId` fallback. This does not remove the need for generic placement heuristics or manual/support fallback.
- Plan for a future migration to ikas `data-*` attributes once they are broadly available; design the loader so the context source can be swapped without rewriting widget modules.
- For `isHighPriority` / `order`: this review app does not manage cookies/consent, so it does not need to preempt Facebook/Google scripts. Choose ordering deliberately and document the choice rather than leaving it implicit.

## Current Project State

The project currently defines these StorefrontJSScript GraphQL documents:

v2 create/update path:

- `listStorefront`
- `createStorefrontJSScript`
- `updateStorefrontJSScript`

v1 read-only reconciliation path:

- `listStorefrontJSScript(storefrontId)`

The active MCP/generated client still exposes zero-argument `deleteStorefrontJSScript`, but this app no longer defines or calls it.

Source: [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts)
Source: [src/lib/ikas-client/v1-graphql-requests.ts](src/lib/ikas-client/v1-graphql-requests.ts)

Runtime injection creates a full script tag:

```html
<script src="<STOREFRONT_WIDGET_BASE_URL>/widget.js?publicApiKey=<merchantId>" async data-ikr-app="yorum-paneli" data-ikr-store-id="<merchantId>"></script>
```

Source paths:

- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- [src/app/api/admin/inject-scripts/route.ts](src/app/api/admin/inject-scripts/route.ts)
- [src/app/api/admin/daily-maintenance/route.ts](src/app/api/admin/daily-maintenance/route.ts)
- [src/app/api/admin/reconcile-storefront-scripts/route.ts](src/app/api/admin/reconcile-storefront-scripts/route.ts)
- [src/lib/reconcile-storefront-scripts.ts](src/lib/reconcile-storefront-scripts.ts)
- [src/lib/storefront-scripts.ts](src/lib/storefront-scripts.ts)
- [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts)

The project tracks installed ikas script ids in `StoreSettings.storefrontScripts`, but treats that JSON map as a cache. The remote ikas script list is the source of truth when the v1 read succeeds. Reconciliation reports `remoteStatus`, `matchedBy`, `duplicateCount`, `contentMatches`, `isActive`, and `deleted` so manual inject and maintenance responses can distinguish stale DB ids, missing remote scripts, duplicate app-owned records, and v1 list outages.

## Multiple Widgets: What ikas Allows vs What We Should Do

ikas can hold multiple storefront JavaScript script records, because the documented list query returns a list and script records have `order` and `isHighPriority`.

However, a review app should avoid using one ikas script record per widget. Better:

1. Create one script record per storefront for our loader.
2. Let the loader fetch public config.
3. Let the loader discover widget instances and load only the needed modules.
4. Keep widget ordering and lifecycle inside our own runtime.

This keeps install, update, rollback, cleanup, and support simpler.

## Current Risks

### Delete Semantics Mismatch

The official docs show a delete mutation that accepts a storefront id list. The active MCP introspection exposes a zero-argument `deleteStorefrontJSScript`.

Source no longer calls this mutation. Script lifecycle now uses non-destructive read/adopt/create/update through [src/lib/storefront-scripts.ts](src/lib/storefront-scripts.ts). If the DB script map is lost and v1 list succeeds, install/manual/cron can adopt a live remote app-owned script instead of creating a duplicate. If v1 list fails, the helper falls back to the conservative create/update-only behavior.

### Script Listing Contract Split

The public v1 docs include `listStorefrontJSScript(storefrontId)`, but the v2 MCP recheck on 2026-05-22 still did not expose this operation. The project therefore keeps v2 create/update in [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts) and generates a separate v1 read-only client from [src/lib/ikas-client/v1-graphql-requests.ts](src/lib/ikas-client/v1-graphql-requests.ts).

Do not move mutation writes to v1 unless ikas confirms the contract. The v1 list is only used to avoid stale DB ids and duplicate app-owned scripts.

### Storefronts Created After Install

The app injects during OAuth install and manual re-inject. The daily `GET /api/admin/daily-maintenance` cron also runs storefront-script reconciliation and fills missing storefronts when a merchant already has at least one tracked script id. `GET /api/admin/reconcile-storefront-scripts` remains an explicit ops endpoint for the same helper. If the DB map is completely empty, cron skips to avoid blind duplicate creation; manual re-inject is the explicit repair path.

## Recommendation

For Yotpo-style architecture on ikas:

- keep one ikas script record per storefront
- name it predictably, for example `yorum-paneli-loader`
- use a small loader URL, not the full widget bundle
- include project-owned `data-ikr-app` and store-id markers in script content
- avoid blanket delete behavior
- keep reconciliation non-destructive: read/adopt via v1 list, then write via v2 create/update
- do not invent destructive cleanup; first resolve the public-docs/MCP/generated-client mismatch with ikas
- use `isHighPriority` only if the loader must run before theme scripts
- keep widget module ordering inside the loader registry

## Related Official Docs

- [Storefronts API](https://ikas.dev/docs/api/admin-api/storefronts)
- [Storefront Events Quick Start](https://builders.ikas.com/docs/storefront-events/quick-start)
- [Storefront Events Event Types](https://builders.ikas.com/docs/storefront-events/events)

## Obsidian Links

- [[Ikas_Widget_Injection_Notes]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Widget_Architecture]]
- [[ADR_0002_Widget_Injection_Strategy]]
