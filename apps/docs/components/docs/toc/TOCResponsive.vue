<script setup lang="ts">
import { Button, ScrollArea } from '@karagoz/shared'

const { t } = useI18n()

const props = defineProps<{
  toc: { links?: unknown[] } | null | undefined
}>()

const tocIsOpen = ref(false)
</script>

<template>
  <div v-if="props.toc?.links?.length" class="text-sm">
    <div class="hidden sticky top-24 xl:block">
      <div class="h-[calc(100vh-7rem)] overflow-hidden w-full z-30">
        <ScrollArea type="auto" class="h-full">
          <DocsTOC :toc="props.toc" />
        </ScrollArea>
      </div>
    </div>
    <div class="block xl:hidden">
      <UiCollapsible v-model:open="tocIsOpen">
        <UiCollapsibleTrigger as-child>
          <Button variant="outline">{{ t('layouts.tocButton') }}</Button>
        </UiCollapsibleTrigger>
        <UiCollapsibleContent>
          <div class="border-s ps-4">
            <DocsTOC class="mt-4" no-title :toc="props.toc" />
          </div>
        </UiCollapsibleContent>
      </UiCollapsible>
    </div>
  </div>
</template>
