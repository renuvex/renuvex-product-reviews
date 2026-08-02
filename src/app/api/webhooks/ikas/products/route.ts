import { getIkas } from '@/helpers/api-helpers';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { prisma } from '@/lib/prisma';
import { getProductIdFromWebhookData, PRODUCT_WEBHOOK_SCOPES, syncSingleProductForStore } from '@/lib/product-snapshots';
import { getParsedIkasWebhookData, validateIkasWebhookSignature, type IkasWebhook } from '@ikas/admin-api-client';
import { NextResponse } from 'next/server';
import {
  getRequiredIkasClientSecret,
  IkasClientSecretConfigurationError,
} from '@/lib/ikas-client-secret';
import { resolveActiveIkasInstallationTokenPair } from '@/lib/ikas-installation-lifecycle';

const PRODUCT_WEBHOOK_SCOPE_SET = new Set<string>(PRODUCT_WEBHOOK_SCOPES);

export async function POST(request: Request) {
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

    if (!PRODUCT_WEBHOOK_SCOPE_SET.has(webhook.scope)) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const parsedData = getParsedIkasWebhookData(webhook, clientSecret);
    const productId = getProductIdFromWebhookData(parsedData);
    if (!productId) {
      console.warn('[ikas-product-webhook] Missing product id', { scope: webhook.scope, merchantId: webhook.merchantId });
      return NextResponse.json({ ok: true, skipped: 'missing_product_id' });
    }

    const pair = await prisma.$transaction((tx) => resolveActiveIkasInstallationTokenPair(
      tx,
      webhook.merchantId,
      webhook.authorizedAppId,
    ));
    if (pair.status === 'reauthorization_required') {
      return NextResponse.json({ ok: true, skipped: 'auth_token_not_found' });
    }
    if (pair.status !== 'active') {
      return NextResponse.json({ ok: true, skipped: 'ikas_installation_inactive' });
    }
    const authToken = AuthTokenManager.fromDatabaseRow(pair.authToken);
    const installationFence = {
      authorizedAppId: pair.installation.authorizedAppId,
      generation: pair.installation.generation,
      stateVersion: pair.installation.stateVersion,
    };

    const ikas = getIkas(authToken);
    await syncSingleProductForStore(
      ikas,
      webhook.merchantId,
      productId,
      installationFence,
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof IkasClientSecretConfigurationError) {
      console.error('[ikas-product-webhook] client_secret_not_configured');
      return NextResponse.json({ error: 'Webhook validation is not configured' }, { status: 503 });
    }
    console.error('[ikas-product-webhook] processing_failed');
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
