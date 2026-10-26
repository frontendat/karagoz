<script setup lang="ts">
import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tabs,
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
import { useElementSize } from '@vueuse/core'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'

import { warnIfNotIsolated } from '../composables/useIsolationWarning'
import {
  firstPosition,
  hasPosition,
  useLessonPosition,
} from '../composables/useLessonPosition'
import { useLessonReset } from '../composables/useLessonReset'
import { useStepEntry } from '../composables/useStepEntry'
import { useStepLocks } from '../composables/useStepLocks'
import type { FullLayoutFrom } from '../layout/breakpoints'
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
/**
 * Current step. Optional so a server render needs nothing from the consumer: it falls back to the first step of the
 * first chapter (never restored from `localStorage`).
 */
const positionModel = defineModel<Position>('position')
const position = computed<Position>({
  get: () =>
    positionModel.value && hasPosition(props.lesson, positionModel.value)
      ? positionModel.value
      : firstPosition(props.lesson),
  set: (value) => (positionModel.value = value),
})

// A bound `position` naming a step that doesn't exist (e.g. a stale URL) renders the first step and is corrected in the
// model so the consumer's binding heals.
watch(
  [positionModel, () => props.lesson],
  ([model, lesson]) => {
    if (!model || hasPosition(lesson, model)) return
    const fallback = firstPosition(lesson)
    // An empty lesson has nothing to fall back to; writing blank IDs back would retrigger this watch forever.
    if (!hasPosition(lesson, fallback)) return
    if (import.meta.env.DEV)
      console.warn(
        `[hayali] Step "${model.chapterId}/${model.stepId}" not found; fell back to the first step "${fallback.chapterId}/${fallback.stepId}".`,
      )
    positionModel.value = fallback
  },
  { immediate: true },
)

const { t } = useI18n()
const sandbox = useSandbox()
const { container, bootstrap, setOption } = sandbox

// Which panel the Lesson/Sandbox toggle shows when the container is too narrow for the side-by-side layout. The
// layout itself is CSS-only (container queries), so first paint needs no JS.
const panel = ref<'lesson' | 'sandbox'>('lesson')

// The sandbox boots on mount only; the server renders a placeholder.
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
  warnIfNotIsolated()
})

// The sandbox pane is `display: none` while the other panel is active, so a measured size means it is visible.
const sandboxPane = useTemplateRef<HTMLElement>('sandboxPane')
const { width: paneWidth, height: paneHeight } = useElementSize(sandboxPane)
const sandboxVisible = computed(
  () => paneWidth.value > 0 && paneHeight.value > 0,
)

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
    if (c)
      void reset.boot(position.value).then(() => {
        // Directives for the initial step apply right after the boot mount, without waiting for install/dev server.
        void entry.enterInitial()
        return bootstrap()
      })
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

const entry = useStepEntry({
  lesson: () => props.lesson,
  position,
  goTo,
  reset,
  confirm,
  sandbox,
  sandboxVisible,
})

const navigate = (target: Position | undefined) => {
  if (target) void entry.navigate(target)
}

const ready = computed(() => !!reset.current.value)
const busy = computed(() => !ready.value || entry.navigating.value)

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
  disabled: busy.value,
}))
</script>

<template>
  <div
    data-testid="krgz-hayali"
    class="hf bg-background @container/hayali h-full w-full"
    :data-panel="panel"
  >
    <div class="hf-root flex h-full flex-col" :data-from="fullLayoutFrom">
      <div
        data-hf-toggle
        class="bg-background sticky top-0 z-10 border-b px-3 py-2"
      >
        <Tabs v-model="panel" :dir="t('krgz.dir')">
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
            :steps="steps"
            :current-step-id="position.stepId"
            :locks="locks"
            :disabled="busy"
            @select="navigate(positionOf($event))"
          />
        </ResizablePanel>
        <ResizableHandle data-hf-handle />
        <ResizablePanel :default-size="70" data-hf-pane="sandbox">
          <div
            ref="sandboxPane"
            class="m-3 h-[calc(100%-1.5rem)] overflow-hidden rounded-lg border shadow-sm [margin-inline-end:var(--hf-sandbox-me,0.75rem)]"
          >
            <template v-if="mounted">
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
            </template>
            <div
              v-else
              data-testid="sandbox-placeholder"
              class="bg-muted h-full w-full"
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <LessonToolbar v-bind="toolbarProps" @navigate="navigate" />
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
