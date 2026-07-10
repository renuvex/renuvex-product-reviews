import type { PrismaClient } from '@prisma/client';
import {
  DEFAULT_FIRST_DELAY_DAYS,
  DEFAULT_MAX_REMINDER_COUNT,
  DEFAULT_REMINDER_DELAY_DAYS,
  REVIEW_EMAIL_CONSENT_MODES,
  REVIEW_EMAIL_SETTINGS_LIMITS,
  REVIEW_EMAIL_TRIGGER_MODES,
} from '@/lib/review-email/constants';
import { assertReviewEmailRuntimeConfigured, isReviewEmailEnabled } from '@/lib/review-email/config';
import { encryptText, hashEmail, normalizeEmail } from '@/lib/review-email/pii';

type SettingsDb = Pick<PrismaClient, 'reviewEmailSettings'>;

export type ReviewEmailSettingsWrite = {
  enabled: boolean;
  triggerMode: 'delivery';
  consentMode: 'strict_notifications_accepted';
  firstDelayDays: number;
  reminderEnabled: boolean;
  reminderDelayDays: number;
  maxReminderCount: number;
  senderDisplayName: string | null;
  replyToEmailHash: string | null;
  replyToEmailEncrypted: string | null;
  replyToName: string | null;
  logoUrl: string | null;
  buttonColor: string | null;
  locale: string;
  templateVersion: string;
};

export type EffectiveReviewEmailSettings = {
  storeId: string;
  enabled: boolean;
  triggerMode: 'delivery';
  consentMode: 'strict_notifications_accepted';
  firstDelayDays: number;
  reminderEnabled: boolean;
  reminderDelayDays: number;
  maxReminderCount: number;
  senderDisplayName: string | null;
  replyToEmailHash: string | null;
  replyToEmailEncrypted: string | null;
  replyToName: string | null;
  logoUrl: string | null;
  buttonColor: string | null;
  locale: string;
  templateVersion: string;
  orderWebhookStatus: string;
  orderWebhookVerifiedAt: Date | null;
  orderWebhookLastErrorCode: string | null;
};

export class ReviewEmailSettingsError extends Error {
  constructor(
    public readonly code: string,
    message = code,
    public readonly status = 400,
  ) {
    super(message);
    this.name = 'ReviewEmailSettingsError';
  }
}

function boundedInt(value: unknown, fallback: number, min: number, max: number, field: string): number {
  if (value === undefined) return fallback;
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw new ReviewEmailSettingsError('invalid_review_email_setting', `${field} must be between ${min} and ${max}`);
  }
  return parsed;
}

function optionalText(value: unknown, maxLength: number): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  if (typeof value !== 'string') return null;
  const text = value.trim();
  if (!text) return null;
  return text.length <= maxLength ? text : null;
}

function normalizeLocale(value: unknown): string | undefined {
  const text = optionalText(value, 16);
  if (text === undefined) return undefined;
  return text ?? 'tr';
}

function normalizeButtonColor(value: unknown): string | null | undefined {
  const text = optionalText(value, 32);
  if (text === undefined || text === null) return text;
  return /^#[0-9a-fA-F]{6}$/.test(text) ? text.toUpperCase() : null;
}

function defaultSettings(storeId: string): EffectiveReviewEmailSettings {
  return {
    storeId,
    enabled: false,
    triggerMode: 'delivery',
    consentMode: 'strict_notifications_accepted',
    firstDelayDays: DEFAULT_FIRST_DELAY_DAYS,
    reminderEnabled: true,
    reminderDelayDays: DEFAULT_REMINDER_DELAY_DAYS,
    maxReminderCount: DEFAULT_MAX_REMINDER_COUNT,
    senderDisplayName: null,
    replyToEmailHash: null,
    replyToEmailEncrypted: null,
    replyToName: null,
    logoUrl: null,
    buttonColor: null,
    locale: 'tr',
    templateVersion: 'default_v1',
    orderWebhookStatus: 'unregistered',
    orderWebhookVerifiedAt: null,
    orderWebhookLastErrorCode: null,
  };
}

