<script setup lang="ts">
import { FileSystemTree } from '@webcontainer/api'

import KrgzSandbox from './components/KrgzSandbox.vue'

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
    "start": "nodemon index.js"
  }
}`

const html = `
<h1>Slide 1 Headline</h1>
<${'script'} src="./script.js"><${'/script'}>
<${'script'}>doSomething()<${'/script'}>
`

const script = `
function doSomething() {
  console.log(document.querySelector('h1').innerText)
}
`

const tree: FileSystemTree = {
  'index.js': { file: { contents: index } },
  'package.json': { file: { contents: pkgJson } },
  public: {
    directory: {
      'index.html': { file: { contents: html } },
      'script.js': { file: { contents: script } },
    },
  },
}
</script>

<template>
  <div>
    <KrgzSandbox :tree="tree" />
  </div>
</template>
