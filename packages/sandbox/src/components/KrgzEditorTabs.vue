<script setup lang="ts">
import {
  LoadingIndicator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@karagoz/shared'
import {
  FileCode,
  Lock,
  PanelLeftClose,
  PanelLeftOpen,
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
import KrgzEditor from './KrgzEditor.vue'
import KrgzPanelToggle from './KrgzPanelToggle.vue'
import KrgzTabIcon from './KrgzTabIcon.vue'

/**
 * Renders a tabbed list of the open files and the editor of the currently focused tab.
 *
 * This component gets all it needs to operate by calling `useSandbox()`. It takes no props and
 * emits no events, other than the presentational `hideExplorerToggle` prop below.
 */
defineOptions({})

defineProps<{
  /**
   * Hide the file explorer show/hide toggle icon (e.g. when the explorer panel itself is
   * always hidden).
   */
  hideExplorerToggle?: boolean
}>()

const { t } = useI18n()
const { editorTabs, explorer } = useSandbox()
const tabList = ref<ComponentPublicInstance<InstanceType<typeof TabsList>>>()

const readonly = computed(() => explorer.readonly.value)
const explorerShown = computed(() => explorer.shown.value)

watch(
  () => editorTabs.current.value,
  async () => {
    await nextTick()
    // bring active tab trigger into view
    tabList.value?.$el
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'start' })
  },
)
</script>

<template>
  <Tabs
    v-if="editorTabs.tabs.value.length"
    class="h-full flex flex-col"
    :dir="t('krgz.dir')"
    :model-value="editorTabs.current.value?.id"
    @update:model-value="editorTabs.open($event)"
  >
    <div class="bg-muted flex gap-2 items-center min-h-min">
      <KrgzPanelToggle
        v-if="!hideExplorerToggle"
        as-button
        class="shrink-0"
        :label="t('krgz.sandbox.toggle.explorer')"
        variant="tab"
        @press="explorer.toggle"
      >
        <PanelLeftClose v-if="explorerShown" class="size-4" />
        <PanelLeftOpen v-else class="size-4" />
      </KrgzPanelToggle>
      <div class="max-w-full min-w-0 overflow-x-auto krgz-tabs">
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
              <KrgzTabIcon
                v-if="readonly.ignores(tab.label)"
                class="h-4 opacity-50 w-4"
                :icon="Lock"
                :tooltip="t('krgz.sandbox.panel.editor.readonly')"
              />
              <KrgzTabIcon
                v-if="!tab.context?.suppressClose"
                :icon="X"
                :tooltip="t('krgz.sandbox.general.close')"
                @click.stop="editorTabs.close(tab.id)"
              />
            </div>
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
    <TabsContent
      class="flex-grow max-h-full mt-0 overflow-hidden"
      :value="editorTabs.current.value?.id ?? ''"
    >
      <template v-for="tab in editorTabs.tabs.value" :key="tab.id">
        <KrgzEditor
          v-show="tab.id === editorTabs.current.value?.id"
          dir="ltr"
          :disabled="readonly.ignores(tab.id)"
          :path="tab.id"
          @close="editorTabs.close($event)"
        />
      </template>
    </TabsContent>
  </Tabs>
  <LoadingIndicator
    v-else
    :label="t('krgz.sandbox.loading.editor')"
    suppress-spinner
    variant="secondary"
  >
    <FileCode class="size-12" />
  </LoadingIndicator>
</template>
