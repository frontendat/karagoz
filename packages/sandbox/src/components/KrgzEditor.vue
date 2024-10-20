<script setup lang="ts">
import { ref, watch } from 'vue'

import { useSharedWebContainer } from '../composables/useSharedWebContainer.ts'
import KrgzEditorTabs from './KrgzEditorTabs.vue'

const wc = useSharedWebContainer()
const contents = ref<string>('')

watch(
  () => wc.latestTab.value,
  async (latestTab) => {
    if (!latestTab) {
      contents.value = ''
      return
    }
    const instance = await wc.ensureInstance()
    contents.value = await instance.fs.readFile(latestTab?.path, 'utf-8')
  },
)

const onInput = async (event: InputEvent) => {
  if (!wc.latestTab.value) return
  const instance = await wc.ensureInstance()
  instance.fs.writeFile(
    wc.latestTab.value.path,
    (event.target as HTMLTextAreaElement).value,
    'utf-8',
  )
}
</script>

<template>
  <div class="krgz-editor">
    <template v-if="wc.latestTab.value">
      <KrgzEditorTabs></KrgzEditorTabs>
      <textarea :value="contents" @input="onInput"></textarea>
    </template>
    <div v-else>Please select a file</div>
  </div>
</template>
