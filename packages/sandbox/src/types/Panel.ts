export const panels = ['code', 'processes', 'result', 'terminal'] as const

export type Panel = (typeof panels)[number]
