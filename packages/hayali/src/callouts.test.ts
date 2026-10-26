import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import {
  calloutPlugin,
  createCalloutRegistry,
  parseCalloutInfo,
  renderCalloutOpen,
} from './callouts'

const escape = (text: string) => text.replace(/</g, '&lt;')

const render = (source: string, registry = createCalloutRegistry()) =>
  new MarkdownIt().use(calloutPlugin(registry)).render(source)

describe('parseCalloutInfo', () => {
  it('splits kind and optional title', () => {
    expect(parseCalloutInfo(' tip  Heads up ')).toEqual({
      kind: 'tip',
      title: 'Heads up',
    })
    expect(parseCalloutInfo('note')).toEqual({ kind: 'note', title: '' })
  })
})

describe('renderCalloutOpen', () => {
  it.each(['tip', 'warning', 'note'])(
    'maps %s to its Alert variant',
    (kind) => {
      const html = renderCalloutOpen(createCalloutRegistry(), kind, escape)
      expect(html).toContain(`data-callout="${kind}"`)
      expect(html).toContain('role="alert"')
    },
  )

  it('gives each kind distinct variant styling', () => {
    const registry = createCalloutRegistry()
    const open = (kind: string) => renderCalloutOpen(registry, kind, escape)
    expect(open('tip')).toContain('emerald')
    expect(open('warning')).toContain('amber')
    expect(open('note')).toContain('sky')
  })

  it('returns undefined for an unregistered kind', () => {
    expect(
      renderCalloutOpen(createCalloutRegistry(), 'danger', escape),
    ).toBeUndefined()
  })

  it('escapes the title', () => {
    expect(
      renderCalloutOpen(createCalloutRegistry(), 'tip <b>x', escape),
    ).toContain('&lt;b>x</h5>')
  })
})

describe('calloutPlugin', () => {
  it('renders multiple callouts anywhere in the body', () => {
    const html = render(
      'intro\n\n:::tip\nfirst\n:::\n\nmiddle\n\n:::warning Careful\nsecond\n:::\n\nend',
    )
    expect(html).toContain('data-callout="tip"')
    expect(html).toContain('data-callout="warning"')
    expect(html).toContain('Careful</h5>')
    expect(html.indexOf('intro')).toBeLessThan(html.indexOf('first'))
    expect(html.indexOf('middle')).toBeGreaterThan(html.indexOf('first'))
    expect(html.indexOf('end')).toBeGreaterThan(html.indexOf('second'))
  })

  it('leaves an unregistered kind as plain markdown', () => {
    const html = render(':::danger\nbody\n:::')
    expect(html).not.toContain('data-callout')
    expect(html).toContain(':::danger')
  })

  it('supports registering a new kind later', () => {
    const registry = createCalloutRegistry()
    registry.register('danger', { variant: 'destructive' })
    expect(render(':::danger\nbody\n:::', registry)).toContain(
      'data-callout="danger"',
    )
  })

  it('does not affect fenced code or standard markdown', () => {
    const html = render(
      '# Title\n\n- a\n- b\n\n[link](https://x.dev)\n\n```ts\n:::tip\nnot a callout\n:::\n```',
    )
    expect(html).toContain('<h1>Title</h1>')
    expect(html).toContain('<li>a</li>')
    expect(html).toContain('<a href="https://x.dev">link</a>')
    expect(html).toContain('<pre><code class="language-ts">')
    expect(html).not.toContain('data-callout')
  })

  it('renders nested markdown inside a callout', () => {
    expect(render(':::note\n- item\n:::')).toContain('<li>item</li>')
  })
})
