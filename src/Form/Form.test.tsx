import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import signatureReducer from '../slice';
import Form from './Form';

const renderForm = () => {
  const store = configureStore({ reducer: { signature: signatureReducer } });
  return render(
    <Provider store={store}>
      <Form />
    </Provider>,
  );
};

describe('<Form>', () => {
  it('shows the typed name in the signature preview', async () => {
    const user = userEvent.setup();
    renderForm();

    expect(screen.queryByText('Alex Example')).not.toBeInTheDocument();

    await user.type(screen.getByLabelText(/Your Name/), 'Alex Example');

    expect(screen.getByText('Alex Example')).toBeInTheDocument();
  });

  it('shows the GPTW logo when Add GPTW is ticked', async () => {
    const user = userEvent.setup();
    renderForm();

    expect(
      screen.queryByAltText('MakerX Best Workplaces'),
    ).not.toBeInTheDocument();

    await user.click(screen.getByLabelText('Add GPTW'));

    expect(screen.getByAltText('MakerX Best Workplaces')).toBeInTheDocument();
  });
});
