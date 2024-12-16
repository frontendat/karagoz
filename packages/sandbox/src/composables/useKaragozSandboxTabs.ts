import { computed, Ref, ref } from 'vue'

import type { Tab } from '../types'

export const useKaragozSandboxTabs = <T = undefined>() => {
  const tabs: Ref<Tab<T>[]> = ref([])

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

  const findTabIndex = (id: string) => tabs.value.findIndex((f) => id === f.id)
  const findTab = (id: string) => {
    const index = findTabIndex(id)
    return index === -1 ? undefined : tabs.value.at(index)
  }

  const close = (id: string) => {
    const index = findTabIndex(id)
    if (index === -1) return
    tabs.value.splice(index, 1)
  }

  const open = (id: string, label?: string, context?: Tab<T>['context']) => {
    const index = findTabIndex(id)
    if (index === -1) {
      const newTab: Tab<T> = {
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

  const updateContext = (
    id: string,
    setter: (ctx: Tab<T>['context']) => Tab<T>['context'],
  ) => {
    const index = findTabIndex(id)
    tabs.value[index].context = setter(tabs.value[index].context)
  }

  return {
    close,
    current,
    findTab,
    findTabIndex,
    open,
    tabs: computed(() => tabs.value),
    updateContext,
  }
}
