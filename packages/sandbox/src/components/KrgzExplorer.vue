<script setup lang="ts">
import type { DirEnt, WebContainer } from '@webcontainer/api'
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
  <ul v-if="dirEnts" class="krgz-explorer">
    <KrgzExplorerEntity
      v-for="entity in dirEnts"
      :key="entity.name"
      :depth="depth"
      :path="path"
      :entity="entity"
      @file-click="sandbox.fileOpen($event)"
    ></KrgzExplorerEntity>
  </ul>
</template>

<style>
@layer karagoz {
  .krgz-explorer {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
}
</style>
