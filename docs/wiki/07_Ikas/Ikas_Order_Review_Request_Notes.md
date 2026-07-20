---
type: api
project: renuvex-product-reviews
status: active
created: 2026-07-09
updated: 2026-07-20
last_verified: 2026-07-20
confidence: high
tags:
  - ikas
  - orders
  - customers
  - review-request
  - email
  - webhooks
related:
  - "[[Ikas_API_Notes]]"
  - "[[ADR_0036_Review_Request_Email_Architecture]]"
  - "[[ADR_0004_Ikas_Integration_Strategy]]"
source_files:
  - "src/globals/config.ts"
  - "src/lib/ikas-client/graphql-requests.ts"
  - "src/lib/review-email/ikas-orders.ts"
  - "src/lib/review-email/ikas-send-preflight.ts"
  - "src/lib/review-email/batching.ts"
  - "src/lib/review-email/eligibility.ts"
  - "src/lib/review-email/batch-jobs.ts"
  - "src/app/api/webhooks/ikas/orders/route.ts"
  - "prisma/migrations/20260715120000_add_review_email_batch_envelope_v32/migration.sql"
  - "prisma/migrations/20260716120000_add_review_email_eligibility_cutoff/migration.sql"
  - "prisma/migrations/20260720120000_align_ikas_review_email_contracts/migration.sql"
---

# ikas Order Review Request Notes

## Agent Brief

Use this page for review-request consent, order delivery, package grouping,
manual orders, cancellation/refund invalidation, and reconciliation. It records
PII-free contract evidence from ikas developer answers received on 2026-07-09
and 2026-07-20, plus the MCP-introspected operations used by source. The
2026-07-20 answer supersedes earlier assumptions that the order-level
`notificationsAccepted` snapshot authorizes sending, that package ids are
durable group identities, or that `READY_FOR_PICK_UP` means a review request
may start.

Source remains authoritative. Re-run ikas MCP list and introspection before
adding or changing a GraphQL operation. Provider mutation and live acceptance
remain separate approval gates.

## Verified Customer Consent Contract

- `listOrder.customer` is an immutable order-creation snapshot.
  `notificationsAccepted` is historical context and does not change when the
  customer later changes communication preference.
- For an ADMIN/manual draft, the snapshot is captured at draft creation, not
  when `orderedAt` is later assigned. This explains why a newly completed manual
  order may retain `notificationsAccepted=false` even when the current customer
  is now subscribed.
- Non-transactional post-purchase communication must re-read the current
  customer through `listCustomer`. The accepted state is
  `subscriptionStatus=SUBSCRIBED`; `NOT_SUBSCRIBED` and
  `PENDING_CONFIRMATION` do not authorize a review-request email.
- Renuvex also requires the current customer to exist, not be deleted, and have
  an exact case-preserving canonical email equal to the order/batch recipient
  snapshot. A mismatch closes access rather than guessing which address is
  correct.
- The OAuth application therefore needs both `read_orders` and
  `read_customers`. Review email cannot be enabled without both scopes.
- The sender records only bounded consent evidence
  (`ikas_list_customer`, status, provider timestamps, checked-at), not a raw
  customer response. Evidence is fresh for at most 60 seconds; after that the
  preflight must be repeated.
- A transient customer API failure is retryable and is not converted into a
  consent denial. If an initial has not been sent, a definitive current denial
  closes that lifecycle. After an initial send, a later denial cancels the
  reminder while the existing review link retains its normal expiry. Missing,
  deleted, or recipient-mismatched customers revoke batch access.
- Turkish IYS and broader legal classification remain a separate
  privacy/legal production gate. The ikas field contract does not replace that
  review.

## Verified Delivery Contract

The canonical trigger is package plus line evidence, not an order-level
fallback:

| Shipping method | Package evidence | Line evidence | Review-request trigger |
|---|---|---|---|
| `SHIPMENT` | `orderPackageFulfillStatus=DELIVERED` | every included line is `DELIVERED` | actual delivery |
| `CLICK_AND_COLLECT` | package `DELIVERED` | included lines are `DELIVERED` | actual pickup, not `READY_FOR_PICK_UP` |
| `DIGITAL_DELIVERY` | package `DELIVERED` | included lines are `DELIVERED` | completed digital delivery |
| `NO_SHIPMENT` | package `DELIVERED` | included lines are `DELIVERED` | completed no-shipment fulfillment |
| ADMIN/manual | selected shipping method rules | same line rules | no source-specific branch |

- `orderPackageStatus` is a rollup such as `PARTIALLY_DELIVERED` or
  `DELIVERED`. It is useful for current-state context but does not replace
  package membership.
- `orderPackages[].orderPackageFulfillStatus` is package delivery source of
  truth. `orderPackages[].orderLineItemIds` defines the complete lines in that
  package.
- `OrderLineItem.statusUpdatedAt` is the last line status transition, not a
  status history. It is exact delivery evidence only while the current line
  status is `DELIVERED`.