export function serializeReviewEmailSettings(settings: EffectiveReviewEmailSettings) {
  return {
    enabled: settings.enabled,
    triggerMode: settings.triggerMode,
    consentMode: settings.consentMode,
    firstDelayDays: settings.firstDelayDays,
    reminderEnabled: settings.reminderEnabled,
    reminderDelayDays: settings.reminderDelayDays,
    maxReminderCount: settings.maxReminderCount,
    senderDisplayName: settings.senderDisplayName,
    replyToName: settings.replyToName,
    hasReplyToEmail: Boolean(settings.replyToEmailHash),
    logoUrl: settings.logoUrl,
    buttonColor: settings.buttonColor,
    locale: settings.locale,
    templateVersion: settings.templateVersion,
    orderWebhookStatus: settings.orderWebhookStatus,
    orderWebhookVerifiedAt: settings.orderWebhookVerifiedAt?.toISOString() ?? null,
    orderWebhookLastErrorCode: settings.orderWebhookLastErrorCode,
  };
}

function toEffective(storeId: string, row: Awaited<ReturnType<SettingsDb['reviewEmailSettings']['findUnique']>>): EffectiveReviewEmailSettings {
  if (!row) return defaultSettings(storeId);
  return {
    storeId,
    enabled: row.enabled,
    triggerMode: row.triggerMode === 'delivery' ? 'delivery' : 'delivery',
    consentMode: row.consentMode === 'strict_notifications_accepted' ? 'strict_notifications_accepted' : 'strict_notifications_accepted',
    firstDelayDays: row.firstDelayDays,
    reminderEnabled: row.reminderEnabled,
    reminderDelayDays: row.reminderDelayDays,
    maxReminderCount: row.maxReminderCount,
    senderDisplayName: row.senderDisplayName,
    replyToEmailHash: row.replyToEmailHash,
    replyToEmailEncrypted: row.replyToEmailEncrypted,
    replyToName: row.replyToName,
    logoUrl: row.logoUrl,
    buttonColor: row.buttonColor,
    locale: row.locale,
    templateVersion: row.templateVersion,
    orderWebhookStatus: row.orderWebhookStatus,
    orderWebhookVerifiedAt: row.orderWebhookVerifiedAt,
    orderWebhookLastErrorCode: row.orderWebhookLastErrorCode,
  };
}

export async function getEffectiveReviewEmailSettings(db: SettingsDb, storeId: string): Promise<EffectiveReviewEmailSettings> {
  return toEffective(storeId, await db.reviewEmailSettings.findUnique({ where: { storeId } }));
}

