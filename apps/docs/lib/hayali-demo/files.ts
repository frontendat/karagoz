import type { AdjustmentsTree } from '@karagoz/hayali'

const file = (contents: string) => ({ file: { contents } })

export const packageJson = `{
  "name": "tiny-counter",
  "private": true,
  "scripts": {
    "start": "node server.js"
  }
}
`

export const serverJs = `const http = require('http')
const fs = require('fs')
const path = require('path')

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' }

http
  .createServer((req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost')
    const file = path.join(__dirname, path.normalize(pathname === '/' ? '/index.html' : pathname))
    fs.readFile(file.startsWith(__dirname + path.sep) ? file : '', (error, data) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not found')
        return
      }
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'text/plain' })
      res.end(data)
    })
  })
  .listen(3000)
`

export const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>A tiny counter page</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main>
      <h1>A tiny counter page</h1>
      <p>You clicked <span id="count">0</span> times.</p>
      <button id="button">Click me</button>
    </main>
    <script src="app.js"></script>
  </body>
</html>
`

export const emptyStyleCss = `/* Styles go here. */
`

export const styleCss = `body {
  font-family: system-ui, sans-serif;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
}

main {
  text-align: center;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
`

export const emptyAppJs = `// Behaviour goes here.
`

export const appJs = `const count = document.getElementById('count')
const button = document.getElementById('button')

let clicks = 0

button.addEventListener('click', () => {
  clicks += 1
  count.textContent = String(clicks)
})
`

export const aboutHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>About</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main>
      <h1>About</h1>
      <p>This page is only here for one step.</p>
    </main>
  </body>
</html>
`

/** Files mounted at boot. `package.json` and `server.js` are immutable (see the structure's `immutable`). */
export const baseFiles: AdjustmentsTree = {
  'package.json': file(packageJson),
  'server.js': file(serverJs),
  'index.html': file(indexHtml),
  'style.css': file(emptyStyleCss),
  'app.js': file(emptyAppJs),
}

export const styled: AdjustmentsTree = { 'style.css': file(styleCss) }
export const behaving: AdjustmentsTree = { ...styled, 'app.js': file(appJs) }
export const withAbout: AdjustmentsTree = {
  ...behaving,
  'about.html': file(aboutHtml),
}
