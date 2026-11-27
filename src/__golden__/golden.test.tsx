import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../Form/Form';
import { mockClipboard, type ClipboardWrite } from '../testUtils/clipboard';

// Golden (characterization) tests: they record exactly what each copy button
// puts on the clipboard, read back from a mocked navigator.clipboard. The HTML
// goldens hold the text/html the HTML buttons write (the rendered markup as
// the HTML parser normalizes it); the text goldens hold what the text buttons
// write.

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

type Captured = Record<
  'signatureHtml' | 'signatureText' | 'repliesHtml' | 'repliesText',
  ClipboardWrite | undefined
>;

const captureClipboard = async (profile: GoldenProfile): Promise<Captured> => {
  const user = userEvent.setup();
  const clipboard = mockClipboard();

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

    expect(clipboard.write).toHaveBeenCalledTimes(2);
    expect(clipboard.writeText).toHaveBeenCalledTimes(2);
    const writes = await clipboard.writes();
    expect(writes).toHaveLength(4);
    const [
      signatureHtmlWrite,
      signatureTextWrite,
      repliesHtmlWrite,
      repliesTextWrite,
    ] = writes;
    return {
      signatureHtml: signatureHtmlWrite,
      signatureText: signatureTextWrite,
      repliesHtml: repliesHtmlWrite,
      repliesText: repliesTextWrite,
    };
  } finally {
    vi.unstubAllGlobals();
  }
};

const goldenPath = (file: string) =>
  join(dirname(fileURLToPath(import.meta.url)), file);

describe.each(Object.entries(profiles))(
  'golden: %s profile',
  (profileName, profile) => {
    let clipboard: Captured;

    beforeAll(async () => {
      clipboard = await captureClipboard(profile);
    });

    const files = {
      signatureHtml: `${profileName}-signature.html`,
      signatureText: `${profileName}-signature.txt`,
      repliesHtml: `${profileName}-replies-and-forwards.html`,
      repliesText: `${profileName}-replies-and-forwards.txt`,
    };

    // The HTML buttons write text/html plus the matching text builder's
    // output as text/plain; the text buttons write text/plain only.
    const mimeTypes = {
      signatureHtml: ['text/html', 'text/plain'],
      signatureText: ['text/plain'],
      repliesHtml: ['text/html', 'text/plain'],
      repliesText: ['text/plain'],
    };
    const mimeType = (key: string) =>
      key.endsWith('Html') ? 'text/html' : 'text/plain';

    it.each(Object.entries(files))('%s matches %s', async (key, file) => {
      const value = clipboard[key as keyof Captured]?.[mimeType(key)];
      expect(typeof value).toBe('string');
      expect(value?.length).toBeGreaterThan(0);
      expect(
        existsSync(goldenPath(file)),
        `Golden file ${file} is missing. Goldens must never be regenerated; restore it from git.`,
      ).toBe(true);
      await expect(value).toMatchFileSnapshot(`./${file}`);
    });

    it.each(Object.entries(mimeTypes))('%s writes %j', (key, expectedTypes) => {
      expect(Object.keys(clipboard[key as keyof Captured] ?? {})).toEqual(
        expectedTypes,
      );
    });

    it.each([
      ['signatureHtml', files.signatureText],
      ['repliesHtml', files.repliesText],
    ] as const)('%s text/plain matches %s', (key, file) => {
      expect(clipboard[key]?.['text/plain']).toBe(
        readFileSync(goldenPath(file), 'utf8'),
      );
    });
  },
);
