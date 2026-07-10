import { NextResponse } from 'next/server';
import { config } from '@/globals/config';
import { getIkas } from '@/helpers/api-helpers';
import { prisma } from '@/lib/prisma';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { getParsedIkasWebhookData, validateIkasWebhookSignature, type IkasWebhook } from '@ikas/admin-api-client';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import { REVIEW_EMAIL_APP_DELETED_SCOPE } from '@/lib/review-email/constants';
import { eraseStoreReviewEmailData } from '@/lib/review-email/erasure';
import {
  digestPayload,
  fetchIkasOrderForReviewRequest,
  getOrderIdFromWebhookData,
  reviewRequestWebhookScopeSet,
  syncIkasOrderForReviewRequests,
} from '@/lib/review-email/ikas-orders';

const ORDER_WEBHOOK_SCOPE_SET = reviewRequestWebhookScopeSet();

export async function POST(request: Request) {
  let eventRowId: string | null = null;

  try {
    if (!config.oauth.clientSecret) {
      console.error('[ikas-order-webhook] Missing CLIENT_SECRET');
      return NextResponse.json({ error: 'Webhook validation is not configured' }, { status: 500 });
    }

    const rawBody = await request.text();
    let webhook: IkasWebhook;
    try {
      webhook = JSON.parse(rawBody) as IkasWebhook;
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!validateIkasWebhookSignature(webhook, config.oauth.clientSecret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    if (!ORDER_WEBHOOK_SCOPE_SET.has(webhook.scope)) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    if (webhook.scope === REVIEW_EMAIL_APP_DELETED_SCOPE) {
      const erasure = await eraseStoreReviewEmailData(webhook.merchantId, {
        triggerSource: 'ikas_store_app_deleted',
      });
      return NextResponse.json({ ok: true, erased: true, runId: erasure.runId });
    }

    if (!isReviewEmailEnabled()) {
      return NextResponse.json({ ok: true, ignored: true, reason: 'review_email_disabled' });
    }

    const existing = await prisma.ikasOrderWebhookEvent.findUnique({
      where: { providerEventId: webhook.id },
      select: { id: true, status: true },
    });
    if (existing?.status === 'processed' || existing?.status === 'skipped') {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    const parsedData = getParsedIkasWebhookData(webhook, config.oauth.clientSecret);
    const orderId = getOrderIdFromWebhookData(parsedData);
    const event = existing
      ? await prisma.ikasOrderWebhookEvent.update({
          where: { id: existing.id },
          data: {
            status: 'received',
            lastError: null,
            ikasOrderId: orderId,
            payloadDigest: digestPayload(rawBody),
          },
        })
      : await prisma.ikasOrderWebhookEvent.create({
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
    eventRowId = event.id;

    if (!orderId) {
      await prisma.ikasOrderWebhookEvent.update({
        where: { id: event.id },
        data: { status: 'skipped', processedAt: new Date(), lastError: 'missing_order_id' },
      });
      return NextResponse.json({ ok: true, skipped: 'missing_order_id' });
    }

    const authToken = await AuthTokenManager.get(webhook.authorizedAppId);
    if (!authToken) {
      await prisma.ikasOrderWebhookEvent.update({
        where: { id: event.id },
        data: { status: 'skipped', processedAt: new Date(), lastError: 'auth_token_not_found' },
      });
      return NextResponse.json({ ok: true, skipped: 'auth_token_not_found' });
    }

    const ikas = getIkas(authToken);
    const order = await fetchIkasOrderForReviewRequest(ikas, orderId);
    if (!order) {
      await prisma.ikasOrderWebhookEvent.update({
        where: { id: event.id },
        data: { status: 'skipped', processedAt: new Date(), lastError: 'order_not_found' },
      });
      return NextResponse.json({ ok: true, skipped: 'order_not_found' });
    }

    const result = await syncIkasOrderForReviewRequests(prisma, {
      storeId: webhook.merchantId,
      authorizedAppId: webhook.authorizedAppId,
      order,
    });

    await prisma.ikasOrderWebhookEvent.update({
      where: { id: event.id },
      data: { status: 'processed', processedAt: new Date(), lastError: null },
    });

    return NextResponse.json({ ok: true, data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    if (eventRowId) {
      await prisma.ikasOrderWebhookEvent.update({
        where: { id: eventRowId },
        data: { status: 'error', lastError: message.slice(0, 512) },
      }).catch(() => undefined);
    }
    console.error('[ikas-order-webhook] ERROR:', message);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
