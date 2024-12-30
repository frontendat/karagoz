import { computed, Ref, ref } from 'vue'

import type { Tab } from '../types'

/**
 * Composable for generic handling of tabbed views.
 */
export const useSandboxTabs = <T = undefined>() => {
  const tabs: Ref<Tab<T>[]> = ref([])

  /**
   * The current highest `order` in the tab list.
   */
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

  /**
   * Find the tab index corresponding to given ID.
   * @param id
   */
  const findTabIndex = (id: string) => tabs.value.findIndex((f) => id === f.id)

  /**
   * Find the tab corresponding to given ID.
   * @param id
   */
  const findTab = (id: string) => {
    const index = findTabIndex(id)
    return index === -1 ? undefined : tabs.value.at(index)
  }

  /**
   * Close a tab corresponding to given ID.
   * @param id
   */
  const close = (id: string) => {
    const index = findTabIndex(id)
    if (index === -1) return
    tabs.value.splice(index, 1)
  }

  /**
   * Open a tab. If a tab with the same ID exists it will be focused, otherwise a new tab is created and focused.
   * @param id
   * @param label
   * @param context
   */
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

  /**
   * Update the context data of the tab corresponding to give ID.
   * @param id
   * @param setter a callback that receives the old context and returns the new context to be set.
   */
  const updateContext = (id: string, setter: (ctx: T) => T) => {
    const index = findTabIndex(id)
    const context = tabs.value[index]?.context
    if (context !== undefined) {
      tabs.value[index].context = setter(context)
    }
  }

  return {
    close,
    /**
     * Computed ref containing the currently focused tab.
     */
    current,
    findTab,
    findTabIndex,
    open,
    /**
     * List of tabs.
     */
    tabs: computed(() => tabs.value),
    updateContext,
  }
}
