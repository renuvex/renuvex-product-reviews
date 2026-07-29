import { NextResponse } from 'next/server';
import {
  authenticateIkasAdminRequest,
  ikasAdminAuthorizationLostResponse,
  ikasAdminAuthenticationResponse,
} from '@/lib/auth-helpers';
import { getIkas, getIkasV1 } from '@/helpers/api-helpers';
import { StorefrontWidgetUrlError } from '@/lib/storefront-widget-url';
import { ensureStorefrontScripts } from '@/lib/storefront-scripts';
import { reportServerFailure } from '@/lib/server-failures';
import { IkasInstallationError } from '@/lib/ikas-installation-lifecycle';

/**
 * POST: Tüm mevcut temalara widget scriptini inject et / güncelle.
 * Admin panelindeki "Tüm Temalara Script Ekle" butonundan tetiklenir.
 */
export async function POST(request: Request) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);
    const { authToken, principal } = auth.context;

    const ikasClient = getIkas(authToken);
    const summary = await ensureStorefrontScripts(ikasClient, principal.merchantId, 'manual', {
      scriptListClient: getIkasV1(authToken),
      installationFence: principal,
    });

    return NextResponse.json({ data: summary });
  } catch (error) {
    if (error instanceof IkasInstallationError) {
      return ikasAdminAuthorizationLostResponse();
    }
    if (error instanceof StorefrontWidgetUrlError) {
      return NextResponse.json({ error: 'storefront_widget_configuration_invalid' }, { status: 500 });
    }

    reportServerFailure('storefront_script_sync_failed');
    return NextResponse.json({ error: 'storefront_script_sync_failed' }, { status: 500 });
  }
}
