---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-07-09
updated: 2026-07-11
last_verified: 2026-07-11
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
  - "config/review-email-copy-register.json"
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
  - "src/app/request/page.tsx"
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
  - "scripts/calculate-review-email-journal-retention.mjs"
  - "scripts/validate-review-email-erasure-journal-templates.mjs"
  - "scripts/initialize-review-email-journal-genesis.mjs"
  - "scripts/extend-review-email-journal-retention.mjs"
  - "scripts/run-review-email-journal-coverage.ts"
  - "tests/integration/review-email-installation-fence.test.ts"
  - "tests/integration/review-email-v5-db-guarantees.test.ts"
---

# ADR_0036 - Review Request Email Architecture

## Agent Brief

Use this draft when researching or designing post-purchase review-request
email, verified-buyer submission, Amazon SES delivery, or email-job scheduling.
The provider boundary, SES regional/sender/runtime/feedback contract,
provider-neutral tenant direction, and source-only SES foundation package are
accepted. Review-request email dispatch now targets an AWS-native first
implementation using EventBridge, SQS, Lambda, and SES. Existing QStash media
and maintenance scheduling remains in place and is not part of the email
cutover. Direct ikas feedback confirms the order webhook/listOrder,
delivery-state, reconciliation, and uninstall-retention platform contract. The
review-request DB/lifecycle V5 source implementation now exists behind a
disabled feature flag: additive/RLS-hardened Prisma migration, canonical
`listOrder` re-read, leased reconciliation, immutable settings/recipient
snapshots, explicit prepared and ambiguous send states, versioned one-time
tokens, host-isolated browser sessions, atomic verified-buyer submit, dynamic
request expiry, SES feedback persistence, installation-generation fencing,
rotatable versioned PII protection, exact-subject DSR, reversible aggregate
analytics, bounded retention, immutable S3 erasure journal intent, crash-safe
`412` recovery, restore coverage checks, and retryable erasure. AWS dispatch
resources, outbound SES sending, production migration/deploy, Lambda DB/secret
strategy, journal-stack rollout, and product/legal consent expansion remain
open. Verify the source files above and current
ikas/AWS runtime evidence before extending this ADR.
Do not apply DB migrations, create AWS resources, DNS records, QStash schedules,
Vercel environment variables, or deploys from this document without a separate
scope, risk, rollback note, and explicit approval.

## Summary

This ADR records the verified state and accepted infrastructure/application
contract for a future global-MVP review-request email feature. The first
DB/backend lifecycle and V5 retention/DSR/journal source package is implemented
but remains disabled until
migration/deploy and provider rollout are separately approved. AWS SES in
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
rollout, production migration/deploy, and production access remain open.

## Status

Accepted - infrastructure source package prepared; ikas platform contract and
additive V5 DB/backend lifecycle, retention, analytics, DSR, and journal
implementation exist in source. The feature is still off until production
migration/deploy and provider rollout are approved.

This ADR does not authorize AWS stack creation, DNS records, Vercel env writes,
DB migrations, deploys, or provider mutation.

## Date

2026-07-09

## Context

The planned capability is a post-purchase email that lets an eligible customer
open a bounded, single-use submission flow for products from a real order. A
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
- `orderPackageStatus` is the high-level physical delivery field.
  `DELIVERED` is the physical-delivery terminal state.
- `shippingMethod` must be checked because `CLICK_AND_COLLECT` may terminate at
  `READY_FOR_PICK_UP`, while digital/no-shipment orders may not have a shipping
  delivery step.
- `orderPackages[].orderPackageFulfillStatus` and `orderLineItems[].status`
  are detail fields for package/line-level decisions and partial delivery.
- `customer.email` and `customer.notificationsAccepted` may be used for
  post-order customer communication. ikas distinguishes marketing/commercial
  sending from transactional notifications; `notificationsAccepted=false` blocks
  marketing/commercial sending, while order confirmation, shipping, delivery,
  and similar transactional notifications are independent of that field.
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

Remaining decisions are now product/legal and implementation decisions, not
unknown platform facts: exact consent posture for review requests when
`notificationsAccepted=false`, digital/no-shipment timing, partial-delivery
line eligibility, schema shape, token lifetime, and rollout order.

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
- eligibility logic for physical delivered orders and click-and-collect ready
  orders, while digital/no-shipment stays closed in the first release;
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
- strict first-release consent mode requiring `notificationsAccepted=true`;
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
- production migration/deploy, SES sandbox exit, DNS/env rollout, and live email
  acceptance tests.

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
- The first accepted webhook scopes are `store/order/created` and
  `store/order/updated`, backed by Orders read access and any customer-data
  permission ikas requires for the final app review package.
