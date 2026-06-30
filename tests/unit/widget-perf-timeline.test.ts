import { afterEach, describe, expect, it } from 'vitest';
import {
  isWidgetPerfTimelineFlagEnabledForTest,
  markWidgetPerf,
} from '../../src/widget/core/perf-timeline.js';

type PerfWindow = typeof globalThis & {
  window?: unknown;
  __renuvexPerfTimeline?: { marks: Array<{ name: string; at: number }> };
};

function installWindow(search: string, storageValue: string | null): void {
  const localStorage = {
    getItem(key: string) {
      return key === 'renuvexPerf' ? storageValue : null;
    },
  };
  const fakeWindow = {
    location: { search },
    localStorage,
  };
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: fakeWindow,
  });
}

afterEach(() => {
  Reflect.deleteProperty(globalThis, 'window');
});

describe('widget perf timeline', () => {
  it('keeps the timeline disabled unless the opt-in flag is present', () => {
    installWindow('', null);
    markWidgetPerf('classic-loader-start');

    expect((globalThis as PerfWindow).window).not.toHaveProperty('__renuvexPerfTimeline');
  });

  it('accepts query string and localStorage opt-in flags', () => {
    expect(isWidgetPerfTimelineFlagEnabledForTest('?renuvexPerf=1', '')).toBe(true);
    expect(isWidgetPerfTimelineFlagEnabledForTest('', '1')).toBe(true);
    expect(isWidgetPerfTimelineFlagEnabledForTest('?renuvexPerf=0', '')).toBe(false);
  });

  it('records ordered marks without user payload', () => {
    installWindow('?renuvexPerf=1', null);
    markWidgetPerf('classic-loader-start');
    markWidgetPerf('runtime-import-start');

    const timeline = ((globalThis as PerfWindow).window as PerfWindow).__renuvexPerfTimeline;
    expect(timeline?.marks.map((mark) => mark.name)).toEqual([
      'classic-loader-start',
      'runtime-import-start',
    ]);
    expect(timeline?.marks.every((mark) => Number.isFinite(mark.at))).toBe(true);
  });
});
