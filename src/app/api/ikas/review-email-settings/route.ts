import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import {
  buildReviewEmailSettingsWrite,
  getEffectiveReviewEmailSettings,
  missingReviewEmailIkasScopes,
  persistReviewEmailSettingsForInstallation,
  ReviewEmailSettingsError,
  serializeReviewEmailSettings,
} from '@/lib/review-email/settings';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { getIkas } from '@/helpers/api-helpers';
import { buildOrderWebhookEndpoint, registerOrderWebhooks } from '@/lib/review-email/ikas-orders';
import { ensureActiveIkasStoreInstallation, IkasInstallationError } from '@/lib/ikas-installation-lifecycle';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = await getEffectiveReviewEmailSettings(prisma, user.merchantId);
  return NextResponse.json({ data: serializeReviewEmailSettings(settings) });
}

export async function PUT(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const authToken = await AuthTokenManager.get(user.authorizedAppId);
    if (!authToken) {
      throw new ReviewEmailSettingsError('auth_token_not_found', 'Auth token not found', 409);
    }
    await ensureActiveIkasStoreInstallation(user.merchantId, user.authorizedAppId);

    const body = await request.json();
    const data = buildReviewEmailSettingsWrite(body);
    if (data.enabled) {
      if (missingReviewEmailIkasScopes(authToken.scope).length > 0) {
        throw new ReviewEmailSettingsError('review_email_reauthorization_required', undefined, 409);
      }
      try {
        await registerOrderWebhooks(getIkas(authToken), buildOrderWebhookEndpoint(request.headers.get('host') ?? ''));
      } catch {
        await persistReviewEmailSettingsForInstallation(
          prisma,
          user.merchantId,
          user.authorizedAppId,
          { ...data, enabled: false },
          { status: 'error', verifiedAt: null, lastErrorCode: 'registration_failed' },
        );
        throw new ReviewEmailSettingsError('order_webhook_registration_failed', undefined, 502);
      }
    }

    const verifiedAt = new Date();
    const settings = await persistReviewEmailSettingsForInstallation(
      prisma,
      user.merchantId,
      user.authorizedAppId,
      data,
      data.enabled ? { status: 'verified', verifiedAt, lastErrorCode: null } : {},
      verifiedAt,
    );
    return NextResponse.json({ data: serializeReviewEmailSettings(settings) });
  } catch (error) {
    if (error instanceof ReviewEmailSettingsError) {
      return NextResponse.json({ error: error.code }, { status: error.status });
    }
    if (error instanceof IkasInstallationError) {
      return NextResponse.json({ error: error.code }, { status: 409 });
    }
    const failure = normalizeReviewEmailFailure('review_email_settings', error);
    reportReviewEmailFailure('review_email_settings', failure);
    return NextResponse.json({ error: 'review_email_settings_failed' }, { status: 500 });
  }
}
