module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'babel-eslint',
  plugins: ['simple-import-sort', 'import'],
  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-unused-expressions': 'off',
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'no-template-curly-in-string': 'off',
    'react/prop-types': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
};
