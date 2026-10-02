import type { Collections, ContentNavigationItem } from '@nuxt/content'

type LocalisedCollectionNavigationHandler<R> = (
  builder: ReturnType<typeof queryCollectionNavigation>,
) => Promise<R>

const collectTitles = (
  items: ContentNavigationItem[],
  titles = new Map<string, string>(),
) => {
  for (const item of items) {
    titles.set(item.path, item.title)
    if (item.children) collectTitles(item.children, titles)
  }
  return titles
}

const applyTitles = (
  items: ContentNavigationItem[],
  titles: Map<string, string>,
): ContentNavigationItem[] =>
  items.map((item) => ({
    ...item,
    title: titles.get(item.path) ?? item.title,
    ...(item.children && { children: applyTitles(item.children, titles) }),
  }))

/**
 * Queries navigation using the default locale's structure, so pages without a
 * translation (e.g. generated pages) still appear. Titles are taken from the
 * current locale wherever a translation exists.
 */
export const useLocalisedCollectionNavigation = () => {
  const { defaultLocale, locale } = useI18n()

  return <R extends ContentNavigationItem[]>(
    handler: LocalisedCollectionNavigationHandler<R>,
    fallback: R | undefined = undefined,
  ) => {
    const defaultNavigation = handler(
      queryCollectionNavigation(
        `content_${defaultLocale}` as keyof Collections,
      ),
    )
    if (defaultLocale === locale.value) {
      return defaultNavigation.catch((error) => {
        console.log('Unable to perform query.')
        console.error(error)
        return fallback ?? ([] as unknown as R)
      })
    }

    const localisedNavigation = handler(
      queryCollectionNavigation(`content_${locale.value}` as keyof Collections),
    ).catch((error) => {
      console.log('Unable to query localised navigation. Using default titles.')
      console.error(error)
      return [] as unknown as R
    })

    return Promise.all([defaultNavigation, localisedNavigation])
      .then(
        ([items, localisedItems]) =>
          applyTitles(items, collectTitles(localisedItems)) as R,
      )
      .catch((error) => {
        console.log('Unable to perform query.')
        console.error(error)
        return fallback ?? ([] as unknown as R)
      })
  }
}
