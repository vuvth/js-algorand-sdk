module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:import/typescript',
    'plugin:jsdoc/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc', 'eslint-plugin-jsdoc'],
  rules: {
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'max-classes-per-file': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        'import/no-commonjs': 'error',
        'tsdoc/syntax': 'warn',
      },
    },
  ],
  ignorePatterns: [
    'dist/',
    'tests/cucumber/features/',
    'tests/cucumber/build/',
    'tests/browser/bundle.*',
  ],
};
