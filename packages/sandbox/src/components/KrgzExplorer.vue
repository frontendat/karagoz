<script setup lang="ts">
import type { DirEnt, WebContainer } from '@webcontainer/api'
import { onMounted, onUnmounted, ref } from 'vue'

import { useSharedWebContainer } from '../composables/useSharedWebContainer.ts'
import KrgzExplorerEntity from './KrgzExplorerEntity.vue'

const props = withDefaults(
  defineProps<{
    path?: string
  }>(),
  { path: '.' },
)

const webContainer = useSharedWebContainer()
const dirEnts = ref<DirEnt<string>[]>([])

const readDirEnts = async ({ container }: { container: WebContainer }) => {
  dirEnts.value = await container.fs.readdir(props.path, {
    withFileTypes: true,
  })
}

onMounted(() => {
  webContainer.on('fileTreeChange', readDirEnts)
  webContainer.on('init', readDirEnts)
  webContainer.ensureInstance().then((container) => readDirEnts({ container }))
})

onUnmounted(() => {
  webContainer.off('fileTreeChange', readDirEnts)
  webContainer.off('init', readDirEnts)
})
</script>

<template>
  <ul v-if="dirEnts" class="krgz-explorer">
    <KrgzExplorerEntity
      v-for="entity in dirEnts"
      :key="entity.name"
      :path="path"
      :entity="entity"
    ></KrgzExplorerEntity>
  </ul>
</template>

<style>
@layer karagoz {
  .krgz-explorer {
    list-style-type: none;
    padding-inline-start: 0.6rem;
  }
}
</style>
