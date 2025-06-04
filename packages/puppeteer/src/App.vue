<script setup lang="ts">
import {
  provideWebContainer,
  useSandbox,
  useSandboxBoot,
} from '@karagoz/sandbox'
import { FileSystemTree } from '@webcontainer/api'
import { onBeforeUnmount, onMounted } from 'vue'

import KrgzPuppeteer from './components/KrgzPuppeteer.vue'
import { type KrgzStory } from './models.ts'

const { boot, isBooting } = useSandboxBoot()
provideWebContainer(boot)

const sandbox = useSandbox()

const index = `
import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
     res.send('Welcome to a WebContainers app! 🥳 <a href="/sub">Sub</a>');
});
app.get('/sub', (req, res) => {
     res.send('Welcome to a WebContainers app! 🥳 <a href="/">Home</a>');
});
app.use('/', express.static('.'));

app.listen(port, () => {
    console.log('App is live at http://localhost:' + port);
  }
);
`

const pkgJson = `
{
  "name": "example-app",
  "type": "module",
  "dependencies": {
    "express": "latest",
    "nodemon": "latest"
  },
  "scripts": {
    "start": "nodemon --watch './' -e js,html index.js"
  }
}`

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

const setupFiles: FileSystemTree = {
  'package.json': { file: { contents: pkgJson } },
  'index.js': { file: { contents: index } },
}

onMounted(async () => {
  const container = await boot
  await container.mount(setupFiles)
  await sandbox.bootstrap()
})

onBeforeUnmount(() => sandbox.container.value?.teardown())

const story: KrgzStory = {
  subject: 'Demo Story',
  topics: [
    {
      slides: [
        {
          explanation: explanation1,
          tree: {
            //...setupFiles,
            'index.html': { file: { contents: html1 } },
            'script.js': { file: { contents: script1 } },
          },
        },
        {
          explanation: explanation2,
          tree: {
            //...setupFiles,
            'index.html': { file: { contents: html2 } },
            'script.js': { file: { contents: script2 } },
          },
        },
      ],
      subject: 'Demo Main Topic',
      type: 'main',
    },
    {
      slides: [
        {
          explanation: explanation1,
          tree: {
            //...setupFiles,
            'index.html': { file: { contents: html1 } },
            'script.js': { file: { contents: script1 } },
          },
        },
        {
          explanation: explanation2,
          tree: {
            //...setupFiles,
            'index.html': { file: { contents: html2 } },
            'script.js': { file: { contents: script2 } },
          },
        },
      ],
      subject: 'Demo Sub Topic',
      type: 'sub',
    },
  ],
}
</script>

<template>
  <KrgzPuppeteer :story="story" />
</template>

<style>
body {
  height: 100dvh;
  margin: 0;
}

#app {
  height: 100%;
}
</style>
