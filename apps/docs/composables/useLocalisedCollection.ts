import type { Collections } from '@nuxt/content'

type LocalisedCollectionHandler<R> = (
  builder: ReturnType<typeof queryCollection>,
) => Promise<R>

export const useLocalisedCollection = () => {
  const { defaultLocale, locale } = useI18n()

  return <R>(
    handler: LocalisedCollectionHandler<R>,
    fallback: R | undefined = undefined,
  ) => {
    const collection = queryCollection(
      `content_${locale.value}` as keyof Collections,
    )
    const defaultCollection = queryCollection(
      `content_${defaultLocale}` as keyof Collections,
    )
    return handler(collection)
      .catch((error) => {
        if (defaultLocale === locale.value) {
          return Promise.reject(error)
        }
        console.log('Unable to perform query. Re-trying with default locale.')
        return handler(defaultCollection)
      })
      .catch((error) => {
        console.log('Unable to perform query.')
        console.error(error)
        return fallback || ({} as R) // to avoid `void` return
      })
  }
}
