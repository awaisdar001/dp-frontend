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
    'no-unused-vars': "off",
    'no-undef': "off",
    "no-unused-expressions": "off",
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
