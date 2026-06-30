<script setup lang="ts">
import DefaultLayout from '~/layouts/default.vue'
</script>

<template>
  <DefaultLayout>
    <main class="container mx-auto">
      <div class="mx-auto py-6 lg:py-8 prose dark:prose-invert">
        <slot></slot>
      </div>
    </main>
  </DefaultLayout>
</template>
