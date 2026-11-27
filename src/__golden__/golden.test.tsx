import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../Form/Form';

// Golden (characterization) tests: they record exactly what each copy button
// puts on the clipboard. The HTML buttons copy the container's innerHTML after
// the browser parser has normalized the rendered markup; the text buttons copy
// the textarea's value.

type GoldenProfile = Partial<Record<keyof typeof labels, string | true>>;

const profiles: Record<string, GoldenProfile> = {
  placeholder: {},
  filled: {
    name: 'Jane Citizen',
    pronoun: 'she/her',
    title: 'Senior Software Engineer',
    qualifications: 'BSc (Hons) | PSM I',
    mobile: '0412 345 678',
    email: 'jane.citizen@makerx.com.au',
    twitter: '@maker',
    addGPTW: true,
  },
};

const labels = {
  name: /^Your Name/,
  pronoun: /^Your Pronouns/,
  title: /^Job Title/,
  qualifications: /^Qualifications/,
  mobile: /^Mobile/,
  email: /^Email/,
  twitter: /^Twitter/,
  addGPTW: /^Add GPTW/,
};

const captureClipboard = async (
  profile: GoldenProfile,
): Promise<Record<string, string | undefined>> => {
  const user = userEvent.setup();

  const captured: (string | undefined)[] = [];
  const execCommand = vi.fn((command: string) => {
    expect(command).toBe('copy');
    const node = document.body.lastElementChild;
    captured.push(
      node instanceof HTMLTextAreaElement ? node.value : node?.innerHTML,
    );
    return true;
  });
  const originalExecCommand = document.execCommand;
  document.execCommand = execCommand;

  try {
    render(<Form />);

    for (const [field, value] of Object.entries(profile) as [
      keyof typeof labels,
      string | true,
    ][]) {
      const input = screen.getByLabelText(labels[field]);
      if (value === true) {
        await user.click(input);
      } else {
        await user.type(input, value);
      }
    }

    const [signatureText, repliesText] = screen.getAllByRole('button', {
      name: 'Copy text only',
    });
    const [signatureHtml, repliesHtml] = screen.getAllByRole('button', {
      name: 'Copy signature',
    });

    for (const button of [
      signatureHtml,
      signatureText,
      repliesHtml,
      repliesText,
    ]) {
      if (!button) throw new Error('Copy button not found');
      await user.click(button);
    }
  } finally {
    document.execCommand = originalExecCommand;
  }

  expect(execCommand).toHaveBeenCalledTimes(4);
  const [signatureHtml, signatureText, repliesHtml, repliesText] = captured;
  return { signatureHtml, signatureText, repliesHtml, repliesText };
};

describe.each(Object.entries(profiles))(
  'golden: %s profile',
  (profileName, profile) => {
    let clipboard: Record<string, string | undefined>;

    beforeAll(async () => {
      clipboard = await captureClipboard(profile);
    });

    const files = {
      signatureHtml: `${profileName}-signature.html`,
      signatureText: `${profileName}-signature.txt`,
      repliesHtml: `${profileName}-replies-and-forwards.html`,
      repliesText: `${profileName}-replies-and-forwards.txt`,
    };

    it.each(Object.entries(files))('%s matches %s', async (key, file) => {
      const value = clipboard[key];
      expect(typeof value).toBe('string');
      expect(value?.length).toBeGreaterThan(0);
      expect(
        existsSync(join(dirname(fileURLToPath(import.meta.url)), file)),
        `Golden file ${file} is missing. Goldens must never be regenerated; restore it from git.`,
      ).toBe(true);
      await expect(value).toMatchFileSnapshot(`./${file}`);
    });
  },
);
