import type { WebContainer } from '@webcontainer/api'

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
