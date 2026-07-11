import * as Sentry from '@sentry/nextjs';

export type ReviewEmailFailure = {
  code: string;
  retryable: boolean;
};

export type ReviewEmailFailureContext =
  | 'order_webhook'
  | 'order_reconciliation'
  | 'journal_coverage'
  | 'retention_purge'
  | 'review_email_settings'
  | 'review_request_exchange'
  | 'store_erasure'
  | 'data_subject_erasure'
  | 'email_send';

const FALLBACK_CODES: Record<ReviewEmailFailureContext, string> = {
  order_webhook: 'order_webhook_processing_failed',
  order_reconciliation: 'order_reconciliation_failed',
  journal_coverage: 'journal_coverage_failed',
  retention_purge: 'retention_purge_failed',
  review_email_settings: 'review_email_settings_failed',
  review_request_exchange: 'review_request_exchange_failed',
  store_erasure: 'store_erasure_failed',
  data_subject_erasure: 'data_subject_erasure_failed',
  email_send: 'review_email_send_failed',
};

const COMMON_JOURNAL_CODES = [
  'journal_conflict',
  'journal_evidence_cas_failed',
  'journal_intent_conflict',
  'journal_not_configured',
  'journal_not_verified',
  'journal_version_id_missing',
  'journal_write_failed',
] as const;

const ALLOWED_CODES: Record<ReviewEmailFailureContext, ReadonlySet<string>> = {
  order_webhook: new Set([
    'canonical_order_tenant_mismatch',
    'installation_inactive',
    'missing_order_id',
    'order_not_found',
    'order_webhook_configuration_missing',
    'store_disabled',
  ]),
  order_reconciliation: new Set([
    'ikas_installation_inactive',
    'review_email_reconciliation_lease_lost',
  ]),
  journal_coverage: new Set([
    'journal_coverage_incomplete',
    'journal_coverage_not_configured',
    'journal_delete_marker_listing_invalid',
    'journal_genesis_contract_invalid',
    'journal_genesis_invalid',
    'journal_genesis_missing_or_conflicting',
    'journal_object_contract_invalid',
    'journal_object_storage_contract_invalid',
    'journal_payload_action_invalid',
    'journal_payload_not_canonical',
    'journal_payload_schema_invalid',
    'journal_payload_timestamp_invalid',
    'journal_version_listing_invalid',
    'journal_version_pagination_invalid',
    'restore_target_outside_journal_coverage',
  ]),
  retention_purge: new Set(),
  review_email_settings: new Set(),
  review_request_exchange: new Set(),
  store_erasure: new Set([
    ...COMMON_JOURNAL_CODES,
    'store_erasure_authorized_app_missing',
    'store_erasure_generation_missing',
    'store_erasure_journal_not_verified',
    'store_erasure_journal_timestamp_invalid',
    'store_erasure_replay_batch_limit_exceeded',
    'store_erasure_run_not_found',
  ]),
  data_subject_erasure: new Set([
    ...COMMON_JOURNAL_CODES,
    'ambiguous_subject',
    'data_subject_inventory_invalid',
    'data_subject_retry_exhausted',
    'data_subject_run_busy',
    'data_subject_run_not_found',
    'idempotency_key_reused',
    'ikas_installation_inactive',
    'invalid_email',
    'journal_payload_timestamp_invalid',
    'request_digest_key_version_missing',
    'subject_hash_key_version_missing',
    'subject_hash_missing',
  ]),
  email_send: new Set([
    'review_email_send_failed',
    'ses_access_denied',
    'ses_account_suspended',
    'ses_mail_from_domain_not_verified',
    'ses_message_rejected',
    'ses_result_unknown',
    'ses_service_unavailable',
    'ses_throttled',
    'ses_timeout',
  ]),
};

function candidateCode(error: unknown): string | null {
  if (!error || typeof error !== 'object') return null;
  if ('code' in error && typeof error.code === 'string') return error.code;
  return error instanceof Error ? error.message : null;
}

export function normalizeReviewEmailFailure(
  context: ReviewEmailFailureContext,
  error: unknown,
  input: { retryable?: boolean } = {},
): ReviewEmailFailure {
  const candidate = candidateCode(error);
  const code = candidate && ALLOWED_CODES[context].has(candidate) ? candidate : FALLBACK_CODES[context];
  const retryable = error && typeof error === 'object' && 'retryable' in error && typeof error.retryable === 'boolean'
    ? error.retryable
    : input.retryable === true;
  return { code, retryable };
}

export function reportReviewEmailFailure(
  context: ReviewEmailFailureContext,
  failure: ReviewEmailFailure,
  opaqueId?: string,
): void {
  const details = { context, code: failure.code, ...(opaqueId ? { opaqueId } : {}) };
  console.error('[review-email-failure]', details);
  try {
    Sentry.captureException(new Error(failure.code), {
      tags: { source: 'review-email', task: context, code: failure.code },
      ...(opaqueId ? { extra: { opaqueId } } : {}),
    });
  } catch {
    // Observability must not alter the application failure path.
  }
}
