<script setup lang="ts">
import '@karagoz/shared/dist/karagoz-shared.css'
import '@karagoz/sandbox/dist/karagoz-sandbox.css'

import {
  provideWebContainer,
  useSandbox,
  useSandboxBoot,
} from '@karagoz/sandbox'
import { onBeforeUnmount, ref } from 'vue'

import KrgzHayali from './components/KrgzHayali.vue'
import type { Lesson, Position } from './types'

// Temporary demo; remove as the lesson implementation progresses.
const { boot } = useSandboxBoot()
provideWebContainer(boot)
const sandbox = useSandbox()
onBeforeUnmount(() => sandbox.container.value?.teardown())

const packageJson = `{
  "name": "example-app",
  "type": "module",
  "dependencies": { "express": "latest", "nodemon": "latest" },
  "scripts": { "start": "nodemon --watch './' -e js,html,css server.js" }
}
`

const serverJs = `import express from 'express'

const app = express()
const port = 3111

app.use('/', express.static('public'))

app.listen(port, () => {
  console.log('App is live at http://localhost:' + port)
})
`

const html = (heading: string) => `<html>
<head><link rel="stylesheet" href="./style.css" /></head>
<body>
<h1>${heading}</h1>
</body>
</html>
`

const demoLesson: Lesson = {
  files: {
    'package.json': { file: { contents: packageJson } },
    'server.js': { file: { contents: serverJs } },
    public: {
      directory: {
        'index.html': { file: { contents: html('Hello') } },
        'style.css': {
          file: { contents: 'body { font-family: sans-serif; }\n' },
        },
      },
    },
  },
  immutable: ['node_modules', 'package.json', 'package-lock.json', 'server.js'],
  chapters: [
    {
      id: 'intro',
      title: 'Intro',
      steps: [
        {
          id: 'one',
          title: 'Hello page',
          body: 'Edit `public/index.html` and watch the preview.',
        },
        {
          id: 'two',
          title: 'Add styling',
          body: 'The heading is now styled. Changing files and moving on asks for confirmation.',
          adjustments: {
            public: {
              directory: {
                'index.html': { file: { contents: html('Hello, styled!') } },
                'style.css': {
                  file: {
                    contents:
                      'body { font-family: sans-serif; }\nh1 { color: #99cc33; }\n',
                  },
                },
              },
            },
          },
        },
        {
          id: 'three',
          title: 'Remove styles',
          body: 'The stylesheet is removed again.',
          removals: ['public/style.css'],
        },
      ],
    },
  ],
}
const demoPosition = ref<Position>({ chapterId: 'intro', stepId: 'one' })
</script>

<template>
  <main class="flex-1 h-screen">
    <KrgzHayali v-model:position="demoPosition" :lesson="demoLesson" />
  </main>
</template>

<style>
body {
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 700px;
}
</style>
