import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button/Button';
import { copyHtml, copyText } from './clipboard';
import { inClick, mockClipboard } from './testUtils/clipboard';

describe('clipboard', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('copyText writes text/plain with writeText', async () => {
    const clipboard = mockClipboard();
    await inClick(() => copyText('hello'));
    expect(clipboard.writeText).toHaveBeenCalledWith('hello');
    expect(clipboard.write).not.toHaveBeenCalled();
    expect(await clipboard.writes()).toEqual([{ 'text/plain': 'hello' }]);
  });

  it('copyHtml writes one ClipboardItem with text/html and text/plain', async () => {
    const clipboard = mockClipboard();
    await inClick(() => copyHtml('<b>hello</b>', 'hello'));
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
    await expect(
      inClick(() => copyHtml('<b>hello</b>', 'hello')),
    ).rejects.toThrow('denied');
    await expect(inClick(() => copyText('hello'))).rejects.toThrow('denied');
  });
});

describe('clipboard user gesture guard', () => {
  const renderCopyButton = (onClickHandler: () => Promise<void>) =>
    render(
      <Button
        onClickHandler={onClickHandler}
        classBefore="button"
        classAfter="button is-success"
        classFailure="button is-danger"
        textBefore="Copy text only"
        textAfter="Copied!"
        textFailure="Copy failed"
      />,
    );

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('accepts a write made synchronously within the click', async () => {
    const user = userEvent.setup();
    const clipboard = mockClipboard();
    renderCopyButton(() => copyText('hello'));

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('Copied!');
    expect(await clipboard.writes()).toEqual([{ 'text/plain': 'hello' }]);
  });

  it('rejects a write made after an await in the click handler', async () => {
    const user = userEvent.setup();
    const clipboard = mockClipboard();
    renderCopyButton(async () => {
      await Promise.resolve();
      await copyText('hello');
    });

    await user.click(screen.getByRole('button'));

    expect(clipboard.writeText).toHaveBeenCalledTimes(1);
    await expect(clipboard.writeText.mock.results[0]?.value).rejects.toThrow(
      'not made synchronously within a click',
    );
    expect(screen.getByRole('button')).toHaveTextContent('Copy failed');
    expect(await clipboard.writes()).toEqual([]);
  });

  it('rejects a write made after an await under fake timers', async () => {
    // shouldAdvanceTime lets React Testing Library's setTimeout(0) between
    // user-event steps fire; it only detects Jest's fake timers.
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    const clipboard = mockClipboard();
    renderCopyButton(async () => {
      await Promise.resolve();
      await copyHtml('<b>hello</b>', 'hello');
    });

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('Copy failed');
    expect(await clipboard.writes()).toEqual([]);
  });

  it('rejects a write made outside any click', async () => {
    mockClipboard();
    await expect(copyText('hello')).rejects.toThrow(
      'not made synchronously within a click',
    );
  });
});
