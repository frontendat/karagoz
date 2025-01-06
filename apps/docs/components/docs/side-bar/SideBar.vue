<script setup lang="ts">
import type { ParsedContent, QueryBuilder } from '@nuxt/content'

const route = useRouter().currentRoute

const pathParts = computed(() => route.value.path.split('/').slice(0, 3))
const topPath = computed(() => pathParts.value.slice(0, 2).join('/'))
const bottomPath = computed(() => pathParts.value.join('/'))

const topQuery = computed(() =>
  2 <= pathParts.value.length ? queryContent(topPath.value) : undefined,
)

const bottomQuery = computed(() =>
  3 === pathParts.value.length
    ? queryContent(bottomPath.value).where({
        _id: { $not: { $regex: /index.md$/ } },
      })
    : undefined,
)

const getTitle = async (
  query: QueryBuilder<ParsedContent> | undefined,
  path: string,
) => {
  if (!query) return undefined
  const content = await query
    .where({
      _path: path,
    })
    .findOne()
  return (
    content?.navigation?.sidebarTitle ??
    content?.navigation?.title ??
    content?.title ??
    '...'
  )
}

const { data: topTitle } = useAsyncData(
  () => getTitle(topQuery.value, topPath.value),
  { watch: [topPath] },
)

const { data: bottomTitle } = useAsyncData(
  () => getTitle(topQuery.value, bottomPath.value),
  { watch: [bottomPath] },
)
</script>

<template>
  <nav class="pe-6 py-6 text-sm">
    <ContentNavigation
      v-if="topQuery"
      v-slot="{ navigation }"
      :key="pathParts.slice(0, 2).join('/')"
      :query="topQuery"
    >
      <DocsSideBarLevel
        :items="navigation ?? []"
        :init-level="1"
        :max-level="1"
        :title="topTitle"
      />
    </ContentNavigation>
    <ContentNavigation
      v-if="bottomQuery"
      v-slot="{ navigation }"
      :key="pathParts.join('/')"
      :query="bottomQuery"
    >
      <DocsSideBarLevel
        class="border-t mt-4 pt-4"
        :init-level="2"
        :items="navigation ?? []"
        :title="bottomTitle"
      />
    </ContentNavigation>
  </nav>
</template>
