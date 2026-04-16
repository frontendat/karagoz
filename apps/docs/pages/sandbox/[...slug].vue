<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const queryLocalisedCollection = useLocalisedCollection()
const contentPath = useContentPath()

const { data: page } = await useAsyncData(
  () => contentPath.value,
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
  <ContentRenderer v-if="page?.body" :value="page"> </ContentRenderer>
  <DocsNotFound v-else />
</template>
