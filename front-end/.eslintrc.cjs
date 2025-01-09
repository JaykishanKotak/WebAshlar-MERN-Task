/** @type { import("eslint").Linter.Config } */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  ignorePatterns: ['dist/**'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json']
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'import/no-extraneous-dependencies': 0,
    'react/function-component-definition': 0,
    'prettier/prettier': 'off',
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-console': 2,
    'no-param-reassign': 0,
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
    'no-underscore-dangle': 0,
    'react-hooks/exhaustive-deps': 0
  }
}
