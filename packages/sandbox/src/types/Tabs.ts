export type KaragozSandboxTab<T = undefined> = {
  id: string
  context?: T
  label: string
  order: number
}
