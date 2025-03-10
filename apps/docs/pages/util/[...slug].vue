<script lang="ts" setup>
definePageMeta({
  layout: 'util',
})

const route = useRoute()
const queryLocalisedCollection = useLocalisedCollection()

const { data: page } = await useAsyncData(route.path, () => {
  return queryLocalisedCollection((builder) => builder.path(route.path).first())
})
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
  <div v-else class="container">
    <div class="mx-auto py-6 lg:py-8 prose dark:prose-invert">
      <DocsNotFound />
    </div>
  </div>
</template>
