<script setup lang="ts">
const route = useRouter().currentRoute

const pathParts = computed(() => route.value.path.split('/').slice(0, 3))
const topPath = computed(() =>
  2 <= pathParts.value.length
    ? pathParts.value.slice(0, 2).join('/')
    : undefined,
)
const bottomPath = computed(() =>
  3 === pathParts.value.length ? pathParts.value.join('/') : undefined,
)

const topQuery = computed(() =>
  topPath.value ? queryContent(topPath.value) : undefined,
)

const bottomQuery = computed(() =>
  bottomPath.value
    ? queryContent(bottomPath.value).where({
        _id: { $not: { $regex: /index.md$/ } },
      })
    : undefined,
)

const getTitle = async (path?: string) => {
  if (!path) return '...'
  const content = await queryContent(path).findOne()
  return (
    content?.navigation?.sidebarTitle ??
    content?.navigation?.title ??
    content?.title ??
    '...'
  )
}

const { data: topTitle } = useAsyncData(() => getTitle(topPath.value), {
  watch: [topPath],
})

const { data: bottomTitle } = useAsyncData(() => getTitle(bottomPath.value), {
  watch: [bottomPath],
})
</script>

<template>
  <nav class="pe-6 py-8 text-sm">
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
