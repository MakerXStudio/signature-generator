import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

describe('<Button>', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls the handler and shows the "after" state for one second', () => {
    const onClickHandler = vi.fn();
    render(
      <Button
        textBefore="Copy"
        textAfter="Copied!"
        classBefore="button"
        classAfter="button is-success"
        onClickHandler={onClickHandler}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Copy');
    expect(button).toHaveClass('button', { exact: true });

    fireEvent.click(button);

    expect(onClickHandler).toHaveBeenCalledTimes(1);
    expect(button).toHaveTextContent('Copied!');
    expect(button).toHaveClass('button is-success', { exact: true });

    act(() => vi.advanceTimersByTime(999));
    expect(button).toHaveTextContent('Copied!');

    act(() => vi.advanceTimersByTime(1));
    expect(button).toHaveTextContent('Copy');
    expect(button).toHaveClass('button', { exact: true });
  });
});
