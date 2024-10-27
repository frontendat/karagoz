<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'

import { useKaragozSandbox } from '../composables/useKaragozSandbox.ts'

const props = defineProps<{
  path?: string
}>()

const sandbox = useKaragozSandbox()
const container = sandbox.container()
const contents = ref<string>('')

watch(
  () => props.path,
  async (path) =>
    (contents.value = path ? await container.fs.readFile(path, 'utf-8') : ''),
  { immediate: true },
)

const onInput = useDebounceFn((event: Event) => {
  if (!props.path) return
  container.fs.writeFile(
    props.path,
    (event.target as HTMLTextAreaElement).value,
    'utf-8',
  )
}, 1000)
</script>

<template>
  <textarea
    class="flex-grow h-full w-full"
    :value="contents"
    @input="onInput"
  ></textarea>
</template>
