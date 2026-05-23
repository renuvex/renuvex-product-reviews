import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { syncStorefrontThemeForToken, type StorefrontThemeSyncOptions } from '@/lib/storefront-theme-sync';
import { AuthTokenManager } from '@/models/auth-token/manager';

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
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 });

    const authToken = await AuthTokenManager.get(user.authorizedAppId);
    if (!authToken) return NextResponse.json({ error: 'Auth token bulunamadi' }, { status: 404 });

    const body = (await request.json().catch(() => ({}))) as SyncRequestBody;
    const result = await syncStorefrontThemeForToken(authToken, {
      reason: getReason(body.reason),
      promotePending: body.forceVerify === true,
      persistUnchangedCheck: false,
    });

    return NextResponse.json({ data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    console.error('[storefront-theme-sync] ERROR:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
