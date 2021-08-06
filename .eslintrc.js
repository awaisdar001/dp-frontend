module.exports = {
  'ecmaFeatures': {
    'modules': true,
    'spread': true,
    'restParams': true
  },
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'rules': {
    'no-unused-vars': 2,
    'no-undef': 2,
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'no-template-curly-in-string': 'off',
    'jsx-a11y/label-has-associated-control': [2, {
      'controlComponents': ['Input'],
    }],
  },
  'parserOptions': {
    'sourceType': 'module'
  }

}


