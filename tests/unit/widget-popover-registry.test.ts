import { afterEach, describe, expect, test, vi } from 'vitest';

type EventLike = {
  composedPath?: () => unknown[];
  key?: string;
  preventDefault?: () => void;
  stopPropagation?: () => void;
  target?: unknown;
};

type ListenerMap = Record<string, (event: EventLike) => void>;

function fakeNode(isConnected = true) {
  return {
    isConnected,
    contains: vi.fn(() => false),
  };
}

async function loadRegistry() {
  vi.resetModules();
  const listeners: ListenerMap = {};
  vi.stubGlobal('document', {
    addEventListener: vi.fn((type: string, handler: (event: EventLike) => void) => {
      listeners[type] = handler;
    }),
  });

  const registry = await import('../../src/widget/summary-layouts/shared/popover-registry.js');
  return { registry, listeners };
}

describe('widget popover registry contract', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  test('notifyOpening closes only other live popovers', async () => {
    const { registry } = await loadRegistry();
    const selfClose = vi.fn(() => true);
    const otherClose = vi.fn(() => true);

    const self = registry.registerPopover({
      trigger: fakeNode(),
      element: fakeNode(),
      close: selfClose,
    });
    registry.registerPopover({
      trigger: fakeNode(),
      element: fakeNode(),
      close: otherClose,
    });

    self.notifyOpening();

    expect(selfClose).not.toHaveBeenCalled();
    expect(otherClose).toHaveBeenCalledTimes(1);
  });

  test('dismiss passes purge disconnected entries before closing live popovers', async () => {
    const { registry, listeners } = await loadRegistry();
    const staleClose = vi.fn(() => {
      throw new Error('stale popover should have been purged');
    });
    const liveClose = vi.fn(() => true);
    const preventDefault = vi.fn();
    const stopPropagation = vi.fn();

    registry.registerPopover({
      trigger: fakeNode(false),
      element: fakeNode(false),
      close: staleClose,
    });
    registry.registerPopover({
      trigger: fakeNode(),
      element: fakeNode(),
      close: liveClose,
    });

    listeners.click({
      composedPath: () => [],
      target: {},
      preventDefault,
      stopPropagation,
    });

    expect(staleClose).not.toHaveBeenCalled();
    expect(liveClose).toHaveBeenCalledTimes(1);
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(1);
  });
});
