---
type: ikas
project: renuvex-product-reviews
status: draft
created: 2026-05-05
updated: 2026-07-08
tags:
  - ikas
  - app-store
related:
  - "[[Index]]"
  - "[[Ikas_Platform_Notes]]"
  - "[[Ikas_API_Notes]]"
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

## Billing / License Integration Note

Direct ikas developer feedback on 2026-07-08 says plan purchase webhooks and
`getMerchantLicence` serve different roles and should usually be used together:

- Webhook is the real-time push signal for plan purchase/subscription/payment
  events. It must be configured in the app configuration page.
- `getMerchantLicence` is the on-demand pull query for verifying the merchant's
  current license/app subscription state, recovering missed webhook events, and
  validating test purchases.
- Paid-plan enforcement should not rely on only one side. Target app flow:
  webhook event triggers local license update, then `getMerchantLicence`
  verifies current ikas state. Admin/app entry can also call
  `getMerchantLicence` as a safety check.

Current source has no billing webhook receiver and no `getMerchantLicence`
operation yet. Treat this as a pre-public/app-store implementation item, not as
current runtime behavior.

## Plan Test Purchase Workflow

Direct ikas developer feedback on 2026-07-08, with the referenced ikas Builders
plans guide reachable at
`https://builders.ikas.com/docs/app-development/admin-app/plans`, clarifies the
pre-review plan test path:

1. Create the plans to test from the app's plans page.
2. On the publication page, configure regions, plans, and store content, then
   save without submitting for review.
3. Add a development store under the allowed-stores page, creating one first if
   needed.
4. Install the app from that development store.
5. After install, use the app's manage-plan action to choose the plan under test.
6. Complete address/card entry. ikas does not require a real card in this test
   flow; arbitrary address/cardholder/card-number values are accepted as long as
   the card expiry month/year is syntactically valid and not expired.
7. Treat the test as successful only when the billing webhook is received and
   `getMerchantLicence` shows the expected license/subscription state.

Important constraint: this test path is only for the app developer's own app in
their allowed development store. Testing from another store is expected to fail.

## Open questions (move to ADR / [[Open_Questions]] as decisions form)
- ❓ Does ikas require a sandbox/test merchant before publication?
- ❓ Is GDPR/data-deletion explicit endpoint required?
- ❓ Is uninstall webhook available, and what's the contract?
- ❓ App Store branding guidelines for icons and banners?

## TODO before submission
- Reduce OAuth scope to actually-needed (likely just `read_products` + script-injection grants if separate)
- Implement ikas billing webhook receiver and `getMerchantLicence` verification
  for paid plan activation/status checks.
- Run the allowed development-store plan purchase workflow and record webhook +
  `getMerchantLicence` evidence before review submission.
- Implement uninstall handler (clean up `AuthToken`, `StoreSettings`, optionally `Review` rows or anonymize)
- Privacy policy + Terms hosted on a stable URL
- App icon assets

## Obsidian Links
- [[Ikas_Platform_Notes]]
- [[Ikas_OAuth_Installation_Notes]]
- [[Open_Questions]]
