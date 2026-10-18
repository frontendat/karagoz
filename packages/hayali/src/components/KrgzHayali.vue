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
const indexOf = (p: Position) =>
  flat.value.findIndex(
    (s) =>
      s.position.chapterId === p.chapterId && s.position.stepId === p.stepId,
  )
const statusOf = (p: Position) => {
  const i = indexOf(p)
  return i < currentIndex.value
    ? 'done'
    : i === currentIndex.value
      ? 'current'
      : 'upcoming'
}
/** Every step but the very last one draws a connector line down to the next marker. */
const isLast = (p: Position) => indexOf(p) === flat.value.length - 1
</script>

<template>
  <div
    data-testid="krgz-hayali"
    class="bg-background flex h-full w-full flex-col"
  >
    <div class="flex h-14 min-h-14 items-center gap-1 border-b px-7">
      <Button
        data-testid="prev"
        variant="ghost"
        size="icon"
        class="-ms-1.5 size-7"
        :title="t('krgz.hayali.prev')"
        :aria-label="t('krgz.hayali.prev')"
        :disabled="!ready || !prev"
        @click="navigate(prev)"
      >
        <svg
          class="size-[15px] rtl:-scale-x-100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
      </Button>
      <Button
        data-testid="next"
        variant="ghost"
        size="icon"
        class="size-7"
        :title="t('krgz.hayali.next')"
        :aria-label="t('krgz.hayali.next')"
        :disabled="!ready || !next"
        @click="navigate(next)"
      >
        <svg
          class="size-[15px] rtl:-scale-x-100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Button>
    </div>

    <ResizablePanelGroup direction="horizontal" class="min-h-0 flex-1">
      <ResizablePanel :default-size="30" class="min-w-[300px]">
        <nav
          :aria-label="t('krgz.hayali.steps')"
          class="h-full overflow-auto px-[22px] py-5"
        >
          <template v-for="group in groups" :key="group.chapterId">
            <h3
              v-if="group.title"
              class="text-muted-foreground mb-3 text-xs font-semibold uppercase tracking-wide"
            >
              {{ group.title }}
            </h3>
            <ol>
              <li
                v-for="s in group.steps"
                :key="s.position.stepId"
                data-testid="step-item"
                :data-status="statusOf(s.position)"
                :aria-current="
                  statusOf(s.position) === 'current' ? 'step' : undefined
                "
                class="relative flex gap-3"
              >
                <div
                  v-if="!isLast(s.position)"
                  aria-hidden="true"
                  class="bg-border absolute start-[11px] top-[26px] -bottom-3.5 w-px"
                />
                <div
                  aria-hidden="true"
                  class="mt-px flex size-[23px] flex-none items-center justify-center rounded-full"
                  :class="{
                    'bg-foreground text-background':
                      statusOf(s.position) === 'done',
                    'border-foreground bg-background border-2':
                      statusOf(s.position) === 'current',
                    'bg-muted border': statusOf(s.position) === 'upcoming',
                  }"
                >
                  <svg
                    v-if="statusOf(s.position) === 'done'"
                    class="size-[11px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div
                    v-else-if="statusOf(s.position) === 'current'"
                    class="bg-foreground size-[7px] rounded-full"
                  />
                </div>
                <div class="min-w-0 flex-1 pb-5">
                  <div
                    v-if="statusOf(s.position) === 'current'"
                    class="pt-0.5 text-[13.5px] font-semibold"
                  >
                    {{ s.title }}
                  </div>
                  <button
                    v-else
                    type="button"
                    data-testid="step-link"
                    class="text-muted-foreground block pt-0.5 text-start text-[13.5px] hover:text-foreground"
                    :class="
                      statusOf(s.position) === 'done'
                        ? 'font-medium'
                        : 'font-semibold'
                    "
                    :disabled="!ready"
                    @click="navigate(s.position)"
                  >
                    {{ s.title }}
                  </button>
                  <span class="sr-only">
                    {{ t(`krgz.hayali.${statusOf(s.position)}`) }}
                  </span>
                  <StepBody
                    v-if="statusOf(s.position) === 'current' && step"
                    class="mt-2.5 text-[13.5px]"
                    :body="step.body"
                  />
                </div>
              </li>
            </ol>
          </template>
        </nav>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel :default-size="70" class="min-w-[460px]">
        <div
          class="m-3 me-5 h-[calc(100%-1.5rem)] overflow-hidden rounded-lg border shadow-sm"
        >
          <KrgzSandbox :booting="!ready" />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>

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
