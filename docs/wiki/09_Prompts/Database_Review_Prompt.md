---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - prompts
  - database
related:
  - "[[Index]]"
  - "[[Database_Schema]]"
  - "[[Database_Map]]"
---

# Database Review Prompt

> Use before adding/changing a model, column, or index.

## Body

Change: <model + field/index + reason>

Before proposing:
1. Read `docs/wiki/03_Architecture/Database_Schema.md` for current shape.
2. Read `docs/wiki/02_Codebase_Map/Database_Map.md` for migration history themes.
3. Scan `prisma/migrations/*` filenames — has this been tried/reverted before?
4. Identify which queries change and check index coverage.

Output:
- Migration name + SQL preview (Prisma will generate; check it's safe under traffic).
- Code touchpoints (every reader of the affected fields).
- Backfill plan if needed.
- Rollback plan.
- Update `docs/wiki/03_Architecture/Database_Schema.md` after migration applied.

Hard rules:
- Migrations run on every Vercel deploy. Never include long-running statements without a plan.
- Don't add Postgres enums for status fields — use string literals (existing convention).
- `Review.images` stays TEXT-JSON for now — don't normalize without a feature reason ([[ADR_0003_Review_Data_Model]]).
- Never break existing JSON columns (`WidgetSettings.settings`, `StoreSettings.storefrontScripts`) — extend at app layer.

## Obsidian Links
- [[Database_Schema]]
- [[Database_Map]]
- [[ADR_0003_Review_Data_Model]]
