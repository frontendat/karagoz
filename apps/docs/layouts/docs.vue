<script setup lang="ts">
import { ScrollArea } from '@karagoz/shared'

import DefaultLayout from '~/layouts/default.vue'

const { page } = useContent()

const hideToc = computed(() => !page.value || page.value.hideToc)
</script>

<template>
  <DefaultLayout>
    <div class="border-b">
      <div
        class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
      >
        <aside
          class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-hidden"
        >
          <ScrollArea type="auto" class="h-full">
            <DocsSideBar />
          </ScrollArea>
        </aside>
        <main class="gap-6 grid py-6 lg:py-8 relative">
          <div class="order-2 xl:order-1">
            <DocsBreadcrumb v-if="!page?.hideBreadcrumb" class="mb-4" />
            <div class="max-w-none min-w-0 w-full prose dark:prose-invert">
              <slot></slot>
            </div>
          </div>
          <DocsTOCResponsive v-if="!hideToc" class="toc order-1 xl:order-2" />
        </main>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
@screen xl {
  main:has(.toc) {
    @apply gap-10;
    grid-template-columns: 1fr 300px;
  }
}
</style>
