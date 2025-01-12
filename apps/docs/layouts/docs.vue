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
        <main
          class="relative py-6 lg:gap-10 lg:py-8"
          :class="{ 'xl:grid xl:grid-cols-[1fr_300px]': !hideToc }"
        >
          <div
            class="mx-auto w-full max-w-none min-w-0 prose dark:prose-invert"
            :class="{ 'no-toc': hideToc }"
          >
            <slot></slot>
          </div>
          <div v-if="!hideToc" class="hidden text-sm xl:block">
            <div
              class="h-[calc(100vh-7rem)] overflow-hidden sticky top-24 w-full z-30"
            >
              <ScrollArea type="auto" class="h-full">
                <DocsTOC />
              </ScrollArea>
            </div>
          </div>
        </main>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.no-toc > :only-child > :not(.not-prose),
.no-toc > :not(:only-child):not(.not-prose) {
  margin-inline: auto;
  max-width: 660px; /* around 65ch */
}
</style>
