import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';
import signatureReducer from '../slice';
import { expectGolden } from '../test/golden';
import { filledProfile } from '../test/fixtures';
import { stubExecCommand } from '../test/execCommand';

const renderForm = () => {
  const store = configureStore({ reducer: { signature: signatureReducer } });
  return render(
    <Provider store={store}>
      <Form />
    </Provider>
  );
};

const copyAll = async (user, stub) => {
  const [signatureText, repliesText] = screen.getAllByRole('button', {
    name: 'Copy text only',
  });
  const [signatureHtml, repliesHtml] = screen.getAllByRole('button', {
    name: 'Copy signature',
  });
  const copies = {};
  for (const [key, button] of Object.entries({
    'signature.txt': signatureText,
    'signature.html': signatureHtml,
    'replies.txt': repliesText,
    'replies.html': repliesHtml,
  })) {
    const before = stub.copies.length;
    await user.click(button);
    expect(stub.copies).toHaveLength(before + 1);
    copies[key] = stub.copies[before];
  }
  return copies;
};

describe('<Form> copy buttons', () => {
  let stub;
  beforeEach(() => {
    stub = stubExecCommand();
  });
  afterEach(() => {
    stub.restore();
  });

  it('copies the placeholder signature in the initial state', async () => {
    const user = userEvent.setup();
    renderForm();
    const copies = await copyAll(user, stub);
    for (const [key, value] of Object.entries(copies)) {
      expectGolden(expect, `Form.initial.${key}`, value);
    }
  });

  it('copies a filled-in profile with GPTW', async () => {
    const user = userEvent.setup();
    const { container } = renderForm();
    for (const [field, value] of Object.entries(filledProfile)) {
      await user.type(container.querySelector(`#input-${field}`), value);
    }
    await user.click(container.querySelector('#input-addGPTW'));
    const copies = await copyAll(user, stub);
    for (const [key, value] of Object.entries(copies)) {
      expectGolden(expect, `Form.filled.${key}`, value);
    }
  });
});
