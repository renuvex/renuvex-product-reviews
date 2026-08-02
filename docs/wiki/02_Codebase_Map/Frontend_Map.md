---
type: codebase
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-08-02
last_verified: 2026-08-02
confidence: high
tags:
  - frontend
  - react
  - tailwind
related:
  - "[[Index]]"
  - "[[Folder_Structure]]"
  - "[[Backend_API_Map]]"
  - "[[Widget_Files_Map]]"
source_files:
  - "src/app/hooks/use-base-home-page.ts"
  - "src/app/dashboard/page.tsx"
  - "src/app/dashboard/layout.tsx"
  - "src/app/dashboard/not-found.tsx"
  - "src/features/admin-shell/AdminAuthBoundary.tsx"
  - "src/features/admin-shell/AdminWorkspaceShell.tsx"
  - "src/features/review-moderation/ReviewModerationScreen.tsx"
  - "src/features/review-moderation/ReviewRow.tsx"
  - "src/features/widget-management/WidgetCatalogScreen.tsx"
  - "src/features/widget-management/WidgetEditorScreen.tsx"
  - "src/features/widget-management/components/WidgetCard.tsx"
  - "src/lib/admin-review-summary.ts"
  - "src/lib/widgets/catalog.ts"
  - "src/lib/widgets/preview-routes.ts"
  - "src/app/(preview)/preview/[widgetId]/[scene]/route.ts"
  - "src/features/widget-management/WidgetSettingsLoadState.ts"
  - "src/helpers/token-helpers.ts"
  - "playwright.admin-dashboard.config.ts"
  - "scripts/verify-admin-route-bundles.mjs"
  - "tests/admin-dashboard-contract.spec.ts"
---

# Frontend Map

## Agent Brief
- `/` delegates iframe entry to the persistent `AdminAuthBoundary`; only that boundary owns AppBridge loader/token bootstrap.
- Reviews and the widget catalog opt into `AdminWorkspaceShell`; the widget editor reuses the same auth/settings lifetime through a client transition while its route layout remains focused and sidebar-free.
- The admin-dashboard suite uses a protocol stub for route tests; the real `/preview` renderer remains covered by `test:admin-preview`.

## Summary
The "frontend" splits into two completely separate runtimes: (1) the **merchant admin panel** — Next.js 16 App Router + React 19 + shadcn/ui, embedded as iframe inside ikas Admin; and (2) the **storefront widget** — vanilla JS bundled by esbuild, runs on customer storefronts. Don't conflate the two: shared code lives in `src/lib/design-tokens.ts` and the settings schema. See [[Widget_Files_Map]] for the storefront side.

