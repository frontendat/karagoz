<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@karagoz/shared'
import { X } from 'lucide-vue-next'
import {
  type ComponentPublicInstance,
  computed,
  nextTick,
  ref,
  watch,
} from 'vue'

import { useKaragozSandbox } from '../composables/useKaragozSandbox.ts'
import KrgzProcess from './KrgzProcess.vue'

const { processTabs } = useKaragozSandbox()
const tabs = computed(() => processTabs.tabs.value)
const tabList = ref<ComponentPublicInstance<InstanceType<typeof TabsList>>>()

watch(
  () => processTabs.current.value,
  async () => {
    await nextTick()
    // bring active tab trigger into view
    tabList.value?.$el?.querySelector('[data-active="true"]')?.scrollIntoView()
  },
)
</script>

<template>
  <Tabs
    v-if="processTabs.tabs.value.length"
    class="h-full flex flex-col"
    :model-value="processTabs.current.value?.id"
    @update:model-value="processTabs.open($event)"
  >
    <div class="max-w-full min-h-min overflow-x-auto tabs">
      <TabsList ref="tabList">
        <TabsTrigger
          v-for="tab in processTabs.tabs.value"
          :key="tab.id"
          class="text-xs"
          :value="tab.id"
        >
          <div class="flex gap-2 items-center">
            <span :title="tab.label">
              {{ tab.label }}
            </span>
            <X class="h-4 w-4" @click.stop="processTabs.close(tab.id)"></X>
          </div>
        </TabsTrigger>
      </TabsList>
    </div>
    <TabsContent
      class="flex-grow max-h-full mt-0 overflow-hidden"
      :value="processTabs.current.value?.id ?? ''"
    >
      <KeepAlive v-for="tab in tabs" :key="tab.id">
        <KrgzProcess
          v-if="tab.id === processTabs.current.value?.id"
          :tab="tab"
        />
      </KeepAlive>
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
