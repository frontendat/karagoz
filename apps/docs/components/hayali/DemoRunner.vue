<script setup lang="ts">
import { KrgzHayali, type Position } from '@karagoz/hayali'
import { provideWebContainer, useSandboxBoot } from '@karagoz/sandbox'
import { computed, onBeforeUnmount, ref } from 'vue'

import { createDemoLesson, demoStart } from '../../lib/hayali-demo'

const props = defineProps<{ locale: string }>()

const lesson = computed(() => createDemoLesson(props.locale))
const position = ref<Position>({ ...demoStart })

// Booting is mount-only, so this is safe on the server, where the sandbox is a placeholder.
const { boot } = useSandboxBoot()
provideWebContainer(boot)

// Only one WebContainer can run at a time: tear this one down so the page can boot a new one when it is revisited.
// Wait for the boot, so a container that is still starting when the demo goes away is not left running.
onBeforeUnmount(() => {
  void boot.then((container) => container.teardown()).catch(() => {})
})
</script>

<template>
  <div class="h-[640px] not-prose">
    <KrgzHayali
      v-model:position="position"
      :lesson="lesson"
      full-layout-from="4xl"
      multi-panel-from="3xl"
    />
  </div>
</template>
