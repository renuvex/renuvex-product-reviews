import { AppBridgeHelper } from '@ikas/app-helpers';
import crypto from 'crypto';

/** Key used for storing tokens in session storage. */
const TOKEN_KEY = 'token';

function getJwtExpiration(token: string): number | null {
  const payload = token.split('.')[1];
  if (!payload) return null;

  try {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const decoded = JSON.parse(atob(padded)) as { exp?: unknown };
    return typeof decoded.exp === 'number' && Number.isFinite(decoded.exp) ? decoded.exp : null;
  } catch {
    return null;
  }
}

/**
 * Utility methods for retrieving and validating ikas authentication tokens.
 */
export class TokenHelpers {
  /**
   * Retrieves an admin JWT from the ikas AppBridge when the application runs
   * inside the ikas dashboard. Valid cached tokens are scoped by authorized app.
   */
  static getTokenForIframeApp = async (): Promise<string | null> => {
    if (window.self !== window.top) {
      try {
        const authorizedAppId = (await AppBridgeHelper.getAuthorizedAppId()) || null;
        if (!authorizedAppId) {
          return null;
        }

        const storageKey = `${TOKEN_KEY}-${authorizedAppId}`;
        let token = sessionStorage.getItem(storageKey);

        if (token) {
          const expiresAt = getJwtExpiration(token);
          if (expiresAt !== null && Date.now() < expiresAt * 1000) {
            return token;
          }

          sessionStorage.removeItem(storageKey);
        }

        token = (await AppBridgeHelper.getNewToken()) || null;
        if (token) {
          sessionStorage.setItem(storageKey, token);
          return token;
        }
      } catch (error) {
        console.error('Error retrieving token from AppBridge:', error);
      }
    }

    return null;
  };

  /**
   * Validates an OAuth authorization-code signature using HMAC-SHA256.
   */
  static validateCodeSignature = (code: string, receivedSignature: string, secret: string): boolean => {
    const expectedSignature = crypto.createHmac('sha256', secret).update(code, 'utf8').digest('hex');
    return expectedSignature === receivedSignature;
  };
}
