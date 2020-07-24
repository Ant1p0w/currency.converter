module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'plugin:vue/recommended',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module',
  },
  'plugins': [
    'vue',
  ],
  'rules': {
    'vue/html-closing-bracket-newline': 0,
    'vue/html-indent': [
      'error',
      4,
    ],
  },
};
