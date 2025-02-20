<script setup lang="ts">
onMounted(() => {
  if (import.meta.dev) return
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('Service Worker Registered')
      })
      .catch((err) => {
        console.error('Service Worker Registration Failed:', err)
      })
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
