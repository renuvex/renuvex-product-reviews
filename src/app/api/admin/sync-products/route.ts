import { getIkas } from '@/helpers/api-helpers';
import {
  authenticateIkasAdminRequest,
  ikasAdminAuthorizationLostResponse,
  ikasAdminAuthenticationResponse,
} from '@/lib/auth-helpers';
import { buildProductWebhookEndpoint, registerProductWebhooks } from '@/lib/product-snapshots';
import { NextRequest, NextResponse } from 'next/server';
import { reportServerFailure } from '@/lib/server-failures';
import { IkasInstallationError } from '@/lib/ikas-installation-lifecycle';
import { startProductReconciliationRun } from '@/lib/product-reconciliation';
import { dispatchProductReconciliationRun } from '@/lib/product-reconciliation-dispatcher';

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);
    const { authToken, principal } = auth.context;

    const ikas = getIkas(authToken);
    const host = request.headers.get('host');
    if (!host) {
      return NextResponse.json({ error: 'Host header is required' }, { status: 400 });
    }

    const endpoint = buildProductWebhookEndpoint(host);
    const webhooks = await registerProductWebhooks(ikas, endpoint);
    const { run } = await startProductReconciliationRun({
      storeId: principal.merchantId,
      fence: principal,
      trigger: 'manual',
    });
    await dispatchProductReconciliationRun(run.id);

    return NextResponse.json({
      data: {
        runId: run.id,
        status: run.status,
        webhooks: webhooks.map((webhook) => ({ id: webhook.id, scope: webhook.scope, endpoint: webhook.endpoint })),
      },
    }, { status: 202 });
  } catch (error) {
    if (error instanceof IkasInstallationError) {
      return ikasAdminAuthorizationLostResponse();
    }
    reportServerFailure('product_sync_failed');
    return NextResponse.json({ error: 'product_sync_failed' }, { status: 500 });
  }
}
