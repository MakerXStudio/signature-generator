# MakerX Signature Generator

[![Test and Build](https://github.com/MakerXStudio/signature-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/MakerXStudio/signature-generator/actions/workflows/ci.yml)
[![Build and Deploy](https://github.com/MakerXStudio/signature-generator/actions/workflows/cd.yml/badge.svg)](https://github.com/MakerXStudio/signature-generator/actions/workflows/cd.yml)

This app can be used to create a MakerX email signature.

[![Screenshot](./makerx-screenshot.png)](https://signatures.makerx.tech)

### Looks great, how can I use it for my company?

`src/constants` Contains brand specific information. Edit fields in there to rebrand the website.

## Licence

Forked from Telstra Purple

MIT, See: [LICENSE](https://github.com/Readify/telstra-purple-signatures/blob/master/LICENSE)

## Getting Started

### Hosting

We host this webpage using [GitHub Pages](https://pages.github.com/) and a custom domain [https://signatures.makerx.tech](https://signatures.makerx.tech) with HTTPS enforced.

Check out the `CI.yml` and `CD.yml` files for how this is completed using GitHub Actions.

### Visual Studio Code

`launch.json` support is provided to launch this project by hitting F5.

### Scripts

This project is built with [Vite](https://vite.dev/) and tested with [Vitest](https://vitest.dev/) and [Playwright](https://playwright.dev/). It uses Node 24 (see `.nvmrc`).

#### `npm start`

Starts the Vite dev server at http://localhost:5173 by default. Edits reload in the browser.

#### `npm test`

Runs the Vitest unit and component tests in watch mode. `npx vitest run` runs them once.

#### `npm run lint`

Checks the code with ESLint. `npm run lint:fix` also fixes what it can.

#### `npm run build`

Builds the app for production to the `build` folder.

#### `npm run preview`

Serves the `build` folder locally.

#### `npm run test:e2e`

Runs the Playwright tests in Chromium against the `build` folder served by `vite preview`. Run `npm run build` first, and install the browser once with `npx playwright install chromium`. The server uses port 4173; set `E2E_PORT` to use another.

#### Golden files

The tests compare what the app copies to the clipboard with golden files in `src/__goldens__/` and `e2e/__goldens__/`. When a change to the copied output is intended, re-record only the affected goldens and review the diff:

```sh
UPDATE_GOLDENS=1 npx vitest run -t '<test name>'
UPDATE_GOLDENS=1 npm run test:e2e -- -g '<test name>'
```

### Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
