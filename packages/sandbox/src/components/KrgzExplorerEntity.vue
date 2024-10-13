<script setup lang="ts">
import type { DirEnt } from '@webcontainer/api'
import { computed, ref } from 'vue'

import KrgzExplorer from './KrgzExplorer.vue'

const props = defineProps<{
  depth: number
  entity: DirEnt<string>
  path: string
}>()

const emit = defineEmits<{
  (e: 'fileClick', path: string): void
}>()

const isExpanded = ref(false)

const toggleClass = computed(() => {
  if (props.entity.isFile()) {
    return 'as-file'
  }
  return isExpanded.value ? 'as-expanded' : 'as-collapsed'
})

const iconClass = computed(() =>
  props.entity.isFile() ? 'as-file' : 'as-directory',
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
    <a class="krgz-explorer-entity-header" @click="onClick">
      <span class="krgz-explorer-entity-toggle" :class="toggleClass"></span>
      <span class="krgz-explorer-entity-icon" :class="iconClass"></span>
      <span class="krgz-explorer-entity-name" :title="entity.name">{{
        entity.name
      }}</span>
    </a>
    <KrgzExplorer
      v-if="isExpanded && entity.isDirectory()"
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
  .krgz-explorer-entity-header:focus,
  .krgz-explorer-entity-header:hover {
    background: #eee;
  }

  .krgz-explorer-entity-toggle {
    box-sizing: border-box;
    height: 4px;
    width: 4px;
  }
  .krgz-explorer-entity-toggle:where(:not(.as-file)) {
    border: solid #000;
    border-width: 1px 1px 0 0;
    transform-origin: center center;
  }
  .krgz-explorer-entity-toggle:where(.as-collapsed) {
    transform: rotateZ(45deg);
  }
  .krgz-explorer-entity-toggle:where(.as-expanded) {
    transform: rotateZ(135deg);
  }

  .krgz-explorer-entity-icon:where(.as-file)::before {
    box-sizing: border-box;
    content: '📄';
  }
  .krgz-explorer-entity-icon:where(.as-directory)::before {
    content: '🗂️';
  }

  .krgz-explorer-entity-name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
