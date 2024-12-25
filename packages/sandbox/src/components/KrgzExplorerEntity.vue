<script setup lang="ts">
import type { DirEnt } from '@webcontainer/api'
import { File, Folder, FolderOpen } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

import { useSandbox } from '../composables'
import KrgzExplorer from './KrgzExplorer.vue'

const props = defineProps<{
  depth: number
  entity: DirEnt<string>
  path: string
}>()

const emit = defineEmits<{
  (e: 'fileClick', path: string): void
}>()

const { explorer, editorTabs } = useSandbox()
const isRendered = ref(false)
const isExpanded = ref(false)

const entityPath = computed(() => `${props.path || '.'}/${props.entity.name}`)
const isHidden = computed(() => explorer.hidden.value.ignores(entityPath.value))
const isReadonly = computed(() =>
  explorer.readonly.value.ignores(entityPath.value),
)
const isCurrentEditorTab = computed(
  () =>
    props.entity.isFile() && editorTabs.current.value?.id === entityPath.value,
)

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

watch(
  () => [editorTabs.current.value?.id ?? '', entityPath.value],
  ([editorPath, entityPath]) => {
    if (
      editorPath.startsWith(entityPath) &&
      !isExpanded.value &&
      props.entity.isDirectory()
    ) {
      onClick()
    }
  },
)

const onClick = () => {
  if (props.entity.isFile()) {
    emit('fileClick', `${entityPath.value}`)
  } else {
    isExpanded.value = !isExpanded.value
  }
}
</script>

<template>
  <li
    v-if="!isHidden"
    class="krgz-explorer-entity"
    :style="{ '--krgz-depth': depth }"
  >
    <a
      class="krgz-explorer-entity-header hover:bg-secondary"
      :class="{ 'font-bold': isCurrentEditorTab }"
      @click="onClick"
    >
      <component
        :is="entity.isFile() ? File : isExpanded ? FolderOpen : Folder"
        class="krgz-explorer-entity-icon size-3.5"
        :class="{ 'opacity-50': isReadonly }"
      />
      <span
        class="krgz-explorer-entity-name"
        :class="{ 'italic opacity-50': isReadonly }"
        :title="entity.name"
      >
        {{ entity.name }}
      </span>
    </a>
    <KrgzExplorer
      v-if="isRendered && entity.isDirectory()"
      v-show="isExpanded"
      :depth="depth + 1"
      :path="entityPath"
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
