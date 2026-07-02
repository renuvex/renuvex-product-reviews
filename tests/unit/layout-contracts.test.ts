import { describe, expect, test } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

// Static-source invariants for the swappable summary/review layout system.
// Mirrors widget-surface-contracts.test.ts: we READ the widget sources (vitest
// runs in the node env, and the layout modules touch the DOM, so they are not
// imported) and assert structural + safety contracts that have regressed before.

const WIDGET = path.join(process.cwd(), 'src', 'widget');
const SUMMARY_DIR = path.join(WIDGET, 'summary-layouts');
const REVIEW_DIR = path.join(WIDGET, 'review-layouts');

const read = (abs: string): string => readFileSync(abs, 'utf8');

// Layout folders = direct subdirectories (excluding shared) that have an index.js.
function layoutFolders(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== 'shared')
    .map((d) => d.name)
    .filter((name) => existsSync(path.join(dir, name, 'index.js')))
    .sort();
}

function registryKeys(indexSrc: string): string[] {
  const block = indexSrc.match(/export var LAYOUTS\s*=\s*\{([\s\S]*?)\}/);
  if (!block) return [];
  return Array.from(block[1].matchAll(/(\w+)\s*:/g)).map((m) => m[1]).sort();
}

const SUMMARY_SUPPORTS = new Set(['title', 'recommendation', 'barChart']);
const REVIEW_SUPPORTS = new Set(['thumbnailSize']);

const LAYOUT_INDEX_FILES = [
  ...layoutFolders(SUMMARY_DIR).map((n) => path.join(SUMMARY_DIR, n, 'index.js')),
  ...layoutFolders(REVIEW_DIR).map((n) => path.join(REVIEW_DIR, n, 'index.js')),
];

describe('layout registry contract', () => {
  test('registry keys match the layout folders (summary + review)', () => {
    expect(registryKeys(read(path.join(SUMMARY_DIR, 'index.js')))).toEqual(layoutFolders(SUMMARY_DIR));
    expect(registryKeys(read(path.join(REVIEW_DIR, 'index.js')))).toEqual(layoutFolders(REVIEW_DIR));
  });

  test('every layout exports meta (with id), a render function, and css', () => {
    for (const file of LAYOUT_INDEX_FILES) {
      const src = read(file);
      expect(src, `${file} must export meta`).toMatch(/export\s+var\s+meta\s*=/);
      expect(src, `${file} meta must have an id`).toMatch(/id:\s*['"]/);
      expect(src, `${file} must export a render function`).toMatch(/export\s+function\s+render\s*\(/);
      expect(src, `${file} must export css`).toMatch(/export\s+var\s+css\s*=/);
    }
  });

  test('meta.supports only declares known capability keys (admin showWhen contract)', () => {
    for (const dir of [SUMMARY_DIR, REVIEW_DIR]) {
      const allow = dir === SUMMARY_DIR ? SUMMARY_SUPPORTS : REVIEW_SUPPORTS;
      for (const name of layoutFolders(dir)) {
        const supports = read(path.join(dir, name, 'index.js')).match(/supports:\s*\{([^}]*)\}/);
        if (!supports) continue;
        for (const m of supports[1].matchAll(/(\w+)\s*:/g)) {
          expect(allow.has(m[1]), `${name}: unknown meta.supports key "${m[1]}" — admin showWhen would silently break`).toBe(true);
        }
      }
    }
  });
});

describe('layout rendering safety + CSS invariants', () => {
  test('no layout injects user/merchant free-text via innerHTML (XSS guard)', () => {
    // Guards the Bug_Compact_Count_Label_HTML_Injection class: untrusted text must
    // go through textContent. innerHTML stays for controlled markup only (sprite
    // SVG + numbers). See pagination.js which documents the "never innerHTML" rule.
    const FORBIDDEN = /\.innerHTML\s*=\s*[^;]*\b(r\.author|r\.title|r\.comment|r\.merchantReply|countLabel|recommendationLabel)\b/;
    const files = [
      ...LAYOUT_INDEX_FILES,
      path.join(SUMMARY_DIR, 'shared', 'bar-chart.js'),
      path.join(SUMMARY_DIR, 'shared', 'recommendation.js'),
    ];
    for (const file of files) {
      expect(FORBIDDEN.test(read(file)), `${file} interpolates untrusted text into innerHTML`).toBe(false);
    }
  });

  test('recommendation text has long-word wrapping protection', () => {
    const css = read(path.join(SUMMARY_DIR, 'shared', 'summary-base.js'));
    expect(css).toMatch(/\.renuvex-pr-summary-recommend\{[^}]*max-width:\s*100%/);
    expect(css).toMatch(/\.renuvex-pr-summary-recommend\{[^}]*overflow-wrap:\s*anywhere/);
    expect(css).toMatch(/\.renuvex-pr-summary-recommend\{[^}]*word-break:\s*break-word/);
  });

  test('bar chart keeps zero-review bars non-interactive', () => {
    const src = read(path.join(SUMMARY_DIR, 'shared', 'bar-chart.js'));
    expect(src, 'must gate interactivity on the review count').toMatch(/var clickable\s*=\s*cnt\s*>\s*0/);
    expect(src, 'must mark empty bars with renuvex-pr-bar-empty').toMatch(/renuvex-pr-bar-empty/);
    expect(src, 'must only wire the click handler when clickable').toMatch(/if\s*\(clickable\)/);
  });

  test('a layout that caps the widget root must restore full-bleed on mobile', () => {
    // base.js makes the review surface full-bleed so a theme container cannot trap
    // it in arbitrary side padding. A layout that caps the root (max-width:1200 for
    // desktop columns) must re-assert full-bleed in its <=600px block, or it doubles
    // the side padding on mobile (the gallery regression fixed in 5127f525).
    for (const dir of [SUMMARY_DIR, REVIEW_DIR]) {
      for (const name of layoutFolders(dir)) {
        const stylesPath = path.join(dir, name, 'styles.js');
        if (!existsSync(stylesPath)) continue;
        const css = read(stylesPath);
        const capsRoot = /:has\([^)]*\)\s*\{[^}]*max-width:\s*1200px/.test(css);
        if (!capsRoot) continue;
        expect(css, `${name}/styles.js caps the root width but never restores full-bleed (width:100vw) on mobile`).toMatch(
          /width:\s*100vw/,
        );
      }
    }
  });
});
