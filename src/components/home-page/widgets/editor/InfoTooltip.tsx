'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { colors, radii, typography } from '@/lib/design-tokens';

interface InfoTooltipProps {
  label: string;
  message: string;
}

export function InfoTooltip({ label, message }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
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
      {open && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            width: 260,
            padding: '8px 10px',
            borderRadius: radii.default,
            border: '1px solid #111111',
            backgroundColor: '#111111',
            color: 'rgba(255, 255, 255, 0.92)',
            fontSize: typography.fontSize.xs,
            lineHeight: typography.lineHeight.normal,
            fontWeight: typography.fontWeight.regular,
            boxShadow: 'none',
            pointerEvents: 'none',
            whiteSpace: 'normal',
          }}
        >
          {message}
        </span>
      )}
    </span>
  );
}
