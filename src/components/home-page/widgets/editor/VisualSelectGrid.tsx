'use client';

import type { ReactNode } from 'react';
import { colors, radii, sp, typography } from '@/lib/design-tokens';
import type { SelectOption, SelectPreviewKey } from '../widgetDefs';

interface VisualSelectGridProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export function hasVisualSelectPreview(options: SelectOption[]) {
  return options.some((option) => Boolean(option.preview));
}

export function VisualSelectGrid({ options, value, onChange }: VisualSelectGridProps) {
  return (
    <div
      role="radiogroup"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: sp[2],
      }}
    >
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={option.label}
            onClick={() => onChange(option.value)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: sp[1],
              minHeight: 112,
              padding: `${sp[2]}px ${sp[2]}px ${sp[2]}px`,
              background: selected ? colors.primaryBg : colors.bgWhite,
              border: `1px solid ${selected ? colors.primary : colors.borderDefault}`,
              borderRadius: radii.md,
              color: colors.textPrimary,
              cursor: 'pointer',
              outline: 'none',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: sp[2],
                left: sp[2],
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: `2px solid ${selected ? colors.primary : colors.textPrimary}`,
                background: colors.bgWhite,
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selected && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: colors.primary,
                  }}
                />
              )}
            </span>
            <PreviewFrame preview={option.preview} />
            <span
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                lineHeight: typography.lineHeight.tight,
                color: colors.textPrimary,
              }}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PreviewFrame({ preview }: { preview?: SelectPreviewKey }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 72,
        height: 52,
        marginTop: sp[4],
        borderRadius: radii.default,
        background: previewColors.canvas,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {preview ? renderPreview(preview) : null}
    </div>
  );
}

function renderPreview(preview: SelectPreviewKey) {
  if (preview === 'summary-classic') return <SummaryClassicPreview />;
  if (preview === 'summary-split') return <SummarySplitPreview />;
  if (preview === 'summary-compact') return <SummaryCompactPreview />;
  if (preview === 'summary-minimal') return <SummaryMinimalPreview />;
  if (preview === 'summary-hero') return <SummaryHeroPreview />;
  if (preview === 'review-card') return <ReviewCardPreview />;
  if (preview === 'review-list') return <ReviewListPreview />;
  return <ReviewGalleryPreview />;
}

function SvgShell({ children }: { children: ReactNode }) {
  return (
    <svg width="68" height="49" viewBox="0 0 86 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

function SummaryClassicPreview() {
  return (
    <SvgShell>
      <Panel x={18} y={7} width={50} height={48} />
      <Star x={27} y={13} size={10} />
      <Block x={41} y={15} width={18} height={7} color={previewColors.ink} />
      <Block x={28} y={28} width={30} height={4} />
      <MiniBars x={28} y={36} />
    </SvgShell>
  );
}

function SummarySplitPreview() {
  return (
    <SvgShell>
      <Panel x={8} y={14} width={70} height={34} />
      <Star x={14} y={22} size={10} />
      <Block x={27} y={24} width={13} height={7} color={previewColors.ink} />
      <Block x={14} y={36} width={24} height={4} />
      <MiniBars x={45} y={21} width={18} />
      <Block x={68} y={21} width={5} height={20} color={previewColors.ink} />
    </SvgShell>
  );
}

function SummaryCompactPreview() {
  return (
    <SvgShell>
      <Panel x={17} y={12} width={52} height={38} />
      <Star x={27} y={19} size={11} color={previewColors.accent} />
      <Block x={41} y={21} width={17} height={6} color={previewColors.accent} />
      <Block x={34} y={35} width={18} height={9} color={previewColors.muted} />
    </SvgShell>
  );
}

function SummaryMinimalPreview() {
  return (
    <SvgShell>
      <Panel x={17} y={15} width={52} height={32} />
      <StarRow x={25} y={25} count={5} size={4.5} gap={1.5} color={previewColors.muted} />
      <Block x={55} y={26} width={8} height={4} />
    </SvgShell>
  );
}

function SummaryHeroPreview() {
  return (
    <SvgShell>
      <Panel x={17} y={13} width={52} height={36} />
      <Star x={25} y={24} size={11} color={previewColors.muted} />
      <Block x={39} y={26} width={14} height={6} color={previewColors.muted} />
      <Block x={56} y={25} width={9} height={8} />
    </SvgShell>
  );
}

function ReviewCardPreview() {
  return (
    <SvgShell>
      <Panel x={17} y={11} width={52} height={40} />
      <StarRow x={25} y={18} count={5} size={4.5} gap={1.5} />
      <Block x={25} y={29} width={30} height={5} color={previewColors.ink} />
      <Block x={25} y={39} width={37} height={5} />
    </SvgShell>
  );
}

function ReviewListPreview() {
  return (
    <SvgShell>
      <Panel x={17} y={14} width={52} height={34} />
      <Block x={25} y={21} width={34} height={7} color={previewColors.accent} />
      <Block x={25} y={32} width={34} height={7} color={previewColors.accent} />
      <Block x={25} y={43} width={24} height={5} color={previewColors.accent} />
    </SvgShell>
  );
}

function ReviewGalleryPreview() {
  return (
    <SvgShell>
      <Panel x={17} y={9} width={52} height={44} />
      <Block x={25} y={18} width={13} height={13} color={previewColors.muted} square />
      <Block x={42} y={18} width={18} height={13} square />
      <Block x={25} y={35} width={19} height={12} square />
      <Block x={48} y={35} width={12} height={12} color={previewColors.muted} square />
    </SvgShell>
  );
}

function Panel({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return <rect x={x} y={y} width={width} height={height} rx="4" fill={previewColors.surface} />;
}

function Block({
  x,
  y,
  width,
  height,
  color = previewColors.soft,
  square = false,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  square?: boolean;
}) {
  return <rect x={x} y={y} width={width} height={height} rx={square ? 1 : 2} fill={color} />;
}

function MiniBars({ x, y, width = 30 }: { x: number; y: number; width?: number }) {
  return (
    <>
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <rect x={x} y={y + row * 6} width={width} height="3" rx="1.5" fill={previewColors.soft} />
          <rect x={x} y={y + row * 6} width={width - row * 7} height="3" rx="1.5" fill={previewColors.ink} />
        </g>
      ))}
    </>
  );
}

function StarRow({ x, y, count, size, gap, color = previewColors.star }: { x: number; y: number; count: number; size: number; gap: number; color?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Star key={index} x={x + index * (size + gap)} y={y} size={size} color={color} />
      ))}
    </>
  );
}

function Star({ x, y, size, color = previewColors.star }: { x: number; y: number; size: number; color?: string }) {
  const cx = x + size / 2;
  const cy = y + size / 2;
  const rOuter = size / 2;
  const rInner = rOuter * 0.45;
  const points = Array.from({ length: 10 }).map((_, index) => {
    const angle = -Math.PI / 2 + index * (Math.PI / 5);
    const radius = index % 2 === 0 ? rOuter : rInner;
    return `${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`;
  });

  return <polygon points={points.join(' ')} fill={color} />;
}

const previewColors = {
  canvas: colors.bgPage,
  surface: colors.bgWhite,
  ink: colors.textPrimary,
  muted: colors.textMuted,
  soft: colors.borderDefault,
  accent: colors.primary,
  star: colors.warning,
};
