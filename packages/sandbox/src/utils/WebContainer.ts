import { injectLocal, provideLocal } from '@vueuse/core'
import { WebContainer } from '@webcontainer/api'
import { InjectionKey } from 'vue'

/**
 * Web container injection key. Use internally by `injectWebContainer()`.
 */
const WebContainerInjectionKey = Symbol('WebContainer') as InjectionKey<
  Promise<WebContainer>
>

/**
 * Provide the promise resulting from `WebContainer.boot()` to be injected and used by components and composables.
 *
 * Keep in mind that [only one WebContainer instance can run at a time](https://webcontainers.io/api#%E2%96%B8-boot).
 * It is the responsibility of the consumer to make sure that the old instance has been torn down before booting another.
 *
 * @example
 * provideWebContainer(WebContainer.boot())
 * // or
 * const { boot, isBooting } = useSandboxBoot()
 * provideWebContainer(boot)
 *
 * @param webContainerPromise the promise returned by `WebContainer.boot()`
 */
export const provideWebContainer = (
  webContainerPromise: Promise<WebContainer>,
) => provideLocal(WebContainerInjectionKey, webContainerPromise)

/**
 * Injects the web container promise using `WebContainerInjectionKey`. Used internally by `useSandbox()`.
 *
 * @throws Error if the web container promise has not been injected.
 */
export const injectWebContainer = () =>
  injectLocal(
    WebContainerInjectionKey,
    new Proxy({} as Promise<WebContainer>, {
      get: () => {
        const error = new Error(
          'WebContainer instance not provided. Call provideWebContainer() before injectWebContainer()',
        )
        console.error(error)
        throw error
      },
    }),
  )
