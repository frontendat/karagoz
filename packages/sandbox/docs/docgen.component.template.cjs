const { DocgenCLIConfig, RenderedUsage } = require('vue-docgen-cli')
const { ComponentDoc } = require('vue-docgen-api')
const {
  ContentAndDependencies,
  SubTemplateOptions,
} = require('vue-docgen-cli/lib/compileTemplates')
const { resolve } = require('path')

const root = resolve(__dirname, '../../..')

/**
 * @param {string[]} paths
 * @return {string[]}
 */
const getRelativePaths = (paths) => paths.map((p) => p.split(root).pop().substring(1))

/**
 * @param {string[]} paths
 * @return {string[]}
 */
const getSourceLinks = (paths) => getRelativePaths(paths).map((p) => `[${p}](https://github.com/frontendat/karagoz/blob/main/${p})`)

/**
 *
 * @param {RenderedUsage} renderedUsage
 * @param {ComponentDoc} doc
 * @param {DocgenCLIConfig} config
 * @param {string} fileName
 * @param {ContentAndDependencies[]} requiresMd
 * @param {SubTemplateOptions} subTemplateOptions
 */
module.exports = function component(
  renderedUsage, // props, events, methods and slots documentation rendered
  doc, // the object returned by vue-docgen-api
  config, // the local config, useful to know the context
  fileName, // the name of the current file in the doc (to explain how to import it)
  requiresMd, // a list of all the documentation files
  // attached to the component documented. It includes documentation of subcomponents
  subTemplateOptions, // are we documenting
) {
  // a sub-component or does the current component have subcomponents
  const { displayName, description, docsBlocks } = doc
  return `
  # ${displayName}

  ${description ? '> ' + description : ''}

  ${renderedUsage.props}
  ${renderedUsage.methods}
  ${renderedUsage.events}
  ${renderedUsage.slots}
  ${docsBlocks ? '---\n' + docsBlocks.join('\n---\n') : ''}
  
  ## Defined in
  ${getSourceLinks(doc.sourceFiles)}
  `
}
