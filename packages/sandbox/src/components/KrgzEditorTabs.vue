<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@karagoz/shared'
import { X } from 'lucide-vue-next'
import { type ComponentPublicInstance, nextTick, ref, watch } from 'vue'

import { useKaragozSandbox } from '../composables/useKaragozSandbox.ts'
import KrgzEditor from './KrgzEditor.vue'

const sandbox = useKaragozSandbox()
const tabList = ref<ComponentPublicInstance<InstanceType<typeof TabsList>>>()

watch(
  () => sandbox.latestTab.value,
  async () => {
    await nextTick()
    // bring active tab trigger into view
    tabList.value?.$el?.querySelector('[data-active="true"]')?.scrollIntoView()
  },
)
</script>

<template>
  <Tabs
    v-if="sandbox.tabs.value.length"
    class="h-full"
    :model-value="sandbox.latestTab.value?.path"
    @update:model-value="sandbox.fileOpen($event)"
  >
    <div class="max-w-full overflow-x-auto tabs">
      <TabsList ref="tabList">
        <TabsTrigger
          v-for="tab in sandbox.tabs.value"
          :key="tab.path"
          class="text-xs"
          :value="tab.path"
        >
          <div class="flex gap-2 items-center">
            <span :title="tab.path">
              {{ tab.path.split('/').at(-1) }}
            </span>
            <X class="h-4 w-4" @click.stop="sandbox.fileClose(tab.path)"></X>
          </div>
        </TabsTrigger>
      </TabsList>
    </div>
    <TabsContent class="h-full" :value="sandbox.latestTab.value?.path">
      <KrgzEditor class="h-full w-full" :path="sandbox.latestTab.value?.path" />
    </TabsContent>
  </Tabs>
  <div v-else>Please select a file</div>
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
