---
type: codebase
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-12
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

## Tree (annotated)

```
yorum-paneli/
├─ .env.example                  # Required env contract — never document real values
├─ ikas.config.json              # ikas dev tooling (port, oauth redirect path)
├─ next.config.js                # Next.js config
├─ package.json                  # pnpm scripts + deps
├─ tsconfig.json
├─ vercel.json                   # region: fra1, weekly cleanup-images cron
├─ components.json               # shadcn/ui config
├─ eslint.config.mjs
├─ postcss.config.mjs
├─ pnpm-lock.yaml
├─ README.md                     # Public dev README
├─ @types/                       # Local ambient TS types
│
├─ prisma/
│  ├─ schema.prisma              # 4 models: AuthToken, Review, StoreSettings, WidgetSettings
│  └─ migrations/                # 29+ migrations, 2026-03 → 2026-05; iterative widget settings churn
│
├─ public/
│  ├─ widget.js                  # ✅ BUILT artifact (esbuild) — do NOT hand-edit
│  ├─ ikr-test.js                # Local test harness for widget
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
│  │  ├─ callback/page.tsx       # Receives JWT from server, stashes in sessionStorage, redirects
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
│  │  ├─ jwt-helpers.ts          # JwtHelpers.createToken/verifyToken (HS256, 4h)
│  │  └─ token-helpers.ts        # AppBridge token, validateCodeSignature (HMAC-SHA256)
│  │
│  ├─ lib/
│  │  ├─ api-requests.ts         # Frontend → backend bridge (axios)
│  │  ├─ auth-helpers.ts         # getUserFromRequest() — extract JWT
│  │  ├─ cors.ts                 # withCors / corsOptions — wide-open for /api/public/*
│  │  ├─ design-tokens.ts        # Color tokens shared admin/widget
│  │  ├─ prisma.ts               # Prisma singleton
│  │  ├─ review-images.ts        # Trusted review image URL policy (Cloudinary allowlist)
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
│     ├─ icons.js                # SVG icon registry (also imported by widgetDefs.ts)
│     ├─ observer.js             # MutationObserver — handles SPA-style theme nav
│     ├─ core/
│     │  ├─ badge.js
│     │  ├─ cache.js
│     │  ├─ config.js            # PUBLIC_API_KEY + API_BASE from <script src=...>
│     │  ├─ fetch.js
│     │  ├─ helpers.js
│     │  └─ state.js             # Module-level mutable state (current product, settings, etc.)
│     ├─ listing-badges/         # Inject ★ badges into product cards on listing pages
│     ├─ product-widget/
│     │  ├─ bootstrap.js
│     │  ├─ rating-badge.js
│     │  ├─ render.js
│     │  ├─ review-form-modal/   # Multi-step submission wizard
│     │  ├─ review-modal.js
│     │  └─ title-finder.js      # Heuristic: locate product title in arbitrary themes
│     ├─ review-layouts/         # card / gallery / list (each with index.js + styles.js)
│     ├─ shared/                 # Cross-widget utilities — bundle-wide contracts
│     │  ├─ base-reset.js        # Tap-highlight off + :active feedback + utility classes (ADR_0011)
│     │  └─ input-modality.js    # wasLastInputKeyboard() — global last-input-modality tracker
│     ├─ summary-layouts/        # classic / compact / hero / minimal / split / shared
│     └─ themes/
│        └─ ozy/                 # Default theme — styles.js + theme.js
│
└─ docs/
   └─ wiki/                      # 👈 This wiki (project memory)
```

## Notes
- Two route groups: default and `(preview)`. The `(preview)` group exists so `/preview` skips the root `layout.tsx` (which has dashboard chrome) and serves a clean iframe HTML.
- `src/widget/` uses **plain JavaScript (.js)**, not TypeScript, because the bundle is shipped to third-party storefronts and esbuild builds it independently from the Next.js TS pipeline. Don't migrate it to TS without thinking about output size and bundling impact.
- `public/widget.js` is committed to the repo so deploys ship it without a build step on the Vercel pipeline. Build script must be re-run after any `src/widget/*` change.
- `widgetDefs.ts` (admin) and `widget-settings.ts` (server) share schema; widget.js receives the same settings via `/api/public/settings`. Don't duplicate — derive.
- `review-images.ts` is the server-side source of truth for trusted review image URLs. Widget helper logic in `src/widget/core/helpers.js` mirrors this contract for storefront defense in depth.
- **Theme directory naming quirk**: only `src/widget/themes/ozy/` exists today. The build script ([scripts/build-widget.mjs](scripts/build-widget.mjs)) accepts `--theme=default` (no aliasing — uses direct imports from `themes/ozy/...`) or `--theme=new-theme` (aliases `themes/ozy/styles.js` → `themes/new-theme/styles.js`). The `themes/new-theme/` folder does **not** currently exist, so `pnpm build:widget --theme=new-theme` would fail. The Turkish `.proje-dokuman.md` references both `default/` and `new-theme/` directories that don't match the actual filesystem — that doc is partially stale on this point. Tracked in [[Open_Questions]].

## Obsidian Links
- [[Important_Files]]
- [[Project_Index]]
- [[Frontend_Map]]
- [[Backend_API_Map]]
- [[Widget_Files_Map]]

## Change Log
- 2026-05-12: Added `src/widget/shared/` directory with `base-reset.js` and `input-modality.js` — bundle-wide widget utilities introduced by [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]].
- 2026-05-10: Added [src/lib/review-images.ts](src/lib/review-images.ts) to the source tree map after introducing the trusted review image URL policy.
- 2026-05-05: Removed the legacy `src/widget/product-widget/review-form.js` entry from the structure map because review submission is now modal-only.
