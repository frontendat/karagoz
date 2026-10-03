import type { Collections, ContentNavigationItem } from '@nuxt/content'

import { fallbackTitleKey } from '~/utils/fallbackTitleKey'

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

// Folders without an index page take their title from the folder name.
// Use the translated title from the i18n messages instead, where available.
const applyFolderTitles = (
  items: ContentNavigationItem[],
  translate: (key: string, fallback: string) => string,
): ContentNavigationItem[] =>
  items.map((item) => ({
    ...item,
    ...(item.page === false && {
      title: translate(fallbackTitleKey(item.path), item.title),
    }),
    ...(item.children && {
      children: applyFolderTitles(item.children, translate),
    }),
  }))

/**
 * Queries navigation using the default locale's structure, so pages without a
 * translation (e.g. generated pages) still appear. Titles are taken from the
 * current locale wherever a translation exists.
 */
export const useLocalisedCollectionNavigation = () => {
  const { defaultLocale, locale, t } = useI18n()
  const translate = (key: string, fallback: string) => t(key, fallback)

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
      return defaultNavigation
        .then((items) => applyFolderTitles(items, translate) as R)
        .catch((error) => {
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
          applyFolderTitles(
            applyTitles(items, collectTitles(localisedItems)),
            translate,
          ) as R,
      )
      .catch((error) => {
        console.log('Unable to perform query.')
        console.error(error)
        return fallback ?? ([] as unknown as R)
      })
  }
}
