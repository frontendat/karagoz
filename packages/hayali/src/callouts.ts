import {
  alertDescriptionClass,
  alertTitleClass,
  alertVariants,
  type AlertVariants,
} from '@karagoz/shared'
import type { PluginSimple } from 'markdown-it'
import container from 'markdown-it-container'

export interface CalloutDefinition {
  variant: NonNullable<AlertVariants['variant']>
}

export interface CalloutRegistry {
  /** Registers (or replaces) a callout kind, e.g. `:::tip`. */
  register: (kind: string, definition: CalloutDefinition) => void
  get: (kind: string) => CalloutDefinition | undefined
}

export const defaultCallouts: Record<string, CalloutDefinition> = {
  tip: { variant: 'tip' },
  warning: { variant: 'warning' },
  note: { variant: 'note' },
}

export function createCalloutRegistry(
  initial: Record<string, CalloutDefinition> = defaultCallouts,
): CalloutRegistry {
  const definitions = new Map(Object.entries(initial))
  return {
    register: (kind, definition) => definitions.set(kind, definition),
    get: (kind) => definitions.get(kind),
  }
}

/** Splits a container info string (`tip Custom title`) into kind and optional title. */
export function parseCalloutInfo(info: string): {
  kind: string
  title: string
} {
  const [kind = '', ...title] = info.trim().split(/\s+/)
  return { kind, title: title.join(' ') }
}

/**
 * Pure transform: callout info string → opening HTML using the shared Alert
 * styling, or `undefined` when the kind is not registered.
 */
export function renderCalloutOpen(
  registry: CalloutRegistry,
  info: string,
  escape: (text: string) => string,
): string | undefined {
  const { kind, title } = parseCalloutInfo(info)
  const definition = registry.get(kind)
  if (!definition) return undefined

  const heading = title
    ? `<h5 class="${alertTitleClass}">${escape(title)}</h5>`
    : ''
  return (
    `<div class="${alertVariants({ variant: definition.variant })}" role="alert" data-callout="${escape(kind)}">` +
    heading +
    `<div class="${alertDescriptionClass}">`
  )
}

export const CALLOUT_CLOSE_HTML = '</div></div>'

/**
 * markdown-it plugin recognising `:::kind [title]` ... `:::` blocks for every
 * kind in the registry. Unregistered kinds are left as plain markdown.
 */
export function calloutPlugin(registry: CalloutRegistry): PluginSimple {
  return (md) => {
    md.use(container, 'callout', {
      validate: (params: string) =>
        registry.get(parseCalloutInfo(params).kind) !== undefined,
      render: (
        tokens: { info: string; nesting: number }[],
        idx: number,
      ): string => {
        const token = tokens[idx]!
        if (token.nesting !== 1) return CALLOUT_CLOSE_HTML
        return (
          renderCalloutOpen(registry, token.info, md.utils.escapeHtml) ?? ''
        )
      },
    })
  }
}
