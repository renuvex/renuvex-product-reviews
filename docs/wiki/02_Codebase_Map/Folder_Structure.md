---
type: codebase
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-28
last_verified: 2026-07-28
tags:
  - structure
related:
  - "[[Index]]"
  - "[[Important_Files]]"
  - "[[Project_Index]]"
---

# Folder Structure

## Summary
Top-level layout. Three big buckets: the Next.js app (`src/app/*`), the storefront widget source (`src/widget/*`), and the Prisma DB (`prisma/`). The widget bundle is checked into `public/widget.js`. Update this page whenever a top-level folder is added, removed, or renamed.

Cloudflare Worker widget delivery adds a small fourth top-level code bucket: `workers/widget-delivery/`. It serves `widget.renuvex.app` static assets and V2 allowlisted public reads only, uses `wrangler.widget.jsonc`, and must not own settings side effects, writes, upload, DB, Mux, QStash, image-provider, R2, or webhook behavior.

## Tree (annotated)

```
renuvex-product-reviews/
├─ .env.example                  # Required env contract — never document real values
├─ ikas.config.json              # ikas dev tooling (port, oauth redirect path)
├─ next.config.js                # Next.js config
├─ package.json                  # pnpm scripts + deps
├─ tsconfig.json
├─ vercel.json                   # region: fra1, widget cache headers; maintenance schedules live in QStash
├─ components.json               # shadcn/ui config
├─ eslint.config.mjs
├─ postcss.config.mjs
├─ pnpm-lock.yaml
├─ README.md                     # Public dev README
├─ @types/                       # Local ambient TS types
│
├─ prisma/
│  ├─ schema.prisma              # Prisma models: auth, reviews, product summaries, settings, product snapshots, uploads
│  └─ migrations/                # 29+ migrations, 2026-03 → 2026-05; iterative widget settings churn
│
├─ public/
│  ├─ widget.js                  # ✅ BUILT artifact (esbuild) — do NOT hand-edit
│  └─ logo.svg
│
├─ scripts/
│  └─ build-widget.mjs           # esbuild driver: pnpm build:widget [--theme=X] [--watch]
│
├─ src/
│  ├─ app/                       # Next.js App Router
│  │  ├─ (preview)/preview/      # Standalone iframe preview (route group bypasses root layout)
│  │  ├─ api/
│  │  │  ├─ admin/               # JWT-gated merchant APIs (reviews, settings, inject, cleanup)
│  │  │  ├─ ikas/                # Example: get-merchant via ikas Admin GQL
│  │  │  ├─ oauth/               # authorize + callback
│  │  │  ├─ preview/             # Settings + fixture data for /preview iframe
│  │  │  └─ public/              # CORS-open APIs called by widget.js
│  │  ├─ authorize-store/page.tsx
│  │  ├─ dashboard/page.tsx
│  │  ├─ hooks/use-base-home-page.ts
│  │  ├─ globals.css             # Tailwind v4 entry
│  │  ├─ layout.tsx
│  │  └─ page.tsx                # → useBaseHomePage routing
│  │
│  ├─ components/
│  │  ├─ Loading/                # Full-page loader
│  │  ├─ home-page/              # Admin UI (dashboard tabs, reviews, widget editor)
│  │  │  ├─ ReplyDialog.tsx
│  │  │  ├─ ReviewRow.tsx
│  │  │  ├─ ReviewsTab.tsx
│  │  │  ├─ index.tsx            # Top-level home component
│  │  │  ├─ types.ts
│  │  │  └─ widgets/
│  │  │     ├─ WidgetCard.tsx
│  │  │     ├─ widgetDefs.ts     # 🟡 Settings schema source-of-truth
│  │  │     ├─ editor/           # SettingsPanel + WidgetEditor + IconSelect
│  │  │     ├─ previews/         # Static admin-side previews
│  │  │     └─ widget-previews/  # Iframe-driven live previews
│  │  └─ ui/                     # shadcn/ui primitives (button, card, dialog, etc.)
│  │
│  ├─ globals/
│  │  ├─ config.ts               # OAuth scope/clientId/etc; reads NEXT_PUBLIC_* env
│  │  └─ constants.ts
│  │
│  ├─ helpers/
│  │  ├─ api-helpers.ts          # getIkas(token), onCheckToken (refresh), getRedirectUri
│  │  ├─ jwt-helpers.ts          # Verifies ikas AppBridge admin JWTs
│  │  └─ token-helpers.ts        # AppBridge token cache + code-signature validation
│  │
│  ├─ lib/
│  │  ├─ api-requests.ts         # Frontend → backend bridge (axios)
│  │  ├─ auth-helpers.ts         # getUserFromRequest() — extract JWT
│  │  ├─ cors.ts                 # withCors / corsOptions — wide-open for /api/public/*
│  │  ├─ design-tokens.ts        # Color tokens shared admin/widget
│  │  ├─ prisma.ts               # Prisma singleton
│  │  ├─ review-images.ts        # Trusted review image URL policy (AWS media host allowlist)
│  │  ├─ session.ts              # iron-session wrappers
│  │  ├─ utils.ts                # cn() etc.
│  │  ├─ validation.ts           # zod helpers
│  │  ├─ widget-settings.ts      # 🟡 sanitize/validate/defaults — admin & public both consume
│  │  └─ ikas-client/
│  │     ├─ codegen.ts           # GraphQL Codegen config
│  │     ├─ graphql-requests.ts  # gql operations (queries + mutations)
│  │     └─ generated/graphql.ts # ⚙️ generated — re-run `pnpm codegen` after edits
│  │
│  ├─ models/
│  │  └─ auth-token/             # CRUD wrapper for AuthToken (Prisma)
│  │     ├─ index.ts             # AuthToken interface
│  │     └─ manager.ts           # AuthTokenManager.{get,put,delete}
│  │
│  └─ widget/                    # Storefront bundle source (compiled to public/widget.js)
│     ├─ index.js                # Entry: detects preview vs prod, attaches events, observer
│     ├─ events.js               # Click/scroll handlers
│     ├─ icons.js                # Backward-compatible icon API re-export
│     ├─ icons/                  # Review/rating + filter icon registries
│     │  ├─ index.js             # Public icon API for runtime + admin preview
│     │  ├─ review-icons.js      # Review/rating filled + empty SVG pairs
│     │  └─ filter-icons.js      # Filter button SVG registry
│     ├─ observer.js             # MutationObserver — handles SPA-style theme nav
│     ├─ core/
│     │  ├─ badge.js
│     │  ├─ cache.js
│     │  ├─ config.js            # PUBLIC_API_KEY + ASSET_BASE + API_BASE + READ_API_BASE
│     │  ├─ origins.js           # Script asset origin + explicit API origin normalization
│     │  ├─ fetch.js
│     │  ├─ helpers.js
│     │  ├─ product-title.js     # Heuristic: locate product title in arbitrary themes
│     │  ├─ rating-summary.js    # Shared one-product approved rating summary fetch/cache
│     │  └─ state.js             # Module-level mutable state (current product, settings, etc.)
│     ├─ listing-badges/         # Inject ★ badges into product cards on listing pages
│     ├─ rating-badge/           # PDP title badge surface entry + DOM injection
│     ├─ structured-data/        # Product AggregateRating JSON-LD surface
│     ├─ reviews-section/
│     │  ├─ bootstrap.js
│     │  ├─ render.js
│     │  ├─ styles.js           # CLASSIC_CSS aggregator for shared review-section CSS
│     │  ├─ styles/             # base / summary-controls / review-primitives / media-gallery / lightbox CSS
│     │  ├─ review-form-modal/   # Multi-step submission wizard
│     │  └─ review-modal.js
│     ├─ review-layouts/         # card / gallery / list (each with index.js + styles.js)
│     ├─ shared/                 # Cross-widget utilities — bundle-wide contracts
│     │  ├─ base-reset.js        # Tap-highlight off + :active feedback + utility classes (ADR_0011)
│     │  └─ input-modality.js    # wasLastInputKeyboard() — global last-input-modality tracker
│     ├─ summary-layouts/        # classic / compact / hero / minimal / split / shared
│     └─ themes/
│        └─ ozy/                 # Ozy selector adapter + optional style override placeholder
│
└─ docs/
   └─ wiki/                      # 👈 This wiki (project memory)
```

