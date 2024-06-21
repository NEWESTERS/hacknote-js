/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    '@rushstack/eslint-config/profile/node-trusted-tool',
    'plugin:astro/recommended',
    'plugin:react-hooks/recommended',
    'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended-legacy'
  ],
  plugins: ['import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  rules: {
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          props: true,
          Props: true,
          ref: true,
          Ref: true,
          Dev: true
        }
      }
    ],
    'unicorn/filename-case': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'no-console': 'error',
    '@typescript-eslint/naming-convention': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal'],
        'newlines-between': 'always'
      }
    ],
    '@rushstack/typedef-var': 'off',
    'unicorn/no-null': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'unicorn/no-useless-undefined': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    }
  ]
};
