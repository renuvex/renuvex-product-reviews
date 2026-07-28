import { NextResponse } from 'next/server';
import { getIkas } from '@/helpers/api-helpers';
import { prisma } from '@/lib/prisma';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { getParsedIkasWebhookData, validateIkasWebhookSignature, type IkasWebhook } from '@ikas/admin-api-client';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import { REVIEW_EMAIL_APP_DELETED_SCOPE, REVIEW_EMAIL_RECEIVER_SCOPES } from '@/lib/review-email/constants';
import { eraseStoreReviewEmailData } from '@/lib/review-email/erasure';
import {
  digestPayload,
  fetchIkasOrderForReviewRequest,
  getOrderIdFromWebhookData,
  reviewRequestWebhookScopeSet,
  syncIkasOrderForReviewRequests,
} from '@/lib/review-email/ikas-orders';
import { getEffectiveReviewEmailSettings } from '@/lib/review-email/settings';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';
import { ensureActiveIkasStoreInstallation, IkasInstallationError, requireActiveIkasStoreInstallation } from '@/lib/ikas-installation-lifecycle';
import {
  getRequiredIkasClientSecret,
  IkasClientSecretConfigurationError,
} from '@/lib/ikas-client-secret';

const ORDER_WEBHOOK_SCOPE_SET = reviewRequestWebhookScopeSet();
const RECEIVER_SCOPE_SET = new Set<string>(REVIEW_EMAIL_RECEIVER_SCOPES);

