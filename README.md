# Renuvex Product Reviews

Renuvex Product Reviews is an ikas app that lets merchants collect, moderate,
and display product reviews. The project includes an ikas admin iframe app, a
public storefront widget, listing/PDP rating badges, review image handling, and
script lifecycle reconciliation for ikas `StorefrontJSScript` records.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Prisma and Supabase Postgres
- ikas Admin GraphQL with generated clients
- Tailwind CSS and shadcn/ui
- Cloudinary for review images
- Upstash Redis for public endpoint rate limits
- Sentry for server/widget error visibility

## Development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Build the storefront widget after editing `src/widget/**`:

```bash
pnpm build:widget
```

Run the main checks before shipping meaningful changes:

```bash
pnpm build:widget
node --check public/widget.js
pnpm exec tsc --noEmit
pnpm lint
node scripts/wiki-audit.mjs --changed-source-check
```

## Key Paths

- `src/app/api/**` - server routes for ikas/admin/public APIs
- `src/components/home-page/**` - merchant admin dashboard
- `src/lib/storefront-scripts.ts` - ikas storefront script reconciliation
- `src/lib/storefront-theme.ts` - active storefront theme detection state
- `src/widget/**` - public storefront widget runtime
- `public/widget.js` and `public/widget-runtime/**` - generated widget assets
- `docs/wiki/**` - project memory, ADRs, bug notes, and architecture maps

## Namespace Policy

Canonical public identity is app-specific, not brand-global:

- Brand: `Renuvex`
- App: `Product Reviews`
- Technical key: `product-reviews`
- DOM/CSS prefix: `renuvex-pr`
- ikas script name: `renuvex-product-reviews-widget`

Legacy `ikr-*`, `data-ikr-*`, and `IKR_*` aliases are kept during the expand
phase so cached widget assets and existing script records continue to work.
External service renames and legacy alias removal are separate contract-cleanup
phases.