- Renuvex stores the first observed delivered transition as immutable
  `IkasOrderLineSnapshot.firstDeliveredAt`. Later refund, return, or cancellation
  updates may overwrite ikas `statusUpdatedAt` but cannot overwrite this local
  evidence. Current eligibility still requires the current package and line to
  remain eligible; historical evidence alone never reopens a request.
- Package/order `updatedAt`, order `orderedAt`, webhook receipt time, and local
  processing time never create delivery eligibility. They remain discovery or
  current-state timestamps.
- `READY_FOR_PICK_UP` is only a pickup-ready signal. Review email waits until
  the package and lines become `DELIVERED`, whose exact line transition can be
  persisted.
- Missing package membership, multiple active packages claiming the same line,
  a non-delivered package/line, or missing exact line timestamp fails closed.

## Partial Delivery And Stable Grouping

- One package may contain many line ids. Quantity split across packages creates
  a new line item linked through `originalOrderLineItemId`; package membership
  does not contain a partial quantity value.
- Package cancellation/re-fulfillment creates a new package id. Package id is
  therefore audit data, not the durable batch key.
- The durable delivery-group key is a SHA-256 digest of canonical JSON
  containing the sorted unique package line-id set. Recreating a package with
  the same line set resolves to the same logical batch.
- One delivered package may create one physical initial sequence while another
  package remains pending. Twenty products split into two delivered 10-item
  packages therefore produce two batches, subject to the physical-email
  governor.
- Reviews remain product-scoped. Repeated quantities and variants of the same
  product dedupe to one request. When one product spans multiple package lines,
  every required line must be delivered; `eligibleAt` is the maximum immutable
  delivery timestamp and the request is assigned deterministically to the
  package line set containing that latest evidence.
- Regrouping is allowed before send commit. Grouping freezes at the provider
  call authorization boundary, so package churn cannot create a second initial
  for a request already in a physical send sequence.

## Cancellation, Refund, Editing, And Payment

- Cancellation, `REFUND_REQUESTED`, `REFUND_REQUEST_ACCEPTED`, return states,
  and `REFUNDED` close affected pending review-email work.
- `REFUND_REJECTED` and `CANCEL_REJECTED` do not automatically revive a closed
  lifecycle. A later explicit product decision would be required for re-open.
- Line-level refund transitions overwrite ikas `statusUpdatedAt`; this is why
  local immutable delivery evidence is required.
- A purely financial refund may leave line status unchanged. Current source
  follows product/line lifecycle evidence; future finance-only invalidation
  would require a separately verified product contract.
- Added or exchanged items receive new order line ids and their own lifecycle.
  Existing line ids remain stable.
- `WAITING + DELIVERED` is valid for manual, transfer, or cash-on-delivery
  orders. Only `orderPaymentStatus=FAILED` is a hard payment exclusion.

## Webhook And Reconciliation Contract

- `store/order/created` and `store/order/updated` are wake-up signals.
  Canonical decisions always re-read `listOrder`.
- Delivery, cancellation, refund, package changes, and order editing update the
  order-level `updatedAt`, so bounded `listOrder(updatedAt)` polling is the
  missed-webhook safety net.
- Reconciliation uses overlap, page/limit pagination (`limit<=200`), persisted
  cursor/lease fencing, and idempotent canonical processing. It is not clamped
  to review-email activation time: an order created before activation but
  delivered afterward must still be discoverable.
- Final cutoff is member-level. Only immutable first-delivery evidence at or
  after `eligibilityStartsAt` is eligible.
- Webhook ordering is not treated as guaranteed. The latest canonical document
  plus local immutable evidence wins.
- `store/app/deleted` remains the uninstall signal. Its provider-side
  registration and 24-hour erasure acceptance are separate production gates.

## Manual-Order Evidence

- MCP confirms `listOrder.createdBy` can identify an ADMIN fixture, but
  production code intentionally does not branch on source. A manual order uses
  the same shipping-method, package, line, current-customer, payment, cutoff,
  suppression, and installation rules.
- A 2026-07-16 development-store read verified an ADMIN SHIPMENT order with
  exact package-line membership, delivered package/line state, and exact line
  `statusUpdatedAt`. Its order snapshot retained
  `notificationsAccepted=false`; the 2026-07-20 ikas answer confirmed this can
  be expected because the order snapshot is historical.
- No staff, shipping, billing, or guessed email is used as a fallback.
- Real outbound manual-order delivery is still part of the future SES sandbox
  acceptance because no AWS sender exists in the current phase.

## Implementation And Rollout State

- Source now contains the canonical order reread, current-customer preflight,
  scope gate, immutable delivery evidence, stable package-line grouping,
  payment exclusion, DSR cleanup, and focused tests.
- The alignment migration is expand-only and does not infer historical delivery
  timestamps. Feature activation remains disabled until migration and scope
  health checks pass.
- Production migration, OAuth reauthorization where required, AWS sender/event
  infrastructure, SES sandbox acceptance, IYS/privacy/legal review, ikas native
  review-email conflict warning, and live merchant rollout remain separate
  approved gates.

## Obsidian Links

- [[Ikas_API_Notes]]
- [[ADR_0036_Review_Request_Email_Architecture]]
- [[ADR_0004_Ikas_Integration_Strategy]]
