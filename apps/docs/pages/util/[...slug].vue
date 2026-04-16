<script lang="ts" setup>
definePageMeta({
  layout: 'util',
})

const queryLocalisedCollection = useLocalisedCollection()
const contentPath = useContentPath()

const { data: page } = await useAsyncData(
  contentPath.value,
  () => queryLocalisedCollection((builder) => builder.path(contentPath.value).first()),
  {
    getCachedData(key, nuxtApp) {
      const cached = nuxtApp.payload.data[key]
      return cached?.body ? cached : undefined
    },
  },
)
</script>

<template>
  <ContentRenderer v-if="page?.body" :value="page" />
  <div v-else class="container">
    <div class="mx-auto py-6 lg:py-8 prose dark:prose-invert">
      <DocsNotFound />
    </div>
  </div>
</template>
