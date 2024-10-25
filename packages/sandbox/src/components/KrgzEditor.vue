<script setup lang="ts">
import { ref, watch } from 'vue'

import { useKaragozSandbox } from '../composables/useKaragozSandbox.ts'
import KrgzEditorTabs from './KrgzEditorTabs.vue'

const sandbox = useKaragozSandbox()
const container = sandbox.container()
const contents = ref<string>('')

watch(
  () => sandbox.latestTab.value,
  async (latestTab) => {
    if (!latestTab) {
      contents.value = ''
      return
    }
    contents.value = await container.fs.readFile(latestTab?.path, 'utf-8')
  },
)

const onInput = (event: Event) => {
  if (!sandbox.latestTab.value) return
  container.fs.writeFile(
    sandbox.latestTab.value.path,
    (event.target as HTMLTextAreaElement).value,
    'utf-8',
  )
}
</script>

<template>
  <div class="krgz-editor">
    <template v-if="sandbox.latestTab.value">
      <KrgzEditorTabs></KrgzEditorTabs>
      <textarea :value="contents" @input="onInput"></textarea>
    </template>
    <div v-else>Please select a file</div>
  </div>
</template>
