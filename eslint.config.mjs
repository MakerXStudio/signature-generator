import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  {
    ignores: ['build/', 'dist/', 'test-results/', 'playwright-report/'],
  },
  {
    files: ['**/*.{js,jsx,mjs}'],
    ...js.configs.recommended,
  },
  {
    files: ['src/**/*.{js,jsx}'],
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      ...react.configs.flat['jsx-runtime'].languageOptions,
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.flat.recommended.rules,
      // The app does not use prop-types (CRA's react-app config never enabled
      // this rule); prop typing arrives with the TypeScript phase.
      'react/prop-types': 'off',
    },
  },
  {
    files: ['src/**/*.test.{js,jsx}', 'src/setupTests.js', 'src/test/**'],
    languageOptions: {
      globals: globals.vitest,
    },
  },
  {
    files: ['src/test/**', 'e2e/**', '*.config.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
