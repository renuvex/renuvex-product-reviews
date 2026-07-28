import { NextResponse } from 'next/server';
import {
  authenticateIkasAdminRequest,
  ikasAdminAuthorizationLostResponse,
  ikasAdminAuthenticationResponse,
} from '@/lib/auth-helpers';
import { syncStorefrontThemeForToken, type StorefrontThemeSyncOptions } from '@/lib/storefront-theme-sync';
import { reportServerFailure } from '@/lib/server-failures';
import { IkasInstallationError } from '@/lib/ikas-installation-lifecycle';

type SyncRequestBody = {
  reason?: StorefrontThemeSyncOptions['reason'];
  forceVerify?: boolean;
};

function getReason(value: unknown): StorefrontThemeSyncOptions['reason'] {
  return value === 'settings_save' || value === 'manual' || value === 'verification' || value === 'cron' || value === 'install'
    ? value
    : 'dashboard_open';
}

export async function POST(request: Request) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);
    const { authToken, principal } = auth.context;

    const body = (await request.json().catch(() => ({}))) as SyncRequestBody;
    const result = await syncStorefrontThemeForToken(
      authToken,
      {
        reason: getReason(body.reason),
        promotePending: body.forceVerify === true,
        persistUnchangedCheck: false,
      },
      principal,
    );

    return NextResponse.json({ data: result });
  } catch (error) {
    if (error instanceof IkasInstallationError) {
      return ikasAdminAuthorizationLostResponse();
    }
    reportServerFailure('storefront_theme_sync_failed');
    return NextResponse.json({ error: 'storefront_theme_sync_failed' }, { status: 500 });
  }
}
