<script setup lang="ts">
import '@karagoz/shared/dist/karagoz-shared.css'
import '@karagoz/sandbox/dist/karagoz-sandbox.css'

import { ref } from 'vue'

import KrgzHayali from './components/KrgzHayali.vue'
import type { Lesson, Position } from './types'

// Temporary demo; remove as the lesson implementation progresses.
const demoLesson: Lesson = {
  chapters: [
    {
      id: 'intro',
      title: 'Intro',
      steps: [
        { id: 'one', title: 'One', body: 'First step' },
        { id: 'two', title: 'Two', body: 'Second step' },
      ],
    },
  ],
}
const demoPosition = ref<Position>({ chapterId: 'intro', stepId: 'one' })
</script>

<template>
  <main>
    <KrgzHayali v-model:position="demoPosition" :lesson="demoLesson" />
  </main>
</template>
