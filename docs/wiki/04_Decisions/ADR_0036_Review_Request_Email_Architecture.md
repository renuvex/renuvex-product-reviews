---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-07-09
updated: 2026-07-28
last_verified: 2026-07-28
confidence: high
tags:
  - adr
  - email
  - review-request
  - ikas
  - aws-ses
  - aws-sqs
  - aws-lambda
  - eventbridge
  - qstash
related:
  - "[[Decision_Index]]"
  - "[[ADR_0004_Ikas_Integration_Strategy]]"
  - "[[ADR_0035_QStash_Scheduler_For_Maintenance]]"
  - "[[Ikas_API_Notes]]"
  - "[[Ikas_Order_Review_Request_Notes]]"
  - "[[Roadmap]]"
source_files:
  - "package.json"
  - ".env.example"
  - "infra/aws/review-images-runtime-iam.cloudformation.json"
  - "prisma/schema.prisma"
  - "prisma/migrations/20260710120000_add_review_request_email_lifecycle/migration.sql"
  - "prisma/migrations/20260710150000_harden_review_email_installation_lifecycle/migration.sql"
  - "prisma/migrations/20260710210000_add_review_email_retention_analytics_journal/migration.sql"
  - "prisma/migrations/20260715120000_add_review_email_batch_envelope_v32/migration.sql"
  - "prisma/migrations/20260716120000_add_review_email_eligibility_cutoff/migration.sql"
  - "prisma/migrations/20260720120000_align_ikas_review_email_contracts/migration.sql"
  - "config/review-email-copy-register.json"
  - "infra/aws/review-email-deployment-access.cloudformation.json"
  - "infra/aws/review-email-foundation.stack-policy.json"
  - "scripts/verify-review-email-deployment-access-live.mjs"
  - "scripts/lib/review-email-cloudformation-contract.mjs"
  - "scripts/test-review-email-cloudformation-contract.mjs"
  - "scripts/simulate-review-email-deployment-access-policy.mjs"
  - "scripts/validate-review-email-aws-policies.mjs"
  - "scripts/create-review-email-access-hardening-change-set.mjs"
  - "scripts/verify-review-email-access-hardening-change-set.mjs"
  - "scripts/create-review-email-foundation-change-set.mjs"
  - "scripts/verify-review-email-foundation-change-set.mjs"
  - "scripts/set-review-email-foundation-execution-approval.mjs"
  - "scripts/execute-review-email-foundation-change-set.mjs"
  - "scripts/finalize-review-email-foundation-stack.mjs"
  - "scripts/verify-review-email-foundation-live.mjs"
  - "infra/aws/review-email-erasure-journal.cloudformation.json"
  - "infra/aws/review-email-erasure-journal-iam.cloudformation.json"
  - "src/lib/ikas-installation-lifecycle.ts"
  - "src/globals/config.ts"
  - "src/lib/ikas-client/graphql-requests.ts"
  - "src/lib/review-email/"
  - "src/app/api/ikas/review-email-settings/route.ts"
  - "src/app/api/ikas/review-email-data-subject/route.ts"
  - "src/app/api/webhooks/ikas/orders/route.ts"
  - "src/app/api/internal/review-email/due-jobs/route.ts"
  - "src/app/api/internal/review-email/reconcile-orders/route.ts"
  - "src/app/api/internal/review-email/store-erasure/route.ts"
  - "src/app/api/public/review-request/route.ts"
  - "src/app/api/public/review-center/"
  - "src/app/request/page.tsx"
  - "src/lib/review-email/batching.ts"
  - "src/lib/review-email/batch-jobs.ts"
  - "src/lib/review-email/ikas-send-preflight.ts"
  - "src/lib/review-email/maintenance.ts"
  - "src/lib/review-email/review-center-submit.ts"
  - "src/lib/review-email/review-center-scope.ts"
  - "src/lib/review-email/unsubscribe.ts"
  - "src/lib/media/providers/aws-review-image.ts"
  - "src/lib/product-snapshots.ts"
  - "src/app/api/webhooks/ikas/products/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/widget/reviews-section/review-form-modal/steps/step-author.js"
  - "src/lib/media/dispatcher.ts"
  - "src/app/api/internal/media-jobs/route.ts"
  - "src/app/api/internal/scheduled-jobs/route.ts"
  - "src/lib/scheduled-jobs.ts"
  - "src/lib/email/ses-sns.ts"
  - "src/app/api/internal/email-events/ses/route.ts"
  - "infra/aws/review-email-foundation.cloudformation.json"
  - "scripts/validate-review-email-foundation-template.mjs"
  - "scripts/validate-review-email-deployment-access-template.mjs"
  - "scripts/calculate-review-email-journal-retention.mjs"
  - "scripts/validate-review-email-erasure-journal-templates.mjs"
  - "scripts/initialize-review-email-journal-genesis.mjs"
  - "scripts/extend-review-email-journal-retention.mjs"
  - "scripts/run-review-email-journal-coverage.ts"
  - "tests/integration/review-email-installation-fence.test.ts"
  - "tests/integration/review-email-v5-db-guarantees.test.ts"
  - "tests/integration/review-email-batch-db-guarantees.test.ts"
  - "tests/unit/review-email-erasure.test.ts"
  - "tests/unit/ikas-installation-lifecycle.test.ts"
  - "tests/unit/review-email-batch-jobs.test.ts"
  - "tests/unit/review-email-maintenance.test.ts"
  - "tests/unit/review-email-pii.test.ts"
  - "tests/unit/review-email-ses-events.test.ts"
  - "tests/unit/review-email-settings.test.ts"
  - "tests/unit/review-email-tokens.test.ts"
  - "tests/unit/review-email-disabled-public-routes.test.ts"
  - "tests/review-center-browser.spec.ts"
---

# ADR_0036 - Review Request Email Architecture

## Agent Brief

Use this accepted ADR when researching or designing post-purchase review-request
email, verified-buyer submission, Amazon SES delivery, or email-job scheduling.
The provider boundary, SES regional/sender/runtime/feedback contract, exact
terminal-delivery cutoff evidence, and source-only SES foundation are accepted.
Email dispatch targets EventBridge, SQS, Lambda, and SES; existing QStash media
and maintenance scheduling is unchanged. Direct ikas feedback confirms the
order webhook/listOrder, delivery, reconciliation, and uninstall-retention
contract. The review-request V5 and multi-product Batch/Envelope V3.2
implementations exist behind a disabled feature flag: additive/RLS-hardened
Prisma migrations, canonical
`listOrder` re-read, leased reconciliation, immutable settings/recipient
snapshots, delivery-group batches with product-scoped requests, provider-neutral
physical-email attempts, explicit ambiguous send states, versioned batch tokens,
host-isolated browser sessions, atomic per-product verified-buyer submit/skip,
dynamic expiry, SES feedback persistence, installation-generation fencing,
versioned PII protection, exact-subject DSR, reversible
analytics, bounded retention, immutable S3 erasure journal intent, crash-safe
`412` recovery, restore coverage checks, and retryable erasure. AWS dispatch
resources, outbound SES sending, Lambda DB/secret strategy, journal-stack
rollout, and IYS/privacy/legal acceptance remain open. The approved
2026-07-20 rollout applied all 59 migrations and deployed this disabled source
to Production; customer/request/job/attempt lifecycle tables remained empty,
report-mode purge audit rows remained error-free, and `REVIEW_EMAIL_ENABLED`
remained absent.
The ikas consent source is closed: current
`listCustomer.subscriptionStatus`, not the historical order snapshot, is the
send-time source of truth. Verify the source files above and current
ikas/AWS runtime evidence before extending this ADR.
Do not apply DB migrations, create AWS resources, DNS records, QStash schedules,
Vercel environment variables, or deploys from this document without a separate
scope, risk, rollback note, and explicit approval.

## Summary

This ADR records the verified state and accepted infrastructure/application
contract for a future global-MVP review-request email feature. The first
DB/backend lifecycle, V5 retention/DSR/journal, and multi-product
Batch/Envelope V3.2 source packages are implemented and deployed but remain
disabled until provider rollout and activation are separately approved. AWS SES in
`eu-central-1`, a review-specific sender domain, provider-neutral application
boundaries, tenant-aware ownership, AWS-native email job dispatch, and a signed
SES feedback path are accepted directions. Existing QStash usage remains scoped
to media jobs and maintenance schedules. The future review-request email flow
uses a separate `AwsEmailJobDispatcher` boundary backed by EventBridge
recurring due scans, SQS buffering, Lambda sending, and SES delivery. The
repository now contains the source package for SES identity/configuration-set/
feedback IaC, a signed SNS feedback endpoint, the additive review-request
lifecycle schema/backend, exact-subject DSR API, reversible daily metrics,
bounded purge, and separately gated immutable journal IaC. It intentionally
does not contain a direct Vercel SES
send role: outbound IAM belongs to the future AWS SQS/Lambda worker package. It
does not yet contain outbound SES sending or the AWS email queue/worker
implementation.
Direct ikas feedback on 2026-07-09 confirms the high-level order webhook,
canonical `listOrder` re-read, delivery-state, reconciliation, and uninstall
cleanup contract. The additive DB/lifecycle contract is implemented in source;
product/legal consent expansion, Lambda DB/secret strategy, AWS resource
rollout, production access, and outbound-email activation remain open.

## Status

Accepted - infrastructure source package prepared; ikas platform contract and
additive V5 DB/backend lifecycle, retention, analytics, DSR, journal, and
multi-product Batch/Envelope V3.2 implementation are deployed with all 59
migrations applied. The feature is still off until provider rollout and
activation are approved.

This ADR does not authorize AWS stack creation, DNS records, Vercel env writes,
DB migrations, deploys, or provider mutation.

## Date

2026-07-09

## Context

The planned capability is a post-purchase email that lets an eligible customer
open a bounded review-center session for independent products from a real order. A
correct implementation would cross several independent trust boundaries:

- ikas order and customer data;
- merchant and storefront tenancy;
- eligibility after delivery, cancellation, refund, return, or partial
  fulfillment;
- customer communication consent and applicable regional law;
- delayed and at-least-once job delivery;
- token secrecy, replay resistance, and one-review-per-order-line enforcement;
- email sender authentication and reputation;
- bounce, complaint, suppression, and delivery evidence;
- uninstall and retention behavior for customer/order data.

Those boundaries make a direct "send an email from the webhook" implementation
unsafe. The current-state record must be complete before provider and schema
contracts are decided.

## Current State

### Storefront submission and verified-buyer state

- The public review wizard is open to storefront visitors; it is not gated by a
  purchase or order-line token.
- The author step displays an optional email field and validates its browser
  format, but keeps the value only in client state. The request payload omits
  it explicitly.
- `POST /api/public/reviews` writes `Review.email` as an empty string.
- `Review.email` exists as a nullable Prisma column, but it is not authoritative
  purchase evidence and is not populated by the active public route.
- The application has no verified-buyer flag, order reference, order-line
  reference, review-request token, token-consumption record, or one-review-per-
  order-line constraint.
- The storefront can therefore publish approved reviews without proving that
  the author purchased the product. This is current behavior, not the target
  email-flow contract.

### ikas operations and webhook state

- OAuth currently requests
  `read_orders,write_orders,read_products,read_inventories,write_inventories`.
  The future email flow appears to need order reads, but the final least-
  privilege scope set is not decided. Existing write scopes are broader than
  the currently demonstrated need and require a separate scope review.
- The generated application GraphQL client does not currently define or call a
  `listOrder` document.
- The only application-managed ikas webhook registration is for
  `store/product/created` and `store/product/updated`.
- The current product webhook receiver validates the ikas webhook signature
  with `validateIkasWebhookSignature`, parses the signed payload with
  `getParsedIkasWebhookData`, validates the scope, and then performs
  merchant-scoped product synchronization.
- There is no order webhook endpoint, order-event persistence, order
  reconciliation job, or order webhook idempotency table.

