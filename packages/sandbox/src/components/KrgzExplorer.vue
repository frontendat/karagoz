<script setup lang="ts">
import { LoadingIndicator } from '@karagoz/shared'
import { DirEnt, type IFSWatcher } from '@webcontainer/api'
import { ref, watch } from 'vue'

import { useSandbox } from '../composables'
import { readDirEnts } from '../utils/readDirEnts.ts'
import KrgzExplorerEntity from './KrgzExplorerEntity.vue'

const props = withDefaults(
  defineProps<{
    depth?: number
    path?: string
  }>(),
  { depth: 1, path: '' },
)

const sandbox = useSandbox()
const dirEnts = ref<DirEnt<string>[]>([])
const watcher = ref<IFSWatcher>()

watch(
  () => (sandbox.container.value ? props.path : undefined),
  async (path) => {
    if (path === undefined) return // Also ensures that container instance exists.
    const container = sandbox.container.value!
    // Close old watcher if one exists
    watcher.value?.close()
    // Start watching current path to read directory entities whenever a change occurs
    watcher.value = container.fs.watch(
      props.path,
      async () => (dirEnts.value = await readDirEnts(container, path)),
    )
    // Read directory entities right away to create initial list
    dirEnts.value = await readDirEnts(container, path)

    // Cleanup
    return () => watcher.value?.close()
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <ul v-if="dirEnts.length" class="text-xs select-none">
      <KrgzExplorerEntity
        v-for="entity in dirEnts"
        :key="entity.name"
        :depth="depth"
        :path="path"
        :entity="entity"
        @file-click="sandbox.editorTabs.open($event)"
      ></KrgzExplorerEntity>
    </ul>
    <LoadingIndicator
      v-if="depth === 1 && !dirEnts.length"
      label="Files loading..."
    />
  </div>
</template>
