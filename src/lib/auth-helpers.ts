import { NextResponse } from 'next/server';
import type { AuthToken } from '@/models/auth-token';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { prisma } from '@/lib/prisma';
import { JwtHelpers } from '@/helpers/jwt-helpers';
import {
  resolveActiveIkasInstallationTokenPair,
  type IkasInstallationFence,
} from '@/lib/ikas-installation-lifecycle';
import { reportServerFailure } from '@/lib/server-failures';

export type ActiveIkasAdminPrincipal = IkasInstallationFence & {
  merchantId: string;
};

export type ActiveIkasAdminContext = {
  principal: ActiveIkasAdminPrincipal;
  authToken: AuthToken;
};

export type IkasAdminAuthenticationResult =
  | { ok: true; context: ActiveIkasAdminContext }
  | {
      ok: false;
      code: 'unauthorized' | 'reauthorization_required' | 'authentication_unavailable';
      status: 401 | 409 | 503;
    };

function nonEmptyEnvironmentValue(name: string): string | null {
  const value = process.env[name];
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function developmentIdentity(): { authorizedAppId: string; merchantId: string } | null {
  if (process.env.NODE_ENV !== 'development') return null;
  const authorizedAppId = nonEmptyEnvironmentValue('DEV_AUTHORIZED_APP_ID');
  const merchantId = nonEmptyEnvironmentValue('DEV_MERCHANT_ID');
  if (!authorizedAppId || !merchantId) return null;
  return { authorizedAppId, merchantId };
}

function bearerToken(request: Request): string | null {
  const authorization = request.headers.get('authorization');
  if (!authorization) return null;
  const match = /^JWT ([^\s]+)$/.exec(authorization);
  return match?.[1] ?? null;
}

function authenticationFailure(
  code: 'unauthorized' | 'reauthorization_required' | 'authentication_unavailable',
): IkasAdminAuthenticationResult {
  if (code === 'reauthorization_required') return { ok: false, code, status: 409 };
  if (code === 'authentication_unavailable') return { ok: false, code, status: 503 };
  return { ok: false, code, status: 401 };
}

export async function authenticateIkasAdminRequest(
  request: Request,
): Promise<IkasAdminAuthenticationResult> {
  const development = developmentIdentity();
  let identity: { authorizedAppId: string; merchantId: string };

  if (development) {
    identity = development;
  } else {
    const token = bearerToken(request);
    if (!token) return authenticationFailure('unauthorized');
    const verified = JwtHelpers.verifyToken(token);
    if (verified.status === 'configuration_error') {
      reportServerFailure('admin_auth_configuration_failed');
      return authenticationFailure('authentication_unavailable');
    }
    if (verified.status !== 'valid') return authenticationFailure('unauthorized');
    identity = {
      authorizedAppId: verified.claims.aud,
      merchantId: verified.claims.sub,
    };
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const pair = await resolveActiveIkasInstallationTokenPair(
        tx,
        identity.merchantId,
        identity.authorizedAppId,
      );
      if (pair.status === 'inactive' || pair.status === 'tenant_mismatch') {
        return authenticationFailure('unauthorized');
      }
      if (pair.status === 'reauthorization_required') {
        return authenticationFailure('reauthorization_required');
      }

      return {
        ok: true,
        context: {
          principal: {
            merchantId: identity.merchantId,
            authorizedAppId: identity.authorizedAppId,
            generation: pair.installation.generation,
            stateVersion: pair.installation.stateVersion,
          },
          authToken: AuthTokenManager.fromDatabaseRow(pair.authToken),
        },
      };
    });
  } catch {
    reportServerFailure('admin_auth_lookup_failed');
    return authenticationFailure('authentication_unavailable');
  }
}

export function ikasAdminAuthenticationResponse(
  result: Exclude<IkasAdminAuthenticationResult, { ok: true }>,
): NextResponse {
  const response = NextResponse.json({ error: result.code }, { status: result.status });
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Pragma', 'no-cache');
  return response;
}

export function ikasAdminAuthorizationLostResponse(): NextResponse {
  return ikasAdminAuthenticationResponse({
    ok: false,
    code: 'unauthorized',
    status: 401,
  });
}
