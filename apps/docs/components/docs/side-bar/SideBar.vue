<script setup lang="ts">
import { fallbackTitleKey } from '~/utils/fallbackTitleKey'

const { t, locale } = useI18n()
const queryLocalisedCollection = useLocalisedCollection()
const queryLocalisedCollectionNavigation = useLocalisedCollectionNavigation()
const contentPath = useContentPath()

// Strip the locale prefix so the 2-level hierarchy (/section/page) is
// computed the same way regardless of whether the URL has a locale prefix.
const localePrefix = computed(() => `/${locale.value}`)
const localPath = computed(() => {
  const p = contentPath.value
  if (p.startsWith(`${localePrefix.value}/`)) return p.slice(localePrefix.value.length)
  if (p === localePrefix.value) return '/'
  return p
})

// Re-add the locale prefix for the actual DB queries.
const toContentPath = (localSegmentPath: string) => {
  const pre = localePrefix.value
  if (!localSegmentPath || localSegmentPath === '/') return pre
  if (localSegmentPath.startsWith(`${pre}/`) || localSegmentPath === pre)
    return localSegmentPath
  return `${pre}${localSegmentPath}`
}

const pathParts = computed(() => localPath.value.split('/').slice(0, 3))
const topPath = computed(() =>
  2 <= pathParts.value.length
    ? toContentPath(pathParts.value.slice(0, 2).join('/') || '/')
    : undefined,
)
const bottomPath = computed(() =>
  3 === pathParts.value.length ? toContentPath(pathParts.value.join('/')) : undefined,
)

const { data: topNav } = await useAsyncData(
  () => `sidebar-top-${topPath.value}`,
  () =>
    topPath.value
      ? queryLocalisedCollectionNavigation((builder) =>
          builder.where('path', 'LIKE', `${topPath.value}%`),
        )
      : Promise.resolve(null),
)

const { data: bottomNav } = await useAsyncData(
  () => `sidebar-bottom-${bottomPath.value}`,
  () =>
    bottomPath.value
      ? queryLocalisedCollectionNavigation((builder) =>
          builder
            .where('path', 'LIKE', `${bottomPath.value}%`)
            .where('id', 'NOT LIKE', '%index.md'),
        )
      : Promise.resolve(null),
)

const getTitle = async (path?: string) => {
  if (!path) return '...'
  const content = await queryLocalisedCollection((builder) =>
    builder.path(path).first(),
  )
  return [
    typeof content?.navigation === 'object'
      ? content?.navigation?.sidebarTitle ?? content?.navigation?.title
      : undefined,
    content?.title,
    t(fallbackTitleKey(path), '...'),
  ].find((title) => !!title)
}

const { data: topTitle } = useAsyncData(
  () => `sidebar-top-title-${topPath.value}`,
  () => getTitle(topPath.value),
)

const { data: bottomTitle } = useAsyncData(
  () => `sidebar-bottom-title-${bottomPath.value}`,
  () => getTitle(bottomPath.value),
)
</script>

<template>
  <nav class="pe-6 py-8 text-sm">
    <template v-if="topNav?.length">
      <DocsSideBarLevel
        :key="pathParts.slice(0, 2).join('/')"
        :items="topNav ?? []"
        :init-level="1"
        :max-level="1"
        :title="topTitle"
      />
    </template>
    <template v-if="bottomNav?.length">
      <DocsSideBarLevel
        :key="pathParts.join('/')"
        class="border-t mt-4 pt-4"
        :init-level="2"
        :items="bottomNav ?? []"
        :title="bottomTitle"
      />
    </template>
  </nav>
</template>
