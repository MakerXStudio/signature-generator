import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const renderButton = () => {
  const clicks = [];
  render(
    <Button
      onClickHandler={() => clicks.push('copied')}
      classBefore="button is-link"
      classAfter="button is-success"
      textBefore="Copy signature"
      textAfter="Copied!"
    />
  );
  return clicks;
};

describe('<Button>', () => {
  it('calls the handler and shows "Copied!" when clicked', async () => {
    const clicks = renderButton();
    const button = screen.getByRole('button', { name: 'Copy signature' });
    expect(button).toHaveClass('button', 'is-link');

    await userEvent.setup().click(button);

    expect(clicks).toEqual(['copied']);
    expect(button).toHaveTextContent('Copied!');
    expect(button).toHaveClass('button', 'is-success');
    expect(button).not.toHaveClass('is-link');
  });

  it('returns to its original text and class after a second', async () => {
    renderButton();
    await userEvent
      .setup()
      .click(screen.getByRole('button', { name: 'Copy signature' }));
    expect(screen.getByRole('button')).toHaveTextContent('Copied!');

    const button = await screen.findByRole(
      'button',
      { name: 'Copy signature' },
      { timeout: 2000 }
    );
    expect(button).toHaveClass('button', 'is-link');
  });
});
