<script setup lang="ts">
import DefaultLayout from '~/layouts/default.vue'

const { page } = useContent()
</script>

<template>
  <DefaultLayout>
    <div class="border-b">
      <div
        class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
      >
        <aside
          class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-9.5rem-2px)] w-full shrink-0 md:sticky md:block overflow-y-auto"
        >
          <DocsSideBar />
        </aside>
        <main
          class="relative py-6 lg:gap-10 lg:py-8"
          :class="{ 'xl:grid xl:grid-cols-[1fr_300px]': !page.hideToc }"
        >
          <div
            class="mx-auto w-full max-w-none min-w-0 prose dark:prose-invert"
          >
            <slot></slot>
          </div>
          <div v-if="!page.hideToc" class="hidden text-sm xl:block">
            <DocsTOC />
          </div>
        </main>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.prose > :only-child > :not(.not-prose),
.prose > :not(:only-child):not(.not-prose) {
  margin-inline: auto;
  max-width: 660px; /* around 65ch */
}
</style>
