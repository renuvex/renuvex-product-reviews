import { NextResponse } from 'next/server';
import { Receiver, SignatureError } from '@upstash/qstash';
import { getQStashMediaConfig, MediaConfigError } from '@/lib/media/config';
import {
  processProductReconciliationSweep,
} from '@/lib/product-reconciliation-sweep';
import { dispatchProductReconciliationSweep } from '@/lib/product-reconciliation-dispatcher';
import { ProductReconciliationError } from '@/lib/product-reconciliation';
import { reportServerFailure } from '@/lib/server-failures';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function parseSweepId(rawBody: string): string | null {
  const parsed: unknown = JSON.parse(rawBody);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
  const keys = Object.keys(parsed);
  if (keys.length !== 1 || keys[0] !== 'sweepId') return null;
  const sweepId = (parsed as { sweepId?: unknown }).sweepId;
  return typeof sweepId === 'string' && UUID_PATTERN.test(sweepId) ? sweepId : null;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  try {
    const config = getQStashMediaConfig();
    const signature = request.headers.get('Upstash-Signature') ?? '';
    if (!signature) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    const receiver = new Receiver({
      currentSigningKey: config.currentSigningKey,
      nextSigningKey: config.nextSigningKey,
    });
    await receiver.verify({ body: rawBody, signature, url: request.url });

    const sweepId = parseSweepId(rawBody);
    if (!sweepId) return NextResponse.json({ error: 'invalid_sweep_id' }, { status: 400 });
    const result = await processProductReconciliationSweep(sweepId);
    if (result.continuation && !(await dispatchProductReconciliationSweep(result.continuation))) {
      return NextResponse.json({ error: 'product_reconciliation_dispatch_failed' }, { status: 503 });
    }
    return NextResponse.json({ data: { status: result.status } });
  } catch (error) {
    if (error instanceof SignatureError) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    if (error instanceof SyntaxError) return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
    if (error instanceof MediaConfigError) {
      return NextResponse.json({ error: 'product_reconciliation_unavailable' }, { status: 503 });
    }
    if (error instanceof ProductReconciliationError && !error.retryable) {
      return NextResponse.json({ error: error.code }, { status: 409 });
    }
    reportServerFailure('product_reconciliation_sweep_failed');
    return NextResponse.json({ error: 'product_reconciliation_sweep_failed' }, { status: 500 });
  }
}
