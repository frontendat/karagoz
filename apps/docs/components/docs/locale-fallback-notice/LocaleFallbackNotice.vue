<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <Hint hide-title>{{ t('pages.localeFallback.notice') }}</Hint>
</template>
