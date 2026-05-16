import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import noNegativeZIndex from './eslint-rules/no-negative-z-index.js';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: ['.svelte'],
      },
    },
  },
  {
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        alert: 'readonly',
        sessionStorage: 'readonly',
        localStorage: 'readonly',
        HTMLElement: 'readonly',
        PointerEvent: 'readonly',
        ImageData: 'readonly',
        GeolocationPositionError: 'readonly',
        GeolocationCoordinates: 'readonly',
      },
    },
    plugins: {
      'custom': { rules: { 'no-negative-z-index': noNegativeZIndex } },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'off',
      'no-empty': 'warn',
      'svelte/no-navigation-without-resolve': 'off',
      'svelte/require-each-key': 'off',
      'custom/no-negative-z-index': 'error',
    },
  },
];