## Notes
- Two route groups: default and `(preview)`. The `(preview)` group exists so `/preview` skips the root `layout.tsx` (which has dashboard chrome) and serves a clean iframe HTML.
- `src/widget/` uses **plain JavaScript (.js)**, not TypeScript, because the bundle is shipped to third-party storefronts and esbuild builds it independently from the Next.js TS pipeline. Don't migrate it to TS without thinking about output size and bundling impact.
- `public/widget.js` is committed to the repo so deploys ship it without a build step on the Vercel pipeline. Build script must be re-run after any `src/widget/*` change.
- `widgetDefs.ts` (admin) and `widget-settings.ts` (server) share schema; widget.js receives the same settings via `/api/public/settings`. Don't duplicate — derive.
- `src/widget/icons/` is the current icon source of truth. Import new code from [src/widget/icons/index.js](src/widget/icons/index.js); [src/widget/icons.js](src/widget/icons.js) exists only as a compatibility re-export.
- `review-images.ts` is the server-side source of truth for trusted review image URLs. Widget helper logic in `src/widget/core/helpers.js` mirrors this contract for storefront defense in depth.
- **Theme adapter note**: runtime theme selection is through public settings (`runtime.themeAdapterKey/source`) and `src/widget/themes/current-adapter.js`, not per-theme bundle URLs. `src/widget/reviews-section/styles.js` is the `CLASSIC_CSS` aggregator for shared review-section CSS, with ownership modules under `src/widget/reviews-section/styles/`; `src/widget/themes/ozy/styles.js` is only a compatibility re-export / future Ozy-specific override placeholder. The older `--theme=new-theme` build alias still exists, but it is not the current adapter model. See [[Theme_Adapter_Playbook]].
- **Worker delivery note**: `workers/widget-delivery/`, `wrangler.widget.jsonc`, and `scripts/prepare-widget-worker-assets.mjs` are the Cloudflare Worker Static Assets delivery pieces for the storefront widget. They deploy only generated widget files prepared under `.tmp/widget-worker-assets`; do not deploy the full `public/` tree.

