/** The prose half of the demo lesson for one locale: chapter ID → title, step ID → title and body (markdown). */
export interface DemoProse {
  chapters?: Record<string, string>
  steps?: Record<string, { title: string; body: string }>
}
