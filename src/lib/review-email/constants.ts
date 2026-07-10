export const REVIEW_EMAIL_TRIGGER_MODES = ['delivery'] as const;
export type ReviewEmailTriggerMode = (typeof REVIEW_EMAIL_TRIGGER_MODES)[number];

export const REVIEW_EMAIL_CONSENT_MODES = ['strict_notifications_accepted'] as const;
export type ReviewEmailConsentMode = (typeof REVIEW_EMAIL_CONSENT_MODES)[number];

export const REVIEW_EMAIL_JOB_KINDS = ['request', 'reminder'] as const;
export type ReviewEmailJobKind = (typeof REVIEW_EMAIL_JOB_KINDS)[number];

export const REVIEW_REQUEST_STATUSES = [
  'scheduled',
  'sending',
  'sent',
  'sent_unknown',
  'submitted',
  'cancelled',
  'expired',
  'suppressed',
  'error',
] as const;
export type ReviewRequestStatus = (typeof REVIEW_REQUEST_STATUSES)[number];

export const REVIEW_EMAIL_JOB_STATUSES = [
  'pending',
  'leased',
  'dispatched',
  'processing',
  'awaiting_confirmation',
  'outcome_unknown',
  'sent',
  'skipped',
  'retrying',
  'failed',
  'cancelled',
] as const;
export type ReviewEmailJobStatus = (typeof REVIEW_EMAIL_JOB_STATUSES)[number];

export const REVIEW_REQUEST_TOKEN_STATUSES = ['prepared', 'active', 'consumed', 'expired', 'revoked'] as const;
export type ReviewRequestTokenStatus = (typeof REVIEW_REQUEST_TOKEN_STATUSES)[number];

export const REVIEW_EMAIL_ATTEMPT_STATUSES = [
  'prepared',
  'sending',
  'accepted',
  'awaiting_confirmation',
  'outcome_unknown',
  'abandoned_before_send',
  'rejected',
  'failed',
  'delivery_confirmed',
  'bounced',
  'complained',
  'delayed',
] as const;
export type ReviewEmailAttemptStatus = (typeof REVIEW_EMAIL_ATTEMPT_STATUSES)[number];

export const DEFAULT_FIRST_DELAY_DAYS = 1;
export const DEFAULT_REMINDER_DELAY_DAYS = 1;
export const DEFAULT_MAX_REMINDER_COUNT = 1;
export const DEFAULT_TOKEN_EXPIRES_DAYS = 30;
export const REVIEW_REQUEST_SESSION_TTL_MINUTES = 120;
export const REVIEW_EMAIL_JOB_LEASE_MINUTES = 5;
export const REVIEW_EMAIL_PREPARED_ATTEMPT_TTL_MINUTES = 15;
export const REVIEW_EMAIL_CONFIRMATION_TIMEOUT_HOURS = 24;
export const REVIEW_EMAIL_RECONCILIATION_LEASE_MINUTES = 10;
export const REVIEW_EMAIL_RECONCILIATION_OVERLAP_MINUTES = 15;
export const REVIEW_EMAIL_RECONCILIATION_INITIAL_LOOKBACK_DAYS = 7;
export const REVIEW_EMAIL_MAINTENANCE_BATCH_SIZE = 100;
export const REVIEW_EMAIL_ATTEMPT_TAG_NAME = 'renuvex_attempt';

export const REVIEW_EMAIL_SETTINGS_LIMITS = {
  firstDelayDays: { min: 0, max: 30 },
  reminderDelayDays: { min: 1, max: 30 },
  maxReminderCount: { min: 0, max: 2 },
} as const;

export const ORDER_REVIEW_WEBHOOK_SCOPES = ['store/order/created', 'store/order/updated'] as const;
export type OrderReviewWebhookScope = (typeof ORDER_REVIEW_WEBHOOK_SCOPES)[number];
export const REVIEW_EMAIL_APP_DELETED_SCOPE = 'store/app/deleted' as const;
export const REVIEW_EMAIL_WEBHOOK_SCOPES = [...ORDER_REVIEW_WEBHOOK_SCOPES, REVIEW_EMAIL_APP_DELETED_SCOPE] as const;

export const CLOSED_ORDER_PACKAGE_STATUSES = new Set([
  'CANCELLED',
  'PARTIALLY_CANCELLED',
  'REFUNDED',
  'PARTIALLY_REFUNDED',
  'RETURN_DELIVERED',
  'RETURN_IN_TRANSIT',
  'RETURN_PARCEL_WAITING',
  'RETURN_REJECTED',
  'UNABLE_TO_DELIVER',
]);

export const CLOSED_ORDER_LINE_STATUSES = new Set([
  'CANCELLED',
  'REFUNDED',
  'RETURN_DELIVERED',
  'RETURN_IN_TRANSIT',
  'RETURN_PARCEL_WAITING',
  'RETURN_REJECTED',
]);
