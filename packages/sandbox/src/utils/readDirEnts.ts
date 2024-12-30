import type { WebContainer } from '@webcontainer/api'

/**
 * Read the entities (directories and files) within a directory in the web container.
 * The returned list is sorted by type (directories first then files) then alphabetically.
 * @param container
 * @param path
 */
export const readDirEnts = async (container: WebContainer, path: string) =>
  (
    await container.fs.readdir(path, {
      withFileTypes: true,
    })
  ).sort((a, b) => {
    if (a.isDirectory() && b.isFile()) {
      return -1
    }
    return 0
  })