- Physical-order review requests use `orderPackageStatus=DELIVERED` as the
  high-level trigger, then consult package/line detail for partial delivery.
- `CLICK_AND_COLLECT` and digital/no-shipment orders must use explicit separate
  eligibility branches; they must not be folded blindly into the physical
  delivery branch.
- Reconciliation uses `listOrder(updatedAt)` windows with `limit<=200` and
  `hasNext` pagination. The cadence and window overlap are implementation
  decisions, but the job must tolerate missed webhooks and duplicate updates.
- `store/app/deleted` must trigger deletion or anonymization of stored customer
  email, address, order references, and order-line references within 24 hours.
- `notificationsAccepted=false` is not a platform-level blocker for clearly
  transactional notifications, but the final review-request consent rule is a
  product/legal decision that must be explicit before launch.

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

Migrations `20260710120000_add_review_request_email_lifecycle` and
`20260710150000_harden_review_email_installation_lifecycle` implement this
contract in source. Both are additive and locally verified from an empty
PostgreSQL 16 database, but they are not applied to production by this
checkpoint.

Implemented ownership and privacy boundaries:

- `ReviewEmailSettings` stores bounded merchant controls and order-webhook
  registration health. Defaults are first request `1` day after eligibility,
  one reminder `1` day after first provider acceptance, trigger `delivery`, and
  strict `notificationsAccepted=true` consent.
- `IkasStoreInstallation` is the store-scoped lifecycle fence. It binds one
  active `authorizedAppId` to a monotonically increasing generation and keeps
  an erased tombstone so a delayed uninstall/retry or OAuth callback cannot
  affect another generation.
- `IkasOrderWebhookEvent`, `IkasOrderSnapshot`, and
  `IkasOrderLineSnapshot` store normalized, tenant-scoped canonical evidence.
  Raw webhook/order payloads, addresses, phone numbers, payment details, IPs,
  user agents, and plaintext customer email are not persisted. Email is stored
  as HMAC plus AES-GCM ciphertext only where sending requires it.
- `ReviewRequest` stores immutable timing/settings/recipient snapshots for one
  store/order line. `ReviewRequestToken` stores a unique HMAC hash and key
  version for one send attempt. `ReviewRequestSession` stores only a unique HMAC
  session hash.
- `ReviewEmailJob`, `ReviewEmailAttempt`, and `ReviewEmailEvent` separate
  business schedule, provider attempt, and signed SNS evidence. Queue payloads
  remain opaque job ids; recipient email and raw tokens exist only in the
  sender process between preparation and provider invocation.
- `ReviewEmailSuppression` blocks permanent bounce/complaint recipients without
  plaintext email. `IkasOrderReconciliationCursor` owns a persisted
  `updatedAt` window/page through lease owner plus fencing version.
  `StoreDataErasureRun` retains non-PII evidence and bounded retry state after
  review-email/order/auth PII is deleted.

Database-level guarantees:

- `Review.reviewRequestId @unique` plus a conditional request transition in the
  same transaction as `Review.create` allows only one verified review under
  parallel submits.
- Unique constraints cover request store/order-line ownership,
  `ReviewRequestToken.tokenHash`, one token per attempt,
  `ReviewRequestSession.sessionHash`, job request/kind/sequence and dedupe key,
  attempt correlation/job-number, webhook/SNS ids, and suppression identity.
- Due jobs use bounded `FOR UPDATE SKIP LOCKED` claims. Reconciliation page
  checkpoints require matching lease owner/version. Installation state changes
  use a transaction-scoped 64-bit PostgreSQL advisory lock plus the lifecycle
  row. All 14 sensitive
  email-domain tables have RLS enabled and browser roles receive no direct
  grants.
- Product timing limits stay in app validation (`firstDelayDays 0..30`,
  `reminderDelayDays 1..30`, `maxReminderCount 0..2`) rather than brittle DB
  checks.

Implemented state and expiry rules:

- Request states are `scheduled`, `sending`, `sent`, `sent_unknown`,
  `submitted`, `cancelled`, `expired`, `suppressed`, and `error`.
