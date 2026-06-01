import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

// Decorative :hover affordances inside the always-mounted review shadow surface must be gated
// by the canonical "genuinely hover-capable AND precise pointer" query:
//
//     @media (hover: hover) and (pointer: fine)
//
// Why `(pointer: fine)` is required, not just `(hover: hover)`:
//   On compact mobile the full-width "Yorum Yap" button sits under the filter menu. Tapping a
//   sort option that overlaps it closes the menu on pointerdown, leaving the pointer resting
//   over the button — the browser then latches a STICKY :hover on it (opacity .92) with no
//   cursor to move away. `(hover:hover)` alone still matches on hybrid / emulated-touch
//   contexts that report a hover-capable primary pointer, so the dim leaked through there.
//   Adding `(pointer:fine)` scopes the affordance to real mouse/trackpad pointers (all
//   touch-operated contexts report `pointer:coarse`), which is the W3C/MDN-canonical idiom and
//   touches no layout/design. A faithful `hover:none` phone was never affected.
//
// This invariant fails the moment a decorative hover in these modules regresses to a bare
// `@media(hover:hover)` or a fully ungated `:hover`.

const STYLE_DIR = path.join(process.cwd(), 'src', 'widget', 'reviews-section', 'styles');
const GATED = '@media(hover:hover) and (pointer:fine)';

// Decorative-hover CSS modules shipped inside the review shadow surface.
const FILES = ['summary-controls.js', 'photo-strip.js', 'lightbox.js'];

describe('review-surface decorative hover gating', () => {
  for (const file of FILES) {
    const css = readFileSync(path.join(STYLE_DIR, file), 'utf8');

    test(`${file}: every @media(hover:hover) also requires (pointer:fine)`, () => {
      // Matches a hover media query NOT immediately followed by " and (pointer:fine)".
      const bare = css.match(/@media\(hover:hover\)(?!\s+and\s+\(pointer:fine\))/g);
      expect(bare, `bare @media(hover:hover) (missing "and (pointer:fine)") in ${file}: ${JSON.stringify(bare)}`).toBeNull();
    });

    test(`${file}: every decorative .renuvex-pr-*:hover rule sits inside the gated block`, () => {
      const offenders = css
        .split('\n')
        .filter((line) => /\.renuvex-pr-[\w-]+:hover\b/.test(line) && !line.includes(GATED));
      expect(offenders, `ungated decorative :hover in ${file}:\n${offenders.join('\n')}`).toEqual([]);
    });
  }
});
