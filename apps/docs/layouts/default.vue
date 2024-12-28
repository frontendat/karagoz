<template>
  <div class="min-h-full">
    <TopBar />
    <main>
      <slot></slot>
    </main>
  </div>
</template>
<script setup lang="ts">
import TopBar from '~/components/docs/TopBar.vue'
</script>