ikas MCP was re-verified on 2026-07-09:

- `saveWebhooks` accepts `store/order/created` and `store/order/updated`, in
  addition to the product/customer/favorite/stock scopes.
- `listOrder` supports filters including order id/number, customer id/email,
  `updatedAt`, `orderedAt`, order status, package status, and payment status.
- `listOrder` exposes customer email, `notificationsAccepted`, guest-checkout
  state, shipping method, payment status, order/package/line statuses,
  cancellation/refund data, package-to-line mappings, and product/variant ids.
- Pagination defaults to 50 and has a documented maximum of 200 records per
  page.

Direct ikas developer feedback received on 2026-07-09 closes the platform
semantics that were previously open. See [[Ikas_Order_Review_Request_Notes]]
for the detailed support-answer record. The current confirmed contract is:

- `store/order/created` and `store/order/updated` are valid webhook scopes for
  this flow when the app has the matching API access permission. Orders read is
  required; customer-data usage may require Customers read.
- `orderPackageStatus` is a rollup. Package
  `orderPackageFulfillStatus=DELIVERED` plus included line
  `status=DELIVERED` is the canonical delivery evidence for shipment,
  click-and-collect, digital-delivery, and no-shipment orders.
- `READY_FOR_PICK_UP` means ready, not collected. Review requests wait for
  actual package/line `DELIVERED`.
- `OrderLineItem.statusUpdatedAt` is the last line-status transition. It is
  exact delivery evidence only while the line is currently `DELIVERED`; later
  refund/cancel transitions overwrite the ikas value, so Renuvex persists the
  first observed delivered timestamp.
- `listOrder.customer.notificationsAccepted` is an immutable historical order
  snapshot. Send-time authorization comes from current
  `listCustomer.subscriptionStatus=SUBSCRIBED`, with current customer existence,
  deletion, and exact-email checks.
- Package ids can change after cancel/re-fulfill. Durable grouping therefore
  uses the package's canonical sorted line-id set, not package id.
- `store/order/updated` payload can contain email, line item ids,
  product/variant ids, and package status fields, but the robust flow is still
  webhook wake-up -> canonical `listOrder` re-read.
- General ikas webhooks support HMAC signature verification.
- Non-`200` webhook responses are retried three more times.
- Missed-event reconciliation should use periodic `listOrder` reads filtered by
  `updatedAt`, with page/limit pagination, maximum `limit=200`, and `hasNext`
  paging.
- `store/app/deleted` is the uninstall signal; stored personal data such as
  email, address, order references, and order-line references must be deleted or
  anonymized within 24 hours.

Remaining decisions are product/legal or rollout concerns rather than unknown
ikas field semantics: IYS/privacy classification, future finance-only refund
policy, token/reminder product defaults, and rollout order.

### Database state

The repository now contains an additive Prisma migration for the first
review-request email lifecycle. It adds isolated email-domain tables instead of
repurposing `WebhookEvent`, `MediaProviderJob`, or `ScheduledJobRunLock`.

The source schema now covers:

- merchant review-email settings with first-request and reminder timing;
- ikas order webhook event idempotency;
- normalized order and order-line snapshots with hashed/encrypted customer
  email evidence;
- review-request lifecycle, eligibility time, first-send time, reminder state,
  expiry, suppression, cancellation, and submission state;
- hashed one-time review-request tokens and token consumption;
- email jobs, attempts, provider message ids, SES event records, and
  recipient-level suppression;
- order reconciliation cursor and store data-erasure run evidence;
- `Review.reviewRequestId`, `Review.verifiedBuyer`, `Review.verifiedAt`, and
  `Review.verificationSource`.

The migration is source-only in this checkpoint. It has not been applied to
production unless a later rollout explicitly says so.

### QStash state

- `@upstash/qstash` is installed and used in production.
- The media dispatcher publishes opaque `jobId` payloads with retry and timeout
  settings to a signed internal receiver.
- Internal QStash routes verify the raw request body and
  `Upstash-Signature` before processing.
- Daily maintenance and monthly image cleanup use signed QStash schedules plus
  `ScheduledJobRunLock` for slot idempotency.
- Read-only QStash verification on 2026-07-09 showed the two expected
  maintenance schedules active, the latest daily schedule state successful,
  and zero DLQ messages.
- There is no email queue, email flow-control key, email dispatcher, email
  internal receiver, or email schedule.

QStash is therefore a proven current capability for media and maintenance, not
the accepted first implementation for review-request email dispatch. This ADR
does not migrate existing QStash jobs to AWS. Any future dispatcher payload,
whether AWS or otherwise, must carry opaque application job ids rather than
customer email, order details, rendered content, or review tokens.

### Amazon SES and AWS state

Read-only AWS CLI verification on 2026-07-09 used the existing
`renuvex-readonly` SSO profile for AWS account `989086371563`.

In `eu-central-1`:

- SES enforcement status is `HEALTHY`.
- `ProductionAccessEnabled` is `false`; the account is still in the regional
  SES sandbox.
- Sending is enabled with sandbox quota `200` messages per 24 hours and
  `1` message per second.
- Sent count for the previous 24 hours was `0`.
- No SES email identities exist.
- No SES configuration sets exist.
- Account suppression is configured for `BOUNCE` and `COMPLAINT`.
- The account-level suppressed-destination list is empty.
- Virtual Deliverability Manager is disabled.
- No dedicated IP pool exists.

In the repository:

- `@aws-sdk/client-sesv2` is still not installed because no outbound SES send
  implementation exists yet.
- `@aws-sdk/client-sqs`, Lambda worker packaging, and an EventBridge due-scan
  implementation are not present because AWS-native email dispatch is not
  implemented yet.
- `.env.example` now documents disabled-by-default SES review-email placeholders
  without secrets.
- `infra/aws/review-email-foundation.cloudformation.json` defines the proposed
  SES identity, configuration set, signed SNS feedback topic, HTTPS
  subscription, and 14-day SQS DLQ.
- `src/app/api/internal/email-events/ses/route.ts` is a signed SNS feedback
  receiver. It verifies SNS `SignatureVersion=2`, exact topic ARN, trusted SNS
  signing certificate URL, and RSA-SHA256 signature before persisting sanitized,
  idempotent attempt/event/suppression evidence. It does not auto-confirm
  subscriptions.
- `scripts/validate-review-email-foundation-template.mjs` enforces the local IaC
  contract. The earlier direct Vercel SES runtime-role template was removed:
  sender IAM will be scoped to the future SQS/Lambda worker package.

The SES account is therefore available and the source package is prepared, but
AWS resources are not created, production access is not granted, DNS records are
not deployed, Vercel env is not written, and no application email is sent.

### Sender DNS state

Read-only DNS verification on 2026-07-09 found an existing DMARC record for
`renuvex.app` with policy `p=quarantine` and relaxed DKIM/SPF alignment. No SES
identity or custom MAIL FROM records have been created. The selected application
identity is `reviews.renuvex.app`, the visible From address is
`requests@reviews.renuvex.app`, and the custom MAIL FROM domain is
`bounce.reviews.renuvex.app`. Their DKIM, MX, SPF, and any explicit subdomain
DMARC records are not deployed. The final DMARC reporting mailbox and
`BehaviorOnMxFailure` choice remain DNS-rollout decisions.

### Implemented and missing application behavior

Implemented in source, disabled until rollout:

- merchant settings API for enable/disable, first request delay, reminder
  enable/delay/count, sender display name, Reply-To, logo, button color,
  locale, and template version;
- `store/order/created` and `store/order/updated` webhook receiver that treats
  webhooks as wake-up signals and re-reads canonical order state via
  `listOrder`;
- eligibility logic for all four supported shipping methods using package
  `DELIVERED`, current line `DELIVERED`, and immutable first-delivery evidence
  at or after the merchant activation cutoff;
- first request job creation at `eligibleAt + firstDelayDays`;
- reminder job creation only after provider acceptance, at actual
  `firstSentAt + reminderDelayDays`;
- 30-day tokens prepared as hashes before send and activated only at
  `sendInitiatedAt`; stale prepared attempts are abandoned, while ambiguous SES
  outcomes are quarantined without automatic resend;
- fragment token exchange into a two-hour host-only HttpOnly session, atomic
  token/session/request consumption, DB-unique verified-buyer review creation,
  and pending reminder cancellation;
- dynamic request expiry that covers every scheduled reminder plus its token
  window; it is not a fixed 60-day constant;
- current-customer consent preflight requiring
  `listCustomer.subscriptionStatus=SUBSCRIBED`, an undeleted customer, and an
  exact canonical recipient match within a bounded 60-second evidence window;
- canonical `merchantId` validation plus a store-scoped installation-generation
  fence shared by order ingest, webhook audit, reconciliation lease creation,
  settings mutation, OAuth activation, and uninstall erasure;
- disabled merchant/global gates before canonical order PII or due-job work is
  persisted/claimed;
- versioned HMAC/AES-GCM PII values. New writes use the current key version and
  suppression lookup covers every retained version; versions `1..current`
  cannot be removed without an explicit re-key/erasure migration;
- SES feedback persistence into provider event/attempt/suppression tables after
  signed SNS verification;
- `store/app/deleted` route handling and bounded retryable review-email/auth-token
  erasure for the uninstall retention contract. A stale uninstall identity is
  ignored after reinstall and cannot delete or resurrect another generation;
- bounded maintenance for stale attempts, ambiguous outcomes, token/session/
  request expiry, key-ring safety, and failed erasure retries.

Still missing:

- outbound SES send provider and rendered email templates;
- AWS EventBridge/SQS/Lambda due scanner/sender resources;
- Lambda DB/API/secret strategy and worker observability;
- live product UI for review-request settings and template preview;
- provider-side verification and live acceptance of the separately configured
  uninstall signal plus the MCP-valid order-webhook registration;
- SES sandbox exit, DNS/env rollout, and live email acceptance tests.

## Decision

### Application boundaries

- The application owns order eligibility, consent interpretation, scheduling,
  template rendering, locale, one-time review tokens, idempotency, and durable
  audit evidence.
- `EmailProvider` is a narrow provider-neutral send boundary. Its first
  implementation will be `SesEmailProvider`.
- `EmailJobDispatcher` is a separate provider-neutral delayed-job boundary. Its
  first implementation will be `AwsEmailJobDispatcher`, not QStash.
- `OrderProvider` remains a separate boundary. Its first implementation will
  be `IkasOrderProvider` over signed ikas webhooks plus canonical `listOrder`
  re-reads.
- Dispatcher payloads carry an opaque application job id, not customer email,
  order details, rendered content, or review tokens.
- Email templates are rendered and versioned by the application rather than
  stored as authoritative SES templates.

### Email dispatch and scheduler boundary

- Existing QStash media dispatch, daily maintenance, and monthly image cleanup
  schedules remain on their current signed QStash endpoints and DB lock model.
  This ADR does not authorize or require a QStash-to-AWS migration for those
  existing workloads.
- Review-request email uses an AWS-native first implementation:
  EventBridge Scheduler runs a recurring due-scan trigger; a due scanner claims
  eligible DB rows in bounded batches; SQS buffers opaque send-job ids; Lambda
  consumes SQS, re-validates DB/order/send eligibility, calls SES, and records
  send attempts/provider message ids.
- The DB remains the source of truth for `sendAfter`, token state, recipient
  eligibility, suppression, attempts, and final lifecycle. AWS queues are
  delivery machinery, not durable business truth.
- One EventBridge one-time schedule per email is rejected for the first design.
  Completed one-time schedules still count against account quota until deleted,
  which creates unnecessary quota and cleanup risk at large email volume.
- QStash remains an available future dispatcher adapter, but is not the default
  email implementation because message/retry-based pricing and external HTTP
  scheduler dependence are weaker for high-volume global review-request email
  than SQS/Lambda/SES inside AWS.

### ikas order contract

- Order webhooks are wake-up signals, not the canonical durable order source.
  The future receiver must verify the HMAC signature, apply idempotency, and
  re-read the order through `listOrder` before deciding eligibility or sending.
