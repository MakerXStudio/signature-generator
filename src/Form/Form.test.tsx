import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('<Form>', () => {
  it('updates the preview when typing in the name field', async () => {
    const user = userEvent.setup();
    render(<Form />);
    const nameInput = screen.getByLabelText(/^Your Name/);

    expect(
      screen.getByText('Your Name', { selector: 'b' }),
    ).toBeInTheDocument();

    await user.type(nameInput, 'Jane Citizen');
    expect(
      screen.getByText('Jane Citizen', { selector: 'b' }),
    ).toBeInTheDocument();

    await user.clear(nameInput);
    expect(
      screen.getByText('Your Name', { selector: 'b' }),
    ).toBeInTheDocument();
  });

  it('shows the GPTW image when Add GPTW is ticked', async () => {
    const user = userEvent.setup();
    render(<Form />);

    expect(
      screen.queryByAltText('MakerX Best Workplaces'),
    ).not.toBeInTheDocument();

    await user.click(screen.getByLabelText(/^Add GPTW/));
    expect(screen.getByAltText('MakerX Best Workplaces')).toBeInTheDocument();
  });
});
