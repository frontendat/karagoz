<script setup lang="ts">
import { fallbackTitleKey } from '~/utils/fallbackTitleKey'

const { locale, t } = useI18n()
const contentPath = useContentPath()
const queryLocalisedCollection = useLocalisedCollection()
const queryLocalisedCollectionNavigation = useLocalisedCollectionNavigation()

const pathParts = computed(() => contentPath.value.split('/').slice(0, 3))
const topPath = computed(() =>
  2 <= pathParts.value.length
    ? pathParts.value.slice(0, 2).join('/')
    : undefined,
)
const bottomPath = computed(() =>
  3 === pathParts.value.length ? pathParts.value.join('/') : undefined,
)

const { data: topNav } = await useAsyncData(
  () => `sidebar-top-${locale.value}-${topPath.value}`,
  () =>
    topPath.value
      ? queryLocalisedCollectionNavigation((builder) =>
          builder.where('path', 'LIKE', `${topPath.value}%`),
        )
      : Promise.resolve(null),
)

const { data: bottomNav } = await useAsyncData(
  () => `sidebar-bottom-${locale.value}-${bottomPath.value}`,
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
      ? (content?.navigation?.sidebarTitle ?? content?.navigation?.title)
      : undefined,
    content?.title,
    t(fallbackTitleKey(path), '...'),
  ].find((title) => !!title)
}

const { data: topTitle } = useAsyncData(
  () => `sidebar-top-title-${locale.value}-${topPath.value}`,
  () => getTitle(topPath.value),
)

const { data: bottomTitle } = useAsyncData(
  () => `sidebar-bottom-title-${locale.value}-${bottomPath.value}`,
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
