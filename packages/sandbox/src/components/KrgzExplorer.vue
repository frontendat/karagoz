<script setup lang="ts">
import type { DirEnt, WebContainer } from '@webcontainer/api'
import { ref } from 'vue'

import { useSharedWebContainer } from '../composables/useSharedWebContainer.ts'

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

webContainer.on('fileTreeChange', readDirEnts)
webContainer.on('init', readDirEnts)
</script>

<template>
  <ul v-if="dirEnts" class="krgz-explorer">
    <li v-for="ent in dirEnts" :key="ent.name">
      <a>{{ ent.name }}</a>
      <KrgzExplorer
        v-if="ent.isDirectory()"
        :path="`${path}/${ent.name}`"
      ></KrgzExplorer>
    </li>
  </ul>
</template>
