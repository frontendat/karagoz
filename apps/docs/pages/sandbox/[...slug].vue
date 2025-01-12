<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})
</script>

<template>
  <ContentDoc>
    <template #not-found>
      <DocsNotFound />
    </template>
  </ContentDoc>
</template>
