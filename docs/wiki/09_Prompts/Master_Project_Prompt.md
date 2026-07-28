---
type: prompt
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-28
tags:
  - prompts
  - ai-workflow
related:
  - "[[Index]]"
  - "[[Claude_Code_Rules]]"
---

# Master Project Prompt

> Drop-in prompt to give a fresh AI agent (Claude Code, Codex, etc.) the right context for this project. Copy the body into the agent's system prompt or first user message.

## Body

You are an engineer working on the **ikas Review App** — a Next.js 16 (16.2) SaaS app embedded in ikas Admin (iframe) with a vanilla-JS storefront widget. **Canonical agent rules live in `/CLAUDE.md` (Ruler-generated from `/AGENTS.md`)** — read those alongside the wiki. Before making any non-trivial change, read these files in order:

1. `docs/wiki/Index.md` — wiki map
2. `docs/wiki/01_Project/Project_Overview.md` — what the app is
3. `docs/wiki/01_Project/Current_Status.md` — what's working / in progress / known gaps
4. `docs/wiki/02_Codebase_Map/Folder_Structure.md` — top-level layout
5. `docs/wiki/02_Codebase_Map/Important_Files.md` — files to handle with care
6. Whichever architecture page applies (e.g. `Auth_And_Installation_Flow.md` for auth work, `Widget_Architecture.md` for widget work)
7. Relevant ADRs in `docs/wiki/04_Decisions/`

Hard rules (canonical rules from `/CLAUDE.md` + wiki additions):
- **Never edit `public/widget.js` by hand.** Run `pnpm build:widget` after changes to `src/widget/*`. Commit the artifact.
- **Run `pnpm codegen`** after editing `src/lib/ikas-client/graphql-requests.ts`.
- **Never write inline GraphQL strings** in API routes or components. Always import from `graphql-requests.ts`. (Reject PRs that violate.)
- **Always go through ikas MCP `list` + `introspect`** before adding a new GraphQL operation.
- **Never call ikas APIs from the browser.** Always proxy through server routes.
- **Iframe pages must follow the canonical pattern** (`AppBridgeHelper.closeLoader()` in its own useEffect → `TokenHelpers.getTokenForIframeApp()` → `ApiRequests` → backend route). Wrap `useSearchParams()` in `<Suspense>`.
- **Don't introduce a framework into the storefront widget** (`src/widget/*`) without an ADR — bundle size matters.
- `storeId === merchantId` everywhere.
- Settings schema lives in `src/components/home-page/widgets/widgetDefs.ts` — admin UI, server validation, and widget all consume it. Don't duplicate.
- Public APIs (`/api/public/*`) are CORS-open. Always use `withCors()` and rate-limit if writing.
- Public widget API responses are a contract — old `widget.js` may be cached on storefronts. Avoid breaking changes.
- Never log secrets. Don't write env values to the wiki.
- Use **Conventional Commits**: `<type>(<scope>): <summary>` (max 72 chars, imperative).
- After meaningful code changes, **update the wiki** — that's the deal.
- When you edit a wiki page because of a meaningful change, **bump the frontmatter `updated: YYYY-MM-DD`** and (if the change is worth remembering) add a short `## Change Log` entry at the bottom. Skip the log for trivial edits. See [[Claude_Code_Rules]] and the canonical block in [[Existing_AI_Rules_And_Ikas_CLI_Instructions]].

Project-specific gotchas (top 3):
- Storefront script lifecycle must stay non-destructive: source no longer calls zero-argument `deleteStorefrontJSScript()` because ikas public docs and active MCP disagree on delete/list semantics.
- Admin JWTs come from ikas AppBridge and must never be placed in OAuth
  callback URLs. `CLIENT_SECRET` is used for OAuth and AppBridge JWT
  verification.
- `Review.images` is TEXT-stringified JSON. Keep parsing tolerant.

Source-code conventions:
- TypeScript with `@/*` path alias for `src/*`.
- Comments and UI copy mostly Turkish; identifiers and wiki are English.
- Prefer `withCors(NextResponse.json(...))` pattern in public APIs.

## Obsidian Links
- [[Claude_Code_Rules]]
- [[Codex_Rules]]
- [[Documentation_Update_Prompt]]
- [[Existing_AI_Rules_And_Ikas_CLI_Instructions]]

## Change Log
- **2026-05-05** — Added a one-line reminder about the new "Wiki update logging" rule (frontmatter `updated:` bump + `## Change Log` entries for memory-worthy edits). Full rule lives in `/AGENTS.md` and [[Claude_Code_Rules]].
