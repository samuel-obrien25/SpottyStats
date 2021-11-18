module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'linebreak-style': [0],
    'vue/array-bracket-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'vue/block-spacing': 'error',
    'vue/brace-style': 'error',
    'vue/camelcase': 'error',
    'vue/comma-dangle': 'error',
    'vue/component-definition-name-casing': 'error',
    'vue/component-name-in-template-casing': 'error',
    'vue/key-spacing': 'error',
    'vue/keyword-spacing': 'error',
    'vue/match-component-file-name': 'error',
    'vue/max-len': 'error',
    'vue/no-reserved-component-names': 'error',
    'vue/object-curly-spacing': 'error'
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true,
      },
      rules: {
        'linebreak-style': [0],
      }
    },
  ],

  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/airbnb'
  ]
};
