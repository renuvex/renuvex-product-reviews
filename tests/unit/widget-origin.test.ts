import { describe, expect, it } from 'vitest';
import { normalizeWidgetApiBaseUrlForTest } from '../../src/widget/core/origins.js';

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
});
