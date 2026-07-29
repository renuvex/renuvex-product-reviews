<!-- Source: AGENTS.md -->

# Project Rules for Ikas App Starter App (Next.js)

## Core Principles
- Prefer simplicity, readability, explicitness. Keep logic in small, testable functions.
- TypeScript strict; avoid any. Use precise types from generated GraphQL.
- Treat API tokens and secrets as sensitive; never log them.

## Destructive Actions — Stop and Confirm
- Before running any irreversible/destructive action, STOP, state the exact command and why it is risky, and get explicit confirmation in chat first. Do not run it silently.
- Covers (non-exhaustive): `wrangler deploy` / `delete` / `rollback` / `secret put|delete`, `wrangler r2|kv|d1 ... delete` and `wrangler d1 execute`, `git push --force`, `git reset --hard`, `git clean -f`, `rm -rf`, `prisma migrate reset`, `prisma db push`, `supabase db reset`, SQL `DROP`/`TRUNCATE`, `vercel deploy`/`env`, and destructive MCP tools (mux delete/cancel, Supabase write/migration/branch ops, Vercel deploy).
- Catastrophic, never-automated ops (`rm -rf /` or `~`, `--no-preserve-root`, fork bombs) must NOT be run at all — ask the user to perform them manually.
- This rule is the cross-agent guardrail; `.claude/settings.json` also denies the catastrophic `rm -rf` patterns as a hard backstop in Claude Code.

## Stack Overview
- Next.js 16.2.1 App Router, React 19, TypeScript, Tailwind + shadcn/ui.
- ikas Admin GraphQL via `@ikas/admin-api-client` with codegen.
- Session via `iron-session`.

## MCP Usage
- When generating new UI components, use the "shadcn" MCP to fetch component boilerplates and demos. Align with existing `src/components/ui/*` structure.
- When generating or exploring ikas GraphQL operations, use the "ikas" MCP list and introspect tools to discover available queries/mutations and their shapes before implementation.
  - For ikas GraphQL specifically, follow this order before any implementation:
    1) Use the "ikas" MCP list tool to find the correct query/mutation name.
    2) Use the "ikas" MCP introspect tool to get the operation's full shape (variables, return fields, enums).
    3) Only after confirming via list + introspect, add the document to `graphql-requests.ts` and run codegen.

## GraphQL and API Workflow
- Define queries/mutations in `src/lib/ikas-client/graphql-requests.ts` using `gql`.
- Run `pnpm codegen` to regenerate `src/lib/ikas-client/generated/graphql.ts` types and client wrappers.
- Acquire a client with `getIkas(token)` from `src/helpers/api-helpers.ts`.
- Execute queries via `ikasClient.queries.<name>()` and mutations via `ikasClient.mutations.<name>(variables)`.

## Enforcement
- Do NOT write inline GraphQL strings inside API routes or components.
- Always import documents from `graphql-requests.ts` and run `pnpm codegen` before usage.
- Always call ikas operations through `ikasClient.queries|mutations.<operation>()` to keep type-safety.
- Before adding a new operation, first run the ikas MCP list tool, then introspect to confirm details.

## Adding New API Requests (Procedure)
1) Discover operation via MCP: run ikas list to locate the operation, then ikas introspect to confirm its schema.
2) Add your GraphQL query/mutation to `src/lib/ikas-client/graphql-requests.ts` using the `gql` tag.
3) Run `pnpm codegen` to generate types and update the generated client.
4) Use `getIkas` to create the ikas client inside API routes or server actions.
5) For a query, call `ikasClient.queries.<YourQuery>()`; for a mutation, call `ikasClient.mutations.<YourMutation>(variables)`.

## Project Conventions
- JWT-gated admin/ikas routes must use `authenticateIkasAdminRequest()`.
  Do not decode claims or fetch `AuthToken` independently: the shared boundary
  verifies HS256 claims, the active installation generation, and the exact
  `(authorizedAppId, merchantId)` OAuth token pair.
- Do not call ikas APIs from the browser; always go through server routes.
- Keep UI logic in components under `src/components/*`; avoid business logic in pages.

## Database Migrations
- `prisma migrate deploy` runs during the Vercel build, while the previous deployment still serves traffic — the new schema and old code overlap for ~1-3 min, so a migration must not break the old code.
- **Additive** changes (new table, nullable column, column with default, new index) are backwards-compatible — one deploy is safe.
- **Breaking** changes (drop/rename a column or table, add `NOT NULL` without default, narrow a type, add a unique constraint) must use **expand/contract**: deploy 1 makes the code work without the old shape; deploy 2 applies the destructive migration.
- Never `prisma db push` against production. Detail: `docs/wiki/02_Codebase_Map/Database_Map.md` ("Migration safety").

## Iframe Pages and Authentication Pattern
When building pages that will be loaded in iframes within the ikas dashboard (e.g., app actions, dashboard widgets):

