import { describe, expect, it } from 'vitest';
import {
  getWidgetReadApiBaseUrl,
  normalizeWidgetApiBaseUrlForTest,
  normalizeWidgetReadApiBaseUrlForTest,
} from '../../src/widget/core/origins.js';

describe('widget API origin helper', () => {
  it('normalizes an explicit backend origin', () => {
    expect(normalizeWidgetApiBaseUrlForTest('https://app.renuvex.app/api?x=1#hash', 'https://widget.renuvex.app')).toBe('https://app.renuvex.app');
    expect(normalizeWidgetApiBaseUrlForTest('https://app.renuvex.app/', 'https://widget.renuvex.app')).toBe('https://app.renuvex.app');
  });

  it('allows relative values to resolve to the script origin for defensive fallback only', () => {
    expect(normalizeWidgetApiBaseUrlForTest('/backend', 'https://widget.renuvex.app')).toBe('https://widget.renuvex.app');
  });

  it('rejects non-http protocols and invalid values', () => {
    expect(normalizeWidgetApiBaseUrlForTest('javascript:alert(1)', 'https://widget.renuvex.app')).toBe('');
    expect(normalizeWidgetApiBaseUrlForTest('http://[', 'https://widget.renuvex.app')).toBe('');
  });

  it('normalizes the optional read API origin with the same origin-only contract', () => {
    expect(normalizeWidgetReadApiBaseUrlForTest('https://widget.renuvex.app/api/public?x=1', 'https://app.renuvex.app')).toBe('https://widget.renuvex.app');
    expect(normalizeWidgetReadApiBaseUrlForTest('', 'https://app.renuvex.app')).toBe('');
  });

  it('falls read API origin back to the configured backend API origin when unset', () => {
    const previousApiBase = (globalThis as typeof globalThis & { __RENUVEX_PR_API_BASE_URL__?: string }).__RENUVEX_PR_API_BASE_URL__;
    const previousReadBase = (globalThis as typeof globalThis & { __RENUVEX_PR_READ_API_BASE_URL__?: string }).__RENUVEX_PR_READ_API_BASE_URL__;
    const globals = globalThis as typeof globalThis & {
      __RENUVEX_PR_API_BASE_URL__?: string;
      __RENUVEX_PR_READ_API_BASE_URL__?: string;
    };

    try {
      globals.__RENUVEX_PR_API_BASE_URL__ = 'https://app.renuvex.app';
      globals.__RENUVEX_PR_READ_API_BASE_URL__ = '';
      expect(getWidgetReadApiBaseUrl({ src: 'https://widget.renuvex.app/widget.js?publicApiKey=s1' })).toBe('https://app.renuvex.app');

      globals.__RENUVEX_PR_READ_API_BASE_URL__ = 'https://widget.renuvex.app';
      expect(getWidgetReadApiBaseUrl({ src: 'https://widget.renuvex.app/widget.js?publicApiKey=s1' })).toBe('https://widget.renuvex.app');
    } finally {
      if (previousApiBase === undefined) delete globals.__RENUVEX_PR_API_BASE_URL__;
      else globals.__RENUVEX_PR_API_BASE_URL__ = previousApiBase;

      if (previousReadBase === undefined) delete globals.__RENUVEX_PR_READ_API_BASE_URL__;
      else globals.__RENUVEX_PR_READ_API_BASE_URL__ = previousReadBase;
    }
  });
});
