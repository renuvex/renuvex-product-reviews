---
type: ikas
project: ikas-review-app
status: active
created: 2026-05-15
updated: 2026-05-17
last_verified: 2026-05-17
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
  - "src/lib/ikas-client/generated/graphql.ts"
  - "src/app/api/oauth/callback/ikas/route.ts"
  - "src/app/api/admin/inject-scripts/route.ts"
  - "src/lib/storefront-widget-url.ts"
---

# ikas Storefront Script Capabilities

## Summary

ikas supports storing JavaScript snippets per storefront. This is enough to run a Yotpo-style storefront loader for this project. The preferred architecture is still one project-owned loader script per storefront, not one ikas script record per widget module.

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
  - Can `isHighPriority` and `order` be used for script ordering, and are there special rules?

### ikas developer's answer (authoritative)

- **Single loader + multiple modules is an accepted, used pattern.** ikas's own partners and ikas's own features do exactly this. ikas did not push a one-script-record-per-module model.
- **There are NO official stable ids or `data-*` attributes today** that mark specific page areas (e.g. "under the product name", "above the category filters") across themes. ikas does not currently have a feature that exposes such anchored areas.
- **Storefront Events is the documented, supported mechanism for page/product context.** When the user navigates to a product detail page, ikas pushes an event together with the product data, so the app can know which page the user is on and which product is shown. Docs: <https://builders.ikas.com/docs/storefront-events>
- **Standard `data-` attributes are planned but not yet available.** ikas has upcoming ikas Studio work that will introduce `data-` prefixed standard attributes, but it is early. Even once shipped, it will not be present on many stores for a while — so it cannot be relied on yet.
- **`isHighPriority` loads the script before Facebook / Google scripts.** This matters for apps that manage cookies/consent. For `order`: setting `order` to `0` or `1` with priority `false` means the Facebook/Google scripts will run before this app's script.

### Implications for this project

- Keep one project-owned loader `StorefrontJSScript` per storefront. This is confirmed as an accepted ikas pattern, not a workaround.
- **Do not build theme adapters as the primary mechanism, and do not hack around missing anchors.** The correct, ikas-sanctioned source of page/product context is Storefront Events — not DOM class heuristics. Theme-class selectors should be treated as a temporary fallback only, not the architecture.
- There is currently no official DOM mount point. Until ikas Studio `data-*` attributes ship and reach enough stores, mounting still requires the app's own anchor/placeholder logic, but page and product identity must come from Storefront Events rather than DOM scraping.
- Plan for a future migration to ikas `data-*` attributes once they are broadly available; design the loader so the context source can be swapped without rewriting widget modules.
- For `isHighPriority` / `order`: this review app does not manage cookies/consent, so it does not need to preempt Facebook/Google scripts. Choose ordering deliberately and document the choice rather than leaving it implicit.

## Current Project State

The project currently defines these GraphQL documents:

- `listStorefront`
- `createStorefrontJSScript`
- `updateStorefrontJSScript`
- `deleteStorefrontJSScript`

Source: [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts)

Runtime injection creates a full script tag:

```html
<script src="<STOREFRONT_WIDGET_BASE_URL>/widget.js?publicApiKey=<merchantId>" async></script>
```

Source paths:

- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- [src/app/api/admin/inject-scripts/route.ts](src/app/api/admin/inject-scripts/route.ts)
- [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts)

The project tracks installed ikas script ids in `StoreSettings.storefrontScripts`.

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

The official docs show a delete mutation that accepts a storefront id list. The generated local client and MCP introspection expose a zero-argument `deleteStorefrontJSScript`.

The OAuth callback currently calls `deleteStorefrontJSScript()` in the fresh-install branch when the DB script map is empty. This is risky because it may delete more scripts than intended.

Source: [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)

### Missing Script Listing In Current Project Documents

The public docs include `listStorefrontJSScript(storefrontId)`, but the project currently does not define it in [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts). The 2026-05-17 MCP recheck did not expose this operation either, so reconciliation design is still uncertain.

That makes the project depend on its own DB map to know whether a script already exists. If DB rows are lost or a merchant manually edits scripts, reconciliation is weaker than it could be.

### Storefronts Created After Install

The app injects during OAuth install and manual re-inject. If a merchant adds a new storefront later, that storefront will not get the loader until re-inject or a future webhook/reconciliation job handles it.

## Recommendation

For Yotpo-style architecture on ikas:

- keep one ikas script record per storefront
- name it predictably, for example `yorum-paneli-loader`
- use a small loader URL, not the full widget bundle
- avoid blanket delete behavior
- add read-only reconciliation with `listStorefrontJSScript` before destructive actions
- if the active schema still lacks `listStorefrontJSScript`, do not invent destructive cleanup; first resolve the public-docs/MCP/generated-client mismatch with ikas or codegen against the app's real schema
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
