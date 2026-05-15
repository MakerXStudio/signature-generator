import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('shows the success label after a successful click', async () => {
    const onClick = vi.fn().mockResolvedValue(true);
    render(
      <Button
        textBefore="Copy"
        textAfter="Copied!"
        onClickHandler={onClick}
      />,
    );

    expect(screen.getByRole('button')).toHaveTextContent('Copy');
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByRole('button')).toHaveTextContent('Copied!'),
    );
  });

  it('reverts to the original label after SUCCESS_FLASH_MS', async () => {
    const onClick = vi.fn().mockResolvedValue(true);
    render(
      <Button
        textBefore="Copy"
        textAfter="Copied!"
        onClickHandler={onClick}
      />,
    );

    await userEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByRole('button')).toHaveTextContent('Copied!'),
    );
    await waitFor(
      () => expect(screen.getByRole('button')).toHaveTextContent('Copy'),
      { timeout: 2000 },
    );
  });

  it('shows the error label when the handler resolves false', async () => {
    const onClick = vi.fn().mockResolvedValue(false);
    render(
      <Button
        textBefore="Copy"
        textAfter="Copied!"
        textError="Failed"
        onClickHandler={onClick}
      />,
    );

    await userEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.getByRole('button')).toHaveTextContent('Failed'),
    );
  });
});
