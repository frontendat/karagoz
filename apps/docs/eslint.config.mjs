import rootEslintConfig from '../../eslint.config.mjs'

export default [
  ...rootEslintConfig,
  {
    languageOptions: {
      globals: {
        defineNuxtConfig: true,
      },

      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
]
