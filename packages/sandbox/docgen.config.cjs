const { join, resolve } = require('path')

/** @type import("vue-docgen-cli").DocgenCLIConfig */
module.exports = {
  components:
      '**/(KrgzEditorTabs|KrgzExplorer|KrgzPreview|KrgzProcessTabs|KrgzSandbox).(vue|ts)',
  componentsRoot: 'src/components',
  defaultExamples: true,
  docsBranch: 'dev',
  docsFolder: 'examples/docgen',
  docsRepo: 'vue-styleguidist/vue-styleguidist',
  getDestFile: (file, config) =>
      join(
          config.outDir,
          file.replace(
              /[A-Z]+(?![a-z])|[A-Z]/g,
              ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
          ),
      ).replace(/\.vue$/, '.md'),
  outDir: resolve(
      __dirname,
      '../../apps/docs/content/en/sandbox/4.api-reference',
  ),
  outFile: 'components.md'
}