- The accepted scopes are `store/order/created` and `store/order/updated`;
  source enablement also requires OAuth `read_orders` and `read_customers`.
- SHIPMENT, CLICK_AND_COLLECT, DIGITAL_DELIVERY, and NO_SHIPMENT use the same
  final-delivery invariant: one canonical package is `DELIVERED`, every required
  included line is currently `DELIVERED`, and each line has an immutable first
  delivered timestamp at or after the activation cutoff.
- `READY_FOR_PICK_UP` alone never starts a review request. Package/order
  `updatedAt`, `orderedAt`, webhook receipt time, and processing time are
  discovery/current-state evidence only.
- `orderPaymentStatus=FAILED` is a hard exclusion. `WAITING + DELIVERED` remains
  valid for manual, transfer, and cash-on-delivery scenarios.
- Reconciliation uses `listOrder(updatedAt)` windows with `limit<=200` and
  `hasNext` pagination. The cadence and window overlap are implementation
  decisions, but the job must tolerate missed webhooks and duplicate updates.
- `store/app/deleted` must trigger deletion or anonymization of stored customer
  email, address, order references, and order-line references within 24 hours.
- `notificationsAccepted` is retained only as historical order audit evidence.
  Current customer subscription and exact recipient equality authorize the
  provider call; IYS/privacy/legal acceptance remains a launch gate.

### Sender and region

- The MVP uses one SES region: `eu-central-1`. Global recipients do not require
  one SES installation per customer country.
- The verified SES domain identity is `reviews.renuvex.app`.
- The visible From address is `requests@reviews.renuvex.app`.
- The custom MAIL FROM domain is `bounce.reviews.renuvex.app`; it is reserved
  for SES feedback and is not used as a visible sender, website, or inbox.
- Easy DKIM uses the SES-supported 2048-bit key length.
- The display name and merchant Reply-To policy remain product decisions. A
  merchant address must not be used as Reply-To until its ownership and
  fallback behavior are defined.

### Merchant sender modes and branding

- The first public sender mode is Renuvex-managed delivery:
  `Store Display Name <requests@reviews.renuvex.app>`.
- Merchant-specific branding is allowed in this first mode only as application
  data: display name, Reply-To address, logo, button color, locale, and
  template version. These fields do not require merchant DNS onboarding.
- Merchant Reply-To must be validated before use and must have a safe fallback
  to the Renuvex sender if ownership or formatting is not acceptable.
- A future merchant-domain sender mode is intentionally supported by the data
  model, but deferred from the first SES foundation:
  `Store Display Name <reviews@merchant-domain.example>`.
- Merchant-domain sending requires a separate onboarding workflow for SES
  identity provisioning, DKIM DNS records, custom MAIL FROM or bounce domain
  policy, verification polling, failure states, and support documentation.
- The current ikas admin notification UI was observed as a useful product
  reference because it separates platform-domain sending from merchant-domain
  sending. It does not prove that this app can reuse ikas email settings or
  ikas email infrastructure.
- The first admin surface should not be a full free-form email builder. It
  should start with bounded controls: enable/disable, send delay, sender display
  name, Reply-To, logo, button color, locale, and preview. Free-form template
  editing is deferred until compliance, localization, deliverability, and
  support rules are defined.

### Runtime credentials and IAM

- Deployment access is separated from runtime access. The
  `review-email-deployment-access.cloudformation.json` package defines separate
  `RenuvexReviewEmailAuthors` and `RenuvexReviewEmailOperators` groups,
  create-only and execute-only permission sets, their account assignments, and
  three retained CloudFormation service roles. Identity Center
  instance/store/user IDs are deployment parameters.
- The author can create constrained change sets for the exact foundation,
  erasure-journal, and erasure-journal-IAM stack names, but cannot execute or
  delete them. Each create statement requires its matching service role;
  pass-role is limited to those role ARNs and CloudFormation, and imports are
  denied.
- The operator can inspect and execute only the administrator-staged exact
  change-set name before its explicit expiry. It cannot create or delete change
  sets and has no `iam:PassRole`.
- Neither principal has direct create/update/delete-stack, SES send or
  control-plane, journal object/retention, broad IAM, or managed-policy
  permissions.
- Foundation, journal-bucket, and journal-IAM service roles are independently
  scoped to the resource types and physical names in their existing templates.
  They trust only `cloudformation.amazonaws.com`; sender Lambda/Scheduler IAM is
  deliberately absent until sender IaC exists.
- AWS actions without a usable resource-level authorization path remain exact
  action allowlists inside service roles only. SES create calls additionally
  require the locked region and project/purpose request tags; this exception
  does not grant SES sending.
- Service roles use `DeletionPolicy: Retain` and `UpdateReplacePolicy: Retain`.
  Permission set, group, membership, and assignment use normal stack lifecycle.
  Role retirement therefore needs a separate decommission plan.
- The approved `renuvex-review-email-access-prod` bootstrap was deployed on
  2026-07-23 from source commit `67a5babd3b37b97700b27764332a90a42ef00d68`.
  Its change set contained exactly the seven expected additions and only
  `CAPABILITY_NAMED_IAM`. The completed stack has termination protection.
- Live read-only verification compares every deployed permission set,
  assignment, group membership, service-role trust and inline policy,
  managed-policy absence, and stack inventory with the source template. IAM simulation
  confirmed the exact approved change-set and `PassRole` paths while denying
  wrong stack/role/region/import, direct stack deletion, SES send, journal
  deletion/retention, access-key creation, and managed-policy attachment.
- The persistent `renuvex-review-email` and
  `renuvex-review-email-author` SSO profiles use the provisioned execute-only
  and create-only permission sets respectively. Administrator remains an
  approval/bootstrap/decommission boundary and is not persisted as a normal
  local profile.

#### Foundation execution hardening

- The original live bootstrap allowed the operator to execute any matching
  review-email change-set name on the three exact stacks and to delete unused
  change sets. A separately approved Administrator update on 2026-07-23
  replaced that contract with the source hardening from pushed commit
  `b957375c74f7b475c12fc1af5b8079d31db1a5c6`. The access stack returned to
  `UPDATE_COMPLETE`, retained termination protection, and passed source-equality
  verification. The operator's denied attempt to update the bootstrap-owned
  access stack is expected evidence of the ownership boundary.
- The hardened source splits creation and execution. Neither author nor
  operator has `DeleteChangeSet`. An administrator stages one exact name per
  stack while execute approval is expired; execution additionally requires
  `aws:CurrentTime` before a bounded UTC deadline. Steady-state parameters are
  disabled and expired.
- The administrator performs two distinct gates: stage the exact name before
  creation, then open a maximum 15-minute execute window only after read-only
  verification. The execution wrapper closes the window in `finally`; the IAM
  deadline is the independent fail-safe if cleanup fails.
- IAM cannot authorize a `TemplateBody` hash. The author therefore cannot
  execute and the operator cannot submit or replace a template. Template
  integrity is bound to the immutable staged change-set name plus canonical
  SHA-256 equality across strict local JSON,
  `GetTemplate(TemplateStage=Original)` for the change set, and the completed
  stack. Source commit, template digest, and foundation stack-policy digest are
  exact stack tags. Because both permission sets currently target the same
  approved user, this is capability separation rather than independent-person
  approval; read-only verification and the administrator gate remain required.
- Strict local decoding rejects malformed UTF-8, duplicate JSON keys,
  unpaired Unicode surrogates, trailing commas, and non-canonical numeric or
  escape spellings before canonical hashing.
- Foundation and non-IAM journal change-set creation must provide their
  template-derived `cloudformation:ResourceTypes` allowlists. Omitting the
  request field is denied. The journal-IAM stack omits `ResourceTypes` because
  CloudFormation does not permit it together with `CAPABILITY_NAMED_IAM`; exact
  template verification and the narrowly scoped service role remain mandatory.
- Foundation first-create rollback is `OnStackFailure=ROLLBACK` plus
  `RetainExceptOnCreate=true`. The operator never sends `DisableRollback`.
  Exact rollback permissions include the created SNS/SQS/SES resources and a
  seven-day, tag-scoped `kms:ScheduleKeyDeletion`.
- The foundation stack policy is applied only after `CREATE_COMPLETE`. Its
  source document declares `Update:Delete` and `Update:Replace` protection for
  every logical resource, including the conditionally absent HTTPS
  subscription. CloudFormation validates stack policies against the effective
  stack and rejects absent logical IDs, so the finalizer filters the declared
  resource list through the same condition-resolved inventory used by the
  change-set verifier. The live verifier derives the identical effective
  policy before comparing its canonical digest. This preserves source
  provenance without weakening protection for any deployed resource.
  Termination protection is enabled only after effective-policy read-back
  succeeds.
- The approved foundation deployment reached `CREATE_COMPLETE` on 2026-07-24.
  The effective nine-resource policy was read back successfully and
  termination protection was enabled. Live SES verification uses the SES v2
  `GetEmailIdentity.FeedbackForwardingStatus` response field; the similarly
  named CloudFormation input
  `FeedbackAttributes.EmailForwardingEnabled` is not a live API response path.
- AWS does not expose the submitted `ChangeSetType` in `DescribeChangeSet`.
  Existing-stack updates are accepted only when the stable stack ID matches,
  `OnStackFailure` is absent, and no import action exists. Foundation creates
  are accepted only with the matching `REVIEW_IN_PROGRESS` placeholder,
  `OnStackFailure=ROLLBACK`, and an all-`Add` effective resource inventory.
- AWS also accepts `RoleARN` on `CreateChangeSet` without returning that field
  from `DescribeChangeSet`. The foundation verifier therefore proves the
  service-role boundary from the matching placeholder stack's `RoleARN`, where
  CloudFormation persists the role for execution and later stack operations.
- Deployment tooling may advance after a change set is created, but template
  provenance may not. A tagged source commit is accepted only when it is an
  ancestor of current `origin/main` and its committed template and stack-policy
  canonical digests equal current source, provenance tags, and AWS
  `TemplateStage=Original`. This permits verifier-only corrections without
  weakening template immutability or silently accepting an older template.
- CloudFormation can surface an unchanged `AWS::SSO::Assignment` as a
  dependency-only `Modify/Conditional` row when its in-place permission set is
  updated. This is accepted only for the exact `PermissionSetArn`
  `ResourceAttribute` dependency, with an unchanged assignment template and an
  in-place permission-set update. Other conditional replacements remain
  forbidden.
- Source foundation safety is layered, not attributed solely to the
  configuration set: no sender role or SES send action exists, DNS is not
  configured, and `SendingEnabled=false`. A caller could explicitly select a
  different configuration set in a future send API request, so the sender
  phase must separately bind the exact identity, From address, tenant, and
  configuration set in IAM, application validation, and live verification.
- The foundation configuration set does not set `SuppressionOptions`; AWS
  configuration-set suppression would override tenant/account suppression and
  is therefore deferred to the tenant-aware sender contract.
- The SNS topic is encrypted with the direct KMS key ARN. The KMS and SNS
  resource policies both restrict SES to the expected account and exact
  configuration-set source ARN. No unverified encryption-context condition is
  introduced.
- Automatic KMS rotation is enabled with `RotationPeriodInDays=365`. The
  optional HTTPS subscription remains false when `FeedbackEndpointUrl=""`;
  event and subscription resources explicitly wait for their resource policies.
- The access-hardening prerequisite is closed. Current read-only evidence still
  shows zero deployed foundation, sender, tenant, Lambda, and Scheduler
  resources. The exact foundation CREATE change set is staged, created, and
  read-only verified but remains unexecuted with approval expired. Foundation
  creation therefore remains a separate mutation gate requiring a new explicit
  approval before the bounded operator execution wrapper runs.

- The AWS-native email worker path requires a separate Lambda execution role
  with least-privilege access to its SQS queue, SES send action, CloudWatch
  logs, and any approved Secrets Manager/SSM secrets needed for DB/API access.
