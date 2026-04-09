'use client';

import React from 'react';
import { colors, radii, shadows, typography } from '@/lib/design-tokens';
import { PreviewProps } from '../editor/WidgetEditor';

// ─── Mock products ───────────────────────────────────────────────────────────

const MOCK_PRODUCTS = [
  { id: '1', name: 'Ürün Adı Örnek', price: '₺299,90', rating: 4.2, count: 38, imageBg: 'rgb(247,245,255)' },
  { id: '2', name: 'Başka Bir Ürün', price: '₺149,00', rating: 5.0, count: 12, imageBg: 'rgb(240,253,244)' },
  { id: '3', name: 'Üçüncü Ürün',   price: '₺89,90',  rating: 3.8, count: 7,  imageBg: 'rgb(255,251,235)' },
];

// ─── Icon renderers ──────────────────────────────────────────────────────────

function RatingIcon({ type, filled, color, size }: {
  type: 'star' | 'heart' | 'circle';
  filled: boolean;
  color: string;
  size: number;
}) {
  const style = { fontSize: size, color: filled ? color : colors.borderDefault, lineHeight: 1 };
  if (type === 'heart')  return <span style={style}>♥</span>;
  if (type === 'circle') return <span style={style}>●</span>;
  return <span style={style}>★</span>;
}

// ─── Size map ────────────────────────────────────────────────────────────────

const SIZE_MAP: Record<string, { icon: number; text: number; padding: string }> = {
  small:  { icon: 11, text: 11, padding: '2px 8px' },
  medium: { icon: 13, text: 12, padding: '3px 10px' },
  large:  { icon: 16, text: 13, padding: '4px 12px' },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function BadgeWidgetPreview({ settings }: PreviewProps) {
  const isEnabled  = (settings.enabled as boolean) ?? true;
  const iconType   = (settings.icon    as 'star' | 'heart' | 'circle') ?? 'star';
  const iconColor  = (settings.color   as string) ?? '#f59e0b';
  const sizeKey    = (settings.size    as string) ?? 'medium';
  const sizes      = SIZE_MAP[sizeKey] ?? SIZE_MAP.medium;

  if (!isEnabled) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        color: colors.textMuted,
        fontSize: typography.fontSize.base,
        border: `2px dashed ${colors.borderDefault}`,
        borderRadius: radii.lg,
      }}>
        Widget devre dışı
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 600 }}>
      {MOCK_PRODUCTS.map((product) => (
        <div
          key={product.id}
          style={{
            backgroundColor: colors.bgWhite,
            border: `1px solid ${colors.borderDefault}`,
            borderRadius: radii.lg,
            boxShadow: shadows.antCard,
            overflow: 'hidden',
          }}
        >
          {/* Ürün görseli */}
          <div style={{
            backgroundColor: product.imageBg,
            aspectRatio: '1 / 1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 28, opacity: 0.3 }}>🖼</span>
          </div>

          {/* Ürün bilgisi */}
          <div style={{ padding: '10px 12px' }}>
            <div style={{
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: colors.textPrimary,
              marginBottom: 4,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {product.name}
            </div>
            <div style={{ fontSize: typography.fontSize.sm, color: colors.textMuted, marginBottom: 8 }}>
              {product.price}
            </div>

            {/* Rozet */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              backgroundColor: colors.primaryBg,
              border: `1px solid ${colors.primaryBorder}`,
              borderRadius: radii.full,
              padding: sizes.padding,
            }}>
              <div style={{ display: 'flex', gap: 1 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <RatingIcon
                    key={i}
                    type={iconType}
                    filled={i <= Math.round(product.rating)}
                    color={iconColor}
                    size={sizes.icon}
                  />
                ))}
              </div>
              <span style={{
                fontSize: sizes.text,
                fontWeight: typography.fontWeight.medium,
                color: iconColor,
              }}>
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