## Libraries / Technologies
Next.js 16 (16.2), React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/postcss`), shadcn/ui (Radix primitives), `react-colorful`, `lucide-react`, `sonner`, `next-themes`, `axios`, `zod`, `@ikas/app-helpers` (AppBridge).

## Admin App (Next.js)

### Routing
| Path | File | Notes |
|---|---|---|
| `/` | [src/app/page.tsx](src/app/page.tsx) | In iframe, delegates to `/dashboard/reviews`; outside iframe, starts or requests OAuth authorization |
| `/authorize-store` | [src/app/authorize-store/page.tsx](src/app/authorize-store/page.tsx) | Manual store-name entry fallback |
| `/dashboard` | [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx) | Server redirect to `/dashboard/reviews` |
| `/dashboard/reviews` | [src/app/dashboard/reviews/page.tsx](src/app/dashboard/reviews/page.tsx) | Review moderation route; owns review list, summary and action state |
| `/dashboard/widgets` | [src/app/dashboard/widgets/(catalog)/page.tsx](src/app/dashboard/widgets/(catalog)/page.tsx) | Widget catalog route inside the workspace shell; loads settings only after entering the widget route group |
| `/dashboard/widgets/[widgetId]` | [src/app/dashboard/widgets/[widgetId]/page.tsx](src/app/dashboard/widgets/[widgetId]/page.tsx) | Focused sidebar-free editor route with server-first capability admission, static params for canonical widget IDs, and intent-prefetched client navigation |
| `/preview/[widgetId]/[scene]` | [src/app/(preview)/preview/[widgetId]/[scene]/route.ts](src/app/(preview)/preview/[widgetId]/[scene]/route.ts) | Build-time generated standalone preview HTML; exact registered scenes only, no root layout |
| `/preview?widget=&scene=` | [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts) | Temporary exact-pair compatibility redirect to the canonical static path |

### Top-level Layout
- [src/app/layout.tsx](src/app/layout.tsx) — global font, theme provider, sonner toaster
- [src/app/globals.css](src/app/globals.css) — Tailwind v4 entry + design tokens

### Auth bootstrap
- [src/app/hooks/use-base-home-page.ts](src/app/hooks/use-base-home-page.ts)
  - In iframe: routes directly to `/dashboard/reviews` without touching
    AppBridge. The persistent `AdminAuthBoundary` is the single loader/token owner.
  - Out of iframe with `?storeName=`: redirect to `/api/oauth/authorize/ikas`
  - Otherwise: `/authorize-store`
- The OAuth server callback returns directly to the trusted ikas Admin
  authorized-app URL. There is no client callback page or bearer-token query
  handoff.

### Mandatory iframe page pattern (from canonical rules)
The dashboard route group follows this pattern through its persistent auth boundary (see [[Existing_AI_Rules_And_Ikas_CLI_Instructions]] for full text):
1. **Always** call `AppBridgeHelper.closeLoader()` in a separate `useEffect(() => { AppBridgeHelper.closeLoader(); }, [])` on mount.
2. **Always** retrieve the JWT via `TokenHelpers.getTokenForIframeApp()`.
3. **Never** make direct API calls to ikas from the frontend — always go through `/api/admin/*` or `/api/ikas/*` server routes.
4. Use the `ApiRequests` helper ([src/lib/api-requests.ts](src/lib/api-requests.ts)) — don't hand-roll axios calls.
5. Wrap any `useSearchParams()` usage in `<Suspense>` (Next.js requirement).
6. Handle loading + error states gracefully.

The dashboard enforces that sequence in `AdminAuthBoundary`. Until AppBridge
returns a token it renders only the authentication gate, so review, theme,
merchant, and settings requests cannot start with a placeholder credential.
The Reviews route loads review data after auth. The widget settings provider
exists only under `/dashboard/widgets`, starts idle, and loads after a catalog
or valid editor route requests it. Leaving the widget route group discards the
cache, so returning from Reviews performs one new authoritative settings GET.
The Reviews and catalog layouts add the shared workspace header/sidebar below
that auth boundary. The editor route deliberately omits the workspace shell and
uses the full iframe width. Catalog cards use a Next.js client transition with
automatic prefetch disabled and one explicit intent prefetch on hover, focus,
or touch. All canonical widget IDs are emitted through `generateStaticParams`,
and the editor segment has a stable loading fallback. This preserves the
existing auth boundary and widget-settings provider: entering an editor does
not repeat AppBridge loader closure, merchant lookup, theme sync, or the
authoritative settings GET. Server-first capability admission and the focused
editor layout remain unchanged.

Review list pagination and moderation counts are separate contracts. The first
Reviews load requests one paginated list and one `/api/admin/reviews/summary`;
status/page/page-size changes request only the list. The summary response is the
only source for tab counters. Successful moderation (including accepted `202`
video processing) and deletion refresh both list and summary, while replies and
failed mutations do not refresh counts. A monotonically increasing request
sequence prevents an older summary response from overwriting a newer result;
the latest failure preserves the last verified counters.

Ready signed-Mux video rows do not render the stored provider poster directly.
Each visible row requests a short-lived thumbnail-only URL from the authenticated
admin endpoint, while opening the full preview uses the separate playback
endpoint. Thumbnail loading failure keeps the play action available and falls
back without exposing provider identifiers or granting playback authority to the
list view.

Pattern: `AppBridgeHelper.closeLoader() → TokenHelpers → ApiRequests → backend route → ikas client`.

### Frontend → backend bridge
- [src/lib/api-requests.ts](src/lib/api-requests.ts) — axios with `Authorization: JWT <token>` header. Pattern: `ApiRequests.<area>.<method>(token, ...args)`.

## Component tree (admin)

```
src/features/
├─ admin-shell/                   # Persistent AppBridge auth plus optional workspace navigation
├─ review-moderation/             # Review list, rows, dialogs, media previews and route-owned state
└─ widget-management/
   ├─ WidgetSettingsProvider.tsx  # Route-group cache; no mount-time request
   ├─ WidgetCatalogScreen.tsx     # Catalog and small card previews; no editor/runtime import
   ├─ WidgetEditorScreen.tsx      # Configurable route client boundary
   └─ components/
      ├─ WidgetCard.tsx
      ├─ editor/                  # Settings panel, editor and preview protocol client
      └─ previews/                # Small catalog illustrations, not live widget renderers

src/components/ui/                # Shared shadcn/ui primitives

src/lib/widgets/
└─ catalog.ts                     # Release/configuration metadata and settings schema; no React/DOM/runtime imports
```

The catalog separates product release state from merchant settings. Reviews
and Badge are `available + settings`; Carousel, Popup, Q&A, and Summary are
`planned + none`. Planned cards remain visible as `Yakında` but expose neither
an enabled state nor an editor action. This is a capability guard, not a plan
or entitlement system, and it does not promise activation for future
zero-configuration widgets.

The persistent shell is intentionally feature-neutral. Static esbuild graphs
reject review/widget/runtime imports from the shell, reject widget imports from
Reviews, and reject editor/preview imports from the catalog. The build verifier
then requires distinct client-reference chunk sets for the selected Reviews,
catalog, and editor owner modules. Those byte totals are not complete route
initial-JavaScript measurements. Fresh-context browser tests prove that Reviews
and catalog do not request the editor route chunk or `/preview`, while each
configurable editor deep link loads settings, its editor route, and preview.
Because Playwright request interception disables HTTP cache, this suite does not
claim second-open browser-cache reuse; it separately proves the widget settings
provider lifecycle.

### Live preview pattern (settings)
1. `WidgetEditor` selects a registered widget scene and mounts
   `/preview/<widgetId>/<scene>` in one common iframe shell. The three current
   canonical documents are prerendered from the scene registry; the legacy
   query route performs only a validated temporary redirect.
2. The iframe sends versioned `RENUVEX_PR_WIDGET_READY` to its exact
   same-origin parent.
3. The parent sends `RENUVEX_PR_PREVIEW_RENDER` with the complete resolved
   settings map. This preserves cross-widget dependencies such as Badge
   icon/color coming from Reviews settings.
4. The preview runtime renders fixture content through the production Reviews,
   PDP Badge, or Listing Badge renderer and acknowledges
   `RENUVEX_PR_PREVIEW_RENDERED` or a fixed preview error.
5. Settings save remains `PUT /api/admin/settings`; preview fixture data is not
   persisted and no `/api/preview/*` endpoint exists.

The output renderer and widget CSS are production code. The surrounding
fixture page and data are intentionally deterministic preview inputs, not a
claim that every merchant theme will be pixel-identical.

### Verified request reduction
For the review data path, cold start changed from four count requests plus one
list request to one summary plus one list (`5 -> 2`). Including merchant and
theme bootstrap, the current dashboard fixture changes from `7 -> 4` API
requests. Inside the review data routes this changes the Prisma list/count work
from ten operations to one list query, one pagination count, and one summary
`groupBy` (`10 -> 3`). Authentication/installation/token lookups are excluded
from that DB number. These are request/query-shape measurements, not production
latency, execution-plan, or tenant-capacity claims.

## Storefront Widget (overview, links to dedicated map)

The storefront widget is an entirely different runtime — vanilla JS, IIFE, IE11+ish. See [[Widget_Files_Map]] for the full layout. Quick orientation:

- Entry: [src/widget/index.js](src/widget/index.js) → bootstrap, attach observer + events
- Renders: `reviews-section`, `listing-badges`, layouts under `review-layouts/` and `summary-layouts/`
- Built to: [public/widget.js](public/widget.js) via [scripts/build-widget.mjs](scripts/build-widget.mjs)

## Notes
- **No client-side state library** in the admin (no Redux, no Zustand). Local component state + small custom hooks. Keep that pattern — adding a global store has not been justified.
- **Theme tokens** are duplicated between [src/app/globals.css](src/app/globals.css) (admin) and [src/lib/design-tokens.ts](src/lib/design-tokens.ts) (consumed by widget render functions for color mapping). Keep them in sync; consider scripted derivation.
- The shadcn registry config is [components.json](components.json). Use the shadcn MCP / CLI to add new primitives under `src/components/ui/*`.

## Related Source Files
- [src/app/](src/app/)
- [src/components/](src/components/)
- [src/lib/api-requests.ts](src/lib/api-requests.ts)
- [src/lib/design-tokens.ts](src/lib/design-tokens.ts)

## Obsidian Links
- [[Backend_API_Map]]
- [[Widget_Files_Map]]
- [[Widget_Customization]]
- [[System_Architecture]]

## Change Log
- 2026-05-08: Added [VisualSelectGrid.tsx](src/features/widget-management/components/editor/VisualSelectGrid.tsx) to the admin editor map. It renders schema-driven visual choice cards for layout select fields without changing stored widget setting values.
