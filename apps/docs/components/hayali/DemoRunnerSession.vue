<script setup lang="ts">
import { KrgzHayali, type Position } from '@karagoz/hayali'
import {
  KrgzSandbox,
  provideWebContainer,
  useSandbox,
  useSandboxBoot,
} from '@karagoz/sandbox'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { createDemoLesson, demoStart } from '../../lib/hayali-demo'
import {
  formatStepQuery,
  parseStepQuery,
  stepQueryKey,
} from '../../lib/hayali-demo/stepQuery'

// A callback rather than an emit: Vue drops emits from an unmounted component, and this fires after unmount.
const props = defineProps<{ locale: string; onReleased: () => void }>()

const lesson = computed(() => createDemoLesson(props.locale))

// The step is deep-linkable through `?step=chapterID/stepID`. The deployed pages are prerendered, so their HTML never
// sees the query: the first render is always the start step, and the URL is applied after mount so hydration matches
// the HTML. Nuxt also hydrates a prerendered page with the query stripped and restores it afterwards, so a demo that
// hydrates early (visible on load) sees it arrive later; the first time it does, it is applied. This happens before
// the sandbox boots (the learner can't navigate yet), so the container is still mounted with the linked step's files.
// After that the position only writes to the URL. `replace` keeps Back from skipping the confirm-and-reset flow,
// which only runs for navigation inside the lesson.
const route = useRoute()
const router = useRouter()
const position = ref<Position>({ ...demoStart })
const applyLinked = (raw: unknown) => {
  const linked = parseStepQuery(raw)
  if (linked) position.value = linked
  return !!linked
}
// Only the first query to arrive is a restored link. Once the learner has moved off the start step, route changes are
// our own URL writes (or something else's) and must not move the lesson, which would skip the confirm-and-reset flow.
const atStart = () => formatStepQuery(position.value) === undefined
onMounted(() => {
  if (applyLinked(route.query[stepQueryKey])) return
  const stop = watch(
    () => route.query[stepQueryKey],
    (raw) => {
      if (!atStart() || applyLinked(raw)) stop()
    },
  )
})
watch(position, (value) => {
  const step = formatStepQuery(value)
  if (route.query[stepQueryKey] === step) return
  const { [stepQueryKey]: _, ...rest } = route.query
  void router.replace({
    query: step ? { ...rest, [stepQueryKey]: step } : rest,
    hash: route.hash,
  })
})

// Booting is mount-only, so this is safe on the server, where the sandbox is a placeholder.
const { boot } = useSandboxBoot()
provideWebContainer(boot)

const sandbox = useSandbox()
// Discard the dependency install starter since the demo has none to install.
sandbox.setOption('process', (old) => ({
  ...old,
  starters: { ...old.starters, install: () => Promise.resolve() },
}))

// Only one WebContainer can run at a time: tear this one down so the page can boot a new one when it is revisited.
// Wait for the boot, so a container that is still starting when the demo goes away is not left running.
onBeforeUnmount(() => {
  void boot
    .then((container) => container.teardown())
    .catch(() => {})
    .finally(props.onReleased)
})
</script>

<template>
  <div class="h-[640px] not-prose">
    <KrgzHayali
      v-model:position="position"
      :lesson="lesson"
      full-layout-from="4xl"
      multi-panel-from="3xl"
    >
      <template #sandbox="{ multiPanelFrom, ready }">
        <KrgzSandbox
          :booting="!ready"
          :available-panels="['code', 'result', 'processes']"
          :multiPanelFrom="multiPanelFrom"
        />
      </template>
    </KrgzHayali>
  </div>
</template>
