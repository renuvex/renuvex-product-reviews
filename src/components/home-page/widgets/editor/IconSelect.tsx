'use client';

import React, { useState } from 'react';
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
        dangerouslySetInnerHTML={{ __html: getPreviewSvg(iconType) }}
      />
    </button>
  );
}

export function IconSelect({ label, value, options, onChange }: IconSelectProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>
        {label}
      </label>

      <div
        role="listbox"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 44px)',
          gap: 4,
        }}
      >
        {options.map((opt) => (
          <IconCell
            key={opt.value}
            iconType={opt.value}
            label={opt.label}
            selected={value === opt.value}
            onClick={() => onChange(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
