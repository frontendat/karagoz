<script setup lang="ts">
import {
  LoadingIndicator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@karagoz/shared'
import { FileCode, X } from 'lucide-vue-next'
import { type ComponentPublicInstance, nextTick, ref, watch } from 'vue'

import { useSandbox } from '../composables/useSandbox.ts'
import KrgzEditor from './KrgzEditor.vue'

const { editorTabs } = useSandbox()
const tabList = ref<ComponentPublicInstance<InstanceType<typeof TabsList>>>()

watch(
  () => editorTabs.current.value,
  async () => {
    await nextTick()
    // bring active tab trigger into view
    tabList.value?.$el?.querySelector('[data-active="true"]')?.scrollIntoView()
  },
)
</script>

<template>
  <Tabs
    v-if="editorTabs.tabs.value.length"
    class="h-full flex flex-col"
    :model-value="editorTabs.current.value?.id"
    @update:model-value="editorTabs.open($event)"
  >
    <div class="max-w-full min-h-min overflow-x-auto tabs">
      <TabsList ref="tabList">
        <TabsTrigger
          v-for="tab in editorTabs.tabs.value"
          :key="tab.id"
          class="text-xs"
          :value="tab.id"
        >
          <div class="flex gap-2 items-center">
            <span :title="tab.label.substring(1)">
              {{ tab.label.split('/').at(-1) }}
            </span>
            <X class="h-4 w-4" @click.stop="editorTabs.close(tab.id)"></X>
          </div>
        </TabsTrigger>
      </TabsList>
    </div>
    <TabsContent
      class="flex-grow max-h-full mt-0 overflow-hidden"
      :value="editorTabs.current.value?.id ?? ''"
    >
      <KeepAlive>
        <KrgzEditor
          :key="editorTabs.current.value?.id"
          :path="editorTabs.current.value?.id"
          @close="editorTabs.close($event)"
        />
      </KeepAlive>
    </TabsContent>
  </Tabs>
  <LoadingIndicator
    v-else
    label="Open a file to start editing"
    suppress-spinner
    variant="secondary"
  >
    <FileCode class="size-12" />
  </LoadingIndicator>
</template>

<style scoped>
@layer krgz {
  /* For modern browsers */
  .tabs::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .tabs::-webkit-scrollbar-thumb {
    background-color: currentColor;
  }

  .tabs::-webkit-scrollbar-track {
    background: transparent;
  }

  /* For Firefox */
  .tabs* {
    scrollbar-width: thin;
    scrollbar-color: currentColor transparent;
  }
}
</style>
