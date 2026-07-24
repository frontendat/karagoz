<script setup lang="ts">
import {
  KrgzSandbox,
  provideWebContainer,
  useSandbox,
  useSandboxBoot,
} from '@karagoz/sandbox'
import type { FileSystemTree } from '@webcontainer/api'
import { onBeforeUnmount, onMounted } from 'vue'

/**
 * package.json
 * Defines the dependencies to be installed and script to start the server.
 * The server option indicate that it should restart when JS, HTML or CSS files change.
 */
const packageJson = `
{
  "name": "example-app",
  "type": "module",
  "dependencies": {
    "express": "latest",
    "nodemon": "latest"
  },
  "scripts": {
    "start": "nodemon --watch './' -e js,html,css server.js"
  }
}
`

/**
 * server.js
 * Configures a web server on port 3111.
 * Defines the endpoint /api/message that returns a string message.
 * Serves the files in /public under the root path /.
 */
const serverJs = `
import express from 'express'

const app = express()
const port = 3111

app.get('/api/message', (req, res) => {
  setTimeout(() => res.send('Welcome to a WebContainers app! 🥳'), 1000)
})
app.use('/', express.static('public'))

app.listen(port, () => {
  console.log('App is live at http://localhost:' + port)
})
`

/**
 * public/index.html
 * The home page of the server.
 * Links to style.css for styling.
 * Embeds script.js and calls the doSomething() function defined within it.
 */
const indexHtml = `
<html>
<head>
    <link rel="stylesheet" href="./style.css"/>
</head>
<body>
<h1>Home Page</h1>
<p class="response">Fetching message...</p>
<script src="./script.js"><${'/script'}>
<script>doSomething()<${'/script'}>
</body>
</html>
`

/**
 * public/script.js
 * Defines the function doSomething() that calls the API endpoint /api/messsage and injects the response into the
 * div element with the class "response".
 */
const scriptJs = `
function doSomething() {
console.log('Fetching message...')
fetch('/api/message')
.then((response) => response.text())
.then((data) => {
  console.log('Received message')
  document.querySelector('.response').innerHTML = data
})
}
`

/**
 * public/style.css
 * Basic styles.
 */
const styleCss = `
body {
font-family: Arial, Helvetica, sans-serif;
}

h1 {
color: #99cc33;
}
`

const fileTree: FileSystemTree = {
  'server.js': { file: { contents: serverJs } },
  'package.json': { file: { contents: packageJson } },
  public: {
    directory: {
      'index.html': { file: { contents: indexHtml } },
      'script.js': { file: { contents: scriptJs } },
      'style.css': { file: { contents: styleCss } },
    },
  },
}

const { boot, isBooting } = useSandboxBoot()
provideWebContainer(boot)

const sandbox = useSandbox()

onMounted(async () => {
  const container = await boot
  await container.mount(fileTree)
  await sandbox.bootstrap()
  sandbox.editorTabs.open('./public/index.html')
})

onBeforeUnmount(() => sandbox.container.value?.teardown())
</script>

<template>
  <!--
    `multi-panel-from="none"` forces the single-panel (mobile) layout regardless of the
    container width, so only one panel is shown at a time and switching panels happens through
    the bottom tab bar.
  -->
  <KrgzSandbox
    :booting="isBooting"
    hide-solve-button
    multi-panel-from="none"
  ></KrgzSandbox>
</template>
