import { NextResponse } from 'next/server';
import { Receiver, SignatureError } from '@upstash/qstash';
import { prisma } from '@/lib/prisma';
import { getQStashMediaConfig, MediaConfigError } from '@/lib/media/config';
import { MediaRequestError, parseJsonObject } from '@/lib/media/request';
import {
  claimScheduledJobRun,
  completeScheduledJobRun,
  failScheduledJobRun,
  parseScheduledJobTask,
  runScheduledJobTask,
  scheduledJobSlot,
} from '@/lib/scheduled-jobs';

export async function POST(request: Request) {
  const rawBody = await request.text();

  try {
    const config = getQStashMediaConfig();
    const receiver = new Receiver({ currentSigningKey: config.currentSigningKey, nextSigningKey: config.nextSigningKey });
    const signature = request.headers.get('Upstash-Signature') ?? '';
    if (!signature) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    await receiver.verify({ body: rawBody, signature, url: request.url });

    const body = parseJsonObject(rawBody);
    const task = parseScheduledJobTask(body.task);
    if (!task) return NextResponse.json({ error: 'invalid_task' }, { status: 400 });

    const scheduleSlot = scheduledJobSlot(task);
    const claim = await claimScheduledJobRun(prisma, task, scheduleSlot);
    if (claim.state === 'already_processed') {
      return NextResponse.json({ data: { task, scheduleSlot, status: 'already_processed' } });
    }
    if (claim.state === 'in_progress') {
      return NextResponse.json(
        { error: 'scheduled_job_in_progress', data: { task, scheduleSlot } },
        { status: 409, headers: { 'Retry-After': '60' } },
      );
    }

    try {
      const result = await runScheduledJobTask(task);
      if (result.status >= 500) {
        await failScheduledJobRun(prisma, task, scheduleSlot, result.body.error ?? `scheduled job failed with ${result.status}`);
        return NextResponse.json(result.body, { status: result.status });
      }

      await completeScheduledJobRun(prisma, task, scheduleSlot);
      return NextResponse.json({ data: { task, scheduleSlot, status: 'processed', result: result.body } }, { status: result.status });
    } catch (error) {
      await failScheduledJobRun(prisma, task, scheduleSlot, error);
      throw error;
    }
  } catch (error) {
    if (error instanceof SignatureError) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    if (error instanceof MediaRequestError) return NextResponse.json({ error: error.code }, { status: 400 });
    if (error instanceof MediaConfigError) return NextResponse.json({ error: 'QStash is not configured' }, { status: 503 });
    console.error('[scheduled-jobs] failed:', error);
    return NextResponse.json({ error: 'Scheduled job failed' }, { status: 500 });
  }
}
