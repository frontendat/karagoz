<script setup lang="ts">
import type { DirEnt } from '@webcontainer/api'
import { File, Folder, FolderOpen } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

import { useSandbox } from '../composables'
import KrgzExplorerSubdir from './KrgzExplorerSubdir.vue'

/**
 * Renders the provided file explorer entity (directory or file).
 *
 * If an entity is hidden (matches one of the patterns in `useSandbox().options.explorer.hidden`, it won't be rendered.
 *
 * If an entity is readonly (matches one of the patterns in `useSandbox().options.explorer.readonly`, then:
 * - If it is a directory, then all of its contents will be treated as readonly, unless another pattern excludes them.
 * - If it es a file, it can be viewed in the editor with a lock icon, but can not be edited.
 */
defineOptions({})

const props = defineProps<{
  /**
   * Depth of current path. Needed to calculate padding.
   */
  depth: number
  /**
   * The entity to be rendered.
   */
  entity: DirEnt<string>
  /**
   * The path the entity exists under.
   */
  path: string
}>()

const emit = defineEmits<{
  /**
   * Emitted when a file node is clicked.
   * @param { string } path file path to open
   */
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
      class="krgz-explorer-entity-header no-underline hover:bg-secondary"
      :class="{ 'font-bold': isCurrentEditorTab }"
      @click="onClick"
    >
      <component
        :is="entity.isFile() ? File : isExpanded ? FolderOpen : Folder"
        class="krgz-explorer-entity-icon min-w-3.5 size-3.5"
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
    <KrgzExplorerSubdir
      v-if="isRendered && entity.isDirectory()"
      v-show="isExpanded"
      :depth="depth + 1"
      :path="entityPath"
    ></KrgzExplorerSubdir>
  </li>
</template>

<style>
.krgz-explorer-entity-header {
  align-items: center;
  display: flex;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  padding-inline-start: calc(0.6rem * var(--krgz-depth));
  cursor: pointer;
}

.krgz-explorer-entity-name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
