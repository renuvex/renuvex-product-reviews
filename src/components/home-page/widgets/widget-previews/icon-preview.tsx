'use client';

import React from 'react';
import { ICONS, parseIconValue } from '@/widget/icons/index.js';
import { colors } from '@/lib/design-tokens';

// Settings panelinden gelen iconValue: "star" | "favorite:modern" gibi değerler.
// ICONS registry'den doğru SVG'yi çözer.
function resolveSvg(iconValue: string, state: 'filled' | 'empty'): string {
  const { type, style } = parseIconValue(iconValue);
  const icon = (ICONS as Record<string, { styles: Record<string, { filled: string; empty: string }> }>)[type];
  if (!icon) return '';
  const key = (style && icon.styles[style]) ? style : Object.keys(icon.styles)[0];
  const pair = icon.styles[key];
  return state === 'filled' ? pair.filled : pair.empty;
}

// Tek bir ikon — filled veya empty, istenen renk ve boyutta.
export function PreviewIcon({ iconValue, filled, color, size }: {
  iconValue: string;
  filled: boolean;
  color: string;
  size: number;
}) {
  const svg = resolveSvg(iconValue, filled ? 'filled' : 'empty');
  return (
    <span
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        color: filled ? color : colors.borderDefault,
        lineHeight: 1,
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// 5 yıldızlık dolu/boş row — preview kartlarında kullanılır.
export function PreviewStars({ rating, iconValue, color, size = 14 }: {
  rating: number;
  iconValue: string;
  color: string;
  size?: number;
}) {
  const rounded = Math.round(rating);
  return (
    <div style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <PreviewIcon key={i} iconValue={iconValue} filled={i <= rounded} color={color} size={size} />
      ))}
    </div>
  );
}
