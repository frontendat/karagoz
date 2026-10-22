/** Minimum container width, in rem, per `fullLayoutFrom` value (Tailwind's container breakpoints). */
export const FULL_LAYOUT_BREAKPOINTS = {
  xs: 20,
  sm: 24,
  md: 28,
  lg: 32,
  xl: 36,
  '2xl': 42,
  '3xl': 48,
  '4xl': 56,
  '5xl': 64,
  '6xl': 72,
  '7xl': 80,
} as const

/** Minimum container width for the side-by-side layout; `none` always uses the single-panel layout. */
export type FullLayoutFrom = 'none' | keyof typeof FULL_LAYOUT_BREAKPOINTS
