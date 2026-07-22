/**
 * List of available panels.
 */
export const panels = ['code', 'processes', 'result', 'terminal'] as const

/**
 * Type representing available panels.
 */
export type Panel = (typeof panels)[number]

/**
 * Builds a `{ [panel]: boolean }` lookup indicating which panels are present in `shown`.
 */
export const toPanelRecord = (shown: Panel[]) =>
  Object.fromEntries(
    panels.map((panel) => [panel, shown.includes(panel)]),
  ) as Record<Panel, boolean>
