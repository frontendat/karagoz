import { DirEnt, type IFSWatcher } from '@webcontainer/api'
import { MaybeRefOrGetter, ref, toValue, watch } from 'vue'

import { readDirEnts } from '../utils/readDirEnts.ts'
import { useSandbox } from './useSandbox.ts'

export const useSandboxReadDir = (
  pathRefOrGetter: MaybeRefOrGetter<string>,
) => {
  const sandbox = useSandbox()
  const dirEnts = ref<DirEnt<string>[]>([])
  const watcher = ref<IFSWatcher>()

  watch(
    () => (sandbox.container.value ? toValue(pathRefOrGetter) : undefined),
    async (path) => {
      if (path === undefined) return // Also ensures that container instance exists.
      const container = sandbox.container.value!
      // Close old watcher if one exists
      watcher.value?.close()
      // Start watching current path to read directory entities whenever a change occurs
      watcher.value = container.fs.watch(
        path,
        async () => (dirEnts.value = await readDirEnts(container, path)),
      )
      // Read directory entities right away to create initial list
      dirEnts.value = await readDirEnts(container, path)

      // Cleanup
      return () => watcher.value?.close()
    },
    { immediate: true },
  )

  return { dirEnts }
}
