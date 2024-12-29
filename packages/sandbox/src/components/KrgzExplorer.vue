<script setup lang="ts">
import { LoadingIndicator } from '@karagoz/shared'
import { FolderCode } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

import { useSandbox } from '../composables'
import { useSandboxReadDir } from '../composables/useSandboxReadDir.ts'
import KrgzExplorerEntity from './KrgzExplorerEntity.vue'

/**
 * Renders the file explorer.
 *
 * This component reads and renders the contents of the current working directory, as well as, any expanded directory
 * by recursively using the internal components `KrgzExplorerEntity` and `KrgzExplorerSubdir`.
 *
 * It initially renders a loading indicator until contents of the directory have been read.
 *
 * It takes no props and emits no events since it gets all that it needs to operate by calling `useSandbox()`.
 */
defineOptions({})

const { t } = useI18n()
const sandbox = useSandbox()
const { dirEnts } = useSandboxReadDir('')
</script>

<template>
  <div :dir="t('krgz.dir')">
    <ul v-if="dirEnts.length" class="text-xs select-none">
      <KrgzExplorerEntity
        v-for="entity in dirEnts"
        :key="entity.name"
        path=""
        :depth="1"
        :entity="entity"
        @file-click="sandbox.editorTabs.open($event)"
      ></KrgzExplorerEntity>
    </ul>
    <LoadingIndicator
      v-else
      class="absolute inset-0"
      :label="t('krgz.sandbox.loading.files')"
      variant="secondary"
    >
      <FolderCode class="size-12" />
    </LoadingIndicator>
  </div>
</template>
