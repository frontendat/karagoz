<script setup lang="ts">
import KrgzPuppeteer from './components/KrgzPuppeteer.vue'
import { type KrgzStory } from './models.ts'

const explanation1 = `
# Slide 1

This is how it goes:
* Step 1
* Step 2
* Step 3
`
const html1 = `
<h1>Slide 1 Headline</h1>
<${'script'} src="./script.js"><${'/script'}>
<${'script'}>doSomething()<${'/script'}>
`
const script1 = `
function doSomething() {
  console.log(document.querySelector('h1').innerText)
}
`

const explanation2 = `
# Slide 2

Call \`doSomethingElse()\`
`
const html2 = `
<h1>Slide 2 Headline</h1>
<div>Slide 2 Body</div>
<${'script'} src="./script.js"><${'/script'}>
<${'script'}>
doSomething()
doSomethingElse()
<${'/script'}>
`
const script2 = `
function doSomething() {
  console.log(document.querySelector('h1').innerText)
}
function doSomethingElse() {
  console.log(document.querySelector('div').innerText)
}
`

const story: KrgzStory = {
  subject: 'Demo Story',
  topics: [
    {
      slides: [
        {
          explanation: explanation1,
          files: [
            {
              code: script1,
              path: 'script.js',
            },
            {
              code: html1,
              path: 'index.html',
            },
          ],
        },
        {
          explanation: explanation2,
          files: [
            {
              code: script2,
              path: 'script.js',
            },
            {
              code: html2,
              path: 'index.html',
            },
          ],
        },
      ],
      subject: 'Demo Main Topic',
      type: 'main',
    },
    {
      slides: [
        {
          explanation: explanation1,
          files: [
            {
              code: script1,
              path: 'script.js',
            },
            {
              code: html1,
              path: 'index.html',
            },
          ],
        },
        {
          explanation: explanation2,
          files: [
            {
              code: script2,
              path: 'script.js',
            },
            {
              code: html2,
              path: 'index.html',
            },
          ],
        },
      ],
      subject: 'Demo Sub Topic',
      type: 'sub',
    },
  ],
}
</script>

<template>
  <div>
    <KrgzPuppeteer :story="story" />
  </div>
</template>
