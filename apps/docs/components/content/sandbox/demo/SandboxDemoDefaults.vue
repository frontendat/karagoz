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
fetch('/api/message')
.then((response) => response.text())
.then((data) => (document.querySelector('.response').innerHTML = data))
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

/**
 * Notice how we define files and directories.
 */
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

// `boot` is the promise returned by WebContainer.boot().
// `isBooting` is convenience boolean flag that will be used later to indicate that the sandbox is still booting.
const { boot, isBooting } = useSandboxBoot()

// Sub-components and underlying code will await `boot` and use the resulting WebContainer instance.
provideWebContainer(boot)

// Must come after provideWebContainer to able to use the provided boot promise.
const sandbox = useSandbox()

onMounted(async () => {
  // Ensure injected promise has been resolved
  const container = await boot

  // Continue initialisation

  // Mount files
  await container.mount(fileTree)
  // Finish bootstrapping
  await sandbox.bootstrap()
  // Optionally, open one of the files for editing.
  sandbox.editorTabs.open('./public/index.html')
})

onBeforeUnmount(() => sandbox.container.value?.teardown())
</script>

<template>
  <KrgzSandbox :booting="isBooting" hide-solve-button></KrgzSandbox>
</template>
