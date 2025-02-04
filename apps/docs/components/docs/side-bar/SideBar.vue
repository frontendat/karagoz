<script setup lang="ts">
import { fallbackTitleKey } from '~/utils/fallbackTitleKey'

const { t } = useI18n()
const route = useRouter().currentRoute
const queryLocalisedCollection = useLocalisedCollection()
const queryLocalisedCollectionNavigation = useLocalisedCollectionNavigation()

const pathParts = computed(() => route.value.path.split('/').slice(0, 3))
const topPath = computed(() =>
  2 <= pathParts.value.length
    ? pathParts.value.slice(0, 2).join('/')
    : undefined,
)
const bottomPath = computed(() =>
  3 === pathParts.value.length ? pathParts.value.join('/') : undefined,
)

const { data: topNav } = await useAsyncData(
  `sidebar-top-${topPath.value}`,
  () =>
    topPath.value
      ? queryLocalisedCollectionNavigation((builder) =>
          builder.where('path', 'LIKE', `${topPath.value}%`),
        )
      : Promise.resolve(null),
  {
    watch: [topPath],
  },
)

const { data: bottomNav } = await useAsyncData(
  `sidebar-bottom-${bottomPath.value}`,
  () =>
    bottomPath.value
      ? queryLocalisedCollectionNavigation((builder) =>
          builder
            .where('path', 'LIKE', `${bottomPath.value}%`)
            .where('id', 'NOT LIKE', '%index.md'),
        )
      : Promise.resolve(null),
  {
    watch: [bottomPath],
  },
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
  `sidebar-top-title-${topPath.value}`,
  () => getTitle(topPath.value),
  {
    watch: [topPath],
  },
)

const { data: bottomTitle } = useAsyncData(
  `sidebar-bottom-title-${bottomPath.value}`,
  () => getTitle(bottomPath.value),
  {
    watch: [bottomPath],
  },
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
