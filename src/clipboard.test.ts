import { copyHtml, copyText } from './clipboard';
import { mockClipboard } from './testUtils/clipboard';

describe('clipboard', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('copyText writes text/plain with writeText', async () => {
    const clipboard = mockClipboard();
    await copyText('hello');
    expect(clipboard.writeText).toHaveBeenCalledWith('hello');
    expect(clipboard.write).not.toHaveBeenCalled();
    expect(await clipboard.writes()).toEqual([{ 'text/plain': 'hello' }]);
  });

  it('copyHtml writes one ClipboardItem with text/html and text/plain', async () => {
    const clipboard = mockClipboard();
    await copyHtml('<b>hello</b>', 'hello');
    expect(clipboard.write).toHaveBeenCalledTimes(1);
    expect(clipboard.writeText).not.toHaveBeenCalled();
    expect(await clipboard.writes()).toEqual([
      { 'text/html': '<b>hello</b>', 'text/plain': 'hello' },
    ]);
  });

  it('rejects when the clipboard write is rejected', async () => {
    const clipboard = mockClipboard();
    clipboard.write.mockRejectedValueOnce(new Error('denied'));
    clipboard.writeText.mockRejectedValueOnce(new Error('denied'));
    await expect(copyHtml('<b>hello</b>', 'hello')).rejects.toThrow('denied');
    await expect(copyText('hello')).rejects.toThrow('denied');
  });
});
