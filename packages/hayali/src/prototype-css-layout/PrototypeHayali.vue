<script setup lang="ts">
// PROTOTYPE (throwaway): KrgzHayali with ONE DOM structure. Container queries (layout.css) pick
// split vs single-pane on first paint; JS only flips `data-panel` and handles the resize handle.
// The sandbox is a stub: the question is layout + SSR, not the WebContainer.
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@karagoz/shared'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import StepList from '../components/StepList.vue'
import { useLessonPosition } from '../composables/useLessonPosition'
import type { FullLayoutFrom } from '../composables/useFullLayout'
import type { Lesson, Position } from '../types'
import PrototypeToolbar from './PrototypeToolbar.vue'
import './layout.css'

const props = withDefaults(
  defineProps<{ lesson: Lesson; fullLayoutFrom?: FullLayoutFrom }>(),
  { fullLayoutFrom: '3xl' },
)
const position = defineModel<Position>('position', { required: true })
const panel = ref<'lesson' | 'sandbox'>('lesson')

const { t } = useI18n()
const { chapter, prev, next, groups, goTo } = useLessonPosition(
  () => props.lesson,
  position,
)
const steps = () => chapter.value?.steps ?? []
</script>

<template>
  <div
    class="hf bg-background h-full w-full"
    data-testid="krgz-hayali"
    :data-panel="panel"
  >
    <div
      class="hf-root flex h-full flex-col"
      :data-from="props.fullLayoutFrom"
    >
      <div
        data-hf-toggle
        class="bg-background sticky top-0 z-10 border-b px-3 py-2"
      >
        <Tabs v-model="panel">
          <TabsList
            data-testid="layout-toggle"
            class="grid h-9 w-full grid-cols-2 rounded-full"
          >
            <TabsTrigger value="lesson" class="rounded-full">
              {{ t('krgz.hayali.lesson') }}
            </TabsTrigger>
            <TabsTrigger value="sandbox" class="rounded-full">
              {{ t('krgz.hayali.sandbox') }}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ResizablePanelGroup direction="horizontal" class="min-h-0 flex-1">
        <ResizablePanel :default-size="30" data-hf-pane="lesson">
          <StepList
            class="h-full overflow-auto"
            :steps="steps()"
            :current-step-id="position.stepId"
            :locks="[]"
            @select="goTo({ chapterId: position.chapterId, stepId: $event })"
          />
        </ResizablePanel>
        <ResizableHandle data-hf-handle />
        <ResizablePanel :default-size="70" data-hf-pane="sandbox">
          <div
            data-testid="sandbox-stub"
            class="m-3 h-[calc(100%-1.5rem)] overflow-hidden rounded-lg border shadow-sm [margin-inline-end:var(--hf-sandbox-me,0.75rem)]"
          >
            sandbox (client-only stub)
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <PrototypeToolbar
        :prev="prev"
        :next="next"
        :groups="groups"
        :current="position"
        :chapter-title="chapter?.title"
        @navigate="goTo"
      />
    </div>
  </div>
</template>
