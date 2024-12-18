<script setup lang="ts">
import type { DirEnt } from '@webcontainer/api'
import { File, Folder, FolderOpen } from 'lucide-vue-next'
import { ref, watch } from 'vue'

import KrgzExplorer from './KrgzExplorer.vue'

const props = defineProps<{
  depth: number
  entity: DirEnt<string>
  path: string
}>()

const emit = defineEmits<{
  (e: 'fileClick', path: string): void
}>()

const isRendered = ref(false)
const isExpanded = ref(false)

const isExpandedWatcher = watch(
  isExpanded,
  (value) => {
    if (value) {
      isRendered.value = true
      isExpandedWatcher()
    }
  },
  { immediate: true },
)

const onClick = () => {
  if (props.entity.isFile()) {
    emit('fileClick', `${props.path}/${props.entity.name}`)
  } else {
    isExpanded.value = !isExpanded.value
  }
}
</script>

<template>
  <li class="krgz-explorer-entity" :style="{ '--krgz-depth': depth }">
    <a class="krgz-explorer-entity-header hover:bg-secondary" @click="onClick">
      <component
        :is="entity.isFile() ? File : isExpanded ? FolderOpen : Folder"
        class="size-3.5"
      />
      <span class="krgz-explorer-entity-name" :title="entity.name">{{
        entity.name
      }}</span>
    </a>
    <KrgzExplorer
      v-if="isRendered && entity.isDirectory()"
      v-show="isExpanded"
      :depth="depth + 1"
      :path="`${path}/${entity.name}`"
    ></KrgzExplorer>
  </li>
</template>

<style>
@layer karagoz {
  .krgz-explorer-entity-header {
    align-items: center;
    display: flex;
    gap: 0.5rem;
    padding-inline-start: calc(0.6rem * var(--krgz-depth));
    cursor: pointer;
  }

  .krgz-explorer-entity-name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
