import { getIkas } from '@/helpers/api-helpers';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { buildProductWebhookEndpoint, registerProductWebhooks, syncAllProductsForStore } from '@/lib/product-snapshots';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const authToken = await AuthTokenManager.get(user.authorizedAppId);
    if (!authToken) {
      return NextResponse.json({ error: 'Auth token not found' }, { status: 404 });
    }

    const ikas = getIkas(authToken);
    const host = request.headers.get('host');
    if (!host) {
      return NextResponse.json({ error: 'Host header is required' }, { status: 400 });
    }

    const endpoint = buildProductWebhookEndpoint(host);
    const [webhooks, sync] = await Promise.all([
      registerProductWebhooks(ikas, endpoint),
      syncAllProductsForStore(ikas, user.merchantId),
    ]);

    return NextResponse.json({
      data: {
        synced: sync.synced,
        pages: sync.pages,
        webhooks: webhooks.map((webhook) => ({ id: webhook.id, scope: webhook.scope, endpoint: webhook.endpoint })),
      },
    });
  } catch (error) {
    console.error('[admin-sync-products] ERROR:', error);
    return NextResponse.json({ error: 'Product sync failed' }, { status: 500 });
  }
}
