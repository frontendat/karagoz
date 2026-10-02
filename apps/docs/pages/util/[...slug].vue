<script lang="ts" setup>
definePageMeta({
  layout: 'util',
})

const route = useRoute()
const contentPath = useContentPath()
const queryLocalisedCollection = useLocalisedCollection()
const isLocaleFallback = useIsLocaleFallback()

const { data: page, status } = await useAsyncData(route.path, () => {
  return queryLocalisedCollection((builder) =>
    builder.path(contentPath.value).first(),
  )
})
</script>

<template>
  <template v-if="page">
    <DocsLocaleFallbackNotice v-if="isLocaleFallback(page)" class="mb-8" />
    <ContentRenderer :value="page" />
  </template>
  <div v-else-if="status === 'success'" class="container mx-auto">
    <div class="mx-auto py-6 lg:py-8 prose dark:prose-invert">
      <DocsNotFound />
    </div>
  </div>
</template>
