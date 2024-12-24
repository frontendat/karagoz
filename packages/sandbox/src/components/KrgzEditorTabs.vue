<script setup lang="ts">
import {
  LoadingIndicator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@karagoz/shared'
import { FileCode, Lock, X } from 'lucide-vue-next'
import {
  type ComponentPublicInstance,
  computed,
  nextTick,
  ref,
  watch,
} from 'vue'

import { useSandbox } from '../composables/useSandbox.ts'
import KrgzEditor from './KrgzEditor.vue'

const { editorTabs, explorer } = useSandbox()
const tabList = ref<ComponentPublicInstance<InstanceType<typeof TabsList>>>()

const readonly = computed(() => explorer.readonly.value)

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
            <span
              :class="{ italic: readonly.ignores(tab.label) }"
              :title="tab.label.substring(1)"
            >
              {{ tab.label.split('/').at(-1) }}
            </span>
            <Lock v-if="readonly.ignores(tab.label)" class="h-4 w-4"></Lock>
            <X
              v-if="!tab.context?.suppressClose"
              class="h-4 w-4"
              @click.stop="editorTabs.close(tab.id)"
            ></X>
          </div>
        </TabsTrigger>
      </TabsList>
    </div>
    <TabsContent
      class="flex-grow max-h-full mt-0 overflow-hidden"
      :value="editorTabs.current.value?.id ?? ''"
    >
      <template v-for="tab in editorTabs.tabs.value" :key="tab.id">
        <KrgzEditor
          v-show="tab.id === editorTabs.current.value?.id"
          :disabled="readonly.ignores(tab.id)"
          :path="tab.id"
          @close="editorTabs.close($event)"
        />
      </template>
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
