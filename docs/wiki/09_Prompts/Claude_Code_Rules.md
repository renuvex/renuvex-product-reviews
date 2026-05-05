---
type: prompt
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - prompts
  - claude-code
related:
  - "[[Index]]"
  - "[[Master_Project_Prompt]]"
---

# Claude Code Rules

> Concrete operating rules for Claude Code in this repo. The full set is encoded in the project root [`CLAUDE.md`](CLAUDE.md). This page is a human-readable summary plus extra notes that don't belong in CLAUDE.md.
>
> **For canonical pre-existing rules** (Ruler-generated `CLAUDE.md` / `AGENTS.md` / `.cursor/rules/*` and ikas CLI config), see [[Existing_AI_Rules_And_Ikas_CLI_Instructions]] — those rules take precedence over anything written here if they conflict.

## Read-before-write
Always read the wiki first:
1. `docs/wiki/Index.md`
2. `docs/wiki/01_Project/Current_Status.md`
3. The relevant `02_Codebase_Map/*` and `03_Architecture/*` pages
4. Any related ADRs in `04_Decisions/`

## Two modes
- **INGEST / DOCUMENT** — only `docs/wiki/*` and root `CLAUDE.md` get edited. No source code changes.
- **DEVELOPMENT** — code changes allowed. Wiki updates **mandatory** after meaningful changes.

## After meaningful code changes
- Architecture changed → new ADR in `04_Decisions/`
- File structure changed → update `02_Codebase_Map/Folder_Structure.md` + `Important_Files.md`
- Bug fixed → entry in `05_Bugs_And_Fixes/`
- Status changed → update `01_Project/Current_Status.md`
- New uncertainty → entry in `01_Project/Open_Questions.md`

## Wiki update logging
For each wiki page you edit because of a meaningful change:
- **Bump the frontmatter `updated: YYYY-MM-DD`** to today's date.
- If the change is important enough to preserve as historical memory (architecture / behavior / features / API / DB / widgets / ikas integration / bugs / status), add a short entry under a `## Change Log` section at the bottom of the page. Create the section if it's missing.
- Entry includes: date, short summary, related source files (if any), related ADR / bug / feature note (if any).
- Skip changelog entries for tiny visual-only edits, copy tweaks, formatting-only changes, or low-impact refactors.
- Keep entries short and factual. Don't fabricate history.
- If unsure whether a wiki update is needed, explain the judgment in the response — don't update unnecessary files.

## Don't
- Touch `public/widget.js` by hand
- Forget `pnpm build:widget` after `src/widget/*` changes
- Forget `pnpm codegen` after `graphql-requests.ts` changes
- Bypass `validateSettings` / `sanitizeSettings`
- Write inline GraphQL strings — always import from `graphql-requests.ts`
- Call ikas APIs from the browser — always go through server routes
- Skip `AppBridgeHelper.closeLoader()` on iframe pages
- Skip `<Suspense>` around `useSearchParams()` (Next.js requirement)
- Log secrets or write env values to docs
- Silently overwrite ADRs — supersede with a new one instead

## Commits
Conventional Commits — `<type>(<scope>): <summary>` (max 72 chars, imperative). Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

## Investigation order for "widget doesn't show on theme X"
1. Was the script actually injected? Check `StoreSettings.storefrontScripts`.
2. Did `bootstrap.js` detect the product? Add log.
3. Did `title-finder.js` find an anchor? Add log.

## Investigation order for token-related bugs
1. Is `AuthToken` row present for the merchant?
2. Is `expireDate` past? `onCheckToken` should refresh — log it.
3. Is `CLIENT_SECRET` set in env? JWT empty-key fallback is a real risk.

## Tools
- shadcn MCP for new UI primitives → `src/components/ui/*`
- ikas MCP (`mcp__ikas__list` / `mcp__ikas__introspect`) BEFORE adding ikas GraphQL operations
- `pnpm prisma:studio` for ad-hoc DB inspection

## Obsidian Links
- [[Master_Project_Prompt]]
- [[Codex_Rules]]
- [[Documentation_Update_Prompt]]
- [[Existing_AI_Rules_And_Ikas_CLI_Instructions]]

## Change Log
- **2026-05-05** — Added "Wiki update logging" section requiring `updated: YYYY-MM-DD` frontmatter bump on meaningful wiki edits and `## Change Log` entries for memory-worthy changes. Mirrors the canonical rule in `/AGENTS.md`. Related: [[Existing_AI_Rules_And_Ikas_CLI_Instructions]], [[Documentation_Update_Prompt]].
