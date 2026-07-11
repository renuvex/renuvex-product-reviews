import { NextResponse } from 'next/server';
import { Receiver, SignatureError } from '@upstash/qstash';
import { getQStashMediaConfig, MediaConfigError } from '@/lib/media/config';
import { processStoreDataErasureRun } from '@/lib/review-email/erasure';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  const rawBody = await request.text();
  try {
    const config = getQStashMediaConfig();
    const signature = request.headers.get('Upstash-Signature') ?? '';
    if (!signature) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    const receiver = new Receiver({ currentSigningKey: config.currentSigningKey, nextSigningKey: config.nextSigningKey });
    await receiver.verify({ body: rawBody, signature, url: request.url });
    const parsed: unknown = JSON.parse(rawBody);
    const runId = parsed && typeof parsed === 'object' && !Array.isArray(parsed) && 'runId' in parsed
      ? (parsed as { runId?: unknown }).runId
      : null;
    if (typeof runId !== 'string' || !UUID_PATTERN.test(runId)) {
      return NextResponse.json({ error: 'invalid_run_id' }, { status: 400 });
    }
    return NextResponse.json({ data: await processStoreDataErasureRun(runId) });
  } catch (error) {
    if (error instanceof SignatureError) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    if (error instanceof SyntaxError) return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
    if (error instanceof MediaConfigError) return NextResponse.json({ error: 'QStash is not configured' }, { status: 503 });
    reportReviewEmailFailure('store_erasure', normalizeReviewEmailFailure('store_erasure', error));
    return NextResponse.json({ error: 'store_data_erasure_failed' }, { status: 500 });
  }
}
