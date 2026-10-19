import { useResizeObserver } from '@vueuse/core'
import { computed, type MaybeRefOrGetter, ref, toValue } from 'vue'

/** Minimum container width for the full (desktop) layout; `none` always uses the mobile layout. */
export type FullLayoutFrom =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'

/**
 * Desktop/mobile switch driven by the component's own width, mirroring `KrgzSandbox`'s `multiPanelFrom`:
 * a `@container/hayali` query sets `--full-layout` on `el`, which is read back whenever `el` resizes.
 */
export function useFullLayout(
  el: MaybeRefOrGetter<HTMLElement | null | undefined>,
  from: MaybeRefOrGetter<FullLayoutFrom>,
) {
  const fullLayout = ref(true)

  const fullLayoutClass = computed(() => {
    // DO NOT use string concatenation as that would break the resulting CSS.
    switch (toValue(from)) {
      case 'none':
        return undefined
      case 'xs':
        return '@xs/hayali:[--full-layout:1]'
      case 'sm':
        return '@sm/hayali:[--full-layout:1]'
      case 'md':
        return '@md/hayali:[--full-layout:1]'
      case 'lg':
        return '@lg/hayali:[--full-layout:1]'
      case 'xl':
        return '@xl/hayali:[--full-layout:1]'
      case '2xl':
        return '@2xl/hayali:[--full-layout:1]'
      case '3xl':
        return '@3xl/hayali:[--full-layout:1]'
      case '4xl':
        return '@4xl/hayali:[--full-layout:1]'
      case '5xl':
        return '@5xl/hayali:[--full-layout:1]'
      case '6xl':
        return '@6xl/hayali:[--full-layout:1]'
      case '7xl':
        return '@7xl/hayali:[--full-layout:1]'
    }
  })

  useResizeObserver(
    () => toValue(el),
    (entries) => {
      fullLayout.value =
        getComputedStyle(entries[0].target).getPropertyValue(
          '--full-layout',
        ) === '1'
    },
  )

  return { fullLayout, fullLayoutClass }
}
