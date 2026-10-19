<script setup lang="ts">
import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@karagoz/shared'
import { KrgzSandbox, useSandbox } from '@karagoz/sandbox'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
} from 'radix-vue'
import { computed, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import {
  type FullLayoutFrom,
  useFullLayout,
} from '../composables/useFullLayout'
import { useLessonPosition } from '../composables/useLessonPosition'
import { useLessonReset } from '../composables/useLessonReset'
import { useStepLocks } from '../composables/useStepLocks'
import type { Lesson, Position } from '../types'
import LessonToolbar from './LessonToolbar.vue'
import StepList from './StepList.vue'

const props = withDefaults(
  defineProps<{
    lesson: Lesson
    /**
     * Minimum container width for the side-by-side lesson/sandbox split; below it a single panel is shown
     * with a Lesson/Sandbox toggle. Uses the component's own width (container query), not the viewport's.
     * `none` always uses the single-panel layout.
     * **Available values:** none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl
     */
    fullLayoutFrom?: FullLayoutFrom
    /**
     * Forwarded to the default `KrgzSandbox` (and exposed on the `sandbox` slot) as its `multi-panel-from`,
     * so the sandbox drops to a single panel when its pane is narrow.
     * **Available values:** none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl
     */
    multiPanelFrom?: FullLayoutFrom
  }>(),
  { fullLayoutFrom: '3xl', multiPanelFrom: '3xl' },
)
const position = defineModel<Position>('position', { required: true })

const { t } = useI18n()
const { container, bootstrap, setOption } = useSandbox()

const { fullLayout, fullLayoutClass } = useFullLayout(
  useTemplateRef<HTMLElement>('layout'),
  () => props.fullLayoutFrom,
)
const mobilePanel = ref<'lesson' | 'sandbox'>('lesson')

const { chapter, prev, next, groups, goTo } = useLessonPosition(
  () => props.lesson,
  position,
)

// The container's fs is only available once it has booted; until then navigation is a no-op.
const reset = useLessonReset({
  fs: {
    watch: (...args) => container.value!.fs.watch(...args),
    mount: (tree) => container.value!.mount(tree),
    rm: (path, options) => container.value!.fs.rm(path, options),
  },
  lesson: () => props.lesson,
})

watch(
  container,
  (c) => {
    if (c) void reset.boot(position.value).then(bootstrap)
  },
  { immediate: true },
)
onBeforeUnmount(reset.dispose)

const locks = useStepLocks({
  lesson: () => props.lesson,
  position,
  setOption,
})

const confirmOpen = ref(false)
let settle: ((ok: boolean) => void) | undefined

const confirm = () =>
  new Promise<boolean>((resolve) => {
    settle = resolve
    confirmOpen.value = true
  })

const answer = (ok: boolean) => {
  confirmOpen.value = false
  settle?.(ok)
  settle = undefined
}

// Radix closes the dialog on Action/Cancel/Esc/overlay; resolve after the click handlers ran.
let continued = false
const onContinue = () => {
  continued = true
}
const onOpenChange = (open: boolean) => {
  if (open) return
  queueMicrotask(() => {
    answer(continued)
    continued = false
  })
}

const navigate = async (target: Position | undefined) => {
  if (!target) return
  if (await reset.navigate(target, confirm)) goTo(target)
}

const ready = computed(() => !!reset.current.value)

// The content pane lists only the current chapter's steps; chapters surface in the TOC.
const steps = computed(() => chapter.value?.steps ?? [])
const positionOf = (stepId: string): Position => ({
  chapterId: position.value.chapterId,
  stepId,
})

const toolbarProps = computed(() => ({
  prev: prev.value,
  next: next.value,
  groups: groups.value,
  current: position.value,
  chapterTitle: chapter.value?.title,
  disabled: !ready.value,
}))
</script>

<template>
  <div
    data-testid="krgz-hayali"
    class="bg-background @container/hayali h-full w-full"
  >
    <div ref="layout" class="flex h-full flex-col" :class="fullLayoutClass">
      <template v-if="fullLayout">
        <LessonToolbar
          v-bind="toolbarProps"
          placement="top"
          @navigate="navigate"
        />
        <ResizablePanelGroup direction="horizontal" class="min-h-0 flex-1">
          <ResizablePanel :default-size="30" class="min-w-[300px]">
            <StepList
              class="h-full overflow-auto"
              :steps="steps"
              :current-step-id="position.stepId"
              :locks="locks"
              :disabled="!ready"
              @select="navigate(positionOf($event))"
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel :default-size="70" class="min-w-[460px]">
            <div
              class="m-3 me-5 h-[calc(100%-1.5rem)] overflow-hidden rounded-lg border shadow-sm"
            >
              <slot
                name="sandbox"
                :ready="ready"
                :multi-panel-from="multiPanelFrom"
              >
                <KrgzSandbox
                  :booting="!ready"
                  :multi-panel-from="multiPanelFrom"
                />
              </slot>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </template>
      <template v-else>
        <Tabs v-model="mobilePanel" class="flex min-h-0 flex-1 flex-col">
          <div class="bg-background sticky top-0 z-10 border-b px-3 py-2">
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
          </div>
          <TabsContent
            value="lesson"
            force-mount
            class="mt-0 min-h-0 flex-1 overflow-auto"
          >
            <StepList
              :steps="steps"
              :current-step-id="position.stepId"
              :locks="locks"
              :disabled="!ready"
              @select="navigate(positionOf($event))"
            />
          </TabsContent>
          <TabsContent value="sandbox" force-mount class="mt-0 min-h-0 flex-1">
            <div
              class="m-3 h-[calc(100%-1.5rem)] overflow-hidden rounded-lg border shadow-sm"
            >
              <slot
                name="sandbox"
                :ready="ready"
                :multi-panel-from="multiPanelFrom"
              >
                <KrgzSandbox
                  :booting="!ready"
                  :multi-panel-from="multiPanelFrom"
                />
              </slot>
            </div>
          </TabsContent>
        </Tabs>
        <LessonToolbar
          v-bind="toolbarProps"
          placement="bottom"
          @navigate="navigate"
        />
      </template>
    </div>

    <AlertDialogRoot :open="confirmOpen" @update:open="onOpenChange">
      <AlertDialogPortal>
        <AlertDialogOverlay
          class="bg-background/60 fixed inset-0 z-[100] backdrop-blur-[1px]"
        />
        <AlertDialogContent
          class="bg-background fixed start-1/2 top-1/2 z-[100] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-lg border p-5 shadow-md rtl:translate-x-1/2"
        >
          <AlertDialogTitle class="mb-2 text-[14.5px] font-semibold">
            {{ t('krgz.hayali.confirm.title') }}
          </AlertDialogTitle>
          <AlertDialogDescription
            class="text-muted-foreground mb-[18px] text-[13px]"
          >
            {{ t('krgz.hayali.confirm.description') }}
          </AlertDialogDescription>
          <div class="flex justify-end gap-2">
            <AlertDialogCancel as-child>
              <Button
                data-testid="confirm-cancel"
                variant="outline"
                class="h-8 px-3.5 text-[12.5px]"
              >
                {{ t('krgz.hayali.confirm.cancel') }}
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction as-child>
              <Button
                data-testid="confirm-continue"
                variant="destructive"
                class="h-8 px-3.5 text-[12.5px]"
                @click="onContinue"
              >
                {{ t('krgz.hayali.confirm.continue') }}
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
  </div>
</template>
