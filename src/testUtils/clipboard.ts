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

// Installs a mocked navigator.clipboard and a global ClipboardItem. Call it
// after userEvent.setup(), which replaces navigator.clipboard with its own stub.
export const mockClipboard = () => {
  const writes: Promise<ClipboardWrite>[] = [];
  const writeText = vi.fn(async (text: string) => {
    writes.push(Promise.resolve({ 'text/plain': text }));
  });
  const write = vi.fn(async (items: FakeClipboardItem[]) => {
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