- Email sending uses dedicated email roles; the review-image runtime role is
  not expanded with SES, SQS, Lambda, or scheduler permissions.
- Runtime permission is limited to the selected SES identity/configuration set
  and exact sender address. The first Lambda role may send via SES; Vercel does
  not receive `ses:SendEmail` in the accepted V3 architecture.
- Static AWS access keys, `ses:*`, `SendRawEmail`, SES control-plane operations,
  tenant lifecycle permissions, and `iam:PassRole` are excluded from the send
  role.

### Tenant-aware, provider-neutral ownership

- `storeId` remains the application tenant identity and source of truth.
- The email-domain schema is provider-neutral. AWS SES tenant identifiers are
  provider references, not primary business identity.
- The additive schema must separate tenant/provider mapping, normalized
  order-line eligibility, review-request lifecycle, hashed one-time tokens,
  dispatch/send attempts, provider events, recipient/tenant suppression, and
  template/locale evidence.
- Existing `Review.email`, `MediaProviderJob`, `WebhookEvent`, and
  `ScheduledJobRunLock` are not repurposed for these independent lifecycles.
- SES Tenant Management is the target for multi-merchant production. A store's
  tenant uses shared Renuvex identity/configuration-set resources, tenant-level
  bounce/complaint suppression, and the standard reputation policy.
- Tenant provisioning and removal use a separate control-plane boundary and
  role after the ikas install/uninstall and retention contract is known.

### DB schema and lifecycle contract

Migrations `20260710120000_add_review_request_email_lifecycle`,
`20260710150000_harden_review_email_installation_lifecycle`, and
`20260710210000_add_review_email_retention_analytics_journal` are present in
production migration history. The additive Multi-Product V3.2 migration
`20260715120000_add_review_email_batch_envelope_v32` and historical-cutoff
migration `20260716120000_add_review_email_eligibility_cutoff`, plus
`20260720120000_align_ikas_review_email_contracts`, are locally verified source
only and are not applied to production by this checkpoint.

Implemented ownership and privacy boundaries:

- `ReviewEmailSettings` stores bounded merchant controls and order-webhook
  registration health. Defaults are first request `1` day after eligibility,
  one reminder `1` day after first provider acceptance, trigger `delivery`, and
  current-customer subscription consent. A successful disabled-to-enabled
  transition records `eligibilityStartsAt`; re-enable establishes a new cutoff
  while an enabled-to-enabled settings edit preserves the current one.
- `IkasStoreInstallation` is the store-scoped lifecycle fence. It binds one
  active `authorizedAppId` to a monotonically increasing generation and keeps
  an erased tombstone so a delayed uninstall/retry or OAuth callback cannot
  affect another generation. Activation and erasure use one advisory-lock
  order: installation first, erasure-run row second. A successful activation
  atomically closes every nonterminal older erasure run as `stale_ignored`.
- `IkasOrderWebhookEvent`, `IkasOrderSnapshot`, and
  `IkasOrderLineSnapshot` store normalized, tenant-scoped canonical evidence.
  Raw webhook/order payloads, addresses, phone numbers, payment details, IPs,
  user agents, and plaintext customer email are not persisted. Email is stored
  as HMAC plus AES-GCM ciphertext only where sending requires it.
- `IkasOrderLineSnapshot.firstDeliveredAt` freezes the first exact delivered
  line transition observed by Renuvex. It survives later ikas status changes but
  never overrides current line/package ineligibility.
- `ReviewEmailBatch.eligibilityStartsAtSnapshot` freezes the activation epoch
  used to authorize that batch. Sender prepare/commit must match the current
  enabled setting and reject a stale or missing snapshot.
- `ReviewEmailBatch` owns a canonical delivery-group sequence, one protected
  recipient snapshot, immutable timing/template settings, and a durable
  duplicate fingerprint. `ReviewRequest` remains one independent product-level
  review right. `ReviewRequestToken` stores a unique HMAC hash and key version
  for a batch send attempt; `ReviewRequestSession` stores only a unique HMAC
  session hash and allows bounded multi-device access.
- `ReviewEmailJob`, `ReviewEmailAttempt`, and `ReviewEmailEvent` separate
  physical-email schedule, one immutable provider-call attempt, and
  provider-neutral transport evidence. Queue payloads remain opaque job ids;
  recipient email and raw tokens exist only in the sender process between
  preparation and provider invocation.
- `ReviewEmailSuppression` plus `ReviewEmailUnsubscribeToken` block permanent
  bounce/complaint or explicit store/category unsubscribe without plaintext
  email in queue/log evidence. `IkasOrderReconciliationCursor` owns a persisted
  `updatedAt` window/page through lease owner plus fencing version.
  `StoreDataErasureRun` retains non-PII evidence and bounded retry state after
  review-email/order/auth PII is deleted.

Database-level guarantees:

- `Review.reviewRequestId @unique` plus a conditional request transition in the
  same transaction as `Review.create` allows only one verified review under
  parallel submits.
- Unique/partial constraints cover tenant/generation batch fingerprints, one
  live order delivery group, one product per batch, request store/order-line
  ownership, `ReviewRequestToken.tokenHash`, one token per attempt,
  `ReviewRequestSession.sessionHash`, job target/kind/sequence and dedupe key,
  attempt correlation/job-number, transport ids, and suppression identity.
- Composite tenant FKs bind order-to-batch and batch-to-request/job ownership;
  SQL XOR checks preserve exactly one legacy request or new batch target during
  expand/contract deployment overlap.
- Due jobs use bounded `FOR UPDATE SKIP LOCKED` claims. Reconciliation page
  checkpoints require matching lease owner/version. Installation state changes
  use a transaction-scoped 64-bit PostgreSQL advisory lock plus the lifecycle
  row. Email-domain tables have RLS enabled and browser roles receive no direct
  grants.
- Review-center submit and skip transactions lock the owning batch row with
  `FOR UPDATE` before request CAS and completion counting. This serializes
  sibling terminal transitions so two concurrent final-item actions cannot
  leave an otherwise resolved batch active.
- Product timing limits stay in app validation (`firstDelayDays 0..30`,
  `reminderDelayDays 1..30`, `maxReminderCount 0..1`) rather than brittle DB
  checks.

Implemented state and expiry rules:

- Request states are `scheduled`, `sending`, `sent`, `sent_unknown`,
  `submitted`, `skipped`, `cancelled`, `expired`, `suppressed`, and `error`.
- Job states are `pending`, `leased`, `dispatched`, `processing`,
  `awaiting_confirmation`, `outcome_unknown`, `sent`, `skipped`, `retrying`,
  `failed`, and `cancelled`.
- Attempt states include `prepared`, `sending`, `accepted`,
  `awaiting_confirmation`, terminal `outcome_unknown`,
  `abandoned_before_send`, and provider delivery/failure states. Token states
  are `prepared`, `active`, `consumed`, `expired`, and `revoked`; session states
  are `active`, `consumed`, `expired`, and `revoked`.
- A raw batch token is generated only while preparing a physical attempt with
  the current versioned HMAC key, stored only as a hash, and returned in sender
  memory. If the sender crashes before `sendCommittedAt`, stale preparation is
  abandoned and a new attempt is safe. Once send is committed, the token becomes
  active for 30 days from the send-commit boundary.
- A missing/timeout SES result moves the attempt/job to
  `awaiting_confirmation` and affected batch requests to `sent_unknown`; it is
  never automatically resent. Every new send commit persists
  `confirmationDeadlineAt = sendCommittedAt + 24 hours`, and the transition to
  `awaiting_confirmation` preserves that deadline. Maintenance uses the stored
  deadline first. Legacy rows with a null deadline derive it from
  `sendInitiatedAt ?? sendCommittedAt`, never from the maintenance invocation
  time. Signed SES feedback may reconcile the result. Once the deadline passes,
  maintenance marks terminal `outcome_unknown` and emits operator evidence;
  only an audited `confirmed_not_sent` decision may authorize another attempt.
- Request lifetime is dynamic, not a fixed 60-day value. Initial expiry covers
  the first due time plus one 30-day token window. Every newly scheduled
  reminder extends request expiry to at least its `sendAfter + 30 days`; a late
  send also extends to its actual token expiry.
- The key ring must retain every version referenced by an unexpired prepared or
  active token. Maintenance fails closed if any active version is absent, so
  multiple rotations remain safe without assuming a single previous key.
- The separate customer-email PII key ring embeds a key version into every
  HMAC/ciphertext. Runtime config must retain every PII version from `1` through
  `current`; this prevents an old suppression hash from becoming invisible
  after repeated rotations. Key retirement requires an explicit data re-key or
  erasure migration.
- Bounded maintenance eagerly expires tokens, two-hour sessions, and requests;
  resolve/submit paths also fail closed and lazily mark expired credentials.
- When the global feature is disabled, review token exchange, session resolve,
  item listing, submit, and skip routes return `404 not_found` before reading
  public-host or token/session secrets. This keeps a disabled deployment safe
  even when activation-only environment values are absent. Unsubscribe is
  intentionally excluded because retained links must continue honoring a
  preference after future sending is disabled.
- Access revocation is event-specific. Intermediate product submit/skip keeps
  sibling access; the final product transition revokes all batch tokens and
  sessions. Recipient change, DSR, uninstall, bounce, complaint, reject, and
  rendering failure close active attempt access and prevent reminders. A
  pre-commit store disable revokes unsent access and work, while a post-send
  unsubscribe or store disable blocks future email without invalidating an
  already delivered review link. `awaiting_confirmation` and
  `outcome_unknown` preserve that possible-delivery link until normal expiry;
  expired token/session rows cannot be reactivated.

Implemented flow:

1. A signed order webhook acts only as a wake-up signal. Active installation,
   merchant-enabled state, and canonical `merchantId` are checked before order
   PII is stored; canonical `listOrder` is then re-read and normalized.
   Periodic reconciliation uses the same fence and covers missed events.
2. Eligible physical shipment lines are grouped by canonical delivery evidence
   into one batch and initial physical-email job. Each required line must be
   `DELIVERED` with exact `statusUpdatedAt >= eligibilityStartsAt`; a product
   spanning multiple lines uses the latest required line timestamp. Each product
   creates one independent request; quantity/variant repeats do not fan out email.
   Cancellation/refund/return/missing-line transitions close only affected work.
3. A future EventBridge/SQS/Lambda dispatcher claims DB jobs and calls the
   existing prepare/initiate/finalize helpers. This AWS worker is not built or
   deployed yet.
4. Provider acceptance creates at most one batch reminder from actual acceptance
   time. The reminder manifest is rebuilt from unresolved products. Submission,
   skip, suppression, expiry, recipient change, or current merchant reminder
   disablement cancels/skips pending work.
5. Email links use `https://reviews.renuvex.app/request#token=...`. The page
   removes the fragment immediately and POSTs the token for a host-only HttpOnly
   batch session; raw tokens do not enter query/access logs or browser
   navigation requests. Browser Sentry and Session Replay are disabled on the
   isolated `/request` document before SDK initialization so Replay
   `initialUrl` cannot capture the fragment.
6. Verified submit atomically claims one product request/media and creates the
   normal moderated `Review` with `verifiedBuyer=true`. Sibling products and
   sessions remain usable until the batch is resolved; the last submit/skip
   completes the batch and cancels its reminder. Existing tokenless storefront
   submit remains unchanged.
7. Signed SES feedback updates attempts/events/suppression. Permanent bounce or
   complaint revokes active links and pending reminders.
8. A verified `store/app/deleted` event erases review-email/order/auth PII even
   when the feature flag is off. Erasure, OAuth activation, webhook audit,
   settings mutation, order sync, and reconciliation acquisition serialize on
   the same store lifecycle fence. Failed erasures retry independently with a
   bounded backoff; live registration/acceptance remains a rollout gate.

Eligibility defaults for the first implementation:

