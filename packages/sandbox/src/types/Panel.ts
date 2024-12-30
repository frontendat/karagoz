/**
 * List of available panels.
 */
export const panels = ['code', 'processes', 'result', 'terminal'] as const

/**
 * Type representing available panels.
 */
export type Panel = (typeof panels)[number]
