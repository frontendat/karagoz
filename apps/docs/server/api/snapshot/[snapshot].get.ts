import { DirectoryNode, FileSystemTree } from '@webcontainer/api'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const snapshotName = getRouterParam(event, 'snapshot')

  // useStorage to read assets since server functions do not have persistent access to the file system
  const assets = useStorage('assets:server')
  // the base key of the snapshot
  const base = `snapshots:${snapshotName}`
  // get all the storage keys starting with the snapshot base key
  const keys = await assets.getKeys(base)
  // create response object
  const tree: FileSystemTree = keys.length
    ? // empty tree to be filled
      {}
    : // fallback when requested snapshot is not found
      {
        'index.html': {
          file: {
            contents: `<h3>Could not find snapshot "${snapshotName}" :(</h3>`,
          },
        },
        'package.json': {
          file: {
            contents:
              '{ "dependencies": { "serve": "latest" }, "scripts": { "start": "serve ." } }',
          },
        },
      }

  await Promise.all(
    keys.map(async (key) => {
      // split key to get path parts
      const path = key.split(':').slice(2)
      // start traversing from tree root
      let branch = tree
      for (let i = 0; i < path.length; i++) {
        // get or create current branch
        branch[path[i]] =
          branch[path[i]] ??
          // last path part is the file, otherwise it is a directory
          (i === path.length - 1
            ? {
                file: {
                  contents: key.endsWith('.json')
                    ? JSON.stringify(await assets.getItem(key))
                    : await assets.getItem(key),
                },
              }
            : { directory: {} })
        // drill down to the next path part
        branch = (branch[path[i]] as DirectoryNode).directory
      }
    }),
  )
  return tree
})
