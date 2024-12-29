<script setup lang="ts">
import { useSandbox } from '../composables'
import { useSandboxReadDir } from '../composables/useSandboxReadDir.ts'
import KrgzExplorerEntity from './KrgzExplorerEntity.vue'

/**
 * Renders the content of a subdirectory using `KrgzExplorerEntity`.
 */
defineOptions({})

const props = withDefaults(
  defineProps<{
    /**
     * Depth of current path. Passed as-is to `KrgzExplorerEntity`to calculate padding.
     */
    depth?: number
    /**
     * The path the directory exists under. Passed as-is to `KrgzExplorerEntity`.
     */
    path?: string
  }>(),
  { depth: 1, path: '' },
)

const sandbox = useSandbox()
const { dirEnts } = useSandboxReadDir(props.path)
</script>

<template>
  <ul v-if="dirEnts.length" class="text-xs select-none">
    <KrgzExplorerEntity
      v-for="entity in dirEnts"
      :key="entity.name"
      :depth="depth"
      :path="path"
      :entity="entity"
      @file-click="sandbox.editorTabs.open($event)"
    ></KrgzExplorerEntity>
  </ul>
</template>