- SHIPMENT, CLICK_AND_COLLECT, DIGITAL_DELIVERY, and NO_SHIPMENT require an
  exact package membership, package `DELIVERED`, and every required line
  currently `DELIVERED`. Review email never starts at pickup-ready.
- A product spanning multiple lines becomes eligible at the maximum immutable
  `firstDeliveredAt`. Missing exact evidence fails closed as
  `missing_exact_delivery_timestamp`; generic package/order timestamps never
  replace it.
- A package is grouped by the SHA-256 digest of canonical sorted unique line
  ids. Package id is audit-only because re-fulfillment creates a new id.
- Cancellation, refund, return, unable-to-deliver, missing customer email,
  invalid email, suppression, disabled store settings, or expired token close
  or skip pending requests/jobs.
- Send authorization requires a current undeleted ikas customer with
  `subscriptionStatus=SUBSCRIBED` and an exact canonical email equal to the
  order/batch recipient. The historical order consent snapshot does not
  authorize or deny sending.
- The current `listOrder` document has no manual-order/source discriminator and
  the lifecycle does not branch on origin. A manual order follows its selected
  shipping method plus the same current-customer, package, line, payment,
  suppression, and cutoff checks. Development-store evidence verifies the ADMIN
  shipment shape; real outbound acceptance remains an SES sandbox gate. No
  alternative recipient is inferred.

Uninstall registration caveat:

- Direct ikas support identifies `store/app/deleted` as the uninstall signal,
  but current MCP introspection for `saveWebhooks` does not list that scope.
  Source therefore registers only the MCP-valid order scopes and keeps the
  signed uninstall receiver separate. Enablement fails closed unless
  `IKAS_APP_DELETED_WEBHOOK_VERIFIED=true` is set after provider-side app
  configuration is actually verified. This operator attestation and a live
  uninstall acceptance test remain rollout gates; source does not pretend the
  order-webhook mutation registered the uninstall signal.

### SES observability and feedback

- The shared configuration set is `renuvex-review-requests-prod`.
- The first event destination captures `SEND`, `REJECT`, `BOUNCE`,
  `COMPLAINT`, `DELIVERY`, `DELIVERY_DELAY`, and `RENDERING_FAILURE`.
- `OPEN` and `CLICK` tracking are disabled by default; the application does not
  add tracking pixels or rewrite links merely for analytics.
- SES publishes events to a same-region encrypted SNS topic. The topic uses SNS
  `SignatureVersion=2`.
- SNS delivers to a dedicated HTTPS application endpoint. The receiver verifies
  the signature, certificate source/chain, exact topic ARN, message type, and
  idempotency key before processing.
- An encrypted same-region SQS queue is the SNS subscription DLQ with 14-day
  retention. Provider events are persisted durably before business processing;
  raw payloads and recipient addresses are not written to application logs.

### Deferred AWS features

- Shared SES IPs are used initially. Dedicated IPs require proven sustained
  volume and a deliberate warm-up plan.
- Virtual Deliverability Manager remains disabled. Configuration-set events,
  tenant metrics, and suppression provide the initial evidence without paid
  engagement tracking or optimized-delivery delay.
- SES Global Endpoints remain disabled. A second region is justified only by a
  measured availability/SLA requirement because identities, configuration sets,
  feedback resources, tenants, and quotas must remain aligned across regions.

### Decisions still open

- IYS/privacy/legal classification and merchant-facing consent copy.
- Advanced partial-delivery and finance-only refund edge cases, resend rules,
  and reminder-count defaults beyond the first bounded release.
- Reconciliation cadence, overlap window, and rate-limit handling details.
- The exact provider-side registration/configuration mechanism for the
  uninstall signal remains a live ikas rollout gate. The source receiver and
  journal-first bounded erasure implementation exist; the ikas platform
  requirement remains deletion/anonymization within 24 hours.
- Lambda DB connectivity and secret strategy: direct database access via
  pooled connection, API-mediated sender worker, or another approved secure
  pattern must be decided before creating the Lambda/SQS implementation.
- Exact token lifetime, reminder delay/count defaults, Reply-To validation
  mechanism, merchant-domain sender onboarding, and rollout sequence.

## Reasoning

Separating application ownership from delivery and dispatch prevents order
semantics, provider credentials, and at-least-once scheduling from becoming one
coupled workflow. A review-specific authenticated subdomain limits reputation
blast radius. Short-lived AWS credentials and AWS execution roles remove static
access keys. Provider-neutral tenant ownership preserves a future provider
migration path while SES tenants isolate merchant reputation and suppression.

Keeping existing QStash media/maintenance flows stable avoids an unnecessary
platform migration. Starting the new email workflow on AWS avoids building a
high-volume review-request system on a per-message HTTP scheduler when the
delivery provider, feedback path, queues, retries, and worker observability can
all live inside the same AWS boundary.

The DB contract is now explicit enough to plan an additive migration before AWS
resource creation. The remaining open decisions affect product policy,
credential boundaries, and rollout rather than whether the business lifecycle
needs separate order snapshots, request tokens, jobs, attempts, provider events,
suppression, and erasure evidence.

## Alternatives Considered

- `noreply@renuvex.app` was rejected as the default sender. It is shorter but
  shares root-domain reputation and communicates less purpose than the selected
  review-specific sender.
- A single account-wide sending stream without SES tenants is cheaper and
  simpler, but its reputation and suppression blast radius crosses merchants.
- Per-merchant custom domains provide stronger merchant branding but require
  merchant DNS onboarding and are deferred as an optional future capability.
- A full merchant-editable template builder was rejected for the first email
  release. It increases compliance, localization, spam-risk, and support
  surface before the order-trigger and consent contract is known.
- Static AWS access keys in Vercel were rejected in favor of short-lived OIDC
  credentials.
- VDM, dedicated IPs, and Global Endpoints were rejected for the MVP because
  current traffic and SLA evidence do not justify their cost and operational
  surface.
- Direct sending inside an ikas webhook was rejected because it cannot safely
  provide delay, retry, cancellation re-check, idempotency, or durable evidence.
- QStash as the first review-request email dispatcher was rejected after the
  high-volume cost/operational review. QStash remains correct for existing
  media and maintenance jobs, but AWS SQS/Lambda/EventBridge is the better
  first email-job foundation for global scale.
- A full QStash-to-AWS migration was rejected for this phase. Existing QStash
  workloads are already working and are not on the email feature critical path.
- One EventBridge one-time schedule per email was rejected because completed
  one-time schedules remain counted against quota until deleted; DB-backed due
  scans plus SQS avoid that cleanup/quota surface.
- Reusing `WebhookEvent`, `MediaProviderJob`, or `ScheduledJobRunLock` for
  review-request email was rejected. Those tables are tuned for provider media
  webhooks, media provider mutations, and maintenance slots; email requires
  separate order, recipient, token, provider-event, suppression, and erasure
  lifecycles.

## Implementation Checkpoint

### 2026-07-15 Multi-Product Batch / Envelope V3.2

The disabled source now separates the review collection sequence from physical
email delivery:

- `ReviewEmailBatch` owns one canonical delivery group, one recipient snapshot,
  timing/template snapshots, membership version, completion state, and the
  durable versioned-HMAC duplicate tombstone. `ReviewRequest` remains the
  independent product-level review right. `ReviewEmailJob` is one scheduled
  physical initial/reminder occurrence; `ReviewEmailAttempt` is one immutable
  provider-call attempt. One batch therefore produces at most one initial and
  one reminder while every eligible product keeps a separate review record.
- Batch identity is unique by `(storeId, installationGeneration,
  batchFingerprint)`. A second live group for the same order/group is blocked
  by the partial unique order/group index, including old/new HMAC writer
  overlap. The HMAC canonical input includes schema version, tenant,
  installation generation, ikas order id, grouping mode, and group key only.
  Purged terminal tombstones are found by all active fingerprint key versions,
  so reingestion cannot recreate requests or jobs.
- Canonical `listOrder` evidence groups exact package membership by a digest of
  canonical sorted package line ids. Package id remains audit-only because
  cancel/re-fulfill creates a new id. Missing or ambiguous membership fails
  closed; there is no order-level fallback. A product split across packages
  waits for every related line. Variant/quantity repeats remain one
  product-level request. Regrouping is allowed before `sendCommittedAt`; after
  that boundary membership and recipient are frozen. A closed batch is never
  reopened, and a later discovered product receives only a
  `late_after_batch_closed` receipt fence.
- Composite tenant FKs bind batches to order snapshots and requests/jobs to the
  owning batch. Request-to-order and request-to-line remain `ON DELETE
  RESTRICT`; batch/order and DSR locks use deterministic transaction ordering.
  This prevents cross-store attachment and parent deletion while live request
  evidence exists.
- The provider-neutral envelope has exactly one recipient, no CC/BCC, an
  immutable maximum-five-item content manifest plus digest, opaque attempt/job
  ids, template/locale snapshots, review-center fragment URL, and scoped
  unsubscribe URL. The email limit is a rendering/product choice; all eligible
  products remain available in the paginated review center.
- The sender authorization boundary is `sendCommittedAt`. Sender and
  suppression/unsubscribe paths serialize on the same tenant/category/recipient
  advisory lock and re-read installation, settings, recipient version, and
  suppression sources. A suppression committed first prevents the call; a send
  committed first may finish that attempt but cannot authorize another one.
  A crash after commit is `awaiting_confirmation`/`outcome_unknown` and is never
  automatically resent. A confirmed pre-provider failure may be retried.
- Frequency policy is physical-email based: minimum 24-hour gap, seven-day
  cooldown between different initial batches, and four committed attempts per
  rolling 30 days for a store-recipient. Committed ambiguous attempts reserve
  capacity; only audited `confirmed_not_sent` releases it.
- `ReviewEmailEvent` is a provider-neutral transport ledger. Exact transport
  redelivery dedupes by `(transport, transportEventId)`, while distinct valid
  same-type facts remain separate rows. Attempt evidence is event-set based:
  multiple delivery delays retain first/last timestamps, complaint does not
  erase delivery, and a late delivery cannot clear bounce/complaint suppression
  or create a reminder. Provider message correlation uses protected evidence;
  raw payload and recipient data are not persisted.
- Permanent bounce and complaint create durable store/category recipient
  suppression. Transient/undetermined bounce closes the current attempt without
  inventing durable suppression. `emailAccessStatus` is only a projection;
  every send/reminder claim re-reads installation generation, merchant setting,
  recipient version, active suppression/unsubscribe preference, DSR fence, and
  terminal batch state.
- Batch tokens are generated only when an attempt is prepared, stored only as
  versioned hashes, and exchanged from
  `https://reviews.renuvex.app/request#token=...` into two-hour HttpOnly
  sessions. Multiple devices are allowed; request-level uniqueness and CAS
  still permit only one review per product. Product skip is idempotent and
  terminal for reminder resolution but stays in the conversion denominator.
  Image/Mux upload ownership is bound to batch session plus request; review/media
  claim is transactional and provider publish/cleanup remains outbox-owned.
- Every unsubscribe token owns an immutable copy of the batch recipient's
  case-preserving exact HMAC, its key version, and normalization version. The
  attempt link remains nullable with `ON DELETE SET NULL`, so a retained link
  can still create an exact-identifiable suppression after attempt retention
  without retaining plaintext or new ciphertext. Folded identity remains only
  a send-policy/suppression key and never selects erasure targets. DSR resolves
  all retained exact-HMAC key candidates, freezes matching token ids as
  `unsubscribe-token:{id}` resources, and uses the same id-scoped deletion in
  normal execution and journal replay. Journal schema v1 remains compatible:
  older progress and payloads without these token resources decode as an empty
  token set.
- DSR closes batch/request analytics before reversal, scrubs recipient and raw
  provider identifiers, revokes tokens/sessions, and leaves a protected
  late-event tombstone. Late provider events cannot recreate PII, suppression,
  receipts, or metrics. Batch details use the existing 180-day policy,
  contribution tombstones use 210 days, and dynamic journal retention remains
  governed by the V5 copy-register formula.

