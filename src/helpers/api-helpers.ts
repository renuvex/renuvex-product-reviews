import { OAuthAPI } from '@ikas/admin-api-client';
import moment from 'moment';
import { AuthToken } from '../models/auth-token';
import { AuthTokenManager } from '../models/auth-token/manager';
import { ikasAdminGraphQLAPIClient } from '../lib/ikas-client/generated/graphql';
import { ikasAdminGraphQLAPIClient as ikasAdminGraphQLAPIV1Client } from '../lib/ikas-client/generated/v1-graphql';
import { config } from '../globals/config';
import { getRequiredIkasClientSecret } from '../lib/ikas-client-secret';

const IKAS_ADMIN_GRAPH_API_V1_URL = 'https://api.myikas.com/api/v1/admin/graphql';

/**
 * Returns a new instance of the ikasAdminGraphQLAPIClient with the provided token.
 * @param token AuthToken object containing access and refresh tokens.
 */
export function getIkas(token: AuthToken): ikasAdminGraphQLAPIClient<AuthToken> {
  return new ikasAdminGraphQLAPIClient<AuthToken>({
    graphApiUrl: config.graphApiUrl!,
    accessToken: token.accessToken,
    tokenData: token,
    onCheckToken: () => onCheckToken(token),
  });
}

export function getIkasV1(token: AuthToken): ikasAdminGraphQLAPIV1Client<AuthToken> {
  return new ikasAdminGraphQLAPIV1Client<AuthToken>({
    graphApiUrl: IKAS_ADMIN_GRAPH_API_V1_URL,
    accessToken: token.accessToken,
    tokenData: token,
    onCheckToken: () => onCheckToken(token),
  });
}

/**
 * Checks if the provided token is expired and refreshes it if necessary.
 * @param token AuthToken object to check and refresh.
 * @returns An object containing the (possibly refreshed) accessToken and tokenData.
 */
export async function onCheckToken(token?: AuthToken): Promise<{ accessToken: string | undefined; tokenData?: AuthToken }> {
  try {
    if (!token) {
      // No token provided, return undefined.
      return { accessToken: undefined };
    }

    const now = new Date();
    const expireDate = new Date(token.expireDate);

    // If the token is expired, attempt to refresh it.
    if (now.getTime() >= expireDate.getTime()) {
      const expectedRefreshToken = token.refreshToken;
      const expectedUpdatedAt = token.updatedAt;
      if (!expectedUpdatedAt || !Number.isFinite(new Date(expectedUpdatedAt).getTime())) {
        return { accessToken: undefined };
      }

      const response = await OAuthAPI.refreshToken(
        {
          refresh_token: expectedRefreshToken,
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
          client_secret: getRequiredIkasClientSecret(),
        },
        {
          storeName: 'api',
        },
      );

      if (response.data) {
        // Calculate new expiration date in ISO format.
        const newExpireDate = moment().add(response.data.expires_in, 'seconds').toDate().toISOString();

        const refreshedToken: AuthToken = {
          ...token,
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
          tokenType: response.data.token_type,
          expiresIn: response.data.expires_in,
          expireDate: newExpireDate,
        };

        // Compare against the exact row revision that authorized this refresh.
        // A same-app reauthorization or concurrent refresh may have updated the
        // row while the provider request was in flight, even if the provider
        // returned the same refresh-token value.
        const persisted = await AuthTokenManager.updateExisting(
          refreshedToken,
          {
            refreshToken: expectedRefreshToken,
            updatedAt: expectedUpdatedAt,
          },
        );
        if (!persisted) return { accessToken: undefined };

        return { accessToken: persisted.accessToken, tokenData: persisted };
      }
    }

    // Token is still valid or refresh failed, return undefined accessToken.
    return { accessToken: undefined };
  } catch {
    console.error('[ikas-token-refresh] refresh_failed');
    return { accessToken: undefined };
  }
}

/**
 * Generates the appropriate OAuth redirect URI for the current environment.
 * Handles localhost development vs production deployment scenarios.
 *
 * @param host - The current request host header
 * @returns The correct redirect URI for OAuth callback
 */
export const getRedirectUri = (host: string) => {
  // If config uses localhost but the request is from a public development host.
  if (config.oauth.redirectUri.includes('localhost') && !host.includes('localhost')) {
    // Replace localhost with actual host for production deployments
    const redirectUri = new URL(config.oauth.redirectUri);
    redirectUri.host = host;
    redirectUri.protocol = 'https';
    redirectUri.port = '443';
    return redirectUri.toString();
  }

  // Use configured redirect URI as-is
  return config.oauth.redirectUri;
};
