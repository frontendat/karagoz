<script setup lang="ts">
import '@karagoz/shared/dist/karagoz-shared.css'

import { Button } from '@karagoz/shared'
import { FileSystemTree } from '@webcontainer/api'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import KrgzSandbox from './components/KrgzSandbox.vue'
import { useSandbox, useSandboxBoot } from './composables'
import { provideWebContainer } from './utils/WebContainer.ts'

const { locale, t } = useI18n()

onMounted(() => {
  document.documentElement.setAttribute('lang', locale.value)
  if (locale.value === 'ar') {
    document.documentElement.setAttribute('dir', t('krgz.dir'))
  }
})

const index = `
import express from 'express';
const app = express();
const port = 3111;

app.get('/api/demo', (req, res) => {
     setTimeout(() => res.send('Welcome to a WebContainers app! 🥳'), 1000);
});
app.use('/', express.static('public'));

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
    "start": "nodemon --watch './' -e js,html,css index.js"
  }
}`

const html = `
<html>
<head>
<link rel="stylesheet" href="./style.css" />
</head>
<body>
<nav>
<a href="/">Home</a>
&bull;
<a href="/about.html">About</a>
</nav>
<h1>Slide 1 Headline</h1>
<p class="response">Loading...</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae cupiditate, delectus dolor esse excepturi
fugiat incidunt ipsa itaque libero nam nisi provident quasi quidem recusandae saepe veniam vitae voluptatibus.
</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae cupiditate, delectus dolor esse excepturi
fugiat incidunt ipsa itaque libero nam nisi provident quasi quidem recusandae saepe veniam vitae voluptatibus.
</p>
<a href="#anchor">Anchor link</a>
<${'script'} src="./script.js"><${'/script'}>
<${'script'}>doSomething()<${'/script'}>
</body>
</html>
`

const script = `
function doSomething() {
  console.log(document.querySelector('h1').innerText)

  fetch('/api/demo')
    .then((response) => response.text())
    .then((data) => document.querySelector('.response').innerHTML = data)
}
`

const style = `
body {
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  color: #99cc33;
}
`

const tree = ref<FileSystemTree>({
  'index.js': { file: { contents: index } },
  'package.json': { file: { contents: pkgJson } },
  public: {
    directory: {
      'index.html': { file: { contents: html } },
      'about.html': {
        file: { contents: html.replace('Slide 1 Headline', 'About Page') },
      },
      'script.js': { file: { contents: script } },
      'style.css': { file: { contents: style } },
    },
  },
})

const { boot, isBooting } = useSandboxBoot()
provideWebContainer(boot)

const sandbox = useSandbox()
const buttonsDisabled = ref(true)

onMounted(async () => {
  // Ensure injected promise has been resolved
  const container = await boot
  // Continue initialisation
  await container.mount(tree.value)
  await sandbox.bootstrap()
  sandbox.editorTabs.open('./public/script.js')
  sandbox.editorTabs.open('./public/index.html')
  buttonsDisabled.value = false
})

const onSolveClick = async () => {
  sandbox.container.value?.mount({
    public: {
      directory: {
        'index.html': {
          file: {
            contents: html.replace(
              'Slide 1 Headline',
              'Slide 1 Headline SOLVED',
            ),
          },
        },
      },
    },
  })
}
</script>

<template>
  <div class="mt-8 mx-8">
    <Button
      :disabled="buttonsDisabled"
      size="xs"
      variant="secondary"
      @click="sandbox.editorViews.highlightLines(6)"
      >Highlight line 6</Button
    >
    <Button
      :disabled="buttonsDisabled"
      size="xs"
      variant="secondary"
      @click="sandbox.editorViews.highlightLines([11, 13])"
      >Highlight lines 11-13</Button
    >
    <Button
      :disabled="buttonsDisabled"
      size="xs"
      variant="secondary"
      @click="sandbox.editorViews.highlightLines([5, 7], './public/style.css')"
      >Highlight style.css lines 5-7</Button
    >
    <Button
      :disabled="buttonsDisabled"
      size="xs"
      variant="secondary"
      @click="sandbox.editorViews.scrollToLine(11)"
      >Scroll to line 11</Button
    >
    <Button
      :disabled="buttonsDisabled"
      size="xs"
      variant="secondary"
      @click="sandbox.editorViews.clearHighlightedLines()"
      >Clear current tab's highlights</Button
    >
    <Button
      :disabled="buttonsDisabled"
      size="xs"
      variant="secondary"
      @click="sandbox.editorViews.clearAllHighlightedLines()"
      >Clear all highlights</Button
    >
  </div>
  <div class="border-4 border-dashed flex-1 m-8">
    <KrgzSandbox
      :booting="isBooting"
      multi-panel-from="3xl"
      @solve="onSolveClick()"
    />
  </div>
</template>

<style>
body {
  height: 100dvh;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
