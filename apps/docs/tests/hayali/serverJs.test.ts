// @vitest-environment node
import { spawn } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { indexHtml, serverJs } from '../../lib/hayali-demo/files'

describe('demo server.js', () => {
  it('serves pages with a live-reload hook and pushes an event when a file changes', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'hayali-server-'))
    writeFileSync(join(dir, 'server.js'), serverJs)
    writeFileSync(join(dir, 'index.html'), indexHtml)
    const child = spawn(process.execPath, ['server.js'], { cwd: dir })
    try {
      let html = ''
      for (let i = 0; i < 50 && !html; i++) {
        await new Promise((r) => setTimeout(r, 100))
        html = await fetch('http://127.0.0.1:3000/')
          .then((r) => r.text())
          .catch(() => '')
      }
      expect(html).toContain('/__live')

      const live = await fetch('http://127.0.0.1:3000/__live')
      const reader = live.body!.getReader()
      await reader.read() // ": connected"
      writeFileSync(join(dir, 'style.css'), 'body{}')
      const { value } = await reader.read()
      expect(new TextDecoder().decode(value)).toContain('data: reload')
      await reader.cancel()
    } finally {
      child.kill()
    }
  })
})
