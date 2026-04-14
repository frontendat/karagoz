/**
 * Returns a computed ref that converts the current route path into the
 * locale-prefixed content path used by the @nuxt/content collections.
 *
 * Content is stored under locale-prefixed paths (e.g. /en/sandbox/setup)
 * because the collection source includes the locale directory
 * (`include: 'en/**'`). The default locale is served without a URL prefix
 * by @nuxtjs/i18n (`prefix_and_default` strategy), so route.path for an
 * English page is `/sandbox/setup` while the DB entry is `/en/sandbox/setup`.
 * This composable bridges that gap.
 */
export const useContentPath = () => {
  const { locale } = useI18n()
  const route = useRoute()

  return computed(() => {
    const path = route.path
    const prefix = `/${locale.value}`
    // Already has the correct locale prefix – use as-is.
    if (path === prefix || path.startsWith(`${prefix}/`)) return path
    // Root path maps to the locale root (e.g. / → /en).
    if (path === '/' || path === '') return prefix
    // Otherwise prepend the locale prefix.
    return `${prefix}${path}`
  })
}
