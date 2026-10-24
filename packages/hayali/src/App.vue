<script setup lang="ts">
import {
  KrgzSandbox,
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
          locks: ['public/index.html'],
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
    {
      id: 'pages',
      title: 'More pages',
      steps: [
        {
          // Step IDs only need to be unique within their chapter.
          id: 'one',
          title: 'Add an about page',
          body: 'A second page lives at `public/about.html`. Open `/about.html` in the preview.\n\n:::tip\nExpress serves every file in `public/` as-is.\n:::',
          adjustments: {
            public: {
              directory: {
                'about.html': { file: { contents: html('About us') } },
              },
            },
          },
        },
        {
          id: 'two',
          title: 'Link the pages',
          body: 'Both pages now link to each other.\n\n:::note\n`server.js` is immutable, so it never resets between steps.\n:::',
          adjustments: {
            public: {
              directory: {
                'index.html': {
                  file: {
                    contents: html('Hello').replace(
                      '</h1>',
                      '</h1>\n<a href="./about.html">About</a>',
                    ),
                  },
                },
                'about.html': {
                  file: {
                    contents: html('About us').replace(
                      '</h1>',
                      '</h1>\n<a href="./index.html">Home</a>',
                    ),
                  },
                },
              },
            },
          },
        },
      ],
    },
  ],
}
const demoPosition = ref<Position>({ chapterId: 'intro', stepId: 'one' })
</script>

<template>
  <div class="mt-4 mx-4">
    <div class="border-4 border-dashed flex-1 m-8">
      <div class="h-180">
        <KrgzHayali v-model:position="demoPosition" :lesson="demoLesson">
          <template #sandbox="{ ready, multiPanelFrom }">
            <KrgzSandbox
              :booting="!ready"
              :available-panels="['code', 'result']"
              :multi-panel-from="multiPanelFrom"
            />
          </template>
        </KrgzHayali>
      </div>
    </div>
  </div>
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
