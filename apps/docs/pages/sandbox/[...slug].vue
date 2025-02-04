<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const queryLocalisedCollection = useLocalisedCollection()

const { data: page } = await useAsyncData(route.path, () => {
  return queryLocalisedCollection((builder) => builder.path(route.path).first())
})
</script>

<template>
  <ContentRenderer v-if="page" :value="page"> </ContentRenderer>
  <DocsNotFound v-else />
</template>
