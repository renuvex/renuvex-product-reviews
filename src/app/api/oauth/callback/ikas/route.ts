import { config } from '@/globals/config';
import {
  claimOAuthDashboardBootstrap,
  clearOAuthDashboardBootstrap,
  consumeOAuthStateTransaction,
  createOAuthBrowserBinding,
  ikasStoreNameSchema,
  isOAuthBrowserBinding,
  oauthStateSchema,
  OAuthStateStoreError,
} from '@/lib/oauth-state';
import { getSession } from '@/lib/session';
import { validateRequest } from '@/lib/validation';
import { OAuthAPI } from '@ikas/admin-api-client';
import moment from 'moment';
import { getIkas, getIkasV1 } from '@/helpers/api-helpers';
import { TokenHelpers } from '@/helpers/token-helpers';
import { AuthToken } from '@/models/auth-token';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse, after } from 'next/server';
import z from 'zod';
import { ensureStorefrontScripts } from '@/lib/storefront-scripts';
import { buildProductWebhookEndpoint, registerProductWebhooks, syncAllProductsForStore } from '@/lib/product-snapshots';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import { buildOrderWebhookEndpoint, registerOrderWebhooks } from '@/lib/review-email/ikas-orders';
import { activateIkasStoreInstallation } from '@/lib/ikas-installation-lifecycle';
import { updateReviewEmailWebhookStateForInstallation } from '@/lib/review-email/settings';

const callbackSchema = z.object({
  code: z.string().min(1, 'Authorization code is required'),
  storeName: ikasStoreNameSchema,
  state: oauthStateSchema.optional(),
  signature: z.string().optional(),
});

/**
 * Handles the OAuth callback for Ikas.
 * A dashboard callback without state can only bootstrap a fresh authorization
 * round. Token exchange still requires atomically consumed browser-bound state.
 */
