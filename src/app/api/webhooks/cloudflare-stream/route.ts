import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { z } from 'zod';
import { getStreamMediaConfig, MediaConfigError } from '@/lib/media/config';
import { getStreamVideo, type StreamVideo } from '@/lib/media/providers/cloudflare-stream';
import { MediaRequestError, parseJsonObject } from '@/lib/media/request';
import { verifyStreamWebhookSignature } from '@/lib/media/stream-webhook';
import { applyStreamVideoState, findSessionForStreamVideo } from '@/lib/media/video-processing';

const streamVideoSchema = z.object({
  uid: z.string().min(1),
  creator: z.string().optional(),
  duration: z.number().optional(),
  size: z.number().optional(),
  readyToStream: z.boolean().optional(),
  requireSignedURLs: z.boolean().optional(),
  thumbnail: z.string().url().optional(),
  playback: z.object({
    hls: z.string().url().optional(),
    dash: z.string().url().optional(),
  }).optional(),
  status: z.object({
    state: z.string().optional(),
    pctComplete: z.union([z.number(), z.string()]).optional(),
    errorReasonCode: z.string().optional(),
    errorReasonText: z.string().optional(),
  }).optional(),
  meta: z.record(z.unknown()).optional(),
}).passthrough();

export async function POST(request: Request) {
  const rawBody = await request.text();
  try {
    const config = getStreamMediaConfig();
    if (!verifyStreamWebhookSignature({
      rawBody,
      signature: request.headers.get('Webhook-Signature'),
      secret: config.webhookSecret,
    })) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    const parsed = streamVideoSchema.safeParse(parseJsonObject(rawBody));
    if (!parsed.success) return NextResponse.json({ error: 'invalid_webhook_payload' }, { status: 400 });
    const video: StreamVideo = parsed.data;
    const session = await findSessionForStreamVideo(video);
    if (!session) return NextResponse.json({ received: true, matched: false }, { status: 202 });
    const canonicalVideo = await getStreamVideo(video.uid);
    const result = await applyStreamVideoState(session, canonicalVideo);
    return NextResponse.json({ received: true, matched: true, status: result.ok ? result.status : result.code });
  } catch (error) {
    if (error instanceof MediaRequestError) return NextResponse.json({ error: error.code }, { status: 400 });
    if (error instanceof MediaConfigError) return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 });
    Sentry.captureException(error, { tags: { source: 'media-job', task: 'stream-webhook' } });
    console.error('[cloudflare-stream-webhook] failed:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
