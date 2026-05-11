---
type: architecture
project: ikas-review-app
status: active
created: 2026-05-11
updated: 2026-05-11
tags:
  - sentry
  - observability
  - mcp
  - cli
related:
  - "[[Index]]"
  - "[[Deployment_Notes]]"
  - "[[Debugging_Notes]]"
---

# Sentry Operations

## Summary
Sentry is being added as the project observability surface for storefront widget and app runtime issues. The local Sentry CLI is installed and authenticated for the maintainer account, and the repo MCP config points Sentry MCP at the `mert-copper` organization.

## Libraries / Technologies
- Sentry MCP server: `https://mcp.sentry.dev/mcp/mert-copper`
- Sentry CLI npm package: `sentry`
- CLI config location: `C:\Users\mertw\.sentry\cli.db`

## Related Source Files
- [.mcp.json](.mcp.json)

## Obsidian Links
- [[Deployment_Notes]]
- [[Debugging_Notes]]
- [[Security_And_Rate_Limits]]

## Notes
- Authenticated CLI user: `mertworkspace2906@gmail.com`.
- Organization slug: `mert-copper`.
- `sentry auth status` reports authenticated and access verified for one organization.
- `sentry project list` currently returns no projects. Create or connect a Sentry project before using project-scoped MCP.
- Current MCP scope is organization-level because no project exists yet.
- Once a project exists, change `.mcp.json` from `https://mcp.sentry.dev/mcp/mert-copper` to `https://mcp.sentry.dev/mcp/mert-copper/<project-slug>` to reduce noise and set project defaults.
- Do not document full auth tokens. It is acceptable to document token presence, expiry, and config path, but never the token value.

## Change Log
- 2026-05-11: Added Sentry operations note after CLI authentication was verified and MCP was scoped to the `mert-copper` organization.
