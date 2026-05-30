import { describe, expect, test } from 'vitest';
import { svgStringToSymbol } from '../../src/widget/icons/star-sprite.js';

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
