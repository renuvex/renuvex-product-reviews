---
type: codebase
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-08
tags:
  - frontend
  - react
  - tailwind
related:
  - "[[Index]]"
  - "[[Folder_Structure]]"
  - "[[Backend_API_Map]]"
  - "[[Widget_Files_Map]]"
---

# Frontend Map

## Summary
The "frontend" splits into two completely separate runtimes: (1) the **merchant admin panel** — Next.js 16 App Router + React 19 + shadcn/ui, embedded as iframe inside ikas Admin; and (2) the **storefront widget** — vanilla JS bundled by esbuild, runs on customer storefronts. Don't conflate the two: shared code lives in `src/lib/design-tokens.ts` and the settings schema. See [[Widget_Files_Map]] for the storefront side.

## Libraries / Technologies
Next.js 16 (16.2), React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/postcss`), shadcn/ui (Radix primitives), `react-colorful`, `lucide-react`, `sonner`, `next-themes`, `axios`, `zod`, `@ikas/app-helpers` (AppBridge).

## Admin App (Next.js)

### Routing
| Path | File | Notes |
|---|---|---|
| `/` | [src/app/page.tsx](src/app/page.tsx) | Triggers `useBaseHomePage` → routes based on token presence |
| `/authorize-store` | [src/app/authorize-store/page.tsx](src/app/authorize-store/page.tsx) | Manual store-name entry fallback |
| `/callback` | [src/app/callback/page.tsx](src/app/callback/page.tsx) | Receives `?token=...&redirectUrl=...` from server callback, stashes in sessionStorage, redirects |
| `/dashboard` | [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx) | Authenticated home; renders `home-page` component |
| `/preview` | [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts) | Standalone HTML iframe — no root layout |

### Top-level Layout
- [src/app/layout.tsx](src/app/layout.tsx) — global font, theme provider, sonner toaster
- [src/app/globals.css](src/app/globals.css) — Tailwind v4 entry + design tokens

### Auth bootstrap
- [src/app/hooks/use-base-home-page.ts](src/app/hooks/use-base-home-page.ts)
  - In iframe: `TokenHelpers.getTokenForIframeApp()` (AppBridge) → `/dashboard`
  - Out of iframe with `?storeName=`: redirect to `/api/oauth/authorize/ikas`
  - Otherwise: `/authorize-store`

### Mandatory iframe page pattern (from canonical rules)
Every page that runs inside the ikas Admin iframe must follow this pattern (see [[Existing_AI_Rules_And_Ikas_CLI_Instructions]] for full text):
1. **Always** call `AppBridgeHelper.closeLoader()` in a separate `useEffect(() => { AppBridgeHelper.closeLoader(); }, [])` on mount.
2. **Always** retrieve the JWT via `TokenHelpers.getTokenForIframeApp()`.
3. **Never** make direct API calls to ikas from the frontend — always go through `/api/admin/*` or `/api/ikas/*` server routes.
4. Use the `ApiRequests` helper ([src/lib/api-requests.ts](src/lib/api-requests.ts)) — don't hand-roll axios calls.
5. Wrap any `useSearchParams()` usage in `<Suspense>` (Next.js requirement).
6. Handle loading + error states gracefully.

Pattern: `AppBridgeHelper.closeLoader() → TokenHelpers → ApiRequests → backend route → ikas client`.

### Frontend → backend bridge
- [src/lib/api-requests.ts](src/lib/api-requests.ts) — axios with `Authorization: JWT <token>` header. Pattern: `ApiRequests.<area>.<method>(token, ...args)`.

## Component tree (admin)

```
src/components/
├─ Loading/                       # Full-page loader
├─ home-page/
│  ├─ index.tsx                   # Tabs container — Reviews tab + Widgets tab
│  ├─ types.ts                    # Local types
│  ├─ ReviewsTab.tsx              # Table of reviews + filter + pagination
│  ├─ ReviewRow.tsx               # Single review row UI
│  ├─ ReplyDialog.tsx             # Modal for editing merchant reply
│  └─ widgets/
│     ├─ index.tsx                # Widgets tab grid
│     ├─ WidgetCard.tsx           # Per-widget card → opens editor
│     ├─ widgetDefs.ts            # 🟡 SCHEMA SOURCE OF TRUTH
│     ├─ editor/
│     │  ├─ WidgetEditor.tsx      # Settings panel + iframe preview side-by-side
│     │  ├─ SettingsPanel.tsx     # Renders fields from widgetDefs
│     │  ├─ IconSelect.tsx        # SVG grid icon picker
│     │  └─ VisualSelectGrid.tsx  # Visual choice cards for layout select fields
│     ├─ previews/                # Static admin-side previews (BadgePreview, ReviewsPreview)
│     └─ widget-previews/         # Iframe-driven live previews (BadgeWidgetPreview, ReviewsWidgetPreview)
└─ ui/                            # shadcn/ui primitives (button, card, dialog, input, label,
                                  # select, slider, sonner, table, tabs, textarea, accordion,
                                  # badge, dropdown-menu)
```

### Live preview pattern (settings)
1. `WidgetEditor` renders settings panel + an iframe pointed at `/preview`.
2. On any setting change -> `postMessage({ type: 'RENUVEX_PR_SETTINGS_UPDATE', settings })` to iframe. The legacy `IKR_SETTINGS_UPDATE` alias is still emitted during expand phase.
3. Inside iframe, `widget.js` running in preview mode merges + re-renders.
4. The iframe acks ready with `RENUVEX_PR_WIDGET_READY` plus the legacy `IKR_WIDGET_READY` alias from [src/widget/index.js](src/widget/index.js).
5. Settings save: `PUT /api/admin/settings` (debounced or on-blur; check `WidgetEditor` for the exact strategy).

This pattern keeps preview pixel-identical to production widget without duplicating render code.

## Storefront Widget (overview, links to dedicated map)

The storefront widget is an entirely different runtime — vanilla JS, IIFE, IE11+ish. See [[Widget_Files_Map]] for the full layout. Quick orientation:

- Entry: [src/widget/index.js](src/widget/index.js) → bootstrap, attach observer + events
- Renders: `product-widget`, `listing-badges`, layouts under `review-layouts/` and `summary-layouts/`
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
- 2026-05-08: Added [VisualSelectGrid.tsx](src/components/home-page/widgets/editor/VisualSelectGrid.tsx) to the admin editor map. It renders schema-driven visual choice cards for layout select fields without changing stored widget setting values.
