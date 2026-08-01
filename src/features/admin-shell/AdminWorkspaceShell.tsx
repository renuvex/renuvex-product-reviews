'use client';

import { CheckCircle2, MessageSquare, RefreshCw, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { colors, componentStyles, typography } from '@/lib/design-tokens';

import { useAdminShell } from './AdminShellContext';

function AdminNavigation() {
  const pathname = usePathname();
  const items = [
    { href: '/dashboard/reviews', label: 'Yorumlar', icon: MessageSquare },
    { href: '/dashboard/widgets', label: 'Widgetlar', icon: Settings },
  ] as const;

  return (
    <nav className="h-fit w-44 shrink-0 rounded-xl border border-border/50 bg-muted/30 p-1.5" aria-label="Yönetim alanları">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            prefetch={false}
            className={`mb-1 flex min-h-9 items-center rounded-lg px-3 py-2 last:mb-0 ${active ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:bg-background/70 hover:text-foreground'}`}
            aria-current={active ? 'page' : undefined}
            style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}
          >
            <Icon size={15} className="mr-1.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminWorkspaceShell({ children }: { children: ReactNode }) {
  const { storeName, storeLoadFailed, retryStore } = useAdminShell();

  return (
    <div className="min-h-screen w-full bg-background p-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.textPrimary }}>
            Değerlendirmeler
          </h1>
          <p className="mt-1" style={{ fontSize: typography.fontSize.base, color: colors.textMuted }}>
            <span style={{ fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>{storeName}</span> mağazanızın müşteri yorumlarını yönetin.
          </p>
          {storeLoadFailed ? (
            <button type="button" onClick={retryStore} className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <RefreshCw size={13} aria-hidden="true" /> Mağaza bilgisini tekrar dene
            </button>
          ) : null}
        </div>
        <span style={{ ...componentStyles.badgeApproved, fontSize: typography.fontSize.sm, padding: '4px 12px' }}>
          <CheckCircle2 size={14} style={{ marginRight: 4, display: 'inline' }} /> İkas&apos;a Bağlı
        </span>
      </div>
      <div className="flex gap-4">
        <AdminNavigation />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
