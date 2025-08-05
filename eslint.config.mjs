import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import babelParser from '@babel/eslint-parser';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import path from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';

// Setup FlatCompat for legacy configs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default defineConfig([
  // Ignore patterns
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '.stryker-tmp/',
      'coverage/',
      'src/env-config.js',
      'webpack.config.js',
      'webpack.common.js',
      'webpack.dev.js',
      'webpack.prod.js',
      'jest.config.js',
      'env.sh',
      'eslint.config.mjs',
    ],
  },

  // JS/JSX base config
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // TypeScript config
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // ESLint recommended
  js.configs.recommended,

  // TypeScript recommended
  tseslint.configs.recommended,

  // React recommended
  pluginReact.configs.flat.recommended,

  // Airbnb config (legacy, via FlatCompat)
  ...compat.extends('airbnb'),

  // React Hooks recommended
  {
    plugins: { 'react-hooks': pluginReactHooks },
    rules: pluginReactHooks.configs.recommended.rules,
  },

  // Custom rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/react-in-jsx-scope': 'warn',
      'no-console': 'warn',
      'spaced-comment': [
        'warn',
        'always',
        { line: { markers: ['/'] }, block: { balanced: true } },
      ],
      'no-empty': ['warn', { allowEmptyCatch: false }],
      'no-unused-vars': ['error', { args: 'none' }],
      'react/function-component-definition': 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': [
        1,
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'react/jsx-no-bind': ['warn', { allowArrowFunctions: true }],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
    },
  },

  // Prettier integration (legacy, via FlatCompat)
  ...compat.extends('plugin:prettier/recommended'),
  {
    rules: {
      'prettier/prettier': 'warn',
    },
  },
]);