export async function POST(request: Request) {
  let eventRowId: string | null = null;

  try {
    const clientSecret = getRequiredIkasClientSecret();

    const rawBody = await request.text();
    let webhook: IkasWebhook;
    try {
      webhook = JSON.parse(rawBody) as IkasWebhook;
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!validateIkasWebhookSignature(webhook, clientSecret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    if (!RECEIVER_SCOPE_SET.has(webhook.scope)) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    if (webhook.scope === REVIEW_EMAIL_APP_DELETED_SCOPE) {
      const erasure = await eraseStoreReviewEmailData(webhook.merchantId, {
        authorizedAppId: webhook.authorizedAppId,
        triggerSource: 'ikas_store_app_deleted',
      });
      return NextResponse.json({
        ok: true,
        erased: erasure.state === 'succeeded',
        state: erasure.state,
        runId: erasure.runId,
      });
    }

    if (!ORDER_WEBHOOK_SCOPE_SET.has(webhook.scope)) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    if (!isReviewEmailEnabled()) {
      return NextResponse.json({ ok: true, ignored: true, reason: 'review_email_disabled' });
    }

    const parsedData = getParsedIkasWebhookData(webhook, clientSecret);
    const orderId = getOrderIdFromWebhookData(parsedData);
    const authToken = await AuthTokenManager.get(webhook.authorizedAppId);
    if (!authToken || authToken.merchantId !== webhook.merchantId) {
      return NextResponse.json({
        ok: true,
        skipped: authToken ? 'auth_token_tenant_mismatch' : 'auth_token_not_found',
      });
    }
    try {
      await ensureActiveIkasStoreInstallation(webhook.merchantId, webhook.authorizedAppId);
    } catch (error) {
      if (!(error instanceof IkasInstallationError)) throw error;
      return NextResponse.json({ ok: true, skipped: error.code });
    }

    let eventDecision: { state: 'recorded'; eventId: string } | { state: 'duplicate' } | { state: 'store_disabled' };
    try {
      eventDecision = await prisma.$transaction(async (tx) => {
        await requireActiveIkasStoreInstallation(tx, webhook.merchantId, webhook.authorizedAppId);
        const settings = await getEffectiveReviewEmailSettings(tx, webhook.merchantId);
        if (!settings.enabled) return { state: 'store_disabled' as const };

        const existing = await tx.ikasOrderWebhookEvent.findUnique({
          where: { providerEventId: webhook.id },
          select: { id: true, status: true },
        });
        if (existing?.status === 'processed' || existing?.status === 'skipped') {
          return { state: 'duplicate' as const };
        }
        const event = existing
          ? await tx.ikasOrderWebhookEvent.update({
              where: { id: existing.id },
              data: {
                scope: webhook.scope,
                storeId: webhook.merchantId,
                authorizedAppId: webhook.authorizedAppId,
                status: 'received',
                processedAt: null,
                lastErrorCode: null,
                ikasOrderId: orderId,
                payloadDigest: digestPayload(rawBody),
              },
            })
          : await tx.ikasOrderWebhookEvent.create({
              data: {
                providerEventId: webhook.id,
                scope: webhook.scope,
                storeId: webhook.merchantId,
                authorizedAppId: webhook.authorizedAppId,
                ikasOrderId: orderId,
                payloadDigest: digestPayload(rawBody),
                status: 'received',
              },
            });
        return { state: 'recorded' as const, eventId: event.id };
      });
    } catch (error) {
      if (!(error instanceof IkasInstallationError)) throw error;
      return NextResponse.json({ ok: true, skipped: error.code });
    }
    if (eventDecision.state === 'duplicate') {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    if (eventDecision.state === 'store_disabled') {
      return NextResponse.json({ ok: true, skipped: 'store_email_disabled' });
    }
    eventRowId = eventDecision.eventId;

    if (!orderId) {
      await prisma.ikasOrderWebhookEvent.updateMany({
        where: { id: eventRowId },
        data: { status: 'skipped', processedAt: new Date(), lastErrorCode: 'missing_order_id' },
      });
      return NextResponse.json({ ok: true, skipped: 'missing_order_id' });
    }

    const ikas = getIkas(authToken);
    const order = await fetchIkasOrderForReviewRequest(ikas, orderId);
    if (!order) {
      await prisma.ikasOrderWebhookEvent.updateMany({
        where: { id: eventRowId },
        data: { status: 'skipped', processedAt: new Date(), lastErrorCode: 'order_not_found' },
      });
      return NextResponse.json({ ok: true, skipped: 'order_not_found' });
    }
    if (order.merchantId !== webhook.merchantId) {
      await prisma.ikasOrderWebhookEvent.updateMany({
        where: { id: eventRowId },
        data: { status: 'skipped', processedAt: new Date(), lastErrorCode: 'canonical_order_tenant_mismatch' },
      });
      return NextResponse.json({ ok: true, skipped: 'canonical_order_tenant_mismatch' });
    }

    const result = await syncIkasOrderForReviewRequests(prisma, {
      storeId: webhook.merchantId,
      authorizedAppId: webhook.authorizedAppId,
      order,
    });

    if (result.state !== 'processed') {
      await prisma.ikasOrderWebhookEvent.updateMany({
        where: { id: eventRowId },
        data: { status: 'skipped', processedAt: new Date(), lastErrorCode: result.state },
      });
      return NextResponse.json({ ok: true, skipped: result.state });
    }

    await prisma.ikasOrderWebhookEvent.updateMany({
      where: { id: eventRowId },
      data: { status: 'processed', processedAt: new Date(), lastErrorCode: null },
    });

    return NextResponse.json({ ok: true, data: result });
  } catch (error) {
    if (error instanceof IkasClientSecretConfigurationError) {
      reportReviewEmailFailure('order_webhook', {
        code: 'order_webhook_configuration_missing',
        retryable: false,
      });
      return NextResponse.json({ error: 'Webhook validation is not configured' }, { status: 503 });
    }
    const failure = normalizeReviewEmailFailure('order_webhook', error, { retryable: true });
    if (eventRowId) {
      await prisma.ikasOrderWebhookEvent
        .updateMany({
          where: { id: eventRowId },
          data: { status: 'error', lastErrorCode: failure.code },
        })
        .catch(() => undefined);
    }
    reportReviewEmailFailure('order_webhook', failure, eventRowId ?? undefined);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
