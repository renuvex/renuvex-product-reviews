import { describe, expect, test } from 'vitest';
import { svgStringToSymbol, iconUseNode } from '../../src/widget/icons/star-sprite.js';
import {
  FILTER_ICONS,
  ICONS,
  UI_CARET_LEFT,
  UI_CARET_RIGHT,
  UI_CARET_DOWN,
  UI_CLOSE,
  PHOTO_ICON,
  PLUS_ICON,
  VIDEO_UPLOAD_ICON,
} from '../../src/widget/icons/index.js';

function allRegistrySvgs(): string[] {
  const reviewSvgs = Object.values(ICONS as Record<string, { styles: Record<string, { filled: string; empty: string }> }>)
    .flatMap((icon) => Object.values(icon.styles))
    .flatMap((style) => [style.filled, style.empty]);
  const filterSvgs = Object.values(FILTER_ICONS as Record<string, { svg: string }>).map((icon) => icon.svg);
  return [
    ...reviewSvgs,
    ...filterSvgs,
    UI_CARET_LEFT,
    UI_CARET_RIGHT,
    UI_CARET_DOWN,
    UI_CLOSE,
    PHOTO_ICON,
    PLUS_ICON,
    VIDEO_UPLOAD_ICON,
  ];
}

// Regression guard for the icon sprite conversion. ALL widget icons (stars, filter,
// photo/plus) are injected once as a <symbol> and referenced via <use>. The conversion
// must strip the ROOT <svg> presentation attrs (xmlns/aria-hidden/width/height) WITHOUT
// touching inner geometry — a global width/height strip silently erased the photo icon's
// frame, which is drawn with <rect width height>. See Bug_Icon_Sprite_Inner_Dimension_Strip.
describe('svgStringToSymbol (icon sprite conversion)', () => {
  test('keeps inner <rect width/height> (the image-icon frame) intact', () => {
    const photo =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">' +
      '<rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-width="16"/>' +
      '<circle cx="96" cy="96" r="16" fill="none" stroke="currentColor" stroke-width="16"/>' +
      '<path d="M56.69,216,166.34,106.34a8,8,0,0,1,11.32,0L216,144.69" fill="none" stroke="currentColor" stroke-width="16"/>' +
      '</svg>';
    const symbol = svgStringToSymbol(photo, 'sym-photo');

    // Wrapper converted; root presentation attrs stripped.
    expect(symbol.startsWith('<symbol id="sym-photo"')).toBe(true);
    expect(symbol.endsWith('</symbol>')).toBe(true);
    const rootTag = symbol.slice(0, symbol.indexOf('>') + 1);
    expect(rootTag).not.toMatch(/xmlns=/);
    expect(rootTag).not.toMatch(/aria-hidden=/);
    expect(rootTag).not.toMatch(/\swidth=|\sheight=/);
    expect(rootTag).toContain('viewBox="0 0 256 256"');

    // Inner geometry preserved — the frame rect keeps its dimensions and renders.
    expect(symbol).toContain('<rect x="40" y="40" width="176" height="176" rx="8"');
    expect(symbol).toContain('<circle cx="96" cy="96" r="16"');
  });

  test('strips width/height from the root <svg> tag itself', () => {
    const symbol = svgStringToSymbol('<svg width="20" height="20" viewBox="0 0 24 24"><path d="M0 0"/></svg>', 'sym-sized');
    expect(symbol.startsWith('<symbol id="sym-sized" viewBox="0 0 24 24">')).toBe(true);
  });

  test('leaves path/circle/line icons (stars, filter) byte-identical in geometry', () => {
    const star =
      '<svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M234.29,114.85"/></svg>';
    expect(svgStringToSymbol(star, 'sym-star')).toBe(
      '<symbol id="sym-star" viewBox="0 0 256 256" fill="currentColor"><path d="M234.29,114.85"/></symbol>',
    );
  });

  test('non-string input returns empty string', () => {
    expect(svgStringToSymbol(null as unknown as string, 'x')).toBe('');
  });
});

// The widget's chrome glyphs (caret/close) and content icons (photo/plus/upload video) share one Phosphor
// family in icons/ui-icons.js. Guard the family invariants + the lossless sprite conversion.
describe('shared UI icons (Phosphor family)', () => {
  test('every UI glyph is Phosphor 256-grid with documented stroke weight and currentColor', () => {
    for (const svg of [UI_CARET_LEFT, UI_CARET_RIGHT, UI_CLOSE, PHOTO_ICON, PLUS_ICON, VIDEO_UPLOAD_ICON]) {
      expect(svg).toContain('viewBox="0 0 256 256"');
      expect(svg).toContain('stroke="currentColor"');
      expect(svg).toContain('stroke-width="16"');
    }
    expect(UI_CARET_DOWN).toContain('viewBox="0 0 256 256"');
    expect(UI_CARET_DOWN).toContain('stroke="currentColor"');
    expect(UI_CARET_DOWN).toContain('stroke-width="24"');
  });

  test('caret/close conversion preserves geometry (line/polyline carry no inner dims)', () => {
    expect(svgStringToSymbol(UI_CARET_LEFT, 'c')).toContain('<polyline points="160 208 80 128 160 48"');
    expect(svgStringToSymbol(UI_CARET_RIGHT, 'c')).toContain('<polyline points="96 48 176 128 96 208"');
    expect(svgStringToSymbol(UI_CARET_DOWN, 'c')).toContain('<polyline points="208 96 128 176 48 96"');
    const x = svgStringToSymbol(UI_CLOSE, 'x');
    expect(x).toContain('<line x1="200" y1="56" x2="56" y2="200"');
    expect(x).toContain('<line x1="200" y1="200" x2="56" y2="56"');
  });

  test('iconUseNode is SSR-safe (returns null without a DOM)', () => {
    expect(iconUseNode(UI_CLOSE)).toBeNull();
  });
});

describe('widget icon registry invariants', () => {
  test('all shipped widget icon SVGs stay on the Phosphor 256-grid currentColor system', () => {
    for (const svg of allRegistrySvgs()) {
      expect(svg).toContain('viewBox="0 0 256 256"');
      expect(svg).toContain('currentColor');
      expect(svg).not.toContain('viewBox="0 0 24');
      expect(svg).not.toMatch(/\swidth="24"/);
      expect(svg).not.toMatch(/\sheight="24"/);
      expect(svg).not.toContain('✕');
      expect(svg).not.toContain('‹');
      expect(svg).not.toContain('›');
      expect(svg).not.toContain('&#8249');
      expect(svg).not.toContain('&#8250');
      expect(svg.toLowerCase()).not.toContain('lucide');
    }
  });

  test('all stroked widget icon SVGs use the documented Phosphor stroke weight', () => {
    for (const svg of allRegistrySvgs()) {
      const strokeWidths = Array.from(svg.matchAll(/stroke-width="([^"]+)"/g)).map((match) => match[1]);
      const expectedStrokeWidth = svg === UI_CARET_DOWN ? '24' : '16';
      expect(strokeWidths.every((width) => width === expectedStrokeWidth)).toBe(true);
    }
  });
});
