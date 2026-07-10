import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import { isReviewRequestPublicHost } from '@/lib/review-email/public-access';

export const metadata = {
  title: 'Yorumunuz | Renuvex',
  robots: { index: false, follow: false },
  referrer: 'no-referrer' as const,
};

export default async function ReviewRequestLayout({ children }: { children: ReactNode }) {
  const requestHeaders = await headers();
  const host = requestHeaders.get('host') ?? '';
  const request = new Request(`https://${host || 'invalid.local'}/request`, { headers: requestHeaders });

  try {
    if (!isReviewEmailEnabled() || !isReviewRequestPublicHost(request)) notFound();
  } catch {
    notFound();
  }

  return children;
}
