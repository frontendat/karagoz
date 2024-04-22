<script setup lang="ts">
import { ref } from 'vue'
import { type KaragozStory } from '../models.ts'

const props = defineProps<{ story?: KaragozStory }>()

const count = ref(0)
</script>

<template>
  <div>
    Puppeteer works
    <button @click="count--">-</button>
    {{ count }}
    <button @click="count++">+</button>

    {{ props.story }}
  </div>
</template>

<style scoped></style>
