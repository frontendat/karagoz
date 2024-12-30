const { join, resolve } = require('path')

const componentsToDocument = ['KrgzEditorTabs','KrgzExplorer','KrgzPreview','KrgzProcessTabs','KrgzSandbox']

/** @type import("vue-docgen-cli").DocgenCLIConfig */
module.exports = {
  components:
      `**/(${componentsToDocument.join('|')}).(vue|ts)`,
  componentsRoot: 'src/components',
  defaultExamples: true,
  outDir: resolve(
      __dirname,
      '../../../apps/docs/content/en/sandbox/4.api-reference/components',
  ),
  templates: {
    component: require('./docgen.component.template.cjs'),
  },
}
