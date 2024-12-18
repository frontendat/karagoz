<script setup lang="ts">
import {
  LoadingIndicator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@karagoz/shared'
import { Play, TerminalSquare, X } from 'lucide-vue-next'
import {
  type ComponentPublicInstance,
  computed,
  nextTick,
  ref,
  watch,
} from 'vue'

import { useSandbox } from '../composables/useSandbox.ts'
import KrgzProcess from './KrgzProcess.vue'

const props = defineProps<{
  mode: 'process' | 'terminal'
}>()

const { processTabs } = useSandbox()
const tabs = computed(() => processTabs.tabs.value)
const tabList = ref<ComponentPublicInstance<InstanceType<typeof TabsList>>>()

const tabsToRender = computed(() =>
  tabs.value.filter(
    ({ context }) =>
      (props.mode === 'process' && !context?.isTerminal) ||
      (props.mode === 'terminal' && context?.isTerminal),
  ),
)

const currentOrder = computed(() =>
  tabsToRender.value.length
    ? Math.max.apply(
        undefined,
        tabsToRender.value.map(({ order }) => order),
      )
    : -1,
)

const current = computed(() =>
  tabsToRender.value.find(({ order }) => order === currentOrder.value),
)

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
    v-if="tabsToRender.length"
    class="h-full flex flex-col"
    :model-value="current?.id"
    @update:model-value="processTabs.open($event)"
  >
    <div class="max-w-full min-h-min overflow-x-auto tabs">
      <TabsList ref="tabList">
        <TabsTrigger
          v-for="tab in tabsToRender"
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
      :value="current?.id ?? ''"
    >
      <template v-for="tab in tabsToRender" :key="tab.id">
        <KrgzProcess v-if="tab.id === current?.id" :tab="tab" />
      </template>
    </TabsContent>
  </Tabs>
  <LoadingIndicator
    v-else
    :label="
      mode === 'process'
        ? 'There are no running processes'
        : 'There are no available terminals'
    "
    suppress-spinner
    variant="secondary"
  >
    <Play v-if="mode === 'process'" class="size-12" />
    <TerminalSquare v-if="mode === 'terminal'" class="size-12" />
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
