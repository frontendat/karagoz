<script setup lang="ts">
const { locale, t } = useI18n()
const dir = useLocaleDir()
</script>

<template>
  <!-- The notice is translated, unlike the content around it. -->
  <Hint hide-title :lang="locale" :dir="dir">{{
    t('pages.localeFallback.notice')
  }}</Hint>
</template>
