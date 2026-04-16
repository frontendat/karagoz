<script lang="ts" setup>
definePageMeta({
  layout: 'util',
})

const queryLocalisedCollection = useLocalisedCollection()
const contentPath = useContentPath()

const { data: page } = await useAsyncData(contentPath.value, () => {
  return queryLocalisedCollection((builder) => builder.path(contentPath.value).first())
}, { watch: [contentPath] })
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
  <div v-else class="container">
    <div class="mx-auto py-6 lg:py-8 prose dark:prose-invert">
      <DocsNotFound />
    </div>
  </div>
</template>
