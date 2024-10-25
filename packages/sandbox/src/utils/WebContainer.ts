import { injectLocal, provideLocal } from '@vueuse/core'
import { WebContainer } from '@webcontainer/api'
import { InjectionKey } from 'vue'

const WebContainerInjectionKey = Symbol(
  'WebContainer',
) as InjectionKey<WebContainer>

export const provideWebContainer = (webContainer: WebContainer) =>
  provideLocal(WebContainerInjectionKey, webContainer)

export const injectWebContainer = () =>
  injectLocal(
    WebContainerInjectionKey,
    new Proxy({} as WebContainer, {
      get: () => {
        const error = new Error(
          'WebContainer instance not provided. Call provideWebContainer() before injectWebContainer()',
        )
        console.error(error)
        throw error
      },
    }),
  )
