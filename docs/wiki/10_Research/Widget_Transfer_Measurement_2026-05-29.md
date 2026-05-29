---
type: research
project: renuvex-product-reviews
status: active
created: 2026-05-29
updated: 2026-05-29
last_verified: 2026-05-29
confidence: high
tags:
  - widget
  - performance
  - deployed-evidence
related:
  - "[[Widget_Performance]]"
  - "[[Test_Strategy]]"
  - "[[ADR_0024_Badge_Review_Surface_Separation]]"
source_files:
  - "scripts/measure-deployed-widget-network.mjs"
  - "tests/widget-network-smoke.spec.ts"
  - "src/widget/loader.js"
  - "src/widget/listing-badges/fallback-candidates.js"
  - "public/widget-runtime/build-manifest.json"
---

# Widget Transfer Measurement - 2026-05-29

## Summary
`pnpm measure:deployed-widget` measured deployed widget assets from `https://new-ikas-app.vercel.app` using a controlled Playwright harness. Merchant HTML and `/api/public/*` responses were mocked, so no production DB/admin settings were changed.

The measurement is evidence, not a CI byte budget. It proves the important ADR_0024 relative behavior:

- removing the explicit review mount skips the `render-*` chunk and `/api/public/reviews`,
- disabling the visual badge skips badge DOM. After the 2026-05-29 structured-data split, `/api/public/ratings` may still be called for JSON-LD when an explicit review section is visible,
- cache headers for content-hashed runtime/chunks are immutable.

## Command

```bash
pnpm measure:deployed-widget
```

Equivalent direct command:

```bash
node scripts/measure-deployed-widget-network.mjs
```

## Result

Measured at `2026-05-29T13:12:38.998Z`.

| Scenario | Scripts | Encoded bytes | Decoded bytes | API calls | Key chunks |
|---|---:|---:|---:|---|---|
| mount-present badge-on | 15 | 73472 | 232493 | settings:1, ratings:1, reviews:2, error:0 | `bootstrap-HJF7Q4SE.js`, `listing-badges-22AODA5U.js`, `rating-badge-S7YXDWCF.js`, `render-Z3MCWG6Z.js` |
| mount-absent badge-on | 14 | 33305 | 76434 | settings:1, ratings:1, reviews:0, error:0 | `bootstrap-HJF7Q4SE.js`, `listing-badges-22AODA5U.js`, `rating-badge-S7YXDWCF.js` |
| mount-present badge-off | 15 | 73474 | 232493 | settings:1, ratings:0, reviews:2, error:0 | `bootstrap-HJF7Q4SE.js`, `listing-badges-22AODA5U.js`, `rating-badge-S7YXDWCF.js`, `render-Z3MCWG6Z.js` |
| mount-absent badge-off | 14 | 33298 | 76434 | settings:1, ratings:0, reviews:0, error:0 | `bootstrap-HJF7Q4SE.js`, `listing-badges-22AODA5U.js`, `rating-badge-S7YXDWCF.js` |

## Interpretation

- `render-Z3MCWG6Z.js` is present only when the explicit review mount exists. This is the intended review-section lazy boundary.
- `/api/public/reviews` is called only when the explicit review mount exists. Photo strip and review fetches remain review-section concerns.
- This captured result predates the structured-data split. In the new contract, `/api/public/ratings` is still skipped when badge is disabled and the review mount is absent, but badge-disabled + review-mounted PDPs call ratings once so the structured-data surface can emit JSON-LD.
- JSON-LD is emitted on eligible visible rating/review paths with a rating summary, not only on visual-badge-enabled paths.
- `widget.js` used `Cache-Control: public, max-age=300, must-revalidate`.
- Content-hashed runtime/chunks used `Cache-Control: public, max-age=31536000, immutable`.

## Observation

The controlled PDP still loaded `listing-badges-22AODA5U.js` in all four scenarios. This is not the legacy 2-second fallback timer; the fallback timer is now covered by deterministic negative/positive tests. This comes from the current deployed `PAGE_VIEW` surface path and should be treated as a separate future page-type routing optimization if the team wants clean PDPs to avoid the listing entry chunk entirely.

## Next Measurement

Re-run this command after any runtime-affecting widget deploy and append a new dated research note if the script count, chunk topology, or transfer size changes materially.
