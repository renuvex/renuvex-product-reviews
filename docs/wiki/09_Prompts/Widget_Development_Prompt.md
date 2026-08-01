---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - prompts
  - widget
related:
  - "[[Index]]"
  - "[[Widget_Architecture]]"
---

# Widget Development Prompt

> Use when working on storefront widget code (`src/widget/*` or related backend).

## Body

Goal: <one sentence>

Before coding:
1. Read `docs/wiki/03_Architecture/Widget_Architecture.md` — runtime model.
2. Read `docs/wiki/02_Codebase_Map/Widget_Files_Map.md` — module layout.
3. If touching settings: read `docs/wiki/08_Widgets/Widget_Customization.md`.
4. If touching listing badges: read `docs/wiki/08_Widgets/Listing_Rating_Widget.md`.
5. If touching rich snippets: read `docs/wiki/08_Widgets/Structured_Data_And_Rich_Snippets.md`.

Implementation rules:
- The widget is **plain JS** (no TypeScript, no React). Don't introduce a framework without an ADR.
- Settings come from [catalog.ts](src/lib/widgets/catalog.ts). If a new field is needed, add to schema first; UI and validation auto-derive.
- Layout meta (`supports`) drives which settings appear. New layouts must declare `supports`.
- After any `src/widget/*` change: run `pnpm build:widget`, commit `public/widget.js`.
- Test in `/preview` AND on a real ikas storefront — preview skips the mutation observer + theme integration.
- Bundle size matters. If a feature adds >5KB minified, mention it in the PR.

Output:
- Concrete diff plan, file by file.
- Edge cases for SPA-style theme nav.
- A note about whether settings schema needs updating.

## Obsidian Links
- [[Widget_Architecture]]
- [[Widget_Files_Map]]
- [[Widget_Customization]]
- [[Storefront_Widget_Overview]]
- [[Widget_Performance]]
