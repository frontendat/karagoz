<script setup lang="ts">
import {
  KrgzSandbox,
  provideWebContainer,
  useSandbox,
  useSandboxBoot,
} from '@karagoz/sandbox'
import { onBeforeUnmount } from 'vue'
import demoLesson from '../assets/demo-lesson.md?raw'

import KrgzHayali from '../components/KrgzHayali.vue'
import { parseLesson } from '../parse/index.ts'

const { lesson: parsedLesson, issues } = parseLesson(demoLesson)

// Temporary demo; remove as the lesson implementation progresses.
const { boot } = useSandboxBoot()
provideWebContainer(boot)
const sandbox = useSandbox()
onBeforeUnmount(() => sandbox.container.value?.teardown())
</script>

<template>
  <KrgzHayali :lesson="parsedLesson">
    <template #sandbox="{ ready, multiPanelFrom }">
      <KrgzSandbox
        :booting="!ready"
        :available-panels="['code', 'result']"
        :multi-panel-from="multiPanelFrom"
      />
    </template>
  </KrgzHayali>
</template>
