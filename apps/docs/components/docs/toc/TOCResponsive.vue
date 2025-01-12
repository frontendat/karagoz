<script setup lang="ts">
import { Button, ScrollArea } from '@karagoz/shared'

const { t } = useI18n()
const tocIsOpen = ref(false)
</script>

<template>
  <div class="text-sm">
    <div class="hidden xl:block">
      <div
        class="h-[calc(100vh-7rem)] overflow-hidden sticky top-24 w-full z-30"
      >
        <ScrollArea type="auto" class="h-full">
          <DocsTOC />
        </ScrollArea>
      </div>
    </div>
    <div class="block xl:hidden">
      <Collapsible v-model:open="tocIsOpen">
        <CollapsibleTrigger as-child>
          <Button variant="outline">{{ t('layouts.tocButton') }}</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div class="border-s ps-4">
            <DocsTOC no-title class="mt-4" />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
</template>
