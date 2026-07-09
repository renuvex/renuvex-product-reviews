---
type: decision
project: renuvex-product-reviews
status: draft
created: 2026-07-09
updated: 2026-07-10
last_verified: 2026-07-10
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
  - "src/globals/config.ts"
  - "src/lib/ikas-client/graphql-requests.ts"
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
  - "infra/aws/review-email-runtime-iam.cloudformation.json"
  - "scripts/validate-review-email-foundation-template.mjs"
  - "scripts/validate-review-email-runtime-iam-template.mjs"
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
exact Prisma schema, product/legal consent stance, Lambda DB/secret strategy,
and rollout contracts remain open. Verify the source files above and current
ikas/AWS runtime evidence before extending this ADR.
Do not create AWS resources, DNS records, DB migrations, QStash schedules,
Vercel environment variables, or deploys from this document without a separate
scope, risk, rollback note, and explicit approval.

## Summary

This ADR records the verified pre-implementation state and the first accepted
infrastructure contract for a future global-MVP review-request email feature.
The target product capability is not implemented today. AWS SES in
`eu-central-1`, a review-specific sender domain, provider-neutral application
boundaries, tenant-aware ownership, AWS-native email job dispatch, and a signed
SES feedback path are accepted directions. Existing QStash usage remains scoped
to media jobs and maintenance schedules. The future review-request email flow
uses a separate `AwsEmailJobDispatcher` boundary backed by EventBridge
recurring due scans, SQS buffering, Lambda sending, and SES delivery. The
repository now contains the source package for SES identity/configuration-set/
feedback IaC, the dedicated runtime IAM role, and a signed SNS feedback endpoint
skeleton; it does not yet contain the AWS email queue/worker implementation.
Direct ikas feedback on 2026-07-09 confirms the high-level order webhook,
canonical `listOrder` re-read, delivery-state, reconciliation, and uninstall
cleanup contract. The exact additive schema, token lifecycle, product/legal
consent stance, Lambda DB/secret strategy, and rollout remain open.

## Status

Proposed - infrastructure source package prepared; ikas platform contract
recorded; application schema and rollout remain open.

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

The database has review, media, cleanup, webhook-audit, media-job, and scheduled
maintenance lock models. It does not have an email-domain model for:

- normalized order/order-line eligibility evidence;
- review-request lifecycle and scheduled send time;
- hashed one-time submission tokens and token consumption;
- email send attempts and provider message ids;
- delivery, delay, bounce, complaint, reject, or rendering-failure events;
- per-recipient or per-tenant suppression;
- template version and locale evidence;
- idempotency across order updates, retries, and duplicate provider events.

`MediaProviderJob`, `WebhookEvent`, and `ScheduledJobRunLock` are specialized
for their current media/provider and maintenance contracts. Reusing them for
email without a deliberate schema decision would mix unrelated lifecycles.

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
- `infra/aws/review-email-runtime-iam.cloudformation.json` defines the proposed
  dedicated Vercel production OIDC runtime role for `ses:SendEmail`.
- `src/app/api/internal/email-events/ses/route.ts` is a signed SNS feedback
  receiver skeleton. It verifies SNS `SignatureVersion=2`, exact topic ARN,
  trusted SNS signing certificate URL, and RSA-SHA256 signature before returning
  sanitized metadata. It does not auto-confirm subscriptions or write provider
  events to the database yet.
- `scripts/validate-review-email-foundation-template.mjs` and
  `scripts/validate-review-email-runtime-iam-template.mjs` enforce the local
  IaC contract.

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

### Missing application behavior

The application currently has none of the following:

- merchant controls for enabling review-request email or choosing delay;
- template/locale configuration;
- order-created/order-updated ingestion;
- eligibility re-check immediately before send;
- cancellation/refund/return invalidation;
- one-time review link generation and redemption;
- verified-buyer marking;
- SES send calls;
- bounce/complaint/delivery event processing;
- suppression-aware send prevention;
- email-specific rate/concurrency limits;
- AWS email due scanner, SQS queue, Lambda sender, and worker observability;
- email audit and operational runbook;
- live email acceptance tests.

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

- Vercel production obtains short-lived AWS credentials through the existing
  Vercel OIDC provider when app-side AWS calls are needed.
- The AWS-native email worker path requires a separate Lambda execution role
  with least-privilege access to its SQS queue, SES send action, CloudWatch
  logs, and any approved Secrets Manager/SSM secrets needed for DB/API access.
- Email sending uses dedicated email roles; the review-image runtime role is
  not expanded with SES, SQS, Lambda, or scheduler permissions.
- The Vercel OIDC trust policy, where used, is scoped to the exact Vercel team,
  project, production environment, and configured audience.
- Runtime permission is limited to the selected SES identity/configuration set
  and exact sender address. The first Lambda role may send via SES; app-side
  Vercel SES sending remains optional and separately justified.
- Static AWS access keys, `ses:*`, `SendRawEmail`, SES control-plane operations,
  tenant lifecycle permissions, and `iam:PassRole` are excluded from the send
  role.

### Tenant-aware, provider-neutral ownership

- `storeId` remains the application tenant identity and source of truth.
- The email-domain schema is provider-neutral. AWS SES tenant identifiers are
  provider references, not primary business identity.
- The future additive schema must separate at least tenant/provider mapping,
  normalized order-line eligibility, review-request lifecycle, hashed one-time
  tokens, dispatch/send attempts, provider events, recipient/tenant
  suppression, and template/locale evidence.
- Existing `Review.email`, `MediaProviderJob`, `WebhookEvent`, and
  `ScheduledJobRunLock` are not repurposed for these independent lifecycles.