Analytics counters deliberately separate physical-email evidence, product
request conversion, and batch resolution. Provider outcomes are evidence facts,
not one mutually exclusive status; for example, accepted can coexist with a
later delivery, bounce, or complaint. Product inclusion and review counters use
request/attempt manifests, while batch counters contribute at most once through
dedupe keys. `outcomeUnknown` is a reversible gauge-like contribution and is
decremented when later evidence or an audited `confirmed_not_sent` decision
resolves it. Product skip remains in the conversion denominator. The operational
metric glossary lives in [[Database_Map]]; open/click tracking, revenue
attribution, and the merchant analytics UI are not implemented.

The additive migration is
`20260715120000_add_review_email_batch_envelope_v32`. Legacy request-scoped
job/token/session columns remain nullable behind SQL XOR checks for deployment
overlap; their contract removal requires separate zero-legacy-row evidence.
The feature remains disabled. The additive migration/deployment checkpoint
completed on 2026-07-20 with all 59 migrations applied and zero customer email
lifecycle rows; successful report-mode maintenance audit rows are expected and
are not customer lifecycle data. No AWS email resource, review-domain DNS/env
activation, or email send is authorized by this checkpoint.

Deferred provider gates remain explicit:

- **AWS sender:** SQS/Lambda/EventBridge implementation, SES tenant/configuration
  mapping, provider-suppression reconciliation, queue leases, and operator
  resolution for ambiguous attempts.
- **Sandbox/provider contract:** real raw-message DKIM/List-Unsubscribe coverage,
  delivery/delay/bounce/complaint ordering and duplicate evidence, and verified
  recipient end-to-end delivery.
- **Production canary:** DNS/custom MAIL FROM, SES production access, DLQ/alarms,
  legal/compliance copy, deliverability monitoring, and rollback evidence.
- Unsubscribe preference survival across uninstall/reinstall is a separate
  privacy/legal decision. The current fail-closed source default removes local
  PII preference data during uninstall.

### 2026-07-16 Historical Cutoff and Exact Terminal Evidence V2.2

The disabled source now prevents old deliveries from becoming newly eligible
because of an unrelated later order/package update:

- A successful webhook-registration-backed `false -> true` settings transition
  records `ReviewEmailSettings.eligibilityStartsAt`. A later disable/re-enable
  records a new epoch; ordinary edits while enabled retain the existing epoch.
- Reconciliation continues to discover orders through its bounded installation
  and `listOrder(updatedAt)` cursor window. It is deliberately not clamped to
  `eligibilityStartsAt`, so an order created before enablement but delivered
  afterward can still be found. Final eligibility is enforced at the member
  level, not by order creation time.
- Shipment cutoff evidence comes only from a delivered line's exact
  `OrderLineItem.statusUpdatedAt`. Package/order `updatedAt`, `orderedAt`,
  webhook `receivedAt`, and processing time remain discovery/current-state
  evidence and cannot cross the activation cutoff.
- All required lines for a product must have exact delivered-line evidence.
  The product `eligibleAt` is the maximum of those timestamps; one missing
  timestamp blocks the entire product rather than falling back to a broader
  timestamp.
- New batches freeze `eligibilityStartsAtSnapshot`. Sender prepare and
  send-commit re-read the active installation, enabled setting, and matching
  cutoff snapshot before authorizing work.
- Disable serializes on the installation lifecycle lock. It closes email access
  and cancels scheduled/deferred/reminder work that has not crossed
  `sendCommittedAt`. A committed attempt may finish, but disabled access blocks
  reminder creation and no old cancelled backlog is revived after re-enable.
- All four supported shipping methods require actual package and line
  `DELIVERED`; pickup-ready is not a review trigger. Digital and no-shipment
  orders follow the same delivered-evidence rule rather than a source-specific
  timing fallback.

The additive migration is
`20260716120000_add_review_email_eligibility_cutoff`. Production was verified
read-only to contain no review-email lifecycle rows and not to have the V3.2
batch migration applied. This checkpoint performs no production DB, AWS, SES,
DNS, Vercel, or ikas mutation.

### 2026-07-16 Confirmation and Access Contract Hardening

The disabled source now pins the existing provider-ambiguous and access
lifecycle without adding schema or product settings:

- New send commits persist their 24-hour confirmation deadline. Maintenance
  selects persisted deadlines and supports legacy null rows only through the
  original provider-call timestamp; repeated maintenance runs cannot move the
  deadline forward.
- `awaiting_confirmation` and terminal `outcome_unknown` remain non-resendable
  and preserve possible-delivery access until normal token expiry. Late signed
  provider evidence may still resolve the attempt. Only audited
  `confirmed_not_sent` closes old access and reopens safe retry.
- Focused tests pin exact/folded email normalization boundaries, Gmail dot/plus
  preservation, invalid address rejection, lifecycle-specific token/session
  revocation, post-send setting behavior, and expired-credential non-revival.
- The full unit suite passed `556/556`. The review-email integration suite
  passed `26/26` against clean disposable PostgreSQL 16 and `26/26` against
  PostgreSQL 17 after all 58 migrations. Prisma generation, TypeScript, ESLint,
  and the Next.js webpack production build also passed.
- MCP `listOrder` list/introspection and a direct read-only OAuth query verified
  the manual-order evidence surface. Order `1010` was `createdBy=ADMIN`, used
  `SHIPMENT`, and exposed coherent delivered package/line membership plus exact
  line `statusUpdatedAt`. Its canonical order customer still reported
  `notificationsAccepted=false`; the later 2026-07-20 ikas answer confirmed
  this field is an immutable order snapshot rather than send-time consent.

No production DB, AWS, SES, DNS, Vercel, or outbound-email mutation was
performed by the agent. The merchant performed the dev-store manual-order
status transitions and an uninstall/reinstall to restore OAuth. No
`StoreDataErasureRun` was observed from that uninstall, so provider-side
`store/app/deleted` registration/acceptance remains an explicit launch gate.

### 2026-07-20 ikas Customer And Delivery Contract Alignment

The detailed ikas developer answer received on 2026-07-20 supersedes the
earlier consent and delivery assumptions without replacing the Batch/Envelope,
token, DSR, analytics, or reconciliation architecture:

- Order `notificationsAccepted` is retained only as historical audit evidence.
  The provider-neutral sender preflight re-reads `listOrder`, synchronizes the
  current order, then reads `listCustomer`. Only current
  `subscriptionStatus=SUBSCRIBED`, an undeleted customer, and an exact canonical
  email match authorize attempt preparation.
- OAuth source includes `read_customers`; enablement fails before webhook/cutoff
  writes when `read_orders` or `read_customers` is absent. Existing
  installations missing the scope require a separate reauthorization rollout.
- Consent evidence is bounded and attempt-scoped. It expires after 60 seconds,
  is rechecked before send commit, contains no raw customer response, and is
  scrubbed with attempt PII by DSR/retention.
- `IkasOrderLineSnapshot.firstDeliveredAt` persists the first exact delivered
  transition observed while the line is `DELIVERED`. Later ikas refund/cancel
  status timestamps cannot overwrite it. Current line/package state must still
  be eligible, so history alone never reopens a request.
- SHIPMENT, CLICK_AND_COLLECT, DIGITAL_DELIVERY, and NO_SHIPMENT all require
  package and included-line `DELIVERED`. Pickup-ready alone is ineligible.
- Durable grouping hashes canonical sorted package line ids. Re-created package
  ids carrying the same line set resolve to the same batch. Missing or
  contradictory membership fails closed.
- `orderPaymentStatus=FAILED` blocks; `WAITING + DELIVERED` remains valid.
  Refund/cancel/return states close affected pending work, and rejected
  refund/cancel flows do not automatically revive it.
- Manual orders do not receive a source-specific branch or toggle; they follow
  their selected shipping method and the same current-customer/evidence rules.

Migration `20260720120000_align_ikas_review_email_contracts` is expand-only:
nullable evidence columns and default changes only, with no historical
backfill. The feature remains disabled and no production DB, ikas, AWS, SES,
DNS, Vercel, or outbound-email mutation is part of this checkpoint.

2026-07-10 V5 correctness hardening after the nine-finding source audit:

- DSR request digests are derived from versioned HMAC subject hashes, not raw
  canonical email. Frozen inventory and journal evidence now distinguish order
  snapshots matched directly by the exact subject from snapshots linked only by
  a matched request. Both active exact-HMAC candidates and folded suppression
  candidates are frozen, so retry and restore replay do not depend on raw email
  surviving process memory.
- `ReviewRequest` holds explicit non-deferrable `ON DELETE RESTRICT` references
  to its order and line snapshots; line-to-order remains `ON DELETE CASCADE`.
  DSR locks candidate order parents in ID order, deletes only matched request
  families, recounts remaining references, and then either deletes the final
  direct-subject order family, scrubs customer PII on a shared order, or
  preserves a snapshot whose current subject changed. Linked-only parents are
  never selected for deletion. Normal execution and journal replay call the
  same transaction helper.
- DSR runs use a leased, bounded retry state machine. Crash/error work is
  retried by daily maintenance, exhausted runs surface through cron
  observability, and only `succeeded` runs are eligible for retention purge.
- Journal retention starts at a persisted first-write timestamp. Active-horizon
  coverage verifies full metadata, content length/type, SSE-S3, checksum,
  canonical bytes, exact version, and Object Lock. It performs the actual
  erasure replay before passing. The horizon is filtered by payload `createdAt`,
  including the boundary day. One latest lifecycle delete marker is accepted
  only after `version.lastModified + activeRetentionDays`; early, non-latest,
  marker-only, multi-marker, and multi-version keys fail closed. Version scans
  consume both S3 continuation markers on every page.
- The permanent genesis object now requires Object Legal Hold `ON` and a
  dedicated genesis operator role. Restore coverage uses a separate read-only
  role; runtime writer IAM still has no delete, retention-change, legal-hold
  mutation, or governance-bypass rights.
- Uninstall erasure is journal-first and bounded. It deletes review/customer
  content, enqueues idempotent AWS/Mux cleanup jobs, recalculates summaries, and
  removes order/email/auth PII in batches. QStash signed continuations provide
  prompt progress while daily maintenance remains the fallback. Normal batch
  continuation does not consume the consecutive-failure budget. The exact
  store, authorized app, generation, and `erasing` installation are rechecked
  before attempt exhaustion, before and after S3 journal I/O, and inside every
  destructive batch/finalization transaction. Reinstall during network I/O or
  between batches therefore preserves the new generation. Live finalization
  deletes only the exact app token and conditionally erases exactly one matching
  installation. Duplicate provider webhooks return the existing pending or
  terminal run rather than executing or resetting it.
- Restore replay is authorized by verified immutable journal evidence, not by
  the mere existence of a run row. The payload generation and `createdAt`
  protect a newer current generation or an activation at/after journal
  creation; those cases end `stale_ignored`. A replay may proceed only when no
  current installation exists or the current row represents an older restored
  lifecycle. A replay cannot overwrite a live-uninstall run with the same
  `runId`.
- Analytics reversal uses the receipt manifest as the one-time authority even
  after the 210-day contribution row expires. A later subject erasure replaces
  a prior detail-retention close reason, and late provider events remain fenced.
- Partial order/package cancellation or refund no longer closes unaffected
  delivered lines. `saveWebhooks` receives only current MCP-valid order scopes;
  uninstall readiness is a separate provider verification gate.
- Review-email persistence and observability use context-specific allowlisted
  lower-snake-case error codes. Unknown exceptions become fixed fallback codes;
  raw messages, stacks, emails, tokens, URLs, provider bodies, queries, and
  connection strings are not written to DB, console, or Sentry. Sentry receives
  a synthetic code-only `Error` plus an optional opaque run/event ID. SES/SNS
  bounded message-ID evidence remains unchanged.
