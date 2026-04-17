<script setup lang="ts">
import DefaultLayout from '~/layouts/default.vue'
</script>

<template>
  <DefaultLayout>
    <main class="container mx-auto">
      <slot></slot>
    </main>
  </DefaultLayout>
</template>
