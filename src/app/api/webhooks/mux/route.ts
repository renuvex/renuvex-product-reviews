import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '@/lib/prisma';
import { MEDIA_JOB_ACTIONS, VIDEO_PROVIDER } from '@/lib/media/constants';
import { MediaConfigError } from '@/lib/media/config';
import { dispatchMediaProviderJob, enqueueMediaProviderJob } from '@/lib/media/jobs';
import { MuxProviderError, unwrapMuxWebhook, type MuxWebhookEvent } from '@/lib/media/providers/mux';

type MuxWebhookData = {
  id?: string;
  asset_id?: string;
  upload_id?: string;
  passthrough?: string;
  status?: string;
  new_asset_settings?: {
    passthrough?: string;
    meta?: {
      external_id?: string;
      creator_id?: string;
    };
  };
  meta?: {
    external_id?: string;
    creator_id?: string;
  };
};

type NormalizedMuxEvent = {
  providerEventId: string;
  eventType: string;
  providerUploadId: string | null;
  providerAssetId: string | null;
  sessionId: string | null;
  providerEventCreatedAt: Date | null;
  payloadDigest: string;
  uploadStatus: string | null;
};
type WebhookSession = {
  storeId: string;
  status: string;
};

const CLEANUP_UPLOAD_SESSION_STATUSES = new Set(['aborted', 'failed']);

function stringValue(value: unknown, maxLength: number): string | null {
  return typeof value === 'string' && value ? value.slice(0, maxLength) : null;
}

