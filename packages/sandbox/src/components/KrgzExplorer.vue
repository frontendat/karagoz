<script setup lang="ts">
import { LoadingIndicator } from '@karagoz/shared'
import { DirEnt, type IFSWatcher } from '@webcontainer/api'
import { ref, watch } from 'vue'

import { useKaragozSandbox } from '../composables/useKaragozSandbox.ts'
import { readDirEnts } from '../utils/readDirEnts.ts'
import KrgzExplorerEntity from './KrgzExplorerEntity.vue'

const props = withDefaults(
  defineProps<{
    depth?: number
    path?: string
  }>(),
  { depth: 1, path: '.' },
)

const sandbox = useKaragozSandbox()
const container = sandbox.container()
const dirEnts = ref<DirEnt<string>[]>([])
const watcher = ref<IFSWatcher>()

watch(
  () => props.path,
  async (value) => {
    // Close old watcher if one exists
    watcher.value?.close()
    // Start watching current path to read directory entities whenever a change occurs
    watcher.value = container.fs.watch(
      props.path,
      async () => (dirEnts.value = await readDirEnts(container, value)),
    )
    // Read directory entities right away to create initial list
    dirEnts.value = await readDirEnts(container, value)

    // Cleanup
    return () => watcher.value?.close()
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <ul v-if="dirEnts.length" class="text-xs">
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
