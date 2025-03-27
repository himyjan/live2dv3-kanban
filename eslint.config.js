import eslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    plugins: {
      '@typescript-eslint': eslintPlugin,
    },
    languageOptions: {
      parser: eslintParser, // Use `languageOptions.parser` instead of `parser`
      sourceType: 'module',
      ecmaVersion: 2020,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // 'prettier': ['error', { singleQuote: true, trailingComma: 'none', arrowParens: 'avoid' }],
      camelcase: 'warn',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
  prettierConfig, // Prettier configuration
];
