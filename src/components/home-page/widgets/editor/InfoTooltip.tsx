'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';
import { colors, radii, typography } from '@/lib/design-tokens';

interface InfoTooltipProps {
  label: string;
  message: string;
}

export function InfoTooltip({ label, message }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) { setPos(null); return; }
    const r = triggerRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos({
      top: r.bottom + window.scrollY + 8,
      left: r.left + window.scrollX + r.width / 2,
    });
  }, [open]);

  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${label} hakkında bilgi`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 18,
          height: 18,
          padding: 0,
          border: `1.5px solid ${colors.primaryBorder}`,
          borderRadius: radii.full,
          backgroundColor: colors.primaryBg,
          color: colors.primary,
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <Info size={16} />
      </button>
      {open && pos && typeof window !== 'undefined' && createPortal(
        <span
          role="tooltip"
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            transform: 'translateX(-50%)',
            zIndex: 99999,
            width: 260,
            padding: '8px 10px',
            borderRadius: radii.default,
            border: 'none',
            backgroundColor: colors.primary,
            color: colors.textWhite,
            fontSize: typography.fontSize.xs,
            lineHeight: typography.lineHeight.normal,
            fontWeight: typography.fontWeight.medium,
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
            whiteSpace: 'normal',
          }}
        >
          {message}
        </span>,
        document.body
      )}
    </span>
  );
}
