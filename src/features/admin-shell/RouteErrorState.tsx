'use client';

import { RefreshCw } from 'lucide-react';

import { componentStyles } from '@/lib/design-tokens';

export function RouteErrorState({ reset }: { reset: () => void }) {
  return (
    <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
      <p className="mb-4 text-sm text-foreground">Bu alan yüklenemedi.</p>
      <button type="button" onClick={reset} style={{ ...componentStyles.btnDefault, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <RefreshCw size={14} aria-hidden="true" /> Tekrar Dene
      </button>
    </div>
  );
}
