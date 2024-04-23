<script setup lang="ts">
import '@karagoz/puppeteer/dist/style.css'

import { KrgzPuppeteer, type KrgzStory } from '@karagoz/puppeteer'

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
    <h1>Puppeteer docs</h1>
    <KrgzPuppeteer :story="story" />
  </div>
</template>
