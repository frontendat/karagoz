import { type BootOptions, WebContainer } from '@webcontainer/api'
import { ref } from 'vue'

export const useSandboxBoot = (options?: BootOptions) => {
  const isBooting = ref(true)

  const boot = WebContainer.boot(options).then((container) => {
    isBooting.value = false
    return container
  })

  return {
    boot,
    isBooting,
  }
}
