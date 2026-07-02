import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createMediaThumbnail } from '../../src/widget/reviews-section/media-thumbnail.js';

type FakeElement = {
  tagName: string;
  children: FakeElement[];
  attributes: Record<string, string>;
  style: Record<string, string>;
  className: string;
  firstElementChild: FakeElement | null;
  complete: boolean;
  naturalWidth: number;
  appendChild: (child: FakeElement) => FakeElement;
  setAttribute: (name: string, value: string) => void;
  getAttribute: (name: string) => string | null;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
  insertAdjacentHTML: (position: string, markup: string) => void;
  [key: string]: unknown;
};

function createFakeElement(tagName: string): FakeElement {
  const element: FakeElement = {
    tagName: tagName.toUpperCase(),
    children: [],
    attributes: {},
    style: {},
    className: '',
    firstElementChild: null,
    complete: false,
    naturalWidth: 0,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    appendChild(child) {
      this.children.push(child);
      this.firstElementChild = this.children[0] || null;
      child.parentNode = this;
      return child;
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getAttribute(name) {
      return this.attributes[name] ?? null;
    },
    insertAdjacentHTML(_position, markup) {
      const child = createFakeElement(markup.trim().startsWith('<svg') ? 'svg' : 'span');
      child.innerHTML = markup;
      this.appendChild(child);
    },
  };
  return element;
}

function installFakeDocument() {
  vi.stubGlobal('document', {
    createElement: vi.fn((tagName: string) => createFakeElement(tagName)),
    getElementById: vi.fn(() => null),
    body: createFakeElement('body'),
    documentElement: createFakeElement('html'),
  });
}

describe('createMediaThumbnail intrinsic fallback dimensions', () => {
  beforeEach(() => {
    installFakeDocument();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('uses source width for Cloudinary quality and display width for no-style fallback', () => {
    const thumb = createMediaThumbnail({
      type: 'image',
      url: 'https://res.cloudinary.com/demo/image/upload/v123/review_images/stores/store-1/photo.jpg',
    }, {
      sourceWidth: 300,
      sourceHeight: 300,
      displayWidth: 110,
      displayHeight: 110,
    }) as unknown as FakeElement;

    expect(thumb.tagName).toBe('IMG');
    expect(thumb.width).toBe(110);
    expect(thumb.height).toBe(110);
    expect(thumb.src).toContain('/upload/q_auto/f_auto/c_scale,w_300/');
    expect(thumb.srcset).toContain('/upload/q_auto/f_auto/c_scale,w_600/');
  });

  test('uses source dimensions for Mux poster transforms and small display fallback', () => {
    const thumb = createMediaThumbnail({
      type: 'video',
      url: 'https://stream.mux.com/playback123.m3u8',
      playbackId: 'playback123',
      posterUrl: 'https://image.mux.com/playback123/thumbnail.jpg',
      thumbnailUrl: 'https://image.mux.com/playback123/thumbnail.jpg',
    }, {
      sourceWidth: 300,
      sourceHeight: 400,
      displayWidth: 110,
      displayHeight: 147,
    }) as unknown as FakeElement;

    const img = thumb.children.find((child) => child.tagName === 'IMG');
    expect(thumb.tagName).toBe('BUTTON');
    expect(img).toBeTruthy();
    expect(img?.width).toBe(110);
    expect(img?.height).toBe(147);
    expect(img?.src).toContain('width=300');
    expect(img?.src).toContain('height=400');
    expect(img?.srcset).toContain('width=600');
    expect(img?.srcset).toContain('height=800');
  });
});
