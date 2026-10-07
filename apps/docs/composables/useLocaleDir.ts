/**
 * The text direction (`ltr`/`rtl`) of the current locale.
 */
export const useLocaleDir = () => {
  const { localeProperties } = useI18n()

  return computed(() => localeProperties.value.dir ?? 'ltr')
}
