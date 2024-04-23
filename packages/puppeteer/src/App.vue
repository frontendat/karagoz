<script setup lang="ts">
import Puppeteer from './components/Puppeteer.vue'
import { type KrgzStory } from './models.ts'

const story: KrgzStory = {
  subject: 'Demo Story',
  topics: [
    {
      slides: [
        {
          explanation: 'Slide 1 explanation',
          files: [
            {
              code: `console.log(document.querySelector('h1').innerText)`,
              path: 'script.js',
            },
            {
              code: `<h1>Slide 1 Headline<h1/><${'script'} src="./script.js"><${'/script'}>`,
              path: 'index.html',
            },
          ],
        },
      ],
      subject: 'Demo Main Topic',
      type: 'main',
    },
  ],
}
</script>

<template>
  <div>
    <Puppeteer :story="story" />
  </div>
</template>
