'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { colors, typography, radii } from '@/lib/design-tokens';
import { ICONS } from '@/widget/icons.js';

type Option = { value: string; label: string };

interface IconSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
}

// ICONS[type].styles[firstStyle].filled — preview için ilk stilin dolu SVG'sini kullan
function getPreviewSvg(iconType: string): string {
  const icon = (ICONS as Record<string, { styles: Record<string, { filled: string }> }>)[iconType];
  if (!icon) return '';
  const firstStyleKey = Object.keys(icon.styles)[0];
  return icon.styles[firstStyleKey]?.filled ?? '';
}

// Tek bir ikon kutucuğu — selected durumuna göre çerçeveli, hover'da belirgin arka plan
function IconCell({
  iconType,
  label,
  selected,
  onClick,
}: {
  iconType: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const bg = selected ? colors.primaryBg : hover ? colors.bgHover : 'transparent';
  const border = selected ? `2px solid ${colors.primary}` : '2px solid transparent';
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={label}
      title={label}
      style={{
        width: 44,
        height: 44,
        padding: 0,
        background: bg,
        border,
        borderRadius: radii.default,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.textPrimary,
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      <span
        style={{ width: 22, height: 22, display: 'inline-flex' }}
        // Widget ikonları SVG string — DOMPurify kullanmıyoruz çünkü kaynak ICONS registry
        // (harici input değil), ve sadece Phosphor path'leri + kendi svg() helper'ı.
        dangerouslySetInnerHTML={{ __html: getPreviewSvg(iconType) }}
      />
    </button>
  );
}

export function IconSelect({ label, value, options, onChange }: IconSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>
        {label}
      </label>

      <div ref={rootRef} style={{ position: 'relative', display: 'inline-block' }}>
        {/* Trigger — seçili ikonu + chevron gösterir */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 10px',
            background: colors.bgWhite,
            border: `1px solid ${colors.borderDefault}`,
            borderRadius: radii.default,
            cursor: 'pointer',
            minWidth: 64,
          }}
        >
          <span
            style={{ width: 22, height: 22, display: 'inline-flex', color: colors.textPrimary }}
            dangerouslySetInnerHTML={{ __html: getPreviewSvg(value) }}
          />
          <ChevronDown size={14} style={{ color: colors.textSecondary }} />
        </button>

        {/* Popover grid — mutlak konumlu, sol alt */}
        {open && (
          <div
            role="listbox"
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              zIndex: 50,
              background: colors.bgWhite,
              border: `1px solid ${colors.borderDefault}`,
              borderRadius: radii.default,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              padding: 8,
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 44px)',
              gap: 4,
            }}
          >
            {options.map((opt) => (
              <IconCell
                key={opt.value}
                iconType={opt.value}
                label={opt.label}
                selected={value === opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
