import { config } from '@/globals/config';
import { getRedirectUri } from '@/helpers/api-helpers';
import {
  createOAuthBrowserBinding,
  ikasStoreNameSchema,
  isOAuthBrowserBinding,
  issueOAuthStateTransaction,
  OAuthStateStoreError,
} from '@/lib/oauth-state';
import { getSession } from '@/lib/session';
import { validateRequest } from '@/lib/validation';
import { OAuthAPI } from '@ikas/admin-api-client';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

// Validation schemas
const authorizeSchema = z.object({
  storeName: ikasStoreNameSchema,
});

/**
 * Handles the OAuth authorization initiation for Ikas.
 * Validates the incoming request, generates a secure state, updates the session,
 * and redirects the user to the Ikas OAuth authorization URL.
 */
export async function GET(request: NextRequest) {
  try {
    // Parse the request URL to extract query parameters
    const url = new URL(request.url);
    const { searchParams } = url;

    // Validate the incoming request parameters (expects storeName)
    const validation = validateRequest(authorizeSchema, {
      storeName: searchParams.get('storeName'),
    });

    if (!validation.success) {
      // If validation fails, return a 400 error with details
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { storeName } = validation.data;
    const host = request.headers.get('host') || url.host;
    const redirectUri = getRedirectUri(host);
    const oauthBaseUrl = OAuthAPI.getOAuthUrl({ storeName });

    // Keep one opaque browser binding while allowing multiple independent OAuth states.
    const session = await getSession();
    if (!isOAuthBrowserBinding(session.oauthBrowserBinding)) {
      session.oauthBrowserBinding = createOAuthBrowserBinding();
      await session.save();
    }

    const { state } = await issueOAuthStateTransaction({
      browserBinding: session.oauthBrowserBinding,
      storeName,
      redirectUri,
    });

    // Construct the full Ikas OAuth authorize URL with required query parameters
    const authorizeUrl = new URL(`${oauthBaseUrl}/authorize`);
    authorizeUrl.searchParams.set('client_id', config.oauth.clientId!);
    authorizeUrl.searchParams.set('redirect_uri', redirectUri);
    authorizeUrl.searchParams.set('scope', config.oauth.scope);
    authorizeUrl.searchParams.set('state', state);

    return NextResponse.redirect(authorizeUrl);
  } catch (error) {
    if (error instanceof OAuthStateStoreError) {
      console.error('[oauth-authorize] oauth_state_store_unavailable');
      return NextResponse.json({ error: 'Authorization temporarily unavailable' }, { status: 503 });
    }
    console.error('[oauth-authorize] authorization_failed');
    return NextResponse.json({ error: 'Authorization failed' }, { status: 500 });
  }
}
