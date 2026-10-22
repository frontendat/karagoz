<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <!-- The lesson text is server-rendered; the sandbox boots once the demo is scrolled into view. -->
  <LazyHayaliDemoRunner hydrate-on-visible :locale="locale" />
</template>
