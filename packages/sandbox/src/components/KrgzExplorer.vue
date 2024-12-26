<script setup lang="ts">
import { LoadingIndicator } from '@karagoz/shared'
import { FolderCode } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

import { useSandbox } from '../composables'
import { useSandboxReadDir } from '../composables/useSandboxReadDir.ts'
import KrgzExplorerEntity from './KrgzExplorerEntity.vue'

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
      label="Files loading..."
      variant="secondary"
    >
      <FolderCode class="size-12" />
    </LoadingIndicator>
  </div>
</template>
