<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const queryLocalisedCollection = useLocalisedCollection()
const contentPath = useContentPath()

const { data: page } = await useAsyncData(contentPath.value, () => {
  return queryLocalisedCollection((builder) => builder.path(contentPath.value).first())
}, { watch: [contentPath] })
</script>

<template>
  <ContentRenderer v-if="page" :value="page"> </ContentRenderer>
  <DocsNotFound v-else />
</template>
