<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    href?: string
    target?: string
  }>(),
  {
    href: '',
    target: undefined,
  },
)

const { locales } = useI18n()
const localePath = useLocalePath()

// Content links are written without a locale (e.g. `/sandbox/setup`).
// Prefix internal ones with the current locale; leave external and
// already-localised links untouched.
const localisedHref = computed(() => {
  const isInternal = props.href.startsWith('/') && !props.href.startsWith('//')
  if (!isInternal) return props.href
  const localeCodes = locales.value.map((locale) => locale.code)
  if (stripLocalePrefix(props.href, localeCodes) !== props.href) {
    return props.href
  }
  return localePath(props.href)
})
</script>

<template>
  <NuxtLink :href="localisedHref" :target="target">
    <slot />
  </NuxtLink>
</template>
