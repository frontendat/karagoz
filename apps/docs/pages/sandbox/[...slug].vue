<script setup lang="ts">
definePageMeta({
  layout: 'docs',
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
  <DocsNotFound v-else-if="status === 'success'" />
</template>