### Client-Side Pattern (Frontend)
1. **Always call `AppBridgeHelper.closeLoader()`** in a separate `useEffect` with empty dependency array on page mount to close the ikas platform loading indicator.
2. **Always use `TokenHelpers.getTokenForIframeApp()`** to retrieve the JWT authentication token from the ikas app bridge.
3. **Never make direct API calls** to ikas from the frontend. Always go through backend API routes.
4. **Use `ApiRequests` helper** to call backend endpoints with the token.
5. **Follow the dashboard page pattern**: Initialize token on mount, fetch data with token, handle loading/error states.

### Example Pattern:
```typescript
import { TokenHelpers } from '@/helpers/token-helpers';
import { ApiRequests } from '@/lib/api-requests';
import { AppBridgeHelper } from '@ikas/app-helpers';

function MyIframePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (token: string) => {
    const res = await ApiRequests.ikas.getData(token);
    if (res.status === 200 && res.data?.data) {
      setData(res.data.data);
    }
    setLoading(false);
  }, []);

  const initializePage = useCallback(async () => {
    const token = await TokenHelpers.getTokenForIframeApp();
    if (token) {
      await fetchData(token);
    }
  }, [fetchData]);

  // Close the loader shown by ikas platform when opening the iframe
  useEffect(() => {
    AppBridgeHelper.closeLoader();
  }, []);

  useEffect(() => {
    initializePage();
  }, [initializePage]);

  // ... render UI
}
```

### Server-Side Pattern (Backend API)
1. **Create API endpoint under `/api/ikas/*`** for ikas-related operations.
2. **Authenticate the active installation** with `await authenticateIkasAdminRequest(request)`.
3. **Use the returned exact OAuth token**; never perform a second app-only token lookup.
4. **Call ikas API** using `getIkas(authToken)` and verify tenant identity in provider responses where available.
5. **Fence final local writes** with `requireActiveIkasStoreInstallationFence()` after provider work.
6. **Return data in standard format**: `{ data: { ...yourData } }`.

### Example Pattern:
```typescript
export async function GET(request: NextRequest) {
  const auth = await authenticateIkasAdminRequest(request);
  if (!auth.ok) return ikasAdminAuthenticationResponse(auth);
  const { principal, authToken } = auth.context;

  const ikasClient = getIkas(authToken);
  const response = await ikasClient.queries.someQuery();

  if (response.isSuccess && response.data) {
    return NextResponse.json({ data: { ...response.data } });
  }
  return NextResponse.json({ error: 'Failed' }, { status: 500 });
}
```

### Adding New Iframe Endpoints
1. **Create backend API** in `/api/ikas/<endpoint-name>/route.ts`.
2. **Add to ApiRequests** in `src/lib/api-requests.ts`:
   ```typescript
   yourEndpoint: (token: string, params?) => makeGetRequest<YourResponse>({ url: '/api/ikas/your-endpoint', token, data: params })
   ```
3. **Use in frontend** via `ApiRequests.ikas.yourEndpoint(token, params)`.

### Important Rules
- **ALWAYS** call `AppBridgeHelper.closeLoader()` in a `useEffect(() => { AppBridgeHelper.closeLoader(); }, [])` when the iframe page mounts to close the platform loading indicator.
- **NEVER** bypass the token flow by hardcoding tokens or using environment variables for user authentication.
- **ALWAYS** wrap `useSearchParams()` usage in a `<Suspense>` boundary (Next.js 16 requirement).
- **ALWAYS** follow the established pattern: AppBridgeHelper.closeLoader() → TokenHelpers → ApiRequests → Backend API → ikas Client.
- **ALWAYS** handle loading and error states gracefully in iframe pages.

## Security and Privacy
- Use `onCheckToken` in `getIkas` to auto-refresh tokens. Do not expose tokens in responses or logs.
- TokenHelpers automatically caches tokens in sessionStorage with expiration validation.
- JWT tokens contain `authorizedAppId` (aud) and `merchantId` (sub) for user identification.
- Admin JWT verification accepts only `Authorization: JWT <compact-token>` and
  `HS256`, requires scalar `aud`/`sub` plus numeric `exp`/`iat`, and then
  resolves an exact active installation/token pair. Missing `CLIENT_SECRET`
  is a fail-closed configuration error; never restore empty-secret fallback.
- Development identity bypass requires both dev identifiers and bypasses only
  cryptographic verification. It never bypasses active installation/token
  lookup.
- **OAuth Callback State and Signature Validation**:
  - OAuth `state` is mandatory and is the login-CSRF boundary.
  - When ikas supplies a `signature`, use `TokenHelpers.validateCodeSignature(code, signature, clientSecret)` before state consumption. Do not make it mandatory without a separately verified provider-contract decision.
  - OAuth `state` validation is mandatory. Issue a cryptographically random,
    browser-bound, short-lived transaction through `src/lib/oauth-state.ts`
    and consume it atomically before token exchange. Never exchange a code from
    a callback without state. The only allowed dashboard compatibility path is
    to discard that code, claim one bounded browser/store bootstrap marker, and
    restart authorization; repeated missing-state callbacks fail closed.

