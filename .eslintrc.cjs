/** @type {import('eslint').Linter.Config} */

const config = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'react-hooks', 'import', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: '16.14.0',
    },
  },
  rules: {
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    camelcase: 'off',
    'comma-dangle': 'off',
    'func-call-spacing': 'off',
    'import/no-absolute-path': 'off',
    'import/order': ['error', { groups: ['builtin', 'external', 'internal'] }],
    'import/un-resolved': 'off',
    indent: 'off',
    'multiline-ternary': 'off',
    'no-console': 'warn',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'no-useless-escape': 'off',
    'prefer-regex-literals': 'off',
    'react/no-unknown-property': 'error',
    'react/prop-types': 'off',
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'react/react-in-jsx-scope': 'off',
    'space-before-function-paren': 'off',
  },
}

module.exports = config
