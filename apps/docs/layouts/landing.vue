<script setup lang="ts">
import DefaultLayout from '~/layouts/default.vue'
</script>

<template>
  <DefaultLayout>
    <main class="container mx-auto px-8 md:px-0">
      <slot></slot>
    </main>
  </DefaultLayout>
</template>
