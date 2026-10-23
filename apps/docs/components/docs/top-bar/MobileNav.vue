<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'
import { Menu, X } from 'lucide-vue-next'

import { Button } from '@karagoz/shared'

// The root is renderless (a dialog), so forward attributes such as `class` to the trigger button.
defineOptions({ inheritAttrs: false })

const { t } = useI18n()
const localePath = useLocalePath()
const open = ref(false)
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger as-child>
      <Button
        v-bind="$attrs"
        :aria-label="t('layouts.default.topBar.nav.menu')"
        class="me-1 -ms-2"
        size="icon"
        :title="t('layouts.default.topBar.nav.menu')"
        variant="ghost"
      >
        <Menu class="size-5" aria-hidden="true" />
      </Button>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-background/60 backdrop-blur-[1px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      />
      <DialogContent
        :aria-describedby="undefined"
        class="fixed inset-y-0 start-0 z-50 flex w-72 max-w-[85vw] flex-col gap-4 overflow-y-auto border-e bg-background p-4 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left rtl:data-[state=closed]:slide-out-to-right rtl:data-[state=open]:slide-in-from-right"
      >
        <div class="flex items-center justify-between">
          <DialogTitle class="text-lg font-semibold">
            {{ t('layouts.siteName') }}
          </DialogTitle>
          <DialogClose as-child>
            <Button
              :aria-label="t('layouts.default.topBar.nav.closeMenu')"
              class="-me-2"
              size="icon"
              :title="t('layouts.default.topBar.nav.closeMenu')"
              variant="ghost"
            >
              <X class="size-5" aria-hidden="true" />
            </Button>
          </DialogClose>
        </div>
        <nav
          v-for="section in docsNavSections"
          :key="section.id"
          :aria-label="t(section.label)"
        >
          <DialogClose as-child>
            <NuxtLink
              class="block rounded-md px-3 py-2 text-base font-semibold no-underline hover:bg-accent hover:text-accent-foreground"
              :to="localePath({ path: section.base })"
            >
              {{ t(section.label) }}
            </NuxtLink>
          </DialogClose>
          <ul class="mt-1 ms-3 border-s ps-2">
            <li v-for="link in section.links" :key="link.path">
              <DialogClose as-child>
                <NuxtLink
                  class="block rounded-md px-3 py-2 text-sm no-underline hover:bg-accent hover:text-accent-foreground"
                  :to="localePath({ path: link.path })"
                >
                  {{ t(link.label) }}
                </NuxtLink>
              </DialogClose>
            </li>
          </ul>
        </nav>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
