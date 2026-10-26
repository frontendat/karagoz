```yaml krgz-lesson
immutable:
  - package.json
  - server.js
```

```json file=package.json
{
  "name": "tiny-counter",
  "private": true,
  "scripts": {
    "start": "node server.js"
  }
}
```

```js file=server.js
const http = require('http')
const fs = require('fs')
const path = require('path')

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' }

// Live reload: pages listen on /__live and reload when a file in this folder changes.
const clients = new Set()
let timer
fs.watch(__dirname, (event, name) => {
  if (!name || name === 'node_modules' || name === 'package-lock.json') return
  clearTimeout(timer)
  timer = setTimeout(() => clients.forEach((res) => res.write('data: reload\n\n')), 100)
})
const liveScript = '<script>new EventSource("/__live").onmessage = () => location.reload()</script>'

http
  .createServer((req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost')
    if (pathname === '/__live') {
      res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' })
      res.write(': connected\n\n')
      clients.add(res)
      req.on('close', () => clients.delete(res))
      return
    }
    const file = path.join(__dirname, path.normalize(pathname === '/' ? '/index.html' : pathname))
    fs.readFile(file.startsWith(__dirname + path.sep) ? file : '', (error, data) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not found')
        return
      }
      const type = types[path.extname(file)] ?? 'text/plain'
      res.writeHead(200, { 'Content-Type': type })
      res.end(type === 'text/html' ? data + liveScript : data)
    })
  })
  .listen(3000)
```

```html file=index.html
<!doctype html>
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
```

```css file=style.css
/* Styles go here. */
```

```js file=app.js
// Behaviour goes here.
```

# The page {#basics}

## Markup {#markup}

Every page starts as HTML. `index.html` is open in the editor: a heading, a paragraph with a counter and a button.

:::tip Lessons guide your attention
This step *opened* `index.html` for you. Steps can also close tabs, highlight lines and jump to a line.
:::

The stylesheet and the script are linked, but still empty. The next steps fill them in.

```yaml krgz-step
editor:
  open: [index.html]
```

## Style {#style}

`style.css` now has rules for `body`, `main` and `button`. The highlighted lines are the ones this step is about.

:::note index.html is locked
Look at the notice above: `index.html` is *locked* in this step. You can still open and read it, you just cannot edit it.
:::

Edit the CSS freely. Moving to another step resets your changes, after asking you first.

```css file=style.css
body {
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
```

```yaml krgz-step
locks: [index.html]
editor:
  open: [style.css]
  highlight:
    - path: style.css
      lines: [[1, 7], [13, 17]]
```

## Behaviour {#behaviour}

`app.js` adds a click handler to the button. The editor jumped straight to line 6, where the handler starts, and the
`style.css` tab was closed for you.

Click the button in the preview to see the counter go up.

```css file=style.css from=style
```

```js file=app.js
const count = document.getElementById('count')
const button = document.getElementById('button')

let clicks = 0

button.addEventListener('click', () => {
  clicks += 1
  count.textContent = String(clicks)
})
```

```yaml krgz-step
editor:
  close: [style.css]
  open:
    - path: app.js
      line: 6
```

# More pages {#pages}

## A second page {#about}

This step adds `about.html` and points the **preview** at it with `preview.url`, so you see the page the step is about.

The page is only here for this lesson step: it exists in this step and the next one removes it again.

:::warning Edits are reset
Changes you make are thrown away when you move to another step. Hayali asks for confirmation before it does.
:::

```css file=style.css from=basics/style
```

```js file=app.js from=basics/behaviour
```

```html file=about.html
<!doctype html>
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
```

```yaml krgz-step
editor:
  open: [about.html]
preview:
  url: /about.html
```

## Cleaning up {#cleanup}

`about.html` is gone again. Its editor tab closed by itself, and because the preview was left on a page that no longer
exists, it went back to `/`.

This step also used `close: 'all'` to close every tab before opening `index.html` again. That is the whole lesson format.

```css file=style.css from=basics/style
```

```js file=app.js from=basics/behaviour
```

```yaml krgz-step
removals: [about.html]
editor:
  close: all
  open: [index.html]
```
