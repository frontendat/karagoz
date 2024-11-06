<script setup lang="ts">
import { FileSystemTree, WebContainer } from '@webcontainer/api'
import { ref } from 'vue'

import KrgzSandbox from './components/KrgzSandbox.vue'
import { useKaragozSandbox } from './composables/useKaragozSandbox.ts'
import { provideWebContainer } from './utils/WebContainer.ts'

const index = `
import express from 'express';
const app = express();
const port = 3111;

app.get('/xxx', (req, res) => {
     res.send('Welcome to a WebContainers app! 🥳');
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
<h1>Slide 1 Headline</h1>
<${'script'} src="./script.js"><${'/script'}>
<${'script'}>doSomething()<${'/script'}>
</body>
</html>
`

const script = `
function doSomething() {
  console.log(document.querySelector('h1').innerText)
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
      'script.js': { file: { contents: script } },
      'style.css': { file: { contents: style } },
    },
  },
})

provideWebContainer(await WebContainer.boot())

const sandbox = useKaragozSandbox()

sandbox.mount(tree.value, { shouldReinstall: true })
</script>

<template>
  <KrgzSandbox />
</template>
