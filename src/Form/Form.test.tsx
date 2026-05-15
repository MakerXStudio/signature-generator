import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';
import Form from './Form';

describe('Form', () => {
  it('renders required asterisks on Name, Mobile, Email at initial mount', () => {
    render(
      <ThemeProvider theme={theme}>
        <Form />
      </ThemeProvider>,
    );

    expect(screen.getByLabelText(/your name/i, { exact: false })).toBeRequired();
    expect(screen.getByLabelText(/mobile/i, { exact: false })).toBeRequired();
    expect(screen.getByLabelText(/email/i, { exact: false })).toBeRequired();

    // Non-required fields are not marked required.
    expect(
      screen.getByLabelText(/your pronouns/i, { exact: false }),
    ).not.toBeRequired();
  });
});