- Job states are `pending`, `leased`, `dispatched`, `processing`,
  `awaiting_confirmation`, `outcome_unknown`, `sent`, `skipped`, `retrying`,
  `failed`, and `cancelled`.
- Attempt states include `prepared`, `sending`, `accepted`,
  `awaiting_confirmation`, terminal `outcome_unknown`,
  `abandoned_before_send`, and provider delivery/failure states. Token states
  are `prepared`, `active`, `consumed`, `expired`, and `revoked`; session states
  are `active`, `consumed`, `expired`, and `revoked`.
- A raw token is generated only with the current versioned HMAC key, stored only
  as a hash, and returned in sender memory. If the sender crashes before
  `sendInitiatedAt`, maintenance abandons the prepared attempt/token after 15
  minutes and permits a new attempt. Once send starts, the token becomes active
  for 30 days from `sendInitiatedAt`.
- A missing/timeout SES result moves the attempt/job to
  `awaiting_confirmation` and the request to `sent_unknown`; it is never
  automatically resent. Signed SES feedback may reconcile it. After 24 hours,
  maintenance marks `outcome_unknown` and emits operator evidence.
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

Implemented flow:

1. A signed order webhook acts only as a wake-up signal. Active installation,
   merchant-enabled state, and canonical `merchantId` are checked before order
   PII is stored; canonical `listOrder` is then re-read and normalized.
   Periodic reconciliation uses the same fence and covers missed events.
2. Eligible physical/click-and-collect lines create one request and first job
   idempotently. Cancellation/refund/return/missing-line transitions close
   existing work.
3. A future EventBridge/SQS/Lambda dispatcher claims DB jobs and calls the
   existing prepare/initiate/finalize helpers. This AWS worker is not built or
   deployed yet.
4. Provider acceptance creates the next reminder from actual acceptance time.
   Submission, suppression, expiry, or current merchant reminder disablement
   cancels/skips pending work.
5. Email links use `https://reviews.renuvex.app/request#token=...`. The page
   removes the fragment immediately and POSTs the token once for a host-only
   HttpOnly session; raw tokens do not enter query/access logs or browser
   navigation requests. Browser Sentry and Session Replay are disabled on the
   isolated `/request` document before SDK initialization so Replay
   `initialUrl` cannot capture the fragment.
6. Verified submit atomically consumes request/token/session and creates the
   normal moderated `Review` with `verifiedBuyer=true`. Existing tokenless
   storefront submit remains unchanged.
7. Signed SES feedback updates attempts/events/suppression. Permanent bounce or
   complaint revokes active links and pending reminders.
8. A verified `store/app/deleted` event erases review-email/order/auth PII even
   when the feature flag is off. Erasure, OAuth activation, webhook audit,
   settings mutation, order sync, and reconciliation acquisition serialize on
   the same store lifecycle fence. Failed erasures retry independently with a
   bounded backoff; live registration/acceptance remains a rollout gate.

Eligibility defaults for the first implementation:

- Physical shipment: send after `shippingMethod=SHIPMENT` and
  `orderPackageStatus=DELIVERED`; partial delivery requires line/package
  mapping and cannot fan out blindly to all lines.
- Click-and-collect: use `READY_FOR_PICK_UP` as a separate trigger branch.
- Digital delivery and no-shipment: remain closed until an explicit product
  decision defines their terminal state and delay policy.
- Cancellation, refund, return, unable-to-deliver, missing customer email,
  invalid email, suppression, disabled store settings, or expired token close
  or skip pending requests/jobs.
- First-release consent mode is strict: send only when the order has a customer
  email and `notificationsAccepted=true`. ikas says transactional messages may
  be independent of that flag, but using that route for review requests remains
  a product/legal decision, not a default.

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

- Product/legal consent posture for review-request email when
  `notificationsAccepted=false`.
- Exact digital/no-shipment timing, advanced partial-delivery edge cases, resend
  rules, and reminder-count defaults beyond the first bounded release.
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
  continuation does not consume the consecutive-failure budget.
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
  source. Default approved DB restore horizon `30` days yields journal active
  retention `35` days and physical/Object-Lock target `42` days. These are
  parameters, not runtime self-adjustment: drift blocks rollout and requires a
  separately approved CloudFormation update.
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
mutation gates. The copy register's 30-day restore value is an approved source
contract and must be checked against the actual managed database restore
configuration before journal activation.

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
  anonymization within 24 hours.
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
