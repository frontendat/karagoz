<script setup lang="ts">
const route = useRouter().currentRoute
const { t } = useI18n()
const queryLocalisedCollection = useLocalisedCollection()
const { data: page } = await useAsyncData(
  route.value.path,
  () =>
    queryLocalisedCollection((builder) =>
      builder.path(route.value.path).first(),
    ),
  { watch: [() => route.value.path] },
)
const toc = computed(() => page.value?.body.toc)
const tocIsOpen = ref(false)
</script>

<template>
  <div v-if="toc?.links?.length" class="text-sm">
    <div class="hidden sticky top-24 xl:block">
      <div class="h-[calc(100vh-7rem)] overflow-hidden w-full z-30">
        <ScrollArea type="auto" class="h-full">
          <DocsTOC :toc="toc" />
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
            <DocsTOC class="mt-4" no-title :toc="toc" />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
</template>
