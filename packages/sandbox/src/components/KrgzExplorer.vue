<script setup lang="ts">
import { LoadingIndicator } from '@karagoz/shared'
import type { DirEnt, WebContainer } from '@webcontainer/api'
import { FileCode } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'

import { useKaragozSandbox } from '../composables/useKaragozSandbox.ts'
import KrgzExplorerEntity from './KrgzExplorerEntity.vue'

const props = withDefaults(
  defineProps<{
    depth?: number
    path?: string
  }>(),
  { depth: 1, path: '' },
)

const sandbox = useKaragozSandbox()
const dirEnts = ref<DirEnt<string>[]>([])

const readDirEnts = async ({ container }: { container: WebContainer }) => {
  dirEnts.value = (
    await container.fs.readdir(props.path, {
      withFileTypes: true,
    })
  ).sort((a, b) => {
    if (a.isDirectory() && b.isFile()) {
      return -1
    }
    return 0
  })
}

onMounted(() => {
  sandbox.on('fileTreeChange', readDirEnts)
  sandbox.on('init', readDirEnts)
  readDirEnts({ container: sandbox.container() })
})

onUnmounted(() => {
  sandbox.off('fileTreeChange', readDirEnts)
  sandbox.off('init', readDirEnts)
})
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
