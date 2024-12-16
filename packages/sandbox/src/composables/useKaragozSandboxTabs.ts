import { computed, Ref, ref } from 'vue'

import type { Tabs } from '../types'

export const useKaragozSandboxTabs = <T = undefined>() => {
  const tabs: Ref<Tabs.Tab<T>[]> = ref([])

  const maxOrder = computed(() =>
    tabs.value.length
      ? Math.max.apply(
          undefined,
          tabs.value.map(({ order }) => order),
        )
      : 0,
  )

  const current = computed(() =>
    tabs.value.find(({ order }) => order === maxOrder.value),
  )

  const close = (id: string) => {
    const index = tabs.value.findIndex((f) => id === f.id)
    if (index === -1) return
    tabs.value.splice(index, 1)
  }

  const open = (
    id: string,
    label?: string,
    context?: Tabs.Tab<T>['context'],
  ) => {
    const index = tabs.value.findIndex((f) => id === f.id)
    if (index === -1) {
      const newTab: Tabs.Tab<T> = {
        id,
        label: label ?? id,
        order: maxOrder.value + 1,
        context,
      }
      tabs.value.push(newTab)
    } else if (tabs.value[index].order !== maxOrder.value) {
      tabs.value[index].order = maxOrder.value + 1
    }
  }

  return {
    close,
    current,
    open,
    tabs: computed(() => tabs.value),
  }
}
