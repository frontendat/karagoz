export type Tab<T = undefined> = {
  id: string
  context?: T
  label: string
  order: number
}
