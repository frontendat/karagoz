/** The prose half of the demo lesson for one locale: chapter id → title, step id → title and body (markdown). */
export interface DemoProse {
  chapters?: Record<string, string>
  steps?: Record<string, { title: string; body: string }>
}
