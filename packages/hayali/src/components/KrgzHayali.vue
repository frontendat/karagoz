<script setup lang="ts">
import {
  Button,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
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
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useLessonPosition } from '../composables/useLessonPosition'
import { useLessonReset } from '../composables/useLessonReset'
import type { Lesson, Position } from '../types'
import StepBody from './StepBody.vue'

const props = defineProps<{ lesson: Lesson }>()
const position = defineModel<Position>('position', { required: true })

const { t } = useI18n()
const { container, bootstrap } = useSandbox()

const { step, prev, next, groups, goTo } = useLessonPosition(
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

const flat = computed(() => groups.value.flatMap((g) => g.steps))
const currentIndex = computed(() =>
  flat.value.findIndex(
    (s) =>
      s.position.chapterId === position.value.chapterId &&
      s.position.stepId === position.value.stepId,
  ),
)
const statusOf = (i: number) =>
  i < currentIndex.value
    ? 'done'
    : i === currentIndex.value
      ? 'current'
      : 'upcoming'
const indexOf = (p: Position) =>
  flat.value.findIndex(
    (s) =>
      s.position.chapterId === p.chapterId && s.position.stepId === p.stepId,
  )
</script>

<template>
  <div data-testid="krgz-hayali" class="h-full w-full">
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel :default-size="35" :min-size="20">
        <div class="flex h-full flex-col gap-4 overflow-auto p-4">
          <nav :aria-label="t('krgz.hayali.steps')">
            <template v-for="group in groups" :key="group.chapterId">
              <h3 v-if="group.title" class="font-semibold">
                {{ group.title }}
              </h3>
              <ol>
                <li
                  v-for="s in group.steps"
                  :key="s.position.stepId"
                  data-testid="step-item"
                  :data-status="statusOf(indexOf(s.position))"
                  :aria-current="
                    statusOf(indexOf(s.position)) === 'current'
                      ? 'step'
                      : undefined
                  "
                >
                  {{ s.title }}
                </li>
              </ol>
            </template>
          </nav>
          <StepBody v-if="step" :body="step.body" />
          <div class="mt-auto flex gap-2">
            <Button
              data-testid="prev"
              variant="outline"
              :disabled="!ready || !prev"
              @click="navigate(prev)"
            >
              {{ t('krgz.hayali.prev') }}
            </Button>
            <Button
              data-testid="next"
              :disabled="!ready || !next"
              @click="navigate(next)"
            >
              {{ t('krgz.hayali.next') }}
            </Button>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel :default-size="65">
        <KrgzSandbox :booting="!ready" />
      </ResizablePanel>
    </ResizablePanelGroup>

    <AlertDialogRoot :open="confirmOpen" @update:open="onOpenChange">
      <AlertDialogPortal>
        <AlertDialogOverlay class="fixed inset-0 bg-black/50" />
        <AlertDialogContent
          class="bg-background fixed left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 rounded-md border p-6"
        >
          <AlertDialogTitle class="font-semibold">
            {{ t('krgz.hayali.confirm.title') }}
          </AlertDialogTitle>
          <AlertDialogDescription class="text-muted-foreground text-sm">
            {{ t('krgz.hayali.confirm.description') }}
          </AlertDialogDescription>
          <div class="mt-4 flex justify-end gap-2">
            <AlertDialogCancel as-child>
              <Button data-testid="confirm-cancel" variant="outline">
                {{ t('krgz.hayali.confirm.cancel') }}
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction as-child>
              <Button data-testid="confirm-continue" @click="onContinue">
                {{ t('krgz.hayali.confirm.continue') }}
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
  </div>
</template>
