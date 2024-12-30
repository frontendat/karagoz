import { type BootOptions, WebContainer } from '@webcontainer/api'
import { ref } from 'vue'

/**
 * A simple composable for convenience to boot a web container and return the promise along with the status.
 * @param options
 */
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
