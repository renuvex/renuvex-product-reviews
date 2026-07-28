import type { AuthToken as AuthTokenRow, IkasStoreInstallation, Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import type { AuthToken } from '@/models/auth-token';

const INSTALLATION_LOCK_NAMESPACE = 'renuvex:ikas-store-installation';

export class IkasInstallationError extends Error {
  constructor(public readonly code: string) {
    super(code);
    this.name = 'IkasInstallationError';
  }
}

function authTokenWrite(token: AuthToken) {
  return {
    merchantId: token.merchantId,
    salesChannelId: token.salesChannelId ?? null,
    accessToken: token.accessToken,
    tokenType: token.tokenType,
    expiresIn: token.expiresIn,
    expireDate: new Date(token.expireDate),
    refreshToken: token.refreshToken,
    scope: token.scope ?? null,
  };
}

async function lockStoreInstallation(tx: Prisma.TransactionClient, storeId: string): Promise<IkasStoreInstallation | null> {
  await tx.$executeRaw`
    SELECT pg_advisory_xact_lock(
      hashtextextended(${`${INSTALLATION_LOCK_NAMESPACE}:${storeId}`}, 0)
    )
  `;
  const rows = await tx.$queryRaw<IkasStoreInstallation[]>`
    SELECT * FROM "IkasStoreInstallation"
    WHERE "storeId" = ${storeId}
    FOR UPDATE
  `;
  return rows[0] ?? null;
}

async function createActiveInstallationFromToken(
  tx: Prisma.TransactionClient,
  token: Pick<AuthTokenRow, 'merchantId' | 'authorizedAppId'>,
  now: Date,
): Promise<IkasStoreInstallation> {
  return tx.ikasStoreInstallation.create({
    data: {
      storeId: token.merchantId,
      authorizedAppId: token.authorizedAppId,
      generation: 1,
      stateVersion: 1,
      status: 'active',
      activatedAt: now,
    },
  });
}

export async function activateIkasStoreInstallation(token: AuthToken, now = new Date()): Promise<IkasStoreInstallation> {
  return prisma.$transaction(async (tx) => {
    const current = await lockStoreInstallation(tx, token.merchantId);
    if (current && current.authorizedAppId === token.authorizedAppId && current.status !== 'active') {
      throw new IkasInstallationError('ikas_installation_reactivation_rejected');
    }
    const generation = !current
      ? 1
      : current.authorizedAppId === token.authorizedAppId && current.status === 'active'
        ? current.generation
        : current.generation + 1;
    const stateVersion = (current?.stateVersion ?? 0) + 1;

    await tx.authToken.deleteMany({ where: { merchantId: token.merchantId } });
    await tx.authToken.create({
      data: {
        authorizedAppId: token.authorizedAppId,
        ...authTokenWrite(token),
      },
    });

    return tx.ikasStoreInstallation.upsert({
      where: { storeId: token.merchantId },
      create: {
        storeId: token.merchantId,
        authorizedAppId: token.authorizedAppId,
        generation,
        stateVersion,
        status: 'active',
        activatedAt: now,
      },
      update: {
        authorizedAppId: token.authorizedAppId,
        generation,
        stateVersion,
        status: 'active',
        activatedAt: now,
        erasureStartedAt: null,
        erasedAt: null,
      },
    });
  });
}

export async function ensureActiveIkasStoreInstallation(storeId: string, authorizedAppId: string, now = new Date()): Promise<IkasStoreInstallation> {
  return prisma.$transaction(async (tx) => {
    const current = await lockStoreInstallation(tx, storeId);
    const token = await tx.authToken.findUnique({ where: { authorizedAppId } });
    if (!token || token.merchantId !== storeId) {
      throw new IkasInstallationError('ikas_installation_tenant_mismatch');
    }
    if (!current) return createActiveInstallationFromToken(tx, token, now);
    if (current.authorizedAppId !== authorizedAppId || current.status !== 'active') {
      throw new IkasInstallationError('ikas_installation_inactive');
    }
    return current;
  });
}

export async function requireActiveIkasStoreInstallation(
  tx: Prisma.TransactionClient,
  storeId: string,
  authorizedAppId: string,
): Promise<IkasStoreInstallation> {
  const current = await lockStoreInstallation(tx, storeId);
  if (!current || current.authorizedAppId !== authorizedAppId || current.status !== 'active') {
    throw new IkasInstallationError('ikas_installation_inactive');
  }
  return current;
}

export type ActiveIkasInstallationTokenPairResult =
  | {
      status: 'active';
      installation: IkasStoreInstallation;
      authToken: AuthTokenRow;
    }
  | { status: 'inactive' }
  | { status: 'tenant_mismatch' }
  | { status: 'reauthorization_required' };

export async function resolveActiveIkasInstallationTokenPair(
  tx: Prisma.TransactionClient,
  storeId: string,
  authorizedAppId: string,
): Promise<ActiveIkasInstallationTokenPairResult> {
  const installation = await lockStoreInstallation(tx, storeId);
  if (
    !installation ||
    installation.status !== 'active' ||
    installation.authorizedAppId !== authorizedAppId
  ) {
    return { status: 'inactive' };
  }

  const authToken = await tx.authToken.findUnique({
    where: { authorizedAppId },
  });
  if (!authToken) return { status: 'reauthorization_required' };
  if (authToken.merchantId !== storeId) return { status: 'tenant_mismatch' };

  return { status: 'active', installation, authToken };
}

export type IkasInstallationFence = {
  authorizedAppId: string;
  generation: number;
  stateVersion: number;
};

export async function getActiveIkasStoreInstallationFence(
  storeId: string,
  authorizedAppId: string,
): Promise<IkasInstallationFence | null> {
  const installation = await prisma.ikasStoreInstallation.findUnique({
    where: { storeId },
    select: {
      authorizedAppId: true,
      generation: true,
      stateVersion: true,
      status: true,
    },
  });
  if (
    !installation ||
    installation.status !== 'active' ||
    installation.authorizedAppId !== authorizedAppId
  ) {
    return null;
  }
  return {
    authorizedAppId: installation.authorizedAppId,
    generation: installation.generation,
    stateVersion: installation.stateVersion,
  };
}

export async function requireActiveIkasStoreInstallationFence(
  tx: Prisma.TransactionClient,
  storeId: string,
  fence: IkasInstallationFence,
): Promise<IkasStoreInstallation> {
  const installation = await requireActiveIkasStoreInstallation(tx, storeId, fence.authorizedAppId);
  if (
    installation.generation !== fence.generation ||
    installation.stateVersion !== fence.stateVersion
  ) {
    throw new IkasInstallationError('ikas_installation_inactive');
  }
  return installation;
}

export async function lockActiveIkasStoreInstallationGeneration(
  tx: Prisma.TransactionClient,
  storeId: string,
  generation: number,
): Promise<IkasStoreInstallation | null> {
  const current = await lockStoreInstallation(tx, storeId);
  if (!current || current.status !== 'active' || current.generation !== generation) return null;
  return current;
}

export type InstallationErasureDecision =
  | { action: 'erase'; installation: IkasStoreInstallation }
  | { action: 'stale'; installation: IkasStoreInstallation };

export async function beginIkasStoreInstallationErasure(
  tx: Prisma.TransactionClient,
  input: { storeId: string; authorizedAppId: string; now: Date },
): Promise<InstallationErasureDecision> {
  let current = await lockStoreInstallation(tx, input.storeId);

  if (!current) {
    const activeToken = await tx.authToken.findFirst({
      where: { merchantId: input.storeId },
      orderBy: { updatedAt: 'desc' },
    });
    if (activeToken && activeToken.authorizedAppId !== input.authorizedAppId) {
      current = await createActiveInstallationFromToken(tx, activeToken, input.now);
      return { action: 'stale', installation: current };
    }
    current = await tx.ikasStoreInstallation.create({
      data: {
        storeId: input.storeId,
        authorizedAppId: input.authorizedAppId,
        generation: 1,
        stateVersion: 1,
        status: 'erasing',
        activatedAt: input.now,
        erasureStartedAt: input.now,
      },
    });
    return { action: 'erase', installation: current };
  }

  if (current.authorizedAppId !== input.authorizedAppId) {
    return { action: 'stale', installation: current };
  }

  const installation = await tx.ikasStoreInstallation.update({
    where: { storeId: input.storeId },
    data: {
      status: 'erasing',
      stateVersion: { increment: 1 },
      erasureStartedAt: input.now,
      erasedAt: null,
    },
  });
  return { action: 'erase', installation };
}

export async function finishIkasStoreInstallationErasure(tx: Prisma.TransactionClient, storeId: string, now: Date): Promise<void> {
  await tx.ikasStoreInstallation.update({
    where: { storeId },
    data: {
      status: 'erased',
      stateVersion: { increment: 1 },
      erasedAt: now,
    },
  });
}
