import config from '@karagoz/shared/dist/config/tailwind.config.js'

module.exports = {
  ...config,
  plugins: [...config.plugins, require('@tailwindcss/typography')],
}
