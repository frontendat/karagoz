import { WebContainer } from '@webcontainer/api'
import { ref } from 'vue'

export const useBoot = () => {
  const isBooting = ref(true)

  const boot = WebContainer.boot().then((container) => {
    isBooting.value = false
    return container
  })

  return {
    boot,
    isBooting,
  }
}