export function buildReviewEmailSettingsWrite(input: unknown): ReviewEmailSettingsWrite {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new ReviewEmailSettingsError('invalid_review_email_settings_body', 'Settings body must be an object');
  }
  const body = input as Record<string, unknown>;

  const enabled = body.enabled === undefined ? false : body.enabled === true;
  if (enabled) {
    if (!isReviewEmailEnabled()) {
      throw new ReviewEmailSettingsError('review_email_feature_disabled', 'Review email feature is disabled', 409);
    }
    assertReviewEmailRuntimeConfigured();
  }

  const triggerMode: 'delivery' =
    typeof body.triggerMode === 'string' && REVIEW_EMAIL_TRIGGER_MODES.includes(body.triggerMode as 'delivery')
      ? 'delivery'
      : 'delivery';
  const consentMode: 'strict_notifications_accepted' =
    typeof body.consentMode === 'string' && REVIEW_EMAIL_CONSENT_MODES.includes(body.consentMode as 'strict_notifications_accepted')
      ? 'strict_notifications_accepted'
      : 'strict_notifications_accepted';
  const firstDelayDays = boundedInt(
    body.firstDelayDays,
    DEFAULT_FIRST_DELAY_DAYS,
    REVIEW_EMAIL_SETTINGS_LIMITS.firstDelayDays.min,
    REVIEW_EMAIL_SETTINGS_LIMITS.firstDelayDays.max,
    'firstDelayDays',
  );
  const reminderDelayDays = boundedInt(
    body.reminderDelayDays,
    DEFAULT_REMINDER_DELAY_DAYS,
    REVIEW_EMAIL_SETTINGS_LIMITS.reminderDelayDays.min,
    REVIEW_EMAIL_SETTINGS_LIMITS.reminderDelayDays.max,
    'reminderDelayDays',
  );
  const maxReminderCount = boundedInt(
    body.maxReminderCount,
    DEFAULT_MAX_REMINDER_COUNT,
    REVIEW_EMAIL_SETTINGS_LIMITS.maxReminderCount.min,
    REVIEW_EMAIL_SETTINGS_LIMITS.maxReminderCount.max,
    'maxReminderCount',
  );
  const reminderEnabled = body.reminderEnabled === undefined ? true : body.reminderEnabled === true;
  const senderDisplayName = optionalText(body.senderDisplayName, 128);
  const replyToEmail = normalizeEmail(body.replyToEmail);
  const replyToName = optionalText(body.replyToName, 128);
  const logoUrl = optionalText(body.logoUrl, 2048);
  const buttonColor = normalizeButtonColor(body.buttonColor);
  const locale = normalizeLocale(body.locale);
  const templateVersion = optionalText(body.templateVersion, 64);

  if (body.replyToEmail !== undefined && body.replyToEmail !== null && body.replyToEmail !== '' && !replyToEmail) {
    throw new ReviewEmailSettingsError('invalid_reply_to_email', 'Reply-To email is invalid');
  }
  if (senderDisplayName === null && body.senderDisplayName) {
    throw new ReviewEmailSettingsError('invalid_sender_display_name', 'Sender display name is invalid');
  }
  if (replyToName === null && body.replyToName) {
    throw new ReviewEmailSettingsError('invalid_reply_to_name', 'Reply-To name is invalid');
  }
  if (logoUrl === null && body.logoUrl) {
    throw new ReviewEmailSettingsError('invalid_logo_url', 'Logo URL is invalid');
  }
  if (buttonColor === null && body.buttonColor) {
    throw new ReviewEmailSettingsError('invalid_button_color', 'Button color must be a #RRGGBB value');
  }

  return {
    enabled,
    triggerMode,
    consentMode,
    firstDelayDays,
    reminderEnabled,
    reminderDelayDays,
    maxReminderCount,
    senderDisplayName: senderDisplayName ?? null,
    replyToEmailHash: replyToEmail ? hashEmail(replyToEmail) : null,
    replyToEmailEncrypted: replyToEmail ? encryptText(replyToEmail) : null,
    replyToName: replyToName ?? null,
    logoUrl: logoUrl ?? null,
    buttonColor: buttonColor ?? null,
    locale: locale ?? 'tr',
    templateVersion: templateVersion ?? 'default_v1',
  };
}

export async function persistReviewEmailSettings(
  db: SettingsDb,
  storeId: string,
  data: ReviewEmailSettingsWrite,
  webhookState: {
    status?: string;
    verifiedAt?: Date | null;
    lastErrorCode?: string | null;
  } = {},
): Promise<EffectiveReviewEmailSettings> {
  const webhookData = {
    ...(webhookState.status !== undefined ? { orderWebhookStatus: webhookState.status } : {}),
    ...(webhookState.verifiedAt !== undefined ? { orderWebhookVerifiedAt: webhookState.verifiedAt } : {}),
    ...(webhookState.lastErrorCode !== undefined ? { orderWebhookLastErrorCode: webhookState.lastErrorCode } : {}),
  };
  const row = await db.reviewEmailSettings.upsert({
    where: { storeId },
    create: { ...data, ...webhookData, storeId },
    update: { ...data, ...webhookData },
  });
  return toEffective(storeId, row);
}

export async function upsertReviewEmailSettings(db: SettingsDb, storeId: string, input: unknown): Promise<EffectiveReviewEmailSettings> {
  return persistReviewEmailSettings(db, storeId, buildReviewEmailSettingsWrite(input));
}
