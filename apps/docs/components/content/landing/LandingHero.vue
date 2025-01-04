<script setup lang="ts">
import { KaragozLogo } from '@karagoz/shared'

defineProps<{
  headline: string
  subline: string
}>()
</script>

<template>
  <section
    class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 page-header page-header pb-8 prose dark:prose-dark"
  >
    <KaragozLogo class="fill-primary size-[170px]" />
    <h1 class="mb-0">
      {{ headline }}
    </h1>
    <p class="mt-0 text-center text-xl">
      {{ subline }}
    </p>
  </section>
</template>