- Verification evidence after this hardening: all `56` migrations applied to a
  clean PostgreSQL 16 database, `466` unit tests and `12` PostgreSQL integration
  tests passed, including the shared-order DSR/reconciliation race, parent-FK
  rejection, conditional scrub/delete, changed-subject preservation, journal
  replay, lifecycle-marker, and error-canary contracts. No production
  DB/provider/env/deploy mutation occurred.

2026-07-10 V5 retention, analytics, DSR, and journal source implementation:

- Added expand-only migration
  `20260710210000_add_review_email_retention_analytics_journal`. It introduces
  exact-subject blocks, durable order-product receipts, idempotent DSR runs,
  signed daily metrics/contributions, bounded purge evidence, and journal
  coverage checks. `Review.reviewRequestReceiptId` is unique and uses
  `ON DELETE SET NULL`; DSR idempotency is uniquely enforced by
  `(storeId, idempotencyKeyHash)`. All new sensitive tables have RLS enabled and
  browser-role grants revoked.
- Email identity normalization now preserves local-part case for DSR selection,
  lowercases/Punycodes only the domain, and uses a separate folded identity only
  for suppression and pre-persistence reingestion fencing. Folded matches never
  select or delete subject data; Gmail dot/plus rewriting is not performed.
- The JWT-authenticated `POST/GET /api/ikas/review-email-data-subject` contract
  derives the tenant only from the token, requires explicit erasure confirmation
  and a UUID `Idempotency-Key`, rejects key reuse with a different digest, rate
  limits requests, and returns private/no-store responses. One exact subject may
  legitimately select multiple orders, requests, and reviews.
- Receipt-locked contribution transactions apply unique signed deltas to daily
  metrics. DSR closes analytics first, reverses the compact manifest once,
  tombstones contribution dedupe evidence, and prevents late SES events from
  recreating suppression, receipts, or aggregate counts.
- DSR review deletion and media cleanup outbox creation share one transaction
  with `applyReviewSummaryRemovals()`. Counts, rating/media buckets, average,
  and the remaining approved-review `MAX(createdAt)` are recalculated; admin
  review deletion uses the same helper.
- Retention is bounded at batch `100`, at most `5` batches and `10` seconds per
  run. Defaults are terminal token/session grace `7` days, detail `180` days,
  and contribution tombstones `210` days. Rollout begins in `report` mode;
  `enforce` is a separate production gate. Receipt, subject block, and daily
  aggregate live for the active installation; uninstall removes their DB rows.
- `config/review-email-copy-register.json` is the machine-readable copy-policy
  source. The unverified target is `supabase-managed-daily-backup` with a
  seven-day restore window, matching the current Supabase Pro daily-backup
  contract. The formula still yields journal active retention `35` days and
  physical/Object-Lock target `42` days. `approved_target` is not live restore
  evidence; the first managed backup must be observed before the register can
  become `verified_current`. These are parameters, not runtime self-adjustment:
  drift blocks rollout and requires a separately approved CloudFormation
  update.
- The journal uses deterministic canonical JSON, a stable per-run S3 key,
  `If-None-Match: *`, SHA-256 checksum metadata, versioning, Governance Object
  Lock, and a writer role without delete, retention-change, or bypass rights.
  A PUT-success/DB-crash retry treats `412` as success only after version,
  metadata, content type, encryption, checksum, exact bytes, and retention all
  match; any conflict fails closed before erasure and emits a sanitized Sentry
  issue tagged `source:review-email-journal`, `task:journal-conflict`. The live
  notification action for that issue is a separate rollout verification gate.
- Immutable genesis and coverage checks fence restores. Outbound email remains
  disabled until every journal intent after the restore target validates and
  orphan S3 evidence is replayed idempotently. Extending existing object-version
  retention uses a dedicated role that can only move retention forward and
  requires a separate operator approval; expired journal history cannot be
  reconstructed retroactively.
- Earlier baseline evidence (superseded by the hardening checkpoint above): all `56` migrations apply to a clean PostgreSQL 16 database;
  Prisma schema diff is empty; the seven V5 tables report RLS enabled; the full
  unit suite passed (`443` tests); and the local-only integration suite passed
  (`5` tests), including DSR/receipt/review uniqueness and a real bounded purge
  report scan. TypeScript, ESLint, local template validators, and regional
  `cfn-lint` pass; a direct Next.js 16.2.1 production build also completes
  without invoking the repository's migration-deploy wrapper. No production
  DB, AWS, Vercel, DNS, env, deploy, or provider mutation was performed.

Production rollout remains explicitly staged: additive DB migration, journal
bucket/IAM change sets, genesis creation, Vercel env, retention report
acceptance, retention enforce, and outbound SES/AWS dispatch are separate
mutation gates. The copy register's seven-day daily-backup value is an
unverified approved target and must be checked against the actual managed
database restore configuration before journal activation.

2026-07-10 V3 DB/backend lifecycle source implementation:

- Added additive migration
  `prisma/migrations/20260710120000_add_review_request_email_lifecycle/` and
  the matching Prisma models/fields.
- Added additive hardening migration
  `prisma/migrations/20260710150000_harden_review_email_installation_lifecycle/`
  with `IkasStoreInstallation`, erasure generation evidence, and the
  `AuthToken(merchantId, updatedAt)` index.
- Added `src/lib/review-email/` lifecycle helpers for settings, protected PII,
  ikas order normalization, eligibility timing, versioned token/session state,
  send-attempt recovery, reconciliation leases, SES feedback persistence,
  expiry maintenance, and retryable erasure.
- Added the ikas order webhook receiver, internal review-email due-job and
  reconciliation endpoints, host-isolated fragment-token exchange/session
  endpoint and page, and merchant review-email settings API.
- Updated `POST /api/public/reviews` so a valid review-request session marks the
  review as verified buyer and atomically consumes request/token/session while
  DB uniqueness prevents parallel duplicate reviews. Tokenless public
  submissions remain unchanged.
- Revised timing defaults are implemented in app validation: first request
  `1` day after eligibility, reminder `1` day after actual `firstSentAt`, max
  reminder count `1`. Reminder delay is not compared to first delay because the
  clocks start from different lifecycle events.
- SES feedback route now persists signed notification evidence and suppression
  state instead of only returning sanitized metadata.
- Follow-up correctness audit added a shared install-generation fence, removed
  token refresh upsert/recreation, made disabled order ingest and internal
  scheduler routes fail closed, versioned customer-email HMAC/AES-GCM values,
  and made stale uninstall retries no-op after reinstall.
- Removed the contradictory direct Vercel SES runtime-role source template;
  sender IAM belongs to the future SQS/Lambda worker package.
- Validation evidence: all 55 migrations apply to an empty PostgreSQL 16 DB;
  Prisma migration/schema diff is empty; `IkasStoreInstallation` reports RLS;
  the lifecycle and auth-token indexes exist. A real two-connection PostgreSQL
  integration test proves uninstall/reinstall serialization and stale-uninstall
  rejection. Full unit suite (`426` tests), TypeScript, ESLint, and direct
  Next.js production build pass locally. Production migration/deploy was not
  run.

2026-07-10 DB/lifecycle contract review:

- Re-verified `listOrder` and `saveWebhooks` through ikas MCP. `listOrder`
  exposes the fields and filters needed for canonical order re-read and
  `saveWebhooks` lists `store/order/created` and `store/order/updated`.
- Re-verified the installed ikas SDK webhook type. The webhook envelope has
  `id`, `createdAt`, `scope`, `merchantId`, `data`, `signature`, and
  `authorizedAppId`; the helper signs/verifies the `data` string with
  HMAC-SHA256.
- Re-verified AWS live state with the `renuvex-readonly` SSO role in account
  `989086371563`: SES is healthy but still sandboxed in `eu-central-1`;
  identities and configuration sets are empty; SQS queues, SNS topics, Lambda
  functions, EventBridge Scheduler schedules, and review-email CloudFormation
  stacks are not present.
- Re-verified source state: `@aws-sdk/client-sesv2` and
  `@aws-sdk/client-sqs` are not installed; SES feedback tests exist, but there
  is no outbound SES sender, email queue, due scanner, Lambda worker, or Prisma
  review-request schema.
- Accepted the additive DB/lifecycle contract above as the next implementation
  target. Superseded later the same day by the source implementation checkpoint
  above.

2026-07-09 source package:

- Added the SES feedback verification helper and internal endpoint:
  `src/lib/email/ses-sns.ts` and
  `src/app/api/internal/email-events/ses/route.ts`.
- Added source-only CloudFormation foundation template:
  `infra/aws/review-email-foundation.cloudformation.json`.
- The foundation template targets `eu-central-1`, sender domain
  `reviews.renuvex.app`, visible sender
  `requests@reviews.renuvex.app`, custom MAIL FROM
  `bounce.reviews.renuvex.app`, configuration set
  `renuvex-review-requests-prod`, SNS `SignatureVersion=2`, selected SES event
  types excluding `OPEN`/`CLICK`, and a 14-day encrypted SQS DLQ.
- Local validator and AWS read-only `cloudformation validate-template` pass for
  the foundation template. The later V3 architecture deliberately removed the
  source-only direct Vercel SES role; a future Lambda worker package must define
  its own least-privilege execution role.
- No AWS stack, DNS, Vercel env, DB, QStash schedule, deploy, or email send was
  performed in this checkpoint.

## Consequences

- Source runtime and schema now contain the disabled review-request lifecycle
  implementation. Environment, DNS, AWS, QStash, production DB, and deployment
  behavior are unchanged until a separate approved rollout.
- Future code must preserve the provider/dispatcher boundaries and keep PII out
  of dispatcher payloads, including SQS messages.
- The V5 schema and lifecycle shape are implemented locally. The next gates are
  rollout packages, not ad hoc schema edits: production additive migration,
  journal bucket/IAM change sets and genesis, report-mode acceptance, then the
  outbound email/provider-worker layer and product UI. AWS journal,
  queue/Lambda/EventBridge resources each require separate mutation approval.
- The schema keeps sender mode, merchant branding, template version, Reply-To,
  and provider identity references separate so the product can add
  merchant-domain sending later without replacing the initial Renuvex sender
  path.
- AWS setup needs SES identity/configuration-set/feedback IaC, email SQS/DLQ,
  EventBridge due-scan trigger, Lambda sender, least-privilege Lambda/IAM roles,
  a Secrets Manager or SSM strategy if AWS workers need DB/API credentials, DNS
  records, sandbox removal, alarms, and live mailbox-simulator tests. Each
  remains a separately approved mutation package.
- The source package is ready for a future mutation plan, but the next gate must
  still request explicit approval before creating CloudFormation change sets or
  adding DNS/env values.
- A database restore horizon may not be increased merely by changing the
  managed-database setting. The copy register, CloudFormation retention, all
  existing journal versions, and coverage evidence must first satisfy the
  longer window through the separately authorized extension workflow.
- The external ikas platform contract and additive DB/lifecycle implementation
  are now recorded. The next gate should keep platform facts separate from the
  remaining product/legal and AWS runtime decisions.
- Every future mutation remains separately gated.

## Evidence

Project evidence:

- `prisma/schema.prisma`
- `src/globals/config.ts`
- `src/lib/ikas-client/graphql-requests.ts`
- `src/lib/product-snapshots.ts`
- `src/app/api/webhooks/ikas/products/route.ts`
- `src/app/api/public/reviews/route.ts`
- `src/widget/reviews-section/review-form-modal/steps/step-author.js`
- `src/lib/media/dispatcher.ts`
- `src/app/api/internal/media-jobs/route.ts`
- `src/app/api/internal/scheduled-jobs/route.ts`
- `src/lib/scheduled-jobs.ts`
- `package.json`
- `.env.example`
- `src/lib/email/ses-sns.ts`
- `src/app/api/internal/email-events/ses/route.ts`
- `tests/unit/ses-sns-events.test.ts`
- `tests/unit/ses-events-route.test.ts`
- `infra/aws/review-email-foundation.cloudformation.json`
- `scripts/validate-review-email-foundation-template.mjs`
- `infra/aws/review-images-runtime-iam.cloudformation.json`
- `src/lib/media/providers/aws-review-image.ts`
- `infra/aws/`
- `node_modules/@ikas/admin-api-client/dist/models/webhook/models.d.ts`
- `node_modules/@ikas/admin-api-client/dist/helpers/webhook-helpers.js`

