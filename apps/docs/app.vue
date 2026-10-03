<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'

const dir = useLocaleDir()
</script>

<template>
  <ConfigProvider :dir="dir">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
