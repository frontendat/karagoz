<script setup lang="ts">
import DefaultLayout from '~/layouts/default.vue'
</script>

<template>
  <DefaultLayout>
    <div
      class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
    >
      <aside
        class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto"
      >
        <DocsSideBar />
      </aside>
      <main
        class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"
      >
        <div class="mx-auto w-full min-w-0 prose dark:prose-invert">
          <slot></slot>
        </div>
        <div class="hidden text-sm xl:block">
          <DocsTOC />
        </div>
      </main>
    </div>
  </DefaultLayout>
</template>
