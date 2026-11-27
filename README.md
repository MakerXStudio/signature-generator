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

### Prerequisites

Node.js at the version in `.nvmrc` (24). With [nvm](https://github.com/nvm-sh/nvm), run `nvm use`.

Install dependencies with:

```sh
npm ci
```

### Scripts

| Script                 | What it does                                                                  |
| ---------------------- | ----------------------------------------------------------------------------- |
| `npm run dev`          | Starts the Vite dev server at [http://localhost:5173](http://localhost:5173). |
| `npm start`            | Same as `npm run dev`.                                                        |
| `npm run build`        | Builds the app for production into `build/` (does not type-check).            |
| `npm run preview`      | Serves the production build from `build/` locally.                            |
| `npm test`             | Runs the Vitest tests in watch mode.                                          |
| `npm run test:ci`      | Runs the Vitest tests once.                                                   |
| `npm run typecheck`    | Type-checks the project with `tsc -b`.                                        |
| `npm run lint`         | Lints with ESLint.                                                            |
| `npm run lint:fix`     | Lints with ESLint and applies automatic fixes.                                |
| `npm run format`       | Formats the project with Prettier.                                            |
| `npm run format:check` | Checks the project's formatting with Prettier.                                |

### Clipboard fixtures

`src/__fixtures__/clipboard` holds the exact text and HTML that each of the four copy buttons selects for copying (captured in jsdom), for an empty, a filled and an all-optional-fields profile. `src/clipboard.test.tsx` compares the copy output against them, so any change to what gets copied fails the tests. These files are what people paste into their email client: do not update them (for example with `vitest -u`) without checking that the new signature output is intended and still pastes correctly. Prettier ignores this folder so formatting never rewrites them.

### Hosting

We host this webpage using [GitHub Pages](https://pages.github.com/) and a custom domain [https://signatures.makerx.tech](https://signatures.makerx.tech) with HTTPS enforced.

Check out `.github/workflows/ci.yml` and `.github/workflows/cd.yml` for how this is completed using GitHub Actions.

### Visual Studio Code

`launch.json` support is provided to launch this project by hitting F5.
