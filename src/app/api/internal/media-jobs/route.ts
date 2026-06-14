import { NextResponse } from 'next/server';
import { Receiver, SignatureError } from '@upstash/qstash';
import { getQStashMediaConfig, MediaConfigError } from '@/lib/media/config';
import { processMediaProviderJob } from '@/lib/media/jobs';
import { MediaRequestError, parseJsonObject } from '@/lib/media/request';

export async function POST(request: Request) {
  const rawBody = await request.text();
  try {
    const config = getQStashMediaConfig();
    const receiver = new Receiver({ currentSigningKey: config.currentSigningKey, nextSigningKey: config.nextSigningKey });
    const signature = request.headers.get('Upstash-Signature') ?? '';
    if (!signature) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    await receiver.verify({ body: rawBody, signature, url: request.url });
    const body = parseJsonObject(rawBody);
    if (typeof body.jobId !== 'string') return NextResponse.json({ error: 'Invalid job' }, { status: 400 });
    const result = await processMediaProviderJob(body.jobId);
    return NextResponse.json({ data: result });
  } catch (error) {
    if (error instanceof SignatureError) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    if (error instanceof MediaRequestError) return NextResponse.json({ error: error.code }, { status: 400 });
    if (error instanceof MediaConfigError) return NextResponse.json({ error: 'QStash is not configured' }, { status: 503 });
    console.error('[media-jobs] failed:', error);
    return NextResponse.json({ error: 'Media job failed' }, { status: 500 });
  }
}
