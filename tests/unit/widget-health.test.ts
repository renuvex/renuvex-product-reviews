import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/widget/core/config.js', () => ({
  API_BASE: 'https://app.test',
  PUBLIC_API_KEY: 'health-test-key',
}));

import { probeWidgetVisibility } from '../../src/widget/core/health.js';

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

function installBrowser(pathname: string) {
  const values = new Map<string, string>();
  const sendBeacon = vi.fn((_url: string, _data?: Blob) => true);

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      location: {
        href: `https://merchant.test${pathname}`,
        pathname,
      },
      sessionStorage: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
      },
    },
  });
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      sendBeacon,
      userAgent: 'vitest',
    },
  });

  return sendBeacon;
}

function restoreGlobal(
  name: 'window' | 'navigator',
  descriptor: PropertyDescriptor | undefined,
) {
  if (descriptor) {
    Object.defineProperty(globalThis, name, descriptor);
    return;
  }
  Reflect.deleteProperty(globalThis, name);
}

afterEach(() => {
  vi.useRealTimers();
  restoreGlobal('window', originalWindow);
  restoreGlobal('navigator', originalNavigator);
});

describe('probeWidgetVisibility lifecycle relevance', () => {
  it('does not report an intentionally retired widget probe', () => {
    vi.useFakeTimers();
    const sendBeacon = installBrowser('/expected-transition');

    probeWidgetVisibility(
      { isConnected: false },
      'reviews-widget-transition',
      { productId: 'old-product' },
      () => null,
      () => false,
    );
    vi.advanceTimersByTime(350);

    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it('still reports a relevant widget that is unexpectedly absent', async () => {
    vi.useFakeTimers();
    const sendBeacon = installBrowser('/unexpected-removal');

    probeWidgetVisibility(
      { isConnected: false },
      'reviews-widget-removal',
      { productId: 'current-product' },
      () => null,
      () => true,
    );
    vi.advanceTimersByTime(350);

    expect(sendBeacon).toHaveBeenCalledTimes(1);
    const payloadBody = sendBeacon.mock.calls[0][1];
    expect(payloadBody).toBeInstanceOf(Blob);
    if (!(payloadBody instanceof Blob)) {
      throw new TypeError('Expected widget health payload to be a Blob');
    }
    const payload = JSON.parse(await payloadBody.text()) as {
      message: string;
      extra: { reason: string; productId: string };
    };
    expect(payload).toMatchObject({
      message: 'Widget node missing after render',
      extra: {
        reason: 'missing_after_render',
        productId: 'current-product',
      },
    });
  });
});
