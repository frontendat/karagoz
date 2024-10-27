<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@karagoz/shared'
import { useDebounceFn } from '@vueuse/core'
import { X } from 'lucide-vue-next'
import { ref, watch } from 'vue'

import { useKaragozSandbox } from '../composables/useKaragozSandbox.ts'
import KrgzEditor from './KrgzEditor.vue'

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

const onInput = useDebounceFn((event: Event) => {
  if (!sandbox.latestTab.value) return
  container.fs.writeFile(
    sandbox.latestTab.value.path,
    (event.target as HTMLTextAreaElement).value,
    'utf-8',
  )
}, 1000)
</script>

<template>
  <Tabs
    v-if="sandbox.tabs.value.length"
    class="h-full"
    :model-value="sandbox.latestTab.value?.path"
    @update:model-value="sandbox.fileOpen($event)"
  >
    <TabsList class="max-w-full overflow-x-auto">
      <TabsTrigger
        v-for="tab in sandbox.tabs.value"
        :key="tab.path"
        class="text-xs"
        :value="tab.path"
      >
        <div class="flex gap-2 items-center">
          <span :title="tab.path">
            {{ tab.path.split('/').at(-1) }}
          </span>
          <X class="h-4 w-4" @click.stop="sandbox.fileClose(tab.path)"></X>
        </div>
      </TabsTrigger>
    </TabsList>
    <TabsContent class="h-full" :value="sandbox.latestTab.value?.path">
      <KrgzEditor class="h-full w-full" :path="sandbox.latestTab.value?.path" />
    </TabsContent>
  </Tabs>
  <div v-else>Please select a file</div>
</template>
