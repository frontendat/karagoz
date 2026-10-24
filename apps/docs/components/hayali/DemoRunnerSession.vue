<script setup lang="ts">
import { KrgzHayali, type Position } from '@karagoz/hayali'
import {
  KrgzSandbox,
  provideWebContainer,
  useSandbox,
  useSandboxBoot,
} from '@karagoz/sandbox'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
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

// The step is deep-linkable through `?step=chapterID/stepID`. The URL is read once, so the server renders the linked
// step; after that the position only writes to it. `replace` keeps Back from skipping the confirm-and-reset flow,
// which only runs for navigation inside the lesson.
const route = useRoute()
const router = useRouter()
const position = ref<Position>(
  parseStepQuery(route.query[stepQueryKey]) ?? { ...demoStart },
)
watch(position, (value) => {
  const step = formatStepQuery(value)
  if (route.query[stepQueryKey] === step) return
  const { [stepQueryKey]: _, ...rest } = route.query
  void router.replace({
    query: step ? { ...rest, [stepQueryKey]: step } : rest,
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
