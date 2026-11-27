import { test, expect } from '@playwright/test';
import { expectGolden } from './golden.mjs';
import { normalizeClipboardHtml } from './normalize.mjs';

// Must match filledProfile in src/test/fixtures.js.
const filledProfile = {
  name: 'Ada Lovelace',
  pronoun: 'she/her',
  title: 'Chief Engineer',
  qualifications: 'PhD | PSM I',
  mobile: '0412 345 678',
  email: 'ada.lovelace@makerx.com.au',
  twitter: '@adalovelace',
};

const extensions = { 'text/html': 'html', 'text/plain': 'txt' };

test.beforeEach(async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  // Inter is only the page font; blocking it keeps runs off the network.
  await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) =>
    route.abort()
  );
  await page.goto('/');
});

const readClipboard = (page) =>
  page.evaluate(async () => {
    const [item] = await navigator.clipboard.read();
    const result = {};
    for (const type of [...item.types].sort()) {
      result[type] = await (await item.getType(type)).text();
    }
    return result;
  });

const expectCopies = async (page, profile) => {
  const textButtons = page.getByRole('button', { name: 'Copy text only' });
  const htmlButtons = page.getByRole('button', { name: 'Copy signature' });
  const copies = [
    ['signature-text', textButtons.nth(0), ['text/plain']],
    ['signature-html', htmlButtons.nth(0), ['text/html', 'text/plain']],
    ['replies-text', textButtons.nth(1), ['text/plain']],
    ['replies-html', htmlButtons.nth(1), ['text/html', 'text/plain']],
  ];
  for (const [copy, button, types] of copies) {
    await button.click();
    await expect(page.getByRole('button', { name: 'Copied!' })).toBeVisible();
    const clipboard = await readClipboard(page);
    expect(Object.keys(clipboard)).toEqual(types);
    for (const [type, data] of Object.entries(clipboard)) {
      const actual =
        type === 'text/html' ? normalizeClipboardHtml(data) : data;
      expectGolden(
        expect,
        `clipboard.${profile}.${copy}.${extensions[type]}`,
        actual
      );
    }
    // Let the button reset so the next click starts from the same state.
    await expect(page.getByRole('button', { name: 'Copied!' })).toHaveCount(0);
  }
};

test('copies the placeholder signature in the initial state', async ({
  page,
}) => {
  await expectCopies(page, 'initial');
});

test('copies a filled-in profile with GPTW', async ({ page }) => {
  for (const [field, value] of Object.entries(filledProfile)) {
    await page.locator(`#input-${field}`).fill(value);
  }
  await page.locator('#input-addGPTW').check();
  await expectCopies(page, 'filled');
});

test('switches the instruction tabs', async ({ page }) => {
  const gmail = page.getByRole('tab', { name: 'Gmail Instructions' });
  const outlook = page.getByRole('tab', { name: 'Outlook instructions' });
  const google = page.getByText('Follow the instuctions provided by Google.');
  const microsoft = page.getByText(
    'Follow the instuctions provided by Microsoft.'
  );

  await expect(gmail).toHaveAttribute('aria-selected', 'true');
  await expect(google).toBeVisible();
  await expect(microsoft).toHaveCount(0);

  await outlook.click();
  await expect(outlook).toHaveAttribute('aria-selected', 'true');
  await expect(microsoft).toBeVisible();
  await expect(google).toHaveCount(0);

  await gmail.click();
  await expect(google).toBeVisible();
  await expect(microsoft).toHaveCount(0);
});
