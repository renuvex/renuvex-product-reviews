import { NextResponse } from 'next/server';
import { SesSnsMessageError, verifySesSnsMessage } from '@/lib/email/ses-sns';
import { prisma } from '@/lib/prisma';
import { persistSesEmailEvent } from '@/lib/review-email/ses-events';

export const runtime = 'nodejs';

function statusForMessageType(type: string): string {
  switch (type) {
    case 'Notification':
      return 'accepted';
    case 'SubscriptionConfirmation':
      return 'subscription_confirmation_received';
    case 'UnsubscribeConfirmation':
      return 'unsubscribe_confirmation_received';
    default:
      return 'accepted';
  }
}

export async function POST(request: Request) {
  const expectedTopicArn = process.env.AWS_SES_EVENTS_SNS_TOPIC_ARN;
  if (!expectedTopicArn) {
    return NextResponse.json({ error: 'ses_events_not_configured' }, { status: 503 });
  }

  const rawBody = await request.text();

  try {
    const message = await verifySesSnsMessage(rawBody, { expectedTopicArn });
    const persisted = message.type === 'Notification'
      ? await persistSesEmailEvent(prisma, message, rawBody)
      : null;

    return NextResponse.json(
      {
        data: {
          status: statusForMessageType(message.type),
          messageType: message.type,
          messageId: message.messageId,
          sesEventType: message.sesEventType,
          sesMessageId: message.sesMessageId,
          persisted,
        },
      },
      { status: 202 },
    );
  } catch (error) {
    if (error instanceof SesSnsMessageError) {
      return NextResponse.json({ error: error.code }, { status: error.status });
    }
    return NextResponse.json({ error: 'ses_event_verification_failed' }, { status: 401 });
  }
}
