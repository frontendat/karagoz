<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const contentPath = useContentPath()
const queryLocalisedCollection = useLocalisedCollection()

const { data: page, status } = await useAsyncData(route.path, () => {
  return queryLocalisedCollection((builder) =>
    builder.path(contentPath.value).first(),
  )
})
</script>

<template>
  <ContentRenderer v-if="page" :value="page"> </ContentRenderer>
  <DocsNotFound v-else-if="status === 'success'" />
</template>
