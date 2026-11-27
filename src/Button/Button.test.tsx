import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const renderButton = (onClickHandler: () => void = vi.fn()) =>
  render(
    <Button
      onClickHandler={onClickHandler}
      classBefore="button"
      classAfter="button is-success"
      textBefore="Copy text only"
      textAfter="Copied!"
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
    const onClickHandler = vi.fn();
    renderButton(onClickHandler);
    await userEvent.click(screen.getByRole('button'));
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });

  it('shows textAfter and then reverts', () => {
    vi.useFakeTimers();
    renderButton();
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Copied!');
    expect(button).toHaveClass('button', 'is-success');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(button).toHaveTextContent('Copy text only');
    expect(button).not.toHaveClass('is-success');
  });
});