## Obsidian Links
- [[Important_Files]]
- [[Project_Index]]
- [[Frontend_Map]]
- [[Backend_API_Map]]
- [[Widget_Files_Map]]

## Change Log
- 2026-06-28: Added the Cloudflare Worker V2 public-read boundary to the folder structure notes.
- 2026-06-28: Added the Cloudflare Worker widget delivery source bucket and its asset/static boundary to the folder structure notes.
- 2026-06-01: Split shared review-section CSS ownership under `src/widget/reviews-section/styles/` while preserving `src/widget/reviews-section/styles.js` as the stable `CLASSIC_CSS` aggregator.
- 2026-05-28: Renamed the review-section runtime folder to `src/widget/reviews-section/` and moved the shared PDP title finder to `src/widget/core/product-title.js`.
- 2026-05-12: Split the widget icon registry into `src/widget/icons/` modules and kept [src/widget/icons.js](src/widget/icons.js) as a compatibility re-export.
- 2026-05-12: Added `src/widget/shared/` directory with `base-reset.js` and `input-modality.js` — bundle-wide widget utilities introduced by [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]].
- 2026-05-10: Added [src/lib/review-images.ts](src/lib/review-images.ts) to the source tree map after introducing the trusted review image URL policy.
- 2026-05-05: Removed the legacy `src/widget/reviews-section/review-form.js` entry from the structure map because review submission is now modal-only.