export async function GET(request: NextRequest) {
  try {
    // Parse the request URL to extract query parameters
    const url = new URL(request.url as string, `http://${request.headers.get('host')}`);
    const { searchParams } = url;

    // Validate the incoming request parameters (code, storeName, state, signature)
    const validation = validateRequest(callbackSchema, {
      code: searchParams.get('code'),
      storeName: searchParams.get('storeName'),
      state: searchParams.has('state') ? searchParams.get('state') : undefined,
      signature: searchParams.get('signature') || undefined,
    });

    if (!validation.success) {
      // Invalid parameters
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { code, storeName, state, signature } = validation.data;

    // Validate code signature
    if (signature && !TokenHelpers.validateCodeSignature(code, signature, config.oauth.clientSecret!)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const session = await getSession();

    // Some ikas dashboard installs arrive at the registered callback without
    // state. Discard that authorization code and start one bounded state-bearing
    // round; never exchange an unbound code.
    if (!state) {
      if (!isOAuthBrowserBinding(session.oauthBrowserBinding)) {
        session.oauthBrowserBinding = createOAuthBrowserBinding();
        await session.save();
      }

      const bootstrapClaimed = await claimOAuthDashboardBootstrap({
        browserBinding: session.oauthBrowserBinding,
        storeName,
      });
      if (!bootstrapClaimed) {
        return NextResponse.json({ error: 'Invalid or expired OAuth state' }, { status: 400 });
      }

      const authorizeUrl = new URL('/api/oauth/authorize/ikas', config.oauth.redirectUri);
      authorizeUrl.searchParams.set('storeName', storeName);
      const response = NextResponse.redirect(authorizeUrl, 303);
      response.headers.set('Cache-Control', 'no-store');
      response.headers.set('Referrer-Policy', 'no-referrer');
      return response;
    }

    // Bind the state-bearing callback to the initiating browser and consume it.
    if (!isOAuthBrowserBinding(session.oauthBrowserBinding)) {
      return NextResponse.json({ error: 'Invalid or expired OAuth state' }, { status: 400 });
    }

    const oauthTransaction = await consumeOAuthStateTransaction({
      browserBinding: session.oauthBrowserBinding,
      state,
    });
    if (!oauthTransaction || oauthTransaction.storeName !== storeName) {
      return NextResponse.json({ error: 'Invalid or expired OAuth state' }, { status: 400 });
    }

    try {
      await clearOAuthDashboardBootstrap({
        browserBinding: session.oauthBrowserBinding,
        storeName,
      });
    } catch {
      // This marker is only a bounded loop guard and self-expires. It is not an
      // authorization source, so cleanup failure must not invalidate consumed state.
      console.warn('[oauth-callback] dashboard_bootstrap_cleanup_failed');
    }

    // Exchange authorization code for access/refresh tokens
    const tokenResponse = await OAuthAPI.getTokenWithAuthorizationCode(
      {
        code: code as string,
        client_id: config.oauth.clientId!,
        client_secret: config.oauth.clientSecret!,
        redirect_uri: oauthTransaction.redirectUri,
      },
      {
        storeName: oauthTransaction.storeName,
      },
    );

    if (!tokenResponse.data) {
      // Failed to get token
      return NextResponse.json({ error: { statusCode: 500, message: 'Failed to retrieve token' } }, { status: 500 });
    }

    // Prepare a temporary token object
    const tokenTemp: Partial<AuthToken> = {
      accessToken: tokenResponse.data.access_token,
      refreshToken: tokenResponse.data.refresh_token,
      tokenType: tokenResponse.data.token_type,
      expiresIn: tokenResponse.data.expires_in,
      expireDate: '',
      scope: tokenResponse.data.scope,
      salesChannelId: null,
    };

    // Create an Ikas client with the new token
    const ikas = getIkas(tokenTemp as AuthToken);

    // Fetch merchant and authorized app details
    const [merchantResponse, authorizedAppResponse] = await Promise.all([ikas.queries.getMerchant(), ikas.queries.getAuthorizedApp()]);

    // Validate responses
    if (
      !merchantResponse.isSuccess ||
      !merchantResponse.data ||
      !authorizedAppResponse.isSuccess ||
      !authorizedAppResponse.data ||
      !authorizedAppResponse.data.getAuthorizedApp ||
      !merchantResponse.data.getMerchant
    ) {
      return NextResponse.json(
        {
          error: { statusCode: 403, message: 'Unable to retrieve merchant or authorized app' },
        },
        { status: 403 },
      );
    }

    // Extract necessary IDs and calculate token expiration date
    const authorizedAppId = authorizedAppResponse.data.getAuthorizedApp.id!;
    const merchantId = merchantResponse.data.getMerchant.id!;
    const expireDate = moment().add(tokenResponse.data.expires_in, 'seconds').toDate().toISOString();

    // Build the final AuthToken object
    const token: AuthToken = {
      ...tokenTemp,
      authorizedAppId,
      merchantId,
      expireDate,
      salesChannelId: authorizedAppResponse.data.getAuthorizedApp.salesChannelId || null,
    } as AuthToken;

    // Replace the merchant token and activate a new installation generation in
    // one transaction so stale uninstall events cannot target the new install.
    await activateIkasStoreInstallation(token);

    // Ensure storeSettings record exists for this merchant
    await prisma.storeSettings.upsert({
      where: { storeId: merchantId },
      update: {},
      create: { storeId: merchantId },
    });

    // Auto-inject widget script into all storefronts using non-destructive upsert.
    try {
      await ensureStorefrontScripts(ikas, merchantId, 'install', { scriptListClient: getIkasV1(token) });
    } catch (scriptError) {
      console.error('Widget script injection failed:', scriptError);
    }

    const host = request.headers.get('host');
    if (host) {
      try {
        await registerProductWebhooks(ikas, buildProductWebhookEndpoint(host));
      } catch (webhookError) {
        console.error('Product webhook registration failed:', webhookError);
      }

      const reviewEmailSettings = isReviewEmailEnabled()
        ? await prisma.reviewEmailSettings.findUnique({
            where: { storeId: merchantId },
            select: { enabled: true },
          })
        : null;
      if (reviewEmailSettings?.enabled) {
        let orderWebhookRegistered = false;
        try {
          await registerOrderWebhooks(ikas, buildOrderWebhookEndpoint(host));
          orderWebhookRegistered = true;
        } catch (webhookError) {
          await updateReviewEmailWebhookStateForInstallation(prisma, {
            storeId: merchantId,
            authorizedAppId,
            disable: true,
            webhookState: {
              status: 'error',
              verifiedAt: null,
              lastErrorCode: 'registration_failed',
            },
          }).catch(() => undefined);
          console.error('Order webhook registration failed:', webhookError);
        }
        if (orderWebhookRegistered) {
          await updateReviewEmailWebhookStateForInstallation(prisma, {
            storeId: merchantId,
            authorizedAppId,
            disable: false,
            webhookState: {
              status: 'verified',
              verifiedAt: new Date(),
              lastErrorCode: null,
            },
          });
        }
      }
    }

    // Backfill snapshots after the response is sent so a large catalog cannot
    // delay or fail the install; webhooks + /api/admin/sync-products recover misses.
    after(async () => {
      try {
        await syncAllProductsForStore(ikas, merchantId);
      } catch (productSyncError) {
        console.error('Initial product snapshot sync failed:', productSyncError);
      }
    });

    // Update session with the installation identity while retaining the opaque
    // browser binding for independent future OAuth transactions.
    session.expiresAt = new Date(Date.now() + 3600 * 1000);
    session.merchantId = merchantId;
    session.authorizedAppId = authorizedAppId;
    await session.save();

    // Return directly to the trusted ikas admin target. The iframe obtains its
    // short-lived admin JWT from AppBridge; bearer credentials never cross a URL.
    const redirectUrl = new URL(config.adminUrl!.replace('{storeName}', oauthTransaction.storeName));
    redirectUrl.pathname = `${redirectUrl.pathname.replace(/\/$/, '')}/authorized-app/${encodeURIComponent(authorizedAppId)}`;
    redirectUrl.search = '';
    redirectUrl.hash = '';

    const response = NextResponse.redirect(redirectUrl, 303);
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('Referrer-Policy', 'no-referrer');
    return response;
  } catch (error) {
    if (error instanceof OAuthStateStoreError) {
      console.error('[oauth-callback] oauth_state_store_unavailable');
      return NextResponse.json({ error: { statusCode: 503, message: 'Authorization temporarily unavailable' } }, { status: 503 });
    }
    console.error('[oauth-callback] callback_failed');
    return NextResponse.json({ error: { statusCode: 500, message: 'Callback failed' } }, { status: 500 });
  }
}
