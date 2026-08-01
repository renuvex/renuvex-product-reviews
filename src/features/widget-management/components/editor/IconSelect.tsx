'use client';

import React, { useState } from 'react';
import { colors, typography, radii } from '@/lib/design-tokens';
import type { IconRegistry } from '@/lib/widgets/catalog';
import { ICONS, getFilterIconSvg, parseIconValue } from '@/widget/icons/index.js';

type Option = { value: string; label: string };

interface IconSelectProps {
  label: string;
  value: string;
  options: Option[];
  registry?: IconRegistry;
  onChange: (v: string) => void;
}

// Review and filter icons intentionally use separate registries. Filter values
// must never fall back to review icons, because both domains can contain keys
// like "star" for different historical reasons.
function getPreviewSvg(value: string, registry: IconRegistry): string {
  if (registry === 'filter') {
    return getFilterIconSvg(value);
  }

  const { type, style } = parseIconValue(value);
  const icon = (ICONS as Record<string, { styles: Record<string, { filled: string }> }>)[type];
  if (!icon) return '';
  const key = (style && icon.styles[style]) ? style : Object.keys(icon.styles)[0];
  return icon.styles[key]?.filled ?? '';
}

function IconCell({
  iconValue,
  label,
  selected,
  registry,
  onClick,
}: {
  iconValue: string;
  label: string;
  selected: boolean;
  registry: IconRegistry;
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
        dangerouslySetInnerHTML={{ __html: getPreviewSvg(iconValue, registry) }}
      />
    </button>
  );
}

export function IconSelect({ label, value, options, registry = 'review', onChange }: IconSelectProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.regular, color: colors.textPrimary }}>
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
            iconValue={opt.value}
            label={opt.label}
            selected={value === opt.value}
            registry={registry}
            onClick={() => onChange(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
