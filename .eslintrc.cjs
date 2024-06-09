module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: '18.2'
    }
  },
  plugins: ['react-refresh', 'react'],
  rules: {
    'react-refresh/only-export-components': 'off',
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error"
  },
  ignorePatterns: ['*.test.js', '*.test.jsx']
};