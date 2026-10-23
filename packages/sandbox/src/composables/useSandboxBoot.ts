import { type BootOptions, WebContainer } from '@webcontainer/api'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'

/**
 * A simple composable for convenience to boot a web container and return the promise along with the status.
 *
 * Booting happens on mount only, so it is safe to use while rendering on the server: nothing is booted and the
 * returned promise simply stays pending. A failed boot rejects the promise and sets `error`, but never produces an
 * unhandled rejection by itself.
 * @param options
 */
export const useSandboxBoot = (options?: BootOptions) => {
  const isBooting = ref(true)
  const error = ref<unknown>()

  let resolveBoot!: (
    container: Awaited<ReturnType<typeof WebContainer.boot>>,
  ) => void
  let rejectBoot!: (reason: unknown) => void
  const boot = new Promise<Awaited<ReturnType<typeof WebContainer.boot>>>(
    (resolve, reject) => {
      resolveBoot = resolve
      rejectBoot = reject
    },
  )
  // Consumers that await `boot` still see the rejection; this only marks it as handled.
  boot.catch(() => {})

  const start = () => {
    WebContainer.boot(options).then(
      (container) => {
        isBooting.value = false
        resolveBoot(container)
      },
      (reason) => {
        isBooting.value = false
        error.value = reason
        rejectBoot(reason)
      },
    )
  }

  if (getCurrentInstance()) onMounted(start)

  return {
    boot,
    error: computed(() => error.value),
    isBooting: computed(() => isBooting.value),
  }
}
