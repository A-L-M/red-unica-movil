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

// FlatCompat para configuraciones legado
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default defineConfig([
  // Ignorar patrones
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      'jest.config.js',
      'env.sh',
      'eslint.config.mjs',
    ],
  },

  // Configuracion base JS/JSX
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

  // Configuracion base TS/TSX
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
      'import/resolver': {
        typescript: {
          // Use your tsconfig.json
          project: './tsconfig.json',
        },
      },
    },
  },

  // ESLint reglas recomendadas
  js.configs.recommended,

  // TypeScript reglas recomendadas
  tseslint.configs.recommended,

  // React reglas recomendadas
  pluginReact.configs.flat.recommended,

  // Se extienden las reglas con las de Airbnb (legado)
  ...compat.extends('airbnb'),

  // React Hooks reglas recomendadas
  {
    plugins: { 'react-hooks': pluginReactHooks },
    rules: pluginReactHooks.configs.recommended.rules,
  },

  // Reglas personalizadas
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
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-unresolved': [
        'error',
        {
          ignore: ['.ts', '.tsx'],
        },
      ],
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'react/jsx-no-bind': ['warn', { allowArrowFunctions: true }],
      'no-restricted-exports': ['off'],
      'import/prefer-default-export': 'off',
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

  // Integracion Prettier (legado con FlatCompat)
  ...compat.extends('plugin:prettier/recommended'),
  {
    rules: {
      'prettier/prettier': 'warn',
    },
  },
]);
