<script setup lang="ts">
import { KaragozPuppeteer, type KaragozStory } from '@karagoz/puppeteer'

const story: KaragozStory = {
  subject: 'Demo Story',
  topics: [
    {
      slides: [],
      subject: 'Demo Main Topic',
      type: 'main',
    },
  ],
}
</script>

<template>
  <div>
    <h1>Puppeteer docs</h1>
    <KaragozPuppeteer :story="story" />
  </div>
</template>
