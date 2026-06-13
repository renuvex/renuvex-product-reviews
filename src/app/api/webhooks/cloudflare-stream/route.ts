import { NextResponse } from 'next/server';
import { getStreamMediaConfig, MediaConfigError } from '@/lib/media/config';
import type { StreamVideo } from '@/lib/media/providers/cloudflare-stream';
import { verifyStreamWebhookSignature } from '@/lib/media/stream-webhook';
import { applyStreamVideoState, findSessionForStreamVideo } from '@/lib/media/video-processing';

export async function POST(request: Request) {
  const rawBody = await request.text();
  try {
    const config = getStreamMediaConfig();
    if (!verifyStreamWebhookSignature({
      rawBody,
      signature: request.headers.get('Webhook-Signature'),
      secret: config.webhookSecret,
    })) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const video = JSON.parse(rawBody) as StreamVideo;
    const session = await findSessionForStreamVideo(video);
    if (!session) return NextResponse.json({ received: true, matched: false }, { status: 202 });
    const result = await applyStreamVideoState(session, video);
    return NextResponse.json({ received: true, matched: true, status: result.ok ? result.status : result.code });
  } catch (error) {
    if (error instanceof MediaConfigError) return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 });
    console.error('[cloudflare-stream-webhook] failed:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