- SES Tenant Management is the target for multi-merchant production. A store's
  tenant uses shared Renuvex identity/configuration-set resources, tenant-level
  bounce/complaint suppression, and the standard reputation policy.
- Tenant provisioning and removal use a separate control-plane boundary and
  role after the ikas install/uninstall and retention contract is known.

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
- Exact digital/no-shipment timing, click-and-collect timing, partial-delivery
  line eligibility, cancellation/refund/return invalidation, and resend rules.
- Reconciliation cadence, overlap window, and rate-limit handling details.
- Install/uninstall cleanup implementation for customer/order data and SES
  tenants; the ikas platform requirement is deletion/anonymization within 24
  hours after `store/app/deleted`.
- Exact Prisma models, columns, constraints, retention windows, token lifetime,
  merchant controls, template model, display name, Reply-To validation,
  merchant-domain sender onboarding, and rollout sequence.

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

Deferring the exact schema is intentional: ikas trigger, consent, and retention
answers determine which evidence must be stored and when it must be invalidated.

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

## Implementation Checkpoint

2026-07-09 source package:

- Added the SES feedback verification helper and internal endpoint:
  `src/lib/email/ses-sns.ts` and
  `src/app/api/internal/email-events/ses/route.ts`.
- Added source-only CloudFormation templates:
  `infra/aws/review-email-foundation.cloudformation.json` and
  `infra/aws/review-email-runtime-iam.cloudformation.json`.
- The foundation template targets `eu-central-1`, sender domain
  `reviews.renuvex.app`, visible sender
  `requests@reviews.renuvex.app`, custom MAIL FROM
  `bounce.reviews.renuvex.app`, configuration set
  `renuvex-review-requests-prod`, SNS `SignatureVersion=2`, selected SES event
  types excluding `OPEN`/`CLICK`, and a 14-day encrypted SQS DLQ.
- The runtime IAM template does not create a duplicate Vercel OIDC provider. It
  takes the existing provider ARN and creates only
  `renuvex-review-email-vercel-runtime`, with an exact production subject and
  `ses:SendEmail` scoped to the sender identity/configuration set and
  `ses:FromAddress=requests@reviews.renuvex.app`.
- Local validators and AWS read-only `cloudformation validate-template` pass
  for both templates. The runtime IAM template requires
  `CAPABILITY_NAMED_IAM` if a future approved change set creates it.
- No AWS stack, DNS, Vercel env, DB, QStash schedule, deploy, or email send was
  performed in this checkpoint.

## Consequences

- No source, schema, environment, DNS, AWS, QStash, or deployment behavior
  changes from this ADR checkpoint.
- Future code must preserve the provider/dispatcher boundaries and keep PII out
  of dispatcher payloads, including SQS messages.
- Future schema should keep sender mode, merchant branding, template version,
  Reply-To, and provider identity references separate so the product can add
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
- The external ikas platform contract is now recorded; the next gate should
  design the exact additive schema and rollout while separating platform facts
  from product/legal decisions.
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
- `infra/aws/review-email-runtime-iam.cloudformation.json`
- `scripts/validate-review-email-foundation-template.mjs`
- `scripts/validate-review-email-runtime-iam-template.mjs`
- `infra/aws/review-images-runtime-iam.cloudformation.json`
- `src/lib/media/providers/aws-review-image.ts`
- `infra/aws/`

External contract evidence:

- ikas MCP `list`, `introspect("listOrder")`, and
  `introspect("saveWebhooks")`, re-verified 2026-07-09.
- Direct ikas developer feedback on 2026-07-09, summarized in
  [[Ikas_Order_Review_Request_Notes]].
- [ikas Orders API](https://ikas.dev/docs/api/admin-api/orders)
- [ikas Webhooks API](https://ikas.dev/docs/api/admin-api/webhooks)
- [Amazon SES production access and sandbox](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html)
- [Amazon SES identities](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html)
- [Amazon SES custom MAIL FROM](https://docs.aws.amazon.com/ses/latest/dg/mail-from.html)
- [Amazon SES configuration sets](https://docs.aws.amazon.com/ses/latest/dg/managing-configuration-sets.html)
- [Amazon SES tenant management](https://docs.aws.amazon.com/ses/latest/dg/tenants.html)
- [Amazon SES tenant suppression](https://docs.aws.amazon.com/ses/latest/dg/sending-email-suppression-list-tenant-level.html)
- [Amazon SES sender reputation practices](https://docs.aws.amazon.com/ses/latest/dg/tips-and-best-practices.html)
- [Amazon SNS signature verification](https://docs.aws.amazon.com/sns/latest/dg/sns-verify-signature-of-message.html)
- [Amazon SNS dead-letter queues](https://docs.aws.amazon.com/sns/latest/dg/sns-dead-letter-queues.html)
- [Amazon EventBridge Scheduler schedule types](https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html)
- [Amazon EventBridge Scheduler targets](https://docs.aws.amazon.com/scheduler/latest/APIReference/API_Target.html)
- [Amazon SQS pricing](https://aws.amazon.com/sqs/pricing/)
- [AWS Lambda with SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html)
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
- [infra/aws/review-email-runtime-iam.cloudformation.json](infra/aws/review-email-runtime-iam.cloudformation.json)

## Obsidian Links

- [[Decision_Index]]
- [[ADR_0004_Ikas_Integration_Strategy]]
- [[ADR_0035_QStash_Scheduler_For_Maintenance]]
- [[Ikas_API_Notes]]
- [[Ikas_Order_Review_Request_Notes]]
- [[Roadmap]]

## Change Log

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
  AWS-native dispatcher decision; ikas semantics and the exact additive schema
  remain open.
