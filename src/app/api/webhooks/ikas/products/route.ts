import { config } from '@/globals/config';
import { getIkas } from '@/helpers/api-helpers';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { getProductIdFromWebhookData, PRODUCT_WEBHOOK_SCOPES, syncSingleProductForStore, type ProductLike } from '@/lib/product-snapshots';
import { getParsedIkasWebhookData, validateIkasWebhookSignature, type IkasWebhook } from '@ikas/admin-api-client';
import { NextResponse } from 'next/server';

const PRODUCT_WEBHOOK_SCOPE_SET = new Set<string>(PRODUCT_WEBHOOK_SCOPES);

export async function POST(request: Request) {
  try {
    if (!config.oauth.clientSecret) {
      console.error('[ikas-product-webhook] Missing CLIENT_SECRET');
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

    if (!PRODUCT_WEBHOOK_SCOPE_SET.has(webhook.scope)) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const parsedData = getParsedIkasWebhookData(webhook, config.oauth.clientSecret);
    const productId = getProductIdFromWebhookData(parsedData);
    if (!productId) {
      console.warn('[ikas-product-webhook] Missing product id', { scope: webhook.scope, merchantId: webhook.merchantId });
      return NextResponse.json({ ok: true, skipped: 'missing_product_id' });
    }

    const authToken = await AuthTokenManager.get(webhook.authorizedAppId);
    if (!authToken) {
      console.warn('[ikas-product-webhook] Auth token not found', { merchantId: webhook.merchantId, authorizedAppId: webhook.authorizedAppId });
      return NextResponse.json({ ok: true, skipped: 'auth_token_not_found' });
    }

    const ikas = getIkas(authToken);
    await syncSingleProductForStore(ikas, webhook.merchantId, productId, parsedData as ProductLike);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[ikas-product-webhook] ERROR:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
