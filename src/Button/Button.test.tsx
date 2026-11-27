import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const renderButton = (
  onClickHandler: () => Promise<void> = vi.fn(() => Promise.resolve()),
) =>
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

describe('<Button>', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders textBefore', () => {
    renderButton();
    expect(screen.getByRole('button')).toHaveTextContent('Copy text only');
    expect(screen.getByRole('button')).toHaveClass('button');
  });

  it('calls the handler on click', async () => {
    const onClickHandler = vi.fn(() => Promise.resolve());
    renderButton(onClickHandler);
    await userEvent.click(screen.getByRole('button'));
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });

  it('shows textAfter and then reverts', async () => {
    vi.useFakeTimers();
    renderButton();
    const button = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(button);
    });
    expect(button).toHaveTextContent('Copied!');
    expect(button).toHaveClass('button', 'is-success');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(button).toHaveTextContent('Copy text only');
    expect(button).not.toHaveClass('is-success');
  });

  it('shows textFailure when the handler rejects, and then reverts', async () => {
    vi.useFakeTimers();
    renderButton(() => Promise.reject(new Error('denied')));
    const button = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(button);
    });
    expect(button).toHaveTextContent('Copy failed');
    expect(button).toHaveClass('button', 'is-danger');
    expect(button).not.toHaveClass('is-success');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(button).toHaveTextContent('Copy text only');
    expect(button).not.toHaveClass('is-danger');
  });
});
