import { type Panel, panels } from '../types'

/**
 * Builds a `{ [panel]: boolean }` lookup indicating which panels are present in `shown`.
 */
export const toPanelRecord = (shown: Panel[]) =>
  Object.fromEntries(
    panels.map((panel) => [panel, shown.includes(panel)]),
  ) as Record<Panel, boolean>
