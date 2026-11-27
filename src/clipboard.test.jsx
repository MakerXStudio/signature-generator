import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import signatureReducer from './slice';
import Form from './Form/Form';

// Characterization tests: pin what the four copy buttons put in the DOM at
// copy time. The fixtures under __fixtures__/clipboard are the contract; a
// change to any of them changes what people paste into their email client.

const profiles = {
  filled: {
    name: 'Alex Example',
    email: 'alex.example@makerx.com.au',
    mobile: '0412 345 678',
  },
  empty: {},
  'all-optional': {
    name: 'Sam Sample',
    pronoun: 'they/them',
    title: 'Senior Engineer',
    qualifications: 'PSM I',
    email: 'sam.sample@makerx.com.au',
    mobile: '+61 412 345 678',
    twitter: '@samsample',
    addGPTW: true,
  },
};

// The copy functions append a textarea (text) or a div (HTML) to the body,
// select it, call execCommand('copy') and remove it straight away, so the
// copied content has to be read while execCommand runs.
const captureCopy = () => {
  const textarea = document.querySelector('body > textarea');
  if (textarea) return { type: 'text', content: textarea.value };

  const selection = window.getSelection();
  if (selection.rangeCount !== 1) throw new Error('Nothing selected to copy');
  const range = selection.getRangeAt(0);
  const container = range.startContainer.childNodes[range.startOffset];
  return { type: 'html', content: container.innerHTML };
};

const buttons = [
  { name: 'standard-text', label: 'Copy text only', index: 0, type: 'text' },
  { name: 'standard-html', label: 'Copy signature', index: 0, type: 'html' },
  { name: 'replies-text', label: 'Copy text only', index: 1, type: 'text' },
  { name: 'replies-html', label: 'Copy signature', index: 1, type: 'html' },
];

describe('copied signatures', () => {
  let copies;

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    copies = [];
    document.execCommand = vi.fn((command) => {
      expect(command).toBe('copy');
      copies.push(captureCopy());
      return true;
    });
  });

  afterEach(() => {
    act(() => vi.runOnlyPendingTimers());
    vi.useRealTimers();
    delete document.execCommand;
  });

  describe.each(Object.entries(profiles))(
    '%s profile',
    (profileName, profile) => {
      it('copies the expected text and HTML for each button', async () => {
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        const store = configureStore({
          reducer: { signature: signatureReducer },
        });
        const { container } = render(
          <Provider store={store}>
            <Form />
          </Provider>
        );

        for (const [field, value] of Object.entries(profile)) {
          const input = container.querySelector(`#input-${field}`);
          if (value === true) {
            await user.click(input);
          } else {
            await user.type(input, value);
          }
        }

        const buttonElements = buttons.map(
          ({ label, index }) =>
            screen.getAllByRole('button', { name: label })[index]
        );

        for (const [i, button] of buttons.entries()) {
          await user.click(buttonElements[i]);

          expect(copies).toHaveLength(i + 1);
          const copy = copies[i];
          expect(copy.type).toBe(button.type);
          await expect(copy.content).toMatchFileSnapshot(
            `./__fixtures__/clipboard/${profileName}-${button.name}.${
              button.type === 'text' ? 'txt' : 'html'
            }`
          );
        }
      });
    }
  );
});