External contract evidence:

- ikas MCP `list`, `introspect("listOrder")`, and
  `introspect("saveWebhooks")`, re-verified 2026-07-10.
- Direct ikas developer feedback on 2026-07-09, summarized in
  [[Ikas_Order_Review_Request_Notes]].
- AWS CLI read-only verification on 2026-07-10 with
  `renuvex-readonly`: `sts get-caller-identity`, `sesv2 get-account`,
  `sesv2 list-email-identities`, `sesv2 list-configuration-sets`,
  `sqs list-queues`, `sns list-topics`, `lambda list-functions`,
  `scheduler list-schedules`, and filtered CloudFormation stack listing.
- [ikas Orders API](https://ikas.dev/docs/api/admin-api/orders)
- [ikas Webhooks API](https://ikas.dev/docs/api/admin-api/webhooks)
- [Amazon SES production access and sandbox](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html)
- [Amazon SES identities](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html)
- [Amazon SES custom MAIL FROM](https://docs.aws.amazon.com/ses/latest/dg/mail-from.html)
- [Amazon SES configuration sets](https://docs.aws.amazon.com/ses/latest/dg/managing-configuration-sets.html)
- [Amazon SES event publishing](https://docs.aws.amazon.com/ses/latest/dg/monitor-using-event-publishing.html)
- [Amazon SES event destinations](https://docs.aws.amazon.com/ses/latest/dg/event-destinations-manage.html)
- [Amazon SES tenant management](https://docs.aws.amazon.com/ses/latest/dg/tenants.html)
- [Amazon SES tenant suppression](https://docs.aws.amazon.com/ses/latest/dg/sending-email-suppression-list-tenant-level.html)
- [Amazon SES sender reputation practices](https://docs.aws.amazon.com/ses/latest/dg/tips-and-best-practices.html)
- [Amazon SNS signature verification](https://docs.aws.amazon.com/sns/latest/dg/sns-verify-signature-of-message.html)
- [Amazon SNS dead-letter queues](https://docs.aws.amazon.com/sns/latest/dg/sns-dead-letter-queues.html)
- [Amazon SNS subscription DLQ configuration](https://docs.aws.amazon.com/sns/latest/dg/sns-configure-dead-letter-queue.html)
- [Amazon EventBridge Scheduler](https://docs.aws.amazon.com/eventbridge/latest/userguide/using-eventbridge-scheduler.html)
- [Amazon EventBridge Scheduler schedule types](https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html)
- [Amazon EventBridge Scheduler targets](https://docs.aws.amazon.com/scheduler/latest/APIReference/API_Target.html)
- [Amazon SQS pricing](https://aws.amazon.com/sqs/pricing/)
- [AWS Lambda with SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html)
- [AWS Lambda SQS event source configuration](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html)
- [Amazon S3 conditional writes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html)
- [Enforcing conditional writes with S3 bucket policy](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes-enforce.html)
- [Amazon S3 Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html)
- [S3 lifecycle with Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-and-other-bucket-config.html)
- [Vercel OIDC for AWS](https://vercel.com/docs/oidc/aws)
- [QStash pricing](https://upstash.com/pricing/qstash)
- [QStash at-least-once delivery](https://upstash.com/docs/qstash/features/at-least-once)
- [QStash delayed delivery](https://upstash.com/docs/qstash/features/delay)

## Related Source Files

- [prisma/schema.prisma](prisma/schema.prisma)
- [src/globals/config.ts](src/globals/config.ts)
- [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts)
- [src/lib/product-snapshots.ts](src/lib/product-snapshots.ts)
- [src/app/api/webhooks/ikas/products/route.ts](src/app/api/webhooks/ikas/products/route.ts)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/widget/reviews-section/review-form-modal/steps/step-author.js](src/widget/reviews-section/review-form-modal/steps/step-author.js)
- [src/lib/media/dispatcher.ts](src/lib/media/dispatcher.ts)
- [src/app/api/internal/media-jobs/route.ts](src/app/api/internal/media-jobs/route.ts)
- [src/app/api/internal/scheduled-jobs/route.ts](src/app/api/internal/scheduled-jobs/route.ts)
- [src/lib/email/ses-sns.ts](src/lib/email/ses-sns.ts)
- [src/app/api/internal/email-events/ses/route.ts](src/app/api/internal/email-events/ses/route.ts)
- [infra/aws/review-email-foundation.cloudformation.json](infra/aws/review-email-foundation.cloudformation.json)

## Obsidian Links

- [[Decision_Index]]
- [[ADR_0004_Ikas_Integration_Strategy]]
- [[ADR_0035_QStash_Scheduler_For_Maintenance]]
- [[Ikas_API_Notes]]
- [[Ikas_Order_Review_Request_Notes]]
- [[Roadmap]]

## Change Log

- 2026-07-20: Merged PR #8 and applied the three approved additive migrations
  in Production (`59/59`, no failed migrations, zero customer email lifecycle
  rows) while keeping the global feature absent/disabled. Live acceptance found
  that disabled public review routes consulted activation-only host config
  before the flag and returned `500`. PR #9 (`7e89a6dd`) deployed the follow-up
  contract; six live route checks now return `404 not_found` before any secret,
  host, rate-limit, or persistence access. `reviews.renuvex.app`, AWS sender
  resources, and outbound email remain separately gated.
- 2026-07-20: Aligned disabled review-email source with the detailed ikas
  customer/order contract. Current customer subscription and exact email now
  authorize sending; immutable first-delivery evidence, package-line-set batch
  identity, four-method delivered eligibility, payment failure exclusion,
  consent evidence expiry, DSR cleanup, OAuth scope gating, and focused tests
  replace the superseded order-snapshot consent and package-id assumptions. No
  live provider or production mutation occurred.
- 2026-07-16: Hardened the disabled confirmation-deadline and access-revocation
  contracts without schema changes. Maintenance now prioritizes persisted
  deadlines with provider-call-time legacy fallback; ambiguous outcomes remain
  non-resendable, canonicalization and revocation boundaries have focused
  coverage, and the complete unit/integration/static gate passed on disposable
  PostgreSQL 16/17. A live manual-order fixture proves `ADMIN` origin and exact
  shipment evidence; its order-consent interpretation was superseded by the
  2026-07-20 current-customer contract. The merchant performed the
  fixture/reinstall; the agent made no production or provider mutation.
- 2026-07-16: Added the disabled historical-cutoff and exact terminal-evidence
  contract. Shipment eligibility now requires each delivered line's exact
  `statusUpdatedAt` at or after a settings activation epoch, multi-line products
  use the latest required timestamp, generic package/order updates cannot cross
  the cutoff, and disable cancels only pre-commit work. The 2026-07-20 contract
  later generalized exact delivered evidence to all four shipping methods.
  Added an additive migration and PostgreSQL 16/17 lifecycle proof; no live
  mutation occurred.
- 2026-07-15: Implemented the disabled Multi-Product Batch / Envelope V3.2
  source contract. Added delivery-group batches, product-scoped requests,
  physical job/attempt separation, provider-neutral event transport,
  send-commit/frequency/suppression fences, batch token and multi-device review
  center, per-product submit/skip/media ownership, batch analytics/DSR/retention,
  and additive deployment-overlap compatibility. AWS sender, sandbox/provider
  validation, production migration, and live activation remain separately
  gated; no live mutation occurred.
- 2026-07-11: Closed the pre-commit V5 blockers without changing the public
  feature scope. Added direct-vs-linked DSR inventory, `RESTRICT` request-parent
  FKs, conditional shared-order PII scrub, exact-horizon lifecycle-marker
  coverage with dual-marker pagination proof, and code-only failure
  observability. Production migration history and AWS journal absence were
  verified read-only before editing; no live mutation occurred.
- 2026-07-10: Implemented the disabled V5 retention/analytics/DSR/journal
  source package. Added exact-subject erasure with folded-only suppression,
  receipt-fenced reversible aggregates, bounded report/enforce purge, shared
  review-summary removal, deterministic immutable S3 journal intent with strict
  `412` recovery, restore coverage checks, copy-register-derived `35/42` day
  defaults, and separately authorized retention extension. A clean PostgreSQL
  16 run applied all 56 migrations and passed 5 integration tests; 443 unit
  tests and local IaC/type/lint gates passed. No live mutation occurred.
- 2026-07-28: Hardened store erasure against reinstall races. OAuth activation,
  run acquisition/retry, journal pre/postflight, destructive batches, and
  finalization now share the installation-first store lock and exact generation
  fence. Duplicate uninstall deliveries do not restart work; restore replay
  cannot overwrite a live run or cross a newer activation. The copy register
  now records the unverified Supabase Pro daily-backup target as seven days
  while preserving the derived `35/42` journal retention. This source package
  does not activate journal envs, AWS journal stacks, SES sending, or the
  production feature.
- 2026-07-10: Hardened the disabled V3 source after a full correctness audit.
  Added an additive install-generation lifecycle fence, stale-uninstall
  protection, disabled-store no-PII gates, canonical merchant binding,
  reconciliation/webhook creation fencing, non-resurrecting token refresh,
  and a versioned customer-email PII key ring. A disposable PostgreSQL 16 test
  caught and corrected Prisma handling of the `void` advisory-lock result, then
  proved concurrent uninstall/reinstall serialization. No production mutation
  was performed.
- 2026-07-10: Re-ran the ikas/AWS/backend review for the review-request email
  lifecycle and accepted the additive DB schema direction. Added the required
  order webhook audit, order/line snapshots, request/token, email job/attempt,
  SES event, suppression, reconciliation cursor, erasure-run, and verified
  buyer fields. Recorded the `store/app/deleted` registration caveat: ikas
  feedback and SDK enum include it, but `saveWebhooks` MCP scope text does not.
- 2026-07-10: Revised the email dispatch decision after the AWS/QStash
  architecture review: existing QStash media and maintenance jobs remain in
  place, while the first review-request email dispatcher targets AWS-native
  EventBridge due scans, SQS buffering, Lambda sending, and SES delivery behind
  provider-neutral boundaries. Per-email one-time EventBridge schedules and a
  full QStash teardown are explicitly rejected for this phase.
- 2026-07-09: Recorded direct ikas order/review-request platform feedback:
  order webhooks are valid wake-up signals, canonical order state should be
  re-read with `listOrder`, physical delivery uses `orderPackageStatus`, pickup
  and digital/no-shipment require separate branches, reconciliation uses
  `updatedAt` pagination, and uninstall requires personal-data deletion or
  anonymization within 24 hours. Consent and delivery details were superseded by
  the 2026-07-20 contract.
- 2026-07-09: Prepared the SES foundation source package without provider
  mutation: CloudFormation templates, validators, disabled env placeholders, and
  a fail-closed signed SNS feedback endpoint skeleton. AWS stacks, DNS, Vercel
  env, DB schema, outbound sending, and rollout remain separately gated.
- 2026-07-09: Added the product sender-mode direction: first release uses a
  Renuvex-managed sender with bounded merchant branding controls; merchant
  custom-domain sending and full free-form template editing are deferred but
  kept compatible with the future data model.
- 2026-07-09: Accepted the first infrastructure contract: SES in
  `eu-central-1`, `requests@reviews.renuvex.app`, custom MAIL FROM, Vercel OIDC,
  provider-neutral application boundaries, tenant-aware ownership, QStash
  opaque-job dispatch, signed SNS feedback with SQS DLQ, and explicit VDM/global
  endpoint deferral. This was superseded for email dispatch on 2026-07-10 by the
  AWS-native dispatcher decision and superseded for DB shape by the 2026-07-10
  additive DB/lifecycle contract.
