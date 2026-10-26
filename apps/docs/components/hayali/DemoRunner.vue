<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { acquireDemoSlot } from '../../utils/demoSlot'
import DemoRunnerSession from './DemoRunnerSession.vue'

defineProps<{ locale: string }>()

// The session (sandbox, container) is only created once earlier demos are gone; see `demoSlot`.
const slot = acquireDemoSlot()
const started = ref(slot.immediate)

onMounted(async () => {
  if (started.value) return
  await slot.ready
  started.value = true
})

// A session releases the slot after tearing its container down; without one there is nothing to wait for.
onBeforeUnmount(() => {
  if (!started.value) slot.release()
})
</script>

<template>
  <DemoRunnerSession
    v-if="started"
    :locale="locale"
    :on-released="slot.release"
  />
  <div v-else class="h-[640px] not-prose" />
</template>
