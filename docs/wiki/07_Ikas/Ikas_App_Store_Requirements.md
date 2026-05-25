---
type: ikas
project: renuvex-product-reviews
status: draft
created: 2026-05-05
updated: 2026-05-05
tags:
  - ikas
  - app-store
related:
  - "[[Index]]"
  - "[[Ikas_Platform_Notes]]"
---

# ikas App Store Requirements

## Summary
Checklist for App Store submission. **Currently a placeholder** — fill with verified requirements when preparing for submission.

## Likely required (verify in ikas Partners docs)
- App name, description, screenshots (Turkish + English)
- Privacy policy URL
- Support contact (email, ticket form)
- Pricing tiers and billing handled via ikas (or external billing if allowed)
- OAuth scope justification (we currently request broader scope than needed — narrow first)
- Uninstall webhook handling (cleanup of merchant data)

## Open questions (move to ADR / [[Open_Questions]] as decisions form)
- ❓ Does ikas require a sandbox/test merchant before publication?
- ❓ Is GDPR/data-deletion explicit endpoint required?
- ❓ Is uninstall webhook available, and what's the contract?
- ❓ App Store branding guidelines for icons and banners?

## TODO before submission
- Reduce OAuth scope to actually-needed (likely just `read_products` + script-injection grants if separate)
- Implement uninstall handler (clean up `AuthToken`, `StoreSettings`, optionally `Review` rows or anonymize)
- Privacy policy + Terms hosted on a stable URL
- App icon assets

## Obsidian Links
- [[Ikas_Platform_Notes]]
- [[Ikas_OAuth_Installation_Notes]]
- [[Open_Questions]]