function eventCreatedAt(value: unknown): Date | null {
  if (typeof value === 'number' && Number.isFinite(value)) return new Date(value * 1000);
  if (typeof value === 'string' && value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

function normalizeMuxEvent(event: MuxWebhookEvent, rawBody: string): NormalizedMuxEvent {
  const data = (event.data ?? {}) as MuxWebhookData;
  const isUploadEvent = event.type.startsWith('video.upload.');
  const providerUploadId = isUploadEvent
    ? stringValue(data.id, 256)
    : stringValue(data.upload_id, 256);
  const providerAssetId = event.type.startsWith('video.asset.')
    ? stringValue(data.id, 256)
    : stringValue(data.asset_id, 256);
  const sessionId =
    stringValue(data.passthrough, 128) ||
    stringValue(data.new_asset_settings?.passthrough, 128) ||
    stringValue(data.meta?.external_id, 128) ||
    stringValue(data.meta?.creator_id, 128) ||
    stringValue(data.new_asset_settings?.meta?.external_id, 128) ||
    stringValue(data.new_asset_settings?.meta?.creator_id, 128);
  return {
    providerEventId: event.id,
    eventType: event.type,
    providerUploadId,
    providerAssetId,
    sessionId,
    providerEventCreatedAt: eventCreatedAt(event.created_at),
    payloadDigest: createHash('sha256').update(rawBody).digest('hex'),
    uploadStatus: stringValue(data.status, 64),
  };
}

async function resolveSessionId(input: NormalizedMuxEvent): Promise<string | null> {
  if (input.sessionId) return input.sessionId;
  const session = await prisma.videoUploadSession.findFirst({
    where: {
      provider: VIDEO_PROVIDER,
      OR: [
        ...(input.providerUploadId ? [{ providerUploadId: input.providerUploadId }] : []),
        ...(input.providerAssetId ? [{ providerAssetId: input.providerAssetId }] : []),
      ],
    },
    select: { id: true },
  });
  return session?.id ?? null;
}

function webhookJobShape(input: NormalizedMuxEvent & { sessionId: string }, session: WebhookSession | null) {
  if (input.eventType === 'video.upload.asset_created' || input.eventType === 'video.upload.errored' || input.eventType === 'video.upload.cancelled') {
    if (!input.providerUploadId) return null;
    if (input.eventType === 'video.upload.asset_created' && session && CLEANUP_UPLOAD_SESSION_STATUSES.has(session.status)) {
      return {
        dedupeKey: input.providerAssetId
          ? `cleanup-video-asset:${input.providerAssetId}`
          : `cleanup-video-upload:${input.providerUploadId}`,
        action: MEDIA_JOB_ACTIONS.cleanupVideo,
        payload: {
          sessionId: input.sessionId,
          providerUploadId: input.providerUploadId,
          ...(input.providerAssetId ? { providerAssetId: input.providerAssetId } : {}),
        },
      };
    }
    return {
      dedupeKey: `resolve-video-asset:${input.sessionId}`,
      action: MEDIA_JOB_ACTIONS.resolveVideoAsset,
      payload: {
        sessionId: input.sessionId,
        providerUploadId: input.providerUploadId,
      },
    };
  }
  if (input.eventType === 'video.asset.ready' || input.eventType === 'video.asset.errored' || input.eventType === 'video.asset.created') {
    return {
      dedupeKey: `reconcile-video:${input.sessionId}`,
      action: MEDIA_JOB_ACTIONS.reconcileVideo,
      payload: {
        sessionId: input.sessionId,
        ...(input.providerUploadId ? { providerUploadId: input.providerUploadId } : {}),
        ...(input.providerAssetId ? { providerAssetId: input.providerAssetId } : {}),
        startedAt: new Date().toISOString(),
        checkIndex: 0,
      },
    };
  }
  return null;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  let event: MuxWebhookEvent;
  try {
    event = await unwrapMuxWebhook(rawBody, request.headers);
  } catch (error) {
    if (error instanceof MediaConfigError) return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 });
    if (error instanceof MuxProviderError) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const normalized = normalizeMuxEvent(event, rawBody);
  try {
    const matchedSessionId = await resolveSessionId(normalized);
    const job = await prisma.$transaction(async (tx) => {
      const existing = await tx.webhookEvent.findUnique({
        where: { provider_providerEventId: { provider: VIDEO_PROVIDER, providerEventId: normalized.providerEventId } },
      });
      if (existing?.status === 'processed' || existing?.status === 'ignored' || existing?.status === 'orphan') {
        return null;
      }

      const session = matchedSessionId
        ? await tx.videoUploadSession.findUnique({
          where: { id: matchedSessionId },
          select: { storeId: true, status: true },
        })
        : null;
      const shape = matchedSessionId ? webhookJobShape({ ...normalized, sessionId: matchedSessionId }, session) : null;
      const status = !matchedSessionId ? 'orphan' : shape ? 'processed' : 'ignored';
      await tx.webhookEvent.upsert({
        where: { provider_providerEventId: { provider: VIDEO_PROVIDER, providerEventId: normalized.providerEventId } },
        create: {
          provider: VIDEO_PROVIDER,
          providerEventId: normalized.providerEventId,
          eventType: normalized.eventType,
          providerUploadId: normalized.providerUploadId,
          providerAssetId: normalized.providerAssetId,
          sessionId: matchedSessionId,
          providerEventCreatedAt: normalized.providerEventCreatedAt,
          status,
          processedAt: status === 'processed' ? new Date() : null,
          payloadDigest: normalized.payloadDigest,
        },
        update: {
          providerUploadId: normalized.providerUploadId,
          providerAssetId: normalized.providerAssetId,
          sessionId: matchedSessionId,
          providerEventCreatedAt: normalized.providerEventCreatedAt,
          status,
          processedAt: status === 'processed' ? new Date() : null,
          lastError: null,
          payloadDigest: normalized.payloadDigest,
        },
      });
      if (!shape || !matchedSessionId) return null;
      return enqueueMediaProviderJob(tx, {
        dedupeKey: shape.dedupeKey,
        storeId: session?.storeId,
        uploadSessionId: matchedSessionId,
        provider: VIDEO_PROVIDER,
        action: shape.action,
        resourceType: 'video',
        payload: shape.payload,
        maxAttempts: 16,
      });
    });
    if (job) await dispatchMediaProviderJob(job.id);
    return NextResponse.json({ received: true });
  } catch (error) {
    Sentry.captureException(error, { tags: { source: 'media-job', task: 'mux-webhook' } });
    console.error('[mux-webhook] failed:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
