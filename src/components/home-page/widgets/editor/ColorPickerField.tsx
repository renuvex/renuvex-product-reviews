'use client';

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HexAlphaColorPicker, HexColorInput } from 'react-colorful';
import { colors, componentStyles, radii, sp, typography } from '@/lib/design-tokens';

const CHECKER_BG =
  'repeating-conic-gradient(#d1d5db 0% 25%, #ffffff 0% 50%) 50% / 10px 10px';

interface ColorPickerFieldProps {
  label: string;
  value: string;
  onCommit: (value: string) => void;
  labelAddon?: ReactNode;
  showValue?: boolean;
  rowStyle?: CSSProperties;
  labelStyle?: CSSProperties;
}

export function ColorPickerField({
  label,
  value,
  onCommit,
  labelAddon,
  showValue = false,
  rowStyle,
  labelStyle,
}: ColorPickerFieldProps) {
  const [local, setLocal] = useState(value);
  const [open, setOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const commitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setLocal(value); }, [value]);
  useEffect(() => () => { if (commitTimerRef.current) clearTimeout(commitTimerRef.current); }, []);

  useEffect(() => {
    if (!open) { setPopoverPos(null); return; }
    const r = triggerRef.current?.getBoundingClientRect();
    if (!r) return;
    const popoverWidth = 220;
    const popoverHeight = 230;
    let left = r.right - popoverWidth;
    if (left < 8) left = 8;
    let top = r.bottom + 6;
    if (top + popoverHeight > window.innerHeight - 8) {
      top = Math.max(8, r.top - popoverHeight - 6);
    }
    setPopoverPos({ top, left });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popoverRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const handleChange = (next: string) => {
    setLocal(next);
    if (commitTimerRef.current) clearTimeout(commitTimerRef.current);
    commitTimerRef.current = setTimeout(() => onCommit(next), 120);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: sp[3], ...rowStyle }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: sp[1], fontSize: typography.fontSize.base, color: colors.textSecondary, ...labelStyle }}>
        {label}
        {labelAddon}
      </label>
      <div style={{
        position: 'relative',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        border: showValue ? `1px solid ${colors.borderDefault}` : 'none',
        borderRadius: radii.default,
        backgroundColor: showValue ? colors.bgPage : 'transparent',
        overflow: showValue ? 'hidden' : 'visible',
      }}>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={`${label} seç`}
          style={{
            width: 24,
            height: 24,
            border: showValue ? 'none' : `1px solid ${colors.borderDefault}`,
            borderRight: showValue ? `1px solid ${colors.borderDefault}` : undefined,
            borderRadius: showValue ? 0 : radii.default,
            background: CHECKER_BG,
            padding: 0,
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <span
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: showValue ? 0 : radii.default,
              backgroundColor: local,
            }}
          />
        </button>

        {showValue && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            style={{
              height: 30,
              minWidth: 84,
              padding: '0 10px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: colors.textPrimary,
              textTransform: 'uppercase',
              textAlign: 'left',
            }}
          >
            {local}
          </button>
        )}

        {open && popoverPos && typeof window !== 'undefined' && createPortal(
          <div
            ref={popoverRef}
            style={{
              position: 'fixed',
              top: popoverPos.top,
              left: popoverPos.left,
              zIndex: 10000,
              padding: sp[3],
              background: colors.bgWhite,
              border: `1px solid ${colors.borderDefault}`,
              borderRadius: radii.default,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: sp[3],
              width: 220,
            }}
          >
            <HexAlphaColorPicker
              color={local}
              onChange={handleChange}
              style={{ width: '100%', height: 160 }}
            />
            <HexColorInput
              color={local}
              onChange={handleChange}
              prefixed
              alpha
              aria-label={`${label} hex kodu`}
              style={{
                ...componentStyles.input,
                width: '100%',
                fontSize: typography.fontSize.base,
                textTransform: 'uppercase',
              }}
            />
          </div>,
          document.body,
        )}
      </div>
    </div>
  );
}
