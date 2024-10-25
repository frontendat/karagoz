import { computed, ref } from 'vue'

import type {
  KaragozSandboxEditorTab,
  KaragozSandFileListenerParams,
} from '../types'

export const useKaragozSandboxTabs = () => {
  const tabs = ref<KaragozSandboxEditorTab[]>([])

  const maxOrder = computed(() =>
    tabs.value.length
      ? Math.max.apply(
          undefined,
          tabs.value.map(({ order }) => order),
        )
      : 0,
  )

  const latestTab = computed(() =>
    tabs.value.find(({ order }) => order === maxOrder.value),
  )

  const handleFileEvent = ({
    operation,
    path,
  }: KaragozSandFileListenerParams) => {
    const index = tabs.value.findIndex((f) => path === f.path)
    if (operation === 'open') {
      if (index === -1) {
        tabs.value.push({
          order: maxOrder.value + 1,
          path,
        })
      } else if (tabs.value[index].order !== maxOrder.value) {
        tabs.value[index].order = maxOrder.value + 1
      }
    } else {
      if (index === -1) return
      tabs.value.splice(index, 1)
    }
  }

  return {
    handleFileEvent,
    latestTab,
    tabs: computed(() => tabs.value),
  }
}
