import { createHash } from 'node:crypto';
import * as Sentry from '@sentry/nextjs';
import { Client } from '@upstash/qstash';
import type { ProductReconciliationRun, ProductReconciliationSweep } from '@prisma/client';
import { getMediaJobEndpoint, getQStashMediaConfig, MediaConfigError } from '@/lib/media/config';

const FLOW_CONTROL = {
  key: 'renuvex-product-reconciliation-v1',
  rate: 1,
  period: '1s' as const,
  parallelism: 4,
};

type RunDispatchState = Pick<
  ProductReconciliationRun,
  'id' | 'phase' | 'nextPage' | 'candidateCursor' | 'attempts' | 'leaseExpiresAt' | 'nextRetryAt'
>;

type SweepDispatchState = Pick<
  ProductReconciliationSweep,
  | 'id'
  | 'phase'
  | 'cursorStoreId'
  | 'retainedRunCount'
  | 'retainedSweepCount'
  | 'attempts'
  | 'leaseExpiresAt'
  | 'nextRetryAt'
>;

export type ProductReconciliationDispatchReason = 'initial' | 'progress' | 'lease' | 'retry' | 'recovery';

export type ProductReconciliationDispatchRequest = {
  run: RunDispatchState;
  reason: ProductReconciliationDispatchReason;
  notBefore?: Date | null;
};

export type ProductReconciliationSweepDispatchRequest = {
  sweep: SweepDispatchState;
  reason: ProductReconciliationDispatchReason;
  notBefore?: Date | null;
};

function endpoint(pathname: string): string {
  return new URL(pathname, getMediaJobEndpoint()).toString();
}

function digest(parts: Array<string | number | null | undefined>): string {
  return createHash('sha256').update(JSON.stringify(parts)).digest('hex');
}

function notBeforeSeconds(value: Date | null | undefined, now = new Date()): number | undefined {
  if (!value || value <= now) return undefined;
  return Math.ceil(value.getTime() / 1000);
}

export function productReconciliationDeduplicationId(
  request: ProductReconciliationDispatchRequest,
): string {
  const run = request.run;
  return `product-run-${digest([
    run.id,
    run.phase,
    run.nextPage,
    run.candidateCursor,
    run.attempts,
    run.leaseExpiresAt?.toISOString(),
    run.nextRetryAt?.toISOString(),
  ])}`;
}

export function productReconciliationSweepDeduplicationId(
  request: ProductReconciliationSweepDispatchRequest,
): string {
  const sweep = request.sweep;
  return `product-sweep-${digest([
    sweep.id,
    sweep.phase,
    sweep.cursorStoreId,
    sweep.retainedRunCount,
    sweep.retainedSweepCount,
    sweep.attempts,
    sweep.leaseExpiresAt?.toISOString(),
    sweep.nextRetryAt?.toISOString(),
  ])}`;
}

async function publish(input: {
  path: string;
  body: Record<string, string>;
  deduplicationId: string;
  notBefore?: Date | null;
  task: string;
}): Promise<boolean> {
  try {
    const config = getQStashMediaConfig();
    const client = new Client({ token: config.token });
    const notBefore = notBeforeSeconds(input.notBefore);
    await client.publishJSON({
      url: endpoint(input.path),
      body: input.body,
      retries: 5,
      timeout: '60s',
      deduplicationId: input.deduplicationId,
      flowControl: FLOW_CONTROL,
      ...(notBefore === undefined ? {} : { notBefore }),
    });
    return true;
  } catch (error) {
    if (!(error instanceof MediaConfigError)) {
      try {
        Sentry.captureException(new Error('product_reconciliation_dispatch_failed'), {
          tags: { source: 'product-reconciliation', task: input.task },
        });
      } catch {
        // Observability must not alter dispatch recovery semantics.
      }
    }
    return false;
  }
}

export function dispatchProductReconciliationRun(
  request: ProductReconciliationDispatchRequest,
): Promise<boolean> {
  return publish({
    path: '/api/internal/product-reconciliation',
    body: { runId: request.run.id },
    deduplicationId: productReconciliationDeduplicationId(request),
    notBefore: request.notBefore,
    task: 'dispatch-run',
  });
}

export function dispatchProductReconciliationSweep(
  request: ProductReconciliationSweepDispatchRequest,
): Promise<boolean> {
  return publish({
    path: '/api/internal/product-reconciliation-sweep',
    body: { sweepId: request.sweep.id },
    deduplicationId: productReconciliationSweepDeduplicationId(request),
    notBefore: request.notBefore,
    task: 'dispatch-sweep',
  });
}
