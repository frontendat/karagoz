<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { fallbackTitleKey } from '~/utils/fallbackTitleKey'

const { t } = useI18n()
const route = useRouter().currentRoute
const pathParts = computed(() => route.value.path.split('/'))

const titleKey = computed(() => fallbackTitleKey(pathParts.value))

// Query at section depth (path[:3]) rather than the full route path.
// This keeps intermediate directory nodes that have an explicit index.md
// (e.g. /sandbox/api-reference) present in the navigation tree even when
// the LIKE filter is narrowed to a deeper sub-path. Without this, those
// nodes are excluded from the SQLite result set and Nuxt Content drops them
// from the tree, making the old fixed-depth [0] traversal skip a level.
const sectionPath = computed(() => pathParts.value.slice(0, 3).join('/'))

const queryLocalisedCollectionNavigation = useLocalisedCollectionNavigation()

const { data: result } = await useAsyncData(
  () => `not-found-nav-${sectionPath.value}`,
  () =>
    queryLocalisedCollectionNavigation((builder) =>
      builder.where('path', 'LIKE', `${sectionPath.value}%`),
    ),
)

const findChildren = (
  items: ContentNavigationItem[] | null | undefined,
  targetPath: string,
): ContentNavigationItem[] | undefined => {
  if (!Array.isArray(items)) return undefined
  for (const item of items) {
    if (item.path === targetPath) return item.children
    if (item.children && targetPath.startsWith(item.path + '/')) {
      const found = findChildren(item.children, targetPath)
      if (found !== undefined) return found
    }
  }
  return undefined
}

const list = computed(() => findChildren(result.value, route.value.path))
</script>

<template>
  <div>
    <h1>{{ t(titleKey, t('pages.notFound.title')) }}</h1>

    <template v-if="list?.length">
      <p>
        {{ t('pages.notFound.content') }}
      </p>
      <ul>
        <li v-for="item in list" :key="item.path">
          <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </template>

    <p v-else>
      {{ t('pages.notFound.noContent') }}
    </p>
  </div>
</template>
