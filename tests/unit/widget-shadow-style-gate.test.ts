import { describe, expect, test } from 'vitest';
import {
  appendGatedShadowOverlay,
  gateShadowContent,
  getOrCreateShadowContent,
  HOST_RESET_CSS,
} from '../../src/widget/core/shadow.js';

type FakeElement = {
  attributes: Record<string, string>;
  style: Record<string, string>;
  setAttribute: (name: string, value: string) => void;
  hasAttribute: (name: string) => boolean;
};

function fakeElement(): FakeElement {
  return {
    attributes: {},
    style: {},
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    hasAttribute(name) {
      return Object.prototype.hasOwnProperty.call(this.attributes, name);
    },
  };
}

describe('shadow style gate', () => {
  test('HOST_RESET_CSS reveals gated section content only when shadow CSS is present', () => {
    expect(HOST_RESET_CSS).toContain(':host [data-renuvex-shadow-content]{display:block!important;visibility:visible!important;}');
    expect(HOST_RESET_CSS).toContain(':host [data-renuvex-shadow-gated-overlay]{display:flex!important;visibility:visible!important;}');
  });

  test('gateShadowContent hides raw section content by inline fallback', () => {
    const el = fakeElement();

    gateShadowContent(el as unknown as HTMLElement, 'content');

    expect(el.hasAttribute('data-renuvex-shadow-content')).toBe(true);
    expect(el.style.display).toBe('none');
    expect(el.style.visibility).toBe('hidden');
  });

  test('appendGatedShadowOverlay hides raw overlay content by inline fallback', () => {
    const overlay = fakeElement();
    const appended: unknown[] = [];
    const root = {
      appendChild(child: unknown) {
        appended.push(child);
        return child;
      },
    };

    appendGatedShadowOverlay(root as unknown as ShadowRoot, overlay as unknown as HTMLElement);

    expect(appended).toEqual([overlay]);
    expect(overlay.hasAttribute('data-renuvex-shadow-gated-overlay')).toBe(true);
    expect(overlay.style.display).toBe('none');
    expect(overlay.style.visibility).toBe('hidden');
  });

  test('getOrCreateShadowContent gates an existing content wrapper idempotently', () => {
    const content = fakeElement();
    const root = {
      querySelector(selector: string) {
        return selector === '[data-renuvex-shadow-content]' ? content : null;
      },
    };

    const returned = getOrCreateShadowContent(root as unknown as ShadowRoot);

    expect(returned).toBe(content);
    expect(content.hasAttribute('data-renuvex-shadow-content')).toBe(true);
    expect(content.style.display).toBe('none');
    expect(content.style.visibility).toBe('hidden');
  });
});
