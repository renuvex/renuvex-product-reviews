---
type: api
project: renuvex-product-reviews
status: draft
created: 2026-05-05
updated: 2026-07-04
last_verified: 2026-07-04
confidence: medium
tags:
  - template
  - api
related:
  - "[[Backend_API_Map]]"
source_files: []
---

# API — `<METHOD> /api/<path>`

## Agent Brief
Use this page when changing `<METHOD> /api/<path>`. Auth: <public/admin/internal>.
Verify first: `src/app/api/.../route.ts` and the shared helpers it imports. Do
not assume request/response shape, cache headers, rate limits, or side effects
without checking source and tests.

## Summary
One-line description.

## Auth
Public (CORS-open) | Admin (JWT) | Cron (Bearer) | OAuth

## Request

### Query / Path params
| Name | Type | Required | Description |
|---|---|---|---|

### Body (JSON)
```ts
{
  field: type,
  // ...
}
```

## Response

### Success
- Status: `200 | 201 | ...`
- Shape:
  ```ts
  { data: ... }
  ```

### Errors
- `400` — when?
- `401` — when?
- `404` — when?
- `429` — when?
- `500` — when?

## Caching / Rate limits
- Cache-Control: <header>
- Rate limit: <count> per <window> per <key>

## Validation
What's enforced (zod schema, manual checks, DB constraints).

## Side effects
What state changes. What async work it triggers.

## Related Source Files
- [src/app/api/.../route.ts](src/app/api/.../route.ts)

## Obsidian Links
- [[Backend_API_Map]]
- [[API_Design]]

---

> Copy into a relevant section (e.g., a future `03_Architecture/API_<area>.md`) and link from [[Backend_API_Map]].
