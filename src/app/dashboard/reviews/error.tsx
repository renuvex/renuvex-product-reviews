'use client';

import { RouteErrorState } from '@/features/admin-shell/RouteErrorState';

export default function ReviewsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <RouteErrorState reset={reset} />;
}
