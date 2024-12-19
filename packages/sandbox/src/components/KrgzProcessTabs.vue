<script setup lang="ts">
import {
  Button,
  LoadingIndicator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@karagoz/shared'
import {
  Play,
  Plus,
  RotateCw,
  SquareX,
  TerminalSquare,
  X,
} from 'lucide-vue-next'
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

const { options, processTabs } = useSandbox()
const tabs = computed(() => processTabs.tabs.value)
const tabList = ref<ComponentPublicInstance<InstanceType<typeof TabsList>>>()

const tabsToRender = computed(() =>
  tabs.value.filter(
    ({ context }) =>
      !context?.isHidden &&
      ((props.mode === 'process' && !context?.isTerminal) ||
        (props.mode === 'terminal' && context?.isTerminal)),
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

const onTabChange = (value: string) => {
  if (value === 'CREATE_NEW_PROCESS') {
    options.processStarters.value.terminal?.()
  } else {
    processTabs.open(value)
  }
}
</script>

<template>
  <Tabs
    v-if="tabsToRender.length"
    class="h-full flex flex-col"
    :model-value="current?.id"
    @update:model-value="onTabChange"
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
            <RotateCw
              v-if="!tab.context?.isTerminal && tab.context?.canRestart"
              class="h-4 w-4"
              @click.stop="processTabs.restart(tab.id)"
            ></RotateCw>
            <SquareX
              v-if="
                !tab.context?.isTerminal &&
                tab.context?.canStop &&
                tab.context?.exitCode === undefined
              "
              class="h-4 w-4"
              @click.stop="processTabs.kill(tab.id)"
            ></SquareX>
            <X
              v-if="!tab.context?.suppressClose"
              class="h-4 w-4"
              @click.stop="processTabs.close(tab.id)"
            ></X>
          </div>
        </TabsTrigger>
        <TabsTrigger
          v-if="
            props.mode === 'terminal' &&
            0 < processTabs.availableTerminals.value
          "
          class="text-xs"
          value="CREATE_NEW_PROCESS"
        >
          <Plus class="h-4 w-4"></Plus>
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
        : processTabs.availableTerminals.value
          ? undefined
          : 'There are no available terminals'
    "
    suppress-spinner
    variant="secondary"
  >
    <Play v-if="mode === 'process'" class="size-12" />
    <template v-if="mode === 'terminal'">
      <TerminalSquare class="size-12" />
      <Button
        v-if="processTabs.availableTerminals.value"
        size="xs"
        variant="link"
        @click="options.processStarters.value.terminal?.()"
        >Open a terminal</Button
      >
    </template>
  </LoadingIndicator>
</template>

<style scoped>
@layer krgz {
  /* For modern browsers */
  .tabs::-webkit-scrollbar {
    width: 0;
    height: 0;
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
