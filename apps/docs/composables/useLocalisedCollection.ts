import type { Collections } from '@nuxt/content'

type LocalisedCollectionHandler<R> = (
  builder: ReturnType<typeof queryCollection>,
) => Promise<R>

/**
 * Whether a content item was served from the default locale's collection
 * while a different locale is active (i.e. the page has no translation).
 */
export const useIsLocaleFallback = () => {
  const { defaultLocale, locale } = useI18n()

  return (item?: { id?: string } | null) =>
    !!item?.id &&
    locale.value !== defaultLocale &&
    item.id.startsWith(`content_${defaultLocale}/`)
}

export const useLocalisedCollection = () => {
  const { defaultLocale, locale } = useI18n()

  return <R>(
    handler: LocalisedCollectionHandler<R>,
    fallback: R | undefined = undefined,
  ) => {
    const queryDefaultLocale = () =>
      handler(queryCollection(`content_${defaultLocale}` as keyof Collections))

    const collection = queryCollection(
      `content_${locale.value}` as keyof Collections,
    )
    return handler(collection)
      .then((result) => {
        // No translation for this query: fall back to the default locale.
        if (result == null && defaultLocale !== locale.value) {
          return queryDefaultLocale()
        }
        return result
      })
      .catch((error) => {
        if (defaultLocale === locale.value) {
          return Promise.reject(error)
        }
        console.log('Unable to perform query. Re-trying with default locale.')
        return queryDefaultLocale()
      })
      .catch((error) => {
        console.log('Unable to perform query.')
        console.error(error)
        return (fallback ?? null) as R
      })
  }
}
