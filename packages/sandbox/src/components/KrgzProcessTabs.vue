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
import { useI18n } from 'vue-i18n'

import { useSandbox } from '../composables'
import KrgzProcess from './KrgzProcess.vue'
import KrgzTabIcon from './KrgzTabIcon.vue'

/**
 * Renders a tabbed list of the running processes or open terminals
 * and renders the currently focused one using `KrgzProcess`.
 *
 * This component takes no props and emits no events since it gets all it needs to operate by calling `useSandbox()`.
 */
defineOptions({})

const props = defineProps<{
  /**
   * Whether to render running processes or open terminals.
   */
  mode: 'process' | 'terminal'
}>()

const { t } = useI18n()
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
    tabList.value?.$el
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'start' })
  },
)

const onTabChange = (value: string) => {
  if (value === 'CREATE_NEW_PROCESS') {
    options.process.starters?.terminal?.()
  } else {
    processTabs.open(value)
  }
}
</script>

<template>
  <Tabs
    v-if="tabsToRender.length"
    class="h-full flex flex-col"
    :dir="t('krgz.dir')"
    :model-value="current?.id"
    @update:model-value="onTabChange"
  >
    <div class="bg-muted max-w-full min-h-min overflow-x-auto krgz-tabs">
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
            <KrgzTabIcon
              v-if="!tab.context?.isTerminal && tab.context?.canRestart"
              :icon="RotateCw"
              :tooltip="t('krgz.sandbox.general.restart')"
              @click.stop="processTabs.restart(tab.id)"
            />
            <KrgzTabIcon
              v-if="
                !tab.context?.isTerminal &&
                tab.context?.canStop &&
                tab.context?.exitCode === undefined
              "
              :icon="SquareX"
              :tooltip="t('krgz.sandbox.general.stop')"
              @click.stop="processTabs.kill(tab.id)"
            />
            <KrgzTabIcon
              v-if="!tab.context?.suppressClose"
              :icon="X"
              :tooltip="t('krgz.sandbox.general.close')"
              @click.stop="processTabs.close(tab.id)"
            />
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
          <KrgzTabIcon
            :icon="Plus"
            :tooltip="t('krgz.sandbox.panel.terminals.new')"
          />
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
        ? t('krgz.sandbox.loading.processes')
        : processTabs.availableTerminals.value
          ? undefined
          : t('krgz.sandbox.loading.terminals')
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
        @click="options.process.starters?.terminal?.()"
        >{{ t('krgz.sandbox.panel.terminals.open') }}</Button
      >
    </template>
  </LoadingIndicator>
</template>