## Quality Gates
- Run `pnpm codegen` when `graphql-requests.ts` changes.
- Use `pnpm build:ci` for CI or local migration-free application builds. Do not
  run `pnpm build` in CI: it is the Vercel deployment contract and includes
  `prisma migrate deploy` plus the live installation-auth verifier.
- Database contract jobs must use disposable local PostgreSQL only. Never point
  `DATABASE_URL` or `REVIEW_EMAIL_INTEGRATION_DATABASE_URL` at production.
- Generated Ikas and widget outputs must pass `pnpm codegen:check` and
  `pnpm build:widget:ci` without tracked or untracked drift.
- Ensure type-safety and linter cleanliness before committing.
- Reject PRs that introduce raw GraphQL usage outside `graphql-requests.ts`.
- Keep naming consistent with `ikas` brand and command patterns.

## Test Organization
- Widget tests are intentionally broad because storefront behavior spans Shadow DOM, SPA navigation, media upload, Mux playback, lazy hydration, and accessibility.
- Do not keep appending unrelated scenarios to large smoke files. When adding a new behavior area, prefer a focused spec file and shared helpers.
- Existing large smoke specs may be extended only when the new assertion belongs to the same scenario family.

## Widget Runtime Build Artifacts
- `public/widget-runtime/build-manifest.json` is the canonical live output map for the current widget runtime build.
- `scripts/build-widget.mjs` intentionally keeps old content-hashed `public/widget-runtime/runtime-*.js` and `public/widget-runtime/chunks/*.js` files for `RUNTIME_RETENTION_DAYS` so cached widget loaders do not 404 immediately after deploys.
- Do not delete tracked old runtime/chunk files as stale before checking `scripts/build-widget.mjs` and the current manifest.
- After `pnpm build:widget`, only clean untracked runtime/chunk files that are not referenced by the current manifest; keep manifest-referenced files.

## Notes
- Prefer `ApiRequests` in `src/lib/api-requests.ts` to bridge frontend to backend endpoints.

## Commit Message Rule
Use **Conventional Commits** format:

- **Format**: `<type>(<scope>): <short summary>`
- **Types**: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- **Scope**: optional, lowercase, represents the module / package / area
- **Summary**: imperative mood, max 72 chars

### Examples
- feat(cart): add discount code validation  
- fix(auth): prevent token refresh loop  
- docs(readme): update installation guide

<!-- SECOND_BRAIN_RULES_START -->
## Project Memory / Wiki Rules

- `/docs/wiki` is the project memory. Write project memory and wiki documentation in English by default.
- Keep this file short. Detailed procedures live in `/docs/wiki/09_Prompts/`.
  - Note: `/docs/wiki/09_Prompts/` is the canonical prompt folder for this project. Do not create `08_Prompts`.
- For large, ambiguous, or meaningful tasks, read:
  1. `AGENTS.md`
  2. `/docs/wiki/Hot_Context.md`
  3. `/docs/wiki/Index.md`
  4. only the relevant 2-5 wiki pages
  5. then the related source/config/test files.
- Source code is the source of truth. If the wiki conflicts with source files, configs, or runtime behavior, trust the source code and update the wiki.
- Wiki pages mentioning implementation details should point to focused `source_files` so future agents can verify them.
- Update wiki files only when useful for durable project memory. Do not update wiki for minor noise (tiny visual tweaks, formatting, low-impact refactors).
- Preserve ADRs, significant bug history, and problem-resolution notes. Large cleanup, archiving, or deleting requires user confirmation.
- Never document secrets, API keys, tokens, private credentials, or real env values.
- Wiki health checks: `node scripts/wiki-audit.mjs` (add `--changed-source-check` after meaningful source changes).
- Code and memory must evolve together. **If a meaningful code change was made but the relevant wiki files were not updated, the task is incomplete.**

Detailed procedures:
- `/docs/wiki/09_Prompts/Agent_Rules.md`
- `/docs/wiki/09_Prompts/New_Session_Start_Prompt.md`
- `/docs/wiki/09_Prompts/Documentation_Update_Prompt.md`
- `/docs/wiki/09_Prompts/Wiki_Maintenance_Prompt.md`
- `/docs/wiki/09_Prompts/Problem_Resolution_Prompt.md`
- `/docs/wiki/09_Prompts/IDE_Agent_Usage.md`
<!-- SECOND_BRAIN_RULES_END -->

## Stack reality vs. doc lag (note for agents)

Some pre-existing generated rules / docs may still say "Next.js 15"; `package.json` pins `next: 16.2.1`. The wiki and this file should use the actual version unless `package.json` changes.
