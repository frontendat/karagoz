<script setup lang="ts">
import type { DirEnt } from '@webcontainer/api'
import { computed, ref } from 'vue'

import KrgzExplorer from './KrgzExplorer.vue'

const props = defineProps<{
  entity: DirEnt<string>
  path: string
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
</script>

<template>
  <li class="krgz-explorer-entity">
    <div class="krgz-explorer-entity-header">
      <span
        class="krgz-explorer-entity-toggle"
        :class="toggleClass"
        @click="isExpanded = !isExpanded"
      ></span>
      <span class="krgz-explorer-entity-icon" :class="iconClass"></span>
      <a>{{ entity.name }}</a>
    </div>
    <KrgzExplorer
      v-if="isExpanded && entity.isDirectory()"
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
}
</style>
