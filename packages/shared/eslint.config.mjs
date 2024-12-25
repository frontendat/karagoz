import rootEslintConfig from '../../eslint.config.mjs'

export default [
  ...rootEslintConfig,
  {
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
      },
    },

    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
