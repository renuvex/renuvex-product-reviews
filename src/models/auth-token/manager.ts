import { AuthToken } from './index';
import { prisma } from '@/lib/prisma';
import type { AuthToken as PrismaAuthToken } from '@prisma/client';

/**
 * AuthTokenManager provides read and refresh operations for persisted ikas
 * tokens. Installation activation is owned by ikas-installation-lifecycle.ts.
 */
export class AuthTokenManager {
  private static toModel(db: PrismaAuthToken): AuthToken {
    return {
      authorizedAppId: db.authorizedAppId,
      merchantId: db.merchantId,
      salesChannelId: db.salesChannelId ?? null,
      accessToken: db.accessToken,
      tokenType: db.tokenType,
      expiresIn: db.expiresIn,
      expireDate: new Date(db.expireDate).toISOString(),
      refreshToken: db.refreshToken,
      scope: db.scope ?? undefined,
      createdAt: db.createdAt ? new Date(db.createdAt).toISOString() : undefined,
      updatedAt: db.updatedAt ? new Date(db.updatedAt).toISOString() : undefined,
    };
  }
  /**
   * Retrieve an AuthToken by its authorizedAppId.
   * @param authorizedAppId - The ID of the authorized app.
   * @returns The AuthToken if found, otherwise undefined.
   */
  static async get(authorizedAppId: string): Promise<AuthToken | undefined> {
    const token = await prisma.authToken.findUnique({
      where: { authorizedAppId },
    });
    return token ? this.toModel(token) : undefined;
  }

  /**
   * Retrieve the most recently updated AuthToken for a given merchantId.
   * `merchantId` is not unique in the schema (reinstalling the app creates a
   * new `authorizedAppId` for the same merchant); callers that only know the
   * merchant id (e.g. the public storefront settings endpoint, where the
   * `publicApiKey` IS the merchantId) need this lookup to drive merchant-scoped
   * background work like ADR_0022's lazy theme resync.
   * @param merchantId - The ID of the merchant (storeId).
   * @returns The latest AuthToken if any exists, otherwise undefined.
   */
  static async getByMerchantId(merchantId: string): Promise<AuthToken | undefined> {
    const token = await prisma.authToken.findFirst({
      where: { merchantId },
      orderBy: { updatedAt: 'desc' },
    });
    return token ? this.toModel(token) : undefined;
  }

  /**
   * Refreshes an existing installation token without recreating a row removed
   * by uninstall erasure.
   */
  static async updateExisting(token: AuthToken): Promise<AuthToken | undefined> {
    const updated = await prisma.authToken.updateMany({
      where: {
        authorizedAppId: token.authorizedAppId,
        merchantId: token.merchantId,
      },
      data: {
        salesChannelId: token.salesChannelId || undefined,
        accessToken: token.accessToken,
        tokenType: token.tokenType,
        expiresIn: token.expiresIn,
        expireDate: new Date(token.expireDate),
        refreshToken: token.refreshToken,
        scope: token.scope,
      },
    });
    if (updated.count !== 1) return undefined;
    return this.get(token.authorizedAppId);
  }

  /**
   * List all AuthTokens.
   * @returns Array of AuthTokens.
   */
  static async list(): Promise<AuthToken[]> {
    const tokens = await prisma.authToken.findMany();
    return tokens.map(AuthTokenManager.toModel);
  }
}
