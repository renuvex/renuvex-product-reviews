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

  test('uses display fallback dimensions and leaves AWS image URLs untransformed', () => {
    const url = 'https://media.renuvex.app/reviews/00000000-0000-4000-8000-000000000001/w300.jpeg';
    const thumb = createMediaThumbnail({
      type: 'image',
      url,
    }, {
      sourceWidth: 300,
      sourceHeight: 300,
      displayWidth: 110,
      displayHeight: 110,
    }) as unknown as FakeElement;

    expect(thumb.tagName).toBe('IMG');
    expect(thumb.width).toBe(110);
    expect(thumb.height).toBe(110);
    expect(thumb.src).toBe(url);
    expect(thumb.srcset).toBeUndefined();
  });

  test('keeps thumbnail src small while exposing full-size WebP data URL', () => {
    const assetId = '00000000-0000-4000-8000-000000000002';
    const base = `https://media.renuvex.app/reviews/${assetId}`;
    const thumb = createMediaThumbnail({
      type: 'image',
      url: `${base}/w1200.jpeg`,
      thumbnailUrl: `${base}/thumb_320x427.webp`,
      variants: [
        { id: 'w200', format: 'webp', width: 200, height: 250, url: `${base}/w200.webp` },
        { id: 'w1200', format: 'webp', width: 201, height: 251, url: `${base}/w1200.webp` },
        { id: 'thumb_640x854', format: 'webp', width: 201, height: 251, url: `${base}/thumb_640x854.webp` },
        { id: 'w1200', format: 'jpeg', width: 201, height: 251, url: `${base}/w1200.jpeg` },
      ],
    }, {
      sourceWidth: 300,
      sourceHeight: 400,
      displayWidth: 110,
      displayHeight: 147,
    }) as unknown as FakeElement;

    expect(thumb.src).toBe(`${base}/thumb_640x854.webp`);
    expect(thumb.srcset).toBeUndefined();
    expect(thumb.getAttribute('data-renuvex-img-url')).toBe(`${base}/w1200.webp`);
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
