/**
 * Strips the locale prefix (e.g. `/de`) from a route path.
 * Content collections store paths without the locale, so `/de/sandbox` → `/sandbox`.
 */
export const stripLocalePrefix = (path: string, localeCodes: string[]) => {
  const prefix = localeCodes.find(
    (code) => path === `/${code}` || path.startsWith(`/${code}/`),
  )
  return prefix ? path.slice(prefix.length + 1) || '/' : path
}

/**
 * The content path of the current route, i.e. the route path without the locale prefix.
 */
export const useContentPath = () => {
  const { locales } = useI18n()
  const route = useRouter().currentRoute

  return computed(() =>
    stripLocalePrefix(
      route.value.path,
      locales.value.map((locale) => locale.code),
    ),
  )
}
