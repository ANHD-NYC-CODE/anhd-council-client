module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {
    require: true,
    process: true,
    module: true,
    it: true,
  },
  settings: {
    react: {
      version: '16.18',
    },
  },
  rules: {
    'no-debugger': ['warn'],
    'no-console': 0,
    quotes: ['warn', 'single', { avoidEscape: true }],
    semi: ['warn', 'never'],
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/no-unescaped-entities': [1, { forbid: [] }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended'],
  plugins: ['react', 'jest', 'jsx-a11y'],
}
