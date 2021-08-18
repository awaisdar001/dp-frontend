module.exports = {
  ecmaFeatures: {
    modules: true,
    spread: true,
    restParams: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-unused-vars': 2,
    'no-undef': 2,
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'no-template-curly-in-string': 'off',
    'react/prop-types': 0,
  },
  parserOptions: {
    ecmaVersion: 2020,
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
};
