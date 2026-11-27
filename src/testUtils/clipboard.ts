// jsdom has no ClipboardItem; this stand-in keeps the items it was given so
// tests can read back each MIME type.
export class FakeClipboardItem {
  readonly items: Record<string, Blob>;

  constructor(items: Record<string, Blob>) {
    this.items = items;
  }

  get types(): string[] {
    return Object.keys(this.items);
  }
}

// What one copy put on the clipboard, keyed by MIME type.
export type ClipboardWrite = Record<string, string>;

// Safari rejects clipboard writes made after the user gesture has ended, such
// as after an `await` in the click handler. To catch that in tests, the mock
// only accepts writes made while a click is being dispatched. A capturing
// listener on window runs first in every click dispatch; it marks the click
// active and queues a microtask to clear the mark. That microtask is queued
// before anything a handler awaits, so it always runs before the code after
// the handler's first `await`. It uses a promise rather than queueMicrotask so
// fake timers cannot replace it.
let clickActive = false;
let gestureGuardInstalled = false;

const installGestureGuard = () => {
  if (gestureGuardInstalled) return;
  gestureGuardInstalled = true;
  window.addEventListener(
    'click',
    () => {
      clickActive = true;
      void Promise.resolve().then(() => {
        clickActive = false;
      });
    },
    { capture: true },
  );
};

const assertUserGesture = () => {
  if (!clickActive)
    throw new DOMException(
      'Clipboard write was not made synchronously within a click',
      'NotAllowedError',
    );
};

// Runs fn synchronously inside a click dispatch, for tests that call the
// clipboard functions directly rather than through a rendered button.
export const inClick = <T>(fn: () => T): T => {
  installGestureGuard();
  const target = document.createElement('button');
  let result: { value: T } | undefined;
  target.addEventListener('click', () => {
    result = { value: fn() };
  });
  document.body.append(target);
  try {
    target.click();
  } finally {
    target.remove();
  }
  if (!result) throw new Error('Click handler did not run');
  return result.value;
};

// Installs a mocked navigator.clipboard and a global ClipboardItem. Call it
// after userEvent.setup(), which replaces navigator.clipboard with its own stub.
// write and writeText reject with NotAllowedError, as Safari does, unless they
// are called synchronously within a click dispatch.
export const mockClipboard = () => {
  installGestureGuard();
  const writes: Promise<ClipboardWrite>[] = [];
  const writeText = vi.fn(async (text: string) => {
    assertUserGesture();
    writes.push(Promise.resolve({ 'text/plain': text }));
  });
  const write = vi.fn(async (items: FakeClipboardItem[]) => {
    assertUserGesture();
    expect(items).toHaveLength(1);
    const [item] = items;
    if (!(item instanceof FakeClipboardItem))
      throw new Error('Expected a ClipboardItem');
    writes.push(
      Promise.all(
        Object.entries(item.items).map(
          async ([type, blob]) => [type, await blob.text()] as const,
        ),
      ).then(Object.fromEntries),
    );
  });

  vi.stubGlobal('ClipboardItem', FakeClipboardItem);
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { write, writeText },
  });

  return { write, writeText, writes: () => Promise.all(writes) };
};
